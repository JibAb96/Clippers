/** @type {import('tailwindcss').Config} */
// Here we have some custom colors and fonts
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        skyblue: '#24b5eb', 
      },
      fontFamily: {
        DM: ["League Spartan"]
     }
    },
  },
  plugins: [],
}

