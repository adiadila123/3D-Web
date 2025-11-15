// src/components/Topbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const Topbar: React.FC = () => {
    return (
        <header className="topbar">
            <div className="topbar-inner">

                {/* LOGO */}
                <div className="topbar-left">
                    <div className="logo-3d">
                        <div className="logo-3d-inner">
                            <div className="face face-front" />
                            <div className="face face-back" />
                            <div className="face face-right" />
                            <div className="face face-left" />
                            <div className="face face-top" />
                            <div className="face face-bottom" />
                        </div>
                    </div>
                    <span className="topbar-logo-text">3D Studio</span>
                </div>

                {/* MENU */}
                <nav className="topbar-nav">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            "topbar-link" + (isActive ? " topbar-link-active" : "")
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/design"
                        className={({ isActive }) =>
                            "topbar-link" + (isActive ? " topbar-link-active" : "")
                        }
                    >
                        Design pillars
                    </NavLink>

                    <NavLink
                        to="/gallery"
                        className={({ isActive }) =>
                            "topbar-link" + (isActive ? " topbar-link-active" : "")
                        }
                    >
                        3D gallery
                    </NavLink>

                    <NavLink
                        to="/process"
                        className={({ isActive }) =>
                            "topbar-link" + (isActive ? " topbar-link-active" : "")
                        }
                    >
                        Process
                    </NavLink>

                    <NavLink
                        to="/stack"
                        className={({ isActive }) =>
                            "topbar-link" + (isActive ? " topbar-link-active" : "")
                        }
                    >
                        Stack
                    </NavLink>

                </nav>

                <div className="topbar-cta-wrapper"></div>
            </div>
        </header>
    );
};

export default Topbar;
