import Home from "./HomePage";

import { getHome, getSiteData } from "@/lib/fetch";

export default async function Page() {
  const [data] = await Promise.all([getHome()]);
  const [site] = await Promise.all([getSiteData()]);

  return <Home data={data} site={site} />;
}
