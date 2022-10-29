/*
 * @Author: 清羽
 * @Date: 2022-09-15 16:29:44
 * @LastEditTime: 2022-10-28 21:42:46
 * @LastEditors: you name
 * @Description: 用户token
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/Login'
import { getUserInfo, logout } from '@/api/User'
// import { getShoppingCartList } from '@/api/ShoppingCart'

import { resetRouter } from '@/router'

const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		shoppingCartNum: null
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USER_ID: (state, userId) => {
		state.userId = userId
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_SHOPPING_CART_NUM: (state, shoppingCartNum) => {
		state.shoppingCartNum = shoppingCartNum
	}
}

const actions = {
	// 用户登录
	login ({ commit }, userInfo) {
		const { phone, password } = userInfo
		return new Promise((resolve, reject) => {
			login(userInfo).then(response => {
				// console.log("login => response", response)
				// const token = getToken()
				const token = response.data.data.token
				// console.log("login => token", token)
				setToken(token)  // 保存到cookie
				commit('SET_TOKEN', token) // 保存vuex
				// commit('SET_USER_ID', data.session.user_id)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// 获取用户信息
	getInfo ({ commit }) {
		console.log('获取用户信息');
		return new Promise((resolve, reject) => {
			getUserInfo().then(response => {
				const { data } = response.data
				console.log("getUserInfo => response", response)

				const { nickname } = data
				// console.log("getUserInfo => data", data)

				var avatar = ''
				if (data.business !== null) {
					if (data.business.is_show == 1) {
						avatar = '商家'
					}
				}
				commit('SET_NAME', nickname)
				commit('SET_AVATAR', avatar)
				commit('SET_SHOPPING_CART_NUM', response.data.shoppingCartDataLength)

				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},


	// 删除令牌
	resetToken ({ commit }) {
		return new Promise(resolve => {
			removeToken() // 删除token
			commit('RESET_STATE')
			resolve()
		})
	},

	// 退出登录
	logout ({ commit, state }) {
		return new Promise((resolve, reject) => {
			// logout(state.token).then(() => {
			logout().then(() => {
				removeToken() // must remove  token  first
				resetRouter()
				commit('RESET_STATE')
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
}

export default {
	namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	mutations,
	actions
}