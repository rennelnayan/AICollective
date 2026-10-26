#!/usr/bin/env node
/**
 * folder-to-txt.js
 *
 * Creates .txt copies of every file in a folder while preserving the originals.
 * Output is written to a separate TXT_COPIES folder with subfolders preserved.
 *
 * Usage:
 *   node folder-to-txt.js
 *   node folder-to-txt.js "C:\path\to\folder"
 *   node folder-to-txt.js "C:\path\to\folder" "C:\path\to\output"
 */

const fs = require('node:fs');
const path = require('node:path');

const sourceDir = path.resolve(process.argv[2] || process.cwd());
const outputDir = path.resolve(process.argv[3] || path.join(sourceDir, 'TXT_COPIES'));
const scriptPath = path.resolve(__filename);

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

function isInside(child, parent) {
  const rel = path.relative(parent, child);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

function walk(currentDir) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);

    // Never scan the generated output directory.
    if (entry.isDirectory() && isInside(fullPath, outputDir)) continue;

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    fail(`Source folder does not exist: ${sourceDir}`);
    return;
  }

  if (!fs.statSync(sourceDir).isDirectory()) {
    fail(`Source path is not a folder: ${sourceDir}`);
    return;
  }

  if (sourceDir === outputDir) {
    fail('Source and output folders must be different.');
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const files = walk(sourceDir);
  let copied = 0;
  let skipped = 0;
  let failed = 0;

  for (const inputPath of files) {
    // Avoid copying this utility if it is stored inside the source folder.
    if (path.resolve(inputPath) === scriptPath) {
      skipped += 1;
      console.log(`SKIP  ${path.relative(sourceDir, inputPath)} (this script)`);
      continue;
    }

    const relativePath = path.relative(sourceDir, inputPath);
    const outputPath = path.join(outputDir, `${relativePath}.txt`);

    try {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.copyFileSync(inputPath, outputPath);
      copied += 1;
      console.log(`COPY  ${relativePath} -> ${path.relative(sourceDir, outputPath)}`);
    } catch (error) {
      failed += 1;
      console.error(`FAIL  ${relativePath}: ${error.message}`);
    }
  }

  console.log('\nConversion summary');
  console.log(`Source : ${sourceDir}`);
  console.log(`Output : ${outputDir}`);
  console.log(`Copied : ${copied}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed : ${failed}`);

  if (failed > 0) process.exitCode = 1;
}

main();
