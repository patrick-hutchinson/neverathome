import { useContext, useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";
import { StateContext } from "@/context/StateContext";

import styles from "../ArtistsPage.module.css";

const Artist = ({
  artist,
  dataId,
  hoveredArtist,
  setHoveredArtist,
  selectedArtist,
  setSelectedArtist,
  colorPairs,
  observerRef,
  observerVersion,
  activeId,
}) => {
  const { isTouch, isMobile } = useContext(StateContext);

  const textColors = colorPairs.map((colorPair) => colorPair.text.value);

  const [currentHoverColor, setCurrentHoverColor] = useState(null);

  const [lockedColor, setLockedColor] = useState(null); // store color of selected artist

  const isSelected = selectedArtist?.name === artist.name;
  const isHovered = hoveredArtist?.name === artist.name;

  const handleClick = (artist) => {
    if (selectedArtist?.name === artist.name) {
      // unselect the currently locked artist
      setSelectedArtist(null);
      setLockedColor(null);
    } else {
      // lock this artist with its current hover color
      setSelectedArtist(artist);
      if (hoveredArtist?.name === artist.name) {
        // use current hover color if hovering
        setLockedColor(currentHoverColor);
      } else {
        // fallback random color if not hovering
        setLockedColor(textColors[Math.floor(Math.random() * textColors.length)]);
      }
    }
  };

  // Determine color

  const desktopColor = isSelected ? lockedColor : isHovered ? currentHoverColor : "#fff";
  const mobileColor = activeId === dataId ? "#fff" : "#222";

  const itemRef = useRef(null);

  useEffect(() => {
    const element = itemRef.current;
    const observer = observerRef.current;
    if (!element || !observer) return;

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [observerRef, observerVersion, dataId]);

  return (
    <motion.li
      className={`${styles.artist} ${activeId === dataId ? styles.active : ""}`}
      ref={itemRef}
      data-id={dataId}
      style={{ color: isMobile ? mobileColor : desktopColor }}
      onMouseEnter={() => {
        if (isMobile) return;

        const randomColor = textColors[Math.floor(Math.random() * textColors.length)];
        setHoveredArtist(artist);
        setCurrentHoverColor(randomColor);
      }}
      onMouseLeave={() => {
        if (isMobile) return;

        setHoveredArtist(null);
      }}
      onClick={() => handleClick(artist)}
    >
      <h2>{artist.name}</h2>
    </motion.li>
  );
};

export default Artist;
