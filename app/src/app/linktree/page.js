import { getSiteData } from "@/lib/fetch";

import LinktreePage from "./LinktreePage";

export default async function Page() {
  const data = await getSiteData();
  return <LinktreePage data={data} />;
}
