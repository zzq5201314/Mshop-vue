/*
 * @Author: 清羽
 * @Date: 2022-10-28 14:51:06
 * @LastEditTime: 2022-10-28 15:21:20
 * @LastEditors: you name
 * @Description: 
 */

import { Toast } from 'vant';
import store from '../../store'

export function msg (value, Type, select) {
	const innerWidth = store.state.innerWH.innerWidth
	if (select) {
		if (select == 'pc') {
			return function () {
				this.$message({
					type: Type,
					message: value
				})
			}
		} else if (select == 'app') {
			return Toast(value);
		}
	} else {
		if (innerWidth > 768) {  // pc端
			return function () {
				this.$message({
					type: Type,
					message: value
				})
			}
		} else {  						// app端
			if (Type !== 'success') Type = ''
			return Toast({
				message: value,
				icon: Type
			});
		}
	}

}