<!--
 * @Author: 清羽
 * @Date: 2022-09-26 13:13:48
 * @LastEditTime: 2022-10-10 15:44:35
 * @LastEditors: you name
 * @Description: 
-->
<!-- myAddress 页 -->
<template>

  <el-dialog
    :visible.sync="dialogFormVisible"
    @close="closeDialog"
  >
    <div class="myAddress">
      <div class="max-w-lg">
        <!-- <button>添加</button> -->

        <el-form
          ref="form"
          :model="form"
          label-width="90px"
        >

          <el-form-item label="地址信息:">
            <!-- <provincesCascader
            @provincesValueChang="provincesValueChang"
            @update:value="form.region=$event"
            style="width: 100%;"
          ></provincesCascader> -->
            <el-cascader
              class="w-full"
              :options='options'
              v-model='selectedOptions'
              @change='addressChange'
              placeholder="请选择 省/市/区"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="详细地址:">
            <el-input
              type="textarea"
              v-model="form.detailAddress"
              placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
            ></el-input>
          </el-form-item>

          <el-form-item label="收件人姓名:">
            <el-input
              v-model="form.addressee"
              placeholder="长度不超过25个字符"
              maxlength="25"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="手机号码:">
            <el-input
              v-model="form.phone"
              placeholder="电话、手机号码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <div class="container">
              <label class="flex items-center space-x-3 ">
                <input
                  type="checkbox"
                  v-model="form.isDefault"
                  class="appearance-none form-tick h-6 w-6 border bg-white border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
                />
                <span class="text-gray-900 font-medium">设置为默认收货地址</span>
              </label>
            </div>
          </el-form-item>

          <el-form-item>
            <button
              type="button"
              class="px-4  rounded-md bg-blue-600 text-white"
              @click="save"
            >保存</button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 头部end -->

      <div>

      </div>
      <!-- 内容end -->
    </div>
  </el-dialog>

</template>

<script>

import provincesCascader from '@/components/cascader.vue'
import { addAddress, updateAddress } from '@/api/Address'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  props: {
    dialogShow: {  // 是否显示
      type: Boolean,
      default: false,
      required: true
    },
    alterAddressFrom: {  // 修改的地址信息
      type: Object,
      default: new Object()
    }
  },
  name: "myAddress",
  data () {
    return {
      options: regionData,
      selectedOptions: [],
      form: {
        detailAddress: '',
        addressee: '',
        phone: null,
        isDefault: true,
        province: '',
        city: '',
        area: '',
      },
      dialogFormVisible: this.dialogShow,
      alterFrom: this.alterAddressFrom
    }
  },
  components: { provincesCascader },
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
      // const { province, city, area, town } = require('province-city-china/data');
      // const { data, province, city, area, town } = require('province-city-china/data');

      console.log("getData => this.alterFrom", this.alterFrom)
      if (Object.keys(this.alterFrom).length !== 0) {
        console.log('有');

        this.form = {
          detailAddress: this.alterFrom.detailAddress,
          addressee: this.alterFrom.addressee,
          phone: this.alterFrom.phone,
          isDefault: this.alterFrom.isDefault,
          province: this.alterFrom.province,
          city: this.alterFrom.city,
          area: this.alterFrom.area,
        }
        this.selectedOptions = this.alterFrom.selectedOptions

      } else {
        console.log('无');
        this.form = {
          detailAddress: '',
          addressee: '',
          phone: null,
          isDefault: true,
          province: '',
          city: '',
          area: '',
        }
      }
      console.log(' form ==>', this.form);
    },
    addressChange (arr) {
      // console.log(this.selectedOptions) //  Proxy {0: '120000', 1: '120100', 2: '120101'}
      // console.log(arr) //  Proxy {0: '120000', 1: '120100', 2: '120101'}  和上句一样
      this.form.province = CodeToText[arr[0]]
      this.form.city = CodeToText[arr[1]]
      this.form.area = CodeToText[arr[2]]
      // var addressText = CodeToText[arr[0]] + CodeToText[arr[1]] + CodeToText[arr[2]]
      // console.log(addressText) // addressText为el-cascader的值 北京市 市辖区 朝阳区
    },
    // provincesValueChang (value) {
    //   console.log("provincesValueChang => value", value)
    //   this.province = value[0]
    //   console.log("provincesValueChang => this.province", this.province)
    //   this.city = value[1]
    //   console.log("provincesValueChang => this.city", this.city)
    //   this.area = value[2]
    //   console.log("provincesValueChang => this.area", this.area)
    // },
    save () {
      const data = {
        province: this.form.province,
        city: this.form.city,
        area: this.form.area,
        detailAddress: this.form.detailAddress,
        addressee: this.form.addressee,
        phone: this.form.phone,
        isDefault: this.form.isDefault,
        selectedOptions: this.selectedOptions
      }
      if (Object.keys(this.alterFrom).length !== 0) {  // 修改模式
        data['addressId'] = this.alterFrom._id
        console.log("save => data", data)
        updateAddress(data).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.selectedOptions = [],

            this.form = {
              detailAddress: '',
              addressee: '',
              phone: null,
              isDefault: true,
              province: '',
              city: '',
              area: '',
            }
          this.$emit('addOk', true)
          this.closeDialog()
        })
      } else {
        addAddress(data).then(response => {   // 添加模式
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.selectedOptions = [],

            this.form = {
              detailAddress: '',
              addressee: '',
              phone: null,
              isDefault: true,
              province: '',
              city: '',
              area: '',
            }

          // this.$router.push({
          //   path: '/address'
          // })
          this.$emit('addOk', true)
          this.closeDialog()
        })
      }

    },
    closeDialog () {
      this.$emit('dialogShowChange', false)
    }
  },
  watch: {
    dialogShow (val) {
      this.dialogFormVisible = dialogShow
    },
    alterAddressFrom (val) {
      this.alterFrom = alterAddressFrom
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.myAddress {
}
</style>