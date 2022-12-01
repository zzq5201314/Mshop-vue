<!--
 * @Author: 清羽
 * @Date: 2022-12-01 20:32:58
 * @LastEditTime: 2022-12-01 22:24:25
 * @LastEditors: you name
 * @Description: 
-->
<!-- Search 页 -->
<template>
  <div class="Search">
    <!-- Search 页 -->

    <div>
      <header class="flex items-center">
        <back />
        <div>搜索</div>
      </header>
    </div>
  </div>
</template>

<script>
import back from '@/components/appBack'
export default {
  name: "Search",
  data () {
    return {
      categoryId: this.$route.query.id,
      categoryName: this.$route.query.name,
      searchContent: ''
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
.Search {
}
</style>