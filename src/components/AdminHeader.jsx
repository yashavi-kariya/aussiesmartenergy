import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  FileText,
  Star,
  Image as ImageIcon,
  Megaphone,
  CreditCard,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

const NAVY = '#1d2e57ff';
const NAVY_DARK = '#0f1c3fff';
const GREEN = '#39b54a';

const ADMIN_NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Enquiries',
    path: '/admin/dashboard',
    icon: MessageSquare,
    badge: 'CRM',
    color: '#60a5fa',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.25)',
    textColor: '#bfdbfe',
    description: 'Customer leads & quotes',
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/admin/projects',
    icon: FileText,
    badge: 'Portfolio',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.12)',
    border: 'rgba(56,189,248,0.25)',
    textColor: '#bae6fd',
    description: 'Showcase projects gallery',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    path: '/admin/reviews',
    icon: Star,
    badge: 'Google',
    color: '#facc15',
    bg: 'rgba(250,204,21,0.12)',
    border: 'rgba(250,204,21,0.25)',
    textColor: '#fef08a',
    description: 'Customer ratings & spotlight',
  },
  {
    id: 'banners',
    label: 'Hero Banners',
    path: '/admin/banners',
    icon: ImageIcon,
    badge: 'Carousel',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
    textColor: '#a7f3d0',
    description: 'Dynamic homepage slider',
  },
  {
    id: 'headlines',
    label: 'Headlines',
    path: '/admin/headlines',
    icon: Megaphone,
    badge: 'Live',
    color: '#4ade80',
    bg: 'rgba(57,181,74,0.12)',
    border: 'rgba(57,181,74,0.25)',
    textColor: '#bbf7d0',
    description: 'Announcement promo bars',
  },
  {
    id: 'payments',
    label: 'Payments',
    path: '/admin/payments',
    icon: CreditCard,
    badge: 'ANZ Bank',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.12)',
    border: 'rgba(99,102,241,0.25)',
    textColor: '#c7d2fe',
    description: 'Transactions & orders',
  },
];

const AdminHeader = ({ activeSection, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close drawer on path change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login/admin');
  };

  const currentItem = ADMIN_NAV_ITEMS.find((item) => item.id === activeSection) || ADMIN_NAV_ITEMS[0];

  return (
    <>
      {/* ── Sticky Top Header ── */}
      <header
        className="sticky top-0 z-40 w-full px-3 sm:px-6 py-3 sm:py-3.5 transition-all duration-200"
        style={{
          background: `${NAVY_DARK}f5`,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Section Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 sm:p-2.5 rounded-xl transition-transform hover:scale-105 shrink-0"
              style={{ background: `${GREEN}18`, border: `1.5px solid ${GREEN}35` }}
              title="Aussie Smart Energy Admin Portal"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: GREEN }} />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h1
                  onClick={() => navigate('/admin/dashboard')}
                  className="text-sm sm:text-base font-extrabold text-white tracking-tight cursor-pointer hover:text-emerald-400 transition-colors truncate"
                >
                  Aussie Smart Energy
                </h1>
                <span
                  className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0"
                  style={{
                    background: `${currentItem.color}20`,
                    color: currentItem.color,
                    border: `1px solid ${currentItem.color}40`,
                  }}
                >
                  {currentItem.label}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-white/45 truncate hidden xs:block">
                {subtitle || currentItem.description}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Visible on lg & up: >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'shadow-md scale-[1.02]' : 'hover:scale-[1.02] opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    background: isActive ? `${item.color}25` : item.bg,
                    border: isActive ? `1.5px solid ${item.color}` : `1px solid ${item.border}`,
                    color: isActive ? '#ffffff' : item.textColor,
                  }}
                >
                  <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" style={{ color: item.color }} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Quick View Website Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              title="View live customer-facing website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Live Site</span>
            </a>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ml-1"
              style={{
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#fca5a5',
              }}
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <span>Logout</span>
            </button>
          </nav>

          {/* Mobile & Tablet Controls (Visible below lg: < 1024px) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Quick Live Site Button */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-white/70 hover:text-white transition-colors"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              title="View Live Website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl text-white font-bold transition-all"
              style={{
                background: mobileDrawerOpen ? `${GREEN}25` : 'rgba(255,255,255,0.08)',
                border: mobileDrawerOpen ? `1.5px solid ${GREEN}` : '1px solid rgba(255,255,255,0.15)',
              }}
              aria-label="Toggle admin navigation menu"
              aria-expanded={mobileDrawerOpen}
            >
              {mobileDrawerOpen ? (
                <X className="w-5 h-5 text-emerald-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
              <span className="hidden sm:inline text-xs font-semibold">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-[86vw] max-w-sm h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden"
              style={{
                background: `linear-gradient(175deg, ${NAVY_DARK} 0%, #0d1733 60%, ${NAVY} 100%)`,
                borderLeft: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {/* Drawer Top Header */}
              <div
                className="p-4 sm:p-5 flex items-center justify-between border-b"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2 rounded-xl"
                    style={{ background: `${GREEN}18`, border: `1.5px solid ${GREEN}35` }}
                  >
                    <Zap className="w-4 h-4" style={{ color: GREEN }} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">Admin Navigation</h2>
                    <p className="text-[11px] text-white/40">Aussie Smart Energy Portal</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-xl text-white/50 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation List */}
              <div className="p-3 sm:p-4 overflow-y-auto space-y-2 flex-1">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-2 pt-1 pb-1">
                  Management Sections
                </p>

                {ADMIN_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        setMobileDrawerOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                        isActive
                          ? 'shadow-lg ring-1 ring-white/20'
                          : 'hover:bg-white/[0.04]'
                      }`}
                      style={{
                        background: isActive ? `${item.color}18` : 'rgba(255,255,255,0.02)',
                        border: isActive ? `1.5px solid ${item.color}60` : '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="p-2.5 rounded-xl shrink-0"
                          style={{
                            background: `${item.color}20`,
                            border: `1px solid ${item.color}35`,
                          }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-bold truncate ${
                                isActive ? 'text-white' : 'text-white/85'
                              }`}
                            >
                              {item.label}
                            </span>
                            <span
                              className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                              style={{
                                background: `${item.color}15`,
                                color: item.color,
                                border: `1px solid ${item.color}30`,
                              }}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-white/40 truncate">{item.description}</p>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive ? 'text-white translate-x-0.5' : 'text-white/20'
                        }`}
                      />
                    </button>
                  );
                })}

                {/* Quick Link to Main Website */}
                <div className="pt-3">
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-3 rounded-2xl flex items-center justify-between text-white/80 hover:text-white transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-xl"
                        style={{
                          background: 'rgba(52,211,153,0.15)',
                          border: '1px solid rgba(52,211,153,0.3)',
                        }}
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-white block">View Live Website</span>
                        <span className="text-[11px] text-white/40 block">Open public site in new tab</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40" />
                  </a>
                </div>
              </div>

              {/* Drawer Bottom Footer */}
              <div
                className="p-4 sm:p-5 border-t space-y-3"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}
              >
                <div className="flex items-center justify-between text-xs text-white/50 px-1">
                  <span>Logged in as:</span>
                  <span className="font-bold text-white/80 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Administrator
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-red-200 transition-all flex items-center justify-center gap-2 hover:bg-red-500/20 active:scale-[0.98]"
                  style={{
                    background: 'rgba(239,68,68,0.15)',
                    border: '1px solid rgba(239,68,68,0.35)',
                  }}
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  Sign Out of Admin Portal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminHeader;
