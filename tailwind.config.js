/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: "#c0ca33",
        oliveDark: "#0B8346",
      },
      animation: {
        "fade-in-top":
          "fade-in-top 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-in":
          "fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
      },
      keyframes: {
        "fade-in-top": {
          "0%": {
            transform: "translateY(-20px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
