import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import plentiLogo from '../assets/plenti.png';
import EnquiryModal from './EnquiryModal';
import brighteLogo from '../assets/brighte.png';

const SavingsPromoSection = () => {
  const ref = useRef(null);
  // once: false → replays every time the section scrolls back into view
  const isInView = useInView(ref, { once: false, amount: 0.25 });

  const [savingsModal, setSavingsModal] = useState(false);
  const [financeModal, setFinanceModal] = useState(false);

  const textContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const textItem = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section ref={ref} id="savings" className="py-8 bg-[#f4f7fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Card 1 — Government Rebates (dark green) */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl min-h-[240px] flex items-stretch shadow-lg hover:shadow-2xl transition-shadow duration-500 group"
            style={{ background: 'linear-gradient(135deg, #1a7a44 0%, #0e4a29 60%, #0a3520 100%)' }}
          >
            {/* Decorative leaves/green circle — slow ambient drift */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.09, 0.05] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/4 translate-x-1/4"
            />

            {/* Solar panel + coins SVG illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 4 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              whileHover={{ y: -6, rotate: -2 }}
              className="absolute right-4 bottom-0 w-40 h-44 pointer-events-none select-none"
            >
              <svg viewBox="0 0 160 180" fill="none" className="w-full h-full">
                {/* Ground/grass */}
                <ellipse cx="80" cy="162" rx="60" ry="12" fill="#15803d" opacity="0.4" />

                {/* Solar Panel */}
                <g transform="rotate(-10, 75, 80)">
                  <rect x="20" y="40" width="90" height="62" rx="4" fill="#1e3a5f" />
                  <rect x="22" y="42" width="86" height="58" rx="3" fill="#1a3a6e" />
                  {/* Panel cells */}
                  {[0, 1, 2].map(row => [0, 1, 2, 3].map(col => (
                    <rect key={`${row}-${col}`} x={24 + col * 22} y={44 + row * 18} width={20} height={16} rx="1"
                      fill={`rgba(59,130,246,${0.5 + (row + col) * 0.05})`} stroke="#2563eb" strokeWidth="0.5" />
                  )))}
                  {/* Shine sweep — a light beam glides across the panel on a loop */}
                  <motion.rect
                    y="42" width="18" height="58" rx="2" fill="white" opacity="0.15"
                    animate={{ x: [10, 100, 10] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />
                </g>

                {/* Support pole */}
                <rect x="75" y="100" width="5" height="40" rx="2" fill="#374151" />

                {/* Gold coins stack — rises in, then gently bobs like it's freshly stacked */}
                <motion.g
                  initial={{ y: 25, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                >
                  <motion.g
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  >
                    <ellipse cx="108" cy="152" rx="18" ry="6" fill="#ca8a04" />
                    <rect x="90" y="132" width="36" height="20" rx="2" fill="#eab308" />
                    <ellipse cx="108" cy="132" rx="18" ry="6" fill="#fbbf24" />
                    <rect x="90" y="116" width="36" height="18" rx="2" fill="#fcd34d" />
                    <ellipse cx="108" cy="116" rx="18" ry="6" fill="#fde68a" />
                    <text x="101" y="142" fontSize="10" fill="#78350f" fontWeight="bold" fontFamily="sans-serif">$</text>
                    <text x="101" y="126" fontSize="10" fill="#78350f" fontWeight="bold" fontFamily="sans-serif">$</text>
                  </motion.g>
                </motion.g>

                {/* Leaf accents — soft twinkle */}
                <motion.circle
                  cx="48" cy="50" r="6" fill="#22c55e"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="58" cy="38" r="4" fill="#16a34a"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                />
              </svg>
            </motion.div>

            {/* Text content */}
            <motion.div
              variants={textContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative z-10 p-8 flex flex-col justify-between max-w-[60%]"
            >
              <div className="space-y-3">
                <motion.span
                  variants={textItem}
                  animate={isInView ? { opacity: [1, 0.6, 1] } : {}}
                  transition={{ opacity: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
                  className="inline-block text-emerald-300 text-[10px] font-extrabold tracking-widest uppercase"
                >
                  GOVERNMENT REBATES AVAILABLE
                </motion.span>
                <motion.h3 variants={textItem} className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  Claim your Victorian Government solar
                  panel rebate now!
                </motion.h3>
                <motion.p variants={textItem} className="text-emerald-100 text-sm font-medium leading-relaxed">
                  Claim your state & Federal government solar panel rebate now!

                  this option is only for VIC clients but we are in NSW & QLD as well.
                  so make this line specifically for Victorian Households.

                  State rebate for Commercial Solar Panels as well for NSW & VIC
                </motion.p>
              </div>
              <motion.button
                variants={textItem}
                onClick={() => setSavingsModal(true)}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="mt-6 self-start flex items-center space-x-2 bg-white hover:bg-emerald-50 text-[#0e4a29] px-5 py-2.5 rounded-full font-bold text-sm shadow transition-all"
              >
                <span>Check Your Savings</span>
                <motion.span variants={{ hover: { x: 4 } }} className="flex">
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Card 2 — 0% Interest (dark purple/navy) */}
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 120 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl min-h-[240px] flex items-stretch shadow-lg hover:shadow-2xl transition-shadow duration-500 group"
            style={{ background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 60%, #0f0d2e 100%)' }}
          >
            {/* Decorative circles — slow ambient drift */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.09, 0.05] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 left-1/2 w-28 h-28 bg-white/5 rounded-full translate-y-1/4"
            />

            {/* Wallet + coins SVG illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 4 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              whileHover={{ y: -6, rotate: -2 }}
              className="absolute right-2 bottom-0 w-44 h-48 pointer-events-none select-none"
            >
              <svg viewBox="0 0 180 200" fill="none" className="w-full h-full">
                {/* Wallet body */}
                <rect x="35" y="70" width="100" height="80" rx="14" fill="#4338ca" />
                <rect x="35" y="70" width="100" height="80" rx="14" stroke="#6366f1" strokeWidth="1.5" />
                {/* Wallet flap — flips open a touch, like it's being opened */}
                <motion.rect
                  x="35" y="70" width="100" height="28" rx="14" fill="#4f46e5"
                  style={{ transformOrigin: '85px 70px' }}
                  animate={isInView ? { rotateX: [0, 8, 0] } : {}}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                />

                {/* Coin pocket — gentle pulse like a coin dropping in */}
                <rect x="100" y="90" width="40" height="46" rx="8" fill="#1e1b4b" />
                <motion.circle
                  cx="120" cy="113" r="6" fill="#6366f1"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <circle cx="120" cy="113" r="3" fill="#818cf8" />

                {/* Gold coins — rise in, then gentle bob */}
                <motion.g
                  initial={{ y: 25, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1, ease: 'easeOut' }}
                >
                  <motion.g
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                  >
                    <ellipse cx="138" cy="162" rx="16" ry="5" fill="#b45309" />
                    <rect x="122" y="144" width="32" height="18" rx="2" fill="#d97706" />
                    <ellipse cx="138" cy="144" rx="16" ry="5" fill="#f59e0b" />
                    <rect x="122" y="130" width="32" height="16" rx="2" fill="#fbbf24" />
                    <ellipse cx="138" cy="130" rx="16" ry="5" fill="#fde68a" />
                    <text x="131" y="154" fontSize="10" fill="#78350f" fontWeight="bold" fontFamily="sans-serif">$</text>
                    <text x="131" y="140" fontSize="10" fill="#78350f" fontWeight="bold" fontFamily="sans-serif">$</text>
                  </motion.g>
                </motion.g>

                {/* Sparkle accents — twinkle at staggered intervals */}
                <motion.circle
                  cx="60" cy="65" r="5" fill="#a5b4fc"
                  animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.9, 1.2, 0.9] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="155" cy="75" r="3" fill="#c4b5fd"
                  animate={{ opacity: [0.15, 0.6, 0.15], scale: [0.9, 1.3, 0.9] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                />
                <motion.path
                  d="M155 90 L158 95 L163 90 L158 85 Z" fill="#a5b4fc"
                  animate={{ opacity: [0.15, 0.5, 0.15], rotate: [0, 15, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                  style={{ transformOrigin: '158px 90px' }}
                />
              </svg>
            </motion.div>

            {/* Text content */}
            <motion.div
              variants={textContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative z-10 p-8 flex flex-col justify-between max-w-[62%]"
            >
              <div className="space-y-3">
                <motion.h3 variants={textItem} className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  0% INTEREST PAYMENT PLANS
                </motion.h3>

                <ul className="space-y-1.5 mt-1">
                  {[
                    '0% interest upto 24 month*',
                    'Beat the upfront cost of a solar system.',
                    'Fast approval times',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -14 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
                      className="flex items-center space-x-2 text-indigo-100 text-xs font-medium"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.55 + i * 0.12, type: 'spring', stiffness: 300 }}
                        className="w-4 h-4 rounded-full bg-indigo-500/30 flex items-center justify-center flex-shrink-0"
                      >
                        <Check className="w-2.5 h-2.5 text-indigo-200 stroke-[3]" />
                      </motion.div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Finance Partner Logos */}
                <motion.div variants={textItem} className="pt-4 space-y-2">
                  <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
                    Our Finance Partners
                  </p>
                  <div className="flex items-center gap-4">

                    {/* Plenti Logo Card */}
                    <motion.div
                      whileHover={{ scale: 1.07, y: -4 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                      className="relative bg-white rounded-2xl flex flex-col items-center justify-center px-6 py-4 h-24 min-w-[130px] overflow-hidden cursor-pointer"
                      style={{ boxShadow: '0 0 0 2px #6366f1, 0 8px 28px rgba(99,102,241,0.35)' }}
                    >
                      {/* Shimmer sweep */}
                      <motion.div
                        className="pointer-events-none absolute inset-0"
                        style={{ background: 'linear-gradient(100deg, transparent 20%, rgba(99,102,241,0.12) 50%, transparent 80%)', skewX: '-12deg' }}
                        initial={{ x: '-120%' }}
                        animate={{ x: '220%' }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                      />
                      {/* Glow pulse behind logo */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{ opacity: [0, 0.15, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ background: 'radial-gradient(ellipse at center, #6366f1 0%, transparent 70%)' }}
                      />
                      <img src={plentiLogo} alt="Plenti" className="relative z-10 h-12 w-auto object-contain" />
                      <span className="relative z-10 mt-1.5 text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Trusted Partner</span>
                    </motion.div>

                    {/* Brighte Logo Card */}
                    <motion.div
                      whileHover={{ scale: 1.07, y: -4 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                      className="relative bg-white rounded-2xl flex flex-col items-center justify-center px-6 py-4 h-24 min-w-[130px] overflow-hidden cursor-pointer"
                      style={{ boxShadow: '0 0 0 2px #6366f1, 0 8px 28px rgba(99,102,241,0.35)' }}
                    >
                      {/* Shimmer sweep */}
                      <motion.div
                        className="pointer-events-none absolute inset-0"
                        style={{ background: 'linear-gradient(100deg, transparent 20%, rgba(99,102,241,0.12) 50%, transparent 80%)', skewX: '-12deg' }}
                        initial={{ x: '-120%' }}
                        animate={{ x: '220%' }}
                        transition={{ duration: 1.8, delay: 0.9, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                      />
                      {/* Glow pulse */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{ opacity: [0, 0.15, 0] }}
                        transition={{ duration: 2.4, delay: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ background: 'radial-gradient(ellipse at center, #6366f1 0%, transparent 70%)' }}
                      />
                      <img src={brighteLogo} alt="Brighte" className="relative z-10 h-12 w-auto object-contain" />
                      <span className="relative z-10 mt-1.5 text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Trusted Partner</span>
                    </motion.div>

                  </div>
                </motion.div>
              </div>
              <motion.button
                variants={textItem}
                onClick={() => setFinanceModal(true)}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="mt-6 self-start flex items-center space-x-2 bg-white hover:bg-indigo-50 text-[#1e1b4b] px-5 py-2.5 rounded-full font-bold text-sm shadow transition-all"
              >
                <span>Learn More</span>
                <motion.span variants={{ hover: { x: 4 } }} className="flex">
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Savings Check Enquiry Modal ── */}
      <EnquiryModal
        isOpen={savingsModal}
        onClose={() => setSavingsModal(false)}
        formType="savings-check"
        title="Check Your Savings"
        subtitle="Tell us about your property and we'll calculate your potential solar savings & rebates."
        accentColor="#1a7a44"
      />

      {/* ── Finance Plan Enquiry Modal ── */}
      <EnquiryModal
        isOpen={financeModal}
        onClose={() => setFinanceModal(false)}
        formType="finance-plan"
        title="0% Interest Finance Plan"
        subtitle="Interested in our 0% interest payment plan? Leave your details and we'll be in touch."
        accentColor="#312e81"
      />
    </section>
  );
};

export default SavingsPromoSection;