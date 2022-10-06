<!--
 * @Author: 清羽
 * @Date: 2022-09-13 21:56:09
 * @LastEditTime: 2022-09-16 16:05:06
 * @LastEditors: you name
 * @Description: 热门推荐列表
-->
<!-- recommend 页 -->
<template>
  <div class="recommend">
    <div>
      <div class="mb-4 flex justify-between items-center">
        <p class="text-2xl text-gray-800">热门推荐：</p>
        <p class="cursor-pointer">更多<i class='el-icon-arrow-right' /></p>
      </div>
      <productList
        :data="recommendList"
        :length="4"
      />
    </div>
  </div>
</template>

<script>
import { getProductRecommendList } from '@/api/Home'
import productList from './productList.vue'
export default {
  name: "recommend",
  data () {
    return {
      recommendList: [] // 热门推荐商品列表
    }
  },
  components: { productList },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.getProductRecommendList()
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  // 函数
  methods: {
    getProductRecommendList () {
      getProductRecommendList().then(response => {
        this.recommendList = response.data.data
        // console.log("getProductRecommendList => this.recommendList", this.recommendList)
      })
    },
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.recommend {
}
</style>