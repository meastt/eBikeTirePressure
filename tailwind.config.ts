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
          DEFAULT: '#3B82F6', // Premium vibrant blue
          hover: '#2563EB',
          600: '#2563EB',
          700: '#1D4ED8',
          100: '#DBEAFE',
          50: '#EFF6FF',
        },
        accent: {
          DEFAULT: '#F97316', // Premium orange - energetic and modern
          hover: '#EA580C',
          50: '#FFF7ED',
          100: '#FFEDD5',
        },
        purple: {
          DEFAULT: '#8B5CF6', // Premium purple
          hover: '#7C3AED',
          50: '#F5F3FF',
          100: '#EDE9FE',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#F8FAFC',
          dark: '#F1F5F9',
          subtle: '#FAFBFC',
        },
        text: {
          DEFAULT: '#0F172A', // Deeper, richer black
          muted: '#64748B',
          light: '#94A3B8',
        },
        ok: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          dark: '#059669',
        },
        warn: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
          dark: '#DC2626',
        },
        line: '#E2E8F0',
      },
      boxShadow: {
        inner: 'inset 0 1px 2px rgba(15,23,42,.06)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        hover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
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
        'gradient-hero': 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        'gradient-brand': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        'gradient-card': 'linear-gradient(to bottom right, #FFFFFF, #F8FAFC)',
        'gradient-mesh': 'radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(249, 115, 22, 0.05) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.05) 0px, transparent 50%)',
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
