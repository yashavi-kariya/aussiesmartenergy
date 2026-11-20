import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Save,
  ExternalLink,
  Smartphone,
  Monitor,
  Share2,
  Sparkles,
  Eye,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  FolderTree,
  Sliders,
  Check,
  RefreshCw,
  Info,
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import api from '../utils/api';

const NAVY = '#1d2e57ff';
const NAVY_DARK = '#0f1c3fff';
const GREEN = '#39b54a';
const GREEN_DARK = '#2e9a3d';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Pages' },
  { id: 'main', label: 'Main Pages' },
  { id: 'solar', label: 'Solar Packages' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'batteries', label: 'Batteries' },
  { id: 'calculator', label: 'Calculators' },
  { id: 'projects', label: 'Projects' },
];

const AdminSEO = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPageKey, setSelectedPageKey] = useState('home');
  const [devicePreview, setDevicePreview] = useState('desktop'); // 'desktop' | 'mobile'

  const [formData, setFormData] = useState({
    seoTitle: '',
    metaDescription: '',
    focusKeyword: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    noIndex: false,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all pages and their SEO states from backend
  const fetchAllPages = async (preserveSelectedKey = false) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await api.get('/seo');
      if (res.data?.success && res.data.data?.pages) {
        const fetchedPages = res.data.data.pages;
        setPages(fetchedPages);

        const targetKey = preserveSelectedKey ? selectedPageKey : (selectedPageKey || 'home');
        const currentSelected = fetchedPages.find((p) => p.pageKey === targetKey) || fetchedPages[0];

        if (currentSelected) {
          setSelectedPageKey(currentSelected.pageKey);
          populateForm(currentSelected);
        }
      }
    } catch (err) {
      setErrorMessage('Failed to load SEO pages from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPages();
  }, []);

  const populateForm = (page) => {
    setFormData({
      seoTitle: page.seoTitle || '',
      metaDescription: page.metaDescription || '',
      focusKeyword: page.focusKeyword || '',
      canonicalUrl: page.canonicalUrl || '',
      ogTitle: page.ogTitle || page.seoTitle || '',
      ogDescription: page.ogDescription || page.metaDescription || '',
      ogImage: page.ogImage || '',
      noIndex: Boolean(page.noIndex),
    });
  };

  const selectedPage = useMemo(() => {
    return pages.find((p) => p.pageKey === selectedPageKey) || null;
  }, [pages, selectedPageKey]);

  const handleSelectPage = (page) => {
    setSelectedPageKey(page.pageKey);
    populateForm(page);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const filteredPages = useMemo(() => {
    return pages.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        p.pageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.routePath.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.pageKey.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [pages, selectedCategory, searchQuery]);

  // Character count guidelines
  const titleLen = formData.seoTitle.length;
  const descLen = formData.metaDescription.length;

  const getTitleStatus = () => {
    if (titleLen === 0) return { label: 'Empty', color: '#94a3b8' };
    if (titleLen < 40) return { label: 'Short (< 40)', color: '#f59e0b' };
    if (titleLen <= 60) return { label: 'Optimal (40–60)', color: '#39b54a' };
    if (titleLen <= 70) return { label: 'Acceptable (60–70)', color: '#38bdf8' };
    return { label: 'Too Long (> 70)', color: '#ef4444' };
  };

  const getDescStatus = () => {
    if (descLen === 0) return { label: 'Empty', color: '#94a3b8' };
    if (descLen < 120) return { label: 'Short (< 120)', color: '#f59e0b' };
    if (descLen <= 160) return { label: 'Optimal (120–160)', color: '#39b54a' };
    if (descLen <= 180) return { label: 'Acceptable (160–180)', color: '#38bdf8' };
    return { label: 'Too Long (> 180)', color: '#ef4444' };
  };

  // Save changes to backend
  const handleSave = async (e) => {
    e?.preventDefault();
    if (!selectedPage) return;

    if (!formData.seoTitle.trim()) {
      setErrorMessage('SEO Title is required.');
      return;
    }
    if (!formData.metaDescription.trim()) {
      setErrorMessage('Meta Description is required.');
      return;
    }

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await api.put(`/seo/${selectedPage.pageKey}`, formData);
      if (res.data?.success) {
        setSuccessMessage(`SEO settings saved for "${selectedPage.pageName}"!`);
        // Refresh pages list to reflect customizations
        await fetchAllPages(true);
      } else {
        setErrorMessage(res.data?.message || 'Failed to save SEO settings.');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Server error while saving SEO.');
    } finally {
      setSaving(false);
    }
  };

  // Reset to default
  const handleReset = async () => {
    if (!selectedPage) return;
    const confirmReset = window.confirm(
      `Are you sure you want to reset "${selectedPage.pageName}" to its standard default SEO metadata?`
    );
    if (!confirmReset) return;

    setResetting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await api.post(`/seo/${selectedPage.pageKey}/reset`);
      if (res.data?.success) {
        setSuccessMessage(`Reset "${selectedPage.pageName}" to system defaults.`);
        await fetchAllPages(true);
      }
    } catch (err) {
      setErrorMessage('Failed to reset SEO metadata.');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col" style={{ background: NAVY_DARK }}>
      {/* ── Admin Header ── */}
      <AdminHeader activeSection="seo" subtitle="Dynamic SEO, Canonical URLs, Social Cards & Indexing Management" />

      {/* ── Notification alerts ── */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-4">
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-between text-sm font-semibold"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-white/60 hover:text-white text-xs">
              Dismiss
            </button>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-between text-sm font-semibold"
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage('')} className="text-white/60 hover:text-white text-xs">
              Dismiss
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Main SEO Control Grid ── */}
      <main className="max-w-7xl mx-auto w-full px-4 pb-16 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── Left Sidebar: Page Directory (4 Cols on lg) ── */}
        <aside
          className="lg:col-span-4 rounded-2xl p-4 sm:p-5 flex flex-col gap-4"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Pages & Routes</h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 font-mono font-semibold">
              {pages.length} Pages
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search page or route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Page List */}
          <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
            {loading ? (
              <div className="p-8 text-center text-xs text-white/50">Loading pages...</div>
            ) : filteredPages.length === 0 ? (
              <div className="p-8 text-center text-xs text-white/40">No matching pages found</div>
            ) : (
              filteredPages.map((page) => {
                const isSelected = page.pageKey === selectedPageKey;
                return (
                  <button
                    key={page.pageKey}
                    onClick={() => handleSelectPage(page)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-emerald-500/15 border border-emerald-500/40 text-white shadow-md'
                        : 'bg-white/[0.02] border border-white/5 text-white/70 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">{page.pageName}</span>
                        {page.isCustomized && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                            title="Customized SEO values stored in MongoDB"
                          />
                        )}
                        {page.noIndex && (
                          <span
                            className="text-[9px] px-1 py-0.2 rounded font-mono font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40"
                            title="Robots: noindex"
                          >
                            NoIndex
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/40 font-mono truncate">{page.routePath}</p>
                    </div>

                    <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-emerald-400 shrink-0" />
                  </button>
                );
              })
            )}
          </div>

          {/* Technical SEO Quick Reference */}
          <div className="pt-2 border-t border-white/10 text-[11px] text-white/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span>Sitemap:</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
              >
                /sitemap.xml <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Robots:</span>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
              >
                /robots.txt <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </aside>

        {/* ── Main Form & Live Previews (8 Cols on lg) ── */}
        <section className="lg:col-span-8 space-y-6">
          {selectedPage ? (
            <>
              {/* Top Action Bar */}
              <div
                className="rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-extrabold text-white">{selectedPage.pageName}</h2>
                    {selectedPage.isCustomized ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase tracking-wider">
                        Customized in DB
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold uppercase tracking-wider">
                        Default Preset
                      </span>
                    )}
                  </div>
                  <a
                    href={selectedPage.routePath}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-white/50 hover:text-emerald-400 flex items-center gap-1 font-mono mt-0.5"
                  >
                    {selectedPage.routePath} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    disabled={resetting || saving}
                    type="button"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-all disabled:opacity-50"
                    title="Reset this page to Aussie Smart Energy standard defaults"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
                    <span>Reset Default</span>
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    type="button"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>

              {/* Editable Fields Form */}
              <div
                className="rounded-2xl p-5 sm:p-6 space-y-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    Page Meta Attributes
                  </h3>
                  <span className="text-xs text-white/40">Saves directly to MongoDB</span>
                </div>

                {/* 1. SEO Title */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-white/80">
                      SEO Title <span className="text-rose-400">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px]" style={{ color: getTitleStatus().color }}>
                        {titleLen} chars ({getTitleStatus().label})
                      </span>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="Enter unique, keyword-rich SEO title..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                  <p className="text-[11px] text-white/45">
                    Recommended length: 50–60 characters. Shows as the main clickable headline in search engines.
                  </p>
                </div>

                {/* 2. Meta Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-white/80">
                      Meta Description <span className="text-rose-400">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px]" style={{ color: getDescStatus().color }}>
                        {descLen} chars ({getDescStatus().label})
                      </span>
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="Enter engaging, value-driven snippet for search engines..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors leading-relaxed"
                  />
                  <p className="text-[11px] text-white/45">
                    Recommended length: 140–160 characters. Accurately summarize the page content without misleading claims.
                  </p>
                </div>

                {/* 3. Focus Keyword & Canonical URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white/80 block">Focus Keyword</label>
                    <input
                      type="text"
                      value={formData.focusKeyword}
                      onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                      placeholder="e.g. 6.6kW solar system NSW"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                    <p className="text-[11px] text-white/45">Primary keyword phrase targeted for this page.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white/80 block">Canonical URL</label>
                    <input
                      type="text"
                      value={formData.canonicalUrl}
                      onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      placeholder="https://aussiesmartenergy.com.au/..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors font-mono text-xs"
                    />
                    <p className="text-[11px] text-white/45">Prevents duplicate content penalties for route aliases.</p>
                  </div>
                </div>

                {/* 4. OpenGraph Social Sharing Details */}
                <div className="pt-2 border-t border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5" />
                    Open Graph (Social Sharing Metadata)
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/80 block">OG Title (Optional Override)</label>
                      <input
                        type="text"
                        value={formData.ogTitle}
                        onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                        placeholder="Leave empty to use SEO Title"
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/80 block">OG Image URL</label>
                      <input
                        type="text"
                        value={formData.ogImage}
                        onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                        placeholder="https://aussiesmartenergy.com.au/og-image.png"
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white/80 block">OG Description (Optional Override)</label>
                    <textarea
                      rows={2}
                      value={formData.ogDescription}
                      onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                      placeholder="Leave empty to use Meta Description"
                      className="w-full px-3.5 py-2 rounded-xl text-xs bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors leading-relaxed"
                    />
                  </div>
                </div>

                {/* 5. Robots Indexing Controls */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <label htmlFor="noindex-toggle" className="text-xs font-bold text-white cursor-pointer">
                        Robots Search Engine Indexing
                      </label>
                      {formData.noIndex ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono font-bold uppercase">
                          noindex, nofollow
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold uppercase">
                          index, follow
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-white/45">
                      Enable only if this page should be hidden from Google search results (e.g. internal receipt pages).
                    </p>
                  </div>

                  <button
                    id="noindex-toggle"
                    type="button"
                    onClick={() => setFormData({ ...formData, noIndex: !formData.noIndex })}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                      formData.noIndex ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    aria-label="Toggle Robots Indexing"
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        formData.noIndex ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* ── Live Previews Section ── */}
              <div
                className="rounded-2xl p-5 sm:p-6 space-y-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    Live Search Engine & Social Previews
                  </h3>

                  {/* Device Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setDevicePreview('desktop')}
                      className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                        devicePreview === 'desktop'
                          ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDevicePreview('mobile')}
                      className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                        devicePreview === 'mobile'
                          ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Mobile</span>
                    </button>
                  </div>
                </div>

                {/* Google Search Result Card */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-white/70 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-sky-400" />
                    Google Search Result Snippet
                  </span>

                  <div
                    className={`p-4 sm:p-5 rounded-2xl bg-white text-slate-900 shadow-xl transition-all ${
                      devicePreview === 'mobile' ? 'max-w-md mx-auto border-4 border-slate-700' : 'w-full'
                    }`}
                  >
                    {/* Snippet URL and Favicon */}
                    <div className="flex items-center gap-2 text-xs mb-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center overflow-hidden">
                        <img src="/favicon.svg" alt="Aussie Smart Energy icon" className="w-3.5 h-3.5" />
                      </div>
                      <div className="leading-tight truncate">
                        <div className="font-medium text-slate-800 text-[11px]">Aussie Smart Energy</div>
                        <div className="text-[11px] text-slate-500 font-mono truncate">
                          {formData.canonicalUrl || `https://aussiesmartenergy.com.au${selectedPage.routePath}`}
                        </div>
                      </div>
                    </div>

                    {/* Snippet Title */}
                    <h4 className="text-base sm:text-lg font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                      {formData.seoTitle || 'Page Title Not Set'}
                    </h4>

                    {/* Snippet Meta Description */}
                    <p className="text-xs sm:text-sm text-[#4d5156] mt-1 leading-relaxed line-clamp-3">
                      {formData.metaDescription || 'No meta description provided for this page yet.'}
                    </p>
                  </div>
                </div>

                {/* Social Card Preview */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-white/70 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    Social Sharing Card (Facebook / LinkedIn / Twitter)
                  </span>

                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-xl max-w-lg">
                    <div className="aspect-video w-full bg-slate-800 relative overflow-hidden flex items-center justify-center">
                      <img
                        src={formData.ogImage || '/og-image.png'}
                        alt="Social Card Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/og-image.png';
                        }}
                      />
                    </div>
                    <div className="p-3.5 space-y-1 bg-[#18233e]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                        aussiesmartenergy.com.au
                      </span>
                      <h5 className="text-sm font-bold text-white line-clamp-1">
                        {formData.ogTitle || formData.seoTitle || selectedPage.pageName}
                      </h5>
                      <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                        {formData.ogDescription || formData.metaDescription || 'Clean energy solutions in Australia.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-white/40">Select a page from the left sidebar to manage its SEO.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminSEO;

