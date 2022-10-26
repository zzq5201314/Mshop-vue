<!--
 * @Author: 清羽
 * @Date: 2022-09-26 13:13:48
 * @LastEditTime: 2022-10-26 15:18:59
 * @LastEditors: you name
 * @Description:  添加地址
-->
<!-- myAddress 页 -->
<template>

  <div>
    <div v-if="innerWidth>768">
      <el-dialog
        :visible.sync="dialogFormVisible"
        @close="closeDialog"
        :title="Object.keys(this.alterFrom).length === 0?'添加收货地址':'修改收货地址'"
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
    </div>

    <div v-else>
      <!-- 图标位置 -->
      <van-popup
        v-model="dialogFormVisible"
        position="bottom"
        class="h-full"
      >
        <header
          class=" font-semibold text-black  h-12 flex items-center bg-gray-50"
        >
          <div class="flex items-center w-full">
            <i
              class="el-icon-arrow-left p-3 text-lg"
              @click="closeDialog"
            ></i>

            <div class="flex justify-between w-full mr-4">
              <div>
                {{Object.keys(alterFrom).length == 0?'添加收货地址':'编辑收货地址'}}
              </div>

              <div
                v-if="Object.keys(alterFrom).length !== 0"
                class="font-medium text-red-500"
                @click="del"
              >删除</div>
            </div>
          </div>
        </header>

        <div>

          <div class="flex items-center pt-3 px-4">
            <div class="w-3/12 font-bold text-black">收件人</div>
            <input
              type="text"
              placeholder="名字"
              v-model="form.addressee"
              class="bg-gray-100 p-3 rounded-xl w-9/12 focus:border-blue-600 border border-gray-100 text-sm"
              maxlength="25"
            />
          </div>
          <!-- 收件人 end -->

          <div class="flex items-center pt-3 px-4">
            <div class="w-3/12 font-bold text-black">手机号码</div>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="手机号"
              class="bg-gray-100 p-3 rounded-xl w-9/12 focus:border-blue-600 border border-gray-100 text-sm"
            />
          </div>
          <!-- 手机号码 end -->

          <div class="flex items-center pt-3 px-4">
            <div class="w-3/12 font-bold text-black">所在地区</div>
            <input
              type="text"
              readonly="readonly"
              placeholder="省、市、区"
              class="bg-gray-100 p-3 rounded-xl w-9/12 focus:border-blue-600 border border-gray-100 text-sm"
              @click="appCascaderShow=true"
              v-model="addressText"
            />
            <van-popup
              v-model="appCascaderShow"
              round
              position="bottom"
            >
              <van-cascader
                v-model="cascaderValue"
                title="请选择所在地区"
                :options="options"
                :field-names="fieldNames"
                @close="appCascaderShow = false"
                @finish="onFinish"
              />
            </van-popup>
          </div>
          <!-- 地址选择 end -->

          <div class="flex items-center pt-3 px-4">
            <div class="w-3/12 font-bold text-black">详细地址</div>
            <textarea
              v-model="form.detailAddress"
              type="text"
              placeholder="街道、小区楼栋/乡村名称"
              class="bg-gray-100 p-3 rounded-xl w-9/12 focus:border-blue-600 border border-gray-100 h-28  text-left resize-none text-sm"
              maxlength="55"
            />

          </div>
          <!-- 街道、小区楼栋/乡村名称 -->

          <div class="flex items-center pt-3 px-4 justify-between">
            <div class=" font-bold text-black">设置为默认收货地址</div>
            <van-switch
              v-model="form.isDefault"
              size="24"
            />
          </div>
          <!-- 设置为默认收货地址 -->

          <div>
            <div
              class="text-white bg-gradient-to-r to-red-500 from-yellow-500 rounded-full py-2 text-center mx-8 mt-10"
              @click="save"
            >保存</div>
          </div>

        </div>
      </van-popup>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'vant';
import provincesCascader from '@/components/cascader.vue'
import { addAddress, updateAddress, delAddress } from '@/api/Address'
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
      appCascaderShow: false,
      show: false,
      dialogFormVisible: this.dialogShow,
      alterFrom: this.alterAddressFrom,
      fieldNames: {
        text: 'label',
        children: 'children',
      },
      addressText: '',
      cascaderValue: '',
      addressId: ''
    }
  },
  components: { provincesCascader },
  computed: {
    ...mapGetters([
      'innerWidth'
    ])
  },
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
      // console.log("getData => this.regionData", regionData)
      // const { province, city, area, town } = require('province-city-china/data');
      // const { data, province, city, area, town } = require('province-city-china/data');
      console.log("getData => this.alterFrom", this.alterFrom)
      if (Object.keys(this.alterFrom).length !== 0) {
        // console.log('有');

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
        if (innerWidth < 768) {
          this.addressText = CodeToText[this.selectedOptions[0]] + '/' + CodeToText[this.selectedOptions[1]] + '/' + CodeToText[this.selectedOptions[2]]
          this.addressId = this.alterFrom._id
        }

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
      // console.log(' form ==>', this.form);
    },
    // pc的选择地址
    addressChange (arr) {
      // console.log(this.selectedOptions) //  Proxy {0: '120000', 1: '120100', 2: '120101'}
      // console.log(arr) //  Proxy {0: '120000', 1: '120100', 2: '120101'}  和上句一样
      this.form.province = CodeToText[arr[0]]
      this.form.city = CodeToText[arr[1]]
      this.form.area = CodeToText[arr[2]]
      this.addressText = CodeToText[arr[0]] + CodeToText[arr[1]] + CodeToText[arr[2]]
      // console.log("addressChange => this.addressText", this.addressText)
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
          if (innerWidth > 768) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            Toast(response.data.msg);
          }

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
          if (innerWidth > 768) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            Toast(response.data.msg);
          }
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
    },
    // 移动端的选择地址
    onFinish ({ selectedOptions }) {
      // console.log("onFinish => selectedOptions", selectedOptions)

      const temp_obj = {}
      this.selectedOptions = [] // 重置选中地址的列表
      selectedOptions.forEach((item, index) => {
        temp_obj[index] = item.value
        this.selectedOptions.push(item.value)
      })
      this.appCascaderShow = false;
      this.addressText = selectedOptions.map((option) => option.label).join('/');
      // this.addressText = CodeToText[temp_obj[0]] + CodeToText[temp_obj[1]] + CodeToText[temp_obj[2]]
      this.form.province = CodeToText[temp_obj[0]]
      this.form.city = CodeToText[temp_obj[1]]
      this.form.area = CodeToText[temp_obj[2]]
      // console.log("addressChange => this.form.province", this.form.province)
      // console.log("addressChange => this.form.city", this.form.city)
      // console.log("addressChange => this.form.area", this.form.area)
      // console.log("onFinish => this.cascaderValue", this.cascaderValue)
    },
    // 移动端删除地址
    del () {
      delAddress({ addressId: this.addressId }).then(response => {
        Toast(response.data.msg);
      })
      this.$emit('addOk', true)
      this.closeDialog()
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

.van-popup {
  // --tw-bg-opacity: 1;
  // background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
}
</style>