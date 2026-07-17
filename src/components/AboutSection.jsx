import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Zap, Leaf, Battery, Smartphone, CheckCircle, ArrowRight
} from 'lucide-react';
import solarSystemGif from '../assets/solar-system-with-battery.gif';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

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
  const headlineWords = ['Smarter', 'Energy,'];
  const wordVariants = {
    hidden: { opacity: 0, y: 24, rotateX: -40, filter: 'blur(6px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.15 * i, duration: 0.55, ease: 'easeOut' },
    }),
  };
  const badgeData = [
    {
      icon: Zap,
      title: 'Reduce Bills',
      sub: 'Up to 90%',
      position: '-top-12 -left-4 sm:-top-14 sm:-left-8',
      accent: '#39b54a',
      iconBg: 'bg-emerald-50',
      glowFrom: 'rgba(57, 181, 74, 0.35)',
      glowTo: 'rgba(57, 181, 74, 0.05)',
      delay: 0.6,
    },
    {
      icon: Leaf,
      title: 'CO₂ Reduction',
      sub: 'Every kW Counts',
      position: '-top-12 -right-4 sm:-top-14 sm:-right-8',
      accent: '#0ea5a0',
      iconBg: 'bg-teal-50',
      glowFrom: 'rgba(14, 165, 160, 0.35)',
      glowTo: 'rgba(14, 165, 160, 0.05)',
      delay: 0.8,
    },
    {
      icon: Battery,
      title: 'Battery Ready',
      sub: 'Future Proof',
      position: '-bottom-14 -left-4 sm:-bottom-16 sm:-left-8',
      accent: '#2563eb',
      iconBg: 'bg-blue-50',
      glowFrom: 'rgba(37, 99, 235, 0.35)',
      glowTo: 'rgba(37, 99, 235, 0.05)',
      delay: 1.0,
    },
    {
      icon: Smartphone,
      title: 'Smart Monitoring',
      sub: 'Real-time App',
      position: '-bottom-14 -right-4 sm:-bottom-16 sm:-right-8',
      accent: '#6366f1',
      iconBg: 'bg-indigo-50',
      glowFrom: 'rgba(99, 102, 241, 0.35)',
      glowTo: 'rgba(99, 102, 241, 0.05)',
      delay: 1.2,
    },
  ];

  return (
    <section ref={ref} id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ y: textY }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <motion.span
                animate={isInView ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.6 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#39b54a] text-xs font-extrabold tracking-widest uppercase"
              >
                ABOUT US
              </motion.span>

              <h2
                className="mt-2 text-4xl lg:text-5xl font-extrabold text-[#1e2d53] leading-tight"
                style={{ perspective: 500 }}
              >
                <span className="inline-block">
                  {headlineWords.map((word, i) => (
                    <motion.span
                      key={word}
                      custom={i}
                      variants={wordVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                      className="inline-block mr-3"
                      style={{ transformOrigin: 'bottom' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <br />
                <motion.span
                  custom={2}
                  variants={wordVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="inline-block"
                >
                  <motion.span
                    animate={isInView ? { backgroundPosition: ['0% 50%', '200% 50%'] } : {}}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                    className="inline-block bg-clip-text text-transparent bg-[length:200%_auto]"
                    style={{
                      backgroundImage:
                        'linear-gradient(90deg, #1e8a37 0%, #39b54a 25%, #7be08c 50%, #39b54a 75%, #1e8a37 100%)',
                    }}
                  >
                    Better Tomorrow
                  </motion.span>
                </motion.span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={
                isInView
                  ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
                  : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
              }
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeInOut' }}
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

            <motion.div variants={itemVariants} className="inline-block">
              <motion.button
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

              {/* "Charging" bar — fills like current flowing in, replays each time the button scrolls into view */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                className="h-[3px] mt-2 rounded-full origin-left bg-gradient-to-r from-[#39b54a] via-[#7be08c] to-[#39b54a]"
              />
            </motion.div>
          </motion.div>

          {/* ── Right: GIF with Badge Overlays ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main GIF Container with 3D effects */}
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-visible shadow-2xl group">
              {/* Animated glow background */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(57, 181, 74, 0.4)",
                    "0 0 50px rgba(57, 181, 74, 0.6)",
                    "0 0 30px rgba(57, 181, 74, 0.4)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl blur-xl -z-20"
              />

              {/* GIF with 3D perspective */}
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 rounded-3xl overflow-hidden"
              >
                <img
                  src={solarSystemGif}
                  alt="Solar System with Battery"
                  className="w-full h-full object-cover"
                />

                {/* Dynamic gradient overlay */}
                <motion.div
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"
                />
              </motion.div>

              {/* Floating Animated Badges — sit just off each corner, mostly
                  outside the image so they never cover the diagram content */}
              {badgeData.map((badge, i) => (
                <BadgeCard key={i} {...badge} isInView={isInView} />
              ))}
            </div>

            {/* Decorative floating elements */}
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              animate={isInView ? { opacity: 0.15, rotate: 0 } : {}}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-[#39b54a] rounded-full -z-10"
            />
            <motion.div
              initial={{ opacity: 0, rotate: 45 }}
              animate={isInView ? { opacity: 0.1, rotate: 0 } : {}}
              transition={{ delay: 1.3, duration: 1 }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#1e2d53] rounded-full -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* Enhanced badge component — color-coded per badge via the `accent`,
   `iconBg`, `glowFrom` and `glowTo` props, instead of one fixed palette */
const BadgeCard = ({
  icon: Icon,
  iconBg,
  title,
  sub,
  position,
  accent,
  glowFrom,
  glowTo,
  delay,
  isInView,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, rotateY: -90, y: 20 }}
    animate={isInView ? { opacity: 1, scale: 1, rotateY: 0, y: 0 } : {}}
    whileHover={{
      scale: 1.15,
      y: -10,
      translateZ: 20
    }}
    transition={{
      delay,
      duration: 0.8,
      type: "spring",
      stiffness: 80,
      damping: 12
    }}
    style={{ boxShadow: `0 12px 28px -8px ${glowFrom}` }}
    className={`absolute ${position} bg-white/95 backdrop-blur-xl rounded-2xl px-4 py-3.5 border border-white/40 flex items-center space-x-3 z-30 min-w-[170px] pointer-events-auto transition-shadow duration-300 group`}
  >
    {/* Animated background glow, tinted per-badge via inline gradient */}
    <motion.div
      animate={isInView ? {
        opacity: [0.4, 0.7, 0.4],
        scale: [0.95, 1.15, 0.95]
      } : {}}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        delay: delay + 0.2
      }}
      style={{ background: `linear-gradient(120deg, ${glowFrom}, ${glowTo}, ${glowFrom})` }}
      className="absolute inset-0 rounded-2xl -z-10 blur-md group-hover:blur-lg"
    />

    {/* Icon with 3D flip and rotation */}
    <motion.div
      initial={{ rotate: -180, scale: 0 }}
      animate={isInView ? { rotate: 0, scale: 1 } : {}}
      whileHover={{
        rotate: 360,
        scale: 1.25
      }}
      transition={{
        delay: delay + 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 120
      }}
      className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300`}
    >
      <Icon className="w-5 h-5" style={{ color: accent }} />
    </motion.div>

    {/* Text content with staggered animation, hover color tied to the badge accent */}
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: delay + 0.3, duration: 0.6 }}
    >
      <div
        className="text-[12px] font-extrabold text-[#1e2d53] leading-tight transition-colors duration-300"
        style={{ '--hover-color': accent }}
        onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#1e2d53')}
      >
        {title}
      </div>
      <div className="text-[11px] text-slate-600 font-semibold group-hover:text-slate-800 transition-colors duration-300">
        {sub}
      </div>
    </motion.div>

    {/* Shimmer/shine effect on hover */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileHover={{ opacity: 1, x: 10 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/40 to-white/0"
    />
  </motion.div>
);

export default AboutSection;