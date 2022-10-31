/*
 * @Author: 清羽
 * @Date: 2022-09-09 09:17:30
 * @LastEditTime: 2022-10-31 16:34:10
 * @LastEditors: you name
 * @Description: 
 */
// /tailwind.config.js

module.exports = {
  // Tailwind CSS 3.0版本开始, 不再使用purgeCSS进行打包优化. 使用`content`配置项代替原`purge`配置项.
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
    maxWidth: {
      '20': '5rem',
    },
    // height: {
    //   addressItemHeight: '135px'
    // }
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ".el-button": {
          "background-color": "var(--el-button-bg-color,val(--el-color-white))"
        }
      })
    }
  ],
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      appearance: ['hover', 'focus'],
      display: ['group-hover'],
      borderStyle: ['last'],
      borderWidth: ['last'],
    }
  },
  // 配置前缀, 防止类名与其他UI框架冲突
  // prefix: 'el-'
}
