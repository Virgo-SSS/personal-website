import fs from 'node:fs';
import path from 'node:path';

const envText = fs.readFileSync(path.resolve('.env'), 'utf8');
const KEY = envText.match(/^PAGESPEED_INSIGHT_API_KEY\s*=\s*"?([^"\r\n]+)"?/m)[1].trim();

async function run(strategy) {
  const u = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  u.searchParams.set('url', 'https://virgostevanus.com');
  u.searchParams.set('strategy', strategy);
  ['performance', 'seo', 'accessibility', 'best-practices'].forEach(c =>
    u.searchParams.append('category', c)
  );
  u.searchParams.set('key', KEY);
  const res = await fetch(u);
  const json = await res.json();
  if (json.error) {
    console.error(`API error (${strategy}):`, json.error.code, json.error.message);
    process.exit(1);
  }
  return json;
}

function fmt(label, r) {
  console.log(`\n${'='.repeat(60)}\n${label}\n${'='.repeat(60)}`);

  const lr = r.lighthouseResult;
  const c = lr.categories;
  const a = lr.audits;

  console.log('\n[ Scores ]');
  console.log(`  Performance:    ${Math.round(c.performance.score * 100)}`);
  console.log(`  Accessibility:  ${Math.round(c.accessibility.score * 100)}`);
  console.log(`  Best Practices: ${Math.round(c['best-practices'].score * 100)}`);
  console.log(`  SEO:            ${Math.round(c.seo.score * 100)}`);

  console.log('\n[ Lab Metrics ]');
  console.log(`  FCP:  ${a['first-contentful-paint'].displayValue}`);
  console.log(`  LCP:  ${a['largest-contentful-paint'].displayValue}`);
  console.log(`  TBT:  ${a['total-blocking-time'].displayValue}`);
  console.log(`  CLS:  ${a['cumulative-layout-shift'].displayValue}`);
  console.log(`  SI:   ${a['speed-index'].displayValue}`);
  console.log(`  TTI:  ${a['interactive']?.displayValue ?? 'n/a'}`);

  // CrUX field data
  if (r.loadingExperience && r.loadingExperience.metrics) {
    console.log('\n[ CrUX Field Data — this URL ]');
    const m = r.loadingExperience.metrics;
    Object.entries(m).forEach(([k, v]) => {
      console.log(`  ${k}: ${v.percentile} (${v.category})`);
    });
  } else {
    console.log('\n[ CrUX Field Data — this URL ]\n  (insufficient data)');
  }

  if (r.originLoadingExperience && r.originLoadingExperience.metrics) {
    console.log('\n[ CrUX Field Data — origin ]');
    const m = r.originLoadingExperience.metrics;
    Object.entries(m).forEach(([k, v]) => {
      console.log(`  ${k}: ${v.percentile} (${v.category})`);
    });
  }

  console.log('\n[ Opportunities (perf savings) ]');
  const opps = Object.values(a)
    .filter(x => x.details && x.details.type === 'opportunity' && x.numericValue > 0)
    .sort((x, y) => y.numericValue - x.numericValue);
  if (opps.length === 0) console.log('  (none)');
  opps.forEach(x => console.log(`  - ${x.title} — ${x.displayValue}`));

  console.log('\n[ Diagnostics (informational) ]');
  const diags = Object.values(a)
    .filter(x => x.details && x.details.type === 'table' && x.score !== null && x.score < 1);
  if (diags.length === 0) console.log('  (none flagged)');
  diags.forEach(x => console.log(`  - ${x.title}${x.displayValue ? ' — ' + x.displayValue : ''}`));

  console.log('\n[ Failed audits ]');
  const fails = Object.values(a).filter(
    x => x.score !== null && x.score < 1 && x.scoreDisplayMode === 'binary'
  );
  if (fails.length === 0) console.log('  (none) ✓');
  fails.forEach(x => console.log(`  - [${x.score === 0 ? 'FAIL' : 'WARN'}] ${x.title}`));

  console.log('\n[ Resource Summary ]');
  const rs = a['resource-summary'];
  if (rs && rs.details && rs.details.items) {
    rs.details.items.forEach(it => {
      console.log(`  ${it.label.padEnd(14)} count=${it.requestCount}  size=${(it.transferSize / 1024).toFixed(1)} KiB`);
    });
  }
}

const [m, d] = await Promise.all([run('mobile'), run('desktop')]);
fmt('MOBILE', m);
fmt('DESKTOP', d);
