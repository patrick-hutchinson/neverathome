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

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getCalendarHref = (event, site) => {
  const anchor = event?.slug?.current || event?._id;
  if (!anchor) return `https://${site.domain}/calendar`;
  return `https://${site.domain}/calendar#${anchor}`;
};

const NewsletterCalendar = ({ block, site }) => {
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
              className="newsletter-body-text"
              style={{
                width: "100%",
                textAlign: "left",
                paddingBottom: "6px",
                fontSize: "14px",
                lineHeight: "15px",
                border: 0,
              }}
            >
              {block.sectionHeader}
            </td>
          </tr>
        )}

        {events.map((event, index) => {
          const teaser = cutText(portableTextToPlain(event?.teaser));
          const formattedDate = formatDate(event?.startDate);
          const eventType = typeof event?.type === "string" ? event.type : event?.type?.title || "";
          const href = getCalendarHref(event, site);
          const thumbnailUrl = event?.thumbnail?.type === "image" ? event?.thumbnail?.url : null;

          return (
            <tr key={event?._id || event?.slug?.current || `event-${index}`}>
              <td style={{ border: 0, padding: 0 }}>
                <table className="border" width="100%" cellPadding="0" cellSpacing="0" role="presentation">
                  <tbody>
                    <tr>
                      <td style={{ border: 0, borderTop: "1px solid #fff", fontSize: 0, lineHeight: 0, padding: "0px" }}>
                        &nbsp;
                      </td>
                    </tr>
                  </tbody>
                </table>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#ffffff",
                  }}
                >
                  <table
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                    role="presentation"
                    style={{ backgroundColor: "#000", color: "#fff", border: 0, padding: "2px" }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ border: 0 }}>
                          <table width="100%" cellPadding="0" cellSpacing="0" role="presentation" style={{ border: 0 }}>
                            <tbody>
                              <tr>
                                <td
                                  className="event-type-top newsletter-body-text"
                                  valign="top"
                                  style={{
                                    display: "none",
                                    width: "0",
                                    maxWidth: "0",
                                    padding: "0",
                                    border: 0,
                                    overflow: "hidden",
                                    fontSize: "14px",
                                    lineHeight: "15px",
                                    color: "#ffffff",
                                  }}
                                >
                                  <font color="#ffffff">
                                    <span style={{ color: "#ffffff" }}>{eventType}</span>
                                  </font>
                                </td>
                                <td
                                  className="event-title-top newsletter-body-text"
                                  valign="top"
                                  style={{
                                    width: "90%",
                                    maxWidth: "90%",
                                    padding: "0",
                                    border: 0,
                                    fontSize: "14px",
                                    lineHeight: "15px",
                                    color: "#ffffff",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <font color="#ffffff">
                                    <span style={{ color: "#ffffff" }}>{event?.title}</span>
                                  </font>
                                </td>
                                <td
                                  className="event-plus-top newsletter-body-text newsletter-expand"
                                  valign="top"
                                  align="right"
                                  style={{
                                    width: "10%",
                                    maxWidth: "10%",
                                    padding: "0",
                                    border: 0,
                                    fontSize: "14px",
                                    lineHeight: "15px",
                                    textAlign: "right",
                                    color: "#ffffff",
                                  }}
                                >
                                  <font color="#ffffff">
                                    <span style={{ color: "#ffffff" }}>+</span>
                                  </font>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style={{ border: 0, padding: "0 0 4px 0" }}>
                          <table width="100%" cellPadding="0" cellSpacing="0" role="presentation" style={{ border: 0 }}>
                            <tbody>
                              <tr>
                                <td
                                  className="event-media-cell"
                                  valign="top"
                                  style={{
                                    width: "25%",
                                    border: 0,
                                    padding: "0",
                                  }}
                                >
                                  {thumbnailUrl ? (
                                    <img
                                      className="event-media-image"
                                      src={thumbnailUrl}
                                      alt={event?.title || ""}
                                      width="50%"
                                      border="0"
                                      style={{
                                        display: "block",
                                        width: "50%",
                                        height: "auto",
                                        objectFit: "contain",
                                        border: 0,
                                      }}
                                    />
                                  ) : (
                                    <table
                                      width="100%"
                                      cellPadding="0"
                                      cellSpacing="0"
                                      role="presentation"
                                      style={{ border: "1px solid #fff", width: "100%", minHeight: "48px" }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            className="newsletter-body-text"
                                            align="center"
                                            valign="middle"
                                            style={{ border: 0, fontSize: "14px", lineHeight: "15px", color: "#ffffff" }}
                                          >
                                            <font color="#ffffff">
                                              <span style={{ color: "#ffffff" }}>{eventType || "Event"}</span>
                                            </font>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  )}
                                </td>

                                <td
                                  className="event-mobile-gap"
                                  valign="top"
                                  style={{
                                    width: "8px",
                                    maxWidth: "8px",
                                    border: 0,
                                    padding: 0,
                                    fontSize: 0,
                                    lineHeight: 0,
                                  }}
                                >
                                  &nbsp;
                                </td>

                                <td
                                  className="event-teaser-cell newsletter-body-text"
                                  valign="top"
                                  style={{
                                    width: "75%",
                                    maxWidth: "75%",
                                    border: 0,
                                    padding: 0,
                                    fontSize: "14px",
                                    lineHeight: "15px",
                                    color: "#ffffff",
                                  }}
                                >
                                  {formattedDate && (
                                    <p style={{ margin: "0 0 4px 0", color: "#ffffff" }}>
                                      <font color="#ffffff">{formattedDate}</font>
                                    </p>
                                  )}
                                  {teaser && (
                                    <p style={{ margin: 0, color: "#ffffff" }}>
                                      <font color="#ffffff">{teaser}</font>
                                    </p>
                                  )}
                                </td>

                                <td
                                  className="event-desktop-spacer"
                                  valign="top"
                                  style={{ display: "none", width: "0", maxWidth: "0", border: 0, padding: 0 }}
                                >
                                  &nbsp;
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default NewsletterCalendar;
