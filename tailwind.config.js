/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          deep: '#5c2a3a',
          mid: '#9a6070',
          light: '#b07090',
          softer: '#c0a0b0',
        },
        pink: {
          accent: '#c04488',
        }
      },
      boxShadow: {
        card: '0 20px 60px rgba(180, 70, 140, 0.18)',
        yes: '0 6px 22px rgba(200, 50, 120, 0.35)',
        no: '0 4px 16px rgba(140, 80, 180, 0.3)',
      },
      animation: {
        'float-up': 'floatUp 8s linear infinite',
        'confetti-fall': 'confettiFall 3.8s ease-in forwards',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'bounce-emoji': 'bounce 2s ease infinite',
        'pulse-btn': 'pulse 2.5s ease infinite',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) rotate(-5deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-110vh) rotate(20deg)', opacity: '0' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-30px) rotate(0deg)', opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(24px) scale(0.95)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}