import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Zap, Leaf, Battery, Smartphone, CheckCircle, ArrowRight, Play, Pause
} from 'lucide-react';
import homeSliderVideo from '../assets/home_slider.mp4';

const AboutSection = () => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const benefits = [
    'Tailored solar solutions for your needs',
    'High efficiency panels & trusted brands',
    'Local experts, lifetime support',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section ref={ref} id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="text-[#39b54a] text-xs font-extrabold tracking-widest uppercase">
                ABOUT US
              </span>
              <h2 className="mt-2 text-4xl lg:text-5xl font-extrabold text-[#1e2d53] leading-tight">
                Smarter Energy,<br />
                <span className="text-[#39b54a]">Better Tomorrow</span>
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-slate-500 text-base leading-relaxed max-w-md"
            >
              We make solar simple, affordable and effective. From consultation to installation and beyond – we're with you all the way.
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-3">
              {benefits.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
                  <span className="text-slate-700 font-medium text-sm">{b}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 bg-[#1e2d53] hover:bg-[#15203c] text-white pl-6 pr-1.5 py-1.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>Discover More</span>
              <motion.div
                whileHover={{ rotate: 45 }}
                className="w-8 h-8 bg-white text-[#1e2d53] rounded-full flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* ── Right: Video with Badge Overlays ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Video Container */}
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Background */}
              <motion.div
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : { scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={homeSliderVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
              </motion.div>

              {/* Floating Content Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Video Status Indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto"
                >
                  <div className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                    <span className="text-white text-xs font-medium">
                      {isPlaying ? 'LIVE' : 'PAUSED'}
                    </span>
                  </div>
                </motion.div>

                {/* ── Badge 1: Reduce Bills — top-left ── */}
                <BadgeCard
                  icon={<Zap className="w-4 h-4 text-[#39b54a]" />}
                  iconBg="bg-emerald-50"
                  title="Reduce Bills"
                  sub="Up to 90%"
                  className="top-4 left-4"
                  delay={0.6}
                  isInView={isInView}
                />

                {/* ── Badge 2: CO₂ Reduction — top-right ── */}
                <BadgeCard
                  icon={<Leaf className="w-4 h-4 text-[#39b54a]" />}
                  iconBg="bg-emerald-50"
                  title="CO₂ Reduction"
                  sub="Every kW Counts"
                  className="top-4 right-4"
                  delay={0.8}
                  isInView={isInView}
                />

                {/* ── Badge 3: Battery Ready — bottom-left ── */}
                <BadgeCard
                  icon={<Battery className="w-4 h-4 text-blue-500" />}
                  iconBg="bg-blue-50"
                  title="Battery Ready"
                  sub="Future Proof"
                  className="bottom-4 left-4"
                  delay={1.0}
                  isInView={isInView}
                />

                {/* ── Badge 4: Smart Monitoring — bottom-right ── */}
                <BadgeCard
                  icon={<Smartphone className="w-4 h-4 text-indigo-500" />}
                  iconBg="bg-indigo-50"
                  title="Smart Monitoring"
                  sub="Real-time App"
                  className="bottom-4 right-4"
                  delay={1.2}
                  isInView={isInView}
                />
              </div>

              {/* Play/Pause Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
                onClick={toggleVideo}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group z-40"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isPlaying ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </motion.div>

                {/* Hover ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
              </motion.button>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              animate={isInView ? { opacity: 0.1, rotate: 0 } : {}}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-[#39b54a] rounded-full -z-10"
            />
            <motion.div
              initial={{ opacity: 0, rotate: 45 }}
              animate={isInView ? { opacity: 0.05, rotate: 0 } : {}}
              transition={{ delay: 1.3, duration: 1 }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#1e2d53] rounded-full -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* Enhanced badge component with improved animations */
const BadgeCard = ({ icon, iconBg, title, sub, className, delay, isInView }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
    whileHover={{ scale: 1.05, y: -2 }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    className={`absolute ${className} bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2.5 shadow-xl border border-white/20 flex items-center space-x-2 z-30 min-w-[155px] pointer-events-auto hover:shadow-2xl transition-shadow duration-300`}
  >
    <motion.div
      initial={{ rotate: -180 }}
      animate={isInView ? { rotate: 0 } : {}}
      transition={{ delay: delay + 0.2, duration: 0.8 }}
      className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
    >
      {icon}
    </motion.div>
    <div>
      <div className="text-[11px] font-extrabold text-[#1e2d53] leading-tight">{title}</div>
      <div className="text-[10px] text-slate-400 font-medium">{sub}</div>
    </div>
  </motion.div>
);

export default AboutSection;