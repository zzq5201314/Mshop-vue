/*
 * @Author: 清羽
 * @Date: 2022-09-26 22:35:15
 * @LastEditTime: 2022-09-28 10:24:03
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

// 添加收获地址
export function addAddress (data) {
	console.log("addAddress => data", data)
	return request({
		url: '/address/add',
		method: 'post',
		data
	})
}

// 获取收获地址列表
export function getAddressList () {
	return request({
		url: '/address/list',
		method: 'post'
	})
}

// 修改收获地址信息
export function updateAddress (data) {
	return request({
		url: '/address/update',
		method: 'post',
		data
	})
}

// 删除收获地址
export function delAddress (data) {
	return request({
		url: '/address/del',
		method: 'post',
		data
	})
}