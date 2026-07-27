import { useRef } from "react";
import styles from "@/components/Calendar/Calendar.module.css";

const Filtering = ({ types, years, query, setQuery, activeTypes, activeYears, setActiveTypes, setActiveYears }) => {
  const yearsRef = useRef(null);
  const typesRef = useRef(null);
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

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

  const handlePointerDown = (ref) => (event) => {
    if (!ref.current) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: ref.current.scrollLeft,
      moved: false,
    };

    ref.current.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (ref) => (event) => {
    if (!ref.current || dragStateRef.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragStateRef.current.startX;

    if (Math.abs(deltaX) > 4) {
      dragStateRef.current.moved = true;
      ref.current.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
    }
  };

  const handlePointerEnd = (ref) => (event) => {
    if (!ref.current || dragStateRef.current.pointerId !== event.pointerId) return;

    ref.current.releasePointerCapture?.(event.pointerId);
    window.setTimeout(() => {
      dragStateRef.current = {
        pointerId: null,
        startX: 0,
        startScrollLeft: 0,
        moved: false,
      };
    }, 0);
  };

  const preventClickAfterDrag = (event) => {
    if (dragStateRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <form className={styles.filtering} onSubmit={(e) => e.preventDefault()}>
      <fieldset className={styles.all}>
        <button onClick={() => handleAll()}>All</button>
      </fieldset>

      <fieldset
        ref={yearsRef}
        className={styles.years}
        onPointerDown={handlePointerDown(yearsRef)}
        onPointerMove={handlePointerMove(yearsRef)}
        onPointerUp={handlePointerEnd(yearsRef)}
        onPointerCancel={handlePointerEnd(yearsRef)}
        onClickCapture={preventClickAfterDrag}
      >
        {years.map((year, index) => (
          <span key={year}>
            <button onClick={() => handleYears(year)} className={activeYears.includes(year) ? styles.active : ""}>
              {index > 0 ? `, ${year}` : year}
            </button>
          </span>
        ))}
      </fieldset>

      <fieldset
        ref={typesRef}
        className={styles.types}
        onPointerDown={handlePointerDown(typesRef)}
        onPointerMove={handlePointerMove(typesRef)}
        onPointerUp={handlePointerEnd(typesRef)}
        onPointerCancel={handlePointerEnd(typesRef)}
        onClickCapture={preventClickAfterDrag}
      >
        {types.map((type, index) => {
          if (type === null) return;

          return (
            <span key={type}>
              <button onClick={() => handleTypes(type)} className={activeTypes.includes(type) ? styles.active : ""}>
                {index > 0 ? `, ${type}` : type}
              </button>
            </span>
          );
        })}
      </fieldset>

      <div className={styles.search} style={{ alignItems: "center" }}>
        Search:
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ textIndent: "5px", caretColor: "#000" }}
          autoComplete="off"
        />
      </div>
    </form>
  );
};

export default Filtering;
