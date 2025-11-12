import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1A365D', // Darker navy - mechanic-grade
          hover: '#2C5282',
          600: '#2C5282',
          100: '#EBF4FF',
        },
        accent: {
          DEFAULT: '#FF6B35', // Safety orange - industrial
          hover: '#E85A2A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#F8FAFC',
          dark: '#E5E9F0',
        },
        text: {
          DEFAULT: '#1E293B',
          muted: '#64748B',
        },
        ok: '#16A34A',
        warn: '#F59E0B',
        danger: '#DC2626',
        line: '#E2E8F0',
      },
      boxShadow: {
        inner: 'inset 0 1px 2px rgba(15,23,42,.06)',
        card: '0 8px 24px rgba(15,23,42,0.06)',
        hover: '0 10px 30px rgba(15,23,42,0.10)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '150': '150ms',
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(to bottom, #FFFFFF, #F8FAFC)',
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '52px' }],
      },
    },
  },
  plugins: [],
};

export default config;
