/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // animation
      keyframes: {
        "spinner-rotate": {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
      },
      animation: {
        "spinner-rotate": "spinner-rotate 2s ease-out infinite",
      },

      // main-color
      colors: {
        "main-50": "#f0fdfa",
        "main-100": "#ccfbf1",
        "main-200": "#99f6e4",
        "main-300": "#5eead4",
        "main-400": "#2dd4bf",
        "main-500": "#14b8a6",
        "main-600": "#0d9488",
        "main-700": "#0f766e",
        "main-800": "#115e59",
        "main-900": "#134e4a",
      },

      // media query
      screens: {
        xs: "400px",
        xsm: "500px",
        "4xl": "2000px",
      },
    },
    fontFamily: {
      nanumGothic: ["Nanum Gothic", "sans-serif"],
      jua: ["Jua", "sans-serif"],
    },
  },
  plugins: [],
};
