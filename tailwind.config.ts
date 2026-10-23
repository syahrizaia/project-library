import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        cyanGlow: {
          400: '#38bdf8',
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      boxShadow: {
        'liquid-sm': '0 4px 16px -2px rgba(15, 23, 42, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
        'liquid': '0 16px 36px -10px rgba(15, 23, 42, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.85), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.03)',
        'liquid-lg': '0 24px 52px -12px rgba(15, 23, 42, 0.12), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.04)',
        'liquid-hover': '0 28px 60px -12px rgba(6, 182, 212, 0.22), inset 0 1.5px 2px 0 rgba(255, 255, 255, 1)',
        'liquid-button': '0 10px 25px -4px rgba(6, 182, 212, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.7)',
        'liquid-button-hover': '0 14px 32px -4px rgba(6, 182, 212, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.9)',
      },
      backdropBlur: {
        'liquid': '28px',
        'liquid-heavy': '40px',
      },
      animation: {
        'float-slow': 'floating 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
export default config