import { getNewsletterBySlug } from "@/lib/fetch";
import { getSiteData } from "@/lib/fetch";
import { notFound } from "next/navigation";

import NewsletterPage from "./NewsletterPage";

export default async function Page({ params }) {
  const { slug } = await params;

  const newsletter = await getNewsletterBySlug(slug);
  const site = await getSiteData();

  if (!newsletter) notFound();

  return <NewsletterPage site={site} newsletter={newsletter} />;
}
