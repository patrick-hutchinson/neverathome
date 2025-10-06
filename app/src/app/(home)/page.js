import Home from "./HomePage";

import { getHome, getSiteData } from "@/lib/fetch";

const [data] = await Promise.all([getHome()]);
const [site] = await Promise.all([getSiteData()]);

export default function Page() {
  return <Home data={data} site={site} />;
}
