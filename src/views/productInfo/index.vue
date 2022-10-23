<!--
 * @Author: 清羽
 * @Date: 2022-09-14 10:47:00
 * @LastEditTime: 2022-10-23 19:10:29
 * @LastEditors: you name
 * @Description: 
-->
<!-- index 页 -->
<template>
  <div class="index container mx-auto max-w-7xl">
    <div class="flex justify-between">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div
        class="text-sm"
        v-if="productData.business"
      >
        <router-link
          :to="'/business/info/'+businessId"
          class="mx-2 cursor-pointer"
        >{{productData.business.company_name}}</router-link>
        <span class="mx-2 cursor-pointer">
          <i class="el-icon-star-on text-xl" />
          关注店铺
        </span>
      </div>
    </div>

    <div class="flex">
      <!-- <img
        src="https://res.vmallres.com/pimages//uomcdn/CN/pms/202209/gbom/6941487276684/group//800_800_F55EDC89E7E00574B05940F069CD15D2.png"
        alt=""
      > -->
      <!-- <el-carousel
          height="450px"
          width="450px"
        >
          <el-carousel-item
            v-for="(item,index) in productData.slider_image"
            :key="index"
          >
            
          </el-carousel-item>
        </el-carousel> -->

      <!-- <div
          class="spec-preview"
          v-if="productData.slider_image[0]!==undefined"
        >
          <img :src="baseUrl+productData.slider_image[0].img_url" />
          <div
            @mousemove="mouseMove"
            class="event absolute cursor-move"
          ></div>
          <div class="big absolute border-2 border-gray-600 m-0 p-0">
            <img
              class="m-0 p-0"
              ref="big"
              :src="baseUrl+productData.slider_image[0].img_url"
            />
          </div>
          <div
            class="mask w-1/2 h-1/2 absolute bg-gray-50 opacity-20 border"
            ref="mask"
          ></div>
        </div> -->

      <div class="h-full w-full">
        <el-carousel
          :interval="4000"
          height="400px"
        >
          <el-carousel-item
            class="flex items-center"
            v-for="(item,index) in productData.slider_image"
            :key=index
          >
            <el-image
              :src=baseUrl+item.img_url
              @click="onPreview(index,productData.slider_image)"
            >
            </el-image>
          </el-carousel-item>
          <elImageViewer
            v-if="showViewer"
            :on-close="closeViewer"
            :url-list=viewerImgList
            :z-index=3000
          >
          </elImageViewer>

          <!-- <el-image
            v-if="showViewer"
            :on-close="closeViewer"
            :url-list="viewerImgList"
            :z-index=3000
            :preview-src-list="viewerImgList"
          >
          </el-image> -->
        </el-carousel>

        <span
          class="cursor-pointer"
          :class="{'text-red-400':productData.collect}"
          @click="addCollect"
        >
          <i class="el-icon-star-on" />{{productData.collect?'已收藏':'收藏商品'}}
        </span>
      </div>
      <!-- 左侧商品轮播图end -->

      <div class="ml-6 w-full">
        <p class="text-2xl text-black my-2">{{productData.name}}</p>
        <!-- 商品名称end -->
        <span class=" flex flex-col bg-gray-100 px-2 py-4 my-2 ">
          <div class="flex items-center">
            <p class="tracking-widest text-sm">商品价格：</p>
            <p class="text-base text-red-600 ">￥</p>
            <p
              class="price text-red-600 text-2xl"
              v-if="productData.price"
            >
              {{productData.price.toFixed(2)}}</p>
          </div>
          <!-- 商品价格end -->

          <div class="flex items-center">
            <div class="tracking-widest text-sm">商品库存:</div>
            <div class="text-base ml-2">
              <span class="text-lg text-red-600">{{productData.stock}}</span>
              <span>{{productData.unit}}</span>
            </div>
          </div>
          <!-- 商品库存end -->

        </span>
        <!-- 商品信息end -->

        <div class="">
          <div
            v-for="(groupItem,groupIndex) in productData.sku"
            :key="groupIndex"
            class="grid layout gap-4 my-2"
          >
            <!-- checkedList[groupIndex]=>{{checkedList[groupIndex]}} -->
            <span
              class="text-xs flex items-center">选择{{groupItem.product_group_name}}
            </span>
            <div class="">
              <el-radio
                v-for="(keyItem,keyIndex) in groupItem.key"
                :key="keyIndex"
                v-model="checkedList[groupIndex].name"
                @change="select(keyItem._id,keyItem.product_key_name,groupIndex)"
                size="small"
                border
                :label="keyItem.product_key_name"
              >
              </el-radio>
            </div>
          </div>
        </div>
        <!-- 规格end -->

        <div class="my-2">
          <span class="text-xs">
            数量：
          </span>
          <el-input-number
            controls-position="right"
            v-model="productNum"
            :min="1"
            :max="productData.stock"
          ></el-input-number>
          {{productData.unit}}
        </div>
        <!-- 数量end -->

        <div class="text-xs layout grid gap-4 my-2">
          <span class="mr-6:">已选择商品:</span>
          <div>
            <span
              class="text-red-500 mx-1"
              v-for="(item,index) in checkedList"
              :key="index"
            >
              {{item.name}}
            </span>
          </div>
        </div>

        <div class="my-2">
          <button
            class="py-2 px-12 bg-yellow-500 text-white text-xl hover:text-yellow-500 hover:bg-white shadow-md rounded my-4 w-56 transition duration-300"
            @click="addShoppingCart"
          >加入购物车</button>
          <button
            class="py-2 px-12 bg-red-500 text-white text-xl hover:text-red-500 hover:bg-white shadow-md rounded mx-4 w-56 transition duration-300"
            @click="goConfirmOrder"
          >立即下单</button>
        </div>
      </div>
      <!-- 右侧商品规格名称等详情end -->
    </div>

    <el-divider></el-divider>

    <div v-html="productData.info"></div>
  </div>
