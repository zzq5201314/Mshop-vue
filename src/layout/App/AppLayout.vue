<!--
 * @Author: 清羽
 * @Date: 2022-10-24 18:27:31
 * @LastEditTime: 2022-10-25 18:47:33
 * @LastEditors: you name
 * @Description: 
-->
<!-- AppLayout 页 -->
<template>
  <div class="AppLayout">
    <header class="p-3 font-semibold text-black">
      <i
        class="el-icon-arrow-left"
        @click="back"
      ></i>
    </header>

    <router-view />

  </div>
</template>

<script>
export default {
  name: "AppLayout",
  data () {
    return {

    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  // 函数
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.AppLayout {
}
</style>