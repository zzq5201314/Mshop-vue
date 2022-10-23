<!--
 * @Author: 清羽
 * @Date: 2022-09-13 21:56:09
 * @LastEditTime: 2022-10-23 22:55:05
 * @LastEditors: you name
 * @Description: 热门推荐列表
-->
<!-- recommend 页 -->
<template>
  <div class="recommend">
    <div
      class="bg-white md:bg-transparent mx-4 md:mx-0 rounded-lg md:rounded-none p-3 md:p-0"
    >
      <div class="mb-2 md:mb-4 flex justify-between items-center ">
        <p
          class="text-base font-semibold md:font-medium md:text-2xl text-gray-800">
          热门推荐：</p>
        <p class="cursor-pointer text-xs md:text-sm">更多<i
            class='el-icon-arrow-right'
          /></p>
      </div>
      <productList
        :data="recommendList"
        :length="4"
        class="hidden md:block"
      />
      <!-- pc -->

      <van-swipe
        class="my-swipe relative w-full md:hidden"
        :autoplay="5000"
        indicator-color="#2563eb"
      >
        <van-swipe-item
          v-for="(productItem,productIndex) in recommendList"
          :key="productIndex"
        >
          <div>
            <img
              :src="baseUrl+ productItem.image"
              class="h-52 w-full object-scale-down"
            />
            <!-- <div>{{productItem.price}}</div> -->
            <div class="space-y-1 pb-3 pt-1">
              <div class="font-semibold text-black">{{productItem.name}}
              </div>
              <div class="text-xs">商品详情</div>
              <div class="flex items-center">
                <div class="w-8/12 text-xs text-black font-semibold">
                  ￥{{productItem.price.toFixed(2)}}起
                </div>
                <div
                  class="mx-auto bg-gray-100 text-xs text-black font-semibold px-4 py-2 rounded-full "
                >立即购买</div>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <!-- 移动 end -->
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
      recommendList: [], // 热门推荐商品列表
      baseUrl: this.$baseUrl
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
  :deep .van-swipe__indicators {
    position: absolute;
    bottom: 0;
  }
}
</style>