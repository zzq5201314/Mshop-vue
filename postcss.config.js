/*
 * @Author: 清羽
 * @Date: 2022-09-09 08:06:07
 * @LastEditTime: 2022-10-31 21:58:57
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
    autoprefixer: { config: require('autoprefixer') },
    // flexible配置
    // "postcss-pxtorem": {
    //   "rootValue": 10000, // 设计稿宽度的1/10
    //   "propList": ["*"] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    // }
  }

}
