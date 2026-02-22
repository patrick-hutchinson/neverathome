"use client";

import NewsletterFooter from "../components/NewsletterFooter";
import NewsletterHeader from "../components/NewsletterHeader";

import { renderNewsletter } from "../helpers/renderNewsletter";

import styles from "../Newsletter.module.css";

const NewsletterPage = ({ site, newsletter }) => {
  return (
    <div className={styles.main}>
      <div className="newsletter-content">
        <NewsletterHeader newsletter={newsletter} />

        <div style={{ padding: "13px" }}>
          {newsletter.pageBuilder.map((block) => renderNewsletter(block, newsletter.language))}
        </div>
        <NewsletterFooter language={newsletter.language} site={site} />
      </div>
    </div>
  );
};

export default NewsletterPage;
