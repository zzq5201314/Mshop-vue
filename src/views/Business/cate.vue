<!--
 * @Author: 清羽
 * @Date: 2022-11-23 18:03:11
 * @LastEditTime: 2022-11-27 18:15:17
 * @LastEditors: you name
 * @Description:  店铺 分类页
-->
<!-- cate 页 -->
<template>
  <div class="cate bg-white ">
    <div class="container mx-auto hidden md:block ">
      <div class="pt-5">

        <div class="text-center text-2xl text-black tracking-widest pb-3">
          {{categoryList.cate_name?categoryList.cate_name:'全部分类'}}
        </div>

        <div class="divide-y">

          <div
            class="pb-4"
            :class="{'flex':categoryId!=='all','space-x-5':categoryId!=='all'}"
          >

            <div
              v-if="categoryId!=='all'"
              class="space-x-5 py-1"
            >

              <span
                class="text-sm cursor-pointer tracking-widest"
                :class="{'text-blue-500':categoryList.checked,'font-bold':categoryList.checked}"
                @click="select(categoryId)"
              >全部</span>

              <span
                class="cursor-pointer"
                v-for="(cateItem,cateIndex) in categoryList.categoryList"
                :key="cateIndex"
                :class="{'text-blue-500':categoryId=='all','font-bold':categoryId=='all','text-blue-500':cateItem.checked,'font-bold':cateItem.checked}"
                @click="select(cateItem._id)"
              >
                {{cateItem.cate_name}}
              </span>

            </div>
            <!-- 非 全选分类 -- 分类列表 -->

            <div v-else>
              <div
                class="text-sm space-x-5 py-1"
                v-for="(cateItem,cateIndex) in categoryList.categoryList"
                :key="cateIndex"
              >
                <span
                  class="cursor-pointer tracking-widest"
                  :class="{'text-blue-500':cateItem.checked,'font-bold':cateItem.checked}"
                  @click="select(cateItem._id,cateItem,cateIndex)"
                >{{cateItem.cate_name}}</span>

                <span
                  class="cursor-pointer"
                  v-for="(childrenItem,childrenIndex) in cateItem.children"
                  :key="childrenIndex"
                  :class="[childrenItem.checked?'text-blue-500':'',childrenItem.checked?'font-bold':'']"
                  @click="select(childrenItem._id,cateItem,cateIndex)"
                >{{childrenItem.cate_name}}</span>
              </div>
            </div>
            <!-- 全选分类 -- 分类列表 -->

          </div>

          <!-- 分类列表 end -->

          <div>
            <div class="grid grid-cols-6 gap-5 pt-10">
              <div
                v-for="(productItem, productIndex) in productList"
                :key="productIndex"
                class="cursor-pointer group"
                @click="jumpProductInfo(productItem._id)"
              >
                <div class="h-64 rounded-lg overflow-hidden">
                  <img
                    :src="baseUrl+productItem.image"
                    class="h-full object-cover transform group-hover:scale-110 duration-300"
                  >
                </div>
                <p class="mt-2 text-center text-black">{{productItem.name}}</p>
                <p
                  v-html="productItem.prices"
                  class="text-center"
                ></p>
              </div>
              <!-- 商品 item -->
            </div>

            <el-empty
              description="啥都没有哦~"
              v-show="productList.length==0"
            ></el-empty>
          </div>

        </div>

      </div>

    </div>

    <div class="md:hidden flex fixed main h-screen">

      <div class="fixed left-0 w-3/12 bg-white h-full">
        <!-- <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(cateItem,cateIndex) in categoryList.categoryList"
            :key="cateIndex"
            :title="cateItem.cate_name"
            @click="handleMenulist(cateIndex)"
          />
        </van-sidebar> -->

        <div class="w-full flex flex-col">
          <span
            v-for="(cateItem,cateIndex) in categoryList.categoryList"
            :key="cateIndex"
            @click="handleMenulist(cateIndex)"
            class="py-2 text-center m-1 rounded-md text-black text-sm"
            :class="{'bg-opacity-80':activeKey==cateIndex,'bg-blue-200':activeKey==cateIndex}"
          >
            {{cateItem.cate_name}}
          </span>
        </div>
      </div>

      <div
        ref="scrollbar"
        id="scrollbar"
        class="py-2 px-3 overflow-auto pb-20 scrollbar fixed right-0 w-9/12"
      >
        <div
          v-for="(cateItem,cateIndex) in categoryList.categoryList"
          :key="cateIndex"
          :id="'scroll'+cateIndex"
          :ref="'scroll'+cateIndex"
        >

          <!-- <p class="text-xs text-black ">
            <van-divider
              content-position="left"
              class="text-black"
            >{{cateItem.cate_name}}
            </van-divider>
          </p> -->
          <div
            v-for="(childrenItem,childrenIndex) in cateItem.children"
            :key="childrenIndex"
          >
            <van-divider :id="'divider'+cateIndex">
              <p class="text-black text-sm text-center py-2">
                {{childrenItem.cate_name}}
              </p>
            </van-divider>

            <div
              class="grid grid-cols-2 gap-x-5"
              v-if="childrenItem.product.length>0"
            >
              <div
                v-for="(productItem,productIndex) in childrenItem.product"
                :key="productIndex"
                class="py-2"
                @click="jumpProductInfo(productItem._id)"
              >
                <img
                  :src="baseUrl+productItem.image"
                  class="h-32 w-32 object-cover rounded-md"
                >
                <p class="text-center text-base text-black py-1">
                  {{productItem.name}}
                </p>
              </div>
            </div>

            <van-empty v-else>
              <slot name="description">
                <p class="text-center text-xs">{{childrenItem.cate_name}}</p>
                <p class="text-center text-xs">毛都没有</p>
              </slot>
            </van-empty>

            <!-- <van-divider /> -->

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getBusinessCategory } from '@/api/Business'
import { decimalPoint } from '@/assets/js/common.js'
export default {
  name: "cate",
  data () {
    return {
      categoryId: this.$route.params.categoryId,
      businessId: this.$route.params.businessId,
      categoryList: {},
      baseUrl: this.$baseUrl,
      productList: [],  // 商品列表

      // app
      activeKey: 0,  // 激活的下标
    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getCate()

    window.addEventListener('scroll', this.handleScroll, true)

    // let sidebar = this.$refs.sidebar.offsetWidth
    // console.log("mounted => sidebar", sidebar)
  },
  // 函数
  methods: {
    async getCate () {
      await getBusinessCategory(this.businessId, this.categoryId).then(response => {
        this.categoryList = response.data.data


        this.productList = this.categoryList.products


        for (var i in this.productList) {
          this.productList[i]['prices'] = decimalPoint(this.productList[i].price) // 00.00 => 小数点变小
        }

        if (this.categoryList.cate_name) {  // 非全选分类
          this.categoryList['checked'] = true
          for (var i in this.categoryList.categoryList) {
            this.categoryList.categoryList[i]['checked'] = false
          }

        }

        else {  // 全选分类
          for (var i in this.categoryList.categoryList) {
            this.categoryList.categoryList[i]['checked'] = true



            for (var j in this.categoryList.categoryList[i].children) {
              this.categoryList.categoryList[i].children[j]['checked'] = false

            }

          }
        }

        // console.log('productList =>', this.productList);
        console.log("getBusinessCategory => this.categoryList", this.categoryList)

      })
    },

    // 全部分类页面 ---筛选选中的商品列表
    async filter () {

      this.productList = [] // 重置

      for (var i in this.categoryList.categoryList) {

        if (this.categoryList.categoryList[i].checked == true) {  // 父类为 true

          for (var j in this.categoryList.categoryList[i].children) {


            this.productList = [...this.productList, ...this.categoryList.categoryList[i].children[j].product]
          }

        } else {  // 父类 为 false  代表选择了子类

          for (var j in this.categoryList.categoryList[i].children) {

            // console.log("select => this.categoryList.categoryList[i].children[j]", this.categoryList.categoryList[i].children[j])
            if (this.categoryList.categoryList[i].children[j].checked == true) {
              this.productList = [...this.productList, ...this.categoryList.categoryList[i].children[j].product]
            }
          }

        }

      }

    },

    async priceFormat () {  // 价格格式化
      if (this.productList.length > 0) {
        for (var i in this.productList) {
          this.productList[i]['prices'] = decimalPoint(this.productList[i].price) // 00.00 => 小数点变小
        }
      }
    },

    async select (id, item, index) {
      console.log("select => index", index)
      console.log("select => item", item)
      console.log("select => id", id)
      if (id == this.categoryId) {
        await this.getCate()
      } else {
        if (this.categoryId !== 'all') {  // 非 全部分类

          this.categoryList.checked = false


          for (var i in this.categoryList.categoryList) {
            if (this.categoryList.categoryList[i]._id == id) {

              this.categoryList.categoryList[i].checked = true

              if (this.categoryList.categoryList[i].product) {
                this.productList = this.categoryList.categoryList[i].product

              }

            } else {
              this.categoryList.categoryList[i].checked = false
            }

          }

        }
        else { //  全部分类

          if (item._id == id) { // 选择 非子类
            this.categoryList.categoryList[index].checked = true  // 高亮选中的父类
            for (var i in this.categoryList.categoryList[index].children) {
              this.categoryList.categoryList[index].children[i].checked = false  // 把高亮了的父类下的子类全部取消高亮
            }

          }

          else { // 选择 子类
            this.categoryList.categoryList[index].checked = false  // 取消父类的高亮

            for (var i in this.categoryList.categoryList[index].children) {
              if (this.categoryList.categoryList[index].children[i]._id == id) { // 验证选中的是哪个子类
                this.categoryList.categoryList[index].children[i].checked = true  // 高亮选中的子类
              } else {
                this.categoryList.categoryList[index].children[i].checked = false  // 未被选中的子类 取消高亮

              }
            }

          }

          await this.filter()  // 筛选选中的商品
          console.log("select => this.productList", this.productList)
          this.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题

        }

        await this.priceFormat()  // 格式化 价格
      }


      console.log("getBusinessCategory => this.categoryList", this.categoryList)
    },

    async jumpProductInfo (productId) {
      this.$router.push({
        path: '/product/info/' + productId
      })
    },


    async handleMenulist (index) {

      let divider = document.querySelector('#divider' + index)
      let secMargin = getComputedStyle(divider);
      let mTop = secMargin.marginTop.replace('px', '')
      // console.log(secMargin.marginTop);
      // console.log(mTop);

      let navPage = document.querySelector('#scroll' + index)
      document.querySelector('#scrollbar').scrollTop = navPage.offsetTop - mTop
      // this.activeKey = index


      // console.log(navPagea.offsetTop);



      // let scrollIndex = `scroll${index}`
      // let navPage = this.$refs[scrollIndex][0]



      // this.$refs.scrollbar.scrollTop = navPage.offsetTop
      // console.log("handleMenulist => this.$refs.scrollbar.scrollTop", this.$refs.scrollbar.scrollTop)
      // console.log(document.getElementById("scrollbar").scrollTop);


      // let navPage = document.querySelector('#scroll' + index)
      // console.log("handleMenulist => navPage", navPage)
    },


    async handleScroll () {
      let scrollTop = document.querySelector("#scrollbar").scrollTop
      // let scrollTop = document.getElementById('scrollbar').scrollTop
      // let scrollTop = this.$refs.scrollbar.scrollTop
      // console.log("handleScroll => scrollTop", scrollTop)

      for (var i in this.categoryList.categoryList) {

        // let scrollIndex = `scroll${i}`
        // let navPage = this.$refs[scrollIndex][0]
        // if (navPage.offsetTop <= scrollTop) {
        //   this.activeKey = i
        // }

        let divider = document.querySelector('#divider' + i)
        let secMargin = getComputedStyle(divider);
        let mTop = secMargin.marginTop.replace('px', '')

        if (document.querySelector('#scroll' + i).offsetTop - mTop - 1 < scrollTop) {
          this.activeKey = i
        }
      }
      // console.log("handleScroll => scrollTop", scrollTop)

    }

  },
  watch: {
    '$route.params.categoryId' (newVal, oldVal) {
      this.categoryId = newVal
      this.getCate()
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.cate {
}

//去除滚动条
.main ::-webkit-scrollbar {
  display: none !important;
}

#scrollbar {
  scroll-behavior: smooth;
  height: 100vh;
  // overflow-y: auto;
  overflow: auto;
}

.main {
  // height: 400px;
  overflow: auto;
  // overflow: hidden;
}

::v-deep .van-empty__bottom {
  margin: 0;
}

::v-deep .van-divider {
  margin-bottom: 0;
}

::v-deep .van-empty {
  padding-top: 0;
}
</style>