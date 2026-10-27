import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EnquiryModal from '../../components/EnquiryModal';

// Assets
import alphaEssLogo from '../../assets/brand/alphaESS.svg';
import alphaEssBrand from '../../assets/brand/alphaESS.jpg';
import alphaEssSolarStorage from '../../assets/Alphaess/alphaess_solar_storage.jpg';
import alpha6_6kwh from '../../assets/Alphaess/6.6kwh.webp';
import alpha10_45kwh from '../../assets/Alphaess/10.45kwh.jpg';
import alpha13_3kwh from '../../assets/Alphaess/13.3kwh.webp';
import solarSystemWithBattery from '../../assets/solar-system-with-battery.gif';

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

const AlphaEss = () => {
  const [activePackageTab, setActivePackageTab] = useState('solar-battery');
  const [activeFaq, setActiveFaq] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Get A FREE Quote');
  const [modalSubtitle, setModalSubtitle] = useState("Fill in your details and our team will get back to you with a customized quote.");
  const [formType, setFormType] = useState('free-quote');

  const openQuoteModal = (packageTitle) => {
    if (packageTitle) {
      setModalTitle(`Get A FREE Quote - ${packageTitle}`);
      setModalSubtitle(`Fill in your details to receive a custom quote for the ${packageTitle} package.`);
      setFormType(`quote-${packageTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
    } else {
      setModalTitle('Get A FREE Quote');
      setModalSubtitle("Fill in your details and our team will get back to you with a customized quote.");
      setFormType('free-quote');
    }
    setIsModalOpen(true);
  };

  const packagesData = {
    'solar-battery': [
      {
        id: 'alphaess-6.6kwh',
        price: 2499,
        badge: 'BEST FOR ESSENTIALS',
        badgeBg: 'bg-gradient-to-r from-red-600 to-rose-600',
        title: '6.6kWh Solar Battery',
        subtitle: 'For small families and daily backup.',
        image: alpha6_6kwh,
        features: [
          'All-in-One Modular Storage Unit',
          'Safe & Reliable LiFePO4 Chemistry',
          'High Efficiency Round-Trip Performance',
          'Built-in Inverter & UPS Backup',
        ],
      },
      {
        id: 'alphaess-10.45kwh',
        price: 3499,
        badge: 'BEST FOR GROWING FAMILIES',
        badgeBg: 'bg-gradient-to-r from-[#006ab7] to-blue-700',
        title: '10.45kWh Solar Battery',
        subtitle: 'For growing families and higher usage.',
        image: alpha10_45kwh,
        features: [
          'Plug & Play Modular Battery Expansion',
          'High Efficiency 96% Round-Trip',
          'AlphaCloud Real-Time Smart Monitoring',
          'Seamless UPS Blackout Protection',
        ],
      },
      {
        id: 'alphaess-13.3kwh',
        price: 4499,
        badge: 'BEST FOR MAXIMUM SAVINGS',
        badgeBg: 'bg-gradient-to-r from-red-600 to-blue-700',
        title: '13.3kWh Solar Battery',
        subtitle: 'For large families and maximum savings.',
        image: alpha13_3kwh,
        features: [
          'High Voltage Superior Performance',
          'Up to 100% Depth of Discharge (DoD)',
          'VPP Virtual Power Plant Ready',
          '10-Year Comprehensive Warranty',
        ],
      },
    ],
    'solar-plus-battery': [
      {
        id: 'alphaess-6.6kw-6.6kwh',
        price: 4999,
        badge: 'BEST FOR ESSENTIALS',
        badgeBg: 'bg-gradient-to-r from-red-600 to-rose-600',
        title: '6.6kW Solar + 6.6kWh Battery',
        subtitle: 'Complete entry solar package with daytime storage.',
        image: alpha6_6kwh,
        features: [
          '14x 475W Tier-1 Solar Panels',
          '6.6kWh AlphaESS Lithium Battery',
          'Hybrid Smart Inverter Included',
          'CEC Accredited Turnkey Installation',
        ],
      },
      {
        id: 'alphaess-10kw-10.45kwh',
        price: 6999,
        badge: 'BEST FOR GROWING FAMILIES',
        badgeBg: 'bg-gradient-to-r from-[#006ab7] to-blue-700',
        title: '10kW Solar + 10.45kWh Battery',
        subtitle: 'Ideal for medium-to-large high energy homes.',
        image: alpha10_45kwh,
        features: [
          '21x 475W Premium Solar Panels',
          '10.45kWh Expandable AlphaESS Storage',
          'Whole-Home Backup EPS Function',
          'AlphaCloud iOS & Android App Sync',
        ],
      },
      {
        id: 'alphaess-13.3kw-13.3kwh',
        price: 8999,
        badge: 'MAXIMUM ZERO-BILL SAVINGS',
        badgeBg: 'bg-gradient-to-r from-red-600 to-blue-700',
        title: '13.3kW Solar + 13.3kWh Battery',
        subtitle: 'Maximum energy independence and round-the-clock power.',
        image: alpha13_3kwh,
        features: [
          '28x 475W High-Output Solar Panels',
          '13.3kWh AlphaESS Heavy-Duty Battery',
          'Commercial-Grade BMS Safety',
          '10-Year Local Australian Support',
        ],
      },
    ],
  };

  const currentPackages = packagesData[activePackageTab] || packagesData['solar-battery'];

  const whyChoosePoints = [
    {
      title: 'Global Storage Leadership',
      desc: 'AlphaESS is one of the world’s leading energy storage manufacturers with over 100,000 systems deployed across Australia and Europe.',
    },
    {
      title: 'Safe LiFePO4 Chemistry',
      desc: 'Cobalt-free Lithium Iron Phosphate chemistry provides superior thermal stability, non-combustibility, and long cycle life.',
    },
    {
      title: 'Modular & Scalable Design',
      desc: 'Easily expand your energy storage capacity over time as household energy needs grow or when adding an electric vehicle.',
    },
    {
      title: 'Ultra-Fast UPS Blackout Backup',
      desc: 'Automatic switchover powers essential household circuits seamlessly during mains grid interruptions without disruption.',
    },
    {
      title: 'High Depth of Discharge (DoD)',
      desc: 'Enjoy up to 90%-100% usable capacity, allowing you to extract maximum value from every kilowatt-hour of stored solar.',
    },
    {
      title: 'Intelligent AlphaCloud Platform',
      desc: 'Monitor real-time solar generation, home consumption, battery status, and financial savings anytime via mobile app or web browser.',
    },
    {
      title: 'VPP & Smart Grid Ready',
      desc: 'Participate in Virtual Power Plant (VPP) programs and earn additional income or energy credits by trading stored electricity.',
    },
    {
      title: 'AC & DC Coupled Versatility',
      desc: 'Available in DC-coupled hybrid models for new solar systems and AC-coupled units for retrofitting to existing solar arrays.',
    },
    {
      title: '10-Year Manufacturer Warranty',
      desc: 'Backed by a full 10-year battery and inverter warranty with local Australian technical support and warranty fulfillment.',
    },
    {
      title: 'Clean Energy Council Approved',
      desc: 'Fully compliant with Australian Standards AS/NZS 4777 and AS/NZS 5139, eligible for all NSW and federal battery rebate schemes.',
    },
  ];

  const faqs = [
    {
      q: 'What is the warranty period for AlphaESS solar batteries?',
      a: 'AlphaESS energy storage systems come with a comprehensive 10-year manufacturer warranty covering battery cells, battery management systems, and inverter components with local Australian technical backing.',
    },
    {
      q: 'Can I add an AlphaESS battery to my existing solar panel system?',
      a: 'Yes! The AlphaESS SMILE-B3 series is an AC-coupled storage system specifically engineered for effortless retrofitting into existing residential solar installations without altering your current solar inverter.',
    },
    {
      q: 'How does AlphaESS blackout backup protection work?',
      a: 'AlphaESS systems feature built-in EPS (Emergency Power Supply) functionality with an ultra-fast switchover that automatically isolates from the grid and powers designated essential circuits during an outage.',
    },
    {
      q: 'Is AlphaESS eligible for Australian solar and battery rebates?',
      a: 'Yes, AlphaESS batteries are Clean Energy Council (CEC) approved and fully certified under Australian Standard AS/NZS 5139, qualifying for federal and state battery rebate incentives.',
    },
    {
      q: 'Can I expand the storage capacity of my AlphaESS battery in the future?',
      a: 'Yes. Thanks to its modular architecture, you can start with a single battery module and add extra battery expansion units whenever your electricity demands increase.',
    },
    {
      q: 'What is the AlphaCloud monitoring app?',
      a: 'AlphaCloud is a proprietary smart energy management mobile application available for iOS and Android, offering 24/7 visibility over household energy generation, storage levels, and bill savings.',
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
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-400/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300 border border-amber-400/30 mb-2 uppercase tracking-wider backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              AlphaESS Energy Storage
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Explore Our AlphaESS Packages
            </h1>
            <p className="mt-1 text-sm sm:text-base text-blue-100">
              World-class modular solar battery storage engineered for Australian homes.
            </p>
          </div>

          <div className="relative z-10 flex items-center bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/20 self-stretch md:self-auto justify-center">
            <button
              onClick={() => setActivePackageTab('solar-battery')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                activePackageTab === 'solar-battery'
                  ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white shadow-md'
                  : 'bg-transparent text-white hover:bg-white/10'
              }`}
            >
              Solar Battery Package
            </button>
            <button
              onClick={() => setActivePackageTab('solar-plus-battery')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
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
                  <div className="absolute top-4 right-4 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="relative z-10 h-48 sm:h-56 w-auto max-w-[85%] object-contain rounded-2xl drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-500"
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

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => openQuoteModal(pkg.title)}
                  className="block w-full py-3.5 px-4 text-center rounded-xl bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white font-extrabold text-sm shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Get A FREE Quote
                </button>
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
                Intelligent Lithium Storage
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#003b73] mt-1">
                Turn Daytime Solar into Around-<br className="hidden sm:block" />the-Clock Energy Savings
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-700">
                <p>
                  Store your excess daytime solar generation, drastically cut your evening power bills, and take command of your energy with an AlphaESS smart battery system.
                </p>
                <p>
                  Engineered specifically for Australian weather conditions, AlphaESS combines tier-1 battery cells, German design standards, and smart cloud intelligence to maximize your household energy independence.
                </p>
              </div>

              <h3 className="mt-6 text-lg sm:text-xl font-extrabold text-[#006ab7]">
                Why Choose an AlphaESS Solar Battery?
              </h3>

              <ul className="mt-4 space-y-2.5">
                {[
                  'Store daytime solar power to avoid high peak electricity rates',
                  'Modular expandable capacity grows with your family needs',
                  'Real-time energy tracking with the AlphaCloud mobile app',
                  'Safe, cobalt-free Lithium Iron Phosphate (LiFePO4) chemistry',
                  'Instant UPS blackout protection for critical appliances',
                  'Virtual Power Plant (VPP) ready for additional energy earnings',
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
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

                <img
                  src={alphaEssSolarStorage}
                  alt="AlphaESS Solar Battery Storage with Rooftop Solar"
                  className="relative z-10 w-full h-auto object-cover rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 3: WHAT IS AN ALPHAESS SYSTEM? ================= */}
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
                className="relative w-full max-w-[430px] rounded-3xl overflow-hidden shadow-2xl p-6 bg-gradient-to-br from-[#0f2b5c] via-[#1e3a8a] to-[#0a192f] border border-blue-400/30 flex items-center justify-center"
              >
                <img
                  src={alpha13_3kwh}
                  alt="AlphaESS Storage System"
                  className="relative z-10 w-full max-w-[320px] h-auto object-contain rounded-2xl drop-shadow-2xl"
                />
              </motion.div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
                Clean Australian Energy
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#003b73] mt-1 leading-tight">
                What is an AlphaESS Energy Storage System?
              </h2>
              <div className="mt-3.5 h-[3px] w-14 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />

              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-slate-700">
                An AlphaESS energy storage system captures excess electricity generated by your rooftop solar panels during the sunny hours of the day and stores it for use during expensive evening peak periods or unforeseen blackout events.
              </p>
              <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-slate-700">
                With options for both AC-coupled retrofit installations (SMILE-B3) and DC-coupled hybrid systems (SMILE5 and SMILE-G3), AlphaESS provides flexible energy solutions tailored for every Australian home.
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {[
                  { label: 'Battery Chemistry', val: 'LiFePO4 (LFP)' },
                  { label: 'Round-Trip Efficiency', val: '96%+' },
                  { label: 'Warranty', val: '10 Years' },
                  { label: 'DoD Capacity', val: 'Up to 100%' },
                  { label: 'Switchover Speed', val: '< 20ms' },
                  { label: 'Rebate Eligible', val: 'CEC Approved' },
                ].map((spec, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">{spec.label}</span>
                    <span className="text-sm font-extrabold text-[#003b73] mt-0.5 block">{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 4: WHY CHOOSE ALPHAESS (10 KEY POINTS) ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
            Proven Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003b73] mt-1">
            Why Choose an AlphaESS Solar Battery?
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-16 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Engineered with German design principles and tested in rigorous Australian conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {whyChoosePoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-start gap-4"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-blue-50 text-[#006ab7] font-extrabold text-sm border border-blue-100">
                {index + 1}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#003b73]">
                  {point.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 5: FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">
            Common Queries
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003b73] mt-1">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-16 bg-gradient-to-r from-[#ef4444] to-[#006ab7]" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 shadow-sm"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-[#006ab7] transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg">{faq.q}</span>
                <span className={`transform transition-transform duration-200 text-[#006ab7] text-xl font-bold ${activeFaq === index ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </button>
              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 6: FINAL CTA BANNER ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#06142e] via-[#0b2b5c] to-[#003b73] p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/30">
            Start Saving Today
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
            Ready to Cut Your Power Bills with an AlphaESS Battery?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Get in touch with Aussie Smart Energy for an obligation-free tailored proposal, rebate assessment, and quote.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ef4444] via-[#dc2626] to-[#b91c1c] hover:from-[#dc2626] hover:to-[#991b1b] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/30 transition-all block cursor-pointer"
              >
                Get Free Custom Proposal
              </button>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:1300959170"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 backdrop-blur-sm transition-all block"
            >
              Call 1300 959 170
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── Quote / Inquiry Modal ── */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType={formType}
        title={modalTitle}
        subtitle={modalSubtitle}
        accentColor="#ef4444"
      />
    </main>
  );
};

export default AlphaEss;
