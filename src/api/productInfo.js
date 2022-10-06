/*
 * @Author: 清羽
 * @Date: 2022-09-14 12:26:56
 * @LastEditTime: 2022-09-18 21:57:37
 * @LastEditors: you name
 * @Description: 商品详情api
 */
import request from '@/utils/request'

// 获取商品详情
export function getProductInfo (productId) {
	return request({
		url: `/product/detail/${productId}`,
		method: 'get'
	})
}

// 获取商品规格
export function getProductSpecification (data) {
	return request({
		url: `/product/specification`,
		method: 'post',
		data
	})
}
