import WorkshopPage from "./WorkshopPage";

import { getWorkshopsPage, getEvents, getSiteData } from "@/lib/fetch";

export default async function Page() {
  const [page] = await Promise.all([getWorkshopsPage()]);
  const [events] = await Promise.all([getEvents()]);
  const [site] = await Promise.all([getSiteData()]);

  return <WorkshopPage page={page} events={events} site={site} />;
}
