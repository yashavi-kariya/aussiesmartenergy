import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, PhoneCall, ShieldCheck, Zap, ChevronDown, CheckCircle2 } from 'lucide-react';

import esyBattery from '../../assets/esy1.webp';
import esySystem from '../../assets/esy/esy1.webp';
import esyHomeBattery from '../../assets/esy/esy2.webp';
import esyEnergyManagement from '../../assets/esy/esy3.webp';
import esyConnectedHome from '../../assets/esy/esy4.webp';
import esyVpp from '../../assets/esy/esy5.webp';
import esyWarranty from '../../assets/esy/esy6.webp';
import solarHome from '../../assets/ChatGPT Image Jul 7, 2026, 10_10_54 AM.png';

const BulletList = ({ items }) => (
  <ul className="mt-3 space-y-2.5 text-base text-slate-700">
    {items.map((item) => (
      <li key={item} className="flex items-center gap-2.5">
        <span className="flex h-4 w-4 flex-none rounded-full border-2 border-[#ef4444] p-[2px]">
          <span className="h-full w-full rounded-full bg-[#ef4444]" />
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const faqs = [
  {
    question: 'What is an ESY Sunhome all-in-one battery system?',
    answer: 'An ESY Sunhome all-in-one battery system combines battery storage, inverter technology, smart controls, and monitoring functions into a single integrated residential energy solution.',
  },
  {
    question: "How does ESY Sunhome's smart energy management work?",
    answer: 'The system automatically monitors solar production, battery levels, household consumption, and grid usage to optimise when energy is stored or used.',
  },
  {
    question: 'Can ESY Sunhome batteries support whole-home energy storage?',
    answer: 'Yes. Depending on the selected battery capacity and household energy requirements, ESY Sunhome systems can support substantial residential energy storage needs.',
  },
  {
    question: 'What battery capacities are available across the ESY Sunhome range?',
    answer: 'The ESY Sunhome range offers scalable capacities including 5.12 kWh, 10.24 kWh, 15.36 kWh, 20.48 kWh, 25.60 kWh, and 30.72 kWh configurations.',
  },
  {
    question: 'Can I monitor my ESY Sunhome battery remotely?',
    answer: 'Yes. The integrated battery monitoring app provides real-time access to energy generation, battery status, consumption data, and overall system performance.',
  },
  {
    question: 'Is ESY Sunhome compatible with modern smart home energy systems?',
    answer: 'Yes. ESY Sunhome systems are designed to support intelligent energy management and integration with modern smart energy environments, making them suitable for future-focused households.',
  },
];

const EsyPage = () => {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <main className="overflow-hidden bg-white pt-0">
      {/* ================= 1. HERO SECTION ================= */}
      <section
        className="relative isolate min-h-[560px] overflow-hidden text-white sm:min-h-[590px] pt-36 sm:pt-40 lg:pt-44"
        style={{
          backgroundImage: `linear-gradient(105deg, rgba(6, 20, 46, 0.96) 0%, rgba(0, 59, 115, 0.93) 48%, rgba(0, 106, 183, 0.92) 100%), url(${solarHome})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-10 right-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.35) 1px, transparent 1px)', backgroundSize: '21px 21px' }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-6 pb-36 pt-12 sm:px-10 sm:pb-40 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-16 lg:pb-36 lg:pt-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[620px] space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-red-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" /> All-In-One Intelligent Storage
            </div>

            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[42px]">
              Power Your Evenings, Not Just Your Daytime:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-sky-200 to-white">
                ESY Sunhome Battery Australia
              </span>
            </h1>

            <div className="space-y-3 text-[15px] leading-[1.5] sm:text-base text-blue-50">
              <p>
                Solar panels generate electricity when the sun is shining, but most households use the most energy in the morning and evening. That&apos;s where an intelligent battery solution becomes valuable. An ESY Sunhome battery system allows homeowners to store excess solar energy during the day and use it when electricity demand is highest.
              </p>
              <p>
                Designed as a modern all-in-one energy solution, ESY Sunhome combines battery storage, smart energy management, remote monitoring, and scalable capacity options into a single streamlined system.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold shadow-lg shadow-red-500/25 transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Get A Free Proposal
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-6 border border-blue-400/30 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center">
              <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={esyBattery}
                alt="ESY Sunhome battery"
                className="relative z-10 h-auto w-56 max-w-[85%] object-contain drop-shadow-[0_18px_25px_rgba(239,68,68,0.3)]"
              />
              <div className="mt-4 w-full bg-slate-950/80 rounded-xl p-3 text-center border border-blue-400/20">
                <span className="text-xs font-bold text-red-300 uppercase tracking-wider">Modular Expandable</span>
                <p className="text-white font-extrabold text-sm">5.12 kWh – 30.72 kWh</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-52">
          <svg className="absolute bottom-0 h-full w-full" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,106 C129,55 219,130 361,80 C509,27 631,119 782,51 C937,-19 1048,84 1169,46 C1275,13 1358,98 1440,56 L1440,220 L0,220 Z" fill="#e7f8ff" fillOpacity="0.94" />
            <path d="M0,158 C128,106 242,188 390,128 C517,76 623,177 788,111 C909,63 1035,161 1171,138 C1275,119 1354,187 1440,145 L1440,220 L0,220 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ================= 2. WHAT IS AN ESY SUNHOME BATTERY ================= */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[375px_1fr] lg:gap-20 lg:px-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-[375px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
            <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
            <img
              src={esySystem}
              alt="ESY Sunhome all-in-one battery system beside a solar-powered home"
              className="aspect-square w-full rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
            What is an ESY Sunhome All-in-One<br className="hidden xl:block" /> Battery System?
          </h2>
          <div className="mt-4 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

          <p className="mt-3 text-base leading-relaxed text-slate-700">
            An ESY Sunhome all-in-one battery system is an integrated residential energy storage solution that combines:
          </p>

          <BulletList
            items={[
              'Battery storage',
              'Smart energy management',
              'Inverter technology',
              'Remote monitoring capabilities',
              'Smart home compatibility',
            ]}
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            This makes it an attractive option for Australian families seeking a reliable residential energy storage system that works seamlessly alongside rooftop solar.
          </p>
        </motion.div>
      </section>

      {/* ================= 3. WHY MORE AUSTRALIANS ARE ADDING BATTERY STORAGE ================= */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 sm:px-10 lg:grid-cols-[1fr_375px] lg:gap-20 lg:px-16 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl lg:order-1"
        >
          <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
            Why More Australians Are Adding<br className="hidden xl:block" /> Battery Storage?
          </h2>
          <div className="mt-4 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

          <p className="mt-3 text-base leading-relaxed text-slate-700">
            A modern solar battery solution helps homeowners use more of the solar energy they generate rather than exporting excess electricity back to the grid.
          </p>
          <p className="mt-3 text-base font-bold text-slate-900">Key Benefits Include:</p>

          <BulletList
            items={[
              'Increased solar self-consumption',
              'Reduced electricity bills',
              'Greater protection from rising energy costs',
              'Backup energy capability (depending on system design)',
              'Better control over household energy usage',
              'Enhanced energy independence',
            ]}
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            An ESY Sunhome battery installation allows households to store clean energy for use when it matters most.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center lg:order-2"
        >
          <div className="relative w-full max-w-[375px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
            <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
            <img
              src={esyHomeBattery}
              alt="ESY Sunhome battery installed beside a solar-powered home"
              className="aspect-square w-full rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= 4. SMART ENERGY MANAGEMENT ================= */}
      <section className="bg-gradient-to-b from-blue-50/70 via-slate-50 to-red-50/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[375px_1fr] lg:gap-20 lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[375px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyEnergyManagement}
                alt="ESY smart energy management system and mobile monitoring app"
                className="aspect-square w-full rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
              Smart Energy Management That<br className="hidden xl:block" /> Works Behind the Scenes
            </h2>
            <div className="mt-4 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <p className="mt-3 text-base leading-relaxed text-slate-700">
              One of the standout features of an ESY Sunhome battery system is its intelligent energy management technology.
            </p>
            <p className="mt-3 text-base font-bold text-slate-900">The system continuously analyses:</p>

            <BulletList
              items={[
                'Household energy demand',
                'Solar production levels',
                'Battery charge status',
                'Grid electricity usage',
              ]}
            />

            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Based on these factors, it automatically determines the most efficient way to use, store, or draw energy.
            </p>
            <p className="mt-3 text-base font-bold text-slate-900">The Result:</p>

            <BulletList
              items={[
                'Less wasted solar generation',
                'Improved battery utilization',
                'Better energy efficiency',
                'Greater long-term savings',
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ================= 5. BATTERY CAPACITIES DESIGNED FOR DIFFERENT NEEDS ================= */}
      <section className="bg-gradient-to-r from-[#06142e] via-[#003b73] to-[#006ab7] px-6 py-14 text-center text-white sm:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Battery Capacities Designed for Different Household Needs
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-14 bg-red-500 rounded-full" />

            <p className="mx-auto mt-3 max-w-5xl text-base leading-relaxed text-blue-100">
              Every household has different energy consumption patterns. ESY Sunhome offers scalable battery solutions to suit a wide range of property sizes and energy requirements.
            </p>
            <p className="mt-4 text-base font-bold text-red-300">Available Battery Capacities</p>
          </motion.div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {['5.12 kWh', '10.24 kWh', '15.36 kWh', '20.48 kWh', '25.60 kWh', '30.72 kWh'].map((capacity, idx) => (
              <motion.div
                key={capacity}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.06, y: -4 }}
                className="flex min-h-[75px] items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 text-lg font-extrabold shadow-xl backdrop-blur-md"
              >
                {capacity}
              </motion.div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-5xl text-base leading-relaxed text-blue-100">
            Whether you&apos;re installing a battery for a smaller home or a larger family property, ESY Sunhome battery solutions offer scalable storage to support changing energy demands.
          </p>
        </div>
      </section>

      {/* ================= 6. MONITOR YOUR ENERGY ANYTIME ================= */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_375px] lg:gap-20 lg:px-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
            Monitor Your Energy Anytime,<br /> Anywhere
          </h2>
          <div className="mt-4 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Energy visibility is becoming increasingly important for Australian homeowners.
          </p>
          <p className="mt-3 text-base font-bold text-slate-900">
            The integrated battery monitoring app provides real-time access to:
          </p>

          <BulletList
            items={[
              'Battery charge levels',
              'Solar generation data',
              'Household consumption',
              'Grid imports and exports',
              'System performance history',
            ]}
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Using the monitoring app, homeowners can easily track how their solar battery system is performing and identify opportunities to improve energy efficiency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-[375px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
            <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
            <img
              src={esyEnergyManagement}
              alt="ESY energy monitoring application"
              className="aspect-square w-full rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= 7. BUILT FOR THE CONNECTED HOME ================= */}
      <section className="bg-gradient-to-b from-blue-50/70 via-slate-50 to-red-50/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[375px_1fr] lg:gap-20 lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[375px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyConnectedHome}
                alt="Connected home with rooftop solar"
                className="aspect-square w-full rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
              Built for the Connected Home
            </h2>
            <div className="mt-4 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Modern households increasingly rely on smart technologies to improve efficiency and convenience.
            </p>
            <p className="mt-3 text-base font-bold text-slate-900">Smart Features Include:</p>

            <BulletList
              items={[
                'Intelligent load management',
                'Real-time performance monitoring',
                'Automated charging and discharging',
                'Smart energy optimization',
                'Future-ready connectivity options',
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ================= 8. VPP COMPATIBILITY ================= */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_375px] lg:gap-20 lg:px-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
            VPP Compatibility and Future Energy<br className="hidden xl:block" /> Opportunities
          </h2>
          <div className="mt-4 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

          <p className="mt-3 text-base leading-relaxed text-slate-700">
            As the solar battery Australia landscape evolves, many homeowners are exploring{' '}
            <Link to="/contact" className="text-[#ef4444] font-semibold underline">Virtual Power Plant</Link>{' '}
            participation.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            A VPP compatible battery can potentially allow households to contribute stored energy to clean energy networks while benefiting from emerging energy programs.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            This future-focused capability helps position your home for the next generation of energy management opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-[375px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
            <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
            <img
              src={esyVpp}
              alt="Virtual power plant connected energy network"
              className="aspect-[1.3] w-full rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= 9. WARRANTY SECTION ================= */}
      <section className="bg-gradient-to-b from-blue-50/70 via-slate-50 to-red-50/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[375px_1fr] lg:gap-20 lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[375px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#1e1b4b] p-3 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={esyWarranty}
                alt="ESY Sunhome battery warranty consultation"
                className="aspect-square w-full rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
              Understanding the ESY Sunhome<br className="hidden xl:block" /> Battery Warranty
            </h2>
            <div className="mt-4 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Battery reliability is one of the most important considerations when investing in energy storage. The ESY Sunhome battery warranty provides homeowners with confidence that their system is backed by manufacturer support and performance standards.
            </p>
            <p className="mt-3 text-base font-bold text-slate-900">When selecting a battery solution, it&apos;s important to review:</p>

            <BulletList
              items={[
                'Warranty period (10-Year Protection)',
                'Performance guarantees',
                'Battery cycle expectations',
                'Installation requirements',
                'Service and support options',
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ================= 10. TAKE CONTROL CTA BANNER ================= */}
      <section className="overflow-hidden bg-gradient-to-r from-[#06142e] via-[#003b73] to-[#006ab7] px-6 py-12 text-white sm:px-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-3xl border border-white/20 bg-white/10 px-6 py-8 text-center shadow-2xl backdrop-blur-md sm:px-10"
        >
          <span className="mx-auto mb-3 block h-1 w-12 rounded-full bg-red-500" />
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Take Control of Your Energy Future</h2>

          <div className="mt-4 space-y-3 text-sm leading-relaxed sm:text-base text-blue-50">
            <p>
              The way Australians use electricity is changing. Solar generation, battery storage, and smart energy management are becoming essential tools for reducing energy costs and increasing energy independence.
            </p>
            <p>
              Whether you&apos;re installing a new solar system or upgrading an existing one, an{' '}
              <span className="font-bold text-red-300">ESY Sunhome battery</span> solution offers flexible capacity, intelligent monitoring, and scalable capacity options designed for modern households.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-0.5"
              >
                Speak with the team today
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= 11. FAQS ACCORDION ================= */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-[#006ab7] sm:text-3xl">Frequently Asked Questions</h2>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />
        </div>

        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <motion.div
                key={faq.question}
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
                    <span>{faq.question}</span>
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
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default EsyPage;
