import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Phone, ExternalLink, CreditCard, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/Mainlogo.png';
import AnnouncementBar from './AnnouncementBar';

// Shared elegant easing curve for a premium, unhurried 
const EASE = [0.22, 1, 0.36, 1];
const DOTS = {
  backgroundImage: 'radial-gradient(rgba(15,76,255,0.30) 1px, transparent 1px)',
  backgroundSize: '16px 16px',
};

const DOTS_LIGHT = {
  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.32) 1px, transparent 1px)',
  backgroundSize: '14px 14px',
};

const pillShapeStyle = {
  borderRadius: 9999,
  overflow: 'hidden',
  boxShadow: '0 20px 50px -18px rgba(15,76,255,0.35), 0 2px 8px rgba(15,23,42,0.06)',
  border: '1px solid rgba(255,255,255,0.7)',
  background: '#a5a8b0ff',
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setHoveredItem(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isItemActive = (item) => {
    if (item.isExternal) return false;
    if (item.isRoute) {
      return item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href);
    }
    if (item.name === 'Commercial') {
      return location.pathname.startsWith('/solar/commercial');
    }
    if (item.name === 'Solar Packages') {
      return location.pathname.startsWith('/solar/') && !location.pathname.startsWith('/solar/commercial');
    }
    if (item.name === 'Solar Batteries') {
      return location.pathname.startsWith('/batteries');
    }
    return false;
  };

  const navItems = [
    { name: 'Home', href: '/', hasDropdown: false, isRoute: true },
    { name: 'About Us', href: '/about', hasDropdown: false, isRoute: true },
    {
      name: 'Solar Batteries', href: '#batteries', hasDropdown: true, isRoute: false,
      dropdown: [
        { label: 'Solar System with Batteries', href: '/batteries/solar-system-with-batteries' },
        { label: 'Sigenergy', href: '/batteries/sigenergy' },
        { label: 'Fox ESS', href: '/batteries/fox-ess' },
        { label: 'Pylontech', href: '/batteries/pylontech' },
        { label: 'ESY', href: '/batteries/esy' },
        { label: 'SOFAR', href: '/batteries/SOFAR' },
        { label: 'GoodWe', href: '/batteries/goodwe' },
      ]
    },
    {
      name: 'Solar Packages', href: '#packages', hasDropdown: true, isRoute: false,
      dropdown: [
        { label: '6.6kW Solar', subtitle: '14x475W panels • 5kW inverter', href: '/solar/6.6kw' },
        { label: '10kW Solar', subtitle: '21x475W panels • 8kW inverter', href: '/solar/10kw' },
        { label: '13.3kW Solar', subtitle: '28x475W panels • 10kW inverter', href: '/solar/13.3kw' },
        { label: '20kW Solar', subtitle: '42x475W panels • 15kW inverter', href: '/solar/20kw' },
        { label: '30kW Solar', subtitle: '62x475W panels • 25kW inverter', href: '/solar/30kw' },
      ]
    },
    {
      name: 'Commercial', href: '/solar/commercial', hasDropdown: true, isRoute: false,
      dropdown: [
        { label: 'Commercial Solar and Battery', href: '/solar/commercial' },
        { label: 'Finance & $0 Upfront', href: '/solar/commercial#finance' },
        { label: 'New South Wales Rebates', href: '/solar/commercial/nsw-calculator' },
      ]
    },
    { name: 'Contact Us', href: '/contact', hasDropdown: false, isRoute: true },
    {
      name: 'Pay Online',
      href: 'https://docs.anzworldline-solutions.com.au/en/index',
      hasDropdown: false,
      isRoute: false,
      isExternal: true,
    },
  ];

  const dropdownContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.04 } }
  };

  const dropdownItem = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE } }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 overflow-visible navbar-container">
      {/* ============ Top Dynamic Announcement Bar ============ */}
      <AnnouncementBar />

      {/* ============ Floating decorative backdrop ============ */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 right-[8%] w-56 h-56 rounded-full bg-blue-400/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -12, 0], x: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-16 left-[18%] w-64 h-64 rounded-full bg-sky-300/20 blur-3xl"
        />
      </div>

      {/* ============ Outer wrapper — full width, no rounding, no side/top gaps ============ */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, height: scrolled ? 80 : 100 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative w-full overflow-visible"
      >
        {/* ============ Full-width nav bar ============ */}
        <nav
          className="relative w-full h-full flex items-stretch bg-white shadow-xl border-b border-slate-200/60 overflow-visible"
          style={{
            background: '#becde2ff',
            boxShadow: scrolled
              ? '0 4px 24px -4px rgba(15,76,255,0.18), 0 2px 8px rgba(15,23,42,0.08)'
              : '0 2px 16px -2px rgba(15,76,255,0.10), 0 1px 4px rgba(15,23,42,0.05)',
          }}
        >
          {/* ---- Logo panel ---- */}
          <Link
            to="/"
            className="relative z-30 flex items-center bg-white pl-4 sm:pl-8 pr-4 sm:pr-8 flex-shrink-0"
          >
            <motion.img
              src={logoImg}
              alt="Aussie Smart Energy"
              animate={{ height: scrolled ? 68 : 86 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-auto max-h-[90%] object-contain"
            />
          </Link>

          {/* ============ Right zone ============ */}
          <div className="relative z-10 flex-1 flex items-stretch overflow-visible">
            {/* Layered background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-sky-50 to-blue-100" />
              <div className="absolute inset-0 opacity-50" style={DOTS} />
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-48 h-48 rounded-full bg-[#3B82F6]/15 blur-3xl" />
              <div className="absolute top-1/2 right-[26%] -translate-y-1/2 w-32 h-32 rounded-full bg-[#0F4CFF]/10 blur-2xl" />
            </div>

            {/* ---- Glass nav links container ---- */}
            <div
              className="hidden lg:flex flex-1 items-center justify-center gap-1 mx-2"
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className="flex items-center gap-1 bg-white/60 backdrop-blur-xl border border-white/70 rounded-full px-2 py-2"
                style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6)' }}
              >
                {navItems.map((item) => {
                  const isActive = isItemActive(item);
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => {
                        setHoveredItem(item.name);
                        if (item.hasDropdown) setActiveDropdown(item.name);
                      }}
                      onMouseLeave={(e) => {
                        // Only close if the mouse is not moving into the dropdown panel itself
                        if (item.hasDropdown) {
                          const related = e.relatedTarget;
                          if (!e.currentTarget.contains(related)) {
                            setActiveDropdown(null);
                          }
                        }
                      }}
                    >
                      {item.isExternal ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full transition-all relative bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-sm shadow-emerald-500/20 border border-emerald-300/30 hover:scale-105 active:scale-95 ml-0.5"
                        >
                          <CreditCard size={11} className="text-emerald-100" />
                          <span className="relative">{item.name}</span>
                          <ExternalLink size={9} className="text-emerald-200" />
                        </a>
                      ) : item.isRoute ? (
                        <Link
                          to={item.href}
                          className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full transition-colors relative ${isActive ? 'text-white' : 'text-slate-700 hover:text-[#0F4CFF]'
                            }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="navActivePill"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                              className="absolute inset-0 rounded-full -z-10"
                              style={{
                                background: 'linear-gradient(90deg, #0f3095ff, #171267ff)',
                                boxShadow: '0 0 18px rgba(23,32,130,0.91)',
                              }}
                            />
                          )}
                          <span className="relative">{item.name}</span>
                          {item.hasDropdown && (
                            <motion.span
                              animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              className="relative inline-flex"
                            >
                              <ChevronDown size={13} />
                            </motion.span>
                          )}
                          <AnimatePresence>
                            {hoveredItem === item.name && !isActive && (
                              <motion.span
                                layoutId="navHoverPill"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 bg-blue-50 rounded-full -z-10"
                              />
                            )}
                          </AnimatePresence>
                        </Link>
                      ) : (
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full transition-colors relative cursor-pointer ${isActive ? 'text-white' : 'text-slate-700 hover:text-[#0F4CFF]'
                            }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="navActivePill"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                              className="absolute inset-0 rounded-full -z-10"
                              style={{
                                background: 'linear-gradient(90deg, #0f3095ff, #171267ff)',
                                boxShadow: '0 0 18px rgba(23,32,130,0.91)',
                              }}
                            />
                          )}
                          <span className="relative">{item.name}</span>
                          {item.hasDropdown && (
                            <motion.span
                              animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              className="relative inline-flex"
                            >
                              <ChevronDown size={13} />
                            </motion.span>
                          )}
                          <AnimatePresence>
                            {hoveredItem === item.name && !isActive && (
                              <motion.span
                                layoutId="navHoverPill"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 bg-blue-50 rounded-full -z-10"
                              />
                            )}
                          </AnimatePresence>
                        </button>
                      )}

                      {/* Dropdown panel */}
                      <AnimatePresence>
                        {item.hasDropdown && activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
                            transition={{ duration: 0.22, ease: EASE }}
                            className={`absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[999] origin-top overflow-hidden ${item.dropdownGroups ? 'w-[560px]' : item.name === 'Solar Batteries' ? 'w-[520px]' : item.name === 'Commercial' ? 'w-72 min-w-[280px]' : 'w-64 min-w-[240px]'
                              }`}
                            style={{ boxShadow: '0 20px 50px -10px rgba(15,23,42,0.18), 0 4px 12px rgba(15,76,255,0.10)' }}
                          >
                            <motion.ul
                              variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.04 } }
                              }}
                              initial="hidden"
                              animate="visible"
                              className={`py-2 ${item.dropdownGroups ? 'grid grid-cols-2 gap-x-4 px-3 py-3' : item.name === 'Solar Batteries' ? 'grid grid-cols-2 gap-x-2' : ''}`}
                            >
                              {item.dropdownGroups ? (
                                item.dropdownGroups.map((group) => (
                                  <motion.li
                                    key={group.title}
                                    variants={{
                                      hidden: { opacity: 0, x: -12, y: 4 },
                                      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.25, ease: EASE } }
                                    }}
                                    className="px-2"
                                  >
                                    <div className="px-4 pb-2">
                                      <div className="text-sm font-semibold text-slate-700">{group.title}</div>
                                    </div>
                                    <div className="space-y-1">
                                      {group.items.map((sub) => (
                                        <Link
                                          key={sub.label}
                                          to={sub.href}
                                          onClick={() => {
                                            setActiveDropdown(null);
                                            setHoveredItem(null);
                                          }}
                                          className="group block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-[#0F4CFF] font-medium transition-all duration-150 border-l-2 border-transparent hover:border-[#0F4CFF] hover:pl-5"
                                        >
                                          <div className="flex items-center justify-between">
                                            <span>{sub.label}</span>
                                            <motion.span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
                                              <ArrowRight size={13} />
                                            </motion.span>
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.li>
                                ))
                              ) : (
                                item.dropdown.map((sub, idx) => (
                                  <motion.li
                                    key={sub.label}
                                    variants={{
                                      hidden: { opacity: 0, x: -12, y: 4 },
                                      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.25, ease: EASE } }
                                    }}
                                  >
                                    <Link
                                      to={sub.href}
                                      onClick={() => {
                                        setActiveDropdown(null);
                                        setHoveredItem(null);
                                      }}
                                      className="group flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-[#0F4CFF] font-medium transition-all duration-150 border-l-2 border-transparent hover:border-[#0F4CFF] hover:pl-5"
                                    >
                                      <div className="flex flex-col">
                                        <span>{sub.label}</span>
                                        {sub.subtitle && (
                                          <span className="text-xs text-slate-400 mt-0.5 font-normal">
                                            {sub.subtitle}
                                          </span>
                                        )}
                                      </div>
                                      <motion.span
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0"
                                      >
                                        <ArrowRight size={13} />
                                      </motion.span>
                                    </Link>
                                  </motion.li>
                                ))
                              )}

                              {item.customizeLink && (
                                <motion.li key="customize" className="col-span-2 px-4 py-3">
                                  <Link
                                    to={item.customizeLink.href}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      setHoveredItem(null);
                                    }}
                                    className="block w-full text-center py-2 bg-blue-50 text-[#0F4CFF] rounded-md font-semibold"
                                  >
                                    {item.customizeLink.label}
                                  </Link>
                                </motion.li>
                              )}
                            </motion.ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---- Phone (desktop only, sits quietly in the glass zone) ---- */}
            <a
              href="tel:1300123456"
              className="hidden xl:flex items-center gap-2.5 pr-3"
            >
              <span className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/70 text-[#0F4CFF] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone size={16} />
              </span>
              <div className="leading-tight whitespace-nowrap">
                <p className="text-[11px] text-slate-500 font-medium">Call Us Today</p>
                <p className="text-sm font-bold text-[#0F172A]">1300 959 170</p>
              </div>
            </a>

            {/* ---- CTA: angled diagonal blue panel, gentler cut so it reads as one smooth sweep ---- */}
            <div
              className="hidden lg:flex items-center pl-14 pr-2 relative overflow-hidden"
              style={{
                clipPath: 'polygon(26% 0, 100% 0, 100% 100%, 0% 100%)',
                background: 'linear-gradient(100deg, #091f61ff 0%, #133585ff 50%, #0a4bb3ff 100%)',
              }}
            >
              <div className="absolute inset-0 opacity-20" style={DOTS_LIGHT} />
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center space-x-3 bg-white/15 hover:bg-white/25 text-white pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-sm transition-all overflow-hidden group border border-white/30 cursor-pointer"
                >
                  <motion.span
                    initial={{ x: '-120%' }}
                    whileHover={{ x: '220%' }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 skew-x-[-20deg]"
                  />
                  <span className="relative whitespace-nowrap">Request a Quote</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    whileHover={{ rotate: 45, x: 0 }}
                    transition={{ x: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 0.25, ease: EASE } }}
                    className="relative w-8 h-8 bg-white text-[#0F4CFF] rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <ArrowRight size={15} />
                  </motion.div>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* ---- Mobile hamburger ---- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-30 flex items-center px-4 bg-white text-slate-700 hover:text-[#0F4CFF] transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="flex"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </motion.div>

      {/* ============ Mobile Menu ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="lg:hidden relative w-full bg-white border-b border-slate-100 shadow-xl overflow-hidden"
          >
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
              }}
              initial="hidden"
              animate="visible"
              className="px-4 py-4 space-y-1"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } }
                  }}
                >
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-3 px-3.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-700/20 border border-emerald-400/30 active:scale-[0.98] transition-all my-1.5"
                    >
                      <span className="flex items-center gap-2.5">
                        <CreditCard size={17} className="text-emerald-200" />
                        <span>{item.name}</span>
                        <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-emerald-100 font-semibold uppercase">Secure</span>
                      </span>
                      <ExternalLink size={14} className="text-emerald-200" />
                    </a>
                  ) : item.isRoute ? (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-3 px-3 text-slate-700 hover:text-[#0F4CFF] hover:bg-blue-50 rounded-xl font-medium text-sm transition-colors"
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown size={14} />}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className="w-full flex items-center justify-between py-3 px-3 text-slate-700 hover:text-[#0F4CFF] hover:bg-blue-50 rounded-xl font-medium text-sm transition-colors"
                      >
                        <span>{item.name}</span>
                        <motion.span
                          animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="inline-flex"
                        >
                          <ChevronDown size={14} />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && item.hasDropdown && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            {item.dropdownGroups ? (
                              item.dropdownGroups.map((group, gIdx) => (
                                <motion.div key={group.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: gIdx * 0.04, duration: 0.25, ease: EASE }}>
                                  <div className="text-sm font-semibold text-slate-700 py-2">{group.title}</div>
                                  {group.items.map((sub, subIndex) => (
                                    <motion.div key={sub.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (gIdx + subIndex) * 0.03, duration: 0.25, ease: EASE }}>
                                      <Link
                                        to={sub.href}
                                        onClick={() => {
                                          setIsOpen(false);
                                          setActiveDropdown(null);
                                        }}
                                        className="block py-2.5 px-3 text-sm text-slate-600 hover:text-[#0F4CFF] hover:bg-blue-50 rounded-lg transition-colors border-l-2 border-blue-300 ml-2"
                                      >
                                        <div className="flex flex-col">
                                          <span>{sub.label}</span>
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              ))
                            ) : (
                              item.dropdown.map((sub, subIndex) => (
                                <motion.div
                                  key={sub.label}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.04, duration: 0.25, ease: EASE }}
                                >
                                  <Link
                                    to={sub.href}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setActiveDropdown(null);
                                    }}
                                    className="block py-2.5 px-3 text-sm text-slate-600 hover:text-[#0F4CFF] hover:bg-blue-50 rounded-lg transition-colors border-l-2 border-blue-300 ml-2"
                                  >
                                    <div className="flex flex-col">
                                      <span>{sub.label}</span>
                                      {sub.subtitle && (
                                        <span className="text-xs text-slate-400 mt-0.5">
                                          {sub.subtitle}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                </motion.div>
                              ))
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              ))}

              <motion.a
                href="tel:1300123456"
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } }
                }}
                className="flex items-center gap-2.5 py-3 px-3 rounded-xl"
              >
                <span className="w-9 h-9 rounded-full bg-blue-50 text-[#0F4CFF] flex items-center justify-center flex-shrink-0">
                  <Phone size={16} />
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] text-slate-500 font-medium">Call Us Today</p>
                  <p className="text-sm font-bold text-[#0F172A]">1300 123 456</p>
                </div>
              </motion.a>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }
                }}
                className="pt-3 border-t border-slate-100"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center space-x-2 text-white py-3 rounded-full font-semibold text-sm cursor-pointer"
                    style={{ background: 'linear-gradient(115deg, #0F4CFF 0%, #3B82F6 100%)' }}
                  >
                    <span>Request a Quote</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-flex"
                    >
                      <ArrowRight size={14} />
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
