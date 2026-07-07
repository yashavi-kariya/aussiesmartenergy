import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ----------------------------------------------------------------
   Each brand is rendered as a styled SVG / JSX logo matching the
   exact look from the reference screenshot.
---------------------------------------------------------------- */
const BrandLogos = {
  Sungrow: () => (
    <div className="flex items-center space-x-2">
      {/* Sun icon */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="6" fill="url(#sgGrad)" />
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <line
            key={i}
            x1="14" y1="14"
            x2={14 + 11 * Math.cos((deg * Math.PI) / 180)}
            y2={14 + 11 * Math.sin((deg * Math.PI) / 180)}
            stroke="url(#sgGrad)" strokeWidth="2" strokeLinecap="round"
          />
        ))}
        <defs>
          <linearGradient id="sgGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" />
            <stop offset="1" stopColor="#eab308" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-extrabold text-xl tracking-tight" style={{
        background: 'linear-gradient(135deg, #f97316, #eab308)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        SUNGROW
      </span>
    </div>
  ),

  Solis: () => (
    <div className="flex items-center space-x-2">
      {/* Green circle with sun rays */}
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="14" fill="#22c55e" />
        <circle cx="15" cy="15" r="6" fill="white" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <line
            key={i}
            x1={15 + 8 * Math.cos((deg * Math.PI) / 180)}
            y1={15 + 8 * Math.sin((deg * Math.PI) / 180)}
            x2={15 + 12 * Math.cos((deg * Math.PI) / 180)}
            y2={15 + 12 * Math.sin((deg * Math.PI) / 180)}
            stroke="white" strokeWidth="1.8" strokeLinecap="round"
          />
        ))}
      </svg>
      <span className="font-bold text-xl text-[#22c55e] tracking-tight italic">solis</span>
    </div>
  ),

  SolaX: () => (
    <div className="flex items-center space-x-1.5">
      {/* Orange X mark */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 4L24 24" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
        <path d="M24 4L4 24" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-extrabold text-lg text-slate-700 tracking-tight">SOLA</span>
        <span className="font-extrabold text-lg text-[#f97316] tracking-tight -mt-1">·X</span>
      </div>
    </div>
  ),

  Fronius: () => (
    <span className="font-extrabold text-2xl text-[#003da5] tracking-tight italic">
      Fronius
    </span>
  ),

  Growatt: () => (
    <span className="font-extrabold text-2xl text-[#1f2937] tracking-tight">
      Growatt
    </span>
  ),

  Longi: () => (
    <span className="font-extrabold text-2xl text-[#16a34a] tracking-tight uppercase">
      LONGI
    </span>
  ),
};

const brands = [
  { id: 'sungrow', Logo: BrandLogos.Sungrow },
  { id: 'solis',   Logo: BrandLogos.Solis   },
  { id: 'solax',   Logo: BrandLogos.SolaX   },
  { id: 'fronius', Logo: BrandLogos.Fronius  },
  { id: 'growatt', Logo: BrandLogos.Growatt  },
  { id: 'longi',   Logo: BrandLogos.Longi    },
];

const BrandsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section ref={ref} id="brands" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-[#39b54a] text-xs font-extrabold tracking-widest uppercase">
            TRUSTED BRANDS WE WORK WITH
          </span>
        </motion.div>

        {/* Brand Logo Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-slate-200 rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-slate-200">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                whileHover={{ backgroundColor: '#f8fafc' }}
                className="flex items-center justify-center py-8 px-6 cursor-default transition-colors"
              >
                <brand.Logo />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BrandsSection;