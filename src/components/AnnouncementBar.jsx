import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Flame, Sparkles, Gift, Megaphone,
  AlertCircle, Tag, Sun, Award, ChevronLeft,
  ChevronRight, X, ArrowRight, Bell
} from 'lucide-react';
import api from '../utils/api';

const ICONS = {
  zap: Zap, flame: Flame, sparkles: Sparkles, gift: Gift,
  megaphone: Megaphone, alert: AlertCircle, tag: Tag, sun: Sun, award: Award,
};

const THEMES = {
  'navy-green': {
    wrapper: 'from-[#040d1e] via-[#0b1d4d] to-[#040d1e]',
    modal: 'from-[#050f22] via-[#0d2260] to-[#050f22]',
    badge: 'bg-[#39b54a]/20 text-[#39b54a] border-[#39b54a]/50',
    btn: 'bg-[#39b54a] hover:bg-[#2fa03e] text-white',
    accent: '#39b54a', accent2: '#0b4bff',
  },
  'solar-amber': {
    wrapper: 'from-[#1a0a00] via-[#5a2800] to-[#1a0a00]',
    modal: 'from-[#1f0c00] via-[#6b3000] to-[#1f0c00]',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    btn: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold',
    accent: '#f59e0b', accent2: '#ef4444',
  },
  'crimson': {
    wrapper: 'from-[#1a0205] via-[#6b0a1e] to-[#1a0205]',
    modal: 'from-[#1f0206] via-[#7a0c22] to-[#1f0206]',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
    btn: 'bg-rose-600 hover:bg-rose-700 text-white',
    accent: '#f43f5e', accent2: '#f97316',
  },
  'electric-blue': {
    wrapper: 'from-[#010f1e] via-[#024870] to-[#010f1e]',
    modal: 'from-[#01121f] via-[#035580] to-[#01121f]',
    badge: 'bg-sky-400/20 text-sky-300 border-sky-400/50',
    btn: 'bg-sky-500 hover:bg-sky-600 text-white',
    accent: '#38bdf8', accent2: '#818cf8',
  },
  'dark-slate': {
    wrapper: 'from-[#060810] via-[#111827] to-[#060810]',
    modal: 'from-[#07091a] via-[#141e30] to-[#07091a]',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    btn: 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold',
    accent: '#10b981', accent2: '#06b6d4',
  },
};

