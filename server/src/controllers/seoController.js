import mongoose from 'mongoose';
import PageSeo from '../models/PageSeo.js';
import Project from '../models/Project.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const SITE_URL = 'https://aussiesmartenergy.com.au';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Master catalog of static and standard website pages with their default production-grade SEO configurations.
 */
export const DEFAULT_PAGE_SEO_CATALOG = [
  {
    pageKey: 'home',
    routePath: '/',
    pageName: 'Homepage',
    category: 'main',
    seoTitle: 'Aussie Smart Energy | SAA Accredited Solar & Battery Systems Australia',
    metaDescription:
      'Save up to 90% on electricity bills with Aussie Smart Energy. SAA-accredited solar installers in Sydney NSW, Brisbane QLD & Melbourne VIC. Claim government solar rebates today.',
    focusKeyword: 'solar panels Australia',
    canonicalUrl: `${SITE_URL}/`,
    ogTitle: 'Aussie Smart Energy | SAA Accredited Solar & Battery Systems Australia',
    ogDescription:
      'Save up to 90% on energy bills with SAA-accredited residential & commercial solar panel and battery installations across NSW, QLD, and VIC.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'HomeAndConstructionBusiness',
  },
  {
    pageKey: 'about',
    routePath: '/about',
    pageName: 'About Us',
    category: 'main',
    seoTitle: 'About Aussie Smart Energy | SAA Accredited Solar Clean Energy Leaders',
    metaDescription:
      'Discover Aussie Smart Energy. Australian-owned, SAA accredited clean energy retailer dedicated to top-tier solar engineering, battery storage, and sustainable power.',
    focusKeyword: 'about Aussie Smart Energy',
    canonicalUrl: `${SITE_URL}/about`,
    ogTitle: 'About Aussie Smart Energy | Clean Energy Retailer Australia',
    ogDescription:
      'Meet Aussie Smart Energy — SAA accredited solar professionals committed to reducing carbon footprints and power bills for Australian families and businesses.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Organization',
  },
  {
    pageKey: 'contact',
    routePath: '/contact',
    pageName: 'Contact Us',
    category: 'main',
    seoTitle: 'Contact Aussie Smart Energy | Get a Free Solar & Battery Quote',
    metaDescription:
      'Contact Aussie Smart Energy for free solar assessments, battery rebate queries, and custom installations in Sydney, Brisbane, and Melbourne. Call 1300 959 170.',
    focusKeyword: 'contact solar installer Australia',
    canonicalUrl: `${SITE_URL}/contact`,
    ogTitle: 'Contact Aussie Smart Energy | Fast Solar Quotes & Support',
    ogDescription:
      'Speak with our solar engineers today. Call 1300 959 170 or request an online callback for personalized residential and commercial energy savings.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'ContactPage',
  },
  {
    pageKey: 'nsw-calculator',
    routePath: '/nsw-calculator',
    pageName: 'NSW Solar Savings Calculator',
    category: 'calculator',
    seoTitle: 'NSW Solar & Battery Savings Calculator | Estimate Payback & Rebates',
    metaDescription:
      'Calculate your solar savings, battery payback period, and NSW government solar battery incentives with Aussie Smart Energy free online estimator.',
    focusKeyword: 'NSW solar calculator',
    canonicalUrl: `${SITE_URL}/nsw-calculator`,
    ogTitle: 'NSW Solar & Battery Calculator | Aussie Smart Energy',
    ogDescription:
      'Estimate your household or commercial solar savings and battery payback period in minutes with our accurate NSW solar calculator.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'WebApplication',
  },
  {
    pageKey: 'solar-6kw',
    routePath: '/solar/6.6kw',
    pageName: '6.6kW Solar Panel System',
    category: 'solar',
    seoTitle: '6.6kW Solar Panel System Sydney & NSW | Aussie Smart Energy',
    metaDescription:
      'Australia most popular 6.6kW solar system with 14 Tier-1 panels and 5kW inverter. Generates 24-26 kWh/day to maximize power bill savings. Request a free quote.',
    focusKeyword: '6.6kW solar system NSW',
    canonicalUrl: `${SITE_URL}/solar/6.6kw`,
    ogTitle: '6.6kW Residential Solar Power Package | Aussie Smart Energy',
    ogDescription:
      'Get maximum return with our 6.6kW solar package. Tier-1 high efficiency solar panels, smart inverter, full installation, and government STC rebate discount.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'solar-10kw',
    routePath: '/solar/10kw',
    pageName: '10kW Solar Panel System',
    category: 'solar',
    seoTitle: '10kW Solar Panel System Australia | Aussie Smart Energy',
    metaDescription:
      'Premium 10kW residential & commercial solar system. Ideal for high energy households, ducted AC, and EV charging. Generates 40-44 kWh/day. Claim rebates now.',
    focusKeyword: '10kW solar system',
    canonicalUrl: `${SITE_URL}/solar/10kw`,
    ogTitle: '10kW High Capacity Solar System | Aussie Smart Energy',
    ogDescription:
      'Power high-consumption homes and small businesses with our premium 10kW solar system. Generates 40+ kWh daily for maximum bill reduction.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'solar-13kw',
    routePath: '/solar/13.2kw',
    pageName: '13.2kW Solar Panel System',
    category: 'solar',
    seoTitle: '13.2kW Solar Power System | Aussie Smart Energy Australia',
    metaDescription:
      'Top-tier 13.2kW solar panel package for large Australian homes and commercial facilities. Generates up to 55 kWh daily with high efficiency N-type panels.',
    focusKeyword: '13.2kW solar package',
    canonicalUrl: `${SITE_URL}/solar/13.2kw`,
    ogTitle: '13.2kW Solar Power System | Aussie Smart Energy',
    ogDescription:
      'Supercharge your clean energy independence with a 13.2kW high-output solar installation. SAA accredited engineering and 25-year panel performance warranty.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'solar-15kw',
    routePath: '/solar/15kw',
    pageName: '15kW Solar Panel System',
    category: 'solar',
    seoTitle: '15kW Solar Power System | Commercial & Large Residential Solar',
    metaDescription:
      'Engineered 15kW solar system designed for three-phase properties, rural properties, and businesses. High daily energy generation and rapid ROI.',
    focusKeyword: '15kW solar system',
    canonicalUrl: `${SITE_URL}/solar/15kw`,
    ogTitle: '15kW Solar Power System | Aussie Smart Energy',
    ogDescription:
      'Robust 15kW solar power system for large residential and light commercial sites. Clean renewable power with smart inverter analytics.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'solar-20kw',
    routePath: '/solar/20kw',
    pageName: '20kW Commercial Solar System',
    category: 'commercial',
    seoTitle: '20kW Commercial Solar System Australia | Aussie Smart Energy',
    metaDescription:
      'Commercial 20kW solar power solution engineered to slash business electricity overheads across Sydney NSW, Brisbane QLD & Melbourne VIC.',
    focusKeyword: '20kW commercial solar',
    canonicalUrl: `${SITE_URL}/solar/20kw`,
    ogTitle: '20kW Commercial Solar Installation | Aussie Smart Energy',
    ogDescription:
      'Reliable 20kW commercial rooftop solar installations with commercial-grade warranties and instant asset write-off tax benefits.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'solar-30kw',
    routePath: '/solar/30kw',
    pageName: '30kW Commercial Solar System',
    category: 'commercial',
    seoTitle: '30kW Commercial Solar Power Systems | Aussie Smart Energy',
    metaDescription:
      'Scale your corporate energy savings with a 30kW commercial solar installation. High yield, three-phase commercial inverters, and full engineering support.',
    focusKeyword: '30kW commercial solar system',
    canonicalUrl: `${SITE_URL}/solar/30kw`,
    ogTitle: '30kW Commercial Solar Installation | Aussie Smart Energy',
    ogDescription:
      'Empower your enterprise with sustainable 30kW solar energy. SAA accredited commercial installers in Sydney, Brisbane, and Melbourne.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'solar-50kw',
    routePath: '/solar/50kw',
    pageName: '50kW Commercial Solar System',
    category: 'commercial',
    seoTitle: '50kW Commercial Solar System | Enterprise Clean Energy Australia',
    metaDescription:
      'High-performance 50kW commercial solar PV system for manufacturing, warehouses, and office parks. Significantly reduce daytime energy tariffs.',
    focusKeyword: '50kW commercial solar',
    canonicalUrl: `${SITE_URL}/solar/50kw`,
    ogTitle: '50kW Commercial Solar PV System | Aussie Smart Energy',
    ogDescription:
      'Turn rooftop space into substantial power savings with a 50kW turnkey commercial solar system from Aussie Smart Energy.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'solar-100kw',
    routePath: '/solar/100kw',
    pageName: '100kW+ Commercial Solar System',
    category: 'commercial',
    seoTitle: '100kW+ Commercial Solar System | Industrial Solar Australia',
    metaDescription:
      'Engineered 100kW+ industrial and commercial solar installations. Large-scale solar engineering, grid connection approvals, and rapid capital payback.',
    focusKeyword: '100kW commercial solar',
    canonicalUrl: `${SITE_URL}/solar/100kw`,
    ogTitle: '100kW+ Industrial & Commercial Solar | Aussie Smart Energy',
    ogDescription:
      'Custom 100kW+ commercial solar systems engineered to power Australian industry with high returns and clean energy certifications.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'solar-commercial',
    routePath: '/solar/commercial',
    pageName: 'Commercial Solar Hub',
    category: 'commercial',
    seoTitle: 'Commercial Solar Power Solutions Australia | Aussie Smart Energy',
    metaDescription:
      'Turnkey commercial solar systems from 20kW to 100kW+. Cut business operating costs, lock in low electricity rates, and leverage tax depreciation.',
    focusKeyword: 'commercial solar solutions Australia',
    canonicalUrl: `${SITE_URL}/solar/commercial`,
    ogTitle: 'Commercial Solar Solutions | Aussie Smart Energy',
    ogDescription:
      'Engineered commercial solar solutions for Australian businesses. Guaranteed performance, rapid payback, and full grid connection support.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Service',
  },
  {
    pageKey: 'commercial-customize',
    routePath: '/commercial/customize',
    pageName: 'Commercial Solar Customizer',
    category: 'commercial',
    seoTitle: 'Custom Commercial Solar Design | Aussie Smart Energy',
    metaDescription:
      'Request a tailored commercial solar and battery storage system designed specifically for your corporate facility, roof structure, and load profile.',
    focusKeyword: 'custom commercial solar design',
    canonicalUrl: `${SITE_URL}/commercial/customize`,
    ogTitle: 'Custom Commercial Solar Design | Aussie Smart Energy',
    ogDescription:
      'Tailor-made solar + battery configurations for commercial properties across NSW, QLD, and VIC.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Service',
  },
  {
    pageKey: 'batteries-landing',
    routePath: '/batteries/solar-system-with-batteries',
    pageName: 'Solar Systems with Batteries',
    category: 'batteries',
    seoTitle: 'Solar Panel Systems with Battery Storage | Aussie Smart Energy',
    metaDescription:
      'Combine premium solar panels with home battery storage to achieve 24/7 solar power, black-out blackout protection, and government battery rebates.',
    focusKeyword: 'solar system with battery storage',
    canonicalUrl: `${SITE_URL}/batteries/solar-system-with-batteries`,
    ogTitle: 'Solar Panels with Battery Storage | Aussie Smart Energy',
    ogDescription:
      'Store excess daytime solar power for night use. SAA accredited solar and battery storage packages with blackout backup protection.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'battery-sigenergy',
    routePath: '/batteries/sigenergy',
    pageName: 'Sigenergy SigenStor 5-in-1 Battery',
    category: 'batteries',
    seoTitle: 'Sigenergy SigenStor Solar & Battery System | Aussie Smart Energy',
    metaDescription:
      'Explore the revolutionary Sigenergy SigenStor 5-in-1 energy storage system. AI-driven solar inverter, battery storage, and EV charging in a modular tower.',
    focusKeyword: 'Sigenergy SigenStor Australia',
    canonicalUrl: `${SITE_URL}/batteries/sigenergy`,
    ogTitle: 'Sigenergy SigenStor 5-in-1 Energy Storage | Aussie Smart Energy',
    ogDescription:
      'The world first 5-in-1 energy storage system combining solar inverter, EV DC fast charger, battery PCS, battery pack, and EMS.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'battery-fox-ess',
    routePath: '/batteries/fox-ess',
    pageName: 'Fox ESS Battery Storage',
    category: 'batteries',
    seoTitle: 'Fox ESS Solar Battery Storage Systems | Aussie Smart Energy',
    metaDescription:
      'Premium Fox ESS all-in-one and modular home battery storage solutions. High voltage performance, 90% DoD, and comprehensive 10-year warranty.',
    focusKeyword: 'Fox ESS battery Australia',
    canonicalUrl: `${SITE_URL}/batteries/fox-ess`,
    ogTitle: 'Fox ESS Solar Batteries | Aussie Smart Energy',
    ogDescription:
      'Engineered Fox ESS solar batteries delivering reliable domestic energy independence and blackout protection.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'battery-goodwe',
    routePath: '/batteries/goodwe',
    pageName: 'GoodWe Energy Storage',
    category: 'batteries',
    seoTitle: 'GoodWe Solar Batteries & Inverters | Aussie Smart Energy',
    metaDescription:
      'Reliable GoodWe Lynx home battery storage systems and hybrid inverters. Safe LFP chemistry, expandable storage, and seamless UPS backup.',
    focusKeyword: 'GoodWe battery storage Australia',
    canonicalUrl: `${SITE_URL}/batteries/goodwe`,
    ogTitle: 'GoodWe Solar Battery Solutions | Aussie Smart Energy',
    ogDescription:
      'High-voltage lithium GoodWe batteries engineered for Australian conditions with intelligent energy management.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'battery-alpha-ess',
    routePath: '/batteries/alpha-ess',
    pageName: 'Alpha ESS Battery Storage',
    category: 'batteries',
    seoTitle: 'Alpha ESS Solar Battery Systems | Aussie Smart Energy',
    metaDescription:
      'Affordable, expandable Alpha ESS home battery storage systems. Smart VPP ready, uninterrupted power supply, and SAA accredited installation.',
    focusKeyword: 'Alpha ESS battery Australia',
    canonicalUrl: `${SITE_URL}/batteries/alpha-ess`,
    ogTitle: 'Alpha ESS Solar Batteries | Aussie Smart Energy',
    ogDescription:
      'Cut reliance on grid power with Alpha ESS residential and commercial energy storage packages.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'battery-sofar',
    routePath: '/batteries/sofar',
    pageName: 'SOFAR Solar Battery Systems',
    category: 'batteries',
    seoTitle: 'SOFAR Solar Battery Storage Solutions | Aussie Smart Energy',
    metaDescription:
      'High-performance SOFAR solar batteries and hybrid inverters with plug-and-play modular design, high safety standards, and reliable backup power.',
    focusKeyword: 'SOFAR battery storage',
    canonicalUrl: `${SITE_URL}/batteries/sofar`,
    ogTitle: 'SOFAR Solar Energy Storage | Aussie Smart Energy',
    ogDescription:
      'SOFAR battery systems engineered for flexible residential energy independence and smart grid interaction.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'battery-pylontech',
    routePath: '/batteries/pylontech',
    pageName: 'Pylontech Solar Batteries',
    category: 'batteries',
    seoTitle: 'Pylontech Solar Battery Storage Systems | Aussie Smart Energy',
    metaDescription:
      'Pylontech lithium iron phosphate (LiFePO4) solar batteries with proven track record, 6,000+ cycle life, and scalable modular capacity.',
    focusKeyword: 'Pylontech solar battery',
    canonicalUrl: `${SITE_URL}/batteries/pylontech`,
    ogTitle: 'Pylontech Solar Battery Storage | Aussie Smart Energy',
    ogDescription:
      'Industry-proven Pylontech battery storage systems for residential solar energy backup across Australia.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'battery-esy',
    routePath: '/batteries/esy',
    pageName: 'ESY Sunhome Battery Storage',
    category: 'batteries',
    seoTitle: 'ESY Sunhome Solar Battery Storage | Aussie Smart Energy',
    metaDescription:
      'Smart ESY Sunhome all-in-one energy storage systems. Sleek residential aesthetic, IP65 weather rating, and integrated cloud energy monitoring.',
    focusKeyword: 'ESY Sunhome battery',
    canonicalUrl: `${SITE_URL}/batteries/esy`,
    ogTitle: 'ESY Sunhome All-in-One Solar Battery | Aussie Smart Energy',
    ogDescription:
      'Modern, modular ESY Sunhome energy storage solutions installed by SAA accredited technicians.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: false,
    structuredDataType: 'Product',
  },
  {
    pageKey: 'pay-online',
    routePath: '/pay-online',
    pageName: 'Pay Online',
    category: 'utility',
    seoTitle: 'Pay Online & Invoice Settlement | Aussie Smart Energy',
    metaDescription:
      'Securely pay your Aussie Smart Energy solar installation deposit or invoice online via ANZ Worldline hosted payment gateway.',
    focusKeyword: 'pay solar invoice online',
    canonicalUrl: `${SITE_URL}/pay-online`,
    ogTitle: 'Secure Online Payment Portal | Aussie Smart Energy',
    ogDescription:
      'Encrypted payment portal for Aussie Smart Energy customers powered by ANZ Worldline.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true, // Utility transactional page should not clutter search indexes
    structuredDataType: '',
  },
];

