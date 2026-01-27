import AboutPage from "./AboutPage";

import { getContact, getSiteData } from "@/lib/fetch";
import { getLocations } from "@/lib/fetch";

const [site] = await Promise.all([getSiteData()]);
const [contact] = await Promise.all([getContact()]);
const [locations] = await Promise.all([getLocations()]);

export default function Page() {
  return <AboutPage contact={contact} locations={locations} site={site} />;
}
