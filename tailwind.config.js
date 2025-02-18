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
        primary: "#1E40AF",
        secondary: "#9333EA", 
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
