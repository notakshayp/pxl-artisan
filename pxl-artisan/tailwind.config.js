/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: { 
        text: "var(--text)", 
        background: "var(--background)", 
        primary: "var(--primary)", 
        secondary: "var(--secondary)", 
        accent: "var(--accent)",
      }
    },
  },
  plugins: [],
}

