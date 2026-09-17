import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Edit2, Trash2, X, ChevronLeft, RefreshCw, Image as ImageIcon,
    Zap, LogOut, Upload, Eye, Hash, LayoutGrid, RotateCcw, ShieldAlert,
    Database, Archive, CheckCircle2, Star, Megaphone
} from 'lucide-react';
import api from '../utils/api';
import { getImageUrl } from '../utils/imageUrl';

const NAVY = '#1d2e57ff';
const NAVY_DARK = '#0f1c3fff';
const NAVY_LIGHT = '#213885ff';
const NAVY_MID = '#133ea1ff';
const GREEN = '#39b54a';
const GREEN_DARK = '#2e9a3d';

/* ─── Tiny helpers ─── */
const Field = ({ label, children }) => (
    <div>
        <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {label}
        </label>
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

const AdminProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [counts, setCounts] = useState({ active: 0, deleted: 0 });


    
    const [activeTab, setActiveTab] = useState('active'); // 'active' | 'deleted_from_admin'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    /* ── Modal state ── */
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null); // null = create mode
    const [form, setForm] = useState({ name: '', shortDescription: '', longDescription: '' });
    const [mainImageFile, setMainImageFile] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState('');
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [saving, setSaving] = useState(false);

    /* ── Delete confirm state ── */
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleteMode, setDeleteMode] = useState('admin_only'); // 'admin_only' | 'both'
    const [deleteText, setDeleteText] = useState('');
    const [deleting, setDeleting] = useState(false);

    const mainImgRef = useRef();
    const galleryRef = useRef();

    /* ─────────────────────────── Data ─────────────────────────── */
    const loadProjects = async (tabToLoad = activeTab) => {
        setLoading(true);
        setError('');
        try {
            const statusParam = tabToLoad === 'deleted_from_admin' ? 'deleted_from_admin' : 'active';
            const [currentRes, allRes, deletedRes] = await Promise.all([
                api.get(`/projects?status=${statusParam}`),
                api.get('/projects?status=active'),
                api.get('/projects?status=deleted_from_admin'),
            ]);

            if (currentRes.data?.success) setProjects(currentRes.data.data);
            setCounts({
                active: allRes.data?.data?.length || 0,
                deleted: deletedRes.data?.data?.length || 0,
            });
        } catch {
            setError('Failed to load projects.');
        }
        setLoading(false);
    };

    useEffect(() => {
        loadProjects(activeTab);
    }, [activeTab]);

    const showSuccess = (msg) => {
        setSuccess(msg);
        setTimeout(() => setSuccess(''), 3500);
    };

    /* ─────────────────────────── Modal helpers ─────────────────────────── */
    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', shortDescription: '', longDescription: '' });
        setMainImageFile(null);
        setMainImagePreview('');
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setError('');
        setModalOpen(true);
    };

    const openEdit = (p) => {
        setEditing(p);
        setForm({ name: p.name, shortDescription: p.shortDescription || '', longDescription: p.longDescription || '' });
        setMainImageFile(null);
        setMainImagePreview(p.mainImage ? getImageUrl(p.mainImage) : '');
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setError('');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditing(null);
        setError('');
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setMainImageFile(file);
        setMainImagePreview(URL.createObjectURL(file));
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        setGalleryFiles(files);
        setGalleryPreviews(files.map(f => URL.createObjectURL(f)));
    };

    /* ─────────────────────────── Submit ─────────────────────────── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) { setError('Project name is required.'); return; }
        setSaving(true);
        setError('');
        const fd = new FormData();
        fd.append('name', form.name.trim());
        fd.append('shortDescription', form.shortDescription);
        fd.append('longDescription', form.longDescription);
        if (mainImageFile) fd.append('mainImage', mainImageFile);
        for (const f of galleryFiles) fd.append('gallery', f);

        try {
            if (editing) {
                const res = await api.put(`/projects/${editing._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
                if (res.data?.success) { closeModal(); loadProjects(); showSuccess('Project updated!'); }
            } else {
                const res = await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
                if (res.data?.success) { closeModal(); loadProjects(); showSuccess('Project created!'); }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving project.');
        }
        setSaving(false);
    };

    /* ─────────────────────────── Delete ─────────────────────────── */
    const openDeleteModal = (project, defaultMode = 'admin_only') => {
        setDeleteTarget(project);
        setDeleteMode(defaultMode);
        setDeleteText('');
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        if (deleteMode === 'both' && deleteText !== 'DELETE') return;
        setDeleting(true);
        try {
            const res = await api.delete(`/projects/${deleteTarget._id}?mode=${deleteMode}`);
            if (res.data?.success) {
                const isSoft = deleteMode === 'admin_only';
                setDeleteTarget(null);
                setDeleteText('');
                loadProjects();
                showSuccess(
                    isSoft
                        ? `"${deleteTarget.name}" removed from Admin view (safely kept in database).`
                        : `"${deleteTarget.name}" permanently deleted from database & files.`
                );
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting project.');
        }
        setDeleting(false);
    };

    /* ─────────────────────────── Restore ─────────────────────────── */
    const handleRestore = async (p) => {
        try {
            const res = await api.patch(`/projects/${p._id}/restore`);
            if (res.data?.success) {
                loadProjects();
                showSuccess(`"${p.name}" restored back to Active Admin Projects!`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error restoring project.');
        }
    };

    /* ─────────────────────────── Gallery image removal ─────────────────────────── */
    const removeGalleryImg = async (projId, imgUrl) => {
        const imageName = imgUrl.split('/').pop();
        try {
            const res = await api.delete(`/projects/${projId}/gallery/${imageName}`);
            if (res.data?.success) loadProjects();
        } catch { setError('Error removing gallery image.'); }
    };

    /* ─────────────────────────── Logout ─────────────────────────── */
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login/admin');
    };

    /* ════════════════════════════ RENDER ════════════════════════════ */
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ background: `linear-gradient(160deg, ${NAVY_DARK} 0%, ${NAVY} 60%, ${NAVY_MID} 100%)` }}
        >
            {/* ── Sticky Header ── */}
            <header
                className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between"
                style={{
                    background: `${NAVY_DARK}f0`,
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                }}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl" style={{ background: `${GREEN}18`, border: `1.5px solid ${GREEN}35` }}>
                        <Zap className="w-5 h-5" style={{ color: GREEN }} />
                    </div>
                    <div>
                        <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                            Aussie Smart Energy
                            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: `${GREEN}22`, color: GREEN, border: `1px solid ${GREEN}40` }}>
                                Projects
                            </span>
                        </h1>
                        <p className="text-xs text-white/40">Manage your project portfolio</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Dashboard
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
                        Hero Banners
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
                        style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">

                {/* ── Top bar ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-white">Project Portfolio</h2>
                        <p className="text-sm text-white/40 mt-0.5">
                            {activeTab === 'active'
                                ? `${projects.length} active ${projects.length === 1 ? 'project' : 'projects'} on portfolio`
                                : `${projects.length} deleted from admin (safely preserved in database)`}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => loadProjects(activeTab)}
                            disabled={loading}
                            className="p-2.5 rounded-xl transition-colors disabled:opacity-50"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                            title="Refresh"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} style={loading ? { color: GREEN } : {}} />
                        </button>
                        <button
                            onClick={openCreate}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90"
                            style={{ background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`, color: '#fff', boxShadow: `0 4px 18px ${GREEN}40` }}
                        >
                            <Plus className="w-4 h-4" />
                            Add Project
                        </button>
                    </div>
                </div>

                {/* ── Tabs Bar ── */}
                <div className="flex items-center gap-2 p-1.5 rounded-2xl w-fit" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'active'
                                ? 'text-white shadow-lg'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                        style={activeTab === 'active' ? { background: `linear-gradient(135deg, ${NAVY_LIGHT}, ${NAVY_MID})`, border: `1px solid ${GREEN}50` } : {}}
                    >
                        <LayoutGrid className="w-3.5 h-3.5" style={activeTab === 'active' ? { color: GREEN } : {}} />
                        <span>Active Projects</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: activeTab === 'active' ? `${GREEN}25` : 'rgba(255,255,255,0.08)', color: activeTab === 'active' ? GREEN : 'rgba(255,255,255,0.6)' }}>
                            {counts.active}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('deleted_from_admin')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'deleted_from_admin'
                                ? 'text-white shadow-lg'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                        style={activeTab === 'deleted_from_admin' ? { background: `linear-gradient(135deg, ${NAVY_LIGHT}, ${NAVY_MID})`, border: '1px solid rgba(239,68,68,0.4)' } : {}}
                    >
                        <Archive className="w-3.5 h-3.5" style={activeTab === 'deleted_from_admin' ? { color: '#f87171' } : {}} />
                        <span>Deleted from Admin (In Database)</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: activeTab === 'deleted_from_admin' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.08)', color: activeTab === 'deleted_from_admin' ? '#fca5a5' : 'rgba(255,255,255,0.6)' }}>
                            {counts.deleted}
                        </span>
                    </button>
                </div>

                {/* ── Toast notifications ── */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            className="px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
                            style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
                        >
                            <CheckCircle2 className="w-4 h-4" /> {success}
                        </motion.div>
                    )}
                    {error && !modalOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            className="px-4 py-3 rounded-xl text-sm font-semibold"
                            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Empty / Loading state ── */}
                {loading && projects.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-white/30">
                        <RefreshCw className="w-10 h-10 animate-spin mb-4" style={{ color: GREEN }} />
                        <p className="text-sm">Loading projects...</p>
                    </div>
                )}

                {!loading && projects.length === 0 && (
                    <div
                        className="flex flex-col items-center justify-center py-24 rounded-2xl"
                        style={{ border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
                    >
                        {activeTab === 'active' ? (
                            <>
                                <LayoutGrid className="w-12 h-12 mb-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
                                <p className="text-white/40 font-semibold mb-1">No active projects</p>
                                <p className="text-white/25 text-sm mb-6">Add your first project to showcase it on the homepage</p>
                                <button
                                    onClick={openCreate}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                                    style={{ background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`, color: '#fff' }}
                                >
                                    <Plus className="w-4 h-4" /> Add First Project
                                </button>
                            </>
                        ) : (
                            <>
                                <Database className="w-12 h-12 mb-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
                                <p className="text-white/40 font-semibold mb-1">No deleted/archived projects</p>
                                <p className="text-white/25 text-sm">Projects deleted from the Admin panel will be listed here and kept safe in the database.</p>
                            </>
                        )}
                    </div>
                )}

                {/* ── Projects Grid ── */}
                {projects.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map((p, idx) => (
                            <motion.div
                                key={p._id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: idx * 0.05 }}
                                className="rounded-2xl overflow-hidden flex flex-col"
                                style={{
                                    background: `linear-gradient(145deg, ${NAVY_LIGHT}80, ${NAVY_MID}80)`,
                                    border: p.deletedFromAdmin ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(255,255,255,0.08)',
                                    boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                                }}
                            >
                                {/* Thumbnail */}
                                <div className="relative w-full h-44 bg-black/30 overflow-hidden flex items-center justify-center">
                                    {p.mainImage ? (
                                        <img
                                            src={getImageUrl(p.mainImage)}
                                            alt={p.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <ImageIcon className="w-10 h-10" style={{ color: 'rgba(255,255,255,0.2)' }} />
                                    )}
                                    {/* Index badge */}
                                    <div
                                        className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1"
                                        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        <Hash className="w-3 h-3" />{p.displayOrder}
                                    </div>
                                    {/* Status Badge */}
                                    {p.deletedFromAdmin ? (
                                        <div
                                            className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1"
                                            style={{ background: 'rgba(239,68,68,0.85)', color: '#fff', backdropFilter: 'blur(4px)' }}
                                        >
                                            <Archive className="w-3 h-3" /> Admin Deleted (In DB)
                                        </div>
                                    ) : p.gallery?.length > 0 ? (
                                        <div
                                            className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg text-xs font-bold"
                                            style={{ background: `${GREEN}cc`, color: '#fff', backdropFilter: 'blur(4px)' }}
                                        >
                                            +{p.gallery.length} photos
                                        </div>
                                    ) : null}
                                </div>

                                {/* Content */}
                                <div className="p-4 flex-1 flex flex-col gap-2">
                                    <h3 className="font-bold text-white text-base leading-snug">{p.name}</h3>
                                    {p.shortDescription && (
                                        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{p.shortDescription}</p>
                                    )}
                                    <div className="mt-1">
                                        <span className="text-xs font-mono px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
                                            /{p.slug}
                                        </span>
                                    </div>

                                    {/* Gallery thumbnails */}
                                    {p.gallery?.length > 0 && (
                                        <div className="grid grid-cols-4 gap-1.5 mt-2">
                                            {p.gallery.slice(0, 4).map((g, i) => (
                                                <div key={i} className="relative group rounded-md overflow-hidden h-12">
                                                    <img src={getImageUrl(g)} alt="" className="w-full h-full object-cover" />
                                                    {!p.deletedFromAdmin && (
                                                        <button
                                                            onClick={() => removeGalleryImg(p._id, g)}
                                                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X className="w-3.5 h-3.5 text-red-400" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            {p.gallery.length > 4 && (
                                                <div className="h-12 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
                                                    +{p.gallery.length - 4}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-auto pt-3 flex gap-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                        {p.deletedFromAdmin ? (
                                            <>
                                                <button
                                                    onClick={() => handleRestore(p)}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                                                    style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5" /> Restore to Admin
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(p, 'both')}
                                                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                                                    style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
                                                    title="Permanently delete from database"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" /> Delete from DB
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => openEdit(p)}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                                                    style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.25)', color: '#60a5fa' }}
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" /> Edit
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/projects/${p.slug}`)}
                                                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                                                    style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}30`, color: GREEN }}
                                                    title="View on site"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(p, 'admin_only')}
                                                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                                                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.22)', color: '#f87171' }}
                                                    title="Delete project options"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* ════════════════════ ADD / EDIT MODAL ════════════════════ */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" style={{ background: 'rgba(10,16,32,0.88)', backdropFilter: 'blur(8px)' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ duration: 0.22 }}
                            className="w-full max-w-2xl rounded-2xl overflow-hidden my-6"
                            style={{
                                background: `linear-gradient(145deg, ${NAVY_LIGHT}, ${NAVY_MID})`,
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                            }}
                        >
                            {/* Green accent bar */}
                            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${GREEN}, ${GREEN_DARK})` }} />

                            {/* Modal header */}
                            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <div>
                                    <h2 className="text-lg font-extrabold text-white">{editing ? 'Edit Project' : 'Add New Project'}</h2>
                                    <p className="text-xs text-white/40 mt-0.5">{editing ? `Editing: ${editing.name}` : 'Fill in the details below'}</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-1.5 rounded-lg text-white/40 hover:text-white transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.07)' }}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal body */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {error && (
                                    <div className="px-4 py-2.5 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
                                        {error}
                                    </div>
                                )}

                                {/* Name */}
                                <Field label="Project Name *">
                                    <input
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        style={inputStyle}
                                        placeholder="e.g. 50kW Commercial Solar — Sydney CBD"
                                        required
                                    />
                                </Field>

                                {/* Short Description */}
                                <Field label="Short Description">
                                    <input
                                        value={form.shortDescription}
                                        onChange={e => setForm({ ...form, shortDescription: e.target.value })}
                                        style={inputStyle}
                                        placeholder="One-liner shown on the home page card"
                                    />
                                </Field>

                                {/* Long Description */}
                                <Field label="Long Description">
                                    <textarea
                                        value={form.longDescription}
                                        onChange={e => setForm({ ...form, longDescription: e.target.value })}
                                        style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                                        placeholder="Full project description shown on the project detail page..."
                                        rows={5}
                                    />
                                </Field>

                                {/* Main Image */}
                                <Field label="Main Image">
                                    <div className="flex items-start gap-4">
                                        {mainImagePreview ? (
                                            <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={mainImagePreview} alt="preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => { setMainImageFile(null); setMainImagePreview(''); if (mainImgRef.current) mainImgRef.current.value = ''; }}
                                                    className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60"
                                                >
                                                    <X className="w-3 h-3 text-white" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                className="w-28 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{ border: '2px dashed rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)' }}
                                            >
                                                <ImageIcon className="w-7 h-7" style={{ color: 'rgba(255,255,255,0.2)' }} />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <input
                                                ref={mainImgRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleMainImageChange}
                                                className="hidden"
                                                id="mainImgInput"
                                            />
                                            <label
                                                htmlFor="mainImgInput"
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-90"
                                                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', display: 'inline-flex' }}
                                            >
                                                <Upload className="w-4 h-4" />
                                                {mainImageFile ? 'Change Image' : editing?.mainImage ? 'Replace Image' : 'Choose Image'}
                                            </label>
                                            <p className="text-xs text-white/30 mt-2">JPG, PNG, WebP — recommended 1200×800px</p>
                                        </div>
                                    </div>
                                </Field>

                                {/* Gallery */}
                                <Field label="Gallery Images (multiple)">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <input
                                                ref={galleryRef}
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleGalleryChange}
                                                className="hidden"
                                                id="galleryInput"
                                            />
                                            <label
                                                htmlFor="galleryInput"
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:opacity-90"
                                                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', display: 'inline-flex' }}
                                            >
                                                <Upload className="w-4 h-4" />
                                                {galleryFiles.length > 0 ? `${galleryFiles.length} new file(s) selected` : 'Add Gallery Photos'}
                                            </label>
                                            {galleryFiles.length > 0 && (
                                                <button type="button" onClick={() => { setGalleryFiles([]); setGalleryPreviews([]); if (galleryRef.current) galleryRef.current.value = ''; }} className="text-xs text-red-400 hover:text-red-300">
                                                    Clear new
                                                </button>
                                            )}
                                        </div>
                                        {/* New file previews */}
                                        {galleryPreviews.length > 0 && (
                                            <div className="grid grid-cols-5 gap-2">
                                                {galleryPreviews.map((src, i) => (
                                                    <div key={i} className="rounded-lg overflow-hidden h-16">
                                                        <img src={src} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {/* Existing gallery (edit mode) */}
                                        {editing && editing.gallery?.length > 0 && (
                                            <div>
                                                <p className="text-xs text-white/35 mb-2">Existing gallery — hover to remove:</p>
                                                <div className="grid grid-cols-5 gap-2">
                                                    {editing.gallery.map((g, i) => (
                                                        <div key={i} className="relative group rounded-lg overflow-hidden h-16">
                                                            <img src={getImageUrl(g)} alt="" className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeGalleryImg(editing._id, g)}
                                                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-4 h-4 text-red-400" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Field>

                                {/* Footer */}
                                <div className="flex justify-end gap-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-white/70 hover:text-white"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 flex items-center gap-2"
                                        style={{ background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`, boxShadow: `0 4px 14px ${GREEN}40` }}
                                    >
                                        {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
                                        {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ════════════════════ DELETE CONFIRM MODAL ════════════════════ */}
            <AnimatePresence>
                {deleteTarget && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,16,32,0.90)', backdropFilter: 'blur(8px)' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-lg rounded-2xl overflow-hidden p-6 space-y-5"
                            style={{
                                background: `linear-gradient(145deg, ${NAVY_LIGHT}, ${NAVY_MID})`,
                                border: '1px solid rgba(255,255,255,0.12)',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                            }}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl" style={{ background: deleteMode === 'both' ? 'rgba(239,68,68,0.15)' : 'rgba(96,165,250,0.15)', border: `1px solid ${deleteMode === 'both' ? 'rgba(239,68,68,0.3)' : 'rgba(96,165,250,0.3)'}` }}>
                                    {deleteMode === 'both' ? (
                                        <Trash2 className="w-6 h-6" style={{ color: '#f87171' }} />
                                    ) : (
                                        <Archive className="w-6 h-6" style={{ color: '#60a5fa' }} />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Delete Project</h3>
                                    <p className="text-xs text-white/40">Select how you want to delete this project</p>
                                </div>
                            </div>

                            <p className="text-sm text-white/70">
                                Target project: <span className="font-bold text-white">"{deleteTarget.name}"</span>
                            </p>

                            {/* Options Selector */}
                            <div className="space-y-3">
                                {/* Option 1: Delete from Admin Only */}
                                <div
                                    onClick={() => setDeleteMode('admin_only')}
                                    className={`p-4 rounded-xl cursor-pointer border transition-all ${deleteMode === 'admin_only'
                                            ? 'bg-blue-500/15 border-blue-400/60 shadow-lg'
                                            : 'bg-white/5 border-white/10 hover:bg-white/8'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            name="deleteOption"
                                            checked={deleteMode === 'admin_only'}
                                            onChange={() => setDeleteMode('admin_only')}
                                            className="mt-1 cursor-pointer accent-blue-400"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-bold text-white">1. Delete from Admin Only</h4>
                                                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                                                    Safe / Keeps in DB
                                                </span>
                                            </div>
                                            <p className="text-xs text-white/50 mt-1 leading-relaxed">
                                                Removes this project from your active Admin view. The project data, gallery photos, and database records remain <span className="text-white font-medium">safely stored in MongoDB</span> and can be restored anytime.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Option 2: Delete from Both Admin & Database */}
                                <div
                                    onClick={() => setDeleteMode('both')}
                                    className={`p-4 rounded-xl cursor-pointer border transition-all ${deleteMode === 'both'
                                            ? 'bg-red-500/15 border-red-500/60 shadow-lg'
                                            : 'bg-white/5 border-white/10 hover:bg-white/8'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            name="deleteOption"
                                            checked={deleteMode === 'both'}
                                            onChange={() => setDeleteMode('both')}
                                            className="mt-1 cursor-pointer accent-red-400"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-bold text-white">2. Delete from Both (Admin & Database)</h4>
                                                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                                                    Permanent
                                                </span>
                                            </div>
                                            <p className="text-xs text-white/50 mt-1 leading-relaxed">
                                                Permanently wipes the project document from the MongoDB database and deletes all uploaded image files from the server. <span className="text-red-400 font-medium">Cannot be undone.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Type DELETE confirmation if hard delete */}
                            {deleteMode === 'both' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-3 rounded-xl bg-red-950/40 border border-red-500/20 space-y-2"
                                >
                                    <label className="block text-xs text-red-300 font-bold uppercase tracking-wide">
                                        Type <span className="font-mono text-white bg-black/40 px-1.5 py-0.5 rounded">DELETE</span> to confirm permanent deletion:
                                    </label>
                                    <input
                                        type="text"
                                        value={deleteText}
                                        onChange={e => setDeleteText(e.target.value)}
                                        className="w-full py-2 px-3 text-white text-sm rounded-xl outline-none font-mono"
                                        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(239,68,68,0.4)' }}
                                        placeholder="DELETE"
                                        autoFocus
                                    />
                                </motion.div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => { setDeleteTarget(null); setDeleteText(''); }}
                                    className="px-4 py-2 rounded-xl text-white/70 hover:text-white text-sm font-semibold transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={deleting || (deleteMode === 'both' && deleteText !== 'DELETE')}
                                    className="px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-30 flex items-center gap-2"
                                    style={{
                                        background: deleteMode === 'both'
                                            ? 'linear-gradient(135deg, #ef4444, #b91c1c)'
                                            : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                        boxShadow: deleteMode === 'both'
                                            ? '0 4px 14px rgba(239,68,68,0.35)'
                                            : '0 4px 14px rgba(59,130,246,0.35)',
                                    }}
                                >
                                    {deleting && <RefreshCw className="w-4 h-4 animate-spin" />}
                                    {deleteMode === 'both' ? 'Delete from Both (Permanent)' : 'Delete from Admin Only'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminProjects;
