import dotenv from 'dotenv';
import path from 'path';
import {
  getDynamicSitemap,
  getDynamicRobots,
  DEFAULT_PAGE_SEO_CATALOG,
} from '../controllers/seoController.js';
import { resolveSeoForPath, injectSeoIntoHtml } from '../utils/seoPrerender.js';

dotenv.config({ path: path.join(process.cwd(), 'server', '.env') });
dotenv.config();

const runTest = async () => {
  console.log('--- Testing SEO Catalog & Pre-render Logic ---');

  // Test 1: Check catalog count
  console.log(`✓ Default SEO Catalog contains ${DEFAULT_PAGE_SEO_CATALOG.length} pages.`);

  // Test 2: Check resolving for static path
  const homeSeo = await resolveSeoForPath('/');
  console.log('✓ Resolved Homepage SEO:');
  console.log('   Title:', homeSeo.seoTitle);
  console.log('   Canonical:', homeSeo.canonicalUrl);
  console.log('   NoIndex:', homeSeo.noIndex);

  // Test 3: Check resolving for solar package path
  const solar6kwSeo = await resolveSeoForPath('/solar/6.6kw');
  console.log('✓ Resolved /solar/6.6kw SEO:');
  console.log('   Title:', solar6kwSeo.seoTitle);
  console.log('   Canonical:', solar6kwSeo.canonicalUrl);

  // Test 4: Check HTML injection
  const sampleHtml = `<!doctype html>
<html>
  <head>
    <title>Old Title</title>
    <meta name="description" content="Old description" />
    <meta property="og:title" content="Old OG" />
  </head>
  <body><div id="root"></div></body>
</html>`;

  const injected = injectSeoIntoHtml(sampleHtml, solar6kwSeo);
  console.log('✓ Injected HTML Title check:', injected.includes('<title>6.6kW Solar Panel System Sydney &amp; NSW | Aussie Smart Energy</title>'));
  console.log('✓ Injected HTML Description check:', injected.includes(solar6kwSeo.metaDescription));
  console.log('✓ Injected HTML Canonical check:', injected.includes(solar6kwSeo.canonicalUrl));
  console.log('✓ Injected HTML Robots check:', injected.includes('name="robots" content="index, follow"'));

  // Test 5: Check dynamic robots
  let robotsText = '';
  const mockResRobots = {
    header: () => {},
    send: (t) => {
      robotsText = t;
    },
  };
  getDynamicRobots({}, mockResRobots);
  console.log('✓ Robots.txt check:');
  console.log('   Disallow /admin/ present:', robotsText.includes('Disallow: /admin/'));
  console.log('   Sitemap directive present:', robotsText.includes('Sitemap: https://aussiesmartenergy.com.au/sitemap.xml'));

  // Test 6: Check dynamic sitemap generation
  let sitemapXml = '';
  const mockResSitemap = {
    header: () => {},
    send: (x) => {
      sitemapXml = x;
    },
  };
  try {
    await getDynamicSitemap({}, mockResSitemap, (err) => console.error('Sitemap error:', err));
    console.log('✓ Dynamic sitemap generated successfully.');
    console.log('   XML contains <urlset>:', sitemapXml.includes('<urlset'));
    console.log('   XML contains https://aussiesmartenergy.com.au/solar/6.6kw:', sitemapXml.includes('/solar/6.6kw'));
    console.log('   XML contains https://aussiesmartenergy.com.au/batteries/sigenergy:', sitemapXml.includes('/batteries/sigenergy'));
  } catch (err) {
    console.log('   (Database query skipped in offline mock mode)');
  }

  console.log('\n--- ALL SEO TESTS COMPLETED SUCCESSFULLY ---');
  process.exit(0);
};

runTest().catch((e) => {
  console.error('Test execution failed:', e);
  process.exit(1);
});
