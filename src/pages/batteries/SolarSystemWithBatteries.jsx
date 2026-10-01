import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BatteryCharging, Sun, CheckCircle2, ArrowRight, Phone, Target } from 'lucide-react';
import EnquiryModal from '../../components/EnquiryModal';
import TestimonialsFAQSection from '../../components/TestimonialsFAQSection';

// Assets
import aussieVideo from '../../assets/videos/aussie video.mp4';
import solarBatteriesImg from '../../assets/solar-system-with-battery.gif';
import solarPanel6kw from '../../assets/solar_panel_6kw.jpg';
import solar10kwHero from '../../assets/solar_10kw_hero_banner.jpg';
import solar13kwHero from '../../assets/solar_13kw_hero_banner.jpg';
import badgeImg from '../../assets/badge.png';

const TargetBullet = ({ text }) => (
  <li className="flex items-start gap-3.5 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky-100 text-[#00a3e0] mt-0.5">
      <Target className="w-4 h-4 text-[#00a3e0]" />
    </span>
    <span>{text}</span>
  </li>
);

const SolarSystemWithBatteries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Get A FREE Quote');
  const [modalSubtitle, setModalSubtitle] = useState("Fill in your details and our team will get back to you with a customized quote.");
  const [formType, setFormType] = useState('free-quote');

  const packages = [
    {
      id: '6.6kw-24kwh',
      title: '6.6kW Solar + 24kWh Battery System',
      price: 4999,
      badge: 'MOST POPULAR HOME COMBO',
      badgeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      subtitle: 'Complete solar generation & battery backup bundle for medium households.',
      image: solarPanel6kw,
      features: [
        '6.6kW Tier-1 High Efficiency Solar Panels',
        '24kWh Premium Lithium Battery Bank',
        'Hybrid Inverter with Smart App Monitoring',
        'Blackout Instant Emergency Backup Power',
        '10-Year Battery Warranty & 25-Year Panel Warranty',
        'Clean Energy Council Accredited Installation',
      ],
    },
    {
      id: '10kw-32kwh',
      title: '10kW Solar + 32kWh Battery System',
      price: 6999,
      badge: 'BEST FOR LARGE FAMILIES',
      badgeBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      subtitle: 'High-capacity solar system designed for multi-story homes & high power usage.',
      image: solar10kwHero,
      features: [
        '10kW High Output Solar Panel Array',
        '32kWh Expandable Battery System',
        'Dual-MPPT Hybrid Solar Inverter',
        'Whole-Home Uninterrupted Power Supply (UPS)',
        'Free Smart Energy Management Gateway',
        'Full Government STC Rebates Applied',
      ],
    },
    {
      id: '13.3kw-40kwh',
      title: '13.3kW Solar + 40kWh Commercial/Home System',
      price: 8999,
      badge: 'MAXIMUM SAVINGS & BACKUP',
      badgeBg: 'bg-gradient-to-r from-purple-600 to-indigo-700',
      subtitle: 'Ultimate zero-bill solar and battery powerhouse for large estates & businesses.',
      image: solar13kwHero,
      features: [
        '13.3kW Ultra High Power Solar Panels',
        '40kWh Heavy-Duty Battery Storage',
        'Commercial Grade Hybrid Inverter System',
        'Automatic Off-Grid & Grid Support Mode',
        '24/7 Remote Diagnostics & Lifetime Support',
        'Includes Complete Turnkey Setup',
      ],
    },
  ];

  const openQuoteModal = (packageTitle) => {
    if (packageTitle) {
      setModalTitle(`Get A FREE Quote - ${packageTitle}`);
      setModalSubtitle(`Fill in your details to receive a custom quote for ${packageTitle}.`);
      setFormType(`quote-${packageTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
    } else {
      setModalTitle('Get A FREE Quote');
      setModalSubtitle("Fill in your details and our team will get back to you with a customized quote.");
      setFormType('free-quote');
    }
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 pt-20 sm:pt-24">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-gradient-to-br from-[#eaf4fc] via-[#edf7ff] to-[#e4f2fe] text-slate-900 py-12 sm:py-16 overflow-hidden border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column — Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative flex justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <video
                src={aussieVideo}
                className="w-full h-auto max-h-[460px] object-cover rounded-2xl"
                controls
                autoPlay
                muted
                loop
                playsInline
              />
              {/* Optional Award Badge overlay if available */}
              <div className="absolute top-4 left-4 pointer-events-none drop-shadow-lg">
                <img src={badgeImg} alt="National Solar Installer Award" className="w-20 sm:w-24 h-auto" />
              </div>
            </div>
          </motion.div>

          {/* Right Column — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-5 text-left order-1 lg:order-2"
          >
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0070c0] tracking-tight">
                Affordable Solar & Battery Solutions
              </h2>
              <h1 className="text-2xl sm:text-4xl lg:text-4xl font-black text-slate-900 leading-tight mt-1">
                Powering A Cleaner, Smarter Tomorrow.
              </h1>
              <div className="w-16 h-1 bg-[#0070c0] rounded-full my-3" />
            </div>

            <ul className="space-y-4 pt-1">
              <TargetBullet text="Have you ever invested in something valuable, like purchasing a car?" />
              <TargetBullet text="If you have, you’ll know that the upfront cost is only the beginning. Regular maintenance, running costs, and ongoing expenses can all add up over time and affect the true value of your investment." />
            </ul>

            <div className="pt-3 space-y-4">
              <div>
                <a
                  href="#packages"
                  className="inline-block text-[#0070c0] hover:text-[#005291] font-bold text-base sm:text-lg underline underline-offset-4 transition-colors"
                >
                  Find Out More
                </a>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="px-9 py-3.5 rounded-xl bg-[#ffdb38] hover:bg-[#ebd028] text-slate-900 font-extrabold text-base shadow-md shadow-amber-400/20 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Get A Quote</span>
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── KEY BENEFITS STRIP ── */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#39b54a] flex items-center justify-center shrink-0">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">24/7 Solar Energy</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Use solar power generated during peak hours even after sunset.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Blackout Protection</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Keep lights, fridge, internet, and essential devices running smoothly.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Rebates & Warranties</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Full STC government rebates included with up to 25 years warranty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES GRID ── */}
      <section id="packages" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-[#39b54a] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Complete Bundles
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
              Solar + Battery Packages
            </h2>
            <p className="text-base text-slate-600">
              Select a system below to request a free proposal or customized quote.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className={`text-[10px] font-black text-white px-3 py-1 rounded-full ${pkg.badgeBg} shadow-md uppercase`}>
                        {pkg.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-5">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 leading-snug">{pkg.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{pkg.subtitle}</p>
                    </div>

                    <ul className="space-y-2.5 pt-2">
                      {pkg.features.map((feat, i) => (
                        <TargetBullet key={i} text={feat} />
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <button
                    type="button"
                    onClick={() => openQuoteModal(pkg.title)}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#07152a] to-[#0d2850] hover:from-[#0b1d4d] hover:to-[#16386b] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Free Custom Quote</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (BOTTOM BEFORE FOOTER) ── */}
      <TestimonialsFAQSection onlyFAQ={true} />

      {/* ── Quote / Inquiry Modal ── */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType={formType}
        title={modalTitle}
        subtitle={modalSubtitle}
        accentColor="#39b54a"
      />
    </main>
  );
};

export default SolarSystemWithBatteries;
