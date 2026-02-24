import NewsletterFeature from "./NewsletterFeature";

const NewsletterDoubleFeature = ({ block }) => {
  const features = Array.isArray(block?.story) ? block.story.slice(0, 2) : [];

  return (
    <table
      className="doubleFeature"
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{ marginBottom: "150px", marginTop: "150px", border: 0 }}
    >
      <tbody>
        {block?.sectionHeader && (
          <tr>
            <td
              className="newsletter-body-text"
              colSpan="2"
              align="left"
              style={{
                padding: "0 6px 6px 0px",
                fontSize: "14px",
                lineHeight: "15px",
                border: 0,
              }}
            >
              {block.sectionHeader}
            </td>
          </tr>
        )}
        <tr className="double-feature-row" style={{ display: "block" }}>
          {features.map((feature, index) => (
            <NewsletterFeature
              key={feature?._key || `${feature?.featureTitle || "feature"}-${index}`}
              className={`double-feature-col${index === 0 ? " first-mobile-gap" : ""}`}
              feature={feature}
            />
          ))}
          {features.length < 2 && (
            <td
              className="double-feature-col"
              width="100%"
              valign="top"
              align="left"
              style={{ display: "block", width: "100%", border: 0 }}
            />
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default NewsletterDoubleFeature;
