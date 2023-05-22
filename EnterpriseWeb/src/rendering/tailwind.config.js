const acorp = require('./src/theme');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/helpers/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: acorp.base,
  plugins: [
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: acorp.themes[0],
      },
      themes: acorp.themes,
    }),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
};
