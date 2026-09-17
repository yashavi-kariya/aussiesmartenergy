import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, PhoneCall, Zap, ShieldCheck, Cpu, ChevronDown, CheckCircle2 } from 'lucide-react';

import solarBatteries4 from '../../assets/solarbattries4.png';
import esyConnectedHome from '../../assets/esy/esy4.webp';
import esySystem from '../../assets/esy/esy1.webp';
import esyHomeBattery from '../../assets/esy/esy2.webp';
import esyEnergyManagement from '../../assets/esy/esy3.webp';
import esyVpp from '../../assets/esy/esy5.webp';
import esyWarranty from '../../assets/esy/esy6.webp';

const BulletPoint = ({ text }) => (
  <li className="flex items-start gap-3 text-slate-100 text-sm sm:text-base leading-relaxed">
    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-red-500 text-white mt-0.5 font-bold text-xs shadow-md">
      ✓
    </span>
    <span>{text}</span>
  </li>
);

const TargetBullet = ({ text, light = false }) => (
  <li className={`flex items-center gap-3 text-[15px] sm:text-base ${light ? 'text-white/95' : 'text-slate-700'}`}>
    <span className={`flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 ${light ? 'border-red-400' : 'border-[#ef4444]'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-red-400' : 'bg-[#ef4444]'}`} />
    </span>
    <span>{text}</span>
  </li>
);

