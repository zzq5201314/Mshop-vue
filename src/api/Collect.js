/*
 * @Author: 清羽
 * @Date: 2022-09-24 13:40:24
 * @LastEditTime: 2022-09-25 09:39:03
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

// 添加收藏
export function addCollect (params, data) {
	return request({
		url: '/collect/add',
		method: 'post',
		params,
		data
	})
}

// 获取收藏列表
export function getCollectList (params) {
	return request({
		url: '/collect/list',
		method: 'post',
		params
	})
}

// 删除收藏
export function delCollect (data) {
	return request({
		url: '/collect/del',
		method: 'post',
		data
	})
}