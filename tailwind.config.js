/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: "#D4AF37",
          'gold-light': "#C2A878",
          'gold-accent': "#E6D3A3",
          'gold-highlight': "#F1C40F",
          black: "#0B0B0B",
          'black-rich': "#1C1C1C",
          surface: "#141414",
          cream: "#F8F5F0",
          gray: "#2A2A2A",
          'gray-light': "#6B6B6B",
          'gray-muted': "#A1A1A1",
          border: "#2A2A2A",
          'border-light': "#E5E5E5",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 8px 30px rgba(0,0,0,0.1)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37, #F1C40F)',
      }
    },
  },
  plugins: [],
}
