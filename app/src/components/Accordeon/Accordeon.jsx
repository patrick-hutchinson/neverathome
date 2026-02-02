import React, { useState, useContext, useRef, useEffect } from "react";

import { StateContext } from "@/context/StateContext";

import AccordeonContent from "./AccordeonContent";
import AccordeonWrapper from "./AccordeonWrapper";
import AccordeonHeader from "./AccordeonHeader";
import { useColorPair } from "@/hooks/useColorPair";
import { useLenisContext } from "@/context/LenisContext";
import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";

const Accordeon = ({ array, size, invert, behavior, firstExpanded }) => {
  const lenis = useLenisContext();
  const [imageInView, setImageInView] = useState(null);

  // const [activeId, setActiveId] = useState(null);
  const [previousId, setPreviousId] = useState(null);

  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  const refs = useRef({});
  const accordeonRef = useRef(null);

  const { expandedElement, setExpandedElement } = useContext(StateContext);

  const handleExpand = (id) => {
    console.log(id, "id");
    // 🔽 CLICKING THE ACTIVE ITEM → COLLAPSE
    if (id === expandedElement) {
      setPreviousId(expandedElement);
      setExpandedElement(null);

      return;
    }

    // 🔼 OPENING A NEW ITEM
    const prevId = expandedElement;
    const prevEl = prevId ? refs.current[prevId]?.current : null;

    setPreviousId(prevId);
    setExpandedElement(id);

    const nextEl = refs.current[id]?.current;
    if (!nextEl) return;

    setTimeout(() => {
      const top = nextEl.getBoundingClientRect().top + window.scrollY - header_height - filter_height;

      lenis.scrollTo(top, {
        duration: 0.6,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    }, 700);

    setTimeout(() => {
      if (!prevEl) return;

      lenis.scrollTo(lenis.scroll - prevEl.getBoundingClientRect().height + 40, { duration: 0.4 });
    }, 2400);
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
        const isExpanded = item._id === expandedElement;
        const isCollapsing = item._id === previousId && previousId !== expandedElement;

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
                mode={isExpanded ? "expanding" : isCollapsing ? "collapsing" : "collapsed"}
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
