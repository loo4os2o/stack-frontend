/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        background: "var(--background-color)",
        text: "var(--text-color)",
        "light-gray": "var(--light-gray)",
        "medium-gray": "var(--medium-gray)",
        "dark-gray": "var(--dark-gray)",
      },
    },
  },
  plugins: [],
}; 