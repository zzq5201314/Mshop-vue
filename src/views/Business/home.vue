<!--
 * @Author: 清羽
 * @Date: 2022-10-03 16:27:48
 * @LastEditTime: 2022-11-25 20:06:59
 * @LastEditors: you name
 * @Description: 店铺首页
-->
<!-- businessHome 页 -->
<template>
  <div>
    <el-carousel
      height="550px"
      class="mx-auto "
    >
      <el-carousel-item
        v-for="(slideshowItem,slideshowIndex) in businessSlideshowList"
        :key="slideshowIndex"
      >
        <img
          v-if="businessSlideshowList.length>0"
          draggable="false"
          :src="baseUrl+slideshowItem.slideshow_path"
          class="w-full bg-cover"
        >
        <p
          v-else
          class="w-full h-full flex items-center justify-center text-xl"
        >暂无设置轮播图</p>
      </el-carousel-item>

    </el-carousel>
    <!-- 轮播图ned -->

    <div class="container mx-auto max-w-5xl">
      <div
        v-for="(showCategoryItem , showCategoryIndex) in showCategory"
        :key="showCategoryIndex"
        class="flex justify-center flex-col"
      >
        <span
          class="text-center text-4xl text-black my-14 mx-auto cursor-pointer"
        >
          {{showCategoryItem.cate_name}}专区</span>
        <div class="grid grid-cols-2 gap-10">

          <template v-if="showCategoryItem.children.length>0">
            <div
              v-for="(productItem,productIndex) in showCategoryItem.children"
              :key="productIndex"
              @click="jumpProductInfo(productItem._id)"
              class="bg-white p-7 rounded-xl flex justify-between h-64 cursor-pointer"
            >
              <div class=" p-0 m-0 relative w-72">
                <p class="text-3xl text-black font-bold ">
                  {{productItem.name}}</p>
                <div
                  class="border-black rounded-full border-2 text-xl py-2 absolute bottom-0 border-r-0"
                >
                  <span class="mx-2 text-base text-black ">￥
                    <i class="text-xl">{{productItem.price}}</i>
                    起</span>
                  <span
                    class="rounded-full bg-black text-white border-black border-2 text-xl py-2 px-3 "
                  >立即抢购</span>
                </div>
              </div>

              <div class="relative w-36">
                <img
                  :src="baseUrl+productItem.image"
                  class="w-36 h-36 absolute bottom-0 right-0 object-cover"
                >
              </div>
            </div>
          </template>
          <!-- 商品item end -->

          <div
            v-else
            v-for="item in 4"
            :key="item"
            class="bg-white p-7 flex justify-between h-64 rounded-xl cursor-not-allowed"
          >
            <!-- <el-skeleton-item
              variant="image"
              class="w-36 h-36"
            /> -->

            <div class=" p-0 m-0 relative w-72">
              <el-skeleton-item
                variant="text"
                class="w-44"
              />
              <div class="text-xl py-2 absolute bottom-0">
                <el-skeleton-item
                  variant="text"
                  class="w-32"
                />
              </div>
            </div>

            <div class="relative w-36">
              <el-skeleton-item
                variant="image"
                class="w-36 h-36 absolute bottom-0 right-0"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getBusinessSlideshow, getBusinessRecommendCategoryList, } from '@/api/Business'
export default {
  name: "businessHome",
  data () {
    return {
      businessId: this.$route.params.businessId,
      baseUrl: this.$baseUrl,
      businessSlideshowList: [],  // 店铺轮播图
      showCategory: [],  // 店铺推荐显示的分类列表
    }
  },
  components: {},
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