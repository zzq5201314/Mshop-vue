<!--
 * @Author: 清羽
 * @Date: 2022-11-23 18:03:11
 * @LastEditTime: 2022-11-25 19:27:59
 * @LastEditors: you name
 * @Description:  店铺 父类页
-->
<!-- cate 页 -->
<template>
  <div class="cate bg-white">
    <div class="container mx-auto ">
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
    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getCate()
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

    jumpProductInfo (productId) {
      this.$router.push({
        path: '/product/info/' + productId
      })
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
</style>