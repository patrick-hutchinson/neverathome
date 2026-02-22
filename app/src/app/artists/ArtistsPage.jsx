"use client";

import { useEffect, useState, useContext, useRef, useMemo, useCallback } from "react";

import styles from "./ArtistsPage.module.css";
import Filtering from "./Filtering/Filtering";
import ArtistInfo from "./ArtistInfo";

import Artist from "./components/Artist";
import { StateContext } from "@/context/StateContext";

const ArtistsPage = ({ artists, colorPairs }) => {
  const { isTouch, isMobile } = useContext(StateContext);
  const infiniteMode = isTouch || isMobile;

  const INFINITE_REPEAT_COUNT = 7;
  const CENTER_BLOCK = Math.floor(INFINITE_REPEAT_COUNT / 2);
  const EDGE_SHIFT_BLOCKS = Math.max(CENTER_BLOCK - 1, 1);

  const locations = [...new Set(artists.map((artist) => artist.location))];
  const [activeLocations, setActiveLocations] = useState([...locations]);
  const [showLocations, setShowLocations] = useState(false);

  const [hoveredArtist, setHoveredArtist] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [inViewArtist, setInViewArtist] = useState(null);

  const [activeId, setActiveId] = useState(null);

  const currentArtist = hoveredArtist || selectedArtist || inViewArtist;

  const observerRef = useRef(null);
  const artistsListRef = useRef(null);
  const [observerVersion, setObserverVersion] = useState(0);

  // Determine whether to show the Filtering menu
  useEffect(() => {
    locations.length <= 1 ? setShowLocations(false) : setShowLocations(true);
  }, [locations]);

  const filteredArtists = useMemo(
    () => artists.filter((artist) => activeLocations.includes(artist.location)),
    [artists, activeLocations],
  );

  const renderedArtists = useMemo(() => {
    if (!infiniteMode) {
      return filteredArtists.map((artist) => ({
        key: artist._id,
        artist,
        dataId: artist._id,
      }));
    }

    return Array.from({ length: INFINITE_REPEAT_COUNT }, (_, blockIndex) =>
      filteredArtists.map((artist, index) => ({
        key: `${artist._id}-${blockIndex}-${index}`,
        artist,
        dataId: artist._id,
      })),
    ).flat();
  }, [filteredArtists, infiniteMode]);

  const handleInViewById = useCallback(
    (id) => {
      if (!infiniteMode) return;
      const artist = filteredArtists.find((entry) => entry._id === id) || null;
      setInViewArtist(artist);
    },
    [filteredArtists, infiniteMode],
  );

  useEffect(() => {
    const root = infiniteMode ? artistsListRef.current : null;

    const observer = new IntersectionObserver(
      (entries) => {
        const rootBounds = entries[0]?.rootBounds || root?.getBoundingClientRect();
        const centerY = rootBounds ? (rootBounds.top + rootBounds.bottom) / 2 : window.innerHeight / 2;

        let nearest = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("data-id");
          if (!id) continue;

          const midY = (entry.boundingClientRect.top + entry.boundingClientRect.bottom) / 2;
          const distance = Math.abs(midY - centerY);

          if (!nearest || distance < nearest.distance) {
            nearest = { id, distance };
          }
        }

        if (!nearest) return;
        setActiveId((prev) => (prev === nearest.id ? prev : nearest.id));
        handleInViewById(nearest.id);
      },
      {
        root,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    observerRef.current = observer;
    setObserverVersion((prev) => prev + 1);
    return () => {
      observer.disconnect();
      if (observerRef.current === observer) observerRef.current = null;
    };
  }, [infiniteMode, handleInViewById]);

  useEffect(() => {
    if (!infiniteMode) return;
    if (!artistsListRef.current) return;
    if (filteredArtists.length === 0) return;

    const list = artistsListRef.current;
    const rafId = requestAnimationFrame(() => {
      const segmentHeight = list.scrollHeight / INFINITE_REPEAT_COUNT;
      if (!segmentHeight || !Number.isFinite(segmentHeight)) return;
      list.scrollTop = segmentHeight * CENTER_BLOCK;
    });

    return () => cancelAnimationFrame(rafId);
  }, [filteredArtists, infiniteMode]);

  const handleInfiniteScroll = useCallback(() => {
    if (!infiniteMode) return;
    if (!artistsListRef.current) return;
    if (filteredArtists.length === 0) return;

    const list = artistsListRef.current;
    const segmentHeight = list.scrollHeight / INFINITE_REPEAT_COUNT;
    if (!segmentHeight || !Number.isFinite(segmentHeight)) return;

    if (list.scrollTop < segmentHeight) {
      list.scrollTop += segmentHeight * EDGE_SHIFT_BLOCKS;
      return;
    }

    if (list.scrollTop > segmentHeight * (INFINITE_REPEAT_COUNT - 2)) {
      list.scrollTop -= segmentHeight * EDGE_SHIFT_BLOCKS;
    }
  }, [infiniteMode, filteredArtists.length]);

  useEffect(() => {
    document.body.classList.toggle("artists-infinite-mode", infiniteMode);
    return () => document.body.classList.remove("artists-infinite-mode");
  }, [infiniteMode]);

  return (
    <main className={`${styles.main} ${infiniteMode ? styles.infinite : ""}`}>
      <Filtering array={locations} activeLocations={activeLocations} setActiveLocations={setActiveLocations} />
      <ul
        className={`${styles.artists} ${infiniteMode ? styles.infinite : ""}`}
        ref={artistsListRef}
        onScroll={infiniteMode ? handleInfiniteScroll : undefined}
      >
        {renderedArtists.map(({ key, artist, dataId }) => {
          return (
            <Artist
              key={key}
              artist={artist}
              dataId={dataId}
              hoveredArtist={hoveredArtist}
              setHoveredArtist={setHoveredArtist}
              selectedArtist={selectedArtist}
              setSelectedArtist={setSelectedArtist}
              colorPairs={colorPairs}
              observerRef={observerRef}
              observerVersion={observerVersion}
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
