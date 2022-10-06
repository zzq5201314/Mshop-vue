<!--
 * @Author: 清羽
 * @Date: 2022-09-18 22:30:04
 * @LastEditTime: 2022-09-29 18:14:53
 * @LastEditors: you name
 * @Description: 
-->
<!-- index 页 -->
<template>
  <div class="index bg-gray-200">
    <div class="container mx-auto max-w-7xl py-5">
      <div
        class="bg-white rounded-2xl"
        v-if="shoppingCartData.length>0"
      >
        <div class="flex justify-between items-center border-b-2 p-5">
          <div class="text-xl text-black">
            购物车 (全部<span class="font-semibold">{{dataLength}}</span>)
          </div>
          <div>
            已选商品(不含运费)
            <span
              class="text-red-500 text-xl mx-2 font-normal">{{total_prices?total_prices.toFixed(2):'00.00'}}</span>
            <button
              class="bg-gray-400 text-white px-4 py-2 rounded-full tracking-widest"
              :class="{'bg-blue-500':checkedProduct.length>0,'cursor-not-allowed':checkedProduct.length<=0}"
              :disabled="checkedProduct.length<=0"
              @click="checkOut"
            >结算</button>
          </div>
        </div>
        <!-- 头部end -->

        <div class="flex p-5">
          <div class="flex-auto">

            <!-- <el-checkbox
              v-model="checkAll"
              label="全选"
              @change="handlerChange(0,null,null,$event)"
            ></el-checkbox> -->

            <el-checkbox
              label="全选"
              v-model="checkAll"
              @change="handlerChange(0, null, $event)"
            >
            </el-checkbox>

          </div>
          <div class="flex-auto w-96">商品信息</div>
          <div class="flex-auto">单价</div>
          <div class="flex-auto">数量</div>
          <div class="flex-auto">金额</div>
          <div class="flex-auto">操作</div>
        </div>
        <!-- 表头end -->

        <div
          class="p-5"
          v-for="item in shoppingCartData"
          :key="item._id"
        >
          <!-- <el-checkbox-group
          class="flex flex-col px-5"
          v-model="checkedBusiness"
          @change="selectBusiness"
        >
        </el-checkbox-group> -->

          <div class="flex">
            <el-checkbox
              :label="item._id"
              v-model="checkedBusiness"
              @change="handlerChange(1, item, $event)"
            >
              &#12288;
            </el-checkbox>
            <div> 店铺：{{item.name}}</div>
          </div>
          <div class="text-sm m-5 divide-y divide-light-blue-400">
            <div
              class="bg-gray-100 p-5 flex-auto productItem"
              v-for="(productItem, productIndex) in item.shopping_cart_list"
              :key="productIndex"
            >

              <div class="multi-check-item flex">
                <el-checkbox
                  v-model="checkedProduct"
                  @change="handlerChange(2, productItem, $event,item)"
                  :label="productItem._id"
                > &#12288;</el-checkbox>
                <!-- 选择按钮end -->
                <div class="flex flex-auto w-96">
                  <img
                    :src="baseUrl+productItem.specification.product_pic"
                    class="w-20 h-20 bg-cover bg-center mx-2"
                  />
                  <p class="mx-2 flex-1">
                    {{productItem.product_id.name}}
                  </p>
                  <p class="flex-initial">
                    {{productItem.specification.product_specs}}
                  </p>
                </div>
                <!-- 商品信息end -->

                <div
                  class="flex-1 flex justify-center text-gray-800 font-semibold"
                >
                  ￥{{productItem.specification.product_price}}
                </div>
                <!-- 单价end -->

                <div class="flex-1 flex justify-center">
                  <!-- {{productItem.product_num}} -->
                  <el-input-number
                    v-model="productItem.product_num"
                    @change="updateShoppingCart(productItem)"
                    :min="1"
                    :max="productItem.specification.product_stock"
                  ></el-input-number>
                </div>
                <!-- 数量end -->

                <div
                  class="flex-1 flex justify-center text-red-500 font-semibold"
                >
                  ￥{{(productItem.specification.product_price*productItem.product_num).toFixed(2)}}
                </div>
                <!-- 金额end -->

                <div class="flex-1 flex justify-center flex-col">
                  <button
                    class="transition duration-300 hover:text-blue-500"
                    @click="addCollect(productItem)"
                  >移入收藏</button>
                  <button
                    class="transition duration-300 hover:text-red-500"
                    @click="del(productItem,item._id)"
                  >删除</button>
                </div>
                <!-- 操作end -->
              </div>

            </div>
          </div>
        </div>

        <!-- 店铺end -->

      </div>

      <div
        v-else
        class="bg-white rounded-2xl min-h-screen flex items-center justify-center"
      >
        <el-empty description="购物车空啦">
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
import { getShoppingCartList, removeShoppingCart, updateShoppingCart } from '@/api/ShoppingCart'
import { addCollect } from '@/api/Collect'
export default {
  name: "index",
  data () {
    return {
      baseUrl: this.$baseUrl,
      checkAll: false,      // 全选
      shoppingCartData: [], //数据集合
      checkedBusiness: [], // 选中的店铺
      checkedProduct: [], // 选中的商品
      businessList: [],  // 全部的店铺id
      shoppingCartIdList: [],  // 全部商品id
      dataLength: null,
      total_prices: null,
    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.getShoppingCartList()
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  // 函数
  methods: {
    handleCheckAllChange (val) {
      // console.log("全选 => val", val)
      this.checkedBusiness = val ? this.businessList : [];
      // console.log("getShoppingCartList => this.business", this.checkedBusiness)
      // this.checkAll = val ? this.shoppingCartData : [];
    },
    selectBusiness (value) {
      // console.log("单选 => value", value)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.shoppingCartData.length;
      // console.log("getShoppingCartList => this.business", this.checkedBusiness)
    },
    checkOut () { // 结算
      console.log('结账了');
    },
    addCollect (productItem) { // 添加收藏
      const query = { type: 'product' }
      const data = { productId: productItem.product_id._id }
      addCollect(query, data).then(response => {
        this.$message({
          type: 'success',
          message: response.data.msg
        })
      })
    },
    async countMoney () {  // 计算总金额
      var total_arr = []
      this.total_prices = null
      if (this.checkedProduct.length == 0) {
        console.log("没有选择商品 => ")
        this.total_prices = null
        this.total_arr = []
      }
      this.checkedProduct.forEach((productItemId) => {

        this.shoppingCartData.forEach((businessItem) => {
          businessItem.shopping_cart_list.forEach((item) => {

            if (productItemId == item._id) {
              if (this.checkedProduct.length == 1) {

                console.log("选择了一个商品 => ")
                this.total_prices = item.product_num * item.specification.product_price

              }
              else {
                console.log("选择了多个商品 =>  计算总数 =>", item.product_num * item.specification.product_price)
                total_arr.push(item.product_num * item.specification.product_price)
              }
            }


          })
        })


        // if (this.checkedProduct.length > 1) {
        //   this.total_prices = total + total
        // }

      })



      total_arr.forEach((item) => {
        this.total_prices = this.total_prices + item
      })

    },
    async updateShoppingCart (productItem) { // 修改商品数量

      const { product_num, _id, specification } = productItem
      const query = { productNum: product_num, specification, shoppingCartId: _id }
      await updateShoppingCart(query).then(response => {
        this.countMoney()
      }).finally(() => {
      })
    },
    del (productItem, businessId) { // 删除
      if (productItem && businessId) {

        this.checkedProduct.remove(`${productItem._id}`)
        // this.total_prices = this.total_prices - (productItem.specification.product_price * productItem.product_num)
        this.countMoney()

        removeShoppingCart({ shoppingCartId: productItem._id, businessId }).then(response => {
          this.$message({
            type: 'success',
            message: response.data.msg
          })

          this.getShoppingCartList()
        })
      }
    },
    // $type -- 0:全选 1:选择了店铺 2:选择了商品
    // e -- 开关
    // $row  -- 选中的数据
    handlerChange ($type, $row, e, value) {  //  全选-选择店铺-选择商品
      // console.log("handlerChange => value", value)
      // console.log("handlerChange => e", e)
      // console.log("handlerChange => $row", $row)
      // console.log(" 店铺 =>", this.checkedBusiness)


      //数组对象定义一个函数
      Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      //得到这个元素的索引,数组自己固有的函数去删除这个元素
      Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };

      Array.prototype.pushNoRepeat = function () {
        for (var i = 0; i < arguments.length; i++) {
          var ele = arguments[i];
          if (this.indexOf(ele) == -1) {
            this.push(ele);
          }
        }
      };

      if ($type === 0) { // 全选
        this.checkedBusiness = e ? this.businessList : [];
        this.checkedProduct = e ? this.shoppingCartIdList : [];

        // if (e) {
        //   this.shoppingCartData.forEach((item) => {
        //     console.log("this.shoppingCartData.forEach => item", item)
        //     // item.shopping_cart_list.forEach((productItem) => {
        //     //   this.total_prices = this.total_prices + (productItem.product_num * productItem.specification.product_price)
        //     // })

        //   })
        // }
        // else {
        //   // this.shoppingCartData.forEach((item) => {
        //   //   item.shopping_cart_list.forEach((productItem) => {
        //   //     this.total_prices = this.total_prices - (productItem.product_num * productItem.specification.product_price)
        //   //   })

        //   // })
        // }
        // this.total_prices
      }

      else if ($type === 1) { // 选择店铺

        if (e) {
          this.checkedBusiness.pushNoRepeat($row._id)
          $row.shopping_cart_list.forEach((item) => {
            console.log("$row.shopping_cart_list.forEach => item", item)
            this.checkedProduct.pushNoRepeat(item._id)
            // this.total_prices = this.total_prices + (item.product_num * item.specification.product_price)
          })
        } else {
          this.checkedBusiness.remove($row._id)
          $row.shopping_cart_list.forEach((item) => {
            this.checkedProduct.remove(`${item._id}`)
            // this.total_prices = this.total_prices - (item.product_num * item.specification.product_price)
          })

        }

        let businessNum = null
        this.shoppingCartData.forEach((item) => {
          if (this.checkedBusiness.indexOf(item._id) == -1) {
            this.checkAll = false
          } else {
            businessNum++
          }
        })

        if (businessNum == this.shoppingCartData.length) {
          this.checkAll = true
        }

      }

      else if ($type === 2) { // 选择商品

        if (e) {
          this.checkedProduct.pushNoRepeat($row._id)
          // this.total_prices = this.total_prices + ($row.specification.product_price * $row.product_num)
        } else {
          //删除某个元素值
          this.checkedProduct.remove(`${$row._id}`)
          // this.total_prices = this.total_prices - ($row.specification.product_price * $row.product_num)
        }


        if (value) {

          let checkedCount = value.shopping_cart_list;
          let shoppingCartNum = null
          checkedCount.forEach(async (item) => {
            if (this.checkedProduct.indexOf(item._id) == -1) {
              await this.checkedBusiness.remove(value._id)
              this.checkAll = false
            } else {
              shoppingCartNum++
            }
          })

          if (shoppingCartNum == value.shopping_cart_list.length) {
            this.checkedBusiness.pushNoRepeat(value._id)
          }

          let allNum = null
          let checkNum = null
          this.shoppingCartData.forEach((item) => {
            item.shopping_cart_list.forEach((item) => {
              if (this.checkedProduct.indexOf(item._id) == -1) {
                this.checkAll = false
              } else {
                checkNum++
              }
              allNum++
            })

            if (allNum == checkNum) {
              this.checkAll = true
            }
          })

        }


      }

      console.log("商品 =>", this.checkedProduct)
      this.countMoney()
      // this.getShoppingCartList()
    },

    getShoppingCartList () { // 获取购物车列表
      getShoppingCartList().then(response => {
        this.shoppingCartData = response.data.data
        console.log("getShoppingCartList => this.shoppingCartData", this.shoppingCartData)
        this.dataLength = response.data.dataLength

        this.shoppingCartData.forEach((item) => {
          this.businessList.push(item._id)
          item.shopping_cart_list.forEach((product) => {
            this.shoppingCartIdList.push(product._id)
          })
        })
        // console.log("item.forEach => this.shoppingCartIdList", this.shoppingCartIdList)
        // for (var i in this.shoppingCartData) {
        // }
        // console.log("获取数据 this.business", this.businessList)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.index {
  .productItem {
  }
  .productItem:nth-child(1) {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }
  .productItem:last-child {
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
  }
  .multi-check-item {
    :deep .el-checkbox {
      .el-checkbox__label {
        // display: none;
        padding: 0;
      }
    }
  }
}
</style>