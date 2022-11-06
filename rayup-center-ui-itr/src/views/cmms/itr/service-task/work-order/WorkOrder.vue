<template>
  <div>
    <el-row :gutter="24">
      <!-- <el-row>
        <div class="toptag mb10">
          <el-tag ref="tag">全部工单：{{ total }}</el-tag>
          statistics.pending + statistics.exec + statistics.complete
          <el-tag type="warning">待受理：{{ statistics.pending }} </el-tag>
          <el-tag type="info">处理中：{{ statistics.exec }}</el-tag>
          <el-tag type="success">已完成：{{ statistics.complete }}</el-tag>
        </div>
      </el-row> -->

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
                >创建工单</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <jereh-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="small"
                @click="handlePersonnel"
                >转办</jereh-button
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
                plain
                type="primary"
                icon="el-icon-printer"
                size="small"
                @click="handlePrint"
                >打印</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <jereh-button
                plain
                type="primary"
                icon="el-icon-tickets"
                size="small"
                @click="serviceList"
                >生成服务单</jereh-button
              >
            </el-col>
            <!-- <el-col :span="1.5">
            <jereh-button
              plain
              type="primary"
              icon="el-icon-data-line"
              size="small"
              @click="startSurvey"
              >发起调研</jereh-button
            >
          </el-col> -->
            <el-col :span="1.5">
              <jereh-button
                type="primary"
                plain
                icon="el-icon-notebook-2"
                size="small"
                @click="startReview"
                >发起复盘</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-tag ref="tag" class="toptag" style="color: #409eff !important;"
                >全部工单：{{ total }} &nbsp;、待受理：{{
                  statistics.pending
                }}
                &nbsp;、处理中：{{ statistics.exec }} &nbsp;、已完成：{{
                  statistics.complete
                }}</el-tag
              >
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
            <el-form-item prop="state">
              <el-select
                style="width: 140px"
                v-model="queryParams.state"
                placeholder="服务进度"
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
            <!-- <el-form-item prop="faultLevel">
            <el-form-item prop="faultLevel">
              <jereh-select
                v-model="queryParams.faultLevel"
                filterable
                ph="请选择故障等级"
                :dict="dict.type.itr_fault_level"
              />
            </el-form-item>
          </el-form-item>
          <el-form-item prop="createTime">
            <el-date-picker
              v-model="queryParams.createTime"
              type="daterange"
              range-separator="至"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
              style="width: 240px !important"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item prop="sdServiceCode">
            <el-input
              v-model="queryParams.sdServiceCode"
              placeholder="SD服务编码"
              clearable
              style="width: 165px"
            />
          </el-form-item> -->
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
            <!-- <el-form-item prop="serviceType">
            <el-select
              style="width: 165px"
              v-model="queryParams.serviceType"
              placeholder="请选择服务请求类型"
              clearable
            >
              <el-option
                v-for="item in serviceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
            <el-form-item prop="serviceCategory">
              <jereh-select
                v-model="queryParams.serviceCategory"
                filterable
                ph="服务类别"
                :dict="dict.type.itr_service_category"
              />
            </el-form-item>
            <!-- <el-form-item prop="clientName">
            <el-input
              v-model="queryParams.clientName"
              placeholder="请输入客户名称"
              clearable
              style="width: 140px"
            />
          </el-form-item>
          <el-form-item prop="engineerName">
            <el-input
              v-model="queryParams.engineerName"
              placeholder="请输入销售工程师"
              clearable
              style="width: 140px"
            />
          </el-form-item> -->
            <el-form-item prop="afterSaleArea">
              <jereh-select
                v-model="queryParams.afterSaleArea"
                filterable
                ph="售后区域"
                :dict="dict.type.after_sale_area"
              />
            </el-form-item>
            <!-- <el-form-item prop="taskAssistUser">
            <el-input
              v-model="queryParams.taskAssistUser"
              placeholder="请输入辅助人工号"
              clearable
              style="width: 140px"
            />
          </el-form-item>
          <el-form-item prop="seriousUser">
            <el-input
              v-model="queryParams.seriousUser"
              placeholder="请输入升级人工号"
              clearable
              style="width: 140px"
            />
          </el-form-item> -->
            <el-form-item prop="productName">
              <el-input
                v-model="queryParams.productName"
                placeholder="产品名称"
                clearable
                style="width: 140px"
              />
            </el-form-item>
            <!-- <el-form-item prop="productBrand">
            <el-input
              v-model="queryParams.productBrand"
              placeholder="请输入产品品牌"
              clearable
              style="width: 140px"
            />
          </el-form-item> -->
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
            <!-- <el-form-item prop="serviceJobsite">
            <el-input
              v-model="queryParams.serviceJobsite"
              placeholder="请输入服务地点"
              clearable
              style="width: 140px"
            />
          </el-form-item>
          <el-form-item prop="processDay">
            <el-input
              v-model="queryParams.processDay"
              placeholder="请输入问题持续天数"
              clearable
              style="width: 165px"
            />
          </el-form-item> -->
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
                size="small"
                type="primary"
                plain
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

        <!-- <div class="spread-box">
          <div class="spread">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="small" @click="resetQuery"
              >重置</el-button
            >
            <el-button
              :icon="spread ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
              size="small"
              type="text"
              @click="spread = !spread"
              >{{ spread ? "展开" : "收起" }}</el-button
            >
          </div>
        </div> -->

        <el-table
          :data="workOrderList"
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
            width="140px"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="scope.row.processResult === 'UNCLOSE'">
                  <el-tooltip effect="dark" content="已退回" placement="top">
                    <div>
                      {{ serverProgressState(scope.row.state) }}
                    </div>
                  </el-tooltip>
                </div>
                <div v-else>
                  {{ serverProgressState(scope.row.state) }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="紧急程度"
            align="center"
            key="emergencyDegree"
            prop="emergencyDegree"
            width="120px"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.itr_emergency_degree"
                :value="scope.row.emergencyDegree"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="故障等级"
            align="center"
            key="faultLevel"
            prop="faultLevel"
            width="120px"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.itr_fault_level"
                :value="scope.row.faultLevel"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="影响程度"
            align="center"
            key="influenceLevel"
            prop="influenceLevel"
            width="120px"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.itr_influence_level"
                :value="scope.row.influenceLevel"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="工单编码"
            align="center"
            key="workOrderCode"
            prop="workOrderCode"
            width="160px"
          >
            <template slot-scope="scope">
              <a
                @click="maintenanceExecution(scope.row)"
                style="color: #409eff; cursor: pointer"
                >{{ scope.row.workOrderCode }}</a
              >
            </template>
          </el-table-column>
          <el-table-column
            label="SD服务编码"
            align="center"
            key="sdServiceCode"
            prop="sdServiceCode"
            width="140px"
          />
          <el-table-column
            label="服务需求时间"
            align="center"
            key="serviceRequiredTime"
            prop="serviceRequiredTime"
            width="160px"
            :formatter="formatterDate"
          />
          <el-table-column
            label="实际完成时间"
            align="center"
            key="completeTime"
            prop="completeTime"
            width="160px"
          />
          <el-table-column
            label="服务类型"
            align="center"
            key="serviceType"
            prop="serviceType"
            width="120px"
          >
            <template slot-scope="scope">
              {{ getLabelByValue(scope.row.serviceType, serviceTypeOptions) }}
            </template>
          </el-table-column>

          <el-table-column
            label="服务类别"
            align="center"
            key="serviceCategory"
            prop="serviceCategory"
            width="180px"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.itr_service_category"
                :value="scope.row.serviceCategory"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="客户名称"
            align="center"
            key="clientName"
            prop="clientName"
            width="120px"
          />
          <el-table-column
            label="联系人"
            align="center"
            key="contactUserName"
            prop="contactUserName"
            width="120px"
          />
          <el-table-column
            label="联系方式"
            align="center"
            key="contactUserInfo"
            prop="contactUserInfo"
            width="120px"
          />
          <el-table-column
            label="市场负责人"
            align="center"
            key="marketChargeBy"
            prop="marketChargeBy"
            width="120px"
          />
          <el-table-column
            label="售后区域"
            align="center"
            key="afterSaleArea"
            prop="afterSaleArea"
            width="120px"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.after_sale_area"
                :value="scope.row.afterSaleArea"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="服务工程师"
            align="center"
            key="engineerName"
            prop="engineerName"
            width="120px"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            label="辅助人"
            align="center"
            key="taskAssistUserName"
            prop="taskAssistUserName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="转办请求人"
            align="center"
            key="taskSpecialityUserName"
            prop="taskSpecialityUserName"
            width="120px"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            label="升级人"
            align="center"
            key="seriousUserName"
            prop="seriousUserName"
            width="120"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            label="产品名称"
            align="center"
            key="productName"
            prop="productName"
            width="120px"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="产品品牌"
            align="center"
            key="productBrand"
            prop="productBrand"
            width="100px"
          />
          <el-table-column
            label="项目编码"
            align="center"
            key="projectCode"
            prop="projectCode"
            width="160"
          />
          <el-table-column
            label="项目编码分项"
            align="center"
            key="projectCodeSubentry"
            prop="projectCodeSubentry"
            width="160"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="产品编号"
            align="center"
            key="productCode"
            prop="productCode"
            width="140px"
          />
          <el-table-column
            label="车牌号"
            align="center"
            key="licenseNumber"
            prop="licenseNumber"
            width="120"
          />
          <el-table-column
            label="服务地点"
            align="center"
            key="serviceJobsite"
            prop="serviceJobsite"
            width="160"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="故障类型"
            align="center"
            key="faultType"
            prop="faultType"
            width="120px"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.itr_fault_type"
                :value="scope.row.faultType"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="请求描述"
            align="center"
            key="serviceDescription"
            prop="serviceDescription"
            width="160px"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="原因分析"
            align="center"
            key="reasonAnalyse"
            prop="reasonAnalyse"
            width="160"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="实际处理措施"
            align="center"
            key="solutionProcessResult"
            prop="solutionProcessResult"
            width="160"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="预估工时"
            align="center"
            key="estimateTime"
            prop="estimateTime"
            width="100"
          />
          <el-table-column
            label="故障总工时"
            align="center"
            key="mainHours"
            prop="mainHours"
            width="100"
          />
          <el-table-column
            label="辅助总工时"
            align="center"
            key="assitHours"
            prop="assitHours"
            width="100"
          />
          <el-table-column
            label="总工时"
            align="center"
            key="totalHours"
            prop="totalHours"
            width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.assitHours + scope.row.mainHours || 0 }}
            </template>
          </el-table-column>
          <el-table-column
            label="持续天数"
            align="center"
            key="problemTime"
            prop="problemTime"
            width="100"
          >
            <template slot-scope="scope">
              <!-- {{ date }} -->
              {{
                new Date(
                  date - new Date(scope.row.createTime).getTime()
                ).getDate()
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
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

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>
    <el-dialog
      v-dialogDrag
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
            @click="openWork(item.value)"
            >{{ item.label }}</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>

    <Print
      :open="printOpen"
      @colsePrintDrawer="colsePrintDrawer"
      :rowDataId="rowDataId"
    />
    <!-- <Print :open="printOpen" @colsePrintDrawer="colsePrintDrawer" :rowData="rowPrintData" /> -->
    <PersonnelBinding
      @closeDialog="colsePersonnelDialog"
      @bindingData="bindingData"
    />
    <ServiceListDialog
      :open="openServiceListDialog"
      @closeDialog="colseServiceListDialog"
      :rowData="serviceRowData"
    />
  </div>
</template>

<script>
import ImagePreview from "@/components/ImagePreview/index.vue";
import {
  transferOrder,
  listOrder,
  listStat,
} from "@/api/cmms/itr/work-order/order.api";
import Print from "@/views/cmms/itr/components/Print/index.vue";
import PersonnelBinding from "@/views/cmms/itr/components/PersonnelBinding/index.vue";
import * as XLSX from "xlsx";
import {
  serviceType,
  serviceCategory,
  getLabelByValue,
} from "@/utils/dictionary-service";
import { queryRequestState } from "@/utils/dictionary-task";
import ServiceListDialog from "./components/ServiceListDialog.vue";

export default {
  name: "WorkOrder",
  dicts: [
    "itr_fault_level",
    "itr_influence_level",
    "itr_emergency_degree",
    "itr_service_category",
    "itr_service_source",
    "itr_fault_type",
    "after_sale_area",
  ],
  props: {},
  components: {
    ImagePreview,
    Print,
    PersonnelBinding,
    ServiceListDialog,
  },
  data() {
    return {
      type: "",
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      spread: true,
      // 总条数
      total: 0,
      // 用户表格数据
      workOrderList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      deviceVisible: false,
      serviceTypeOptions: serviceType(),
      issueLevelOptions: [],
      requestStatusOptions: queryRequestState(),
      serviceCategoryOptions: serviceCategory(),
      problemClassificationOptions: [],
      openServiceListDialog: false,
      serviceRowData: [],
      // 是否显示弹出层
      open: false,
      // 是否显示维修弹出层
      openFix: false,
      // 打印弹出层
      printOpen: false,
      // 点击修改选中的数据
      rowData: {},
      rowPrintData: [],
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
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
      },
      chooseTypeDialog: false,
      rowDataId: "",
      statistics: {
        pending: 0,
        exec: 0,
        complete: 0,
      },
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
    async resetSearch() {
      this.$refs["queryForm"].resetFields();
      await this.resetQuery();
    },
    getLabelByValue(value, arr) {
      return getLabelByValue(value, arr);
    },
    serviceList() {
      if (!this.rowPrintData.length) {
        return this.$message.error("请选择要生成的数据");
      }
      let isCurrentClient = true;
      let isCurrentEquipmentInfo = true;
      let isState = true;
      let currentClientName = this.rowPrintData[0].clientName;
      let currentProductCode = this.rowPrintData[0].productCode;
      isCurrentClient = this.rowPrintData.every(
        (element) => element.clientName === currentClientName
      );
      isCurrentEquipmentInfo = this.rowPrintData.every(
        (element) => element.productCode === currentProductCode
      );
      isState = this.rowPrintData.every(
        (element) =>
          element.workOrderState === "workOrder_state_engineer_question_verify"
      );

      if (!isCurrentClient) {
        return this.$message.error("请选择相同客户");
      }
      if (!isCurrentEquipmentInfo) {
        return this.$message.error("请选择相同的设备");
      }
      if (!isState) {
        return this.$message.error("当前数据工单状态不允许生成服务单");
      }
      this.serviceRowData = this.rowPrintData.map((item) => {
        return item.workOrderId;
      });
      this.openServiceListDialog = true;
    },
    colseServiceListDialog(value) {
      this.openServiceListDialog = value;
    },
    /** 查询用户列表 */
    async getList() {
      this.queryParams.stateGroup = this.$route.query.stateGroup;
      await listOrder(this.queryParams).then((response) => {
        // debugger;
        let data = response.data;
        this.workOrderList = data.rows;
        this.total = data.total;
      });
      let Stat = {
        ...this.queryParams,
      };
      delete Stat.pageNum;
      delete Stat.pageSize;
      await listStat(Stat).then((res) => {
        if (res?.data) {
          this.statistics = { ...res.data };
        } else {
          this.statistics = {
            pending: 0,
            exec: 0,
            complete: 0,
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
      // console.log(selection);
      // this.ids = selection.map((item) => item.userId);
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
      this.rowPrintData = selection;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({
        path: "/request/requests-order-edit/index",
        query: { selectedServiceType: "malfunction_repair" },
      });
      // this.open = true;
      // this.chooseTypeDialog = true;
      // this.rowData = {};
    },
    openWork(val) {
      this.type = val;
      this.chooseTypeDialog = false;
      // this.open = true
      this.rowData = {};
      this.$router.push({
        path: "/request/requests-order-edit/index",
        query: { selectedServiceType: val },
      });
    },
    /** 点击工单操作 */
    maintenanceExecution(row) {
      let me = this;
      if (row.serviceType == "malfunction_repair") {
        this.$router.push({
          path: "/workorder/workorder-edit/index",
          query: {
            selectedServiceType: row.serviceType,
            workOrderId: row.workOrderId,
          },
        });
      } else {
        this.$router.push({
          path: "/request/requests-order-edit/index",
          query: {
            selectedServiceType: row.serviceType,
            id: row.id,
            actionType: "WORK_ORDER",
          },
        });
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      let me = this;
      if (row.serviceType == "malfunction_repair") {
        this.$router.push({
          path: "/workorder/workorder-edit/index",
          query: {
            selectedServiceType: row.serviceType,
            workOrderId: row.workOrderId,
          },
        });
      } else {
        this.$router.push({
          path: "/request/requests-order-edit/index",
          query: {
            selectedServiceType: row.serviceType,
            id: row.id,
            actionType: "WORK_ORDER",
          },
        });
      }
    },
    setUpSuccess(value, updata) {
      // this.getList();
      if (!updata) {
        this.$nextTick(() => {
          // 静态效果
          this.workOrderList.push(value);
        });
      } else {
        console.log(1);
      }
    },
    async closeDialog(value) {
      this.open = value;
      await this.getList();
    },
    async colseFixDialog(value) {
      this.openFix = value;
      await this.getList();
    },
    /** 打印按钮操作 */
    handlePrint() {
      if (!this.rowPrintData.length) {
        return this.$message.error("请选择要打印的数据");
      }
      this.rowDataId = this.rowPrintData[0].workOrderId;
      this.printOpen = true;
    },
    colsePrintDrawer(value) {
      this.printOpen = value;
    },
    handlePersonnel() {
      if (!this.rowPrintData.length) {
        return this.$message.error("请选择要转办的数据");
      }
      this.deviceVisible = true;
    },
    colsePersonnelDialog(value) {
      this.deviceVisible = value;
    },
    bindingData(value) {
      if (value.length) {
        transferOrder(value).then((res) => {
          this.$message.success(res.msg);
        });
      } else {
        this.$message.error("请选择转办人");
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      this.leadingOutXlsx();
    },
    leadingOutXlsx() {
      var data1 = [
        ["id", "name", "value"],
        [1, "sheetjs", 7262],
        [2, "js-xlsx", 6969],
      ];

      var data2 = [
        {
          周一: "语文",
          周二: "数学",
          周三: "历史",
          周四: "政治",
          周五: "英语",
        },
        {
          周一: "数学",
          周二: "数学",
          周三: "政治",
          周四: "英语",
          周五: "英语",
        },
        {
          周一: "政治",
          周二: "英语",
          周三: "历史",
          周四: "政治",
          周五: "数学",
        },
      ];

      //1. 新建一个工作簿
      let workbook = XLSX.utils.book_new();
      //2. 生成一个工作表，
      //2.1 aoa_to_sheet 把数组转换为工作表
      let sheet1 = XLSX.utils.aoa_to_sheet(data1);
      //2.2 把json对象转成工作表
      let sheet2 = XLSX.utils.json_to_sheet(data2);
      //3.在工作簿中添加工作表
      XLSX.utils.book_append_sheet(workbook, sheet1, "sheetName1"); //工作簿名称
      // XLSX.utils.book_append_sheet(workbook, sheet2, "sheetName2"); //工作簿名称
      // XLSX.utils.sheet_add_json(sheet1,data2);//把已存在的sheet中数据替换成json数据
      //4.输出工作表,由文件名决定的输出格式
      XLSX.writeFile(workbook, "workBook1.xlsx"); // 保存的文件名
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
    // 发起复盘
    startReview() {
      if (!this.rowPrintData.length) {
        return this.$message.error("请选择要发起复盘的数据");
      }
      this.$message.success("发起复盘成功");
    },
    async handleKeyWordQuery() {
      let params = {
        keyWord: this.queryParams.keyWord,
        pageSize: this.queryParams.pageSize,
        pageNum: this.queryParams.pageNum,
        stateGroup: this.queryParams.stateGroup,
      };
      await listOrder(params).then((response) => {
        // debugger;
        let data = response.data;
        this.workOrderList = data.rows;
        this.total = data.total;
      });
    },
  },
  computed: {
    date() {
      let timer = new Date().getTime();
      return timer;
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
::v-deep .el-table::before {
  height: 0;
}
::v-deep .el-table__fixed-right::before,
.el-table__fixed::before {
  height: 0;
}
::v-deep .el-table__fixed::before,
.el-table__fixed-right::before {
  height: 0;
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
