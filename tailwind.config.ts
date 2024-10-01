import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['selector', '[data-theme=dark]'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    transitionDuration: {
      DEFAULT: '200ms',
    },
    extend: {
      screens: {
        '3xl': '2000px',
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          text: 'rgb(var(--text-primary) / <alpha-value>)',
          fade: 'var(--fade-primary)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          text: 'var(--text-secondary)',
          fade: 'var(--fade-secondary)',
        },
        tertiary: {
          DEFAULT: 'rgb(var(--tertiary) / <alpha-value>)',
          text: 'var(--text-tertiary)',
        },
        quaternary: {
          text: 'var(--text-quaternary)',
        },
        textShadow: {
          DEFAULT: 'var(--text-shadow)',
        },
        success: {
          DEFAULT: 'rgb(var(--success) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