const Sigenergy = () => {
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: 'What is the Sigenergy SigenStor 5-in-1 energy storage system?',
      a: 'Sigenergy SigenStor combines five vital solar and energy technologies into a unified modular stack: Hybrid Solar Inverter, Battery PCS, direct DC EV Fast Charger module, Energy Gateway (Backup Box), and scalable Battery Storage modules.',
    },
    {
      q: 'How fast does Sigenergy switch over to backup power during a blackout?',
      a: 'Sigenergy features an instantaneous 0ms (zero-millisecond) uninterrupted power supply (UPS) switchover. When grid power drops, your household appliances, electronics, and lights continue operating without interruption or flickering.',
    },
    {
      q: 'Can I add an EV charger directly to the Sigenergy battery stack?',
      a: 'Yes. Sigenergy provides the world\'s first modular DC EV Fast Charger that integrates directly into the SigenStor stack, delivering up to 25kW high-speed EV charging directly from daytime solar and stored battery power.',
    },
    {
      q: 'Are Sigenergy solar batteries eligible for Australian government rebates?',
      a: 'Yes. Sigenergy SigenStor systems are Clean Energy Council (CEC) approved and fully compliant with Australian Standards AS/NZS 5139 and AS/NZS 4777, making them eligible for Federal STCs and state battery rebate programs across Australia.',
    },
    {
      q: 'What warranty is provided with a Sigenergy solar battery in Australia?',
      a: 'Sigenergy provides a 10-year comprehensive manufacturer warranty, backed by local Australian customer service, technical hotline support, and remote cloud diagnostic capabilities.',
    },
    {
      q: 'Is Sigenergy compatible with Virtual Power Plant (VPP) programs?',
      a: 'Yes. Sigenergy systems are engineered with smart grid protocols that allow participation in Australian Virtual Power Plant (VPP) energy sharing networks for additional feed-in rewards and credits.',
    },
  ];

  return (
    <main className="overflow-hidden bg-white pt-0">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#06142e] via-[#003b73] to-[#006ab7] text-white pt-36 sm:pt-40 lg:pt-44 pb-16 lg:pb-24">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Area */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-red-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                Next-Generation 5-in-1 Solar Storage
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                One Intelligent System. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-sky-200 to-white">
                  Solar Storage, Backup Power and Smart Energy Management.
                </span>
              </h1>

              <div className="space-y-4 pt-2">
                <ul className="space-y-3.5">
                  <BulletPoint text="A Sigenergy solar battery does more than simply store excess solar energy. It brings battery storage, advanced inverter technology, EV charging integration, backup power, and intelligent energy management together in one integrated system." />
                  <BulletPoint text="Built around the innovative Sigenergy SigenStor ecosystem, these solutions are designed to help Australian households maximise solar self-consumption, reduce dependence on the grid, and take greater control of how energy is stored, managed, and used at home." />
                </ul>
              </div>

              {/* Quick Specs Badges */}
              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center shadow-md">
                  <div className="text-xs text-blue-200 font-medium">Switchover Time</div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">0 ms UPS</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center shadow-md">
                  <div className="text-xs text-blue-200 font-medium">Scalable Storage</div>
                  <div className="text-lg sm:text-xl font-extrabold text-red-300 mt-0.5">8 - 48 kWh</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center shadow-md">
                  <div className="text-xs text-blue-200 font-medium">Warranty Support</div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">10 Years</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold shadow-lg shadow-red-500/25 transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  Get A Free Custom Proposal
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:1300986827"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/25 transition-all duration-200 text-sm sm:text-base backdrop-blur-sm"
                >
                  <PhoneCall className="w-4 h-4 text-red-400" />
                  1300 986 827
                </a>
              </div>
            </motion.div>

            {/* Right Product Visual Card with Cosmic Red/Blue backdrop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] rounded-3xl p-6 sm:p-8 border border-blue-400/30 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  SigenStor 5-in-1
                </div>

                <div className="flex items-center justify-center py-6 min-h-[320px]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={solarBatteries4}
                    alt="Sigenergy SigenStor Energy Storage System"
                    className="max-h-[300px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(239,68,68,0.35)]"
                  />
                </div>

                <div className="bg-slate-950/80 rounded-2xl p-4 border border-blue-500/20 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Zap className="w-4 h-4 text-red-400" /> System Architecture:
                    </span>
                    <span className="font-bold text-white">5-in-1 Stackable</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-blue-400" /> Safety Rating:
                    </span>
                    <span className="font-bold text-red-300">IP66 Weatherproof</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Cpu className="w-4 h-4 text-sky-400" /> AI Management:
                    </span>
                    <span className="font-bold text-white">mySigen AI App</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 2. WHY CHOOSE A SIGENERGY SOLAR BATTERY? ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center"
        >
          {/* Left Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyConnectedHome}
                alt="Sigenergy Solar Battery installed in modern home garage"
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
              Why Choose a Sigenergy Solar Battery?
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-slate-700 font-medium">
              A Sigenergy solar battery is purpose-designed for Australian homeowners looking for a reliable, future-ready energy storage solution.
            </p>

            <h3 className="mt-6 text-lg sm:text-xl font-extrabold text-[#006ab7]">
              Key Benefits:
            </h3>

            <ul className="mt-4 space-y-3">
              {[
                'Store excess solar energy for evening and overnight use',
                'AI-powered energy management and load forecasting',
                'Modular battery expansion as household energy needs grow',
                'Whole-home blackout backup capability options with 0ms UPS',
                'Real-time system monitoring via the intuitive mySigen app',
                'Smart EV charging integration with bidirectional V2X readiness',
                'VPP-ready technology for Virtual Power Plant network benefits',
                'Compact, elegant all-in-one stackable design',
              ].map((item, i) => (
                <TargetBullet key={i} text={item} />
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ================= 3. WHAT IS SIGENERGY SIGENSTOR? ================= */}
      <section className="bg-gradient-to-b from-blue-50/70 via-slate-50 to-red-50/40 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center"
          >
            {/* Left Content */}
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
                What Is Sigenergy SigenStor?
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-slate-700 font-medium">
                Sigenergy SigenStor is an advanced 5-in-1 energy storage platform that seamlessly unites multiple clean energy technologies into a single integrated system:
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  'Next-generation solar inverter',
                  'High-capacity modular battery storage',
                  'Intelligent energy management system (EMS)',
                  'Direct EV fast-charging capabilities',
                  'Uninterrupted backup power functionality',
                ].map((item, i) => (
                  <TargetBullet key={i} text={item} />
                ))}
              </ul>

              <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-slate-700">
                Unlike traditional battery systems that require separate components, bulky wiring, and multiple external boxes, Sigenergy SigenStor simplifies installation while providing a streamlined, high-efficiency energy solution for modern Australian homes.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                <img
                  src={esySystem}
                  alt="Sigenergy SigenStor installed outside modern home with EV charging"
                  className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 4. FLEXIBLE BATTERY CAPACITY FOR EVERY HOME ================= */}
      <section className="bg-gradient-to-r from-[#003b73] via-[#006ab7] to-[#0a192f] py-14 lg:py-18 px-4 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Flexible Battery Capacity for Every Home
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-14 bg-red-500 rounded-full" />

            <p className="mx-auto mt-5 max-w-4xl text-[15px] sm:text-base leading-relaxed text-white/95">
              One of the standout benefits of a Sigenergy all-in-one storage solution is its unparalleled scalability. Its modular stack architecture enables homeowners to begin with the capacity required today and conveniently expand as household electricity needs or EV demands grow.
            </p>
          </motion.div>

          {/* Available Module Sizes */}
          <div className="mt-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-300">
              Available Battery Module Sizes
            </h3>
            <div className="mt-4 flex flex-wrap justify-center gap-5">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex min-w-[200px] flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-8 py-5 backdrop-blur-md shadow-xl"
              >
                <span className="text-xs font-extrabold uppercase tracking-widest text-red-300">Module</span>
                <span className="mt-1 text-2xl sm:text-3xl font-black text-white">5 kWh</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex min-w-[200px] flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-8 py-5 backdrop-blur-md shadow-xl"
              >
                <span className="text-xs font-extrabold uppercase tracking-widest text-red-300">Module</span>
                <span className="mt-1 text-2xl sm:text-3xl font-black text-white">8 kWh</span>
              </motion.div>
            </div>
          </div>

          {/* Expandable Configurations */}
          <div className="mt-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-300">
              Expandable System Configurations
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-md shadow-xl"
              >
                <span className="text-xs font-extrabold text-red-300 uppercase tracking-wider">Entry-Level Systems</span>
                <span className="mt-2 text-2xl sm:text-3xl font-black text-white">5 kWh+</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-md shadow-xl"
              >
                <span className="text-xs font-extrabold text-red-300 uppercase tracking-wider">Mid-Size Systems</span>
                <span className="mt-2 text-2xl sm:text-3xl font-black text-white">16 – 24 kWh</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-md shadow-xl"
              >
                <span className="text-xs font-extrabold text-red-300 uppercase tracking-wider">Large Residential Systems</span>
                <span className="mt-2 text-2xl sm:text-3xl font-black text-white">48 kWh+</span>
              </motion.div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-sm sm:text-[15px] leading-relaxed text-white/90">
            A Sigenergy solar battery seamlessly adapts to evolving household lifestyle changes without requiring a costly full-system replacement.
          </p>
        </div>
      </section>

      {/* ================= 5. AI-POWERED ENERGY MANAGEMENT ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center"
        >
          {/* Left Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyHomeBattery}
                alt="AI-Powered Sigenergy battery on residential home patio"
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
              AI-Powered Energy Management
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-slate-700 font-semibold">
              Traditional batteries simply store energy. A Sigenergy solar battery actively optimises and manages it.
            </p>

            <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-slate-700">
              Through AI-driven smart algorithms, the system continuously analyses:
            </p>

            <ul className="mt-4 space-y-2.5">
              {[
                'Real-time solar generation',
                'Current battery charge levels',
                'Household electricity consumption patterns',
                'Dynamic electricity tariff & pricing signals',
                'Intelligent grid interaction & export thresholds',
              ].map((item, i) => (
                <TargetBullet key={i} text={item} />
              ))}
            </ul>

            <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-slate-700">
              The objective is clear: maximise clean energy self-sufficiency while drastically curbing expensive grid power costs.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ================= 6. MONITOR YOUR ENERGY ANYWHERE ================= */}
      <section className="bg-gradient-to-b from-blue-50/70 via-slate-50 to-red-50/40 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center"
          >
            {/* Left Content */}
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
                Monitor Your Energy Anywhere
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-slate-700 font-medium">
                The comprehensive mySigen app gives homeowners total visibility and control over entire system performance right from their phone.
              </p>

              <p className="mt-3 text-sm sm:text-base font-bold text-slate-700">
                Live Tracking Capabilities:
              </p>

              <ul className="mt-3 space-y-2.5">
                {[
                  'Live solar generation output',
                  'Instant battery charge and storage levels',
                  'Detailed household energy consumption',
                  'Emergency blackout backup status',
                  'Historical performance and financial savings trends',
                ].map((item, i) => (
                  <TargetBullet key={i} text={item} />
                ))}
              </ul>

              <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-slate-700">
                The integrated monitoring dashboard ensures you always understand how your clean energy ecosystem is performing at any moment.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                <img
                  src={esyEnergyManagement}
                  alt="Homeowner tracking Sigenergy performance on mobile app"
                  className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 7. BUILT FOR BACKUP POWER ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center"
        >
          {/* Left Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyConnectedHome}
                alt="Sigenergy backup power keeping modern home illuminated at night"
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
              Built for Reliable Backup Power
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-slate-700 font-semibold">
              Power grid outages and weather blackouts happen without warning.
            </p>

            <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-slate-700">
              Configured with SigenStor’s intelligent gateway, the system automatically provides seamless emergency backup power during grid failures, ensuring essential household circuits, refrigerators, lights, and medical devices remain running effortlessly.
            </p>

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-slate-700">
              This delivers unrivaled peace of mind and complete domestic energy resilience for Australian families.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ================= 8. FUTURE-READY FOR VIRTUAL POWER PLANTS ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#06142e] via-[#003b73] to-[#006ab7] p-8 sm:p-12 lg:p-14 text-white shadow-2xl border border-blue-400/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                Future-Ready for Virtual Power Plants (VPP)
              </h2>
              <div className="h-[3px] w-14 bg-red-500 rounded-full" />

              <p className="text-[15px] sm:text-base leading-relaxed text-white/95 pt-2">
                Australia&apos;s modern energy market is rapidly transforming toward decentralized grid networks.
              </p>

              <p className="text-[15px] sm:text-base leading-relaxed text-white/95">
                As a fully VPP-compatible energy storage system, Sigenergy units are pre-engineered to participate in emerging Virtual Power Plant programs across the country.
              </p>

              <h3 className="text-lg font-bold text-red-300 pt-2">
                Key VPP Benefits:
              </h3>

              <ul className="space-y-2.5">
                {[
                  'Greater flexibility in energy usage and grid export',
                  'Access to attractive network rewards and feed-in credits',
                  'Smarter automated interaction with the electricity grid',
                  'Enhanced financial returns from your stored solar energy',
                ].map((item, i) => (
                  <TargetBullet key={i} text={item} light={true} />
                ))}
              </ul>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[440px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                <img
                  src={esyVpp}
                  alt="VPP connected solar community"
                  className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= 9. BATTERY INSTALLATION AND LONG-TERM VALUE ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center"
        >
          {/* Left Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyWarranty}
                alt="Sigenergy Battery installation in residential garage"
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
              Sigenergy Battery Installation and Long-Term Value
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-slate-700 font-medium">
              A professional Sigenergy battery installation ensures your system is correctly configured for peak efficiency, maximum safety, and seamless future expansion.
            </p>

            <p className="mt-3 text-sm sm:text-base font-bold text-slate-700">
              When evaluating battery storage, Australian homeowners prioritize:
            </p>

            <ul className="mt-3.5 space-y-2.5">
              {[
                'Modular scalability as energy needs grow',
                'Smart AI-driven energy optimization technology',
                'Comprehensive 10-year local warranty protection',
                'User-friendly real-time monitoring capabilities',
                'Proven long-term reliability and non-combustible LFP safety',
              ].map((item, i) => (
                <TargetBullet key={i} text={item} />
              ))}
            </ul>

            <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-slate-700">
              A Sigenergy all-in-one storage system directly fulfills these demands through an integrated, future-proof platform engineered for decades of residential performance.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ================= 10. SMARTER ENERGY STARTS HERE ================= */}
      <section className="bg-gradient-to-b from-blue-50/80 via-slate-50 to-red-50/50 py-14 px-4 sm:px-6 lg:px-8 text-center border-y border-blue-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#006ab7]">
            Smarter Energy Starts Here
          </h2>
          <div className="mx-auto h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

          <p className="text-[15px] sm:text-base leading-relaxed text-slate-700 pt-2">
            If you&apos;re looking for more than just a standard residential battery, a <span className="text-[#006ab7] font-bold">Sigenergy solar battery</span> delivers a comprehensive clean energy ecosystem uniting intelligent AI controls, flexible module sizing, robust blackout backup, and smart monitoring.
          </p>

          <p className="text-[15px] sm:text-base font-semibold text-slate-800 pt-2">
            <Link
              to="/contact"
              className="text-[#ef4444] hover:text-[#dc2626] underline decoration-[#ef4444] decoration-2 underline-offset-4 transition-colors font-bold"
            >
              Speak with our expert team today
            </Link>{' '}
            to discover the ideal Sigenergy system sizing for your household and energy goals.
          </p>
        </motion.div>
      </section>

      {/* ================= 11. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#006ab7]">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-xl border border-blue-200 overflow-hidden bg-white shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 ${
                    isOpen
                      ? 'bg-gradient-to-r from-blue-900 to-[#003b73] text-white font-semibold'
                      : 'bg-white text-slate-700 hover:bg-slate-50 font-normal'
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base font-semibold">
                    <span className={`font-bold text-base sm:text-lg ${isOpen ? 'text-red-400' : 'text-[#ef4444]'}`}>✓</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-none transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : 'text-slate-500'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border-t border-slate-100 px-6 py-4 text-sm sm:text-base text-slate-700 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= 12. FINAL CTA BANNER ================= */}
      <section className="bg-gradient-to-r from-[#06142e] via-[#003b73] to-[#006ab7] py-14 px-4 sm:px-6 lg:px-8 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-5"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            Ready to Install a Sigenergy Solar Battery?
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Speak with our Clean Energy Council (CEC) accredited solar specialists today for a free custom quote and rebate assessment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Get Free Custom Proposal
            </Link>
            <a
              href="tel:1300986827"
              className="px-8 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-sm transition-all"
            >
              Call 1300 986 827
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Sigenergy;
