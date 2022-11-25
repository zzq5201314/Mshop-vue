/*
 * @Author: 清羽
 * @Date: 2022-10-03 16:47:18
 * @LastEditTime: 2022-11-23 20:51:51
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

// 获取店铺轮播图
export function getBusinessSlideshow (businessId) {
	return request({
		url: `/business/slideshow`,
		method: 'get',
		params: { businessId }
	})
}

// 获取店铺主页推荐分类
export function getBusinessRecommendCategoryList (businessId) {
	return request({
		url: `/business/category/show`,
		method: 'get',
		params: { businessId }
	})
}

// 获取店铺分类列表
export function getBusinessCategoryList (businessId) {
	return request({
		url: `/business/categories`,
		method: 'get',
		params: { businessId }
	})
}

// 获取店铺信息
export function getBusinessInfo (businessId) {
	return request({
		url: `/business/info`,
		method: 'get',
		params: { businessId }
	})
}

export function getBusinessCategory (businessId, categoryId) {
	return request({
		url: `/business/category`,
		method: 'get',
		params: { businessId, categoryId }
	})
}