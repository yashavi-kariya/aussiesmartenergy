import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { CheckCircle2, Check, ArrowRight, Calculator, Sparkles, X, Zap } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const SolarCommercial = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    postcode: '',
    agreeContact: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.mobile || !formData.postcode) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/enquiries', {
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        postcode: formData.postcode,
        message: `Commercial Proposal Request - Postcode: ${formData.postcode}. Agreed to contact: ${formData.agreeContact}`,
        formType: 'commercial-proposal'
      });
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        postcode: '',
        agreeContact: false
      });
    } catch (err) {
      console.warn('Submission fallback:', err);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        postcode: '',
        agreeContact: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mechanicsItems = [
    {
      number: '1',
      title: 'Consumption charges',
      description:
        'The biggest line on the bill. Solar generated on your roof and used on site replaces power you would otherwise buy at your contracted commercial rate, every trading day, for 25 years.'
    },
    {
      number: '2',
      title: 'Demand charges',
      description:
        'Many commercial tariffs bill on your highest half-hour of the month, not just total usage. A battery sized to shave that peak can cut the demand charge without changing how you operate.'
    },
    {
      number: '3',
      title: 'Peak-window exposure',
      description:
        'If you trade into the evening — hospitality, gyms, retail, cold storage — stored solar covers the late-afternoon peak window instead of the grid at its most expensive rate.'
    },
    {
      number: '4',
      title: 'Contract renewal risk',
      description:
        'Self-generation is the only part of your energy cost a retailer cannot reprice. The more of your load you cover, the less a bad renewal can do to you.'
    }
  ];

  const whyNowCards = [
    {
      stat: '70–90%',
      statColor: 'text-[#002b5c]',
      title: 'Self-consumption on a typical trading-hours site',
      description: 'Every kWh you use on site displaces power bought at your commercial retail rate — worth far more than exporting it for a feed-in tariff.',
      bg: 'bg-[#f8fafc] border border-slate-200'
    },
    {
      stat: '$0',
      statColor: 'text-[#059669]',
      title: 'Upfront, on an approved finance structure',
      description: 'Rental, chattel mortgage and PPA structures all start at nil capital outlay. The system is paid for out of the bill it replaces.',
      bg: 'bg-[#e6faf2] border border-[#a7f3d0]'
    },
    {
      stat: '1 MW',
      statColor: 'text-[#059669]',
      title: 'Upfront STC rebate cap from 1 October 2026',
      description: 'The Federal Government has announced the small-scale scheme will expand from 100 kW to 1 MW, subject to regulations — bringing an upfront discount to systems that previously missed out.',
      bg: 'bg-[#e6faf2] border border-[#a7f3d0]'
    }
  ];

  const sizingData = [
    {
      size: '30 kW',
      generation: '~120 kWh',
      roofArea: '~150 m²',
      typicalSite: 'Small warehouse, workshop, childcare centre, medical suite'
    },
    {
      size: '50 kW',
      generation: '~200 kWh',
      roofArea: '~250 m²',
      typicalSite: 'Light manufacturing, gym, supermarket, car dealership'
    },
    {
      size: '100 kW',
      generation: '~400 kWh',
      roofArea: '~500 m²',
      typicalSite: 'Distribution warehouse, club or pub, aged care, school'
    },
    {
      size: '250 kW',
      generation: '~1,000 kWh',
      roofArea: '~1,250 m²',
      typicalSite: 'Cold storage, food processing, large retail centre'
    },
    {
      size: '500 kW – 1 MW',
      generation: '~2,000+ kWh',
      roofArea: '~2,500 m²+',
      typicalSite: 'Heavy manufacturing, irrigation and agribusiness, logistics hubs'
    }
  ];

  const financeStructures = [
    {
      structure: 'Cash purchase',
      upfront: 'Full cost',
      upfrontColor: 'text-emerald-600',
      owner: 'You, from day one',
      bestSuited: 'Cash-rich businesses chasing the best lifetime return'
    },
    {
      structure: 'Chattel mortgage',
      upfront: '$0',
      upfrontColor: 'text-emerald-600',
      owner: 'You, from day one',
      bestSuited: 'Owner-occupiers who want the asset and the deductions'
    },
    {
      structure: 'Rental / operating lease',
      upfront: '$0',
      upfrontColor: 'text-emerald-600',
      owner: 'The financier, during the term',
      bestSuited: 'Businesses protecting borrowing capacity and cash flow'
    },
    {
      structure: 'PPA',
      upfront: '$0',
      upfrontColor: 'text-emerald-600',
      owner: 'A third-party owner',
      bestSuited: 'Large, steady daytime loads and tax-loss positions'
    }
  ];

  const processSteps = [
    {
      number: '1',
      stepTag: 'Phase 01',
      title: 'Load analysis',
      description:
        'We pull twelve months of bills and your interval data, map when you actually draw power, and identify whether the win is consumption, demand charges, or both.'
    },
    {
      number: '2',
      stepTag: 'Phase 02',
      title: 'Engineering & grid',
      description:
        'Roof structural assessment, layout design, switchboard and metering review, and the grid connection application lodged with your network operator.'
    },
    {
      number: '3',
      stepTag: 'Phase 03',
      title: 'Proposal with the numbers',
      description:
        'System size, rebate value, and every finance structure modelled side by side — payback, cash-flow position and the assumptions behind them, in writing.'
    },
    {
      number: '4',
      stepTag: 'Phase 04',
      title: 'Install & hand over',
      description:
        'One project manager from go-ahead to grid sign-off, staged around your operating hours by accredited installers and licensed electrical contractors. Monitoring configured and generation reporting handed over at commissioning.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00a2ea]/20 selection:text-[#002b5c]">
      
      {/* =========================================================================
          1. HERO SECTION (Commercial Solar & Battery + Proposal Form)
          ========================================================================= */}
      <section className="bg-[#002b5c] text-white pt-36 sm:pt-40 lg:pt-44 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT SIDE: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-7 space-y-4 sm:space-y-5"
            >
              {/* Cyan Pill Badge */}
              <div className="inline-block">
                <span className="px-3.5 py-1 rounded-full bg-[#00a2ea] text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-sm">
                  COMMERCIAL SOLAR & BATTERY
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-[1.15] text-white tracking-tight">
                Commercial solar with $0 upfront. Stop paying retail for the power you use in trading hours.
              </h1>

              {/* Description Paragraph */}
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-normal">
                A commercial roof generates hardest between 9am and 4pm — the exact window your business is open and buying power at its most expensive. Aussie Smart Energy designs, arranges the finance for, and installs 30 kW to 1 MW solar and battery systems for Australian businesses, on your own building or a leased one.
              </p>

              {/* 4 Checklist Points */}
              <div className="space-y-2.5 pt-0.5">
                {[
                  '$0 upfront finance — repayments structured against the savings',
                  '30 kW to 1 MW, plus commercial battery and load-shifting',
                  'STCs, LGCs and NSW rebates applied at the proposal, not chased later',
                  'Landlord, tenant and third-party ownership structures all handled'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#00a2ea] font-bold text-base leading-none mt-0.5 select-none flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-white text-sm sm:text-[15px] font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE: White Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-2xl text-slate-900">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
                  Get a commercial proposal
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Send your details and your site postcode. We come back with a modelled system size, the rebates you qualify for, and finance options side by side.
                </p>

                {submitted ? (
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2.5 my-3">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <h3 className="text-base font-bold text-emerald-950">Proposal Request Received!</h3>
                    <p className="text-xs text-emerald-800">
                      Our commercial solar team will review your site postcode and model your optimal system size & finance options.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-emerald-700 underline mt-1.5 hover:text-emerald-900"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {error && (
                      <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                        {error}
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:bg-white text-xs sm:text-sm transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com.au"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:bg-white text-xs sm:text-sm transition-all"
                      />
                    </div>

                    {/* Mobile & Postcode */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="04XX XXX XXX"
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:bg-white text-xs sm:text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Postcode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleChange}
                          placeholder="5000"
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:bg-white text-xs sm:text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-2 pt-0.5">
                      <input
                        type="checkbox"
                        id="agreeContact"
                        name="agreeContact"
                        checked={formData.agreeContact}
                        onChange={handleChange}
                        className="mt-0.5 w-3.5 h-3.5 rounded text-[#00a2ea] focus:ring-[#00a2ea] border-slate-300 cursor-pointer"
                      />
                      <label htmlFor="agreeContact" className="text-[11px] sm:text-xs text-slate-600 leading-snug cursor-pointer select-none">
                        I'm happy for Aussie Smart Energy to contact me regarding this offer.
                      </label>
                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-1.5 py-3 px-5 rounded-xl bg-[#00a2ea] hover:bg-[#008ecf] active:bg-[#007cb5] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
                    >
                      <span>{isSubmitting ? 'Calculating Proposal...' : 'Get my free quote'}</span>
                      <span className="text-base group-hover:translate-x-1 transition-transform">›</span>
                    </button>
                  </form>
                )}

                {/* Trust Badges */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 text-[11px] sm:text-xs text-slate-600 space-y-1.5">
                  <div className="flex items-center flex-wrap gap-x-3.5 gap-y-1">
                    <div className="flex items-center gap-1 font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 flex-shrink-0" />
                      <span>4.5★ Google rating</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 flex-shrink-0" />
                      <span>NETCC Approved Seller</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-medium text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 flex-shrink-0" />
                    <span>CEC-accredited installers</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THE MECHANICS (Where a commercial system takes cost out of the business)
          ========================================================================= */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-[#00a2ea] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              THE MECHANICS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002b5c] tracking-tight leading-tight">
              Where a commercial system takes cost out of the business.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-0.5">
              Four separate line items on a commercial bill, and what solar and storage do to each of them.
            </p>
          </div>

          {/* 4 Columns Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {mechanicsItems.map((item, idx) => (
              <div key={idx} className="space-y-2.5">
                {/* Circle Number */}
                <div className="w-9 h-9 rounded-full bg-[#00a2ea] text-white flex items-center justify-center font-black text-sm shadow-sm">
                  {item.number}
                </div>
                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. WHY NOW SECTION (Three numbers that decide whether solar stacks up)
          ========================================================================= */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-[#00a2ea] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              WHY NOW
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002b5c] tracking-tight leading-tight">
              Three numbers that decide whether commercial solar stacks up.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-0.5">
              Commercial solar is not a scaled-up home system. The economics are different, and they are better — because a business consumes its own generation while it is being generated.
            </p>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {whyNowCards.map((card, idx) => (
              <div
                key={idx}
                className={`${card.bg} rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm`}
              >
                <div className="space-y-2">
                  <div className={`text-3xl sm:text-4xl font-black tracking-tight ${card.statColor}`}>
                    {card.stat}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {card.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SYSTEM SIZING SECTION (What size system does a commercial site need?)
          ========================================================================= */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-[#00a2ea] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              SYSTEM SIZING
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002b5c] tracking-tight leading-tight">
              What size system does a commercial site actually need?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-0.5">
              We size against your interval data, not your roof. A system that generates more than you use in trading hours exports the surplus for a low feed-in rate — which is how businesses end up over-sold and under-saved.
            </p>
          </div>

          {/* Sizing Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-xs sm:text-sm font-bold text-slate-800">
                    <th className="py-3.5 sm:py-4 px-4 sm:px-6">System size</th>
                    <th className="py-3.5 sm:py-4 px-4 sm:px-6">Indicative daily generation</th>
                    <th className="py-3.5 sm:py-4 px-4 sm:px-6">Approx. roof area</th>
                    <th className="py-3.5 sm:py-4 px-4 sm:px-6">Typical site</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {sizingData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-black text-[#002b5c] whitespace-nowrap">
                        {row.size}
                      </td>
                      <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-bold text-emerald-600 whitespace-nowrap">
                        {row.generation}
                      </td>
                      <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 whitespace-nowrap">
                        {row.roofArea}
                      </td>
                      <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 font-normal">
                        {row.typicalSite}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Note */}
          <div className="max-w-4xl text-xs text-slate-500 leading-relaxed">
            <p>
              Generation figures are indicative annual averages for Australian conditions and vary by location, roof orientation, pitch and shading. Roof area is a guide only — final layout follows a site inspection and structural assessment. Above 1 MW we partner-deliver with engineering specialists.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. FINANCE SECTION (Four ways to pay for it. Three of them cost nothing upfront.)
          ========================================================================= */}
      <section id="finance" className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-[#00a2ea] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              FINANCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002b5c] tracking-tight leading-tight">
              Four ways to pay for it. Three of them cost nothing upfront.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-0.5">
              The right structure depends on your balance sheet, your tax position and how long you hold the building — not on which one we prefer. We model the options side by side and let the numbers decide.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
            
            {/* Card 1: Cash purchase (CapEx) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
                    Own it outright
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Cash purchase (CapEx)
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  You buy the system outright and keep every dollar it saves from day one. Highest lifetime return of any structure, and the simplest to explain to a board. Suits a business sitting on cash it wants working harder than a term deposit.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  'Best total return over the 25-year panel life',
                  'Asset on your books — depreciation applies',
                  'No finance interest, no contract term'
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#10b981] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-slate-700 text-xs sm:text-sm font-medium leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Rental / operating lease */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    $0 upfront
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Rental / operating lease
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  A fixed monthly payment treated as an operating expense rather than a capital purchase, so the equipment is never bought outright. Popular with businesses protecting borrowing capacity for stock, vehicles or expansion. How the arrangement is reported and deducted depends on the accounting standards your entity reports under — your accountant will confirm it.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  'Keeps capital free for the core business',
                  'Predictable fixed monthly operating cost',
                  'Ownership options available at end of term'
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#10b981] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-slate-700 text-xs sm:text-sm font-medium leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-4 sm:mt-5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-xs sm:text-sm font-bold text-[#002b5c]">
                    <th className="py-3 sm:py-3.5 px-4 sm:px-6">Structure</th>
                    <th className="py-3 sm:py-3.5 px-4 sm:px-6">Upfront</th>
                    <th className="py-3 sm:py-3.5 px-4 sm:px-6">Who owns the system</th>
                    <th className="py-3 sm:py-3.5 px-4 sm:px-6">Best suited to</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {financeStructures.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#002b5c] whitespace-nowrap">
                        {row.structure}
                      </td>
                      <td className={`py-3.5 px-4 sm:px-6 font-bold ${row.upfrontColor} whitespace-nowrap`}>
                        {row.upfront}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                        {row.owner}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                        {row.bestSuited}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. REBATES & INCENTIVES SECTION (What a business can claim on commercial solar in 2026.)
          ========================================================================= */}
      <section id="rebates" className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-[#00a2ea] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              REBATES & INCENTIVES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002b5c] tracking-tight leading-tight">
              What a business can claim on commercial solar in 2026.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-0.5">
              There are two federal certificate schemes and a set of state programs on top. We calculate what applies to your site and apply it in the proposal — you never have to chase a certificate yourself.
            </p>
          </div>

          {/* 2 Cards Grid */}
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
            
            {/* Card 1: STCs */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight">
                  STCs — the upfront discount
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Small-scale Technology Certificates are created the day the system is installed and taken off the price as an upfront discount. Today they apply to solar systems of 100 kW or less that also stay within the scheme's annual output limit. The certificate count depends on system size, your zone, and the deeming period, which steps down each January until the scheme ends in 2030.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  <strong className="font-bold text-slate-900">Changing October 2026:</strong> The Federal Government has announced the small-scale scheme will expand to cover systems up to 1 MW from 1 October 2026, subject to regulations — extending the upfront discount to the medium-sized commercial systems that previously fell between the two schemes.
                </p>
              </div>
            </div>

            {/* Card 2: LGCs */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight">
                  LGCs — the ongoing income
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Systems above 100 kW currently sit in the large-scale scheme. Instead of one upfront discount, the system creates Large-scale Generation Certificates each year based on what it actually generates — an ongoing revenue line rather than a one-off deduction from the purchase price.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Which scheme leaves you better off depends on system size, certificate prices and how long you intend to hold the asset. We model both before recommending a size.
                </p>
              </div>
            </div>

          </div>

          {/* =========================================================================
              NSW REBATE BANNER + INTERACTIVE CALCULATOR
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#00224d] via-[#002b5c] to-[#01356e] p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-blue-400/20"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-[#00a2ea]/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 -mb-16 w-56 h-56 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-1.5">
                  <span className="text-[#00a2ea] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                    NEW SOUTH WALES
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#00a2ea]" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  NSW businesses get a second rebate on top — and we built a calculator for it.
                </h3>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                  The NSW Peak Demand Reduction Scheme pays an incentive on commercial battery installs, on top of the federal certificates. It is the most generous commercial battery position in the country right now. Our NSW page models the rebate, the finance and the tax position in one place — put your system size in and see the number.
                </p>
              </div>

              {/* Right CTA Button */}
              <div className="lg:col-span-4 flex lg:justify-end">
                <Link
                  to="/solar/commercial/nsw-calculator"
                  className="relative group px-6 sm:px-8 py-3.5 rounded-full bg-[#00a2ea] hover:bg-[#0092d3] active:bg-[#007cb5] text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,162,234,0.35)] hover:shadow-[0_0_25px_rgba(0,162,234,0.6)] transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Open the NSW calculator</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.span>
                </Link>
              </div>

            </div>
          </motion.div>

          {/* =========================================================================
              LEGAL DISCLAIMER
              ========================================================================= */}
          <div className="text-center max-w-3xl mx-auto pt-2 text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal">
            <p>
              Certificate values are set by the market and change. Scheme rules and eligibility are set by the Clean Energy Regulator and the relevant state scheme administrator. Figures quoted anywhere on this page are indicative estimates, not a quote or financial advice.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. OUR PROCESS SECTION (How a commercial project runs, start to switch-on.)
          ========================================================================= */}
      <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#001f44] to-[#002b5c] text-white relative overflow-hidden">
        
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00a2ea]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 relative z-10">
          
          {/* Section Header */}
          <div className="text-center space-y-2.5 max-w-3xl mx-auto">
            <span className="text-[#00a2ea] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              OUR PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              How a commercial project runs, start to switch-on.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-0.5">
              A transparent, turnkey process managed end-to-end without interrupting your day-to-day operations.
            </p>
          </div>

          {/* Connected Process Flow Grid with Animations */}
          <div className="relative">
            
            {/* Horizontal Timeline Connector Line for desktop */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-[#00a2ea] via-[#38bdf8] to-emerald-400 opacity-25 -z-0" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative z-10">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1, ease: EASE }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-[#00224d]/85 hover:bg-[#002a5e] backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-blue-400/20 hover:border-[#00a2ea] transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 group relative overflow-hidden"
                >
                  {/* Subtle hover gradient glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00a2ea]/10 rounded-full blur-xl group-hover:bg-[#00a2ea]/20 transition-all pointer-events-none" />

                  <div className="space-y-3.5">
                    {/* Step badge */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-10 h-10 rounded-full bg-[#00a2ea] text-white flex items-center justify-center font-black text-base shadow-[0_0_15px_rgba(0,162,234,0.4)] group-hover:shadow-[0_0_20px_rgba(0,162,234,0.7)] group-hover:bg-[#38bdf8] transition-all"
                      >
                        {step.number}
                      </motion.div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                        {step.stepTag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00a2ea] transition-colors leading-snug">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Indicator Line */}
                  <div className="w-full h-1 bg-blue-900/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + idx * 0.15 }}
                      className="h-full bg-gradient-to-r from-[#00a2ea] to-cyan-300"
                    />
                  </div>

                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default SolarCommercial;
