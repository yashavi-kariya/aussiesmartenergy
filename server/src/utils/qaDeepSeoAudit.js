import fs from 'fs';
import path from 'path';
import { DEFAULT_PAGE_SEO_CATALOG } from '../controllers/seoController.js';
import {
  getOrganizationSchema,
  getFaqSchema,
  getProductSchema,
  getBreadcrumbSchema,
} from '../../../src/utils/seoSchemas.js';
import { injectSeoIntoHtml } from './seoPrerender.js';

const results = {
  totalTests: 0,
  passed: 0,
  warnings: [],
  failures: [],
};

const assert = (condition, testName, failureMsg, isWarning = false) => {
  results.totalTests++;
  if (condition) {
    results.passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    if (isWarning) {
      results.warnings.push(`${testName} -> ${failureMsg}`);
      console.log(`  ⚠ WARN: ${testName} -> ${failureMsg}`);
    } else {
      results.failures.push(`${testName} -> ${failureMsg}`);
      console.log(`  ✖ FAIL: ${testName} -> ${failureMsg}`);
    }
  }
};

console.log('================================================================');
console.log('     AUSSIE SMART ENERGY - SENIOR QA & SEO DEEP AUDIT SUITE     ');
console.log('================================================================\n');

// ── TEST SUITE 1: METADATA UNIQUENESS & QUALITY AUDIT ───────────────────────
console.log('--- TEST SUITE 1: Metadata Uniqueness & Quality Audit ---');
const titlesSeen = new Map();
const descsSeen = new Map();
const canonicalsSeen = new Map();

for (const page of DEFAULT_PAGE_SEO_CATALOG) {
  // Title checks
  assert(page.seoTitle && page.seoTitle.trim().length > 0, `[${page.pageKey}] Title presence`, 'Title is missing or empty');
  assert(
    page.seoTitle.length >= 35 && page.seoTitle.length <= 75,
    `[${page.pageKey}] Title length (${page.seoTitle.length} chars)`,
    `Title length is ${page.seoTitle.length} chars (ideal: 40-65)`,
    true
  );

  const titleLower = page.seoTitle.toLowerCase();
  assert(!titlesSeen.has(titleLower), `[${page.pageKey}] Title uniqueness`, `Duplicate title found with ${titlesSeen.get(titleLower)}`);
  titlesSeen.set(titleLower, page.pageKey);

  // Description checks
  assert(page.metaDescription && page.metaDescription.trim().length > 0, `[${page.pageKey}] Description presence`, 'Meta description is missing');
  assert(
    page.metaDescription.length >= 100 && page.metaDescription.length <= 180,
    `[${page.pageKey}] Description length (${page.metaDescription.length} chars)`,
    `Meta description length is ${page.metaDescription.length} chars (ideal: 120-165)`,
    true
  );

  const descLower = page.metaDescription.toLowerCase();
  assert(!descsSeen.has(descLower), `[${page.pageKey}] Description uniqueness`, `Duplicate description found with ${descsSeen.get(descLower)}`);
  descsSeen.set(descLower, page.pageKey);

  // Canonical checks
  assert(page.canonicalUrl && page.canonicalUrl.startsWith('https://aussiesmartenergy.com.au'), `[${page.pageKey}] Canonical URL validity`, `Invalid canonical: ${page.canonicalUrl}`);
  assert(!canonicalsSeen.has(page.canonicalUrl), `[${page.pageKey}] Canonical uniqueness`, `Duplicate canonical found with ${canonicalsSeen.get(page.canonicalUrl)}`);
  canonicalsSeen.set(page.canonicalUrl, page.pageKey);

  // Open Graph checks
  assert(page.ogTitle && page.ogTitle.trim().length > 0, `[${page.pageKey}] OG Title presence`, 'ogTitle is missing');
  assert(page.ogDescription && page.ogDescription.trim().length > 0, `[${page.pageKey}] OG Description presence`, 'ogDescription is missing');
  assert(page.ogImage && page.ogImage.startsWith('https://'), `[${page.pageKey}] OG Image absolute URL`, 'ogImage must be an absolute HTTPS URL');
}

