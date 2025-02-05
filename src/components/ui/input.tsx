import * as React from "react";

import { cn } from "@/src/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-purple-800/50 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-800 hover:border-purple-800 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-purple-300/50 dark:hover:border-purple-300 dark:focus-visible:ring-purple-300 dark:file:text-foreground dark:placeholder:text-slate-400",
          className,
        )}
        type={type}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
