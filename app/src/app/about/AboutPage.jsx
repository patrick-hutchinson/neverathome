import Media from "@/components/Media";
import Text from "@/components/Text";

import styles from "./AboutPage.module.css";

const AboutPage = ({ contact }) => {
  return (
    <main className={styles.main}>
      <div className="ff2">
        <Text text={contact.bio} />
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", marginTop: "var(--margin)" }}>
        <div style={{ width: "200px", height: "auto" }}>
          <Media medium={contact.image} />
        </div>

        <ul
          className="ff4"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            padding: "var(--margin)",
            gap: "var(--margin)",
          }}
        >
          {contact.teamMembers?.map((teamMember, index) => (
            <li key={index} style={{ display: "flex", flexDirection: "column" }}>
              {teamMember.name} <br />
              {teamMember.role} <br />
              <a href={`mailto:${teamMember.email}`}>{teamMember.email}</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default AboutPage;
