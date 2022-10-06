/*
 * @Author: 清羽
 * @Date: 2022-09-10 15:29:54
 * @LastEditTime: 2022-09-14 16:17:58
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

// 获取商品分类
export function getCategory () {
	return request({
		url: `/category`,
		method: 'get'
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