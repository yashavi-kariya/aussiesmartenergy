// import { motion, useInView } from 'framer-motion';
// import { useRef, useState } from 'react';
// import {
//   Shield,
//   CheckCircle,
//   ArrowRight,
//   Star,
//   Users,
//   Clock,
//   Zap,
//   Award,
//   Activity,
//   MapPin,
//   UserCheck,
//   Leaf
// } from 'lucide-react';
// import rooftopSolarImg from '../assets/rooftopsolar.png';
// import bannerLogo from '../assets/banner-logo-1024x365.png';

// const ModernHeroSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, threshold: 0.1 });
//   const [formState, setFormState] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     postcode: ''
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({});

//   const bottomFeatures = [
//     { icon: Shield, text: 'Proven Quality Products' },
//     { icon: Award, text: 'Competitive Pricing' },
//     { icon: Zap, text: 'Flexible Finance Options' },
//     { icon: Activity, text: 'Seamless Start To End Process' },
//     { icon: Users, text: 'Reliable and Efficient' },
//     { icon: UserCheck, text: 'Customer Services and Support' },
//     { icon: MapPin, text: '100% Australian Owned' },
//     { icon: Award, text: 'Local "SAA" Accredited Installers' },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormState(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     if (!formState.firstName) newErrors.firstName = true;
//     if (!formState.lastName) newErrors.lastName = true;
//     if (!formState.email) newErrors.email = true;
//     if (!formState.phone) newErrors.phone = true;
//     if (!formState.postcode) newErrors.postcode = true;
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//     } else {
//       setSubmitted(true);
//     }
//   };

//   return (
//     <section ref={ref} id="home" className="relative min-h-screen flex flex-col pt-[90px]">
//       {/* Background Image */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src={rooftopSolarImg}
//           alt="Solar Home"
//           className="w-full h-full object-cover object-center"
//         />
//         {/* Gradient overlay — lighter on right so form stays visible */}
//         <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-white/30" />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
//         <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

//           {/* Left Column */}
//           <motion.div
//             initial="hidden"
//             animate={isInView ? 'visible' : 'hidden'}
//             variants={{
//               hidden: { opacity: 0 },
//               visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
//             }}
//             className="lg:col-span-7 space-y-5"
//           >
//             {/* Green pill badge */}
//             <motion.div
//               variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
//             >
//               <span className="inline-block bg-[#e8f7ea] text-[#39b54a] text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#c2ecc8]">
//                 CLEAN ENERGY SMART FUTURE.
//               </span>
//             </motion.div>

//             {/* H1 */}
//             <motion.h1
//               variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
//               className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#1e2d53]"
//             >
//               Powering Australia<br />
//               with{' '}
//               <span className="text-[#39b54a]">Smart Solar</span>
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
//               className="text-[#4a5568] text-base sm:text-lg font-medium leading-relaxed max-w-lg"
//             >
//               High performance solar solutions for homes and businesses. Lower energy bills, cleaner planet and a brighter future for generations.
//             </motion.p>

//             {/* Certification Banner Image */}
//             <motion.div
//               variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
//             >
//               <img
//                 src={bannerLogo}
//                 alt="Aussie Smart Energy Certifications"
//                 className="h-16 w-auto object-contain"
//               />
//             </motion.div>
//           </motion.div>

//           {/* Right Column — Rebate Form Card */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="lg:col-span-5"
//           >
//             <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 max-w-md mx-auto lg:mx-0">
//               {/* Form Header */}
//               <div className="flex items-start space-x-3 mb-5">
//                 <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Leaf className="w-5 h-5 text-[#39b54a]" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-extrabold text-[#1e2d53]">Check Your Rebate</h3>
//                   <p className="text-xs text-slate-500 font-medium mt-0.5">Find out how much you can save with Govt. Rebates</p>
//                 </div>
//               </div>

