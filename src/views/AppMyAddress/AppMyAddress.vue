<!--
 * @Author: 清羽
 * @Date: 2022-10-25 19:08:10
 * @LastEditTime: 2022-10-25 19:31:56
 * @LastEditors: you name
 * @Description: 
-->
<!-- AppMyAddress 页 -->
<template>
  <div class="AppMyAddress bg-gray-100 min-h-screen">
    <header class="flex items-center bg-transparent">
      <back />
      <div>{{title}}</div>
    </header>
    AppMyAddress 页
  </div>
</template>

<script>
import back from '@/components/appBack.vue'
export default {
  name: "AppMyAddress",
  data () {
    return {
      title: this.$route.meta.title
    }
  },
  components: { back },
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
.AppMyAddress {
}
</style>