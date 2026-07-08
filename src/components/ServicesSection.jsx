import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Home, Building2, Battery, Zap, ArrowRight, Check, Star } from 'lucide-react';

const ServicesSection = () => {
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

  const services = [
    {
      id: 1,
      icon: Home,
      badge: "Popular",
      title: "6.6kW System",
      subtitle: "Residential Solar",
      price: "From $6,999*",
      originalPrice: "$8,500",
      description: "Perfect for average households looking to reduce electricity bills significantly.",
      features: [
        "High Efficiency Panels",
        "Premium Quality Inverter",
        "25 Year Warranty",
        "Full Installation",
        "Grid Connection",
        "5 Year Workmanship"
      ],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      id: 2,
      icon: Building2,
      badge: "Best Value",
      title: "10.5kW System",
      subtitle: "Commercial Solar",
      price: "From $9,990*",
      originalPrice: "$12,500",
      description: "Ideal for small to medium businesses wanting to cut energy costs dramatically.",
      features: [
        "High Efficiency Panels",
        "Commercial Grade Inverter",
        "25 Year Warranty",
        "Professional Installation",
        "Monitoring System",
        "10 Year Maintenance"
      ],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      id: 3,
      icon: Battery,
      badge: "New",
      title: "13.2kW System",
      subtitle: "Premium Solar + Battery",
      price: "From $11,990*",
      originalPrice: "$15,000",
      description: "Complete energy independence with advanced battery storage technology.",
      features: [
        "Premium Solar Panels",
        "Hybrid Inverter System",
        "Lithium Battery Storage",
        "Smart Energy Management",
        "Backup Power Supply",
        "15 Year Total Warranty"
      ],
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50"
    }
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 75%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={cardVariants}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-red-500/10 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-4"
          >
            Our Solutions
          </motion.span>

          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-800 via-red-500 to-blue-600 bg-clip-text text-transparent">
              Solar Solutions for
            </span>
            <br />
            <span className="text-gray-800">Every Need</span>

          </motion.h2>

          <motion.p
            variants={cardVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Choose from our range of premium solar systems designed to maximize your savings
            and energy independence with cutting-edge technology.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className={`relative bg-gradient-to-br ${service.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 group overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
              </div>

              {/* Badge */}
              <div className="flex justify-between items-start mb-6">
                <motion.div
                  className={`px-3 py-1 bg-gradient-to-r ${service.gradient} text-white text-sm font-medium rounded-full shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                >
                  {service.badge}
                </motion.div>
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{service.title}</h3>
                  <p className="text-gray-600 font-medium">{service.subtitle}</p>
                </div>

                <p className="text-gray-600 leading-relaxed">{service.description}</p>

                {/* Pricing */}
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-800">{service.price}</span>
                  <span className="text-lg text-gray-500 line-through">{service.originalPrice}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                  >
                    <div className={`w-5 h-5 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                className={`group/btn w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Details</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>

              {/* Hover Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 text-center"
        >
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Government Rebates Available
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Solar panel rebates are available of <span className="font-bold text-green-600">$1,400</span> plus
                  the option of an interest-free loan to make solar more affordable than ever.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600">Trusted by 15,000+ customers</span>
                </div>
              </div>

              <div className="text-center md:text-right">
                <motion.button
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Check Your Savings
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;