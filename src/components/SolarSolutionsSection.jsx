import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Home, Building2, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const SolarSolutionsSection = () => {
  const [activeTab, setActiveTab] = useState('residential');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const residentialSystems = [
    {
      type: "Small Houses",
      power: "6.6kW",
      savings: "Save up to $2,500",
      subtitle: "p.a on electricity*",
      recommended: false,
      link: "/solar/6.6kw",
      icon: Home,
      // Blue theme - matches screenshot
      accent: "#3b82f6",
      accentLight: "#eff6ff",
      accentMid: "#bfdbfe",
      buttonBg: "bg-blue-500 hover:bg-blue-600",
      powerColor: "text-blue-500",
      badgeColor: "bg-blue-100 text-blue-600",
      borderHover: "hover:border-blue-400",
      cardGlow: "hover:shadow-blue-200/60",
      learnColor: "text-blue-500 hover:text-blue-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      // Unique animation for card 1: slide in from left with bounce
      animation: {
        hidden: { opacity: 0, x: -60, rotateY: -15 },
        visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.7, type: "spring", stiffness: 100 } }
      },
      // Icon animation: gentle float
      iconAnimation: { y: [0, -8, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } },
      features: [
        "6.6kW System",
        "New Energy Tech Approved",
        "30 Years Linear Output Warranty",
        "Reputed and Trustworthy Brand",
        "High Efficiency"
      ]
    },
    {
      type: "Medium Houses",
      power: "10.5kW",
      savings: "Save up to $3,000",
      subtitle: "p.a on electricity*",
      recommended: true,
      link: "/solar/10.5kw",
      icon: Home,
      // Green theme - matches screenshot
      accent: "#22c55e",
      accentLight: "#f0fdf4",
      accentMid: "#bbf7d0",
      buttonBg: "bg-green-500 hover:bg-green-600",
      powerColor: "text-green-500",
      badgeColor: "bg-green-100 text-green-700",
      borderHover: "hover:border-green-400",
      cardGlow: "hover:shadow-green-200/60",
      learnColor: "text-green-600 hover:text-green-800",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      // Unique animation for card 2: scale up from center
      animation: {
        hidden: { opacity: 0, scale: 0.7, y: 40 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, type: "spring", stiffness: 120 } }
      },
      // Icon animation: rotate + scale pulse
      iconAnimation: { scale: [1, 1.15, 1], rotate: [0, 8, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
      features: [
        "10.5kW System",
        "New Energy Tech Approved",
        "30 Years Linear Output Warranty",
        "Reputed and Trustworthy Brand",
        "High Efficiency"
      ]
    },
    {
      type: "Large House",
      power: "13.2kW",
      savings: "Save up to $3,500",
      subtitle: "p.a on electricity*",
      recommended: false,
      link: "/solar/13.2kw",
      icon: Home,
      // Purple theme - matches screenshot
      accent: "#a855f7",
      accentLight: "#faf5ff",
      accentMid: "#e9d5ff",
      buttonBg: "bg-purple-500 hover:bg-purple-600",
      powerColor: "text-purple-500",
      badgeColor: "bg-purple-100 text-purple-700",
      borderHover: "hover:border-purple-400",
      cardGlow: "hover:shadow-purple-200/60",
      learnColor: "text-purple-600 hover:text-purple-800",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
      // Unique animation for card 3: slide in from right with flip
      animation: {
        hidden: { opacity: 0, x: 60, rotateY: 15 },
        visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.7, type: "spring", stiffness: 100 } }
      },
      // Icon animation: shimmer bounce
      iconAnimation: { y: [0, -5, 0], x: [0, 4, 0], transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } },
      features: [
        "13.2kW System",
        "New Energy Tech Approved",
        "30 Years Linear Output Warranty",
        "Reputed and Trustworthy Brand",
        "High Efficiency"
      ]
    }
  ];

  const commercialSystems = [
    {
      type: "Small Businesses",
      power: "20kW",
      savings: "",
      subtitle: "",
      recommended: false,
      link: "/solar/commercial",
      icon: Building2,
      accent: "#3b82f6",
      accentLight: "#eff6ff",
      accentMid: "#bfdbfe",
      buttonBg: "bg-blue-500 hover:bg-blue-600",
      powerColor: "text-blue-500",
      badgeColor: "bg-blue-100 text-blue-600",
      borderHover: "hover:border-blue-400",
      cardGlow: "hover:shadow-blue-200/60",
      learnColor: "text-blue-500 hover:text-blue-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      animation: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } },
      iconAnimation: { y: [0, -6, 0], transition: { duration: 2, repeat: Infinity } },
      features: ["Tier 1 Solar Module", "15kW Power Inverter", "15,000w Tier 1 Panels", "High Efficiency Solar Module"]
    },
    {
      type: "Medium Businesses",
      power: "30kW",
      savings: "",
      subtitle: "",
      recommended: true,
      link: "/solar/commercial",
      icon: Building2,
      accent: "#22c55e",
      accentLight: "#f0fdf4",
      accentMid: "#bbf7d0",
      buttonBg: "bg-green-500 hover:bg-green-600",
      powerColor: "text-green-500",
      badgeColor: "bg-green-100 text-green-700",
      borderHover: "hover:border-green-400",
      cardGlow: "hover:shadow-green-200/60",
      learnColor: "text-green-600 hover:text-green-800",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      animation: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } },
      iconAnimation: { scale: [1, 1.15, 1], transition: { duration: 2, repeat: Infinity } },
      features: ["Tier 1 Solar Module", "25kW Power Inverter", "25,000w Tier 1 Panels", "High Efficiency Solar Module"]
    },
    {
      type: "Large Businesses",
      power: "50kW",
      savings: "",
      subtitle: "",
      recommended: false,
      link: "/solar/commercial",
      icon: Building2,
      accent: "#a855f7",
      accentLight: "#faf5ff",
      accentMid: "#e9d5ff",
      buttonBg: "bg-purple-500 hover:bg-purple-600",
      powerColor: "text-purple-500",
      badgeColor: "bg-purple-100 text-purple-700",
      borderHover: "hover:border-purple-400",
      cardGlow: "hover:shadow-purple-200/60",
      learnColor: "text-purple-600 hover:text-purple-800",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
      animation: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } },
      iconAnimation: { y: [0, -5, 0], x: [0, 3, 0], transition: { duration: 1.8, repeat: Infinity } },
      features: ["Tier 1 Solar Module", "40kW Power Inverter", "40,000w Tier 1 Panels", "High Efficiency Solar Module"]
    },
    {
      type: "Extra Large Businesses",
      power: "100kW",
      savings: "",
      subtitle: "",
      recommended: false,
      link: "/solar/commercial",
      icon: Zap,
      accent: "#f97316",
      accentLight: "#fff7ed",
      accentMid: "#fed7aa",
      buttonBg: "bg-orange-500 hover:bg-orange-600",
      powerColor: "text-orange-500",
      badgeColor: "bg-orange-100 text-orange-700",
      borderHover: "hover:border-orange-400",
      cardGlow: "hover:shadow-orange-200/60",
      learnColor: "text-orange-600 hover:text-orange-800",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      animation: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } },
      iconAnimation: { rotate: [0, 15, 0], scale: [1, 1.1, 1], transition: { duration: 1.5, repeat: Infinity } },
      features: ["Tier 1 Solar Module", "75kW Power Inverter", "80,000w Tier 1 Panels", "High Efficiency Solar Module"]
    }
  ];

  const currentSystems = activeTab === 'residential' ? residentialSystems : commercialSystems;

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 40%, #f0fdf4 70%, #e0f2fe 100%)'
      }}
    >
      {/* Animated background blobs */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 w-72 h-72 bg-green-300/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-extrabold uppercase tracking-widest text-[#39b54a] mb-3">Our Solutions</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#1e2d53]">
            Solar Solutions for Every Need
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the perfect solar system for your home or business
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-white/50 flex">
            {['residential', 'commercial'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 capitalize ${activeTab === tab
                    ? 'bg-[#1e2d53] text-white shadow-md'
                    : 'text-slate-600 hover:text-[#1e2d53]'
                  }`}
              >
                {tab === 'residential' ? 'Residential Solar' : 'Commercial Solar'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Systems Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 ${activeTab === 'commercial'
                ? 'lg:grid-cols-4 md:grid-cols-2'
                : 'lg:grid-cols-3 md:grid-cols-1'
              }`}
          >
            {currentSystems.map((system, index) => {
              const Icon = system.icon;
              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  variants={system.animation}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ y: -10, boxShadow: `0 25px 50px -12px ${system.accent}40` }}
                  transition={{ delay: index * 0.12 }}
                  className={`relative bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${system.recommended
                      ? `border-[${system.accent}]`
                      : `border-slate-100 ${system.borderHover}`
                    }`}
                  style={{
                    borderColor: system.recommended ? system.accent : undefined,
                    background: 'white'
                  }}
                >
                  {/* Most Popular Badge */}
                  {system.recommended && (
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ delay: index * 0.12 + 0.3, type: 'spring' }}
                      className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-extrabold shadow-md text-white"
                      style={{ backgroundColor: system.accent }}
                    >
                      Most Popular
                    </motion.div>
                  )}

                  {/* Top gradient band */}
                  <div
                    className="h-2 w-full"
                    style={{ background: `linear-gradient(90deg, ${system.accentMid}, ${system.accent})` }}
                  />

                  {/* Card body */}
                  <div className="px-6 pt-8 pb-6" style={{ background: `linear-gradient(180deg, ${system.accentLight} 0%, #ffffff 40%)` }}>

                    {/* Icon */}
                    <div className="flex flex-col items-center mb-6">
                      <motion.div
                        animate={isInView ? system.iconAnimation : {}}
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-md mb-4 ${system.iconBg}`}
                      >
                        <Icon className={`w-10 h-10 ${system.iconColor}`} />
                      </motion.div>

                      <h3 className="text-lg font-extrabold text-[#1e2d53] text-center">{system.type}</h3>
                    </div>

                    {/* Power rating */}
                    <div className="text-center mb-6">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: index * 0.12 + 0.2, type: 'spring', stiffness: 120 }}
                        className={`text-5xl font-black mb-1 ${system.powerColor}`}
                      >
                        {system.power}
                      </motion.div>
                      {system.savings && (
                        <>
                          <p className="text-base font-bold text-[#1e2d53]">{system.savings}</p>
                          <p className="text-xs text-slate-400 font-medium">{system.subtitle}</p>
                        </>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={system.link}
                      className={`flex items-center justify-center gap-2 w-full text-white py-3 px-5 rounded-xl font-bold text-sm mb-6 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 ${system.buttonBg}`}
                    >
                      Get Discounted Price
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Features */}
                    <div className="space-y-2.5 mb-6">
                      {system.features.map((feature, fi) => (
                        <motion.div
                          key={fi}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.1 + fi * 0.07 + 0.3, duration: 0.35 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: system.accent }}
                          />
                          <span className="text-sm text-[#1e2d53] font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Learn More */}
                    <div className="text-center pt-2 border-t border-slate-100">
                      <Link
                        to={system.link}
                        className={`font-bold text-sm underline underline-offset-2 transition-colors duration-200 ${system.learnColor}`}
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-base text-slate-600 mb-5 font-medium">
            Need help choosing the right system? Our solar experts are here to help!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#1e2d53] hover:bg-[#15203c] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default SolarSolutionsSection;
