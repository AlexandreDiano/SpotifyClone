/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          gray: '#b3b3b3',
          green: '#1ED760',
          gradientStart: '#555858',
          gradientEnd: '#121212',
          card: '#1b1b1b',
        }
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
