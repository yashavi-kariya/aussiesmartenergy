import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Plus,
  Minus,
  HelpCircle,
  Lightbulb,
  DollarSign,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [openFAQ, setOpenFAQ] = useState(0);

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

  const faqs = [
    {
      id: 1,
      icon: Lightbulb,
      question: "What are the benefits of solar energy?",
      answer: "Solar energy provides numerous benefits including significant savings on electricity bills, reduced carbon footprint, increased property value, energy independence, and protection against rising electricity costs. With government rebates and incentives, solar has never been more affordable in Australia.",
      category: "General"
    },
    {
      id: 2,
      icon: DollarSign,
      question: "How much can I save with solar?",
      answer: "Savings depend on your energy usage, system size, and location. On average, Australian households save $2,000-$4,000 annually on electricity bills. With our premium systems and current rebates, many customers see payback periods of 4-6 years, followed by 20+ years of free electricity.",
      category: "Financial"
    },
    {
      id: 3,
      icon: HelpCircle,
      question: "How do solar rebates work?",
      answer: "The Australian government offers several rebate schemes including Small-scale Technology Certificates (STCs) which can reduce your system cost by $1,400+. Additional state-based rebates and interest-free loans may also be available. We handle all rebate applications for you to ensure maximum savings.",
      category: "Rebates"
    },
    {
      id: 4,
      icon: Clock,
      question: "How long does installation take?",
      answer: "Most residential installations are completed in 1-2 days. The process includes initial consultation, site assessment, system design, approval processes, and installation. From quote acceptance to activation, the entire process typically takes 4-8 weeks depending on approvals and grid connection.",
      category: "Installation"
    },
    {
      id: 5,
      icon: Shield,
      question: "What warranty do you provide?",
      answer: "We provide comprehensive warranties including 25+ years on solar panels, 10-15 years on inverters, and 10 years on workmanship. All our products are from tier-1 manufacturers and our CEC approved installers ensure quality installation that meets Australian standards.",
      category: "Warranty"
    },
    {
      id: 6,
      icon: Zap,
      question: "Will solar work during power outages?",
      answer: "Standard grid-connected solar systems shut down during outages for safety reasons. However, with battery storage systems, you can have backup power during outages. We offer various battery solutions including Tesla Powerwall and other premium brands for energy independence.",
      category: "Technical"
    },
    {
      id: 7,
      icon: HelpCircle,
      question: "How do I know what size system I need?",
      answer: "System size depends on your electricity usage, roof space, and budget. Our free consultation includes energy usage analysis and site assessment. We typically recommend systems between 6.6kW-13kW for homes and larger commercial systems for businesses based on specific requirements.",
      category: "General"
    },
    {
      id: 8,
      icon: DollarSign,
      question: "Do you offer financing options?",
      answer: "Yes, we offer various financing options including zero upfront cost plans, low-interest loans, and flexible payment terms. Many customers find that their monthly loan payment is less than their previous electricity bill, providing immediate positive cash flow.",
      category: "Financial"
    }
  ];

  const categories = [
    { name: "All", icon: HelpCircle, count: faqs.length },
    { name: "General", icon: Lightbulb, count: faqs.filter(f => f.category === "General").length },
    { name: "Financial", icon: DollarSign, count: faqs.filter(f => f.category === "Financial").length },
    { name: "Installation", icon: Clock, count: faqs.filter(f => f.category === "Installation").length }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-50 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
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
            variants={itemVariants}
            className="inline-block px-6 py-3 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-sm font-semibold mb-6"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-8 text-slate-800"
          >
            Got Questions?{' '}
            <span className="text-emerald-600">We Have Answers</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Find answers to commonly asked questions about solar energy, installation process, and our services
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center mb-12"
        >
          <div className="bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  variants={itemVariants}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-white text-emerald-600 shadow-lg border border-emerald-200'
                      : 'text-slate-600 hover:bg-white hover:text-slate-800'
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <category.icon className="w-5 h-5" />
                  <span>{category.name}</span>
                  <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <button
                    className="w-full text-left p-6 hover:bg-slate-50 transition-colors duration-300 flex items-center justify-between"
                    onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <faq.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 text-left">
                          {faq.question}
                        </h3>
                        <span className="text-sm text-emerald-600 font-medium">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      {openFAQ === index ? (
                        <Minus className="w-5 h-5 text-slate-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-slate-600" />
                      )}
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="pl-14">
                            <p className="text-slate-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Our solar experts are here to help. Get personalized answers and a free consultation 
              tailored to your specific needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Consultation
              </motion.button>
              
              <motion.button
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Call 1300 SOLAR
              </motion.button>
            </div>
            
            <p className="text-sm text-slate-400 mt-4">
              Free consultation • No obligation • Expert advice
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;