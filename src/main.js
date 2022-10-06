/*
 * @Author: 清羽
 * @Date: 2022-09-08 23:57:13
 * @LastEditTime: 2022-09-25 10:35:04
 * @LastEditors: you name
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/tailwind.css'
import VueCookies from "vue-cookies";

import '@/permission' // permission control


Vue.use(VueCookies);


import { baseUrl } from '@/utils/base'
Vue.prototype.$baseUrl = baseUrl

Vue.config.productionTip = false
Vue.use(ElementUI);

const defaultSettings = require('./settings.js')
// const name = defaultSettings.title || 'vue' // page title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  to.meta.title ? document.title = `${defaultSettings.title} | ${to.meta.title}` : document.title = defaultSettings.title
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
