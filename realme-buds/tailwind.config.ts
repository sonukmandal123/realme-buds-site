import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        realme: {
          dark: "#050505",
          darkSecondary: "#0A0A0C",
          accent: "#F0B90B",
          accentSoft: "#EAE2B7",
        }
      },
    },
  },
  plugins: [],
};
export default config;
