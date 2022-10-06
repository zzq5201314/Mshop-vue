/*
 * @Author: 清羽
 * @Date: 2022-10-03 16:47:18
 * @LastEditTime: 2022-10-05 14:42:35
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

// 获取店铺主页分类
export function getBusinessCategoryList (businessId) {
	return request({
		url: `/business/category/show`,
		method: 'get',
		params: { businessId }
	})
}