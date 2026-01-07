import { forwardRef } from "react";
import { motion } from "framer-motion";

import styles from "../Accordeon.module.css";

const AccordeonItem = forwardRef(({ index, children, isExpanded, isExpandable }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`${styles.accordeonItem} ${isExpanded ? styles.expanded : ""}`}
      data-index={index}
      style={{
        overflowY: "scroll",
        // height:
        //   isExpanded && "calc(100vh - (calc(var(--header-height) + var(--filter-height) + (2 * var(--list-height)))))",
        background: "#000",
        pointerEvents: isExpandable ? "all" : "none",
        overflowX: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
});

export default AccordeonItem;
