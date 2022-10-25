/*
 * @Author: 清羽
 * @Date: 2022-10-25 19:18:23
 * @LastEditTime: 2022-10-25 19:43:02
 * @LastEditors: you name
 * @Description: 
 */
const app = '/app'
const appRouter = [
	{
		path: `${app}/my`,
		name: 'appMyInfo',
		component: () => import('@/views/My/components/myInfo.vue'),
		meta: { title: '我的主页' },
	},
	{
		path: `${app}/order`,
		name: 'appMyOrder',
		component: () => import('@/views/AppOrder/AppOrder.vue'),
		meta: { title: '我的订单', index: 2 },
	},
	{
		path: `${app}/setting`,
		name: 'appSetting',
		component: () => import('@/views/AppSetting/AppSetting.vue'),
		meta: { title: '设置', index: 2 }
	},
	{
		path: `${app}/address`,
		name: 'appAddress',
		// component: () => import('@/views/AppMyAddress/AppMyAddress.vue'),
		component: () => import('@/views/My/components/myAddress.vue'),
		meta: { title: '我的收货地址', index: 3 }
	}
]

export default appRouter