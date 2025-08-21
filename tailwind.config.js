/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      spacing: {
        "header-height": "var(--header-height)",
      },
      height: {
        "header-height": "var(--header-height)",
      },
      colors: {
        "header-bg": "var(--header-bg)",
        "icon-color": "var(--icon-color)",
      },
    },
  },
};
