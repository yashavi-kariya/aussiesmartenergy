import { useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, ShieldCheck, HelpCircle } from 'lucide-react';
import logoImg from '../assets/Mainlogo.png';
import { SupportedPaymentLogos } from '../components/PaymentLogos';

/**
 * ANZ Worldline Solutions Hosted Checkout Page Simulator
 * Renders the ANZ Worldline-hosted payment gateway page matching the reference UI
 * when testing in sandbox mode.
 */
const ANZWorldlineHostedCheckoutSimulator = () => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();

  const returnUrl = searchParams.get('returnUrl') || '/payment/result';
  const paramAmount = searchParams.get('amount') || searchParams.get('paymentAmount') || '2499.00';
  const paramProject = searchParams.get('projectNumber') || searchParams.get('orderId') || `PRJ-${Date.now().toString().slice(-6)}`;
  const paramEmail = searchParams.get('email') || 'customer@example.com';

  // Form Fields State (Fully Editable)
  const [projectNumber, setProjectNumber] = useState(paramProject);
  const [paymentAmount, setPaymentAmount] = useState(paramAmount);
  const [emailAddress, setEmailAddress] = useState(paramEmail);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('card'); // 'applePay' or 'card'

  // Card Form State
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMM, setExpiryMM] = useState('');
  const [expiryYY, setExpiryYY] = useState('');
  const [cvn, setCvn] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCvnInfo, setShowCvnInfo] = useState(false);

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').substring(0, 16);
    return digits.match(/.{1,4}/g)?.join(' ') || digits;
  };

  const fillTestCard = () => {
    setCardholderName('John Doe');
    setCardNumber('4532 1234 5678 9010');
    setExpiryMM('12');
    setExpiryYY('28');
    setCvn('123');
    setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!projectNumber.trim()) e.projectNumber = 'Project number is required';
    if (!paymentAmount || isNaN(paymentAmount)) e.paymentAmount = 'Valid amount is required';
    
    if (selectedPaymentOption === 'card') {
      if (!cardholderName.trim()) e.cardholderName = 'Cardholder name is required';
      if (!cardNumber.replace(/\s/g, '') || cardNumber.replace(/\s/g, '').length < 15) {
        e.cardNumber = 'Valid 16-digit card number is required';
      }
      if (!expiryMM || expiryMM.length < 2) e.expiryMM = 'MM';
      if (!expiryYY || expiryYY.length < 2) e.expiryYY = 'YY';
      if (!cvn || cvn.length < 3) e.cvn = 'CVN required';
    }
    return e;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const targetUrl = decodeURIComponent(returnUrl);
      window.location.href = targetUrl;
    }, 1200);
  };

  const handleBack = () => {
    const targetUrl = decodeURIComponent(returnUrl);
    const cancelUrl = targetUrl.includes('?') ? `${targetUrl}&status=CANCELLED` : `${targetUrl}?status=CANCELLED`;
    window.location.href = cancelUrl;
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col font-sans text-[#161e38]">
      {/* 1. HEADER */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
        {/* Brand Logo Bar */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-7 bg-[#d9232e] rounded-sm hidden sm:inline-block" />
          <img
            src={logoImg}
            alt="Aussie Smart Energy"
            className="h-9 sm:h-11 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fillTestCard}
            className="text-xs font-bold text-[#39b54a] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            ⚡ Auto-fill Test Details
          </button>
          <div className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10 space-y-6"
        >
          {/* Company Logo Banner */}
          <div className="flex flex-col items-center justify-center pt-2 pb-4 border-b border-gray-100">
            <img
              src={logoImg}
              alt="Aussie Smart Energy Logo"
              className="h-14 sm:h-16 w-auto object-contain"
            />
            <span className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#39b54a]" /> ANZ Worldline Hosted Gateway
            </span>
          </div>

          {/* 2. PAYMENT DETAILS SECTION */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161e38]">Payment Details</h1>
            <p className="text-sm text-gray-500">Complete your purchase by providing your payment details.</p>
          </div>

          <form onSubmit={handleNext} className="space-y-6" noValidate>
            {/* Project Number */}
            <div>
              <label className="block text-sm font-bold text-[#161e38] mb-1.5">
                <span className="text-red-500 font-extrabold mr-1">*</span>Project Number
              </label>
              <input
                type="text"
                value={projectNumber}
                onChange={(e) => setProjectNumber(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-base font-semibold text-gray-800 outline-none transition-all bg-white cursor-text ${
                  errors.projectNumber ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#39b54a] focus:ring-2 focus:ring-emerald-100'
                }`}
                placeholder="Enter project number"
              />
              {errors.projectNumber && <p className="text-xs text-red-500 font-semibold mt-1">{errors.projectNumber}</p>}
            </div>

            {/* Payment Amount */}
            <div>
              <label className="block text-sm font-bold text-[#161e38] mb-1.5">
                <span className="text-red-500 font-extrabold mr-1">*</span>Payment Amount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-bold text-gray-500">$</span>
                <input
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                  className={`w-full pl-8 pr-3.5 py-2.5 rounded-lg border text-base font-bold text-gray-900 outline-none transition-all bg-white cursor-text ${
                    errors.paymentAmount ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#39b54a] focus:ring-2 focus:ring-emerald-100'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.paymentAmount && <p className="text-xs text-red-500 font-semibold mt-1">{errors.paymentAmount}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-bold text-[#161e38] mb-1.5">Email Address</label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-base font-medium text-gray-800 outline-none focus:border-[#39b54a] focus:ring-2 focus:ring-emerald-100 transition-all"
                placeholder="email@example.com"
              />
              <p className="text-xs text-gray-500 leading-relaxed mt-1.5">
                Enter your email address if you would like to receive a receipt for this payment.
              </p>
            </div>

            {/* 3. PAYMENT OPTION SECTION */}
            <div className="pt-2 space-y-3">
              <label className="block text-sm font-bold text-[#161e38]">
                <span className="text-red-500 font-extrabold mr-1">*</span>Payment Option
              </label>

              {/* Apple Pay Option */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentOption('applePay')}
                  className={`w-full py-3 px-4 rounded-xl bg-black text-white font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-900 transition-transform active:scale-[0.99] cursor-pointer shadow-md border ${
                    selectedPaymentOption === 'applePay' ? 'ring-2 ring-black ring-offset-2' : ''
                  }`}
                >
                  <span className="font-semibold">Buy with</span>
                  <span className="font-bold tracking-tight text-lg">Pay</span>
                </button>

                {/* Credit Card Radio Option */}
                <div
                  onClick={() => setSelectedPaymentOption('card')}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer transition-all ${
                    selectedPaymentOption === 'card'
                      ? 'border-[#161e38] bg-slate-50/60 ring-1 ring-[#161e38]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={selectedPaymentOption === 'card'}
                      onChange={() => setSelectedPaymentOption('card')}
                      className="w-5 h-5 accent-[#161e38] cursor-pointer"
                    />
                    <span className="font-bold text-sm text-[#161e38]">Credit Card</span>
                  </div>

                  {/* Card Brand Badges (VISA, Mastercard, AMEX, JCB, Apple Pay) */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <SupportedPaymentLogos />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. CARD PAYMENT FORM (When Credit Card selected) */}
            {selectedPaymentOption === 'card' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pt-2"
              >
                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-bold text-[#161e38] mb-1.5">
                    <span className="text-red-500 font-extrabold mr-1">*</span>Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-base font-medium outline-none transition-all ${
                      errors.cardholderName ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#39b54a] focus:ring-2 focus:ring-emerald-100'
                    }`}
                    placeholder="Full name as shown on card"
                  />
                  {errors.cardholderName && <p className="text-xs text-red-500 font-semibold mt-1">{errors.cardholderName}</p>}
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-bold text-[#161e38] mb-1.5">
                    <span className="text-red-500 font-extrabold mr-1">*</span>Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-base font-mono font-medium outline-none transition-all ${
                      errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#39b54a] focus:ring-2 focus:ring-emerald-100'
                    }`}
                    placeholder="Card number"
                  />
                  {errors.cardNumber && <p className="text-xs text-red-500 font-semibold mt-1">{errors.cardNumber}</p>}
                </div>

                {/* Expiry Date MM / YY */}
                <div>
                  <label className="block text-sm font-bold text-[#161e38] mb-1.5">
                    <span className="text-red-500 font-extrabold mr-1">*</span>Expiry Date
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      maxLength={2}
                      value={expiryMM}
                      onChange={(e) => setExpiryMM(e.target.value.replace(/\D/g, ''))}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-base font-mono text-center outline-none transition-all ${
                        errors.expiryMM ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#39b54a] focus:ring-2 focus:ring-emerald-100'
                      }`}
                      placeholder="MM"
                    />
                    <input
                      type="text"
                      maxLength={2}
                      value={expiryYY}
                      onChange={(e) => setExpiryYY(e.target.value.replace(/\D/g, ''))}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-base font-mono text-center outline-none transition-all ${
                        errors.expiryYY ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#39b54a] focus:ring-2 focus:ring-emerald-100'
                      }`}
                      placeholder="YY"
                    />
                  </div>
                  {(errors.expiryMM || errors.expiryYY) && (
                    <p className="text-xs text-red-500 font-semibold mt-1">Expiry MM and YY required</p>
                  )}
                </div>

                {/* CVN */}
                <div>
                  <label className="block text-sm font-bold text-[#161e38] mb-1.5">
                    <span className="text-red-500 font-extrabold mr-1">*</span>CVN
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvn}
                    onChange={(e) => setCvn(e.target.value.replace(/\D/g, ''))}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-base font-mono outline-none transition-all ${
                      errors.cvn ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#39b54a] focus:ring-2 focus:ring-emerald-100'
                    }`}
                    placeholder="3 or 4 digits"
                  />
                  {errors.cvn && <p className="text-xs text-red-500 font-semibold mt-1">{errors.cvv || errors.cvn}</p>}

                  <button
                    type="button"
                    onClick={() => setShowCvnInfo(!showCvnInfo)}
                    className="text-xs text-slate-600 hover:text-slate-900 underline mt-1.5 flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" /> What is a CVN?
                  </button>
                  {showCvnInfo && (
                    <p className="text-xs bg-slate-100 p-2.5 rounded-lg text-slate-700 mt-1">
                      The CVN (Card Verification Number) is the 3-digit security code printed on the back of Visa/Mastercard/JCB cards, or 4 digits on the front of American Express cards.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* 5. BUTTONS */}
            <div className="pt-6 space-y-3">
              {/* Back Button */}
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-base transition-colors cursor-pointer disabled:opacity-50"
              >
                Back
              </button>

              {/* Next / Pay Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#d9232e] hover:bg-[#b81b24] text-white font-extrabold text-lg shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Processing Transaction...' : 'Next'}
              </button>
            </div>
          </form>

          {/* Footer Security Badge */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#39b54a]" />
            <span>Secured by ANZ Worldline Solutions Gateway</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ANZWorldlineHostedCheckoutSimulator;
