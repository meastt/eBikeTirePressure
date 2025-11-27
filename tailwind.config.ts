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
        // Technical precision palette - inspired by laboratory instruments
        brand: {
          DEFAULT: '#0EA5E9', // Electric sky blue (precise, technical)
          hover: '#0284C7',
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        accent: {
          DEFAULT: '#F97316', // Technical copper/orange (instrument accents)
          hover: '#EA580C',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
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
        inner: 'inset 0 2px 4px rgba(15,23,42,.08)',
        card: '0 1px 3px 0 rgba(14, 165, 233, 0.06), 0 8px 16px -4px rgba(14, 165, 233, 0.1)',
        'card-hover': '0 12px 24px -6px rgba(14, 165, 233, 0.2), 0 0 0 1px rgba(14, 165, 233, 0.12)',
        hover: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 24px rgba(14, 165, 233, 0.5), 0 0 48px rgba(14, 165, 233, 0.25)',
        'glow-lg': '0 0 48px rgba(14, 165, 233, 0.6), 0 0 96px rgba(14, 165, 233, 0.35)',
        'glow-accent': '0 0 24px rgba(249, 115, 22, 0.5), 0 0 48px rgba(249, 115, 22, 0.25)',
        'elevated': '0 8px 16px -4px rgba(14, 165, 233, 0.12), 0 16px 32px -8px rgba(14, 165, 233, 0.18)',
        'tech': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(14, 165, 233, 0.1)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
      fontFamily: {
        display: ['"Orbitron"', 'monospace'], // Futuristic, technical display font
        heading: ['"Rajdhani"', 'sans-serif'], // Bold, geometric, technical headings
        body: ['"Red Hat Display"', 'sans-serif'], // Modern, readable body text
        mono: ['"JetBrains Mono"', 'monospace'], // Engineer-grade monospace for data/PSI
      },
      transitionDuration: {
        '150': '150ms',
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        'gauge-spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'pressure-fill': {
          'from': { strokeDashoffset: '100' },
          'to': { strokeDashoffset: '0' },
        },
        'slide-in-up': {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          'from': { transform: 'translateX(-20px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)' },
        },
      },
      animation: {
        'gauge-spin': 'gauge-spin 20s linear infinite',
        'pressure-fill': 'pressure-fill 1.5s ease-out forwards',
        'slide-in-up': 'slide-in-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(to bottom, #F8FAFC, #F1F5F9)',
        'gradient-hero': 'linear-gradient(135deg, #0C4A6E 0%, #0EA5E9 50%, #06B6D4 100%)',
        'gradient-brand': 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
        'gradient-brand-light': 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        'gradient-card': 'linear-gradient(to bottom right, #FFFFFF 0%, #F8FAFC 100%)',
        'gradient-card-elevated': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        'gradient-mesh': 'radial-gradient(ellipse at top left, rgba(14, 165, 233, 0.03) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(6, 182, 212, 0.03) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(249, 115, 22, 0.02) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(14, 165, 233, 0.02) 0%, transparent 50%)',
        'gradient-text': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        'gradient-pressure': 'linear-gradient(to right, #06B6D4 0%, #0EA5E9 50%, #F97316 100%)',
        'gradient-tech': 'linear-gradient(135deg, #0C4A6E 0%, #075985 25%, #0369A1 50%, #0284C7 75%, #0EA5E9 100%)',
        'gauge-radial': 'conic-gradient(from 180deg at 50% 50%, #06B6D4 0deg, #0EA5E9 120deg, #F97316 240deg, #EF4444 360deg)',
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
