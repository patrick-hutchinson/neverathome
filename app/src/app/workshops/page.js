import WorkshopPage from "./WorkshopPage";

import { getWorkshopsPage, getEvents, getSiteData } from "@/lib/fetch";

const [page] = await Promise.all([getWorkshopsPage()]);
const [events] = await Promise.all([getEvents()]);
const [site] = await Promise.all([getSiteData()]);

export default function Page() {
  return <WorkshopPage page={page} events={events} site={site} />;
}
