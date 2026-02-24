"use client";

import { useState, useEffect } from "react";

const iconCache = new Map();

const Icon = ({ path, className, height, width }) => {
  const [content, setContent] = useState(() => iconCache.get(path) || "");

  useEffect(() => {
    if (iconCache.has(path)) {
      setContent(iconCache.get(path));
      return;
    }

    let cancelled = false;
    fetch(path)
      .then((res) => res.text())
      .then((svg) => {
        if (cancelled) return;
        iconCache.set(path, svg);
        setContent(svg);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [path]);

  return <div style={{ height, width }} className={className} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Icon;
