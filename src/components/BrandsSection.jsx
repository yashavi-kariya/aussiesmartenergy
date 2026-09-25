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
import alphaESS from '../assets/brand/alphaESS.jpg';
import foxess from '../assets/brand/foxess.jpg';
import longi from '../assets/brand/longi.svg';
import sigenergy from '../assets/brand/sigenergy-logo.png';

const brands = [
  { id: 'brand1',    image: brand1    },
  { id: 'brand2',    image: brand2    },
  { id: 'brand3',    image: brand3    },
  { id: 'brand4',    image: brand4    },
  { id: 'brand5',    image: brand5    },
  { id: 'brand6',    image: brand6    },
  { id: 'brand7',    image: brand7    },
  { id: 'brand8',    image: brand8    },
  { id: 'brand9',    image: brand9    },
  { id: 'brand10',   image: brand10   },
  { id: 'alphaESS',  image: alphaESS  },
  { id: 'foxess',    image: foxess    },
  { id: 'longi',     image: longi     },
  { id: 'sigenergy', image: sigenergy },
];

const BrandsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Duplicate brands for seamless infinite scroll
  const duplicateBrands = [...brands, ...brands];

  return (
    <section ref={ref} id="brands" className="w-full bg-white overflow-hidden py-6 md:py-8">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .brands-carousel {
          animation: scroll 40s linear infinite;
        }
        .brands-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Heading with decorative line and star */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center px-4 mb-5"
      >
        <div className="flex items-center justify-center space-x-3 mb-1">
          <div className="flex-1 max-w-[120px] md:max-w-[200px] h-0.5 bg-red-400"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 tracking-tight whitespace-nowrap">
            Brands we offer
          </h2>
          <div className="flex-1 max-w-[120px] md:max-w-[200px] h-0.5 bg-red-400"></div>
        </div>
        <div className="flex justify-center mt-1">
          <span className="text-red-600 text-2xl leading-none">★</span>
        </div>
      </motion.div>

      {/* Auto-Scrolling Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full"
      >
        {/* Scrolling Container - Full Width */}
        <div className="w-full bg-slate-50 py-4 overflow-hidden">
          <div className="flex w-max gap-8 sm:gap-12 md:gap-16 lg:gap-20 brands-carousel items-center">
            {duplicateBrands.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="flex-shrink-0 flex items-center justify-center px-2"
              >
                <img
                  src={brand.image}
                  alt={brand.id}
                  className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[260px] object-contain hover:scale-110 transition-transform duration-300 filter drop-shadow-sm hover:drop-shadow-md cursor-pointer"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BrandsSection;
