<!--
 * @Author: 清羽
 * @Date: 2022-09-26 18:03:40
 * @LastEditTime: 2022-09-26 18:31:24
 * @LastEditors: you name
 * @Description: 
-->

<template>
  <div>
    <el-cascader
      style="width: 100%;"
      :options="options"
      v-model="value1"
      @change="handleChange"
      filterable
      :props="{value:'label'}"
      placeholder="请选择 省/市/区"
      clearable
    ></el-cascader>
  </div>
</template>
 
<script>
// 第一步，先下载安装 npm install element-china-area-data -S
// 第二步，如下直接导入
import { regionData } from 'element-china-area-data'
export default {
  name: "index",
  props: ['value'],
  data () {
    return {
      options: regionData,
      selectedOptions: []
    }
  },
  computed: {
    value1: {
      set (val) {
        this.$emit("input", val)
      },
      get (val) {
        return this.value
      }
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('provincesValueChang', value)
    }
  }
}
</script>