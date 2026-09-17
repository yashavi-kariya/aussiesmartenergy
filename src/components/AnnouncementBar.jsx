import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Flame, Sparkles, Gift, Megaphone,
  AlertCircle, Tag, Sun, Award, ChevronLeft,
  ChevronRight, X, ArrowRight
} from 'lucide-react';
import api from '../utils/api';

const ICONS = {
  zap: Zap,
  flame: Flame,
  sparkles: Sparkles,
  gift: Gift,
  megaphone: Megaphone,
  alert: AlertCircle,
  tag: Tag,
  sun: Sun,
  award: Award,
};

const THEMES = {
  'navy-green': {
    wrapper: 'bg-gradient-to-r from-[#0a142c] via-[#102a6b] to-[#0a142c] border-b border-[#39b54a]/30 text-white',
    badge: 'bg-[#39b54a]/20 text-[#39b54a] border-[#39b54a]/40 shadow-[0_0_12px_rgba(57,181,74,0.25)]',
    btn: 'bg-[#39b54a] hover:bg-[#2fa03e] text-white shadow-sm hover:shadow-[0_0_14px_rgba(57,181,74,0.4)]',
    accent: '#39b54a',
  },
  'solar-amber': {
    wrapper: 'bg-gradient-to-r from-[#291404] via-[#78350f] to-[#291404] border-b border-amber-500/30 text-white',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]',
    btn: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-sm hover:shadow-[0_0_14px_rgba(245,158,11,0.4)]',
    accent: '#f59e0b',
  },
  'crimson': {
    wrapper: 'bg-gradient-to-r from-[#2c0b0e] via-[#881337] to-[#2c0b0e] border-b border-rose-500/30 text-white',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.25)]',
    btn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow-[0_0_14px_rgba(244,63,94,0.4)]',
    accent: '#f43f5e',
  },
  'electric-blue': {
    wrapper: 'bg-gradient-to-r from-[#082338] via-[#0369a1] to-[#082338] border-b border-sky-400/30 text-white',
    badge: 'bg-sky-400/20 text-sky-300 border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]',
    btn: 'bg-sky-500 hover:bg-sky-600 text-white shadow-sm hover:shadow-[0_0_14px_rgba(56,189,248,0.4)]',
    accent: '#38bdf8',
  },
  'dark-slate': {
    wrapper: 'bg-gradient-to-r from-[#0b0f19] via-[#1e293b] to-[#0b0f19] border-b border-slate-700 text-white',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
    btn: 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-sm',
    accent: '#10b981',
  },
};

const AnnouncementBar = ({ onHeightChange }) => {
  const [headlines, setHeadlines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchHeadlines = async () => {
      try {
        const res = await api.get('/headlines');
        if (res.data?.success && Array.isArray(res.data.data)) {
          if (isMounted) {
            setHeadlines(res.data.data);
          }
        }
      } catch (err) {
        // Silently handle if network or endpoint error
        console.warn('Unable to load announcement headlines:', err?.message || err);
      }
    };

    fetchHeadlines();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-rotate if multiple active headlines
  useEffect(() => {
    if (headlines.length <= 1 || isPaused || dismissed) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [headlines.length, isPaused, dismissed]);

  // Notify parent of visibility for header spacing
  useEffect(() => {
    if (onHeightChange) {
      if (dismissed || headlines.length === 0) {
        onHeightChange(0);
      } else {
        onHeightChange(40);
      }
    }
  }, [dismissed, headlines.length, onHeightChange]);

  if (dismissed || headlines.length === 0) {
    return null;
  }

  const current = headlines[currentIndex] || headlines[0];
  const theme = THEMES[current.theme] || THEMES['navy-green'];
  const IconComponent = ICONS[current.icon] || Zap;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? headlines.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % headlines.length);
  };

  const isExternalLink = current.link?.startsWith('http://') || current.link?.startsWith('https://');

  return (
    <div
      className={`relative w-full z-40 transition-all duration-300 ${theme.wrapper}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 min-h-[38px] text-xs sm:text-sm font-medium">
        
        {/* Left: Previous button if multiple headlines */}
        {headlines.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous announcement"
            className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Center: Animated Announcement Content */}
        <div className="flex-1 overflow-hidden flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id || currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1"
            >
              {/* Badge */}
              {current.badge && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${theme.badge} uppercase tracking-wider flex-shrink-0`}
                >
                  <IconComponent className="w-3 h-3" />
                  {current.badge}
                </span>
              )}

              {/* Main Text */}
              <span className="text-white/95 font-medium tracking-wide line-clamp-1 sm:line-clamp-none">
                {current.text}
              </span>

              {/* Action Link / Button */}
              {current.link && (
                isExternalLink ? (
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all duration-200 ${theme.btn} flex-shrink-0`}
                  >
                    <span>{current.linkText || 'Learn More'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                ) : (
                  <Link
                    to={current.link}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all duration-200 ${theme.btn} flex-shrink-0`}
                  >
                    <span>{current.linkText || 'Learn More'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Next button (if multiple) & Dismiss Button */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {headlines.length > 1 && (
            <button
              onClick={handleNext}
              aria-label="Next announcement"
              className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
