"use client";

import { motion } from "framer-motion";

const SplitMask = ({ children }) => {
  const ease = [0.22, 1, 0.36, 1];

  return (
    <motion.div layout="position" style={{ width: "100%" }}>
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        transition={{ duration: 0.45, ease }}
        style={{ position: "relative", width: "100%", overflow: "visible" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default SplitMask;
