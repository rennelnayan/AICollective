export function parseArgs(argv) {
  const result = {};
  for (let i=0; i<argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = argv[i+1];
    if (!next || next.startsWith('--')) result[key] = true;
    else { result[key] = next; i++; }
  }
  return result;
}
export function requireArgs(args, names) {
  const missing = names.filter(n => !args[n]);
  if (missing.length) throw new Error(`Missing required arguments: ${missing.map(x=>'--'+x).join(', ')}`);
}
