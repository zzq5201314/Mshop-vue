/*
 * @Author: 清羽
 * @Date: 2022-10-28 14:51:06
 * @LastEditTime: 2022-11-28 15:53:46
 * @LastEditors: you name
 * @Description: 
 */

import { Toast } from 'vant';
import store from '../../store'
import { Message } from 'element-ui';

export function msg (value, Type, select) {
	const innerWidth = store.state.innerWH.innerWidth
	if (select) {
		if (select == 'pc') {
			return Message({
				type: Type,
				message: value
			})
		} else if (select == 'app') {

			return Toast(value);
		}
	} else {
		if (innerWidth > 768) {  // pc端
			return Message({
				type: Type,
				message: value
			})
		} else {  						// app端
			if (Type !== 'success') Type = ''
			return Toast({
				message: value,
				icon: Type
			});
		}
	}

}