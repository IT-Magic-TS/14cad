module.exports = {
  content: ['./*.html'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1020px',
      xl: '1440px',
      xxl: '1740px'
    },
    extend: {
      colors: {
        softBlue: 'hsl(231, 69%, 60%)',
        softRed: 'hsl(0, 94%, 66%)',
        grayishBlue: 'hsl(229, 8%, 60%)',
        veryDarkBlue: 'hsl(229, 31%, 21%)',
        darkBlue: 'hsl(217, 28%, 15%)',
        darkBlue1: 'hsl(218, 28%, 13%)',
        darkBlue2: 'hsl(216, 53%, 9%)',
        darkBlue3: 'hsl(219, 30%, 18%)',
        accentCyan: 'hsl(176, 68%, 64%)',
        accentBlue: 'hsl(198, 60%, 50%)',
        lightRed: 'hsl(0, 100%, 63%)',
        brown300: '#8A7863'
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
        sans2: ['Mulish', 'sans-serif'],
        mono: ['Rokkitt', 'monospace'],
        sans3: ['Raleway', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite'
      },
      backgroundImage: (theme) => ({
        'logo-dark-mode': "url('../images/fylo/logo-dark-mode.svg')",
        'logo-light-mode': "url('../images/fylo/logo-light-mode.svg')",
        'curvy-dark-mode': "url('../images/fylo/bg-curvy-dark-mode.svg')",
        'curvy-light-mode': "url('../images/fylo/bg-curvy-light-mode.svg')",
        'dots': "url('../images/bg-dots-2.gif')"
      }),
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark']
    }
  },
  plugins: [],
}
