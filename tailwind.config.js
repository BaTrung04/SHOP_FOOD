/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c084fc",
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
      },
      container: {
        center: "true",
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "10rem",
        },
      },
      boxShadow: {
        right: "6px 0 10px -2px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        lg: "800px", // Thêm breakpoint mới cho 670px
      },
    },
  },
  plugins: [require("daisyui")],
};
