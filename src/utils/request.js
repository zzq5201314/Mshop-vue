/*
 * @Author: 清羽
 * @Date: 2022-09-09 16:51:25
 * @LastEditTime: 2022-09-16 16:42:15
 * @LastEditors: you name
 * @Description: 
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000 // request timeout
})

// 请求 拦截器
service.interceptors.request.use(
	config => {
		// do something before request is sent

		if (store.getters.token) {
			// let each request carry token
			// ['X-Token'] is a custom headers key
			// please modify it according to the actual situation
			// config.headers['X-Token'] = getToken()
		}
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// 响应 拦截器
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	*/

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	response => {
		const res = response
		return res
	},
	error => {
		// console.log('err' + error) // for debug
		console.log("error.response", error)
		if (error.response !== undefined) {
			const validateErr = error.response.data.errors // validate 验证是否审核失败
			const err = error.response.data.msg
			if (validateErr) {
				Message({
					message: validateErr[0].msg,
					type: 'error',
					duration: 5 * 1000
				})
			}
			else if (err) {
				Message({
					message: error.response.data.msg,
					type: 'error',
					duration: 5 * 1000
				})
			}
			else {
				Message({
					message: error.message,
					type: 'error',
					duration: 5 * 1000
				})
			}
			return Promise.reject(error)
		}
	}
)

export default service