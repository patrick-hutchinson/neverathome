"use client";

import { useEffect, useState, useContext, useRef } from "react";

import styles from "./ArtistsPage.module.css";
import Filtering from "./Filtering/Filtering";
import ArtistInfo from "./ArtistInfo";

import Artist from "./components/Artist";
import { color } from "framer-motion";
import { StateContext } from "@/context/StateContext";

StateContext;

const ArtistsPage = ({ artists, colorPairs }) => {
  const { isTouch, isMobile } = useContext(StateContext);
  const locations = [...new Set(artists.map((artist) => artist.location))];
  const [activeLocations, setActiveLocations] = useState([...locations]);
  const [showLocations, setShowLocations] = useState(false);

  const [hoveredArtist, setHoveredArtist] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [inViewArtist, setInViewArtist] = useState(null);

  const [activeId, setActiveId] = useState(null);

  const currentArtist = hoveredArtist || selectedArtist || inViewArtist;

  const observerRef = useRef(null);

  // Determine whether to show the Filtering menu
  useEffect(() => {
    locations.length <= 1 ? setShowLocations(false) : setShowLocations(true);
  }, [locations]);

  const filteredArtists = artists.filter((artist) => activeLocations.includes(artist.location));

  observerRef.current = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.getAttribute("data-id"));
          handleInView(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    },
  );

  const handleInView = (element) => {
    if (!isMobile) return;

    const artist = artists.find((artist) => artist._id === element.getAttribute("data-id"));
    setInViewArtist(artist);
  };

  return (
    <main className={styles.main}>
      <Filtering array={locations} activeLocations={activeLocations} setActiveLocations={setActiveLocations} />
      <ul className={styles.artists}>
        {filteredArtists.map((artist) => {
          return (
            <Artist
              key={artist._id}
              artist={artist}
              hoveredArtist={hoveredArtist}
              setHoveredArtist={setHoveredArtist}
              selectedArtist={selectedArtist}
              setSelectedArtist={setSelectedArtist}
              colorPairs={colorPairs}
              observerRef={observerRef}
              activeId={activeId}
            />
          );
        })}
      </ul>

      <ArtistInfo currentArtist={currentArtist} showLocations={showLocations} />
    </main>
  );
};

export default ArtistsPage;
