<!--
 * @Author: 清羽
 * @Date: 2022-09-24 14:44:21
 * @LastEditTime: 2022-10-12 10:30:26
 * @LastEditors: you name
 * @Description: 
-->
<!-- Collect 页 -->
<template>
  <div
    class="Collect  bg-gray-100 h-screen"
    v-loading="dataLoading"
    element-loading-text="数据加载中，请稍后……"
    element-loading-spinner="el-icon-loading"
    element-loading-custom-class="loading-icon"
  >
    <div class="container mx-auto max-w-7xl py-5">

      <div
        class="grid grid-cols-7 gap-4"
        v-if="list.length>0"
      >
        <div
          class="bg-white hover:shadow-xl transition duration-300 h-48 productItem select-none"
          v-for="(item,index) in list"
          :key="index"
          @click="goProductInfo(item.product_id._id)"
        >
          <div class="h-48 relative">
            <div class="relative">
              <img
                :src="baseUrl+item.product_id.image"
                class="w-full h-32 "
              />
              <div
                class="absolute bottom-0 left-0 bg-black bg-opacity-40 goBusiness"
              >
                <button
                  class="text-white text-xs px-2 py-1 z-50"
                  @click.stop="goBusiness(item.product_id.business)"
                >进入店铺</button>
              </div>
            </div>
            <p class="text-center text-sm my-2 font-semibold">
              {{item.product_id.name}}</p>
            <p class="text-center text-xs my-2 text-red-400 font-semibold">
              ￥{{item.product_id.price}}</p>

            <div
              class="absolute top-0 right-0 del px-2 py-1 bg-black bg-opacity-40 text-white cursor-pointer"
              @click.stop="del(item._id)"
            >
              <i class="el-icon-delete"></i>
            </div>

          </div>

        </div>
      </div>

      <div
        v-else
        class="bg-white rounded-2xl min-h-screen flex items-center justify-center"
      >
        <el-empty description="收藏夹空啦">
          <router-link
            :to="{path:'/'}"
            class="bg-blue-600 px-4 py-2 text-white rounded-2xl"
          >去购物</router-link>
        </el-empty>
      </div>

    </div>

  </div>
</template>

<script>
import { getCollectList, delCollect } from '@/api/Collect'
export default {
  name: "Collect",
  data () {
    return {
      activeIndex: '1',
      list: [],
      baseUrl: this.$baseUrl,
      dataLoading: false
    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getCollectList()
  },
  // 函数
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    getCollectList () {
      this.dataLoading = true
      const query = { type: 'product' }
      getCollectList(query).then(response => {
        this.list = response.data.data
        console.log("getCollectList => this.list", this.list)
        this.dataLoading = false
      })
    },
    del (collectId) {
      console.log("del => collectId", collectId)
      delCollect({ collectId }).then(response => {
        console.log("delCollect => response", response)
        this.$message({
          type: 'success',
          message: response.data.msg
        })
        this.getCollectList()
      })
    },
    goBusiness (businessId) {
      // console.log("goBusiness => businessId", businessId)
      this.$router.push({
        path: '/business/info/' + businessId
      })
    },
    goProductInfo (productId) {
      // console.log("goProductInfo => productId", productId)
      this.$router.push({
        path: '/product/info/' + productId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */

.loading-icon {
  font-size: 50px;
}

::v-deep .el-loading-text {
  font-size: 24px;
  margin: 30px 0 !important;
}

.Collect {
  .productItem {
    .goBusiness,
    .del {
      display: none;
    }

    &:hover .goBusiness,
    &:hover .del {
      display: block;
    }
  }
}
</style>