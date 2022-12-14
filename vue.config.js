/*
 * @Author: 清羽
 * @Date: 2022-09-09 16:56:51
 * @LastEditTime: 2022-09-25 09:58:41
 * @LastEditors: you name
 * @Description: 
 */
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve (dir) {
	return path.join(__dirname, dir)
}


const name = defaultSettings.title || 'vue' // page title

const port = process.env.port || process.env.npm_config_port || 8888 // dev port
// 这里的webpack配置会和公共的webpack.config.js进行合并
module.exports = {
	// NODE_ENV：Node.js 暴露给执行脚本的系统环境变量。通常用于确定在开发环境还是生产环境
	publicPath: '/',
	outputDir: 'dist', // 输出文件目录
	assetsDir: 'static', // 放置静态资源
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
	devServer: {
		port: port,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: process.env.BACKGROUND_APPLICATION_URL,
				changeOrigin: true, // 是否跨域
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_API]: ''
				}
			}
		},
	},
	configureWebpack: {
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		}
	},
}