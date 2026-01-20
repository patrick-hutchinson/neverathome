import { motion } from "framer-motion";
import styles from "../Accordeon.module.css";

import Icon from "@/components/Icon";

const AccordeonExpand = ({ isExpandable, isExpanded }) => {
  if (!isExpandable) return null;

  return (
    <div className={styles.expand}>
      <motion.div
        className={styles.expand_inner}
        animate={{ rotate: isExpanded ? 45 : 0, y: 0, x: -3 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Icon className={styles.icon} path="/assets/icons/plus.svg" />
      </motion.div>
    </div>
  );
};

export default AccordeonExpand;
