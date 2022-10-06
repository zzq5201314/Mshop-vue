/*
 * @Author: 清羽
 * @Date: 2022-09-12 00:27:44
 * @LastEditTime: 2022-09-16 16:08:32
 * @LastEditors: you name
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})

export default store