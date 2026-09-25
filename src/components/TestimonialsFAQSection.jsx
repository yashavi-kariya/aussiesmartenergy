import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Plus, Minus, Star, Quote, Check, ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import homeVideo from '../assets/home_slider.mp4';
import GoogleReviews from './GoogleReviews';

const TestimonialsFAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.05 });
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
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
      a: 'Most residential solar installations are completed within 1–2 days. Connection approvals and paperwork take 2–4 weeks, which our team manages entirely on your behalf.'
    },
    {
      q: 'Is my roof suitable for solar?',
      a: 'Most roofs in good structural condition are suitable. North-facing roofs perform best, but east/west-facing roofs also work well. We conduct a free site assessment to determine suitability.'
    },
  ];

  return (
    <section
      ref={ref}
      id="faq"
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #040d1e 0%, #0b1d4d 40%, #102870 70%, #040d1e 100%)',
      }}
    >
      {/* Decorative ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, #1a4bcc 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -right-16 w-[28rem] h-[28rem] rounded-full"
          style={{ background: 'radial-gradient(circle, #0b4bff 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, #213885 0%, transparent 70%)' }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── TOP SECTION: Dynamic Google Customer Reviews ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GoogleReviews />
        </motion.div>

        {/* ── BOTTOM SECTION: Video + FAQ Side-by-Side (Fully Preserved) ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch pt-4">

          {/* Left — Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="h-full flex"
          >
            <div className="w-full flex bg-gradient-to-br from-[#0d2260]/70 to-[#0b1d4d]/70 p-4 lg:p-6 rounded-2xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
              <video
                src={homeVideo}
                className="w-full h-full object-cover rounded-md"
                controls
                playsInline
                muted
                loop
                preload="metadata"
              />
            </div>
          </motion.div>

          {/* Right — FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-full flex flex-col justify-center space-y-6"
          >
            <div>
              {/* FAQ badge — prominent glow pill */}
              <motion.span
                className="relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, rgba(57,181,74,0.18) 0%, rgba(57,181,74,0.08) 100%)',
                  border: '1.5px solid rgba(57,181,74,0.55)',
                  boxShadow: '0 0 18px rgba(57,181,74,0.35), inset 0 0 12px rgba(57,181,74,0.08)',
                }}
                animate={{ boxShadow: [
                  '0 0 12px rgba(57,181,74,0.3), inset 0 0 10px rgba(57,181,74,0.06)',
                  '0 0 28px rgba(57,181,74,0.6), inset 0 0 16px rgba(57,181,74,0.12)',
                  '0 0 12px rgba(57,181,74,0.3), inset 0 0 10px rgba(57,181,74,0.06)',
                ]}}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(57,181,74,0.22), transparent)' }}
                  initial={{ x: '-110%' }}
                  animate={{ x: '110%' }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                />
                {/* Pulse dot */}
                <motion.span
                  className="relative w-2.5 h-2.5 rounded-full bg-[#39b54a] inline-block flex-shrink-0"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ boxShadow: '0 0 10px rgba(57,181,74,1)' }}
                />
                {/* Expanding ping ring */}
                <motion.span
                  className="absolute left-[18px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-[#39b54a]"
                  animate={{ scale: [1, 2.2, 2.2], opacity: [0.7, 0, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                />
                <span
                  className="relative text-sm sm:text-base font-black tracking-[0.3em] uppercase"
                  style={{
                    background: 'linear-gradient(90deg, #39b54a, #a3e6b5, #39b54a)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmerText 3s linear infinite',
                  }}
                >
                  FAQ
                </span>
              </motion.span>

              <h2 className="mt-3 text-4xl sm:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                Frequently Asked<br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #39b54a, #a3e6b5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Questions
                </span>
              </h2>
            </div>

            {/* Accordion */}
            <div className="rounded-3xl p-1 shadow-2xl" style={{ background: 'linear-gradient(135deg, rgba(57,181,74,0.25), rgba(11,29,77,0.6))', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              <div className="bg-[#050e20]/90 backdrop-blur-sm rounded-[22px] p-5 space-y-2.5">
                {faqs.map((faq, i) => {
                  const isOpen = openFAQ === i;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden transition-all duration-300"
                      style={{
                        border: isOpen ? '1.5px solid rgba(57,181,74,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
                        background: isOpen ? 'linear-gradient(135deg, rgba(57,181,74,0.1), rgba(11,29,77,0.4))' : 'rgba(255,255,255,0.04)',
                        boxShadow: isOpen ? '0 0 16px rgba(57,181,74,0.2)' : 'none',
                      }}
                    >
                      <button
                        onClick={() => setOpenFAQ(isOpen ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
                      >
                        <span className={`font-bold text-sm pr-4 transition-colors ${isOpen ? 'text-[#39b54a]' : 'text-white/90'}`}>{faq.q}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? 'rgba(57,181,74,0.25)' : 'rgba(255,255,255,0.1)' }}
                          transition={{ duration: 0.25 }}
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ border: isOpen ? '1px solid rgba(57,181,74,0.5)' : '1px solid rgba(255,255,255,0.15)' }}
                        >
                          <Plus size={14} className={isOpen ? 'text-[#39b54a]' : 'text-white/60'} />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                          >
                            <div className="px-5 pb-4 pt-1" style={{ borderTop: '1px solid rgba(57,181,74,0.2)' }}>
                              <p className="text-sm text-white/70 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Shimmer text keyframe */}
      <style>{`
        @keyframes shimmerText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsFAQSection;