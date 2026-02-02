import StudiosPage from "./StudiosPage";

import { getSiteData, getStudiosPage } from "@/lib/fetch";

export default async function Page() {
  const [page] = await Promise.all([getStudiosPage()]);
  const [site] = await Promise.all([getSiteData()]);

  return <StudiosPage page={page} site={site} />;
}
