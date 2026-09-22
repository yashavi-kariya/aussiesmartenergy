import ModernHeroSection from '../components/ModernHeroSection'
import ApprovedSellerBanner from '../components/ApprovedSellerBanner'
import ProjectsSection from '../components/ProjectsSection'
import SavingsPromoSection from '../components/SavingsPromoSection'
import TestimonialsFAQSection from '../components/TestimonialsFAQSection'
import BrandsSection from '../components/BrandsSection'

const Home = () => {
  return (
    <main>
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