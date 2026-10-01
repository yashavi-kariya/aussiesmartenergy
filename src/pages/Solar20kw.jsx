import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, AlertCircle, CheckCircle2, Zap, Sun, ShieldCheck, Sparkles, Maximize2, X, TrendingUp, Building2, Check, ArrowRight, Star } from 'lucide-react';
import api from '../utils/api';
import solarPanel20kwImg from '../assets/solar_20kw_hero_banner.jpg';
import paybackImg from '../assets/solar_payback_house.jpg';

const Solar20kw = () => {
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
        message: `Commercial Solar Assessment Request (20kW System) - Address: ${formData.address.trim()}`,
        formType: 'commercial-20kw',
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
        
        {/* ── 1. Top Grid: 20kW Commercial & High Capacity Solar System ── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Heading, Showcase Image & Bullets */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header Box */}
              <div className="space-y-6 bg-gradient-to-br from-[#f0f9ff] via-[#e6f4ff] to-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#008de4]/10 text-[#008de4] border border-[#008de4]/20 rounded-full text-xs font-bold uppercase tracking-wider">
                      <Building2 className="w-3.5 h-3.5 text-[#008de4]" />
                      Commercial & High Capacity Solar
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Maximum Commercial ROI
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight leading-tight">
                    20kW Commercial Solar Panel System
                  </h1>
                  <div className="h-1.5 w-24 bg-gradient-to-r from-[#008de4] to-sky-400 rounded-full" />
                </div>

                {/* Highlighted Showcase Card */}
                <div className="relative pt-2">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#008de4] via-sky-400 to-blue-600 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500" />
                  
                  <div 
                    onClick={() => setIsImageModalOpen(true)}
                    className="relative rounded-2xl overflow-hidden border-2 border-white/90 shadow-xl bg-slate-900 group cursor-pointer"
                  >
                    <img
                      src={solarPanel20kwImg}
                      alt="20 kW Commercial Solar Panel System Showcase"
                      className="w-full h-60 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        20 kW Commercial Capacity
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
                        <span>42–48 Tier-1 Panels • 80–100 kWh Daily Yield</span>
                      </div>
                      <span className="text-xs font-bold text-amber-300 bg-amber-400/20 backdrop-blur-md px-3 py-1 rounded-lg border border-amber-400/30 hidden sm:inline-block">
                        Click to Expand Graphic
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#008de4]/10 border border-[#008de4]/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 text-[#008de4]" />
                  </div>
                  <p>
                    A <strong>20kW solar system</strong> is a robust commercial-grade energy solution designed for small to medium businesses, agricultural setups, and large luxury estates.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#008de4]/10 border border-[#008de4]/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 text-[#008de4]" />
                  </div>
                  <p className="font-semibold text-slate-800">
                    Generating an average of 80–100 kWh per day, this system delivers significant operational bill reductions and fast payback.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#008de4]/10 border border-[#008de4]/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 text-[#008de4]" />
                  </div>
                  <p>
                    Equipped with Tier-1 475W panels and commercial-grade smart inverters, it ensures maximum yield during peak daytime operational hours.
                  </p>
                </div>

              </div>

            </div>

            {/* Right Column: Blue Container Assessment Form */}
            <div id="assessment-form" className="lg:col-span-5 w-full">
              <div className="bg-[#007ecc] border-2 border-[#38bdf8]/40 rounded-[28px] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                
                <div className="border-b border-white/20 pb-4 mb-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Get Solar Assessment
                  </h2>
                  <div className="h-0.5 w-14 bg-sky-200 rounded-full mt-2" />
                  <p className="text-xs sm:text-sm text-sky-100 mt-2">
                    Use our form to estimate the initial cost of renovation or installation
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="p-6 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-center space-y-2">
                    <CheckCircle2 className="w-9 h-9 text-emerald-300 mx-auto" />
                    <h3 className="text-lg font-bold text-white">Request Sent Successfully!</h3>
                    <p className="text-xs text-sky-100">
                      Thank you. Our commercial solar engineering team will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAssessmentSubmit} className="space-y-4">
                    {submitError && (
                      <div className="p-3 bg-red-500/20 border border-red-400 text-red-100 rounded-xl text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name*"
                        required
                        className="w-full px-4 py-3 bg-[#006bb0] border border-white/30 rounded-xl text-sm text-white placeholder:text-sky-200/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-[#0062a3] transition-all"
                      />
                    </div>

                    {/* Email & Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email*"
                          required
                          className="w-full px-4 py-3 bg-[#006bb0] border border-white/30 rounded-xl text-sm text-white placeholder:text-sky-200/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-[#0062a3] transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Mobile*"
                          required
                          className="w-full px-4 py-3 bg-[#006bb0] border border-white/30 rounded-xl text-sm text-white placeholder:text-sky-200/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-[#0062a3] transition-all"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address*"
                        required
                        className="w-full px-4 py-3 bg-[#006bb0] border border-white/30 rounded-xl text-sm text-white placeholder:text-sky-200/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-[#0062a3] transition-all"
                      />
                    </div>

                    {/* Privacy Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleInputChange}
                          required
                          className="mt-1 w-4 h-4 text-red-600 rounded border-white/40 focus:ring-red-500 flex-shrink-0"
                        />
                        <span className="text-[11px] sm:text-xs text-sky-100 leading-relaxed">
                          I agree that I have read your company's Privacy Policy available on this website and that I express consent to the terms and conditions contained in the Policy.
                        </span>
                      </label>
                    </div>

                    {/* Red Send Request Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-70 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/30 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base tracking-wide mt-2"
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

          </div>
        </section>

        {/* ── 2. SYSTEM POWER & PERFORMANCE ─────────────────────────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  How Much Power Will a
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  20kW Solar System Produce?
                </h2>
                <div className="h-1.5 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#008de4]/10 border border-[#008de4]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#008de4]" />
                  </div>
                  <p className="font-semibold text-slate-800">
                    A 20kW solar panel system generates approximately 80 to 100 kWh per day under standard Australian solar conditions.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#008de4]/10 border border-[#008de4]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#008de4]" />
                  </div>
                  <p>
                    This is equivalent to generating over 29,000 to 36,500 kWh of clean electricity annually, offsetting massive business overheads.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#008de4]/10 border border-[#008de4]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#008de4]" />
                  </div>
                  <p>
                    Requires roughly 100-130 sq. meters of unshaded roof space and pays for itself within 2 to 3.5 years for high daytime consumers.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -right-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />
                
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100 bg-slate-900">
                  <img
                    src={paybackImg}
                    alt="20kW Commercial Rooftop Solar Setup"
                    className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* ── Image Lightbox Modal ────────────────────────────────────────────── */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-[#008de4]" />
                <h3 className="text-base sm:text-lg font-bold text-white">20 kW Commercial Solar Panel System</h3>
              </div>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 bg-slate-950 flex items-center justify-center overflow-y-auto flex-1">
              <img
                src={solarPanel20kwImg}
                alt="20 kW Solar System Showcase Banner"
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl border border-slate-800"
              />
            </div>

            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>High-Resolution 20 kW System Graphic</span>
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

export default Solar20kw;