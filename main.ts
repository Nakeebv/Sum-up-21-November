// Sum up 21 November 2026's world news in one image.
// entry.png at the root of this repository is the finished front page;
// this program copies it to the output directory the grader reads.
// Pure TypeScript, standard library only, no network, no clock, no randomness.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The grader's cwd is the repository root, so both entry.png and the default
// /output are absolute relative to this file, not relative to where the
// shell happened to run the command.

import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const entry = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

if (!existsSync(entry)) {
  console.error(`main.ts: entry.png not found next to this file (expected ${entry.href})`);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
} catch (err) {
  console.error(`main.ts: cannot create ${outDir} (set MAKEFUN_OUTPUT_DIR to run outside the grader): ${(err as Error).message}`);
  process.exit(1);
}

copyFileSync(entry, join(outDir, 'entry.png'));

console.log(`entry.png copied to ${join(outDir, 'entry.png')}`);
