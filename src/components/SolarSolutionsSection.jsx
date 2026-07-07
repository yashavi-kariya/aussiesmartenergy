// import { motion, useInView } from 'framer-motion';
// import { useRef, useState } from 'react';

// const SolarSolutionsSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, threshold: 0.1 });
//   const [activeTab, setActiveTab] = useState('residential');

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//         duration: 0.5
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.95, y: 20 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         type: "spring",
//         stiffness: 120
//       }
//     }
//   };

//   const residentialSystems = [
//     {
//       type: "Small Houses",
//       power: "6.6kW",
//       savings: "Save up to $2500",
//       subtitle: "p.a on electricity*",
//       recommended: false,
//       features: [
//         "6.6kW System",
//         "New Energy Tech Approved",
//         "30 Years of Linear Output Warranty on Panels",
//         "Reputed and Trustworthy Brand",
//         "High Efficiency"
//       ]
//     },
//     {
//       type: "Medium Houses",
//       power: "10.5kW",
//       savings: "Save up to $3000",
//       subtitle: "p.a on electricity*",
//       recommended: false,
//       features: [
//         "10.5kW System",
//         "New Energy Tech Approved",
//         "30 Years of Linear Output Warranty on Panels",
//         "Reputed and Trustworthy Brand",
//         "High Efficiency"
//       ]
//     },
//     {
//       type: "Large House",
//       power: "13.2kW",
//       savings: "Save up to $3500",
//       subtitle: "p.a on electricity*",
//       recommended: true,
//       features: [
//         "13.2kW System",
//         "New Energy Tech Approved",
//         "30 Years of Linear Output Warranty on Panels",
//         "Reputed and Trustworthy Brand",
//         "High Efficiency"
//       ]
//     }
//   ];

//   const commercialSystems = [
//     {
//       type: "Small Businesses",
//       power: "20kW",
//       savings: "",
//       subtitle: "",
//       recommended: false,
//       features: [
//         "Tier 1 Solar Module",
//         "15kW Power Inverter",
//         "15,000w Tier 1 Panels",
//         "High Efficiency Solar Module"
//       ]
//     },
//     {
//       type: "Medium Businesses",
//       power: "30kW",
//       savings: "",
//       subtitle: "",
//       recommended: false,
//       features: [
//         "Tier 1 Solar Module",
//         "25kW Power Inverter",
//         "25,000w Tier 1 Panels",
//         "High Efficiency Solar Module"
//       ]
//     },
//     {
//       type: "Large Businesses",
//       power: "50kW",
//       savings: "",
//       subtitle: "",
//       recommended: false,
//       features: [
//         "Tier 1 Solar Module",
//         "40kW Power Inverter",
//         "40,000w Tier 1 Panels",
//         "High Efficiency Solar Module"
//       ]
//     },
//     {
//       type: "Extra Large Businesses",
//       power: "100kW",
//       savings: "",
//       subtitle: "",
//       recommended: false,
//       features: [
//         "Tier 1 Solar Module",
//         "75kW Power Inverter",
//         "80000w Tier 1 Panels",
//         "High Efficiency Solar Module"
//       ]
//     }
//   ];

//   const currentSystems = activeTab === 'residential' ? residentialSystems : commercialSystems;

//   return (
//     <section ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="text-center mb-16"
//         >
//           <motion.h2
//             variants={itemVariants}
//             className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1e2d53]"
//           >
//             Solar Solutions for Every Need
//           </motion.h2>
//         </motion.div>

//         {/* Tab Navigation */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="flex justify-center mb-12"
//         >
//           <motion.div
//             variants={itemVariants}
//             className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/30"
//           >
//             <div className="flex">
//               <button
//                 onClick={() => setActiveTab('residential')}
//                 className={`px-8 py-3 font-bold text-sm transition-all duration-300 ${activeTab === 'residential'
//                     ? 'bg-[#1e2d53] text-white'
//                     : 'bg-white text-[#1e2d53] hover:bg-gray-50'
//                   }`}
//               >
//                 Residential Solar
//               </button>
//               <button
//                 onClick={() => setActiveTab('commercial')}
//                 className={`px-8 py-3 font-bold text-sm transition-all duration-300 ${activeTab === 'commercial'
//                     ? 'bg-[#1e2d53] text-white'
//                     : 'bg-white text-[#1e2d53] hover:bg-gray-50'
//                   }`}
//               >
//                 Commercial Solar
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Systems Grid */}
//         <motion.div
//           key={activeTab}
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className={`grid gap-6 ${activeTab === 'commercial' ? 'lg:grid-cols-4 md:grid-cols-2' : 'lg:grid-cols-3'}`}
//         >
//           {currentSystems.map((system, index) => (
//             <motion.div
//               key={`${activeTab}-${index}`}
//               variants={cardVariants}
//               whileHover={{ scale: 1.02, y: -5 }}
//               transition={{ duration: 0.2 }}
//               className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
//             >
//               {/* Recommended Badge */}
//               {system.recommended && (
//                 <motion.div
//                   initial={{ scale: 0, rotate: -10 }}
//                   animate={{ scale: 1, rotate: 0 }}
//                   transition={{ delay: 0.3, type: "spring" }}
//                   className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md"
//                 >
//                   Recommended
//                 </motion.div>
//               )}

//               {/* Header */}
//               <div className="bg-[#1e2d53] text-white text-center py-4">
//                 <h3 className="text-base font-bold">{system.type}</h3>
//               </div>

//               {/* Content */}
//               <div className="p-6">
//                 {/* Power Rating */}
//                 <div className="text-center mb-6">
//                   <motion.h4
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={isInView ? { scale: 1, opacity: 1 } : {}}
//                     transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
//                     className="text-4xl font-extrabold text-[#1e2d53] mb-3"
//                   >
//                     {system.power}
//                   </motion.h4>
//                   {system.savings && (
//                     <div className="mb-4">
//                       <p className="text-base font-bold text-[#1e2d53] mb-1">{system.savings}</p>
//                       <p className="text-sm text-gray-500">{system.subtitle}</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* CTA Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold text-sm mb-6 transition-all duration-200 shadow-md hover:shadow-lg"
//                 >
//                   Get Discounted Price
//                 </motion.button>

//                 {/* Features */}
//                 <div className="space-y-2 mb-6">
//                   {system.features.map((feature, featureIndex) => (
//                     <motion.div
//                       key={featureIndex}
//                       initial={{ opacity: 0, x: -15 }}
//                       animate={isInView ? { opacity: 1, x: 0 } : {}}
//                       transition={{ delay: 0.3 + featureIndex * 0.1, duration: 0.4 }}
//                       className="text-center"
//                     >
//                       <p className="text-sm text-[#1e2d53] font-medium leading-relaxed">{feature}</p>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Learn More Link */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={isInView ? { opacity: 1 } : {}}
//                   transition={{ delay: 0.7 + index * 0.1 }}
//                   className="text-center"
//                 >
//                   <button className="text-[#1e2d53] font-bold text-sm underline hover:text-blue-700 transition-colors duration-200">
//                     Learn More
//                   </button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default SolarSolutionsSection;

