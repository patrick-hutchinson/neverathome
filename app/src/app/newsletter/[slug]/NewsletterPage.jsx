"use client";

import NewsletterFooter from "../components/NewsletterFooter";
import NewsletterHeader from "../components/NewsletterHeader";

import { renderNewsletter } from "../helpers/renderNewsletter";

import styles from "../Newsletter.module.css";

const NewsletterPage = ({ site, newsletter }) => {
  return (
    <div className={styles.main}>
      <div className="newsletter-content">
        <style>{`
          @media screen and (min-width: 769px) {
            .newsletter-footer .col-main {
              width: 75% !important;
              max-width: 75% !important;
            }

            .newsletter-footer .col-side {
              width: 25% !important;
              max-width: 25% !important;
            }
          }
        `}</style>
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
