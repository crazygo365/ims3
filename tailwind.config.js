/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(blue|green|red|yellow|purple|orange|gray)-(100|500|600|900)/,
    },
  ],
};