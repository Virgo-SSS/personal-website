import fs from 'node:fs';
import path from 'node:path';

const files = [
  'index.html',
  'experience.html',
  'projects.html',
  'projects/estatemind.html',
  'projects/salsun-premium-salad.html',
  'projects/ternakku.html',
  'projects/wellfish.html',
];

let totalReplacements = 0;

for (const f of files) {
  const p = path.resolve(f);
  let src = fs.readFileSync(p, 'utf8');
  const before = src;

  // text-accent → text-accent-text (only when followed by space, !, " — never -hover or other)
  src = src.replace(/\btext-accent(?=[\s!"])/g, 'text-accent-text');
  // hover:text-accent variants (covers hover:text-accent and hover:text-accent!)
  src = src.replace(/\bhover:text-accent(?=[\s!"])/g, 'hover:text-accent-text');

  // text-neutral-500 → text-neutral-600 site-wide
  src = src.replace(/\btext-neutral-500\b/g, 'text-neutral-600');

  // footer-specific neutral-400 (only inside the footer block)
  src = src.replace(
    /(<footer\b[\s\S]*?<\/footer>)/g,
    (block) => block.replace(/\btext-neutral-400\b/g, 'text-neutral-600 dark:text-neutral-400')
  );

  // Add aria-label to close-sidebar button if missing
  src = src.replace(
    /<button\s+id="close-sidebar"(?![^>]*aria-label)([^>]*)>/g,
    '<button id="close-sidebar" aria-label="Close sidebar"$1>'
  );

  if (src !== before) {
    fs.writeFileSync(p, src);
    const diffs = (before.split('\n').length - src.split('\n').length) || 'updated';
    console.log(`  ${f}: updated`);
    totalReplacements++;
  } else {
    console.log(`  ${f}: no change`);
  }
}

console.log(`\nFiles changed: ${totalReplacements}`);
