import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, PhoneCall, ShieldCheck, Zap, ChevronDown, CheckCircle2 } from 'lucide-react';

// Assets
import solarBatteries1 from '../../assets/solarbattries1.png';
import solarBatteries2 from '../../assets/solarbattries2.png';
import solarBatteries3 from '../../assets/solarbattries3.png';
import sofarBtsBattery from '../../assets/sofar_bts_battery.jpg';
import esySystem from '../../assets/esy/esy1.webp';
import esyConnectedHome from '../../assets/esy/esy4.webp';
import esyEnergyManagement from '../../assets/esy/esy3.webp';
import esyVpp from '../../assets/esy/esy5.webp';
import esyWarranty from '../../assets/esy/esy6.webp';

const TargetBullet = ({ text, light = false }) => (
  <li className={`flex items-center gap-3 text-[15px] sm:text-base ${light ? 'text-white' : 'text-slate-700'}`}>
    <span className={`flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 ${light ? 'border-red-400' : 'border-[#ef4444]'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-red-400' : 'bg-[#ef4444]'}`} />
    </span>
    <span>{text}</span>
  </li>
);

const PackageCheck = ({ text }) => (
  <div className="flex items-center gap-2.5 text-slate-700 text-[14px]">
    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#ef4444] text-white shadow-sm">
      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414L8.414 15 3.293 9.879a1 1 0 011.414-1.414L8.414 12.17l6.879-6.877a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
    <span>{text}</span>
  </div>
);

