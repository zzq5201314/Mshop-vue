/*
 * @Author: 清羽
 * @Date: 2022-09-15 17:48:16
 * @LastEditTime: 2022-10-22 23:01:49
 * @LastEditors: you name
 * @Description: 用户登录状态
 */
import Cookies from 'js-cookie'

const TokenKey = 'M_U_token'

export function getToken () {
	// const a = this.$cookies.get(TokenKey)
	// console.log("getToken => a", a)
	return Cookies.get(TokenKey)

}

export function setToken (token) {
	return Cookies.set(TokenKey, token)
}

export function removeToken () {
	return Cookies.remove(TokenKey)
}