<!--
 * @Author: 清羽
 * @Date: 2022-10-25 18:56:54
 * @LastEditTime: 2022-10-25 19:32:49
 * @LastEditors: you name
 * @Description: app的设置页面
-->
<!-- AppSetting 页 -->
<template>
  <div class="AppSetting bg-gray-100 min-h-screen">
    <header class="flex items-center bg-transparent">
      <back />
      <div>{{title}}</div>
    </header>
    <div>
      <van-cell
        title="我的收货地址"
        is-link
        :to="{name:'appAddress'}"
      />
    </div>
  </div>
</template>

<script>
import back from '@/components/appBack.vue'
export default {
  name: "AppSetting",
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
.AppSetting {
}
</style>