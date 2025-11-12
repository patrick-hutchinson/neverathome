"use client";

import { createContext, useState, useEffect } from "react";

// Create the context
export const StateContext = createContext();

export const StateProvider = ({ children, colorPairs = [] }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [deviceDimensions, setDeviceDimensions] = useState({ width: 0, height: 0 });
  const [isSafari, setIsSafari] = useState(false);

  const [expandedElement, setExpandedElement] = useState(null);

  // Detect if the screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 769; // Calculate the new value
      setIsMobile(newIsMobile); // Update the state

      setDeviceDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(safari);
  }, []);

  return (
    <StateContext.Provider
      value={{ isMobile, isSafari, deviceDimensions, expandedElement, setExpandedElement, colorPairs }}
    >
      {children}
    </StateContext.Provider>
  );
};