</template>

<script>
import elImageViewer from 'element-ui/packages/image/src/image-viewer'
import { getProductInfo, getProductSpecification } from '@/api/productInfo'
import { addShoppingCart } from '@/api/ShoppingCart'
import { getToken } from '@/utils/auth'
import { addCollect, delCollect } from '@/api/Collect'
// import { data, province, city, area, town } = require('province-city-china/data');

export default {
  name: "index",
  data () {
    return {
      productId: this.$route.params.productId,
      productData: {},
      baseUrl: this.$baseUrl,
      showViewer: false,
      viewerImgList: [],
      checkedList: [], // 选择了的【规格项】数组
      productNum: 1,
      specificationId: null, // 规格id
      businessId: null
    }
  },
  components: { elImageViewer },
  computed: {
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.getProductData()
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },

  // 函数
  methods: {
    async getProductData () { // 获取商品数据
      await getProductInfo(this.productId).then(response => {
        this.productData = response.data.data
        console.log("getProductInfo => this.productData", this.productData)
        for (const i in this.productData.sku) {
          this.checkedList.push({ name: null })
        }
        // console.log("getProductInfo => this.checkedList", this.checkedList)
        this.businessId = this.productData.business._id
        // const { data, province, city, area, town } = require('province-city-china/data');
        // console.log("awaitgetProductInfo => province", province)
        // console.log("awaitgetProductInfo => city", city)
      })
    },
    //打开查看器
    onPreview (index, list) {
      this.showViewer = true
      let tempImgList = [...list];
      let temp = [];

      if (list.length = 1) {
        const img = tempImgList.shift().img_url
        this.viewerImgList[0] = this.baseUrl + img
      } else {
        for (let i = 0; i < index; i++) {
          temp.push(this.baseUrl + tempImgList.shift().img_url);
        }
        this.viewerImgList = tempImgList.concat(temp);
      }
    },
    // 关闭查看器
    closeViewer () {
      this.showViewer = false
    },

    async select (keyId, keyName, index) {  // 选择商品规格值
      console.log("select => 选择商品规格值")
      var count = null  // 计算已选择了几个项
      for (var i in this.checkedList) { // 循环已选择的规格项数组
        if (this.checkedList[i].name !== null) {  // 如果，选择了的【规格项】数组里有名字为空，则表示没有选完全部规格。非空则表示有选择
          count = count + 1
        }
      }
      if (count == this.productData.sku.length) { // 判断是否选择完全部规格项
        console.log('相同');
        const data = []
        for (var i in this.checkedList) {
          data.push(this.checkedList[i].name)
        }
        // console.log("select => productSpecs", data)
        this.getProductSpecification(data)
      }
      this.checkedList[index].name = keyName
    },


    getProductSpecification (productSpecs) { //获取商品规格值
      const data = { productSpecs, productId: this.productId }
      getProductSpecification(data).then(response => {
        const specificationData = response.data.data
        // console.log("getProductSpecification => specificationData", specificationData)
        const price = parseFloat(specificationData.product_price) // 规格值价格String类型修改
        const imgList = []
        for (var i in specificationData.product_slider_image) {  // 循环规格值轮播图，让其统一
          imgList.push({ img_url: specificationData.product_slider_image[i] })

        }
        this.productData.price = price
        this.productData.slider_image = imgList
        this.productData.stock = specificationData.product_stock
        this.specificationId = specificationData._id
      })

    },

    // 添加购物车
    addShoppingCart () {
      const hasToken = getToken()
      if (!hasToken) { // 判断是否登录
        this.$router.push({
          path: `/login`
        })
        this.$message({
          type: 'error',
          message: '请先登录'
        })
      }
      else if (!this.specificationId) { // 判断是否选择商品规格
        this.$message({
          type: 'error',
          message: '请选择商品规格'
        })
      } else {
        const data = {
          productId: this.productId,
          specification: this.specificationId,
          productNum: this.productNum,
          businessId: this.businessId
        }
        addShoppingCart(data).then(response => {
          // console.log("addShoppingCart => response", response)
          this.$message({
            type: 'success',
            message: response.data.msg
          })

        })
      }
    },

    // 立即购买
    goConfirmOrder () {
      const hasToken = getToken()
      if (!hasToken) { // 判断是否登录
        this.$router.push({
          path: `/login`
        })
        this.$message({
          type: 'error',
          message: '请先登录'
        })
      }
      else if (!this.specificationId) { // 判断是否选择商品规格
        this.$message({
          type: 'error',
          message: '请选择商品规格'
        })
      } else {
        const temp_obj = {
          product_id: this.productId,
          business_id: this.productData.business._id,
          num: this.productNum,
          specification_id: this.specificationId,
        }
        this.$router.push({
          name: 'confirmOrder',
          query: { productInfo: temp_obj }
        })
        console.log("goConfirmOrder => temp_obj", temp_obj)
      }
    },

    addCollect () { // 添加收藏

      if (!this.productData.collect) {
        const query = { type: 'product' }
        const data = { productId: this.productId }
        addCollect(query, data).then(response => {
          this.$message({
            type: 'success',
            message: '收藏成功'
          })
          this.getProductData()
        })
      } else {
        delCollect({ collectId: this.productData.collect }).then(response => {
          this.$message({
            type: 'success',
            message: '取消成功'
          })
          this.getProductData()
        })

      }

    },
  }

}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.index {
  .layout {
    grid-template-columns: 0.2fr 1.5fr;
  }
  ::v-deep .is-bordered {
    margin: 0;
  }
  ::v-deep .el-radio {
    padding-right: 2rem;
    padding-left: 2rem;

    .el-radio__input {
      display: none;
    }
    .el-radio__label {
      padding: 0;
    }
  }

  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      top: 0;
      left: 0;
      // display: none;
      display: block;
    }

    .big {
      width: 100%;
      height: 100%;
      top: 0;
      left: 100%;
      overflow: hidden;
      z-index: 998;
      // display: none;
      display: block;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
      display: block;
    }
  }
}
</style>