/* ─── Floating particle orb ─── */
const Orb = ({ accent, delay, size, x, y, duration }) => (
  <motion.div
    className="pointer-events-none absolute rounded-full"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%`, background: accent, filter: 'blur(5px)', opacity: 0 }}
    animate={{ opacity: [0, 0.5, 0], y: [0, -16, 0], x: [0, 7, -7, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

/* ─── Typewriter hook ─── */
function useTypewriter(text, speed = 24, startDelay = 300) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text]);
  return displayed;
}

/* ─── Typewriter text (bar) ─── */
const TypewriterText = ({ text }) => {
  const displayed = useTypewriter(text, 24, 200);
  return (
    <span className="text-white/95 font-medium tracking-wide line-clamp-1 sm:line-clamp-none">
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.55, repeat: Infinity }}
          className="inline-block w-[2px] h-[0.85em] bg-white/80 ml-0.5 align-middle rounded-sm"
        />
      )}
    </span>
  );
};

/* ─── Typewriter text (modal — bigger, slower) ─── */
const TypewriterTextLarge = ({ text }) => {
  const displayed = useTypewriter(text, 38, 600);
  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[0.9em] bg-white ml-1 align-middle rounded-sm"
        />
      )}
    </span>
  );
};

/* ─── CTA button ─── */
const CTAButton = ({ link, isExternal, linkText, theme, large = false }) => {
  const label = linkText || 'Learn More';
  const cls = `inline-flex items-center gap-1.5 ${large ? 'px-6 py-2.5 text-sm rounded-xl' : 'px-3 py-0.5 rounded-full text-xs'} font-semibold ${theme.btn} relative overflow-hidden transition-all`;
  const inner = (
    <>
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        initial={{ x: '-110%' }}
        whileHover={{ x: '110%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }}
      />
      <span className="relative">{label}</span>
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        className="relative inline-flex"
      >
        <ArrowRight className={large ? 'w-4 h-4' : 'w-3 h-3'} />
      </motion.span>
    </>
  );
  return (
    <motion.div whileHover={{ scale: 1.07, y: -1 }} whileTap={{ scale: 0.93 }}>
      {isExternal
        ? <a href={link} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
        : <Link to={link} className={cls}>{inner}</Link>}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════
   POPUP MODAL
══════════════════════════════════════════════════ */
const AnnouncementPopup = ({ headlines, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (headlines.length <= 1 || isPaused) return;
    const t = setInterval(() => setCurrentIndex(p => (p + 1) % headlines.length), 5000);
    return () => clearInterval(t);
  }, [headlines.length, isPaused]);

  const current = headlines[currentIndex] || headlines[0];
  const theme = THEMES[current.theme] || THEMES['navy-green'];
  const IconComponent = ICONS[current.icon] || Zap;
  const isExternal = current.link?.startsWith('http');

  const modalOrbs = [
    { x: 8,  y: 15, size: 18, duration: 5,   delay: 0   },
    { x: 88, y: 20, size: 14, duration: 6,   delay: 1   },
    { x: 15, y: 75, size: 12, duration: 4.5, delay: 0.5 },
    { x: 80, y: 70, size: 16, duration: 5.5, delay: 1.5 },
    { x: 50, y: 5,  size: 10, duration: 7,   delay: 0.8 },
  ];

  return (
    /* Backdrop */
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.65)' }}
      onClick={onClose}
    >
      {/* Card */}
      <motion.div
        className={`relative w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br ${theme.modal} text-white shadow-2xl`}
        initial={{ scale: 0.5, opacity: 0, y: 60, rotateX: -25 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.6, opacity: 0, y: 40, rotateX: 15 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.9 }}
        style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
        onClick={e => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Particle orbs */}
        {modalOrbs.map((orb, i) => <Orb key={i} accent={theme.accent} {...orb} />)}

        {/* Animated mesh bg */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 30%, ${theme.accent}28 0%, transparent 60%),
                              radial-gradient(ellipse at 80% 70%, ${theme.accent2}20 0%, transparent 60%)`,
            backgroundSize: '200% 200%',
          }}
        />

        {/* Top electric border */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, ${theme.accent2}, ${theme.accent}, transparent)`, filter: `drop-shadow(0 0 6px ${theme.accent})` }}
        />

        {/* Diagonal shimmer */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ transform: 'skewX(-16deg)', background: `linear-gradient(90deg, transparent, ${theme.accent}18, transparent)` }}
          initial={{ x: '-130%' }}
          animate={{ x: '230%' }}
          transition={{ duration: 2, delay: 0.8, ease: [0.4, 0, 0.2, 1], repeat: Infinity, repeatDelay: 4 }}
        />

        {/* Heartbeat glow */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: [0, 0.1, 0, 0.06, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3, ease: 'easeOut' }}
          style={{ background: `radial-gradient(ellipse at center, ${theme.accent} 0%, transparent 70%)` }}
        />

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.18 }}
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </motion.button>

        {/* Content */}
        <div className="relative z-20 px-7 pt-8 pb-7 flex flex-col items-center text-center gap-4">

          {/* Bell icon bounce */}
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `${theme.accent}22`, border: `1.5px solid ${theme.accent}55`, boxShadow: `0 0 24px ${theme.accent}40` }}
            animate={{ y: [0, -6, 0], rotate: [-8, 8, -8, 0] }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
          >
            <Bell className="w-6 h-6" style={{ color: theme.accent }} />
          </motion.div>

          {/* AnimatePresence for content flip */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id || currentIndex}
              initial={{ opacity: 0, rotateX: -50, y: 16, scale: 0.88 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: 38, y: -14, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Badge */}
              {current.badge && (
                <motion.span
                  className={`relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${theme.badge} uppercase tracking-widest`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 18 }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    animate={{ scale: [1, 1.7, 1.7], opacity: [0.5, 0, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.8 }}
                    style={{ border: `1.5px solid ${theme.accent}`, borderRadius: 9999 }}
                  />
                  <motion.span
                    animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                    className="inline-flex"
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </motion.span>
                  {current.badge}
                </motion.span>
              )}

              {/* Main headline — typewriter */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                <TypewriterTextLarge text={current.text} />
              </h2>

              {/* Subtext if any */}
              {current.subtext && (
                <motion.p
                  className="text-white/60 text-sm max-w-sm"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {current.subtext}
                </motion.p>
              )}

              {/* CTA */}
              {current.link && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, type: 'spring', stiffness: 300, damping: 20 }}
                  className="mt-1"
                >
                  <CTAButton
                    link={current.link}
                    isExternal={current.link?.startsWith('http')}
                    linkText={current.linkText}
                    theme={theme}
                    large
                  />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dot progress */}
          {headlines.length > 1 && (
            <div className="flex items-center gap-2 mt-1">
              {headlines.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Headline ${i + 1}`}
                  className="rounded-full cursor-pointer"
                  animate={{
                    width: i === currentIndex ? 20 : 6,
                    height: 6,
                    opacity: i === currentIndex ? 1 : 0.35,
                    backgroundColor: i === currentIndex ? theme.accent : '#ffffff',
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          )}

          {/* Dismiss text */}
          <motion.button
            onClick={onClose}
            className="text-white/30 hover:text-white/60 text-xs mt-0.5 transition-colors underline underline-offset-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            No thanks, close this
          </motion.button>
        </div>

        {/* Bottom glow bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, ${theme.accent2}, ${theme.accent}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════
   TOP BAR (unchanged look, same effects)
══════════════════════════════════════════════════ */
const AnnouncementBar = ({ onHeightChange }) => {
  const [headlines, setHeadlines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchHeadlines = async () => {
      try {
        const res = await api.get('/headlines');
        if (res.data?.success && Array.isArray(res.data.data)) {
          if (isMounted) {
            setHeadlines(res.data.data);
            // Show popup once per session
            const seen = sessionStorage.getItem('announcementSeen');
            if (!seen) {
              setTimeout(() => setShowPopup(true), 800);
              sessionStorage.setItem('announcementSeen', '1');
            }
          }
        }
      } catch (err) {
        console.warn('Unable to load announcement headlines:', err?.message || err);
      }
    };
    fetchHeadlines();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (headlines.length <= 1 || isPaused || dismissed) return;
    const timer = setInterval(() => setCurrentIndex(p => (p + 1) % headlines.length), 5500);
    return () => clearInterval(timer);
  }, [headlines.length, isPaused, dismissed]);

  useEffect(() => {
    if (onHeightChange) onHeightChange(dismissed || headlines.length === 0 ? 0 : 40);
  }, [dismissed, headlines.length, onHeightChange]);

  if (dismissed || headlines.length === 0) return null;

  const current = headlines[currentIndex] || headlines[0];
  const theme = THEMES[current.theme] || THEMES['navy-green'];
  const IconComponent = ICONS[current.icon] || Zap;
  const isExternalLink = current.link?.startsWith('http');

  const handlePrev = (e) => { e.stopPropagation(); setCurrentIndex(p => (p === 0 ? headlines.length - 1 : p - 1)); };
  const handleNext = (e) => { e.stopPropagation(); setCurrentIndex(p => (p + 1) % headlines.length); };

  const orbs = [
    { x: 4,  y: 20, size: 9,  duration: 4.2, delay: 0   },
    { x: 14, y: 65, size: 7,  duration: 5.1, delay: 0.9 },
    { x: 28, y: 10, size: 11, duration: 3.9, delay: 1.5 },
    { x: 52, y: 75, size: 8,  duration: 6.0, delay: 0.4 },
    { x: 68, y: 25, size: 10, duration: 4.5, delay: 2.0 },
    { x: 83, y: 60, size: 6,  duration: 5.5, delay: 1.1 },
    { x: 93, y: 15, size: 9,  duration: 3.6, delay: 0.6 },
  ];

  return (
    <>
      {/* ── CENTER POPUP MODAL ── */}
      <AnimatePresence>
        {showPopup && (
          <AnnouncementPopup headlines={headlines} onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>

      {/* ── TOP BAR ── */}
      <motion.div
        className={`relative w-full z-40 overflow-hidden bg-gradient-to-r ${theme.wrapper}`}
        initial={{ y: -52, opacity: 0, scaleY: 0.4 }}
        animate={{ y: 0, opacity: 1, scaleY: 1 }}
        transition={{ type: 'spring', stiffness: 310, damping: 23, mass: 0.75 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Mesh bg */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `radial-gradient(ellipse at 15% 50%, ${theme.accent}1f 0%, transparent 55%),
                              radial-gradient(ellipse at 85% 50%, ${theme.accent2}1f 0%, transparent 55%)`,
            backgroundSize: '200% 100%',
          }}
        />

        {/* Orbs */}
        {orbs.map((orb, i) => <Orb key={i} accent={theme.accent} {...orb} />)}

        {/* Electric SVG borders */}
        <svg className="pointer-events-none absolute inset-0 w-full h-full" style={{ zIndex: 5 }} preserveAspectRatio="none">
          <motion.line x1="0" y1="1" x2="100%" y2="1" stroke={theme.accent} strokeWidth="1.5" strokeOpacity="0"
            animate={{ strokeOpacity: [0, 1, 0], strokeWidth: [1, 2.5, 1] }}
            transition={{ duration: 2.6, delay: 0.4, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 0 5px ${theme.accent})` }} />
          <motion.line x1="0" y1="99%" x2="100%" y2="99%" stroke={theme.accent} strokeWidth="1.5" strokeOpacity="0"
            animate={{ strokeOpacity: [0, 0.85, 0], strokeWidth: [1, 2, 1] }}
            transition={{ duration: 2.6, delay: 0.8, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 0 4px ${theme.accent})` }} />
        </svg>

        {/* Shimmer sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ transform: 'skewX(-14deg)', background: `linear-gradient(90deg, transparent 0%, ${theme.accent}20 50%, transparent 100%)` }}
          initial={{ x: '-120%' }}
          animate={{ x: '220%' }}
          transition={{ duration: 1.9, delay: 0.6, ease: [0.4, 0, 0.2, 1], repeat: Infinity, repeatDelay: 6 }}
        />

        {/* Heartbeat glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          animate={{ opacity: [0, 0.07, 0, 0.04, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: 'easeOut' }}
          style={{ background: `radial-gradient(ellipse at center, ${theme.accent} 0%, transparent 70%)` }}
        />

        {/* Main content row */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 min-h-[40px] text-xs sm:text-sm font-medium relative z-20">

          {headlines.length > 1 && (
            <motion.button onClick={handlePrev} aria-label="Previous announcement"
              className="p-1 rounded-md text-white/50 hover:text-white flex-shrink-0"
              whileHover={{ scale: 1.2, x: -2 }} whileTap={{ scale: 0.85 }}>
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
          )}

          <div className="flex-1 overflow-hidden flex items-center justify-center text-center" style={{ perspective: '700px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current._id || currentIndex}
                initial={{ opacity: 0, rotateX: -60, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, rotateX: 45, y: -10, scale: 0.92 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {current.badge && (
                  <motion.span
                    className={`relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${theme.badge} uppercase tracking-widest flex-shrink-0`}
                    initial={{ scale: 0.55, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.12, type: 'spring', stiffness: 420, damping: 18 }}
                  >
                    <motion.span className="absolute inset-0 rounded-full"
                      animate={{ scale: [1, 1.65, 1.65], opacity: [0.55, 0, 0] }}
                      transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.5 }}
                      style={{ border: `1.5px solid ${theme.accent}`, borderRadius: 9999 }} />
                    <motion.span
                      animate={{ rotate: [0, 18, -18, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                      className="inline-flex"
                    >
                      <IconComponent className="w-3 h-3" />
                    </motion.span>
                    {current.badge}
                  </motion.span>
                )}

                <TypewriterText text={current.text} />

                {current.link && (
                  <CTAButton link={current.link} isExternal={isExternalLink} linkText={current.linkText} theme={theme} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {headlines.length > 1 && (
              <div className="hidden sm:flex items-center gap-[4px]">
                {headlines.map((_, i) => (
                  <motion.button key={i} onClick={() => setCurrentIndex(i)} aria-label={`Headline ${i + 1}`}
                    className="rounded-full cursor-pointer"
                    animate={{ width: i === currentIndex ? 14 : 5, height: 5, opacity: i === currentIndex ? 1 : 0.38, backgroundColor: i === currentIndex ? theme.accent : '#ffffff' }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} />
                ))}
              </div>
            )}

            {headlines.length > 1 && (
              <motion.button onClick={handleNext} aria-label="Next announcement"
                className="p-1 rounded-md text-white/50 hover:text-white"
                whileHover={{ scale: 1.2, x: 2 }} whileTap={{ scale: 0.85 }}>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}

            {/* Reopen popup button */}
            <motion.button
              onClick={() => setShowPopup(true)}
              aria-label="View announcement"
              className="p-1 rounded-md text-white/50 hover:text-white transition-colors"
              title="View details"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.85 }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                className="inline-flex"
              >
                <Bell className="w-3.5 h-3.5" />
              </motion.span>
            </motion.button>

            <motion.button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss announcement"
              className="p-1 rounded-md text-white/40 hover:text-white ml-0.5"
              title="Dismiss"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AnnouncementBar;
