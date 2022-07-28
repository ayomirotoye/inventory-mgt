const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: "300px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        red: {
          650: "#db2416",
        },
        customRed: "#db2416",
        primary: colors.yellow,
        secondary: colors.red,
      },
      fontFamily: {
        futura: ["Futura"],
      },
    },
  },
  plugins: [],
};
