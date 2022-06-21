const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
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
        red: {
          650: "#db2416"
        },
        primary: colors.yellow,
        secondary: colors.red,
        accent: withOpacityValue('--color-accent'),
      },
      fontFamily: {
        flowCircular: ["Flow Circular", "cursive"],
      },
    },

  },
  plugins: [],
}

