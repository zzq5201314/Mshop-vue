<!--
 * @Author: 清羽
 * @Date: 2022-12-01 20:32:58
 * @LastEditTime: 2022-12-07 23:23:06
 * @LastEditors: you name
 * @Description: 
-->
<!-- Search 页 -->
<template>
  <div class="Search md:bg-gray-50">
    <!-- Search 页 -->

    <div class="hidden md:block container mx-auto min-h-screen">

      <div class="sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-screen-xl">
        <div class="py-4">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>全部结果</el-breadcrumb-item>
            <el-breadcrumb-item>"{{searchContent}}"</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div
          class="grid grid-cols-5 gap-4 py-2"
          v-if="(productList.length>0)"
        >
          <div
            v-for="(productItem,productIndex) in productList"
            :key="productIndex"
            class="cursor-pointer group"
            @click="jumpProductInfo(productItem._id)"
          >
            <div class="h-72 overflow-hidden rounded-xl">
              <img
                :src="baseUrl+productItem.image"
                class="h-full object-cover group-hover:scale-110 transform duration-300"
              >
            </div>
            <p
              class="text-center  pt-2 group-hover:text-black transform duration-300">
              {{productItem.name}}</p>
            <p
              v-html="productItem.prices"
              class="text-center"
            ></p>
          </div>
        </div>

        <div v-else>
          <el-empty description="抱歉，没有找到您搜索的相关商品，试试修改搜索词吧！"></el-empty>

        </div>
      </div>

    </div>

    <div class="md:hidden p-2 pb-3">
      <div class="space-y-2">
        <div
          v-for="(productItem,productIndex) in productList"
          :key="productIndex"
          class="flex"
          @click="jumpProductInfo(productItem._id)"
        >
          <div class="w-28 h-28 rounded-xl overflow-hidden">
            <img
              :src="baseUrl+productItem.image"
              class="h-full w-full object-cover "
            >
          </div>
          <div class="ml-2 h-28 relative w-8/12">
            <p
              class="text-black text-sm overflow-ellipsis overflow-hidden line-clamp-2">
              {{productItem.name}}</p>
            <p
              v-html="productItem.prices"
              class="absolute bottom-4"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { search } from '@/api/Home.js'
import back from '@/components/appBack'
import { decimalPoint } from '@/assets/js/common.js'  // 修改价格样式
export default {
  name: "Search",
  data () {
    return {
      baseUrl: this.$baseUrl,
      categoryId: this.$route.query.id,
      categoryName: this.$route.query.name,
      searchContent: this.$route.query.productName,
      productList: []
    }
  },
  components: { back },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    console.log(this.searchContent);
    this.getData()
  },
  // 函数
  methods: {
    getData () {
      search({ productName: this.searchContent }).then(response => {
        this.productList = response.data.data

        this.productList.forEach(product => {
          product['prices'] = decimalPoint(product.price)
        })

        console.log("search => this.productList", this.productList)
      })
    },

    async jumpProductInfo (productId) {
      this.$router.push({
        path: '/product/info/' + productId
      })
    },
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.Search {
}
</style>