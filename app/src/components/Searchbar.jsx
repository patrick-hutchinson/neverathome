import { useState } from "react";

const Searchbar = () => {
  let [query, setQuery] = useState(null);

  return <input type="search" name="q" value={query} onChange={(e) => setQuery(e.target.value)} />;
};
export default Searchbar;
