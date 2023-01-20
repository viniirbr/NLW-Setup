/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090A"
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))'
      },
      minWidth: {
        popover: '320px'
      }
    },
  },
  plugins: [],
}
