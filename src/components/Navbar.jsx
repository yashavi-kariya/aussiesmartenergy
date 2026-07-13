import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import logoImg from '../assets/Mainlogo.png';

// Shared elegant easing curve for a premium, unhurried feel
const EASE = [0.22, 1, 0.36, 1];

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

  // Close mobile menu / dropdowns on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

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
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 overflow-hidden transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-slate-200/70' : 'bg-white shadow-xl border-b border-slate-100'
        }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-sky-200/55 blur-3xl" />
        <div className="absolute left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-emerald-200/65 blur-3xl" />
        <div className="absolute inset-x-6 top-4 h-[86%] rounded-b-[40px] bg-slate-950/5" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{ height: scrolled ? 70 : 92 }}   // was: 62 : 70
          transition={{ duration: 0.35, ease: EASE }}
          className="flex items-center justify-between py-3"
        >

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <motion.img
              src={logoImg}
              alt="Aussie Smart Energy"
              animate={{ height: scrolled ? 60 : 84 }}   // was: 48 : 64 — your new bigger logo
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden lg:flex items-center space-x-1 bg-slate-50/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm"
            onMouseLeave={() => setHoveredItem(null)}
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
                  onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                >
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-0.5 px-4 py-2 text-sm font-semibold rounded-full transition-colors relative ${isActive ? 'bg-[#1e2d53] text-white shadow-sm shadow-slate-200/40' : 'text-slate-600 hover:text-[#1e2d53] hover:bg-slate-100'
                        }`}
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && (
                        <motion.span
                          animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="inline-flex"
                        >
                          <ChevronDown size={13} />
                        </motion.span>
                      )}

                      {/* Soft hover pill, independent of the active indicator */}
                      <AnimatePresence>
                        {hoveredItem === item.name && !isActive && (
                          <motion.span
                            layoutId="navHoverPill"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-blue-50 rounded -z-10"
                          />
                        )}
                      </AnimatePresence>

                      {/* Active indicator — glides smoothly between items via shared layout */}
                      {isActive && (
                        <motion.span
                          layoutId="navActiveUnderline"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-600 rounded-full"
                        />
                      )}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center space-x-0.5 px-4 py-2 text-sm font-semibold rounded-full transition-colors relative text-slate-600 hover:text-[#1e2d53] hover:bg-slate-100"
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && (
                        <motion.span
                          animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
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
                            className="absolute inset-0 bg-blue-50 rounded -z-10"
                          />
                        )}
                      </AnimatePresence>
                    </a>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top"
                      >
                        <motion.div
                          variants={dropdownContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          {item.dropdown.map((sub) => (
                            <motion.div key={sub.label} variants={dropdownItem}>
                              <Link
                                to={sub.href}
                                className="group flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-[#1e2d53] font-medium transition-colors border-l-3 border-transparent hover:border-blue-500"
                              >
                                <span>{sub.label}</span>
                                <motion.span
                                  initial={{ opacity: 0, x: -4 }}
                                  whileHover={{ opacity: 1, x: 0 }}
                                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-200"
                                >
                                  <ArrowRight size={13} />
                                </motion.span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center space-x-3 bg-[#1e2d53] hover:bg-[#15203c] text-white pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-sm shadow transition-all overflow-hidden group"
            >
              {/* Sheen sweep on hover */}
              <motion.span
                initial={{ x: '-120%' }}
                whileHover={{ x: '220%' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/15 skew-x-[-20deg]"
              />
              <span className="relative">Request a Quote</span>
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="relative w-8 h-8 bg-white text-[#1e2d53] rounded-full flex items-center justify-center"
              >
                <ArrowRight size={15} />
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
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
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
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
                      className="flex items-center justify-between py-3 px-3 text-slate-700 hover:text-[#1e2d53] hover:bg-blue-50 rounded-xl font-medium text-sm transition-colors"
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown size={14} />}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className="w-full flex items-center justify-between py-3 px-3 text-slate-700 hover:text-[#1e2d53] hover:bg-blue-50 rounded-xl font-medium text-sm transition-colors"
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
                      {/* Mobile Dropdown Items */}
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
                                  className="block py-2.5 px-3 text-sm text-slate-600 hover:text-[#1e2d53] hover:bg-blue-50 rounded-lg transition-colors border-l-2 border-blue-300 ml-2"
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
                  className="w-full flex items-center justify-center space-x-2 bg-[#1e2d53] text-white py-3 rounded-full font-semibold text-sm"
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
    </motion.nav>
  );
};

export default Navbar;