<!--
 * @Author: 清羽
 * @Date: 2022-09-24 14:44:21
 * @LastEditTime: 2022-10-31 00:05:58
 * @LastEditors: you name
 * @Description: 收藏页
-->
<!-- Collect 页 -->
<template>
  <div>
    <div
      class="Collect  bg-gray-100 h-screen hidden md:block"
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
    <!-- pc端 end -->

    <div class="">
      <header
        class="flex items-center text-xl font-medium text-black fixed bg-gray-100 z-10 w-full top-0"
      >
        <back />
        <div class="w-full">{{title}}</div>
        <div class="w-12 text-sm">
          <span @click="check=!check">{{check?'完成':'管理'}}</span>
        </div>
      </header>

      <div
        class="bg-white mt-11 "
        :class="check ?'mb-10':''"
      >
        <div
          v-for="(productItem, productIndex) in list "
          :key="productIndex"
          class="flex px-3 py-1 "
        >

          <div
            v-show="check"
            class="mr-2"
          >

            <!-- <van-checkbox
              v-model="productItem.checkAll"
              @change="(val) => selectChange(val, productItem)"
            >全选</van-checkbox> -->

            <van-checkbox
              v-model="productItem.check"
              @change="(val) => selectChange(val, productItem)"
            ></van-checkbox>

          </div>

          <div @click="goProductInfo(productItem.product_id._id)">
            <img
              :src="baseUrl+productItem.product_id.image"
              class="w-32 h-32 rounded-lg"
            >
          </div>

          <div
            class="ml-2 space-y-3 relative w-7/12"
            @click="goProductInfo(productItem.product_id._id)"
          >
            <p class="text-sm text-black font-bold">
              {{productItem.product_id.name}}</p>
            <p class="text-xl text-red-600 font-bold">
              <span class="text-xs">¥</span>{{productItem.product_id.price}}
            </p>
            <p class="text-xs absolute bottom-2 right-2"><span
                v-show="!check"
                class="border p-2 py-1 rounded-full border-gray-300"
                @click.stop="goBusiness(productItem.product_id.business)"
              >去店铺</span>
            </p>
          </div>

        </div>
      </div>
      <!-- 商品列表 end -->

      <div
        v-show="check"
        class="flex justify-between px-3 py-2 fixed bottom-0 bg-white w-full"
      >
        <van-checkbox v-model="checkAll">全选</van-checkbox>
        <span @click="del()">删除</span>
      </div>
    </div>
    <!-- 移动端 end -->
  </div>
</template>

<script>
import back from '@/components/appBack'
import { getCollectList, delCollect } from '@/api/Collect'
export default {
  name: "Collect",
  data () {
    return {
      activeIndex: '1',
      list: [],
      baseUrl: this.$baseUrl,
      dataLoading: false,
      title: this.$route.meta.title, // app顶部title名称
      check: false, // 全选显示
      checkedData: [], //选择多选框时选中的值
    }
  },
  components: { back },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getCollectList()
  },
  computed: {
    checkAll: {
      get () {
        console.log("get => this.checkedData.length", this.checkedData.length)
        return this.checkedData.length == this.list.length
      },
      set (v) {
        if (v) { // 全选
          this.list.forEach((item, index, arr) => {
            arr[index].check = true;
          })
        } else { // 反选
          this.list = this.list.map((v) => ({
            ...v,
            check: false
          }))
          this.checkedData = []
        }
      }
    }
  },
  // 函数
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    getCollectList () {
      console.log('获取数据');
      this.dataLoading = true
      const query = { type: 'product' }
      getCollectList(query).then(response => {
        this.list = response.data.data
        // 添加checkAll是否全选
        this.list = this.list.map((v) => ({
          ...v,
          check: false
        }))
        this.dataLoading = false
        this.checkedData = []
      })
    },

    // 全选
    selectChange (val, item) {

      if (val) {
        this.checkedData.push(item)
      } else {

        this.checkedData.forEach((v, index) => {
          if (v == item) {
            this.checkedData.splice(index, 1)
          }
        })

      }
    },

    selectAll () {
      console.log(this.checkedData);
    },


    async del (collectId) {
      if (!collectId & this.checkedData.length > 0) {
        await Promise.all(this.checkedData.map((item) => delCollect({ collectId: item._id }))).then(() => {
          this.getCollectList()
        });

      } else {
        delCollect({ collectId }).then(response => {
          console.log("delCollect => response", response)
          this.$message({
            type: 'success',
            message: response.data.msg
          })
          this.getCollectList()
        })
      }

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