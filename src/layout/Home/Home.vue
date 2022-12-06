<!--
 * @Author: 清羽
 * @Date: 2022-09-09 09:50:40
 * @LastEditTime: 2022-12-06 17:12:44
 * @LastEditors: you name
 * @Description: 
-->
<!-- Home 页 -->
<template>
  <div class="Home relative">
    <Header class="sticky top-0 z-50" />
    <router-view />
    <AppTab class="md:hidden" />
  </div>
</template>

<script>
import AppTab from './components/appTab.vue'
import Header from './components/Header.vue'
export default {
  name: "Home",
  data () {
    return {

    }
  },
  components: { Header, AppTab },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  // 函数
  methods: {

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>