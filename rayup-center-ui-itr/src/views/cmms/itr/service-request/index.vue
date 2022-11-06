<template>
  <div class="app-container">
    <Requests v-if="activeName === 'first'" requestsType="ALL" />
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有请求" name="first">
        <Requests v-if="activeName === 'first'" requestsType="ALL" />
      </el-tab-pane>
      <el-tab-pane label="待受理" name="second">
        <Requests v-if="activeName === 'second'" requestsType="DSL" />
      </el-tab-pane>
      <el-tab-pane label="已派工" name="third">
        <Requests v-if="activeName === 'third'" requestsType="YPG" />
      </el-tab-pane>
      <el-tab-pane label="无效请求" name="fourth">
        <Requests v-if="activeName === 'fourth'" requestsType="WXQQ" />
      </el-tab-pane>
      <el-tab-pane label="设备绑定核实" name="fifth">
        <Device v-if="activeName === 'fifth'" />
      </el-tab-pane>
      <el-tab-pane name="sixth">
        <template slot="label">
          <el-badge :value="dzbValue">待转办/升级</el-badge> -->
          <!-- 有值才显示badge -->
          <!-- <el-badge :value="dzbValue" v-if="dzbValue">待转办/升级</el-badge>
          <span v-else>待转办/升级</span> -->
        <!-- </template>
        <Requests v-if="activeName === 'sixth'" requestsType="DZB" />
      </el-tab-pane>
      <el-tab-pane label="服务" name="seventh">
        <Requests v-if="activeName === 'seventh'" requestsType="FWL" />
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import Requests from "./requests/Requests.vue";
import Device from "./device/Device.vue";
// import { getAllRequestsList } from '@/api/cmms/itr/service-request/all-requests'

export default {
  name: "service-request",
  components: {
    Requests,
    Device,
  },
  data() {
    return {
      activeName: "first",
      // dzbValue: 0
    };
  },
  watch: {},
  created() {
    // getAllRequestsList({ queryTab: 'DZB' }).then(res =>{
    //   // this.dzbValue = res.rows.length
    // })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
::v-deep .el-badge__content.is-fixed{
  margin-top: 10px;
}
</style>