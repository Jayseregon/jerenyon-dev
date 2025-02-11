"use client";

import { useState } from "react";

import { Button } from "@/src/components/ui/button";

export default function DemoFastAPIPage() {
  const [baseMessage, setBaseMessage] = useState("");

  async function handleBaseQuery() {
    try {
      const res = await fetch("/api/py/hello");

      if (!res.ok) {
        setBaseMessage("Error fetching data");

        return;
      }
      const data = await res.json();

      setBaseMessage(data.message);
    } catch (error) {
      console.error("Fetch error:", error);
      setBaseMessage("Error fetching data");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen gap-4">
      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBaseQuery}>
          Hello Python
        </Button>
      </div>
      <div className="mt-4 text-center">
        {baseMessage && <p>{baseMessage}</p>}
      </div>
    </div>
  );
}
