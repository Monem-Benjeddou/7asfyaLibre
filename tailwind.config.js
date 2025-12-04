/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-green': '#10b981',
        'game-yellow': '#f59e0b',
        'game-red': '#ef4444',
        'game-dark': '#0f172a',
        'game-darker': '#020617',
      },
    },
  },
  plugins: [],
}

