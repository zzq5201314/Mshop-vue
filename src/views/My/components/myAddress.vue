<!--
 * @Author: 清羽
 * @Date: 2022-09-27 10:34:01
 * @LastEditTime: 2022-10-25 21:26:59
 * @LastEditors: you name
 * @Description: 
-->
<!-- myAddress 页 -->
<template>
  <div class="myAddress">
    <div class="space-y-6 hidden md:block">
      <div>
        <!-- <router-link
        :to="{name:'addAddress'}"
        class=" px-6 py-2 text-red-500 hover:bg-red-400 hover:text-white transition duration-300"
      >添加收货地址</router-link> -->
        <span
          class=" px-6 py-2 text-red-500 hover:bg-red-400 hover:text-white transition duration-300 cursor-pointer"
          @click="openAddress()"
        >
          添加收货地址
        </span>
      </div>

      <div class="space-y-6">
        <div class="bg-blue-200 px-4 py-2 text-sm flex items-center">
          <i class='el-icon-warning-outline text-lg text-blue-500 mr-2' />
          已保存{{this.addressList.length}}了条地址，还能保存{{(20-this.addressList.length)}}条地址
        </div>
        <div>
          <el-table
            :data="addressList"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="addressee"
              label="收件人"
              width="180"
            >
            </el-table-column>

            <el-table-column
              label="所在地区"
              width="180"
            >
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
                {{scope.row.province}} {{scope.row.city}} {{scope.row.area}}
              </template>
            </el-table-column>

            <el-table-column
              prop="detailAddress"
              label="详细地址"
            >
            </el-table-column>

            <el-table-column
              prop="phone"
              label="电话/手机"
              width="150"
            >
            </el-table-column>

            <el-table-column
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <button
                  @click="openAddress(scope.row)"
                  class="hover:text-red-500"
                > 修改</button>
                <el-divider direction="vertical"></el-divider>
                <button
                  @click="handleDelete(scope.$index, scope.row)"
                  class="hover:text-red-500"
                >删除</button>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <div
                  v-if="scope.row.isDefault==true"
                  class="flex items-center justify-center"
                >
                  <span
                    class="bg-red-200 border-red-600 border text-red-600 px-2 py-1"
                  >默认地址</span>
                </div>
                <button
                  v-else
                  @click="setDefaultAddress(scope.$index, scope.row)"
                  class="hover:text-red-500"
                >设为默认</button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>

      <div v-if="dialogShow">
        <addAddress
          :dialogShow="dialogShow"
          :alterAddressFrom="alterAddressFrom"
          @dialogShowChange="dialogShowChange"
          @addOk="addOk"
        />
      </div>
    </div>
    <!-- pc end -->

    <div class="bg-gray-100 min-h-screen md:hidden">
      <header class="flex items-center bg-transparent">
        <back />
        <div class="font-bold text-black w-9/12">{{title}}</div>
        <span
          class="text-red-500"
          v-if="operation==false"
          @click="operation=!operation"
        >管理</span>
        <span
          class="text-red-500"
          @click="operation=!operation"
          v-else
        >完成</span>
      </header>

      <div
        class="mx-2 rounded-lg"
        :class="{'bg-white':operation==false,'space-y-2':operation==true}"
      >
        <div
          v-for="(addressItem,addressIndex) in addressList"
          :key="addressIndex"
          class="divide-y bg-white px-4 rounded-lg py-3"
        >
          <div
            class="flex items-center"
            :class="{'pb-3':operation==true}"
          >
            <div class="w-1/12">
              <div
                class="bg-gradient-to-r to-red-500 from-yellow-500 rounded-full w-8 h-8 flex items-center justify-center"
                v-if="addressItem.isDefault==true"
              >
                <i class="el-icon-s-home text-white text-lg"></i>
              </div>
              <!-- 默认收货地址 -->

              <div
                v-else
                class="bg-red-300 bg-opacity-50 flex items-center justify-center text-red-500 w-8 h-8 rounded-full bg-gradient-to-l from-red-300 "
              >
                {{addressItem.addressee.length>2?addressItem.addressee[0]:addressItem.addressee[0]+addressItem.addressee[1]}}
              </div>
            </div>
            <div class="w-10/12 mx-5 space-y-1">
              <div class="space-x-1 flex items-center">
                <div
                  class="text-black font-bold max-w-20 overflow-hidden overflow-ellipsis whitespace-nowrap"
                >{{addressItem.addressee}}aaaaaaaaaa</div>
                <div class="text-sm">{{addressItem.phone}}</div>
                <span
                  v-if="addressItem.isDefault==true"
                  class="text-red-500 text-xs p-1 rounded-md border-red-500 border"
                >默认</span>
              </div>
              <p class="text-black text-sm">{{addressItem.province}}
                {{addressItem.city}}
                {{addressItem.area}} {{addressItem.detailAddress}}
              </p>
            </div>
            <div class="w-1/12"><i class="el-icon-edit" /></div>
          </div>
          <!-- 地址 -->
          <div
            class="flex justify-between text-xs pt-3 items-center"
            v-if="operation"
          >
            <div class="flex items-center space-x-2">
              <div
                class="w-4 h-4 border border-gray-300 rounded-full text-xs flex items-center justify-center text-white bg-gradient-to-r"
                :class="{'el-icon-check':addressItem.isDefault==true,'border-none':addressItem.isDefault==true,'from-yellow-500':addressItem.isDefault==true,'to-red-500':addressItem.isDefault==true}"
              >
              </div>
              <div>默认地址</div>
            </div>
            <div>删除</div>
          </div>
        </div>
      </div>

      <footer class="absolute bottom-0 left-0 w-full bg-white">
        <div
          class="py-2 text-center rounded-3xl mx-4 mt-2 mb-4 text-white bg-gradient-to-r from-yellow-500 to-red-500"
          @click="openAppAddress()"
        >
          <i class="el-icon-plus" /> 添加收货地址
        </div>
      </footer>
    </div>
    <!-- app end -->
  </div>
