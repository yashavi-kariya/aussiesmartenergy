import ModernHeroSection from '../components/ModernHeroSection'
import ApprovedSellerBanner from '../components/ApprovedSellerBanner'
import ProjectsSection from '../components/ProjectsSection'
import SavingsPromoSection from '../components/SavingsPromoSection'
import TestimonialsFAQSection from '../components/TestimonialsFAQSection'
import BrandsSection from '../components/BrandsSection'
import SEO from '../components/SEO'
import { getOrganizationSchema, getFaqSchema } from '../utils/seoSchemas'

const HOME_FAQS = [
  {
    q: 'What are the benefits of solar?',
    a: 'Solar energy significantly reduces your electricity bills, lowers your carbon footprint, increases property value, and provides energy independence. With government rebates, payback periods are faster than ever.'
  },
  {
    q: 'How much can I save with solar?',
    a: 'Savings vary based on system size and usage, but most households save $1,500–$4,000 per year. Many customers reduce their electricity bills by up to 90% after installation.'
  },
  {
    q: 'How do solar rebates work?',
    a: 'The federal government offers Small-scale Technology Certificates (STCs) which provide an upfront discount on your system. State-based rebates and interest-free loans may also apply depending on your location.'
  },
  {
    q: 'How long does installation take?',
    a: 'Most residential solar installations take up to 10 hours or just one day. Connection approvals and paperwork take 2–4 weeks, which our team manages entirely on your behalf.'
  },
  {
    q: 'Is my roof suitable for solar?',
    a: 'Most roofs in good structural condition are suitable. North-facing roofs perform best, but east/west-facing roofs also work well. We conduct a free site assessment to determine suitability.'
  },
  {
    q: 'Can I add a solar battery if I already have solar panels installed?',
    a: 'Yes, absolutely. You can install a storage battery to an existing solar setup, but your options will depend heavily on the type of inverter your system currently uses.'
  }
];

const Home = () => {
  const orgSchema = getOrganizationSchema();
  const faqSchema = getFaqSchema(HOME_FAQS);

  return (
    <main>
      <SEO
        title="Aussie Smart Energy | SAA Accredited Solar & Battery Systems Australia"
        description="Save up to 90% on electricity bills with Aussie Smart Energy. SAA accredited solar installers in Sydney NSW, Brisbane QLD & Melbourne VIC. Claim government solar rebates today."
        keywords="solar panels Australia, solar installer Sydney, 6.6kW solar system NSW, solar battery rebate, commercial solar, SAA accredited installer, Aussie Smart Energy"
        canonical="/"
        schema={[orgSchema, faqSchema]}
      />
      {/* 1. Hero with embedded dark feature banner */}
      <ModernHeroSection />
      {/* 2. New Energy Tech Approved Seller Banner */}
      <ApprovedSellerBanner />
      {/* 3. Featured Projects */}
      <ProjectsSection />
      {/* 4. Savings promo — rebates + payment plans */}
      <SavingsPromoSection />
      {/* 5. FAQ + Video side-by-side & Google Reviews */}
      <TestimonialsFAQSection />
      {/* 6. Brands strip */}
      <BrandsSection />
    </main>
  )
}
export default Home;