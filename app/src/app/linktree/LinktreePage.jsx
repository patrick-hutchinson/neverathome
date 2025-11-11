import TextMarquee from "@/components/TextMarquee/TextMarquee";
import Link from "next/link";

import styles from "./LinktreePage.module.css";

const LinktreePage = ({ data }) => {
  const socials = data.socials;
  const linktree = data.linktree;

  return (
    <main className={styles.main}>
      <ul typo="h2">
        {linktree.map((item) => (
          <li>
            <a href={item.link} target="_blank">
              {item.platform}
            </a>
          </li>
        ))}
        <li className="unavailable">Newsletter</li>
        <Link href="/">Website</Link>
        {socials.map((item) => (
          <li>
            <a href={item.link} target="_blank">
              {item.platform}
            </a>
          </li>
        ))}
      </ul>

      <TextMarquee className={styles.marquee} text="NeverAtHome" typo="h1" />
    </main>
  );
};

export default LinktreePage;
