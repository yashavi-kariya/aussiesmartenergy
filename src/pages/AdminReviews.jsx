import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Edit2, Trash2, X, ChevronLeft, RefreshCw,
    Zap, LogOut, Upload, Eye, Star, CheckCircle2,
    ExternalLink, Search, Filter, MessageSquare, ShieldCheck,
    Globe, FileText, Check, LayoutGrid, Image as ImageIcon, Megaphone
} from 'lucide-react';
import api from '../utils/api';

const NAVY = '#1d2e57ff';
const NAVY_DARK = '#0f1c3fff';
const NAVY_LIGHT = '#213885ff';
const NAVY_MID = '#133ea1ff';
const GREEN = '#39b54a';
const GREEN_DARK = '#2e9a3d';

const PLATFORMS = [
    { value: 'google', label: 'Google Review', color: '#4285F4', icon: 'G' },
    { value: 'solarquotes', label: 'SolarQuotes', color: '#f59e0b', icon: 'SQ' },
    { value: 'productreview', label: 'ProductReview.com.au', color: '#10b981', icon: 'PR' },
    { value: 'trustpilot', label: 'Trustpilot', color: '#00b67a', icon: 'TP' },
    { value: 'website', label: 'Website / Direct', color: '#8b5cf6', icon: 'W' },
    { value: 'other', label: 'Other Platform', color: '#64748b', icon: '★' },
];

const Field = ({ label, children, optional = false }) => (
    <div>
        <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {label}
            </label>
            {optional && <span className="text-[10px] text-white/30 font-medium">Optional</span>}
        </div>
        {children}
    </div>
);

const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '0.875rem',
    outline: 'none',
};

const AdminReviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Search & Filter
    const [search, setSearch] = useState('');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null); // null = add new
    const [form, setForm] = useState({
        authorName: '',
        roleOrLocation: '',
        rating: 5,
        reviewText: '',
        reviewDate: 'Recently',
        reviewLink: '',
        platform: 'google',
        isFeatured: true,
        isVerified: true,
        authorImage: '',
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);

    // Delete modal
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const showMsg = (msg, isErr = false) => {
        if (isErr) setError(msg);
        else setSuccess(msg);
        setTimeout(() => { setError(''); setSuccess(''); }, 4000);
    };

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const params = {};
            if (search) params.search = search;
            if (platformFilter !== 'all') params.platform = platformFilter;
            if (featuredFilter !== 'all') params.featured = featuredFilter;

            const res = await api.get('/reviews/admin/all', { params });
            if (res.data && res.data.success) {
                setReviews(res.data.data);
            }
        } catch (err) {
            showMsg(err.response?.data?.message || 'Failed to fetch reviews', true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [search, platformFilter, featuredFilter]);

    const openAddModal = () => {
        setEditing(null);
        setForm({
            authorName: '',
            roleOrLocation: 'Verified Customer',
            rating: 5,
            reviewText: '',
            reviewDate: 'Recently',
            reviewLink: '',
            platform: 'google',
            isFeatured: true,
            isVerified: true,
            authorImage: '',
        });
        setAvatarFile(null);
        setAvatarPreview('');
        setModalOpen(true);
    };

    const openEditModal = (review) => {
        setEditing(review);
        setForm({
            authorName: review.authorName || '',
            roleOrLocation: review.roleOrLocation || '',
            rating: review.rating || 5,
            reviewText: review.reviewText || '',
            reviewDate: review.reviewDate || 'Recently',
            reviewLink: review.reviewLink || '',
            platform: review.platform || 'google',
            isFeatured: review.isFeatured ?? true,
            isVerified: review.isVerified ?? true,
            authorImage: review.authorImage || '',
        });
        setAvatarFile(null);
        setAvatarPreview(review.authorImage || '');
        setModalOpen(true);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.authorName.trim()) return showMsg('Please provide the author name.', true);
        if (!form.reviewText.trim()) return showMsg('Please provide the review text.', true);

        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('authorName', form.authorName);
            formData.append('roleOrLocation', form.roleOrLocation);
            formData.append('rating', form.rating);
            formData.append('reviewText', form.reviewText);
            formData.append('reviewDate', form.reviewDate);
            formData.append('reviewLink', form.reviewLink);
            formData.append('platform', form.platform);
            formData.append('isFeatured', form.isFeatured);
            formData.append('isVerified', form.isVerified);
            formData.append('authorImage', form.authorImage);

            if (avatarFile) {
                formData.append('authorImageFile', avatarFile);
            }

            if (editing) {
                await api.put(`/reviews/${editing._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                showMsg('Review updated successfully!');
            } else {
                await api.post('/reviews', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                showMsg('New review added successfully!');
            }

            setModalOpen(false);
            fetchReviews();
        } catch (err) {
            showMsg(err.response?.data?.message || 'Error saving review.', true);
        } finally {
            setSaving(false);
        }
    };

    const handleToggleFeatured = async (review) => {
        try {
            await api.put(`/reviews/${review._id}`, {
                isFeatured: !review.isFeatured,
            });
            setReviews((prev) =>
                prev.map((r) => (r._id === review._id ? { ...r, isFeatured: !r.isFeatured } : r))
            );
            showMsg(`Review ${!review.isFeatured ? 'featured on homepage' : 'hidden from homepage'}`);
        } catch (err) {
            showMsg('Failed to update featured status', true);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await api.delete(`/reviews/${deleteTarget._id}`);
            showMsg('Review deleted permanently.');
            setDeleteTarget(null);
            fetchReviews();
        } catch (err) {
            showMsg(err.response?.data?.message || 'Failed to delete review', true);
        } finally {
            setDeleting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login/admin');
    };

    // Calculate stats
    const totalCount = reviews.length;
    const featuredCount = reviews.filter((r) => r.isFeatured).length;
    const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
    const avgRating = totalCount > 0
        ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalCount).toFixed(1)
        : '5.0';

    return (
        <div
            className="min-h-screen flex flex-col text-slate-100"
            style={{ background: `linear-gradient(160deg, ${NAVY_DARK} 0%, ${NAVY} 60%, ${NAVY_MID} 100%)` }}
        >
            {/* Sticky Admin Header */}
            <header
                className="sticky top-0 z-30 px-6 py-4 flex flex-wrap items-center justify-between gap-4"
                style={{
                    background: `${NAVY_DARK}f5`,
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
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
                                Admin Reviews
                            </span>
                        </h1>
                        <p className="text-xs text-white/40">Manage Google & Platform Customer Reviews</p>
                    </div>
                </div>

                {/* Top Navigation */}
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(255,255,255,0.8)',
                        }}
                    >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Enquiries
                    </button>

                    <button
                        onClick={() => navigate('/admin/projects')}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(255,255,255,0.8)',
                        }}
                    >
                        <FileText className="w-3.5 h-3.5" />
                        Projects
                    </button>

                    <button
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                        style={{
                            background: `${GREEN}20`,
                            border: `1px solid ${GREEN}60`,
                            color: '#fff',
                        }}
                    >
                        <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
                        Reviews
                    </button>

                    <button
                        onClick={() => navigate('/admin/banners')}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                            background: 'rgba(16,185,129,0.12)',
                            border: '1px solid rgba(16,185,129,0.25)',
                            color: '#a7f3d0',
                        }}
                    >
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                        Hero Banners
                    </button>

                    <button
                        onClick={() => navigate('/admin/headlines')}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                            background: 'rgba(57,181,74,0.12)',
                            border: '1px solid rgba(57,181,74,0.25)',
                            color: '#bbf7d0',
                        }}
                    >
                        <Megaphone className="w-3.5 h-3.5 text-emerald-400" />
                        Headlines
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                            background: 'rgba(239,68,68,0.12)',
                            border: '1px solid rgba(239,68,68,0.25)',
                            color: '#fca5a5',
                        }}
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">
                {/* Notification Alerts */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-medium flex items-center justify-between"
                        >
                            <span>{error}</span>
                            <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                {success}
                            </span>
                            <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Reviews', value: totalCount, icon: Star, color: '#60a5fa' },
                        { label: 'Featured on Site', value: featuredCount, icon: CheckCircle2, color: GREEN },
                        { label: '5-Star Reviews', value: fiveStarCount, icon: Star, color: '#facc15' },
                        { label: 'Average Rating', value: `${avgRating} ★`, icon: ShieldCheck, color: '#a78bfa' },
                    ].map((s) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={s.label}
                                className="p-4 rounded-2xl border"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: 'rgba(255,255,255,0.08)',
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/50 font-bold uppercase tracking-wider">{s.label}</span>
                                    <div className="p-2 rounded-xl" style={{ background: `${s.color}15` }}>
                                        <Icon className="w-4 h-4" style={{ color: s.color }} />
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-white mt-2">{s.value}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Actions & Filters Bar */}
                <div
                    className="p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        borderColor: 'rgba(255,255,255,0.08)',
                    }}
                >
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                        {/* Search Input */}
                        <div className="relative flex-1 min-w-[200px] max-w-md">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                placeholder="Search reviewer or review text..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ ...inputStyle, paddingLeft: '38px' }}
                            />
                        </div>

                        {/* Platform Filter */}
                        <select
                            value={platformFilter}
                            onChange={(e) => setPlatformFilter(e.target.value)}
                            style={{ ...inputStyle, width: 'auto', minWidth: '150px' }}
                        >
                            <option value="all" className="bg-slate-900">All Platforms</option>
                            {PLATFORMS.map((p) => (
                                <option key={p.value} value={p.value} className="bg-slate-900">
                                    {p.label}
                                </option>
                            ))}
                        </select>

                        {/* Featured Filter */}
                        <select
                            value={featuredFilter}
                            onChange={(e) => setFeaturedFilter(e.target.value)}
                            style={{ ...inputStyle, width: 'auto', minWidth: '150px' }}
                        >
                            <option value="all" className="bg-slate-900">All Status</option>
                            <option value="true" className="bg-slate-900">Featured on Home</option>
                            <option value="false" className="bg-slate-900">Hidden / Draft</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchReviews}
                            disabled={loading}
                            className="p-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition"
                            title="Refresh Reviews"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>

                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all transform active:scale-95"
                            style={{
                                background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`,
                                boxShadow: `0 8px 20px -4px ${GREEN}60`,
                            }}
                        >
                            <Plus className="w-4 h-4 stroke-[3]" />
                            Add Review from Link
                        </button>
                    </div>
                </div>

                {/* Reviews Grid */}
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-3">
                        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                        <span className="text-sm text-white/40 font-medium">Loading reviews...</span>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="py-16 text-center rounded-2xl border border-white/5 bg-white/[0.02]">
                        <Star className="w-12 h-12 mx-auto text-white/20 mb-3" />
                        <h3 className="text-base font-bold text-white">No reviews found</h3>
                        <p className="text-xs text-white/40 max-w-sm mx-auto mt-1 mb-4">
                            Add your customer reviews with their direct Google or platform link to show them on your website.
                        </p>
                        <button
                            onClick={openAddModal}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white"
                            style={{ background: GREEN }}
                        >
                            Add Your First Review
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {reviews.map((review) => {
                            const platformMeta = PLATFORMS.find((p) => p.value === review.platform) || PLATFORMS[0];
                            return (
                                <motion.div
                                    key={review._id}
                                    layout
                                    className="rounded-2xl border flex flex-col justify-between p-5 relative transition-all duration-200"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        borderColor: review.isFeatured ? 'rgba(57,181,74,0.3)' : 'rgba(255,255,255,0.08)',
                                    }}
                                >
                                    {/* Top Card Bar */}
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div className="flex items-center gap-2.5">
                                            {/* Avatar or Initial */}
                                            {review.authorImage ? (
                                                <img
                                                    src={review.authorImage}
                                                    alt={review.authorName}
                                                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                                                />
                                            ) : (
                                                <div
                                                    className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white"
                                                    style={{ background: `${GREEN}30`, border: `1.5px solid ${GREEN}70` }}
                                                >
                                                    {review.authorName?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                            )}

                                            <div>
                                                <h4 className="font-bold text-white text-sm leading-tight flex items-center gap-1.5">
                                                    {review.authorName}
                                                    {review.isVerified && (
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Customer" />
                                                    )}
                                                </h4>
                                                <p className="text-[11px] text-white/40 mt-0.5">{review.roleOrLocation || 'Customer'}</p>
                                            </div>
                                        </div>

                                        {/* Platform Badge */}
                                        <div
                                            className="px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1"
                                            style={{
                                                background: `${platformMeta.color}20`,
                                                color: platformMeta.color,
                                                border: `1px solid ${platformMeta.color}40`,
                                            }}
                                        >
                                            <span>{platformMeta.icon}</span>
                                            <span>{platformMeta.label.split(' ')[0]}</span>
                                        </div>
                                    </div>

                                    {/* Rating Stars & Date */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-3.5 h-3.5"
                                                    style={{
                                                        color: i < (review.rating || 5) ? '#facc15' : 'rgba(255,255,255,0.15)',
                                                        fill: i < (review.rating || 5) ? '#facc15' : 'transparent',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-white/30 font-medium">{review.reviewDate || 'Recently'}</span>
                                    </div>

                                    {/* Quote Text */}
                                    <p className="text-xs text-white/80 leading-relaxed italic mb-4 flex-1 line-clamp-4">
                                        "{review.reviewText}"
                                    </p>

                                    {/* Direct Link Preview if exists */}
                                    {review.reviewLink ? (
                                        <a
                                            href={review.reviewLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition mb-4 truncate"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                            <span className="truncate">View exact review on {platformMeta.label.split(' ')[0]}</span>
                                        </a>
                                    ) : (
                                        <div className="text-[10px] text-white/30 italic mb-4">No direct link attached</div>
                                    )}

                                    {/* Footer Actions */}
                                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                                        {/* Toggle Featured */}
                                        <button
                                            onClick={() => handleToggleFeatured(review)}
                                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition"
                                            style={{
                                                background: review.isFeatured ? `${GREEN}25` : 'rgba(255,255,255,0.05)',
                                                color: review.isFeatured ? '#86efac' : 'rgba(255,255,255,0.4)',
                                                border: `1px solid ${review.isFeatured ? `${GREEN}50` : 'rgba(255,255,255,0.1)'}`,
                                            }}
                                        >
                                            <Check className={`w-3 h-3 ${review.isFeatured ? 'opacity-100' : 'opacity-40'}`} />
                                            {review.isFeatured ? 'Featured on Site' : 'Draft / Hidden'}
                                        </button>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => openEditModal(review)}
                                                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
                                                title="Edit Review"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(review)}
                                                className="p-1.5 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition"
                                                title="Delete Review"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Add / Edit Review Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6"
                            style={{ background: `${NAVY_DARK}` }}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div>
                                    <h3 className="text-lg font-extrabold text-white">
                                        {editing ? 'Edit Customer Review' : 'Add New Review from Link'}
                                    </h3>
                                    <p className="text-xs text-white/40 mt-0.5">
                                        Paste your exact review link and customer feedback details.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-4">
                                {/* Direct Link Input */}
                                <Field label="Exact Review Link URL" optional>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            placeholder="https://maps.app.goo.gl/... or https://www.google.com/maps/reviews/..."
                                            value={form.reviewLink}
                                            onChange={(e) => setForm({ ...form, reviewLink: e.target.value })}
                                            style={inputStyle}
                                        />
                                        {form.reviewLink && (
                                            <a
                                                href={form.reviewLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1"
                                            >
                                                Test Link <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-white/30 mt-1">
                                        Paste the direct Google Maps share link, SolarQuotes review link, or website URL for this review.
                                    </p>
                                </Field>

                                {/* Platform & Rating Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Platform Source">
                                        <select
                                            value={form.platform}
                                            onChange={(e) => setForm({ ...form, platform: e.target.value })}
                                            style={inputStyle}
                                        >
                                            {PLATFORMS.map((p) => (
                                                <option key={p.value} value={p.value} className="bg-slate-900">
                                                    {p.label}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label="Rating (Stars)">
                                        <div className="flex items-center gap-2 pt-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, rating: star })}
                                                    className="p-1 hover:scale-110 transition"
                                                >
                                                    <Star
                                                        className="w-6 h-6"
                                                        style={{
                                                            color: star <= form.rating ? '#facc15' : 'rgba(255,255,255,0.2)',
                                                            fill: star <= form.rating ? '#facc15' : 'transparent',
                                                        }}
                                                    />
                                                </button>
                                            ))}
                                            <span className="text-xs font-bold text-white/60 ml-2">({form.rating} / 5)</span>
                                        </div>
                                    </Field>
                                </div>

                                {/* Reviewer Name & Role */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Reviewer Name">
                                        <input
                                            type="text"
                                            placeholder="e.g. Linda George"
                                            value={form.authorName}
                                            onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                                            style={inputStyle}
                                            required
                                        />
                                    </Field>

                                    <Field label="Role or Location" optional>
                                        <input
                                            type="text"
                                            placeholder="e.g. House Owner, Brisbane"
                                            value={form.roleOrLocation}
                                            onChange={(e) => setForm({ ...form, roleOrLocation: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </Field>
                                </div>

                                {/* Review Date */}
                                <Field label="Date / Timestamp" optional>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2 weeks ago, or Oct 2024"
                                        value={form.reviewDate}
                                        onChange={(e) => setForm({ ...form, reviewDate: e.target.value })}
                                        style={inputStyle}
                                    />
                                </Field>

                                {/* Review Text Quote */}
                                <Field label="Review Text / Quote">
                                    <textarea
                                        rows={4}
                                        placeholder="Paste the customer's exact review comment here..."
                                        value={form.reviewText}
                                        onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                        required
                                    />
                                </Field>

                                {/* Reviewer Photo / Avatar */}
                                <Field label="Reviewer Photo / Avatar" optional>
                                    <div className="flex items-center gap-4">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar Preview"
                                                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                                                <Upload className="w-5 h-5" />
                                            </div>
                                        )}
                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="text-xs text-white/50 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                                            />
                                            <input
                                                type="url"
                                                placeholder="Or paste external image URL..."
                                                value={form.authorImage}
                                                onChange={(e) => {
                                                    setForm({ ...form, authorImage: e.target.value });
                                                    setAvatarPreview(e.target.value);
                                                }}
                                                style={{ ...inputStyle, fontSize: '0.75rem', padding: '6px 10px' }}
                                            />
                                        </div>
                                    </div>
                                </Field>

                                {/* Toggles */}
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.isFeatured}
                                            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                                            className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-white/10"
                                        />
                                        <span className="text-xs font-bold text-white">Show on Website Carousel (Featured)</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.isVerified}
                                            onChange={(e) => setForm({ ...form, isVerified: e.target.checked })}
                                            className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-white/10"
                                        />
                                        <span className="text-xs font-bold text-white">Show "Verified Review" Badge</span>
                                    </label>
                                </div>

                                {/* Modal Actions */}
                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white/60 hover:text-white transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition"
                                        style={{
                                            background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`,
                                            boxShadow: `0 8px 20px -4px ${GREEN}60`,
                                        }}
                                    >
                                        {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                        {editing ? 'Update Review' : 'Save Review'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteTarget && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 shadow-2xl p-6 space-y-4"
                        >
                            <div className="flex items-center gap-3 text-red-400">
                                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                                    <Trash2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-white text-base">Delete Review?</h4>
                                    <p className="text-xs text-white/40">This action cannot be undone.</p>
                                </div>
                            </div>

                            <p className="text-xs text-white/70">
                                Are you sure you want to permanently delete the review by <strong className="text-white">"{deleteTarget.authorName}"</strong>?
                            </p>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    onClick={() => setDeleteTarget(null)}
                                    className="px-4 py-2 rounded-xl text-xs font-bold text-white/60 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition"
                                >
                                    {deleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                    Delete Permanently
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminReviews;
