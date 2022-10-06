/*
 * @Author: 清羽
 * @Date: 2022-09-09 08:06:07
 * @LastEditTime: 2022-09-09 09:18:19
 * @LastEditors: you name
 * @Description: 
 */
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {}
//   }
// }

module.exports = {
  plugins: {
    tailwindcss: { config: './tailwind.config.js' },
    autoprefixer: { config: require('autoprefixer') }
  }
}
