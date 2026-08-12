/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0F0F10",
        surface: "#18181B",
        surfaceBorder: "#27272A",
        surfaceBorderHover: "#3F3F46",
        accentMuted: "#52525B",
        textLight: "#F4F4F5",
        textDim: "#A1A1AA",
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'glow': '0 0 25px rgba(255, 255, 255, 0.08)',
        'glow-accent': '0 0 30px rgba(82, 82, 91, 0.3)',
      }
    },
  },
  plugins: [],
}
