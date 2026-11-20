/**
 * Schema.org JSON-LD Structured Data Generators for Aussie Smart Energy
 */

export const BASE_URL = 'https://aussiesmartenergy.com.au';

/**
 * Company Organization & Multi-location LocalBusiness Schema
 */
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${BASE_URL}/#organization`,
    name: 'Aussie Smart Energy',
    alternateName: 'Aussie Smart Energy Pty Ltd',
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.png`,
    image: `${BASE_URL}/og-image.png`,
    description:
      'SAA-accredited Australian solar retailer & installer specializing in premium residential solar, commercial solar systems (20kW to 100kW+), and cutting-edge battery storage.',
    telephone: '1300 959 170',
    email: 'info@aussiesmartenergy.com.au',
    priceRange: '$$',
    openingHours: 'Mo,Tu,We,Th,Fr 08:30-17:30',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'New South Wales' },
      { '@type': 'AdministrativeArea', name: 'Queensland' },
      { '@type': 'AdministrativeArea', name: 'Victoria' }
    ],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '526/368 Sussex St',
        addressLocality: 'Sydney',
        addressRegion: 'NSW',
        postalCode: '2000',
        addressCountry: 'AU'
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '29/97 Creek St',
        addressLocality: 'Brisbane City',
        addressRegion: 'QLD',
        postalCode: '4000',
        addressCountry: 'AU'
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '117/530 Little Collins St',
        addressLocality: 'Melbourne',
        addressRegion: 'VIC',
        postalCode: '3000',
        addressCountry: 'AU'
      }
    ],
    sameAs: [
      'https://www.facebook.com/aussiesmartenergy',
      'https://www.instagram.com/aussiesmartenergy'
    ]
  };
};

/**
 * FAQPage Schema for rich snippet Q&A dropdowns in Google Search Results
 * @param {Array<{question: string, answer: string}>} faqs
 */
export const getFaqSchema = (faqs = []) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question || faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer || faq.a
      }
    }))
  };
};

/**
 * Product & Service Schema for Solar Packages & Battery Storage
 */
export const getProductSchema = ({
  name,
  description,
  image = `${BASE_URL}/og-image.png`,
  sku = '',
  brand = 'Aussie Smart Energy'
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku: sku || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    brand: {
      '@type': 'Brand',
      name: brand
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: '2990',
      highPrice: '45000',
      offerCount: '10',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Aussie Smart Energy'
      }
    }
  };
};

/**
 * BreadcrumbList Schema for Google Search snippet breadcrumb hierarchy
 */
export const getBreadcrumbSchema = (items = []) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
};

