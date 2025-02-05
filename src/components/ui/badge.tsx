import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  // "inline-flex items-center rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  "inline-flex items-center border text-xs transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent rounded-md bg-slate-900 text-slate-50 shadow hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        secondary:
          "border-transparent rounded-md bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        destructive:
          "border-transparent rounded-md bg-red-500 text-slate-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
        outline: "text-slate-950 dark:text-slate-50",
        purple:
          "bg-transparent border-purple-500 m-0.5 text-purple-500 rounded-full px-1.5 py-0.5",
        cyan: "bg-transparent border-cyan-500 m-0.5 text-cyan-500 rounded-full px-1.5 py-0.5",
        amber:
          "bg-transparent border-amber-500 m-0.5 text-amber-500 rounded-full px-1.5 py-0.5",
        gray: "bg-transparent border-gray-500 m-0.5 text-gray-500 rounded-full px-1.5 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
