import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Phone } from 'lucide-react';
import logoImg from '../assets/Mainlogo.png';

// Shared elegant easing curve for a premium, unhurried feel
const EASE = [0.22, 1, 0.36, 1];

const DOTS = {
  backgroundImage: 'radial-gradient(rgba(15,76,255,0.30) 1px, transparent 1px)',
  backgroundSize: '16px 16px',
};

const DOTS_LIGHT = {
  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.32) 1px, transparent 1px)',
  backgroundSize: '14px 14px',
};

// Inline-style safety net: guarantees the pill shape + shadow render even if
// Tailwind's arbitrary-value classes get purged, and sidesteps a browser quirk
// where a child clip-path can strip border-radius clipping off a transformed
// (framer-motion) parent.
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
  }, [location.pathname]);

  const routeDropdown = location.pathname.startsWith('/solar/commercial')
    ? 'Commercial Solar'
    : location.pathname.startsWith('/solar/')
      ? 'Residential Solar'
      : null;

  const openDropdown = activeDropdown || routeDropdown;

  const navItems = [
    { name: 'Home', href: '/', hasDropdown: false, isRoute: true },
    { name: 'About Us', href: '/about', hasDropdown: false, isRoute: true },
    {
      name: 'Residential Solar', href: '#residential', hasDropdown: true, isRoute: false,
      dropdown: [
        { label: '6.6kW System', href: '/solar/6.6kw' },
        { label: '10.5kW System', href: '/solar/10.5kw' },
        { label: '13.2kW System', href: '/solar/13.2kw' },
        { label: '15kW System', href: '/solar/15kw' },
      ]
    },
    {
      name: 'Commercial Solar', href: '#commercial', hasDropdown: true, isRoute: false,
      dropdown: [
        { label: '20 kW Solar System', href: '/solar/commercial/20kw' },
        { label: '30 kW Solar System', href: '/solar/commercial/30kw' },
        { label: '50 kW Solar System', href: '/solar/commercial/50kw' },
        { label: '100 kW Solar System', href: '/solar/commercial/100kw' },
      ]
    },
    { name: 'Contact Us', href: '/contact', hasDropdown: false, isRoute: true },
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
    <div className="fixed top-0 left-0 right-0 z-50 overflow-visible">
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
        animate={{ y: 0, opacity: 1, height: scrolled ? 76 : 96 }}
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
            className="relative z-30 flex items-center bg-white pl-6 sm:pl-10 pr-4 sm:pr-8 flex-shrink-0"
          >
            <motion.img
              src={logoImg}
              alt="Aussie Smart Energy"
              animate={{ height: scrolled ? 60 : 76 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-auto object-contain"
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
                  const isActive = location.pathname === item.href;
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
                      {item.isRoute ? (
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
                              animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
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
                          className="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full transition-colors relative text-slate-700 hover:text-[#0F4CFF] cursor-pointer"
                        >
                          <span>{item.name}</span>
                          {item.hasDropdown && (
                            <motion.span
                              animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              className="inline-flex"
                            >
                              <ChevronDown size={13} />
                            </motion.span>
                          )}
                          <AnimatePresence>
                            {hoveredItem === item.name && (
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
                        {item.hasDropdown && openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
                            transition={{ duration: 0.22, ease: EASE }}
                            className="absolute top-full left-0 mt-2 w-58 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[999] origin-top overflow-hidden"
                            style={{ minWidth: '220px', boxShadow: '0 20px 50px -10px rgba(15,23,42,0.18), 0 4px 12px rgba(15,76,255,0.10)' }}
                          >
                            <motion.ul
                              variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.04 } }
                              }}
                              initial="hidden"
                              animate="visible"
                              className="py-2"
                            >
                              {item.dropdown.map((sub, idx) => (
                                <motion.li
                                  key={sub.label}
                                  variants={{
                                    hidden: { opacity: 0, x: -12, y: 4 },
                                    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.25, ease: EASE } }
                                  }}
                                >
                                  <Link
                                    to={sub.href}
                                    className="group flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-[#0F4CFF] font-medium transition-all duration-150 border-l-2 border-transparent hover:border-[#0F4CFF] hover:pl-5"
                                  >
                                    <span>{sub.label}</span>
                                    <motion.span
                                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                    >
                                      <ArrowRight size={13} />
                                    </motion.span>
                                  </Link>
                                </motion.li>
                              ))}
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
                <p className="text-sm font-bold text-[#0F172A]">1300 123 456</p>
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
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center space-x-3 bg-white/15 hover:bg-white/25 text-white pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-sm transition-all overflow-hidden group border border-white/30"
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
              </motion.button>
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
                  {item.isRoute ? (
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
                            {item.dropdown.map((sub, subIndex) => (
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
                                  {sub.label}
                                </Link>
                              </motion.div>
                            ))}
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 text-white py-3 rounded-full font-semibold text-sm"
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
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
// import logoImg from '../assets/Mainlogo.png';

// // Shared elegant easing curve for a premium, unhurried feel
// const EASE = [0.22, 1, 0.36, 1];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu on route change; keep desktop route-driven dropdown visible via derived state
//   useEffect(() => {
//     setIsOpen(false);
//     setActiveDropdown(null);
//   }, [location.pathname]);

//   const routeDropdown = location.pathname.startsWith('/solar/commercial')
//     ? 'Commercial Solar'
//     : location.pathname.startsWith('/solar/')
//       ? 'Residential Solar'
//       : null;

//   const openDropdown = activeDropdown || routeDropdown;

//   const navItems = [
//     { name: 'Home', href: '/', hasDropdown: false, isRoute: true },
//     { name: 'About Us', href: '/about', hasDropdown: false, isRoute: true },
//     {
//       name: 'Residential Solar', href: '#residential', hasDropdown: true, isRoute: false,
//       dropdown: [
//         { label: '6.6kW System', href: '/solar/6.6kw' },
//         { label: '10.5kW System', href: '/solar/10.5kw' },
//         { label: '13.2kW System', href: '/solar/13.2kw' },
//         { label: '15kW System', href: '/solar/15kw' },

//       ]
//     },
//     {
//       name: 'Commercial Solar', href: '#commercial', hasDropdown: true, isRoute: false,
//       dropdown: [
//         { label: '20 kW Solar System', href: '/solar/commercial/20kw' },
//         { label: '30 kW Solar System', href: '/solar/commercial/30kw' },
//         { label: '50 kW Solar System', href: '/solar/commercial/50kw' },
//         { label: '100 kW Solar System', href: '/solar/commercial/100kw' },
//       ]
//     },
//     { name: 'Contact Us', href: '/contact', hasDropdown: false, isRoute: true },
//   ];

//   const dropdownContainer = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.04 } }
//   };

//   const dropdownItem = {
//     hidden: { opacity: 0, x: -8 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE } }
//   };

//   return (
//     <motion.nav
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: EASE }}
//       className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-slate-200/70' : 'bg-white shadow-xl border-b border-slate-100'
//         }`}
//     >
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-sky-200/55 blur-3xl" />
//         <div className="absolute left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-emerald-200/65 blur-3xl" />
//         <div className="absolute inset-x-6 top-4 h-[86%] rounded-b-[40px] bg-slate-950/5" />
//       </div>
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           animate={{ height: scrolled ? 70 : 92 }}   // was: 62 : 70
//           transition={{ duration: 0.35, ease: EASE }}
//           className="flex items-center justify-between py-3"
//         >

//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
//             <motion.img
//               src={logoImg}
//               alt="Aussie Smart Energy"
//               animate={{ height: scrolled ? 60 : 84 }}   // was: 48 : 64 — your new bigger logo
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3, ease: EASE }}
//               className="w-auto object-contain"
//             />
//           </Link>

