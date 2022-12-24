/*
 * @Author: 清羽
 * @Date: 2022-10-24 18:35:17
 * @LastEditTime: 2022-12-24 20:59:58
 * @LastEditors: you name
 * @Description: 
 */
import _this from '../../main.js'

import store from '../../store'
import router from '../../router'

// 设置 init 函数
function init () {
	// console.log('准备执行');
	// if (_this) {
	// 	const innerWidth = window.innerWidth
	// 	// _this.$store.commit('setInnerWidth', innerWidth);
	// 	_this.$store.dispatch('innerWH/setInnerWidth', innerWidth).then(() => {

	// 		console.log(' window.innerWidth 获取成功', innerWidth);
	// 	})

	// }
	// setAppInvoked
	const innerWidth = window.innerWidth
	// _this.$store.commit('setInnerWidth', innerWidth);
	store.dispatch('innerWH/setInnerWidth', innerWidth).then(() => {
		if (innerWidth < 768) {
			if (store.state.innerWH.invokedPC.length != 0) {
				if (store.state.innerWH.invokedApp == false) {
					router.go(0)
				}
			}
			store.dispatch('innerWH/setPCInvoked', false)
			store.dispatch('innerWH/setAppInvoked', true)
		} else {
			if (store.state.innerWH.invokedPC.length != 0) {
				if (store.state.innerWH.invokedPC == false) {
					router.go(0)
				}
			}

			store.dispatch('innerWH/setAppInvoked', false)
			store.dispatch('innerWH/setPCInvoked', true)
		}
		// console.log(' window.innerWidth 获取成功', innerWidth);
	})
}



// // 防抖
// function debounce (fn, state) {
// 	let caller = state
// 	return function () {
// 		if (caller) {
// 			fn()
// 			console.log('刷新成功');
// 		}
// 		caller = false
// 	}
// }

// function once (fn) {
// 	let called = false;
// 	return function _once () {
// 		if (called) {
// 			return _once.value;
// 		}
// 		called = true;
// 		_once.value = fn.apply(this, arguments);
// 	}
// }


// 节流 ms 触发间隔毫秒
var ms = 100;
var lastClick = Date.now() - ms;
// 初始化
init();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
	// 节流 
	if (Date.now() - lastClick >= ms) {
		init();
		lastClick = Date.now();
	}
}
