module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' // add this line
  ],
  theme: { extend: { keyframes: { scroll: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' },  }, }, animation: { scroll: 'scroll 20s linear infinite', }, }, },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin') // add Flowbite plugin
  ],
}