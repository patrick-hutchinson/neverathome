import ContactPage from "./ContactPage";

import { getContact } from "@/lib/fetch";

const [contact] = await Promise.all([getContact()]);

export default function Page() {
  return <ContactPage contact={contact} />;
}
