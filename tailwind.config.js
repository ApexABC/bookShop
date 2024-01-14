/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  // plugins: [require('@tailwindcss/line-clamp')], // 3.3之后默认有
  corePlugins: {
    preflight: false // 添加这一行
  }
}
