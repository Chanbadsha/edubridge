import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textLight: "#051a0f",
        backgroundLight: "#f6fdf9",
        primaryLight: "#3cda85",
        secondaryLight: "#d08be9",
        accentLight: "#e368aa",

        textBlack: "#e5faef",
        backgroundBlack: "#020805",
        primaryBlack: "#25c16e",
        secondaryBlack: "#5b1674",
        accentBlack: "#971c5d",
      },
    },
  },
  plugins: [daisyui],
};
