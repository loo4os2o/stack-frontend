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
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.25rem',
        lg: '1.25rem',
        xl: '1.25rem',
        '2xl': '0rem',
      },
      screens: {
        sm: '100%',
        md: '960px',
        lg: '1064px',
        xl: '1240px',
        '2xl': '1240px',
      },
    },
  },
  plugins: [],
}; 