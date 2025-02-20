/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/primereact/**/*.{js,ts,jsx,tsx}", // Include PrimeReact components

  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#058271", 
      },
      fontSize: {
        heading: "2rem",
        subheading: "1.5rem",
      },
      fontWeight: {
        heading: "700",
        subheading: "600",
      },
    },
  },
  plugins: [],
};
