<!--
 * @Author: 清羽
 * @Date: 2022-10-23 23:43:23
 * @LastEditTime: 2022-10-26 21:59:15
 * @LastEditors: you name
 * @Description: 手机端的tab选项卡
-->
<!-- appTab 页 -->
<template>
  <div
    class="appTab"
    v-if="this.$route.name!=='productInfo'"
  >
    <div
      :style="{ height: tabH }"
      class="bg-gray-100"
    ></div>
    <van-tabbar
      v-model="active"
      ref="tab"
      route
    >
      <van-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :to="{ name: item.routeName }"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <!-- <img :src="props.active ? item.active : item.inactive" /> -->
          <div>
            <i
              class="iconfont"
              :class="[props.active ? item.active : item.inactive]"
            />
          </div>

        </template>
      </van-tabbar-item>

    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: "appTab",
  data () {
    return {
      active: 0,
      tabH: '', // tab高度
      // 导航条数据
      tabbarList: [
        {
          active: 'icon-home_fill_light',
          inactive: 'icon-home_light',
          title: "首页",
          routeName: "Home",
        },
        {
          active: 'icon-circlefill',
          inactive: 'icon-circle',
          title: "分类",

        }, {
          active: 'icon-cart_fill_light',
          inactive: 'icon-cart_light',
          title: '购物车',
          routeName: "shoppingCartList"
        }, {
          active: 'icon-myfill',
          inactive: 'icon-my',
          title: '我的',
          routeName: "myInfo"
        }
      ],
    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    if (this.$route.name !== 'productInfo') {

      // 获取tab高度
      this.$nextTick(() => {
        this.tabH = this.$refs.tab.$el.offsetHeight + 'px'
        // console.log("this.$nextTick => this.tabH", this.tabH)
      })
    }
  },
  // 函数
  methods: {

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.appTab {
  .iconfont {
    font-size: 1.5rem;
  }
}
</style>