import {
  Fira_Code,
  Italiana,
  Lora,
  Inter,
  Inconsolata,
} from "next/font/google";

export const fontSans = Inconsolata({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});

export const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const fontDisplay = Italiana({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

export const fontSansAlt = Inter({
  subsets: ["latin"],
  variable: "--font-sans-alt",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});
