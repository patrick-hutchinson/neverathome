import { useState, useContext, useRef } from "react";

import { StateContext } from "@/context/StateContext";

import AccordeonContent from "./AccordeonContent";
import AccordeonItem from "./AccordeonItem/AccordeonItem";
import AccordeonHeader from "./AccordeonHeader";
import { useColorPair } from "@/hooks/useColorPair";

const Accordeon = ({ array, size, invert }) => {
  const [imageInView, setImageInView] = useState(null);

  const containerRef = useRef(null);
  const { expandedElement, setExpandedElement } = useContext(StateContext);

  const handleExpand = (id) => (expandedElement === id ? setExpandedElement(null) : setExpandedElement(id));

  return (
    <div className="accordeon">
      {array.map((item, index) => {
        let isExpanded = item._id === expandedElement;
        const isExpandable = size === "medium" || size === "large" || item.type === "location" ? true : false;

        const colorPair = useColorPair(item);

        return (
          <AccordeonItem
            key={index}
            index={item._id}
            ref={containerRef}
            isExpanded={isExpanded}
            isExpandable={isExpandable}
          >
            <AccordeonHeader
              item={item}
              onClick={() => handleExpand(item._id)}
              imageInView={imageInView}
              isExpanded={isExpanded}
              size={size}
              invert={invert}
              colorPair={colorPair}
            />
            <AccordeonContent
              item={item}
              isExpanded={isExpanded}
              containerRef={containerRef}
              setImageInView={setImageInView}
              colorPair={colorPair}
            />
          </AccordeonItem>
        );
      })}
    </div>
  );
};

export default Accordeon;
