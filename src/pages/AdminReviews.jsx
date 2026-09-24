import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Edit2, Trash2, X, RefreshCw,
    Zap, LogOut, Upload, Star, CheckCircle2,
    ExternalLink, Search, MessageSquare, ShieldCheck,
    FileText, Check, Image as ImageIcon, Megaphone,
    Sparkles, AlertCircle
} from 'lucide-react';
import api from '../utils/api';

const NAVY = '#1d2e57ff';
const NAVY_DARK = '#0f1c3fff';
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

const GoogleIcon = () => (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        />
        <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
        />
        <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
        />
        <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        />
    </svg>
);

const Field = ({ label, children, optional = false }) => (
    <div>
        <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60">
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

    // Active View Tab: 'google' or 'custom'
    const [activeTab, setActiveTab] = useState('google');

    // Google Reviews State
    const [googleReviews, setGoogleReviews] = useState([]);
    const [googleSummary, setGoogleSummary] = useState({
        businessName: 'Aussie Smart Energy',
        rating: 5.0,
        totalReviews: 79,
        placeUrl: 'https://www.google.com/maps/place/Aussie+Smart+Energy/@-24.1501978,148.5507008,3254937m/data=!3m1!1e3!4m18!1m9!3m8!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!2sAussie+Smart+Energy!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D',
    });
    const [googleFeaturedReview, setGoogleFeaturedReview] = useState(null);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [syncingGoogle, setSyncingGoogle] = useState(false);
    const [googleSearch, setGoogleSearch] = useState('');
    const [settingFeaturedId, setSettingFeaturedId] = useState(null);

    // Google Review Modal (Add directly from Google listing)
    const [googleModalOpen, setGoogleModalOpen] = useState(false);
    const [googleForm, setGoogleForm] = useState({
        authorName: '',
        roleOrLocation: 'Homeowner, Australia',
        rating: 5,
        reviewText: '',
        reviewDate: 'Recently',
        reviewLink: 'https://www.google.com/maps/place/Aussie+Smart+Energy/@-24.1501978,148.5507008,3254937m/data=!3m1!1e3!4m18!1m9!3m8!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!2sAussie+Smart+Energy!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D',
        authorImage: '',
        isGoogleFeatured: true,
    });
    const [savingGoogle, setSavingGoogle] = useState(false);

    // Custom Reviews State
    const [reviews, setReviews] = useState([]);
    const [loadingCustom, setLoadingCustom] = useState(false);
    const [customSearch, setCustomSearch] = useState('');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');

    // General Feedback
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Modal state for Custom Reviews
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
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
        setTimeout(() => { setError(''); setSuccess(''); }, 4500);
    };

    // ── Fetch Google Reviews ──
    const fetchGoogleReviews = async () => {
        setLoadingGoogle(true);
        try {
            const res = await api.get('/google-reviews/admin/all');
            if (res.data && res.data.success) {
                setGoogleReviews(res.data.reviews || []);
                setGoogleFeaturedReview(res.data.featuredReview || null);
            }

            const summaryRes = await api.get('/google-reviews');
            if (summaryRes.data) {
                setGoogleSummary({
                    businessName: 'Aussie Smart Energy',
                    rating: summaryRes.data.rating || 5.0,
                    totalReviews: summaryRes.data.totalReviews || 79,
                    placeUrl: summaryRes.data.placeUrl || 'https://www.google.com/maps/place/Aussie+Smart+Energy/@-24.1501978,148.5507008,3254937m/data=!3m1!1e3!4m18!1m9!3m8!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!2sAussie+Smart+Energy!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D',
                });
                if (summaryRes.data.featuredReview) {
                    setGoogleFeaturedReview(summaryRes.data.featuredReview);
                }
            }
        } catch (err) {
            showMsg(err.response?.data?.message || 'Could not fetch Google Reviews', true);
            if (err.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/login/admin');
            }
        } finally {
            setLoadingGoogle(false);
        }
    };

    // ── Sync Google Reviews from Google Places API ──
    const handleSyncGoogle = async () => {
        setSyncingGoogle(true);
        try {
            const res = await api.post('/google-reviews/sync');
            if (res.data && res.data.success) {
                showMsg(res.data.message || 'Google Reviews synced successfully!');
                fetchGoogleReviews();
            }
        } catch (err) {
            showMsg(err.response?.data?.message || 'Failed to sync with Google Places API', true);
        } finally {
            setSyncingGoogle(false);
        }
    };

    // ── Save Google Review from Listing ──
    const handleSaveGoogleReview = async (e) => {
        e.preventDefault();
        if (!googleForm.authorName.trim()) return showMsg('Please provide the reviewer name.', true);
        if (!googleForm.reviewText.trim()) return showMsg('Please provide the review text.', true);

        setSavingGoogle(true);
        try {
            const res = await api.post('/google-reviews/add', googleForm);
            if (res.data && res.data.success) {
                showMsg(res.data.message || 'Google review added successfully!');
                setGoogleModalOpen(false);
                setGoogleForm({
                    authorName: '',
                    roleOrLocation: 'Homeowner, Australia',
                    rating: 5,
                    reviewText: '',
                    reviewDate: 'Recently',
                    reviewLink: googleSummary.placeUrl,
                    authorImage: '',
                    isGoogleFeatured: true,
                });
                fetchGoogleReviews();
            }
        } catch (err) {
            showMsg(err.response?.data?.message || 'Failed to save Google review.', true);
        } finally {
            setSavingGoogle(false);
        }
    };

    // ── Select Specific Review as Featured ──
    const handleSetFeaturedGoogle = async (review) => {
        const id = review._id || review.googleReviewId;
        setSettingFeaturedId(id);
        try {
            const res = await api.put(`/google-reviews/${id}/featured`);
            if (res.data && res.data.success) {
                showMsg(`"${review.authorName}" review is now featured on the website!`);
                setGoogleFeaturedReview(res.data.featuredReview || review);
                setGoogleReviews((prev) =>
                    prev.map((r) => {
                        const rId = r._id || r.googleReviewId;
                        return {
                            ...r,
                            isGoogleFeatured: rId === id,
                            isFeatured: rId === id ? true : r.isFeatured,
                        };
                    })
                );
            }
        } catch (err) {
            showMsg(err.response?.data?.message || 'Failed to set featured review', true);
        } finally {
            setSettingFeaturedId(null);
        }
    };

    // ── Remove Featured Status ──
    const handleRemoveFeaturedGoogle = async (review) => {
        const id = review._id || review.googleReviewId;
        setSettingFeaturedId(id);
        try {
            const res = await api.delete(`/google-reviews/${id}/featured`);
            if (res.data && res.data.success) {
                showMsg(`Featured status removed for "${review.authorName}".`);
                setGoogleFeaturedReview(null);
                setGoogleReviews((prev) =>
                    prev.map((r) => {
                        const rId = r._id || r.googleReviewId;
                        return rId === id ? { ...r, isGoogleFeatured: false } : r;
                    })
                );
            }
        } catch (err) {
            showMsg(err.response?.data?.message || 'Failed to remove featured status', true);
        } finally {
            setSettingFeaturedId(null);
        }
    };

    // ── Fetch Custom / Platform Reviews ──
    const fetchCustomReviews = async () => {
        setLoadingCustom(true);
        try {
            const params = {};
            if (customSearch) params.search = customSearch;
            if (platformFilter !== 'all') params.platform = platformFilter;
            if (featuredFilter !== 'all') params.featured = featuredFilter;

            const res = await api.get('/reviews/admin/all', { params });
            if (res.data && res.data.success) {
                setReviews(res.data.data);
            }
        } catch (err) {
            showMsg(err.response?.data?.message || 'Failed to fetch reviews', true);
            if (err.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/login/admin');
            }
        } finally {
            setLoadingCustom(false);
        }
    };

    useEffect(() => {
        fetchGoogleReviews();
        fetchCustomReviews();
    }, []);

    useEffect(() => {
        if (activeTab === 'custom') {
            fetchCustomReviews();
        }
    }, [customSearch, platformFilter, featuredFilter, activeTab]);

    // ── Custom Review Handlers ──
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
            fetchCustomReviews();
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
            showMsg(`Review ${!review.isFeatured ? 'featured on website' : 'hidden from website'}`);
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
            fetchCustomReviews();
            fetchGoogleReviews();
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

    // Filter Google reviews by search term
    const filteredGoogleReviews = googleReviews.filter((r) => {
        if (!googleSearch) return true;
        const q = googleSearch.toLowerCase();
        return (
            (r.authorName || '').toLowerCase().includes(q) ||
            (r.text || r.reviewText || '').toLowerCase().includes(q)
        );
    });

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
                        <p className="text-xs text-white/40">Select Featured Google Reviews & Manage Platform Testimonials</p>
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

            {/* Main Content */}
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
                            <span className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                {error}
                            </span>
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
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                {success}
                            </span>
                            <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tab Switcher: Google Reviews vs Custom Reviews */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setActiveTab('google')}
                            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                                activeTab === 'google'
                                    ? 'bg-blue-600/30 text-blue-300 border border-blue-400/40 shadow-md'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <GoogleIcon />
                            <span>Aussie Smart Energy Google Reviews & Spotlight</span>
                            {googleFeaturedReview && (
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Featured Review Active" />
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab('custom')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                                activeTab === 'custom'
                                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-400/40 shadow-md'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Star className="w-4 h-4" />
                            <span>Custom & Multi-Platform Reviews ({reviews.length})</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1 text-xs text-white/50">
                        <span>Active View:</span>
                        <strong className="text-white capitalize font-bold">
                            {activeTab === 'google' ? 'Google Reviews' : 'Custom Reviews'}
                        </strong>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════ */}
                {/* ── TAB 1: GOOGLE BUSINESS REVIEWS (LIVE SYNC & FEATURED) ── */}
                {/* ═══════════════════════════════════════════════════════════ */}
                {activeTab === 'google' && (
                    <div className="space-y-6">
                        {/* Google Place Status & Sync Card */}
                        <div
                            className="p-6 rounded-3xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
                            style={{
                                background: 'linear-gradient(135deg, rgba(66,133,244,0.12) 0%, rgba(15,28,63,0.6) 100%)',
                                borderColor: 'rgba(66,133,244,0.3)',
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3.5 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                                    <GoogleIcon />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-black text-white">Aussie Smart Energy</h3>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold">
                                            Official Google Business Listing
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-white/70">
                                        <span className="font-extrabold text-yellow-400 flex items-center gap-1">
                                            <Star size={13} className="fill-current" />
                                            {googleSummary.rating.toFixed(1)} / 5.0 Rating
                                        </span>
                                        <span>•</span>
                                        <span>{googleSummary.totalReviews} Total Google Reviews</span>
                                        <span>•</span>
                                        <span>{googleReviews.length} Reviews Available</span>
                                    </div>
                                    <p className="text-xs text-white/50 pt-1">
                                        Choose any Google customer review below to feature as the spotlight review on the Aussie Smart Energy homepage.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {googleSummary.placeUrl && (
                                    <a
                                        href={googleSummary.placeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        View on Google Maps
                                    </a>
                                )}

                                <button
                                    onClick={() => setGoogleModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg transition transform active:scale-95 bg-emerald-600 hover:bg-emerald-500"
                                >
                                    <Plus className="w-4 h-4 stroke-[3]" />
                                    Add Review from Google Listing
                                </button>

                                <button
                                    onClick={handleSyncGoogle}
                                    disabled={syncingGoogle}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg transition transform active:scale-95 bg-blue-600 hover:bg-blue-500"
                                    style={{
                                        boxShadow: '0 8px 20px -4px rgba(66,133,244,0.5)',
                                    }}
                                >
                                    <RefreshCw className={`w-4 h-4 ${syncingGoogle ? 'animate-spin' : ''}`} />
                                    {syncingGoogle ? 'Syncing...' : 'Sync Live Reviews'}
                                </button>
                            </div>
                        </div>

                        {/* Currently Featured Review Spotlight Banner */}
                        {googleFeaturedReview && (
                            <div
                                className="p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                                style={{
                                    background: 'rgba(57,181,74,0.12)',
                                    borderColor: 'rgba(57,181,74,0.4)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                                        <Sparkles className="w-5 h-5 fill-current" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                                                Active Homepage Spotlight Review:
                                            </span>
                                            <strong className="text-white text-sm">
                                                "{googleFeaturedReview.authorName}"
                                            </strong>
                                            <span className="text-xs text-yellow-400 font-bold">
                                                ({googleFeaturedReview.rating} ★)
                                            </span>
                                        </div>
                                        <p className="text-xs text-white/70 italic line-clamp-1 mt-0.5">
                                            "{googleFeaturedReview.text || googleFeaturedReview.reviewText}"
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRemoveFeaturedGoogle(googleFeaturedReview)}
                                    disabled={settingFeaturedId === (googleFeaturedReview._id || googleFeaturedReview.googleReviewId)}
                                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition self-end md:self-auto"
                                >
                                    Remove Spotlight
                                </button>
                            </div>
                        )}

                        {/* Search & Actions Bar */}
                        <div
                            className="p-4 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                borderColor: 'rgba(255,255,255,0.08)',
                            }}
                        >
                            <div className="relative flex-1 max-w-md">
                                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="text"
                                    placeholder="Search Google reviews by author or text..."
                                    value={googleSearch}
                                    onChange={(e) => setGoogleSearch(e.target.value)}
                                    style={{ ...inputStyle, paddingLeft: '38px' }}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={fetchGoogleReviews}
                                    disabled={loadingGoogle}
                                    className="p-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition"
                                    title="Refresh Google Reviews"
                                >
                                    <RefreshCw className={`w-4 h-4 ${loadingGoogle ? 'animate-spin' : ''}`} />
                                </button>
                                <span className="text-xs text-white/50">
                                    Showing {filteredGoogleReviews.length} Aussie Smart Energy Google Reviews
                                </span>
                            </div>
                        </div>

                        {/* Google Reviews Grid */}
                        {loadingGoogle ? (
                            <div className="py-20 flex flex-col items-center justify-center space-y-3">
                                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                                <span className="text-sm text-white/40 font-medium">Loading Google reviews...</span>
                            </div>
                        ) : filteredGoogleReviews.length === 0 ? (
                            <div className="py-16 text-center rounded-2xl border border-white/5 bg-white/[0.02]">
                                <GoogleIcon />
                                <h3 className="text-base font-bold text-white mt-3">No Google reviews found</h3>
                                <p className="text-xs text-white/40 max-w-sm mx-auto mt-1 mb-4">
                                    Click "Add Review from Google Listing" or "Sync Live Reviews" to manage reviews.
                                </p>
                                <button
                                    onClick={() => setGoogleModalOpen(true)}
                                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500"
                                >
                                    Add Aussie Smart Energy Review
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredGoogleReviews.map((review) => {
                                    const reviewId = review._id || review.googleReviewId;
                                    const isFeatured = Boolean(review.isGoogleFeatured);
                                    const isBusy = settingFeaturedId === reviewId;

                                    return (
                                        <motion.div
                                            key={reviewId}
                                            layout
                                            className="rounded-2xl border flex flex-col justify-between p-5 relative transition-all duration-200"
                                            style={{
                                                background: isFeatured ? 'rgba(57,181,74,0.08)' : 'rgba(255,255,255,0.03)',
                                                borderColor: isFeatured ? 'rgba(57,181,74,0.5)' : 'rgba(255,255,255,0.08)',
                                                boxShadow: isFeatured ? '0 0 25px -5px rgba(57,181,74,0.25)' : 'none',
                                            }}
                                        >
                                            {/* Top Card Bar */}
                                            <div>
                                                <div className="flex items-start justify-between gap-3 mb-3">
                                                    <div className="flex items-center gap-2.5">
                                                        {review.authorPhoto ? (
                                                            <img
                                                                src={review.authorPhoto}
                                                                alt={review.authorName}
                                                                className="w-10 h-10 rounded-full object-cover border border-white/20"
                                                            />
                                                        ) : (
                                                            <div
                                                                className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white"
                                                                style={{ background: '#4285F430', border: '1.5px solid #4285F470' }}
                                                            >
                                                                {review.authorName?.charAt(0)?.toUpperCase() || 'G'}
                                                            </div>
                                                        )}

                                                        <div>
                                                            <h4 className="font-bold text-white text-sm leading-tight flex items-center gap-1.5">
                                                                {review.authorName}
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" title="Google Verified Reviewer" />
                                                            </h4>
                                                            <p className="text-[11px] text-white/40 mt-0.5">{review.roleOrLocation || 'Google Reviewer'}</p>
                                                        </div>
                                                    </div>

                                                    {/* Badge: Featured vs Google */}
                                                    <div className="flex flex-col items-end gap-1">
                                                        {isFeatured && (
                                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                                                                <Sparkles className="w-3 h-3 fill-current" />
                                                                SPOTLIGHT
                                                            </span>
                                                        )}
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-400/20 flex items-center gap-1">
                                                            <GoogleIcon />
                                                            Google
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Rating Stars & Relative Date */}
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
                                                    <span className="text-[10px] text-white/40 font-medium">
                                                        {review.relativeTime || review.reviewDate || 'Recently'}
                                                    </span>
                                                </div>

                                                {/* Quote Text */}
                                                <p className="text-xs text-white/80 leading-relaxed italic mb-4 line-clamp-4">
                                                    "{review.text || review.reviewText}"
                                                </p>
                                            </div>

                                            {/* Card Footer Actions */}
                                            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={review.authorUrl || googleSummary.placeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        <span>Google Maps</span>
                                                    </a>
                                                    <button
                                                        onClick={() => setDeleteTarget(review)}
                                                        className="p-1 rounded text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition"
                                                        title="Delete Review"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                {/* Featured Action Button */}
                                                {isFeatured ? (
                                                    <button
                                                        onClick={() => handleRemoveFeaturedGoogle(review)}
                                                        disabled={isBusy}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/20 transition"
                                                    >
                                                        {isBusy ? <RefreshCw className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
                                                        Remove Spotlight
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleSetFeaturedGoogle(review)}
                                                        disabled={isBusy}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold text-white transition shadow-sm"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`,
                                                        }}
                                                    >
                                                        {isBusy ? (
                                                            <RefreshCw className="w-3 h-3 animate-spin" />
                                                        ) : (
                                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                        )}
                                                        Set as Spotlight
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════ */}
                {/* ── TAB 2: CUSTOM / MULTI-PLATFORM REVIEWS ─────────────── */}
                {/* ═══════════════════════════════════════════════════════════ */}
                {activeTab === 'custom' && (
                    <div className="space-y-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Total Reviews', value: reviews.length, icon: Star, color: '#60a5fa' },
                                { label: 'Active on Site', value: reviews.filter((r) => r.isFeatured).length, icon: CheckCircle2, color: GREEN },
                                { label: '5-Star Reviews', value: reviews.filter((r) => r.rating === 5).length, icon: Star, color: '#facc15' },
                                {
                                    label: 'Average Rating',
                                    value: `${reviews.length > 0 ? (reviews.reduce((a, r) => a + (r.rating || 5), 0) / reviews.length).toFixed(1) : '5.0'} ★`,
                                    icon: ShieldCheck,
                                    color: '#a78bfa'
                                },
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
                                <div className="relative flex-1 min-w-[200px] max-w-md">
                                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="text"
                                        placeholder="Search reviewer or review text..."
                                        value={customSearch}
                                        onChange={(e) => setCustomSearch(e.target.value)}
                                        style={{ ...inputStyle, paddingLeft: '38px' }}
                                    />
                                </div>

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

                                <select
                                    value={featuredFilter}
                                    onChange={(e) => setFeaturedFilter(e.target.value)}
                                    style={{ ...inputStyle, width: 'auto', minWidth: '150px' }}
                                >
                                    <option value="all" className="bg-slate-900">All Status</option>
                                    <option value="true" className="bg-slate-900">Active on Site</option>
                                    <option value="false" className="bg-slate-900">Hidden / Draft</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={fetchCustomReviews}
                                    disabled={loadingCustom}
                                    className="p-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition"
                                    title="Refresh Reviews"
                                >
                                    <RefreshCw className={`w-4 h-4 ${loadingCustom ? 'animate-spin' : ''}`} />
                                </button>

                                <button
                                    onClick={openAddModal}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition transform active:scale-95"
                                    style={{
                                        background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`,
                                        boxShadow: `0 8px 20px -4px ${GREEN}60`,
                                    }}
                                >
                                    <Plus className="w-4 h-4 stroke-[3]" />
                                    Add Review
                                </button>
                            </div>
                        </div>

                        {/* Reviews Grid */}
                        {loadingCustom ? (
                            <div className="py-20 flex flex-col items-center justify-center space-y-3">
                                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                                <span className="text-sm text-white/40 font-medium">Loading reviews...</span>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="py-16 text-center rounded-2xl border border-white/5 bg-white/[0.02]">
                                <Star className="w-12 h-12 mx-auto text-white/20 mb-3" />
                                <h3 className="text-base font-bold text-white">No reviews found</h3>
                                <p className="text-xs text-white/40 max-w-sm mx-auto mt-1 mb-4">
                                    Add custom customer testimonials from SolarQuotes, ProductReview, Trustpilot, or direct links.
                                </p>
                                <button
                                    onClick={openAddModal}
                                    className="px-4 py-2 rounded-xl text-xs font-bold text-white"
                                    style={{ background: GREEN }}
                                >
                                    Add Custom Review
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
                                            <div className="flex items-start justify-between gap-3 mb-4">
                                                <div className="flex items-center gap-2.5">
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

                                            <p className="text-xs text-white/80 leading-relaxed italic mb-4 flex-1 line-clamp-4">
                                                "{review.reviewText}"
                                            </p>

                                            {review.reviewLink ? (
                                                <a
                                                    href={review.reviewLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition mb-4 truncate"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                                    <span className="truncate">View on {platformMeta.label.split(' ')[0]}</span>
                                                </a>
                                            ) : (
                                                <div className="text-[10px] text-white/30 italic mb-4">No direct link attached</div>
                                            )}

                                            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
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
                                                    {review.isFeatured ? 'Active on Site' : 'Draft / Hidden'}
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
                    </div>
                )}
            </main>

            {/* Modal: Add Review Directly from Aussie Smart Energy Google Listing */}
            <AnimatePresence>
                {googleModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-blue-400/30 shadow-2xl p-6 sm:p-8 space-y-6"
                            style={{ background: `${NAVY_DARK}` }}
                        >
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30">
                                        <GoogleIcon />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-extrabold text-white">
                                            Add Aussie Smart Energy Google Review
                                        </h3>
                                        <p className="text-xs text-white/40 mt-0.5">
                                            Add customer feedback from your Google Business Profile to highlight on your website.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setGoogleModalOpen(false)}
                                    className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveGoogleReview} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Customer / Reviewer Name">
                                        <input
                                            type="text"
                                            placeholder="e.g. John Doe, Sarah Jenkins"
                                            value={googleForm.authorName}
                                            onChange={(e) => setGoogleForm({ ...googleForm, authorName: e.target.value })}
                                            style={inputStyle}
                                            required
                                        />
                                    </Field>

                                    <Field label="Location or Role" optional>
                                        <input
                                            type="text"
                                            placeholder="e.g. Homeowner, Sydney NSW"
                                            value={googleForm.roleOrLocation}
                                            onChange={(e) => setGoogleForm({ ...googleForm, roleOrLocation: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </Field>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Star Rating">
                                        <div className="flex items-center gap-2 pt-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setGoogleForm({ ...googleForm, rating: star })}
                                                    className="p-1 hover:scale-110 transition"
                                                >
                                                    <Star
                                                        className="w-6 h-6"
                                                        style={{
                                                            color: star <= googleForm.rating ? '#facc15' : 'rgba(255,255,255,0.2)',
                                                            fill: star <= googleForm.rating ? '#facc15' : 'transparent',
                                                        }}
                                                    />
                                                </button>
                                            ))}
                                            <span className="text-xs font-bold text-white/60 ml-2">({googleForm.rating} / 5)</span>
                                        </div>
                                    </Field>

                                    <Field label="Review Timestamp" optional>
                                        <input
                                            type="text"
                                            placeholder="e.g. 1 week ago, or 2 months ago"
                                            value={googleForm.reviewDate}
                                            onChange={(e) => setGoogleForm({ ...googleForm, reviewDate: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </Field>
                                </div>

                                <Field label="Exact Customer Review Text">
                                    <textarea
                                        rows={4}
                                        placeholder="Paste the customer's exact review comment from Google Maps..."
                                        value={googleForm.reviewText}
                                        onChange={(e) => setGoogleForm({ ...googleForm, reviewText: e.target.value })}
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                        required
                                    />
                                </Field>

                                <Field label="Direct Google Maps Review Link" optional>
                                    <input
                                        type="url"
                                        placeholder="https://www.google.com/maps/..."
                                        value={googleForm.reviewLink}
                                        onChange={(e) => setGoogleForm({ ...googleForm, reviewLink: e.target.value })}
                                        style={inputStyle}
                                    />
                                </Field>

                                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={googleForm.isGoogleFeatured}
                                            onChange={(e) => setGoogleForm({ ...googleForm, isGoogleFeatured: e.target.checked })}
                                            className="w-4 h-4 rounded text-blue-500 focus:ring-0 bg-white/10"
                                        />
                                        <span className="text-xs font-bold text-white">
                                            Make this the Spotlight Review on the Homepage immediately
                                        </span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setGoogleModalOpen(false)}
                                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white/60 hover:text-white transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={savingGoogle}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition bg-blue-600 hover:bg-blue-500"
                                    >
                                        {savingGoogle ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                        Save Google Review
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal for Custom Platform Reviews */}
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
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div>
                                    <h3 className="text-lg font-extrabold text-white">
                                        {editing ? 'Edit Customer Review' : 'Add New Review'}
                                    </h3>
                                    <p className="text-xs text-white/40 mt-0.5">
                                        Provide review quote, rating, platform source, and direct link.
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
                                <Field label="Exact Review Link URL" optional>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            placeholder="https://maps.app.goo.gl/... or https://www.solarquotes.com.au/..."
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
                                </Field>

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

                                <Field label="Date / Timestamp" optional>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2 weeks ago, or Oct 2024"
                                        value={form.reviewDate}
                                        onChange={(e) => setForm({ ...form, reviewDate: e.target.value })}
                                        style={inputStyle}
                                    />
                                </Field>

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

                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.isFeatured}
                                            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                                            className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-white/10"
                                        />
                                        <span className="text-xs font-bold text-white">Show on Website Carousel</span>
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
