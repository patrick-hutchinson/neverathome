import React, { useState, useContext, useRef, useEffect } from "react";

import { StateContext } from "@/context/StateContext";

import AccordeonContent from "./AccordeonContent";
import AccordeonWrapper from "./AccordeonWrapper";
import AccordeonHeader from "./AccordeonHeader";
import { useColorPair } from "@/hooks/useColorPair";
import { useLenisContext } from "@/context/LenisContext";

const Accordeon = ({ array, size, invert, behavior, firstExpanded }) => {
  const lenis = useLenisContext();
  const [imageInView, setImageInView] = useState(null);

  const refs = useRef({});
  const accordeonRef = useRef(null);

  const { expandedElement, setExpandedElement } = useContext(StateContext);

  const handleExpand = (id) => {
    console.log("handling!");
    lenis.stop();
    expandedElement === id ? setExpandedElement(null) : setExpandedElement(id);
  };

  // expand the first element when it is in view
  if (firstExpanded) {
    const hasExpandedOnce = useRef(false);

    useEffect(() => {
      if (!firstExpanded) return;
      if (hasExpandedOnce.current) return;
      if (!accordeonRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasExpandedOnce.current) {
            hasExpandedOnce.current = true;
            setExpandedElement(array[0]._id);
            observer.disconnect(); // stop observing immediately
          }
        },
        { threshold: 1 },
      );

      observer.observe(accordeonRef.current);

      return () => observer.disconnect();
    }, [firstExpanded, array, setExpandedElement]);
  }

  return (
    <div className="accordeon" ref={accordeonRef}>
      {array.map((item, index) => {
        let isExpandable = item.info || item.gallery;
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
            setExpandedElement={setExpandedElement}
            isExpandable={isExpandable}
          >
            <AccordeonHeader item={item} size={size} isExpanded={isExpanded} imageInView={imageInView} />
            {size === "large" && (
              <AccordeonContent
                item={item}
                isExpanded={isExpanded}
                containerRef={refs.current[item._id]}
                setImageInView={setImageInView}
              />
            )}
          </AccordeonWrapper>
        );
      })}
    </div>
  );
};

export default Accordeon;
