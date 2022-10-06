/*
 * @Author: 清羽
 * @Date: 2022-09-15 16:14:24
 * @LastEditTime: 2022-09-15 16:15:09
 * @LastEditors: you name
 * @Description: 登录api模块
 */
import request from '@/utils/request'

export function login (data) {
	return request({
		url: '/login',
		method: 'post',
		data
	})
}