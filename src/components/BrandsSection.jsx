import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import brand1 from '../assets/brand/1.png';
import brand2 from '../assets/brand/2.png';
import brand3 from '../assets/brand/3.png';
import brand4 from '../assets/brand/4.png';
import brand5 from '../assets/brand/5.png';
import brand6 from '../assets/brand/6.png';
import brand7 from '../assets/brand/7.png';
import brand8 from '../assets/brand/8.png';
import brand9 from '../assets/brand/9.png';
import brand10 from '../assets/brand/10.png';

const brands = [
  { id: 'brand1', image: brand1 },
  { id: 'brand2', image: brand2 },
  { id: 'brand3', image: brand3 },
  { id: 'brand4', image: brand4 },
  { id: 'brand5', image: brand5 },
  { id: 'brand6', image: brand6 },
  { id: 'brand7', image: brand7 },
  { id: 'brand8', image: brand8 },
  { id: 'brand9', image: brand9 },
  { id: 'brand10', image: brand10 },
];

const BrandsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Duplicate brands for seamless infinite scroll
  const duplicateBrands = [...brands, ...brands];

  return (
    <section ref={ref} id="brands" className="w-full bg-white overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-10 * (13rem + 2rem)));
          }
        }
        .brands-carousel {
          animation: scroll 80s linear infinite;
        }
      `}</style>

      {/* Heading with decorative line and star */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center py-4 px-4"
      >
        <div className="flex items-center justify-center space-x-3 mb-1">
          <div className="flex-1 h-0.5 bg-red-400"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 tracking-tight whitespace-nowrap">
            Brands we offer
          </h2>
          <div className="flex-1 h-0.5 bg-red-400"></div>
        </div>
        <div className="flex justify-center mt-1">
          <span className="text-red-600 text-2xl">★</span>
        </div>
      </motion.div>

      {/* Auto-Scrolling Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full"
      >
        {/* Scrolling Container - Full Width */}
        <div className="w-full bg-slate-50 py-6 overflow-hidden">
          <div className="flex gap-8 md:gap-12 lg:gap-16 brands-carousel">
            {duplicateBrands.map((brand, i) => (
              <motion.div
                key={`${brand.id}-${i}`}
                className="flex-shrink-0 w-48 md:w-56 lg:w-64 h-32 md:h-40 flex items-center justify-center"
                whileHover={{
                  scale: 1.08,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={brand.image}
                    alt={brand.id}
                    className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300 filter drop-shadow-sm hover:drop-shadow-md"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decorative bar - Full Width */}
        <div className="w-full h-3 md:h-4 bg-gradient-to-r from-red-200 via-red-300 to-red-200"></div>
      </motion.div>
    </section>
  );
};

export default BrandsSection;
