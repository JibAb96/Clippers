/** @type {import('tailwindcss').Config} */
// Here we have some custom colors and fonts
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FAFAFA",
        secondary: "#D20B4E",
      },
      fontFamily: {
        DM: ["League Spartan"]
     }
    },
  },
  plugins: [],
}

