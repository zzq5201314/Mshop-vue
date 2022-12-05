/*
 * @Author: 清羽
 * @Date: 2022-09-10 15:29:54
 * @LastEditTime: 2022-12-05 17:55:02
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

// 获取商品分类
export function getCategory (params) {
	if (params) {

		const { categoryId, categoryName } = params
		console.log("getCategory => categoryName", categoryName)
		console.log("getCategory => categoryId", categoryId)
	}
	console.log("getCategory => params", params)

	return request({
		url: `/category`,
		method: 'get',
		params
	})
}

// 获取热门推荐商品列表
export function getProductRecommendList () {
	return request({
		url: `/product/recommend/list`,
		method: 'get'
	})
}

// 获取商品列表
export function getProductList () {
	return request({
		url: `/products`,
		method: 'get'
	})
}

// 搜索
export function search (data) {
	return request({
		url: `/search`,
		method: 'post',
		params: data
	})
}