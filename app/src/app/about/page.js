import AboutPage from "./AboutPage";

import { getContact } from "@/lib/fetch";
import { getLocations } from "@/lib/fetch";

const [contact] = await Promise.all([getContact()]);
const [locations] = await Promise.all([getLocations()]);

export default function Page() {
  return <AboutPage contact={contact} locations={locations} />;
}
