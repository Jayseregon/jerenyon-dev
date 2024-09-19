"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

type Props = {
  policyKey?: string;
};

const termageddonAPIPath = "https://app.termageddon.com/api/policy/";

export const Policy = ({ policyKey }: Props) => {
  const [policyContent, setPolicyContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      if (!policyKey) {
        setError("Error! Policy key is undefined.");

        return;
      }

      try {
        const policyElement = document.getElementById("policy");

        if (!policyElement) {
          setError("Error! Could not find policy element.");

          return;
        }

        const pol_extra = policyElement.dataset.extra
          ? "?" + policyElement.dataset.extra
          : "";
        const response = await axios.get(
          termageddonAPIPath + policyKey + pol_extra
        );
        const sanitizedContent = DOMPurify.sanitize(response.data);

        setPolicyContent(sanitizedContent);
      } catch (err) {
        // console.error("Error! Could not load policy.", err);
        setError("There has been an error loading this policy!");
      }
    };

    fetchPolicy();
  }, [policyKey]);

  const renderContent = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const traverseNodes = (node: ChildNode): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }

      const element = node as HTMLElement;

      switch (element.tagName) {
        case "H2":
          return (
            <h2 className="text-2xl font-bold my-4">{element.textContent}</h2>
          );
        case "P":
          return <p className="my-2">{element.textContent}</p>;
        case "TABLE":
          return (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full bg-background">
                {Array.from(element.childNodes).map((child, index) => (
                  <React.Fragment key={index}>
                    {traverseNodes(child)}
                  </React.Fragment>
                ))}
              </table>
            </div>
          );
        case "THEAD":
          return (
            <thead className="bg-purple-800 dark:bg-purple-300 text-background">
              {Array.from(element.childNodes).map((child, index) => (
                <React.Fragment key={index}>
                  {traverseNodes(child)}
                </React.Fragment>
              ))}
            </thead>
          );
        case "TBODY":
          return (
            <tbody>
              {Array.from(element.childNodes).map((child, index) => (
                <React.Fragment key={index}>
                  {traverseNodes(child)}
                </React.Fragment>
              ))}
            </tbody>
          );
        case "TR":
          return (
            <tr className="border border-purple-800 dark:border-purple-300">
              {Array.from(element.childNodes).map((child, index) => (
                <React.Fragment key={index}>
                  {traverseNodes(child)}
                </React.Fragment>
              ))}
            </tr>
          );
        case "TH":
          return (
            <th className="px-4 py-2 text-center">{element.textContent}</th>
          );
        case "TD":
          const textContent = element.textContent || "";
          const formattedContent = textContent.split(";").join("; ");

          return <td className="px-4 py-2 text-start">{formattedContent}</td>;
        case "UL":
          return (
            <ul className="list-disc list-inside text-start my-2">
              {Array.from(element.childNodes).map((child, index) => (
                <React.Fragment key={index}>
                  {traverseNodes(child)}
                </React.Fragment>
              ))}
            </ul>
          );
        case "LI":
          return <li>{element.textContent}</li>;
        default:
          return Array.from(element.childNodes).map((child, index) => (
            <React.Fragment key={index}>{traverseNodes(child)}</React.Fragment>
          ));
      }
    };

    return Array.from(doc.body.childNodes).map((node, index) => (
      <React.Fragment key={index}>{traverseNodes(node)}</React.Fragment>
    ));
  };

  return (
    <div
      className="text-justify w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 overflow-x-auto"
      data-extra="no-title=true"
      id="policy">
      {error ? (
        <p>{error}</p>
      ) : policyContent ? (
        renderContent(policyContent)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
