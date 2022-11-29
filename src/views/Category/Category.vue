<!-- Category 页 -->
<template>
  <div class="Category">
    <div class="hidden md:block mx-auto container">
      <div
        class=" w-full mx-5 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-screen-xl"
      >
        <ul class="flex">

          <li class="ml-9 mt-3 text-black cursor-pointer">
            全部
          </li>
          <li
            v-for="(fatherCateItem,fatherCateIndex) in fatherCateList"
            :key="fatherCateIndex"
            class="ml-9 mt-3 text-black cursor-pointer"
          >
            {{fatherCateItem.cateName}}
          </li>

        </ul>
        <!-- 父分类 -->

        <div>
          <ul>
            <li></li>
          </ul>
        </div>
        <!-- 子分类 -->
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
export default {
  name: "Category",
  data () {
    return {
      categoryId: this.$route.query.id,
      categoryName: this.$route.query.name,
      fatherCateList: []
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
        this.fatherCateList = response.data.data
        console.log("getCategory =>  this.categoryList", this.fatherCateList)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.Category {
}
</style>