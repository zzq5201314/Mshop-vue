<!--
 * @Author: 清羽
 * @Date: 2022-10-08 14:46:20
 * @LastEditTime: 2022-10-28 20:46:16
 * @LastEditors: you name
 * @Description: 确认订单
-->
<!-- ConfirmOrder 页 -->
<template>
  <div class="bg-gray-100 md:bg-white">
    <div class="ConfirmOrder bg-gray-100 h-full py-5 hidden md:block">
      <div class=" container mx-auto max-w-7xl space-y-10 ">
        <header class="bg-white p-8 rounded-xl">

          <div
            class="space-y-5"
            v-if="addressList.length==0"
          >
            <span class="text-lg text-black">收货地址</span>
            <div
              @click="openAddress()"
              class="h-20 w-3/5 flex items-center justify-center border text-sm cursor-pointer hover:border-black"
            ><i class="el-icon-plus text-black font-bold mx-1" />新增收货地址</div>
          </div>
          <!-- 有地址数据 end -->

          <div
            class="space-y-5"
            v-else
          >
            <div class="flex justify-between ">
              <span class="text-lg text-black">收货地址</span>
              <span
                class="border px-4 text-sm py-1 cursor-pointer hover:bg-black hover:text-white group"
                @click="openAddress()"
              ><i
                  class="el-icon-plus text-black font-bold mx-1 group-hover:text-white" />
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
                class=" border space-y-2 h-full relative group cursor-default select-none"
                :class="{
							'border-red-600':addressItem.selectAddressId===addressItem._id,
							'cursor-pointer':addressItem.selectAddressId===null,
							'hover:border-gray-600':addressItem.selectAddressId===null,
							}"
                @click.prevent="selectAddress(addressItem,addressIndex)"
              >
                <div class="p-6">
                  <div>
                    <span
                      class="mr-6 text-black">{{addressItem.addressee}}</span>
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
                  <span
                    class="hover:text-red-600 cursor-pointer"
                    v-if="addressItem.isDefault===false"
                    @click.stop="setDefaultAddress(addressItem._id)"
                  >设置为默认</span>
                  <span
                    class="hover:text-red-600 cursor-pointer"
                    @click.stop="openAddress(addressItem)"
                  >修改</span>
                  <span
                    class="hover:text-red-600 cursor-pointer"
                    @click.stop="handleDelete(addressIndex,addressItem)"
                  >删除</span>
                </div>
              </div>

              <div
                class="cursor-pointer text-sm"
                v-if="isFold==true"
                @click="fold"
              >查看全部地址 <i class="el-icon-arrow-down ml-2" /></div>
              <div
                class="cursor-pointer text-sm"
                v-else
                @click="fold"
              >收起地址<i class="el-icon-arrow-up ml-2" />
              </div>
            </div>
          </div>
          <!-- 没地址数组 end -->
        </header>

        <div
          v-if="productList.length>0"
          class="bg-white p-8 rounded-xl flex"
          :class="{'h-72':productList.length==1}"
        >
          <div>
            <div
              class="flex space-x-6 border h-36 text-black"
              v-for="(productItem,productIndex) in productList"
              :key="productIndex"
            >
              <span
                class="w-40 flex items-center justify-center"
                v-if="productItem"
              >
                <img
                  class="w-36"
                  :src="baseUrl+productItem.specification.product_pic"
                >
              </span>
              <!-- 商品图片end -->
              <span
                class="w-80 py-6"
                v-if="productItem"
              >{{productItem.product_id.name}}</span>
              <!-- 商品名称end -->
              <span
                v-if="productItem"
                class="w-44 text-sm py-6"
              >{{productItem.specification.product_specs}}</span>
              <!-- 商品规格end -->
              <span
                class="w-8 text-sm py-6"
                v-if="productItem"
              >X{{productItem.product_num}}</span>
              <!-- 商品数量end -->
              <span
                v-if="productItem"
                class="w-24 text-sm py-6"
              >￥{{(productItem.specification.product_price*productItem.product_num).toFixed(2)}}</span>
              <!-- 商品金额end -->
            </div>
          </div>
          <!-- 商品列表--左 end -->

          <div class="bg-gray-100 w-full relative border border-l-0">
            <div class="absolute bottom-0 left-0 p-6 w-full space-y-2">

              <div class="flex space-x-2">
                <div class=" text-right w-3/5">商品总金额：</div>
                <div class=" text-right w-full">￥{{sumMoney.toFixed(2)}}</div>
              </div>

              <div class="flex space-x-2">
                <div class=" text-right w-3/5">运费：</div>
                <div class=" text-right w-full">￥{{freightMoney.toFixed(2)}}
                </div>
              </div>

              <div class="flex space-x-2">
                <div class=" text-right text-xl text-black w-3/5">应付金额：</div>
                <div class=" text-right text-2xl text-red-700 font-bold w-full">
                  ￥{{sumMoney.toFixed(2)}}</div>
              </div>

              <div
                class="bg-red-700 text-white px-16 py-4 text-xl text-center cursor-pointer"
                @click="submitOrder"
              >
                提交订单</div>

            </div>
          </div>
          <!-- 商品订单右边--商品信息 end -->

        </div>
      </div>

      <div v-if="dialogShow">
        <addAddress
          :dialogShow="dialogShow"
          :alterAddressFrom="alterAddressFrom"
          @dialogShowChange="dialogShowChange"
          @addOk="addOk"
        />
      </div>
    </div>

    <div class="md:hidden">
      <header class="flex items-center text-black font-medium text-xl">
        <back />
        <div>{{title}}</div>
      </header>

      <div
        class="flex p-3 bg-white mx-3 mt-3 rounded-lg space-x-2 items-center">
        <div class="w-1/12">
          <i
            class="el-icon-location text-white text-sm bg-gradient-to-r to-red-500 from-yellow-500 rounded-full w-6 h-6 flex items-center justify-center " />
        </div>
        <div
          class="w-full"
          v-if="addressList[0]"
        >
          <div class="font-normal text-black text-sm">
            {{addressList[0].province}} {{addressList[0].city}}
            {{addressList[0].area}} {{addressList[0].detailAddress}}</div>
          <div class="text-xs">{{addressList[0].addressee}}
            {{addressList[0].phone}}</div>
        </div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <!-- 地址信息 end -->

      <div>
        <div
          class="bg-white p-3 mx-3 mt-3 rounded-lg"
          v-for="(productItem,productIndex) in productList"
          :key="productIndex"
        >
          <div class="flex items-center">
            <div class="w-7 h-7 ">
              <img
                :src="baseUrl+productItem.business_id.company_logo"
                class="h-full w-full object-cover rounded-full"
              >
            </div>
            <div>{{productItem.business_id.company_name}}</div>
          </div>
          <!-- 店铺 end -->
          {{productItem}}
          <div class="flex ">
            <div>商品图片</div>
            <div>
              <p>商品名称</p>
              <p>商品规格</p>
            </div>
            <div>
              <p>￥商品价格</p>
              <p>X 商品数量</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品信息 end -->
    </div>
  </div>
