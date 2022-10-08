<!--
 * @Author: 清羽
 * @Date: 2022-10-08 14:46:20
 * @LastEditTime: 2022-10-09 00:28:58
 * @LastEditors: you name
 * @Description: 确认订单
-->
<!-- ConfirmOrder 页 -->
<template>
  <div class="ConfirmOrder bg-gray-100 h-full">
    <div class=" container mx-auto max-w-7xl py-5">
      <header class="bg-white p-8">

        <div
          class="space-y-5"
          v-if="addressList.length==0"
        >
          <span class="text-lg text-black">收货地址</span>
          <div
            @click="addAddress"
            class="h-20 w-3/5 flex items-center justify-center border text-sm cursor-pointer"
          ><i class="el-icon-plus text-black font-bold mx-1" />新增收货地址</div>
        </div>

        <div
          class="space-y-5"
          v-else
        >
          <div class="flex justify-between ">
            <span class="text-lg text-black">收货地址</span>
            <span
              class="border px-4 text-sm py-1 cursor-pointer"
              @click="addAddress"
            ><i class="el-icon-plus text-black font-bold mx-1" />
              新增收货地址</span>
          </div>

          <div
            class="space-y-5  w-3/5"
            v-if="isReloadData"
            v-loading="isReloadLoading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0)"
            element-loading-custom-class="loading-icon"
          >
            <div
              v-for="(addressItem,addressIndex) in addressList"
              :key="addressIndex"
              class=" border space-y-2 h-full relative group cursor-default"
              :class="{'border-red-600':addressItem.selectAddressId===addressItem._id}"
              @click="selectAddress(addressItem,addressIndex)"
            >
              <div class="p-6">
                <div>
                  <span class="mr-6 text-black">{{addressItem.addressee}}</span>
                  <span class="text-black">{{addressItem.phone}}</span>
                  <span
                    v-if="addressItem.isDefault==true"
                    class="ml-6 text-xs border-red-600 text-red-600 border py-1 px-2"
                  >默认地址</span>
                </div>

                <div>
                  <span>{{addressItem.province}} {{addressItem.city}}
                    {{addressItem.area}} </span>
                  <span>{{addressItem.detailAddress}}</span>
                </div>
              </div>

              <div
                class="absolute -top-2 right-0 h-full p-6 space-x-3 hidden group-hover:block text-xs"
              >
                <span class="hover:text-red-600 cursor-pointer">设置为默认</span>
                <span class="hover:text-red-600 cursor-pointer">修改</span>
                <span class="hover:text-red-600 cursor-pointer">删除</span>
              </div>
            </div>

            <div
              class="cursor-pointer"
              v-if="isFold==true"
              @click="fold"
            >查看全部地址 <i class="el-icon-arrow-down ml-2" /></div>
            <div
              class="cursor-pointer"
              v-else
              @click="fold"
            >收起地址<i class="el-icon-arrow-up ml-2" />
            </div>
          </div>
        </div>

      </header>
      <div></div>
    </div>

    <div v-if="dialogShow">
      <addAddress
        :dialogShow="dialogShow"
        @dialogShowChange="dialogShowChange"
      />
    </div>
  </div>
</template>

<script>
import addAddress from '@/components/addAddress.vue'
import { buyOrder, getProductOrderInfo } from '@/api/Order'
import { getAddressList, delAddress } from '@/api/Address'
export default {
  name: "ConfirmOrder",
  data () {
    return {
      shoppingCartIdList: this.$route.query.shoppingCartIdList,
      addressList: [],
      dialogShow: false,
      addressId: '',
      // 刷新标识
      isReloadData: true,
      isReloadLoading: false,
      isFold: false,			// 是否折叠
      foldAddressData: [] // 被折叠住的地址数据
    }
  },
  components: { addAddress },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getData()
  },
  // 函数
  methods: {
    // 获取数据
    getData () {
      // 获取商品数据
      getProductOrderInfo({ shoppingCartIdList: this.shoppingCartIdList }).then(response => {
        console.log("getProductOrderInfo => response", response.data.data)

      })
      // 获取收货地址
      getAddressList().then(response => {
        this.addressList = response.data.data

        this.addressList.forEach(addressItem => {
          addressItem['selectAddressId'] = null
          if (addressItem.selectAddressId == null && addressItem.isDefault == true) {
            addressItem.selectAddressId = addressItem._id
          }
        })

        console.log("getAddressList => this.addressList", this.addressList)
        this.fold()
      })
    },
    addAddress () {
      this.dialogShow = true
    },
    dialogShowChange (val) {
      this.dialogShow = val
    },
    // 选择地址
    async selectAddress (addressItem, addressIndex) {
      this.isReloadLoading = true
      for (var i in this.addressList) {
        this.addressList[i].selectAddressId = null
      }
      this.addressId = this.addressList[addressIndex].selectAddressId = addressItem._id
      console.log("selectAddress => this.addressId", this.addressId)
      for (var a in this.addressList) {
        if (this.addressId == this.addressList[a].selectAddressId) {

          // function toFirst (arr, index) {
          //   if (index != 0) {
          //     arr.unshift(arr.splice(index, 1)[0])
          //   }
          // }

          this.addressList.unshift(this.addressList.splice(a, 1)[0])
        }
      }

      await this.reload()
      // await this.loading()
    },
    // 刷新当前页面，在修改数据之后 this.reload 一下就可以完成刷新当前这个指定标签的刷新
    async reload () {
      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      })
      setTimeout(() => {
        this.isReloadLoading = false

      }, 300);


    },
    fold () {
      if (this.isFold == false) {
        this.foldAddressData = this.addressList
        console.log("fold => this.foldAddressData", this.foldAddressData)
        this.addressList = this.foldAddressData.splice(0, 1)
        this.isFold = true
      } else {
        this.addressList = this.addressList.concat(this.foldAddressData)
        this.isFold = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.ConfirmOrder {
  ::v-deep .loading-icon {
    // font-size: 50px;
    margin: 0;
  }
  ::v-deep .el-icon-loading {
    font-size: 48px;
  }
}
</style>