/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins']
      },
      colors: {
        primary: '#706fd3',
        secondary: '#d1ccc0',
        success: '#33d9b2',
        info: '#34ace0',
        warning: '#ffb142',
        danger: '#ff5252',

        theme: {
          bg: {
            white: '#f5f5f5',
            dark: '#0f172a'
          },
          cardBg: {
            white: '#fff',
            dark: '#1e293b'
          },
          text: {
            white: {
              100: '#0f172a',
              200: '#64748b'
            },
            dark: {
              100: '#d4d4d8',
              200: '#94a3b8'
            }
          },
          border: {
            white: '#cbd5e1',
            dark: '#475569'
          }
        }
      },
      container: {
        center: true
      },
      fontSize: {
        xxs: ['0.65rem', '0.85rem']
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        fadeInRight: {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        },
        fadeInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        },
        zoomIn: {
          '0%': { opacity: 0, transform: 'scale(0.5)' },
          '50%': { opacity: 1, transform: 'scale(1.25)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        }
      },
      transitionProperty: {
        outline: 'outline-color',
        bgColor: 'background-color'
      },
      animation: {
        fadeInUp: 'fadeInUp .5s both .5s'
      },
      boxShadow: {
        card: '0px 3px 20px #0000000b;',
        FPW:'1px 0 0 #cbd5e1,-1px 0 0 #cbd5e1,0 1px 0 #cbd5e1,0 -1px 0 #cbd5e1,0 3px 13px rgba(0,0,0,0.08)',
        FPD:'1px 0 0 #475569 ,-1px 0 0 #475569 ,0 1px 0 #475569 ,0 -1px 0 #475569 ,0 3px 13px rgba(0,0,0,0.08)',
      }
    },

    debugScreens: {
      position: ['bottom', 'left']
    }
  },
  plugins: [require('tailwindcss-debug-screens')]
}
