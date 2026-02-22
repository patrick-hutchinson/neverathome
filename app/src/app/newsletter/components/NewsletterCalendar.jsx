const portableTextToPlain = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      if (typeof block === "string") return block.trim();
      if (!block || !Array.isArray(block.children)) return "";
      return block.children
        .map((child) => child?.text || "")
        .join("")
        .trim();
    })
    .filter(Boolean)
    .join(" ");
};

const cutText = (text, maxLength = 220) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

const getCalendarHref = (event) => {
  const anchor = event?.slug?.current || event?._id;
  if (!anchor) return "https://www.never-at-home.com/calendar";
  return `https://www.never-at-home.com/calendar#${anchor}`;
};

const NewsletterCalendar = ({ block }) => {
  const events = Array.isArray(block?.events) ? block.events : [];

  return (
    <table
      className="newsletter-calendar"
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{ border: 0, marginBottom: "150px", marginTop: "150px" }}
    >
      <tbody>
        {block?.sectionHeader && (
          <tr>
            <td
              style={{
                width: "100%",
                textAlign: "center",
                paddingBottom: "24px",
                fontSize: "19px",
                lineHeight: "21px",
                border: 0,
              }}
            >
              {block.sectionHeader}
            </td>
          </tr>
        )}

        {events.map((event, index) => {
          const teaser = cutText(portableTextToPlain(event?.teaser));
          const eventType = typeof event?.type === "string" ? event.type : event?.type?.title || "";
          const href = getCalendarHref(event);
          const thumbnailUrl = event?.thumbnail?.type === "image" ? event?.thumbnail?.url : null;

          return (
            <tr key={event?._id || event?.slug?.current || `event-${index}`}>
              <td style={{ border: 0, padding: 0 }}>
                <table className="border" width="100%" cellPadding="0" cellSpacing="0" role="presentation">
                  <tbody>
                    <tr>
                      <td style={{ borderTop: "1px solid #000", fontSize: 0, lineHeight: 0, padding: "0px" }}>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>

                <table
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{ backgroundColor: "transparent", border: 0 }}
                >
                  <tbody>
                    <tr>
                      <td
                        valign="top"
                        style={{
                          width: "25%",
                          padding: "8px 10px 8px 0",
                          border: 0,
                          fontSize: "18px",
                          lineHeight: "20px",
                        }}
                      >
                        {eventType}
                      </td>
                      <td
                        valign="top"
                        style={{
                          padding: "8px 10px 8px 0",
                          border: 0,
                          fontSize: "18px",
                          lineHeight: "20px",
                          width: "auto",
                        }}
                      >
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#000", textDecoration: "none" }}
                        >
                          {event?.title}
                        </a>
                      </td>
                      <td
                        valign="top"
                        align="right"
                        style={{
                          width: "24px",
                          padding: "8px 0 8px 0",
                          border: 0,
                          fontSize: "18px",
                          lineHeight: "20px",
                          textAlign: "right",
                        }}
                      >
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#000", textDecoration: "none" }}
                        >
                          +
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td valign="top" style={{ width: "25%", border: 0, padding: "0 10px 16px 0" }}>
                        {thumbnailUrl ? (
                          <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <img
                              src={thumbnailUrl}
                              alt={event?.title || ""}
                              width="100%"
                              border="0"
                              style={{ display: "block", width: "100%", height: "auto", objectFit: "contain", border: 0 }}
                            />
                          </a>
                        ) : (
                          <table
                            width="100%"
                            cellPadding="0"
                            cellSpacing="0"
                            role="presentation"
                            style={{ border: "1px solid #000", width: "100%", minHeight: "48px" }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  valign="middle"
                                  style={{ border: 0, fontSize: "18px", lineHeight: "16px" }}
                                >
                                  {eventType || "Event"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </td>

                      <td valign="top" style={{ border: 0, padding: "0 10px 16px 0", fontSize: "18px", lineHeight: "16px" }}>
                        {teaser && <p style={{ margin: 0 }}>{teaser}</p>}
                      </td>
                      <td valign="top" style={{ width: "24px", border: 0, padding: "0 0 16px 0" }}>
                        &nbsp;
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default NewsletterCalendar;
