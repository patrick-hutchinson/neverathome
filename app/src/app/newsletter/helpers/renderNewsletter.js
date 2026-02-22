import NewsletterAnnouncement from "../components/NewsletterAnnouncement";
import NewsletterShowcase from "../components/NewsletterShowcase";
import NewsletterCalendar from "../components/NewsletterCalendar";
import NewsletterDoubleFeature from "../components/NewsletterDoubleFeature";

export const renderNewsletter = (block) => {
  if (!block) return null;

  const type = block._type;

  switch (type) {
    case "newsletterAnnouncement":
      return <NewsletterAnnouncement block={block} />;
    case "newsletterShowcase":
      return <NewsletterShowcase block={block} />;
    case "newsletterCalendar":
      return <NewsletterCalendar block={block} />;
    case "newsletterDoubleFeature":
      return <NewsletterDoubleFeature block={block} />;
  }
};
