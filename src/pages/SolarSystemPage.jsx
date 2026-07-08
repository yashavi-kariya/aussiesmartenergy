import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Wrench, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import solarSystemsData from '../data/solarSystems';

// ── Per-system theme config ──────────────────────────────────────────────────
const systemThemes = {
  "6.6kw": {
    accent: "#ef4444", // Red brand accent
    accentDark: "#dc2626",
    accentLight: "#fff5f5",
    accentMid: "#fca5a5",
    cardBg: "linear-gradient(135deg, #1e2d53 0%, #15203c 100%)", // Navy Blue
    pointerColor: "#ef4444", // Red pointer
    nodeBorder: "#ef4444", // Red node border
    nodeIcon: "#ef4444", // Red node icon
    bullet: "#ef4444", // Red bullets
    sectionBg: "#f8fafc", // Clean light bg
    timelineLine: "#cbd5e1", // Grey line
    cardAnims: [
      { hidden: { opacity: 0, x: -80, rotate: -4 }, visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, type: "spring", stiffness: 80 } } },
      { hidden: { opacity: 0, x: 80, rotate: 4 }, visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, type: "spring", stiffness: 80, delay: 0.1 } } },
      { hidden: { opacity: 0, y: 60, scale: 0.88 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, type: "spring", stiffness: 90, delay: 0.15 } } },
      { hidden: { opacity: 0, x: 80, scale: 0.88 }, visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 100, delay: 0.2 } } },
    ],
    nodeAnim: { rotate: [0, 360], transition: { duration: 4, repeat: Infinity, ease: "linear" } },
  },
  "10.5kw": {
    accent: "#ef4444",
    accentDark: "#dc2626",
    accentLight: "#fff5f5",
    accentMid: "#fca5a5",
    cardBg: "linear-gradient(135deg, #1e2d53 0%, #15203c 100%)",
    pointerColor: "#ef4444",
    nodeBorder: "#ef4444",
    nodeIcon: "#ef4444",
    bullet: "#ef4444",
    sectionBg: "#f8fafc",
    timelineLine: "#cbd5e1",
    cardAnims: [
      { hidden: { opacity: 0, scale: 0.5, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, type: "spring", stiffness: 110 } } },
      { hidden: { opacity: 0, x: -80, scale: 0.9 }, visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, type: "spring", stiffness: 90, delay: 0.1 } } },
      { hidden: { opacity: 0, rotate: -8, y: 50 }, visible: { opacity: 1, rotate: 0, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 100, delay: 0.15 } } },
      { hidden: { opacity: 0, scale: 0.6, x: 50 }, visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.65, type: "spring", stiffness: 95, delay: 0.2 } } },
    ],
    nodeAnim: { scale: [1, 1.25, 1], transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } },
  },
  "13.2kw": {
    accent: "#ef4444",
    accentDark: "#dc2626",
    accentLight: "#fff5f5",
    accentMid: "#fca5a5",
    cardBg: "linear-gradient(135deg, #1e2d53 0%, #15203c 100%)",
    pointerColor: "#ef4444",
    nodeBorder: "#ef4444",
    nodeIcon: "#ef4444",
    bullet: "#ef4444",
    sectionBg: "#f8fafc",
    timelineLine: "#cbd5e1",
    cardAnims: [
      { hidden: { opacity: 0, x: -60, rotateY: -15 }, visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.75, type: "spring", stiffness: 85 } } },
      { hidden: { opacity: 0, x: 60, rotateY: 15 }, visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.75, type: "spring", stiffness: 85, delay: 0.1 } } },
      { hidden: { opacity: 0, y: -60, scale: 0.85 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, type: "spring", stiffness: 95, delay: 0.15 } } },
      { hidden: { opacity: 0, x: -60, y: 30 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 100, delay: 0.2 } } },
    ],
    nodeAnim: { y: [0, -10, 0], x: [0, 5, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  },
  "15kw": {
    accent: "#ef4444",
    accentDark: "#dc2626",
    accentLight: "#fff5f5",
    accentMid: "#fca5a5",
    cardBg: "linear-gradient(135deg, #1e2d53 0%, #15203c 100%)",
    pointerColor: "#ef4444",
    nodeBorder: "#ef4444",
    nodeIcon: "#ef4444",
    bullet: "#ef4444",
    sectionBg: "#f8fafc",
    timelineLine: "#cbd5e1",
    cardAnims: [
      { hidden: { opacity: 0, y: 70, rotate: 5 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, type: "spring", stiffness: 80 } } },
      { hidden: { opacity: 0, y: -70, rotate: -5 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, type: "spring", stiffness: 80, delay: 0.1 } } },
      { hidden: { opacity: 0, x: -80, y: 30 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.65, type: "spring", stiffness: 90, delay: 0.15 } } },
      { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 110, delay: 0.2 } } },
    ],
    nodeAnim: { rotate: [0, 15, 0, -15, 0], scale: [1, 1.15, 1], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } },
  },
  "commercial": {
    accent: "#ef4444",
    accentDark: "#dc2626",
    accentLight: "#fff5f5",
    accentMid: "#fca5a5",
    cardBg: "linear-gradient(135deg, #1e2d53 0%, #15203c 100%)",
    pointerColor: "#ef4444",
    nodeBorder: "#ef4444",
    nodeIcon: "#ef4444",
    bullet: "#ef4444",
    sectionBg: "#f8fafc",
    timelineLine: "#cbd5e1",
    cardAnims: [
      { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } },
      { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } } },
      { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 } } },
      { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } },
    ],
    nodeAnim: { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } },
  },
  "commercial-20kw": {
    accent: "#0066cc",
    accentDark: "#004999",
    accentLight: "#f0f6ff",
    accentMid: "#3399ff",
    cardBg: "linear-gradient(135deg, #1a472a 0%, #0f2e1a 100%)",
    pointerColor: "#0066cc",
    nodeBorder: "#0066cc",
    nodeIcon: "#0066cc",
    bullet: "#0066cc",
    sectionBg: "#f8fafc",
    timelineLine: "#cbd5e1",
    cardAnims: [
      { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } },
      { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } } },
      { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 } } },
      { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } },
    ],
    nodeAnim: { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } },
  },
  "commercial-30kw": {
    accent: "#00a86b",
    accentDark: "#007d50",
    accentLight: "#e6f9f0",
    accentMid: "#33cc99",
    cardBg: "linear-gradient(135deg, #1a3a2a 0%, #0f2416 100%)",
    pointerColor: "#00a86b",
    nodeBorder: "#00a86b",
    nodeIcon: "#00a86b",
    bullet: "#00a86b",
    sectionBg: "#f8fafc",
    timelineLine: "#cbd5e1",
    cardAnims: [
      { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } },
      { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } } },
      { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 } } },
      { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } },
    ],
    nodeAnim: { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } },
  },
  "commercial-50kw": {
    accent: "#ff8c00",
    accentDark: "#cc7000",
    accentLight: "#fff5e6",
    accentMid: "#ffb84d",
    cardBg: "linear-gradient(135deg, #3a2a1a 0%, #261a0f 100%)",
    pointerColor: "#ff8c00",
    nodeBorder: "#ff8c00",
    nodeIcon: "#ff8c00",
    bullet: "#ff8c00",
    sectionBg: "#f8fafc",
    timelineLine: "#cbd5e1",
    cardAnims: [
      { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } },
      { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } } },
      { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 } } },
      { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } },
    ],
    nodeAnim: { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } },
  },
  "commercial-100kw": {
    accent: "#a020f0",
    accentDark: "#7a1bb3",
    accentLight: "#f3e6ff",
    accentMid: "#d966ff",
    cardBg: "linear-gradient(135deg, #2a1a3a 0%, #1a0f26 100%)",
    pointerColor: "#a020f0",
    nodeBorder: "#a020f0",
    nodeIcon: "#a020f0",
    bullet: "#a020f0",
    sectionBg: "#f8fafc",
    timelineLine: "#cbd5e1",
    cardAnims: [
      { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } },
      { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } } },
      { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 } } },
      { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } },
    ],
    nodeAnim: { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } },
  }
};

