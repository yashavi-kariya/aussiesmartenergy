import mongoose from 'mongoose';
import PageSeo from '../models/PageSeo.js';
import Project from '../models/Project.js';
import { findCatalogDefault } from '../controllers/seoController.js';

const SITE_URL = 'https://aussiesmartenergy.com.au';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Escapes HTML characters for safe attribute embedding.
 */
const escapeHtml = (str = '') => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/**
 * Looks up SEO data for a given path from DB / Catalog.
 */
export const resolveSeoForPath = async (urlPath = '/') => {
  const cleanPath = urlPath.split('?')[0].split('#')[0];

  const isDbReady = mongoose.connection.readyState === 1;

  // 1. Project route
  if (cleanPath.startsWith('/projects/')) {
    const slug = cleanPath.replace('/projects/', '').replace(/^\/+/, '');
    const project = isDbReady
      ? await Project.findOne({ slug, deletedFromAdmin: { $ne: true } }).lean()
      : null;
    if (project) {
      const defaultTitle = `${project.name} | Aussie Smart Energy Showcase`;
      const defaultDesc =
        project.shortDescription ||
        `Solar installation project details and showcase by Aussie Smart Energy.`;
      const canonical = project.canonicalUrl || `${SITE_URL}/projects/${project.slug}`;
      const ogImage = project.ogImage || project.mainImage || DEFAULT_OG_IMAGE;

      return {
        seoTitle: project.seoTitle || defaultTitle,
        metaDescription: project.metaDescription || defaultDesc,
        focusKeyword: project.focusKeyword || project.name,
        canonicalUrl: canonical,
        ogTitle: project.ogTitle || project.seoTitle || defaultTitle,
        ogDescription: project.ogDescription || project.metaDescription || defaultDesc,
        ogImage,
        noIndex: Boolean(project.noIndex),
      };
    }
  }

  // 2. Static catalog match
  const catalogItem = findCatalogDefault(cleanPath);
  if (catalogItem) {
    const saved = isDbReady
      ? await PageSeo.findOne({ pageKey: catalogItem.pageKey }).lean()
      : null;
    return {
      seoTitle: saved?.seoTitle || catalogItem.seoTitle,
      metaDescription: saved?.metaDescription || catalogItem.metaDescription,
      focusKeyword: saved?.focusKeyword || catalogItem.focusKeyword,
      canonicalUrl: saved?.canonicalUrl || catalogItem.canonicalUrl,
      ogTitle: saved?.ogTitle || catalogItem.ogTitle,
      ogDescription: saved?.ogDescription || catalogItem.ogDescription,
      ogImage: saved?.ogImage || catalogItem.ogImage,
      noIndex: saved?.noIndex !== undefined ? saved.noIndex : catalogItem.noIndex,
    };
  }

  // 3. Fallback
  return {
    seoTitle: 'Aussie Smart Energy | SAA Accredited Solar & Battery Systems Australia',
    metaDescription:
      'Aussie Smart Energy is an SAA accredited solar installer providing premium residential & commercial solar panels and battery storage solutions across NSW, QLD, and VIC.',
    focusKeyword: 'solar panels Australia',
    canonicalUrl: `${SITE_URL}${cleanPath}`,
    ogTitle: 'Aussie Smart Energy | SAA Accredited Solar & Battery Systems Australia',
    ogDescription:
      'Save up to 90% on electricity bills with Aussie Smart Energy. SAA accredited solar installers across NSW, QLD & VIC.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: cleanPath.startsWith('/admin') || cleanPath.startsWith('/hostedcheckout') || cleanPath.startsWith('/payment'),
  };
};

/**
 * Injects resolved SEO tags into index.html content before sending to client / search engine bots.
 */
export const injectSeoIntoHtml = (htmlContent, seoData) => {
  let modified = htmlContent;

  const title = escapeHtml(seoData.seoTitle);
  const description = escapeHtml(seoData.metaDescription);
  const canonical = escapeHtml(seoData.canonicalUrl);
  const ogTitle = escapeHtml(seoData.ogTitle || seoData.seoTitle);
  const ogDescription = escapeHtml(seoData.ogDescription || seoData.metaDescription);
  const ogImage = escapeHtml(seoData.ogImage);
  const robots = seoData.noIndex ? 'noindex, nofollow' : 'index, follow';

  // 1. Replace Title
  modified = modified.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

  // 2. Replace or inject meta description
  if (modified.includes('name="description"')) {
    modified = modified.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${description}" />`
    );
  }

  // 3. Replace or inject robots
  if (modified.includes('name="robots"')) {
    modified = modified.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="robots" content="${robots}" />`
    );
  } else {
    modified = modified.replace('</head>', `  <meta name="robots" content="${robots}" />\n  </head>`);
  }

  // 4. Inject Canonical link
  if (modified.includes('rel="canonical"')) {
    modified = modified.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonical}" />`
    );
  } else {
    modified = modified.replace('</head>', `  <link rel="canonical" href="${canonical}" />\n  </head>`);
  }

  // 5. Replace OpenGraph tags
  modified = modified.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${ogTitle}" />`
  );
  modified = modified.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${ogDescription}" />`
  );
  modified = modified.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonical}" />`
  );
  modified = modified.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${ogImage}" />`
  );

  // 6. Replace Twitter Card tags
  modified = modified.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${ogTitle}" />`
  );
  modified = modified.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${ogDescription}" />`
  );
  modified = modified.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${ogImage}" />`
  );

  return modified;
};
