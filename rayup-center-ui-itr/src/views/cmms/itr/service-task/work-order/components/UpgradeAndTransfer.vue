<template>
  <el-card class="box-card">
    <!-- <div class="btn">
      <el-button type="primary" size="mini" @click="openD(1)"
        >问题升级</el-button
      >
      <el-button type="primary" size="mini" @click="openD(2)"
        >问题转办</el-button
      >
    </div> -->
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <!-- 表单数据 -->
        <el-table :data="upgradeAndTransferList">
          <el-table-column
            label="请求人"
            align="center"
            key="createBy"
            prop="createBy"
          />
          <el-table-column
            label="发起时间"
            align="center"
            key="createTime"
            prop="createTime"
          />
          <el-table-column
            label="转办/升级"
            align="center"
            key="executorBusiness"
            prop="executorBusiness"
          >
            <template slot-scope="scope">
              {{ scope.row.executorBusiness === "upgrade" ? "升级" : "转办" }}
            </template>
          </el-table-column>
          <el-table-column
            label="接收人"
            align="center"
            key="executorName"
            prop="executorName"
          />
          <el-table-column
            label="备注原因"
            align="center"
            key="remark"
            prop="remark"
          />
          <!-- <el-table-column
            label="操作"
            align="center"
            width="200"
            class-name="small-padding fixed-width"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="text" v-if="scope.$index === 0">
                问题转办
              </el-button>
              <el-button size="mini" type="text" v-else> 问题升级 </el-button>
            </template> -->
          <!-- </el-table-column> -->
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// import { queryListByApgradeAndRecipient } from "@/api/cmms/itr/work-order/order.api";
export default {
  name: "UpgradeAndTransfer",
  components: {},
  data() {
    return {
      queryParams: {},
      total: 1,
      title: "",
      type: "",
    };
  },
  methods: {
    getList() {},
    handleQuery() {},
    resetQuery() {},
  },
  props: {
    rowData: Object,
    WorkOrderCode: String,
    upgradeAndTransferList: Array,
  },
  async created() {
    // this.rowData.upgradeItems = this.upgradeAndTransferList;
    // await queryListByApgradeAndRecipient({
    //   workOrderId: this.$route.query.workOrderId,
    // }).then((res) => {
    //   this.upgradeAndTransferList = res.data;
    // });
  },
  watch: {
    upgradeAndTransferList: {
      handler(nV) {
        this.upgradeAndTransferList = nV;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
.btn {
  margin-bottom: 15px;
}
</style>
