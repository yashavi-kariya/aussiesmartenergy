import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Assets
import solarBatteries1 from '../../assets/solarbattries1.png';
import solarBatteries2 from '../../assets/solarbattries2.png';
import solarBatteries3 from '../../assets/solarbattries3.png';
import esyHomeBattery from '../../assets/esy/esy2.webp';
import esySystem from '../../assets/fox_ess_home_system.jpg';
import esyEnergyManagement from '../../assets/esy/esy3.webp';
import esyConnectedHome from '../../assets/esy/esy4.webp';
import esyVpp from '../../assets/esy/esy5.webp';
import esyWarranty from '../../assets/esy/esy6.webp';
import foxessGoldenSun from '../../assets/fox-ess solar.png';

const TargetBullet = ({ text, light = false }) => (
  <li className={`flex items-center gap-3 text-[15px] sm:text-base ${light ? 'text-white' : 'text-slate-700'}`}>
    <span className={`flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 ${light ? 'border-white' : 'border-[#00a8ea]'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-white' : 'bg-[#00a8ea]'}`} />
    </span>
    <span>{text}</span>
  </li>
);

// Package Spec Icons matching screenshot
const SolarPanelIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M4 3a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 2h6v6H5V5zm8 0h6v6h-6V5zm6 8h-6v6h6v-6zm-8 0H5v6h6v-6z" clipRule="evenodd" />
  </svg>
);

const InverterIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2" fill="currentColor" fillOpacity="0.2" />
    <rect x="8" y="6" width="8" height="4" rx="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="15" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const BatteryIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="5" width="12" height="16" rx="2" fill="currentColor" fillOpacity="0.2" />
    <path d="M10 2h4v3h-4z" fill="currentColor" stroke="none" />
    <path d="M12.5 8.5L9.5 13h3.5l-1 4.5 4-5.5h-3.5l1-3.5z" fill="currentColor" stroke="none" />
  </svg>
);

