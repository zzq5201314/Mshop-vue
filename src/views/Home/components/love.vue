<!--
 * @Author: 清羽
 * @Date: 2022-09-14 16:03:55
 * @LastEditTime: 2022-11-30 21:55:22
 * @LastEditors: you name
 * @Description: 
-->
<!-- list 页 -->
<template>
  <div class="list">
    <div>
      <div class="md:mb-4 flex justify-between items-center px-3 md:px-0">
        <p
          class="text-base font-bold md:font-medium md:text-2xl text-gray-800 ">
          猜你喜欢：</p>
        <p class="cursor-pointer hidden md:block">更多<i
            class='el-icon-arrow-right'
          /></p>
      </div>
      <productList
        :data="listData"
        :length="10"
        class="hidden md:block"
      />

      <div class="md:hidden grid grid-cols-2 p-3 gap-3 ">
        <div
          v-for="(productItem,productIndex) in listData"
          :key="productIndex"
          class="bg-white rounded-lg p-3"
        >
          <div class="h-44 sm:h-56 flex items-center justify-center">
            <img
              :src="baseUrl+ productItem.image"
              class="h-32 w-32 object-cover sm:h-48 sm:w-48"
            />
          </div>
          <!-- {{productItem}} -->
          <p
            class="font-semibold text-black text-left max-h-9 text-sm productName">
            {{productItem.name}}
          </p>
          <p class="text-red-600 text-xs mt-1">￥<span
              class="font-bold text-sm">{{productItem.price.toFixed(2)}}</span>
          </p>
          <p class="text-xs">商品标签</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList } from '@/api/Home'
import productList from './productList.vue'
export default {
  name: "list",
  data () {
    return {
      listData: [],
      baseUrl: this.$baseUrl
    }
  },
  components: { productList },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.getProductList()
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  // 函数
  methods: {
    getProductList () {
      getProductList().then(response => {
        this.listData = response.data.data
        // console.log("getProductList => this.listData", this.listData)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.list {
  .productName {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>