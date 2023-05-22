/** @type {import('tailwindcss').Config} */

module.exports = {
  name: 'rba',
  extend: {
    fontSize: {
      xxl: ['3.5rem', '114%'],
      xl: ['3.5rem', '114%'],
      l: ['2rem', '125%'],
      m: ['1.5rem', '2rem'],
      s: ['1.25rem', '1.75rem'],
      xs: ['1rem', '1.25rem'],
      xxs: ['0.75rem', '1rem'],
      body: ['0.875rem', '157%'],
      'large-body': ['1.125rem', '133%'],
      button: ['0.875rem', '120%'], //14px 120%
      'text-link': ['0.875rem', '0.875rem'], //14px 14px
      small: ['0.75rem', '130%'],
      legal: ['0.625rem', '130%'],
      base: ['1rem', '1.125rem'],

      // Mobile font sizes
      'sm-xxl': ['2rem', '120%'],
      'sm-xl': ['2rem', '120%'],
      'sm-l': ['2rem', '120%'],
      'sm-m': ['1.5rem', '2rem'],
      'sm-s': ['1.25rem', '1.75rem'],
      'sm-xs': ['1rem', '1.25rem'],
      'sm-xxs': ['0.75rem', '1rem'],
    },
    colors: {
      'light-gray': '#F9F9F9',
      'dark-gray': '#54585A',
      gray: '#D2D1D0',
      primary: '#6CC14C',
      darkprimary: '#326222',
      secondary: '#000000',
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      'light-black': '#454545',
    },
    fontWeight: {
      bold: '700',
      heavy: '600',
      'semi-bold': '600',
      medium: '500',
      regular: '400',
      'extra-light': '300',
    },
    borderRadius: {
      none: '0',
      lg: '4.0625rem',
    },
    fontFamily: {
      sans: ['franklin-gothic-atf', 'system-ui'],
      serif: ['open-sans', 'system-ui'],
    },
  },
};
