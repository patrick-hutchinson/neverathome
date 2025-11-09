import { AnimatePresence, motion } from "framer-motion";

const FadePresence = ({ children, className, motionKey }) => (
  <AnimatePresence mode="popLayout">
    {children && (
      <motion.div
        key={motionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default FadePresence;
