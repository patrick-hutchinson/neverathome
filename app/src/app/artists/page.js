import ArtistsPage from "./ArtistsPage";

import { getArtists } from "@/lib/fetch";

const [artists] = await Promise.all([getArtists()]);

export default function Page() {
  return <ArtistsPage artists={artists} />;
}
