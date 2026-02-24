import { motion } from "framer-motion";
import styles from "./Icons.module.css";

import Icon from "@/components/Icon";
import { useEffect } from "react";

const ExpandIcon = ({ className, isExpandable, isExpanded }) => {
  if (!isExpandable) return null;

  useEffect(() => {
    console.log("reload");
  }, []);

  return (
    <div className={className}>
      <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
        <Icon className={styles.icon} path="/assets/icons/plus.svg" height="10px" width="10px" />
      </motion.div>
    </div>
  );
};

export default ExpandIcon;
