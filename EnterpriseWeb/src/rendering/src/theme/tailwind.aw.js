/** @type {import('tailwindcss').Config} */

module.exports = {
  name: 'aw',
  extend: {
    fontSize: {
      // Desktop font sizes
      xxl: ['7.5rem', '100%'],
      xl: ['3.5rem', '100%'],
      l: ['3rem', '125%'], //48px 60px
      m: ['2.25rem', '125%'], //36px 45px
      s: ['1.5rem', '124%'], //24px 30px
      xs: ['1.125rem', '100%'],
      xxs: ['0.875rem', '120%'],
      body: ['0.875rem', '157%'], //14px 22px
      button: ['1rem', '1.125rem'], //16px 18px
      'text-link': ['1rem', '1.125rem'], //16px 18px
      caption: ['1rem', '0.875rem'],
      small: ['0.75rem', '130%'],
      legal: ['0.75rem', '130%'],
      base: ['1rem', '1.125rem'],

      // Mobile font sizes
      'sm-xxl': ['5rem', '100%'],
      'sm-xl': ['2.25rem', '100%'],
      'sm-l': ['1.875rem', '100%'],
      'sm-m': ['1.5rem', '100%'],
      'sm-s': ['1.25rem', '125%'],
      'sm-xs': ['1rem', '100%'],
      'sm-xxs': ['0.875rem', '120%'],
    },
    colors: {
      'light-gray': '#F8F6F4',
      'dark-gray': '#686869',
      gray: '#C4BFB6',
      primary: '#F26924',
      darkprimary: '#CB4C0C',
      secondary: '#000000',
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
    },
    fontWeight: {
      demi: '500',
      heavy: '600',
      bold: '700',
      medium: '450',
      regular: '400',
      light: '300',
      extralight: '200',
    },
    borderRadius: {
      none: '0',
      lg: '4.0625rem',
    },
    fontFamily: {
      sans: ['futura-pt', 'system-ui'],
      serif: ['open-sans', 'system-ui'],
    },
    extend: {
      gap: {
        s: '1rem',
      },
    },
  },
};
