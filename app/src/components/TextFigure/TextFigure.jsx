const TextFigure = ({ item }) => {
  return (
    <div
      style={{
        background: "#FF46CB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h2>{item.text}</h2>
    </div>
  );
};

export default TextFigure;
