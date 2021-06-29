/* eslint-disable */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.vue'],
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        'shake-x': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      },
      animation: {
        'shake-x': 'shake-x 0.82s cubic-bezier(.36,.07,.19,.97) both'
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '96': '24rem',
        '192': '48rem'
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
    },
    opacity: ({ after }) => after(['disabled']),
    backgroundColor: ({ after }) => after(['disabled']),
    cursor: ({ after }) => after(['disabled'])
  },
  plugins: []
};
