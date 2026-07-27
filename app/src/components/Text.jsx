import { Children } from "react";
import { PortableText } from "@portabletext/react";
import AnimationLink from "./Animation/AnimationLink";

const hasVisibleContent = (children) =>
  Children.toArray(children).some((child) => {
    if (typeof child === "string") return child.trim().length > 0;
    return child !== null && child !== undefined && child !== false;
  });

const Text = ({ text, typo, className }) => {
  return (
    <div className={`${className}`} typo={typo}>
      <PortableText
        value={text}
        components={{
          block: {
            normal: ({ children }) => (
              <p style={{ whiteSpace: "pre-wrap" }}>{hasVisibleContent(children) ? children : "\u00A0"}</p>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>{children}</ul>
            ),
            number: ({ children }) => (
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>{children}</ul>
            ),
          },
          listItem: {
            bullet: ({ children }) => (
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "1ch minmax(0, 1fr)",
                  columnGap: "0.5ch",
                  alignItems: "start",
                }}
              >
                <span aria-hidden="true">+</span>
                <span style={{ minWidth: 0, whiteSpace: "pre-wrap" }}>{children}</span>
              </li>
            ),
            number: ({ children }) => (
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "1ch minmax(0, 1fr)",
                  columnGap: "0.5ch",
                  alignItems: "start",
                }}
              >
                <span aria-hidden="true">+</span>
                <span style={{ minWidth: 0, whiteSpace: "pre-wrap" }}>{children}</span>
              </li>
            ),
          },
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
