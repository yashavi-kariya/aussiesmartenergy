import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Battery, Sun, Zap, ShieldCheck, Award, TrendingUp,
  CheckCircle, Phone, ArrowRight, Star, Users, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import badgeImg from '../assets/badge.png';
import solarBatteries1 from '../assets/solarbattries1.png';
import solarBatteries2 from '../assets/solarbattries2.png';
import solarBatteries3 from '../assets/solarbattries3.png';
import solarBatteries4 from '../assets/solarbattries4.png';
import solarBatteries5 from '../assets/solarbattries5.png';
import solarBatteries6 from '../assets/solarbattries6.png';
import solarBatteries7 from '../assets/solarbattries7.png';
import solarBatteries8 from '../assets/solarbattries8.png';

const EASE = [0.22, 1, 0.36, 1];
const NAVY = '#1e2d53';
const GREEN = '#39b54a';

/* ─── FAQ Section Component ─── */
const FaqItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="border border-blue-300 rounded-xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 px-5 py-4 text-left group"
      >
        {/* Blue checkmark */}
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 3.293 9.879a1 1 0 011.414-1.414L8.414 12.17l6.879-6.877a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {/* Question */}
        <span className="flex-1 text-sm font-semibold text-gray-800 leading-snug">
          {faq.q}
        </span>
        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-5 h-5 flex-shrink-0 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </motion.svg>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed pl-13">
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FaqSection = ({ faqs }) => {
  // Split into two columns
  const leftCol = faqs.filter((_, i) => i % 2 === 0);
  const rightCol = faqs.filter((_, i) => i % 2 !== 0);
  return (
    <section className="py-16" style={{ background: 'linear-gradient(160deg, #e8f4fd 0%, #f0f8ff 50%, #e8f4fd 100%)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-blue-600">
          Frequently asked questions
        </h2>
        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {leftCol.map((faq, i) => (
              <FaqItem key={i * 2} faq={faq} index={i * 2} />
            ))}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-4">
            {rightCol.map((faq, i) => (
              <FaqItem key={i * 2 + 1} faq={faq} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Reasons Carousel Component ─── */
const reasonsCards = [
  {
    id: 1,
    title: "Increase Your Home's Energy Independence",
    text: "In the current energy landscape, many people realize they no longer need to depend on their utility company for electricity. With the rise of solar power and other alternative energy sources, it is now possible to...",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
        <rect x="28" y="44" width="44" height="36" rx="2" stroke="#2d6be4" strokeWidth="3" fill="#dbeafe" />
        <path d="M22 44 L50 22 L78 44" stroke="#2d6be4" strokeWidth="3" strokeLinejoin="round" />
        <rect x="41" y="60" width="11" height="20" rx="1" fill="#93c5fd" />
        <rect x="58" y="52" width="10" height="10" rx="1" fill="#bfdbfe" stroke="#2d6be4" strokeWidth="1.5" />
        <rect x="40" y="29" width="20" height="12" rx="1" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
        <line x1="50" y1="29" x2="50" y2="41" stroke="#16a34a" strokeWidth="1" />
        <line x1="40" y1="35" x2="60" y2="35" stroke="#16a34a" strokeWidth="1" />
        <circle cx="78" cy="30" r="8" fill="#fbbf24" />
        <circle cx="20" cy="68" r="11" fill="#f97316" />
        <text x="20" y="73" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#fff">⚡</text>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Regulatory Changes are in the Works",
    text: "In Australia, a number of new and updated laws are on the horizon, including a commitment to boost rooftop solar installations that will impact the way homes are powered. In response to these changes...",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
        <line x1="50" y1="18" x2="50" y2="72" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
        <rect x="43" y="72" width="14" height="14" rx="2" fill="#374151" />
        <line x1="25" y1="30" x2="75" y2="30" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
        <line x1="25" y1="30" x2="20" y2="48" stroke="#6b7280" strokeWidth="2" />
        <line x1="25" y1="30" x2="30" y2="48" stroke="#6b7280" strokeWidth="2" />
        <path d="M16 48 Q20 54 24 48" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        <line x1="75" y1="30" x2="70" y2="48" stroke="#6b7280" strokeWidth="2" />
        <line x1="75" y1="30" x2="80" y2="48" stroke="#6b7280" strokeWidth="2" />
        <path d="M66 48 Q70 54 74 48" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="50" cy="22" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Lowered Prices make Batteries a Good Deal",
    text: "Batteries are cheaper than most other options on the market as their prices have been lowered substantially over the last few years. Batteries also make a better choice than other solar power options regarding...",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
        <path d="M38 22 L38 46 L22 72 C20 77 24 82 30 82 L70 82 C76 82 80 77 78 72 L62 46 L62 22" stroke="#374151" strokeWidth="3" strokeLinejoin="round" />
        <rect x="35" y="17" width="30" height="6" rx="2" fill="#374151" />
        <ellipse cx="50" cy="64" rx="22" ry="14" fill="#fbbf24" opacity="0.75" />
        <circle cx="44" cy="59" r="3.5" fill="#fff" opacity="0.7" />
        <circle cx="56" cy="66" r="2.5" fill="#fff" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Environmental Conditions and Urgency for Alternative Power",
    text: "The world has always been a changing place, but the climate crisis is creating new challenges that are pushing us to seek alternative ways of powering our lives. We need to look into...",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="28" fill="#d1fae5" stroke="#059669" strokeWidth="2.5" />
        <path d="M30 38 Q50 20 70 38 Q70 62 50 72 Q30 62 30 38Z" fill="#34d399" opacity="0.6" />
        <path d="M50 72 L50 30" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 50 Q50 44 62 50" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="78" cy="22" r="7" fill="#fbbf24" />
        <line x1="78" y1="12" x2="78" y2="8" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="85" y1="15" x2="88" y2="12" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="88" y1="22" x2="92" y2="22" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Chemistry Advancements Enable Better Batteries",
    text: "The advancement in the field of chemistry has enabled manufacturers to produce better and more efficient batteries that last longer, so you can get more out of your investment. In recent years...",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
        <path d="M36 22 L36 48 L20 76 C18 81 22 86 28 86 L72 86 C78 86 82 81 80 76 L64 48 L64 22" stroke="#374151" strokeWidth="3" strokeLinejoin="round" />
        <rect x="33" y="17" width="34" height="6" rx="2" fill="#374151" />
        <circle cx="40" cy="62" r="4" fill="#fbbf24" opacity="0.8" />
        <circle cx="55" cy="55" r="5" fill="#fbbf24" opacity="0.8" />
        <circle cx="63" cy="68" r="3" fill="#fbbf24" opacity="0.6" />
        <ellipse cx="50" cy="70" rx="22" ry="12" fill="#fbbf24" opacity="0.5" />
        <ellipse cx="50" cy="10" rx="10" ry="5" stroke="#2d6be4" strokeWidth="1.5" opacity="0.7" transform="rotate(-30 50 10)" />
        <ellipse cx="50" cy="10" rx="10" ry="5" stroke="#2d6be4" strokeWidth="1.5" opacity="0.7" transform="rotate(30 50 10)" />
        <circle cx="50" cy="10" r="2.5" fill="#2d6be4" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Solar Batteries Increase Property Value",
    text: "Homes equipped with solar battery systems are increasingly valued higher in the real estate market. Buyers are willing to pay a premium for homes that offer reduced electricity bills and energy independence...",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
        <rect x="25" y="50" width="50" height="34" rx="2" stroke="#2d6be4" strokeWidth="3" fill="#dbeafe" />
        <path d="M18 50 L50 26 L82 50" stroke="#2d6be4" strokeWidth="3" strokeLinejoin="round" />
        <rect x="42" y="66" width="12" height="18" rx="1" fill="#93c5fd" />
        <polyline points="20,75 35,60 48,68 68,45 80,52" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polygon points="80,52 72,46 78,40" fill="#22c55e" />
      </svg>
    ),
  },
];

/* ─── Sliding Window Carousel ─── */
const CARD_W = 300;
const CARD_GAP = 20;
const CARD_STEP = CARD_W + CARD_GAP;
const VISIBLE = 3;

const ReasonsCarousel = () => {
  const total = reasonsCards.length; // 6
  // Append first VISIBLE cards as clones so slide-out wraps seamlessly
  const allCards = [...reasonsCards, ...reasonsCards.slice(0, VISIBLE)];

  const [pos, setPos] = useState(0);        // index of the leftmost visible card
  const [instant, setInstant] = useState(false); // true = no transition (silent reset)
  const timerRef = useRef(null);
  const lockRef = useRef(false);            // prevent double-trigger during reset

  const advance = () => {
    if (lockRef.current) return;
    setPos((prev) => {
      const next = prev + 1;
      // After card total slides off, silently jump back to 0
      if (next >= total) {
        lockRef.current = true;
        setTimeout(() => {
          setInstant(true);
          setPos(0);
          requestAnimationFrame(() => requestAnimationFrame(() => {
            setInstant(false);
            lockRef.current = false;
          }));
        }, 520); // wait for 500ms slide to finish
      }
      return next;
    });
  };

  useEffect(() => {
    timerRef.current = setInterval(advance, 3200);
    return () => clearInterval(timerRef.current);
  }, []);

  const activeDot = pos % total;

  const goToDot = (i) => {
    clearInterval(timerRef.current);
    setInstant(false);
    setPos(i);
    timerRef.current = setInterval(advance, 3200);
  };

  return (
    <section
      className="py-14 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute left-6 bottom-6 w-40 h-40 border-4 border-white/20 rounded-full pointer-events-none" />
      <div className="absolute left-16 bottom-16 w-20 h-20 border-2 border-white/10 rounded-full pointer-events-none" />

      {/* Clipping window — exactly wide enough for 3 cards */}
      <div
        className="mx-auto"
        style={{
          width: VISIBLE * CARD_W + (VISIBLE - 1) * CARD_GAP,
          overflow: 'hidden',
        }}
      >
        <motion.div
          className="flex"
          style={{ gap: CARD_GAP }}
          animate={{ x: -pos * CARD_STEP }}
          transition={
            instant
              ? { duration: 0 }
              : { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
          }
        >
          {allCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl flex-shrink-0"
              style={{ width: CARD_W, minHeight: 290, padding: '28px 22px' }}
            >
              <div className="mb-4">{card.icon}</div>
              <h3
                className="text-[15px] font-extrabold leading-snug mb-3"
                style={{ color: '#1d4ed8' }}
              >
                {card.title}
              </h3>
              <p className="text-gray-600 text-[13px] leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {reasonsCards.map((_, i) => (
          <button
            key={i}
            onClick={() => goToDot(i)}
            className={`rounded-full transition-all duration-300 ${i === activeDot
              ? 'w-6 h-3 bg-white'
              : 'w-3 h-3 bg-white/40 hover:bg-white/65'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

const SolarBatteriesPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const features = [
    { icon: Zap, title: 'High Efficiency Panels', desc: 'Maximum energy capture for your home' },
    { icon: Battery, title: 'Premium Battery Storage', desc: '10+ year warranty on all systems' },
    { icon: ShieldCheck, title: '25 Yrs Performance Warranty', desc: 'Long-term peace of mind' },
    { icon: CheckCircle, title: 'CEC Approved & Checked', desc: 'Certified quality installation' }
  ];

  const awards = [
    { year: '2020', title: 'No.1', subtitle: 'Company of The Year' },
    { year: '2021', title: 'No.1', subtitle: 'Trusted Solar Retailer' },
    { year: '2022', title: 'No.1', subtitle: 'Best Solar Company' },
    { year: '2023', title: 'No.1', subtitle: 'Excellence in Service' },
    { year: '2024', title: 'No.1', subtitle: 'Industry Leader' }
  ];

  const products = [
    {
      name: 'Solar Panels',
      details: ['High Efficiency', 'Australian Made', 'Tier 1 Quality'],
      image: '🔆'
    },
    {
      name: 'Get Solar + Battery Today!',
      details: ['Full Package', 'Installation Included', 'Instant Savings'],
      image: '🔋',
      highlight: true
    }
  ];

  const faqs = [
    { q: 'What are the advantages of a battery?', a: 'Solar batteries allow you to store excess energy generated during the day and use it at night or during power outages, reducing your reliance on the grid and lowering electricity bills.' },
    { q: "What's a kWh?", a: 'A kilowatt-hour (kWh) is a unit of energy equal to one kilowatt of power used for one hour. It is the standard unit used to measure electricity consumption on your power bill.' },
    { q: 'How long will the battery last if it is charged full?', a: 'This depends on your household energy usage. A fully charged 10kWh battery can typically power an average home for 12–24 hours, depending on consumption.' },
    { q: 'Does the home battery have the potential to feed into the grid and qualify for the feed-in tariff?', a: 'Yes, in many states of Australia, excess battery energy can be exported to the grid and you may qualify for a feed-in tariff. Conditions vary by retailer and state.' },
    { q: 'How big should my battery be?', a: 'Battery size depends on your daily energy consumption and how long you want backup power. Most Australian homes benefit from a 10–13.5kWh battery system.' },
    { q: 'What other components do we need while installing a battery?', a: 'In addition to the battery, you will typically need a compatible inverter, a battery management system (BMS), mounting hardware, and appropriate cabling and safety switches.' },
    { q: 'What does "single phase" and "three phase" power mean?', a: 'Single phase power uses one live wire and is standard in most homes. Three phase power uses three live wires and is more common in commercial properties or larger homes with high energy demands.' },
    { q: 'Should the battery be outside or inside?', a: 'Most modern solar batteries are designed for both indoor and outdoor installation. However, they should be kept away from direct sunlight and extreme temperatures for optimal performance.' },
    { q: 'In the event of a black out, do I have to switch on the battery?', a: 'It depends on your system setup. Some systems automatically switch to battery backup during a blackout, while others require manual switching. Ask your installer about backup mode options.' },
    { q: "What's the life span of a battery?", a: 'Most quality solar batteries have a lifespan of 10–15 years, with most manufacturers offering a 10-year warranty. Performance may gradually reduce over time, typically retaining 70–80% capacity at end of warranty.' },
  ];

  return (
    <div className="min-h-screen bg-white pt-[96px]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4"
              >
                SUNBOOST
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6" style={{ color: NAVY }}>
                Spring is Coming.<br />
                Are Your <span className="text-blue-600">Energy Bills</span> Ready?
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Prepare your home with Australia's most trusted solar and battery solutions.
                Store the sun's energy and use it when you need it most.
              </p>

              {/* Special Offer Badge */}
              <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border-2 border-orange-200">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">14kWh SOLAR + BATTERY SYSTEM</p>
                    <p className="text-xs text-gray-500 mb-2">Starting From</p>
                    <p className="text-5xl font-black text-orange-500">$5491*</p>
                    <p className="text-xs text-gray-400 mt-2">*After rebate. Upfront payment option. T&Cs apply.</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5" style={{ color: GREEN }} />
                  <span className="font-semibold">100% Australian</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5" style={{ color: GREEN }} />
                  <span className="font-semibold">5 Year Installation Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5" style={{ color: GREEN }} />
                  <span className="font-semibold">CEC Approved Retailers</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Image + Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                  alt="Solar Battery System"
                  className="w-full h-auto"
                />

                {/* Trustpilot Badge */}
                <div className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-xs font-bold text-gray-500 mb-2">Excellent</div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">TrustPilot</span>
                  </div>
                </div>

                {/* CEC Badge */}
                <div className="absolute bottom-6 right-6 bg-white rounded-full p-3 shadow-lg">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Stat 1 - Total Solar Panels Installed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sun className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-4xl font-black text-center mb-2" style={{ color: NAVY }}>1.8M+</h3>
              <div className="w-12 h-1 bg-blue-500 mx-auto mb-3 rounded-full"></div>
              <p className="text-gray-600 font-medium text-center text-sm">Total Solar Panels Installed</p>
            </motion.div>

            {/* Stat 2 - Installations Nationwide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-4xl font-black text-center mb-2" style={{ color: NAVY }}>85,000+</h3>
              <div className="w-12 h-1 bg-blue-500 mx-auto mb-3 rounded-full"></div>
              <p className="text-gray-600 font-medium text-center text-sm">Installations Nationwide</p>
            </motion.div>

            {/* Stat 3 - Total Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-4xl font-black text-center mb-2" style={{ color: NAVY }}>34,000+</h3>
              <div className="w-12 h-1 bg-blue-500 mx-auto mb-3 rounded-full"></div>
              <p className="text-gray-600 font-medium text-center text-sm">Total Reviews</p>
            </motion.div>

            {/* Stat 4 - Product Review Winner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <svg className="w-16 h-16" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="#4ade80" opacity="0.2" />
                    <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="#22c55e" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">2024</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-black text-center mb-2" style={{ color: NAVY }}>WINNER</h3>
              <div className="w-12 h-1 bg-blue-500 mx-auto mb-3 rounded-full"></div>
              <p className="text-gray-600 font-medium text-center text-sm">Product Review Winner</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards Section - Winners For 5 Years */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <span className="inline-block px-4 py-2 bg-green-500 text-white text-sm font-bold uppercase mb-4">
                TRUSTED BY
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: NAVY }}>
                AUSSIE CUSTOMERS
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold">
                <span className="text-blue-600">Winners For</span><br />
                <span style={{ color: NAVY }}>5 YEARS</span> <span className="text-blue-600">in a row</span>
              </h3>
            </motion.div>

            {/* Center - Trophy */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center relative"
            >
              {/* Confetti effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: [0, 1, 0], y: [0, 60, 80] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="absolute"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 2) * 20}%`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: i % 2 === 0 ? '#f59e0b' : '#ef4444' }}
                    />
                  </motion.div>
                ))}
              </div>
              {/* Trophy SVG */}
              <svg className="w-48 h-48 md:w-56 md:h-56" viewBox="0 0 200 220" fill="none">
                {/* Trophy Cup */}
                <path
                  d="M60 40 L60 80 C60 95 70 105 80 110 L80 150 L120 150 L120 110 C130 105 140 95 140 80 L140 40 Z"
                  fill="url(#goldGradient)"
                  stroke="#b8860b"
                  strokeWidth="2"
                />
                {/* Trophy Handles */}
                <path
                  d="M60 50 C40 50 30 60 30 70 C30 80 40 90 60 90"
                  fill="url(#goldGradient)"
                  stroke="#b8860b"
                  strokeWidth="2"
                />
                <path
                  d="M140 50 C160 50 170 60 170 70 C170 80 160 90 140 90"
                  fill="url(#goldGradient)"
                  stroke="#b8860b"
                  strokeWidth="2"
                />
                {/* Trophy Base */}
                <rect x="70" y="150" width="60" height="15" rx="3" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="2" />
                <rect x="60" y="165" width="80" height="20" rx="4" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="2" />
                <rect x="50" y="185" width="100" height="15" rx="4" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="2" />

                {/* Red accent on top */}
                <rect x="85" y="25" width="30" height="20" rx="2" fill="#dc2626" />

                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Right - Star Rating */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-right"
            >
              <h3 className="text-4xl md:text-5xl font-black mb-3" style={{ color: NAVY }}>
                17,400+
              </h3>
              <div className="flex justify-center lg:justify-end gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-600">Total Five Star Reviews</p>

              {/* Award Badges */}
              <div className="mt-6 flex justify-center lg:justify-end gap-2">
                {[2020, 2021, 2022, 2023, 2024].map((year, idx) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="relative"
                  >
                    <svg className="w-12 h-12" viewBox="0 0 50 50">
                      <circle cx="25" cy="25" r="23" fill="#22c55e" opacity="0.9" />
                      <circle cx="25" cy="25" r="20" fill="white" />
                      <text x="25" y="20" textAnchor="middle" className="text-[8px] font-bold fill-green-600">
                        {year}
                      </text>
                      <text x="25" y="30" textAnchor="middle" className="text-[6px] font-bold fill-gray-600">
                        WINNER
                      </text>
                    </svg>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium">TOP RATED SOLAR PANEL INSTALLERS</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* State Awards Badges Section */}
      <section className="bg-white overflow-hidden">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center -my-12"
          >
            <img
              src={badgeImg}
              alt="SUNWIZ AWARD 2025 - NO.1 Solar Installer - Residential, New South Wales, Queensland, South Australia, Overall Australia"
              className="w-full h-auto object-cover"
              style={{
                objectPosition: 'center',
                maxHeight: '279px'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Affordable Solar & Battery Solutions Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={solarBatteries1}
                alt="Solar Panels and Battery Storage System"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                <span className="text-blue-600">Affordable Solar & Battery Solutions</span>
                <br />
                <span className="text-gray-900">Powering A Cleaner Tomorrow.</span>
              </h2>

              <div className="h-1 w-16 bg-blue-600"></div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-gray-700 text-lg">
                    Have you ever made an investment, like buying a car?
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-gray-700 text-lg">
                    If so, you know that the initial price is just the beginning. Ongoing expenses for maintaining that asset can impact its overall value.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-gray-900 border-2 border-yellow-400 bg-yellow-400 rounded-lg hover:bg-yellow-500 hover:border-yellow-500 transition-all shadow-md"
                >
                  Find Out More
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md"
                >
                  Get A Quote
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Just Solar Panels or get a Battery too? Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4">
              Just Solar Panels or get a Battery too?
            </h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              The first step is to make your own power with solar panels. Adding a battery gives you three ways to save and can provide reliable power during a blackout.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Column - Solar Panels + Battery */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg"
            >
              <div className="mb-6">
                <img
                  src={solarBatteries2}
                  alt="Solar Panels with Battery Storage"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <h3 className="text-2xl font-extrabold text-blue-600 mb-4">
                Solar Panels + Battery
              </h3>

              <div className="h-1 w-12 bg-blue-600 mb-6"></div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Save during the <span className="font-bold">day</span>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Save at <span className="font-bold">night</span>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Power your home during a blackout
                  </p>
                </div>
              </div>

              <div className="bg-blue-200 rounded-lg px-4 py-2 text-center">
                <p className="text-sm font-semibold text-blue-900">
                  Save up to 90% or more*
                </p>
              </div>
            </motion.div>

            {/* Middle Column - Solar Panels Only */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg"
            >
              <div className="mb-6">
                <img
                  src={solarBatteries3}
                  alt="Solar Panels Only"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <h3 className="text-2xl font-extrabold text-blue-600 mb-4">
                Solar Panels
              </h3>

              <div className="h-1 w-12 bg-blue-600 mb-6"></div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Save during the <span className="font-bold">day</span>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    <span className="font-bold">Low</span> maintenance costs
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    <span className="font-bold">Reduces</span> electricity bills
                  </p>
                </div>
              </div>

              <div className="bg-blue-200 rounded-lg px-4 py-2 text-center">
                <p className="text-sm font-semibold text-blue-900">
                  Save around 50%*
                </p>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border-2 border-blue-600 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-2xl font-extrabold text-blue-600 mb-2 text-center">
                Get Solar Battery
              </h3>
              <h4 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
                Today!
              </h4>

              <div className="h-1 w-12 bg-blue-600 mx-auto mb-6"></div>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                />

                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                />

                <input
                  type="tel"
                  placeholder="Mobile*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                />

                <input
                  type="text"
                  placeholder="Address*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                />

                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-gray-600">
                  <option>Select any One</option>
                  <option>Solar Panels Only</option>
                  <option>Solar Panels + Battery</option>
                  <option>Battery Only</option>
                </select>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    className="w-4 h-4 mt-1 accent-blue-600"
                  />
                  <label htmlFor="privacy-consent" className="text-xs text-gray-600">
                    I agree that I have read your company's Privacy Policy available on this website and that I express consent to the terms and conditions contained in the Policy.
                  </label>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors shadow-md"
                >
                  Send Request
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solar Battery for Houses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4">
              Solar Battery for Houses
            </h2>
            <div className="h-1 w-16 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
              Solar batteries for houses are becoming more and more popular. Many homeowners are finding that they can reduce their energy bills significantly by solar panel installation with battery in their homes.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={solarBatteries4}
                alt="Solar Battery Installation Technician"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-gray-700 text-lg leading-relaxed">
                Because solar battery installation cost is low and is relatively easy to install at your home, you can enjoy the benefits of clean energy without any of the hassles of dealing with utility companies.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed">
                One great benefit of having a solar battery system is that you can disconnect from the grid entirely when you're not using electricity. Your only expense will be the initial cost of installing your battery system and purchasing additional batteries to store the maximum amount of energy possible. Once you have installed this system, you will never have to pay for those expensive bills again!
              </p>

              <motion.a
                href="#benefits"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg rounded-lg transition-all shadow-md"
              >
                See How Customers Benefits from Solar Batteries
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Everything You Need to Know & Solar Power Systems Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Banner - Free Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-400 to-blue-300 rounded-3xl p-8 md:p-12 mb-16 shadow-2xl overflow-hidden relative"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
              {/* Left - Text Content */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900 leading-tight">
                  Everything You Need to Know<br />
                  Before Going Solar
                </h2>
                <p className="text-xl font-bold text-gray-900">
                  Download Our FREE Solar Guide Now!
                </p>
                <motion.a
                  href="#download"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-full transition-all shadow-lg"
                >
                  Get My Free Guide!
                </motion.a>
              </div>

              {/* Right - Guide Books Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <img
                  src={solarBatteries6}
                  alt="Free Solar Guide Books"
                  className="w-full max-w-sm h-auto drop-shadow-2xl"
                />
              </motion.div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200 rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </motion.div>

          {/* Solar Power Systems with Battery Storage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4">
              Solar Power Systems with Battery Storage
            </h2>
            <div className="h-1 w-16 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
              When you invest in a solar power system with battery storage, you're investing in a renewable source of energy that will benefit your home or business for generations to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* But what is Battery Storage? Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600">
                  But what is Battery Storage?
                </h2>

                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Battery storage is a system that stores excess power produced by your solar panels. This can be used to run your home during blackouts or when there is no sunlight.
                  </p>

                  <p>
                    Solar power systems with battery storage are a great way to add that extra security to your home while saving money on your energy bill.
                  </p>
                </div>

                <motion.a
                  href="#quote"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg rounded-lg transition-all shadow-md"
                >
                  Get a Battery Quote
                </motion.a>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 to-blue-600 p-8">
                  <img
                    src={solarBatteries5}
                    alt="Battery Storage Display Screen"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Does it Work? Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src={solarBatteries7}
                  alt="How Solar Battery Storage Works - Diagram"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4">
                  How Does it Work?
                </h2>
                <div className="h-1 w-16 bg-blue-600"></div>
              </div>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  This system works like this: Your solar panels produce power, which goes into your battery storage/backup system. The battery charges itself up by taking excess power generated by your solar panels and storing it for later use at night or during cloudy days.
                </p>

                <p>
                  When you install a battery system for your home or business, you can use the stored energy as needed throughout the day.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing Message & CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-2xl md:text-3xl font-bold text-blue-600 leading-relaxed max-w-5xl mx-auto">
              The future of energy is in renewable resources, and the next best step we can take right now is to invest in a solar power system with battery storage that will help us power our homes for now and the coming years.
            </p>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl mb-16"
          >
            {/* Blue gradient background with geometric pattern */}
            <div className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 py-16 px-8">
              {/* Decorative geometric shapes */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-lg rotate-45"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white"></div>
                <div className="absolute top-20 right-1/4 w-20 h-20 bg-white rounded-full"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  Speak to our Battery Expert!
                </h2>

                <p className="text-xl text-white font-medium">
                  We're here to assist.
                </p>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg rounded-lg transition-all shadow-xl"
                >
                  Contact us today!
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Is now the best time Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={solarBatteries8}
                alt="Calculator and Solar Documents"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4">
                  Is now the best time to get a solar system with batteries?
                </h2>
                <div className="h-1 w-16 bg-blue-600"></div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Solar power systems with batteries are becoming increasingly popular, as they have many benefits over other energy sources. They allow you to increase your home's energy independence. They are an excellent way to get your home or business off the grid and into a renewable energy system without hassle. It is also evident that environmental conditions have caused the urgency for alternative power and have made solar systems inevitable now.
              </p>

              <motion.a
                href="#quote"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg rounded-lg transition-all shadow-md"
              >
                Get a Battery Quote
              </motion.a>
            </motion.div>
          </div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-blue-500 leading-relaxed">
              Following are some of the reasons why you should get a solar power system with battery backup right now.
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Reasons Section - Carousel Cards */}
      <ReasonsCarousel />

      {/* Old SVG Badges - BACKUP (Hidden) */}
      <section className="hidden py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* Residential Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <svg className="w-32 h-40" viewBox="0 0 120 150">
                {/* Gold medal circle */}
                <circle cx="60" cy="50" r="45" fill="url(#goldBadge)" stroke="#b8860b" strokeWidth="2" />

                {/* Inner circle */}
                <circle cx="60" cy="50" r="38" fill="#fff" stroke="#b8860b" strokeWidth="1" />

                {/* Text NO.1 */}
                <text x="60" y="42" textAnchor="middle" className="text-xl font-black fill-yellow-600">NO.1</text>
                <text x="60" y="58" textAnchor="middle" className="text-[8px] font-bold fill-gray-600">SOLAR INSTALLER</text>

                {/* Blue ribbon */}
                <path d="M35 95 L15 150 L35 140 L45 150 L35 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <path d="M85 95 L75 150 L85 140 L105 150 L85 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <rect x="30" y="85" width="60" height="20" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <text x="60" y="98" textAnchor="middle" className="text-[10px] font-bold fill-white">RESIDENTIAL</text>
                <text x="60" y="108" textAnchor="middle" className="text-[7px] font-semibold fill-white">AUSTRALIA</text>
                <text x="60" y="117" textAnchor="middle" className="text-[8px] font-bold fill-yellow-300">2025</text>

                <defs>
                  <linearGradient id="goldBadge" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffd700" />
                    <stop offset="50%" stopColor="#ffa500" />
                    <stop offset="100%" stopColor="#ff8c00" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* New South Wales Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <svg className="w-32 h-40" viewBox="0 0 120 150">
                <circle cx="60" cy="50" r="45" fill="url(#goldBadge)" stroke="#b8860b" strokeWidth="2" />
                <circle cx="60" cy="50" r="38" fill="#fff" stroke="#b8860b" strokeWidth="1" />
                <text x="60" y="42" textAnchor="middle" className="text-xl font-black fill-yellow-600">NO.1</text>
                <text x="60" y="58" textAnchor="middle" className="text-[8px] font-bold fill-gray-600">SOLAR INSTALLER</text>
                <path d="M35 95 L15 150 L35 140 L45 150 L35 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <path d="M85 95 L75 150 L85 140 L105 150 L85 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <rect x="25" y="85" width="70" height="20" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <text x="60" y="97" textAnchor="middle" className="text-[9px] font-bold fill-white">NEW SOUTH WALES</text>
                <text x="60" y="108" textAnchor="middle" className="text-[7px] font-semibold fill-white">AUSTRALIA</text>
                <text x="60" y="117" textAnchor="middle" className="text-[8px] font-bold fill-yellow-300">2025</text>
              </svg>
            </motion.div>

            {/* Queensland Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <svg className="w-32 h-40" viewBox="0 0 120 150">
                <circle cx="60" cy="50" r="45" fill="url(#goldBadge)" stroke="#b8860b" strokeWidth="2" />
                <circle cx="60" cy="50" r="38" fill="#fff" stroke="#b8860b" strokeWidth="1" />
                <text x="60" y="42" textAnchor="middle" className="text-xl font-black fill-yellow-600">NO.1</text>
                <text x="60" y="58" textAnchor="middle" className="text-[8px] font-bold fill-gray-600">SOLAR INSTALLER</text>
                <path d="M35 95 L15 150 L35 140 L45 150 L35 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <path d="M85 95 L75 150 L85 140 L105 150 L85 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <rect x="30" y="85" width="60" height="20" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <text x="60" y="98" textAnchor="middle" className="text-[10px] font-bold fill-white">QUEENSLAND</text>
                <text x="60" y="108" textAnchor="middle" className="text-[7px] font-semibold fill-white">AUSTRALIA</text>
                <text x="60" y="117" textAnchor="middle" className="text-[8px] font-bold fill-yellow-300">2025</text>
              </svg>
            </motion.div>

            {/* South Australia Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <svg className="w-32 h-40" viewBox="0 0 120 150">
                <circle cx="60" cy="50" r="45" fill="url(#goldBadge)" stroke="#b8860b" strokeWidth="2" />
                <circle cx="60" cy="50" r="38" fill="#fff" stroke="#b8860b" strokeWidth="1" />
                <text x="60" y="42" textAnchor="middle" className="text-xl font-black fill-yellow-600">NO.1</text>
                <text x="60" y="58" textAnchor="middle" className="text-[8px] font-bold fill-gray-600">SOLAR INSTALLER</text>
                <path d="M35 95 L15 150 L35 140 L45 150 L35 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <path d="M85 95 L75 150 L85 140 L105 150 L85 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <rect x="23" y="85" width="74" height="20" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <text x="60" y="97" textAnchor="middle" className="text-[9px] font-bold fill-white">SOUTH AUSTRALIA</text>
                <text x="60" y="108" textAnchor="middle" className="text-[7px] font-semibold fill-white">AUSTRALIA</text>
                <text x="60" y="117" textAnchor="middle" className="text-[8px] font-bold fill-yellow-300">2025</text>
              </svg>
            </motion.div>

            {/* Overall Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <svg className="w-32 h-40" viewBox="0 0 120 150">
                <circle cx="60" cy="50" r="45" fill="url(#goldBadge)" stroke="#b8860b" strokeWidth="2" />
                <circle cx="60" cy="50" r="38" fill="#fff" stroke="#b8860b" strokeWidth="1" />
                <text x="60" y="42" textAnchor="middle" className="text-xl font-black fill-yellow-600">NO.1</text>
                <text x="60" y="58" textAnchor="middle" className="text-[8px] font-bold fill-gray-600">SOLAR INSTALLER</text>
                <path d="M35 95 L15 150 L35 140 L45 150 L35 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <path d="M85 95 L75 150 L85 140 L105 150 L85 95" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <rect x="33" y="85" width="54" height="20" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                <text x="60" y="98" textAnchor="middle" className="text-[11px] font-bold fill-white">OVERALL</text>
                <text x="60" y="108" textAnchor="middle" className="text-[7px] font-semibold fill-white">AUSTRALIA</text>
                <text x="60" y="117" textAnchor="middle" className="text-[8px] font-bold fill-yellow-300">2025</text>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection faqs={faqs} />

      {/* CTA Section */}
      <section className="py-8" style={{ background: 'linear-gradient(135deg, #1e2d53 0%, #1d4ed8 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
            Ready to switch to solar?
          </h2>
          <p className="text-lg mb-6 text-white/80">
            Get your free quote today and start saving on energy bills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
              GET A FREE QUOTE
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:1300986827"
              className="bg-blue-900 border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              1300 986 827
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarBatteriesPage;
