import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodeSnippetProps } from "@/src/interfaces/Root";
// import { useState } from "react";

export const CodeSnippet = ({ code, className }: CodeSnippetProps) => {
  //   const [copied, setCopied] = useState(false);

  //   const copyToClipboard = async () => {
  //     await navigator.clipboard.writeText(code);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   };

  return (
    <div
      className={cn(
        "relative rounded-md bg-muted p-4 font-mono text-sm",
        className,
      )}
    >
      <Button
        className="absolute right-4 top-4 h-6 w-6"
        size="icon"
        variant="ghost"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <pre className="overflow-x-auto">{code}</pre>
    </div>
  );
};
