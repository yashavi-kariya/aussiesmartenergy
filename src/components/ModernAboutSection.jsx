import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Zap,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sun,
  Battery,
  Home,
  Factory,
  Users,
  Clock
} from 'lucide-react';

const ModernAboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activeFeature, setActiveFeature] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
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

  const features = [
    {
      icon: Sun,
      title: "Residential Solar Systems",
      description: "Perfect solar solutions for homes of all sizes and energy needs",
      color: "from-emerald-500 to-teal-600",
      stats: [
        { label: "Peak Efficiency", value: "22%" },
        { label: "Warranty", value: "25 Years" },
        { label: "ROI", value: "4-6 Years" }
      ]
    },
    {
      icon: Factory,
      title: "Commercial Solar Solutions",
      description: "Large-scale solar systems designed for businesses and commercial properties",
      color: "from-blue-500 to-cyan-600",
      stats: [
        { label: "Capacity", value: "1MW+" },
        { label: "Savings", value: "70%" },
        { label: "Tax Benefits", value: "30%" }
      ]
    },
    {
      icon: Battery,
      title: "Battery Storage Solutions",
      description: "Store excess energy for use during peak times or power outages",
      color: "from-orange-500 to-red-500",
      stats: [
        { label: "Storage", value: "13.5kWh" },
        { label: "Backup Power", value: "24/7" },
        { label: "Efficiency", value: "95%" }
      ]
    },
    {
      icon: Users,
      title: "Expert Installation & Support",
      description: "Professional CEC approved installers with comprehensive warranties",
      color: "from-purple-500 to-indigo-600",
      stats: [
        { label: "Experience", value: "25+ Years" },
        { label: "Installers", value: "CEC Approved" },
        { label: "Support", value: "24/7" }
      ]
    }
  ];

  const highlights = [
    "Your Trusted Energy Partner",
    "CEC Approved Solar Installers",
    "Premium Solar Products",
    "Long Lasting Warranties"
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-white">
      {/* Light Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-50 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-6 py-3 bg-teal-500/10 backdrop-blur-sm border border-teal-200 rounded-full text-teal-600 text-sm font-medium mb-6"
          >
            ABOUT US
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-8 text-gray-800"
          >
            Your Trusted{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-800 bg-clip-text text-transparent">
              Energy Partner
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Solar is skilled and experienced at providing high quality solar installations by CEC approved solar installers
            for your residential and commercial solar installations. We offer the best solar solutions to our customers,
            customized to their solar requirements, with a wide range of premium CEC approved solar products and long lasting warranties.
          </motion.p>

          {/* Highlights Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{highlight}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Business Impact Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Left - 3D House Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative">
              <motion.img
                src="/src/assets/ChatGPT Image Jul 7, 2026, 10_10_54 AM.png"
                alt="3D Solar House"
                className="w-full h-auto rounded-3xl shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 3, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Floating Info Badges */}
              <motion.div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">$1,400+</div>
                  <div className="text-xs text-gray-600">Rebates Available</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Sun className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">CEC Approved</div>
                    <div className="text-xs text-gray-600">Premium Quality</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-300 rounded-full opacity-60"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Commercial Solar Benefits
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We Australians are quickly realising the benefits of solar. However, it's not just residential property owners
                that can profit from solar power, with Australian businesses also reaping the benefits of Commercial Solar Systems.
                Almost every commercial property is using more energy than the average home, making the environmental and financial
                impact far greater.
              </p>
            </div>

            {/* Feature Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "70%", label: "Energy Savings", icon: TrendingUp },
                { value: "30%", label: "Tax Benefits", icon: Award },
                { value: "25+", label: "Years Warranty", icon: Shield }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-3"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center mb-16">
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Our Solar Solutions
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Comprehensive solar solutions for residential and commercial properties across Australia
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-2xl ${activeFeature === index ? 'scale-105 shadow-2xl' : ''
                  }`}
                onMouseEnter={() => setActiveFeature(index)}
                whileHover={{ y: -10 }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                {/* Stats */}
                <div className="space-y-3">
                  {feature.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <span className="text-sm font-bold text-gray-800">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Active Indicator */}
                {activeFeature === index && (
                  <motion.div
                    className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full shadow-lg`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernAboutSection;