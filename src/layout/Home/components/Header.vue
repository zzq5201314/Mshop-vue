<!--
 * @Author: 清羽
 * @Date: 2022-09-09 09:58:43
 * @LastEditTime: 2022-12-05 22:39:04
 * @LastEditors: you name
 * @Description: 
-->
<!-- Header 页 -->
<template>
  <div class="Header">
    <div class="hidden md:block">
      <header class=" text-gray-400 bg-gray-800 ">
        <nav
          class="h-8 flex justify-between items-center text-xs container mx-auto max-w-7xl"
        >
          <ul class="flex ">
            <li
              class="px-4 text-center hover:text-white transition duration-300 cursor-pointer border-r border-gray-400"
            >
              <router-link to="/">首页</router-link>
            </li>
            <li
              class="px-4 text-center hover:text-white transition duration-300 cursor-pointer"
            >
              <router-link :to="{path:'/apply_business'}">入驻商家</router-link>
              <!-- <a href="http://localhost:9520/">入驻商家</a> -->
            </li>
          </ul>
          <ul class="flex h-full leading-8">
            <li
              v-if="!name"
              class="px-4 text-center hover:text-white transition duration-300 cursor-pointer border-r border-gray-400"
            >
              <router-link to="/login">请登录</router-link>
            </li>
            <li
              v-if="!name"
              class="px-4 text-center hover:text-white transition duration-300 cursor-pointer border-r border-gray-400"
            >
              <router-link to="/register">注册</router-link>
            </li>
            <li
              v-if="name"
              class="px-4 text-center hover:text-white transition duration-300 cursor-pointer border-r border-gray-400"
            >
              <router-link :to="{name:'myInfo'}">
                <span
                  v-if="avatar"
                  class="mr-1 bg-gray-500 text-white px-2 bg-opacity-60"
                >商家</span>
                {{name}}
              </router-link>
            </li>
            <li
              class="px-4 text-center hover:text-white transition duration-300 cursor-pointer border-r border-gray-400"
            >
              <router-link :to="{name:'myOrder'}">
                我的订单
              </router-link>
            </li>
            <li
              class="px-4 text-center hover:text-white transition duration-300 cursor-pointer border-r border-gray-400"
              @click='goCollect'
            >
              我的收藏</li>

            <li
              class="px-4 text-center text-white hover:text-blue-500 hover:bg-white transition duration-300 cursor-pointer bg-gray-500"
              :class="{'border-r':name!=='','border-gray-400':name!==''}"
              @click="gosShoppingCart"
            >
              <i class="el-icon-shopping-cart-1 mr-1" />
              购物车 ({{shoppingCartNum?shoppingCartNum:0}})
            </li>
            <li
              v-if="name"
              class="px-4 text-center hover:text-white transition duration-300 cursor-pointer"
            >
              <button @click="logout">退出登录</button>
            </li>
          </ul>
        </nav>
      </header>
      <div class="container mx-auto ">

        <transition name="searchInput">
          <div
            class="flex items-center justify-center h-20 w-full "
            v-if="isSearch"
          >
            <div class="bg-gray-100 p-2 rounded-xl">
              <i
                class="el-icon-search px-2 hover:text-black cursor-pointer"
                @mousedown="search"
              ></i>
              <input
                type="text"
                placeholder="搜索商品"
                class=" input bg-gray-100 "
                v-model="searchContent"
                @keyup.enter="search"
                ref="ipt"
                @blur="cancel"
              >
              <i
                class="el-icon-close px-2 hover:text-black cursor-pointer"
                @click="cancel"
              ></i>
            </div>
          </div>

        </transition>

        <div
          v-if="!isSearch"
          class="sticky top-0 w-full bg-white flex justify-between items-center mx-auto max-w-7xl "
        >
          <!-- <img
        alt=""
        draggable="false"
        src="https://res.vmallres.com/portal/1.22.7.302/h5/images/logo_app.png"
        class="w-36"
      /> -->
          <div class="w-36 h-20 flex items-center">
            <router-link
              class="italic cursor-pointer"
              :to="{path:'/'}"
            >
              <span class="text-5xl relative -right-1 text-blue-600">M</span>
              <span class="text-black">商城</span>
            </router-link>
          </div>
          <nav>
            <a
              href="#"
              class="xl:mx-14 md:mx-8 hover:text-blue-600 transition duration-300 text-lg"
            >专区</a>
            <a
              href="#"
              class="xl:mx-14 md:mx-8 hover:text-blue-600 transition duration-300 text-lg"
            >专区</a>
            <a
              href="#"
              class="xl:mx-14 md:mx-8 hover:text-blue-600 transition duration-300 text-lg"
            >专区</a>
            <a
              href="#"
              class="xl:mx-14 md:mx-8 hover:text-blue-600 transition duration-300 text-lg"
            >专区</a>
            <a
              href="#"
              class="xl:mx-14 md:mx-8 hover:text-blue-600 transition duration-300 text-lg"
            >专区</a>
            <a
              href="#"
              class="xl:mx-14 md:mx-8 hover:text-blue-600 transition duration-300 text-lg"
            >专区</a>
            <a
              href="#"
              class="xl:mx-14 md:mx-8 hover:text-blue-600 transition duration-300 text-lg"
            >专区</a>
          </nav>
          <div class="w-9 cursor-pointer text-center">
            <i
              class="el-icon-search text-xl text-gray-400 hover:text-gray-800 transition duration-300"
              @click="startSearch"
            />
          </div>

        </div>

      </div>

    </div>

    <!-- <div class="h-screen"></div> -->
  </div>
