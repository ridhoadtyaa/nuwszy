/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    extend: {
      colors: {
        primary: '#232E52'
      },
      fontFamily: {
        primary: ["'Graphik'", ...fontFamily.sans]
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')]
}
