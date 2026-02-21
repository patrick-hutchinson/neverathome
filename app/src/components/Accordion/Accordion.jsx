import React, { useState, useContext, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

import { StateContext } from "@/context/StateContext";

import AccordionContent from "./AccordionContent";
import AccordionWrapper from "./AccordionWrapper";
import AccordionHeader from "./AccordionHeader";
import { getColorPairForItem } from "@/hooks/useColorPair";
import { useLenisContext } from "@/context/LenisContext";
import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";

const Accordion = ({ array, size, invert, behavior, firstExpanded }) => {
  const lenis = useLenisContext();
  const pathname = usePathname();
  const [activeGalleryImage, setActiveGalleryImage] = useState({ id: null, index: 0 });

  const hasExpandedOnce = useRef(false);
  const lockRef = useRef({
    id: null,
    until: 0,
    raf: null,
  });
  const clickTokenRef = useRef(0);

  // const [activeId, setActiveId] = useState(null);
  const [closingItemId, setClosingItemId] = useState(null);

  const { header_height, filter_height } = useContext(GlobalVariablesContext);
  const isAbout = pathname === "/about";
  const stickyOffset = isAbout ? header_height : header_height + filter_height;

  const refs = useRef({});
  const accordionRef = useRef(null);

  const { activeItemId, setActiveItemId, colorPairs } = useContext(StateContext);
  const safeItems = useMemo(() => (Array.isArray(array) ? array.filter((item) => item && item._id) : []), [array]);

  useEffect(() => {
    if (!activeItemId) {
      setActiveGalleryImage((prev) => (prev.id === null && prev.index === 0 ? prev : { id: null, index: 0 }));
      return;
    }

    setActiveGalleryImage((prev) => (prev.id === activeItemId && prev.index === 0 ? prev : { id: activeItemId, index: 0 }));
  }, [activeItemId]);

  const scrollImmediate = (y) => {
    if (lenis) {
      lenis.scrollTo(y, { immediate: true, force: true });
      return;
    }
    window.scrollTo(0, y);
  };

  const getTargetY = (id) => {
    const el = refs.current[id]?.current;
    if (!el) return null;

    return window.scrollY + el.getBoundingClientRect().top - stickyOffset;
  };

  const alignItemToOffset = (id, force = false) => {
    const el = refs.current[id]?.current;
    if (!el) return;

    const delta = el.getBoundingClientRect().top - stickyOffset;
    if (!force && Math.abs(delta) < 0.75) return;

    scrollImmediate(window.scrollY + delta);
  };

  const animateToOffset = (id, onComplete) => {
    const targetY = getTargetY(id);
    if (targetY == null) {
      onComplete();
      return;
    }

    if (!lenis) {
      window.scrollTo({ top: targetY, behavior: "smooth" });
      window.setTimeout(onComplete, 350);
      return;
    }

    const distance = Math.abs(targetY - window.scrollY);
    if (distance < 2) {
      onComplete();
      return;
    }

    lenis.scrollTo(targetY, {
      duration: 0.45,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      force: true,
      onComplete,
    });
  };

  const stopLock = () => {
    if (lockRef.current.raf) {
      cancelAnimationFrame(lockRef.current.raf);
    }
    lockRef.current = { id: null, until: 0, raf: null };
  };

  const handleExpand = (id) => {
    clickTokenRef.current += 1;
    const clickToken = clickTokenRef.current;

    stopLock();

    animateToOffset(id, () => {
      if (clickToken !== clickTokenRef.current) return;

      alignItemToOffset(id, true);
      lockRef.current = {
        id,
        until: performance.now() + 650,
        raf: null,
      };

      if (id === activeItemId) {
        setClosingItemId(activeItemId);
        setActiveItemId(null);
        return;
      }

      setClosingItemId(activeItemId);
      setActiveItemId(id);
    });
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
  }, [activeItemId, closingItemId, stickyOffset]);

  useEffect(() => {
    return () => stopLock();
  }, []);

  // expand the first element when it is in view
  useEffect(() => {
    if (!firstExpanded) return;
    if (hasExpandedOnce.current) return;
    if (!accordionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasExpandedOnce.current) {
          hasExpandedOnce.current = true;
          if (!safeItems[0]?._id) return;
          setActiveItemId(safeItems[0]._id);
          observer.disconnect();
        }
      },
      { threshold: 1 },
    );

    observer.observe(accordionRef.current);
    return () => observer.disconnect();
  }, [firstExpanded, safeItems, setActiveItemId]);

  return (
    <div className="accordion" ref={accordionRef}>
      {safeItems.map((item) => {
        let isExpandable = item.info || item.gallery;
        const isExpanded = item._id === activeItemId;
        const isCollapsing = item._id === closingItemId && closingItemId !== activeItemId;

        const colorPair = getColorPairForItem(item, colorPairs);

        if (!refs.current[item._id]) {
          refs.current[item._id] = React.createRef();
        }

        return (
          <AccordionWrapper
            key={item._id}
            item={item}
            index={item._id}
            ref={refs.current[item._id]}
            isExpanded={isExpanded}
            behavior={behavior}
            handleExpand={handleExpand}
            invert={invert}
            colorPair={colorPair}
            isExpandable={isExpandable}
          >
            <AccordionHeader item={item} size={size} isExpanded={isExpanded} activeGalleryImage={activeGalleryImage} />
            {size === "large" && (
                <AccordionContent
                  item={item}
                  mode={isExpanded ? "expanding" : isCollapsing ? "collapsing" : "collapsed"}
                  containerRef={refs.current[item._id]}
                  isExpanded={isExpanded}
                  setActiveGalleryImage={(rawIndex) => {
                    if (activeItemId !== item._id) return;
                    const parsedIndex = Number(rawIndex);
                    const nextIndex = Number.isFinite(parsedIndex) ? parsedIndex : 0;
                    setActiveGalleryImage((prev) =>
                      prev.id === item._id && prev.index === nextIndex ? prev : { id: item._id, index: nextIndex },
                    );
                  }}
                />
              )}
          </AccordionWrapper>
        );
      })}
    </div>
  );
};

export default Accordion;
