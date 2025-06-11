/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#2DD4BF',
          light: '#5EEAD4',
          dark: '#14B8A6'
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#7C3AED'
        },
        accent: {
          DEFAULT: '#F43F5E',
          light: '#FB7185',
          dark: '#E11D48'
        },
        // Semantic Colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        // Background Colors
        background: {
          DEFAULT: '#101828',
          subtle: '#F4F4F5',
          muted: '#E4E4E7'
        },
        // Surface Colors
        surface: {
          1: '#FFFFFF',
          2: '#F9FAFB',
          3: '#F3F4F6'
        },
        // Text Colors
        text: {
          primary: '#18181B',
          secondary: '#3F3F46',
          muted: '#71717A',
          inverted: '#FFFFFF'
        },
        // Border Colors
        border: {
          subtle: '#E4E4E7',
          muted: '#D4D4D8',
          strong: '#A1A1AA'
        }
      },
      boxShadow: {
        sm: '0 1px 2px rgba(24, 24, 27, 0.05)',
        md: '0 4px 6px rgba(24, 24, 27, 0.05), 0 2px 4px rgba(24, 24, 27, 0.05)',
        lg: '0 10px 15px rgba(24, 24, 27, 0.05), 0 4px 6px rgba(24, 24, 27, 0.05)'
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.5rem',
        '6': '2rem',
        '8': '3rem',
        '10': '4rem'
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      }
    }
  },
  plugins: []
} 