/* eslint-disable */
const { orange } = require('tailwindcss/colors');
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
        1200: '#160D33',
        1100: '#1B123D',
        1000: '#1F143F',
         950: '#251b4d',
         925: '#251255',
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
