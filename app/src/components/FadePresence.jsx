import { AnimatePresence, motion } from "framer-motion";

const FadePresence = ({
  children,
  className,
  motionKey,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => (
  <AnimatePresence mode="popLayout">
    {children && (
      <motion.div
        key={motionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default FadePresence;
