<!--
 * @Author: 清羽
 * @Date: 2022-09-09 09:50:40
 * @LastEditTime: 2022-09-09 16:25:51
 * @LastEditors: you name
 * @Description: 
-->
<!-- Home 页 -->
<template>
  <div class="Home">
    <Header class="" />
    <router-view />
    <div class="back">
      <el-backtop target=".back">
      </el-backtop>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: "Home",
  data () {
    return {

    }
  },
  components: { Header },
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
.back {
  overflow-x: hidden;
}
</style>