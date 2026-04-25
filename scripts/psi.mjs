import fs from 'node:fs';
import path from 'node:path';

const envPath = path.resolve('.env');
const envText = fs.readFileSync(envPath, 'utf8');
const match = envText.match(/^PAGESPEED_INSIGHT_API_KEY\s*=\s*"?([^"\r\n]+)"?/m);
if (!match) {
  console.error('PAGESPEED_INSIGHT_API_KEY not found in .env');
  process.exit(1);
}
const KEY = match[1].trim();
const URL_TARGET = 'https://virgostevanus.com';

async function run(strategy) {
  const u = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  u.searchParams.set('url', URL_TARGET);
  u.searchParams.set('strategy', strategy);
  ['performance', 'seo', 'accessibility', 'best-practices'].forEach(c =>
    u.searchParams.append('category', c)
  );
  u.searchParams.set('key', KEY);
  const res = await fetch(u);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${strategy} failed: ${res.status} ${body.slice(0, 200)}`);
  }
  return res.json();
}

function summarize(label, r) {
  const c = r.lighthouseResult.categories;
  const a = r.lighthouseResult.audits;
  console.log(`\n=== ${label} ===`);
  console.log(`Performance:    ${Math.round(c.performance.score * 100)}`);
  console.log(`Accessibility:  ${Math.round(c.accessibility.score * 100)}`);
  console.log(`Best Practices: ${Math.round(c['best-practices'].score * 100)}`);
  console.log(`SEO:            ${Math.round(c.seo.score * 100)}`);
  console.log('--- Core Web Vitals (lab) ---');
  console.log(`FCP:  ${a['first-contentful-paint'].displayValue}`);
  console.log(`LCP:  ${a['largest-contentful-paint'].displayValue}`);
  console.log(`TBT:  ${a['total-blocking-time'].displayValue}`);
  console.log(`CLS:  ${a['cumulative-layout-shift'].displayValue}`);
  console.log(`SI:   ${a['speed-index'].displayValue}`);
  console.log('--- Top opportunities ---');
  const opps = Object.values(a)
    .filter(x => x.details && x.details.type === 'opportunity' && x.numericValue > 0)
    .sort((x, y) => y.numericValue - x.numericValue)
    .slice(0, 5);
  if (opps.length === 0) console.log(' (none)');
  opps.forEach(x => console.log(` - ${x.title} (${x.displayValue})`));
  console.log('--- Failed audits ---');
  const fails = Object.values(a).filter(
    x => x.score !== null && x.score < 1 && x.scoreDisplayMode === 'binary'
  );
  if (fails.length === 0) console.log(' (none)');
  fails.forEach(x => console.log(` - [${x.score === 0 ? 'FAIL' : 'WARN'}] ${x.title}`));
}

const [mobile, desktop] = await Promise.all([run('mobile'), run('desktop')]);
summarize('MOBILE', mobile);
summarize('DESKTOP', desktop);
