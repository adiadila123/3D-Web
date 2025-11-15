// src/components/HeroSection.tsx
import React from "react";
import { Link } from "react-router-dom";



const HeroSection: React.FC = () => {
    return (
        <>
            <div className="hero-bg" />

            <main className="hero-wrapper">
                <section className="hero">
                    {/* LEFT: TEXT */}
                    <div className="hero-text">
                        <div className="eyebrow">
                            <span className="eyebrow-dot"></span>
                            <span>Next-gen web experiences</span>
                        </div>

                        <h1 className="hero-title">
                            Build interfaces that feel <span>alive</span>.
                        </h1>

                        <p className="hero-subtitle">
                            Craft high-impact landing pages, dashboards and interactive
                            products using nothing but <strong>clean HTML &amp; CSS</strong>.
                            Layer gradients, motion and glassmorphism to create experiences
                            that stand out immediately.
                        </p>

                        <div className="hero-meta">
                            <div className="hero-meta-pill">
                                <span className="hero-meta-pill-dot"></span>
                                Pure CSS – no frameworks required
                            </div>
                            <div className="hero-meta-pill">
                                <span className="hero-meta-pill-dot"></span>
                                Smooth, GPU-friendly animations
                            </div>
                        </div>

                        <div className="hero-actions">
                            <Link to="/features" className="btn-primary">
                                <span>Explore Features</span>
                                <span className="btn-icon">▶</span>
                            </Link>

                            <Link to="/demo" className="btn-ghost">
                                <span>Live Demo</span>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: 3D-LIKE CARD */}
                    <div className="hero-visual">
                        <article className="orbital-card">
                            <div className="orbital-card-inner">
                                <div className="card-badge">
                                    <span className="card-badge-dot"></span>
                                    <span>Live preview</span>
                                </div>

                                <div className="card-orb">
                                    <div className="orb-node"></div>
                                    <div className="orb-node"></div>
                                    <div className="orb-node"></div>
                                    <div className="orb-node"></div>
                                </div>

                                <footer className="card-footer">
                                    <div className="card-footer-top">
                                        <div>
                                            <div className="card-label">CSS layers</div>
                                            <div className="card-stat">Gradients · Glass · Glow</div>
                                        </div>
                                        <div>
                                            <div className="card-label">Complexity</div>
                                            <div className="card-stat">Advanced</div>
                                        </div>
                                    </div>
                                    <div className="card-progress">
                                        <div className="card-progress-fill"></div>
                                    </div>
                                </footer>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        </>
    );
};

export default HeroSection;
