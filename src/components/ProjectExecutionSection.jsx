import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  MessageSquare, ClipboardList, FileText, HardHat, ShieldCheck
} from 'lucide-react';

const ProjectExecutionSection = () => {
  const ref = useRef(null);
  // once: false => replays every time it scrolls into view
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const steps = [
    {
      id: 1, icon: MessageSquare, label: 'Free Consultation', sub: 'We understand your needs',
      iconColor: 'text-[#39b54a]', bg: 'bg-emerald-50', border: 'border-emerald-200'
    },
    {
      id: 2, icon: ClipboardList, label: 'System Design', sub: 'Custom solution just for you',
      iconColor: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200'
    },
    {
      id: 3, icon: FileText, label: 'Proposal & Quote', sub: 'Transparent pricing, no hidden cost',
      iconColor: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200'
    },
    {
      id: 4, icon: HardHat, label: 'Installation', sub: 'Certified experts do the job',
      iconColor: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200'
    },
    {
      id: 5, icon: ShieldCheck, label: 'Support & Monitor', sub: "We're here always",
      iconColor: 'text-[#39b54a]', bg: 'bg-emerald-50', border: 'border-emerald-200'
    },
  ];

  // Each card's slot in the sequence — one fully finishes before the next starts
  const STEP_DURATION = 0.6;
  const STEP_GAP = 0.7; // time between the start of one step and the next

  return (
    <section ref={ref} id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#39b54a] text-xs font-extrabold tracking-widest uppercase">OUR PROCESS</span>
          <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-[#1e2d53]">
            From Start to Solar in 5 Easy Steps
          </h2>
        </motion.div>

        {/* Steps Container — relative for SVG overlay */}
        <div className="relative">

          {/* Curved dashed SVG connector — draws in sync with the last step finishing */}
          <div className="hidden lg:block absolute left-0 right-0 top-[52px] pointer-events-none z-0 px-16">
            <svg
              viewBox="0 0 1000 80"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-[80px]"
            >
              <motion.path
                d="M 60 40 C 160 5, 240 75, 340 40 C 440 5, 520 75, 620 40 C 720 5, 800 75, 900 40 C 960 15, 980 30, 940 40"
                stroke="#d1d5db"
                strokeWidth="2.5"
                strokeDasharray="10 8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: STEP_GAP * (steps.length - 1),
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
            </svg>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, i) => {
              const delay = i * STEP_GAP;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: STEP_DURATION, delay }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle Icon */}
                  <div className="relative mb-5">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay, type: "spring", stiffness: 140, damping: 14 }}
                      className={`w-[104px] h-[104px] ${step.bg} border-2 ${step.border} rounded-full flex items-center justify-center shadow-sm`}
                    >
                      <step.icon className={`w-10 h-10 ${step.iconColor}`} />
                    </motion.div>
                    {/* Step number badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: delay + 0.3, type: "spring", stiffness: 280 }}
                      className="absolute -top-1 -left-1 w-7 h-7 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-sm"
                    >
                      <span className="text-xs font-extrabold text-[#1e2d53]">{step.id}</span>
                    </motion.div>
                  </div>

                  <h3 className="text-sm font-extrabold text-[#1e2d53] leading-tight mb-1">{step.label}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[120px]">{step.sub}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectExecutionSection;