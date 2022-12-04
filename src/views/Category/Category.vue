<!--
 * @Author: 清羽
 * @Date: 2022-10-16 18:26:31
 * @LastEditTime: 2022-12-04 17:20:12
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

    <div class="md:hidden fixed top-0 left-0 right-0 bottom-0">
      <header class="flex items-center bg-white sticky top-0 z-50 w-full">
        <back />
      </header>

      <div class="flex">

        <div class="w-3/12 fixed bg-gray-50 h-screen overflow-auto">
          <div
            v-for="(categoryItem , categoryIndex) in categoryList"
            :key="categoryIndex"
            @click="appSelectCategory(categoryIndex,categoryItem)"
            class="text-center my-4 py-1 mx-6 border-blue-500 transform"
            :class="{'border-b-2':categoryIndex==activeKey,'text-blue-500':categoryIndex==activeKey ,'scale-110':categoryIndex==activeKey}"
          >
            {{categoryItem.cateName}}
          </div>

        </div>
        <!-- 侧边栏 -->

        <div
          class="w-9/12 px-2 fixed right-0 h-screen overflow-auto bg-gray-50 pb-24"
          id="scrollbar"
        >
          <div
            v-for="(categoryItem , categoryIndex) in categoryList"
            :key="categoryIndex"
          >
            <van-divider :id="'scroll'+categoryIndex">
              <p
                :id="`divider${categoryIndex}`"
                class="tracking-wide"
              >{{categoryItem.cateName}}</p>
            </van-divider>

            <div
              :id="'scroll'+categoryIndex"
              v-if="categoryItem.category_child"
            >
              <div
                v-for="(fatherCategoryItem,fatherCategoryIndex) in categoryItem.category_child"
                :key="fatherCategoryIndex"
                class="bg-white py-4 px-2 my-4 rounded-xl"
              >
                <p class=" pb-2 text-black font-bold">
                  {{fatherCategoryItem.cateName}}</p>

                <div
                  v-show="fatherCategoryItem.category_child.length==0"
                  class="bg-white h-60 flex items-center justify-center rounded-xl text-sm"
                >
                  不用看了，这毛都没有
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div
                    v-for="(childCategoryItem ,childCategoryIndex) in fatherCategoryItem.category_child"
                    :key="childCategoryIndex"
                    @click="jumpSearch(childCategoryItem._id,childCategoryItem.cateName)"
                  >
                    <div class="h-32 ">
                      <img
                        v-if="childCategoryItem.image"
                        :src="baseUrl+childCategoryItem.image"
                        class="h-full rounded-md"
                      >
                      <div
                        v-else
                        class="h-full bg-gray-50 w-full rounded-md flex items-center justify-center text-xs"
                      >
                        未设置图片
                      </div>
                    </div>
                    <P class="text-center my-2 text-black">
                      {{childCategoryItem.cateName}}</P>
                  </div>
                </div>
              </div>

              <!-- {{categoryItem.category_child.length==0}} -->
              <div
                v-if="(categoryItem.category_child.length==0)"
                class="bg-white h-60 flex items-center justify-center rounded-xl"
              >
                不用看了，这毛都没有
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    <!-- app端 -->
  </div>
</template>

<script>
// import 
import back from '@/components/appBack'
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
      selectProductList: [],   // 选中商品列表
      activeKey: 0  // app 高亮列表
    }
  },
  components: { back },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getData()

    window.addEventListener('scroll', this.handleScroll, true)
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
      // console.log("getCategory => params", params)
      getCategory(params).then(response => {
        this.categoryList = response.data.data
        let category = this.categoryList.category

        if (category) {
          category.checked = true  // 父分类高亮状态

          category.childCategory.forEach(item => {
            item.checked = false  // 子分类高亮状态

          })

          this.categoryList.productList.forEach(item => {    // 修改全部分类的商品价格样式
            item['prices'] = decimalPoint(item.price)
          })

          this.productList = this.categoryList.productList  // 储存全部商品
          this.selectProductList = this.productList  // 选中的列表的商品
          console.log("getCategory => this.categoryList", this.categoryList)
        }

      })
    },

    // app 选择分类列表
    async appSelectCategory (index, item) {

      let scroll = document.querySelector('#scroll' + index)

      let style = getComputedStyle(scroll);
      let mTop = style.marginTop.replace('px', '')
      // console.log("appSelectCategory => scroll", style.marginTop)
      document.querySelector('#scrollbar').scrollTop = scroll.offsetTop - mTop


      // this.activeKey = index  // 高亮所选选项


      this.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题
    },

    jumpSearch (id, name) {
      this.$router.push({
        name: 'search',
        query: {
          categoryId: id,
          categoryName: name
        }
      })
    },

    handleScroll () {
      let scrollTop = document.querySelector("#scrollbar").scrollTop

      for (var i in this.categoryList) {
        let scroll = document.querySelector('#scroll' + i)
        let style = getComputedStyle(scroll);
        let mTop = style.marginTop.replace('px', '')

        if (document.querySelector('#scroll' + i).offsetTop - mTop - 1 < scrollTop) {
          this.activeKey = i  // 高亮选项
        }
        // this.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题
      }
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

#scrollbar {
  scroll-behavior: smooth;
}
</style>