import { useContext } from "react";
import styles from "../Accordion.module.css";
import { StateContext } from "@/context/StateContext";

const AccordionLink = ({ event }) => {
  const { siteEmail } = useContext(StateContext);
  const registrationMode = event?.registrationMode;
  const ticketLink = typeof event?.ticketLink === "string" ? event.ticketLink.trim() : "";
  const emailTarget = siteEmail || "";
  const emailSubject = encodeURIComponent(`Registration for ${event?.title || "Event"}`);
  const isEmailMode = registrationMode === "email";
  const isFreeSignUpMode = registrationMode === "freeSignUp";
  const isNoRegistrationMode = registrationMode === "noRegistration";
  const hasUsableEmail = Boolean(emailTarget);

  return (
    <div className={styles.link}>
      {isEmailMode && hasUsableEmail ? (
        <a href={`mailto:${emailTarget}?subject=${emailSubject}`}>Register via email</a>
      ) : isNoRegistrationMode ? (
        <div>No Registration Required</div>
      ) : ticketLink ? (
        <a href={ticketLink} target="_blank" rel="noopener noreferrer">
          {isFreeSignUpMode ? "Register" : "Tickets"}
        </a>
      ) : hasUsableEmail ? (
        <a href={`mailto:${emailTarget}?subject=${emailSubject}`}>Register via email</a>
      ) : (
        <div>Free Entry</div>
      )}
    </div>
  );
};

export default AccordionLink;
