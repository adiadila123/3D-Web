// src/pages/Design.tsx
import React from "react";
import PageWrapper from "../components/PageWrapper";
import ParticlesField from "../components/ParticlesField";
import { View360, Box3dThreePoints, SelectPoint3d } from "iconoir-react";


const Design: React.FC = () => {
    return (
        <main className="page-shell page-shell--design">
            <PageWrapper>
                <section className="design-section">
                    {/* background cu particule */}
                    <ParticlesField variant="network" />

                    <div className="design-inner">
                        {/* TITLU + SUBTITLU CENTRATE */}
                        <header className="design-header">
                            <h1 className="design-title">3D design pillars of Nova3D</h1>
                            <p className="design-subtitle">
                                Fiecare secțiune a acestui site este gândită ca un „layer” 3D: lumină, volum,
                                reflexii și mișcare subtilă pentru o experiență care pare mai aproape de o
                                scenă de film decât de un simplu website.
                            </p>
                        </header>

                        {/* GRID CU 3 CARDURI SUB TITLU */}
                        <div className="design-grid">
                            <article className="design-card card-3d">
                                <div className="design-card-icon design-card-icon--blue">
                                    <View360 />
                                </div>
                                <h3 className="design-card-title">Cinematic hero spaces</h3>
                                <p className="design-card-text">
                                    Full-screen heroes cu obiecte 3D reale, lumini direcționale și compoziție
                                    inspirată din motion design pentru primul impact vizual.
                                </p>
                                <p className="design-card-foot">
                                    Focus: perspective, glow, contrast între planurile din față și fundalul blurat.
                                </p>
                            </article>

                            <article className="design-card card-3d">
                                <div className="design-card-icon design-card-icon--amber">
                                    <Box3dThreePoints />
                                </div>
                                <h3 className="design-card-title">Layered section design</h3>
                                <p className="design-card-text">
                                    Fiecare secțiune are un rol clar: prezentarea conceptului, galerie 3D, proces,
                                    stack. Vizual, sunt legate prin volum, umbre și elemente „floating”.
                                </p>
                                <p className="design-card-foot">
                                    Focus: margini rotunjite, umbre adânci, carduri cu perspectivă.
                                </p>
                            </article>

                            <article className="design-card card-3d">
                                <div className="design-card-icon design-card-icon--violet">
                                    <SelectPoint3d />
                                </div>
                                <h3 className="design-card-title">Real-time interaction</h3>
                                <p className="design-card-text">
                                    Obiectul 3D nu este doar un „gif”; poți interacționa cu el. Rotirea și animația
                                    constantă întăresc ideea de studio tehnic și creativ.
                                </p>
                                <p className="design-card-foot">
                                    Focus: Three.js, WebGL, input mouse / touch, mișcare fluidă.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </PageWrapper>
        </main>
    );
};

export default Design;
