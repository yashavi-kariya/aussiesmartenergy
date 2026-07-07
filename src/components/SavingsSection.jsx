import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  DollarSign,
  TrendingUp,
  ArrowRight,
  Calculator,
  PiggyBank,
  Zap,
  Leaf,
  Award,
  Star,
  CheckCircle
} from 'lucide-react';

const SavingsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activePromo, setActivePromo] = useState(0);

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

  const promoCards = [
    {
      id: 1,
      title: "Government Rebates Available",
      subtitle: "Save Thousands Today!",
      description: "Take advantage of government incentives and rebates to reduce your solar installation costs significantly.",
      savings: "Up to $2,400",
      gradient: "from-green-500 to-emerald-600",
      icon: DollarSign,
      features: [
        "Federal rebates up to 30%",
        "State government incentives", 
        "Local council rebates",
        "Feed-in tariff programs"
      ]
    },
    {
      id: 2,
      title: "Solar Pay Bay, Easy. Affordable.",
      subtitle: "Flexible Payment Options",
      description: "We offer competitive payment plans and financing options to make solar accessible for everyone.",
      savings: "From $99/month",
      gradient: "from-blue-500 to-cyan-600",
      icon: PiggyBank,
      features: [
        "Zero upfront costs available",
        "Flexible payment terms",
        "Competitive interest rates",
        "No hidden fees"
      ]
    }
  ];

  const testimonials = [
    {
      name: "James P.",
      location: "Sydney, NSW",
      rating: 5,
      text: "Outstanding service from start to finish! Our solar bills are now almost zero and the installation was seamless.",
      savings: "$3,200/year",
      system: "8.5kW System"
    },
    {
      name: "Sarah M.", 
      location: "Melbourne, VIC",
      rating: 5,
      text: "Best decision we ever made! The team was professional, and our energy bills have dropped by 85%.",
      savings: "$2,800/year",
      system: "6.6kW System"
    }
  ];

  const faqs = [
    "What are the benefits of solar?",
    "How much can I save with solar?",
    "How do solar rebates work?",
    "How long is the warranty?"
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Promotional Cards Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 mb-20"
        >
          {promoCards.map((promo, index) => (
            <motion.div
              key={promo.id}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer transition-all duration-300 ${
                activePromo === index ? 'scale-105' : 'hover:scale-102'
              }`}
              onMouseEnter={() => setActivePromo(index)}
              whileHover={{ y: -5 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${promo.gradient}`}>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>

              {/* Content */}
              <div className="relative z-10 p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <promo.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{promo.savings}</div>
                    <div className="text-sm opacity-90">Potential Savings</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                <p className="text-lg font-medium opacity-90 mb-4">{promo.subtitle}</p>
                <p className="text-white/80 mb-6 leading-relaxed">{promo.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {promo.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={activePromo === index ? { opacity: 1, x: 0 } : { opacity: 0.8, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Steps Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-6 py-3 bg-green-500/10 backdrop-blur-sm border border-green-200 rounded-full text-green-600 text-sm font-medium mb-6"
          >
            OUR PROCESS
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-16 text-gray-800"
          >
            From Start to Solar in{' '}
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              5 Easy Steps
            </span>
          </motion.h2>

          {/* Process Grid */}
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "1", title: "Free Consultation", desc: "Get personalized solar advice", icon: Calculator, color: "from-blue-500 to-blue-600" },
              { step: "2", title: "System Design", desc: "Custom designed for your home", icon: Award, color: "from-green-500 to-green-600" },
              { step: "3", title: "Product Quote", desc: "Transparent pricing & options", icon: DollarSign, color: "from-yellow-500 to-orange-500" },
              { step: "4", title: "Installation", desc: "Professional installation service", icon: Zap, color: "from-red-500 to-pink-500" },
              { step: "5", title: "Activation", desc: "Start saving immediately", icon: CheckCircle, color: "from-purple-500 to-indigo-500" }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  {/* Step Number */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-4`}>
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>

                {/* Connection Arrow */}
                {index < 4 && (
                  <motion.div
                    className="hidden md:block absolute top-16 -right-4 text-gray-300"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <span className="inline-block px-6 py-3 bg-purple-500/10 backdrop-blur-sm border border-purple-200 rounded-full text-purple-600 text-sm font-medium mb-4">
              REAL STORIES, REAL SAVINGS
            </span>
            <h3 className="text-3xl font-bold text-gray-800">What Our Customers Say</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{testimonial.savings}</div>
                    <div className="text-sm text-gray-600">Annual Savings</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{testimonial.system}</div>
                    <div className="text-sm text-gray-600">Installed System</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <span className="inline-block px-6 py-3 bg-gray-500/10 backdrop-blur-sm border border-gray-200 rounded-full text-gray-600 text-sm font-medium mb-4">
              NEED HELP?
            </span>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                    {faq}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            variants={itemVariants}
            className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-3"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SavingsSection;