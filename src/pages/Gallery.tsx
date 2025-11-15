// src/pages/Gallery.tsx
import React from "react";
import PageWrapper from "../components/PageWrapper";
import TabGallery from "../components/TabGallery";
import ParticlesField from "../components/ParticlesField";

const Gallery: React.FC = () => {
    return (
        <main className="page-shell page-shell--gallery">
            <PageWrapper>
                <section className="gallery-section">
                    {/* particule DOAR cu puncte */}
                    <ParticlesField variant="dots" />
                    <div className="gallery-inner">
                        <header className="gallery-header">
                            <h1 className="gallery-title">3D Studio gallery</h1>
                            <p className="gallery-subtitle">
                                Vizualuri care combină interfețe 3D, obiecte abstracte și scene futuriste,
                                gândite pentru landing pages, dashboard-uri și brand-uri tech.
                            </p>
                        </header>

                        <TabGallery />
                    </div>
                </section>
            </PageWrapper>
        </main>
    );
};

export default Gallery;
