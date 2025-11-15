// src/pages/Stack.tsx
import React from "react";
import PageWrapper from "../components/PageWrapper";
import ParticlesField from "../components/ParticlesField";
import ProIcon from "../components/ProIcon.tsx";


const Stack: React.FC = () => {
    return (
        <main className="page-shell page-shell--stack">
            <PageWrapper>
                <section className="stack-section">
                    {/* particule DOAR cu puncte */}
                    <ParticlesField variant="dots" />
                    <div className="stack-bg"></div>

                    <div className="stack-inner">
                        <h1 className="stack-title">3D-first front-end stack</h1>

                        <p className="stack-desc">
                            Site-ul de față este doar HTML, Tailwind și JavaScript + Three.js, gândit ca un playground
                            pentru 3D design. Îl poți transforma rapid în React, Next.js sau orice framework modern.
                        </p>

                        <div className="stack-grid">
                            <div className="stack-card">
                                <ProIcon type="cinematic" />
                                <p className="stack-card-label">Core</p>
                                <h3 className="stack-card-title">HTML + Tailwind</h3>
                                <p className="stack-card-text">
                                    Layout responsive, utilities pentru spacing, borders, shadows, gradients.
                                </p>
                            </div>

                            <div className="stack-card">
                                <ProIcon type="layers" />
                                <p className="stack-card-label">3D Engine</p>
                                <h3 className="stack-card-title">Three.js</h3>
                                <p className="stack-card-text">
                                    Geometrie, materiale, lumină, animație pentru obiectul principal 3D.
                                </p>
                            </div>

                            <div className="stack-card">
                                <ProIcon type="interaction" />
                                <p className="stack-card-label">Interaction</p>
                                <h3 className="stack-card-title">Mouse &amp; touch</h3>
                                <p className="stack-card-text">
                                    Rotire manuală a obiectului, combinată cu auto-orbit pentru un look „alive”.
                                </p>
                            </div>

                            <div className="stack-card">
                                <ProIcon type="studio" />
                                <p className="stack-card-label">Style topic</p>
                                <h3 className="stack-card-title">3D Design Studio</h3>
                                <p className="stack-card-text">
                                    Fiecare secțiune vorbește despre design 3D și arată ca atare, cu volum și lumină.
                                </p>
                            </div>
                        </div>

                        <p className="stack-footer">
                            Poți să „rupeți” ușor secțiunile în componente separate (Hero3D, DesignPillars,
                            Gallery3D, ProcessTimeline, StackGrid).
                        </p>
                    </div>
                </section>
            </PageWrapper>
        </main>
    );
};

export default Stack;
