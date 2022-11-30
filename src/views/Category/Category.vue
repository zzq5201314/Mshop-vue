<!--
 * @Author: 清羽
 * @Date: 2022-10-16 18:26:31
 * @LastEditTime: 2022-11-30 21:45:00
 * @LastEditors: you name
 * @Description: 
-->
<!-- Category 页 -->
<template>
  <div class="Category">
    <div class="hidden md:block mx-auto container">
      <div
        class=" w-full mx-5 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-screen-xl"
        v-if="categoryList.category"
      >
        <p class="text-center text-2xl text-black tracking-widest">
          {{categoryList.category.cateName}}</p>
        <div class="flex flex-wrap">
          <div>
            <div
              class="ml-9 mt-3 text-black cursor-pointer transform border-blue-500 transition duration-300 ease-in-out border-b-o"
              :class="{'scale-150':categoryList.category.checked,'border-b-2':categoryList.category.checked}"
              @click="selectCategory()"
            >
              全部
            </div>
          </div>

          <ul class="flex w-11/12 flex-wrap">

            <li
              v-for="(childItem,childIndex) in categoryList.category.childCategory"
              :key="childIndex"
              @click="selectCategory(childItem,childIndex)"
              class=" ml-9 mt-3 text-black cursor-pointer transform border-blue-500 transition duration-300 ease-in-out border-b-o"
              :class="{'scale-150':childItem.checked,'border-b-2':childItem.checked}"
            >
              {{childItem.cateName}}
            </li>

          </ul>
        </div>
        <!-- 分类列表 end -->

        <div class="mt-6 grid grid-cols-6 gap-4">
          <div
            v-for="(productItem,productIndex) in selectProductList"
            :key="productIndex"
            class="cursor-pointer group"
            @click="jumpProductInfo(productItem._id)"
          >
            <div class="h-64 rounded-lg overflow-hidden ">
              <img
                :src="baseUrl+productItem.image"
                class="h-full object-cover transform group-hover:scale-110 duration-300"
                :alt="productItem.name"
              >
            </div>
            <p class="text-center mt-2 text-black">{{productItem.name}}</p>
            <p
              v-html="productItem.prices"
              class="text-center"
            ></p>
          </div>
          <!-- 商品item -->
        </div>
        <!-- 商品列表 end -->
      </div>
    </div>
    <!-- pc端 -->

    <div>

    </div>
    <!-- app端 -->
  </div>
</template>

<script>
import { getCategory } from '@/api/Home'
import { decimalPoint } from '@/assets/js/common.js'  // 修改价格样式
export default {
  name: "Category",
  data () {
    return {
      baseUrl: this.$baseUrl,
      categoryId: this.$route.query.id,
      categoryName: this.$route.query.name,
      categoryList: [],
      productList: [],        // 全部商品列表
      selectProductList: []   // 选中商品列表
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
    getData () {
      let params = {}

      if (this.categoryId) {
        params['categoryId'] = this.categoryId
      }
      if (this.categoryName) {
        params['categoryName'] = this.categoryName
      }

      // 获取分类列表
      console.log("getCategory => params", params)
      getCategory(params).then(response => {
        this.categoryList = response.data.data
        let category = this.categoryList.category
        console.log("getCategory => category", category)
        category.checked = true  // 父分类高亮状态

        category.childCategory.forEach(item => {
          item.checked = false  // 子分类高亮状态


        })

        this.categoryList.productList.forEach(item => {    // 修改全部分类的商品价格样式
          item['prices'] = decimalPoint(item.price)
        })

        this.productList = this.categoryList.productList
        this.selectProductList = this.productList

        console.log("getCategory =>  this.categoryList", this.categoryList)
      })
    },

    // 选择分类
    selectCategory (item, index) {
      console.log("selectCategory => item", item)
      let category = this.categoryList.category
      if (item) {  // 选择了子类
        item.checked = true
        category.checked = false

        item.product.forEach((i) => { // 修改选中的分类下的商品价格样式

          i['prices'] = decimalPoint(i.price)
        })

        this.selectProductList = item.product  // 把选中的分类下的商品赋值到 选中商品列表
      }
      else {  // 选择父类 （ 全选 )
        category.checked = true
        category.childCategory.forEach(item => {
          item.checked = false
        })
        this.selectProductList = this.productList  // 改回 全部商品列表
      }
      this.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题
      console.log("getCategory =>  this.categoryList", this.categoryList)
    },

    async jumpProductInfo (productId) {
      this.$router.push({
        path: '/product/info/' + productId
      })
    },

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.Category {
}
</style>