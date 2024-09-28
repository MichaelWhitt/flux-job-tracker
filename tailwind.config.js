/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg1: '#020617', // header and footer
        bg2: '#0a0d25', // main app bg color
        bg3: '#141c33', // sub sections
        bg4: '#1f2b41', 
        bg5: '#002e36', // darkest teal
        bg6: '#00474d', // 10% lighter than bg5
        bg7: '#005e66', // 10% lighter than bg6
        bg8: '#007582', // 10% lighter than bg7
        bg9: '#0092a3', // accent color 2, 10% lighter than bg8
        bg10: '#00a9b4', // accent color, 10% lighter than bg9

        text1: '#E0E0E0', // primary main text
        text2: '#B0B0B0', // secondary text

        btn1: '#6a0dad', // primary btn color
        btn2: '#550889', // 20% darker
        btn3: '#6642c1', // 20% lighter
        btnflip: '#00a9b4',

        linkColor: '#4D9FFF', // Light blue for links

        vibrantBlue: {
          DEFAULT: '#1E90FF', // Normal shade
          dark: '#0056A0',    // 40% darker
        },
        electricGreen: {
          DEFAULT: '#00FF00', // Normal shade
          dark: '#009900',    // 40% darker
        },
        radiantRed: {
          DEFAULT: '#FF0000', // Normal shade
          dark: '#B20000',    // 40% darker
        },
        royalPurple: {
          DEFAULT: '#800080', // Normal shade
          dark: '#4D004D',    // 40% darker
        },
        cosmicPink: {
          DEFAULT: '#FF1493', // Normal shade
          dark: '#990F6D',    // 40% darker
        },
        sunsetOrange: {
          DEFAULT: '#FF6347', // Normal shade
          dark: '#CC3F2E',    // 40% darker
        },
        mellowYellow: {
          DEFAULT: '#FFFF00', // Normal shade
          dark: '#CCCC00',    // 40% darker
        },
        charcoalGray: {
          DEFAULT: '#36454F', // Normal shade
          dark: '#1F2A30',    // 40% darker
        },
        midnightBlack: {
          DEFAULT: '#0D0D0D', // Dark shade
          dark: '#000000',    // Pure black (no 40% darker option needed)
        },
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif']
      },
      keyframes: {
        swirl: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
      animation: {
        'gradient-swirl': 'swirl 8s linear infinite', // Adjust duration as needed
      },
      backgroundSize: {
        '400%': '400%',
      },
    },
  },
  plugins: [],
}