<!--
 * @Author: 清羽
 * @Date: 2022-09-27 10:34:01
 * @LastEditTime: 2022-09-28 10:36:18
 * @LastEditors: you name
 * @Description: 
-->
<!-- myAddress 页 -->
<template>
  <div class="myAddress space-y-6">
    <div>
      <router-link
        :to="{name:'addAddress'}"
        class=" px-6 py-2 text-red-500 hover:bg-red-400 hover:text-white transition duration-300"
      >添加收货地址</router-link>
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
                @click="handleEdit(scope.$index, scope.row)"
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
                @click="handleDelete(scope.$index, scope.row)"
                class="hover:text-red-500"
              >设为默认</button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddressList, delAddress } from '@/api/Address'
export default {
  name: "myAddress",
  data () {
    return {
      addressList: []
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
    getData () {
      getAddressList().then(response => {
        this.addressList = response.data.data
        console.log("getAddressList => this.addressList", this.addressList)

      })
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
      const data = { addressId: row._id }
      console.log("handleDelete => row._id", row._id)
      delAddress(data).then(response => {
        this.$message({
          type: 'success',
          message: response.data.msg
        })
        this.getData()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.myAddress {
}
</style>