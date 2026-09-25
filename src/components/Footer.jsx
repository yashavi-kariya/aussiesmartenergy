import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa6';
import logoImg from '../assets/Mainlogo.png';
import bannerLogo from '../assets/banner-logo-1024x365.png';
import saaLogo from '../assets/saa-logo.png';

const EASE = [0.22, 1, 0.36, 1];

// Stagger animation container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

// Nav Link Component with smooth interactive hover
const FooterNavLink = ({ href, children, isExternal = false }) => {
  const isHash = href.startsWith('#');
  const Component = isHash || isExternal ? 'a' : Link;
  const linkProps = isHash || isExternal ? { href } : { to: href };

  return (
    <li>
      <Component
        {...linkProps}
        className="group flex items-center gap-3 text-slate-300 text-base py-2.5 hover:text-[#39b54a] transition-all duration-300"
      >
        <span className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-[#39b54a] group-hover:scale-125 transition-all duration-300" />
        <span className="relative group-hover:translate-x-1.5 transition-transform duration-300 font-medium">
          {children}
        </span>
        <ArrowRight
          size={14}
          className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#39b54a]"
        />
      </Component>
    </li>
  );
};

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.05 });

  const socialLinks = [
    {
      name: 'Facebook',
      icon: FaFacebookF,
      href: 'https://www.facebook.com/aussiesmartenergy',
      color: '#1877F2',
      bgHover: 'hover:bg-[#1877F2]/20 hover:border-[#1877F2]/40 hover:text-[#1877F2]',
      shadow: 'hover:shadow-[0_0_16px_rgba(24,119,242,0.4)]',
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      href: 'https://youtube.com',
      color: '#FF0000',
      bgHover: 'hover:bg-[#FF0000]/20 hover:border-[#FF0000]/40 hover:text-[#FF0000]',
      shadow: 'hover:shadow-[0_0_16px_rgba(255,0,0,0.4)]',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: 'https://www.instagram.com/aussiesmartenergy',
      color: '#E1306C',
      bgHover: 'hover:bg-[#E1306C]/20 hover:border-[#E1306C]/40 hover:text-[#E1306C]',
      shadow: 'hover:shadow-[0_0_16px_rgba(225,48,108,0.4)]',
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-transparent">
      {/* -----------------------------------------------------------
          WAVE HEADER SECTION - Multi-layered animated organic waves
      ----------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden leading-none -mb-1" style={{ height: 110 }}>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
        >
          <defs>
            {/* Deep Navy Gradient */}
            <linearGradient id="footerNavyDeep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#040b17" />
              <stop offset="50%" stopColor="#07152a" />
              <stop offset="100%" stopColor="#040b17" />
            </linearGradient>

            {/* Mid Navy Gradient */}
            <linearGradient id="footerNavyMid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a1d38" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0e284c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0a1d38" stopOpacity="0.8" />
            </linearGradient>

            {/* Green Accent Ribbon Gradient */}
            <linearGradient id="footerGreenRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#15803d" stopOpacity="0.1" />
              <stop offset="25%" stopColor="#22c55e" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#39b54a" stopOpacity="1" />
              <stop offset="75%" stopColor="#4ade80" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="0.1" />
            </linearGradient>

            {/* Green Stroke Glow */}
            <filter id="greenGlowEffect" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Layer 1: Deep Navy Background Wave */}
          <path fill="url(#footerNavyDeep)">
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              values="
                M0,45 C240,10 480,95 720,50 C960,10 1200,85 1440,45 L1440,120 L0,120 Z;
                M0,55 C240,90 480,15 720,60 C960,105 1200,25 1440,55 L1440,120 L0,120 Z;
                M0,45 C240,10 480,95 720,50 C960,10 1200,85 1440,45 L1440,120 L0,120 Z
              "
            />
          </path>

          {/* Layer 2: Mid Navy Wave */}
          <path fill="url(#footerNavyMid)">
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              values="
                M0,65 C260,25 520,105 780,65 C1040,25 1280,95 1440,65 L1440,120 L0,120 Z;
                M0,75 C260,105 520,30 780,75 C1040,115 1280,35 1440,75 L1440,120 L0,120 Z;
                M0,65 C260,25 520,105 780,65 C1040,25 1280,95 1440,65 L1440,120 L0,120 Z
              "
            />
          </path>

          {/* Layer 3: Vibrant Green Ribbon */}
          <path fill="url(#footerGreenRibbon)">
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              values="
                M0,50 C200,20 400,85 600,48 C800,12 1000,75 1200,42 C1320,20 1400,55 1440,50 L1440,68 C1380,72 1260,42 1080,64 C900,85 720,35 540,70 C360,98 180,55 0,68 Z;
                M0,60 C200,90 400,25 600,62 C800,98 1000,32 1200,58 C1320,80 1400,45 1440,60 L1440,78 C1380,62 1260,92 1080,76 C900,58 720,100 540,74 C360,48 180,88 0,78 Z;
                M0,50 C200,20 400,85 600,48 C800,12 1000,75 1200,42 C1320,20 1400,55 1440,50 L1440,68 C1380,72 1260,42 1080,64 C900,85 720,35 540,70 C360,98 180,55 0,68 Z
              "
            />
          </path>

          {/* Layer 4: Glowing Top Green Stroke */}
          <path
            fill="none"
            stroke="#4ade80"
            strokeWidth="2.2"
            filter="url(#greenGlowEffect)"
            opacity="0.95"
          >
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              values="
                M0,50 C200,20 400,85 600,48 C800,12 1000,75 1200,42 C1320,20 1400,55 1440,50;
                M0,60 C200,90 400,25 600,62 C800,98 1000,32 1200,58 C1320,80 1400,45 1440,60;
                M0,50 C200,20 400,85 600,48 C800,12 1000,75 1200,42 C1320,20 1400,55 1440,50
              "
            />
          </path>
        </svg>
      </div>

      {/* -----------------------------------------------------------
          MAIN FOOTER BODY
      ----------------------------------------------------------- */}
      <footer
        ref={ref}
        id="contact"
        className="relative w-full text-white overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #040b17 0%, #07152a 40%, #030812 100%)',
        }}
      >
        {/* Background Dot Patterns for Depth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient Glows */}
        <div
          className="absolute -top-24 left-1/4 w-96 h-96 pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(57,181,74,0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12"
          >
            {/* -----------------------------------------------------------
                COL 1: BRAND & MISSION (Span 4 on lg)
            ----------------------------------------------------------- */}
            <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col items-start gap-6">
              {/* Premium Logo Card */}
              <Link to="/" className="group inline-block focus:outline-none">
                <div className="relative rounded-2xl bg-white px-6 py-4 shadow-lg shadow-black/20 border border-white/20 transition-all duration-300 group-hover:shadow-[0_8px_25px_rgba(57,181,74,0.25)] group-hover:border-[#39b54a]/40">
                  <img
                    src={logoImg}
                    alt="Aussie Smart Energy"
                    className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </Link>

              {/* Brand Description */}
              <p className="text-slate-300 text-base leading-relaxed max-w-md font-normal">
                Solar panels provide excellent benefits for Australian homes and businesses.
                They reduce energy bills, harnessing abundant sunlight for cost-effective power.
                Government Incentives make solar systems more affordable — a smart investment for a greener future.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-3.5 pt-1">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-slate-200 bg-white/[0.06] border border-white/15 transition-all duration-300 ${social.bgHover} ${social.shadow}`}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* -----------------------------------------------------------
                COL 2: QUICK LINKS / RESOURCES (Span 2 on lg)
            ----------------------------------------------------------- */}
            <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39b54a]" />
                <h4 className="text-white font-bold text-lg lg:text-xl tracking-wide font-outfit">Resources</h4>
              </div>

              <ul className="flex flex-col space-y-1">
                <FooterNavLink href="/">Home</FooterNavLink>
                <FooterNavLink href="/about">About Us</FooterNavLink>
                <FooterNavLink href="/contact">Contact Us</FooterNavLink>
                <FooterNavLink href="/batteries/solar-system-with-batteries">Solar Batteries</FooterNavLink>
                <FooterNavLink href="/solar/6.6kw">Solar Packages</FooterNavLink>
              </ul>
            </motion.div>

            {/* -----------------------------------------------------------
                COL 3: CONTACT & LOCATIONS (Span 3 on lg)
            ----------------------------------------------------------- */}
            <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <h4 className="text-white font-bold text-lg lg:text-xl tracking-wide font-outfit">Contact Us</h4>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Phone</span>
                <a
                  href="tel:1300959170"
                  className="group inline-flex items-center gap-3 text-white text-base font-semibold hover:text-[#39b54a] transition-colors duration-200"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#39b54a]/20 border border-[#39b54a]/40 flex items-center justify-center text-[#39b54a] group-hover:bg-[#39b54a]/30 transition-colors">
                    <Phone size={15} />
                  </span>
                  <span>1300 959 170</span>
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Email</span>
                <a
                  href="mailto:info@aussiesmartenergy.com.au"
                  className="group inline-flex items-center gap-3 text-white text-base font-semibold hover:text-[#39b54a] transition-colors duration-200 break-all"
                >
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/30 transition-colors flex-shrink-0">
                    <Mail size={15} />
                  </span>
                  <span>info@aussiesmartenergy.com.au</span>
                </a>
              </div>

              {/* Our Locations */}
              <div className="flex flex-col gap-2.5 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#39b54a]" /> Our Locations
                </span>

                <div className="flex flex-col space-y-3">
                  {/* QLD */}
                  <div className="flex items-start gap-2.5 text-sm text-slate-200 leading-relaxed group">
                    <span className="px-2 py-0.5 rounded bg-[#39b54a]/20 border border-[#39b54a]/40 text-[#39b54a] font-extrabold text-xs flex-shrink-0 mt-0.5">
                      QLD
                    </span>
                    <span className="group-hover:text-white transition-colors">29/97 Creek St, Brisbane City QLD 4000</span>
                  </div>

                  {/* NSW */}
                  <div className="flex items-start gap-2.5 text-sm text-slate-200 leading-relaxed group">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/40 text-blue-400 font-extrabold text-xs flex-shrink-0 mt-0.5">
                      NSW
                    </span>
                    <span className="group-hover:text-white transition-colors">526/368 Sussex St, Sydney NSW 2000</span>
                  </div>

                  {/* VIC */}
                  <div className="flex items-start gap-2.5 text-sm text-slate-200 leading-relaxed group">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-400 font-extrabold text-xs flex-shrink-0 mt-0.5">
                      VIC
                    </span>
                    <span className="group-hover:text-white transition-colors">117/530 Little Collins St, Melbourne VIC 3000</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* -----------------------------------------------------------
                COL 4: ACCREDITATIONS & CERTIFICATIONS (Span 3 on lg)
            ----------------------------------------------------------- */}
            <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <h4 className="text-white font-bold text-lg lg:text-xl tracking-wide font-outfit">Accreditations</h4>
              </div>

              {/* Accreditations Trust Card */}
              <div className="rounded-2xl bg-white/[0.05] border border-white/15 p-5 backdrop-blur-sm hover:border-white/25 transition-all duration-300 group shadow-lg flex flex-col gap-3.5">
                <div className="bg-white/95 rounded-xl p-4 flex flex-col gap-3 items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-[1.01]">
                  <img
                    src={bannerLogo}
                    alt="Clean Energy Council & NETCC Approved Seller"
                    className="w-full h-auto max-h-20 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="w-full h-px bg-slate-200" />
                  <img
                    src={saaLogo}
                    alt="Solar Accreditation Australia"
                    className="w-full h-auto max-h-12 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-300 font-medium">
                  <ShieldCheck size={16} className="text-[#39b54a] flex-shrink-0" />
                  <span className="leading-tight">NETCC Approved Seller, CEC & SAA Accredited</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* -----------------------------------------------------------
              BOTTOM BAR: COPYRIGHT & LEGAL
          ----------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base text-slate-300"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-[#39b54a] flex-shrink-0" />
              <span>© 2026 Aussie Smart Energy | All Rights Reserved</span>
            </div>

            <div className="flex items-center gap-4 font-medium">
              <Link
                to="/contact"
                className="hover:text-[#39b54a] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-white/30">•</span>
              <Link
                to="/contact"
                className="hover:text-[#39b54a] transition-colors duration-200"
              >
                Terms of Use
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