const Sopher = () => {
  const [activePackageTab, setActivePackageTab] = useState('solar-battery');
  const [activeFaq, setActiveFaq] = useState(0);

  const packagesData = {
    'solar-battery': [
      {
        id: '20kwh',
        badge: 'BEST FOR ESSENTIALS',
        badgeBg: 'bg-gradient-to-r from-blue-700 to-[#003b73]',
        title: '20kWh Solar Battery',
        subtitle: 'For small families and daily backup.',
        image: solarBatteries1,
        imageBg: 'from-[#06142e] via-[#0b2b5c] to-[#1e1b4b]',
        features: [
          'Reliable Energy Storage',
          'Safe & Dependable LFP',
          'High Efficiency Output',
          'Simple to Install & Maintain',
        ],
      },
      {
        id: '25kwh',
        badge: 'BEST FOR GROWING FAMILIES',
        badgeBg: 'bg-gradient-to-r from-red-600 to-rose-600',
        title: '25kWh Solar Battery',
        subtitle: 'For growing families and higher usage.',
        image: solarBatteries2,
        imageBg: 'from-[#0a192f] via-[#003b73] to-[#006ab7]',
        features: [
          'Extended Backup Time',
          'Safe & Reliable Chemistry',
          'Optimised Energy Use',
          'Complete Installation & Setup',
        ],
      },
      {
        id: '30kwh',
        badge: 'BEST FOR MAXIMUM SAVINGS',
        badgeBg: 'bg-gradient-to-r from-blue-900 to-[#06142e]',
        title: '30kWh Solar Battery',
        subtitle: 'For large families and maximum savings.',
        image: solarBatteries3,
        imageBg: 'from-[#06142e] via-[#0b2b5c] to-[#1e1b4b]',
        features: [
          'Maximum Backup Power',
          'Enhanced System Safety',
          'Peak Efficiency Inversion',
          'Built for Australian Climate',
        ],
      },
    ],
    'solar-plus-battery': [
      {
        id: '6.6kw-20kwh',
        badge: 'BEST FOR ESSENTIALS',
        badgeBg: 'bg-gradient-to-r from-blue-700 to-[#003b73]',
        title: '6.6kW Solar + 20kWh Battery',
        subtitle: 'Complete entry setup for power & savings.',
        image: solarBatteries1,
        imageBg: 'from-[#06142e] via-[#0b2b5c] to-[#1e1b4b]',
        features: [
          '14x 475W Tier-1 Solar Panels',
          '20kWh High Voltage BTS Battery',
          'SOFAR Hybrid Smart Inverter',
          'Full Installation & Monitoring',
        ],
      },
      {
        id: '10kw-25kwh',
        badge: 'BEST FOR GROWING FAMILIES',
        badgeBg: 'bg-gradient-to-r from-red-600 to-rose-600',
        title: '10kW Solar + 25kWh Battery',
        subtitle: 'Ideal for medium to large households.',
        image: solarBatteries2,
        imageBg: 'from-[#0a192f] via-[#003b73] to-[#006ab7]',
        features: [
          '21x 475W High-Efficiency Panels',
          '25kWh Expandable Battery System',
          'Whole-Home EPS Blackout Backup',
          'SOFAR Cloud App Integration',
        ],
      },
      {
        id: '13.3kw-30kwh',
        badge: 'BEST FOR MAXIMUM SAVINGS',
        badgeBg: 'bg-gradient-to-r from-blue-900 to-[#06142e]',
        title: '13.3kW Solar + 30kWh Battery',
        subtitle: 'Maximum energy independence & 0-bill potential.',
        image: solarBatteries3,
        imageBg: 'from-[#06142e] via-[#0b2b5c] to-[#1e1b4b]',
        features: [
          '28x 475W Premium Solar Panels',
          '30kWh Commercial-Grade Storage',
          'High Continuous Power Output',
          '10-Year Comprehensive Warranty',
        ],
      },
    ],
  };

  const currentPackages = packagesData[activePackageTab] || packagesData['solar-battery'];

  const whyChoosePoints = [
    {
      title: 'Advanced LFP Technology',
      desc: 'Uses Lithium Iron Phosphate (LFP) battery chemistry for excellent safety, stability and long-term reliability.',
    },
    {
      title: 'Modular & Scalable',
      desc: 'Battery modules can be combined to increase storage capacity as your energy requirements grow. SOFAR offers configurations from 5.12kWh up to 20.48kWh in the BTS range.',
    },
    {
      title: 'High Safety',
      desc: 'Features a multi-layer battery protection system, providing enhanced protection at cell, module and system levels.',
    },
    {
      title: 'IP65 Protection',
      desc: 'Designed with an IP65-rated enclosure, providing strong protection against dust and water ingress.',
    },
    {
      title: 'Plug-and-Play Installation',
      desc: 'Pre-wired connections and an integrated modular design make installation quicker and easier.',
    },
    {
      title: 'Natural Cooling',
      desc: 'Uses natural cooling without conventional cooling fans, helping provide quiet and reliable operation.',
    },
    {
      title: 'Smart Battery Management',
      desc: 'Advanced BMS and pack-level optimisation help improve battery management, balancing and usable energy.',
    },
    {
      title: 'Flexible Expansion',
      desc: "SOFAR's battery architecture allows additional battery modules to be added, providing flexibility for future energy needs.",
    },
    {
      title: 'Long Storage Capability',
      desc: 'The BTS 5K is designed to retain its charge for extended periods, with SOFAR stating up to 2 years of storage without charging under specified conditions.',
    },
    {
      title: 'Reliable Solar Storage',
      desc: 'Designed to work with compatible SOFAR hybrid energy-storage inverters for efficient solar energy storage and management.',
    },
  ];

  const faqs = [
    {
      q: 'What is the warranty period for SOFAR solar batteries?',
      a: 'SOFAR batteries come with a standard 10-year manufacturer warranty, delivering long-term dependable performance and peace of mind under Australian climate conditions.',
    },
    {
      q: 'How does the SOFAR modular expansion work?',
      a: 'SOFAR BTS and PowerALL series use modular stackable architecture. You can easily start with a base capacity (such as 5.12kWh) and plug in additional modules up to 30.84kWh+ as household consumption increases.',
    },
    {
      q: 'Is the SOFAR battery IP65 rated for outdoor installation?',
      a: 'Yes, SOFAR batteries feature an IP65 weatherproof enclosure, making them completely protected against dust and rainwater for flexible indoor garage or outdoor sheltered installations.',
    },
    {
      q: 'How quiet is the SOFAR solar battery during operation?',
      a: 'Thanks to its fanless, natural convection cooling design, SOFAR batteries operate virtually silently without noisy cooling fans, making them ideal for residential living spaces.',
    },
    {
      q: 'Are SOFAR batteries Clean Energy Council (CEC) approved in Australia?',
      a: 'Yes, all SOFAR residential energy storage and hybrid inverter products supplied by Aussie Smart Energy are CEC listed and fully compliant with AS/NZS 5139 Australian standards.',
    },
    {
      q: 'Can I monitor my SOFAR battery system remotely?',
      a: 'Yes, with the SOFAR Solarman mobile app and web portal, you can monitor real-time solar generation, battery charge status, household power consumption, and grid exchange 24/7.',
    },
  ];

  return (
    <main className="overflow-hidden bg-white pt-36 sm:pt-40 lg:pt-44">
      {/* ================= SECTION 1: PACKAGES CARDS BANNER ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-r from-[#06142e] via-[#003b73] to-[#006ab7] px-6 py-5 sm:px-8 sm:py-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 text-white border border-blue-400/20"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-red-400" /> Premium Solar Packages
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Explore Our Solar &amp; Battery Packages
            </h1>
            <p className="mt-1 text-sm sm:text-base text-blue-100">
              Complete energy solutions for power, savings and peace of mind.
            </p>
          </div>

          <div className="flex items-center bg-slate-900/60 p-1.5 rounded-xl border border-white/20 self-stretch md:self-auto justify-center backdrop-blur-md">
            <button
              onClick={() => setActivePackageTab('solar-battery')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                activePackageTab === 'solar-battery'
                  ? 'bg-[#ef4444] text-white shadow-lg shadow-red-500/30'
                  : 'bg-transparent text-blue-100 hover:text-white'
              }`}
            >
              Solar Battery Package
            </button>
            <button
              onClick={() => setActivePackageTab('solar-plus-battery')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                activePackageTab === 'solar-plus-battery'
                  ? 'bg-[#ef4444] text-white shadow-lg shadow-red-500/30'
                  : 'bg-transparent text-blue-100 hover:text-white'
              }`}
            >
              Solar + Battery Packages
            </button>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {currentPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-blue-100 bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div
                  className={`relative h-64 sm:h-72 w-full bg-gradient-to-br ${pkg.imageBg} flex items-center justify-center p-6 overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md ${pkg.badgeBg} text-white text-[11px] font-bold tracking-wider uppercase shadow-md border border-white/20`}
                    >
                      ★ {pkg.badge}
                    </span>
                  </div>

                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="relative z-0 h-44 sm:h-52 w-auto object-contain drop-shadow-[0_15px_25px_rgba(239,68,68,0.35)] transform hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <h2 className="text-2xl font-extrabold text-[#006ab7] tracking-tight">
                    {pkg.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {pkg.subtitle}
                  </p>

                  <div className="mt-5 space-y-3">
                    {pkg.features.map((feat, i) => (
                      <PackageCheck key={i} text={feat} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/contact"
                  className="block w-full py-3.5 px-4 text-center rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-red-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Get A FREE Quote
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 2: TURN DAYTIME SOLAR INTO AROUND-THE-CLOCK SAVINGS ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 p-6 sm:p-10 lg:p-12 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
                Turn Daytime Solar into Around-<br className="hidden sm:block" />the-Clock Energy Savings
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-700">
                <p>
                  Store more of your solar energy, reduce reliance on the grid, and gain greater control over your household power usage with a SOFAR solar battery.
                </p>
                <p>
                  Designed for Australian conditions, SOFAR battery solutions combine scalable storage, intelligent monitoring, and seamless integration with solar systems to help homeowners maximize their energy independence.
                </p>
              </div>

              <h3 className="mt-6 text-lg sm:text-xl font-extrabold text-[#006ab7]">
                Why Choose SOFAR Battery?
              </h3>

              <ul className="mt-4 space-y-2.5">
                {whyChoosePoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14.5px] sm:text-[15px] leading-snug text-slate-700">
                    <span className="flex h-4 w-4 mt-1 flex-none items-center justify-center rounded-full border-2 border-[#ef4444]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
                    </span>
                    <div>
                      <strong className="font-bold text-slate-900">{item.title}:</strong>{' '}
                      <span className="text-slate-600">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-[440px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                <img
                  src={sofarBtsBattery}
                  alt="SOFAR BTS PowerALL Solar Battery System"
                  className="w-full h-auto object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 3: WHAT IS A SOFAR ENERGY STORAGE SYSTEM? & CAPACITY TABLE ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative isolate rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center pb-12">
            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-[440px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                <img
                  src={esySystem}
                  alt="Modern solar-powered house with SOFAR energy storage system"
                  className="w-full object-cover rounded-2xl drop-shadow-lg"
                />
              </div>
            </div>

            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
                What is a Sofar Energy<br /> Storage System?
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

              <div className="mt-4 space-y-3.5 text-[15px] sm:text-base leading-relaxed text-slate-700">
                <p>
                  A <strong className="font-bold text-slate-900">Sofar energy storage system</strong> stores excess solar energy generated during the day so it can be used later when your home needs it most.
                </p>
                <p>
                  Combined with a <strong className="font-bold text-slate-900">Sofar hybrid inverter</strong>, the system intelligently manages energy flow between your solar panels, battery, home, and the grid—helping you maximise solar usage, reduce reliance on grid electricity, and improve overall energy efficiency.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-50/80 via-slate-50 to-red-50/40 p-6 sm:p-10 lg:p-12 border border-blue-200">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#006ab7]">
                  Sofar Battery Capacity Options
                </h3>
                <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-700">
                  <p>
                    Whether you&apos;re powering a small family home or a high-consumption household, Sofar offers flexible battery configurations.
                  </p>
                  <p>
                    The Sofar 30.84kWh battery configuration is ideal for larger energy demands, while modular systems allow future expansion as your needs grow.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-xl">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-gradient-to-r from-[#003b73] to-[#006ab7] text-white font-bold">
                    <tr>
                      <th scope="col" className="px-5 py-3.5 text-sm font-extrabold">Product Range</th>
                      <th scope="col" className="px-5 py-3.5 text-sm font-extrabold">Capacity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-800">Sofar PowerALL Battery</td>
                      <td className="px-5 py-3.5 font-semibold text-[#ef4444]">5.12 kWh</td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-blue-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-800">High Voltage Battery Series</td>
                      <td className="px-5 py-3.5 font-semibold text-[#006ab7]">Expandable</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-800">Commercial &amp; Large Residential</td>
                      <td className="px-5 py-3.5 font-semibold text-[#ef4444]">Up to 30.84 kWh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 4: BUILT FOR SMARTER ENERGY MANAGEMENT ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
              Built for Smarter Energy Management
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <h3 className="mt-4 text-lg sm:text-xl font-bold text-[#006ab7]">
              Key Features
            </h3>

            <ul className="mt-4 space-y-3">
              {[
                'Intelligent charge and discharge control',
                'Real-time energy optimization',
                'Seamless solar integration',
                'Modular battery expansion',
                'Advanced safety protection',
                'Remote monitoring capabilities',
              ].map((item, i) => (
                <TargetBullet key={i} text={item} />
              ))}
            </ul>

            <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-slate-700">
              A SOFAR solar battery helps ensure more of your solar energy stays within your home rather than being exported back to the grid.
            </p>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyConnectedHome}
                alt="SOFAR battery installed outside modern home at dusk"
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 5: MONITOR YOUR SYSTEM ANYWHERE ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center"
        >
          <div className="flex justify-center">
            <div className="w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyEnergyManagement}
                alt="SOFAR battery installed on brick wall"
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
              Monitor Your System Anywhere
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#006ab7] font-semibold">
              The dedicated SOFAR Solarman battery app gives homeowners complete visibility over their energy usage.
            </p>

            <p className="mt-3 text-sm sm:text-base font-bold text-slate-700">
              Monitor:
            </p>

            <ul className="mt-3 space-y-2.5">
              {[
                'Battery charge levels',
                'Solar production',
                'Home consumption',
                'Grid imports and exports',
                'Historical energy performance',
              ].map((item, i) => (
                <TargetBullet key={i} text={item} />
              ))}
            </ul>

            <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
              Using the integrated battery monitoring app, you can track your system from anywhere at any time.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 6: VPP READY FOR AUSTRALIA'S ENERGY FUTURE ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#06142e] via-[#003b73] to-[#006ab7] p-8 sm:p-12 lg:p-14 text-white shadow-2xl border border-blue-400/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-center">
            {/* Left Title & Graphic */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                  VPP Ready for Australia&apos;s<br className="hidden sm:block" /> Energy Future
                </h2>
                <div className="mt-4 h-[3px] w-14 bg-red-500 rounded-full" />
              </div>

              {/* Solar Panel Graphic */}
              <div className="relative mt-8 flex justify-center lg:justify-start">
                <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-full bg-gradient-to-tr from-blue-900/60 via-slate-800 to-blue-950 flex items-center justify-center shadow-inner overflow-hidden border border-blue-400/30">
                  <img
                    src={esyVpp}
                    alt="VPP Ready Solar Panel"
                    className="h-32 sm:h-36 w-auto object-contain transform -rotate-3 drop-shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Right Text & Benefits */}
            <div className="space-y-4 text-white">
              <p className="text-[15px] sm:text-base leading-relaxed text-white/95">
                Many homeowners are preparing for future energy programs through a VPP compatible battery.
              </p>

              <h3 className="text-lg sm:text-xl font-extrabold text-red-300 pt-2">
                SOFAR VPP Benefits
              </h3>

              <ul className="space-y-2.5">
                {[
                  'Smart grid participation potential',
                  'Better energy flexibility',
                  'Future-ready technology',
                  'Enhanced system value',
                ].map((item, i) => (
                  <TargetBullet key={i} text={item} light={true} />
                ))}
              </ul>

              <p className="pt-2 text-[15px] sm:text-base leading-relaxed text-white/95">
                As SOFAR VPP capabilities continue to evolve, homeowners can position themselves for emerging energy opportunities.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 7: PERFORMANCE BACKED BY WARRANTY PROTECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center"
        >
          {/* Left Text */}
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#006ab7]">
              Performance Backed by Warranty<br /> Protection
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <h3 className="mt-4 text-lg sm:text-xl font-bold text-[#006ab7]">
              SOFAR Battery Warranty
            </h3>

            <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
              <Link to="/contact" className="text-[#ef4444] underline font-semibold">A residential solar battery</Link> is a long-term investment, which is why warranty coverage matters.
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-700">
              When comparing battery systems, always review:
            </p>

            <ul className="mt-3 space-y-2.5">
              {[
                'Warranty duration (10-Year Local Support)',
                'Performance guarantees',
                'Battery cycle ratings',
                'Installation requirements',
              ].map((item, i) => (
                <TargetBullet key={i} text={item} />
              ))}
            </ul>
          </div>

          {/* Right Image with Cosmic Blue Aura */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyWarranty}
                alt="SOFAR Battery Warranty & Performance"
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 8: FAQS ACCORDION ================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-[#006ab7] mb-3">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto mb-8 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

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
                {/* Accordion Header */}
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

                {/* Accordion Body */}
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

      {/* ================= SECTION 9: CTA BANNER ================= */}
      <section className="bg-gradient-to-r from-[#06142e] via-[#003b73] to-[#006ab7] py-14 px-4 sm:px-6 lg:px-8 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-5"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            Ready to Install a SOFAR Solar Battery?
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Speak with our Clean Energy Council (CEC) accredited solar experts today for a free custom quote and rebate assessment.
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

export default Sopher;
