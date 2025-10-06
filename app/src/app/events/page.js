import EventsPage from "./EventsPage";

import { getEventsPage, getSiteData } from "@/lib/fetch";

const [eventsPage] = await Promise.all([getEventsPage()]);
const [site] = await Promise.all([getSiteData()]);

export default function Page() {
  return <EventsPage page={eventsPage} site={site} />;
}
