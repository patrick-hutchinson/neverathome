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

const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";

  const monthYear = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${monthYear.split(" ")[0]} ${getOrdinal(d.getDate())}, ${d.getFullYear()}`;
};

const NewsletterShowcase = ({ block }) => {
  const eventType = typeof block?.eventType === "string" ? block.eventType : block?.eventType?.title || "";
  const formattedDate = formatDate(block?.date);
  const runningTextLines = portableTextToLines(block?.text);
  const runningTextIndent = "calc(25%)";

  return (
    <table
      className="newsletter-showcase"
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{
        border: 0,
        marginBottom: "150px",
      }}
    >
      <tbody>
        <tr>
          <td
            valign="top"
            style={{
              width: "75%",
              padding: "0 0px 10px 0",
              border: 0,
            }}
          >
            <p
              className="newsletter-large-text"
              style={{
                margin: 0,
                fontSize: "30px",
                lineHeight: "1",
                fontWeight: "normal",
              }}
            >
              {block?.title}
            </p>
          </td>
          <td
            className="newsletter-body-text"
            valign="bottom"
            align="left"
            style={{
              width: "25%",
              padding: "0 0 10px 0",
              border: 0,
              fontSize: "14px",
              lineHeight: "15px",
              textAlign: "left",
            }}
          >
            <p style={{ margin: 0 }}>{formattedDate}</p>
            <p style={{ margin: 0 }}>{eventType}</p>
          </td>
        </tr>

        <tr>
          <td colSpan="2" style={{ padding: "0", border: 0 }}>
            {block?.image?.url && (
              <img
                src={block.image.url}
                alt={block?.title || ""}
                border="0"
                width="100%"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  border: 0,
                }}
              />
            )}
          </td>
        </tr>

        <tr>
          <td colSpan="2" style={{ padding: "10px 0 10px 0", border: 0 }}>
            <p
              className="newsletter-large-text"
              style={{
                margin: 0,
                fontSize: "30px",
                lineHeight: "1",
                fontWeight: "normal",
              }}
            >
              {block?.textTitle}
            </p>
          </td>
        </tr>

        <tr>
          <td
            className="newsletter-body-text"
            colSpan="2"
            style={{ padding: `0 0 0 ${runningTextIndent}`, border: 0, fontSize: "14px", lineHeight: "15px" }}
          >
            {runningTextLines.map((line, index) => (
              <p key={`${line}-${index}`} style={{ margin: index === runningTextLines.length - 1 ? 0 : "0 0 8px 0" }}>
                {line}
              </p>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NewsletterShowcase;