// ── Timeline card content ────────────────────────────────────────────────────
const getTimelineItems = (systemId) => [
  {
    icon: Sun,
    title: "Solar Panels",
    side: "left",
    items: [
      `${systemId === '6.6kw' ? '6.6kW' : systemId === '10.5kw' ? '10.5kW' : systemId === '13.2kw' ? '13.2kW' : '15kW'} System`,
      "CEC Approved",
      `10 Years of Linear Output Warranty on Panels`,
      "Reputed and Trustworthy Brand",
      "High Efficiency",
      "Local Australian Support",
      "Affordable Pricing with Best Value for Investment",
    ],
    note: null,
  },
  {
    icon: Cpu,
    title: "Solar Inverter",
    side: "right",
    items: [
      `${systemId === '6.6kw' ? '5kW' : systemId === '10.5kw' ? '8kW' : systemId === '13.2kw' ? '10kW' : '12.5kW'} Solar Inverter`,
      "CEC Approved",
      "Reputed and Trustworthy Brand",
      "Proven Performance",
      "10 Year* Warranty",
      "WIFI Monitoring",
    ],
    note: null,
  },
  {
    icon: Wrench,
    title: "Panel Mounting Gear",
    side: "left",
    items: [
      "Gear tailored to meet up your roof type",
      "Anodised and Corrosion resistant",
      "Durable",
      "Light Weight",
      "Hassle-free, quick install",
    ],
    note: null,
  },
  {
    icon: ShieldCheck,
    title: "Installation Includes",
    side: "right",
    items: [
      "aussie smart energy guarantees high quality installation from Clean Energy Council accredited solar Installer.",
      "Prompt and Hassle-free",
      "CEC Accredited Installers with Excellent track record",
      "Experience Rich and Expert Installers",
      "Superior Quality Workmanship",
      "Long term Workmanship Warranties",
      "Prompt Service",
    ],
    note: "Aussie Smart Energy guarantees high quality installation from Clean Energy Council accredited solar Installer.",
  },
];

