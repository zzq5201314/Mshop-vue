/*
 * @Author: 清羽
 * @Date: 2022-09-15 15:06:38
 * @LastEditTime: 2022-09-15 15:13:26
 * @LastEditors: you name
 * @Description: 注册api模块
 */
import request from '@/utils/request'

export function register (data) {
	return request({
		url: `/register`,
		method: 'post',
		data
	})
}