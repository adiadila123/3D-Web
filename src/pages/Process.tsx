// src/pages/Process.tsx
import React from "react";
import PageWrapper from "../components/PageWrapper";
import ParticlesField from "../components/ParticlesField";

const Process: React.FC = () => {
    return (
        <main className="page-shell page-shell--process">
            <PageWrapper>
                <section className="process-section">
                    {/* background cu particule */}
                    <ParticlesField />
                    <div className="process-bg"></div>

                    <div className="process-inner">
                        {/* LEFT TEXT */}
                        <div className="process-copy">
                            <h1 className="process-title">Our 3D design process</h1>

                            <p className="process-desc">
                                Workflow-ul e construit pentru site-uri și produse unde 3D-ul nu este doar „decorație”,
                                ci parte din identitatea brandului: de la idee, la storyboard, la obiecte 3D optimizate
                                pentru web.
                            </p>

                            <p className="process-note">
                                Linia verticală luminoasă și „nodes” sugerează un timeline 3D, un fel de cablu de lumină
                                care conectează etapele.
                            </p>
                        </div>

                        {/* RIGHT TIMELINE */}
                        <div className="process-timeline">
                            <div className="process-line" />

                            <div className="process-steps">
                                <div className="process-step">
                                    <div className="step-dot step-dot-1" />
                                    <h3>01. Concept sculpting</h3>
                                    <p>
                                        Definim tema 3D: shape-uri, lumină, tip de mișcare, cât de „tech” sau „artistic”
                                        vrei să arate landing page-ul.
                                    </p>
                                </div>

                                <div className="process-step">
                                    <div className="step-dot step-dot-2" />
                                    <h3>02. Scene layout</h3>
                                    <p>
                                        Decidem cum se așază elementele 3D pe verticală: hero, galerie, secțiuni cu carduri 3D,
                                        gradient shapes în background.
                                    </p>
                                </div>

                                <div className="process-step">
                                    <div className="step-dot step-dot-3" />
                                    <h3>03. WebGL optimisation</h3>
                                    <p>
                                        Simplificăm geometria, materialele, luminile și animația ca să fie smooth pe desktop
                                        și mobile, fără să pierzi „wow factor”-ul.
                                    </p>
                                </div>

                                <div className="process-step">
                                    <div className="step-dot step-dot-4" />
                                    <h3>04. Brand integration</h3>
                                    <p>
                                        Aliniem culorile, tipografia și compozițiile 3D cu brand-ul tău ca site-ul să pară
                                        un singur produs, nu piese lipite laolaltă.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </PageWrapper>
        </main>
    );
};

export default Process;
