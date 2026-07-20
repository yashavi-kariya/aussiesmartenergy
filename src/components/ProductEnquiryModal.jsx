import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, MessageSquare, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import api from '../utils/api';

const ProductEnquiryModal = ({ isOpen, onClose, productName, formType, accentColor = '#dc2626' }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('loading');
    setServerError('');
    try {
      await api.post('/enquiries', {
        ...form,
        formType,
        source: 'product-card',
      });
      setStatus('success');
    } catch (err) {
      const errData = err.response?.data;
      const detail = errData?.errors?.[0]?.msg || errData?.message || 'Something went wrong. Please try again.';
      setServerError(detail);
      setStatus('error');
    }
  };

  const handleClose = () => {
    if (status === 'loading') return;
    setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', message: '' });
    setErrors({});
    setStatus('idle');
    setServerError('');
    onClose();
  };

  const inputBase =
    'w-full px-4 py-2.5 rounded-xl text-sm text-gray-800 bg-white border transition-all outline-none placeholder-gray-400';
  const inputNormal = `${inputBase} border-gray-200 focus:border-[${accentColor}] focus:ring-2 focus:ring-[${accentColor}]/20`;
  const inputError = `${inputBase} border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: 'rgba(10, 20, 50, 0.75)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            style={{ background: '#fff' }}
          >
            {/* Accent bar */}
            <div className="h-1.5 w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${accentColor}80, ${accentColor})` }} />

            {/* Header */}
            <div className="px-6 pt-5 pb-4 flex items-center justify-between flex-shrink-0" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <div>
                <h2 className="text-lg font-extrabold text-[#1e2d53]">Get Discounted Price</h2>
                <p className="text-sm mt-0.5 font-medium" style={{ color: accentColor }}>
                  {productName}
                </p>
              </div>
              <button
                onClick={handleClose}
                disabled={status === 'loading'}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1">
              {status === 'success' ? (
                /* ── Success State ── */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 px-8 text-center"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                    style={{ background: `${accentColor}18` }}
                  >
                    <CheckCircle className="w-10 h-10" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1e2d53] mb-2">Enquiry Sent!</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                    Thank you for your interest in <strong>{productName}</strong>. Our team will get back to you shortly with a discounted quote.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 px-8 py-3 rounded-xl font-bold text-white text-sm transition-all shadow-md hover:shadow-lg"
                    style={{ background: accentColor }}
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
                  {/* Server error */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {serverError}
                    </div>
                  )}

                  {/* First + Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className={`${errors.firstName ? inputError : inputNormal} pl-9`}
                        />
                      </div>
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Smith"
                          className={`${errors.lastName ? inputError : inputNormal} pl-9`}
                        />
                      </div>
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`${errors.email ? inputError : inputNormal} pl-9`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="04XX XXX XXX"
                        className={`${errors.phone ? inputError : inputNormal} pl-9`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Address <span className="text-gray-400 font-normal normal-case">(optional)</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="123 Solar St, Sydney NSW 2000"
                        className={`${inputNormal} pl-9`}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Message <span className="text-gray-400 font-normal normal-case">(optional)</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your property, energy usage, or any questions..."
                        rows={3}
                        className={`${inputNormal} pl-9 resize-none`}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-60 mt-2"
                    style={{ background: accentColor }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending Enquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Enquiry
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 pb-2">
                    We'll respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductEnquiryModal;
