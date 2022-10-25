<!--
 * @Author: 清羽
 * @Date: 2022-09-08 23:57:13
 * @LastEditTime: 2022-10-25 19:11:57
 * @LastEditors: you name
 * @Description: 
-->
<template>
  <div
    id="app"
    class=" text-gray-500 antialiased bg-white "
  >
    <!-- <router-view /> -->
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>

import {
  baseApi
} from '@/config'
export default {
  name: "App",
  data () {
    return {
      transitionName: ''
    };
  },
  methods: {
    _isMobile () {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  },
  //App.vue
  mounted () {
    // console.log("监听", this.$store.state.innerWH.innerWidth);
    if (this._isMobile()) {
      console.log('手机端');

      // alert("手机端");
      //跳转到你手机路由
      // this.$router.replace("/m_index");
    } else {
      console.log('pc端');
      console.log('process.env.VUE_APP_BASE_API =>', baseApi);
      // alert("pc端");
      //跳转到PC端路由
      // this.$router.replace("/main");
    }



  },
  watch: {
    "$store.state.innerWH.innerWidth": {
      handler () {
        // this.autoScroll();
        // this.prevent();
        // console.log("监听", this.$store.state.innerWH.innerWidth);
      },
      deep: true,
      //监听vuex中userName变化而改变header里面的值
    },

    // '$route' (to, from) {
    //   //此时假设从index页面跳转到pointList页面
    //   console.log(to); // "/pointList"
    //   console.log(from); // “/index”
    //   const routeDeep = ['myInfo', 'appMyOrder'];
    //   const toDepth = routeDeep.indexOf(to.name)
    //   const fromDepth = routeDeep.indexOf(from.name)
    //   this.transitionName = toDepth > fromDepth ? 'fold-left' : 'fold-right'
    //   console.log("this.transitionName", this.transitionName)
    // }

    // $route (to, from) {
    //   if (to.meta.tx > from.meta.tx) {
    //     this.SkipSwitchName = "Skright";
    //   } else {
    //     this.SkipSwitchName = "Skleft";
    //   }
    // }


    $route (to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (from.name != null) {
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-right';
        }
      }

      console.log("$route => this.transitionName", this.transitionName)
    }



  },

};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #app{
//   font-size: ;
// }
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

.view {
  width: 100%;
  position: absolute;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 250ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
