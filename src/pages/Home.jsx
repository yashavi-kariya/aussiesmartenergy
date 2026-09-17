import ModernHeroSection from '../components/ModernHeroSection'
import ProjectsSection from '../components/ProjectsSection'
import SavingsPromoSection from '../components/SavingsPromoSection'
import TestimonialsFAQSection from '../components/TestimonialsFAQSection'
import BrandsSection from '../components/BrandsSection'

const Home = () => {
  return (
    <main>
      {/* 1. Hero with embedded dark feature banner */}
      <ModernHeroSection />
      {/* 2. Featured Projects */}
      <ProjectsSection />
      {/* 3. Savings promo — rebates + payment plans */}
      <SavingsPromoSection />
      {/* 4. FAQ + Video side-by-side & Google Reviews */}
      <TestimonialsFAQSection />
      {/* 5. Brands strip */}
      <BrandsSection />
    </main>
  )
}
export default Home;