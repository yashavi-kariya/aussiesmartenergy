import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Shield, CheckCircle, ArrowRight, Users, Zap, Award, Activity,
  MapPin, UserCheck, Leaf
} from 'lucide-react';
import rooftopSolarImg from '../assets/rooftopsolar.png';
import bannerLogo from '../assets/banner-logo-1024x365.png';

const EASE = [0.22, 1, 0.36, 1];

const ModernHeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [formState, setFormState] = useState({
    firstName: '', lastName: '', email: '', phone: '', postcode: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const bottomFeatures = [
    { icon: Shield, text: 'Proven Quality Products' },
    { icon: Award, text: 'Competitive Pricing' },
    { icon: Zap, text: 'Flexible Finance Options' },
    { icon: Activity, text: 'Seamless Start To End Process' },
    { icon: Users, text: 'Customer Services and Support' },
    { icon: MapPin, text: '100% Australian Owned' },
    { icon: UserCheck, text: 'Reliable and Efficient' },
    { icon: Award, text: 'Local "SAA" Accredited Installers' },
  ];

  // Split headline into words for staggered typography animation
  const line1Words = 'Powering Australia'.split(' ');
  const line2Words = ['with', 'Smart', 'Solar'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formState.firstName) newErrors.firstName = true;
    if (!formState.lastName) newErrors.lastName = true;
    if (!formState.email) newErrors.email = true;
    if (!formState.phone) newErrors.phone = true;
    if (!formState.postcode) newErrors.postcode = true;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSubmitted(true);
    }
  };

  const formFields = [
    { name: 'firstName', placeholder: 'First Name', type: 'text', half: true },
    { name: 'lastName', placeholder: 'Last Name', type: 'text', half: true },
    { name: 'email', placeholder: 'Email Address', type: 'email', half: false },
    { name: 'phone', placeholder: 'Phone Number', type: 'tel', half: false },
    { name: 'postcode', placeholder: 'Suburb / Postcode', type: 'text', half: false },
  ];

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex flex-col pt-[96px] overflow-hidden" style={{ perspective: '1200px' }}>

      {/* Background Image — 3D animated Ken Burns + tilt */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15, rotateZ: 0.6, rotateX: 2 }}
          animate={{
            scale: [1.15, 1.22, 1.15],
            rotateZ: [0.6, -0.6, 0.6],
            rotateX: [2, 0, 2],
            x: [0, -18, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
          className="w-full h-full"
        >
          <img
            src={rooftopSolarImg}
            alt="Solar Home"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* subtle floating light particles for depth */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30 blur-xl"
            style={{
              width: 40 + i * 12,
              height: 40 + i * 12,
              top: `${10 + i * 14}%`,
              left: `${15 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
          />
        ))}

        {/* Gradient overlay — lighter on right so form stays visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Green pill badge */}
            <motion.div
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <motion.span
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(57,181,74,0)',
                    '0 0 14px rgba(57,181,74,0.35)',
                    '0 0 0px rgba(57,181,74,0)',
                  ]
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block bg-[#e8f7ea] text-[#39b54a] text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#c2ecc8]"
              >
                CLEAN ENERGY SMART FUTURE.
              </motion.span>
            </motion.div>

            {/* H1 — animated word-by-word typography reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#1e2d53]">
              <span className="block overflow-hidden">
                {line1Words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%', rotateX: 60, opacity: 0 }}
                    animate={isInView ? { y: '0%', rotateX: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE }}
                    className="inline-block mr-3"
                    style={{ transformOrigin: 'bottom', display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden">
                {line2Words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%', rotateX: 60, opacity: 0 }}
                    animate={isInView ? { y: '0%', rotateX: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.45 + i * 0.12, ease: EASE }}
                    className={`inline-block mr-3 ${word === 'Smart' || word === 'Solar' ? 'text-[#39b54a]' : ''}`}
                    style={{ transformOrigin: 'bottom', display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Description */}
            <motion.p
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-[#4a5568] text-base sm:text-lg font-medium leading-relaxed max-w-lg"
            >
              High performance solar solutions for homes and businesses. Lower energy bills, cleaner planet and a brighter future for generations.
            </motion.p>

            {/* Certification Banner Image — bigger + hover animation */}
            <motion.div
              variants={{ hidden: { y: 20, opacity: 0, scale: 0.9 }, visible: { y: 0, opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.08, rotate: [-1, 1, 0] }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-block"
            >
              <img
                src={bannerLogo}
                alt="Aussie Smart Energy Certifications"
                className="h-24 sm:h-28 w-auto object-contain drop-shadow-md"
              />
            </motion.div>
          </motion.div>

          {/* Right Column — Rebate Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 40, rotateY: -8 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="lg:col-span-5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Unique angled/clipped form card */}
            <div className="relative max-w-md mx-auto lg:mx-0">

              {/* Decorative corner accent — top-right notch */}
              <div
                className="absolute -top-3 -right-3 w-24 h-24 rounded-full z-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(30,64,175,0.18) 0%, transparent 70%)' }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full z-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(30,45,83,0.15) 0%, transparent 70%)' }}
              />

              {/* Red top-left diagonal ribbon */}
              <div
                className="absolute top-0 left-0 z-10 overflow-hidden pointer-events-none"
                style={{ width: 80, height: 80 }}
              >
                <div
                  className="absolute bg-[#1e40af] text-white text-[9px] font-black tracking-widest uppercase text-center"
                  style={{
                    width: 110,
                    top: 22,
                    left: -28,
                    transform: 'rotate(-45deg)',
                    padding: '3px 0',
                    boxShadow: '0 2px 6px rgba(30,64,175,0.4)',
                  }}
                >
                  FREE
                </div>
              </div>

              {/* Main card with custom clip-path for unique shape */}
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 40px 80px -20px rgba(30,64,175,0.2), 0 20px 40px -10px rgba(30,45,83,0.2)' }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative z-10 bg-white shadow-2xl border border-slate-100 overflow-hidden"
                style={{
                  borderRadius: '24px 24px 24px 24px',
                  clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))',
                }}
              >
                {/* Gradient top bar — navy to red */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: 'linear-gradient(90deg, #1e2d53 0%, #1e40af 50%, #1e2d53 100%)' }}
                />

                {/* Subtle background pattern inside card */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #1e2d53 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative p-6">
                  {/* Form Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                    className="flex items-start space-x-3 mb-6"
                  >
                    {/* Red icon badge */}
                    <motion.div
                      animate={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #1e40af, #1d4ed8)' }}
                    >
                      <Leaf className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#1e2d53]">Check Your Rebate</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Find out how much you can save with Govt. Rebates</p>
                    </div>
                  </motion.div>

                  {!submitted ? (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-3"
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } }
                      }}
                    >
                      {/* Name row */}
                      <div className="grid grid-cols-2 gap-3">
                        {formFields.filter(f => f.half).map((field) => (
                          <motion.div
                            key={field.name}
                            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="relative"
                          >
                            <input
                              name={field.name}
                              placeholder={field.placeholder}
                              value={formState[field.name]}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField(field.name)}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-3 py-2.5 text-sm border-b-2 border-x-0 border-t-0 bg-slate-50 rounded-t-lg outline-none transition-all duration-200 focus:bg-white ${errors[field.name]
                                ? 'border-b-blue-400 bg-blue-50'
                                : focusedField === field.name
                                  ? 'border-b-[#1e40af]'
                                  : 'border-b-slate-200'
                                }`}
                            />
                            {/* Animated underline */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 bg-[#1e40af] rounded-full"
                              animate={{ width: focusedField === field.name ? '100%' : '0%' }}
                              transition={{ duration: 0.3, ease: EASE }}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {formFields.filter(f => !f.half).map((field) => (
                        <motion.div
                          key={field.name}
                          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="relative"
                        >
                          <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formState[field.name]}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField(field.name)}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-3 py-2.5 text-sm border-b-2 border-x-0 border-t-0 bg-slate-50 rounded-t-lg outline-none transition-all duration-200 focus:bg-white ${errors[field.name]
                              ? 'border-b-blue-400 bg-blue-50'
                              : focusedField === field.name
                                ? 'border-b-[#1e40af]'
                                : 'border-b-slate-200'
                              }`}
                          />
                          {/* Animated underline */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-[#1e40af] rounded-full"
                            animate={{ width: focusedField === field.name ? '100%' : '0%' }}
                            transition={{ duration: 0.3, ease: EASE }}
                          />
                        </motion.div>
                      ))}

                      {/* Red submit button with unique shape */}
                      <motion.div
                        variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="pt-1"
                      >
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02, boxShadow: '0 12px 32px -8px rgba(30,64,175,0.55)' }}
                          whileTap={{ scale: 0.97 }}
                          className="relative w-full text-white py-3.5 font-extrabold text-sm overflow-hidden group flex items-center justify-center gap-3"
                          style={{
                            background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #1e3a8a 100%)',
                            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                            borderRadius: '4px',
                          }}
                        >
                          {/* Shimmer sweep */}
                          <motion.span
                            initial={{ x: '-120%' }}
                            whileHover={{ x: '220%' }}
                            transition={{ duration: 0.55, ease: EASE }}
                            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/20 skew-x-[-20deg]"
                          />
                          <span className="relative tracking-wide">Check Rebate</span>
                          {/* Animated arrow circle */}
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            whileHover={{ rotate: 45, x: 0 }}
                            transition={{
                              x: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
                              rotate: { duration: 0.25, ease: EASE }
                            }}
                            className="relative w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0"
                          >
                            <ArrowRight className="w-4 h-4 text-[#1e40af]" />
                          </motion.div>
                        </motion.button>
                      </motion.div>

                      {/* Trust badges row */}
                      <motion.div
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="flex items-center justify-center gap-4 pt-1"
                      >
                        {['No Obligation', '100% Free', 'Fast Response'].map((badge) => (
                          <span key={badge} className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e40af]" />
                            {badge}
                          </span>
                        ))}
                      </motion.div>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="text-center py-6 space-y-3"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
                        style={{ background: 'linear-gradient(135deg, #1e40af, #1d4ed8)' }}
                      >
                        <CheckCircle className="w-7 h-7 text-white" />
                      </motion.div>
                      <h4 className="text-lg font-bold text-[#1e2d53]">Thank You, {formState.firstName}!</h4>
                      <p className="text-sm text-slate-600">A solar specialist will contact you shortly to discuss your rebate options.</p>
                      <button
                        onClick={() => { setSubmitted(false); setFormState({ firstName: '', lastName: '', email: '', phone: '', postcode: '' }); }}
                        className="text-sm text-[#1e40af] font-bold hover:underline"
                      >
                        Check again →
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Dark Features Banner */}
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-[#0f1f3d] w-full"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {bottomFeatures.map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + (idx * 0.1), ease: 'easeOut' }}
                  whileHover="hover"
                  className="flex items-center space-x-2.5 px-3 py-3 cursor-pointer group rounded-xl"
                >
                  <motion.div
                    variants={{ hover: { rotate: 360, backgroundColor: 'rgba(201, 11, 11, 0.2)' } }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <feat.icon className="w-4 h-4 text-[#39b54a] group-hover:text-[#4dd865] transition-colors" />
                  </motion.div>
                  <motion.span
                    variants={{ hover: { x: 3, color: '#ffffff' } }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="text-xs font-bold text-white/90 leading-tight"
                  >
                    {feat.text}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernHeroSection;