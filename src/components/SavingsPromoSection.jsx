import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const SavingsPromoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section ref={ref} id="savings" className="py-8 bg-[#f4f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Card 1 — Government Rebates (dark green) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl min-h-[240px] flex items-stretch"
            style={{ background: 'linear-gradient(135deg, #1a7a44 0%, #0e4a29 60%, #0a3520 100%)' }}
          >
            {/* Decorative leaves/green circle */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/4 translate-x-1/4" />

            {/* Solar panel + coins SVG illustration */}
            <div className="absolute right-4 bottom-0 w-40 h-44 pointer-events-none select-none">
              <svg viewBox="0 0 160 180" fill="none" className="w-full h-full">
                {/* Ground/grass */}
                <ellipse cx="80" cy="162" rx="60" ry="12" fill="#15803d" opacity="0.4" />
                {/* Solar Panel */}
                <g transform="rotate(-10, 75, 80)">
                  <rect x="20" y="40" width="90" height="62" rx="4" fill="#1e3a5f" />
                  <rect x="22" y="42" width="86" height="58" rx="3" fill="#1a3a6e" />
                  {/* Panel cells */}
                  {[0,1,2].map(row => [0,1,2,3].map(col => (
                    <rect key={`${row}-${col}`} x={24 + col * 22} y={44 + row * 18} width={20} height={16} rx="1"
                      fill={`rgba(59,130,246,${0.5 + (row+col) * 0.05})`} stroke="#2563eb" strokeWidth="0.5" />
                  )))}
                  {/* Shine */}
                  <rect x="22" y="42" width="40" height="15" rx="2" fill="white" opacity="0.08" />
                </g>
                {/* Support pole */}
                <rect x="75" y="100" width="5" height="40" rx="2" fill="#374151" />
                {/* Gold coins stack */}
                <ellipse cx="108" cy="152" rx="18" ry="6" fill="#ca8a04" />
                <rect x="90" y="132" width="36" height="20" rx="2" fill="#eab308" />
                <ellipse cx="108" cy="132" rx="18" ry="6" fill="#fbbf24" />
                <rect x="90" y="116" width="36" height="18" rx="2" fill="#fcd34d" />
                <ellipse cx="108" cy="116" rx="18" ry="6" fill="#fde68a" />
                {/* Dollar signs */}
                <text x="101" y="142" fontSize="10" fill="#78350f" fontWeight="bold" fontFamily="sans-serif">$</text>
                <text x="101" y="126" fontSize="10" fill="#78350f" fontWeight="bold" fontFamily="sans-serif">$</text>
                {/* Leaf accents */}
                <circle cx="48" cy="50" r="6" fill="#22c55e" opacity="0.6" />
                <circle cx="58" cy="38" r="4" fill="#16a34a" opacity="0.4" />
              </svg>
            </div>

            {/* Text content */}
            <div className="relative z-10 p-8 flex flex-col justify-between max-w-[60%]">
              <div className="space-y-3">
                <span className="text-emerald-300 text-[10px] font-extrabold tracking-widest uppercase">
                  GOVERNMENT REBATES AVAILABLE
                </span>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  Save Thousands Today!
                </h3>
                <p className="text-emerald-100 text-sm font-medium leading-relaxed">
                  Claim your solar rebate and start saving from day one.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 self-start flex items-center space-x-2 bg-white hover:bg-emerald-50 text-[#0e4a29] px-5 py-2.5 rounded-full font-bold text-sm shadow transition-all"
              >
                <span>Check Your Savings</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Card 2 — 0% Interest (dark purple/navy) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl min-h-[240px] flex items-stretch"
            style={{ background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 60%, #0f0d2e 100%)' }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
            <div className="absolute bottom-0 left-1/2 w-28 h-28 bg-white/5 rounded-full translate-y-1/4" />

            {/* Wallet + coins SVG illustration */}
            <div className="absolute right-2 bottom-0 w-44 h-48 pointer-events-none select-none">
              <svg viewBox="0 0 180 200" fill="none" className="w-full h-full">
                {/* Wallet body */}
                <rect x="35" y="70" width="100" height="80" rx="14" fill="#4338ca" />
                <rect x="35" y="70" width="100" height="80" rx="14" stroke="#6366f1" strokeWidth="1.5" />
                {/* Wallet flap */}
                <rect x="35" y="70" width="100" height="28" rx="14" fill="#4f46e5" />
                {/* Coin pocket */}
                <rect x="100" y="90" width="40" height="46" rx="8" fill="#1e1b4b" />
                <circle cx="120" cy="113" r="6" fill="#6366f1" />
                <circle cx="120" cy="113" r="3" fill="#818cf8" />
                {/* Gold coins */}
                <ellipse cx="138" cy="162" rx="16" ry="5" fill="#b45309" />
                <rect x="122" y="144" width="32" height="18" rx="2" fill="#d97706" />
                <ellipse cx="138" cy="144" rx="16" ry="5" fill="#f59e0b" />
                <rect x="122" y="130" width="32" height="16" rx="2" fill="#fbbf24" />
                <ellipse cx="138" cy="130" rx="16" ry="5" fill="#fde68a" />
                <text x="131" y="154" fontSize="10" fill="#78350f" fontWeight="bold" fontFamily="sans-serif">$</text>
                <text x="131" y="140" fontSize="10" fill="#78350f" fontWeight="bold" fontFamily="sans-serif">$</text>
                {/* Sparkle accents */}
                <circle cx="60" cy="65" r="5" fill="#a5b4fc" opacity="0.6" />
                <circle cx="155" cy="75" r="3" fill="#c4b5fd" opacity="0.5" />
                <path d="M155 90 L158 95 L163 90 L158 85 Z" fill="#a5b4fc" opacity="0.4" />
              </svg>
            </div>

            {/* Text content */}
            <div className="relative z-10 p-8 flex flex-col justify-between max-w-[62%]">
              <div className="space-y-3">
                <span className="text-indigo-300 text-[10px] font-extrabold tracking-widest uppercase">
                  0% INTEREST PAYMENT PLANS
                </span>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  Flexible. Easy. Affordable.
                </h3>
                <ul className="space-y-1.5 mt-1">
                  {[
                    'No upfront cost on select systems',
                    'Easy monthly payments',
                    'Approved in minutes',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-indigo-100 text-xs font-medium">
                      <div className="w-4 h-4 rounded-full bg-indigo-500/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-indigo-200 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 self-start flex items-center space-x-2 bg-white hover:bg-indigo-50 text-[#1e1b4b] px-5 py-2.5 rounded-full font-bold text-sm shadow transition-all"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SavingsPromoSection;
