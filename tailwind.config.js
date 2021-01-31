/* eslint-disable */
const colors = require('tailwindcss/colors');
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,
      purple: {
        ...colors.purple,
        1000: '#160D33',
        1050: '#1F143F'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
