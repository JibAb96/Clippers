/** @type {import('tailwindcss').Config} */
// Here we have some custom colors and fonts
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bluewhite:"#f8f8f8",
        skyblue: "#24b5eb",
        paleblue: "#e2e8f0" 
      },
      fontFamily: {
        DM: ["League Spartan"]
     }
    },
  },
  plugins: [],
}

