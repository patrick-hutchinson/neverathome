import React, { useState, useContext, useRef } from "react";

import { StateContext } from "@/context/StateContext";

import AccordeonContent from "./AccordeonContent";
import AccordeonWrapper from "./AccordeonWrapper";
import AccordeonHeader from "./AccordeonHeader";
import { useColorPair } from "@/hooks/useColorPair";
import { useScrollToExpanded } from "./hooks/useScrollToExpand";

useScrollToExpanded;

const Accordeon = ({ array, size, invert, behavior }) => {
  const [imageInView, setImageInView] = useState(null);

  const refs = useRef({});
  const { expandedElement, setExpandedElement } = useContext(StateContext);

  const handleExpand = (id) => {
    expandedElement === id ? setExpandedElement(null) : setExpandedElement(id);
  };
  return (
    <div className="accordeon">
      {array.map((item, index) => {
        let isExpanded = item._id === expandedElement;

        const colorPair = useColorPair(item);

        if (!refs.current[item._id]) {
          refs.current[item._id] = React.createRef();
        }

        return (
          <AccordeonWrapper
            key={index}
            item={item}
            index={item._id}
            ref={refs.current[item._id]}
            isExpanded={isExpanded}
            behavior={behavior}
            handleExpand={handleExpand}
            invert={invert}
            colorPair={colorPair}
          >
            <AccordeonHeader item={item} size={size} isExpanded={isExpanded} imageInView={imageInView} />
            <AccordeonContent
              item={item}
              isExpanded={isExpanded}
              containerRef={refs.current[item._id]}
              setImageInView={setImageInView}
            />
          </AccordeonWrapper>
        );
      })}
    </div>
  );
};

export default Accordeon;
