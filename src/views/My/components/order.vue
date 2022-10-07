<!--
 * @Author: 清羽
 * @Date: 2022-10-07 18:53:46
 * @LastEditTime: 2022-10-08 01:07:59
 * @LastEditors: you name
 * @Description: 
-->
<!-- order 页 -->
<template>
  <div class="order">
    <header class="p-4">
      <div class="space-x-4 text-sm">
        <span
          class="bg-gray-100 px-4 py-2 cursor-pointer hover:bg-black hover:text-white"
        >全部有效果订单</span>
        <span
          class="bg-gray-100 px-4 py-2 cursor-pointer hover:bg-black hover:text-white"
        >待付款</span>
        <span
          class="bg-gray-100 px-4 py-2 cursor-pointer hover:bg-black hover:text-white"
        >待收货</span>
        <span
          class="bg-gray-100 px-4 py-2 cursor-pointer hover:bg-black hover:text-white"
        >已完成</span>
        <span
          class="bg-gray-100 px-4 py-2 cursor-pointer hover:bg-black hover:text-white"
        >待评价</span>
        <span
          class="bg-gray-100 px-4 py-2 cursor-pointer hover:bg-black hover:text-white"
        >已取消</span>
      </div>
    </header>
  </div>
</template>

<script>
import { getOrderList } from '@/api/Order'
export default {
  name: "order",
  data () {
    return {

    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getOrderList()
  },
  // 函数
  methods: {
    getOrderList () {

      getOrderList().then(response => {
        console.log("getOrderList => response", response)

      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.order {
}
</style>