//               {!submitted ? (
//                 <form onSubmit={handleSubmit} className="space-y-3">
//                   {/* Name row */}
//                   <div className="grid grid-cols-2 gap-3">
//                     <input
//                       name="firstName"
//                       placeholder="First Name"
//                       value={formState.firstName}
//                       onChange={handleInputChange}
//                       className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${errors.firstName ? 'border-red-400 bg-red-50' : 'border-slate-200'
//                         }`}
//                     />
//                     <input
//                       name="lastName"
//                       placeholder="Last Name"
//                       value={formState.lastName}
//                       onChange={handleInputChange}
//                       className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${errors.lastName ? 'border-red-400 bg-red-50' : 'border-slate-200'
//                         }`}
//                     />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email Address"
//                     value={formState.email}
//                     onChange={handleInputChange}
//                     className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'
//                       }`}
//                   />
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="Phone Number"
//                     value={formState.phone}
//                     onChange={handleInputChange}
//                     className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200'
//                       }`}
//                   />
//                   <input
//                     name="postcode"
//                     placeholder="Suburb / Postcode"
//                     value={formState.postcode}
//                     onChange={handleInputChange}
//                     className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${errors.postcode ? 'border-red-400 bg-red-50' : 'border-slate-200'
//                       }`}
//                   />
//                   <motion.button
//                     type="submit"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="w-full bg-[#39b54a] hover:bg-[#2e9e3f] text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors shadow-md"
//                   >
//                     <span>Check Rebate</span>
//                     <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
//                       <ArrowRight className="w-4 h-4 text-[#39b54a]" />
//                     </div>
//                   </motion.button>
//                 </form>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="text-center py-6 space-y-3"
//                 >
//                   <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
//                     <CheckCircle className="w-7 h-7 text-[#39b54a]" />
//                   </div>
//                   <h4 className="text-lg font-bold text-[#1e2d53]">Thank You, {formState.firstName}!</h4>
//                   <p className="text-sm text-slate-600">A solar specialist will contact you shortly to discuss your rebate options.</p>
//                   <button
//                     onClick={() => { setSubmitted(false); setFormState({ firstName: '', lastName: '', email: '', phone: '', postcode: '' }); }}
//                     className="text-sm text-[#39b54a] font-bold hover:underline"
//                   >
//                     Check again →
//                   </button>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>

//         </div>
//       </div>

//       {/* Bottom Dark Features Banner */}
//       <div className="relative z-10 w-full">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           className="bg-[#0f1f3d] w-full"
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
//               {bottomFeatures.map((feat, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={isInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{
//                     duration: 0.5,
//                     delay: 0.6 + (idx * 0.1),
//                     ease: "easeOut"
//                   }}
//                   whileHover={{
//                     scale: 1.05,
//                     transition: { duration: 0.2 }
//                   }}
//                   className="flex items-center space-x-2.5 px-3 py-3 cursor-pointer group"
//                 >
//                   <motion.div
//                     className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#39b54a]/20 transition-colors"
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.6 }}
//                   >
//                     <feat.icon className="w-4 h-4 text-[#39b54a] group-hover:text-[#4dd865] transition-colors" />
//                   </motion.div>
//                   <span className="text-xs font-bold text-white/90 leading-tight group-hover:text-white transition-colors">
//                     {feat.text}
//                   </span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ModernHeroSection;

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
    <section ref={ref} id="home" className="relative min-h-screen flex flex-col pt-[90px] overflow-hidden" style={{ perspective: '1200px' }}>

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
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 30px 60px -15px rgba(30,45,83,0.25)' }}
              transition={{ duration: 0.3, ease: EASE }}
              className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 max-w-md mx-auto lg:mx-0"
            >
              {/* Form Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                className="flex items-start space-x-3 mb-5"
              >
                <motion.div
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                  className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Leaf className="w-5 h-5 text-[#39b54a]" />
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
                      <motion.input
                        key={field.name}
                        variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.4, ease: EASE }}
                        whileFocus={{ scale: 1.02 }}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formState[field.name]}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition-all duration-200 ${errors[field.name] ? 'border-red-400 bg-red-50' : 'border-slate-200'
                          }`}
                      />
                    ))}
                  </div>

                  {formFields.filter(f => !f.half).map((field) => (
                    <motion.input
                      key={field.name}
                      variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.4, ease: EASE }}
                      whileFocus={{ scale: 1.02 }}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formState[field.name]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition-all duration-200 ${errors[field.name] ? 'border-red-400 bg-red-50' : 'border-slate-200'
                        }`}
                    />
                  ))}

                  <motion.button
                    type="submit"
                    variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4, ease: EASE }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full bg-[#39b54a] hover:bg-[#2e9e3f] text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors shadow-md overflow-hidden group"
                  >
                    <motion.span
                      initial={{ x: '-120%' }}
                      whileHover={{ x: '220%' }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/20 skew-x-[-20deg]"
                    />
                    <span className="relative">Check Rebate</span>
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="relative w-6 h-6 bg-white rounded-full flex items-center justify-center"
                    >
                      <ArrowRight className="w-4 h-4 text-[#39b54a]" />
                    </motion.div>
                  </motion.button>
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
                    className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="w-7 h-7 text-[#39b54a]" />
                  </motion.div>
                  <h4 className="text-lg font-bold text-[#1e2d53]">Thank You, {formState.firstName}!</h4>
                  <p className="text-sm text-slate-600">A solar specialist will contact you shortly to discuss your rebate options.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ firstName: '', lastName: '', email: '', phone: '', postcode: '' }); }}
                    className="text-sm text-[#39b54a] font-bold hover:underline"
                  >
                    Check again →
                  </button>
                </motion.div>
              )}
            </motion.div>
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
                    variants={{ hover: { rotate: 360, backgroundColor: 'rgba(57,181,74,0.2)' } }}
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