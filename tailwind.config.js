/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Resistance Theme Colors
        'resistance': '#10b981',
        'resistance-light': '#34d399',
        'resistance-dark': '#059669',
        
        // Digital Blue
        'digital': '#3b82f6',
        'digital-light': '#60a5fa',
        'digital-dark': '#2563eb',
        
        // Responsibility Orange
        'responsibility': '#f59e0b',
        'responsibility-light': '#fbbf24',
        'responsibility-dark': '#d97706',
        
        // Dark Backgrounds
        'dark-1': '#020617',
        'dark-2': '#0f172a',
        'dark-3': '#1e293b',
        'dark-4': '#334155',
        
        // Text Colors
        'text-primary': '#f8fafc',
        'text-secondary': '#cbd5e1',
        'text-muted': '#94a3b8',
        
        // Semantic Colors
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
        'info': '#3b82f6',
        
        // Legacy (for compatibility)
        'game-green': '#10b981',
        'game-yellow': '#f59e0b',
        'game-red': '#ef4444',
        'game-dark': '#0f172a',
        'game-darker': '#020617',
        
        // Mario Theme Colors
        'mario-sky': '#5c94fc',
        'mario-ground': '#c84c0c',
        'mario-pipe': '#00aa00',
        'mario-brick': '#b85c00',
        'mario-grass': '#00cc00',
        'mario-cloud': '#ffffff',
        
        // 8-bit Pixel Art Palette
        'pixel-sky': '#40A0FF',
        'pixel-sun': '#FFFF00',
        'pixel-cloud': '#FFFFFF',
        'pixel-ground': '#A85800',
        'pixel-grass': '#50D010',
        'pixel-pipe': '#808080',
        'pixel-locker': '#4040C8',
        'pixel-char-red': '#FF0000',
        'pixel-char-blue': '#4040FF',
        'pixel-char-skin': '#FFC080',
        'pixel-bookshelf': '#783C08',
        'pixel-desk': '#A07840',
        'pixel-screen-off': '#181818',
        'pixel-screen-blue': '#0000A0',
        'pixel-building-purple': '#8040A0',
        'pixel-building-orange': '#E08040',
        'pixel-building-green': '#A0D080',
        'pixel-outline': '#000000',
      },
      backgroundImage: {
        'gradient-resistance': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-digital': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'gradient-dark': 'linear-gradient(135deg, #020617 0%, #1e293b 50%, #020617 100%)',
        'gradient-sky': 'linear-gradient(to bottom, #4a90e2 0%, #87CEEB 30%, #a8d5e2 60%, #c8e6f0 100%)',
        'gradient-mario-sky': 'linear-gradient(to bottom, #5c94fc 0%, #5c94fc 100%)',
      },
    },
  },
  plugins: [],
}
