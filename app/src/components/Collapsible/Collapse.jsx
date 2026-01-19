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
      key={id}
      ref={ref}
      onScroll={onScroll}
      initial={false}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={{
        collapsed: {
          maxHeight: 0,
          transition: { duration: duration, delay: 0.4 },
          overflow: "hidden",
          opacity: 0,
          transition: { duration: 0.4 },
        },
        expanded: {
          maxHeight: height,
          transition: { duration: duration },
          overflow: "visible",
          opacity: 1,
          transition: { duration: 0.4, delay: duration },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Collapse;
