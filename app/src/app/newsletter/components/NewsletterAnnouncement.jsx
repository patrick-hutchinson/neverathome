const portableTextToLines = (value) => {
  if (!value) return [];
  if (typeof value === "string") return [value];
  if (!Array.isArray(value)) return [];

  return value
    .map((block) => {
      if (typeof block === "string") return block.trim();
      if (!block || !Array.isArray(block.children)) return "";
      return block.children
        .map((child) => child?.text || "")
        .join("")
        .trim();
    })
    .filter(Boolean);
};

const NewsletterAnnouncement = ({ block }) => {
  const lines = portableTextToLines(block?.announcementText);

  console.log(block.sectionHeader, "sectionHeader");
  return (
    <table
      className="newsletter-announcement"
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{
        border: 0,
        width: "100%",
        margin: "0 auto",
        marginBottom: "100px",
      }}
    >
      <tbody>
        {block?.sectionHeader && (
          <tr>
            <td
              align="left"
              style={{
                padding: "0 0 10px 0",
                border: 0,
                fontSize: "18px",
                lineHeight: "20px",
              }}
            >
              {block.sectionHeader}
            </td>
          </tr>
        )}

        <tr>
          <td
            align="left"
            style={{
              border: 0,
              padding: 0,
              margin: 0,
              fontSize: "48px",
              lineHeight: "1",
            }}
          >
            {lines.map((line, index) => (
              <p key={`${line}-${index}`} style={{ margin: index === lines.length - 1 ? 0 : "0 0 14px 0" }}>
                {line}
              </p>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NewsletterAnnouncement;
