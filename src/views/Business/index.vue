<!--
 * @Author: 清羽
 * @Date: 2022-10-03 16:27:48
 * @LastEditTime: 2022-11-27 18:49:06
 * @LastEditors: you name
 * @Description: 店铺首页
-->
<!-- businessHome 页 -->
<template>
  <div>
    <div
      class="businessHome bg-gray-100 hidden md:block"
      v-if="!invokedApp"
    >

      <businessHeader />
      <!-- 头部logo 分类 end -->
      <!-- <businessHome /> -->

      <router-view></router-view>
      <!-- 首页 end -->

    </div>
    <!-- pc 端 -->

    <div class="md:hidden bg-gray-50 min-h-screen block">
      <header
        class="sticky top-0 border-b border-gray-100 z-50 bg-white "
        ref="businessHeader"
      >
        <back />
      </header>
      <div id="content">
        <router-view></router-view>

      </div>

      <van-tabbar
        v-model="active"
        route
        ref="tabbar"
        @change="handleChange"
      >
        <van-tabbar-item
          :to="`/business/${businessId}`"
          icon="wap-home-o"
        >首页</van-tabbar-item>
        <van-tabbar-item
          :to="`/business/${businessId}/all`"
          icon="apps-o"
        >分类</van-tabbar-item>
      </van-tabbar>

    </div>
    <!-- app 端 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      business: {}, // 店铺信息
      active: 0,
    }
  },
  computed: {
    ...mapGetters([
      'invokedApp',
    ])
  },
  components: { back, businessHeader },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getData()

    // this.setTabberShow()

    console.log(this.invokedApp);

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

    handleChange () {
      console.log('active =>', this.active);
    },

    // setTabberShow () {
    //   const tabbarHeight = this.$refs.tabbar.$el.offsetHeight
    //   const content = document.getElementById('content')
    //   content.style.paddingBottom = tabbarHeight + 'px'
    // },

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
#content {
  height: 100%;
}

// //去除滚动条
// ::-webkit-scrollbar {
//   display: none !important;
// }
</style>