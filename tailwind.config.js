/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1024px',
        '2xl': '1024px',
      },
    },
    extend: {
      colors: {
        'luxury': {
          50: '#f8f7ff',
          100: '#e4e1fc',
          200: '#cdc7f8',
          300: '#b1a7f2',
          400: '#9485ea',
          500: '#7561e0',
          600: '#5e43d8',
          700: '#4f31c7',
          800: '#4127a5',
          900: '#362085',
        }
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#4f31c7",
          "primary-focus": "#362085",
          "primary-content": "#ffffff",
        },
      },
      "dark",
      "night",
    ],
  },
}
