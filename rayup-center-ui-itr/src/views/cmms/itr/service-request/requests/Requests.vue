<template>
  <div>
    <el-row :gutter="24">
      <!-- <div class="toptag mb10">
        <el-tag>所有请求：{{ total }}</el-tag>
        
            statistics.pending +
            statistics.allocation +
            statistics.invalidReq +
            statistics.cancel
          
        <el-tag type="warning">待受理：{{ statistics.pending }}</el-tag>
        <el-tag type="success">已派工：{{ statistics.allocation }}</el-tag>
        <el-tag type="info">无效请求：{{ statistics.invalidReq }}</el-tag>
        <el-tag type="danger">已取消：{{ statistics.cancel }}</el-tag>
      </div> -->

      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-header>
          <el-row :gutter="10" class="mb10">
            <el-col :span="1.5">
              <jereh-button
                type="primary"
                plain
                icon="el-icon-back"
                size="small"
                @click="handleReturn"
              >
                返回
              </jereh-button>
              <jereh-button
                type="primary"
                :plain="false"
                icon="el-icon-plus"
                size="small"
                @click="handleAdd"
                >创建服务请求</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <jereh-button
                type="primary"
                plain
                icon="el-icon-download"
                size="small"
                @click="handleExport"
                >导出</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <jereh-button
                type="primary"
                plain
                icon="el-icon-printer"
                size="small"
                @click="handlePrint"
                >打印</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <jereh-button
                plain
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="batchAssignment"
                >批量派工</jereh-button
              >
            </el-col>

            <el-col :span="1.5">
              <el-tag class="toptag" style="color: #409eff !important"
                >所有请求：{{ total }} &nbsp;、待受理：{{
                  statistics.pending
                }}
                &nbsp;、 已派工：{{
                  statistics.allocation
                }}
                &nbsp;、无效请求：{{ statistics.invalidReq }} &nbsp;、
                已取消：{{ statistics.cancel }}
              </el-tag>
            </el-col>
            <right-toolbar
              :showSearch.sync="showSearch"
              @queryTable="resetSearch"
            ></right-toolbar>
          </el-row>
          <el-form
            :model="queryParams"
            ref="queryForm"
            size="small"
            :inline="true"
            v-show="showSearch"
            label-position="left"
          >
            <el-form-item prop="userName">
              <el-select
                style="width: 140px"
                v-model="queryParams.state"
                placeholder="处理进度"
                clearable
              >
                <el-option
                  v-for="item in requestStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item prop="createTime">
            <el-date-picker
              v-model="queryParams.createTime"
              type="daterange"
              range-separator="至"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
              style="width: 240px !important"
              value-format="yyyy-MM-dd"
            />
          </el-form-item> -->
            <el-form-item prop="serviceSource">
              <jereh-select
                v-model="queryParams.serviceSource"
                filterable
                ph="服务请求来源"
                :dict="dict.type.itr_service_source"
              />
            </el-form-item>
            <!-- <el-form-item prop="serviceRequiredTime">
            <el-date-picker
              v-model="queryParams.serviceRequiredTime"
              type="daterange"
              range-separator="至"
              start-placeholder="服务需求开始日期"
              end-placeholder="服务需求结束日期"
              style="width: 240px !important"
              value-format="yyyy-MM-dd"
            />
          </el-form-item> -->
            <el-form-item prop="afterSaleArea">
              <!-- <el-input
              v-model="queryParams.afterSaleArea"
              placeholder="请输入售后区域"
              clearable
              style="width: 140px"
            /> -->
              <jereh-select
                v-model="queryParams.afterSaleArea"
                filterable
                ph="售后区域"
                :dict="dict.type.after_sale_area"
                style="width: 140px"
              />
            </el-form-item>
            <el-form-item prop="productName">
              <el-input
                v-model="queryParams.productName"
                placeholder="产品名称"
                clearable
                style="width: 140px"
              />
            </el-form-item>
            <el-form-item prop="projectCode">
              <el-input
                v-model="queryParams.projectCode"
                placeholder="项目编码"
                clearable
                style="width: 140px"
              />
            </el-form-item>
            <el-form-item prop="productCode">
              <el-input
                v-model="queryParams.productCode"
                placeholder="产品编号"
                clearable
                style="width: 140px"
              />
            </el-form-item>
            <el-form-item prop="startTime">
              <el-date-picker
                v-model="queryParams.startTime"
                style="width: 140px !important"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="开始时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="endTime">
              <el-date-picker
                v-model="queryParams.endTime"
                style="width: 140px !important"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="结束时间"
              >
              </el-date-picker>
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
                <jereh-button
                  type="primary"
                  plain
                  size="small"
                  @click="handleKeyWordQuery"
                  >搜素</jereh-button
                >
              </div>
            </el-form-item>
          </el-form>
        </el-header>

        <el-table
          :data="requestsList"
          @selection-change="handleSelectionChange"
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
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="60"
          />
          <el-table-column
            label="服务进度"
            align="center"
            key="state"
            prop="state"
            width="140"
          >
            <template slot-scope="scope">
              <div>
                {{ serverProgressState(scope.row.state) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="紧急程度"
            align="center"
            key="emergencyDegree"
            prop="emergencyDegree"
            width="100px"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.itr_emergency_degree"
                :value="scope.row.emergencyDegree"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="影响程度"
            align="center"
            key="influenceLevel"
            prop="influenceLevel"
            width="100px"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.itr_influence_level"
                :value="scope.row.influenceLevel"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            key="createTime"
            prop="createTime"
            width="160"
          />
          <el-table-column
            label="请求编码"
            align="center"
            key="serviceRequestCode"
            prop="serviceRequestCode"
            width="160"
          />
          <el-table-column
            label="工单编码"
            align="center"
            key="workOrderCode"
            prop="workOrderCode"
            width="190"
          />
          <el-table-column
            label="SD服务编码"
            align="center"
            key="sdServiceCode"
            prop="sdServiceCode"
            width="120"
          />

          <el-table-column
            label="服务请求来源"
            align="center"
            key="serviceSource"
            prop="serviceSource"
            width="120"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.itr_service_source"
                :value="scope.row.serviceSource"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="服务需求时间"
            align="center"
            key="serviceRequiredTime"
            prop="serviceRequiredTime"
            width="140"
            :formatter="formatterDate"
          />
          <el-table-column
            label="服务类型"
            align="center"
            key="serviceType"
            prop="serviceType"
            width="120"
          >
            <template slot-scope="scope">
              {{ getLabelByValue(scope.row.serviceType, serviceTypeOptions) }}
            </template>
          </el-table-column>
          <el-table-column
            label="售后区域"
            align="center"
            key="afterSaleArea"
            prop="afterSaleArea"
            width="120"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.after_sale_area"
                :value="scope.row.afterSaleArea"
              /> </template
          ></el-table-column>
          <el-table-column
            label="市场区域"
            align="center"
            key="marketArea"
            prop="marketArea"
            width="120"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.device_area"
                :value="scope.row.marketArea"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="客户名称"
            align="center"
            key="clientName"
            prop="clientName"
            width="120"
          />
          <el-table-column
            label="产品名称"
            align="center"
            key="productName"
            prop="productName"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="产品品牌"
            align="center"
            key="productBrand"
            prop="productBrand"
            width="100"
          />
          <el-table-column
            label="项目编码"
            align="center"
            key="projectCode"
            prop="projectCode"
            width="160"
          />
          <el-table-column
            label="产品编号"
            align="center"
            key="productCode"
            prop="productCode"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="车牌号"
            align="center"
            key="licenseNumber"
            prop="licenseNumber"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="服务地点"
            align="center"
            key="serviceJobsite"
            prop="serviceJobsite"
            width="180"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="服务请求描述"
            align="center"
            key="serviceDescription"
            prop="serviceDescription"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="原因分析"
            align="center"
            key="reasonAnalyse"
            prop="reasonAnalyse"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="处理措施"
            align="center"
            key="solutionProcessResult"
            prop="solutionProcessResult"
            width="120"
          />
          <el-table-column
            label="故障总工时"
            align="center"
            key="mainHours"
            prop="mainHours"
            width="120"
          />
          <el-table-column
            label="辅助总工时"
            align="center"
            key="assitHours"
            prop="assitHours"
            width="120"
          />
          <el-table-column
            label="总工时"
            align="center"
            key="totalHours"
            prop="totalHours"
            width="120"
          >
            <template slot-scope="scope">
              {{ scope.row.assitHours + scope.row.mainHours || 0 }}
            </template>
          </el-table-column>
          <el-table-column
            label="编辑"
            align="center"
            width="80"
            class-name="small-padding fixed-width"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-dialog
          title="请选择服务请求类型"
          :visible.sync="chooseTypeDialog"
          width="300px"
          center
        >
          <el-row :gutter="24" style="text-align: center">
            <el-col v-for="(item, index) in serviceTypeOptions" :key="index">
              <el-button
                type="primary"
                plain
                style="width: 126px; margin-bottom: 5px"
                @click="openRequest(item.value)"
                >{{ item.label }}</el-button
              >
            </el-col>
          </el-row>
        </el-dialog> -->
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>

    <Print
      :open="printOpen"
      @colsePrintDrawer="colsePrintDrawer"
      :rowDataId="rowDataId"
    />
    <BatchAssignmentDialog
      :dialogVisible="batchAssignmentDialogVisible"
      :ids="batchAssignmentList"
      @handleClose="closeBatchAssignmentDialog"
    />
  </div>
</template>

<script>
import ImagePreview from "@/components/ImagePreview/index.vue";
import BatchAssignmentDialog from "./components/BatchAssignmentDialog.vue";
import {
  getFaultRequestsList,
  getAllRequestsList,
  getRequest,
  exportByFault,
  listByServiceFaultStat,
} from "@/api/cmms/itr/service-request/all-requests";
import Print from "@/views/cmms/itr/components/Print/index.vue";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  requestSource,
  serviceType,
  getLabelByValue,
  queryRequestState,
} from "@/utils/dictionary-service";

export default {
  name: "Requests",
  dicts: [
    "itr_fault_level",
    "itr_influence_level",
    "itr_emergency_degree",
    "itr_service_category",
    "itr_service_source",
    "after_sale_area",
    "device_area",
  ],
  components: { ImagePreview, Print, BatchAssignmentDialog },
  props: {},
  data() {
    return {
      serviceTypeOptions: serviceType(),

      chooseTypeDialog: false,
      // 选中数组
      selectDataList: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      requestsList: null,
      requestSourceOptions: requestSource(),
      requestStatusOptions: queryRequestState(),
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 打印弹出层
      printOpen: false,
      spread: true,
      // 点击修改选中的数据
      rowData: {},
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        requestStatus: undefined,
        createTime: undefined,
        agreementCode: undefined,
        requestSource: undefined,
        serviceRequiredTime: undefined,
        serviceType: undefined,
        afterSaleArea: undefined,
        marketArea: undefined,
        clientName: undefined,
        productName: undefined,
        projectCode: undefined,
        productCode: undefined,
        serviceJobsite: undefined,
        state: undefined,
        startTime: undefined,
        endTime: undefined,
      },
      selectedServiceType: "",
      rowDataId: "",
      selectIds: [],
      statistics: {
        invalidReq: 0,
        cancel: 0,
        allocation: 0,
        pending: 0,
      },
      batchAssignmentDialogVisible: false,
      batchAssignmentList: [],
    };
  },
  watch: {},
  async created() {
    await this.getList();
  },
  methods: {
    handleReturn() {
      const pageSize = this.$route.query.pageSize
        ? this.$route.query.pageSize
        : "";
      this.$route.params.pageSize = pageSize;
      this.$router.back();
    },
    batchAssignment() {
      if (!this.selectDataList.length) {
        return this.$message.error("请选择数据");
      }
      let filterArray = this.selectDataList.filter(
        (item) => item.state === "malfunction_repair_state_pending"
      );

      if (!filterArray.length) {
        return this.$message.error("请选择可派工的数据");
      }

      this.batchAssignmentList = filterArray.map((item) => {
        return {
          id: item.id,
          serviceType: item.serviceType,
        };
      });
      this.batchAssignmentDialogVisible = true;
    },
    async closeBatchAssignmentDialog(value) {
      await this.getList();
      this.batchAssignmentDialogVisible = value;
    },
    async resetSearch() {
      this.$refs["queryForm"].resetFields();
      await this.resetQuery();
    },
    getLabelByValue(value, arr) {
      return getLabelByValue(value, arr);
    },
    /** 查询用户列表 */
    async getList() {
      this.queryParams.stateGroup = this.$route.query.stateGroup;
      await getFaultRequestsList(this.queryParams).then((response) => {
        let data = response.data;
        this.requestsList = data.rows;
        this.total = data.total;
        this.selectIds = this.requestsList.map((item) => {
          return item.id;
        });
      });
      let Stat = {
        ...this.queryParams,
      };
      delete Stat.pageNum;
      delete Stat.pageSize;
      await listByServiceFaultStat(Stat).then((res) => {
        if (res?.data) {
          this.statistics = { ...res.data };
        } else {
          this.statistics = {
            invalidReq: 0,
            cancel: 0,
            allocation: 0,
            pending: 0,
          };
        }
      });
    },
    /** 搜索按钮操作 */
    async handleQuery() {
      // this.queryParams.pageNum = 1;
      await this.getList();
    },
    /** 重置按钮操作 */
    async resetQuery() {
      this.init();
      await this.getList();
    },
    init() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        requestStatus: undefined,
        faultLevel: undefined,
        createTime: undefined,
        agreementCode: undefined,
        serviceRequiredTime: undefined,
        serviceType: undefined,
        issueLevel: undefined,
        faultType: undefined,
        clientName: undefined,
        saleUser: undefined,
        afterSaleArea: undefined,
        taskAssistUser: undefined,
        productName: undefined,
        productBrand: undefined,
        projectCode: undefined,
        factoryOn: undefined,
        serviceJobsite: undefined,
        problemClassification: undefined,
        problemTime: undefined,
        UpgradeCoOrganizer: undefined,
        state: undefined,
        startTime: undefined,
        endTime: undefined,
      };
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectDataList = selection;
      this.single = selection.length != 1;
      this.multiple = !selection.length;
      this.selectIds = selection.map((item) => {
        return item.id;
      });
    },
    /** 选择新建类型 */
    openRequest(val) {
      this.selectedServiceType = val;
      this.chooseTypeDialog = false;
      // this.open = true
      this.rowData = {};
      this.$router.push({
        path: "/request/requests-edit/index",
        query: { selectedServiceType: this.selectedServiceType },
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      // this.chooseTypeDialog = true;
      // this.open = true;
      this.$router.push({
        path: "/request/requests-edit/index",
        query: { selectedServiceType: "malfunction_repair" },
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      let me = this;
      this.$router.push({
        path: "/request/requests-edit/index",
        query: { id: row.id, selectedServiceType: row.serviceType },
      });
    },
    closeDialog(value) {
      this.open = value;
    },
    /** 导出按钮操作 */
    async handleExport() {
      // if (!this.selectDataList.length) {
      //   return this.$message.error("请选择要导出的数据");
      // }
      await this.leadingOutXlsx();
    },
    /** 打印按钮操作 */
    handlePrint() {
      if (!this.selectDataList.length) {
        return this.$message.error("请选择要打印的数据");
      }
      // console.log(this.selectDataList);
      // this.rowDataId = this.selectDataList[0].workOrderId
      // this.printOpen = true;
    },
    colsePrintDrawer(value) {
      this.printOpen = value;
    },
    async leadingOutXlsx() {
      let ids = this.selectIds.join(",");
      if (this.selectDataList?.length) {
        ids = this.selectDataList
          .map((item) => {
            return item.id;
          })
          .join(",");
      }
      this.downloadJierui(
        "/itr/serviceRequest/exportByFault",
        {
          serviceRequestIds: ids,
        },
        `服务请求${new Date().getTime()}.xlsx`
      );
      // await exportByFault({ serviceRequestIds: ids }).then((res) => {
      //   const blob = new Blob([res], { type: 'xlsx' });
      //   saveAs(blob, `服务请求${new Date().getTime()}.xlsx`)
      // });
      // await exportByFault({ serviceRequestIds: ids }).then((res) => {
      //   let blob = new Blob([res]);
      //   let downloadElement = document.createElement("a");
      //   let href = window.URL.createObjectURL(blob);
      //   downloadElement.href = href;
      //   document.body.appendChild(downloadElement);
      //   downloadElement.click();
      //   document.body.removeChild(downloadElement); //移除元素；防止连续点击创建多个a标签
      //   window.URL.revokeObjectURL(href);
      // });
    },
    async requestsSuccess() {
      await this.getList();
    },
    async handleKeyWordQuery() {
      let params = {
        keyWord: this.queryParams.keyWord,
        pageSize: this.queryParams.pageSize,
        pageNum: this.queryParams.pageNum,
        stateGroup: this.queryParams.stateGroup,
      };
      await getFaultRequestsList(params).then((response) => {
        let data = response.data;
        this.requestsList = data.rows;
        this.total = data.total;
        this.selectIds = this.requestsList.map((item) => {
          return item.id;
        });
      });
    },
    formatterDate(row) {
      if (!row.serviceRequiredTime) return null;
      let date = new Date(row.serviceRequiredTime);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    },
  },
};
</script>

<style lang="scss" scoped>
// .toptag {
//   // width: 75%;
//   // margin: 0 auto;
//   // display: flex;
//   // justify-content: space-around;
//   margin-left: 12px;
//   .el-tag {
//     margin-right: 15px;
//   }
// }
.formSearchUp {
  height: 36px;
  overflow: hidden;
}
.formSearchDown {
  height: auto;
  overflow: none;
}
.spread-box {
  position: relative;
  height: 30px;
  margin: 10px;
  .spread {
    position: absolute;
    right: 5%;
  }
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
::v-deep .toptag.el-tag.el-tag--medium.el-tag--light {
  color: #409eff !important;
  background: rgba($color: #409eff, $alpha: 0.1) !important;
  border-color: rgba($color: #409eff, $alpha: 0.2) !important;
  height: 34px;
  line-height: 34px;
}
::v-deep .el-table__body tr:hover > td.el-table__cell {
  background-color: #fdeee8 !important;
}
::v-deep .el-header * {
  font-size: 14px;
}
::v-deep .el-header {
  padding: 0 !important;
}
::v-deep .el-tag {
  color: #1890ff;
  background: rgba($color: #409eff, $alpha: 0.1) !important;
  border-color: rgba($color: #409eff, $alpha: 0.2) !important;
}
::v-deep .el-tag.el-tag--info {
  background: rgba($color: #909399, $alpha: 0.1) !important;
  border-color: rgba($color: #909399, $alpha: 0.2) !important;
  color: #909399;
}
::v-deep .el-tag.el-tag--warning {
  background: rgba($color: #e6a23c, $alpha: 0.1) !important;
  border-color: rgba($color: #e6a23c, $alpha: 0.2) !important;
  color: #e6a23c;
}
::v-deep .el-tag.el-tag--danger {
  background: rgba($color: #f56c6c, $alpha: 0.1) !important;
  border-color: rgba($color: #f56c6c, $alpha: 0.2) !important;
  color: #f56c6c;
}
</style>
