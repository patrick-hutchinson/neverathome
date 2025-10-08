import styles from "./Filtering.module.css";

const Filtering = ({ types, years, query, setQuery, activeTypes, activeYears, setActiveTypes, setActiveYears }) => {
  function handleTypes(type) {
    const allActive = activeTypes.length === types.length && types.every((t) => activeTypes.includes(t));

    if (allActive) {
      // all active → set only selected
      setActiveTypes([type]);
    } else {
      setActiveTypes((prev) => {
        const newTypes = prev.includes(type)
          ? prev.filter((t) => t !== type) // remove if already active
          : [...prev, type]; // add if not active

        // if empty → reset to all
        return newTypes.length === 0 ? [...types] : newTypes;
      });
    }
  }

  function handleYears(year) {
    const allActive = activeYears.length === years.length && years.every((y) => activeYears.includes(y));

    if (allActive) {
      setActiveYears([year]);
    } else {
      setActiveYears((prev) => {
        const newYears = prev.includes(year)
          ? prev.filter((t) => t !== year) // remove if already active
          : [...prev, year]; // add if not active

        // if empty → reset to all
        return newYears.length === 0 ? [...years] : newYears;
      });
    }
  }

  const handleAll = () => {
    setActiveTypes([...types]);
    setActiveYears([...years]);
  };

  return (
    <form className={styles.filtering} onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <button onClick={() => handleAll()} className={styles.all}>
          All
        </button>
      </fieldset>

      <fieldset>
        {years.map((year, index) => (
          <span key={index}>
            <button onClick={() => handleYears(year)} className={activeYears.includes(year) ? styles.active : ""}>
              {year}
            </button>
            {index < years.length - 1 && ", "}
          </span>
        ))}
      </fieldset>

      <fieldset>
        {types.map((type, index) => (
          <span key={index}>
            <button onClick={() => handleTypes(type)} className={activeTypes.includes(type) ? styles.active : ""}>
              {type}
            </button>
            {index < types.length - 1 && ", "}
          </span>
        ))}
      </fieldset>

      <label>
        Search:
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ textIndent: "5px" }}
          autoComplete="off"
        />
      </label>
    </form>
  );
};

export default Filtering;
