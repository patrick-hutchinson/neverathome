import ArtistsPage from "./ArtistsPage";

import { getArtists } from "@/lib/fetch";
import { getColorPairs } from "@/lib/fetch";

export default async function Page() {
  const [artists] = await Promise.all([getArtists()]);
  const [colorPairs] = await Promise.all([getColorPairs()]);

  return <ArtistsPage artists={artists} colorPairs={colorPairs} />;
}
