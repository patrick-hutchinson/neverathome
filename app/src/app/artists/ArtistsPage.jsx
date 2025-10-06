"use client";

import { useState } from "react";

import styles from "./ArtistsPage.module.css";

const ArtistsPage = ({ artists }) => {
  console.log(artists);
  const [currentArtist, setCurrentArtist] = useState(null);

  return (
    <main className={styles.main}>
      <ul>
        {artists.map((artist, index) => (
          <li key={index} onMouseEnter={() => setCurrentArtist(artist)} onMouseLeave={() => setCurrentArtist(null)}>
            <h2>{artist.name}</h2>
          </li>
        ))}
      </ul>

      <div className={styles.info}>
        <ul>
          {currentArtist?.occupation && <li>{currentArtist.occupation}</li>}
          {currentArtist?.email && <li>{currentArtist.email}</li>}
          {currentArtist?.phone && <li>{currentArtist.phone}</li>}
          {currentArtist?.location ? <li>{currentArtist.location[0].title}</li> : <li>Currently without location</li>}
        </ul>
      </div>
    </main>
  );
};

export default ArtistsPage;
