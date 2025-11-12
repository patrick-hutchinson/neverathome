import NewsletterTemplate from "@/components/email/NewsletterTemplate";
import ReactDOMServer from "react-dom/server";

export default async function handler(req, res) {
  const newsletterData = {
    title: "Möbius Update – November Edition",
    body: "This month we’ve been working on...",
    imageUrl: "https://example.com/banner.jpg",
  };

  const html = ReactDOMServer.renderToStaticMarkup(<NewsletterTemplate {...newsletterData} />);

  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>${html}`);
}
