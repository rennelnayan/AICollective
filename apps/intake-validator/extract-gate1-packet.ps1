param(
    [string]$InputPath = ".\input\draft_gate1_package.md",
    [string]$OutputPath = ".\validation-output\draft-gate1-packet.json"
)

$ErrorActionPreference = "Stop"

function Get-BalancedJsonObject {
    param(
        [Parameter(Mandatory = $true)][string]$Text,
        [Parameter(Mandatory = $true)][int]$StartIndex
    )

    $objectStart = $Text.IndexOf('{', $StartIndex)
    if ($objectStart -lt 0) {
        throw "DRAFT_GATE1_PACKET heading was found, but no JSON object opening brace was found after it."
    }

    $depth = 0
    $inString = $false
    $escapeNext = $false

    for ($i = $objectStart; $i -lt $Text.Length; $i++) {
        $ch = $Text[$i]

        if ($inString) {
            if ($escapeNext) {
                $escapeNext = $false
                continue
            }
            if ($ch -eq '\') {
                $escapeNext = $true
                continue
            }
            if ($ch -eq '"') {
                $inString = $false
            }
            continue
        }

        if ($ch -eq '"') {
            $inString = $true
            continue
        }
        if ($ch -eq '{') {
            $depth++
            continue
        }
        if ($ch -eq '}') {
            $depth--
            if ($depth -eq 0) {
                return $Text.Substring($objectStart, $i - $objectStart + 1)
            }
            if ($depth -lt 0) {
                throw "Malformed JSON after DRAFT_GATE1_PACKET: closing brace appeared before a matching opening brace."
            }
        }
    }

    throw "DRAFT_GATE1_PACKET heading was found, but the JSON object was incomplete or unbalanced."
}

function Normalize-HardExclusionCandidates {
    param(
        [Parameter(Mandatory = $true)][object]$Packet
    )

    $property = $Packet.PSObject.Properties['hard_exclusion_candidates']
    if ($null -eq $property) {
        throw "DRAFT_GATE1_PACKET is missing 'hard_exclusion_candidates'. Expected a JSON array, including [] when there are no candidates."
    }

    $value = $property.Value
    if ($null -eq $value) {
        throw "DRAFT_GATE1_PACKET.hard_exclusion_candidates must not be null. Use [] when there are no candidates."
    }

    # Correct flat contract already used by resolve.mjs and admission.mjs.
    if ($value -is [System.Array]) {
        return @($value)
    }

    # Legacy wrapped document emitted by the Markdown packet generator.
    # Only the explicit candidates[] collection is flattened. Metadata is not
    # passed to Node because the consumers require an iterable array.
    if ($value -is [System.Management.Automation.PSCustomObject]) {
        if ($value.schema_name -ne 'HARD_EXCLUSION_CANDIDATES') {
            $keys = @($value.PSObject.Properties.Name) -join ', '
            throw "DRAFT_GATE1_PACKET.hard_exclusion_candidates is an object with unexpected schema_name '$($value.schema_name)'. Keys: [$keys]."
        }

        $candidatesProperty = $value.PSObject.Properties['candidates']
        if ($null -eq $candidatesProperty) {
            $keys = @($value.PSObject.Properties.Name) -join ', '
            throw "HARD_EXCLUSION_CANDIDATES wrapper is missing candidates[]. Keys: [$keys]. Fix the source DRAFT_GATE1_PACKET in $InputPath."
        }

        if ($null -eq $candidatesProperty.Value) {
            throw "HARD_EXCLUSION_CANDIDATES.candidates must not be null. Use [] when there are no candidates."
        }

        if ($candidatesProperty.Value -isnot [System.Array]) {
            $actualType = $candidatesProperty.Value.GetType().FullName
            throw "HARD_EXCLUSION_CANDIDATES.candidates must be a JSON array. Actual PowerShell type: $actualType."
        }

        return @($candidatesProperty.Value)
    }

    $actualType = $value.GetType().FullName
    throw "DRAFT_GATE1_PACKET.hard_exclusion_candidates must be a JSON array or a HARD_EXCLUSION_CANDIDATES wrapper containing candidates[]. Actual PowerShell type: $actualType."
}

