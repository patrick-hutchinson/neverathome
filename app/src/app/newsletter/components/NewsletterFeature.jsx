import { PortableText } from "@portabletext/react";

const getInternalHref = (link, site) => {
  const slug = link?.internalLink?.slug?.current || link?.internal?.slug?.current || link?.reference?.slug?.current;
  if (!slug) return null;

  const type = link?.internalLink?._type || link?.internal?._type || link?.reference?._type;
  const path = type === "event" ? `/calendar#${slug}` : `/${slug}`;
  return site?.domain ? `https://${site.domain}${path}` : path;
};

const getLinkHref = (link, site) => {
  if (!link) return null;
  const externalHref = link.url || link.href || link.externalLink || link.external;

  if (link.type === "external") return externalHref || null;
  if (link.type === "internal") return getInternalHref(link, site);
  return externalHref || getInternalHref(link, site);
};

const NewsletterFeature = ({ feature, site, className = "" }) => {
  const title = feature?.featureTitle || "";
  const link = feature?.link;
  const hasImage = Boolean(feature?.image?.url);
  const textColor = feature?.colorPair?.text?.value || "#ffffff";
  const backgroundColor = feature?.colorPair?.background?.value || "#000000";
  const mediaHeightPx = 360;
  const mediaHeight = `${mediaHeightPx}px`;

  return (
    <td
      className={className}
      width="50%"
      valign="top"
      align="left"
      style={{
        width: "50%",
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
              <PortableText
                value={feature?.runningText || []}
                components={{
                  block: {
                    normal: ({ children }) => <p style={{ margin: "0 0 8px 0" }}>{children}</p>,
                  },
                  marks: {
                    link: ({ value, children }) => {
                      const href = getLinkHref(value, site);
                      if (!href) return children;

                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#000000", textDecoration: "none", opacity: 0.3 }}
                        >
                          {children}
                        </a>
                      );
                    },
                  },
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  );
};

export default NewsletterFeature;
