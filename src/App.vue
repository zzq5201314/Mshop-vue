<!--
 * @Author: 清羽
 * @Date: 2022-09-08 23:57:13
 * @LastEditTime: 2022-10-23 23:06:35
 * @LastEditors: you name
 * @Description: 
-->
<template>
  <div
    id="app"
    class=" text-gray-500 antialiased bg-white "
  >
    <router-view />
  </div>
</template>

<script>

import {
  baseApi
} from '@/config'
export default {
  name: "App",
  data () {
    return {};
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
  }
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
</style>
