export default function Maintenance() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#fff",
        color: "#000",
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: "24px",
        lineHeight: 1.4,
        textAlign: "center",
      }}
    >
      <p typo="h3" style={{ maxWidth: "640px", margin: 0 }}>
        Our website will be offline for a short while during maintenance. We will be back soon!
      </p>
    </main>
  );
}
