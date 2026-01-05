import { useState, useContext, useRef } from "react";

import { StateContext } from "@/context/StateContext";

import AccordeonContent from "./AccordeonContent";
import AccordeonItem from "./AccordeonItem/AccordeonItem";
import AccordeonHeader from "./AccordeonHeader";

const Accordeon = ({ array, size, invert }) => {
  const [imageInView, setImageInView] = useState(null);

  const containerRef = useRef(null);
  const { expandedElement, setExpandedElement } = useContext(StateContext);

  const handleExpand = (id) => (expandedElement === id ? setExpandedElement(null) : setExpandedElement(id));

  return (
    <div className="accordeon">
      {array.map((item) => {
        let isExpanded = item._id === expandedElement;
        const isExpandable = size === "medium" || size === "large" || item.type === "location" ? true : false;

        return (
          <AccordeonItem index={item._id} ref={containerRef} isExpanded={isExpanded} isExpandable={isExpandable}>
            <AccordeonHeader
              item={item}
              onClick={() => handleExpand(item._id)}
              imageInView={imageInView}
              isExpanded={isExpanded}
              size={size}
              invert={invert}
            />
            <AccordeonContent
              item={item}
              isExpanded={isExpanded}
              containerRef={containerRef}
              setImageInView={setImageInView}
            />
          </AccordeonItem>
        );
      })}
    </div>
  );
};

export default Accordeon;
