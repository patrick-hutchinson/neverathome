import { getColors } from "@/helpers/getColors";
import { hoverColors } from "@/helpers/hoverColors";

const NavigationWrapper = ({ children, invert, ref, item, colorPair }) => {
  const { background, text } = getColors(invert);

  return (
    <AnimationLink path={`/calendar#${item.slug.current}`}>
      <motion.div
        ref={ref}
        id={item.slug.current}
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
