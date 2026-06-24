/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7A1E1E",
        gold: "#D4AF37",
        cream: "#F9F6F1",
      },
      keyframes: {
        "premium-slide": {
          "0%": { transform: "translateX(-150%)" },
          "50%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(250%)" },
        },
      },
      animation: {
        "premium-slide":
          "premium-slide 2.2s cubic-bezier(0.65, 0.05, 0.36, 1) infinite",
      },
    },
  },
  plugins: [],
};
