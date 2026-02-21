import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Collapse = ({ children, mode, id, onScroll }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const isExpanding = mode === "expanding";
  const isCollapsing = mode === "collapsing";

  useEffect(() => {
    if (ref.current && mode === "expanding") setHeight(ref.current.scrollHeight);
  }, [children]);

  // const expandDuration = Math.max(height / 10000, 0.5);
  const expandDuration = 0.5;

  const [allowOverflow, setAllowOverflow] = useState(false);

  return (
    <motion.div
      className="collapse"
      key={id}
      ref={ref}
      onScroll={onScroll}
      initial={false}
      animate={isExpanding ? "expanded" : isCollapsing ? "collapsed" : "collapsed"}
      variants={{
        collapsed: {
          maxHeight: 0,
          opacity: 0,
          transition: {
            maxHeight: { duration: expandDuration, delay: 0, ease: "easeInOut" },
            opacity: { duration: 0.4, delay: 0 },
          },
        },
        expanded: {
          maxHeight: height,
          opacity: 1,
          transition: {
            maxHeight: { duration: expandDuration, delay: 0, ease: "easeInOut" },
            opacity: { duration: 0.4, delay: 0.2, ease: "easeInOut" },
          },
        },
      }}
      onAnimationStart={() => {
        if (isExpanding) {
          setAllowOverflow(true); // collapsing → lock scroll immediately
        }
      }}
      onAnimationComplete={() => {
        if (!isExpanding) {
          setAllowOverflow(false); // expanded → allow scroll AFTER animation
        }
      }}
      style={{
        overflow: allowOverflow ? "visible" : "hidden",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Collapse;
