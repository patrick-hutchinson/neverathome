import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Collapse = ({ children, isExpanded, id, onScroll }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && isExpanded) setHeight(ref.current.scrollHeight);
  }, [children]);

  const duration = Math.min(Math.max(height / 3000, 0.4), 0.3);

  return (
    <motion.div
      onScroll={onScroll}
      style={{ overflow: isExpanded ? "visible" : "hidden", background: "#000" }}
      initial={false}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={{
        collapsed: { maxHeight: 0, transition: { duration: duration, delay: 0.4 } },
        expanded: {
          maxHeight: height,
          transition: { duration: duration },
        },
      }}
    >
      <motion.div
        key={id}
        ref={ref}
        initial={false}
        animate={isExpanded ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, transition: { duration: 0.4, delay: duration } },
          hidden: { opacity: 0, transition: { duration: 0.4 } },
        }}
        // style={{ overflowY: "scroll" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Collapse;
