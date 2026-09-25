/**
 * EnquiryModal — Reusable enquiry form modal
 *
 * Usage:
 *   <EnquiryModal
 *     isOpen={open}
 *     onClose={() => setOpen(false)}
 *     formType="savings-check"          // any valid formType string
 *     title="Check Your Savings"        // optional custom title
 *     subtitle="Tell us about your home and we'll calculate your potential savings."
 *     accentColor="#1a7a44"             // optional hex for the header gradient
 *   />
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, MessageSquare, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import api from '../utils/api';

/* ─────────────────────────────────────────────────────────
   Field is defined OUTSIDE EnquiryModal so React never
   recreates the component function on re-renders —
   keeping keyboard focus stable while the user types.
───────────────────────────────────────────────────────── */
const Field = ({ id, label, icon: Icon, type = 'text', placeholder, required, textarea, value, onChange, error, accentColor }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" style={{ color: accentColor }} />
      {label}{required && <span className="text-rose-500">*</span>}
    </label>
    {textarea ? (
      <textarea
        id={id}
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all resize-none
          focus:ring-2 focus:border-transparent
          ${error ? 'border-rose-400 bg-rose-50 focus:ring-rose-300' : 'border-slate-200 bg-slate-50 focus:bg-white'}`}
        style={{ '--accent': accentColor }}
      />
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all
          focus:ring-2 focus:border-transparent
          ${error ? 'border-rose-400 bg-rose-50 focus:ring-rose-300' : 'border-slate-200 bg-slate-50 focus:bg-white'}`}
        style={{ '--accent': accentColor }}
      />
    )}
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[11px] text-rose-500 font-medium flex items-center gap-1 mt-0.5"
      >
        <AlertCircle className="w-3 h-3" />{error}
      </motion.p>
    )}
  </div>
);

const EnquiryModal = ({
  isOpen,
  onClose,
  formType = 'general',
  title = 'Send an Enquiry',
  subtitle = 'Fill in your details and our team will get back to you shortly.',
  accentColor = '#1a7a44',
}) => {
  const empty = { firstName: '', lastName: '', email: '', phone: '', address: '', message: '' };
  const [form, setForm]       = useState(empty);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('');

  /* Reset form when modal opens */
  useEffect(() => {
    if (isOpen) { setForm(empty); setErrors({}); setStatus('idle'); setServerMsg(''); }
  }, [isOpen]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim())  e.lastName  = 'Last name is required';
    if (!form.email.trim())     e.email     = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim())     e.phone     = 'Phone number is required';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    try {
      await api.post('/enquiries', { ...form, formType, source: 'website' });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerMsg(err?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };



  return (
    <AnimatePresence>
      {isOpen && (
        /* Backdrop */
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(10,20,50,0.65)' }}
          onClick={onClose}
        >
          {/* Modal card */}
          <motion.div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.8 }}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div
              className="relative px-6 pt-6 pb-5 text-white overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${accentColor}ee 0%, ${accentColor}bb 100%)` }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 right-16 w-16 h-16 rounded-full bg-white/10" />

              <div className="relative z-10">
                <h2 className="text-xl font-extrabold leading-tight">{title}</h2>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">{subtitle}</p>
              </div>

              {/* Close */}
              <motion.button
                onClick={onClose}
                className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors"
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.18 }}
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* ── Body ── */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              <AnimatePresence mode="wait">

                {/* SUCCESS state */}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: `${accentColor}18`, border: `2px solid ${accentColor}` }}
                    >
                      <CheckCircle className="w-8 h-8" style={{ color: accentColor }} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-800">Thank you!</h3>
                      <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
                        We've received your enquiry and our team will contact you shortly.
                      </p>
                    </div>
                    <motion.button
                      onClick={onClose}
                      className="mt-2 px-6 py-2 rounded-full text-sm font-bold text-white"
                      style={{ background: accentColor }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                )}

                {/* FORM state */}
                {status !== 'success' && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-3.5"
                    noValidate
                  >
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <Field id="firstName" label="First Name" icon={User}           placeholder="John"                  required accentColor={accentColor} value={form.firstName} onChange={handleChange('firstName')} error={errors.firstName} />
                      <Field id="lastName"  label="Last Name"  icon={User}           placeholder="Smith"                 required accentColor={accentColor} value={form.lastName}  onChange={handleChange('lastName')}  error={errors.lastName} />
                    </div>

                    <Field id="email"   label="Email Address" icon={Mail}   type="email" placeholder="john@example.com"    required accentColor={accentColor} value={form.email}   onChange={handleChange('email')}   error={errors.email} />
                    <Field id="phone"   label="Phone Number"  icon={Phone}  type="tel"   placeholder="04XX XXX XXX"         required accentColor={accentColor} value={form.phone}   onChange={handleChange('phone')}   error={errors.phone} />
                    <Field id="address" label="Address"       icon={MapPin}              placeholder="Your suburb / postcode"         accentColor={accentColor} value={form.address} onChange={handleChange('address')} error={errors.address} />
                    <Field id="message" label="Message"       icon={MessageSquare}       placeholder="Any additional details..." textarea accentColor={accentColor} value={form.message} onChange={handleChange('message')} error={errors.message} />

                    {/* Server error */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium px-3 py-2 rounded-xl"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {serverMsg}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all relative overflow-hidden mt-1"
                      style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)` }}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Sheen on hover */}
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-xl"
                        initial={{ x: '-110%' }}
                        whileHover={{ x: '110%' }}
                        transition={{ duration: 0.5 }}
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                      />
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting…</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[10px] text-slate-400">
                      🔒 Your information is secure and will never be shared.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
