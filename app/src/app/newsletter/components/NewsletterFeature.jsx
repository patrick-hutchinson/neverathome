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

const NewsletterFeature = ({ feature }) => {
  const title = feature?.featureTitle || "";
  const link = feature?.link;
  const hasImage = Boolean(feature?.image?.url);
  const textColor = feature?.colorPair?.text?.value || "#ffffff";
  const backgroundColor = feature?.colorPair?.background?.value || "#000000";
  const runningTextLines = portableTextToLines(feature?.runningText);
  const mediaHeight = "66vh";

  return (
    <td
      width="50%"
      valign="top"
      align="left"
      style={{
        width: "50%",
        padding: "0 1px",
        border: 0,
      }}
    >
      <table width="100%" cellPadding="0" cellSpacing="0" role="presentation" style={{ border: 0 }}>
        <tbody>
          <tr>
            <td align="left" valign="top" style={{ border: 0, backgroundColor }}>
              {hasImage ? (
                <table
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{
                    border: 0,
                    backgroundColor,
                    height: mediaHeight,
                  }}
                >
                  <tbody>
                    <tr>
                      <td align="center" valign="middle" style={{ border: 0, height: mediaHeight }}>
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", display: "block", width: "100%", height: mediaHeight }}
                          >
                            <img
                              src={feature.image.url}
                              alt={title}
                              width="100%"
                              border="0"
                              style={{
                                display: "block",
                                width: "100%",
                                height: mediaHeight,
                                objectFit: "cover",
                                border: 0,
                              }}
                            />
                          </a>
                        ) : (
                          <img
                            src={feature.image.url}
                            alt={title}
                            width="100%"
                            border="0"
                            style={{
                              display: "block",
                              width: "100%",
                              height: mediaHeight,
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
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{
                    border: 0,
                    backgroundColor,
                    height: mediaHeight,
                  }}
                >
                  <tbody>
                    <tr>
                      <td align="center" valign="middle" style={{ padding: "20px", border: 0, height: mediaHeight }}>
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: textColor, textDecoration: "none" }}
                          >
                            <p
                              style={{
                                margin: 0,
                                color: textColor,
                                fontSize: "27px",
                                lineHeight: "1",
                                textTransform: "uppercase",
                              }}
                            >
                              {title}
                            </p>
                          </a>
                        ) : (
                          <p
                            style={{
                              margin: 0,
                              color: textColor,
                              fontSize: "27px",
                              lineHeight: "1",
                              textTransform: "uppercase",
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
              align="left"
              valign="top"
              style={{
                paddingTop: "10px",
                border: 0,
                fontSize: "18px",
                lineHeight: "20px",
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
