import CalendarPage from "./CalendarPage";

import { getEvents, getSiteData } from "@/lib/fetch";

export default async function Page() {
  const [events] = await Promise.all([getEvents()]);
  const [site] = await Promise.all([getSiteData()]);

  return <CalendarPage events={events} site={site} />;
}
