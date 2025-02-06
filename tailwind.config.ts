import type { Config } from "tailwindcss";

/** @type {import("tailwindcss").Config} */
const config: import("tailwindcss").Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,md,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,md,jsx,tsx,mdx,css}",
    "./node_modules/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["var(--font-serif)", "serif"],
        sansAlt: ["var(--font-sans-alt)", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "rgb(var(--color-background))",
        foreground: "rgb(var(--color-foreground))",
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        success: "rgb(var(--color-success))",
        warning: "rgb(var(--color-warning))",
        danger: "rgb(var(--color-danger))",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;

export default config;
