import fs from 'node:fs';
import path from 'node:path';

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
export function normalize(value) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'boolean' || typeof value === 'number') return value;
  const s = String(value).trim();
  const u = s.toUpperCase();
  if (['YES','Y','TRUE'].includes(u)) return 'YES';
  if (['NO','N','FALSE'].includes(u)) return 'NO';
  if (['N/A','NA','NOT APPLICABLE'].includes(u)) return 'NOT_APPLICABLE';
  if (['UNKNOWN','NOT KNOWN'].includes(u)) return 'UNKNOWN';
  if (['PLEASE SELECT','SELECT'].includes(u)) return 'PLEASE_SELECT';
  return s;
}
export function slug(value) {
  return String(value ?? '').trim().toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '');
}
export function nowIso() { return new Date().toISOString(); }
export function unique(values) { return new Set(values).size === values.length; }
export function getPath(obj, pathText) {
  return pathText.split('.').reduce((a,k) => a?.[k], obj);
}
