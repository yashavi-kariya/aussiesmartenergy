import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, AlertCircle, CheckCircle2, Zap, Sun, ShieldCheck, Sparkles, Maximize2, X, Star, ArrowRight } from 'lucide-react';
import api from '../utils/api';
import solarPanelImg from '../assets/solar_panel_6kw.jpg';
import heroBannerImg from '../assets/solar_6kw_hero_banner.jpg';
import savingsImg from '../assets/solar_savings_piggybank.png';
import savingsNewImg from '../assets/solar_savings_banner_new.jpg';
import paybackImg from '../assets/solar_payback_house.jpg';
import handshakeAgreementImg from '../assets/handshake_agreement.jpg';

const Solar6kw = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('hero'); // 'hero' or 'spec'

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.mobile.trim() || !formData.address.trim()) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    if (!formData.consent) {
      setSubmitError('Please agree to the privacy policy terms before submitting.');
      return;
    }

    setIsSubmitting(true);

    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0] || 'Customer';
    const lastName = nameParts.slice(1).join(' ') || 'Enquiry';

    try {
      await api.post('/enquiries', {
        firstName,
        lastName,
        email: formData.email.trim(),
        phone: formData.mobile.trim(),
        address: formData.address.trim(),
        message: `Solar Assessment Request (6.6 kW System) - Address: ${formData.address.trim()}`,
        formType: 'residential-6.6kw',
      });

      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        address: '',
        consent: false,
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(
        err?.response?.data?.message || 'Unable to submit request right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-[#1e2d53] pt-36 sm:pt-40 lg:pt-44 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ── 1. Top Grid: Content & Form ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Provided Content */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed">

            {/* Header Box with System Details and Highlighted Featured Image */}
            <div className="space-y-6 bg-gradient-to-br from-[#f0f9ff] via-[#e6f4ff] to-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
              {/* Background ambient light */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#008de4]/10 text-[#008de4] border border-[#008de4]/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Sun className="w-3.5 h-3.5 text-[#008de4]" />
                    Residential Solar System
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Most Popular System
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[#008de4] tracking-tight leading-tight">
                  6.6kW Solar Panel System
                </h1>
                <div className="h-1.5 w-24 bg-gradient-to-r from-[#008de4] to-sky-400 rounded-full" />
                
                <p className="text-base sm:text-lg font-medium text-slate-800 pt-1 leading-relaxed">
                  A 6.6 kW solar system typically consists of 14 solar panels and can generate an average of 24-26 kWh of energy per day, depending on location and weather conditions.
                </p>
                <p className="text-base sm:text-lg font-semibold text-[#1e2d53]">
                  For a medium-sized household consuming around 18–20 kWh per day, this system is an ideal match.
                </p>
              </div>

              {/* Highlighted Featured Showcase Card */}
              <div className="relative pt-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#008de4] via-sky-400 to-blue-600 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500" />
                
                <div 
                  onClick={() => setIsImageModalOpen(true)}
                  className="relative rounded-2xl overflow-hidden border-2 border-white/90 shadow-xl bg-slate-900 group cursor-pointer"
                >
                  <img
                    src={heroBannerImg}
                    alt="6.6 kW Solar Panel System Showcase"
                    className="w-full h-60 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Dark Gradient Overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      6.6 kW High Output
                    </span>
                  </div>

                  {/* Zoom Button */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 bg-slate-900/80 backdrop-blur-md border border-white/20 text-white rounded-xl group-hover:bg-[#008de4] transition-all duration-300 shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Bottom Highlight Details Bar */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-100">
                      <ShieldCheck className="w-4.5 h-4.5 text-sky-400 flex-shrink-0" />
                      <span>14 Tier-1 Panels • 24–26 kWh Daily Yield</span>
                    </div>
                    <span className="text-xs font-bold text-amber-300 bg-amber-400/20 backdrop-blur-md px-3 py-1 rounded-lg border border-amber-400/30 hidden sm:inline-block">
                      Click to Expand Graphic
                    </span>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column: Assessment Form */}
          <div id="assessment-form" className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2d53]">
                Get Solar Assessment
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Use our form to estimate the initial cost of renovation or installation
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Request Sent Successfully</h3>
                <p className="text-xs text-emerald-700">
                  Thank you. We have received your assessment request.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAssessmentSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Mobile*
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile"
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 flex-shrink-0"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I agree that I have read your company's Privacy Policy available on this website and that I express consent to the terms and conditions contained in the Policy.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-70 text-white font-bold rounded-xl shadow transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider text-sm mt-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* ── 2. SAVING WITH A SOLAR PANEL SYSTEM BANNER ───────────────────── */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#0077c8] via-[#008de4] to-[#02599c] p-6 sm:p-10 md:p-14 shadow-2xl text-white">
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Premium Image with Glassmorphic Card Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-300/50 via-white/40 to-amber-300/50 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/40 bg-slate-950">
                  <img
                    src={savingsNewImg}
                    alt="Solar Panel System Energy Savings Overview"
                    className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Highlight Badge */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-xl text-white flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <Sparkles className="w-4 h-4" /> High Return Investment
                    </span>
                    <span className="text-emerald-300 font-bold">$25,500+ Lifetime Savings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Bullet Points & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-lg sm:text-xl font-medium text-sky-100 uppercase tracking-wider text-xs">
                  Saving with a
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1">
                  Solar Panel System
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-amber-400 to-sky-200 rounded-full mt-3" />
              </div>

              {/* Bullet Points */}
              <div className="space-y-4 text-sm sm:text-base text-white/95 leading-relaxed font-normal">

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                  </div>
                  <p>
                    Assuming that energy prices remain stable, you could save anywhere from $25,500 to $33,000 on electricity over the lifetime of your system.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                  </div>
                  <p className="font-semibold text-amber-200">
                    Wait, that’s not all.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                  </div>
                  <p>
                    The cost of solar panels has also significantly reduced over the past decade, with reductions of 64%, 69%, and 82% for residential, commercial rooftop, and utility-scale PV systems, respectively.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                  </div>
                  <p>
                    This means more savings and higher returns at a fraction of the cost.
                  </p>
                </div>

              </div>

              {/* Red CTA Button (redirects to home page reviews section /#reviews) */}
              <div className="pt-2">
                <Link
                  to="/#reviews"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:from-red-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-red-600/40 transition-all duration-300 text-sm sm:text-base text-center group border border-red-500/50"
                >
                  <Star className="w-4.5 h-4.5 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform" />
                  <span>See What Our Customers Say About Their Savings</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* ── 3. PAYBACK PERIOD OF 6.6kW SOLAR SECTION ─────────────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Heading & Bullet Points */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  Payback Period of
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  6.6kW solar
                </h2>
                <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    The payback timeframe refers to the period needed for cumulative power bill savings to fully cover your initial solar system investment.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    For a standard 6.6 kW solar system, this return timeline depends on key factors including household electricity habits, local sunshine exposure, and overall setup costs.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Across Australian households, an average 6.6 kW residential setup typically pays for itself within approximately{' '}
                    <span className="text-[#008de4] font-bold underline decoration-amber-400 decoration-2 underline-offset-2">
                      2-3 years.
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    In regions with higher electricity prices and optimal sun orientation, the payback period can be as short as 1-2 years.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Furthermore, with generous Federal STC discounts and government renewable incentives, the overall payback timeline is accelerated even more.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column: Custom Modern Solar Home Image with Layered Frames */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -right-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100">
                  <img
                    src={paybackImg}
                    alt="Australian Home with Rooftop Solar Panels"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. HOW MUCH DOES A 6.6kW SOLAR PANEL SYSTEM COST? ─────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Image with layered blue background */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -left-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=800&q=80"
                    alt="Solar Panel Cost & Quality Investment"
                    className="w-full h-64 sm:h-80 object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Title & Bullets */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  How Much Does a
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  6.6kW Solar Panel System Cost?
                </h2>
                <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    The overall investment for a 6.6 kW solar system in Australia fluctuates depending on equipment quality, your geographic location, and specific brand selections.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    To optimize energy independence and minimize reliance on the grid, adding battery storage is an excellent choice. While a battery-coupled setup involves a higher starting budget, the ongoing bill savings and backup resilience are significant.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    We strongly advise homeowners against installing low-grade, ultra-cheap solar products that lack long-term reliability.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Choosing certified Tier-1 panels and trusted smart inverters guarantees superior efficiency and ensures your system delivers reliable power for decades.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ── 5. WHAT GOVERNMENT INCENTIVES CAN YOU GET? ───────────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Title & Bullets */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  What Government Incentives
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  Can You Get for Solar Installation?
                </h2>
                <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    As an Australian homeowner, you can take advantage of numerous federal and state-level clean energy incentives.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Under the Federal Small-scale Technology Certificates (STC) program, you receive direct point-of-sale discounts on eligible solar panels, battery systems, and solar hot water units.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Across Australia, individual state programs provide supplementary grants and interest-free loan options to make solar even more accessible.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    For example, homeowners in <span className="text-[#008de4] font-bold underline decoration-amber-400 decoration-2 underline-offset-2">New South Wales</span> can access upfront payments towards solar installations and home efficiency upgrades.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    In Victoria, the Solar Victoria program provides generous rebates for solar panel installations across existing owner-occupied houses, new constructions, and rental properties.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column: Image with layered blue background */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -right-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100">
                  <img
                    src={handshakeAgreementImg}
                    alt="Solar Installation Consultant and Homeowner Agreement"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 6. HOW MANY SOLAR PANELS DO I NEED? (BLUE BANNER) ────────────── */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#008de4] p-6 sm:p-10 md:p-14 shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Image with layered frame */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -left-3 w-full h-full bg-white/20 rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#0284c7]/40 rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                    alt="Residential Solar Panels Configuration"
                    className="w-full h-64 sm:h-80 object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Title & Bullets */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div>
                <p className="text-lg sm:text-xl font-medium text-white/90">
                  How many solar panels do
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-0.5">
                  I need for a 6.6 kW system?
                </h2>
                <div className="h-1 w-24 bg-white rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-white/95 leading-relaxed font-normal">

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p>
                    When planning a 6.6 kW solar system, the total quantity of panels depends on the wattage capacity of each individual panel.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p>
                    For example, combining 14 high-efficiency solar panels rated at 415W to 475W each delivers a combined system output of approximately 6,650 watts (6.6 kW).
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p>
                    The solar inverter functions as the control unit of your solar array, managing power conversion from DC to AC electricity for your household appliances.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p>
                    Under Australian Clean Energy Council guidelines, a 5 kW inverter paired with 6.6 kW of panels provides a proven 133% capacity ratio, capturing maximum solar energy during morning, midday, and late afternoon periods.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ── 7. HOW MUCH ROOF SPACE DO YOU NEED? ──────────────────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Image with layered blue background */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -left-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                    alt="Modern Home Roof Space Layout for Solar Panels"
                    className="w-full h-64 sm:h-80 object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Title & Bullets */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  How Much Roof Space Do You Need for
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  a 6.6 kW Solar System?
                </h2>
                <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    A 6.6 kW solar system usually requires between 25-35 square meter area, unshaded roof space, depending on panel wattage, efficiency, and the pitch of your roof planes.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Our CEC-accredited solar engineers conduct detailed satellite roof mapping to engineer a tailored array placement that unlocks maximum sunshine exposure and highest energy yield.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ── 8. ELEVATE YOUR ENERGY EFFICIENCY WITH AUSSIE SMART ENERGY ────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Image with layered blue background */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -left-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                    alt="Accredited Solar Electrician Installing 6.6kW System"
                    className="w-full h-64 sm:h-80 object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Title & Bullets & Yellow CTA */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  Elevate Your Energy Efficiency with
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  Aussie Smart Energy's 6.6kW Solar Solution
                </h2>
                <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Experience reliable electricity generation and meaningful savings on everyday power use with Aussie Smart Energy’s premium 6.6 kW solar package.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Our Tier-1 solar modules generate 6650W of peak power capacity and come with an industry-leading 30-year performance warranty for enduring peace of mind.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Coupled with a proven 5kW smart WiFi inverter and cyclone-certified mounting kits, our systems are built for long-term performance and seamless setup by accredited CEC solar electricians.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    With comprehensive linear power output warranties and Australian support, you can enjoy clean solar independence with complete confidence.
                  </p>
                </div>

                <p className="font-semibold text-slate-800 pt-1">
                  Don't wait – take the first step toward lasting energy independence now!
                </p>

              </div>

              {/* Yellow CTA Button */}
              <div className="pt-2">
                <a
                  href="#assessment-form"
                  className="inline-block px-8 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/30 transition-all duration-200 text-sm sm:text-base"
                >
                  Get Your Free Tailored Quote Today!
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ── 9. Bottom Section: Is a 6.6 kW solar system worth it? ────────── */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-4 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e2d53]">
            Is a 6.6 kW solar system worth it?
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            A 6.6 kW solar system can generate enough electricity to power a regular Australian household.
          </p>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            This means it can cut your energy bills and save you money over time. So yes they are worth it and here are the reasons why.
          </p>
        </div>

      </div>

      {/* ── Image Lightbox Modal ────────────────────────────────────────────── */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300 animate-fadeIn"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-[#008de4]" />
                <h3 className="text-base sm:text-lg font-bold text-white">6.6 kW Solar Panel System</h3>
              </div>

              {/* Tab selector */}
              <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setActiveModalTab('hero')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeModalTab === 'hero' ? 'bg-[#008de4] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  System Showcase
                </button>
                <button
                  onClick={() => setActiveModalTab('spec')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeModalTab === 'spec' ? 'bg-[#008de4] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Detailed Infographic
                </button>
              </div>

              <button
                onClick={() => setIsImageModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-4 sm:p-6 bg-slate-950 flex items-center justify-center overflow-y-auto flex-1">
              {activeModalTab === 'hero' ? (
                <img
                  src={heroBannerImg}
                  alt="6.6 kW Solar System Showcase Banner"
                  className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl border border-slate-800"
                />
              ) : (
                <img
                  src={solarPanelImg}
                  alt="6.6 kW Solar System Infographic"
                  className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl border border-slate-800"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>High-Resolution System Graphic</span>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="text-[#008de4] hover:underline font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Solar6kw;
