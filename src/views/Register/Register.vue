<!--
 * @Author: 清羽
 * @Date: 2022-09-15 09:16:03
 * @LastEditTime: 2022-11-20 14:15:51
 * @LastEditors: you name
 * @Description: 
-->
<!-- Register 页 -->
<template>
  <div class="Register">
    <el-container>
      <el-header class="bg-gray-100 hidden md:block">
        <div class="container mx-auto max-w-7xl">Header</div>
      </el-header>

      <el-main>
        <div class="container mx-auto max-w-7xl flex justify-center">
          <div class="w-96">
            <div class="text-3xl text-gray-700 text-center pt-4 pb-6">账户注册</div>
            <el-row>
              <el-col
                :span="24"
                class="flex items-center justify-center mb-2 text-sm"
              >
                <div>
                  <span>已有账户，</span>
                  <span
                    class="text-red-600 cursor-pointer"
                    @click="login"
                  >去登录<i class="el-icon-arrow-right" /></span>
                </div>
              </el-col>

              <el-col
                :span="24"
                class="my-3 relative"
              >
                <input
                  @blur="validateNickname"
                  v-model="nicknameInput"
                  type="text"
                  placeholder="用户名"
                  class="focus:outline-none focus:ring focus:border-blue-600 bg-gray-100 px-6 py-4 rounded-lg w-full"
                />
                <p class="text-xs text-red-500 absolute -bottom-5">
                  {{nicknameMsg}}
                </p>
              </el-col>
              <!-- 用户名输入框end -->

              <el-col
                :span="24"
                class="my-3 relative"
              >
                <input
                  @blur="validatePhone"
                  v-model="phoneInput"
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
                  v-model="passwordInput"
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

              <el-col
                :pan="24"
                class="my-3 relative"
              >
                <input
                  @blur="validatePasswordTwo"
                  v-model="passwordValidateInput"
                  :type="pswValidate?'password':'text'"
                  placeholder="确认密码"
                  class="focus:outline-none focus:ring focus:border-blue-600 bg-gray-100 pl-6 pr-16 py-4 rounded-lg w-full password"
                />
                <p class="text-xs text-red-500 absolute -bottom-5">
                  {{pawValidateMsg}}</p>
                <div
                  class="absolute top-0 right-3 md:right-5 h-full flex items-center "
                >
                  <span
                    class="el-icon-view cursor-pointer"
                    @click='pswValidate=!pswValidate'
                  ></span>
                </div>
              </el-col>
              <!-- 确认密码输入框end -->

              <el-col
                :span="24"
                class="my-4"
              >
                <button
                  class="bg-blue-600 text-gray-50 w-full py-3 rounded-lg"
                  :class="{'opacity-50':nicknameMsg!==''||pawValidateMsg!==''||pswMsg!==''||phoneMsg!==''||phoneInput==''||passwordInput==''||passwordValidateInput==''||nicknameInput=='','cursor-not-allowed':nicknameMsg!==''||pawValidateMsg!==''||pswMsg!==''||phoneMsg!==''||phoneInput==''||passwordInput==''||passwordValidateInput==''||nicknameInput==''}"
                  :disabled="nicknameMsg!==''||pawValidateMsg!==''||pswMsg!==''||phoneMsg!==''||phoneInput==''||passwordInput==''||passwordValidateInput==''||nicknameInput==''"
                  @click="register"
                >注册</button>
              </el-col>

            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { register } from '@/api/Register.js'
export default {
  name: "Register",
  data () {
    return {
      phoneInput: '18666666666', // 手机号输入框
      passwordInput: 'Zz123.', // 密码输入框
      passwordValidateInput: 'Zz123.', // 确认密码输入框
      nicknameInput: '小明', //用户名输入框
      pswValidate: true,
      psw: true,
      phoneMsg: '',
      pswMsg: '',
      pawValidateMsg: '',
      nicknameMsg: ''
    }
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

    async register () {
      await this.validateNickname()
      await this.validatePhone()
      await this.validatePassword()
      await this.validatePasswordTwo()
      const data = {
        nickname: this.nicknameInput,
        phone: this.phoneInput,
        password: this.passwordValidateInput
      }
      await register(data).then(response => {
        this.$message({
          type: 'success',
          message: response.data.msg
        })
        this.$router.push({
          path: '/login'
        })
      })
    },

    login () { // 跳转登录页
      this.$router.push({
        path: '/login'
      })
    },

    async validatePhone () {  // 手机号验证
      var strTemp = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
      if (!this.phoneInput) {
        this.phoneMsg = "手机号不能为空"
      } else if (!strTemp.test(this.phoneInput)) {
        this.phoneMsg = "手机号格式错误"
      } else {
        this.phoneMsg = ""
      }

    },

    async validatePassword () {  // 密码验证
      var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@\.#$%^&*? ]).*$/;
      if (!reg.test(this.passwordInput)) {
        this.pswMsg = "密码至少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
      } else if (!this.passwordInput) {
        this.pswMsg = "密码不能为空"
      } else {
        this.pswMsg = ""
      }
    },

    async validatePasswordTwo () { // 确认密码验证
      await this.validatePassword().then(() => {
        if (this.passwordInput !== this.passwordValidateInput) {
          this.pawValidateMsg = "密码不一致，请重新输入"
        } else {
          this.pawValidateMsg = ""
        }
      })
    },
    async validateNickname () { // 验证用户名
      if (!this.nicknameInput) {
        this.nicknameMsg = "用户名不能为空"
      } else {
        this.nicknameMsg = ""
      }

    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.Register {
}
</style>