</template>

<script>
import back from '@/components/appBack.vue'
import addAddress from '@/components/addAddress.vue'
import { getAddressList, delAddress, setDefaultAddress } from '@/api/Address'
export default {
  name: "myAddress",
  data () {
    return {
      addressList: [],
      dialogShow: false,
      alterAddressFrom: {},
      title: this.$route.meta.title,
      operation: false   // 手机端的操作显示是否打开
    }
  },
  components: { addAddress, back },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getData()
  },
  // 函数
  methods: {
    async getData () {
      await getAddressList().then(response => {
        this.addressList = response.data.data
        console.log("getAddressList => this.addressList", this.addressList)

      })
    },
    // handleEdit (index, row) {
    //   console.log(index, row);
    // },
    // handleDelete (index, row) {
    //   console.log(index, row);
    //   // const data = { addressId: row._id }
    //   // console.log("handleDelete => row._id", row._id)
    //   // delAddress(data).then(response => {
    //   //   this.$message({
    //   //     type: 'success',
    //   //     message: response.data.msg
    //   //   })
    //   //   this.getData()
    //   // })
    // },

    // 打开添加地址窗口
    openAddress (row) {   // 有row 就是-修改 无就是-添加
      if (row) {
        this.alterAddressFrom = row
      }
      this.dialogShow = true
    },
    // 退出添加地址窗口
    dialogShowChange (val) {
      this.dialogShow = val
      this.alterAddressFrom = {}
    },
    // 添加地址成功
    addOk () {
      this.getData()
    },
    // 删除 -- 收货地址
    async handleDelete (index, row) {
      const data = { addressId: row._id }
      console.log("handleDelete => row._id", row._id)
      await delAddress(data).then(response => {
        this.$message({
          type: 'success',
          message: response.data.msg
        })
      })
      await this.getData()
    },
    // 设置默认收货地址
    async setDefaultAddress (index, row) {
      const data = { addressId: row._id }
      console.log("setDefaultAddress => row._id", row._id)
      await setDefaultAddress(data).then(response => {
        this.$message({
          type: 'success',
          message: response.data.msg
        })
      })
      await this.getData()
    },

    openAppAddress () {
      console.log('打开手机端的添加地址');
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.myAddress {
}
</style>