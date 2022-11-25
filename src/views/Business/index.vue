<!--
 * @Author: 清羽
 * @Date: 2022-10-03 16:27:48
 * @LastEditTime: 2022-11-23 19:08:30
 * @LastEditors: you name
 * @Description: 店铺首页
-->
<!-- businessHome 页 -->
<template>
  <div>
    <div class="businessHome bg-gray-100 hidden md:block">

      <businessHeader />
      <!-- 头部logo 分类 end -->
      <!-- <businessHome /> -->

      <router-view></router-view>
      <!-- 首页 end -->

    </div>
    <!-- pc 端 -->

    <div class="md:hidden bg-gray-50 min-h-screen">
      <header class="">
        <back />
      </header>
      <main>
        <div>
          小米旗舰店
        </div>
        <!-- 店铺名称 -->

        <div class="px-2">
          <van-swipe
            class="my-swipe relative w-full md:hidden"
            :autoplay="3000"
            indicator-color="white"
          >
            <van-swipe-item
              v-for="(slideshowItem,slideshowIndex) in businessSlideshowList"
              :key="slideshowIndex"
            >
              <div class=" rounder-lg h-64 rounded-xl">
                <img
                  v-if="businessSlideshowList.length>0"
                  draggable="false"
                  :src="baseUrl+slideshowItem.slideshow_path"
                  class="object-cover mx-auto h-full rounded-xl"
                >
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 轮播图 end -->

        <div class="px-2 m-2 ">

          <div
            v-for="(showCategoryItem , showCategoryIndex) in showCategory"
            :key="showCategoryIndex"
          >
            <p class="font-bold text-black py-2 text-lg">
              {{showCategoryItem.cate_name}}
            </p>
            <div
              v-if="showCategoryItem.children.length>0"
              class="grid grid-cols-2 gap-2"
            >
              <div
                class="bg-white p-2"
                v-for="(productItem,productIndex) in showCategoryItem.children"
                :key="productIndex"
              >
                <p class="pb-2 text-black font-semibold text-sm">
                  {{productItem.name}}
                </p>
                <div class="w-36 h-36">
                  <img
                    :src="baseUrl+productItem.image"
                    class="h-full object-cover"
                  >
                </div>
              </div>
              <!-- 商品item end -->
            </div>

          </div>
          <!-- 分类组 end -->

        </div>
        <!-- 推荐 end -->
      </main>
    </div>
    <!-- app 端 -->
  </div>
</template>

<script>
import businessHeader from './components/header.vue'
import back from '@/components/appBack'
import { getBusinessSlideshow, getBusinessRecommendCategoryList, getBusinessCategoryList, getBusinessInfo } from '@/api/Business'
export default {
  name: "business",
  data () {
    return {
      businessId: this.$route.params.businessId,
      businessSlideshowList: [],  // 店铺轮播图
      baseUrl: this.$baseUrl,
      showCategory: [],  // 店铺推荐显示的分类列表
      categoryList: [],
      business: {} // 店铺信息
    }
  },
  components: { back, businessHeader },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getData()
  },
  // 函数
  methods: {
    async getData () {

      // this.$route.meta.title

      // console.log('this.$route =>', this.$route);

      await getBusinessInfo(this.businessId).then(response => {
        this.business = response.data.data
        console.log("awaitgetBusinessInfo => this.business", this.business)
      })

      // 获取店铺轮播图
      await getBusinessSlideshow(this.businessId).then(response => {
        this.businessSlideshowList = response.data.data
        console.log("awaitgetBusinessSlideshow => this.businessSlideshowList", this.businessSlideshowList)
        if (this.businessSlideshowList.length == 0) {
          this.businessSlideshowList = 2
        }
      }).catch(error => {
        if (error) {
          this.$router.replace({ path: '/' })
        }
      })
      // 获取店铺推荐分类列表
      await getBusinessRecommendCategoryList(this.businessId).then(response => {
        this.showCategory = response.data.data
      })

      // 获取店铺分类列表
      await getBusinessCategoryList(this.businessId).then(response => {
        this.categoryList = response.data.data
        console.log("awaitgetBusinessCategoryList => this.categoryList", this.categoryList)
      })

    },
    jumpProductInfo (productId) {
      this.$router.push({
        path: '/product/info/' + productId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.businessHome {
}
</style>