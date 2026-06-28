/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: '#132C1F',
          'forest-light': '#1A3C2A',
          cream: '#FAF7F2',
          'cream-dark': '#F0EDE6',
          orange: '#F97316',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        logo: ['Cinzel', 'serif'],
      }
    },
  },
  plugins: [],
}
