/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      colors: {
        'fantasy': {
          50: '#fefce8',
          500: '#eab308',
          900: '#713f12',
        },
        'sci-fi': {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
        'steampunk': {
          50: '#fef3c7',
          500: '#d97706',
          900: '#78350f',
        }
      }
    },
  },
  plugins: [],
}
