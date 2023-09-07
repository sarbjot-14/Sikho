/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#056280',
        secondary: '#9AA68C',
        accent: '#A1EEE5',
        offwhite: '#FAF9F6',
      },
      fontFamily: {
        raleway: "'Raleway', serif",
        dm: "'DM Mono', monospace",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        h1: {
          fontSize: config('theme.fontSize.3xl'),
          fontFamily: 'raleway',
        },
        h2: { fontSize: config('theme.fontSize.2xl'), fontFamily: 'raleway' },
        h3: { fontSize: config('theme.fontSize.xl'), fontFamily: 'raleway' },
      });
    }),
  ],
};
