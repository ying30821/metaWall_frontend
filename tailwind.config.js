/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#03438D',
        secondary: '#EEC32A',
        dark: '#000400',
        light: '#efece7',
      },
      backgroundImage: {
        login: "url('./src/assets/images/login.svg')",
      },
    },
    fontFamily: {
      'paytone-one': ['"Paytone One"', 'sans-serif'],
      'azeret-mono': [
        '"Azeret Mono"',
        'Noto Sans TC Variable',
        'PingFang TC',
        'Roboto',
        'Arial',
        'serif',
      ],
    },
  },
  plugins: [],
};
