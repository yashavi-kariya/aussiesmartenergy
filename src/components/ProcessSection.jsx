import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
          >
            How You Can Save More
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover multiple ways to maximize your savings with government rebates and flexible payment options.
          </motion.p>
        </motion.div>

        {/* Two Column Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Left Card - Government Rebates */}
          <motion.div
            variants={cardVariants}
            className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-[#1b5e3f] to-[#0d3d28] p-8 md:p-12 min-h-80 flex flex-col justify-between text-white shadow-2xl hover:shadow-3xl transition-shadow"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-emerald-200 mb-2">
                  Government Rebates Available
                </span>
              </div>

              {/* Title */}
              <h3 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Claim your Victorian<br />
                Government solar<br />
                Today!
              </h3>

              {/* Description */}
              <p className="text-base text-emerald-50 mb-8 leading-relaxed max-w-xs">
                Claim your solar rebate and start saving from day one.
              </p>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-white text-[#1b5e3f] px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-colors"
              >
                <span>Check Your Savings</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-8 right-8 opacity-20">
              <div className="w-24 h-24 bg-blue-400 rounded-lg transform rotate-45" />
            </div>
            <div className="absolute bottom-12 right-12 opacity-30">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg" />
            </div>
          </motion.div>

          {/* Right Card - 0% Interest Plans */}
          <motion.div
            variants={cardVariants}
            className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-[#1e2d53] to-[#0f1f3d] p-8 md:p-12 min-h-80 flex flex-col justify-between text-white shadow-2xl hover:shadow-3xl transition-shadow"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-200 mb-2">
                  0% Interest Payment Plans
                </span>
              </div>

              {/* Title */}
              <h3 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Flexible.<br />
                Easy.<br />
                Affordable.
              </h3>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-50">No upfront cost on select systems</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-50">Easy monthly payments</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-50">Approved in minutes</span>
                </div>
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-white text-[#1e2d53] px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-8 right-8 opacity-20">
              <div className="w-24 h-24 bg-blue-500 rounded-lg transform rotate-45" />
            </div>
            <div className="absolute bottom-12 right-12 opacity-30">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg" />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Info Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Left Info Card */}
          <motion.div
            variants={cardVariants}
            className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-white min-h-64 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-red-600 -skew-y-3 transform -translate-y-32 opacity-80" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-sm">
                Claim your Victorian Government solar panel rebate now!
              </h3>
              <p className="text-base text-white/90 mb-8 max-w-sm">
                Solar panel rebates are available of $1,400 plus the option of an interest-free loan.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-slate-900 transition-all"
              >
                Find Out More Now
              </motion.button>
            </div>
          </motion.div>

          {/* Right Info Card */}
          <motion.div
            variants={cardVariants}
            className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-white min-h-64 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-red-600 -skew-y-3 transform -translate-y-32 opacity-80" />
            <div className="relative z-10">
              {/* Humm Logo Placeholder */}
              <div className="mb-8">
                <div className="text-4xl font-bold text-orange-400">humm</div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                0% Interest Payment Plans
              </h3>

              <div className="space-y-2 mb-8 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>0% interest upto 24 month*</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>Beat the upfront cost of a solar system.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>Fast approval times</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-slate-900 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;