import LocationPage from "./LocationsPage";

import { getLocations } from "@/lib/fetch";

const [locations] = await Promise.all([getLocations()]);

export default function Page() {
  return <LocationPage locations={locations} />;
}
