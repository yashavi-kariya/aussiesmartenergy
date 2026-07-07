import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Check, Plus, Minus, Quote } from 'lucide-react';

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
    <section ref={ref} id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left — Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[#39b54a] text-xs font-extrabold tracking-widest uppercase">WHAT OUR CUSTOMERS SAY</span>
              <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-[#1e2d53] leading-tight">
                Real Stories.<br />Real Savings.
              </h2>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-5">
              {/* Large quote mark */}
              <div className="text-[#39b54a]">
                <Quote size={42} className="fill-current opacity-15" />
              </div>

              <blockquote className="text-slate-700 text-base sm:text-lg font-semibold leading-relaxed">
                "Aussie Smart Energy made the whole process seamless. Our bills are down and the support has been outstanding!"
              </blockquote>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {/* Person */}
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="James T."
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#39b54a]"
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=James+T&background=39b54a&color=fff'; }}
                  />
                  <div>
                    <div className="font-extrabold text-[#1e2d53] text-sm">James T.</div>
                    <div className="flex items-center space-x-1 text-[10px] text-[#39b54a] font-bold mt-0.5">
                      <Check size={10} className="stroke-[3]" />
                      <span>Verified Customer</span>
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
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
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsFAQSection;
