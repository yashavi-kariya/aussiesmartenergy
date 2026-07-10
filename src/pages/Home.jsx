import ModernHeroSection from '../components/ModernHeroSection'
import AboutSection from '../components/AboutSection'
import CommercialResidentialSection from '../components/CommercialResidentialSection'
import ProjectExecutionSection from '../components/ProjectExecutionSection'
import TestimonialsSection from '../components/TestimonialsSection'
import SavingsPromoSection from '../components/SavingsPromoSection'
import TestimonialsFAQSection from '../components/TestimonialsFAQSection'
import BrandsSection from '../components/BrandsSection'

const Home = () => {
  return (
    <main>
      {/* 1. Hero with embedded dark feature banner */}
      <ModernHeroSection />
      {/* 2. About */}
      <AboutSection />
      {/* 3. Solar Solutions toggle */}
      <CommercialResidentialSection />
      {/* 4. Our Process — 5 steps */}
      <ProjectExecutionSection />
      {/* 5. Savings promo — rebates + payment plans */}
      <SavingsPromoSection />
      <TestimonialsSection />
      {/* 6. FAQ + Video side-by-side */}
      <TestimonialsFAQSection />
      {/* 7. Brands strip */}
      <BrandsSection />
    </main>
  )
}
export default Home