import fs from 'node:fs';
import path from 'node:path';

const envText = fs.readFileSync(path.resolve('.env'), 'utf8');
const KEY = envText.match(/^PAGESPEED_INSIGHT_API_KEY\s*=\s*"?([^"\r\n]+)"?/m)[1].trim();

async function run(strategy) {
  const u = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  u.searchParams.set('url', 'https://virgostevanus.com');
  u.searchParams.set('strategy', strategy);
  u.searchParams.append('category', 'accessibility');
  u.searchParams.set('key', KEY);
  const res = await fetch(u);
  return res.json();
}

function dumpA11yFails(label, r) {
  console.log(`\n=== ${label} A11Y FAILURES ===`);
  const audits = r.lighthouseResult.audits;
  const fails = Object.entries(audits).filter(
    ([_, x]) => x.score !== null && x.score < 1 && x.scoreDisplayMode === 'binary'
  );
  for (const [id, x] of fails) {
    console.log(`\n[${id}] ${x.title}`);
    console.log(`  ${x.description.split('\n')[0].replace(/\[Learn.*$/, '').trim()}`);
    if (x.details && x.details.items) {
      x.details.items.forEach((item, i) => {
        const node = item.node || {};
        console.log(`  Item ${i + 1}:`);
        if (node.selector) console.log(`    selector: ${node.selector}`);
        if (node.snippet) console.log(`    snippet:  ${node.snippet.slice(0, 200)}`);
        if (node.explanation) console.log(`    why:      ${node.explanation}`);
      });
    }
  }
}

const [m, d] = await Promise.all([run('mobile'), run('desktop')]);
dumpA11yFails('MOBILE', m);
dumpA11yFails('DESKTOP', d);
