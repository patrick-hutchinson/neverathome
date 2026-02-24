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
          // .newsletter-header .header-col-main,
          // .newsletter-header .header-col-side {
          //   width: 50% !important;
          //   max-width: 50% !important;
          // }

          .newsletter-body-text {
            font-size: 14px !important;
            line-height: 15px !important;
          }

          .newsletter-large-text {
            font-size: 30px !important;
            line-height: 1 !important;
          }

          .newsletter-feature-media,
          .newsletter-feature-media-inner,
          .newsletter-feature-media-link,
          .newsletter-feature-media-img {
            height: 360px !important;
            min-height: 360px !important;
            max-height: 360px !important;
          }

          .newsletter-calendar .event-type-top {
            display: none !important;
            width: 0 !important;
            max-width: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }

          .doubleFeature .double-feature-col.first-mobile-gap {
            padding-bottom: 56px !important;
          }

          @media screen and (min-width: 769px) {
            // .newsletter-header .header-col-main {
            //   width: 75% !important;
            //   max-width: 75% !important;
            // }

            .newsletter-header .header-col-side {
              width: 25% !important;
              max-width: 25% !important;
            }

            .newsletter-footer .col-main {
              width: 75% !important;
              max-width: 75% !important;
            }

            .newsletter-footer .col-side {
              width: 25% !important;
              max-width: 25% !important;
            }

            .doubleFeature .double-feature-row {
              display: table-row !important;
            }

            .doubleFeature .double-feature-col {
              display: table-cell !important;
              width: 50% !important;
              max-width: 50% !important;
            }

            .doubleFeature .double-feature-col.first-mobile-gap {
              padding-bottom: 6px !important;
            }

            .newsletter-body-text {
              font-size: 18px !important;
              line-height: 20px !important;
            }

            .newsletter-large-text {
              font-size: 48px !important;
              line-height: 1 !important;
            }

            .newsletter-feature-media,
            .newsletter-feature-media-inner,
            .newsletter-feature-media-link,
            .newsletter-feature-media-img {
              height: 520px !important;
              min-height: 520px !important;
              max-height: 520px !important;
            }

            .newsletter-calendar .event-type-top {
              display: table-cell !important;
              width: 25% !important;
              max-width: 25% !important;
              padding: 0 0 4px 0 !important;
              overflow: visible !important;
            }

            .footer-links a {
              opacity: 0.3;
              transition: 0.4s opacity
            }
            .footer-links a:hover {
              opacity: 1;
            }

            .newsletter-showcase .running-text{
              padding: 0 0 0 25% !important;
            }

            .newsletter-container{
              padding: 12px;
            }
          }
        `}</style>
        <NewsletterHeader newsletter={newsletter} />

        <div className="newsletter-container" style={{ padding: "8px" }}>
          {newsletter.pageBuilder.map((block) => renderNewsletter(block, site))}
        </div>
        <NewsletterFooter language={newsletter.language} site={site} />
      </div>
    </div>
  );
};

export default NewsletterPage;
