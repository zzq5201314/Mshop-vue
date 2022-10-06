/*
 * @Author: 清羽
 * @Date: 2022-09-28 18:45:54
 * @LastEditTime: 2022-10-02 13:53:13
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

// // 上传商家审核图片
// export function applyBusinessImg (data) {
// 	return request({
// 		url: '/business/apply',
// 		method: 'post',
// 		data
// 	})
// }

// 创建店铺名称
export function createBusiness (data) {
	return request({
		url: '/business/create',
		method: 'post',
		data
	})
}

// 补全店铺信息
export function applyBusiness (data) {
	return request({
		url: '/business/apply',
		method: 'post',
		data
	})
}

// 获取店铺详情
export function getMyBusiness () {
	return request({
		url: '/business',
		method: 'get'
	})
}

// 补全店铺信息--图片
export function applyBusinessImg (data) {
	return request({
		url: '/business/apply/img',
		method: 'post',
		data
	})
}

// 删除商家审核上传的图片
export function applyBusinessDelImg (data) {
	console.log("applyBusinessDelImg => data", data)
	return request({
		url: '/business/apply/img/delete',
		method: 'post',
		data
	})
}

// 提交店铺审核
export function applyUpload (data) {
	return request({
		url: '/business/apply/upload',
		method: 'post',
		data
	})
}

// 上架店铺
export function upShelfBusiness (businessId) {
	return request({
		url: `/business/upShelf`,
		method: 'post',
		data: businessId
	})
}