// ── Component ────────────────────────────────────────────────────────────────
const SolarSystemPage = ({ systemId }) => {
  const system = solarSystemsData[systemId];
  const theme = systemThemes[systemId] || systemThemes["6.6kw"];
  const timelineItems = getTimelineItems(systemId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [systemId]);

  if (!system) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1e2d53]">System Not Found</h2>
          <p className="text-slate-500 mt-2">The requested solar system page does not exist.</p>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-600 font-bold hover:underline">
            Go back Home
          </Link>
        </div>
      </div>
    );
  }

  const heroTitles = {
    "6.6kw": "6.6kW system – Most preferred solar size",
    "10.5kw": "10.5kW system – Most popular solar size",
    "13.2kw": "13.2kW system – Most premium residential solar size",
    "15kw": "15kW system – Highest capacity residential solar size",
    "commercial": "Commercial Solar solutions – Engineered for scale",
  };

  return (
    <main className="min-h-screen text-[#1e2d53] pt-[70px]">

      {/* ── 1. Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative h-[300px] sm:h-[360px] md:h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/rooftopsolar.png"
            alt="Rooftop Solar Array"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80";
            }}
          />
          <div className="absolute inset-0 bg-slate-950/72" />
          {/* Accent colour wash at bottom of hero */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 opacity-40"
            style={{ background: `linear-gradient(to top, ${theme.accent}, transparent)` }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-1"
            style={{ backgroundColor: `${theme.accent}30`, color: theme.accentMid, border: `1px solid ${theme.accent}60` }}
          >
            Residential Solar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, type: "spring", stiffness: 90 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-lg"
          >
            {heroTitles[systemId] || `${system.title} – Premium Solar Energy`}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-semibold text-white/90 drop-shadow"
          >
            Best products at the most affordable prices
          </motion.p>

          {/* Animated accent underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto h-1 w-24 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
      </section>

      {/* ── 2. Introduction ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Coloured accent dot */}
            <span
              className="inline-block w-3 h-3 rounded-full mb-4"
              style={{ backgroundColor: theme.accent }}
            />
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium max-w-3xl mx-auto">
              A <strong>{system.title}</strong> solar panel system is perfect for a{" "}
              {systemId === "6.6kw" ? "small" : systemId === "10.5kw" ? "medium" : "large"} residential
              space. If your roof receives a fair amount of sunlight and has got enough space, then better be
              quick! Aussie Smart Energy offers a premium high efficiency <strong>{system.title}</strong> solar
              system with Tier-1 Solar panels and smart inverter — offering the best solar products at the most
              affordable prices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Inclusions Timeline ──────────────────────────────────────────── */}
      <section
        id="inclusions"
        className="py-16"
        style={{ background: theme.sectionBg }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e2d53]">
              What's{" "}
              <span style={{ color: theme.accent }}>Included</span>
            </h2>
            <div
              className="mt-3 mx-auto h-1 w-16 rounded-full"
              style={{ backgroundColor: theme.accent }}
            />
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Centre line */}
            <div
              className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 z-0"
              style={{ backgroundColor: theme.timelineLine }}
            />

            <div className="space-y-14">
              {timelineItems.map((item, idx) => {
                const Icon = item.icon;
                const isLeft = item.side === "left";
                const anim = theme.cardAnims[idx];
                // Card bg uses the per-system gradient
                const cardBg = theme.cardBg;
                // Pointer css vars
                const pointerRightCls = "hidden md:block absolute top-6 -right-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8";
                const pointerLeftCls = "absolute top-6 -left-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8";

                return (
                  <div
                    key={idx}
                    className="relative flex flex-col md:flex-row items-start md:justify-between z-10"
                  >
                    {/* ── Node ── */}
                    <motion.div
                      animate={item.icon === Sun ? theme.nodeAnim : undefined}
                      className="absolute left-8 md:left-1/2 top-6 w-12 h-12 rounded-full bg-white flex items-center justify-center -translate-x-1/2 z-20 shadow-lg"
                      style={{ border: `2.5px solid ${theme.nodeBorder}` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: theme.nodeIcon }} />
                    </motion.div>

                    {/* ── Left slot ── */}
                    {isLeft ? (
                      <div className="w-full md:w-[45%] pl-16 md:pl-0 text-left">
                        <motion.div
                          variants={anim}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-80px" }}
                          whileHover={{ scale: 1.02, boxShadow: `0 20px 40px ${theme.accent}30` }}
                          className="relative text-white p-6 sm:p-8 rounded-[20px] shadow-xl"
                          style={{ background: cardBg }}
                        >
                          {/* Top accent band */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1 rounded-t-[20px]"
                            style={{ backgroundColor: theme.accent }}
                          />
                          {/* Right pointer on desktop */}
                          <div
                            className={pointerRightCls}
                            style={{ borderLeftColor: theme.pointerColor }}
                          />
                          {/* Left pointer on mobile */}
                          <div
                            className="block md:hidden absolute top-6 -left-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8"
                            style={{ borderRightColor: theme.pointerColor }}
                          />

                          <h3
                            className="text-xl font-bold pb-3 mb-4 border-b border-white/20 tracking-wide underline underline-offset-4 decoration-2"
                            style={{ textDecorationColor: theme.accent }}
                          >
                            {item.title}
                          </h3>
                          {item.note && (
                            <p className="text-xs text-slate-300 mb-3 leading-relaxed">{item.note}</p>
                          )}
                          <ul className="space-y-2 text-sm text-slate-100 font-medium">
                            {item.items.map((li, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 + 0.2, duration: 0.3 }}
                                className="flex items-start gap-2"
                              >
                                <span className="text-lg leading-none mt-0.5" style={{ color: theme.accent }}>•</span>
                                <span>{li}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="hidden md:block w-[45%]" />
                    )}

                    {/* ── Right slot ── */}
                    {!isLeft ? (
                      <div className="w-full md:w-[45%] pl-16 md:pl-0 text-left">
                        <motion.div
                          variants={anim}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-80px" }}
                          whileHover={{ scale: 1.02, boxShadow: `0 20px 40px ${theme.accent}30` }}
                          className="relative text-white p-6 sm:p-8 rounded-[20px] shadow-xl"
                          style={{ background: cardBg }}
                        >
                          {/* Top accent band */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1 rounded-t-[20px]"
                            style={{ backgroundColor: theme.accent }}
                          />
                          {/* Left pointer */}
                          <div
                            className={pointerLeftCls}
                            style={{ borderRightColor: theme.pointerColor }}
                          />

                          <h3
                            className="text-xl font-bold pb-3 mb-4 border-b border-white/20 tracking-wide underline underline-offset-4 decoration-2"
                            style={{ textDecorationColor: theme.accent }}
                          >
                            {item.title}
                          </h3>
                          {item.note && (
                            <p className="text-xs text-slate-300 mb-3 leading-relaxed">{item.note}</p>
                          )}
                          <ul className="space-y-2 text-sm text-slate-100 font-medium">
                            {item.items.map((li, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 + 0.2, duration: 0.3 }}
                                className="flex items-start gap-2"
                              >
                                <span className="text-lg leading-none mt-0.5" style={{ color: theme.accent }}>•</span>
                                <span>{li}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="hidden md:block w-[45%]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enquiry CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <Link
              to="/contact"
              className="inline-block text-white font-bold px-14 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 uppercase text-sm tracking-widest"
              style={{ backgroundColor: theme.accent }}
            >
              Enquiry Now
            </Link>
          </motion.div>

        </div>
      </section>

    </main>
  );
};

export default SolarSystemPage;

