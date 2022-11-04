/*
 * @Author: 清羽
 * @Date: 2022-11-04 17:27:50
 * @LastEditTime: 2022-11-04 17:52:11
 * @LastEditors: you name
 * @Description: 
 */
export function decimalPoint (val) {
	// if (val == null) val = '0.00'
	var value = val
	const splitPrice = (value ? value.toFixed(2) : '0.00').split('.')
	const numb1 = splitPrice[0]
	var numb2 = '00'
	if (splitPrice.length > 1) {
		numb2 = splitPrice[1]
	}
	// return `<small>￥</small>` + `${numb1}.<span style="font-size:14px;line-height:14px">${numb2}</span>`

	return `<span class="text-red-600 font-medium text-base">
						<small>¥</small>${numb1}.<span class="text-xs">${numb2}</span>
					</span>`
}
