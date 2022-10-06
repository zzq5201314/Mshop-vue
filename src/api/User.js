/*
 * @Author: 清羽
 * @Date: 2022-09-15 20:07:21
 * @LastEditTime: 2022-09-28 15:03:06
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

// 获取用户详情
export function getUserInfo () {
	return request({
		url: '/user/info',
		method: 'get',
	})
}

// 退出登录
export function logout () {
	return request({
		url: `/user/logout`,
		method: 'post'
	})
}

// 申请商家
export function applyBusiness () {
	return request({
		url: ``,
		method: 'post'
	})
}