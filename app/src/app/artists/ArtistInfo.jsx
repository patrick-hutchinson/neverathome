import styles from "./ArtistsPage.module.css";

const ArtistInfo = ({ currentArtist, showLocations }) => {
  return (
    <div
      className={styles.info}
      typo="h4"
      style={{
        top: showLocations
          ? "calc(var(--header-height) + var(--accordeon-header-height) + var(--margin))"
          : "calc(var(--header-height) + var(--margin))",
      }}
    >
      <ul>
        {currentArtist?.occupation && <li>{currentArtist.occupation}</li>}
        {currentArtist?.email && <li>{currentArtist.email}</li>}
        {currentArtist?.phone && <li>{currentArtist.phone}</li>}
        {currentArtist?.location && <li>{currentArtist.location}</li>}
      </ul>
    </div>
  );
};

export default ArtistInfo;