// ── TEST SUITE 2: SITEMAP.XML AUDIT ─────────────────────────────────────────
console.log('\n--- TEST SUITE 2: Sitemap.xml Static & Dynamic Audit ---');
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'Sitemap.xml exists in public/', 'public/sitemap.xml is missing');

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
assert(sitemapContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Sitemap XML declaration', 'Missing XML declaration');
assert(sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'Sitemap schema namespace', 'Missing or invalid xmlns namespace');
assert(!sitemapContent.includes('/admin/'), 'Sitemap excludes /admin/', 'Sitemap contains admin route!');
assert(!sitemapContent.includes('/login/admin'), 'Sitemap excludes /login/admin', 'Sitemap contains admin login route!');
assert(!sitemapContent.includes('/payment/'), 'Sitemap excludes /payment/', 'Sitemap contains payment processing route!');
assert(!sitemapContent.includes('/pay-online'), 'Sitemap excludes /pay-online', 'Sitemap contains non-indexed payment utility route!');

// Check URLs in sitemap
const sitemapUrls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert(sitemapUrls.length >= 15, `Sitemap URLs count (${sitemapUrls.length} entries)`, 'Sitemap has fewer than expected URLs');
for (const u of sitemapUrls) {
  assert(u.startsWith('https://aussiesmartenergy.com.au/'), `Valid domain for ${u}`, 'URL does not start with https://aussiesmartenergy.com.au/');
  assert(!u.includes('http://'), `No insecure HTTP in ${u}`, 'URL uses insecure HTTP protocol');
}

// ── TEST SUITE 3: ROBOTS.TXT AUDIT ──────────────────────────────────────────
console.log('\n--- TEST SUITE 3: Robots.txt Syntax & Security Audit ---');
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
assert(fs.existsSync(robotsPath), 'Robots.txt exists in public/', 'public/robots.txt is missing');

const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
assert(robotsContent.includes('User-agent: *'), 'Robots.txt User-agent definition', 'Missing User-agent: *');
assert(robotsContent.includes('Allow: /'), 'Robots.txt Allow directive', 'Missing Allow: /');
assert(robotsContent.includes('Disallow: /admin/'), 'Robots.txt disallows /admin/', 'Missing Disallow: /admin/');
assert(robotsContent.includes('Disallow: /login/admin'), 'Robots.txt disallows /login/admin', 'Missing Disallow: /login/admin');
assert(robotsContent.includes('Disallow: /hostedcheckout/'), 'Robots.txt disallows /hostedcheckout/', 'Missing Disallow: /hostedcheckout/');
assert(robotsContent.includes('Disallow: /payment/'), 'Robots.txt disallows /payment/', 'Missing Disallow: /payment/');
assert(robotsContent.includes('Sitemap: https://aussiesmartenergy.com.au/sitemap.xml'), 'Robots.txt Sitemap directive', 'Missing or incorrect Sitemap URL');

// ── TEST SUITE 4: STRUCTURED DATA (JSON-LD) AUDIT ───────────────────────────
console.log('\n--- TEST SUITE 4: Structured Data (Schema.org) Audit ---');
// 1. Org schema
const org = getOrganizationSchema();
assert(org['@context'] === 'https://schema.org', 'Org schema context', 'Invalid context');
assert(org['@type'] === 'HomeAndConstructionBusiness', 'Org schema type', 'Invalid type');
assert(org.name === 'Aussie Smart Energy', 'Org schema name', 'Invalid name');
assert(Array.isArray(org.address) && org.address.length === 3, 'Org multi-location addresses', 'Address array incomplete');
assert(org.telephone && org.telephone === '1300 959 170', 'Org telephone', 'Missing or invalid phone number');
assert(org.areaServed && org.areaServed.length === 3, 'Org service areas (NSW, QLD, VIC)', 'Missing service areas');

// 2. FAQ schema
const sampleFaqs = [{ q: 'How much can I save with solar?', a: 'Up to 90% savings.' }];
const faq = getFaqSchema(sampleFaqs);
assert(faq['@type'] === 'FAQPage', 'FAQ schema type', 'Invalid type');
assert(faq.mainEntity && faq.mainEntity.length === 1, 'FAQ mainEntity array', 'Missing mainEntity');
assert(faq.mainEntity[0].name === 'How much can I save with solar?', 'FAQ question name', 'Question mismatch');
assert(faq.mainEntity[0].acceptedAnswer.text === 'Up to 90% savings.', 'FAQ answer text', 'Answer mismatch');

// 3. Product schema
const prod = getProductSchema({
  name: '6.6kW Residential Solar Power Package',
  description: '14 Tier-1 solar panels with smart inverter.',
  sku: 'ASE-SOLAR-6.6KW',
  brand: 'Aussie Smart Energy',
});
assert(prod['@type'] === 'Product', 'Product schema type', 'Invalid product type');
assert(prod.name && prod.description, 'Product schema required fields', 'Missing name or description');
assert(prod.brand && prod.brand.name === 'Aussie Smart Energy', 'Product schema brand', 'Invalid brand');
assert(prod.offers && prod.offers['@type'] === 'AggregateOffer', 'Product schema offers', 'Missing offers');
assert(prod.offers.priceCurrency === 'AUD', 'Product currency AUD', 'Price currency must be AUD');

// 4. Breadcrumb schema
const breadcrumbs = getBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Solar Packages', url: '/solar/6.6kw' },
]);
assert(breadcrumbs['@type'] === 'BreadcrumbList', 'Breadcrumb schema type', 'Invalid type');
assert(breadcrumbs.itemListElement.length === 2, 'Breadcrumb items length', 'Incorrect count');
assert(breadcrumbs.itemListElement[0].position === 1, 'Breadcrumb root position', 'Position must start at 1');
assert(breadcrumbs.itemListElement[1].item === 'https://aussiesmartenergy.com.au/solar/6.6kw', 'Breadcrumb absolute item URL', 'URL must be absolute');

