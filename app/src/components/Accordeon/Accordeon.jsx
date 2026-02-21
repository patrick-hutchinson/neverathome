import React, { useState, useContext, useRef, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

import { StateContext } from "@/context/StateContext";

import AccordeonContent from "./AccordeonContent";
import AccordeonWrapper from "./AccordeonWrapper";
import AccordeonHeader from "./AccordeonHeader";
import { useColorPair } from "@/hooks/useColorPair";
import { useLenisContext } from "@/context/LenisContext";
import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";

const Accordeon = ({ array, size, invert, behavior, firstExpanded }) => {
  const lenis = useLenisContext();
  const pathname = usePathname();
  const [imageInView, setImageInView] = useState(null);

  const hasExpandedOnce = useRef(false);
  const lockRef = useRef({
    id: null,
    until: 0,
    raf: null,
  });

  // const [activeId, setActiveId] = useState(null);
  const [previousId, setPreviousId] = useState(null);

  const { header_height, filter_height } = useContext(GlobalVariablesContext);
  const isAbout = pathname === "/about";
  const stickyOffset = isAbout ? header_height : header_height + filter_height;

  const refs = useRef({});
  const accordeonRef = useRef(null);

  const { expandedElement, setExpandedElement } = useContext(StateContext);

  const scrollImmediate = (y) => {
    if (lenis) {
      lenis.scrollTo(y, { immediate: true, force: true });
      return;
    }
    window.scrollTo(0, y);
  };

  const alignItemToOffset = (id) => {
    const el = refs.current[id]?.current;
    if (!el) return;

    const targetY = window.scrollY + el.getBoundingClientRect().top - stickyOffset;
    scrollImmediate(targetY);
  };

  const stopLock = () => {
    if (lockRef.current.raf) {
      cancelAnimationFrame(lockRef.current.raf);
    }
    lockRef.current = { id: null, until: 0, raf: null };
  };

  const handleExpand = (id) => {
    stopLock();
    alignItemToOffset(id);
    lockRef.current = {
      id,
      until: performance.now() + 650,
      raf: null,
    };

    if (id === expandedElement) {
      setPreviousId(expandedElement);
      setExpandedElement(null);
      return;
    }

    setPreviousId(expandedElement);
    setExpandedElement(id);
  };

  useLayoutEffect(() => {
    const { id, until } = lockRef.current;
    if (!id) return;

    const tick = () => {
      if (!lockRef.current.id) return;

      alignItemToOffset(lockRef.current.id);

      if (performance.now() >= until) {
        stopLock();
        return;
      }

      lockRef.current.raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (lockRef.current.raf) {
        cancelAnimationFrame(lockRef.current.raf);
        lockRef.current.raf = null;
      }
    };
  }, [expandedElement, previousId, stickyOffset]);

  useEffect(() => {
    return () => stopLock();
  }, []);

  // expand the first element when it is in view
  useEffect(() => {
    if (!firstExpanded) return;
    if (hasExpandedOnce.current) return;
    if (!accordeonRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasExpandedOnce.current) {
          hasExpandedOnce.current = true;
          setExpandedElement(array[0]._id);
          observer.disconnect();
        }
      },
      { threshold: 1 },
    );

    observer.observe(accordeonRef.current);
    return () => observer.disconnect();
  }, [firstExpanded, array, setExpandedElement]);

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
