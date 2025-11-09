import { getSiteData } from "@/lib/fetch";

const [data] = await Promise.all([getSiteData()]);

import LinktreePage from "./LinktreePage";

export default function Page() {
  return <LinktreePage data={data} />;
}
