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
        padding: "12px",
        height: "50px",
        border: "0px",
      }}
    >
      <tbody>
        <tr>
          {/* LEFT SIDE (Desktop only) */}
          <td
            align="left"
            valign="top"
            style={{
              width: "75%",
              fontSize: "18px",
              lineHeight: "13px",
              color: "#000",
              padding: "0",
              margin: "0",
              width: "73.5%",
            }}
          >
            <p>NeverAtHome</p>
            <p>Newsletter</p>
          </td>

          <td
            align="left"
            valign="top"
            style={{ border: "none", padding: "0px", position: "relative", width: "100%", width: "25%" }}
          >
            <table border="0" cellPadding="0" cellSpacing="0" style={{ border: "0" }}>
              <tbody>
                <tr>
                  <td
                    valign="top"
                    className="footer-links-td newsletter-release"
                    style={{
                      fontSize: "18px",
                      lineHeight: "13px",
                      textAlign: "left",
                      padding: "0",
                    }}
                  >
                    <div style={{ color: "#000" }}>{newsletter.release}</div>
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
