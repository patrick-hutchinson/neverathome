import styles from "../Accordion.module.css";

const normalizeType = (type) => {
  if (typeof type === "string") return type;
  if (type == null) return "";
  if (typeof type === "object") {
    if (typeof type.title === "string") return type.title;
    if (typeof type.name === "string") return type.name;
    if (typeof type.label === "string") return type.label;
    return "";
  }
  return String(type);
};

const AccordionType = ({ type }) => <div className={styles.type}>{normalizeType(type)}</div>;

export default AccordionType;
