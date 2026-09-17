import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Flame, Sparkles, Gift, Megaphone, AlertCircle,
  Tag, Sun, Award, LogOut, ChevronLeft, RefreshCw,
  Trash2, Edit3, Plus, X, Search, CheckCircle2,
  FileText, Star, Image as ImageIcon, ArrowRight,
  ExternalLink, Eye, Layers, Filter, Check
} from 'lucide-react';
import api from '../utils/api';

const NAVY = '#1d2e57ff';
const NAVY_DARK = '#0f1c3fff';
const NAVY_LIGHT = '#213885ff';
const NAVY_MID = '#133ea1ff';
const GREEN = '#39b54a';
const GREEN_DARK = '#2e9a3d';

const ICONS = [
  { id: 'zap', label: 'Lightning', icon: Zap },
  { id: 'flame', label: 'Flame', icon: Flame },
  { id: 'sparkles', label: 'Sparkles', icon: Sparkles },
  { id: 'gift', label: 'Gift / Offer', icon: Gift },
  { id: 'megaphone', label: 'Megaphone', icon: Megaphone },
  { id: 'alert', label: 'Alert / Notice', icon: AlertCircle },
  { id: 'tag', label: 'Discount Tag', icon: Tag },
  { id: 'sun', label: 'Solar Sun', icon: Sun },
  { id: 'award', label: 'Award', icon: Award },
];

const THEMES = [
  {
    id: 'navy-green',
    name: 'Aussie Solar (Navy & Green)',
    previewBg: 'from-[#0a142c] via-[#102a6b] to-[#0a142c]',
    accentColor: '#39b54a',
    badgeClass: 'bg-[#39b54a]/20 text-[#39b54a] border-[#39b54a]/40',
    btnClass: 'bg-[#39b54a] text-white',
  },
  {
    id: 'solar-amber',
    name: 'Golden Sun (Solar Amber)',
    previewBg: 'from-[#291404] via-[#78350f] to-[#291404]',
    accentColor: '#f59e0b',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    btnClass: 'bg-amber-500 text-slate-950 font-bold',
  },
  {
    id: 'crimson',
    name: 'Urgent Red (Crimson Alert)',
    previewBg: 'from-[#2c0b0e] via-[#881337] to-[#2c0b0e]',
    accentColor: '#f43f5e',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    btnClass: 'bg-rose-600 text-white',
  },
  {
    id: 'electric-blue',
    name: 'Clean Cyan (Electric Sky)',
    previewBg: 'from-[#082338] via-[#0369a1] to-[#082338]',
    accentColor: '#38bdf8',
    badgeClass: 'bg-sky-400/20 text-sky-300 border-sky-400/40',
    btnClass: 'bg-sky-500 text-white',
  },
  {
    id: 'dark-slate',
    name: 'Modern Slate (Deep Emerald)',
    previewBg: 'from-[#0b0f19] via-[#1e293b] to-[#0b0f19]',
    accentColor: '#10b981',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    btnClass: 'bg-emerald-500 text-slate-950 font-bold',
  },
];

const PRESET_BADGES = [
  'Limited Scheme',
  'Special Offer',
  'Govt Rebate',
  'Vic Rebate Alert',
  'New Promotion',
  'Zero Deposit',
  'Free Audit',
];

