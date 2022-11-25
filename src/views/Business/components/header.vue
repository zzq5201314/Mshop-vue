<!--
 * @Author: 清羽
 * @Date: 2022-11-23 18:13:33
 * @LastEditTime: 2022-11-24 22:35:02
 * @LastEditors: you name
 * @Description: 头部logo 分类
-->
<!-- header 页 -->
<template>
  <div class="">

    <div class="bg-white h-28">
      <div class="container mx-auto flex items-center h-full">
        <img
          :src="baseUrl+business.company_logo"
          class="w-64 h-24 object-contain"
        >
      </div>
    </div>
    <!-- 店铺logo end -->
    <div class="bg-gray-300 bg-opacity-70 h-10 flex items-center">
      <ul class="flex container mx-auto items-center">

        <li
          class="px-4 cursor-pointer hover:bg-gray-800 rounded-full hover:text-white transition duration-200 text-black "
          @click="jumpHome()"
          :class="{'font-bold':!this.$route.params.categoryId}"
        >首页</li>

        <li
          class="px-4 cursor-pointer hover:bg-gray-800 rounded-full hover:text-white transition duration-200 text-black"
          @click="jumpCate()"
          :class="{'font-bold':this.$route.params.categoryId=='all'}"
        >全部分类</li>

        <li
          class="px-4 cursor-pointer hover:bg-gray-800 rounded-full hover:text-white transition duration-200 text-black "
          v-for="(categoryItem ,categoryIndex) in categoryList"
          :key="categoryIndex"
          @click="jumpCate(categoryItem._id)"
          :class="{'font-bold':categoryItem.checked}"
        >{{categoryItem.cate_name}}</li>
      </ul>
    </div>
    <!-- 店铺分类 end -->
  </div>
</template>

<script>
import { getBusinessCategoryList, getBusinessInfo } from '@/api/Business'

const defaultSettings = require('@/settings.js')
export default {
  name: "businessHeader",
  props: {
  },
  data () {
    return {
      businessId: this.$route.params.businessId,
      baseUrl: this.$baseUrl,
      categoryList: [],
      business: {} // 店铺信息
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
      // 获取店铺 logo 粉丝 等信息
      await getBusinessInfo(this.businessId).then(response => {
        this.business = response.data.data
        // console.log("awaitgetBusinessInfo => this.business", this.business)

        // 修改网站头部
        this.$route.meta.title = this.business.company_name
        document.title = `${defaultSettings.title} | ${this.business.company_name}`

      })

      // 获取店铺分类列表
      await getBusinessCategoryList(this.businessId).then(response => {
        this.categoryList = response.data.data
        // console.log("awaitgetBusinessCategoryList => this.categoryList", this.categoryList)

        for (var i in this.categoryList) {
          // 根据 url 里的 params 高亮选中的分类列表
          if (this.categoryList[i]._id == this.$route.params.categoryId) {
            this.categoryList[i]['checked'] = true
          } else {
            // 设置默认全部 未高亮
            this.categoryList[i]['checked'] = false
          }
        }
      })
    },

    // 跳转首页
    jumpHome () {
      this.$router.push({
        name: 'business',
        params: this.businessId
      })
    },

    // 跳转分类
    jumpCate (categoryId) {
      if (!categoryId) {
        categoryId = 'all'
      }
      this.$router.push({
        path: `/business/${this.businessId}/${categoryId}`
      })
    }
  },
  watch: {
    // 每次切换分类 重新高亮 选中的分类
    '$route.params.categoryId' (newVal, oldVal) {
      for (var i in this.categoryList) {
        if (this.categoryList[i]._id == newVal) {
          console.log("this.categoryList[i]._id", this.categoryList[i]._id)
          this.categoryList[i].checked = true
        } else {
          this.categoryList[i].checked = false

        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>