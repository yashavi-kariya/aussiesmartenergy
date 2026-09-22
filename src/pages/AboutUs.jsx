import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sun,
  Battery,
  Zap,
  Shield,
  ShieldCheck,
  Award,
  Users,
  Heart,
  CheckCircle,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Home,
  Clock,
  Compass,
  FileText,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ThumbsUp,
  MessageSquare,
  BadgeCheck,
  Check,
  Star
} from 'lucide-react';

import about1 from '../assets/about1.jpg';
import batteryInstallationImg from '../assets/fox_ess_home_system.jpg';
import solarPayback from '../assets/solar_payback_house.jpg';

// Premium spring & easing definitions
const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
      ease: EASE
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE }
  }
};

// Interactive 3D Tilt Card
const TiltCard = ({ children, className = '' }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  // Carousel State in Section 1
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Section Refs for scroll trigger animations
  const heroRef = useRef(null);
  const controlRef = useRef(null);
  const experienceRef = useRef(null);
  const netccRef = useRef(null);
  const peopleRef = useRef(null);
  const moreThanRef = useRef(null);
  const whyChooseRef = useRef(null);
  const promiseRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const controlInView = useInView(controlRef, { once: true, threshold: 0.15 });
  const experienceInView = useInView(experienceRef, { once: true, threshold: 0.15 });
  const netccInView = useInView(netccRef, { once: true, threshold: 0.1 });
  const peopleInView = useInView(peopleRef, { once: true, threshold: 0.15 });
  const moreThanInView = useInView(moreThanRef, { once: true, threshold: 0.15 });
  const whyChooseInView = useInView(whyChooseRef, { once: true, threshold: 0.1 });
  const promiseInView = useInView(promiseRef, { once: true, threshold: 0.15 });

  const controlImages = [
    {
      src: about1,
      title: "Clean Residential Solar",
      caption: "Tailored to your roof & lifestyle"
    },
    {
      src: batteryInstallationImg,
      title: "Smart Battery Storage",
      caption: "Power your home through the evening"
    },
    {
      src: solarPayback,
      title: "Sustainable Australian Homes",
      caption: "Energy independence & long-term value"
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % controlImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [autoPlay, controlImages.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + controlImages.length) % controlImages.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 7000);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % controlImages.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 7000);
  };

  // What NETCC means for you list (exact user content)
  const netccBenefits = [
    {
      title: "Clear and honest information",
      description: "We aim to make the technical side of solar and batteries easier to understand, so you can make an informed decision.",
      icon: FileText,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      title: "Responsible sales practices",
      description: "We believe in recommending solutions based on your needs rather than using pressure to make a sale.",
      icon: ShieldCheck,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      title: "Transparent communication",
      description: "We keep you informed about your system, installation requirements, pricing and the process from start to finish.",
      icon: MessageSquare,
      color: "text-teal-600 bg-teal-50 border-teal-200"
    },
    {
      title: "Professional customer experience",
      description: "From your first enquiry through to installation and beyond, we aim to treat every customer with respect and professionalism.",
      icon: Award,
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      title: "Ongoing support",
      description: "Our relationship doesn't end when the installer leaves. We're here to support you throughout your energy journey.",
      icon: Clock,
      color: "text-rose-600 bg-rose-50 border-rose-200"
    }
  ];

  // Why choose points (exact user content)
  const whyChoosePoints = [
    { text: "NETCC Approved Seller", icon: Award, color: "text-[#39b54a]" },
    { text: "CEC-accredited installation partners", icon: CheckCircle2, color: "text-emerald-500" },
    { text: "Experienced solar industry professionals", icon: Users, color: "text-blue-500" },
    { text: "SAA-certified installation partners", icon: ShieldCheck, color: "text-indigo-500" },
    { text: "Quality solar and battery products", icon: Zap, color: "text-amber-500" },
    { text: "Professional installation", icon: CheckCircle2, color: "text-[#39b54a]" },
    { text: "Transparent advice and communication", icon: MessageSquare, color: "text-teal-500" },
    { text: "Dedicated after-sales support", icon: Heart, color: "text-rose-500" },
    { text: "Solutions designed around your energy needs", icon: Compass, color: "text-sky-500" },
    { text: "Nationwide service across Australia", icon: MapPin, color: "text-emerald-600" }
  ];

  // 4 Focus Pillars (exact user content)
  const focusPillars = [
    {
      title: "Quality products",
      description: "Carefully selected Tier 1 panels, inverters & battery technologies built for Australian conditions.",
      icon: Zap,
      borderColor: "border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100",
      iconColor: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Professional installation",
      description: "Executed by SAA-certified contractors & CEC-accredited installers adhering to strict safety codes.",
      icon: ShieldCheck,
      borderColor: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      iconColor: "text-blue-600 bg-blue-50"
    },
    {
      title: "Honest advice",
      description: "Clear recommendations focused strictly on what makes financial and practical sense for your household.",
      icon: ThumbsUp,
      borderColor: "border-amber-200 hover:border-amber-400 hover:shadow-amber-100",
      iconColor: "text-amber-600 bg-amber-50"
    },
    {
      title: "Genuine support",
      description: "Dedicated guidance before, during, and long after your system has begun generating green energy.",
      icon: Heart,
      borderColor: "border-rose-200 hover:border-rose-400 hover:shadow-rose-100",
      iconColor: "text-rose-600 bg-rose-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#39b54a]/20 selection:text-[#1e2d53] overflow-hidden">

      {/* =========================================================================
          HERO SECTION: About Aussie Smart Energy & Introduction
          ========================================================================= */}
      <section
        ref={heroRef}
        className="relative pt-36 sm:pt-40 lg:pt-44 pb-20 lg:pb-28 bg-gradient-to-b from-white via-emerald-50/40 to-slate-50 overflow-hidden border-b border-slate-200/60"
      >
        {/* Animated Radial Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.35, 0.55, 0.35],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#39b54a]/20 via-teal-400/15 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.25, 0.45, 0.25],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 -left-10 w-[550px] h-[550px] bg-gradient-to-tr from-sky-400/20 via-blue-400/10 to-transparent rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#0f766e0a_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* Left Col: Main Page Headings & Story */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-[#39b54a]/20 to-teal-500/15 border-2 border-[#39b54a]/30 backdrop-blur-md shadow-md shadow-emerald-500/10"
              >
                <div className="w-6 h-6 rounded-full bg-[#39b54a] flex items-center justify-center shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                </div>
                <span className="text-sm sm:text-base font-extrabold tracking-wide text-[#176a26] uppercase">
                  Australian Solar & Battery Specialists
                </span>
              </motion.div>

              {/* H1 Title */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1e2d53] leading-tight"
              >
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2c8d39] via-[#39b54a] to-teal-600">Aussie Smart Energy</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.h3
                variants={itemVariants}
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-700 tracking-tight"
              >
                Smarter Energy. Better Choices. A Team You Can Trust.
              </motion.h3>

              {/* Story Box */}
              <motion.div
                variants={itemVariants}
                className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl shadow-slate-200/50 space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed text-left"
              >
                <p className="text-lg sm:text-xl font-medium text-slate-900">
                  At <strong className="text-[#39b54a] font-bold">Aussie Smart Energy</strong>, we understand that choosing a solar or battery system is a big decision.
                </p>
                <p>
                  It’s not just about panels, batteries or inverters. It’s about your <strong className="text-slate-900 font-bold">home, your family, your energy bills and your future</strong>.
                </p>
                <p>
                  That’s why we believe you deserve more than a salesperson who simply wants to sell you a system. You deserve someone who takes the time to <strong className="text-[#1e7c2c] font-bold">listen, explain your options clearly and recommend what genuinely makes sense for you</strong>.
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <p className="text-[#2c8d39] font-bold text-base sm:text-lg italic">
                    That is the difference we aim to make.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#1e7c2c]">
                    <ShieldCheck className="w-4 h-4 text-[#39b54a]" />
                    <span>NETCC Approved Seller</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#39b54a] to-[#2ea43e] hover:from-[#2fa03f] hover:to-[#268c34] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2.5 group transform hover:-translate-y-0.5"
                >
                  <span>Talk With Our Team</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="tel:1300986827"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm sm:text-base shadow-sm transition-all duration-300 flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#39b54a]" />
                  <span>1300 986 827</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Col: 3D Tilt Visual Presentation Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <TiltCard className="w-full">
                <div className="relative rounded-3xl overflow-hidden bg-white p-6 sm:p-7 shadow-2xl border border-slate-200/90 space-y-5">

                  {/* Header Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#39b54a] to-emerald-600 flex items-center justify-center text-white shadow-md">
                        <Zap className="w-5 h-5 fill-current" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-black text-[#1e2d53]">AUSSIE SMART ENERGY</div>
                        <div className="text-[11px] text-[#2c8d39] font-medium">Clean Energy Standards</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-extrabold text-[#1e7c2c] uppercase tracking-wider">
                      Verified
                    </span>
                  </div>

                  {/* Image Carousel */}
                  <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border border-slate-100 shadow-inner group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="absolute inset-0"
                      >
                        <img
                          src={controlImages[activeSlide].src}
                          alt={controlImages[activeSlide].title}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121c33]/90 via-[#121c33]/20 to-transparent" />

                        {/* Slide Caption */}
                        <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                          <h4 className="text-base sm:text-lg font-bold">
                            {controlImages[activeSlide].title}
                          </h4>
                          <p className="text-xs text-slate-200 mt-0.5">
                            {controlImages[activeSlide].caption}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div className="absolute top-3 right-3 flex gap-1.5 z-20">
                      {controlImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveSlide(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === activeSlide ? 'w-5 bg-[#39b54a]' : 'w-1.5 bg-white/60'
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 4 Feature Icons */}
                  <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                    {[
                      { icon: Sun, label: "Solar Energy" },
                      { icon: Battery, label: "Smart Storage" },
                      { icon: Zap, label: "Efficiency" },
                      { icon: ShieldCheck, label: "CEC & SAA" }
                    ].map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                        <item.icon className="w-5 h-5 text-[#39b54a]" />
                        <span className="text-[10px] font-bold text-slate-700">{item.label}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </TiltCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: Helping Australians Take Control of Their Energy
          ========================================================================= */}
      <section ref={controlRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content (7 Cols) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controlInView ? "visible" : "hidden"}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-[#39b54a]/20 to-teal-500/15 border-2 border-[#39b54a]/30 backdrop-blur-md shadow-md shadow-emerald-500/10"
              >
                <div className="w-6 h-6 rounded-full bg-[#39b54a] flex items-center justify-center shadow-sm">
                  <Sun className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm sm:text-base font-extrabold tracking-wide text-[#176a26] uppercase">
                  Our Purpose & Mission
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e2d53] leading-tight"
              >
                Helping Australians Take Control of Their Energy
              </motion.h2>

              <motion.div variants={itemVariants} className="w-20 h-1.5 bg-gradient-to-r from-[#39b54a] to-emerald-400 rounded-full" />

              <motion.div variants={itemVariants} className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
                <p>
                  We are an Australian solar and battery energy company helping homeowners and businesses take greater control of their energy through <strong className="text-[#1e2d53] font-semibold">solar power, battery storage and smart energy solutions</strong>.
                </p>
                <p>
                  Every property is different. Every household uses energy differently. And every customer has different goals.
                </p>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50/50 border-l-4 border-[#39b54a] shadow-sm text-slate-800">
                  <p className="font-medium text-base sm:text-lg">
                    Whether you want to reduce your electricity bills, become less dependent on the grid, store your solar energy for the evening or prepare your home for the future, <strong className="text-[#1e2d53] font-bold">our job is to help you find the right solution — not simply the biggest one.</strong>
                  </p>
                </div>
              </motion.div>

              {/* Quick Feature Checklist */}
              <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Tailored Rooftop Solar Layouts",
                  "Smart Battery Backup Solutions",
                  "Lower Energy Bill Strategies",
                  "Future-Ready Scalable Systems"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image Slider (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={controlInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-4 border-white h-[420px] sm:h-[460px]">
                {controlImages.map((slide, idx) => (
                  <motion.div
                    key={idx}
                    initial={false}
                    animate={{
                      opacity: idx === activeSlide ? 1 : 0,
                      scale: idx === activeSlide ? 1 : 1.04
                    }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className={`absolute inset-0 ${idx === activeSlide ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121c33]/90 via-[#121c33]/20 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                      <h4 className="text-xl font-bold mb-1">{slide.title}</h4>
                      <p className="text-sm text-slate-200">{slide.caption}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Slider Controls */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {controlImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${i === activeSlide ? 'w-6 bg-[#39b54a]' : 'w-2 bg-white/60'}`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Stat Pill */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={controlInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-5 -left-5 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#39b54a] flex-shrink-0">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Focus</div>
                  <div className="text-sm sm:text-base font-extrabold text-[#1e2d53]">Your Home & Needs First</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: Experience You Can Rely On
          ========================================================================= */}
      <section ref={experienceRef} className="py-20 lg:py-28 bg-slate-100/70 text-[#1e2d53] relative overflow-hidden border-y border-slate-200/80">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={experienceInView ? "visible" : "hidden"}
            className="text-center max-w-3xl mx-auto space-y-4 mb-16"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-[#39b54a]/20 to-teal-500/15 border-2 border-[#39b54a]/30 backdrop-blur-md shadow-md shadow-emerald-500/10"
            >
              <div className="w-6 h-6 rounded-full bg-[#39b54a] flex items-center justify-center shadow-sm">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm sm:text-base font-extrabold tracking-wide text-[#176a26] uppercase">
                Certified Expertise
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e2d53] leading-tight"
            >
              Experience You Can Rely On
            </motion.h2>

            <motion.div variants={itemVariants} className="w-20 h-1.5 bg-[#39b54a] rounded-full mx-auto" />

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 leading-relaxed"
            >
              With extensive experience in the solar industry, our team understands what matters beyond the sales conversation.
            </motion.p>
          </motion.div>

          {/* Three Key Pillar Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={experienceInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8 text-left"
          >
            {/* Card 1: Certified Contractors */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#39b54a] transition-all duration-300 shadow-lg hover:shadow-xl space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#39b54a]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2d53]">SAA & CEC Accreditations</h3>
              <p className="text-slate-600 leading-relaxed">
                We work with <strong className="text-slate-900 font-semibold">experienced SAA-certified contractors and CEC-accredited installers</strong>.
              </p>
            </motion.div>

            {/* Card 2: Careful Product Selection */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2d53]">Careful Product Selection</h3>
              <p className="text-slate-600 leading-relaxed">
                We carefully select products based on <strong className="text-slate-900 font-semibold">quality, safety, performance, reliability and long-term value</strong>.
              </p>
            </motion.div>

            {/* Card 3: Complete Lifecycle Standard */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2d53]">End-to-End High Standards</h3>
              <p className="text-slate-600 leading-relaxed">
                From system design and product selection to installation and after-sales support, we believe every part of your experience should meet the same high standard.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: NETCC Approved Seller & What This Means for You
          ========================================================================= */}
      <section ref={netccRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={netccInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto text-center space-y-5 mb-16"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-[#39b54a]/20 to-teal-500/15 border-2 border-[#39b54a]/30 backdrop-blur-md shadow-md shadow-emerald-500/10"
            >
              <div className="w-6 h-6 rounded-full bg-[#39b54a] flex items-center justify-center shadow-sm">
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm sm:text-base font-extrabold tracking-wide text-[#176a26] uppercase">
                Consumer Protection & Trust
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e2d53] leading-tight"
            >
              NETCC Approved Seller
            </motion.h2>

            <motion.div variants={itemVariants} className="w-20 h-1.5 bg-[#39b54a] rounded-full mx-auto" />

            <motion.div
              variants={itemVariants}
              className="p-6 sm:p-8 rounded-3xl bg-slate-50 shadow-md border border-slate-200 text-left space-y-3"
            >
              <p className="text-lg sm:text-xl font-bold text-[#1e2d53]">
                Aussie Smart Energy is a New Energy Tech Approved Seller under the New Energy Tech Consumer Code (NETCC).
              </p>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                For us, being NETCC approved is about more than displaying a logo. It reflects our commitment to <strong className="text-slate-900 font-semibold">responsible selling, transparency and strong consumer protection standards</strong>.
              </p>
            </motion.div>
          </motion.div>

          {/* Subheading: What This Means for You */}
          <div className="mb-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-black text-[#1e2d53] flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-[#39b54a]" />
              What This Means for You
            </h3>
            <p className="text-slate-600 mt-2 text-base">
              The 5 core pillars of our commitment to you as an NETCC Approved Seller:
            </p>
          </div>

          {/* 5 Benefit Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={netccInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
          >
            {netccBenefits.map((benefit, index) => {
              const IconComp = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${benefit.color}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xl sm:text-2xl font-black px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/90 shadow-sm group-hover:bg-emerald-100 group-hover:text-[#176a26] group-hover:border-emerald-300 transition-all duration-300 font-outfit">
                        0{index + 1}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#1e2d53] flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
                      <span>{benefit.title}</span>
                    </h4>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Special Callout in 6th Slot */}
            <motion.div
              variants={itemVariants}
              className="p-7 rounded-2xl bg-gradient-to-br from-[#12285a] to-[#0c1d42] text-white flex flex-col justify-between shadow-xl space-y-4 border border-[#12285a] group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#39b54a]">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black px-3.5 py-1.5 rounded-xl bg-white/10 text-emerald-400 border border-white/20 shadow-sm font-outfit">
                    06
                  </span>
                </div>
                <h4 className="text-xl font-bold">100% Protection Focused</h4>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Enjoy peace of mind knowing you are dealing with a verified, ethical, and code-compliant Australian provider.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39b54a] hover:text-emerald-300 transition-colors pt-2"
              >
                <span>Ask our team a question</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: We're People Helping People
          ========================================================================= */}
      <section ref={peopleRef} className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Image / Visual Card (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={peopleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Aussie Family at Home with Solar"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121c33]/85 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39b54a]/90 text-white text-xs font-bold uppercase tracking-wider">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Real Australian Homes</span>
                  </div>
                  <h4 className="text-xl font-bold">Australian Families First</h4>
                  <p className="text-xs text-slate-200">
                    Behind every installation is a real family and a real reason for switching.
                  </p>
                </div>
              </div>

              {/* Decorative badge */}
              <div className="absolute -top-5 -right-5 bg-gradient-to-r from-[#39b54a] to-emerald-600 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <Users className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Plain English Advice</span>
              </div>
            </motion.div>

            {/* Right Text Content (7 Cols) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={peopleInView ? "visible" : "hidden"}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-[#39b54a]/20 to-teal-500/15 border-2 border-[#39b54a]/30 backdrop-blur-md shadow-md shadow-emerald-500/10"
              >
                <div className="w-6 h-6 rounded-full bg-[#39b54a] flex items-center justify-center shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm sm:text-base font-extrabold tracking-wide text-[#176a26] uppercase">
                  Our Philosophy
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e2d53] leading-tight"
              >
                We're People Helping People
              </motion.h2>

              <motion.div variants={itemVariants} className="w-20 h-1.5 bg-[#39b54a] rounded-full" />

              <motion.div variants={itemVariants} className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
                <p>
                  Behind every installation is a real Australian home, a real family and a real reason for making the switch to renewable energy.
                </p>
                <p>
                  We understand that customers may have questions, concerns or even feel overwhelmed by the number of solar and battery options available.
                </p>

                {/* Highlight box */}
                <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-md space-y-3">
                  <p className="text-lg sm:text-xl font-bold text-[#1e2d53]">
                    That's okay — that's what we're here for.
                  </p>
                  <p className="text-slate-600">
                    We'll take the time to explain things in plain English, answer your questions honestly and help you understand exactly what you're investing in.
                  </p>
                </div>

                <p className="text-slate-800 font-semibold text-base sm:text-lg">
                  We don't believe in complicated sales talk. <span className="text-[#2c8d39] font-bold">We believe in good advice, quality products and doing the right thing by our customers.</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: More Than Just an Installation
          ========================================================================= */}
      <section ref={moreThanRef} className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200/80">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={moreThanInView ? "visible" : "hidden"}
            className="text-center max-w-3xl mx-auto space-y-4 mb-16"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-[#39b54a]/20 to-teal-500/15 border-2 border-[#39b54a]/30 backdrop-blur-md shadow-md shadow-emerald-500/10"
            >
              <div className="w-6 h-6 rounded-full bg-[#39b54a] flex items-center justify-center shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm sm:text-base font-extrabold tracking-wide text-[#176a26] uppercase">
                Dedicated Craftsmanship
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e2d53] leading-tight"
            >
              More Than Just an Installation
            </motion.h2>

            <motion.div variants={itemVariants} className="w-20 h-1.5 bg-[#39b54a] rounded-full mx-auto" />

            <motion.div variants={itemVariants} className="space-y-3 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p>
                Our goal isn't simply to install another solar or battery system.
              </p>
              <p className="text-lg sm:text-xl font-bold text-[#1e7c2c]">
                We want you to look back and feel that you made the <span className="underline decoration-[#39b54a] underline-offset-4">right decision with the right team</span>.
              </p>
              <p className="text-slate-600">
                That's why we focus on:
              </p>
            </motion.div>
          </motion.div>

          {/* 4 Pillars Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={moreThanInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            {focusPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className={`p-7 rounded-3xl bg-slate-50 border ${pillar.borderColor} transition-all duration-300 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl`}
                >
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pillar.iconColor}`}>
                      <PillarIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1e2d53] capitalize">{pillar.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-[#2c8d39]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Standard on every job</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Statement: And most importantly, your satisfaction */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={moreThanInView ? "visible" : "hidden"}
            className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 text-center max-w-2xl mx-auto shadow-md"
          >
            <p className="text-xl sm:text-2xl font-black text-[#1e2d53]">
              And most importantly, <span className="text-[#2c8d39] uppercase tracking-wide">your satisfaction.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: Why Choose Aussie Smart Energy?
          ========================================================================= */}
      <section ref={whyChooseRef} className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={whyChooseInView ? "visible" : "hidden"}
            className="text-center max-w-3xl mx-auto space-y-4 mb-16"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-[#39b54a]/20 to-teal-500/15 border-2 border-[#39b54a]/30 backdrop-blur-md shadow-md shadow-emerald-500/10"
            >
              <div className="w-6 h-6 rounded-full bg-[#39b54a] flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm sm:text-base font-extrabold tracking-wide text-[#176a26] uppercase">
                Why We Stand Out
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e2d53] leading-tight"
            >
              Why Choose Aussie Smart Energy?
            </motion.h2>

            <motion.div variants={itemVariants} className="w-20 h-1.5 bg-[#39b54a] rounded-full mx-auto" />

            <motion.p
              variants={itemVariants}
              className="text-slate-600 text-base sm:text-lg"
            >
              Here is what sets our service, team, and standards apart:
            </motion.p>
          </motion.div>

          {/* 10 Checklist Points Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={whyChooseInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto text-left"
          >
            {whyChoosePoints.map((point, index) => {
              const PointIcon = point.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white hover:bg-emerald-50/50 border border-slate-200/90 hover:border-emerald-400 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100">
                    <PointIcon className={`w-5 h-5 ${point.color}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-[#1e2d53]">
                      {point.text}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: Our Promise to You (CTA / Closing Hero)
          ========================================================================= */}
      <section ref={promiseRef} className="py-20 lg:py-28 bg-gradient-to-br from-[#121c33] via-[#1e2d53] to-[#0f172a] text-white relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 w-96 h-96 bg-[#39b54a]/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={promiseInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#6ee7b7] text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5" />
              <span>Our Lifelong Commitment</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight"
            >
              Our Promise to You
            </motion.h2>

            <motion.div variants={itemVariants} className="w-24 h-1.5 bg-[#39b54a] rounded-full mx-auto" />

            {/* Promise Copy Container */}
            <motion.div
              variants={itemVariants}
              className="p-8 sm:p-10 rounded-3xl bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 text-slate-200 text-base sm:text-lg leading-relaxed text-left max-w-4xl mx-auto"
            >
              <p>
                We know that installing solar or a battery is an investment in your home and your future.
              </p>
              <p className="text-white font-bold text-lg sm:text-xl">
                So we don't take your trust for granted.
              </p>
              <div className="p-6 rounded-2xl bg-white/[0.06] border border-[#39b54a]/40 text-emerald-200">
                <p className="font-semibold text-lg sm:text-xl leading-relaxed text-white">
                  We'll be there to answer your questions, guide you through the process and support you after installation — because our relationship with you shouldn't end when the system is switched on.
                </p>
              </div>

              {/* 3 Step Triad */}
              <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-4 text-center border-t border-white/10">
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm sm:text-2xl font-black text-emerald-400 block">Your home.</span>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm sm:text-2xl font-black text-teal-300 block">Your energy.</span>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm sm:text-2xl font-black text-emerald-400 block">Your future.</span>
                </div>
              </div>
            </motion.div>

            {/* Closing Brand Tagline */}
            <motion.div variants={itemVariants} className="space-y-4 pt-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#39b54a] to-teal-300">
                Aussie Smart Energy — Powering a Smarter Future.
              </h3>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-xl bg-[#39b54a] hover:bg-[#2fa03f] text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-3 group"
                >
                  <span>Get in Touch With Us</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/solar/6.6kw"
                  className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base sm:text-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                >
                  <Sun className="w-5 h-5 text-[#39b54a]" />
                  <span>Explore Solar Systems</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;