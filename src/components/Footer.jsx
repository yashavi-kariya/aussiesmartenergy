import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, Send } from 'lucide-react';
import logoImg from '../assets/Mainlogo.png';

const EASE = [0.22, 1, 0.36, 1];

/* -- Stagger variants -- */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* -- Link row -- */
const FooterLink = ({ children, href = '#' }) => (
  <li>
    <a
      href={href}
      className="group flex items-center gap-2.5 text-slate-400 text-sm py-1.5 hover:text-[#39b54a] transition-all duration-300"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#39b54a] flex-shrink-0 transition-colors duration-300" />
      <span className="relative group-hover:translate-x-1 transition-transform duration-300">
        {children}
        <span className="absolute -bottom-px left-0 h-px w-0 bg-[#39b54a] group-hover:w-full transition-all duration-300" />
      </span>
      <ArrowRight size={11} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#39b54a]" />
    </a>
  </li>
);

/* -- Contact row -- */
const ContactRow = ({ icon: Icon, children }) => (
  <li className="flex items-start gap-3 group">
    <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-[#39b54a]/10 border border-[#39b54a]/20 text-[#39b54a] group-hover:bg-[#39b54a]/20 transition-colors duration-300">
      <Icon size={14} />
    </span>
    <span className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{children}</span>
  </li>
);

/* -- Social button -- */
const SocialBtn = ({ label, color, bg, children }) => (
  <motion.a
    href="#"
    aria-label={label}
    whileHover={{ scale: 1.15, y: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className="relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300"
    style={{ backgroundColor: bg, color }}
  >
    {children}
  </motion.a>
);

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.05 });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const quickLinks = ['Solar Guide', 'About Us', 'Residential Solar', 'Commercial Solar', 'Blog', 'FAQ'];
  const resources = ['Rebates & Incentives', 'Financing Options', 'Solar Calculator', 'Installation Guide', 'Warranty Info'];

  return (
    <>
      {/* -----------------------------------------------------------
          WAVE SECTION � 4 distinct visible layers like the image:
          white/page bg on top ? navy back ? navy mid ? green front
      ----------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden" style={{ height: 130, background: 'white' }}>
        <svg
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        >
          <defs>
            {/* Deep navy gradient � back layer */}
            <linearGradient id="waveNavyDeep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#061020" />
              <stop offset="40%" stopColor="#0a1a35" />
              <stop offset="100%" stopColor="#071525" />
            </linearGradient>

            {/* Mid navy gradient � slightly lighter */}
            <linearGradient id="waveNavyMid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d2040" />
              <stop offset="50%" stopColor="#102848" />
              <stop offset="100%" stopColor="#0d2040" />
            </linearGradient>

            {/* Green gradient � front accent layer */}
            <linearGradient id="waveGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a5c28" stopOpacity="0.0" />
              <stop offset="20%" stopColor="#22863a" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#39b54a" stopOpacity="1" />
              <stop offset="80%" stopColor="#4ade80" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#1a5c28" stopOpacity="0.0" />
            </linearGradient>

            {/* Glow filter for green stroke */}
            <filter id="gGlow" x="-10%" y="-80%" width="120%" height="260%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* -- LAYER 1 (deepest): large dark navy wave, slow morph -- */}
          <path fill="url(#waveNavyDeep)">
            <animate
              attributeName="d"
              dur="11s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              values="
                M0,55 C200,10 400,115 600,65 C800,15 1000,105 1200,60 C1320,38 1400,75 1440,55 L1440,130 L0,130 Z;
                M0,65 C200,110 400,20 600,75 C800,130 1000,30 1200,70 C1320,90 1400,55 1440,65 L1440,130 L0,130 Z;
                M0,55 C200,10 400,115 600,65 C800,15 1000,105 1200,60 C1320,38 1400,75 1440,55 L1440,130 L0,130 Z
              "
            />
          </path>

          {/* -- LAYER 2: mid navy wave, medium speed, offset phase -- */}
          <path fill="url(#waveNavyMid)" opacity="0.85">
            <animate
              attributeName="d"
              dur="14s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              values="
                M0,75 C240,30 480,130 720,80 C960,30 1200,120 1440,75 L1440,130 L0,130 Z;
                M0,85 C240,130 480,35 720,90 C960,145 1200,40 1440,85 L1440,130 L0,130 Z;
                M0,75 C240,30 480,130 720,80 C960,30 1200,120 1440,75 L1440,130 L0,130 Z
              "
            />
          </path>

          {/* -- LAYER 3: bright green ribbon � the key visual from image -- */}
          <path fill="url(#waveGreen)" opacity="0.95">
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              values="
                M0,60 C180,25 360,95 540,55 C720,15 900,85 1080,48 C1260,12 1380,65 1440,60 L1440,85 C1380,90 1260,55 1080,78 C900,100 720,45 540,82 C360,118 180,68 0,85 Z;
                M0,70 C180,105 360,30 540,72 C720,112 900,38 1080,68 C1260,98 1380,52 1440,70 L1440,95 C1380,72 1260,108 1080,88 C900,68 720,118 540,88 C360,58 180,102 0,95 Z;
                M0,60 C180,25 360,95 540,55 C720,15 900,85 1080,48 C1260,12 1380,65 1440,60 L1440,85 C1380,90 1260,55 1080,78 C900,100 720,45 540,82 C360,118 180,68 0,85 Z
              "
            />
          </path>

          {/* -- LAYER 4: glowing green stroke on top of green ribbon -- */}
          <path
            fill="none"
            stroke="#4ade80"
            strokeWidth="2.5"
            filter="url(#gGlow)"
            opacity="1"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              values="
                M0,60 C180,25 360,95 540,55 C720,15 900,85 1080,48 C1260,12 1380,65 1440,60;
                M0,70 C180,105 360,30 540,72 C720,112 900,38 1080,68 C1260,98 1380,52 1440,70;
                M0,60 C180,25 360,95 540,55 C720,15 900,85 1080,48 C1260,12 1380,65 1440,60
              "
            />
          </path>

          {/* -- Thin navy-blue secondary stroke for extra depth -- */}
          <path
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            opacity="0.45"
          >
            <animate
              attributeName="d"
              dur="13s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              values="
                M0,80 C240,42 480,118 720,78 C960,38 1200,108 1440,80;
                M0,90 C240,128 480,48 720,88 C960,128 1200,58 1440,90;
                M0,80 C240,42 480,118 720,78 C960,38 1200,108 1440,80
              "
            />
          </path>
        </svg>
      </div>

      {/* -----------------------------------------------------------
          FOOTER BODY � dark navy, starts right below the wave
      ----------------------------------------------------------- */}
      <footer
        ref={ref}
        className="relative w-full text-white overflow-hidden"
        style={{ background: '#0a1628' }}
        id="contact"
      >
        {/* -- Animated dot grid � bottom-left (matches image) -- */}
        <motion.div
          animate={{ backgroundPosition: ['0px 0px', '20px 20px', '0px 0px'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle, #60a5fa 1.2px, transparent 1.2px)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* -- Animated dot grid � bottom-right -- */}
        <motion.div
          animate={{ backgroundPosition: ['0px 0px', '-20px -20px', '0px 0px'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #39b54a 1.2px, transparent 1.2px)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* -- Radial glow behind logo -- */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute pointer-events-none"
          style={{
            top: '10%', left: '-4%',
            width: 320, height: 320,
            background: 'radial-gradient(circle, rgba(57,181,74,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* -- Top-right ambient glow -- */}
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute pointer-events-none"
          style={{
            top: '-10%', right: '5%',
            width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* -- Main content -- */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-4 pb-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-12"
          >

            {/* -- Col 1: Brand -- */}
            <motion.div variants={itemVariants} className="flex flex-col gap-5">
              {/* Logo — white pill card so blue logo pops on dark bg */}
              <div className="relative w-fit">
                {/* Animated glow ring behind the pill */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.08, 0.95] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-3 rounded-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(57,181,74,0.35) 0%, rgba(59,130,246,0.15) 50%, transparent 75%)',
                    filter: 'blur(12px)',
                  }}
                />
                {/* White pill background */}
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 0 32px rgba(57,181,74,0.5), 0 0 12px rgba(59,130,246,0.3)' }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl flex items-center justify-center px-5 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
                    boxShadow: '0 0 20px rgba(57,181,74,0.25), 0 0 8px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
                    border: '1px solid rgba(57,181,74,0.3)',
                  }}
                >
                  {/* Subtle shimmer sweep */}
                  <motion.div
                    animate={{ x: ['-120%', '220%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                    className="absolute inset-y-0 w-1/3 pointer-events-none rounded-2xl"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                      skewX: '-15deg',
                    }}
                  />
                  <img
                    src={logoImg}
                    alt="Aussie Smart Energy"
                    className="relative h-16 w-auto object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </motion.div>

                {/* Green dot indicator — "active / online" feel */}
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#39b54a] border-2 border-[#0a1628]"
                  style={{ boxShadow: '0 0 8px rgba(57,181,74,0.8)' }}
                />
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                Delivering reliable, high quality solar solutions across Australia.
                Powering homes and businesses with clean, sustainable energy.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2.5 mt-1">
                <SocialBtn label="Facebook" color="#1877f2" bg="#e7f0fe">f</SocialBtn>
                <SocialBtn label="LinkedIn" color="#0a66c2" bg="#dbeafe">in</SocialBtn>
                <SocialBtn label="YouTube" color="#ff0000" bg="#fee2e2">?</SocialBtn>
                <SocialBtn label="X" color="#0f172a" bg="#f1f5f9">??</SocialBtn>
              </div>
            </motion.div>

            {/* -- Col 2: Quick Links -- */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#39b54a]/15 border border-[#39b54a]/25 flex items-center justify-center text-[#39b54a] text-xs">??</span>
                Quick Links
              </h4>
              <ul className="space-y-0.5">
                {quickLinks.map(l => <FooterLink key={l}>{l}</FooterLink>)}
              </ul>
            </motion.div>

            {/* -- Col 3: Resources -- */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 text-xs">??</span>
                Resources
              </h4>
              <ul className="space-y-0.5">
                {resources.map(r => <FooterLink key={r}>{r}</FooterLink>)}
              </ul>
            </motion.div>

            {/* -- Col 4: Contact + Newsletter -- */}
            <motion.div variants={itemVariants} className="flex flex-col gap-5">
              {/* Floating solar icon */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-6 pointer-events-none opacity-10"
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#39b54a" strokeWidth="1.5">
                  <rect x="6" y="16" width="36" height="22" rx="2" />
                  <line x1="18" y1="16" x2="18" y2="38" /><line x1="30" y1="16" x2="30" y2="38" />
                  <line x1="6" y1="27" x2="42" y2="27" />
                  <line x1="24" y1="38" x2="24" y2="44" /><line x1="16" y1="44" x2="32" y2="44" />
                  <path d="M16 10 C16 4, 22 2, 24 8" /><path d="M32 10 C32 4, 26 2, 24 8" />
                </svg>
              </motion.div>

              <h4 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#39b54a]/15 border border-[#39b54a]/25 flex items-center justify-center text-[#39b54a]">
                  <Phone size={13} />
                </span>
                Contact Us
              </h4>

              <ul className="space-y-3">
                <ContactRow icon={Phone}>0468 331 724</ContactRow>
                <ContactRow icon={Mail}>info@aussiesmartenergy.com.au</ContactRow>
                <ContactRow icon={MapPin}>Sydney, NSW &amp; Australia</ContactRow>
              </ul>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Newsletter */}
              <div className="flex flex-col gap-3">
                <h5 className="text-white font-bold text-sm flex items-center gap-2">
                  <Send size={14} className="text-[#39b54a]" />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #39b54a, #60a5fa)', backgroundSize: '200% auto', animation: 'gradShine 4s linear infinite' }}
                  >
                    Stay Updated
                  </span>
                </h5>
                <p className="text-slate-500 text-xs">Sign up for tips, updates and special offers on solar.</p>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-[#39b54a] text-sm font-semibold py-2"
                  >
                    <ShieldCheck size={16} /> Subscribed! Thank you.
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-0 rounded-xl overflow-hidden border border-white/10 focus-within:border-[#39b54a]/50 transition-all duration-300 focus-within:shadow-[0_0_16px_rgba(57,181,74,0.2)]">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 min-w-0 bg-white/5 text-white text-sm px-4 py-3 outline-none placeholder:text-slate-600"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-shrink-0 w-12 flex items-center justify-center text-white transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, #39b54a, #2d9e3f)' }}
                    >
                      <ArrowRight size={16} />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* -- Bottom bar -- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 pb-6"
          >
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <ShieldCheck size={14} className="text-[#39b54a]/70 flex-shrink-0" />
              <span>� 2024 Aussie Smart Energy | All Rights Reserved</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              {['Privacy Policy', 'Terms of Use'].map((item, i) => (
                <span key={item} className="flex items-center gap-4">
                  {i > 0 && <span className="text-white/10">|</span>}
                  <a href="#" className="relative group hover:text-[#39b54a] transition-colors duration-300">
                    {item}
                    <span className="absolute -bottom-px left-0 h-px w-0 bg-[#39b54a] group-hover:w-full transition-all duration-300" />
                  </a>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Inline keyframe for gradient text shine */}
        <style>{`
          @keyframes gradShine {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}</style>
      </footer>
    </>
  );
}
