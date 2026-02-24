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

const NewsletterFeature = ({ feature, className = "" }) => {
  const title = feature?.featureTitle || "";
  const link = feature?.link;
  const hasImage = Boolean(feature?.image?.url);
  const textColor = feature?.colorPair?.text?.value || "#ffffff";
  const backgroundColor = feature?.colorPair?.background?.value || "#000000";
  const runningTextLines = portableTextToLines(feature?.runningText);
  const mediaHeightPx = 360;
  const mediaHeight = `${mediaHeightPx}px`;

  return (
    <td
      className={className}
      width="100%"
      valign="top"
      align="left"
      style={{
        display: "block",
        width: "100%",
        padding: "0 1px",
        border: 0,
        paddingBottom: "6px",
      }}
    >
      <table width="100%" cellPadding="0" cellSpacing="0" role="presentation" style={{ border: 0 }}>
        <tbody>
          <tr>
            <td align="left" valign="top" style={{ border: 0, backgroundColor }}>
              {hasImage ? (
                <table
                  className="newsletter-feature-media"
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  height={mediaHeightPx}
                  style={{
                    border: 0,
                    backgroundColor,
                    height: mediaHeight,
                    minHeight: mediaHeight,
                    maxHeight: mediaHeight,
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        className="newsletter-feature-media-inner"
                        align="center"
                        valign="middle"
                        height={mediaHeightPx}
                        style={{ border: 0, height: mediaHeight, minHeight: mediaHeight, maxHeight: mediaHeight }}
                      >
                        {link ? (
                          <a
                            className="newsletter-feature-media-link"
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "none",
                              display: "block",
                              width: "100%",
                              height: mediaHeight,
                              minHeight: mediaHeight,
                              maxHeight: mediaHeight,
                            }}
                          >
                            <img
                              className="newsletter-feature-media-img"
                              src={feature.image.url}
                              alt={title}
                              width="100%"
                              height={mediaHeightPx}
                              border="0"
                              style={{
                                display: "block",
                                width: "100%",
                                height: mediaHeight,
                                minHeight: mediaHeight,
                                maxHeight: mediaHeight,
                                objectFit: "cover",
                                border: 0,
                              }}
                            />
                          </a>
                        ) : (
                          <img
                            className="newsletter-feature-media-img"
                            src={feature.image.url}
                            alt={title}
                            width="100%"
                            height={mediaHeightPx}
                            border="0"
                            style={{
                              display: "block",
                              width: "100%",
                              height: mediaHeight,
                              minHeight: mediaHeight,
                              maxHeight: mediaHeight,
                              objectFit: "cover",
                              border: 0,
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table
                  className="newsletter-feature-media"
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  height={mediaHeightPx}
                  style={{
                    border: 0,
                    backgroundColor,
                    height: mediaHeight,
                    minHeight: mediaHeight,
                    maxHeight: mediaHeight,
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        className="newsletter-feature-media-inner"
                        align="center"
                        valign="middle"
                        height={mediaHeightPx}
                        style={{ border: 0, height: mediaHeight, minHeight: mediaHeight, maxHeight: mediaHeight }}
                      >
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: textColor, textDecoration: "none" }}
                          >
                            <p
                              className="newsletter-large-text"
                              style={{
                                margin: 0,
                                color: textColor,
                                fontSize: "30px",
                                lineHeight: "1",
                              }}
                            >
                              {title}
                            </p>
                          </a>
                        ) : (
                          <p
                            className="newsletter-large-text"
                            style={{
                              margin: 0,
                              color: textColor,
                              fontSize: "30px",
                              lineHeight: "1",
                            }}
                          >
                            {title}
                          </p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </td>
          </tr>

          <tr>
            <td
              className="newsletter-body-text"
              align="left"
              valign="top"
              style={{
                paddingTop: "4px",
                border: 0,
                fontSize: "14px",
                lineHeight: "15px",
                paddingRight: "8px",
              }}
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
    </td>
  );
};

export default NewsletterFeature;
