/*
 * @Author: 清羽
 * @Date: 2022-10-07 18:05:58
 * @LastEditTime: 2022-10-07 18:58:29
 * @LastEditors: you name
 * @Description: 订单api
 */
import request from '@/utils/request'

// 创建订单
export function buyOrder (data) {
	return request({
		url: `/order/buy`,
		method: 'post',
		data
	})
}

// 获取订单列表
export function getOrderList () {
	return request({
		url: `/order/list`,
		method: 'get'
	})
}