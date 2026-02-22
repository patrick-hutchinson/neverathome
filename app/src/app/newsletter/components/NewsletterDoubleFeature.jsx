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
              colSpan="2"
              align="left"
              style={{
                padding: "0 6px 18px 0px",
                fontSize: "19px",
                lineHeight: "21px",
                border: 0,
              }}
            >
              {block.sectionHeader}
            </td>
          </tr>
        )}
        <tr>
          {features.map((feature, index) => (
            <NewsletterFeature key={feature?._key || `${feature?.featureTitle || "feature"}-${index}`} feature={feature} />
          ))}
          {features.length < 2 && <td width="50%" style={{ width: "50%", border: 0 }} />}
        </tr>
      </tbody>
    </table>
  );
};

export default NewsletterDoubleFeature;
