import CalendarPage from "./CalendarPage";

import { getEvents, getSiteData } from "@/lib/fetch";

const [events] = await Promise.all([getEvents()]);
const [site] = await Promise.all([getSiteData()]);

export default function Page() {
  return <CalendarPage events={events} site={site} />;
}
