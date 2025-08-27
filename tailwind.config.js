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
        warning: {
          DEFAULT: '#FACC15',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          hover: {
            light: '#FEF9C3',  // yellow-100
            dark: '#422006'    // yellow-950 with opacity
          }
        },
        // Semantic Colors
        success: '#10B981',
        error: '#EF4444',
        // Background Colors
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#101828',
          card: {
            light: '#FFFFFF',
            dark: '#1E293B'
          },
          input: {
            light: '#FFFFFF',
            dark: '#1E293B'
          },
          icon: {
            light: '#F8FAFC',  // slate-50
            dark: '#1E293B'    // slate-800
          }
        },
        // FLATTENED SLIDER COLORS
        'background-slider-light': '#F1F5F9',   // slate-100
        'background-slider-dark': '#334155',    // slate-700
        'background-slider-track-light': '#CBD5E1',  // slate-300
        'background-slider-track-dark': '#475569',    // slate-600
        'background-slider-thumb-light': '#EAB308',   // warning-500
        'background-slider-thumb-dark': '#FACC15',    // warning-400
        // Text Colors
        content: {
          primary: {
            light: '#111827',    // gray-900
            dark: '#F9FAFB'      // gray-50
          },
          secondary: {
            light: '#374151',    // gray-700
            dark: '#E5E7EB'      // gray-200
          },
          tertiary: {
            light: '#6B7280',    // gray-500
            dark: '#9CA3AF'      // gray-400
          }
        },
        // Border Colors
        border: {
          light: '#E2E8F0',     // slate-200
          dark: '#334155'        // slate-700
        },
        // Surface Colors
        surface: {
          1: '#FFFFFF',
          2: '#F9FAFB',
          3: '#F3F4F6'
        },
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        text: {
          primary: '#18181B',
          secondary: '#3F3F46',
          muted: '#71717A',
          inverted: '#FFFFFF'
        },
        'game-matched-bg': 'var(--game-matched-bg)',
        'game-matched-border': 'var(--game-matched-border)',
        'game-wrong-bg': 'var(--game-wrong-bg)',
        'game-wrong-border': 'var(--game-wrong-border)',
        'game-selected-bg': 'var(--game-selected-bg)',
        'game-selected-border': 'var(--game-selected-border)',
        'info-bg': 'var(--info-bg)',
        'info-border': 'var(--info-border)',
        'subtle-bg': 'var(--subtle-bg)',
        'subtle-border': 'var(--subtle-border)'
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