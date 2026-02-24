import styles from "./TextFigure.module.css";

const TextFigure = ({ text, colorPair }) => {
  return (
    <div
      className={styles.textFigure}
      style={{
        background: colorPair?.background?.value,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: colorPair?.text?.value }}>{text}</h2>
    </div>
  );
};

export default TextFigure;
