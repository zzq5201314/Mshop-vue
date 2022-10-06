import request from '@/utils/request'

// 获取购物车列表
export function getShoppingCartList () {
	return request({
		url: '/shoppingCart/list',
		method: 'post'
	})
}

// 添加购物车
export function addShoppingCart (data) {
	console.log("addShoppingCart => data", data)
	return request({
		url: `/shoppingCart/add`,
		method: 'post',
		data
	})
}

// 删除购物车
export function removeShoppingCart (data) {
	return request({
		url: `/shoppingCart/del`,
		method: 'post',
		data
	})
}

// 修改购物车内容 (规格/数量)
export function updateShoppingCart (data) {
	return request({
		url: '/shoppingCart/upload',
		method: 'post',
		data
	})
}