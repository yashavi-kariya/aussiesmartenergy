import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, LogOut, ChevronLeft, RefreshCw, Upload, Trash2,
    Eye, Image as ImageIcon, AlertCircle, CheckCircle2,
    X, Plus, FileText, Star, Sparkles, Layers, ArrowUpRight, Megaphone
} from 'lucide-react';
import api from '../utils/api';
import { getImageUrl } from '../utils/imageUrl';

const NAVY = '#1d2e57ff';
const NAVY_DARK = '#0f1c3fff';
const NAVY_LIGHT = '#213885ff';
const NAVY_MID = '#133ea1ff';
const GREEN = '#39b54a';
const GREEN_DARK = '#2e9a3d';
const MAX_BANNERS = 10;

const AdminBanners = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Preview / Delete modals
    const [previewImage, setPreviewImage] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ open: false, banner: null });

    const fetchBanners = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get('/banners/admin/all');
            if (res.data?.success) {
                setBanners(res.data.data.banners || []);
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to load banner images');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const showSuccessToast = (msg) => {
        setSuccess(msg);
        setTimeout(() => setSuccess(''), 4000);
    };

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length === 0) return;

        const currentCount = banners.length;
        if (currentCount >= MAX_BANNERS) {
            setError(`Maximum limit of ${MAX_BANNERS} hero banners has been reached. Please delete an image first.`);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        if (currentCount + selectedFiles.length > MAX_BANNERS) {
            const remaining = MAX_BANNERS - currentCount;
            setError(`You can only upload ${remaining} more image${remaining > 1 ? 's' : ''} (Max ${MAX_BANNERS} total).`);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });

        setUploading(true);
        setError('');
        try {
            const res = await api.post('/banners', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (res.data?.success) {
                showSuccessToast(`${selectedFiles.length} hero banner image(s) uploaded successfully!`);
                await fetchBanners();
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to upload banner images.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal.banner) return;
        const bannerId = deleteModal.banner._id;
        try {
            const res = await api.delete(`/banners/${bannerId}`);
            if (res.data?.success) {
                showSuccessToast('Hero banner image deleted successfully.');
                setBanners(prev => prev.filter(b => b._id !== bannerId));
                setDeleteModal({ open: false, banner: null });
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to delete banner image.');
            setDeleteModal({ open: false, banner: null });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/login/admin');
    };

    const remainingSlots = Math.max(0, MAX_BANNERS - banners.length);

    return (
        <div
            className="min-h-screen flex flex-col text-slate-100"
            style={{ background: `linear-gradient(160deg, ${NAVY_DARK} 0%, ${NAVY} 60%, ${NAVY_MID} 100%)` }}
        >
            {/* ── Sticky Header ── */}
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
                                Hero Banners
                            </span>
                        </h1>
                        <p className="text-xs text-white/40">Manage rotating hero background images</p>
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
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate('/admin/projects')}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                            background: 'rgba(59,130,246,0.12)',
                            border: '1px solid rgba(59,130,246,0.25)',
                            color: '#bfdbfe',
                        }}
                    >
                        <FileText className="w-3.5 h-3.5" />
                        Projects
                    </button>

                    <button
                        onClick={() => navigate('/admin/reviews')}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                            background: 'rgba(250,204,21,0.12)',
                            border: '1px solid rgba(250,204,21,0.25)',
                            color: '#fef08a',
                        }}
                    >
                        <Star className="w-3.5 h-3.5 text-yellow-400" />
                        Reviews
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
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
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

            {/* ── Main Content ── */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">

                {/* Top Info Bar & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 rounded-2xl md:col-span-2 flex flex-col justify-between"
                        style={{
                            background: `linear-gradient(135deg, ${NAVY_LIGHT}90, ${NAVY_MID}90)`,
                            border: '1px solid rgba(255,255,255,0.09)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                        }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
                                    <Sparkles className="w-3.5 h-3.5" /> Dynamic Homepage Carousel
                                </span>
                                <h2 className="text-xl md:text-2xl font-extrabold text-white">Hero Background Images</h2>
                                <p className="text-white/60 text-xs md:text-sm mt-1 max-w-2xl">
                                    Images uploaded here automatically transition every 2–3 seconds behind the homepage hero section.
                                    If no images are uploaded, the hero gracefully displays the default high-resolution solar home image.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-white/50">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Max 10 Images Allowed
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-sky-400"></span> 2.5s Smooth Cross-fade
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-indigo-400"></span> GPU Accelerated
                            </span>
                        </div>
                    </motion.div>

                    {/* Counter Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-5 rounded-2xl flex flex-col justify-between"
                        style={{
                            background: `linear-gradient(135deg, ${NAVY_LIGHT}80, ${NAVY_MID}80)`,
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-white/50 text-sm font-medium">Uploaded / Capacity</p>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${banners.length >= MAX_BANNERS ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                }`}>
                                {banners.length >= MAX_BANNERS ? 'At Limit (10/10)' : `${remainingSlots} Slots Left`}
                            </span>
                        </div>

                        <div className="my-3">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-white">{banners.length}</span>
                                <span className="text-lg font-bold text-white/40">/ {MAX_BANNERS}</span>
                            </div>
                            {/* Progress bar */}
                            <div className="w-full h-2 rounded-full bg-white/10 mt-3 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${(banners.length / MAX_BANNERS) * 100}%`,
                                        background: banners.length >= MAX_BANNERS ? '#f59e0b' : `linear-gradient(90deg, ${GREEN}, #10b981)`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-white/50">
                            <span>Upload format: JPG, PNG, WEBP</span>
                            <button
                                onClick={fetchBanners}
                                disabled={loading}
                                className="hover:text-white transition-colors flex items-center gap-1"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* ── Toast notifications ── */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            className="px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg"
                            style={{ background: `${GREEN}22`, border: `1px solid ${GREEN}40`, color: '#6ee7b7' }}
                        >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {success}
                        </motion.div>
                    )}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            className="px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between shadow-lg"
                            style={{ background: 'rgba(239,68,68,0.18)', border: '1px solid rgba(239,68,68,0.35)', color: '#fca5a5' }}
                        >
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-400" /> {error}
                            </div>
                            <button onClick={() => setError('')} className="p-1 hover:text-white"><X className="w-4 h-4" /></button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Upload Box Section ── */}
                <div
                    className="p-6 rounded-3xl relative overflow-hidden"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        className="hidden"
                        disabled={banners.length >= MAX_BANNERS || uploading}
                    />

                    {banners.length >= MAX_BANNERS ? (
                        <div className="p-6 rounded-2xl text-center flex flex-col items-center justify-center border border-amber-500/20 bg-amber-500/5">
                            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3">
                                <Layers className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold text-white">Maximum Image Limit Reached (10/10)</h3>
                            <p className="text-xs text-white/50 mt-1 max-w-md">
                                You have uploaded the maximum allowed number of hero background images.
                                Delete one or more images from the gallery below to upload new banners.
                            </p>
                        </div>
                    ) : (
                        <div
                            onClick={() => !uploading && fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${uploading
                                    ? 'border-emerald-500/50 bg-emerald-500/5 cursor-wait'
                                    : 'border-white/20 hover:border-emerald-400/60 hover:bg-white/[0.02]'
                                }`}
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3.5 transition-transform duration-300 group-hover:scale-110"
                                style={{
                                    background: `linear-gradient(135deg, ${GREEN}25, ${NAVY_LIGHT})`,
                                    border: `1px solid ${GREEN}40`
                                }}
                            >
                                {uploading ? (
                                    <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
                                ) : (
                                    <Upload className="w-6 h-6 text-emerald-400" />
                                )}
                            </div>

                            <h3 className="text-base font-bold text-white">
                                {uploading ? 'Uploading banner image(s)...' : 'Click to Upload Hero Banner Images'}
                            </h3>
                            <p className="text-xs text-white/50 mt-1 max-w-md">
                                Select up to {remainingSlots} image{remainingSlots > 1 ? 's' : ''} (JPG, PNG, WEBP). Recommended size: 1920x1080px or higher for crisp desktop display.
                            </p>

                            <button
                                type="button"
                                disabled={uploading}
                                className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                                style={{
                                    background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`,
                                    color: '#ffffff',
                                    boxShadow: `0 4px 18px ${GREEN}40`
                                }}
                            >
                                <Plus className="w-4 h-4" />
                                {uploading ? 'Processing Upload...' : 'Choose Images from Computer'}
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Banners Gallery Grid ── */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-emerald-400" />
                                Active Hero Carousel ({banners.length})
                            </h3>
                            <p className="text-xs text-white/40">These slides are active in the homepage hero background</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[1, 2, 3].map(n => (
                                <div key={n} className="h-56 rounded-2xl bg-white/5 animate-pulse border border-white/10" />
                            ))}
                        </div>
                    ) : banners.length === 0 ? (
                        <div
                            className="p-12 rounded-3xl text-center flex flex-col items-center justify-center"
                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-4">
                                <ImageIcon className="w-8 h-8" />
                            </div>
                            <h4 className="text-base font-bold text-white">No Custom Hero Banners Uploaded Yet</h4>
                            <p className="text-xs text-white/50 mt-1.5 max-w-md">
                                The homepage hero section is currently using the default solar rooftop background. Upload 1 to 10 images above to activate the automated dynamic slider!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {banners.map((banner, index) => (
                                <motion.div
                                    key={banner._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="group relative rounded-2xl overflow-hidden flex flex-col justify-between"
                                    style={{
                                        background: `${NAVY_LIGHT}40`,
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                                    }}
                                >
                                    {/* Image Container with 16:9 Aspect */}
                                    <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                                        <img
                                            src={getImageUrl(banner.imageUrl)}
                                            alt={banner.title || `Hero Slide ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                                        {/* Top Badge */}
                                        <div className="absolute top-3 left-3 flex items-center gap-2">
                                            <span
                                                className="px-2.5 py-1 rounded-lg text-xs font-extrabold tracking-wide"
                                                style={{
                                                    background: 'rgba(15,28,63,0.85)',
                                                    border: `1px solid ${GREEN}60`,
                                                    color: GREEN,
                                                    backdropFilter: 'blur(8px)',
                                                }}
                                            >
                                                Slide #{index + 1}
                                            </span>
                                        </div>

                                        {/* Action Buttons on Hover */}
                                        <div className="absolute top-3 right-3 flex items-center gap-2">
                                            <button
                                                onClick={() => setPreviewImage(banner.imageUrl)}
                                                className="p-2 rounded-xl text-white/80 hover:text-white transition-all duration-200"
                                                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
                                                title="Preview Fullscreen"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteModal({ open: true, banner })}
                                                className="p-2 rounded-xl text-red-300 hover:text-red-100 transition-all duration-200"
                                                style={{ background: 'rgba(239,68,68,0.3)', backdropFilter: 'blur(8px)', border: '1px solid rgba(239,68,68,0.4)' }}
                                                title="Delete Banner"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="p-4 flex items-center justify-between text-xs text-white/60 bg-white/[0.02]">
                                        <span className="truncate max-w-[200px] font-medium text-white/80" title={banner.title}>
                                            {banner.title || `Hero Image ${index + 1}`}
                                        </span>
                                        <span className="text-[11px] text-white/40">
                                            {banner.createdAt ? new Date(banner.createdAt).toLocaleDateString() : 'Active'}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* ── Fullscreen Image Preview Lightbox Modal ── */}
            <AnimatePresence>
                {previewImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPreviewImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
                    >
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            src={getImageUrl(previewImage)}
                            alt="Banner Preview"
                            className="max-w-5xl max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Delete Confirmation Modal ── */}
            <AnimatePresence>
                {deleteModal.open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-md p-6 rounded-3xl text-slate-100 shadow-2xl"
                            style={{
                                background: `linear-gradient(145deg, ${NAVY_DARK}, ${NAVY})`,
                                border: '1px solid rgba(255,255,255,0.12)',
                            }}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
                                <Trash2 className="w-6 h-6" />
                            </div>

                            <h3 className="text-lg font-extrabold text-white">Delete Hero Banner?</h3>
                            <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                                Are you sure you want to remove this background image from the hero carousel? It will no longer appear on the homepage.
                            </p>

                            {deleteModal.banner && (
                                <div className="my-4 aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
                                    <img
                                        src={deleteModal.banner.imageUrl}
                                        alt="To delete"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setDeleteModal({ open: false, banner: null })}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/5 transition-colors text-white/70"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-5 py-2 rounded-xl text-xs font-bold bg-red-500 hover:bg-red-600 text-white transition-colors shadow-lg shadow-red-500/30"
                                >
                                    Yes, Delete Image
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminBanners;
