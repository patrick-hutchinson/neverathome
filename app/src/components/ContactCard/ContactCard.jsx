import styles from "./ContactCard.module.css";

const ContactCard = ({ item, index, typo, onMouseEnter, onMouseLeave }) => {
  return (
    <li key={index} className={styles.contact} typo={typo} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
      {item?.name} <br />
      Role <br />
      <a href={`mailto:${item?.email}`}>{item?.email}</a>
    </li>
  );
};

export default ContactCard;
