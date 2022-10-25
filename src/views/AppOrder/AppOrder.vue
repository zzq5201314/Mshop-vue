<!--
 * @Author: 清羽
 * @Date: 2022-10-24 23:31:50
 * @LastEditTime: 2022-10-25 19:15:44
 * @LastEditors: you name
 * @Description: app的订单页
-->
<!-- AppOrder 页 -->
<template>
  <div class="AppOrder">
    <back />
    AppOrder 页
  </div>
</template>

<script>
import back from '@/components/appBack.vue'
export default {
  name: "AppOrder",
  data () {
    return {

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
.AppOrder {
}
</style>