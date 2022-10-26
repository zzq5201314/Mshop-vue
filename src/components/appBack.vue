<!--
 * @Author: 清羽
 * @Date: 2022-10-25 19:12:57
 * @LastEditTime: 2022-10-26 21:58:20
 * @LastEditors: you name
 * @Description: app的返回头部
-->
<!-- appBack 页 -->
<template>
  <div class="appBack">
    <header class="p-2 font-semibold text-black">
      <i
        class="el-icon-back text-lg"
        @click="back"
      ></i>
    </header>
  </div>
</template>

<script>

export default {
  name: "appBack",
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
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.appBack {
}
</style>