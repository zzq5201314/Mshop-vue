<!--
 * @Author: 清羽
 * @Date: 2022-09-09 09:47:15
 * @LastEditTime: 2022-11-20 14:27:55
 * @LastEditors: you name
 * @Description: 登录页
-->
<!-- Login 页 -->
<template>
  <div class="Login">
    <el-container>
      <el-header class="bg-gray-100 hidden md:block">
        <div class="container mx-auto max-w-7xl">
          <div>
            <router-link
              class="italic cursor-pointer"
              :to="{path:'/'}"
            >
              <span class="text-4xl relative -right-1 text-blue-600">M</span>
              <span class="text-black">商城</span>
            </router-link>
          </div>
        </div>
      </el-header>

      <el-main class="">
        <div class="container mx-auto max-w-7xl flex justify-center ">
          <div class="w-96">
            <div class="text-3xl text-gray-700 text-center pt-4 pb-6">账户登录</div>
            <el-row>
              <el-col
                :span="24"
                class="my-3 relative"
              >
                <input
                  @blur="validatePhone"
                  v-model="phone"
                  type="text"
                  placeholder="手机号"
                  class="focus:outline-none focus:ring focus:border-blue-600 bg-gray-100 px-6 py-4 rounded-lg w-full"
                />
                <p class="text-xs text-red-500 absolute -bottom-5">{{phoneMsg}}
                </p>
              </el-col>
              <!-- 手机号输入框end -->

              <el-col
                :pan="24"
                class="my-3 relative"
              >
                <input
                  @blur="validatePassword"
                  v-model="password"
                  :type="psw?'password':'text'"
                  placeholder="密码"
                  class="focus:outline-none focus:ring focus:border-blue-600 bg-gray-100 pl-6 pr-16 py-4 rounded-lg w-full password"
                />
                <p class="text-xs text-red-500 absolute -bottom-5">{{pswMsg}}
                </p>
                <div
                  class="absolute top-0 right-3 md:right-5 h-full flex items-center "
                >
                  <span
                    class="el-icon-view cursor-pointer"
                    @click='psw=!psw'
                  ></span>
                </div>
              </el-col>
              <!-- 密码输入框end -->

              <el-col class="md:hidden flex justify-end text-blue-600">
                <div>忘记密码</div>
              </el-col>

              <el-col
                :span="24"
                class="my-4"
              >
                <button
                  class="bg-blue-600 text-gray-50 w-full py-3 rounded-lg"
                  @click="login"
                >登录</button>
              </el-col>

              <el-col
                :span="24"
                class="hidden md:block"
              >
                <div
                  class="w-full grid grid-cols-3 text-center cursor-pointer text-red-500"
                >
                  <span @click="register">注册</span>
                  <span class="border-solid border-r-2 border-l-2 ">忘记密码</span>
                  <span>遇到问题</span>
                </div>
              </el-col>

              <el-col class="md:hidden">
                <button
                  class="text-blue-600 bg-gray-200 w-full py-3 rounded-lg"
                  @click="register"
                >注册</button>
              </el-col>

              <!-- <el-col
                class="md:hidden text-blue-600 flex justify-center fixed bottom-0"
              >
                
              </el-col> -->

            </el-row>
          </div>
        </div>
      </el-main>

      <el-footer
        class="md:hidden text-blue-600 flex justify-center w-full fixed bottom-0"
      >
        <div>遇到问题</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import { login } from '@/api/Login'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  name: "Login",
  data () {
    return {
      psw: true,
      password: 'Zz123.',
      phone: '18666666666',
      phoneMsg: '',
      pswMsg: ''
    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },


  beforeRouteEnter (to, from, next) {
    next(vm => {

      console.log(to)
      console.log(from)
      // vm.pathUrl = from.fullPath;
    })
  },

  // 函数
  methods: {
    login () {
      this.validatePhone()
      this.validatePassword()
      if (this.password !== '' && this.phone !== '') {
        const data = {
          phone: this.phone,
          password: this.password
        }
        this.$store.dispatch('user/login', data).then(() => {
          console.log('已经登录成功');
          // this.$router.push({ path: '/' })
          // if ()
          this.$router.go(-1)
        })
        // .catch(() => {
        // })
      }
    },
    async validatePhone () {  // 手机号验证
      var phone = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
      if (!this.phone) {
        this.phoneMsg = "手机号不能为空"
      } else if (!phone.test(this.phone)) {
        this.phoneMsg = "手机号格式错误"
      } else {
        this.phoneMsg = ""
      }
    },
    async validatePassword () {  // 密码验证
      if (!this.password) {
        this.pswMsg = "密码不能为空"
      } else {
        this.pswMsg = ""
      }
    },
    register () {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.Login {
}
</style>