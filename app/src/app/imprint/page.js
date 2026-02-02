import ImprintPage from "./ImprintPage";
import Imprint from "./ImprintPage";

import { getImprintPage } from "@/lib/fetch";

export default async function Page() {
  const [imprint] = await Promise.all([getImprintPage()]);

  return <ImprintPage imprint={imprint} />;
}
