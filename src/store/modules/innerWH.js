/*
 * @Author: 清羽
 * @Date: 2022-10-24 18:36:52
 * @LastEditTime: 2022-10-24 22:05:47
 * @LastEditors: you name
 * @Description: 
 */
const innerWidthState = () => {
	return {
		innerWidth: '',
		invokedApp: '',
		invokedPC: ''
	}
}

const state = innerWidthState()

const mutations = {
	SET_INNER_WIDTH: (state, width) => {
		state.innerWidth = width
	},
	SET_PC_INVOKED: (state, invoked) => {
		state.invokedPC = invoked
	},
	SET_APP_INVOKED: (state, invoked) => {
		state.invokedApp = invoked
	}
}

const actions = {
	// 设置当前窗口宽度
	setInnerWidth ({ commit }, width) {
		commit('SET_INNER_WIDTH', width)
	},
	// 设置PC是否刷新了
	setPCInvoked ({ commit }, invoked) {
		commit('SET_PC_INVOKED', invoked)
	},
	// 设置app是否刷新了
	setAppInvoked ({ commit }, invoked) {
		commit('SET_APP_INVOKED', invoked)
	}
}

export default {
	namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	mutations,
	actions
}