</template>

<script>
import { search } from '@/api/Home.js'
import { mapGetters } from 'vuex'

export default {
  name: "Header",
  data () {
    return {
      isSearch: false,
      searchContent: ''
    }
  },
  components: {},
  computed: {
    ...mapGetters([
      'name',
      'shoppingCartNum',
      'avatar'
    ])
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  // 函数
  methods: {
    logout () {
      this.$store.dispatch('user/logout').then(response => {
        console.log("this.$store.dispatch => response", response)
        this.$message({
          type: 'success',
          message: '退出成功'
        })
        this.$router.push({
          path: '/'
        })
      })
    },
    gosShoppingCart () {
      this.$router.push({
        path: '/shoppingCart/list'
      })
    },
    goCollect () {
      this.$router.push({
        path: '/collect/product'
      })
    },

    startSearch () {
      this.isSearch = true
      this.$nextTick(function () {
        //DOM 更新了
        this.$refs.ipt.focus()
      })
      // let mo = function (e) { e.preventDefault(); };
      document.body.style.overflow = 'hidden';
      // document.addEventListener("touchmove", mo, false);//禁止页面滑动
    },

    cancel () {
      this.isSearch = false
      console.log('取消');
      // let mo = function (e) { e.preventDefault(); };
      document.body.style.overflow = '';//出现滚动条
      // document.removeEventListener("touchmove", mo, false);

      this.searchContent = ''
    },

    search () {
      // search({ productName: this.searchContent }).then(response => {
      //   console.log("search => response", response.data)

      // })

      let routeData = this.$router.resolve({
        name: 'search',
        query: { productName: this.searchContent }
      })

      // console.log("search => routeData.href", routeData.href)
      window.open(routeData.href, '_blank')  // 新建一个页面并跳转过去



      console.log('搜索');
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.Header {
  // overflow:;
}
.logoCart {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000000000;
}

.input {
  width: 512px;
}

.searchInput-enter-active {
  transition: opacity 0.6s;
}

.searchInput-enter {
  opacity: 0;
}

.searchInput-leave {
  display: none;
}

// @keyframes move {
//   from {
//     // transform: translateX(-100%);
//   }
//   to {
//     // transform: translateX(0);
//   }
// }
</style>