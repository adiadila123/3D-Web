// src/pages/Features.tsx
import React from "react";
import PageWrapper from "../components/PageWrapper";
import ParticlesField from "../components/ParticlesField";

const Features: React.FC = () => {
    return (
        <main className="page-shell page-shell--features">
            <PageWrapper>
                <section className="features-pro">
                    {/* background cu particule */}
                    <ParticlesField variant="network" />
                    <div className="features-pro-inner">
                        {/* HEADER */}
                        <header className="features-pro-header">
                            <p className="features-pro-eyebrow">System overview</p>
                            <h1 className="features-pro-title">Features & architecture</h1>
                            <p className="features-pro-subtitle">
                                Acest demo este gândit ca un front-end 3D-first: un singur
                                sistem care combină interfața, animația și obiectele 3D
                                într-un mod coerent, nu un „effect playground” rupt în bucăți.
                            </p>
                        </header>

                        <div className="features-pro-layout">
                            {/* COLUMNA PRINCIPALĂ – explicații */}
                            <div className="features-pro-main">
                                {/* Bloc 1 */}
                                <section className="features-pro-block">
                                    <h2 className="features-pro-block-title">
                                        1. Interface system
                                    </h2>
                                    <p className="features-pro-block-text">
                                        Layout-ul este construit ca un shell: topbar, footer și
                                        pagini cu pagină-wrapper și tranziții animate între rute.
                                        Hero-ul, paginile Design, Gallery, Process și Stack sunt
                                        tratate ca „scene” într-o aplicație, nu ca pagini statice
                                        separate.
                                    </p>
                                    <ul className="features-pro-list">
                                        <li>
                                            <span>Hero cinematic</span> – text pe stânga, card 3D
                                            pe dreapta, glassmorphism și edge glow.
                                        </li>
                                        <li>
                                            <span>Secțiuni tematice</span> – Design pillars, Gallery,
                                            Process și Stack descriu aceeași poveste vizuală.
                                        </li>
                                        <li>
                                            <span>Shell consecvent</span> – toate paginile trec prin
                                            același PageWrapper cu animații de tranziție.
                                        </li>
                                    </ul>
                                </section>

                                {/* Bloc 2 */}
                                <section className="features-pro-block">
                                    <h2 className="features-pro-block-title">
                                        2. 3D integration layer
                                    </h2>
                                    <p className="features-pro-block-text">
                                        Three.js este folosit pentru a construi un obiect 3D clar
                                        (braț robotic / formă tehnică), poziționat într-o scenă cu
                                        lumină direcțională, ambient light și reflexii fizice.
                                        Scena este gândită să arate „product-grade”, nu ca un
                                        demo generic.
                                    </p>
                                    <ul className="features-pro-list">
                                        <li>
                                            <span>Scene controlată</span> – cameră fixată pe un
                                            unghi cinematic, cu orbită lentă automată.
                                        </li>
                                        <li>
                                            <span>Materiale fizice</span> – metal, clearcoat și
                                            reflecții subtile, aliniate cu paleta site-ului.
                                        </li>
                                        <li>
                                            <span>Layer separat</span> – codul 3D stă în pagini
                                            dedicate (Demo, eventual și Home), nu amestecat cu UI-ul.
                                        </li>
                                    </ul>
                                </section>

                                {/* Bloc 3 */}
                                <section className="features-pro-block">
                                    <h2 className="features-pro-block-title">
                                        3. Motion & interaction
                                    </h2>
                                    <p className="features-pro-block-text">
                                        Mișcarea este tratată ca parte din identitate, nu ca un
                                        detaliu adăugat la final. Particulele, hover-urile 3D și
                                        tranzițiile dintre pagini sunt calibrate să susțină
                                        conținutul, nu să-l concureze.
                                    </p>
                                    <ul className="features-pro-list">
                                        <li>
                                            <span>Particles field</span> – puncte și conexiuni care
                                            reacționează la mouse, sugerând un „network space”.
                                        </li>
                                        <li>
                                            <span>Hover 3D</span> – carduri cu perspectivă, tilt
                                            subtil și glow controlat pentru acțiuni importante.
                                        </li>
                                        <li>
                                            <span>Tranziții între pagini</span> – fade & slide
                                            integrate cu AnimatePresence pentru senzația de app.
                                        </li>
                                    </ul>
                                </section>
                            </div>

                            {/* COLUMNA LATERALĂ – sumar tehnic */}
                            <aside className="features-pro-aside">
                                <div className="features-pro-aside-group">
                                    <p className="features-pro-aside-label">Stack</p>
                                    <p className="features-pro-aside-value">
                                        React · TypeScript · Three.js
                                    </p>
                                    <p className="features-pro-aside-note">
                                        UI-ul rămâne clasic React, iar Three.js este închis în
                                        componente izolate (ex: Demo scene).
                                    </p>
                                </div>

                                <div className="features-pro-aside-group">
                                    <p className="features-pro-aside-label">Design language</p>
                                    <p className="features-pro-aside-value">
                                        3D studio · glassmorphism · gradients
                                    </p>
                                    <p className="features-pro-aside-note">
                                        Paletă albastru–violet, glow controlat, muchii rotunjite
                                        și compoziții inspirate din motion design.
                                    </p>
                                </div>

                                <div className="features-pro-aside-group">
                                    <p className="features-pro-aside-label">Use cases</p>
                                    <p className="features-pro-aside-value">
                                        3D portfolio · concept sites · product demos
                                    </p>
                                    <p className="features-pro-aside-note">
                                        Poate deveni rapid homepage pentru un studio 3D, un tool
                                        SaaS cu focus pe vizual sau un pitch deck interactiv.
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
