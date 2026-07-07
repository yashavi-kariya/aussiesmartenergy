import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { DollarSign, Award, Users, Star, CheckCircle } from 'lucide-react';

const BrandBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const partners = [
    "SUNTECH",
    "SOLIS",
    "SOLAX",
    "FRONIUS",
    "GROWATT",
    "LONGI"
  ];

  const trustStats = [
    { number: "15,000+", label: "Happy Customers", icon: Users, color: "text-blue-600" },
    { number: "25+", label: "Years Experience", icon: Award, color: "text-emerald-600" },
    { number: "100%", label: "Australian Owned", icon: CheckCircle, color: "text-red-500" },
    { number: "5★", label: "Google Rating", icon: Star, color: "text-yellow-500" }
  ];

  return (
    <section ref={ref} className="relative py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Banner Logo Section */}
          <motion.div
            variants={itemVariants}
            className="mb-12 text-center"
          >
            <div className="inline-block bg-slate-50 rounded-3xl p-8 shadow-lg border border-slate-200">
              <motion.img
                src="/src/assets/banner-logo-1024x365.png"
                alt="Aussie Smart Energy Banner"
                className="h-20 md:h-24 w-auto mx-auto object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {trustStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  style={{ transitionDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partners Section */}
          <motion.div variants={itemVariants}>
            <p className="text-lg text-slate-600 mb-8 font-medium">
              Trusted by thousands with world-class premium partners
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner}
                  className="text-xl font-bold text-slate-400 hover:text-slate-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {partner}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandBanner;