import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Assets
import solarBatteries1 from '../../assets/solarbattries1.png';
import solarBatteries2 from '../../assets/solarbattries2.png';
import solarBatteries3 from '../../assets/solarbattries3.png';
import goodweEsaBattery from '../../assets/goodwe_esa_battery.jpg';
import esySystem from '../../assets/esy/esy1.webp';
import esyConnectedHome from '../../assets/esy/esy4.webp';
import esyEnergyManagement from '../../assets/esy/esy3.webp';
import esyVpp from '../../assets/esy/esy5.webp';
import esyWarranty from '../../assets/esy/esy6.webp';

const TargetBullet = ({ text, light = false }) => (
  <li className={`flex items-center gap-3 text-[15px] sm:text-base ${light ? 'text-white' : 'text-slate-700'}`}>
    <span className={`flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 ${light ? 'border-white' : 'border-[#00a8ea]'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-white' : 'bg-[#00a8ea]'}`} />
    </span>
    <span>{text}</span>
  </li>
);

const PackageCheck = ({ text }) => (
  <div className="flex items-center gap-2.5 text-slate-700 text-[14px]">
    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#00a8ea] text-white">
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

const GoodWe = () => {
  const [activePackageTab, setActivePackageTab] = useState('solar-battery');
  const [activeFaq, setActiveFaq] = useState(0);

  const packagesData = {
    'solar-battery': [
      {
        id: '24kwh',
        badge: 'BEST FOR ESSENTIALS',
        badgeBg: 'bg-gradient-to-r from-red-600 to-rose-600',
        title: '24kWh Solar Battery',
        subtitle: 'For small families and daily backup.',
        image: solarBatteries1,
        features: [
          'Reliable Energy Storage',
          'Safe & Reliable LiFePO4',
          'High Efficiency Output',
          'Simple to Install & Maintain',
        ],
      },
      {
        id: '32kwh',
        badge: 'BEST FOR GROWING FAMILIES',
        badgeBg: 'bg-gradient-to-r from-[#006ab7] to-blue-700',
        title: '32kWh Solar Battery',
        subtitle: 'For growing families and higher usage.',
        image: solarBatteries2,
        features: [
          'Extended Backup Time',
          'Safe & Reliable Performance',
          'Optimised Energy Use',
          'Complete Installation & Setup',
        ],
      },
      {
        id: '40kwh',
        badge: 'BEST FOR MAXIMUM SAVINGS',
        badgeBg: 'bg-gradient-to-r from-red-600 to-blue-700',
        title: '40kWh Solar Battery',
        subtitle: 'For large families and maximum savings.',
        image: solarBatteries3,
        features: [
          'Maximum Backup Power',
          'Enhanced Safety & BMS',
          'Peak Efficiency',
          'Built for Reliability',
        ],
      },
    ],
    'solar-plus-battery': [
      {
        id: '6.6kw-24kwh',
        badge: 'BEST FOR ESSENTIALS',
        badgeBg: 'bg-gradient-to-r from-red-600 to-rose-600',
        title: '6.6kW Solar + 24kWh Battery',
        subtitle: 'Complete entry setup for power & savings.',
        image: solarBatteries1,
        features: [
          '14x 475W Tier-1 Solar Panels',
          '24kWh All-in-One ESA Battery',
          'Hybrid Smart Inverter Included',
          'Full Installation & Monitoring',
        ],
      },
      {
        id: '10kw-32kwh',
        badge: 'BEST FOR GROWING FAMILIES',
        badgeBg: 'bg-gradient-to-r from-[#006ab7] to-blue-700',
        title: '10kW Solar + 32kWh Battery',
        subtitle: 'Ideal for medium to large households.',
        image: solarBatteries2,
        features: [
          '21x 475W High-Efficiency Panels',
          '32kWh Expandable Battery System',
          'Whole-Home EPS Blackout Backup',
          'SEMS Smart App Integration',
        ],
      },
      {
        id: '13.3kw-40kwh',
        badge: 'BEST FOR MAXIMUM SAVINGS',
        badgeBg: 'bg-gradient-to-r from-red-600 to-blue-700',
        title: '13.3kW Solar + 40kWh Battery',
        subtitle: 'Maximum energy independence & 0-bill potential.',
        image: solarBatteries3,
        features: [
          '28x 475W Premium Solar Panels',
          '40kWh Commercial-Grade Storage',
          'High Continuous Power Output',
          '10-Year Comprehensive Warranty',
        ],
      },
    ],
  };

  const currentPackages = packagesData[activePackageTab] || packagesData['solar-battery'];

  const whyChoosePoints = [
    {
      title: 'All-in-One Design',
      desc: 'Integrates the inverter, battery and intelligent energy management system into one streamlined unit for a cleaner and simpler installation.',
    },
    {
      title: 'Scalable & Flexible',
      desc: 'Modular battery design allows you to expand storage capacity as your energy needs grow, with the three-phase ESA supporting up to 108kWh of storage.',
    },
    {
      title: 'Whole-Home Backup',
      desc: 'Provides powerful backup capability with ultra-fast <4ms switchover, helping keep your home powered during grid outages.',
    },
    {
      title: 'Fast Charging & Discharging',
      desc: 'Supports up to 1C charge/discharge, allowing rapid energy cycling and better utilisation of stored solar energy.',
    },
    {
      title: 'Advanced Safety',
      desc: 'Features six-layer battery protection, AI-driven AFCI 3.0 and LFP battery technology for enhanced safety and reliability.',
    },
    {
      title: 'Smart Energy Management',
      desc: 'AI-driven energy management helps optimise solar self-consumption and energy usage based on electricity tariffs.',
    },
    {
      title: 'High Solar Capacity',
      desc: 'Supports up to 200% DC PV oversizing, giving you greater flexibility to connect more solar generation.',
    },
    {
      title: 'Quiet Operation',
      desc: 'Designed for low-noise operation, with models operating as quietly as 30dB.',
    },
    {
      title: 'Future-Ready',
      desc: 'Ideal for homes planning higher electricity consumption, EV charging and future battery expansion.',
    },
    {
      title: 'Australian Approved',
      desc: 'The three-phase GoodWe ESA has received Clean Energy Council approval for the Australian market.',
    },
  ];

  const faqs = [
    {
      q: 'What is the GoodWe solar battery warranty?',
      a: 'GoodWe battery storage systems come with a standard 10-year manufacturer warranty, ensuring long-term peace of mind and dependable operation under Australian conditions.',
    },
    {
      q: 'How does GoodWe whole-home backup switchover work?',
      a: 'The GoodWe ESA system features an ultra-fast UPS-level switchover of less than 4ms, ensuring uninterrupted power for critical and high-load appliances during grid outages.',
    },
    {
      q: 'Can I expand my GoodWe battery storage capacity in the future?',
      a: 'Yes. Thanks to its modular design, the GoodWe system can easily scale from entry-level residential capacities up to 108kWh for three-phase commercial and large residential setups.',
    },
    {
      q: 'What is the GoodWe SEMS monitoring app?',
      a: 'The GoodWe Smart Energy Management System (SEMS) is a dedicated app and web portal that provides 24/7 real-time monitoring of solar production, battery state of charge, home loads, and grid exchanges.',
    },
    {
      q: 'Is the GoodWe ESA battery Clean Energy Council (CEC) approved?',
      a: 'Yes, GoodWe ESA and Lynx battery systems are CEC approved and comply fully with Australian Standard AS/NZS 5139, qualifying for federal and state battery rebate incentives.',
    },
    {
      q: 'What safety features are integrated into the GoodWe ESA battery?',
      a: 'The GoodWe ESA is built with LFP (Lithium Iron Phosphate) chemistry, six layers of physical & electrical protection, and AI-powered AFCI 3.0 arc-fault detection.',
    },
  ];

  return (
    <main className="overflow-hidden bg-slate-50/50 pt-36 sm:pt-40 lg:pt-44">
      {/* ================= SECTION 1: PACKAGES CARDS BANNER ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a192f] via-[#003b73] to-[#006ab7] px-6 py-8 sm:px-10 sm:py-9 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-white border border-blue-400/20"
        >
          {/* Glowing background auras */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-red-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-400/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-red-300 border border-red-400/30 mb-2 uppercase tracking-wider backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              GoodWe Energy Storage
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Explore Our GoodWe Packages
            </h1>
            <p className="mt-1 text-sm sm:text-base text-blue-100">
              Complete energy solutions for power, savings and peace of mind.
            </p>
          </div>

          <div className="relative z-10 flex items-center bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/20 self-stretch md:self-auto justify-center">
            <button
              onClick={() => setActivePackageTab('solar-battery')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activePackageTab === 'solar-battery'
                  ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white shadow-md'
                  : 'bg-transparent text-white hover:bg-white/10'
              }`}
            >
              Solar Battery Package
            </button>
            <button
              onClick={() => setActivePackageTab('solar-plus-battery')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activePackageTab === 'solar-plus-battery'
                  ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white shadow-md'
                  : 'bg-transparent text-white hover:bg-white/10'
              }`}
            >
              Solar + Battery Packages
            </button>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {currentPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="rounded-3xl border border-slate-200/80 bg-white shadow-md hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 sm:h-72 w-full bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-4 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${pkg.badgeBg} text-white text-[11px] font-extrabold tracking-wider uppercase shadow-lg shadow-black/40`}>
                      ★ {pkg.badge}
                    </span>
                  </div>

                  {/* Ambient glowing blobs */}
                  <div className="absolute top-4 right-4 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="relative z-10 h-48 sm:h-56 w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <h2 className="text-2xl font-extrabold text-[#003b73] tracking-tight group-hover:text-[#ef4444] transition-colors duration-200">
                    {pkg.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#006ab7]">
                    {pkg.subtitle}
                  </p>

                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#ef4444]/60 to-transparent my-4" />

                  <div className="space-y-3">
                    {pkg.features.map((feat, idx) => (
                      <PackageCheck key={idx} text={feat} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/contact"
                  className="block w-full py-3.5 px-4 text-center rounded-xl bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
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
          className="rounded-3xl border border-blue-200/80 bg-white p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
                Next-Gen Hybrid Storage
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
                Turn Daytime Solar into Around-<br className="hidden sm:block" />the-Clock Energy Savings
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-700">
                <p>
                  Store more of your solar energy, reduce reliance on the grid, and gain greater control over your household power usage with a GoodWe ESA solar battery.
                </p>
                <p>
                  Designed for Australian conditions, GoodWe ESA all-in-one battery solutions combine scalable storage, intelligent monitoring, and seamless integration with solar systems to help homeowners maximize their energy independence.
                </p>
              </div>

              <h3 className="mt-6 text-lg sm:text-xl font-extrabold text-[#006ab7]">
                Why Choose GoodWe ESA Battery?
              </h3>

              <ul className="mt-4 space-y-2.5">
                {whyChoosePoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14.5px] sm:text-[15px] leading-snug text-slate-700">
                    <span className="flex h-4 w-4 mt-1 flex-none items-center justify-center rounded-full border-2 border-[#006ab7]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
                    </span>
                    <div>
                      <strong className="font-bold text-[#003b73]">{item.title}:</strong>{' '}
                      <span className="text-slate-600">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-[450px] rounded-3xl overflow-hidden shadow-2xl p-3 bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] border border-blue-400/30"
              >
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

                <img
                  src={goodweEsaBattery}
                  alt="GoodWe ESA All-in-One Solar Battery System"
                  className="relative z-10 w-full h-auto object-cover rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 3: WHAT IS A GOODWE ENERGY STORAGE SYSTEM? & CAPACITY TABLE ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative isolate rounded-3xl overflow-hidden bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center pb-8">
            <div className="relative flex justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-[430px] rounded-3xl overflow-hidden shadow-2xl p-3 bg-gradient-to-br from-[#0f2b5c] via-[#1e3a8a] to-[#0a192f] border border-blue-400/30"
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-500/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400/30 rounded-full blur-2xl pointer-events-none" />

                <img
                  src={esySystem}
                  alt="Modern solar-powered house with GoodWe energy storage system"
                  className="relative z-10 w-full h-auto object-cover rounded-2xl drop-shadow-lg"
                />
              </motion.div>
            </div>

            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
                Intelligent Power Flow
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
                What is a GoodWe Energy<br /> Storage System?
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

              <div className="mt-4 space-y-3.5 text-[15px] sm:text-base leading-relaxed text-slate-700">
                <p>
                  A <strong className="font-bold text-[#003b73]">GoodWe energy storage system</strong> stores excess solar energy generated during the day so it can be used later when your home needs it most.
                </p>
                <p>
                  Combined with a <strong className="font-bold text-[#003b73]">GoodWe hybrid inverter</strong>, the system intelligently manages energy flow between your solar panels, battery, home, and the grid—helping you maximise solar usage, reduce reliance on grid electricity, and improve overall energy efficiency.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-50/70 via-slate-50 to-red-50/40 p-6 sm:p-10 border border-blue-200/60">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#003b73]">
                  GoodWe Battery Capacity Options
                </h3>
                <div className="mt-3.5 h-[3px] w-14 bg-[#ef4444]" />

                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-700">
                  <p>
                    Whether you&apos;re powering a small family home or a high-consumption household, GoodWe offers flexible battery configurations.
                  </p>
                  <p>
                    The GoodWe 48kWh battery configuration is ideal for larger energy demands, while modular systems allow future expansion as your needs grow.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-gradient-to-r from-[#003b73] to-[#006ab7] text-white font-bold">
                    <tr>
                      <th scope="col" className="px-5 py-4 text-sm font-extrabold">Product Range</th>
                      <th scope="col" className="px-5 py-4 text-sm font-extrabold">Capacity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-[#003b73]">GoodWe Lynx Battery</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-600">3.2 kWh</td>
                    </tr>
                    <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-[#003b73]">GoodWe ESA Battery</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-600">8.32 kWh</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-[#003b73]">High Voltage Battery Series</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-600">Expandable</td>
                    </tr>
                    <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-[#003b73]">Commercial &amp; Large Residential</td>
                      <td className="px-5 py-3.5 font-semibold text-red-600 font-bold">Up to 48 kWh</td>
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
              Intelligent Optimization
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
              Built for Smarter Energy Management
            </h2>

            <h3 className="mt-3.5 text-lg sm:text-xl font-bold text-[#006ab7]">
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
              A GoodWe solar battery helps ensure more of your solar energy stays within your home rather than being exported back to the grid.
            </p>
          </div>

          <div className="relative flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-2xl p-3 bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] border border-blue-400/30"
            >
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

              <img
                src={esyConnectedHome}
                alt="GoodWe battery installed outside modern home at dusk"
                className="relative z-10 w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>
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
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl p-3 bg-gradient-to-br from-[#0a192f] via-[#1e3a8a] to-[#003b73] border border-blue-400/30"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400/30 rounded-full blur-2xl pointer-events-none" />

              <img
                src={esyEnergyManagement}
                alt="GoodWe battery installed on brick wall"
                className="relative z-10 w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>
          </div>

          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
              24/7 Mobile SEMS Portal
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
              Monitor Your System Anywhere
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#006ab7] font-semibold">
              The dedicated GoodWe SEMS battery app gives homeowners complete visibility over their energy usage.
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
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a192f] via-[#003b73] to-[#006ab7] p-8 sm:p-12 lg:p-14 text-white shadow-2xl border border-blue-400/20"
        >
          {/* Circular light glow behind solar panel graphic */}
          <div className="absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-red-500/20 blur-2xl pointer-events-none" />
          <div className="absolute -top-16 -right-10 h-72 w-72 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-center">
            {/* Left Title & Graphic */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                  Virtual Power Plant
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mt-1">
                  VPP Ready for Australia&apos;s<br className="hidden sm:block" /> Energy Future
                </h2>
                <div className="mt-4 h-[3px] w-14 bg-red-500" />
              </div>

              {/* Solar Panel & Grass Sphere Graphic with Red/Blue Aura Backdrop */}
              <div className="relative mt-8 flex justify-center lg:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-3xl bg-gradient-to-br from-[#06142e] via-[#102a4e] to-[#ef4444]/30 p-4 border border-blue-400/30 flex items-center justify-center shadow-2xl overflow-hidden"
                >
                  <img
                    src={esyVpp}
                    alt="VPP Ready Solar Panel"
                    className="h-36 sm:h-40 w-auto object-contain transform -rotate-3 drop-shadow-xl"
                  />
                </motion.div>
              </div>
            </div>

            {/* Right Text & Benefits */}
            <div className="space-y-4 text-white">
              <p className="text-[15px] sm:text-base leading-relaxed text-blue-100">
                Many homeowners are preparing for future energy programs through a VPP compatible battery.
              </p>

              <h3 className="text-lg sm:text-xl font-extrabold text-white pt-2">
                GoodWe VPP Benefits
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

              <p className="pt-2 text-[15px] sm:text-base leading-relaxed text-blue-100">
                As GoodWe VPP capabilities continue to evolve, homeowners can position themselves for emerging energy opportunities.
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
              Manufacturer Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
              Performance Backed by Warranty<br /> Protection
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

            <h3 className="mt-4 text-lg sm:text-xl font-bold text-[#006ab7]">
              GoodWe Battery Warranty
            </h3>

            <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
              <Link to="/contact" className="text-[#ef4444] hover:underline font-bold">A residential solar battery</Link> is a long-term investment, which is why warranty coverage matters.
            </p>

            <p className="mt-3 text-sm sm:text-base font-bold text-slate-700">
              When comparing battery systems, always review:
            </p>

            <ul className="mt-3 space-y-2.5">
              {[
                'Warranty duration',
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
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

              <img
                src={esyWarranty}
                alt="GoodWe Battery Warranty & Performance"
                className="relative z-10 w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 8: FAQS ACCORDION ================= */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
            Help &amp; Insights
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003b73] mt-1">
            Frequently Asked Questions
          </h2>
        </motion.div>

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
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-[#006ab7] shadow-lg ring-1 ring-[#006ab7]/20 bg-white' : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 ${
                    isOpen
                      ? 'bg-gradient-to-r from-[#003b73] to-[#006ab7] text-white font-bold'
                      : 'bg-white text-slate-700 hover:bg-blue-50/40 font-medium'
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base">
                    <span className={`font-bold text-base sm:text-lg ${isOpen ? 'text-red-400' : 'text-[#006ab7]'}`}>✓</span>
                    <span>{faq.q}</span>
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : 'text-slate-400'
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Accordion Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white px-6 py-4 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-blue-100"
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
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0a192f] via-[#003b73] to-[#006ab7] py-16 px-4 sm:px-6 lg:px-8 text-white text-center border-t border-blue-400/20">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-400/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-red-300 border border-red-400/30 uppercase tracking-wider backdrop-blur-sm">
            Clean Energy Council (CEC) Accredited
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Ready to Install a GoodWe Solar Battery?
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Speak with our solar experts today for a free custom quote, blackout protection advice, and rebate assessment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ef4444] via-[#dc2626] to-[#b91c1c] hover:from-[#dc2626] hover:to-[#991b1b] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/30 transition-all block"
              >
                Get Free Custom Proposal
              </Link>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:1300986827"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 backdrop-blur-sm transition-all block"
            >
              Call 1300 986 827
            </motion.a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GoodWe;
