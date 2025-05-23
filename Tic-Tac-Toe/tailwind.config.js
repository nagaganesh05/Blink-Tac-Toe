/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '70%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-8px)' },
          '40%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-4px)' },
          '80%': { transform: 'translateY(0)' },
        },
        'fade-in-out': {
          '0%': { opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
        'bounce-once': 'bounce-once 1s ease-in-out',
        'fade-in-out': 'fade-in-out 3s forwards',
      },
    },
  },
  plugins: [],
}