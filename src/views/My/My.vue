<!--
 * @Author: 清羽
 * @Date: 2022-09-25 21:41:09
 * @LastEditTime: 2022-10-26 11:32:03
 * @LastEditors: you name
 * @Description: 
-->
<!-- My 页 -->
<template>
  <div class="My bg-gray-100 min-h-screen">
    <div class="container mx-auto max-w-7xl py-5 hidden md:block">
      <div class="flex space-x-5">
        <div class="w-1/5 bg-white rounded-xl h-full">
          <div class="px-6 py-4 flex justify-center flex-col items-center">
            <el-avatar
              :size="70"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>

            <div class="flex w-full mt-2 items-center">
              <span
                class="w-full text-center cursor-pointer hover:text-blue-500 "
                :class="{'text-blue-500':checkRouter=='/my/'}"
              >
                <router-link :to="{name:'myInfo'}">
                  主页
                </router-link>
              </span>
              <el-divider direction="vertical"></el-divider>
              <span
                class="w-full text-center cursor-pointer hover:text-blue-500 "
                @click="logout"
              >退出</span>
            </div>
          </div>

          <div
            v-if="avatar"
            class="px-6 py-4 hover:text-blue-500 cursor-pointer"
            @click="goBusiness"
          >
            我的店铺
          </div>
          <div
            class="px-6 py-4 hover:text-blue-500 cursor-pointer"
            :class="{'text-blue-500':checkRouter=='/address'}"
          >
            <router-link :to="{name:'address'}">我的收货地址</router-link>
          </div>
          <div class="px-6 py-4 hover:text-blue-500 cursor-pointer">
            <router-link :to="{name:'myOrder'}">我的订单</router-link>
          </div>
          <div class="px-6 py-4 hover:text-blue-500 cursor-pointer">
            <router-link :to="{name:'shoppingCartList'}">我的购物车</router-link>
          </div>
          <div class="px-6 py-4 hover:text-blue-500 cursor-pointer">
            <router-link :to="{name:'productCollect'}">我的收藏</router-link>
          </div>
          <div class="px-6 py-4 hover:text-blue-500 cursor-pointer">我的足迹
          </div>

        </div>
        <!-- 左边选项end -->

        <div class="w-4/5  bg-white rounded-xl p-5">
          <router-view />
        </div>
        <!-- 右边内容 -->
      </div>
    </div>
    <!-- pc端 -->

    <div class="space-y-3 md:hidden">
      <header class="flex pt-1">
        <div class="w-3/12 flex items-center justify-center">
          <el-avatar
            :size="70"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
        </div>
        <div class="w-7/12 font-semibold px-2 text-black">{{name}}</div>
        <div class="w-2/12 flex items-center justify-center ">
          <div
            class="text-center"
            @click="goSetting"
          >
            <i class="el-icon-setting text-2xl"></i>
            <p class="text-sm leading-3">设置</p>
          </div>
        </div>
      </header>
      <!-- 我的信息end -->

      <div class="grid grid-cols-4 text-center text-black px-3">
        <router-link
          v-for="(item,index) in cardList"
          :key="index"
          :to="{name:item.routerName}"
        >
          <i
            class="iconfont"
            :class="item.icon"
          ></i>
          <p class="text-sm">{{item.title}}</p>
        </router-link>
      </div>

      <div class="mx-3 bg-white rounded-lg p-2">
        <div class="flex justify-between text-sm">
          <span class="text-black font-bold text-base">我的订单</span>
          <span
            class="text-xs flex items-center"
            @click="goOrder"
          >全部<i class='el-icon-arrow-right' /></span>
        </div>
        <!-- title end -->

        <div class="grid grid-cols-5 text-center text-black mt-2">
          <div
            v-for="(orderBtnItem,orderBtnIndex) in orderBtnList"
            :key="orderBtnIndex"
          >
            <i
              class="iconfont"
              :class="orderBtnItem.icon"
            ></i>
            <p class="text-sm">{{orderBtnItem.title}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "My",
  data () {
    return {
      checkRouter: this.$route.path,
      cardList: [
        {
          icon: 'icon-favor',
          routerName: 'productCollect',
          title: '收藏'
        },
        {
          icon: 'icon-squarecheck',
          title: '订阅店铺'
        },
        {
          icon: 'icon-footprint',
          title: '足迹'
        },
        {
          icon: 'icon-pay',
          title: '零钱'
        },
      ],
      orderBtnList: [
        {
          icon: 'icon-vipcard',
          title: '待付款'
        },
        {
          icon: 'icon-send',
          title: '待发货'
        },
        {
          icon: 'icon-deliver',
          title: '待收货'
        },
        {
          icon: 'icon-comment',
          title: '待评价'
        },
        {
          icon: 'icon-recharge',
          title: '退款/售后'
        },
      ]
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name',
    ])
  },
  components: {},
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
    goBusiness () {
      window.location.href = "http://localhost:9520/"
    },
    goOrder () {
      this.$router.push({
        name: 'appMyOrder'
      })
    },
    goSetting () {
      this.$router.push({
        name: 'appSetting'
      })
    },
  },
  watch: {

    // $route (to, from) {
    //   console.log(from.path);//从哪来
    //   console.log(to.path);//到哪去
    //   this.checkRouter = to.path
    // }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.My {
  .iconfont {
    font-size: 1.5rem;
  }
  .van-popup,
  :deep .van-overlay {
    margin: 0;
  }
}
</style>