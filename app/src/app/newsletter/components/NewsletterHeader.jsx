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
        paddingBottom: "50px",
        border: "0px",
      }}
    >
      <tbody>
        <tr>
          {/* LEFT SIDE (Desktop only) */}
          <td
            align="left"
            valign="bottom"
            style={{
              width: "73.5%",
              fontSize: "18px",
              lineHeight: "18px",
              color: "#000",
              padding: "0",
              margin: "0",
            }}
          >
            <table role="presentation" border="0" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td valign="bottom" style={{ paddingRight: "8px" }}>
                    <img
                      src="https://www.never-at-home.at/assets/newsletter/logo.gif"
                      height="18"
                      style={{ display: "block", height: "14px", width: "auto", border: "0" }}
                      alt="Logo"
                    />
                  </td>
                  <td valign="bottom" style={{ fontSize: "18px", lineHeight: "18px" }}>
                    Newsletter
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          <td
            align="left"
            valign="bottom"
            style={{ border: "none", padding: "0px", position: "relative", width: "100%", width: "25%" }}
          >
            <table border="0" cellPadding="0" cellSpacing="0" style={{ border: "0" }}>
              <tbody>
                <tr>
                  <td
                    valign="bottom"
                    className="footer-links-td newsletter-release"
                    style={{
                      fontSize: "18px",
                      lineHeight: "18px",
                      textAlign: "left",
                      padding: "0",
                    }}
                  >
                    <div style={{ color: "#000", lineHeight: "18px" }}>{newsletter.release}</div>
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
