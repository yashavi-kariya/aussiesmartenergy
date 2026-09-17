import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { getImageUrl } from '../utils/imageUrl';

const ProjectDetails = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [lightbox, setLightbox] = useState(null); // currently previewed image URL

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setNotFound(false);
            try {
                const res = await api.get(`/projects/${slug}`);
                if (res.data?.success) setProject(res.data.data);
                else setNotFound(true);
            } catch (e) {
                setNotFound(true);
            }
            setLoading(false);
        };
        load();
    }, [slug]);

    /* ── Loading ── */
    if (loading) return (
        <div className="pd-loading">
            <div className="pd-spinner" />
            <p>Loading project...</p>
        </div>
    );

    /* ── Not Found ── */
    if (notFound || !project) return (
        <div className="pd-notfound">
            <div className="pd-notfound-icon">404</div>
            <h2>Project Not Found</h2>
            <p>The project you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="pd-back-btn">← Back to Homepage</Link>
        </div>
    );

    return (
        <>
            <main className="pd-wrap">
                {/* ── Hero Banner ── */}
                <div className="pd-hero">
                    {project.mainImage && (
                        <img
                            src={getImageUrl(project.mainImage)}
                            alt={project.name}
                            className="pd-hero-img"
                        />
                    )}
                    <div className="pd-hero-overlay" />
                    <div className="pd-hero-content">
                        <Link to="/" className="pd-breadcrumb">
                            ← Back to Projects
                        </Link>
                        <h1 className="pd-hero-title">{project.name}</h1>
                        {project.shortDescription && (
                            <p className="pd-hero-short">{project.shortDescription}</p>
                        )}
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="pd-body">
                    {/* Long Description */}
                    {project.longDescription && (
                        <section className="pd-section">
                            <div className="pd-section-label">Project Overview</div>
                            <div className="pd-long-desc">
                                {project.longDescription.split('\n').map((para, i) =>
                                    para.trim() ? <p key={i}>{para}</p> : null
                                )}
                            </div>
                        </section>
                    )}

                    {/* Gallery */}
                    {project.gallery?.length > 0 && (
                        <section className="pd-section">
                            <div className="pd-section-label">Project Gallery</div>
                            <div className="pd-gallery">
                                {project.gallery.map((g, i) => (
                                    <button
                                        key={i}
                                        className="pd-gallery-item"
                                        onClick={() => setLightbox(getImageUrl(g))}
                                        aria-label={`View gallery image ${i + 1}`}
                                    >
                                        <img
                                            src={getImageUrl(g)}
                                            alt={`${project.name} photo ${i + 1}`}
                                            loading="lazy"
                                        />
                                        <div className="pd-gallery-hover">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                                <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                                            </svg>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* CTA */}
                    <section className="pd-cta-section">
                        <div className="pd-cta-box">
                            <h3>Interested in a Similar Installation?</h3>
                            <p>Contact our team today to get a free quote and find out how solar can work for you.</p>
                            <div className="pd-cta-btns">
                                <Link to="/contact" className="pd-cta-primary">Get a Free Quote</Link>
                                <Link to="/" className="pd-cta-secondary">← View More Projects</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* ── Lightbox ── */}
            {lightbox && (
                <div className="pd-lightbox" onClick={() => setLightbox(null)}>
                    <button className="pd-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <img
                        src={lightbox}
                        alt="Gallery preview"
                        className="pd-lightbox-img"
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}

            <style>{`
                /* ─── Loading ─── */
                .pd-loading {
                    min-height: 70vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    color: #64748b;
                    font-size: 0.9rem;
                    padding: 160px 24px 60px;
                }
                .pd-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(57,181,74,0.2);
                    border-top-color: #39b54a;
                    border-radius: 50%;
                    animation: pd-spin 0.8s linear infinite;
                }
                @keyframes pd-spin { to { transform: rotate(360deg); } }

                /* ─── Not Found ─── */
                .pd-notfound {
                    min-height: 70vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 160px 24px 60px;
                    gap: 12px;
                }
                .pd-notfound-icon {
                    font-size: 5rem;
                    font-weight: 900;
                    color: #e2e8f0;
                    line-height: 1;
                }
                .pd-notfound h2 { font-size: 1.5rem; font-weight: 700; color: #1d2e57; margin: 0; }
                .pd-notfound p  { color: #64748b; margin: 0; }

                /* ─── Wrap ─── */
                .pd-wrap { min-height: 100vh; background: #f8fafc; }

                /* ─── Hero ─── */
                .pd-hero {
                    position: relative;
                    width: 100%;
                    min-height: clamp(380px, 60vw, 560px);
                    padding-top: 140px;
                    background: #1d2e57;
                    overflow: hidden;
                    display: flex;
                    align-items: flex-end;
                }
                .pd-hero-img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 8s ease;
                }
                .pd-hero:hover .pd-hero-img { transform: scale(1.04); }
                .pd-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(15,28,63,0.3) 0%, rgba(15,28,63,0.85) 100%);
                }
                .pd-hero-content {
                    position: relative;
                    z-index: 1;
                    max-width: 1280px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 0 32px 48px;
                }
                .pd-breadcrumb {
                    display: inline-block;
                    color: rgba(255,255,255,0.65);
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-decoration: none;
                    margin-bottom: 16px;
                    transition: color 0.2s;
                }
                .pd-breadcrumb:hover { color: #39b54a; }
                .pd-hero-title {
                    font-size: clamp(1.75rem, 5vw, 3rem);
                    font-weight: 900;
                    color: #fff;
                    line-height: 1.15;
                    margin: 0 0 12px;
                    max-width: 760px;
                }
                .pd-hero-short {
                    font-size: 1.05rem;
                    color: rgba(255,255,255,0.75);
                    margin: 0;
                    max-width: 600px;
                    line-height: 1.55;
                }

                /* ─── Body ─── */
                .pd-body {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 56px 32px;
                }
                @media (max-width: 640px) { .pd-body { padding: 36px 20px; } }

                /* ─── Section ─── */
                .pd-section { margin-bottom: 56px; }
                .pd-section-label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #39b54a;
                    margin-bottom: 18px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .pd-section-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: rgba(0,0,0,0.08);
                }

                /* ─── Long Description ─── */
                .pd-long-desc {
                    max-width: 760px;
                    color: #374151;
                    font-size: 1rem;
                    line-height: 1.8;
                }
                .pd-long-desc p { margin: 0 0 1.1em; }
                .pd-long-desc p:last-child { margin: 0; }

                /* ─── Gallery ─── */
                .pd-gallery {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                }
                @media (max-width: 860px) { .pd-gallery { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 480px) { .pd-gallery { grid-template-columns: 1fr; } }

                .pd-gallery-item {
                    position: relative;
                    border: none;
                    padding: 0;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    aspect-ratio: 4/3;
                    display: block;
                    background: #e2e8f0;
                }
                .pd-gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                    display: block;
                }
                .pd-gallery-item:hover img { transform: scale(1.07); }
                .pd-gallery-hover {
                    position: absolute;
                    inset: 0;
                    background: rgba(29,46,87,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .pd-gallery-item:hover .pd-gallery-hover { opacity: 1; }

                /* ─── CTA ─── */
                .pd-cta-section { margin-top: 24px; }
                .pd-cta-box {
                    background: linear-gradient(135deg, #1d2e57 0%, #133ea1 100%);
                    border-radius: 20px;
                    padding: 48px 40px;
                    text-align: center;
                }
                .pd-cta-box h3 {
                    font-size: 1.6rem;
                    font-weight: 800;
                    color: #fff;
                    margin: 0 0 12px;
                }
                .pd-cta-box p {
                    color: rgba(255,255,255,0.65);
                    font-size: 0.95rem;
                    margin: 0 0 28px;
                    max-width: 480px;
                    margin-left: auto;
                    margin-right: auto;
                    line-height: 1.6;
                }
                .pd-cta-btns {
                    display: flex;
                    gap: 14px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .pd-cta-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 13px 28px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #39b54a, #2e9a3d);
                    color: #fff;
                    font-size: 0.9rem;
                    font-weight: 700;
                    text-decoration: none;
                    box-shadow: 0 4px 18px rgba(57,181,74,0.4);
                    transition: opacity 0.2s, transform 0.2s;
                }
                .pd-cta-primary:hover { opacity: 0.9; transform: translateY(-2px); }
                .pd-cta-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 13px 24px;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.8);
                    font-size: 0.9rem;
                    font-weight: 600;
                    text-decoration: none;
                    border: 1px solid rgba(255,255,255,0.18);
                    transition: background 0.2s, color 0.2s;
                }
                .pd-cta-secondary:hover { background: rgba(255,255,255,0.18); color: #fff; }

                /* ─── Lightbox ─── */
                .pd-lightbox {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background: rgba(0,0,0,0.92);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    cursor: zoom-out;
                    animation: pd-lb-in 0.2s ease;
                }
                @keyframes pd-lb-in { from { opacity: 0; } to { opacity: 1; } }
                .pd-lightbox-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(255,255,255,0.12);
                    border: 1px solid rgba(255,255,255,0.18);
                    border-radius: 50%;
                    color: #fff;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .pd-lightbox-close:hover { background: rgba(255,255,255,0.22); }
                .pd-lightbox-img {
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 12px;
                    object-fit: contain;
                    cursor: default;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                }

                /* ─── Back btn (404) ─── */
                .pd-back-btn {
                    display: inline-block;
                    margin-top: 8px;
                    padding: 10px 22px;
                    background: #1d2e57;
                    color: #fff;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.875rem;
                    transition: background 0.2s;
                }
                .pd-back-btn:hover { background: #133ea1; }
            `}</style>
        </>
    );
};

export default ProjectDetails;
