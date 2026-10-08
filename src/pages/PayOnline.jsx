import React, { useState, useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { ShieldCheck, CreditCard, Lock, FileText, User, Mail, Phone, MapPin, DollarSign, ArrowRight, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { SupportedPaymentLogos, ANZWorldlineLogo } from '../components/PaymentLogos';

const MAX_PAYMENT_AMOUNT = 100000;

const PayOnline = () => {
  const [form, setForm] = useState({
    projectNumber: '',
    amount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [serverMsg, setServerMsg] = useState('');

  useEffect(() => {
    // Reset loading status when page is restored from Back/Forward Cache (BFCache) or navigated back to
    const handlePageReset = () => {
      setStatus('idle');
    };

    window.addEventListener('pageshow', handlePageReset);
    window.addEventListener('popstate', handlePageReset);

    setStatus('idle');

    return () => {
      window.removeEventListener('pageshow', handlePageReset);
      window.removeEventListener('popstate', handlePageReset);
    };
  }, []);

  const handleChange = (field) => (e) => {
    let rawVal = e.target.value;

    if (field === 'firstName' || field === 'lastName') {
      // Disallow numeric input for First Name & Last Name
      rawVal = rawVal.replace(/[0-9]/g, '');
    } else if (field === 'phone') {
      // Allow only numeric input, normalize +61 to 0, and limit to 10 digits
      let clean = rawVal.replace(/[^\d+]/g, '');
      if (clean.startsWith('+61')) {
        clean = '0' + clean.slice(3);
      } else if (clean.startsWith('61') && clean.length > 10) {
        clean = '0' + clean.slice(2);
      }
      rawVal = clean.replace(/\D/g, '').slice(0, 10);
    } else if (field === 'email') {
      // Disallow whitespace, commas, or semicolons to prevent multiple emails
      rawVal = rawVal.replace(/[\s,;]/g, '');
    } else if (field === 'amount') {
      // Restrict amount to valid numbers with up to 2 decimal places & max $100,000
      if (rawVal !== '' && !/^\d*\.?\d{0,2}$/.test(rawVal)) {
        return;
      }
      if (parseFloat(rawVal) > MAX_PAYMENT_AMOUNT) {
        setErrors((prev) => ({
          ...prev,
          amount: `Payment amount cannot exceed $${MAX_PAYMENT_AMOUNT.toLocaleString()} AUD.`,
        }));
      } else if (errors.amount) {
        setErrors((prev) => ({ ...prev, amount: '' }));
      }
    }

    setForm((prev) => ({ ...prev, [field]: rawVal }));
    if (field !== 'amount' && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    const numAmount = parseFloat(form.amount);

    // Payment Amount validation
    if (!form.amount || isNaN(numAmount) || numAmount <= 0) {
      errs.amount = 'Please enter a valid payment amount.';
    } else if (numAmount > MAX_PAYMENT_AMOUNT) {
      errs.amount = `Payment amount cannot exceed $${MAX_PAYMENT_AMOUNT.toLocaleString()} AUD.`;
    }

    // First Name validation
    if (!form.firstName.trim()) {
      errs.firstName = 'First name is required.';
    } else if (/\d/.test(form.firstName)) {
      errs.firstName = 'First name cannot contain numbers.';
    }

    // Last Name validation
    if (!form.lastName.trim()) {
      errs.lastName = 'Last name is required.';
    } else if (/\d/.test(form.lastName)) {
      errs.lastName = 'Last name cannot contain numbers.';
    }

    // Email validation (Strictly 1 single email address)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (form.email.includes(',') || form.email.includes(';') || (form.email.match(/@/g) || []).length > 1) {
      errs.email = 'Only a single email address is allowed.';
    } else if (!emailRegex.test(form.email.trim())) {
      errs.email = 'Please enter a single valid email address.';
    }

    // Phone Number validation
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else {
      const digits = form.phone.replace(/\D/g, '');
      if (digits.length !== 10) {
        errs.phone = 'Phone number must be a 10-digit Australian number.';
      } else if (!/^(0[23478]\d{8}|1[38]00\d{6}|0\d{9})$/.test(digits)) {
        errs.phone = 'Please enter a valid 10-digit Australian phone number (e.g. 04XX XXX XXX).';
      }
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      
      const missing = [];
      if (validationErrors.amount) missing.push(validationErrors.amount);
      if (validationErrors.firstName) missing.push(validationErrors.firstName);
      if (validationErrors.lastName) missing.push(validationErrors.lastName);
      if (validationErrors.email) missing.push(validationErrors.email);
      if (validationErrors.phone) missing.push(validationErrors.phone);

      setServerMsg(missing.length > 0 ? missing[0] : 'Please correct highlighted errors before proceeding.');
      return;
    }

    setStatus('loading');
    setServerMsg('');

    try {
      const numAmount = parseFloat(form.amount);
      const prjNum = form.projectNumber.trim() || `PRJ-${Math.floor(100000 + Math.random() * 900000)}`;

      const response = await api.post('/payments/create', {
        ...form,
        projectNumber: prjNum,
        amount: numAmount,
        currency: 'AUD',
        packageDetails: {
          title: `Project Payment - ${prjNum}`,
          packageId: 'custom-invoice',
          formType: 'pay-online-invoice',
          description: `Custom project payment for reference ${prjNum}`,
        },
      });

      if (response.data && response.data.success && response.data.data.redirectUrl) {
        // Redirect customer to official ANZ Worldline Hosted Checkout
        window.location.href = response.data.data.redirectUrl;
        // Fallback: reset status after 5 seconds if navigation stays on page or is returned to
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('error');
        setServerMsg('Failed to initialize ANZ Worldline Hosted Checkout session.');
      }
    } catch (err) {
      console.error('Pay Online submission error:', err);
      setStatus('error');
      if (!err.response) {
        setServerMsg('Unable to connect to payment server. Please check your internet connection and try again.');
      } else {
        setServerMsg(err?.response?.data?.message || 'Payment initiation failed. Please try again.');
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 pt-24 sm:pt-28 pb-16">
      {/* ── HERO HEADER ── */}
      <section className="bg-gradient-to-br from-[#06142e] via-[#0b2b5c] to-[#0a192f] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ANZ Worldline Payment Gateway</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Make A Secure Payment
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl mx-auto font-medium">
            Enter your project details below to proceed to ANZ Worldline Solutions secure checkout page.
          </p>
        </div>
      </section>

      {/* ── MAIN PAYMENT FORM CARD ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden"
        >
          {/* Header Strip */}
          <div className="px-6 py-4 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#003b73] text-white flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#003b73]">Payment Details</h2>
                <p className="text-xs text-slate-500">Provide your reference details to complete purchase</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6" noValidate>
            {/* Business / Reference Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Project / Reference Number */}
              <div className="space-y-1.5">
                <label htmlFor="projectNumber" className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#006ab7]" />
                  Project / Reference Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="projectNumber"
                  type="text"
                  placeholder="e.g. PRJ-98421 or Invoice #"
                  value={form.projectNumber}
                  onChange={handleChange('projectNumber')}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 font-medium placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-[#006ab7] ${
                    errors.projectNumber ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white'
                  }`}
                />
                {errors.projectNumber && (
                  <p className="text-xs text-rose-500 font-semibold">{errors.projectNumber}</p>
                )}
              </div>

              {/* Payment Amount */}
              <div className="space-y-1.5">
                <label htmlFor="amount" className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#006ab7]" />
                  Payment Amount (AUD) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-slate-500 text-sm">$</span>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="1"
                    max={MAX_PAYMENT_AMOUNT}
                    placeholder="0.00"
                    value={form.amount}
                    onChange={handleChange('amount')}
                    className={`w-full pl-8 pr-4 py-3 rounded-xl border text-sm text-slate-900 font-bold placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-[#006ab7] ${
                      errors.amount ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.amount ? (
                  <p className="text-xs text-rose-500 font-semibold">{errors.amount}</p>
                ) : (
                  <p className="text-[11px] text-slate-400 font-medium">Max payment limit: ${MAX_PAYMENT_AMOUNT.toLocaleString()}.00 AUD</p>
                )}
              </div>
            </div>

            {/* Customer Details Row */}
            <div className="pt-2 border-t border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="firstName" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#006ab7]" /> First Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange('firstName')}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-[#006ab7] ${
                      errors.firstName ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
                    }`}
                  />
                  {errors.firstName && <p className="text-xs text-rose-500 font-semibold">{errors.firstName}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="lastName" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#006ab7]" /> Last Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Smith"
                    value={form.lastName}
                    onChange={handleChange('lastName')}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-[#006ab7] ${
                      errors.lastName ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
                    }`}
                  />
                  {errors.lastName && <p className="text-xs text-rose-500 font-semibold">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#006ab7]" /> Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john.smith@example.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-[#006ab7] ${
                      errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-500 font-semibold">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#006ab7]" /> Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="04XX XXX XXX"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    maxLength={16}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-[#006ab7] ${
                      errors.phone ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-500 font-semibold">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="address" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#006ab7]" /> Installation / Billing Address (Optional)
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Street address, suburb, state, postcode"
                  value={form.address}
                  onChange={handleChange('address')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-[#006ab7]"
                />
              </div>
            </div>

            {/* Error Banner */}
            {status === 'error' && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2">
                <span>⚠️ {serverMsg}</span>
              </div>
            )}

            {/* Payment Method Option Callout */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <ANZWorldlineLogo className="h-6 w-auto" />
                  <span>Supported Payment Options</span>
                </div>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Verified Partner</span>
              </div>
              <SupportedPaymentLogos />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 px-6 rounded-2xl text-white font-extrabold text-base shadow-xl shadow-blue-600/20 bg-gradient-to-r from-[#003b73] via-[#006ab7] to-[#39b54a] hover:opacity-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting to ANZ Worldline Solutions...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-emerald-300" />
                    <span>Proceed to ANZ Worldline Checkout</span>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-slate-500 font-medium">
              You will be redirected securely to ANZ Worldline Solutions Hosted Checkout to complete card or digital wallet payment.
            </p>
          </form>
        </m.div>
      </section>
    </main>
  );
};

export default PayOnline;

