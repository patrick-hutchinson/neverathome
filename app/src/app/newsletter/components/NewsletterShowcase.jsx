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

const NewsletterShowcase = ({ block, site }) => {
  const eventType = typeof block?.eventType === "string" ? block.eventType : block?.eventType?.title || "";
  const formattedDate = formatDate(block?.date);

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
            className="newsletter-body-text running-text"
            colSpan="2"
            style={{ padding: 0, border: 0, fontSize: "14px", lineHeight: "15px" }}
          >
            <PortableText
              value={block?.text || []}
              components={{
                block: {
                  normal: ({ children }) => <p style={{ margin: "0 0 8px 0" }}>{children}</p>,
                },
                list: {
                  bullet: ({ children }) => (
                    <div style={{ margin: 0, padding: 0, listStyle: "none" }}>{children}</div>
                  ),
                  number: ({ children }) => (
                    <div style={{ margin: 0, padding: 0, listStyle: "none" }}>{children}</div>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <p style={{ margin: "0 0 8px 0", padding: 0 }}>{children}</p>,
                  number: ({ children }) => <p style={{ margin: "0 0 8px 0", padding: 0 }}>{children}</p>,
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
  );
};

export default NewsletterShowcase;
