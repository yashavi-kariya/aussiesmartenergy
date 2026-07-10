import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import homeVideo from '../assets/home_slider.mp4';

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
    <section ref={ref} id="faq" className="py-20 bg-gradient-to-br from-[#d7e1d7] via-[#a3c9e3] to-[#085984]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — Video (lowered slightly, colored background, subtle float) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:mt-8 xl:mt-12"
          >
            <div className="bg-gradient-to-br from-white to-[#f0fbf4] p-4 lg:p-6 rounded-2xl shadow-lg border border-slate-100 aspect-w-16 aspect-h-9 lg:aspect-h-11 xl:aspect-h-12 overflow-hidden lg:scale-100">
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

          {/* Right — FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[#39b54a] text-xs font-extrabold tracking-widest uppercase">FAQ</span>
              <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-[#1e2d53] leading-tight">
                Frequently Asked<br />Questions
              </h2>
            </div>

            {/* Themed panel behind the accordion */}
            <div className="bg-white/95 rounded-3xl p-6 shadow-lg">
              {/* Accordion */}
              <div className="space-y-3">
                {faqs.map((faq, i) => {
                  const isOpen = openFAQ === i;
                  return (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-slate-300 transition-colors"
                    >
                      <button
                        onClick={() => setOpenFAQ(isOpen ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
                      >
                        <span className="font-bold text-[#1e2d53] text-sm pr-4">{faq.q}</span>
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600">
                          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="px-5 pb-4 pt-1 border-t border-slate-100">
                              <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
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
    </section>
  );
};

export default TestimonialsFAQSection;
