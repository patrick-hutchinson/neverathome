import StudiosPage from "./StudiosPage";

import { getSiteData, getStudiosPage } from "@/lib/fetch";

const [page] = await Promise.all([getStudiosPage()]);
const [site] = await Promise.all([getSiteData()]);

export default function Page() {
  return <StudiosPage page={page} site={site} />;
}
