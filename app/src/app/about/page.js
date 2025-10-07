import AboutPage from "./AboutPage";

import { getContact } from "@/lib/fetch";

const [contact] = await Promise.all([getContact()]);

export default function Page() {
  return <AboutPage contact={contact} />;
}
