import { getColors } from "@/helpers/getColors";
import { hoverColors } from "@/helpers/hoverColors";

import AnimationLink from "@/components/Animation/AnimationLink";
import { motion } from "framer-motion";

import styles from "../Accordion.module.css";

const NavigationWrapper = ({ children, invert, ref, item, colorPair }) => {
  const { background, text } = getColors(invert);
  const slug = item?.slug?.current;
  const path = slug ? `/calendar#${slug}` : "/calendar";
  const anchorId = slug || item?._id || undefined;

  return (
    <AnimationLink path={path}>
      <motion.div
        ref={ref}
        id={anchorId}
        className={`${styles.item} ${invert ? styles.invert : ""}`}
        whileHover={hoverColors(colorPair)}
        style={{
          background: background,
          color: text,
          fill: background,
        }}
      >
        {children}
      </motion.div>
    </AnimationLink>
  );
};

export default NavigationWrapper;
