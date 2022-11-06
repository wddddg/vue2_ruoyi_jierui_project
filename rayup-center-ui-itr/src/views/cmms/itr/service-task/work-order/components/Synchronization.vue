<template>
  <el-dialog
    v-dialogDrag
    :visible="open"
    width="900px"
    append-to-body
    @close="closeDialog"
    title="问题信息同步"
  >
    <div class="top-checkbox-select">
      <el-checkbox
        v-model="checkboxAll.serviceDescription"
        label="故障描述"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.faultType"
        label="故障类型"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.faultSubType"
        label="类型细分"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.faultLevel"
        label="故障等级"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.workOrderDescription"
        label="详细描述"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.malfunctionImage"
        label="故障照片"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.reasonType"
        label="原因类型"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.otherReasonRemark"
        label="其他原因说明"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.severityQuestionGroup"
        label="重大问题小组"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.resolutionAttachment"
        label="决议项附件"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.reasonAnalyse"
        label="原因分析"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.planProcessResult"
        label="计划处理措施"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.solutionProcessResult"
        label="实际处理措施"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.isRepeat"
        label="是否重复发生"
        border
        size="small"
      ></el-checkbox>
      <el-checkbox
        v-model="checkboxAll.isProvideResources"
        label="是否需要提供资源"
        border
        size="small"
      ></el-checkbox>
    </div>
    <div style="margin-bottom: 10px">
      <el-button type="primary" size="mini" @click="tongbu">批量同步</el-button>
    </div>
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      label-width="100px"
      label-position="left"
    >
      <el-form-item prop="workOrderCode">
        <el-input
          v-model="queryParams.workOrderCode"
          placeholder="请输入工单编码"
          clearable
        />
      </el-form-item>
      <el-form-item prop="engineerName">
        <el-input
          v-model="queryParams.engineerName"
          placeholder="请输入服务工程师"
          clearable
        />
      </el-form-item>
      <el-form-item prop="serviceDescription">
        <el-input
          v-model="queryParams.serviceDescription"
          placeholder="请输入故障描述"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="search"
          >过滤筛选</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column align="center" label="序号" type="index" width="50" />
      <el-table-column
        label="工单编号"
        align="center"
        key="workOrderCode"
        prop="workOrderCode"
      />
      <el-table-column
        label="服务工程师"
        align="center"
        key="engineerName"
        prop="engineerName"
      >
        <template slot-scope="scope">
          {{ `${scope.row.engineerName}(${scope.row.engineerId})` }}
        </template>
      </el-table-column>
      <el-table-column
        label="故障描述"
        align="center"
        key="serviceDescription"
        prop="serviceDescription"
      />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="rowData"
    />
  </el-dialog>
</template>

<script>
import {
  queryListByCurrentUser,
  syncBatch,
} from "@/api/cmms/itr/work-order/order.api.js";

export default {
  name: "Synchronization",
  data() {
    return {
      total: 1,
      ids: [],
      tableList: [],
      queryParams: {
        workOrderCode: undefined,
        engineerName: undefined,
        serviceDescription: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      checkboxAll: {},
    };
  },
  components: {},
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  methods: {
    async tongbu() {
      if (!this.ids.length) {
        return this.$message.error("请选择需要同步的数据");
      }
      let checkboxAllState = false;
      let item = {};
      for (let i = 0; i < Object.keys(this.checkboxAll).length; i++) {
        if (this.checkboxAll[Object.keys(this.checkboxAll)[i]]) {
          checkboxAllState = true;
          item[Object.keys(this.checkboxAll)[i]] =
            this.rowData[Object.keys(this.checkboxAll)[i]];
        }
      }
      if (!checkboxAllState) {
        return this.$message.error("请选择需要同步的字段");
      }
      item.workOrderIds = this.ids;
      await syncBatch(item).then((res) => {
        if (res.code === 200) {
          this.$message.success("操作成功");
          this.closeDialog();
        }
      });
    },
    async search() {
      await queryListByCurrentUser(this.queryParams).then((res) => {
        this.tableList = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.workOrderId);
    },
    closeDialog() {
      this.$emit("closeDialog", false);
      for (let i = 0; i < Object.keys(this.checkboxAll).length; i++) {
        this.checkboxAll[Object.keys(this.checkboxAll)[i]] = false;
      }
      this.queryParams = {
        workOrderCode: undefined,
        engineerName: undefined,
        serviceDescription: undefined,
        pageNum: 1,
        pageSize: 10,
      };
    },
  },
  watch: {
    async open(newValue) {
      if (newValue) {
        await this.search();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 25px;
  color: #000;
  .en {
    font-size: 20px;
    margin-top: 10px;
  }
}
.codeInfo {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.dialog-footer {
  text-align: right;
}
.signature {
  font-size: 16px;
  display: flex;
  margin-top: 30px;
  .principal {
    margin-right: 260px;
  }
}
.tip {
  margin-top: 40px;
  font-size: 14px;
  font-style: italic;
}
.top-checkbox-select {
  margin-bottom: 10px;
}

::v-deep .el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
  margin-bottom: 10px;
}
</style>
