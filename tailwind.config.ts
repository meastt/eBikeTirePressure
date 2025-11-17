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
        // Modern dark-accent primary colors
        brand: {
          DEFAULT: '#6366F1', // Vibrant indigo
          hover: '#4F46E5',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        accent: {
          DEFAULT: '#EC4899', // Hot pink for energy
          hover: '#DB2777',
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
        },
        purple: {
          DEFAULT: '#A855F7', // Bright purple
          hover: '#9333EA',
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
        },
        cyan: {
          DEFAULT: '#06B6D4', // Electric cyan
          hover: '#0891B2',
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
        },
        // Surface colors - softer, more modern
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#FAFBFC',
          dark: '#F5F7FA',
          darker: '#EEF2F6',
          elevated: '#FFFFFF',
        },
        // Text with better contrast
        text: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          light: '#64748B',
          subtle: '#94A3B8',
        },
        // Pressure zones - cool to hot spectrum (intuitive)
        pressure: {
          low: '#06B6D4',      // Cool cyan = under-pressured
          lowMid: '#3B82F6',   // Blue
          optimal: '#6366F1',  // Indigo = just right
          highMid: '#A855F7',  // Purple
          high: '#EC4899',     // Hot pink = over-pressured
        },
        // Status colors - modern but clear
        ok: {
          DEFAULT: '#06B6D4',  // Cyan instead of green
          light: '#CFFAFE',
          dark: '#0891B2',
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
        },
        warn: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        danger: {
          DEFAULT: '#EC4899',  // Pink instead of red
          light: '#FCE7F3',
          dark: '#DB2777',
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
        },
        line: '#E2E8F0',
      },
      boxShadow: {
        inner: 'inset 0 1px 2px rgba(15,23,42,.06)',
        card: '0 1px 3px 0 rgba(99, 102, 241, 0.05), 0 8px 16px -4px rgba(99, 102, 241, 0.08)',
        'card-hover': '0 12px 24px -6px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.1)',
        hover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 24px rgba(99, 102, 241, 0.4), 0 0 48px rgba(99, 102, 241, 0.2)',
        'glow-lg': '0 0 48px rgba(99, 102, 241, 0.5), 0 0 96px rgba(99, 102, 241, 0.3)',
        'glow-accent': '0 0 24px rgba(236, 72, 153, 0.4), 0 0 48px rgba(236, 72, 153, 0.2)',
        'elevated': '0 8px 16px -4px rgba(99, 102, 241, 0.1), 0 16px 32px -8px rgba(99, 102, 241, 0.15)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
      fontFamily: {
        heading: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        body: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      transitionDuration: {
        '150': '150ms',
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(to bottom, #FAFBFC, #F5F7FA)',
        'gradient-hero': 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)',
        'gradient-brand': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        'gradient-brand-light': 'linear-gradient(135deg, #818CF8 0%, #6366F1 100%)',
        'gradient-accent': 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
        'gradient-purple': 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        'gradient-card': 'linear-gradient(to bottom right, #FFFFFF 0%, #FAFBFC 100%)',
        'gradient-card-elevated': 'linear-gradient(135deg, #FFFFFF 0%, #FAFBFC 50%, #FFFFFF 100%)',
        'gradient-mesh': 'radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.02) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(168, 85, 247, 0.02) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.02) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(6, 182, 212, 0.02) 0%, transparent 50%)',
        'gradient-text': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        'gradient-pressure': 'linear-gradient(to right, #06B6D4 0%, #6366F1 50%, #EC4899 100%)',
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
