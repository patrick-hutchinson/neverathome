import EventsPage from "./ProgrammingPage";

import { getEventsPage, getSiteData } from "@/lib/fetch";

export default async function Page() {
  const [eventsPage] = await Promise.all([getEventsPage()]);
  const [site] = await Promise.all([getSiteData()]);

  return <EventsPage page={eventsPage} site={site} />;
}
