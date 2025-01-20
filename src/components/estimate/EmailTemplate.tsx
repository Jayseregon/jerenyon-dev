import * as React from "react";

import { QuoteEmailNotificationProps } from "@/src/interfaces/Quote";

export const EmailTemplate = ({
  clientName,
  clientEmail,
  comment,
}: QuoteEmailNotificationProps) => (
  <div>
    <h1>Jerenyon Dev Quote Request</h1>
    <p>
      <h2>You have received a Quote request from:</h2>
      {clientName}
      <br />({clientEmail})
      <br />
      <h3>Comments:</h3>
      {comment}
    </p>
  </div>
);
