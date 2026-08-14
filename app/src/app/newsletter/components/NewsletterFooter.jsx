import { getDownloadUrl } from "@/helpers/handleDownload";

const year = new Date().getFullYear();

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

const NewsletterFooter = ({ site }) => {
  const addressLines = portableTextToLines(site?.address);
  const socials = Array.isArray(site?.socials) ? site.socials : [];
  const workshopSpaceUrl = getDownloadUrl(site?.workshopSpaceFile);
  const presskitLink = site?.presskitLink;
  const mediaarchiveLink = site?.mediaarchiveLink;

  return (
    <table
      className="newsletter-footer"
      width="100%"
      border="0"
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        border: 0,
      }}
    >
      <tbody>
        <tr>
          <td className="newsletter-footer-inner" style={{ padding: "8px", border: 0 }}>
            <table width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ border: 0 }}>
              <tbody>
                <tr>
                  <td
                    className="col-main newsletter-body-text"
                    valign="top"
                    align="left"
                    style={{
                      width: "50%",
                      padding: "0 24px 30px 0",
                      fontSize: "14px",
                      lineHeight: "15px",
                      textAlign: "left",
                      border: 0,
                    }}
                  >
                    {site?.googleMaps ? (
                      <a
                        href={site.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#ffffff", textDecoration: "none" }}
                      >
                        {addressLines.map((line, index) => (
                          <div key={`${line}-${index}`}>{line}</div>
                        ))}
                      </a>
                    ) : (
                      addressLines.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)
                    )}

                    {site?.email && (
                      <div style={{ marginTop: "2px" }}>
                        <a
                          href={`mailto:${site.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#ffffff", textDecoration: "none" }}
                        >
                          {site.email}
                        </a>
                      </div>
                    )}
                  </td>

                  <td
                    className="col-side newsletter-body-text footer-links"
                    valign="top"
                    align="left"
                    style={{
                      width: "50%",
                      paddingBottom: "30px",
                      fontSize: "14px",
                      lineHeight: "15px",
                      textAlign: "left",
                      border: 0,
                    }}
                  >
                    <div>
                      {workshopSpaceUrl && (
                        <div>
                          <a
                            href={workshopSpaceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#ffffff", textDecoration: "none", opacity: 0.3 }}
                          >
                            Rent a Workshop Space
                          </a>
                        </div>
                      )}

                      <div>
                        <a
                          href={`https://${site.domain}/linktree`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#ffffff", textDecoration: "none", opacity: 0.3 }}
                        >
                          Go to Linktree
                        </a>
                      </div>

                      {presskitLink && (
                        <div>
                          <a
                            href={presskitLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#ffffff", textDecoration: "none", opacity: 0.3 }}
                          >
                            Download Presskit
                          </a>
                        </div>
                      )}

                      {mediaarchiveLink && (
                        <div>
                          <a
                            href={mediaarchiveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#ffffff", textDecoration: "none", opacity: 0.3 }}
                          >
                            Mediaarchive
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td
                    className="col-main"
                    valign="bottom"
                    align="left"
                    style={{
                      width: "50%",
                      padding: "14px 24px 0 0",
                      fontSize: "13px",
                      lineHeight: "15px",
                      textAlign: "left",
                      border: 0,
                    }}
                  >
                    {`${site?.title || "Never At Home"} © ${year}`}
                  </td>

                  <td
                    className="col-side"
                    valign="bottom"
                    align="left"
                    style={{
                      width: "50%",
                      paddingTop: "14px",
                      fontSize: "13px",
                      lineHeight: "15px",
                      textAlign: "left",
                      border: 0,
                    }}
                  >
                    <div style={{ display: "inline" }}>
                      <a
                        href={`https://${site.domain}/imprint`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#ffffff", textDecoration: "none" }}
                      >
                        Imprint
                      </a>
                    </div>

                    {socials.length > 0 && (
                      <span>
                        {", "}
                        {socials.map((social, index) => (
                          <span key={`${social.platform}-${index}`}>
                            <a
                              href={social.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#ffffff", textDecoration: "none" }}
                            >
                              {social.platform}
                            </a>
                            {index < socials.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NewsletterFooter;
