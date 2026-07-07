import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.05 });

  const quickLinks = [
    { name: 'Solar Guide', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Residential Solar', href: '#residential' },
    { name: 'Commercial Solar', href: '#commercial' },
    { name: 'Blog', href: '#' },
    { name: 'FAQ', href: '#faq' },
  ];

  const resources = [
    { name: 'Rebates & Incentives', href: '#savings' },
    { name: 'Financing Options', href: '#savings' },
    { name: 'Solar Calculator', href: '#' },
    { name: 'Installation Guide', href: '#process' },
    { name: 'Warranty Info', href: '#brands' },
  ];

  const socialLinks = [
    { label: 'f', color: '#1877f2', bg: '#e7f0fe', title: 'Facebook' },
    { label: 'in', color: '#0a66c2', bg: '#dbeafe', title: 'LinkedIn' },
    { label: '▶', color: '#ff0000', bg: '#fee2e2', title: 'YouTube' },
    { label: 'X', color: '#0f172a', bg: '#f1f5f9', title: 'Twitter' },
  ];

  return (
    <footer ref={ref} className="bg-[#0a1628] text-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main 4-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-14"
        >

          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/src/assets/Mainlogo.png"
                alt="Aussie Smart Energy"
                className="w-10 h-10 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <div className="font-extrabold text-white text-base leading-none">AUSSIE</div>
                <div className="text-[#39b54a] font-bold text-xs leading-none mt-0.5">SMART ENERGY</div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Delivering reliable, high quality solar solutions across Australia.
            </p>

            {/* Social icons */}
            <div className="flex space-x-2 pt-1">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.title}
                  href="#"
                  title={s.title}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all"
                  style={{ backgroundColor: s.bg, color: s.color }}
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-[#39b54a] text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Resources */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-sm tracking-wide">Resources</h4>
            <ul className="space-y-2">
              {resources.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.href}
                    className="text-slate-400 hover:text-[#39b54a] text-sm font-medium transition-colors"
                  >
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact + Stay Updated */}
          <div className="space-y-5">
            <h4 className="font-extrabold text-white text-sm tracking-wide">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-[#39b54a] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-bold">1300 121 356</div>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-[#39b54a] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-xs break-all">info@aussiesmartenergy.com.au</div>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#39b54a] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-xs">Sydney, NSW & Australia</div>
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-2 border-t border-white/10 space-y-2.5">
              <h5 className="font-extrabold text-white text-sm">Stay Updated</h5>
              <p className="text-slate-500 text-xs">Sign up for tips, updates and special offers on solar.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#39b54a] transition"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 w-9 h-9 bg-[#39b54a] hover:bg-[#2e9e3f] rounded-lg flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-xs">
          <p>© 2024 Aussie Smart Energy | All Rights Reserved</p>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;