/**
 * Normalizes route path by removing trailing slash (except root) and query strings.
 */
const normalizePath = (path = '') => {
  if (!path || path === '/') return '/';
  const clean = path.split('?')[0].split('#')[0].toLowerCase();
  return clean.endsWith('/') ? clean.slice(0, -1) : clean;
};

/**
 * Route alias mapping to resolve alias URLs to their canonical catalog page.
 */
const ROUTE_ALIASES = {
  '/solar/10.45kw': 'solar-10kw',
  '/solar/10.5kw': 'solar-10kw',
  '/solar/13.3kw': 'solar-13kw',
  '/solar/13kw': 'solar-13kw',
  '/solar/commercial/20kw': 'solar-20kw',
  '/solar/commercial/30kw': 'solar-30kw',
  '/solar/commercial/50kw': 'solar-50kw',
  '/solar/commercial/100kw': 'solar-100kw',
  '/solar/commercial/nsw-calculator': 'nsw-calculator',
  '/batteries/foxess': 'battery-fox-ess',
  '/batteries/SOFAR': 'battery-sofar',
  '/batteries/sofar': 'battery-sofar',
  '/batteries/sopher': 'battery-sofar',
  '/batteries/alphaess': 'battery-alpha-ess',
  '/make-payment': 'pay-online',
};

