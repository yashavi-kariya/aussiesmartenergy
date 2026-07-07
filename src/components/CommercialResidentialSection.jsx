// import { motion, useInView, AnimatePresence } from 'framer-motion';
// import { useRef, useState } from 'react';
// import { Check, ArrowRight } from 'lucide-react';

// const CommercialResidentialSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, threshold: 0.1 });
//   const [activeTab, setActiveTab] = useState('residential'); // 'residential' or 'commercial'

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.1,
//         staggerChildren: 0.15
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 30, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const residentialSystems = [
//     {
//       id: 1,
//       tag: "Popular",
//       tagBg: "bg-emerald-500",
//       title: "6.6kW System",
//       price: "From $5,990*",
//       savings: "Save up to $2,800 after rebates",
//       features: [
//         "High Efficiency Panels",
//         "Premium Inverter",
//         "25 Years Product Warranty",
//         "10 Years Workmanship"
//       ]
//     },
//     {
//       id: 2,
//       tag: "",
//       tagBg: "",
//       title: "10.5kW System",
//       price: "From $8,590*",
//       savings: "Save up to $4,000 after rebates",
//       features: [
//         "High Efficiency Panels",
//         "Premium Inverter",
//         "25 Years Product Warranty",
//         "10 Years Workmanship"
//       ]
//     },
//     {
//       id: 3,
//       tag: "Best Value",
//       tagBg: "bg-[#5454d4]",
//       title: "13.2kW System",
//       price: "From $11,590*",
//       savings: "Save up to $5,500 after rebates",
//       features: [
//         "High Efficiency Panels",
//         "Premium Inverter",
//         "25 Years Product Warranty",
//         "10 Years Workmanship"
//       ]
//     }
//   ];

//   const commercialSystems = [
//     {
//       id: 4,
//       tag: "Popular",
//       tagBg: "bg-emerald-500",
//       title: "30kW System",
//       price: "From $18,990*",
//       savings: "Save up to $10,000 after rebates",
//       features: [
//         "Tier 1 Commercial Panels",
//         "High Capacity Inverter",
//         "25 Years Performance Warranty",
//         "10 Years Workmanship"
//       ]
//     },
//     {
//       id: 5,
//       tag: "",
//       tagBg: "",
//       title: "50kW System",
//       price: "From $29,990*",
//       savings: "Save up to $18,000 after rebates",
//       features: [
//         "Tier 1 Commercial Panels",
//         "High Capacity Inverter",
//         "25 Years Performance Warranty",
//         "10 Years Workmanship"
//       ]
//     },
//     {
//       id: 6,
//       tag: "High ROI",
//       tagBg: "bg-[#5454d4]",
//       title: "100kW System",
//       price: "From $54,990*",
//       savings: "Save up to $35,000 after rebates",
//       features: [
//         "Tier 1 Commercial Panels",
//         "High Capacity Inverter",
//         "25 Years Performance Warranty",
//         "10 Years Workmanship"
//       ]
//     }
//   ];

//   const activeSystems = activeTab === 'residential' ? residentialSystems : commercialSystems;

//   return (
//     <section ref={ref} className="py-24 bg-[#f4f7fa]" id="solutions">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="text-center space-y-4 mb-12"
//         >
//           <span className="text-[#39b54a] text-sm font-extrabold tracking-widest uppercase block">
//             OUR SOLUTIONS
//           </span>
//           <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800">
//             Solar Solutions for Every Need
//           </h2>

//           {/* Toggle Switch */}
//           <div className="inline-flex bg-white p-1.5 rounded-full shadow-sm border border-slate-200 mt-4">
//             <button
//               onClick={() => setActiveTab('residential')}
//               className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
//                 activeTab === 'residential'
//                   ? 'bg-[#39b54a] text-white shadow-md'
//                   : 'text-slate-600 hover:text-slate-900'
//               }`}
//             >
//               Residential Solar
//             </button>
//             <button
//               onClick={() => setActiveTab('commercial')}
//               className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
//                 activeTab === 'commercial'
//                   ? 'bg-[#39b54a] text-white shadow-md'
//                   : 'text-slate-600 hover:text-slate-900'
//               }`}
//             >
//               Commercial Solar
//             </button>
//           </div>
//         </motion.div>

//         {/* Systems Cards Grid */}
//         <motion.div
//           layout
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="grid md:grid-cols-3 gap-8"
//         >
//           <AnimatePresence mode="popLayout">
//             {activeSystems.map((system) => (
//               <motion.div
//                 layout
//                 key={system.id}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.4 }}
//                 className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-shadow flex flex-col justify-between relative min-h-[500px]"
//               >
//                 {/* Popular / Best Value Tag */}
//                 {system.tag && (
//                   <div className={`absolute top-4 left-4 ${system.tagBg} text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm z-10`}>
//                     {system.tag}
//                   </div>
//                 )}

//                 {/* 3D-styled SVG Solar Panel & Inverter Graphic */}
//                 <div className="relative h-44 bg-slate-50 flex items-center justify-center border-b border-slate-100/50">
//                   <div className="relative w-48 h-32 flex items-center justify-center">
//                     {/* Solar Panel */}
//                     <div className="absolute transform -rotate-[15deg] -translate-x-4 skew-x-[15deg] w-28 h-20 bg-slate-800 rounded border border-slate-700 shadow-md grid grid-cols-4 gap-0.5 p-1">
//                       {[...Array(12)].map((_, i) => (
//                         <div key={i} className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[1px] opacity-90" />
//                       ))}
//                     </div>
//                     {/* Inverter Box */}
//                     <div className="absolute bottom-2 right-4 w-12 h-16 bg-[#eaeff2] border border-slate-300 rounded shadow-md flex flex-col justify-between p-1">
//                       <div className="flex justify-between items-center px-0.5">
//                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                         <div className="w-5 h-1.5 bg-slate-800 rounded-[1px]" />
//                       </div>
//                       <div className="w-full h-8 bg-[#3a4454] rounded-[1px] flex items-center justify-center">
//                         <div className="w-6 h-1 bg-cyan-400 rounded-[1px]" />
//                       </div>
//                       <div className="h-1 bg-slate-300 rounded-[1px]" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-8 flex-1 flex flex-col justify-between">
//                   <div className="space-y-4">
//                     <h3 className="text-2xl font-extrabold text-slate-800">{system.title}</h3>

//                     {/* Price and Savings */}
//                     <div className="space-y-1">
//                       <div className="text-3xl font-extrabold text-slate-800">{system.price}</div>
//                       <p className="text-sm font-bold text-emerald-500">{system.savings}</p>
//                     </div>

//                     {/* Features List */}
//                     <ul className="space-y-2 pt-2">
//                       {system.features.map((feature, idx) => (
//                         <li key={idx} className="flex items-center space-x-2.5 text-sm text-slate-600 font-medium">
//                           <div className="w-4 h-4 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 border border-emerald-100">
//                             <Check className="w-3 h-3 stroke-[3]" />
//                           </div>
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* CTA Button */}
//                   <div className="pt-6">
//                     <motion.button
//                       className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 py-3.5 px-6 rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center justify-center space-x-2"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <span>View Details</span>
//                       <ArrowRight className="w-4 h-4 text-[#39b54a]" />
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default CommercialResidentialSection;

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Home, Building2, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const SolarSolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('residential');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.55,
        type: "spring",
        stiffness: 110
      }
    }
  };

  // Each tier gets its own accent + soft background gradient (no photos)
  const residentialSystems = [
    {
      type: "Small Houses",
      power: "6.6kW",
      savings: "Save up to $2,500",
      subtitle: "p.a on electricity*",
      recommended: false,
      icon: Home,
      accent: "#3b82f6",
      bgFrom: "from-blue-50",
      bgTo: "to-blue-100/60",
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
      icon: Home,
      accent: "#39b54a",
      bgFrom: "from-green-50",
      bgTo: "to-green-100/60",
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
      icon: Home,
      accent: "#a855f7",
      bgFrom: "from-purple-50",
      bgTo: "to-purple-100/60",
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
      icon: Building2,
      accent: "#3b82f6",
      bgFrom: "from-blue-50",
      bgTo: "to-blue-100/60",
      features: [
        "Tier 1 Solar Module",
        "15kW Power Inverter",
        "15,000w Tier 1 Panels",
        "High Efficiency Solar Module"
      ]
    },
    {
      type: "Medium Businesses",
      power: "30kW",
      savings: "",
      subtitle: "",
      recommended: true,
      icon: Building2,
      accent: "#39b54a",
      bgFrom: "from-green-50",
      bgTo: "to-green-100/60",
      features: [
        "Tier 1 Solar Module",
        "25kW Power Inverter",
        "25,000w Tier 1 Panels",
        "High Efficiency Solar Module"
      ]
    },
    {
      type: "Large Businesses",
      power: "50kW",
      savings: "",
      subtitle: "",
      recommended: false,
      icon: Building2,
      accent: "#a855f7",
      bgFrom: "from-purple-50",
      bgTo: "to-purple-100/60",
      features: [
        "Tier 1 Solar Module",
        "40kW Power Inverter",
        "40,000w Tier 1 Panels",
        "High Efficiency Solar Module"
      ]
    },
    {
      type: "Extra Large Businesses",
      power: "100kW",
      savings: "",
      subtitle: "",
      recommended: false,
      icon: Zap,
      accent: "#f97316",
      bgFrom: "from-orange-50",
      bgTo: "to-orange-100/60",
      features: [
        "Tier 1 Solar Module",
        "75kW Power Inverter",
        "80,000w Tier 1 Panels",
        "High Efficiency Solar Module"
      ]
    }
  ];

  const currentSystems = activeTab === 'residential' ? residentialSystems : commercialSystems;

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Ambient background blobs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -left-10 w-72 h-72 bg-[#39b54a]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 -right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-[#39b54a] font-bold text-sm uppercase tracking-widest mb-3"
          >
            Our Solutions
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1e2d53]"
          >
            Solar Solutions for Every Need
          </motion.h2>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="relative bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-white/30"
          >
            <div className="relative flex">
              <motion.div
                className="absolute inset-y-0 bg-[#39b54a] rounded-full shadow-md"
                animate={{
                  x: activeTab === 'residential' ? 0 : '100%',
                  width: '50%'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setActiveTab('residential')}
                className={`relative z-10 px-8 py-3 font-bold text-sm rounded-full transition-colors duration-300 ${activeTab === 'residential' ? 'text-white' : 'text-[#1e2d53] hover:text-[#39b54a]'
                  }`}
              >
                Residential Solar
              </button>
              <button
                onClick={() => setActiveTab('commercial')}
                className={`relative z-10 px-8 py-3 font-bold text-sm rounded-full transition-colors duration-300 ${activeTab === 'commercial' ? 'text-white' : 'text-[#1e2d53] hover:text-[#39b54a]'
                  }`}
              >
                Commercial Solar
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Systems Grid */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-6 ${activeTab === 'commercial' ? 'lg:grid-cols-4 md:grid-cols-2' : 'lg:grid-cols-3'}`}
        >
          {currentSystems.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={`${activeTab}-${index}`}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-2xl bg-gradient-to-br ${system.bgFrom} ${system.bgTo} ${system.recommended ? 'border-[#39b54a] ring-2 ring-[#39b54a]/40' : 'border-gray-200'
                  }`}
              >
                {/* Recommended Badge */}
                {system.recommended && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-3 right-3 bg-[#39b54a] text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md"
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Icon header (replaces the image) */}
                <div className="pt-8 pb-4 flex flex-col items-center">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-md mb-4"
                    style={{ backgroundColor: `${system.accent}1A` }}
                  >
                    <Icon className="w-10 h-10" style={{ color: system.accent }} />
                  </motion.div>
                  <h3
                    className="text-lg font-extrabold text-center px-4"
                    style={{ color: '#1e2d53' }}
                  >
                    {system.type}
                  </h3>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  {/* Power Rating */}
                  <div className="text-center mb-6">
                    <motion.h4
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className="text-4xl font-extrabold mb-2"
                      style={{ color: system.accent }}
                    >
                      {system.power}
                    </motion.h4>
                    {system.savings && (
                      <div>
                        <p className="text-base font-bold text-[#1e2d53] mb-1">{system.savings}</p>
                        <p className="text-sm text-gray-500">{system.subtitle}</p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-white py-3 px-4 rounded-lg font-bold text-sm mb-6 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    style={{ backgroundColor: system.accent }}
                  >
                    Get Discounted Price
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {system.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -15 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + featureIndex * 0.1, duration: 0.4 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: system.accent }} />
                        <p className="text-sm text-[#1e2d53] font-medium leading-relaxed text-left">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <button
                      className="font-bold text-sm underline transition-colors duration-200"
                      style={{ color: system.accent }}
                    >
                      Learn More
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default SolarSolutionsSection;