"use client";

import React, { useEffect } from "react";

type Props = {
  policyKey: string;
};

export const Policy = ({ policyKey }: Props) => {
  useEffect(() => {
    const policyElement = document.getElementById("policy_embed_div");

    if (policyElement) {
      policyElement.setAttribute("data-policy-key", policyKey);
    }

    const script = document.createElement("script");

    script.src =
      "https://app.termageddon.com/js/termageddon-init-compatibility.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [policyKey]);

  return (
    <div
      className="text-justify"
      data-extra="css-compatibility=true&no-title=true"
      id="policy_embed_div"
    >
      Please wait while the policy is loaded. If it does not load, please
      <a
        aria-label="View Privacy Policy"
        href={`https://app.termageddon.com/api/policy/${policyKey}?css-compatibility=true&h-align=left&table-style=accordion`}
        rel="nofollow"
        target="_blank"
      >
        click here to view the privacy policy
      </a>
      .
    </div>
  );
};
