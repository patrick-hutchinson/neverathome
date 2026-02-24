const NewsletterHeader = ({ newsletter }) => {
  return (
    <table
      className="newsletter-header"
      width="100%"
      border="0"
      cellPadding="0"
      cellSpacing="0"
      style={{
        backgroundColor: "#fff",
        padding: "8px",
        border: "0px",
      }}
    >
      <tbody>
        <tr>
          {/* LEFT SIDE (Desktop only) */}
          <td
            className="header-col-main newsletter-body-text"
            align="left"
            valign="bottom"
            style={{
              width: "50%",
              fontSize: "14px",
              lineHeight: "15px",
              color: "#000",
              padding: "0",
              margin: "0",
            }}
          >
            <table role="presentation" border="0" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td valign="bottom" style={{ paddingRight: "8px" }}>
                    NeverAtHome
                  </td>
                  <td valign="bottom" className="newsletter-body-text" style={{ fontSize: "14px", lineHeight: "15px" }}>
                    Newsletter
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          <td
            className="header-col-side newsletter-body-text"
            align="left"
            valign="bottom"
            style={{ border: "none", padding: "0px", position: "relative", width: "50%" }}
          >
            <table border="0" cellPadding="0" cellSpacing="0" style={{ border: "0" }}>
              <tbody>
                <tr>
                  <td
                    valign="bottom"
                    className="footer-links-td newsletter-release newsletter-body-text"
                    style={{
                      fontSize: "14px",
                      lineHeight: "15px",
                      textAlign: "left",
                      padding: "0",
                    }}
                  >
                    <div style={{ color: "#000", lineHeight: "15px" }}>{newsletter.release}</div>
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

export default NewsletterHeader;
