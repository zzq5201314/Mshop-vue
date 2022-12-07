<!--
 * @Author: 清羽
 * @Date: 2022-09-14 10:47:00
 * @LastEditTime: 2022-12-07 16:23:49
 * @LastEditors: you name
 * @Description: 
-->
<!-- index 页 -->
<template>
  <div class="index container mx-auto max-w-7xl">
    <div class="hidden md:block">
      <div class="flex justify-between mt-2">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>" {{productData.name}} "</el-breadcrumb-item>
        </el-breadcrumb>
        <div
          class="text-sm"
          v-if="productData.business"
        >
          <router-link
            :to="'/business/'+businessId"
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
    <!-- pc端 end -->

    <div class="md:hidden bg-gray-100 min-h-screen">

      <header class="flex items-center bg-gray-100 sticky top-0 z-50">
        <back />
      </header>
      <!-- 头部 end -->

      <div>
        <van-swipe @change="onChange">
          <van-swipe-item
            v-for="(item,index) in productData.slider_image"
            :key=index
          >
            <img
              :src="baseUrl+item.img_url"
              class="h-72 w-full object-cover"
            >
          </van-swipe-item>
          <template #indicator>
            <div
              class="absolute bottom-3 right-3 bg-black rounded-full px-2 bg-opacity-25 text-white text-xs"
            >
              {{ current + 1 }}/{{amount}}</div>
          </template>
        </van-swipe>
      </div>
      <!-- 轮播图 end -->

      <div class=" bg-white rounded-lg p-3 m-2">
        <p class="text-red-500 text-2xl font-bold">
          <span class="text-xs">￥</span>{{productData.price}}
        </p>
        <p class="text-black font-semibold">{{productData.name}}</p>
      </div>
      <!-- 价格/名字 end -->

      <div class="bg-white rounded-lg p-3 m-2 text-xs space-y-2">
        <div class="flex">
          <span class="w-8 mr-3">选择</span>
          <div class=" text-black w-full flex justify-between">
            <span>颜色分类</span>
            <span><i class="el-icon-arrow-right text-gray-400"></i></span>
          </div>
        </div>
        <div class="flex">
          <div class="w-8 mr-3">发货</div>
          <div class="w-full text-black">
            <div class="flex">
              <div class="w-full flex divide-x ">
                <div class="pr-3">广东东莞</div>
                <div class="pl-3">快递：免运费</div>
              </div>
              <div class="w-3/12 text-right text-gray-400">销量 31</div>
            </div>
            <div class="mt-1">现货，付款后48小时内发货</div>
          </div>
        </div>
      </div>

      <div class="flex justify-center my-2">
        <van-divider
          class="w-2/3 "
          style="margin:0;"
        >
          <div class="text-xs text-gray-700">宝贝详情</div>
        </van-divider>
      </div>
      <!-- <div v-if="!productData.info">&nbsp;</div> -->
      <div
        v-html="productData.info"
        :style="{marginBottom:tabH}"
      ></div>
      <van-goods-action ref="tab">
        <van-goods-action-icon
          icon="shop-o"
          text="店铺"
          color="#ee0a24"
          :to="'/business/'+businessId"
        />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :to="{name:'shoppingCartList'}"
        />
        <van-goods-action-icon
          :icon="productData.collect?'star':'star-o'"
          :text="productData.collect?'已收藏':'收藏'"
          :color="productData.collect?'#ff5000':''"
          @click="addCollect"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="buyPopupShow('addShoppingCart')"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="buyPopupShow('buy')"
        />
      </van-goods-action>

      <van-popup
        round
        v-model="skuShow"
        position="bottom"
        closeable
        close-icon="close"
        :style="{ height: '60%' }"
      >
        <div class="">
          <div class="flex p-2 space-x-3">
            <img
              :src="baseUrl+productData.image"
              class="w-20 h-20 object-cover"
            >
            <div
              class="text-red-600 font-bold text-xl"
              v-if="productData.price"
            ><span class="text-xs">￥</span>{{productData.price.toFixed(2)}}
              <div class="text-xs text-gray-500 font-medium">
                库存：{{productData.stock}}
              </div>
            </div>

          </div>
          <!-- 顶部商品价格/图片 end -->
          <div class="p-2">
            <div
              v-for="(skuGroupItem,skuGroupIndex) in productData.sku"
              :key="skuGroupIndex"
              class="py-2 flex text-xs items-center"
            >
              <label class="text-black w-9 pr-1">
                {{skuGroupItem.product_group_name}}
              </label>
              <div class="flex space-x-3 items-center">
                <div
                  :class="{}"
                  v-for="(keyItem,keyIndex) in skuGroupItem.key"
                  :key="keyIndex"
                >
                  <span
                    class="bg-gray-100 px-3 text-black rounded-3xl h-7 flex items-center"
                    @click="select(keyItem._id,keyItem.product_key_name,skuGroupIndex)"
                    :class="[
                    checkedList.map(item=>{ return item.name}).indexOf(keyItem.product_key_name) !== -1?'bg-red-100':'',
                    checkedList.map(item=>{ return item.name}).indexOf(keyItem.product_key_name) !== -1?'text-red-600':'',
                    checkedList.map(item=>{ return item.name}).indexOf(keyItem.product_key_name) !== -1?'bg-opacity-60':''
                    ]"
                  >
                    <!-- {{checkedList.map(item=>{ return item.name}).indexOf(keyItem.product_key_name) !== -1}} -->
                    {{keyItem.product_key_name}}
                  </span>
                </div>
                <!-- 规格选项 按钮  end-->
              </div>
            </div>
            <!-- 商品规格 end -->
            <div class="flex h-9 items-center">
              <label class="text-black w-9 pr-1 text-xs">
                数量
              </label>
              <div>
                <van-stepper
                  v-model="productNum"
                  theme="round"
                  :max="productData.stock"
                  button-size="22"
                  disable-input
                />
              </div>
            </div>
            <!-- 数量 end -->
          </div>
          <!-- 商品规格and数量 end -->

          <div class="mb-2 absolute w-full bottom-0">
            <div
              class="mx-auto w-10/12 text-center bg-red-500 text-white rounded-3xl py-1"
              @click="notarize"
            >确认
            </div>
          </div>
        </div>

      </van-popup>
    </div>

  </div>
