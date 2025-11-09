import { motion } from "framer-motion";
import styles from "./Calendar.module.css";

const EventExpand = ({ isExpandable, isExpanded }) => {
  if (!isExpandable) return null;

  return (
    <div className={styles.expand}>
      <motion.div
        className={styles.expand_inner}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        +
      </motion.div>
    </div>
  );
};

export default EventExpand;
