<template>
  <div v-loading="loading" class="app-container">
    <el-form
      class="flex"
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
    >
      <el-form-item prop="faultId" label="故障码">
        <jereh-input
          clearable
          v-model="queryParams.faultId"
          ph="模糊查询"
        />
      </el-form-item>
      <el-form-item>
        <jereh-button type="primary" size="mini" @click="getQueryList"
          >过滤</jereh-button
        >
      </el-form-item>
    </el-form>
    <el-table border :data="faultList" fit max-height="500px">
      <el-table-column label="序号" type="index" width="55" align="center" />
      <el-table-column
        label="故障码"
        align="center"
        prop="faultId"
        show-overflow-tooltip
      />
      <el-table-column
        label="故障码中文解析"
        align="center"
        prop="cnName"
        show-overflow-tooltip
      />
      <el-table-column
        label="故障码英文解析"
        align="center"
        prop="enName"
        show-overflow-tooltip
      />
      <el-table-column
        label="故障类型"
        align="center"
        prop="faultType"
        show-overflow-tooltip
      />
    </el-table>
    <div class="justify-end">
      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import { getFaultCodeList } from "@/api/cmms/device.js"
export default {
  name: "faultQuery",
  props: {
    deviceData: {
      required: true,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      total: 0,
      queryParams: {
        faultId: '',
        pageNum: 1,
        pageSize: 10,
      },
      faultList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getQueryList() {
      this.queryParams.pageNum = 1;
      this.getList()
    },
    getList() {
      this.loading = true;
      getFaultCodeList(this.queryParams).then(res => {
        this.loading = false;
        this.faultList = res.data.records;
        this.total = res.data.total;
      }).catch(e => {
        this.loading = false;
        console.log(e)
      })
    }
  },
};
</script>

<style scoped>
</style>
