<!--
 * @Author: 清羽
 * @Date: 2022-09-14 16:03:55
 * @LastEditTime: 2022-09-16 16:05:30
 * @LastEditors: you name
 * @Description: 
-->
<!-- list 页 -->
<template>
  <div class="list">
    <div>
      <div class="mb-4 flex justify-between items-center">
        <p class="text-2xl text-gray-800">猜你喜欢：</p>
        <p class="cursor-pointer">更多<i class='el-icon-arrow-right' /></p>
      </div>
      <productList
        :data="listData"
        :length="10"
      />
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
      listData: []
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
}
</style>