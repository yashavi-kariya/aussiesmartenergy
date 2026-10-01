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
      <header
        className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between"
        style={{
          background: `${NAVY_DARK}f0`,
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
          <div
            className="p-2.5 rounded-xl"
            style={{ background: `${GREEN}18`, border: `1.5px solid ${GREEN}35` }}
          >
            <CreditCard className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Aussie Smart Energy
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: `rgba(16,185,129,0.2)`, color: '#a7f3d0', border: `1px solid rgba(16,185,129,0.3)` }}
              >
                Payments &amp; Transactions
              </span>
            </h1>
            <p className="text-xs text-white/40">ANZ Worldline Solutions Payment Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#e2e8f0',
            }}
          >
            <FileText className="w-4 h-4" />
            Enquiries
          </button>

          <button
            onClick={() => navigate('/admin/projects')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.25)',
              color: '#bfdbfe',
            }}
          >
            <Zap className="w-4 h-4" />
            Projects
          </button>

          <button
            onClick={() => navigate('/admin/reviews')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(250,204,21,0.12)',
              border: '1px solid rgba(250,204,21,0.25)',
              color: '#fef08a',
            }}
          >
            <Star className="w-4 h-4 text-yellow-400" />
            Reviews
          </button>

          <button
            onClick={() => navigate('/admin/banners')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.25)',
              color: '#a7f3d0',
            }}
          >
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            Banners
          </button>

          <button
            onClick={() => navigate('/admin/headlines')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(57,181,74,0.12)',
              border: '1px solid rgba(57,181,74,0.25)',
              color: '#bbf7d0',
            }}
          >
            <Megaphone className="w-4 h-4 text-emerald-400" />
            Headlines
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#fca5a5',
            }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">
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
              className={`p-5 rounded-2xl flex items-center justify-between min-w-0 transition-all ${
                stat.highlight ? 'ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-500/10' : ''
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
          className="p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between"
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

          <div className="flex flex-wrap w-full md:w-auto items-center gap-3 justify-end">
            {/* Status Filter */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Filter className="w-4 h-4 text-white/40" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
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
              className="p-2.5 rounded-xl transition-colors disabled:opacity-50"
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

          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left">
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
              className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,16,32,0.85)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden flex flex-col max-h-[85vh] shadow-2xl"
            >
              <div className="p-5 bg-gradient-to-r from-[#003b73] to-[#006ab7] text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">ANZ Worldline Transaction</span>
                  <h3 className="text-xl font-bold">{selectedPayment.orderId}</h3>
                </div>
                <button onClick={() => setSelectedPayment(null)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-slate-800 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-400 font-bold uppercase">Status</span>
                    <p className="font-extrabold text-base mt-1" style={{ color: selectedPayment.status === 'SUCCESS' ? '#059669' : '#d97706' }}>
                      {selectedPayment.status}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-400 font-bold uppercase">Amount</span>
                    <p className="font-extrabold text-base mt-1 text-[#003b73]">
                      ${selectedPayment.amount?.toLocaleString('en-AU')} {selectedPayment.currency}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-700">Customer Details</h4>
                  <p><strong>Name:</strong> {selectedPayment.customer?.firstName} {selectedPayment.customer?.lastName}</p>
                  <p><strong>Email:</strong> {selectedPayment.customer?.email}</p>
                  <p><strong>Phone:</strong> {selectedPayment.customer?.phone}</p>
                  <p><strong>Address:</strong> {selectedPayment.customer?.address || 'N/A'}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-slate-700">Gateway Information</h4>
                  <p><strong>Project / Ref No:</strong> <span className="font-mono text-xs bg-blue-50 text-[#003b73] px-2 py-0.5 rounded font-bold">{selectedPayment.projectNumber || selectedPayment.orderId}</span></p>
                  <p><strong>Hosted Checkout ID:</strong> <span className="font-mono text-xs bg-slate-100 p-1 rounded">{selectedPayment.hostedCheckoutId || 'N/A'}</span></p>
                  <p><strong>Transaction ID:</strong> <span className="font-mono text-xs bg-slate-100 p-1 rounded">{selectedPayment.transactionId || 'N/A'}</span></p>
                  <p><strong>Created At:</strong> {formatDate(selectedPayment.createdAt)}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button onClick={() => setSelectedPayment(null)} className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 text-sm">
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
