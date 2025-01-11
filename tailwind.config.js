// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Add custom animations for form labels
      keyframes: {
        'label-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-1.5rem)' },
        }
      },
      animation: {
        'label-up': 'label-up 0.2s ease-out forwards',
      }
    },
  },
  plugins: [],
}