const AdminHeadlines = () => {
  const navigate = useNavigate();

  const [headlines, setHeadlines] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filtering
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHeadline, setEditingHeadline] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, headline: null });

  // Form State
  const [formData, setFormData] = useState({
    text: '',
    badge: 'Special Offer',
    link: '/solar/6.6kw',
    linkText: 'Check Eligibility',
    icon: 'zap',
    theme: 'navy-green',
    isActive: true,
    displayOrder: 0,
  });

  const showSuccessToast = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 4000);
  };

  const fetchHeadlines = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/headlines/admin/all', {
        params: { search, status: statusFilter },
      });
      if (res.data?.success) {
        setHeadlines(res.data.data.headlines || []);
        if (res.data.data.stats) {
          setStats(res.data.data.stats);
        }
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load headlines');
      if (err?.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadlines();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHeadlines();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login/admin');
  };

  const openCreateModal = () => {
    setEditingHeadline(null);
    setFormData({
      text: '',
      badge: 'Special Offer',
      link: '/solar/6.6kw',
      linkText: 'Check Eligibility',
      icon: 'zap',
      theme: 'navy-green',
      isActive: true,
      displayOrder: headlines.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingHeadline(item);
    setFormData({
      text: item.text || '',
      badge: item.badge || '',
      link: item.link || '',
      linkText: item.linkText || '',
      icon: item.icon || 'zap',
      theme: item.theme || 'navy-green',
      isActive: item.isActive ?? true,
      displayOrder: item.displayOrder ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleSaveHeadline = async (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      setError('Headline text is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingHeadline) {
        const res = await api.put(`/headlines/${editingHeadline._id}`, formData);
        if (res.data?.success) {
          showSuccessToast('Headline updated successfully!');
        }
      } else {
        const res = await api.post('/headlines', formData);
        if (res.data?.success) {
          showSuccessToast('New headline created and published successfully!');
        }
      }
      setIsModalOpen(false);
      await fetchHeadlines();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save headline.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    // Optimistic UI update
    setHeadlines((prev) =>
      prev.map((h) => (h._id === id ? { ...h, isActive: !currentStatus } : h))
    );
    setStats((prev) => ({
      ...prev,
      active: currentStatus ? prev.active - 1 : prev.active + 1,
      inactive: currentStatus ? prev.inactive + 1 : prev.inactive - 1,
    }));

    try {
      const res = await api.patch(`/headlines/${id}/toggle`);
      if (res.data?.success) {
        showSuccessToast(
          `Headline ${res.data.data.isActive ? 'Activated' : 'Deactivated'}!`
        );
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to toggle headline status');
      await fetchHeadlines();
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal.headline) return;
    const { _id } = deleteModal.headline;

    try {
      const res = await api.delete(`/headlines/${_id}`);
      if (res.data?.success) {
        showSuccessToast('Headline deleted successfully');
        setDeleteModal({ open: false, headline: null });
        await fetchHeadlines();
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete headline');
    }
  };

  // Find preview theme and icon
  const currentTheme = THEMES.find((t) => t.id === formData.theme) || THEMES[0];
  const SelectedIcon = ICONS.find((i) => i.id === formData.icon)?.icon || Zap;

  return (
    <div
      className="min-h-screen flex flex-col text-slate-100"
      style={{
        background: `linear-gradient(160deg, ${NAVY_DARK} 0%, ${NAVY} 60%, ${NAVY_MID} 100%)`,
      }}
    >
      {/* ================= STICKY ADMIN HEADER ================= */}
      <header
        className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: `${NAVY_DARK}f0`,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: `${GREEN}18`, border: `1.5px solid ${GREEN}35` }}
          >
            <Megaphone className="w-5 h-5" style={{ color: GREEN }} />
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
            <p className="text-xs text-white/40">Manage dynamic announcements & schemes</p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#e2e8f0',
            }}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            Enquiries
          </button>

          <button
            onClick={() => navigate('/admin/projects')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.25)',
              color: '#bfdbfe',
            }}
          >
            <FileText className="w-4 h-4" />
            Projects
          </button>

          <button
            onClick={() => navigate('/admin/reviews')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
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
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.25)',
              color: '#a7f3d0',
            }}
          >
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            Hero Banners
          </button>

          <button
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md"
            style={{
              background: `${GREEN}25`,
              border: `1.5px solid ${GREEN}`,
              color: '#ffffff',
            }}
          >
            <Megaphone className="w-4 h-4" style={{ color: GREEN }} />
            Headlines
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 transition-all duration-200 ml-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* ================= TOASTS ================= */}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="px-4 py-3 rounded-xl bg-emerald-500/90 text-white text-sm font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 pointer-events-auto border border-emerald-400/40"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="px-4 py-3 rounded-xl bg-rose-600/90 text-white text-sm font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 pointer-events-auto border border-rose-400/40"
            >
              <AlertCircle className="w-4 h-4 text-white" />
              {error}
              <button
                onClick={() => setError('')}
                className="ml-2 hover:opacity-80"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Top Header Row & Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className="p-5 rounded-2xl border flex items-center justify-between"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Total Headlines
              </p>
              <h3 className="text-2xl font-black text-white mt-1">{stats.total}</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div
            className="p-5 rounded-2xl border flex items-center justify-between"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Live on Website
                </p>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{stats.active}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>

          <div
            className="p-5 rounded-2xl border flex items-center justify-between"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Inactive / Drafts
              </p>
              <h3 className="text-2xl font-black text-white/60 mt-1">{stats.inactive}</h3>
            </div>
            <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20 text-slate-400">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Toolbar: Search, Filters & Create Button */}
        <div
          className="p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full md:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search headline text, badge, or link..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </form>

          {/* Filter Status & Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'inactive', label: 'Inactive' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    statusFilter === tab.id
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={fetchHeadlines}
              title="Refresh list"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>

            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-[#39b54a] to-[#5eead4] hover:opacity-95 shadow-[0_0_20px_rgba(57,181,74,0.3)] transition-all duration-200"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Add Announcement
            </button>
          </div>
        </div>

        {/* ================= HEADLINES LIST ================= */}
        {loading && headlines.length === 0 ? (
          <div className="py-20 text-center text-white/50 flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
            <p className="text-sm">Loading dynamic headlines...</p>
          </div>
        ) : headlines.length === 0 ? (
          <div
            className="py-16 text-center rounded-2xl border flex flex-col items-center gap-3"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <Megaphone className="w-12 h-12 text-white/20" />
            <h4 className="text-lg font-bold text-white">No headlines found</h4>
            <p className="text-sm text-white/50 max-w-sm">
              {search || statusFilter !== 'all'
                ? 'Try clearing your search or status filter.'
                : 'Create your first announcement headline to engage visitors on the frontend.'}
            </p>
            <button
              onClick={openCreateModal}
              className="mt-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Create Headline
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {headlines.map((item) => {
              const itemTheme = THEMES.find((t) => t.id === item.theme) || THEMES[0];
              const ItemIcon = ICONS.find((i) => i.id === item.icon)?.icon || Zap;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border p-4 sm:p-5 transition-all duration-200 group"
                  style={{
                    background: item.isActive
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(255,255,255,0.02)',
                    borderColor: item.isActive
                      ? 'rgba(57,181,74,0.35)'
                      : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Top Bar: Preview Bar Simulation */}
                  <div
                    className={`w-full rounded-xl px-4 py-2.5 mb-3.5 bg-gradient-to-r ${itemTheme.previewBg} border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm`}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.badge && (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${itemTheme.badgeClass} uppercase tracking-wider`}
                        >
                          <ItemIcon className="w-3 h-3" />
                          {item.badge}
                        </span>
                      )}
                      <span className="text-white font-medium">{item.text}</span>
                    </div>

                    {item.link && (
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${itemTheme.btnClass}`}
                      >
                        <span>{item.linkText || 'Learn More'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Metadata & Controls */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/60">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                        <Layers className="w-3.5 h-3.5 text-white/40" />
                        Order: <strong className="text-white">{item.displayOrder}</strong>
                      </span>

                      {item.link && (
                        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 text-white/70">
                          <ExternalLink className="w-3 h-3 text-sky-400" />
                          Link: {item.link}
                        </span>
                      )}

                      <span className="text-white/40">
                        Created: {new Date(item.createdAt).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Active Status Toggle */}
                      <button
                        onClick={() => handleToggleActive(item._id, item.isActive)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 border ${
                          item.isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'
                          }`}
                        />
                        {item.isActive ? 'Active on Frontend' : 'Inactive / Draft'}
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(item)}
                        title="Edit headline"
                        className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => setDeleteModal({ open: true, headline: item })}
                        title="Delete headline"
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* ================= CREATE / EDIT MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl rounded-3xl border p-6 sm:p-8 space-y-6 my-8"
              style={{
                background: `linear-gradient(170deg, ${NAVY_DARK} 0%, #15264f 100%)`,
                borderColor: 'rgba(255,255,255,0.15)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {editingHeadline ? 'Edit Announcement Headline' : 'Create New Announcement'}
                    </h3>
                    <p className="text-xs text-white/50">
                      Displays dynamically on the frontend above the navigation bar
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* LIVE PREVIEW BOX */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  Live Frontend Preview
                </label>
                <div
                  className={`w-full rounded-2xl p-3 sm:p-4 bg-gradient-to-r ${currentTheme.previewBg} border border-white/20 shadow-lg flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm transition-all`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {formData.badge && (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${currentTheme.badgeClass} uppercase tracking-wider`}
                      >
                        <SelectedIcon className="w-3 h-3" />
                        {formData.badge}
                      </span>
                    )}
                    <span className="text-white font-medium">
                      {formData.text || 'Your promotional headline will display here...'}
                    </span>
                  </div>

                  {formData.link && (
                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${currentTheme.btnClass}`}
                    >
                      <span>{formData.linkText || 'Learn More'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>

              {/* FORM FIELDS */}
              <form onSubmit={handleSaveHeadline} className="space-y-4">
                {/* Headline Text */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white/80">
                      Announcement Text <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[11px] text-white/40">{formData.text.length}/350</span>
                  </div>
                  <textarea
                    required
                    rows={2}
                    maxLength={350}
                    placeholder="e.g. Save up to $1,400 with Victorian Government Solar Rebates + Interest-Free Loans!"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Badge and Quick Suggestions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Badge Label (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Special Offer, Limited Scheme"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <div className="flex flex-wrap gap-1 mt-1">
                      {PRESET_BADGES.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, badge: b })}
                          className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-[10px] text-white/60 hover:text-white border border-white/5"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Icon Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Badge Icon</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {ICONS.map((ic) => {
                        const IconComponent = ic.icon;
                        const isSelected = formData.icon === ic.id;
                        return (
                          <button
                            key={ic.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, icon: ic.id })}
                            className={`flex items-center gap-1.5 p-1.5 rounded-lg text-xs transition-colors border ${
                              isSelected
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                            <span className="truncate text-[11px]">{ic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Link and Link Text */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">
                      Destination Link URL (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /solar/6.6kw or /contact"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Button / Link Text</label>
                    <input
                      type="text"
                      placeholder="e.g. Check Eligibility, Claim Now"
                      value={formData.linkText}
                      onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Color Theme Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/80">Visual Theme</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {THEMES.map((thm) => {
                      const isSelected = formData.theme === thm.id;
                      return (
                        <button
                          key={thm.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, theme: thm.id })}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-emerald-400 bg-white/10 shadow-sm'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full flex-shrink-0"
                            style={{ background: thm.accentColor }}
                          />
                          <span className="text-xs font-medium text-white truncate">
                            {thm.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Display Order & Active Checkbox */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-white/80">Display Order:</label>
                    <input
                      type="number"
                      min={0}
                      value={formData.displayOrder}
                      onChange={(e) =>
                        setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })
                      }
                      className="w-20 p-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm text-center focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-start sm:justify-end gap-3">
                    <label className="text-xs font-semibold text-white/80">Status:</label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                        formData.isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-white/5 text-white/40 border-white/10'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          formData.isActive ? 'bg-emerald-400' : 'bg-white/30'
                        }`}
                      />
                      {formData.isActive ? 'Active on Frontend' : 'Draft / Inactive'}
                    </button>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-[#39b54a] to-[#5eead4] hover:opacity-95 shadow-lg transition-all disabled:opacity-50"
                  >
                    {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
                    {editingHeadline ? 'Save Changes' : 'Publish Headline'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      <AnimatePresence>
        {deleteModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border p-6 space-y-4"
              style={{
                background: NAVY_DARK,
                borderColor: 'rgba(244,63,94,0.3)',
              }}
            >
              <div className="flex items-center gap-3 text-rose-400">
                <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Delete Announcement</h3>
              </div>

              <p className="text-sm text-white/70">
                Are you sure you want to permanently delete this headline?
              </p>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 italic">
                "{deleteModal.headline?.text}"
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteModal({ open: false, headline: null })}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30 transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHeadlines;
