import { useContext, useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";
import { StateContext } from "@/context/StateContext";

import styles from "./ArtistsPage.module.css";

const Artist = ({
  artist,
  hoveredArtist,
  setHoveredArtist,
  selectedArtist,
  setSelectedArtist,
  colorPairs,
  observerRef,
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
  const mobileColor = activeId === artist._id ? "#fff" : "#222";
  return (
    <motion.li
      key={artist._id}
      className={`${styles.artist} ${activeId === artist._id ? styles.active : ""}`}
      ref={(el) => el && observerRef.current?.observe(el)}
      data-id={artist._id}
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
