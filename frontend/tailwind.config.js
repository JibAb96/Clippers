/** @type {import('tailwindcss').Config} */
// Here we have some custom colors and fonts
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FAFAFA",
        secondary: "#D20B4E",
        tertiary: "#7A6E6E",
        quarternary: "#FFFAFC"
      },
      fontFamily: {
        leagueSpartan: ["League Spartan"]
     }
    },
  },
  plugins: [],
}