</template>

<script>
import addAddress from '@/components/addAddress.vue'
import { getProductInfo, getProductSpecification } from '@/api/productInfo'
import { buyOrder, getProductOrderInfo } from '@/api/Order'
import { getAddressList, delAddress, setDefaultAddress } from '@/api/Address'
import back from '@/components/appBack'
export default {
  name: "ConfirmOrder",
  data () {
    return {
      baseUrl: this.$baseUrl,
      shoppingCartIdList: this.$route.query.shoppingCartIdList,
      addressList: [],
      dialogShow: false,
      addressId: '',  // 选中的地址id
      // 刷新标识
      isReloadData: true,
      isReloadLoading: false,
      isFold: false,			// 是否折叠  true:折叠起来 , false：展开
      foldAddressData: [], // 被折叠住的地址数据
      productList: [],   // 商品数组
      sumMoney: 0,   // 总金额
      freightMoney: 0,
      alterAddressFrom: {},
      order: [],
      productInfo: this.$route.query.productInfo,
      title: this.$route.meta.title,
      appProductList: new Array
    }
  },
  components: { addAddress, back },
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
    async getData () {
      if (this.shoppingCartIdList) {      // 购物车--结算 跳转过来的
        if (this.shoppingCartIdList.length > 0) {
          // 获取商品数据
          await getProductOrderInfo({ shoppingCartIdList: this.shoppingCartIdList }).then(response => {
            this.productList = response.data.data

          })
        }
      } else if (this.productInfo.constructor === Object) {  // 商品页立即下单 跳转过来的
        await getProductOrderInfo({ productInfo: this.productInfo }).then(response => {
          this.productList = response.data.data
        })
      } else {
        this.$router.push({
          path: `/`
        })
      }

      // console.log("getProductInfo => this.productInfo", this.productInfo)
      await this.getAddressList()
      this.countMoney()

      console.log("awaitgetProductOrderInfo => this.productList", this.productList)
      this.appProductList = []
      let productList = this.productList
      productList.forEach(async (productItem, index) => {
        if (index == 0) {
          this.appProductList.push({
            business: productList[index].business_id,
            product: [productList[index]]
          })
          // const obj = JSON.parse(JSON.stringify(this.appProductList[index]))
          // obj.business.product = new Array
          // await obj.business.product.push(JSON.parse(JSON.stringify(productList[index])))
          // this.appProductList[index] = obj

          // this.appProductList[index].business.product = new Array
          // this.appProductList[index].business.product.push(productList[index])
        }
        else {
          this.appProductList.forEach((_Item, _index) => {
            if (_Item.business._id == productList[index].business_id._id) {
              _Item.product.push(productList[index])
            } else {
              console.log('添加店铺');
              console.log("index ", index)
              this.appProductList.push({
                business: productList[index].business_id,
                product: [productList[index]]
              })
              // this.appProductList.push({
              //   business: productList[index].business_id,
              //   product: [productList[index]]
              // })
              // console.log("productList.forEach => productList[index]", productList[index])
            }
          })

        }

      })

      // for (var i = 0; i < productList.length; i++) {
      //   if (i == 0) {
      //     this.appProductList.push({
      //       business: this.productList[i].business_id
      //     })

      //     console.log("getData => productList[i]", productList[i])
      //     const obj = productList[i]
      //     console.log("getData => obj", obj)
      //     this.appProductList[i].business['product'] = new Array
      //     this.appProductList[i].business['product'].push(JSON.parse(JSON.stringify(obj)))
      //     // this.appProductList[i].business['product'].push(productList[i])
      //     // this.appProductList[i].business['product'].push(productList[i]) 
      //   } else {

      //     // const temp_arr = this.productList
      //     // const temp_obj = temp_arr.splice(1, i)

      //     // if (this.productList[i].business_id._id == this.appProductList[i].business._id) {
      //     //   this.appProductList[i].business['product'].push(productList[i])
      //     // }
      //     // else {
      //     //   this.appProductList.push({
      //     //     business: this.productList[i].business_id
      //     //   })
      //     //   this.appProductList[i].business['product'] = []
      //     //   this.appProductList[i].business['product'].push(productList[i])
      //     // }
      //   }
      // }
      console.log("getData => this.appProductList", this.appProductList)
    },

    // 获取收货地址
    async getAddressList (value) {  // value :验证是否需要执行折叠  true:不需要执行折叠 \ 其余的要执行
      this.foldAddressData = []  // 初始化折叠的数据
      await getAddressList().then(response => {
        this.addressList = response.data.data
        var count = 0
        this.addressList.forEach(addressItem => {  // 循环高亮默认收货地址 
          addressItem['selectAddressId'] = null
          if (addressItem.selectAddressId == null && addressItem.isDefault == true) {
            this.addressId = addressItem.selectAddressId = addressItem._id
          } else {   // 没有默认地址
            count++
          }
        })
        if (count == this.addressList.length) {  // 当数组里没有默认收货地址的数长度等于总数组长度，代表没有默认数组，就高亮第一个数据
          this.addressId = this.addressList[0].selectAddressId = this.addressList[0]._id
        }

        // console.log("getAddressList => this.addressList", this.addressList)
        // console.log('this.addressId => ', this.addressId);
        if (value !== true) {  // 折叠起来的
          // console.log('执行了');
          this.fold()
        }
      })

    },
    // 打开添加地址窗口
    openAddress (addressItem) {
      // console.log("openAddress => addressItem", addressItem)
      if (addressItem) {
        this.alterAddressFrom = addressItem
        // console.log("openAddress => this.alterAddressFrom", this.alterAddressFrom)
      }
      this.dialogShow = true
    },
    // 退出添加地址窗口
    dialogShowChange (val) {
      this.dialogShow = val
      this.alterAddressFrom = {}
    },
    // 添加地址成功
    async addOk () {
      // 判断 当前是否折叠起来  如果折叠起来，就展开--如果展开，则保持展开
      if (this.isFold == true) {  // 折叠起来了
        // console.log("addOk => this.isFold  =>  折叠起来了")
        this.getAddressList()
      } else { // 打开了的
        // console.log("addOk => this.isFold  =>  展开起来了")
        this.getAddressList(true)
      }
    },
    // 选择地址
    async selectAddress (addressItem, addressIndex) {
      if (addressIndex !== 0) {
        this.isReloadLoading = true
        for (var i in this.addressList) {
          this.addressList[i].selectAddressId = null
        }
        this.addressId = this.addressList[addressIndex].selectAddressId = addressItem._id
        // console.log("selectAddress => this.addressId", this.addressId)
        for (var a in this.addressList) {
          if (this.addressId == this.addressList[a].selectAddressId) {

            this.addressList.unshift(this.addressList.splice(a, 1)[0])
          }
        }

        await this.reload()
      }
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
    // 折叠 收货地址
    fold () {
      if (this.isFold == false) {  // 折叠
        // console.log("fold => this.isFold => 折叠起来了")
        this.foldAddressData = this.addressList
        this.addressList = this.foldAddressData.splice(0, 1)
        this.isFold = true
      } else if (this.isFold == true) {   // 展开
        // console.log("fold => this.isFold => 展开了")
        this.addressList = this.addressList.concat(this.foldAddressData)
        this.isFold = false
      }
    },
    // 删除 -- 收货地址
    async handleDelete (index, row) {

      console.log(index, row);
      const data = { addressId: row._id }
      // console.log("handleDelete => row._id", row._id)
      await delAddress(data).then(response => {
        this.$message({
          type: 'success',
          message: response.data.msg
        })

        if (index == 0) {
          console.log("handleDelete => index", index)
          this.addressId = this.addressList[index + 1]._id
        }
      })
      await this.getAddressList(true)
    },
    // 计算总金额 -- 运费 -- 订单
    countMoney () {
      console.log('计算总金额');
      this.productList.forEach(productItem => {
        this.freightMoney = this.freightMoney + Number(productItem.product_id.postage)
        this.sumMoney = this.sumMoney + (productItem.specification.product_price * productItem.product_num)

      })

    },
    // 提交订单
    submitOrder () {
      this.order = []
      this.productList.forEach(productItem => {
        const temp_obj = {
          product_id: productItem.product_id._id,
          business_id: productItem.business_id._id,
          num: productItem.product_num,
          specification_id: productItem.specification._id,
          shopping_cart_id: productItem._id
        }
        this.order.push(temp_obj)
      })
      const data = {
        addressId: this.addressId,
        order: this.order
      }
      buyOrder(data).then(response => {
        this.$message({
          type: 'success',
          message: response.data.msg
        })

      })
    },
    // 设置默认收货地址
    setDefaultAddress (addressId) {
      console.log("setDefaultAddress => addressId", addressId)
      setDefaultAddress({ addressId }).then(response => {
        this.$message({
          type: 'success',
          message: response.data.msg
        })
        this.getAddressList()
      })
    },
    // 修改地址信息
    alterAddress (addressItem) {
      console.log("alterAddress => addressItem", addressItem)
      this.dialogShow = true
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

.onlyRead {
  pointer-events: none;
}
</style>