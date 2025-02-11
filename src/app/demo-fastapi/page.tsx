"use client";

import { useState } from "react";

import { Button } from "@/src/components/ui/button";

export default function DemoFastAPIPage() {
  const [baseMessage, setBaseMessage] = useState("");
  const [embeddingMessage, setEmbeddingMessage] = useState("");
  const [showEmbedding, setShowEmbedding] = useState(false); // new state

  async function handleBaseQuery() {
    try {
      const res = await fetch("/api/py/hello");

      if (!res.ok) {
        setBaseMessage("Error fetching data");

        return;
      }
      const data = await res.json();

      setBaseMessage(data.message);
      setEmbeddingMessage("");
      setShowEmbedding(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setBaseMessage("Error fetching data");
    }
  }

  async function handleEmbeddingQuery() {
    // Immediately display the embedding header
    setBaseMessage("");
    setShowEmbedding(true);
    setEmbeddingMessage("");

    try {
      const res = await fetch("/api/py/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keywords: ["Python", "FastAPI", "Next.js"],
        }),
      });

      if (!res.ok) {
        setEmbeddingMessage("Error fetching data");

        return;
      }
      const data = await res.json();

      setEmbeddingMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Fetch error:", error);
      setEmbeddingMessage("Error fetching data");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen gap-4">
      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBaseQuery}>
          Hello Python
        </Button>
        <Button variant="outline" onClick={handleEmbeddingQuery}>
          Query embeddings
        </Button>
      </div>
      <div className="mt-4 text-center">
        {baseMessage && <p>{baseMessage}</p>}
      </div>
      {/* Render the embedding header immediately on click */}
      {showEmbedding && (
        <div className="mt-4 text-start">
          <p>
            Word embedding for &#91;&lsquo;Python&rsquo;, &lsquo;FastAPI&rsquo;,
            &lsquo;Next.js&rsquo;&#93;
          </p>
          {embeddingMessage && <pre>{embeddingMessage}</pre>}
        </div>
      )}
    </div>
  );
}
