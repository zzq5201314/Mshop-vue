<!--
 * @Author: 清羽
 * @Date: 2022-09-28 15:03:50
 * @LastEditTime: 2022-10-28 22:10:01
 * @LastEditors: you name
 * @Description: 
-->
<!-- ApplyBusiness 页 -->
<template>
  <div class="ApplyBusiness">
    <el-container>
      <el-header class="bg-gray-100 ">
        <div class="container mx-auto max-w-7xl flex items-center h-full ">
          <router-link
            class="italic cursor-pointer"
            :to="{path:'/'}"
          >
            <span class="text-5xl relative -right-1 text-blue-600">M</span>
            <span class="text-black">商城</span>
          </router-link>
        </div>
      </el-header>
      <el-main>
        <div class="container mx-auto max-w-7xl flex justify-center">
          <div class="w-full">
            <div class="text-3xl text-gray-700 text-center pt-4 pb-6">入驻商家</div>

            <div class="w-96">
              <el-form
                label-width="100px"
                ref="form"
              >
                <el-form-item label="店铺名称">
                  <el-input
                    @blur="createBusiness"
                    placeholder="请输入店铺名称"
                    v-model="companyName"
                  ></el-input>
                </el-form-item>

                <el-form-item label="店铺logo">
                  <el-upload
                    class="avatar-uploader"
                    name="company_logo"
                    action
                    :disabled="companyLogo?true:false"
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    list-type="picture-card"
                  >
                    <div
                      v-if="companyLogo"
                      class="relative group h-full"
                    >
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="baseUrl+companyLogo"
                      >
                      <span
                        class="el-upload-list__item-actions absolute top-0 left-0 hidden group-hover:block group-hover:bg-black group-hover:bg-opacity-40 w-full h-full  transition duration-500 space-x-6"
                      >
                        <span
                          @click="handlePictureCardPreview(baseUrl+companyLogo)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span @click="handleRemove(companyLogo,'company_logo')">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>

                    <i
                      v-else
                      class="el-icon-plus"
                    ></i>

                  </el-upload>
                </el-form-item>

                <el-form-item label="店铺地址">
                  <el-cascader
                    class="w-full"
                    :options='options'
                    v-model='selectedOptions'
                    @change='addressChange'
                    clearable
                    filterable
                    placeholder="请选择 省/市/区"
                  ></el-cascader>
                </el-form-item>

                <el-form-item label="营业执照">
                  <!-- <el-upload
                    class="avatar-uploader"
                    name="business_license"
                    action
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                  >
                    <i
                      slot="default"
                      class="el-icon-plus"
                    ></i>
                    <div
                      slot="file"
                      slot-scope="{file}"
                    >
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="baseUrl+businessLicense"
                        alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload> -->
                  <el-upload
                    class="avatar-uploader"
                    name="business_license"
                    action
                    :disabled="businessLicense?true:false"
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    list-type="picture-card"
                  >
                    <div
                      v-if="businessLicense"
                      class="relative group h-full"
                    >
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="baseUrl+businessLicense"
                      >
                      <span
                        class="el-upload-list__item-actions absolute top-0 left-0 hidden group-hover:block group-hover:bg-black group-hover:bg-opacity-40 w-full h-full  transition duration-500 space-x-6"
                      >
                        <span
                          @click="handlePictureCardPreview(baseUrl+businessLicense)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          @click="handleRemove(businessLicense,'business_license')"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>

                    <i
                      v-else
                      class="el-icon-plus"
                    ></i>

                  </el-upload>

                </el-form-item>

                <el-form-item label="银行名称">
                  <el-input
                    v-model="bank"
                    @blur="applyBusiness(bank,'bank')"
                  ></el-input>
                </el-form-item>

                <el-form-item label="对公账户">
                  <el-input
                    v-model="corporateAccount"
                    @blur="applyBusiness(corporateAccount,'corporateAccount')"
                  ></el-input>
                </el-form-item>

                <el-form-item label="身份证正面">
                  <el-upload
                    class="avatar-uploader"
                    name="identity_card_front"
                    action
                    :disabled="identityCardFront?true:false"
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    list-type="picture-card"
                  >
                    <div
                      v-if="identityCardFront"
                      class="relative group h-full"
                    >
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="baseUrl+identityCardFront"
                      >
                      <span
                        class="el-upload-list__item-actions absolute top-0 left-0 hidden group-hover:block group-hover:bg-black group-hover:bg-opacity-40 w-full h-full  transition duration-500 space-x-6"
                      >
                        <span
                          @click="handlePictureCardPreview(baseUrl+identityCardFront)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          @click="handleRemove(identityCardFront,'identity_card_front')"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>

                    <i
                      v-else
                      class="el-icon-plus"
                    ></i>

                  </el-upload>
                </el-form-item>

                <el-form-item label="身份证反面">
                  <el-upload
                    class="avatar-uploader"
                    name="identity_card_reverse"
                    action
                    :disabled="identityCardReverse?true:false"
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    list-type="picture-card"
                  >
                    <div
                      v-if="identityCardReverse"
                      class="relative group h-full"
                    >
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="baseUrl+identityCardReverse"
                      >
                      <span
                        class="el-upload-list__item-actions absolute top-0 left-0 hidden group-hover:block group-hover:bg-black group-hover:bg-opacity-40 w-full h-full  transition duration-500 space-x-6"
                      >
                        <span
                          @click="handlePictureCardPreview(baseUrl+identityCardReverse)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          @click="handleRemove(identityCardReverse,'identity_card_reverse')"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>

                    <i
                      v-else
                      class="el-icon-plus"
                    ></i>

                  </el-upload>
                </el-form-item>

                <el-form-item class="mt-10">
                  <div class="space-x-8">
                    <span
                      class="bg-blue-500 text-white px-6 py-3 hover:bg-opacity-70 transform duration-150 cursor-pointer "
                      @click="applyUpload"
                    >提交审核</span>

                    <span
                      @click="upShelfBusiness"
                      class="bg-green-500 text-white px-6 py-3 hover:bg-opacity-70 transform duration-150 cursor-pointer "
                    >店铺上架</span>
                  </div>
                </el-form-item>

              </el-form>
            </div>

            <el-dialog :visible.sync="dialogVisible">
              <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
              >
            </el-dialog>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { createBusiness, getMyBusiness, applyBusiness, applyBusinessImg, applyBusinessDelImg, applyUpload, upShelfBusiness } from '@/api/ApplyBusiness.js'
