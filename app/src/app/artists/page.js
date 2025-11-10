import ArtistsPage from "./ArtistsPage";

import { getArtists } from "@/lib/fetch";
import { getColorPairs } from "@/lib/fetch";

const [artists] = await Promise.all([getArtists()]);
const [colorPairs] = await Promise.all([getColorPairs()]);

export default function Page() {
  return <ArtistsPage artists={artists} colorPairs={colorPairs} />;
}
