import type { Config } from "tailwindcss";
export default {
  content: [
    "./src/app/page.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FAFAFA",
        secondary: "#D20B4E",
        tertiary: "#7A6E6E",
        quarternary: "#FFFAFC"
      },
      fontFamily: {
        leagueSpartan: ['var(--font-league_spartan)']
     }
    },
  },
  plugins: [],
} satisfies Config;
