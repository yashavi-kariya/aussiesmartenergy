import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Clock,
  Zap,
  Award,
  Activity,
  MapPin,
  UserCheck,
  Leaf
} from 'lucide-react';
import rooftopSolarImg from '../assets/rooftopsolar.png';

const ModernHeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postcode: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const stats = [
    { number: '15,000+', label: 'Happy Customers', icon: Users },
    { number: '100%', label: 'Quality Assured', icon: Shield },
    { number: '25+', label: 'Years Warranty', icon: Clock },
    { number: '5 Star', label: 'Rated Service', icon: Star },
  ];

  const bottomFeatures = [
    { icon: Shield, text: 'Premium Quality Products' },
    { icon: Zap, text: 'Flexible Finance Options' },
    { icon: Award, text: 'Competitive Pricing' },
    { icon: Activity, text: 'Seamless End to End Process' },
    { icon: MapPin, text: 'Local Support Australia Wide' },
    { icon: UserCheck, text: 'Trusted by 15,000+ Customers' },
  ];

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

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex flex-col pt-[70px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={rooftopSolarImg}
          alt="Solar Home"
          className="w-full h-full object-cover object-center"
        />
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
              <span className="inline-block bg-[#e8f7ea] text-[#39b54a] text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#c2ecc8]">
                CLEAN ENERGY SMART FUTURE.
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#1e2d53]"
            >
              Powering Australia<br />
              with{' '}
              <span className="text-[#39b54a]">Smart Solar</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-[#4a5568] text-base sm:text-lg font-medium leading-relaxed max-w-lg"
            >
              High performance solar solutions for homes and businesses. Lower energy bills, cleaner planet and a brighter future for generations.
            </motion.p>

            {/* Certification badges */}
            <motion.div
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#39b54a]" />
                <span className="text-xs font-bold text-slate-700">Approved Seller</span>
              </div>
              <div className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white text-[10px] font-extrabold flex-shrink-0">C</div>
                <span className="text-xs font-bold text-slate-700">Clean Energy Council Approved Retailer</span>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/95 rounded-2xl p-3 text-center shadow-md border border-slate-100 flex flex-col items-center"
                >
                  <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center mb-1.5">
                    <stat.icon className="w-4 h-4 text-[#39b54a]" />
                  </div>
                  <div className="text-sm font-extrabold text-[#1e2d53]">{stat.number}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide leading-tight">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — Rebate Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 max-w-md mx-auto lg:mx-0">
              {/* Form Header */}
              <div className="flex items-start space-x-3 mb-5">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-[#39b54a]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#1e2d53]">Check Your Rebate</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Find out how much you can save with Govt. Rebates</p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      name="firstName"
                      placeholder="First Name"
                      value={formState.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${
                        errors.firstName ? 'border-red-400 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      value={formState.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${
                        errors.lastName ? 'border-red-400 bg-red-50' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formState.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${
                      errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'
                    }`}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${
                      errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200'
                    }`}
                  />
                  <input
                    name="postcode"
                    placeholder="Suburb / Postcode"
                    value={formState.postcode}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-[#39b54a]/40 focus:border-[#39b54a] transition ${
                      errors.postcode ? 'border-red-400 bg-red-50' : 'border-slate-200'
                    }`}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#39b54a] hover:bg-[#2e9e3f] text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors shadow-md"
                  >
                    <span>Check Rebate</span>
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-[#39b54a]" />
                    </div>
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-3"
                >
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7 text-[#39b54a]" />
                  </div>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
              {bottomFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 px-3 py-3">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feat.icon className="w-4 h-4 text-[#39b54a]" />
                  </div>
                  <span className="text-xs font-bold text-white/90 leading-tight">{feat.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernHeroSection;