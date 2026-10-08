import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, ShieldCheck, Loader2, ArrowRight, CreditCard, Lock } from 'lucide-react';
import api from '../utils/api';
import { SupportedPaymentLogos, ANZWorldlineLogo } from './PaymentLogos';

const Field = ({ id, label, icon: Icon, type = 'text', placeholder, required, value, onChange, error, maxLength }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5 text-[#006ab7]" />
      {label}{required && <span className="text-rose-500">*</span>}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all
        focus:ring-2 focus:ring-blue-400 focus:border-transparent
        ${error ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50 focus:bg-white'}`}
    />
    {error && (
      <p className="text-[11px] text-rose-500 font-medium mt-0.5">{error}</p>
    )}
  </div>
);

const CheckoutModal = ({
  isOpen,
  onClose,
  packageDetails = {
    title: 'GoodWe Solar Battery Package',
    price: 2499,
    currency: 'AUD',
    subtitle: 'High performance residential solar battery storage system',
    packageId: 'goodwe-24kwh',
    formType: 'battery-package',
  },
}) => {
  const empty = { firstName: '', lastName: '', email: '', phone: '', address: '' };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [serverMsg, setServerMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setForm(empty);
      setErrors({});
      setStatus('idle');
      setServerMsg('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handlePageReset = () => {
      setStatus('idle');
    };
    window.addEventListener('pageshow', handlePageReset);
    window.addEventListener('popstate', handlePageReset);
    return () => {
      window.removeEventListener('pageshow', handlePageReset);
      window.removeEventListener('popstate', handlePageReset);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) {
      e.firstName = 'First name is required';
    } else if (/\d/.test(form.firstName)) {
      e.firstName = 'First name cannot contain numbers';
    }

    if (!form.lastName.trim()) {
      e.lastName = 'Last name is required';
    } else if (/\d/.test(form.lastName)) {
      e.lastName = 'Last name cannot contain numbers';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (form.email.includes(',') || form.email.includes(';') || (form.email.match(/@/g) || []).length > 1) {
      e.email = 'Only a single email address is allowed';
    } else if (!emailRegex.test(form.email.trim())) {
      e.email = 'Enter a single valid email address';
    }

    if (!form.phone.trim()) {
      e.phone = 'Phone number is required';
    } else {
      const digits = form.phone.replace(/\D/g, '');
      if (digits.length !== 10) {
        e.phone = 'Phone number must be a 10-digit Australian number';
      } else if (!/^(0[23478]\d{8}|1[38]00\d{6}|0\d{9})$/.test(digits)) {
        e.phone = 'Please enter a valid 10-digit Australian phone number';
      }
    }

    return e;
  };

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
    }

    setForm((f) => ({ ...f, [field]: rawVal }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: '' }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    setServerMsg('');

    try {
      const response = await api.post('/payments/create', {
        ...form,
        amount: packageDetails.price || 2499,
        currency: packageDetails.currency || 'AUD',
        packageDetails,
      });

      if (response.data && response.data.success && response.data.data.redirectUrl) {
        // Redirect customer to ANZ Worldline Hosted Checkout
        window.location.href = response.data.data.redirectUrl;
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('error');
        setServerMsg('Failed to initialize ANZ Worldline Hosted Checkout session.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setStatus('error');
      setServerMsg(err?.response?.data?.message || 'Payment initiation failed. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(10,20,50,0.65)' }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-5 text-white bg-gradient-to-r from-[#003b73] via-[#006ab7] to-[#0a192f]">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-blue-200 tracking-wider mb-1">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>ANZ Worldline Hosted Checkout</span>
              </div>
              <h2 className="text-xl font-extrabold">{packageDetails.title}</h2>
              <p className="text-blue-100/90 text-xs mt-1 leading-relaxed">
                {packageDetails.subtitle || 'Complete your purchase securely via ANZ Worldline Solutions.'}
              </p>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price Summary Banner */}
            <div className="px-6 py-3.5 bg-blue-50/80 border-b border-blue-100/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Order Total Amount</span>
                <div className="text-xl font-black text-[#003b73]">
                  ${(packageDetails.price || 2499).toLocaleString('en-AU', { minimumFractionDigits: 2 })} <span className="text-xs font-bold text-slate-500">{packageDetails.currency || 'AUD'}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Secured
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handlePaymentSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] sm:max-h-[80vh] overflow-y-auto" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field id="firstName" label="First Name" icon={User} placeholder="John" required value={form.firstName} onChange={handleChange('firstName')} error={errors.firstName} />
                <Field id="lastName" label="Last Name" icon={User} placeholder="Smith" required value={form.lastName} onChange={handleChange('lastName')} error={errors.lastName} />
              </div>

              <Field id="email" label="Email Address" icon={Mail} type="email" placeholder="john.smith@example.com" required value={form.email} onChange={handleChange('email')} error={errors.email} />
              <Field id="phone" label="Phone Number" icon={Phone} type="tel" placeholder="04XX XXX XXX" required value={form.phone} onChange={handleChange('phone')} error={errors.phone} maxLength={16} />
              <Field id="address" label="Installation Address" icon={MapPin} placeholder="Street address, suburb, state" value={form.address} onChange={handleChange('address')} error={errors.address} />

              {status === 'error' && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
                  {serverMsg}
                </div>
              )}

              {/* Supported Payment Logos Callout */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <ANZWorldlineLogo className="h-5 w-auto" />
                    <span className="text-[11px]">Accepted Payments</span>
                  </div>
                  <span className="text-emerald-600 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Verified Partner</span>
                </div>
                <SupportedPaymentLogos />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 bg-gradient-to-r from-[#003b73] via-[#006ab7] to-[#39b54a] hover:opacity-95 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connecting to ANZ Worldline...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Pay Now with ANZ Worldline (${(packageDetails.price || 2499).toLocaleString('en-AU')})</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <span>Protected by ANZ Worldline Solutions Hosted Checkout</span>
                <span>•</span>
                <span>No raw card details stored locally</span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;