//           {/* Desktop Nav */}
//           <div
//             className="hidden lg:flex items-center space-x-1 bg-slate-50/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm"
//             onMouseLeave={() => setHoveredItem(null)}
//           >
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <div
//                   key={item.name}
//                   className="relative"
//                   onMouseEnter={() => {
//                     setHoveredItem(item.name);
//                     if (item.hasDropdown) setActiveDropdown(item.name);
//                   }}
//                   onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
//                 >
//                   {item.isRoute ? (
//                     <Link
//                       to={item.href}
//                       className={`flex items-center space-x-0.5 px-4 py-2 text-sm font-semibold rounded-full transition-colors relative ${isActive ? 'bg-[#1e2d53] text-white shadow-sm shadow-slate-200/40' : 'text-slate-600 hover:text-[#1e2d53] hover:bg-slate-100'
//                         }`}
//                     >
//                       <span>{item.name}</span>
//                       {item.hasDropdown && (
//                         <motion.span
//                           animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
//                           transition={{ duration: 0.25, ease: EASE }}
//                           className="inline-flex"
//                         >
//                           <ChevronDown size={13} />
//                         </motion.span>
//                       )}

//                       {/* Soft hover pill, independent of the active indicator */}
//                       <AnimatePresence>
//                         {hoveredItem === item.name && !isActive && (
//                           <motion.span
//                             layoutId="navHoverPill"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                             className="absolute inset-0 bg-blue-50 rounded -z-10"
//                           />
//                         )}
//                       </AnimatePresence>

