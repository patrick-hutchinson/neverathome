import AboutPage from "./AboutPage";

import { getContact, getSiteData } from "@/lib/fetch";
import { getLocations } from "@/lib/fetch";

export default async function Page() {
  const [site] = await Promise.all([getSiteData()]);
  const [contact] = await Promise.all([getContact()]);
  const [locations] = await Promise.all([getLocations()]);

  return <AboutPage contact={contact} locations={locations} site={site} />;
}
