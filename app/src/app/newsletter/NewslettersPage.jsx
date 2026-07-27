import Link from "next/link";

const NewslettersPage = ({ newsletters }) => {
  return newsletters.map((newsletter) => (
    <Link href={`/newsletter/${newsletter.slug.current}`}>
      <h2>{newsletter.title}</h2>
    </Link>
  ));
};

export default NewslettersPage;
