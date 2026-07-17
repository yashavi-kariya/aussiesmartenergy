import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, RefreshCw, Filter, Trash2, Eye, LogOut, ChevronLeft,
  ChevronRight, Calendar, Mail, Phone, MapPin, MessageSquare,
  FileText, Zap, ArrowUpDown, X, CheckSquare
} from 'lucide-react';
import api from '../utils/api';

const NAVY = '#1d2e57ff';
const NAVY_DARK = '#0f1c3fff';
const NAVY_LIGHT = '#213885ff';
const NAVY_MID = '#133ea1ff';
const GREEN = '#39b54a';
const GREEN_DARK = '#2e9a3d';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, hero: 0, contact: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [formType, setFormType] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/enquiries', {
        params: { page, limit, search: debouncedSearch, formType, sortBy, sortOrder },
      });
      if (response.data && response.data.success) {
        const { enquiries: fetchedEnquiries, pagination } = response.data.data;
        setEnquiries(fetchedEnquiries);
        setTotalPages(pagination.totalPages);
        setTotalItems(pagination.total);
        fetchStats();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching enquiries.');
      if (err.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const totalRes = await api.get('/enquiries', { params: { limit: 1000 } });
      if (totalRes.data && totalRes.data.success) {
        const list = totalRes.data.data.enquiries;
        setStats({
          total: list.length,
          hero: list.filter(e => e.formType === 'hero').length,
          contact: list.filter(e => e.formType === 'contact').length,
        });
      }
    } catch (err) {
      console.error('Error fetching statistics', err);
    }
  };

  useEffect(() => { fetchEnquiries(); }, [page, limit, debouncedSearch, formType, sortBy, sortOrder]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login/admin');
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await api.delete(`/enquiries/${deleteId}`);
      if (response.data && response.data.success) {
        setDeleteId(null);
        setDeleteConfirmText('');
        if (enquiries.length === 1 && page > 1) setPage(page - 1);
        else fetchEnquiries();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting enquiry.');
    }
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

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: `linear-gradient(160deg, ${NAVY_DARK} 0%, ${NAVY} 60%, ${NAVY_MID} 100%)` }}
    >
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between"
        style={{
          background: `${NAVY_DARK}f0`,
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: `${GREEN}18`, border: `1.5px solid ${GREEN}35` }}
          >
            <Zap className="w-5 h-5" style={{ color: GREEN }} />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Aussie Smart Energy
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: `${GREEN}22`, color: GREEN, border: `1px solid ${GREEN}40` }}
              >
                Admin Portal
              </span>
            </h1>
            <p className="text-xs text-white/40">Manage customer enquiries</p>
          </div>
        </div>

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
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: 'Total Enquiries', value: stats.total, icon: FileText, color: '#60a5fa' },
            { label: 'Hero Form', value: stats.hero, icon: CheckSquare, color: GREEN },
            { label: 'Contact Form', value: stats.contact, icon: MessageSquare, color: '#f97316' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 rounded-2xl flex items-center justify-between"
              style={{
                background: `linear-gradient(135deg, ${NAVY_LIGHT}80, ${NAVY_MID}80)`,
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              }}
            >
              <div>
                <p className="text-white/50 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-extrabold text-white mt-1">{stat.value}</h3>
              </div>
              <div
                className="p-4 rounded-xl"
                style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters Bar */}
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
              onFocus={e => e.target.style.border = `1px solid ${GREEN}50`}
              onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
              placeholder="Search by name, email, message..."
            />
          </div>

          <div className="flex flex-wrap w-full md:w-auto items-center gap-3 justify-end">
            {/* Form Type Filter */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Filter className="w-4 h-4 text-white/40" />
              <select
                value={formType}
                onChange={(e) => { setFormType(e.target.value); setPage(1); }}
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                <option value="" style={{ background: NAVY }}>All Types</option>
                <option value="hero" style={{ background: NAVY }}>Hero Form</option>
                <option value="contact" style={{ background: NAVY }}>Contact Form</option>
              </select>
            </div>

            {/* Limit */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <select
                value={limit}
                onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
              >
                {[5, 10, 25, 50].map(n => (
                  <option key={n} value={n} style={{ background: NAVY }}>{n} per page</option>
                ))}
              </select>
            </div>

            {/* Refresh */}
            <button
              onClick={fetchEnquiries}
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
                  {[
                    { label: 'Type', field: 'formType' },
                    { label: 'Name', field: 'firstName' },
                    { label: 'Email', field: null },
                    { label: 'Phone', field: null },
                    { label: 'Address', field: null },
                    { label: 'Submitted At', field: 'createdAt' },
                  ].map(col => (
                    <th key={col.label} className="px-5 py-4">
                      {col.field ? (
                        <button
                          onClick={() => toggleSort(col.field)}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          {col.label} <ArrowUpDown className="w-3 h-3" />
                        </button>
                      ) : col.label}
                    </th>
                  ))}
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-14 text-white/40">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-8 h-8 animate-spin" style={{ color: GREEN }} />
                        <span>Loading enquiries...</span>
                      </div>
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-14 text-white/30 text-sm">
                      No enquiries found matching the criteria.
                    </td>
                  </tr>
                ) : enquiries.map((enquiry, idx) => (
                  <tr
                    key={enquiry._id}
                    className="transition-colors text-sm"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(57,181,74,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent'}
                  >
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold"
                        style={
                          enquiry.formType === 'hero'
                            ? { background: `${GREEN}18`, color: GREEN, border: `1px solid ${GREEN}35` }
                            : { background: 'rgba(96,165,250,0.12)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.25)' }
                        }
                      >
                        {enquiry.formType === 'hero' ? 'Hero Form' : 'Contact Us'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-semibold text-white">
                      {enquiry.firstName} {enquiry.lastName}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-white/60">{enquiry.email}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-white/60">{enquiry.phone}</td>
                    <td className="px-5 py-3.5 max-w-[160px] truncate text-white/50" title={enquiry.address}>
                      {enquiry.address || '—'}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-xs text-white/35">
                      {formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="p-1.5 rounded-lg inline-flex items-center justify-center transition-all duration-150"
                        style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa' }}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(enquiry._id)}
                        className="p-1.5 rounded-lg inline-flex items-center justify-center transition-all duration-150"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
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
                Showing{' '}
                <span className="font-bold text-white">{Math.min((page - 1) * limit + 1, totalItems)}</span>
                {' – '}
                <span className="font-bold text-white">{Math.min(page * limit, totalItems)}</span>
                {' of '}
                <span className="font-bold text-white">{totalItems}</span> enquiries
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
                <span className="text-white/60 text-xs font-semibold px-2">
                  {page} / {totalPages}
                </span>
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

      {/* ─── View Details Modal ─── */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,16,32,0.85)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col max-h-[85vh]"
              style={{
                background: `linear-gradient(145deg, ${NAVY_LIGHT}, ${NAVY_MID})`,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* Green accent bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${GREEN}, ${GREEN_DARK})` }} />

              <div
                className="p-5 flex items-center justify-between"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: `${NAVY_DARK}60` }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={
                      selectedEnquiry.formType === 'hero'
                        ? { background: `${GREEN}18`, color: GREEN, border: `1px solid ${GREEN}35` }
                        : { background: 'rgba(96,165,250,0.12)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.25)' }
                    }
                  >
                    {selectedEnquiry.formType === 'hero' ? 'Hero Form' : 'Contact Form'}
                  </span>
                  <span className="text-white/30 text-xs flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(selectedEnquiry.createdAt)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1.5 rounded-lg text-white/30 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedEnquiry.firstName} {selectedEnquiry.lastName}</h3>
                  <p className="text-sm text-white/35 mt-0.5">Customer Enquiry Details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Mail, label: 'Email Address', value: selectedEnquiry.email, href: `mailto:${selectedEnquiry.email}`, green: true },
                    { icon: Phone, label: 'Phone Number', value: selectedEnquiry.phone, href: `tel:${selectedEnquiry.phone}`, mono: true },
                  ].map(({ icon: Icon, label, value, href, green, mono }) => (
                    <div
                      key={label}
                      className="p-3.5 rounded-xl flex items-center gap-3"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <Icon className="w-5 h-5 text-white/30 shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs text-white/35 font-medium">{label}</p>
                        <a href={href} className={`text-sm block truncate ${mono ? 'font-mono text-white' : ''}`} style={green ? { color: GREEN } : {}}>
                          {value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="p-3.5 rounded-xl flex items-start gap-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <MapPin className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/35 font-medium">Address</p>
                    <p className="text-sm text-white mt-0.5">{selectedEnquiry.address || 'No Address Provided'}</p>
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-white/30" />
                    <p className="text-xs text-white/35 font-medium">Message</p>
                  </div>
                  <div
                    className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed p-3 rounded-lg min-h-[72px]"
                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {selectedEnquiry.message ||
                      <span className="italic text-white/25">No message provided (Hero section brief sign-up)</span>
                    }
                  </div>
                </div>
              </div>

              <div
                className="p-5 flex justify-end gap-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: `${NAVY_DARK}40` }}
              >
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-5 py-2.5 rounded-xl text-white/70 hover:text-white text-sm font-semibold transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  Close
                </button>
                <button
                  onClick={() => { const id = selectedEnquiry._id; setSelectedEnquiry(null); setDeleteId(id); }}
                  className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all flex items-center gap-1.5"
                  style={{ background: 'rgba(239,68,68,0.8)', border: '1px solid rgba(239,68,68,0.4)' }}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Delete Confirmation Modal ─── */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,16,32,0.90)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl overflow-hidden p-6 space-y-5"
              style={{
                background: `linear-gradient(145deg, ${NAVY_LIGHT}, ${NAVY_MID})`,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
                  <Trash2 className="w-6 h-6" style={{ color: '#f87171' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Delete Enquiry</h3>
                  <p className="text-xs text-white/35">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-sm text-white/55">
                Are you sure you want to permanently delete this customer enquiry from MongoDB Atlas?
              </p>

              <div>
                <label className="block text-xs text-white/40 font-bold mb-2 uppercase tracking-wide">
                  Type <span className="font-mono text-white/70">DELETE</span> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full py-2 px-3 text-white text-sm rounded-xl outline-none font-mono"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  placeholder="DELETE"
                />
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <button
                  onClick={() => { setDeleteId(null); setDeleteConfirmText(''); }}
                  className="px-4 py-2 rounded-xl text-white/70 hover:text-white text-sm font-semibold transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteConfirmText !== 'DELETE'}
                  className="px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-30"
                  style={{ background: 'rgba(239,68,68,0.85)', border: '1px solid rgba(239,68,68,0.4)' }}
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
