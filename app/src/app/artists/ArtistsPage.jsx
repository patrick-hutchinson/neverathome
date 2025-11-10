"use client";

import { useState } from "react";

import styles from "./ArtistsPage.module.css";

import { motion } from "framer-motion";

const ArtistsPage = ({ artists, colorPairs }) => {
  const textColors = colorPairs.map((colorPair) => colorPair.text.value);

  const [currentArtist, setCurrentArtist] = useState(null);

  const locations = [...new Set(artists.map((artist) => artist.location))];

  let [activeLocations, setActiveLocations] = useState([...locations]);

  function handleLocations(location) {
    const allActive =
      activeLocations.length === locations.length && locations.every((y) => activeLocations.includes(y));

    if (allActive) {
      setActiveLocations([location]);
    } else {
      setActiveLocations((prev) => {
        const newLocations = prev.includes(location)
          ? prev.filter((t) => t !== location) // remove if already active
          : [...prev, location]; // add if not active

        // if empty → reset to all
        return newLocations.length === 0 ? [...locations] : newLocations;
      });
    }
  }

  const handleAll = () => {
    setActiveLocations([...locations]);
  };

  const Filtering = () => (
    <form className={styles.filtering} onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <button onClick={() => handleAll()} className={styles.all}>
          All
        </button>
      </fieldset>

      <fieldset>
        {locations.map((location, index) => (
          <span key={index}>
            <button
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

  const filteredArtists = artists.filter((artist) => {
    const matchesType = activeLocations.includes(artist.location);
    return matchesType;
  });

  return (
    <main className={styles.main}>
      <Filtering />
      <ul className={styles.artists}>
        {filteredArtists.map((artist, index) => (
          <motion.li
            whileHover={{
              color: textColors[Math.floor(Math.random() * textColors.length)],
              transition: { duration: 0 },
            }}
            className={styles.artist}
            key={index}
            onMouseEnter={() => setCurrentArtist(artist)}
            onMouseLeave={() => setCurrentArtist()}
          >
            <h2>{artist.name}</h2>
          </motion.li>
        ))}
      </ul>

      <div className={`${styles.info}`} typo="h4">
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
