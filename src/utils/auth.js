/*
 * @Author: 清羽
 * @Date: 2022-09-15 17:48:16
 * @LastEditTime: 2022-09-16 16:29:29
 * @LastEditors: you name
 * @Description: 用户登录状态
 */
import Cookies from 'js-cookie'

const TokenKey = 'M_U_token'

export function getToken () {
	return Cookies.get(TokenKey)
	// return this.$cookies.get(TokenKey)

}

export function setToken (token) {
	return Cookies.set(TokenKey, token)
}

export function removeToken () {
	return Cookies.remove(TokenKey)
}