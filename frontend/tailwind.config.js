/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
            floting: {
              "0%,100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(15px)" },
            },
            shadow: {
              "0%,100%": { transform: "scale(1,1)" },
              "50%": { transform: "scale(.85,.85)" },
            },
          },
      animation: {
        floting: "floting 2.5s infinite",
        shadow: "shadow 2.5s infinite",
      },
    },
  },
  plugins: [],
}
