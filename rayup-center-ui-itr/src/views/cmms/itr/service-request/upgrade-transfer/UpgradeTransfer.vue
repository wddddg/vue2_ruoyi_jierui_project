<template>
  <el-card class="box-card">
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-header>
          <el-form
            :model="queryParams"
            ref="queryForm"
            size="small"
            :inline="true"
            label-position="left"
          >
            <el-form-item prop="taskCode">
              <el-input
                v-model="queryParams.taskCode"
                placeholder="工单编码"
                clearable
                style="width: 140px"
              />
            </el-form-item>
            <el-form-item>
              <jereh-button
                type="primary"
                plain
                size="small"
                @click="handleQuery"
                >过滤</jereh-button
              >
              <jereh-button
                type="primary"
                icon="el-icon-refresh"
                size="small"
                @click="resetQuery"
              >
                重置
              </jereh-button>
            </el-form-item>
            <el-form-item style="visibility: hidden">
              <el-input clearable style="width: 140px" />
            </el-form-item>
            <el-form-item class="right-search-form-item">
              <div class="right-search">
                <el-input
                  placeholder="模糊搜索"
                  clearable
                  style="width: 140px; margin-right: 10px"
                  v-model="queryParams.keyWord"
                />
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="handleKeyWordQuery"
                  >搜素</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </el-header>
        <!-- 表单数据 -->
        <el-table
          :data="upgradeAndTransferList"
          border
          :header-cell-style="{
            background: '#eef1f8',
            height: '45px',
            color: '#515a6e',
            fontSize: '15px',
          }"
          :cell-style="{
            height: '39px',
            fontSize: '14px',
            color: '#606266',
            padding: '0px',
          }"
        >
          <el-table-column
            label="工单编码"
            align="center"
            key="taskCode"
            prop="taskCode"
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
            label="请求人"
            align="center"
            key="createBy"
            prop="createBy"
          />
          <el-table-column
            label="时间"
            align="center"
            key="createTime"
            prop="createTime"
          />

          <el-table-column
            label="执行人"
            align="center"
            key="executorName"
            prop="executorName"
          >
            <template slot-scope="scope">
              {{ `${scope.row.executorName}(${scope.row.executorBy})` }}
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            align="center"
            key="remark"
            prop="remark"
          />
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
import { queryListPageByApgradeAndRecipient } from "@/api/cmms/itr/service-request/all-requests/index";
export default {
  name: "UpgradeTransfer",
  components: {},
  data() {
    return {
      upgradeAndTransferList: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        // workOrderCode: undefined,
        taskCode: undefined,
      },
      total: 1,
      title: "",
      type: "",
    };
  },
  methods: {
    async getList() {
      // this.queryParams.workOrderCode = this.queryParams.taskCode
      await queryListPageByApgradeAndRecipient(this.queryParams).then((res) => {
        this.upgradeAndTransferList = res.data.rows || [];
        this.total = res.data.total;
      });
    },
    async handleQuery() {
      this.queryParams.pageNum = 1;
      await this.getList();
    },
    resetQuery() {},
    async handleKeyWordQuery() {
      let params = {
        keyWord: this.queryParams.keyWord,
        pageSize: this.queryParams.pageSize,
        pageNum: this.queryParams.pageNum,
        stateGroup: this.queryParams.stateGroup,
      };
      await queryListPageByApgradeAndRecipient(params).then((res) => {
        this.upgradeAndTransferList = res.data.rows || [];
        this.total = res.data.total;
      });
    },
  },
  async created() {
    await this.getList();
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin-bottom: 15px;
}
.right-search-form-item {
  position: absolute;
  right: 0;
  .right-search {
  }
}
::v-deep .el-table th.gutter {
  display: table-cell !important;
}
::v-deep .el-table__body tr:hover > td.el-table__cell {
  background-color: #fdeee8 !important;
}
::v-deep .el-header * {
  font-size: 15px;
}
::v-deep .el-header {
  padding: 0 !important;
}
</style>
