<!--
 * @Author: 清羽
 * @Date: 2022-09-09 09:42:03
 * @LastEditTime: 2022-10-26 15:41:17
 * @LastEditors: you name
 * @Description: 主页
-->
<!-- Home 页 -->
<template>
  <div class="Home select-none bg-gray-100">
    <el-backtop
      :bottom="60"
      :right="10"
    >
      <van-icon
        name="back-top"
        size="1.125rem"
      />
    </el-backtop>

    <van-swipe
      class="my-swipe relative w-full md:hidden"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="item in 4"
        :key="item"
      >
        <div class="p-3 rounder-lg">
          <img
            draggable="false"
            src="https://res.vmallres.com/cmscdn/CN/2022-09/43725456ac344dadb829bfd4903e3dbf.jpg"
            class="object-scale-down mx-auto"
          >
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 移动端主页轮播图 end -->

    <div class="relative w-full hidden md:block">

      <el-carousel height="550px">
        <el-carousel-item
          v-for="item in 4"
          :key="item"
        >
          <img
            alt=""
            draggable="false"
            src="https://res.vmallres.com/cmscdn/CN/2022-09/43725456ac344dadb829bfd4903e3dbf.jpg"
            class="bg-cover h-full mx-auto"
          >
        </el-carousel-item>

      </el-carousel>
      <!-- 轮播图end -->

      <div class="container mx-auto max-w-7xl">
        <div
          class=" z-50 absolute top-1/2 transform -translate-y-1/2 w-60 shadow-lg"
        >
          <div class="navCard">

            <nav
              class=" h-10 flex justify-between items-center bg-gray-50 bg-opacity-75 hover:bg-white"
              v-for="ii in categoryList"
              :Key="ii"
              @mouseenter="enterFun(ii)"
            >
              <div class="px-8">{{ii.cateName}}</div>
              <i class="el-icon-arrow-right px-4"></i>
            </nav>
            <!-- 分类列表end -->

            <div
              class="sonCategory absolute top-0 left-60 h-full bg-white p-5  "
            >
              <div class="grid gap-4 grid-cols-3">
                <div
                  v-for="(cateItem,cateIndex) in categoryChildList"
                  :key="cateIndex"
                  class=""
                >
                  <span class="flex items-center">
                    <el-skeleton-item
                      variant="image"
                      style="width: 50px; height: 50px;"
                    />
                    <p class="ml-1">{{cateItem.cateName}}</p>
                  </span>
                </div>
              </div>
            </div>
            <!-- 子列表end -->
          </div>

        </div>
      </div>
      <!-- 分类列表end -->

    </div>
    <!-- pc端 轮播图and分类列表 end -->

    <!-- <productItem
      :data="recommendList"
      :length="1"
    /> -->
    <recommend class="container mx-auto max-w-7xl py-4" />
    <!-- 热门推荐end -->

    <love class="container mx-auto max-w-7xl py-4" />
    <!-- 猜你喜欢end -->

    <div class="bg-white hidden md:block">
      <div class="h-32 flex items-center">
        <server class="container mx-auto max-w-7xl py-4 " />
      </div>
      <el-divider class="container mx-auto max-w-7xl my-0"></el-divider>
      <div class="container mx-auto max-w-7xl my-0 py-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus
        debitis velit minus asperiores. Est quibusdam, facere rerum amet
        similique
        sit. Inventore illum aspernatur, fuga enim ratione iusto. Exercitationem
        tenetur ratione aliquid quos deleniti quod consequuntur perspiciatis
        odit
        voluptates magnam! Doloremque beatae placeat quibusdam alias corrupti
        nobis fugit perspiciatis laudantium aut?
      </div>
    </div>

  </div>
</template>

<script>

import { getCategory } from '@/api/Home'
import recommend from './components/recommend.vue'
import love from './components/love.vue'
import server from './components/serve.vue'
export default {
  name: "Home",
  data () {
    return {
      categoryList: [],
      categoryChildList: [],
    }
  },
  components: { recommend, server, love },

  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.getCategoryList()
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  // 函数
  methods: {
    getCategoryList () {
      getCategory().then(response => {
        // console.log("getCategory => response", response)
        this.categoryList = response.data.data
        // console.log("getCategory => this.categoryList", this.categoryList)
        if (this.categoryList.length == 0) {
          this.categoryList = 6
        }
      })
    },



    enterFun (value) { // 鼠标移入
      // console.log("enterFun => value", value)
      this.categoryChildList = value.category_child
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.Home {
  .navCard {
    nav {
      &:hover ~ .sonCategory {
        display: block;
        // opacity: 1;
      }
    }

    .sonCategory {
      min-width: 600px;
      display: none;
      // opacity: 0;
      --tw-shadow: 15px 4px 35px 0px rgba(0, 0, 0, 0.1),
        0px 4px 5px 0px rgba(0, 0, 0, 0.05);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

      &:hover {
        display: block;
      }
    }

    // nav:nth-child(1) {
    //   padding-top: 1rem;
    // }
    // nav:last-child {
    //   padding-bottom: 1rem;
    // }
  }
}
::v-deep .el-carousel__container {
  .el-carousel__arrow--left {
    margin-left: 24%;
    background: #374151;
    opacity: 0.4;
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }
  .el-carousel__arrow--right {
    margin-right: 24%;
    background: #374151;
    opacity: 0.4;
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  // line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>