</template>

<script>
import back from '@/components/appBack.vue'
import elImageViewer from 'element-ui/packages/image/src/image-viewer'
import { getProductInfo, getProductSpecification } from '@/api/productInfo'
import { addShoppingCart } from '@/api/ShoppingCart'
import { getToken } from '@/utils/auth'
import { addCollect, delCollect } from '@/api/Collect'
import { mapGetters } from 'vuex'
import { Toast } from 'vant';
import { msg } from '@/assets/js/msg'
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
      businessId: null,
      current: 0, // 当前轮播图索引
      amount: 0, // 轮播图总长度
      tabH: '', // tab高度
      skuShow: false, // app端的规格显示
      appButtonValidate: ''
    }
  },
  components: { elImageViewer, back },
  computed: {
    ...mapGetters([
      'innerWidth',
    ])
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.getProductData()
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.$nextTick(() => {
      this.tabH = this.$refs.tab.$el.offsetHeight + 'px'
      // console.log("this.$nextTick => this.tabH", this.tabH)
    })

    console.log(this._data);
  },

  // 函数
  methods: {
    async getProductData () { // 获取商品数据
      await getProductInfo(this.productId).then(response => {
        this.productData = response.data.data
        this.amount = this.productData.slider_image.length
        this.productData.sku.forEach((item) => {
          this.checkedList.push({ name: null })
        })
        // console.log("getProductInfo => this.checkedList", this.checkedList)
        this.businessId = this.productData.business._id
        // 修复富文本里图片请求地址
        this.productData.info = this.productData.info.replace(new RegExp('http://localhost:3003', 'g'), this.baseUrl)
        // console.log("awaitgetProductInfo => this.baseUrl", this.baseUrl)
        // console.log("awaitgetProductInfo => this.productData.info", this.productData.info)
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
      // console.log("select => index", index)
      // console.log("select => keyId", keyId)
      // console.log("select => keyName", keyName)
      // console.log('库存 =>', this.productData.stock);
      // console.log("select => 选择商品规格值")
      // console.log("select => this.productData.sku.length", this.productData.sku.length)
      this.checkedList[index].name = keyName
      var count = 0  // 计算已选择了几个项
      // console.log("select => this.checkedList", this.checkedList)
      this.checkedList.forEach((item) => { //循环已选择的规格项数组
        if (item.name !== null) {  // 如果，选择了的【规格项】数组里有名字为空，则表示没有选完全部规格。非空则表示有选择
          count = count + 1
          // console.log('成立');
        }
      })
      // for (var i in this.checkedList) { // 循环已选择的规格项数组
      //   console.log("select => i", i)
      //   if (this.checkedList[i].name !== null) {  // 如果，选择了的【规格项】数组里有名字为空，则表示没有选完全部规格。非空则表示有选择
      //     console.log('成立');
      //     count = count + 1
      //   }
      // }
      if (count == this.productData.sku.length) { // 判断是否选择完全部规格项
        console.log('全选中了');
        const data = []
        this.checkedList.forEach((item) => {
          data.push(item.name)
        })
        // for (var i in this.checkedList) {
        //   data.push(this.checkedList[i].name)
        // }
        this.getProductSpecification(data)
      }

      // console.log("select => this.checkedList", this.checkedList)

    },


    getProductSpecification (productSpecs) { //获取商品规格值
      const data = { productSpecs, productId: this.productId }
      getProductSpecification(data).then(response => {
        const specificationData = response.data.data
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
        msg('请先登录', 'error')
      }
      else if (!this.specificationId) { // 判断是否选择商品规格
        msg('请选择商品规格', 'error')
      } else {
        const data = {
          productId: this.productId,
          specification: this.specificationId,
          productNum: this.productNum,
          businessId: this.businessId
        }
        addShoppingCart(data).then(response => {
          // console.log("addShoppingCart => response", response)
          console.log('添加成功');
          msg('添加成功，在购物车等亲哦~', 'success')
          // Toast.success('成功文案');
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
        msg('请先登录', 'error')
      }
      else if (!this.specificationId) { // 判断是否选择商品规格
        msg('请选择商品规格', 'error')
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


      const hasToken = getToken()
      if (!hasToken) { // 判断是否登录
        this.$router.push({
          path: `/login`
        })
        msg('请先登录', 'error')
      }
      else {
        // 判断是否已经在收藏列表里
        if (!this.productData.collect) {
          const query = { type: 'product' }
          const data = { productId: this.productId }
          addCollect(query, data).then(response => {
            msg('收藏成功', 'success', 'pc')
            this.getProductData()
          })
        } else {
          delCollect({ collectId: this.productData.collect }).then(response => {
            msg('取消成功', 'success', 'pc')
            this.getProductData()
          })

        }
      }

    },

    // 滑动轮播图
    onChange (index) {
      this.current = index;
    },

    // 弹出规格选择
    buyPopupShow (value) {
      this.skuShow = true
      this.appButtonValidate = value
    },

    // app 弹出窗口的确认
    notarize () {
      if (this.appButtonValidate == 'addShoppingCart') {
        this.addShoppingCart() // 添加购物车
      } else if (this.appButtonValidate == 'buy') {
        this.goConfirmOrder() // 立即购买
      }
    }

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