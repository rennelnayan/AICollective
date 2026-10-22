import XLSX from 'xlsx';
import { normalize, slug } from './utils.js';

function colIndex(letter) {
  let n=0; for (const c of letter) n=n*26+(c.charCodeAt(0)-64); return n-1;
}
function cellValue(row, col) { return row[colIndex(col)]; }
function valueType(v) {
  if (v === null || v === undefined || v === '') return 'NULL';
  if (typeof v === 'boolean') return 'BOOLEAN';
  if (typeof v === 'number') return 'NUMBER';
  if (v instanceof Date) return 'DATE';
  return 'TEXT';
}
export function parseWorkbook(file, workbookType, layout) {
  const wb = XLSX.readFile(file, { cellDates: true, raw: true });
  const sheetName = layout.sheet;
  if (!wb.SheetNames.includes(sheetName)) throw new Error(`${workbookType}: required sheet not found: ${sheetName}`);
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, raw: true });
  const records=[];
  for (let r=layout.firstDataRow-1; r<rows.length; r++) {
    const row=rows[r];
    const id=cellValue(row,layout.idColumn);
    const fieldName=cellValue(row,layout.fieldNameColumn);
    const dataType=cellValue(row,layout.dataTypeColumn);
    const raw=cellValue(row,layout.answerColumn);
    if ((id===null || id==='') && (fieldName===null || fieldName==='')) continue;
    const idText = String(id ?? `ROW-${r + 1}`).trim();
    if (
        layout.idPattern &&
        !new RegExp(layout.idPattern, 'i').test(idText)
        ) {
        continue;
        }
    records.push({
      source_record_id: `SRC-${workbookType==='CBDDQ'?'CBDDQ':'SCOPE'}-${slug(idText)}`,
      source_party: layout.sourceParty,
      workbook_type: workbookType,
      sheet_name: sheetName,
      question_or_field_id: idText,
      field_name: fieldName==null?null:String(fieldName).trim(),
      declared_data_type: dataType==null?null:String(dataType).trim(),
      source_location: `${sheetName}!${layout.answerColumn}${r+1}`,
      raw_value: raw,
      normalized_value: normalize(raw),
      normalized_type: valueType(raw),
      extraction_status: raw===null || raw==='' ? 'BLANK' : normalize(raw)==='PLEASE_SELECT' ? 'PLACEHOLDER' : 'EXTRACTED'
    });
  }
  return records;
}
export function buildSourceRegister({caseId,runId,cbddqFile,scopingFile,layout}) {
  const records=[
    ...parseWorkbook(cbddqFile,'CBDDQ',layout.CBDDQ),
    ...parseWorkbook(scopingFile,'RELATIONSHIP_SCOPING',layout.RELATIONSHIP_SCOPING)
  ];
  return { schema_name:'SOURCE_REGISTER', schema_version:'1.0.0', case_id:caseId, run_id:runId, generator:'CG_NODE_VALIDATOR', record_count:records.length, records };
}
