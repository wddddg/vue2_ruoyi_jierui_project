<template>
  <!--    操作记录列表-->
  <div class="m-2">
    <el-table :data="list" border>
      <af-table-column type="index" align="center" width="50"/>
      <af-table-column label="操作记录" align="center" prop="operationRecord" show-overflow-tooltip/>
      <af-table-column label="更新时间" align="center" prop="createTime" show-overflow-tooltip/>
      <af-table-column label="更新人" align="center" prop="createBy" show-overflow-tooltip/>
    </el-table>
    <Pagination
      v-show="queryParams.total>0"
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { operatingRecordList } from '../../../../api/cmms/serviceDelivery'

export default {
  name: 'operationRecord',
  props: {
    serviceCode: {
      type: String,
      default: ''
    },
    dataId: {
      type: String,
      default: ''
    },
    serviceStageCode: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      queryParams: {
        serviceCode: null,
        dataId: null,
        serviceStageCode: null,
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      list: []
    }
  },
  watch: {
    dataId(oldVal, newVal) {
      this.getList()
    },
    serviceStageCode(oldVal, newVal) {
      this.getList()
    },
    serviceCode(oldVal, newVal) {
      this.getList()
    }
  },
  methods: {
    refresh(){
      this.getList()
    },
    getList() {
      this.queryParams.serviceCode = this.serviceCode
      this.queryParams.dataId = this.dataId
      this.queryParams.serviceStageCode = this.serviceStageCode
      operatingRecordList(this.queryParams).then(res => {
        this.queryParams.total = res.total
        this.list = res.rows
        console.log(this.list)
      })
    }
  }
}
</script>

<style scoped>

</style>
