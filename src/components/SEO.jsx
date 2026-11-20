import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/seoSchemas';
import api from '../utils/api';

const DEFAULT_TITLE = 'Aussie Smart Energy | SAA Accredited Solar & Battery Systems Australia';
const DEFAULT_DESCRIPTION =
  'Aussie Smart Energy is an SAA accredited solar installer providing premium residential & commercial solar panels and battery storage solutions across NSW, QLD, and VIC.';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * Normalizes route path for canonical and API lookup.
 */
const cleanPath = (p = '') => {
  if (!p || p === '/') return '/';
  const noQuery = p.split('?')[0].split('#')[0];
  return noQuery.endsWith('/') ? noQuery.slice(0, -1) : noQuery;
};

/**
 * Reusable dynamic SEO component.
 * Integrates directly with MongoDB dynamic SEO settings while falling back gracefully to page props.
 */
const SEO = ({
  pageKey,
  title,
  description,
  keywords,
  focusKeyword,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  noIndex = false,
  schema,
}) => {
  const location = useLocation();
  const [dbSeo, setDbSeo] = useState(null);

  // Fetch dynamic SEO overrides from MongoDB for this page/route
  useEffect(() => {
    let isMounted = true;
    const lookupKey = pageKey || cleanPath(location.pathname);

    // Skip API call for admin and internal routes
    if (
      location.pathname.startsWith('/admin') ||
      location.pathname === '/login/admin' ||
      location.pathname.startsWith('/hostedcheckout')
    ) {
      return;
    }

    const fetchPageSeo = async () => {
      try {
        const res = await api.get(`/seo/${encodeURIComponent(lookupKey)}`);
        if (isMounted && res.data?.success && res.data.data) {
          setDbSeo(res.data.data);
        }
      } catch (err) {
        // Silently use passed props if backend is unavailable or offline
      }
    };

    fetchPageSeo();

    return () => {
      isMounted = false;
    };
  }, [pageKey, location.pathname]);

  useEffect(() => {
    // 1. Resolve Effective Values (DB values take precedence if customized)
    const effectiveTitle =
      dbSeo?.seoTitle ||
      title ||
      DEFAULT_TITLE;

    const formattedTitle = effectiveTitle.includes('Aussie Smart Energy')
      ? effectiveTitle
      : `${effectiveTitle} | Aussie Smart Energy`;

    document.title = formattedTitle;

    const effectiveDesc =
      dbSeo?.metaDescription ||
      description ||
      DEFAULT_DESCRIPTION;

    const effectiveKeywords =
      dbSeo?.focusKeyword ||
      focusKeyword ||
      keywords ||
      'solar panels Australia, SAA accredited installer, solar battery storage, Aussie Smart Energy';

    const effectiveNoIndex =
      dbSeo?.noIndex !== undefined ? dbSeo.noIndex : Boolean(noIndex);

    // Canonical calculation
    let effectiveCanonical = dbSeo?.canonicalUrl || canonical;
    if (!effectiveCanonical) {
      effectiveCanonical = `${BASE_URL}${cleanPath(location.pathname)}`;
    } else if (!effectiveCanonical.startsWith('http')) {
      effectiveCanonical = `${BASE_URL}${effectiveCanonical}`;
    }

    // Open Graph & Twitter Card values
    const effectiveOgTitle =
      dbSeo?.ogTitle ||
      ogTitle ||
      formattedTitle;

    const effectiveOgDesc =
      dbSeo?.ogDescription ||
      ogDescription ||
      effectiveDesc;

    let effectiveOgImage =
      dbSeo?.ogImage ||
      ogImage ||
      DEFAULT_IMAGE;

    if (!effectiveOgImage.startsWith('http')) {
      effectiveOgImage = `${BASE_URL}${effectiveOgImage.startsWith('/') ? '' : '/'}${effectiveOgImage}`;
    }

    // Helper to set/update meta tag
    const setMetaTag = (attribute, name, content) => {
      if (content === undefined || content === null) return;
      let el = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', effectiveDesc);
    if (effectiveKeywords) {
      setMetaTag('name', 'keywords', effectiveKeywords);
    }

    // 3. Robots Indexing Directive
    const robotsContent = effectiveNoIndex ? 'noindex, nofollow' : 'index, follow';
    setMetaTag('name', 'robots', robotsContent);

    // 4. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', effectiveCanonical);

    // 5. OpenGraph Meta Tags
    setMetaTag('property', 'og:title', effectiveOgTitle);
    setMetaTag('property', 'og:description', effectiveOgDesc);
    setMetaTag('property', 'og:image', effectiveOgImage);
    setMetaTag('property', 'og:url', effectiveCanonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Aussie Smart Energy');

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', effectiveOgTitle);
    setMetaTag('name', 'twitter:description', effectiveOgDesc);
    setMetaTag('name', 'twitter:image', effectiveOgImage);

    // 7. JSON-LD Structured Data
    const scriptId = 'seo-structured-data';
    let scriptEl = document.getElementById(scriptId);

    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      const schemaData = Array.isArray(schema)
        ? { '@context': 'https://schema.org', '@graph': schema }
        : schema;
      scriptEl.textContent = JSON.stringify(schemaData);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [
    dbSeo,
    title,
    description,
    keywords,
    focusKeyword,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    noIndex,
    schema,
    location.pathname,
  ]);

  return null;
};

export default SEO;
