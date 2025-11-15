// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            © {new Date().getFullYear()} 3D Studio — All rights reserved.
        </footer>
    );
};

export default Footer;
