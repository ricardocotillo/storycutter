module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      scale: {
        '4': '4'
      },
      height: {
        'screen-1/2': '50vh'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
