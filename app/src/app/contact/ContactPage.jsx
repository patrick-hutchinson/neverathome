import Media from "@/components/Media";
import Text from "@/components/Text";

const ContactPage = ({ contact }) => {
  return (
    <main className="invert">
      <div className="ff2">
        <Text text={contact.bio} />
      </div>

      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "200px", height: "auto" }}>
          <Media medium={contact.image} />
        </div>

        <ul className="ff4" style={{ display: "flex", justifyContent: "space-evenly", width: "space-available" }}>
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

export default ContactPage;