/**
 * Helper to find default catalog entry by pageKey or routePath.
 */
export const findCatalogDefault = (identifier = '') => {
  if (!identifier) return null;
  const trimmed = identifier.trim();

  // Try direct pageKey match
  let match = DEFAULT_PAGE_SEO_CATALOG.find((item) => item.pageKey === trimmed);
  if (match) return match;

  // Try alias mapping
  const normalized = normalizePath(trimmed);
  if (ROUTE_ALIASES[normalized]) {
    match = DEFAULT_PAGE_SEO_CATALOG.find((item) => item.pageKey === ROUTE_ALIASES[normalized]);
    if (match) return match;
  }

  // Try routePath match
  match = DEFAULT_PAGE_SEO_CATALOG.find((item) => normalizePath(item.routePath) === normalized);
  return match || null;
};

/**
 * GET /api/seo
 * Retrieves all configurable pages (combining default catalog + database overrides + dynamic projects).
 */
export const getAllPagesSeo = async (req, res, next) => {
  try {
    const isDbReady = mongoose.connection.readyState === 1;
    const savedRecords = isDbReady ? await PageSeo.find({}).lean() : [];
    const savedMap = new Map(savedRecords.map((r) => [r.pageKey, r]));

    // 1. Process static catalog pages
    const staticPages = DEFAULT_PAGE_SEO_CATALOG.map((catalogItem) => {
      const saved = savedMap.get(catalogItem.pageKey);
      return {
        ...catalogItem,
        isCustomized: Boolean(saved),
        seoTitle: saved?.seoTitle || catalogItem.seoTitle,
        metaDescription: saved?.metaDescription || catalogItem.metaDescription,
        focusKeyword: saved?.focusKeyword || catalogItem.focusKeyword,
        canonicalUrl: saved?.canonicalUrl || catalogItem.canonicalUrl,
        ogTitle: saved?.ogTitle || catalogItem.ogTitle,
        ogDescription: saved?.ogDescription || catalogItem.ogDescription,
        ogImage: saved?.ogImage || catalogItem.ogImage,
        noIndex: saved?.noIndex !== undefined ? saved.noIndex : catalogItem.noIndex,
        updatedAt: saved?.updatedAt || null,
        defaultValues: { ...catalogItem },
      };
    });

    // 2. Fetch active projects from database
    const projects = isDbReady
      ? await Project.find({ deletedFromAdmin: { $ne: true } })
          .select('name slug shortDescription mainImage seoTitle metaDescription focusKeyword canonicalUrl ogTitle ogDescription ogImage noIndex updatedAt')
          .lean()
      : [];

    const projectPages = projects.map((proj) => {
      const defaultTitle = `${proj.name} | Aussie Smart Energy Showcase`;
      const defaultDesc =
        proj.shortDescription ||
        `Solar installation project details and showcase by Aussie Smart Energy.`;
      const defaultCanonical = `${SITE_URL}/projects/${proj.slug}`;
      const defaultOgImage = proj.mainImage || DEFAULT_OG_IMAGE;

      return {
        pageKey: `project-${proj.slug}`,
        projectId: proj._id,
        routePath: `/projects/${proj.slug}`,
        pageName: `Project: ${proj.name}`,
        category: 'projects',
        isCustomized: Boolean(proj.seoTitle || proj.metaDescription || proj.focusKeyword),
        seoTitle: proj.seoTitle || defaultTitle,
        metaDescription: proj.metaDescription || defaultDesc,
        focusKeyword: proj.focusKeyword || proj.name,
        canonicalUrl: proj.canonicalUrl || defaultCanonical,
        ogTitle: proj.ogTitle || proj.seoTitle || defaultTitle,
        ogDescription: proj.ogDescription || proj.metaDescription || defaultDesc,
        ogImage: proj.ogImage || defaultOgImage,
        noIndex: Boolean(proj.noIndex),
        updatedAt: proj.updatedAt || null,
        defaultValues: {
          seoTitle: defaultTitle,
          metaDescription: defaultDesc,
          focusKeyword: proj.name,
          canonicalUrl: defaultCanonical,
          ogTitle: defaultTitle,
          ogDescription: defaultDesc,
          ogImage: defaultOgImage,
          noIndex: false,
        },
      };
    });

    return successResponse(
      res,
      {
        pages: [...staticPages, ...projectPages],
        catalogCount: staticPages.length,
        projectCount: projectPages.length,
      },
      'SEO pages retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/seo/:pageKeyOrRoute
 * Lookup SEO metadata for a single route or pageKey.
 */
export const getPageSeo = async (req, res, next) => {
  try {
    const rawKey = req.params.pageKey || req.query.path || 'home';
    const cleanKey = decodeURIComponent(rawKey).trim();
    const isDbReady = mongoose.connection.readyState === 1;

    // 1. Check if this is a project route
    if (cleanKey.startsWith('project-') || cleanKey.startsWith('/projects/')) {
      const slug = cleanKey.replace('project-', '').replace('/projects/', '').replace(/^\/+/, '');
      const project = isDbReady
        ? await Project.findOne({ slug, deletedFromAdmin: { $ne: true } }).lean()
        : null;

      if (!project) {
        return errorResponse(res, 'Project not found for SEO lookup', 404);
      }

      const defaultTitle = `${project.name} | Aussie Smart Energy Showcase`;
      const defaultDesc =
        project.shortDescription ||
        `Solar installation project details and showcase by Aussie Smart Energy.`;
      const defaultCanonical = `${SITE_URL}/projects/${project.slug}`;
      const defaultOgImage = project.mainImage || DEFAULT_OG_IMAGE;

      return successResponse(res, {
        pageKey: `project-${project.slug}`,
        projectId: project._id,
        routePath: `/projects/${project.slug}`,
        pageName: `Project: ${project.name}`,
        category: 'projects',
        seoTitle: project.seoTitle || defaultTitle,
        metaDescription: project.metaDescription || defaultDesc,
        focusKeyword: project.focusKeyword || project.name,
        canonicalUrl: project.canonicalUrl || defaultCanonical,
        ogTitle: project.ogTitle || project.seoTitle || defaultTitle,
        ogDescription: project.ogDescription || project.metaDescription || defaultDesc,
        ogImage: project.ogImage || defaultOgImage,
        noIndex: Boolean(project.noIndex),
      });
    }

    // 2. Lookup static catalog entry
    const catalogDefault = findCatalogDefault(cleanKey);
    if (!catalogDefault) {
      // Sensible fallback for unknown pages
      return successResponse(res, {
        pageKey: 'fallback',
        routePath: cleanKey.startsWith('/') ? cleanKey : `/${cleanKey}`,
        pageName: 'Aussie Smart Energy',
        seoTitle: 'Aussie Smart Energy | Solar & Battery Solutions Australia',
        metaDescription:
          'Aussie Smart Energy is an SAA accredited solar installer providing premium solar panels and battery storage solutions across Australia.',
        focusKeyword: 'solar panels Australia',
        canonicalUrl: `${SITE_URL}${cleanKey.startsWith('/') ? cleanKey : `/${cleanKey}`}`,
        ogTitle: 'Aussie Smart Energy | Solar & Battery Solutions Australia',
        ogDescription:
          'Aussie Smart Energy is an SAA accredited solar installer providing premium solar panels and battery storage solutions across Australia.',
        ogImage: DEFAULT_OG_IMAGE,
        noIndex: false,
      });
    }

    // 3. Check for database override
    const saved = isDbReady
      ? await PageSeo.findOne({ pageKey: catalogDefault.pageKey }).lean()
      : null;

    return successResponse(res, {
      pageKey: catalogDefault.pageKey,
      routePath: catalogDefault.routePath,
      pageName: catalogDefault.pageName,
      category: catalogDefault.category,
      seoTitle: saved?.seoTitle || catalogDefault.seoTitle,
      metaDescription: saved?.metaDescription || catalogDefault.metaDescription,
      focusKeyword: saved?.focusKeyword || catalogDefault.focusKeyword,
      canonicalUrl: saved?.canonicalUrl || catalogDefault.canonicalUrl,
      ogTitle: saved?.ogTitle || catalogDefault.ogTitle,
      ogDescription: saved?.ogDescription || catalogDefault.ogDescription,
      ogImage: saved?.ogImage || catalogDefault.ogImage,
      noIndex: saved?.noIndex !== undefined ? saved.noIndex : catalogDefault.noIndex,
      isCustomized: Boolean(saved),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/seo/:pageKey
 * Admin updates SEO settings for a page or project.
 */
export const updatePageSeo = async (req, res, next) => {
  try {
    const rawKey = req.params.pageKey.trim();
    const {
      seoTitle,
      metaDescription,
      focusKeyword,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      noIndex,
    } = req.body;

    const isNoIndex = noIndex === true || noIndex === 'true';

    // 1. If project update
    if (rawKey.startsWith('project-')) {
      const slug = rawKey.replace('project-', '');
      const project = await Project.findOne({ slug });
      if (!project) return errorResponse(res, 'Project not found', 404);

      if (seoTitle !== undefined) project.seoTitle = seoTitle.trim();
      if (metaDescription !== undefined) project.metaDescription = metaDescription.trim();
      if (focusKeyword !== undefined) project.focusKeyword = focusKeyword.trim();
      if (canonicalUrl !== undefined) project.canonicalUrl = canonicalUrl.trim();
      if (ogTitle !== undefined) project.ogTitle = ogTitle.trim();
      if (ogDescription !== undefined) project.ogDescription = ogDescription.trim();
      if (ogImage !== undefined) project.ogImage = ogImage.trim();
      if (noIndex !== undefined) project.noIndex = isNoIndex;

      await project.save();
      return successResponse(res, project, 'Project SEO metadata updated successfully');
    }

    // 2. If static catalog page
    const catalogDefault = findCatalogDefault(rawKey);
    if (!catalogDefault) {
      return errorResponse(res, `Unknown page key: ${rawKey}`, 400);
    }

    const updated = await PageSeo.findOneAndUpdate(
      { pageKey: catalogDefault.pageKey },
      {
        pageKey: catalogDefault.pageKey,
        routePath: catalogDefault.routePath,
        pageName: catalogDefault.pageName,
        category: catalogDefault.category,
        seoTitle: (seoTitle || '').trim(),
        metaDescription: (metaDescription || '').trim(),
        focusKeyword: (focusKeyword || '').trim(),
        canonicalUrl: (canonicalUrl || '').trim() || catalogDefault.canonicalUrl,
        ogTitle: (ogTitle || '').trim(),
        ogDescription: (ogDescription || '').trim(),
        ogImage: (ogImage || '').trim() || catalogDefault.ogImage,
        noIndex: isNoIndex,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return successResponse(res, updated, 'Page SEO settings saved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/seo/:pageKey/reset
 * Resets a page's SEO metadata back to its catalog default.
 */
export const resetPageSeo = async (req, res, next) => {
  try {
    const rawKey = req.params.pageKey.trim();

    if (rawKey.startsWith('project-')) {
      const slug = rawKey.replace('project-', '');
      const project = await Project.findOne({ slug });
      if (!project) return errorResponse(res, 'Project not found', 404);

      project.seoTitle = '';
      project.metaDescription = '';
      project.focusKeyword = '';
      project.canonicalUrl = '';
      project.ogTitle = '';
      project.ogDescription = '';
      project.ogImage = '';
      project.noIndex = false;
      await project.save();

      return successResponse(res, project, 'Project SEO metadata reset to defaults');
    }

    await PageSeo.findOneAndDelete({ pageKey: rawKey });
    const catalogDefault = findCatalogDefault(rawKey);

    return successResponse(res, catalogDefault, 'Page SEO reset to default values');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /sitemap.xml (or /api/seo/sitemap.xml)
 * Generates dynamic XML Sitemap containing all public indexed pages + database projects.
 */
export const getDynamicSitemap = async (req, res, next) => {
  try {
    const isDbReady = mongoose.connection.readyState === 1;

    // 1. Get database page overrides to check noIndex flags
    const savedOverrides = isDbReady ? await PageSeo.find({}).lean() : [];
    const overridesMap = new Map(savedOverrides.map((r) => [r.pageKey, r]));

    // 2. Collect eligible static pages
    const xmlUrls = [];
    const now = new Date().toISOString().split('T')[0];

    for (const item of DEFAULT_PAGE_SEO_CATALOG) {
      const saved = overridesMap.get(item.pageKey);
      const isNoIndex = saved ? saved.noIndex : item.noIndex;
      if (isNoIndex) continue; // Skip noindex pages like /pay-online

      let priority = '0.8';
      let changefreq = 'weekly';

      if (item.pageKey === 'home') {
        priority = '1.0';
        changefreq = 'daily';
      } else if (item.category === 'solar' || item.category === 'batteries' || item.category === 'commercial') {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (item.category === 'calculator') {
        priority = '0.9';
        changefreq = 'weekly';
      }

      xmlUrls.push(`  <url>
    <loc>${item.canonicalUrl}</loc>
    <lastmod>${saved?.updatedAt ? new Date(saved.updatedAt).toISOString().split('T')[0] : now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
    }

    // 3. Fetch active public projects from database
    const projects = isDbReady
      ? await Project.find({
          deletedFromAdmin: { $ne: true },
          noIndex: { $ne: true },
        })
          .select('slug updatedAt')
          .lean()
      : [];

    for (const proj of projects) {
      const projectDate = proj.updatedAt ? new Date(proj.updatedAt).toISOString().split('T')[0] : now;
      xmlUrls.push(`  <url>
    <loc>${SITE_URL}/projects/${proj.slug}</loc>
    <lastmod>${projectDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls.join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache 1 hour
    return res.send(xml);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /robots.txt
 * Serves clean robots.txt with disallows and absolute sitemap reference.
 */
export const getDynamicRobots = (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /login/admin
Disallow: /hostedcheckout/
Disallow: /payment/

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.header('Cache-Control', 'public, max-age=86400');
  return res.send(robots);
};
