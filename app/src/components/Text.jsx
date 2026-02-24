import { PortableText } from "@portabletext/react";
import AnimationLink from "./Animation/AnimationLink";

const Text = ({ text, typo, className }) => {
  return (
    <div className={`${className}`} typo={typo}>
      <PortableText
        value={text}
        components={{
          marks: {
            link: ({ value, children }) => {
              if (!value) return children;

              return <AnimationLink link={value}>{children}</AnimationLink>;
            },
          },
        }}
      />
    </div>
  );
};

export default Text;
