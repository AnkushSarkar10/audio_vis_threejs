/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      rotate: {
        '270': '270deg',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes:  [
      {
        mytheme: {
          primary: "#ffffff",
          secondary: "#ffffff",
          accent: "#ffffff",
          neutral: "#ffffff",
          "base-100": "#000000",
        },
      }
    ],
  }
}
