import ImprintPage from "./ImprintPage";
import Imprint from "./ImprintPage";

import { getImprintPage } from "@/lib/fetch";

const [imprint] = await Promise.all([getImprintPage()]);

export default function Page() {
  return <ImprintPage imprint={imprint} />;
}