// ── TEST SUITE 5: BOT PRERENDER & HTML INJECTION AUDIT ───────────────────────
console.log('\n--- TEST SUITE 5: Bot Pre-render & HTML Injection Edge Cases ---');
const baseHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Default Site Title</title>
    <meta name="description" content="Default site description" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Default OG Title" />
    <meta property="og:description" content="Default OG Desc" />
    <meta property="og:url" content="https://aussiesmartenergy.com.au/" />
    <meta property="og:image" content="https://aussiesmartenergy.com.au/og-image.png" />
    <meta name="twitter:title" content="Default Twitter" />
    <meta name="twitter:description" content="Default Twitter Desc" />
    <meta name="twitter:image" content="https://aussiesmartenergy.com.au/og-image.png" />
  </head>
  <body><div id="root"></div></body>
</html>`;

// Test 5A: Special characters & quotes injection
const testSpecialCharsSeo = {
  seoTitle: 'Aussie Smart Energy & "Quality" Solar Systems — NSW',
  metaDescription: 'Special & "quoted" meta description with <brackets> & symbols.',
  canonicalUrl: 'https://aussiesmartenergy.com.au/solar/6.6kw',
  ogTitle: 'Social OG & "Quality" Solar',
  ogDescription: 'Social description & symbols.',
  ogImage: 'https://aussiesmartenergy.com.au/og-image.png',
  noIndex: false,
};
const injectedSpecial = injectSeoIntoHtml(baseHtml, testSpecialCharsSeo);
assert(!injectedSpecial.includes('<title>Default Site Title</title>'), 'Prerender title replaced', 'Old title remained');
assert(injectedSpecial.includes('<title>Aussie Smart Energy &amp; &quot;Quality&quot; Solar Systems — NSW</title>'), 'Prerender HTML entity escaping for title', 'Title entity escaping failed');
assert(injectedSpecial.includes('content="Special &amp; &quot;quoted&quot; meta description with &lt;brackets&gt; &amp; symbols."'), 'Prerender HTML entity escaping for description', 'Description entity escaping failed');
assert(injectedSpecial.includes('rel="canonical" href="https://aussiesmartenergy.com.au/solar/6.6kw"'), 'Prerender canonical URL tag injected', 'Canonical link missing');

// Test 5B: NoIndex flag injection
const testNoIndexSeo = {
  seoTitle: 'Payment Result',
  metaDescription: 'Payment confirmation page',
  canonicalUrl: 'https://aussiesmartenergy.com.au/payment/result',
  noIndex: true,
};
const injectedNoIndex = injectSeoIntoHtml(baseHtml, testNoIndexSeo);
assert(injectedNoIndex.includes('<meta name="robots" content="noindex, nofollow" />'), 'Prerender noindex directive', 'Failed to inject noindex directive');

// ── TEST SUITE 6: ROUTE COVERAGE AUDIT ───────────────────────────────────────
console.log('\n--- TEST SUITE 6: Route Coverage & Alias Mapping Audit ---');
const appJsPath = path.join(process.cwd(), 'src', 'App.jsx');
const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
const routeMatches = [...appJsContent.matchAll(/<Route\s+path="([^"]+)"/g)].map(m => m[1]);

console.log(`  Found ${routeMatches.length} registered routes in App.jsx.`);
const aliasRoutes = ['/solar/10.45kw', '/solar/10.5kw', '/solar/13kw', '/solar/13.3kw', '/batteries/foxess', '/batteries/SOFAR', '/batteries/sopher', '/batteries/alphaess'];

for (const alias of aliasRoutes) {
  assert(routeMatches.includes(alias), `Alias route ${alias} exists in App.jsx`, `Alias ${alias} not routed`);
}

// ── FINAL REPORT SUMMARY ────────────────────────────────────────────────────
console.log('\n================================================================');
console.log(`TOTAL TESTS: ${results.totalTests}`);
console.log(`PASSED:      ${results.passed}`);
console.log(`WARNINGS:    ${results.warnings.length}`);
console.log(`FAILURES:    ${results.failures.length}`);
console.log('================================================================');

if (results.failures.length > 0) {
  console.error('\nFAILURES DETECTED:');
  results.failures.forEach(f => console.error(`  - ${f}`));
  process.exit(1);
} else {
  console.log('\n>>> SENIOR QA VERIFICATION: ZERO CRITICAL ISSUES DETECTED. READY FOR PRODUCTION. <<<');
  process.exit(0);
}
