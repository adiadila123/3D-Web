// src/pages/Features.tsx
import React from "react";
import PageWrapper from "../components/PageWrapper";
import ParticlesField from "../components/ParticlesField";

const Features: React.FC = () => {
    return (
        <main className="page-shell page-shell--features">
            <PageWrapper>
                <section className="features-pro">
                    {/* background particles */}
                    <ParticlesField variant="network" />
                    <div className="features-pro-inner">
                        {/* HEADER */}
                        <header className="features-pro-header">
                            <p className="features-pro-eyebrow">System overview</p>
                            <h1 className="features-pro-title">Features &amp; architecture</h1>
                            <p className="features-pro-subtitle">
                                This demo is designed as a 3D-first front-end: a single system
                                that combines interface, motion and 3D objects in a coherent way,
                                rather than a collection of disconnected visual tricks.
                            </p>
                        </header>

                        <div className="features-pro-layout">
                            {/* MAIN COLUMN – explanations */}
                            <div className="features-pro-main">
                                {/* Block 1 */}
                                <section className="features-pro-block">
                                    <h2 className="features-pro-block-title">
                                        1. Interface system
                                    </h2>
                                    <p className="features-pro-block-text">
                                        The layout is built as an application shell: top bar,
                                        footer and routed pages wrapped in a shared page container
                                        with animated transitions. The Hero, Design, Gallery,
                                        Process and Stack views behave like scenes inside one app,
                                        not like isolated static pages.
                                    </p>
                                    <ul className="features-pro-list">
                                        <li>
                                            <span>Cinematic hero</span> – copy on the left,
                                            3D-style card on the right, with glassmorphism and a
                                            subtle edge glow.
                                        </li>
                                        <li>
                                            <span>Themed sections</span> – Design pillars, Gallery,
                                            Process and Stack all describe the same 3D narrative,
                                            each from a different angle.
                                        </li>
                                        <li>
                                            <span>Consistent shell</span> – every page runs through
                                            the same PageWrapper and transition system, so the site
                                            feels like one product.
                                        </li>
                                    </ul>
                                </section>

                                {/* Block 2 */}
                                <section className="features-pro-block">
                                    <h2 className="features-pro-block-title">
                                        2. 3D integration layer
                                    </h2>
                                    <p className="features-pro-block-text">
                                        Three.js is used to build a clear, readable 3D object
                                        (robotic arm / technical form) placed in a scene with
                                        directional light, ambient light and physical reflections.
                                        The scene is styled to look product-grade, not like a
                                        generic WebGL demo.
                                    </p>
                                    <ul className="features-pro-list">
                                        <li>
                                            <span>Controlled camera</span> – a cinematic angle with
                                            a slow automatic orbit for a calm, premium feel.
                                        </li>
                                        <li>
                                            <span>Physical materials</span> – metal, clear-coat and
                                            subtle reflections aligned to the site’s colour palette.
                                        </li>
                                        <li>
                                            <span>Separated layer</span> – 3D code lives in dedicated
                                            components and pages (for example the Demo scene),
                                            instead of being mixed directly into the UI markup.
                                        </li>
                                    </ul>
                                </section>

                                {/* Block 3 */}
                                <section className="features-pro-block">
                                    <h2 className="features-pro-block-title">
                                        3. Motion &amp; interaction
                                    </h2>
                                    <p className="features-pro-block-text">
                                        Motion is treated as part of the visual identity rather
                                        than an afterthought. Particles, 3D hover effects and page
                                        transitions are tuned to support the content instead of
                                        competing with it.
                                    </p>
                                    <ul className="features-pro-list">
                                        <li>
                                            <span>Particles field</span> – points and connections
                                            that react to the cursor, suggesting a live network
                                            space.
                                        </li>
                                        <li>
                                            <span>3D hover</span> – cards with perspective,
                                            controlled tilt and glow on key actions.
                                        </li>
                                        <li>
                                            <span>Page transitions</span> – fade and slide
                                            animations wired through AnimatePresence to make routing
                                            feel like switching views in an app.
                                        </li>
                                    </ul>
                                </section>
                            </div>

                            {/* SIDE COLUMN – technical summary */}
                            <aside className="features-pro-aside">
                                <div className="features-pro-aside-group">
                                    <p className="features-pro-aside-label">Stack</p>
                                    <p className="features-pro-aside-value">
                                        React · TypeScript · Three.js
                                    </p>
                                    <p className="features-pro-aside-note">
                                        The UI remains classic React, while Three.js is wrapped in
                                        isolated components (for example the Demo universe scene).
                                    </p>
                                </div>

                                <div className="features-pro-aside-group">
                                    <p className="features-pro-aside-label">Design language</p>
                                    <p className="features-pro-aside-value">
                                        3D studio · glassmorphism · gradients
                                    </p>
                                    <p className="features-pro-aside-note">
                                        A blue–violet palette, controlled glow, rounded corners and
                                        compositions inspired by motion-design style frames.
                                    </p>
                                </div>

                                <div className="features-pro-aside-group">
                                    <p className="features-pro-aside-label">Use cases</p>
                                    <p className="features-pro-aside-value">
                                        3D portfolio · concept sites · product demos
                                    </p>
                                    <p className="features-pro-aside-note">
                                        Can quickly become a homepage for a 3D studio, a visual-
                                        first SaaS product, or an interactive pitch deck prototype.
                                    </p>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </PageWrapper>
        </main>
    );
};

export default Features;
