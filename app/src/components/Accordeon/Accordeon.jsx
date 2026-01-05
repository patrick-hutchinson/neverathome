import { useState, useContext, useRef } from "react";

import { StateContext } from "@/context/StateContext";

import AccordeonContent from "./AccordeonContent";
import AccordeonItem from "./AccordeonItem/AccordeonItem";
import AccordeonHeader from "./AccordeonHeader";

const Accordeon = ({ array }) => {
  const [imageInView, setImageInView] = useState(null);

  const containerRef = useRef(null);
  const { expandedElement, setExpandedElement } = useContext(StateContext);

  const handleExpand = (id) => (expandedElement === id ? setExpandedElement(null) : setExpandedElement(id));

  return (
    <div className="accordeon">
      {array.map((item) => {
        let isExpanded = item._id === expandedElement;

        return (
          <AccordeonItem index={item._id} ref={containerRef}>
            <AccordeonHeader
              item={item}
              onClick={() => handleExpand(item._id)}
              imageInView={imageInView}
              isExpanded={isExpanded}
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