export default {
  name: "ApplyBusiness",
  data () {
    return {
      baseUrl: this.$baseUrl,
      options: regionData,
      selectedOptions: [],
      companyName: '',
      bank: '',
      corporateAccount: '',
      imageUrl: '',
      businessId: '',
      companyLogo: '', // 店铺logo
      address: '',
      businessLicense: '',      // 营业执照
      identityCardFront: '',    // 身份证正面
      identityCardReverse: '',  // 身份证反面
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  components: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getData()
  },
  // 函数
  methods: {
    // 创建店铺名称
    async createBusiness () {
      createBusiness({ company_name: this.companyName }).then(response => { })
      this.getData()
    },

    // 获取店铺信息
    async getData () {
      await getMyBusiness().then(response => {
        if (response.data.status === 200) {
          const { company_name, bank, address_code, corporate_account, business_license, company_logo, identity_card_front, identity_card_reverse, _id, is_show } = response.data.data
          console.log("getMyBusiness => response.data.data", response.data.data)
          this.companyName = company_name
          this.bank = bank
          this.selectedOptions = address_code
          this.corporateAccount = corporate_account
          this.businessLicense = business_license
          this.companyLogo = company_logo
          this.identityCardFront = identity_card_front
          this.identityCardReverse = identity_card_reverse
          this.businessId = _id

          // if (is_show == 1) {
          //   window.location.href = "http://localhost:9520/"
          // }
        }
      })
    },

    // 补全店铺信息`
    async applyBusiness (value, name) {
      if (value) {
        var data = {}
        if (name == 'bank') {
          data['bank'] = value
        } else if (name == 'corporateAccount') {
          data['corporate_account'] = value
        } else if (name == 'address') {
          data['address'] = value
          data['address_code'] = this.selectedOptions
        }
        console.log("applyBusiness => data", data)
        await applyBusiness(data).then(response => { })
        this.getData()
      }


    },

    // 上传文件
    async uploadFile (item) {
      const file = item.file
      console.log("uploadFile => file", file)
      const FromData = new FormData()
      FromData.append(item.filename, file)
      await applyBusinessImg(FromData).then(response => {
        console.log("applyBusinessImg => response", response)
      })
      this.getData()
    },

    // 选择地区
    addressChange (arr) {
      this.address = CodeToText[arr[0]] + CodeToText[arr[1]] + CodeToText[arr[2]]
      this.applyBusiness(this.address, 'address')
    },

    // 放大图片
    handlePictureCardPreview (value) {
      this.dialogImageUrl = value;
      this.dialogVisible = true;
    },

    // 删除图片
    async handleRemove (url, name) {
      const data = { imgName: name, imgUrl: url }
      await applyBusinessDelImg(data).then(response => { })
      this.getData()
    },

    // 提交审核
    applyUpload () {
      const data = { businessId: this.businessId }
      applyUpload(data).then(response => {
        console.log("applyUpload => response", response)
        this.$message({
          type: 'success',
          message: response.data.msg
        })
      })
    },

    // 店铺上架
    upShelfBusiness () {
      const data = { businessId: this.businessId }
      upShelfBusiness(data).then(response => {
        console.log("upShelfBusiness => response", response)
        this.$message({ type: 'success', message: response.data.msg })
      }).finally(_ => {
        window.location.href = "http://112.74.54.76:9520/"
      })
    },

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },


  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.ApplyBusiness {
  // .logo:first-letter {
  //   font-size: 2rem;
  //   position: absolute;
  //   right: -5px;
  // }
  .el-upload--picture-card .el-icon-zoom-in,
  .el-upload--picture-card .el-icon-delete {
    font-size: 24px;
    color: white;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>