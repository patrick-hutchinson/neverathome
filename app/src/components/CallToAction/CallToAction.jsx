import React from "react";
import styles from "./CallToAction.module.css";

export default function CallToAction({ site, prompt }) {
  // Compose Email on Button Click
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, description, subject } = formData;
    const mailtoLink = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(
      `Hey dear NeverAtHome team!\nI'm ${firstName} ${lastName} and wanted to ask:\n ${description}\n`,
    )}`;
    window.location.href = mailtoLink;
  };

  // Initialize formData
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    description: "",
    subject: "",
  });

  // updateFormData on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className={`commissioninfo-wrapper ${styles.callToAction}`} onSubmit={handleSubmit} typo="h2">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.prompt}>{prompt}</div>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className={`submission-wrapper ${styles.submitButton}`}>
        <button className="submitButton customButton" type="submit">
          Get In Touch
        </button>
      </div>
    </form>
  );
}
