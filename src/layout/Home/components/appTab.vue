<!--
 * @Author: 清羽
 * @Date: 2022-10-23 23:43:23
 * @LastEditTime: 2022-10-23 23:52:20
 * @LastEditors: you name
 * @Description: 手机端的tab选项卡
-->
<!-- appTab 页 -->
<template>
  <div class="appTab">
    <div :style="{ height: tabH }"></div>
    <van-tabbar
      v-model="active"
      ref="tab"
    >
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: "appTab",
  data () {
    return {
      active: 0,
      tabH: '' // tab高度
    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    // 获取tab高度
    this.$nextTick(() => {
      this.tabH = this.$refs.tab.$el.offsetHeight + 'px'
      console.log("this.$nextTick => this.tabH", this.tabH)
    })
  },
  // 函数
  methods: {

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.appTab {
}
</style>