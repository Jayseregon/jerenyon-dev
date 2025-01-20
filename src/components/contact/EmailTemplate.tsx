import * as React from "react";

import { ContactFormData } from "@/src/interfaces/Contact";

export const EmailTemplate = ({
  firstName,
  lastName,
  subject,
  email,
  message,
}: ContactFormData) => (
  <div>
    <h1>Jerenyon Dev Contact Form</h1>
    <p>
      <h2>You have received a message from:</h2>
      {firstName} {lastName}
      <br />({email})
      <br />
      <h3>Subject:</h3>
      {subject}
      <h3>Message:</h3>
      {message}
    </p>
  </div>
);
