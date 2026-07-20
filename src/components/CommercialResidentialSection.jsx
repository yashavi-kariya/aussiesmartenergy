import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Home, Building2, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductEnquiryModal from './ProductEnquiryModal';

const SolarSolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('residential');
  const [selectedProduct, setSelectedProduct] = useState(null); // { productName, formType, accentColor }

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

  // Unique per-card entry animations (index-driven)
  const cardAnimations = [
    // Card 0: slide in from left with spring
    {
      hidden: { opacity: 0, x: -70, rotateY: -12 },
      visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.75, type: "spring", stiffness: 90 } }
    },
    // Card 1: scale up from center
    {
      hidden: { opacity: 0, scale: 0.6, y: 50 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, type: "spring", stiffness: 120 } }
    },
    // Card 2: slide in from right with spring
    {
      hidden: { opacity: 0, x: 70, rotateY: 12 },
      visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.75, type: "spring", stiffness: 90 } }
    },
    // Card 3 (commercial extra): drop from top
    {
      hidden: { opacity: 0, y: -50, scale: 0.85 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 100 } }
    }
  ];

  // Unique continuous icon animations per card
  const iconAnimations = [
    { animate: { y: [0, -9, 0] }, transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
    { animate: { scale: [1, 1.18, 1], rotate: [0, 8, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
    { animate: { y: [0, -5, 0], x: [0, 5, 0] }, transition: { duration: 1.9, repeat: Infinity, ease: "easeInOut" } },
    { animate: { rotate: [0, 18, 0], scale: [1, 1.12, 1] }, transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }
  ];

  // Each tier gets its own accent + soft background gradient (no photos)
  const residentialSystems = [
    {
      type: "Small Houses",
      power: "6.6kW",
      savings: "Save up to $2,500",
      subtitle: "p.a on electricity*",
      recommended: false,
      icon: Home,
      accent: "#2563eb",
      accentMid: "#93c5fd",
      bgFrom: "from-blue-50",
      bgTo: "to-blue-100/60",
      path: "/solar/6.6kw",
      formType: "residential-6.6kw",
      productName: "6.6kW Residential Solar"
    },
    {
      type: "Medium Houses",
      power: "10.5kW",
      savings: "Save up to $3,000",
      subtitle: "p.a on electricity*",
      recommended: true,
      icon: Home,
      accent: "#dc2626",
      accentMid: "#fca5a5",
      bgFrom: "from-red-50",
      bgTo: "to-red-100/60",
      path: "/solar/10.5kw",
      formType: "residential-10.5kw",
      productName: "10.5kW Residential Solar"
    },
    {
      type: "Large House",
      power: "13.2kW",
      savings: "Save up to $3,500",
      subtitle: "p.a on electricity*",
      recommended: false,
      icon: Home,
      accent: "#1d4ed8",
      accentMid: "#bfdbfe",
      bgFrom: "from-blue-50",
      bgTo: "to-indigo-100/60",
      path: "/solar/13.2kw",
      formType: "residential-13.2kw",
      productName: "13.2kW Residential Solar"
    }
  ];

  const residentialFeatures = [
    ["6.6kW System", "New Energy Tech Approved", "30 Years Linear Output Warranty", "Reputed and Trustworthy Brand", "High Efficiency"],
    ["10.5kW System", "New Energy Tech Approved", "30 Years Linear Output Warranty", "Reputed and Trustworthy Brand", "High Efficiency"],
    ["13.2kW System", "New Energy Tech Approved", "30 Years Linear Output Warranty", "Reputed and Trustworthy Brand", "High Efficiency"]
  ];

  const commercialSystems = [
    {
      type: "Small Businesses",
      power: "20kW",
      savings: "",
      subtitle: "",
      recommended: false,
      icon: Building2,
      accent: "#2563eb",
      accentMid: "#93c5fd",
      bgFrom: "from-blue-50",
      bgTo: "to-blue-100/60",
      path: "/solar/commercial",
      formType: "commercial-20kw",
      productName: "20kW Commercial Solar"
    },
    {
      type: "Medium Businesses",
      power: "30kW",
      savings: "",
      subtitle: "",
      recommended: true,
      icon: Building2,
      accent: "#dc2626",
      accentMid: "#fca5a5",
      bgFrom: "from-red-50",
      bgTo: "to-red-100/60",
      path: "/solar/commercial",
      formType: "commercial-30kw",
      productName: "30kW Commercial Solar"
    },
    {
      type: "Large Businesses",
      power: "50kW",
      savings: "",
      subtitle: "",
      recommended: false,
      icon: Building2,
      accent: "#1d4ed8",
      accentMid: "#bfdbfe",
      bgFrom: "from-blue-50",
      bgTo: "to-indigo-100/60",
      path: "/solar/commercial",
      formType: "commercial-50kw",
      productName: "50kW Commercial Solar"
    },
    {
      type: "Extra Large Businesses",
      power: "100kW",
      savings: "",
      subtitle: "",
      recommended: false,
      icon: Zap,
      accent: "#b91c1c",
      accentMid: "#fecaca",
      bgFrom: "from-red-50",
      bgTo: "to-red-100/60",
      path: "/solar/commercial",
      formType: "commercial-100kw",
      productName: "100kW Commercial Solar"
    }
  ];

  const commercialFeatures = [
    ["Tier 1 Solar Module", "15kW Power Inverter", "15,000w Tier 1 Panels", "High Efficiency Solar Module"],
    ["Tier 1 Solar Module", "25kW Power Inverter", "25,000w Tier 1 Panels", "High Efficiency Solar Module"],
    ["Tier 1 Solar Module", "40kW Power Inverter", "40,000w Tier 1 Panels", "High Efficiency Solar Module"],
    ["Tier 1 Solar Module", "75kW Power Inverter", "80,000w Tier 1 Panels", "High Efficiency Solar Module"]
  ];

  const currentSystems = activeTab === 'residential' ? residentialSystems : commercialSystems;
  const currentFeatures = activeTab === 'residential' ? residentialFeatures : commercialFeatures;

  return (
    <section ref={ref} className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 40%, #f0fdf4 70%, #e0f2fe 100%)' }}>
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
            className="inline-block text-[#dc2626] font-bold text-sm uppercase tracking-widest mb-3"
          >
            Our Solutions
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1e2d53]"
          >
            Solar Solutions for Every Need
          </motion.h2>
          <p>We Australians are quickly realising the benefits of solar. However, it’s not just residential property owners that can profit from solar power, with Australian businesses also reaping the benefits of Commercial Solar Systems, be it in Brisbane, Melbourne, Sydney, Adelaide, Perth or any Suburb in Australia for that matter. While some businesses use much more power than others and for longer periods of time depending on operating hours, industry and many other factors, almost every commercial property is using more energy than the average home. For this reason, the environmental impact of a solar system Australian businesses can contribute is far greater than that of a household. You can increase your positive impact on future energy users by converting both your home and your workplace to solar power. We, The Australians can also save significant amounts of money by doing this.</p>
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
                className="absolute inset-y-0 bg-[#dc2626] rounded-full shadow-md"
                animate={{
                  x: activeTab === 'residential' ? 0 : '100%',
                  width: '50%'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setActiveTab('residential')}
                className={`relative z-10 px-8 py-3 font-bold text-sm rounded-full transition-colors duration-300 ${activeTab === 'residential' ? 'text-white' : 'text-[#1e2d53] hover:text-[#dc2626]'
                  }`}
              >
                Residential Solar
              </button>
              <button
                onClick={() => setActiveTab('commercial')}
                className={`relative z-10 px-8 py-3 font-bold text-sm rounded-full transition-colors duration-300 ${activeTab === 'commercial' ? 'text-white' : 'text-[#1e2d53] hover:text-[#dc2626]'
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
            const cardAnim = cardAnimations[index] || cardAnimations[0];
            const iconAnim = iconAnimations[index] || iconAnimations[0];
            const features = currentFeatures[index] || [];
            return (
              <motion.div
                key={`${activeTab}-${index}`}
                variants={cardAnim}
                whileHover={{ y: -12, boxShadow: `0 30px 60px -12px ${system.accent}45` }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-3xl overflow-hidden shadow-lg border-2 transition-all duration-300 bg-white`}
                style={{ borderColor: system.recommended ? system.accent : '#e5e7eb' }}
              >
                {/* Top accent gradient band */}
                <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${system.accentMid}, ${system.accent})` }} />
                {/* Recommended Badge */}
                {system.recommended && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: index * 0.12 + 0.3, type: "spring" }}
                    className="absolute top-5 right-4 text-white px-3 py-1 rounded-full text-xs font-extrabold z-10 shadow-md"
                    style={{ backgroundColor: system.accent }}
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Icon header with continuous animation */}
                <div className="pt-8 pb-4 flex flex-col items-center" style={{ background: `linear-gradient(180deg, ${system.accent}12 0%, white 60%)` }}>
                  <motion.div
                    animate={isInView ? iconAnim.animate : {}}
                    transition={iconAnim.transition}
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
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: index * 0.12 + 0.2, type: 'spring', stiffness: 120 }}
                      className="text-5xl font-black mb-2"
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
                  <button
                    onClick={() => setSelectedProduct({ productName: system.productName, formType: system.formType, accentColor: system.accent })}
                    className="w-full text-white py-3 px-4 rounded-lg font-bold text-sm mb-6 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-center"
                    style={{ backgroundColor: system.accent }}
                  >
                    Get Discounted Price
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Features */}
                  <div className="space-y-2.5 mb-6">
                    {features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -15 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + featureIndex * 0.08 + 0.35, duration: 0.35 }}
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
                    <Link
                      to={system.path}
                      className="font-bold text-sm underline transition-colors duration-200"
                      style={{ color: system.accent }}
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Product Enquiry Modal */}
      <ProductEnquiryModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        productName={selectedProduct?.productName || ''}
        formType={selectedProduct?.formType || ''}
        accentColor={selectedProduct?.accentColor || '#dc2626'}
      />
    </section>
  );
};

export default SolarSolutionsSection;