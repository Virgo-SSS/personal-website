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

const linkRe =
  /\s*<link\s+rel="stylesheet"\s+href="https:\/\/cdn\.jsdelivr\.net\/npm\/@fancyapps\/ui@5\.0\/dist\/fancybox\/fancybox\.css">\s*\n/g;
const scriptRe =
  /\s*<script\s+src="https:\/\/cdn\.jsdelivr\.net\/npm\/@fancyapps\/ui@5\.0\/dist\/fancybox\/fancybox\.umd\.js"><\/script>\s*\n/g;

for (const f of files) {
  const p = path.resolve(f);
  const before = fs.readFileSync(p, 'utf8');
  const after = before.replace(linkRe, '\n').replace(scriptRe, '\n');
  if (after !== before) {
    fs.writeFileSync(p, after);
    console.log(`  ${f}: stripped`);
  } else {
    console.log(`  ${f}: no fancybox tags`);
  }
}
