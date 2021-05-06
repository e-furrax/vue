/* eslint-disable */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '96': '24rem'
      }
    },
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
        925: '#251255'
      },
      blueGray: {
        ...colors.blueGray,
        custom: '#a2a3c5'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['even']
    }
  },
  plugins: []
};
