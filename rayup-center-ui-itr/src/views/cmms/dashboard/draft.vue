<template>
  <div class="p-3">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane name="2" class="py-1">
        <el-badge slot="label" :value="equireTableList" class="item">
          <span>设备草稿箱</span>
        </el-badge>
        <deviceList :deviceList="deviceList" :isAll="isAll" :total="total" :queryParams="queryParams" @getList="getList"></deviceList>
      </el-tab-pane>
      <el-tab-pane name="问题草稿箱" class="py-1">
        <el-badge slot="label" :value="problemTableList" class="item">
          <span>问题草稿箱</span>
        </el-badge>
      </el-tab-pane>
      <el-tab-pane name="工单草稿箱" class="py-1">
        <el-badge slot="label" :value="orderTableList" class="item">
          <span>工单草稿箱</span>
        </el-badge>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import deviceList from '../components/deviceList'
import { listDevice } from '../../../api/cmms/device'
export default {
  components: {
    deviceList
  },
  data() {
    return {
      isAll: false,
      activeName: '2',
      deviceList: [],
      total: 0,
      equireTableList: 0,
      problemTableList: 0,
      orderTableList: 0,
      queryParams: {
        deviceState: 2,
        pageNum: 1,
        pageSize: 10
      },
    }
  },
  created() {
    this.getList(2)
  },
  methods: {
    tabClick(tab){
      this.deviceList = []
      this.getList(tab.name)
    },
    getList(deviceState) {
      this.queryParams.pageNum = 1
      this.queryParams.deviceState = deviceState
      this.queryParams.agency = 1
     if(this.queryParams.deviceState == 2) {
      listDevice(this.queryParams).then(response => {
        this.deviceList = response.rows
        this.total = response.total
        if(this.queryParams.deviceState == 2) {
          this.equireTableList = response.total;
        }
      })
     }
    },
  }
}
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 10px;
}
</style>