const FoxEss = () => {
  const [activeFaq, setActiveFaq] = useState(0);

  const solarPackages = [
    {
      id: '6.6kw',
      badge: 'BEST FOR ESSENTIALS',
      badgeBg: 'bg-gradient-to-r from-red-600 to-rose-600',
      title: '6.6kW Solar + Battery',
      image: solarBatteries1,
      specs: [
        {
          icon: <SolarPanelIcon />,
          title: '14 x 475W = 6650W',
          subtitle: 'Tier 1 Solar Panels',
        },
        {
          icon: <InverterIcon />,
          title: '5kW Smart Wi-Fi Inverter',
          subtitle: 'Single Phase',
        },
        {
          icon: <BatteryIcon />,
          title: 'Solar Battery',
          subtitle: 'Flexible Battery Size Options',
        },
      ],
    },
    {
      id: '10.45kw',
      badge: 'BEST FOR GROWING FAMILIES',
      badgeBg: 'bg-gradient-to-r from-[#006ab7] to-blue-700',
      title: '10.45kW Solar + Battery',
      image: solarBatteries2,
      specs: [
        {
          icon: <SolarPanelIcon />,
          title: '22 x 475W = 10450W',
          subtitle: 'Tier 1 Solar Panels',
        },
        {
          icon: <InverterIcon />,
          title: '8kW Smart Wi-Fi Inverter',
          subtitle: 'Single Phase',
        },
        {
          icon: <BatteryIcon />,
          title: 'Solar Battery',
          subtitle: 'Flexible Battery Size Options',
        },
      ],
    },
    {
      id: '13.3kw',
      badge: 'BEST FOR MAXIMUM SAVINGS',
      badgeBg: 'bg-gradient-to-r from-red-600 to-blue-700',
      title: '13.3kW Solar + Battery',
      image: solarBatteries3,
      specs: [
        {
          icon: <SolarPanelIcon />,
          title: '28 x 475W = 13300W',
          subtitle: 'Tier 1 Solar Panels',
        },
        {
          icon: <InverterIcon />,
          title: '10kW Smart Wi-Fi Inverter',
          subtitle: 'Three Phase',
        },
        {
          icon: <BatteryIcon />,
          title: 'Solar Battery',
          subtitle: 'Flexible Battery Size Options',
        },
      ],
    },
  ];

  const faqs = [
    {
      q: 'What is the Fox ESS battery warranty?',
      a: 'Warranty coverage varies by battery model and configuration. Refer to product specifications for detailed warranty information.',
    },
    {
      q: 'What is the expected Fox ESS battery lifespan?',
      a: 'Fox ESS batteries use advanced LiFePO4 cells rated for over 6,000 cycles at 90% Depth of Discharge, typically delivering 15+ years of daily reliable performance.',
    },
    {
      q: 'Is a Fox ESS battery worth it?',
      a: 'Yes, for households looking to maximize daytime solar usage, avoid high peak evening grid tariffs, and secure emergency power backup during grid blackouts.',
    },
    {
      q: 'What battery capacities are available in the Fox ESS range?',
      a: 'Fox ESS offers scalable capacities ranging from 4.66 kWh (EQ4800) and 6.22 kWh (CQ6) up to 20kWh, 28kWh, 42kWh, and 48kWh residential and commercial configurations.',
    },
    {
      q: 'Can I monitor my Fox ESS battery remotely?',
      a: 'Yes. With the FoxCloud mobile app and desktop portal, you can monitor solar generation, battery charge levels, household consumption, and grid imports in real time 24/7.',
    },
    {
      q: 'Is Fox ESS VPP compatible?',
      a: 'Yes. Fox ESS hybrid storage systems are designed for smart grid integration and Virtual Power Plant (VPP) energy programs across Australia.',
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

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-red-300 border border-red-400/30 mb-2 uppercase tracking-wider backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              Special Solar + Battery Packages
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Explore Our Solar &amp; Battery Packages
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-blue-100">
              Complete energy solutions with Tier-1 solar panels, hybrid inverters &amp; scalable lithium batteries.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ef4444] via-[#dc2626] to-[#b91c1c] hover:from-[#dc2626] hover:to-[#991b1b] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-red-600/30 transition-all duration-200 self-stretch md:self-auto text-center whitespace-nowrap block"
            >
              Get Custom Quote
            </Link>
          </motion.div>
        </motion.div>

        {/* 3 Packages Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {solarPackages.map((pkg, index) => (
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
                {/* Image with Ambient Glow Background */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 flex items-center justify-center">
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${pkg.badgeBg} text-white text-[11px] font-extrabold tracking-wider uppercase shadow-lg shadow-black/40`}>
                      ★ {pkg.badge}
                    </span>
                  </div>

                  {/* Ambient red & blue backlights */}
                  <div className="absolute top-4 right-4 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="relative z-10 w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500 shadow-md"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-extrabold text-[#006ab7] text-center tracking-tight group-hover:text-[#ef4444] transition-colors duration-200">
                    {pkg.title}
                  </h2>

                  {/* Subtle Red/Blue gradient divider */}
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#ef4444]/60 to-transparent mt-3 mb-6" />

                  {/* Feature Rows */}
                  <div className="space-y-4">
                    {pkg.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-blue-50/60 transition-colors">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-[#006ab7] to-[#003b73] text-white shadow-md shadow-blue-500/20">
                          {spec.icon}
                        </div>
                        <div>
                          <div className="text-[15px] font-extrabold text-[#003b73]">
                            {spec.title}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            {spec.subtitle}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Link
                  to="/contact"
                  className="block w-full py-3.5 px-4 text-center rounded-xl bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white font-extrabold text-sm shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
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
                Maximum Solar Self-Consumption
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
                Turn Daytime Solar into Around-<br className="hidden sm:block" />the-Clock Energy Savings
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-700">
                <p>
                  Store more of your solar energy, reduce reliance on the grid, and gain greater control over your household power usage with a Fox ESS solar battery.
                </p>
                <p>
                  Designed for Australian conditions, Fox ESS battery solutions combine scalable storage, intelligent monitoring, and seamless integration with solar systems to help homeowners maximize their energy independence.
                </p>
              </div>

              <h3 className="mt-6 text-lg sm:text-xl font-extrabold text-[#006ab7]">
                Why Choose a Fox ESS Solar Battery?
              </h3>

              <ul className="mt-4 space-y-2.5">
                {[
                  'Store excess daytime solar production',
                  'Reduce evening electricity purchases',
                  'Monitor performance in real time',
                  'Compatible with smart energy management',
                  'Scalable battery capacities',
                  'Future-ready VPP compatibility',
                ].map((item, i) => (
                  <TargetBullet key={i} text={item} />
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-[440px] rounded-3xl overflow-hidden shadow-2xl p-3 bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] border border-blue-400/30"
              >
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

                <img
                  src={foxessGoldenSun || esyHomeBattery}
                  alt="Fox ESS Battery with Solar Rays"
                  className="relative z-10 w-full h-auto object-cover rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 3: WHAT IS A FOX ESS STORAGE SYSTEM? & CAPACITY TABLE ================= */}
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
                  alt="Modern solar-powered house with Fox ESS battery system"
                  className="relative z-10 w-full h-auto object-cover rounded-2xl drop-shadow-lg"
                />
              </motion.div>
            </div>

            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
                Next-Gen Storage Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
                What is a Fox ESS Energy<br /> Storage System?
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

              <div className="mt-4 space-y-3.5 text-[15px] sm:text-base leading-relaxed text-slate-700">
                <p>
                  A Fox ESS energy storage system stores unused solar power generated during the day so it can be used later when your home needs it most.
                </p>
                <p>
                  Combined with a Fox ESS hybrid inverter, the system automatically manages energy flow between your solar panels, battery, home, and the grid.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-50/70 via-slate-50 to-red-50/40 p-6 sm:p-10 border border-blue-200/60">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#003b73]">
                  Fox ESS Battery Capacity Options
                </h3>
                <div className="mt-3.5 h-[3px] w-14 bg-[#ef4444]" />

                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-700">
                  <p>
                    Whether you&apos;re powering a small family home or a high-consumption household, Fox ESS offers flexible battery configurations.
                  </p>
                  <p>
                    The Fox ESS 48kWh battery configuration is ideal for larger energy demands, while modular systems allow future expansion as your needs grow.
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
                      <td className="px-5 py-3.5 font-bold text-[#003b73]">Fox ESS EQ4800 Battery</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-600">4.66 kWh</td>
                    </tr>
                    <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-[#003b73]">Fox ESS CQ6</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-600">6.22 kWh</td>
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
              A Fox ESS solar battery helps ensure more of your solar energy stays within your home rather than being exported back to the grid.
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
                alt="Fox ESS battery installed outside modern home at dusk"
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
                alt="Fox ESS battery installed on brick wall"
                className="relative z-10 w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>
          </div>

          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
              Real-Time FoxCloud App
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
              Monitor Your System Anywhere
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#006ab7] font-semibold">
              The dedicated Fox ESS battery app gives homeowners complete visibility over their energy usage.
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
                  Smart Grid Connected
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
                Fox ESS VPP Benefits
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
                As Fox ESS VPP capabilities continue to evolve, homeowners can position themselves for emerging energy opportunities.
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
              Long-Term Reliability
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
              Performance Backed by Warranty<br /> Protection
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

            <h3 className="mt-4 text-lg sm:text-xl font-bold text-[#006ab7]">
              Fox ESS Battery Warranty
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

          {/* Right Image with Red/Blue Cosmic Aura */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

              <img
                src={esyWarranty || foxessGoldenSun}
                alt="Fox ESS Battery Warranty & Performance"
                className="relative z-10 w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 8: IS A FOX ESS SOLAR BATTERY RIGHT FOR YOU? ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center"
        >
          {/* Left Image */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl p-3 bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] border border-blue-400/30"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-500/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

              <img
                src={esyHomeBattery}
                alt="Fox ESS battery on modern residential patio at night"
                className="relative z-10 w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>
          </div>

          {/* Right Text */}
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
              Ideal Household Fit
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
              Is a Fox ESS Solar Battery Right<br /> for You?
            </h2>
            <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

            <p className="mt-4 text-[15px] sm:text-base text-slate-700">
              A residential solar battery may be suitable if you want to:
            </p>

            <ul className="mt-3.5 space-y-2.5">
              {[
                'Lower electricity bills',
                'Increase solar self-consumption',
                'Reduce grid dependence',
                'Prepare for future energy programs',
                'Gain greater control over energy use',
              ].map((item, i) => (
                <TargetBullet key={i} text={item} />
              ))}
            </ul>

            <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
              For many Australian households, a Fox ESS solar battery offers an effective way to get more value from their solar investment.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 9: FAQS ================= */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
            Got Questions?
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
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? 'border-[#006ab7] shadow-lg ring-1 ring-[#006ab7]/20 bg-white' : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 ${isOpen
                    ? 'bg-gradient-to-r from-[#003b73] to-[#006ab7] text-white font-bold'
                    : 'bg-white text-slate-700 hover:bg-blue-50/40 font-medium'
                    }`}
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base">
                    <span className={`font-bold text-base sm:text-lg ${isOpen ? 'text-red-400' : 'text-[#006ab7]'}`}>✓</span>
                    <span>{faq.q}</span>
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : 'text-slate-400'
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

      {/* ================= SECTION 10: CTA BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0a192f] via-[#003b73] to-[#006ab7] py-16 px-4 sm:px-6 lg:px-8 text-white text-center border-t border-blue-400/20">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-400/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-red-300 border border-red-400/30 uppercase tracking-wider backdrop-blur-sm">
            Clean Energy Council (CEC) Accredited
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Ready to Install a Fox ESS Solar Battery?
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

export default FoxEss;
