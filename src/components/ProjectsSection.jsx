import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { getImageUrl } from '../utils/imageUrl';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get('/projects');
                if (res.data?.success) setProjects(res.data.data);
            } catch (e) { console.error(e); }
            setLoading(false);
        };
        load();
    }, []);

    // Hide section entirely if no projects
    if (loading || !projects || projects.length === 0) return null;

    return (
        <section className="projects-section">
            <div className="projects-container">
                {/* Section Header */}
                <div className="projects-header">
                    <div className="projects-badge">Our Work</div>
                    <h2 className="projects-title">Featured Projects</h2>
                    <p className="projects-subtitle">
                        Real installations, real results — explore our latest solar energy projects across Australia.
                    </p>
                    <div className="projects-title-underline" />
                </div>

                {/* Cards Grid */}
                <div className="projects-grid">
                    {projects.map((p, idx) => (
                        <div key={p._id} className="project-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                            {/* Image */}
                            <div className="project-card-img-wrap">
                                <img
                                    src={getImageUrl(p.mainImage)}
                                    alt={p.name}
                                    className="project-card-img"
                                    loading="lazy"
                                />
                                <div className="project-card-img-overlay" />
                                {p.gallery?.length > 0 && (
                                    <div className="project-gallery-badge">
                                        +{p.gallery.length} photos
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="project-card-body">
                                <h3 className="project-card-title">{p.name}</h3>
                                {p.shortDescription && (
                                    <p className="project-card-desc">{p.shortDescription}</p>
                                )}
                                <div className="project-card-footer">
                                    <Link to={`/projects/${p.slug}`} className="project-card-btn">
                                        View Project
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .projects-section {
                    padding: 80px 0;
                    background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
                    position: relative;
                    overflow: hidden;
                }
                .projects-section::before {
                    content: '';
                    position: absolute;
                    top: -120px;
                    left: -120px;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(57,181,74,0.07) 0%, transparent 70%);
                    pointer-events: none;
                }

                .projects-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* Header */
                .projects-header {
                    text-align: center;
                    margin-bottom: 56px;
                    position: relative;
                }
                .projects-badge {
                    display: inline-block;
                    padding: 5px 16px;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #39b54a;
                    background: rgba(57,181,74,0.1);
                    border: 1px solid rgba(57,181,74,0.25);
                    margin-bottom: 14px;
                }
                .projects-title {
                    font-size: clamp(1.8rem, 4vw, 2.75rem);
                    font-weight: 800;
                    color: #1d2e57;
                    line-height: 1.15;
                    margin: 0 0 14px;
                }
                .projects-subtitle {
                    font-size: 1rem;
                    color: #64748b;
                    max-width: 540px;
                    margin: 0 auto 24px;
                    line-height: 1.65;
                }
                .projects-title-underline {
                    width: 64px;
                    height: 4px;
                    border-radius: 2px;
                    background: linear-gradient(90deg, #39b54a, #2e9a3d);
                    margin: 0 auto;
                }

                /* Grid */
                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 28px;
                }
                @media (max-width: 900px) {
                    .projects-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
                }
                @media (max-width: 580px) {
                    .projects-grid { grid-template-columns: 1fr; gap: 18px; }
                }

                /* Card */
                .project-card {
                    background: #fff;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid rgba(0,0,0,0.07);
                    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    animation: projectFadeIn 0.5s ease both;
                }
                .project-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 16px 40px rgba(29,46,87,0.14);
                }
                @keyframes projectFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Card image */
                .project-card-img-wrap {
                    position: relative;
                    width: 100%;
                    height: 220px;
                    overflow: hidden;
                    background: #e2e8f0;
                }
                .project-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                .project-card:hover .project-card-img {
                    transform: scale(1.06);
                }
                .project-card-img-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, transparent 50%, rgba(29,46,87,0.45) 100%);
                    pointer-events: none;
                }
                .project-gallery-badge {
                    position: absolute;
                    bottom: 12px;
                    right: 12px;
                    background: rgba(57,181,74,0.9);
                    color: #fff;
                    font-size: 0.7rem;
                    font-weight: 700;
                    padding: 3px 10px;
                    border-radius: 100px;
                    backdrop-filter: blur(4px);
                }

                /* Card body */
                .project-card-body {
                    padding: 20px 22px 22px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .project-card-title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #1d2e57;
                    line-height: 1.35;
                    margin: 0;
                }
                .project-card-desc {
                    font-size: 0.875rem;
                    color: #64748b;
                    line-height: 1.6;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .project-card-footer {
                    margin-top: auto;
                    padding-top: 14px;
                }
                .project-card-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #39b54a;
                    text-decoration: none;
                    padding: 8px 18px;
                    border-radius: 10px;
                    background: rgba(57,181,74,0.09);
                    border: 1px solid rgba(57,181,74,0.22);
                    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
                }
                .project-card-btn:hover {
                    background: #39b54a;
                    color: #fff;
                    transform: translateX(3px);
                }
                .project-card-btn svg {
                    transition: transform 0.2s ease;
                }
                .project-card-btn:hover svg {
                    transform: translateX(3px);
                }
            `}</style>
        </section>
    );
};

export default ProjectsSection;
