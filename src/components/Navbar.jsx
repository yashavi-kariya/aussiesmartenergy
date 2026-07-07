import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', hasDropdown: false, isRoute: true },
    { name: 'About Us', href: '/about', hasDropdown: false, isRoute: true },
    {
      name: 'Residential Solar', href: '#residential', hasDropdown: true, isRoute: false,
      dropdown: ['6.6kW System', '10.5kW System', '13.2kW System', 'Battery Storage']
    },
    {
      name: 'Commercial Solar', href: '#commercial', hasDropdown: true, isRoute: false,
      dropdown: ['Small Business', 'Medium Business', 'Industrial', 'Solar Farms']
    },
    { name: 'Contact Us', href: '/contact', hasDropdown: false, isRoute: true },
  ];
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src="/src/assets/Mainlogo.png"
              alt="Aussie Smart Energy"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-0.5 px-3 py-2 text-sm font-semibold rounded transition-colors relative ${location.pathname === item.href ? 'text-[#1e2d53]' : 'text-slate-600 hover:text-[#1e2d53]'
                      }`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                    {location.pathname === item.href && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-600 rounded-full" />
                    )}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center space-x-0.5 px-3 py-2 text-sm font-semibold rounded transition-colors relative text-slate-600 hover:text-[#1e2d53]"
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                  </a>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
                    >
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-[#39b54a] font-medium transition-colors"
                        >
                          {sub}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center space-x-3 bg-[#1e2d53] hover:bg-[#15203c] text-white pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-sm shadow transition-all"
            >
              <span>Request a Quote</span>
              <div className="w-8 h-8 bg-white text-[#1e2d53] rounded-full flex items-center justify-center">
                <ArrowRight size={15} />
              </div>
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-3 px-3 text-slate-700 hover:text-[#39b54a] hover:bg-emerald-50 rounded-xl font-medium text-sm transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown size={14} />}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-3 px-3 text-slate-700 hover:text-[#39b54a] hover:bg-emerald-50 rounded-xl font-medium text-sm transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown size={14} />}
                  </a>
                )
              ))}
              <div className="pt-3 border-t border-slate-100">
                <button className="w-full flex items-center justify-center space-x-2 bg-[#1e2d53] text-white py-3 rounded-full font-semibold text-sm">
                  <span>Request a Quote</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;