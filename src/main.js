/*
 * @Author: 清羽
 * @Date: 2022-09-08 23:57:13
 * @LastEditTime: 2022-10-24 19:01:11
 * @LastEditors: you name
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/tailwind.css'
import 'vant/lib/index.css';
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import '@/permission' // permission control
import './assets/icon/font/iconfont.css'

// Window.onresize 事件  动态调整窗口
import "@/assets/js/onresize";

Vue.use(Vant);
import {
  baseUrl
} from '@/config'
// Vue.prototype.$baseApi=baseApi

// import { baseUrl } from '@/utils/base'
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
