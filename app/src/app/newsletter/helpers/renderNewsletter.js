import NewsletterAnnouncement from "../components/NewsletterAnnouncement";
import NewsletterShowcase from "../components/NewsletterShowcase";
import NewsletterCalendar from "../components/NewsletterCalendar";
import NewsletterDoubleFeature from "../components/NewsletterDoubleFeature";

export const renderNewsletter = (block, site) => {
  if (!block) return null;

  const type = block._type;

  switch (type) {
    case "newsletterAnnouncement":
      return <NewsletterAnnouncement block={block} site={site} />;
    case "newsletterShowcase":
      return <NewsletterShowcase block={block} site={site} />;
    case "newsletterCalendar":
      return <NewsletterCalendar block={block} site={site} />;
    case "newsletterDoubleFeature":
      return <NewsletterDoubleFeature block={block} site={site} />;
  }
};
