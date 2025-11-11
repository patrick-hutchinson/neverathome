"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import styles from "./ArtistsPage.module.css";

const ArtistsPage = ({ artists, colorPairs }) => {
  const textColors = colorPairs.map((colorPair) => colorPair.text.value);

  const [hoveredArtist, setHoveredArtist] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [lockedColor, setLockedColor] = useState(null); // store color of selected artist

  const locations = [...new Set(artists.map((artist) => artist.location))];
  const [activeLocations, setActiveLocations] = useState([...locations]);

  function handleLocations(location) {
    const allActive =
      activeLocations.length === locations.length && locations.every((y) => activeLocations.includes(y));

    if (allActive) {
      setActiveLocations([location]);
    } else {
      setActiveLocations((prev) => {
        const newLocations = prev.includes(location) ? prev.filter((t) => t !== location) : [...prev, location];
        return newLocations.length === 0 ? [...locations] : newLocations;
      });
    }
  }

  const handleAll = () => setActiveLocations([...locations]);

  const Filtering = () => (
    <form className={styles.filtering} onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <button type="button" onClick={handleAll} className={styles.all}>
          All
        </button>
      </fieldset>

      <fieldset className={styles.locations}>
        {locations.map((location, index) => (
          <span key={index}>
            <button
              type="button"
              onClick={() => handleLocations(location)}
              className={activeLocations.includes(location) ? styles.active : ""}
            >
              {location}
            </button>
            {index < locations.length - 1 && ", "}
          </span>
        ))}
      </fieldset>
    </form>
  );

  const filteredArtists = artists.filter((artist) => activeLocations.includes(artist.location));

  const currentArtist = hoveredArtist || selectedArtist;

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

  // Keep track of the current hover color
  const [currentHoverColor, setCurrentHoverColor] = useState(null);

  return (
    <main className={styles.main}>
      <Filtering />
      <ul className={styles.artists}>
        {filteredArtists.map((artist, index) => {
          const isSelected = selectedArtist?.name === artist.name;
          const isHovered = hoveredArtist?.name === artist.name;

          // Determine color
          const color = isSelected ? lockedColor : isHovered ? currentHoverColor : "#fff";

          return (
            <motion.li
              key={index}
              className={styles.artist}
              style={{ color }}
              onMouseEnter={() => {
                const randomColor = textColors[Math.floor(Math.random() * textColors.length)];
                setHoveredArtist(artist);
                setCurrentHoverColor(randomColor);
              }}
              onMouseLeave={() => setHoveredArtist(null)}
              onClick={() => handleClick(artist)}
            >
              <h2>{artist.name}</h2>
            </motion.li>
          );
        })}
      </ul>

      <div className={styles.info} typo="h4">
        <ul>
          {currentArtist?.occupation && <li>{currentArtist.occupation}</li>}
          {currentArtist?.email && <li>{currentArtist.email}</li>}
          {currentArtist?.phone && <li>{currentArtist.phone}</li>}
          {currentArtist?.location && <li>{currentArtist.location}</li>}
        </ul>
      </div>
    </main>
  );
};

export default ArtistsPage;
