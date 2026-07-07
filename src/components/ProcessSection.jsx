import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Phone,
  Calendar,
  FileText,
  Wrench,
  CheckCircle,
  ArrowRight,
  Clock,
  MapPin,
  User,
  Zap
} from 'lucide-react';

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activeStep, setActiveStep] = useState(0);

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

  const stepVariants = {
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

  const steps = [
    {
      id: 1,
      icon: Phone,
      title: "Free Consultation",
      subtitle: "Get started today",
      description: "Our experienced solar consultants will assess your energy needs and provide a customized solar solution for your property.",
      details: [
        "No obligation consultation",
        "Energy usage analysis",
        "Custom solution design",
        "Rebate eligibility check"
      ],
      duration: "30 mins",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: Calendar,
      title: "System Design",
      subtitle: "Tailored just for you",
      description: "Contact your solar specialist to discuss your specific requirements and get detailed system specifications and pricing.",
      details: [
        "Site assessment planning",
        "Custom system configuration",
        "Financial planning options",
        "Timeline coordination"
      ],
      duration: "1-2 days",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Product Quote",
      icon: FileText,
      subtitle: "Competitive pricing",
      description: "Receive your comprehensive quote with detailed system specifications, pricing breakdown, and financing options available.",
      details: [
        "Detailed system specs",
        "Transparent pricing",
        "Financing options",
        "Warranty information"
      ],
      duration: "Same day",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      id: 4,
      icon: Wrench,
      title: "Installation",
      subtitle: "Professional service",
      description: "Our CEC approved installers will professionally install your solar system with minimal disruption to your daily routine.",
      details: [
        "CEC approved installers",
        "Quality installation",
        "Safety compliance",
        "Minimal disruption"
      ],
      duration: "1-2 days",
      gradient: "from-red-500 to-pink-500"
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "Activation",
      subtitle: "Start saving immediately",
      description: "We'll take care of all grid connections and system activation so you can start enjoying clean, renewable energy right away.",
      details: [
        "Grid connection setup",
        "System commissioning",
        "Performance testing",
        "Monitoring setup"
      ],
      duration: "Same day",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-slate-50">
      {/* Light Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(248, 250, 252, 0.9) 0%, rgba(124, 163, 214, 0.9) 50%, rgba(236, 253, 245, 0.9) 100%)",
              "linear-gradient(135deg, rgba(116, 152, 135, 0.9) 0%, rgba(88, 145, 219, 0.9) 50%, rgba(248, 250, 252, 0.9) 100%)",
              "linear-gradient(225deg, rgba(83, 139, 213, 0.9) 0%, rgba(208, 224, 241, 0.9) 50%, rgba(236, 253, 245, 0.9) 100%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
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
            variants={stepVariants}
            className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-4"
          >
            Our Process
          </motion.span>

          <motion.h2
            variants={stepVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-800"
          >
            From Start to Solar in{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              5 Easy Steps
            </span>
          </motion.h2>

          <motion.p
            variants={stepVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            We make going solar simple and hassle-free. Our streamlined process ensures
            you get the best solar solution with professional service every step of the way.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-red-500 to-purple-500 opacity-20 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-red-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${(activeStep + 1) * 20}%` } : { width: 0 }}
              transition={{ duration: 2, delay: 1 }}
            />
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="relative"
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Step Card */}
                <motion.div
                  className={`relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/20 cursor-pointer ${activeStep === index ? 'bg-white/20 border-white/40 shadow-2xl' : ''
                    }`}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-bold text-white/60">
                      Step {step.id}
                    </div>
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <step.icon className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-blue-200 font-medium">{step.subtitle}</p>
                    </div>

                    <p className="text-blue-100 text-sm leading-relaxed line-clamp-3">
                      {step.description}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center space-x-2 text-xs text-white/80">
                      <Clock className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>

                  {/* Hover Details */}
                  <motion.div
                    className={`mt-4 space-y-2 transition-all duration-300 ${activeStep === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                      }`}
                  >
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className="flex items-center space-x-2 text-xs text-blue-100"
                        initial={{ opacity: 0, x: -10 }}
                        animate={activeStep === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: detailIndex * 0.1 }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${step.gradient} rounded-full flex-shrink-0`} />
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Active Indicator */}
                  {activeStep === index && (
                    <motion.div
                      className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r ${step.gradient} rounded-full shadow-lg`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:flex absolute top-8 -right-4 text-white/40"
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

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 text-center"
        >
          <motion.div
            variants={stepVariants}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-lg text-blue-100 mb-6">
                  Take the first step towards energy independence. Our solar experts are
                  ready to design the perfect solution for your home or business.
                </p>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Same day quote</span>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-right">
                <motion.button
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 mb-4"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start My Solar Journey
                </motion.button>
                <p className="text-sm text-white/60">No obligation • Free consultation</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;