import { useEffect } from "react";

export function useScrollToExpanded({ isExpanded, ref, offset = 0, delay = 800 }) {
  useEffect(() => {
    if (!isExpanded || !ref?.current) return;

    const timeout = setTimeout(() => {
      const top = ref.current.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: top - offset,
        behavior: "smooth",
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, [isExpanded, ref, offset, delay]);
}
