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
    },
    fontFamily: {
      nanumGothic: ["Nanum Gothic", "sans-serif"],
      jua: ["Jua", "sans-serif"],
    },
  },
  plugins: [],
};
