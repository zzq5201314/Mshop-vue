<!--
 * @Author: 清羽
 * @Date: 2022-09-13 11:06:48
 * @LastEditTime: 2022-10-23 21:40:54
 * @LastEditors: you name
 * @Description: 
-->
<!-- productItem 页 -->
<template>
  <div>
    <div
      class="grid grid-cols-4 gap-4 "
      v-if="data[0]!==undefined"
    >
      <div
        class="productItem"
        v-for="(item , index) in length"
        :key="index"
        @click="jumpProductInfo(index,data)"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          class="hover:shadow-2xl flex-1 h-96"
          shadow="never"
        >

          <div class="text-center p-3">
            <el-row class="pb-4">
              <el-col
                :span="24"
                class="h-60 flex items-center"
              >
                <el-skeleton
                  class="w-full"
                  v-if="!data[index]"
                >
                  <template slot="template">
                    <el-skeleton-item
                      variant="image"
                      class="w-full h-60"
                    />
                  </template>
                </el-skeleton>
                <img
                  v-else
                  :src="baseUrl+data[index].image"
                  class="image w-full h-full object-cover"
                />
              </el-col>
              <!-- 商品图片end -->

              <el-col
                :span="24"
                class="pt-4"
              >
                <el-skeleton v-if="!data[index]">
                  <template slot="template">
                    <el-skeleton-item
                      variant="p"
                      style="width: 50%"
                    />
                  </template>
                </el-skeleton>
                <p
                  class="font-semibold text-lg"
                  v-else
                >{{data[index].name}}</p>
              </el-col>
              <!-- 商品名称end -->

              <el-col :span="24">
                <el-skeleton v-if="!data[index]">
                  <template slot="template">
                    <el-skeleton-item
                      variant="p"
                      style="width: 50%"
                    />
                  </template>
                </el-skeleton>
                <p
                  class="text-red-600"
                  v-else
                >￥{{data[index].price}}</p>
              </el-col>
              <!-- 商品价格end -->

            </el-row>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "productItem",
  props: {
    length: {
      type: Number,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      baseUrl: this.$baseUrl
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
    jumpProductInfo (value, data) { // 跳转商品详情
      console.log("a => data", data)
      console.log("click => value", value)
      // data[value]
      console.log("product_ID => ", data[value]._id)
      this.$router.push({
        path: '/product/info/' + data[value]._id
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.productItem {
}
</style>