const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{html,js,tsx}", './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    screens: {
      'xs': '300px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        customRed: "#db2416",
        primary: colors.yellow,
        secondary: colors.red,
      },
      fontFamily: {
        futura: ["Futura"],
      }
    },

  },
  plugins: [],
}

