import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';
import solarPanelImg from '../assets/solar_panel_6kw.jpg';

const Solar10kw = () => {
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
        message: `Solar Assessment Request (10.45 kW System) - Address: ${formData.address.trim()}`,
        formType: 'residential-10.5kw',
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

        {/* ── 1. UNDERSTANDING 10.45kW SOLAR SYSTEMS SECTION ───────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Heading & Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  Understanding
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  10.45kW Solar Systems
                </h1>
                <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                <p>
                  Imagine a world where you never have to worry about your energy bills again.
                </p>

                <p>
                  Where you can generate your own electricity from the sun and save money on your energy costs for years to come.
                </p>

                <p className="font-semibold text-[#1e2d53] text-lg sm:text-xl">
                  That world is possible with a 10.45kW solar system.
                </p>

                <p>
                  In this guide, we'll take you on a journey to learn everything you need to know about 10.45 kW solar systems.
                </p>
              </div>
            </div>

            {/* Right Column: Solar Panel Image with Layered Background */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -right-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100 bg-slate-50 flex items-center justify-center p-6">
                  <img
                    src={solarPanelImg}
                    alt="10.45 kW Solar Panels"
                    className="h-64 sm:h-80 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 2. HOW MUCH POWER WILL A 10.45kW SOLAR SYSTEM PRODUCE? ────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Title & Bullets */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#008de4]">
                  How Much Power Will a
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#008de4] tracking-tight mt-0.5">
                  10.45kW Solar System Produce?
                </h2>
                <div className="h-1 w-20 bg-[#008de4] rounded-full mt-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p className="font-semibold text-slate-800">
                    On average, a 10.45kW solar panel system can generate around 40 kilowatt-hours (kWh) of electricity per day.
                  </p>
                </div>

                <p className="text-[#008de4] font-bold text-sm sm:text-base pl-7">
                  However, this figure varies due to several critical factors:
                </p>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Geographic location plays a pivotal role; for instance, solar systems installed in sunnier Australian regions produce significantly more energy.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Additionally, the orientation and tilt angle of the solar panel array affect the amount of sunlight captured, directly influencing overall energy production.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Another crucial factor is shading; even a small amount of shade cast on the panels can considerably reduce their efficiency.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                  </div>
                  <p>
                    Moreover, the operating temperature of the panels also impacts their overall output performance.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column: Custom Modern Rooftop Solar Home Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -top-3 -right-3 w-full h-full bg-[#008de4] rounded-2xl sm:rounded-3xl transform rotate-2 pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-[#0284c7]/20 rounded-2xl sm:rounded-3xl transform -rotate-2 pointer-events-none" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100 bg-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
                    alt="Rooftop Solar Array Generating Daily Electricity"
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

        {/* ── 3. HOW MANY PANELS ARE REQUIRED IN A 10.45kW SYSTEM? (BLUE BANNER) ── */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#008de4] p-6 sm:p-10 md:p-14 shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Title */}
            <div className="lg:col-span-4 space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-white/95">
                How many panels
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                are required
              </h2>
              <p className="text-lg sm:text-xl font-medium text-white/90">
                in a 10.45kW solar system?
              </p>
            </div>

            {/* Middle Column: Solar Panel Graphic */}
            <div className="lg:col-span-3 flex justify-center py-2">
              <div className="relative">
                <img
                  src={solarPanelImg}
                  alt="10.45kW Solar Panels Setup"
                  className="h-52 sm:h-64 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Right Column: Bullets */}
            <div className="lg:col-span-5 space-y-4 text-sm sm:text-base text-white/95 leading-relaxed">

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <p>
                  Determining the number of solar panels required for a specific system size involves a straightforward calculation based on the wattage of individual panels.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <p>
                  Let's take a 475W solar panel as an example.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <p className="font-semibold">
                  By using 22 of these 475W panels, you can create a 10.45kW solar system.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ── 4. IS 10.45kW SUITABLE FOR MY HOUSE? ─────────────────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Styled Blue Card with House Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-[#008de4] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Is 10.45 Kw suitable
                  </h2>
                  <p className="text-lg sm:text-xl font-medium text-white/90 mt-1">
                    for my house?
                  </p>
                  <div className="h-1 w-16 bg-white rounded-full mt-3 mb-6" />
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-white/10 p-3 border border-white/20 mt-2">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                    alt="Modern House Solar Suitability"
                    className="w-full h-48 object-cover rounded-xl"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Suitability Bullets & Yellow CTA */}
            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                </div>
                <p>
                  Deciding if a 10.45kW solar panel system is right for your residence involves considering your daily electricity consumption.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                </div>
                <p>
                  These systems are best suited for homes or businesses with substantial daytime energy usage, exceeding 40 kWh per day.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                </div>
                <p>
                  Regardless of your location, a 10.45kW solar system is generally installable.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                </div>
                <p>
                  Typically, it requires 45-50 square meter of roof space and around 22–26 solar panels, each measuring about 1.7 to 2 metres by 1 metre.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#008de4] flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#008de4]" />
                </div>
                <p>
                  Ensuring your roof has sufficient space is crucial for accommodating the solar panels effectively.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-[#008de4] font-bold text-base sm:text-lg mb-3">
                  Want to find out if a 10.45kW solar system is the best fit for your energy needs?
                </p>
                <a
                  href="#assessment-form"
                  className="inline-block px-8 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl shadow-md hover:shadow-red-600/30 transition-all text-sm sm:text-base text-center"
                >
                  Get in touch with us today!
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ── 5. GET SOLAR ASSESSMENT FORM SECTION ─────────────────────────── */}
        <section id="assessment-form" className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-sm max-w-4xl mx-auto">
          <div className="border-b border-slate-100 pb-4 mb-8 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e2d53]">
              Get Solar Assessment
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Use our form to estimate the initial cost of renovation or installation
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-900">Request Sent Successfully</h3>
              <p className="text-sm text-emerald-700 max-w-md mx-auto">
                Thank you. We have received your assessment request and our team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAssessmentSubmit} className="space-y-5">
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Mobile*
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter installation address"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    I agree that I have read your company's Privacy Policy available on this website and that I express consent to the terms and conditions contained in the Policy.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-70 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider text-sm mt-4"
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
        </section>

      </div>
    </main>
  );
};

export default Solar10kw;
