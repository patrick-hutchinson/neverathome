import styles from "../ArtistsPage.module.css";

const Filtering = ({ array, activeLocations, setActiveLocations }) => {
  if (array.length <= 1) return;

  const handleAll = () => setActiveLocations([...array]);

  function handleLocations(location) {
    const allActive = activeLocations.length === array.length && array.every((y) => activeLocations.includes(y));

    if (allActive) {
      setActiveLocations([location]);
    } else {
      setActiveLocations((prev) => {
        const newLocations = prev.includes(location) ? prev.filter((t) => t !== location) : [...prev, location];
        return newLocations.length === 0 ? [...array] : newLocations;
      });
    }
  }

  return (
    <form className={styles.filtering} onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <button type="button" onClick={handleAll} className={styles.all}>
          All
        </button>
      </fieldset>

      <fieldset className={styles.locations}>
        {array.map((location, index) => (
          <span key={index}>
            <button
              type="button"
              onClick={() => handleLocations(location)}
              className={activeLocations.includes(location) ? styles.active : ""}
            >
              {location}
            </button>
            {index < array.length - 1 && ", "}
          </span>
        ))}
      </fieldset>
    </form>
  );
};

export default Filtering;