//                       {/* Active indicator — glides smoothly between items via shared layout */}
//                       {isActive && (
//                         <motion.span
//                           layoutId="navActiveUnderline"
//                           transition={{ type: 'spring', stiffness: 380, damping: 30 }}
//                           className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-600 rounded-full"
//                         />
//                       )}
//                     </Link>
//                   ) : (
//                     <a
//                       href={item.href}
//                       className="flex items-center space-x-0.5 px-4 py-2 text-sm font-semibold rounded-full transition-colors relative text-slate-600 hover:text-[#1e2d53] hover:bg-slate-100"
//                     >
//                       <span>{item.name}</span>
//                       {item.hasDropdown && (
//                         <motion.span
//                           animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
//                           transition={{ duration: 0.25, ease: EASE }}
//                           className="inline-flex"
//                         >
//                           <ChevronDown size={13} />
//                         </motion.span>
//                       )}

//                       <AnimatePresence>
//                         {hoveredItem === item.name && (
//                           <motion.span
//                             layoutId="navHoverPill"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                             className="absolute inset-0 bg-blue-50 rounded -z-10"
//                           />
//                         )}
//                       </AnimatePresence>
//                     </a>
//                   )}

//                   {/* Dropdown */}
//                   <AnimatePresence>
//                     {item.hasDropdown && openDropdown === item.name && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 8, scale: 0.98 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 8, scale: 0.98 }}
//                         transition={{ duration: 0.2, ease: EASE }}
//                         className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top"
//                       >
//                         <motion.div
//                           variants={dropdownContainer}
//                           initial="hidden"
//                           animate="visible"
//                         >
//                           {item.dropdown.map((sub) => (
//                             <motion.div key={sub.label} variants={dropdownItem}>
//                               <Link
//                                 to={sub.href}
//                                 className="group flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-[#1e2d53] font-medium transition-colors border-l-3 border-transparent hover:border-blue-500"
//                               >
//                                 <span>{sub.label}</span>
//                                 <motion.span
//                                   initial={{ opacity: 0, x: -4 }}
//                                   whileHover={{ opacity: 1, x: 0 }}
//                                   className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-200"
//                                 >
//                                   <ArrowRight size={13} />
//                                 </motion.span>
//                               </Link>
//                             </motion.div>
//                           ))}
//                         </motion.div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>

