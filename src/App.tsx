// src/App.tsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Design from "./pages/Design";
import Gallery from "./pages/Gallery";
import Process from "./pages/Process";
import Stack from "./pages/Stack";
import Features from "./pages/Features.tsx";
import Demo from "./pages/Demo.tsx";



const App: React.FC = () => {
    const location = useLocation();

    return (
        <div className="app-root">
            <Topbar />

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>

                    {/* HOME PAGE */}
                    <Route path="/" element={<Home />} />

                    <Route path="/design" element={<Design />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/process" element={<Process />} />
                    <Route path="/stack" element={<Stack />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/demo" element={<Demo />} />

                </Routes>
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default App;
