/**
 * Minimal .xlsx reader. Zero dependencies.
 *
 * An .xlsx file is a ZIP archive of XML parts. Node has no ZIP reader, but it
 * does have raw inflate in node:zlib, and the ZIP format is simple enough to
 * walk directly. That is cheaper than taking a dependency for the three parts
 * we actually need: the workbook, the shared string table, and the sheet.
 *
 * Reads values only. No formulas, no styles, no formatting. That is all this
 * needs to do - the form is a data entry surface, not a document.
 */

import { readFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";

const SIG_CENTRAL = 0x02014b50;   // central directory file header
const SIG_EOCD = 0x06054b50;      // end of central directory

/** Walk the central directory and return { name: Buffer } for every entry. */
function unzip(buf) {
  // The EOCD record is at the end, after a variable-length comment.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i -= 1) {
    if (buf.readUInt32LE(i) === SIG_EOCD) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("not a zip archive: no end-of-central-directory record");

  const count = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);
  const entries = {};

  for (let n = 0; n < count; n += 1) {
    if (buf.readUInt32LE(offset) !== SIG_CENTRAL) break;
    const method = buf.readUInt16LE(offset + 10);
    const compressedSize = buf.readUInt32LE(offset + 20);
    const nameLen = buf.readUInt16LE(offset + 28);
    const extraLen = buf.readUInt16LE(offset + 30);
    const commentLen = buf.readUInt16LE(offset + 32);
    const localOffset = buf.readUInt32LE(offset + 42);
    const name = buf.toString("utf8", offset + 46, offset + 46 + nameLen);

    // The local header repeats the name and extra field, with its own lengths.
    const lNameLen = buf.readUInt16LE(localOffset + 26);
    const lExtraLen = buf.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + lNameLen + lExtraLen;
    const raw = buf.subarray(dataStart, dataStart + compressedSize);

    entries[name] = method === 0 ? raw : inflateRawSync(raw);
    offset += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

const unescapeXml = (s) => s
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
  .replace(/&amp;/g, "&");          // last, or it would double-unescape

/** Shared strings table. Cells of type "s" index into this. */
function sharedStrings(xml) {
  if (!xml) return [];
  return [...xml.matchAll(/<si>(.*?)<\/si>/gs)].map(([, si]) =>
    [...si.matchAll(/<t[^>]*>(.*?)<\/t>/gs)]
      .map(([, t]) => unescapeXml(t)).join(""));
}

/** "B12" -> { col: "B", row: 12 } */
function splitRef(ref) {
  const m = /^([A-Z]+)(\d+)$/.exec(ref);
  return m ? { col: m[1], row: Number(m[2]) } : null;
}

/**
 * Read one sheet into a Map keyed by cell reference: "B12" -> "Yes".
 * Empty cells are simply absent.
 */
export function readSheet(path, sheetIndex = 0) {
  const entries = unzip(readFileSync(path));
  const shared = sharedStrings(entries["xl/sharedStrings.xml"]?.toString("utf8"));

  const sheetName = `xl/worksheets/sheet${sheetIndex + 1}.xml`;
  const sheetXml = entries[sheetName]?.toString("utf8");
  if (!sheetXml) throw new Error(`${path}: ${sheetName} not found in workbook`);

  const cells = new Map();
  for (const [, attrs, body] of sheetXml.matchAll(/<c ([^>]*?)\/?>(?:(.*?)<\/c>)?/gs)) {
    const ref = /r="([A-Z]+\d+)"/.exec(attrs)?.[1];
    if (!ref || !body) continue;
    const type = /t="([^"]+)"/.exec(attrs)?.[1];

    let value;
    if (type === "s") {
      const idx = Number(/<v>(.*?)<\/v>/s.exec(body)?.[1]);
      value = shared[idx] ?? "";
    } else if (type === "inlineStr") {
      value = [...body.matchAll(/<t[^>]*>(.*?)<\/t>/gs)]
        .map(([, t]) => unescapeXml(t)).join("");
    } else {
      const v = /<v>(.*?)<\/v>/s.exec(body)?.[1];
      value = v === undefined ? "" : unescapeXml(v);
    }
    if (String(value).trim() !== "") cells.set(ref, String(value).trim());
  }
  return cells;
}

/**
 * Rows as arrays of strings, over an explicit row range.
 *
 * The range is bounded deliberately. A form has hint text and section headings
 * below its entry block, and scanning to the end of the sheet would read those
 * as data.
 */
export function readRows(cells, fromRow, toRow, columns) {
  const rows = [];
  for (let r = fromRow; r <= toRow; r += 1) {
    const row = columns.map((c) => cells.get(`${c}${r}`) ?? "");
    if (row.some((v) => v !== "")) rows.push({ rowNumber: r, values: row });
  }
  return rows;
}

export const cell = (cells, ref) => cells.get(ref) ?? "";
