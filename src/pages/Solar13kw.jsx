import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';
import solarPanelImg from '../assets/solar_panel_6kw.jpg';
import paybackImg from '../assets/solar_payback_house.jpg';

const Solar13kw = () => {
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
        message: `Solar Assessment Request (13.3 kW System) - Address: ${formData.address.trim()}`,
        formType: 'residential-13.2kw',
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
        
        {/* ── 1. Top Grid: 13.3kW Solar Panel System & Get Solar Assessment ── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Heading, Solar Panel Image & Bullets */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header Box with Image */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#f0f9ff] border border-sky-100 rounded-3xl p-6 sm:p-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight leading-tight">
                    13.3kW Solar Panel
                  </h1>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-1">
                    System
                  </p>
                  <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
                </div>

                <div className="w-36 sm:w-44 flex-shrink-0 flex justify-center">
                  <img
                    src={solarPanelImg}
                    alt="13.3 kW Solar Panels"
                    className="h-44 sm:h-52 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Figuring out the right-sized solar system for your home can feel like a bit of a puzzle.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p className="font-semibold text-slate-800">
                    But don’t worry, we’ve got you covered!
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    If you’re someone who uses a lot of electricity or drives an electric car, a 13.3kW solar system might be just what you need.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    So, let’s take a closer look at this 13.3kW solar system and see if it’s the perfect match for your energy needs.
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
                      Thank you. Our solar specialists will contact you shortly with your 13.3kW assessment.
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

        {/* ── 2. HOW MANY kWh DOES A 13.3kW SOLAR SYSTEM PRODUCE? ─────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Title & Bullets */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  How Many kWh Does a
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  13.3kW Solar System Produce?
                </h2>
                <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p className="font-semibold text-slate-800">
                    It is estimated that a 13.3kW solar panel system in Australia can generate an average of 40–52 kWh per day.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    However, this can fluctuate based on your location, prevailing weather conditions, and the efficiency of your solar panels.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column: Rooftop Solar Image with Layered Frames */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -right-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />
                
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100 bg-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
                    alt="13.3kW Rooftop Solar System Output"
                    className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 3. HOW MANY PANELS ARE IN A 13.3kW SOLAR SYSTEM? ─────────────── */}
        <section className="bg-white border border-[#008de4]/30 rounded-[24px] overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch">
          <div className="bg-[#008de4] text-white p-6 sm:p-8 md:w-5/12 flex flex-col justify-center">
            <p className="text-lg sm:text-xl font-medium text-white/90">
              How many panels are in a
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
              13.3kW solar system?
            </h2>
          </div>
          <div className="p-6 sm:p-8 md:w-7/12 flex items-center bg-white text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              Generally, a 13.3kW solar setup typically includes around <strong>28 solar panels</strong>, with each panel having a capacity of approximately <strong>475 W</strong>. However, it's important to note that the precise number of panels required can fluctuate based on the wattage and efficiency of the specific panels being used.
            </p>
          </div>
        </section>

        {/* ── 4. IS A 13.3kW SOLAR SYSTEM WORTH IT? (BLUE BANNER) ──────────── */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#008de4] p-6 sm:p-10 md:p-12 shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Circular House Visual */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Is a 13.3kW
                </h2>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                  solar system worth it?
                </p>
                <div className="h-1 w-20 bg-white rounded-full mt-3" />
              </div>

              <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-full bg-white/15 p-3 flex items-center justify-center border border-white/25">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                  alt="Modern Home Solar Architecture"
                  className="w-full h-full object-cover rounded-full shadow-inner"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>
            </div>

            {/* Right Column: Bullets */}
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-white/95 leading-relaxed font-normal">
              
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <p>
                  Assessing the worth of a 13.3kW solar system for your home involves considering various factors, including your local electricity costs, sunlight availability, and your specific energy demands.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <p>
                  In general, a 13.3-kW solar system proves to be a sound investment if you are facing high electricity bills of more than $700 due to substantial energy consumption.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <p>
                  It is a popular choice among households with high energy needs and small businesses alike.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <p>
                  Its robust capacity to meet high energy demands positions it as a reliable and sustainable solution.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ── 5. HOW MUCH A 13.3kW SOLAR SYSTEM COST? ──────────────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Image with layered blue background */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -left-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />
                
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100 bg-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=800&q=80"
                    alt="Solar Investment and Financial Returns"
                    className="w-full h-64 sm:h-80 object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Title & Bullets */}
            <div className="lg:col-span-7 space-y-5 order-1 lg:order-2 text-slate-700">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  How Much a 13.3kW
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  Solar System Cost?
                </h2>
                <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <p className="text-[#008de4] font-bold text-sm sm:text-base">
                13.3kW Solar System price in Australia is influenced by several factors, such as:
              </p>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    The choice of solar panels, in terms of type and quality, can significantly impact the overall cost of the system.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Furthermore, installation costs can fluctuate based on the installer's charges and the complexity of the installation process.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    It's worth noting that government incentives, such as rebates and tax credits, play a vital role in reducing the overall cost of installing a solar system.
                  </p>
                </div>

              </div>

              <div className="pt-2">
                <p className="text-[#008de4] font-bold text-sm sm:text-base mb-3">
                  Get a tailored quote as per your energy needs without any obligations.
                </p>
                <a
                  href="#assessment-form"
                  className="inline-block px-8 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl shadow-md hover:shadow-red-600/30 transition-all text-sm sm:text-base"
                >
                  Learn More about Off-grid Solar System
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ── 6. WHY CHOOSE US FOR YOUR SOLAR PROJECT? (BLUE BANNER) ───────── */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#008de4] p-6 sm:p-10 md:p-12 shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Bullets */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Why Choose Us for
                </h2>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                  Your Solar Project?
                </p>
                <div className="h-1 w-20 bg-white rounded-full mt-3" />
              </div>

              <p className="text-sm sm:text-base text-white/95 leading-relaxed font-medium">
                At Aussie Smart Energy, we pride ourselves on being the preferred solar installer for Australian homeowners. Here’s why:
              </p>

              <div className="space-y-4 text-sm sm:text-base text-white/95 leading-relaxed">
                
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p>
                    <strong>Tier 1 Solar Modules:</strong> Experience efficiency and durability with our Tier 1 solar modules, boasting a robust 25-year warranty.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p>
                    <strong>High-Performance Inverter:</strong> Paired with adaptable mounting options, our systems ensure a smooth transition to clean energy, tailored to your needs.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p>
                    <strong>CEC-Accredited Experts:</strong> Benefit from swift and professional installations backed by our stellar 5-star reviews, reflecting our commitment to excellence.
                  </p>
                </div>

              </div>

              <p className="text-xs sm:text-sm text-white/90 pt-1">
                Go solar with Aussie Smart Energy, where quality, reliability, and customer satisfaction are the top priorities.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-block px-8 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/30 transition-all text-sm sm:text-base"
                >
                  Check Out Our Customer Reviews!
                </Link>
              </div>

            </div>

            {/* Right Column: Family Solar Rooftop Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -right-3 w-full h-full bg-white/20 rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-[#0284c7]/40 rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />
                
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
                  <img
                    src={paybackImg}
                    alt="Australian Family Solar Project"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
};

export default Solar13kw;
