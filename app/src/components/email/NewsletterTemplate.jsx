// components/email/NewsletterTemplate.jsx
export default function NewsletterTemplate() {
  const title = "Here's the Newsletter Title!";
  const body = "Here's the content of the Email.";

  return (
    <html>
      <body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <table width="100%" style={{ background: "#f5f5f5", padding: "20px" }}>
          <tr>
            <td align="center">
              <table width="600" style={{ background: "#fff", padding: "40px" }}>
                <tr>
                  <td>
                    <h1 style={{ fontSize: "24px" }}>{title}</h1>
                    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>{body}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
