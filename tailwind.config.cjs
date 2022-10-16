/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colora: '#0D1B2A',
        colorb: '#142133',
        colorc: '#1B263B',
        colord: '#415A77',
        colore: '#778DA9',
        colorf: '#E0E1DD',
        colorg: '#E0E0E0',
        skniblue: '#007AAD',
        colorr: '#c3d8fa',
      },
      boxShadow: {
        'pathcard':'2px 2px 16px 1px rgba(0, 0, 0, 0.25)',
      },
      spacing: {
        '30': '30%',
      }
    },
  },
  plugins: [],
}
