/*
 * @Author: 清羽
 * @Date: 2022-09-09 08:06:07
 * @LastEditTime: 2022-11-04 15:39:38
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

    // "postcss-px-to-viewport": {
    //   unitToConvert: "px", // 要转化的单位
    //   viewportWidth: 750, // UI设计稿的宽度
    //   unitPrecision: 6, // 转换后的精度，即小数点位数
    //   propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    //   viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
    //   fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
    //   selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
    //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
    //   replace: true, // 是否转换后直接更换属性值
    //   exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    //   include: /Test.vue/,    //如果设置了include，那将只有匹配到的文件才会被转换
    //   landscape: false, // 是否处理横屏情况
    //   landscapeUnit: 'vw',    //横屏时使用的单位
    //   landscapeWidth: 568     //横屏时使用的视口宽度
    // }
  }

}
