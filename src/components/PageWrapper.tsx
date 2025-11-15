// src/components/PageWrapper.tsx
import React from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <motion.div
            className="page-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
};

export default PageWrapper;
