import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Collapse = ({ children, isExpanded, id, onScroll }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && isExpanded) setHeight(ref.current.scrollHeight);
  }, [children]);

  const expandDuration = Math.max(height / 10000, 0.5);

  return (
    <motion.div
      className="collapse"
      key={id}
      ref={ref}
      onScroll={onScroll}
      initial={false}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={{
        collapsed: {
          maxHeight: 0,
          opacity: 0,
          overflow: "hidden",
          transition: {
            maxHeight: { duration: expandDuration, delay: expandDuration, ease: "easeInOut" },
            opacity: { duration: 0.4, delay: 0, ease: "easeInOut" },
          },
        },
        expanded: {
          maxHeight: height,
          opacity: 1,
          overflow: "visible",
          transition: {
            maxHeight: { duration: expandDuration, delay: 0, ease: "easeInOut" },
            opacity: { duration: 0.4, delay: expandDuration, ease: "easeInOut" },
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Collapse;
