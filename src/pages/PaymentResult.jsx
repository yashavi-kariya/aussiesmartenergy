import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2, XCircle, AlertTriangle, RefreshCw,
  Home, PhoneCall, Copy, Check
} from 'lucide-react';
import api from '../utils/api';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const paymentId = searchParams.get('paymentId');
  const hostedCheckoutId = searchParams.get('hostedCheckoutId');
  const queryStatus = searchParams.get('status');

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const idToUse = paymentId || hostedCheckoutId;

    if (!idToUse) {
      setError('Invalid or missing Payment Reference in query parameters.');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/payments/${idToUse}/status`, {
          params: { hostedCheckoutId, status: queryStatus },
        });
        if (response.data && response.data.success) {
          setPayment(response.data.data);
        } else {
          setError(response.data?.message || 'Could not verify transaction status.');
        }
      } catch (err) {
        console.error('Payment status verification error:', err);
        setError(err.response?.data?.message || 'Error communicating with backend payment server.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [paymentId, hostedCheckoutId, queryStatus]);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className="min-h-screen bg-slate-50/50 pt-36 sm:pt-40 lg:pt-44 pb-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden"
      >
        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center space-y-4">
            <RefreshCw className="w-12 h-12 text-[#006ab7] animate-spin mx-auto" />
            <h2 className="text-2xl font-extrabold text-[#003b73]">Verifying Payment Status</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Please wait while our backend securely verifies your transaction status with ANZ Worldline Solutions...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <XCircle className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">Verification Error</h2>
              <p className="text-sm text-slate-500 mt-2">{error}</p>
            </div>
            <div className="flex justify-center gap-3">
              <Link
                to="/"
                className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {/* Verified SUCCESS State */}
        {!loading && !error && payment && payment.status === 'SUCCESS' && (
          <div>
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-center text-white relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/30">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2">
                ANZ Worldline Payment Verified
              </span>
              <h1 className="text-2xl sm:text-3xl font-black">Payment Successful!</h1>
              <p className="text-emerald-100 text-sm mt-1">
                Thank you, {payment.customer?.firstName}! Your order has been placed and confirmed.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Order ID</span>
                  <span className="font-mono font-bold text-slate-800 flex items-center gap-1.5">
                    {payment.orderId}
                    <button
                      onClick={() => copyToClipboard(payment.orderId)}
                      className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Copy Order ID"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </span>
                </div>

                {payment.projectNumber && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-medium">Project / Reference No.</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">{payment.projectNumber}</span>
                  </div>
                )}

                {payment.transactionId && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-medium">Transaction ID</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">{payment.transactionId}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Package</span>
                  <span className="font-bold text-[#003b73]">{payment.packageDetails?.title || 'Solar Package'}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Amount Paid</span>
                  <span className="font-extrabold text-emerald-600 text-lg">
                    ${payment.amount?.toLocaleString('en-AU', { minimumFractionDigits: 2 })} {payment.currency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Date &amp; Time</span>
                  <span className="text-xs text-slate-600">{formatDate(payment.createdAt)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#003b73] hover:bg-[#002850] text-white font-extrabold text-sm shadow-md transition-all"
                >
                  <Home className="w-4 h-4" /> Return to Home
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4" /> Contact Support
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Verified CANCELLED State */}
        {!loading && !error && payment && payment.status === 'CANCELLED' && (
          <div>
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/30">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-black">Payment Cancelled</h1>
              <p className="text-amber-100 text-sm mt-1">
                You cancelled the checkout session before completing payment.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 leading-relaxed">
                No charges were processed for Order <strong>{payment.orderId}</strong>. You can try completing your order again whenever you are ready.
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#006ab7] hover:bg-[#005596] text-white font-extrabold text-sm shadow-md transition-all text-center cursor-pointer"
                >
                  Try Again
                </button>
                <Link
                  to="/"
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all text-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Verified FAILED State */}
        {!loading && !error && payment && payment.status === 'FAILED' && (
          <div>
            <div className="bg-gradient-to-r from-rose-600 to-red-700 p-8 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/30">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-black">Payment Failed</h1>
              <p className="text-rose-100 text-sm mt-1">
                The transaction was declined or could not be completed.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-800 leading-relaxed">
                Order <strong>{payment.orderId}</strong> could not be charged. Please check your payment details or contact your bank card issuer.
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md transition-all text-center cursor-pointer"
                >
                  Retry Payment
                </button>
                <Link
                  to="/"
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all text-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
};

export default PaymentResult;
