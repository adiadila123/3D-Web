// src/pages/Demo.tsx
import React from "react";
import PageWrapper from "../components/PageWrapper";
import UniverseScene3D from "../components/UniverseScene3D";

const Demo: React.FC = () => {
    return (
        <main className="page-shell page-shell--demo">
            <PageWrapper>
                <section className="demo-section">
                  <UniverseScene3D />
                </section>
            </PageWrapper>
        </main>
    );
};

export default Demo;