//           {/* CTA Button */}
//           <div className="hidden lg:flex">
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="relative flex items-center space-x-3 bg-[#1e2d53] hover:bg-[#15203c] text-white pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-sm shadow transition-all overflow-hidden group"
//             >
//               {/* Sheen sweep on hover */}
//               <motion.span
//                 initial={{ x: '-120%' }}
//                 whileHover={{ x: '220%' }}
//                 transition={{ duration: 0.7, ease: EASE }}
//                 className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/15 skew-x-[-20deg]"
//               />
//               <span className="relative">Request a Quote</span>
//               <motion.div
//                 whileHover={{ rotate: 45 }}
//                 transition={{ duration: 0.25, ease: EASE }}
//                 className="relative w-8 h-8 bg-white text-[#1e2d53] rounded-full flex items-center justify-center"
//               >
//                 <ArrowRight size={15} />
//               </motion.div>
//             </motion.button>
//           </div>

//           {/* Mobile Hamburger */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
//           >
//             <AnimatePresence mode="wait" initial={false}>
//               <motion.span
//                 key={isOpen ? 'close' : 'open'}
//                 initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
//                 animate={{ rotate: 0, opacity: 1, scale: 1 }}
//                 exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
//                 transition={{ duration: 0.2, ease: EASE }}
//                 className="flex"
//               >
//                 {isOpen ? <X size={22} /> : <Menu size={22} />}
//               </motion.span>
//             </AnimatePresence>
//           </button>
//         </motion.div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3, ease: EASE }}
//             className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
//           >
//             <motion.div
//               variants={{
//                 hidden: {},
//                 visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
//               }}
//               initial="hidden"
//               animate="visible"
//               className="px-4 py-4 space-y-1"
//             >
//               {navItems.map((item) => (
//                 <motion.div
//                   key={item.name}
//                   variants={{
//                     hidden: { opacity: 0, x: -16 },
//                     visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } }
//                   }}
//                 >
//                   {item.isRoute ? (
//                     <Link
//                       to={item.href}
//                       onClick={() => setIsOpen(false)}
//                       className="flex items-center justify-between py-3 px-3 text-slate-700 hover:text-[#1e2d53] hover:bg-blue-50 rounded-xl font-medium text-sm transition-colors"
//                     >
//                       <span>{item.name}</span>
//                       {item.hasDropdown && <ChevronDown size={14} />}
//                     </Link>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
//                         className="w-full flex items-center justify-between py-3 px-3 text-slate-700 hover:text-[#1e2d53] hover:bg-blue-50 rounded-xl font-medium text-sm transition-colors"
//                       >
//                         <span>{item.name}</span>
//                         <motion.span
//                           animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
//                           transition={{ duration: 0.25, ease: EASE }}
//                           className="inline-flex"
//                         >
//                           <ChevronDown size={14} />
//                         </motion.span>
//                       </button>
//                       {/* Mobile Dropdown Items */}
//                       <AnimatePresence>
//                         {activeDropdown === item.name && item.hasDropdown && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             transition={{ duration: 0.25, ease: EASE }}
//                             className="pl-4 space-y-1 overflow-hidden"
//                           >
//                             {item.dropdown.map((sub, subIndex) => (
//                               <motion.div
//                                 key={sub.label}
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: subIndex * 0.04, duration: 0.25, ease: EASE }}
//                               >
//                                 <Link
//                                   to={sub.href}
//                                   onClick={() => {
//                                     setIsOpen(false);
//                                     setActiveDropdown(null);
//                                   }}
//                                   className="block py-2.5 px-3 text-sm text-slate-600 hover:text-[#1e2d53] hover:bg-blue-50 rounded-lg transition-colors border-l-2 border-blue-300 ml-2"
//                                 >
//                                   {sub.label}
//                                 </Link>
//                               </motion.div>
//                             ))}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </>
//                   )}
//                 </motion.div>
//               ))}
//               <motion.div
//                 variants={{
//                   hidden: { opacity: 0, y: 10 },
//                   visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }
//                 }}
//                 className="pt-3 border-t border-slate-100"
//               >
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full flex items-center justify-center space-x-2 bg-[#1e2d53] text-white py-3 rounded-full font-semibold text-sm"
//                 >
//                   <span>Request a Quote</span>
//                   <motion.span
//                     animate={{ x: [0, 4, 0] }}
//                     transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
//                     className="inline-flex"
//                   >
//                     <ArrowRight size={14} />
//                   </motion.span>
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;