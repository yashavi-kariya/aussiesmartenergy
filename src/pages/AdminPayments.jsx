import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, RefreshCw, Filter, Eye, LogOut, ChevronLeft,
  ChevronRight, Calendar, Mail, Phone, MapPin, CreditCard,
  Zap, ArrowUpDown, X, FileText, Star, Image as ImageIcon,
  Megaphone, CheckCircle2, XCircle, AlertTriangle, ShieldCheck
} from 'lucide-react';
import api from '../utils/api';
import AdminHeader from '../components/AdminHeader';

const NAVY = '#1d2e57ff';
const NAVY_DARK = '#0f1c3fff';
const NAVY_LIGHT = '#213885ff';
const NAVY_MID = '#133ea1ff';
const GREEN = '#39b54a';

const AdminPayments = () => {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ total: 0, success: 0, pending: 0, failed: 0, cancelled: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [syncing, setSyncing] = useState(false);

  const handleSyncPayment = async (payment) => {
    if (!payment) return;
    setSyncing(true);
    try {
      const res = await api.post(`/payments/${payment._id}/sync`);
      if (res.data?.success && res.data.data) {
        setSelectedPayment(res.data.data);
        fetchPayments();
      }
    } catch (err) {
      console.error('Error syncing payment with ANZ:', err);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchPayments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/payments/admin/all', {
        params: { page, limit, search: debouncedSearch, status: statusFilter, sortBy, sortOrder },
      });
      if (response.data && response.data.success) {
        const { payments: fetchedPayments, pagination, stats: fetchedStats } = response.data.data;
        setPayments(fetchedPayments);
        setTotalPages(pagination.totalPages);
        setTotalItems(pagination.total);
        if (fetchedStats) setStats(fetchedStats);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching payment records.');
      if (err.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page, limit, debouncedSearch, statusFilter, sortBy, sortOrder]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login/admin');
  };

  const toggleSort = (field) => {
    if (sortBy === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortOrder('desc'); }
    setPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    }
    if (num >= 100_000) {
      return `$${(num / 1_000).toFixed(1)}k`;
    }
    return `$${num.toLocaleString('en-AU', { maximumFractionDigits: 2 })}`;
  };

  const getFullCurrency = (val) => {
    const num = Number(val) || 0;
    return `$${num.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AUD`;
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: `linear-gradient(160deg, ${NAVY_DARK} 0%, ${NAVY} 60%, ${NAVY_MID} 100%)` }}
    >
      {/* Header */}
      <AdminHeader activeSection="payments" subtitle="ANZ Worldline Solutions Payment Dashboard" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6 min-w-0">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Total Transactions', value: Number(stats.total || 0).toLocaleString('en-AU'), subtitle: 'All time payment attempts', icon: CreditCard, color: '#60a5fa' },
            { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), subtitle: 'Total payment amount', icon: ShieldCheck, color: GREEN, highlight: true },
            { label: 'Successful', value: Number(stats.success || 0).toLocaleString('en-AU'), subtitle: 'Completed transactions', icon: CheckCircle2, color: '#34d399' },
            { label: 'Pending', value: Number(stats.pending || 0).toLocaleString('en-AU'), subtitle: 'Awaiting checkout response', icon: RefreshCw, color: '#f59e0b' },
            { label: 'Failed / Cancelled', value: Number((stats.failed || 0) + (stats.cancelled || 0)).toLocaleString('en-AU'), subtitle: 'Declined or cancelled orders', icon: XCircle, color: '#f87171' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`p-5 rounded-2xl flex items-center justify-between min-w-0 transition-all ${stat.highlight ? 'ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-500/10' : ''
                }`}
              style={{
                background: stat.highlight
                  ? `linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, ${NAVY_MID}99 100%)`
                  : `linear-gradient(135deg, ${NAVY_LIGHT}80, ${NAVY_MID}80)`,
                border: stat.highlight ? '1px solid rgba(57, 181, 74, 0.35)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              }}
            >
              <div className="min-w-0 flex-1 mr-3 overflow-hidden">
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight break-all leading-snug">
                  {stat.value}
                </h3>
                {stat.subtitle && (
                  <p className="text-white/40 text-[11px] font-medium mt-1 truncate">{stat.subtitle}</p>
                )}
              </div>
              <div
                className="p-3 sm:p-3.5 rounded-xl flex-shrink-0 self-start mt-0.5"
                style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: stat.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div
          className="p-3 sm:p-4 rounded-2xl flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between"
          style={{
            background: `${NAVY_MID}99`,
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Search */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 text-white text-sm rounded-xl outline-none transition-all placeholder-white/25"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              placeholder="Search order ID, customer, transaction ID..."
            />
          </div>

          <div className="flex flex-wrap w-full md:w-auto items-center gap-2 sm:gap-3 justify-between md:justify-end">
            {/* Status Filter */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 sm:flex-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Filter className="w-4 h-4 text-white/40 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer w-full sm:w-auto"
              >
                <option value="" style={{ background: NAVY }}>All Statuses</option>
                <option value="SUCCESS" style={{ background: NAVY }}>SUCCESS</option>
                <option value="PENDING" style={{ background: NAVY }}>PENDING</option>
                <option value="FAILED" style={{ background: NAVY }}>FAILED</option>
                <option value="CANCELLED" style={{ background: NAVY }}>CANCELLED</option>
                <option value="REFUNDED" style={{ background: NAVY }}>REFUNDED</option>
              </select>
            </div>

            {/* Refresh */}
            <button
              onClick={fetchPayments}
              disabled={loading}
              className="p-2.5 rounded-xl transition-colors disabled:opacity-50 shrink-0"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} style={loading ? { color: GREEN } : {}} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${NAVY_LIGHT}60, ${NAVY_MID}80)`,
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          }}
        >
          {error && (
            <div className="p-4 text-sm" style={{ background: 'rgba(239,68,68,0.1)', borderBottom: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
              {error}
            </div>
          )}

          {/* Mobile & Tablet Responsive Cards (Exposes all 7 columns from desktop view without cutoffs) */}
          <div className="lg:hidden p-3.5 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {loading && payments.length === 0 ? (
              <div className="col-span-full text-center py-12 text-white/40">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: GREEN }} />
                <span>Loading payments...</span>
              </div>
            ) : payments.length === 0 ? (
              <div className="col-span-full text-center py-12 text-white/30 text-sm">
                No payment transactions found.
              </div>
            ) : (
              payments.map((payment) => (
                <div
                  key={payment._id}
                  className="p-4 sm:p-5 rounded-xl flex flex-col justify-between transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  }}
                >
                  <div>
                    {/* Top Header: Status & Amount */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/5 mb-3">
                      <span
                        className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={
                          payment.status === 'SUCCESS'
                            ? { background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }
                            : payment.status === 'PENDING'
                              ? { background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }
                              : payment.status === 'CANCELLED'
                                ? { background: 'rgba(251,146,60,0.15)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.3)' }
                                : { background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }
                        }
                      >
                        {payment.status}
                      </span>
                      <span className="text-base sm:text-lg font-black text-emerald-400">
                        ${payment.amount?.toLocaleString('en-AU')} {payment.currency}
                      </span>
                    </div>

                    {/* Middle: Details Grid */}
                    <div className="space-y-2.5 text-xs text-white/70 mb-4">
                      {/* Order ID */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-white/40 block mb-0.5 tracking-wider">
                          Order ID
                        </span>
                        <span className="font-mono font-bold text-white text-xs select-all break-all">
                          {payment.orderId}
                        </span>
                      </div>

                      {/* Customer */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-white/40 block mb-0.5 tracking-wider">
                          Customer
                        </span>
                        <div className="font-semibold text-white text-sm">
                          {payment.customer?.firstName} {payment.customer?.lastName}
                        </div>
                        {payment.customer?.email && (
                          <a
                            href={`mailto:${payment.customer?.email}`}
                            className="text-white/50 text-xs hover:text-emerald-400 transition-colors break-all block"
                          >
                            {payment.customer?.email}
                          </a>
                        )}
                      </div>

                      {/* Package */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-white/40 block mb-0.5 tracking-wider">
                          Package
                        </span>
                        <span className="text-white/90 font-medium">
                          {payment.packageDetails?.title || 'Solar Package'}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-white/40 text-[11px] pt-1">
                        <Calendar className="w-3.5 h-3.5 text-white/30" />
                        <span>{formatDate(payment.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/5 mt-auto">
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.25)', color: '#60a5fa' }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Full Payment Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Full Data Table */}
          <div className="hidden lg:block overflow-x-auto w-full">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ background: `${NAVY_DARK}80`, borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
                >
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Package</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && payments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-14 text-white/40">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-8 h-8 animate-spin" style={{ color: GREEN }} />
                        <span>Loading payment records...</span>
                      </div>
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-14 text-white/30 text-sm">
                      No payment transactions found.
                    </td>
                  </tr>
                ) : payments.map((payment, idx) => (
                  <tr
                    key={payment._id}
                    className="transition-colors text-sm"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                    }}
                  >
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={
                          payment.status === 'SUCCESS'
                            ? { background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }
                            : payment.status === 'PENDING'
                              ? { background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }
                              : payment.status === 'CANCELLED'
                                ? { background: 'rgba(251,146,60,0.15)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.3)' }
                                : { background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }
                        }
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-mono font-bold text-white text-xs">
                      {payment.orderId}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-semibold text-white">
                      {payment.customer?.firstName} {payment.customer?.lastName}
                      <span className="block text-xs font-normal text-white/40">{payment.customer?.email}</span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-white/70">
                      {payment.packageDetails?.title || 'Solar Package'}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-extrabold text-emerald-400">
                      ${payment.amount?.toLocaleString('en-AU')} {payment.currency}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-xs text-white/40">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="p-1.5 rounded-lg inline-flex items-center justify-center transition-all duration-150"
                        style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa' }}
                        title="View Payment Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div
              className="px-3 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: `${NAVY_DARK}60`, color: 'rgba(255,255,255,0.4)' }}
            >
              <div>
                Showing <span className="font-bold text-white">{Math.min((page - 1) * limit + 1, totalItems)}</span> – <span className="font-bold text-white">{Math.min(page * limit, totalItems)}</span> of <span className="font-bold text-white">{totalItems}</span> payments
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1 || loading}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white transition-colors disabled:opacity-30"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-white/60 text-xs font-semibold px-2">{page} / {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages || loading}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white transition-colors disabled:opacity-30"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" style={{ background: 'rgba(10,16,32,0.85)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
            >
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#003b73] to-[#006ab7] text-white flex items-center justify-between">
                <div className="min-w-0 pr-3">
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">ANZ Worldline Transaction</span>
                  <h3 className="text-base sm:text-xl font-bold truncate">{selectedPayment.orderId}</h3>
                </div>
                <button onClick={() => setSelectedPayment(null)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-slate-800 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] sm:text-xs text-slate-400 font-bold uppercase">Status</span>
                    <p className="font-extrabold text-sm sm:text-base mt-1" style={{ color: selectedPayment.status === 'SUCCESS' ? '#059669' : '#d97706' }}>
                      {selectedPayment.status}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] sm:text-xs text-slate-400 font-bold uppercase">Amount</span>
                    <p className="font-extrabold text-sm sm:text-base mt-1 text-[#003b73]">
                      ${selectedPayment.amount?.toLocaleString('en-AU')} {selectedPayment.currency}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-700">Customer Details</h4>
                  <p><strong>Name:</strong> {selectedPayment.customer?.firstName} {selectedPayment.customer?.lastName}</p>
                  <p><strong>Email:</strong> {selectedPayment.customer?.email}</p>
                  <p><strong>Phone:</strong> {selectedPayment.customer?.phone}</p>
                  <p><strong>Address:</strong> {selectedPayment.customer?.address || 'N/A'}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-slate-700">Gateway Information</h4>
                  <p><strong>Project / Ref No:</strong> <span className="font-mono text-xs bg-blue-50 text-[#003b73] px-2 py-0.5 rounded font-bold break-all">{selectedPayment.projectNumber || selectedPayment.orderId}</span></p>
                  <p><strong>Hosted Checkout ID:</strong> <span className="font-mono text-[11px] sm:text-xs bg-slate-100 p-1 rounded break-all inline-block max-w-full">{selectedPayment.hostedCheckoutId || 'N/A'}</span></p>
                  <p><strong>Transaction ID:</strong> <span className="font-mono text-[11px] sm:text-xs bg-slate-100 p-1 rounded break-all inline-block max-w-full">{selectedPayment.transactionId || 'N/A'}</span></p>
                  <p><strong>Created At:</strong> {formatDate(selectedPayment.createdAt)}</p>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleSyncPayment(selectedPayment)}
                  disabled={syncing}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-sm disabled:opacity-50 text-center"
                  style={{ background: 'linear-gradient(135deg, #003b73 0%, #006ab7 100%)' }}
                >
                  <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${syncing ? 'animate-spin' : ''}`} />
                  <span>{syncing ? 'Checking with ANZ...' : 'Sync Status with ANZ Bank'}</span>
                </button>

                <button onClick={() => setSelectedPayment(null)} className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 text-xs sm:text-sm text-center">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPayments;