try {
    if (-not (Test-Path -LiteralPath $InputPath -PathType Leaf)) {
        throw "Input package not found: $InputPath"
    }

    $markdown = Get-Content -LiteralPath $InputPath -Raw -Encoding UTF8

    # Accept # through ###### and optional backslash escaping before underscores.
    $headingPattern = '(?im)^#{1,6}[ \t]+DRAFT(?:\\?_)?GATE1(?:\\?_)?PACKET[ \t]*\r?$'
    $headingMatch = [regex]::Match($markdown, $headingPattern)

    if (-not $headingMatch.Success) {
        throw "DRAFT_GATE1_PACKET heading was not found in: $InputPath"
    }

    $afterHeading = $headingMatch.Index + $headingMatch.Length
    $tail = $markdown.Substring($afterHeading)

    # Path A: fenced JSON block.
    $fencedPattern = '(?ms)^\s*```json[ \t]*\r?\n(?<json>.*?)\r?\n```'
    $fencedMatch = [regex]::Match($tail, $fencedPattern)

    if ($fencedMatch.Success) {
        $jsonText = $fencedMatch.Groups['json'].Value.Trim()
        $format = "FENCED_JSON"
    }
    else {
        # Path B: bare JSON object immediately after the heading.
        $jsonText = Get-BalancedJsonObject -Text $markdown -StartIndex $afterHeading
        $format = "BARE_JSON"
    }

    try {
        $packet = $jsonText | ConvertFrom-Json
    }
    catch {
        throw "Extracted DRAFT_GATE1_PACKET JSON is invalid: $($_.Exception.Message)"
    }

    if ($packet.schema_name -ne "DRAFT_GATE1_PACKET") {
        throw "Extracted object has schema_name '$($packet.schema_name)', expected 'DRAFT_GATE1_PACKET'."
    }
    if ([string]::IsNullOrWhiteSpace([string]$packet.case_id)) {
        throw "Extracted packet is missing case_id."
    }
    if ([string]::IsNullOrWhiteSpace([string]$packet.run_id)) {
        throw "Extracted packet is missing run_id."
    }

    # Normalize the one confirmed contract mismatch before serialization:
    # wrapper object -> iterable array required by resolve.mjs/admission.mjs.
    $packet.hard_exclusion_candidates = @(
        Normalize-HardExclusionCandidates -Packet $packet
    )

    if ($packet.hard_exclusion_candidates -isnot [System.Array]) {
        throw "Internal contract failure: normalized hard_exclusion_candidates is not an array."
    }

    $outputDirectory = Split-Path -Parent $OutputPath
    if ($outputDirectory) {
        New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
    }

    # Re-serialize to produce clean, valid JSON regardless of source formatting.
    $packet | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $OutputPath -Encoding UTF8

    # Re-read the emitted file and verify the JSON output contract, not just the
    # in-memory PowerShell representation.
    $writtenPacket = Get-Content -LiteralPath $OutputPath -Raw -Encoding UTF8 | ConvertFrom-Json
    if ($writtenPacket.hard_exclusion_candidates -isnot [System.Array]) {
        throw "Output contract failure: emitted hard_exclusion_candidates is not a JSON array. Output: $OutputPath"
    }

    $created = Get-Item -LiteralPath $OutputPath
    [PSCustomObject]@{
        Status                       = "CREATED"
        Name                         = $created.Name
        FullName                     = $created.FullName
        Length                       = $created.Length
        ExtractionMode               = $format
        CaseId                       = $packet.case_id
        RunId                        = $packet.run_id
        SchemaName                   = $packet.schema_name
        SchemaVersion                = $packet.schema_version
        PacketStatus                 = $packet.packet_status
        HardExclusionCandidateCount  = $packet.hard_exclusion_candidates.Count
        HardExclusionCandidateType   = $packet.hard_exclusion_candidates.GetType().FullName
    } | Format-List
}
catch {
    Write-Error $_.Exception.Message
    exit 1
}
