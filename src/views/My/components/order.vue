<!--
 * @Author: 清羽
 * @Date: 2022-10-07 18:53:46
 * @LastEditTime: 2022-10-12 10:51:31
 * @LastEditors: you name
 * @Description: 我的订单
-->
<!-- order 页 -->
<template>
  <div class="order">
    <header class="p-4">
      <div class="space-x-4 text-sm">
        <span
          v-for="(buttonItem,buttonIndex) in button"
          :key="buttonIndex"
          class="bg-gray-100 px-4 py-2 cursor-pointer hover:bg-black hover:text-white"
          :class="{'bg-gray-900':selectButtonIndex==buttonIndex,'text-gray-100':selectButtonIndex==buttonIndex}"
          @click="selectButton(buttonIndex)"
        >{{buttonItem}}</span>
      </div>
    </header>

    <div>
      <!-- 表格头部 start -->
      <div class="w-full">
        <div class="bg-gray-100 h-12 flex text-center items-center divide-x">
          <div class="w-6/12">商品</div>
          <div class="w-1/12">单价/元</div>
          <div class="w-1/12">数量</div>
          <div class="w-1/12">状态</div>
          <div class="w-1/12">实付款</div>
          <div class="w-2/12">订单状态及操作</div>
        </div>
      </div>
      <!-- 表格头部 end -->
      <!-- 表格内容 start -->
      <div
        v-loading="orderLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-custom-class="loading-icon"
        v-if="orderList.length>0"
      >
        <div
          v-for="(orderItem , orderIndex) in orderList"
          :key="orderIndex"
          class="py-2"
        >
          <div class="pb-2 pt-4  text-sm flex justify-between">
            <div class="space-x-3">
              <el-checkbox :label="orderItem._id"></el-checkbox>
              <span>{{orderItem.created_at | formatDate}}</span>
              <span>订单号：<span class="text-black">{{orderItem._id}}</span></span>
            </div>
            <div>
              <div v-if="orderItem.order_state==0">待支付</div>
              <div v-else-if="orderItem.order_state==3">退款中</div>
              <div v-else-if="orderItem.order_state==4">退款成功</div>
              <div v-else-if="orderItem.order_state==5">退款失败</div>
              <div v-else-if="orderItem.courier_state==0">待发货</div>
              <div v-else-if="orderItem.courier_state==1">待发货</div>
              <div v-else-if="orderItem.courier_state==2">待评价</div>
              <div v-else-if="orderItem.courier_state==3">已完成</div>
              <div v-else-if="orderItem.courier_state==4">已取消</div>
            </div>
          </div>
          <!-- 订单时间 end -->

          <table class="w-full ">
            <tbody
              class="h-32 border border-gray-100 border-r-0 border-l-0 text-center "
            >
              <tr class="h-32">
                <td class=" w-6/12 py-3 ">
                  <div class="flex space-x-2 items-center">
                    <img
                      :src="baseUrl+orderItem.specification_id.product_pic"
                      class="w-24 h-24"
                    />
                    <div
                      class="cursor-pointer hover:text-red-700"
                      @click="goProductInfo(orderItem.product_id._id)"
                    >
                      {{orderItem.product_id.name}}</div>
                  </div>
                </td>
                <!-- 商品名称/图片 end -->
                <td class="w-1/12 py-3">
                  <div>{{orderItem.specification_id.product_price}}</div>
                </td>
                <!-- 商品价格 end -->
                <td class="w-1/12 py-3">
                  <div>{{orderItem.num}}</div>
                </td>
                <!-- 购买数量 end -->
                <td class="w-1/12 py-3">
                  <div v-if="orderItem.order_state==0">待支付</div>
                  <div v-else-if="orderItem.order_state==3">退款中</div>
                  <div v-else-if="orderItem.order_state==4">退款成功</div>
                  <div v-else-if="orderItem.order_state==5">退款失败</div>
                  <div v-else-if="orderItem.courier_state==0">待发货</div>
                  <div v-else-if="orderItem.courier_state==1">待发货</div>
                  <div v-else-if="orderItem.courier_state==2">待评价</div>
                  <div v-else-if="orderItem.courier_state==3">已完成</div>
                  <div v-else-if="orderItem.courier_state==4">已取消</div>
                </td>
                <!-- 订单状态 end -->
                <td class="w-1/12 py-3">
                  <div>
                    ￥{{(orderItem.specification_id.product_price*orderItem.num).toFixed(2)}}
                  </div>
                </td>
                <!-- 实付款 end -->
                <td class="w-2/12 py-3">
                  <div class="w-4/5 mx-auto  space-y-1">
                    <div
                      class="bg-red-700 text-white py-1 cursor-pointer"
                      v-if="orderItem.order_state==0"
                    >立即支付</div>
                    <div class="cursor-pointer hover:text-red-700">取消订单</div>
                    <div class="cursor-pointer hover:text-red-700">删除订单</div>
                  </div>

                </td>
                <!-- 订单操作 end -->
              </tr>
            </tbody>

          </table>
        </div>
      </div>

      <!-- 表格内容 end -->
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/Order'
export default {
  name: "order",
  data () {
    return {
      baseUrl: this.$baseUrl,
      selectButtonIndex: 0,  // 当前选择的按钮
      button: ['全部有效果订单', '待付款', '待收货', '已完成', '待评价', '已取消'],
      orderList: [],
      orderLoading: false  // 订单 加载
    }
  },
  filters: {
    formatDate: function (value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m
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
    // 获取数据
    async getOrderList (type) {
      this.orderLoading = true
      await getOrderList(type).then(response => {
        this.orderList = response.data.data
        console.log("getOrderList => this.orderList", this.orderList)
        this.orderLoading = false
      })
    },
    // 选择 状态
    selectButton (index) {
      this.selectButtonIndex = index
      let type = index - 1
      if (type == -1) {
        type = undefined
      }
      this.getOrderList(type)
    },
    // 跳转商品详情
    goProductInfo (productId) {
      console.log("goProductInfo => productId", productId)
      this.$router.push({
        path: '/product/info/' + productId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */

:deep .loading-icon {
  font-size: 30px;
}
.order {
  :deep .el-checkbox {
    .el-checkbox__label {
      display: none;
      padding: 0;
    }
  }
}
</style>