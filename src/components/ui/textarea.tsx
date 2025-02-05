import * as React from "react";

import { cn } from "@/src/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-purple-800/50 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-800 hover:border-purple-800 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-purple-300/50 dark:hover:border-purple-300 dark:placeholder:text-slate-400 dark:focus-visible:ring-purple-300",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
