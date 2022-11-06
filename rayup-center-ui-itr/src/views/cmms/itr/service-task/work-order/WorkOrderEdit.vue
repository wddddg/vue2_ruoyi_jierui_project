<template>
  <div class="app-container">
    <div>
      <div slot="footer" class="dialog-footer">
          <jereh-button type="primary" plain @click="comeBack" icon="el-icon-back"
            >返回</jereh-button
          >
        <jereh-button type="primary" plain @click="submitForm" icon="el-icon-edit"
          >保存</jereh-button
        >
        <jereh-button type="primary" plain @click="openSP" icon="el-icon-s-check"
          >发起审批</jereh-button
        >
        <jereh-button type="primary" plain @click="openProblemWarning" icon="el-icon-warning-outline"
          >问题预警</jereh-button
        >
        <jereh-button type="primary" plain @click.native="toMQ" icon="el-icon-search"
          >物料查询</jereh-button
        >
        <jereh-button type="primary" plain @click="ServiceList(rowData)" icon="el-icon-s-order"
          >服务单</jereh-button
        >
        <jereh-button type="primary" plain @click="startSurvey" icon="el-icon-s-operation"
          >发起调研</jereh-button
        >
        <el-dropdown style="margin-left: 10px; margin-right: 10px">
          <jereh-button type="primary" plain>
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </jereh-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handlePrint"
              >打印</el-dropdown-item
            >
            <el-dropdown-item @click.native="sendEm">发邮件</el-dropdown-item>
            <el-dropdown-item @click.native="toCaseLibrary"
              >技术案例库</el-dropdown-item
            >
            <el-dropdown-item @click.native="openUpgradeDialog"
              >问题升级</el-dropdown-item
            >
            <el-dropdown-item @click.native="openTransferDialog"
              >问题转办</el-dropdown-item
            >
            <el-dropdown-item>图纸查询</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button type="primary" plain @click="closeWorkOrder"
          >关闭工单</el-button
        > -->

        <!-- <jereh-button type="info" plain @click="arrivalNoticeClick"
          >抓取ERP</jereh-button
        > -->
        <!-- <el-button type="primary" plain  v-show="showBtn">物料查询</el-button> -->
        <!-- <el-button type="primary" plain @click="toCaseLibrary" v-show="showBtn"></el-button> -->

      </div>
    </div>
    <el-button
      :icon="showStep == false ? 'el-icon-caret-left' : 'el-icon-caret-right'"
      circle
      @click="showBZ"
      :class="[showStep == false ? 'stepBtn' : 'stepBtn1']"
    ></el-button>
    <el-image
      :src="jieRuiItr"
      @click="showBZ"
      class="jie-rui-itr-image"
      fit="scale-down"
      :class="[showStep == false ? 'stepBtnImage' : 'stepBtnImage1']"
    ></el-image>
    <el-card
      class="right-card"
      :style="{ display: showStep == true ? 'block' : 'none' }"
    >
      <div class="steps">
        <el-steps
          direction="vertical"
          align-center
          finish-status="success"
          space
          ref="stepsBox"
        >
          <el-step
            v-for="(item, index) in stepStatus"
            :key="index"
            :status="item.status"
            @click.native="changeSteps(stepStatus.length - index)"
          >
            <template #icon>
              {{ stepStatus.length - index }}
            </template>
            <template #description>
              <div class="description-text">
                <div>{{ item.time }}</div>
                <div>{{ item.text }}</div>
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>
    </el-card>
    <el-card
      class="box-card"
      :style="{ marginRight: showStep == true ? '250px' : '0px' }"
    >
      <div slot="header" class="question">
        <div>
          工单执行-{{ rowData.projectCode }}-{{
            workOrderStateCode(rowData.state)
          }}
        </div>
      </div>
      <div class="question-content">
        <div style="width: 15%; text-align: center">
          <div class="workOrder">
            <div class="work-code-box">工单编码:</div>
            {{ rowData.workOrderCode || "" }}
          </div>
          <!-- <el-image
            style="width: 100px; height: 100px"
            src="https://gd-hbimg.huaban.com/07c6686e680086ee3c92eb48e10df3325832fac568d-uvzROb_fw658"
            fit="cover"
          ></el-image> -->
          <vue-qr :text="winHref" :size="100" :margin="0"></vue-qr>
        </div>
        <div class="topDiv">
          <el-descriptions
            :column="4"
            border
            :labelStyle="{
              width: '10%',
              height: '42px',
              fontSize: '14px',
              color: '#909399',
              background: '#eef1f8',
              whiteSpace: 'nowrap',
            }"
            :contentStyle="{
              width: '10%',
              color: '#606266',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }"
          >
            <el-descriptions-item :span="4">
              <template slot="label"> 故障描述 </template>
              {{ rowData.serviceDescription }}
            </el-descriptions-item>

            <el-descriptions-item :span="1">
              <template slot="label"> 产品名称 </template>
              {{ rowData.productName }}
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label"> 项目编码 </template>
              {{ rowData.projectCode }}
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label"> 项目编码分项 </template>
              {{ rowData.projectCodeSubentry }}
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label"> 产品编号 </template>
              {{ rowData.productCode }}
            </el-descriptions-item>

            <el-descriptions-item :span="1">
              <template slot="label"> 车牌号 </template>
              {{ rowData.licenseNumber }}
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label"> 紧急程度 </template>
              <dict-tag
                :options="dict.type.itr_emergency_degree"
                :value="rowData.emergencyDegree"
              />
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label"> 售后区域 </template>
              <dict-tag
                :options="dict.type.after_sale_area"
                :value="rowData.afterSaleArea"
              />
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label"> 市场负责人 </template>
              {{ rowData.marketChargeBy }}
            </el-descriptions-item>

            <el-descriptions-item :span="1">
              <template slot="label"> 问题处理人 </template>
              {{ rowData.engineerName }}
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label"> 服务需求时间 </template>
              {{ rowData.serviceRequiredTime }}
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label"> 创建时间 </template>
              {{ rowData.createTime }}
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label"> 派工时间 </template>
              {{ rowData.createTime }}
            </el-descriptions-item>

            <!-- <el-row>
              <el-row>
                <el-col :span="16">
                  <div>
                    <span class="top-div-title">故障描述: </span>
                    <span class="info">{{ rowData.serviceDescription }}</span>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <div>
                    <span class="top-div-title">产品名称: </span>
                    <span class="info">{{ rowData.productName }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <span class="top-div-title">项目编码: </span>
                    <span class="info">{{ rowData.projectCode }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <span class="top-div-title">项目编码分项:</span>
                    <span class="info">{{ rowData.projectCodeSubentry }}</span>
                  </div>
                </el-col>

                <el-col :span="6">
                  <div>
                    <span class="top-div-title">产品编号: </span>
                    <span class="info">{{ rowData.productCode }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <span class="top-div-title">车牌号: </span>
                    <span class="info">{{ rowData.licenseNumber }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="flex-box">
                    <span class="top-div-title">紧急程度: </span>
                    <span class="info">
                      <dict-tag
                        :options="dict.type.itr_emergency_degree"
                        :value="rowData.emergencyDegree"
                      />
                    </span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="flex-box">
                    <span class="top-div-title">售后区域: </span>
                    <span class="info">
                      <dict-tag
                        :options="dict.type.after_sale_area"
                        :value="rowData.afterSaleArea"
                      />
                    </span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <span class="top-div-title">市场负责人: </span>
                    <span class="info">{{ rowData.marketChargeBy }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <span class="top-div-title">问题处理人:</span>
                    <span class="info">{{ rowData.engineerName }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <span class="top-div-title">服务需求时间:</span>
                    <span class="info">{{ rowData.serviceRequiredTime }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <span class="top-div-title">创建时间: </span>
                    <span class="info">{{ rowData.createTime }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <span class="top-div-title">派工时间: </span>
                    <span class="info">{{ rowData.createTime }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-row> -->
          </el-descriptions>
        </div>
      </div>
    </el-card>
    <div
      class="drawer-box"
      :style="{ marginRight: showStep == true ? '250px' : '0px' }"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <!-- :rules="rules"  :before-leave='leaveTab' -->
        <el-row>
          <el-tabs
            v-model="activeName"
            type="border-card"
            ref="elTabs"
            :before-leave="leaveTab"
          >
            <el-tab-pane label="设备信息" name="first">
              <DeviceInfo :rowData="DeviceInfoData" />
            </el-tab-pane>
            <el-tab-pane label="故障信息" name="second">
              <QuestionInfo
                :rowData="QuestionInfoData"
                :WorkOrderCode="DeviceInfoData.workOrderCode"
              />
            </el-tab-pane>
            <el-tab-pane label="工时统计" name="third">
              <WorkHours
                :WorkHoursData="WorkHoursData"
                :WorkOrderCode="DeviceInfoData.workOrderCode"
              />
            </el-tab-pane>
            <el-tab-pane label="物料信息" name="fourth" lazy>
              <MaterielInfo
                :rowData="MaterielInfoData"
                :WorkOrderCode="DeviceInfoData.workOrderCode"
                @currentMaterielInfoTab="currentMaterielInfoTab"
              />
            </el-tab-pane>
            <el-tab-pane label="问题预警" name="fifth">
              <ProblemWarning
                :rowData="ProblemWarningData"
                :WorkOrderCode="DeviceInfoData.workOrderCode"
              />
            </el-tab-pane>
            <el-tab-pane label="升级转办" name="sixth">
              <UpgradeAndTransfer
                :rowData="UpgradeAndTransferData"
                :WorkOrderCode="DeviceInfoData.workOrderCode"
                :upgradeAndTransferList="upgradeAndTransferList"
              />
            </el-tab-pane>
            <!-- <el-tab-pane label="更多+" name="seventh" >
             </el-tab-pane>
             <el-tab-pane label="隐藏" name="eighth" >
             </el-tab-pane> -->
            <el-tab-pane label="物料查询" name="seven" lazy>
              <MaterialQueryEdit
                :rowData="MaterialQueryEditData"
                :defaultProjectCode="rowData.projectCode"
                :WorkOrderCode="DeviceInfoData.workOrderCode"
              />
            </el-tab-pane>
            <el-tab-pane label="关闭工单" name="eighth">
              <CloseWorkOrder :rowData="rowData" />
            </el-tab-pane>
            <el-tab-pane label="其他" name="ninth" lazy>
              <!-- <CloseWorkOrder :rowData="rowData" /> -->
              <Other :rowData="rowData" />
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-form>
      <ServiceListDialog
        :open="openServiceListDialog"
        @closeDialog="colseServiceListDialog"
        :rowData="serviceRowData"
        :serviceRecordId="rowData.serviceRecordId"
        @handleSuccess="handleSuccess"
      />
      <StartSurveyDialog
        :open="openStartSurveyDialog"
        @colseStartSurveyDialog="colseStartSurveyDialog"
        :serviceRecordId="rowData.serviceRecordId"
        :rowData="rowData"
      />
      <FixWorkOrderEMail
        :openEm="openFixWorkOrderEMail"
        @closeDialog="colseFixWorkOrderEMail"
      />
      <Print
        :open="printOpen"
        @colsePrintDrawer="colsePrintDrawer"
        :rowDataId="rowData.workOrderId"
      />
      <!-- <CloseWorkOrderDialog
        :open="openCloseWorkOrderDialog"
        @closeDialog="colseWorkOrderDialog"
        :rowData="rowData"
        @handleSuccess="handleSuccess"
      /> -->
      <UpgradeAndTransferDialog
        :title="upgradeAndTransferTitle"
        :type="upgradeAndTransferType"
        :open="openUpgradeAndTransferDialog"
        @closeDialog="colseUpgradeAndTransferDialog"
        @submit="submitUpgradeAndTransfer"
        :WorkOrderCode="DeviceInfoData.workOrderCode"
      />
      <ProblemWarningDialog
        :open="openProblemWarningDialog"
        @closeDialog="closeProblemWarning"
        @successSubmit="successProblemWarningSubmit"
      />
      <ERPMaterialQuery
        :openMQ="openERPMaterialQuery"
        :defaultProjectCode="rowData.projectCode"
        @closeDialog="colseERPMaterialQuery"
        @seletData="selectERPMaterialQueryInfo"
      />
    </div>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import vueQr from "vue-qr/src/packages/vue-qr.vue";
import UpgradeAndTransferDialog from "./components/UpgradeAndTransferDialog.vue";
import ProblemWarningDialog from "./components/ProblemWarningDialog.vue";
import jieRuiItrImage from "@/assets/jierui-itr.png";
import WorkHours from "./components/WorkHours.vue";
import MaterielInfo from "./components/MaterielInfo.vue";
import QuestionInfo from "./components/QuestionInfo.vue";
import ProblemWarning from "./components/ProblemWarning.vue";
import UpgradeAndTransfer from "./components/UpgradeAndTransfer.vue";
import { whether } from "@/utils/dictionary-service";
import DeviceInfo from "./components/DeviceInfo.vue";
import ServiceListDialog from "./components/ServiceListDialog.vue";
import StartSurveyDialog from "./components/StartSurveyDialog.vue";
// import ApprovalDialog from "./components/Approval.vue";
import CloseWorkOrder from "./components/CloseWorkOrder.vue";
import FixWorkOrderEMail from "./components/FixWorkOrderEMail.vue";
import Print from "@/views/cmms/itr/components/Print/index.vue";
import MaterialQueryEdit from "./components/MaterialQueryEdit.vue";
import Other from "./components/Other.vue";
import ERPMaterialQuery from "./components/ERPMaterialQuery.vue";
import {
  initProcess,
  updateOrder,
  updateStatus,
  getWorkOrder,
  queryListByIdAndType,
  updateState,
  hoursList,
  cooperationList,
  arrivalNotice,
  queryListByWorkOrderIdMaterialUsing,
  materialClaimList,
  queryListByApgradeAndRecipient,
} from "@/api/cmms/itr/work-order/order.api.js";
let workOrderStateList = [
  {
    value: "workOrder_state_allocation",
    label: "已派工",
    clickEvent: "workorder_event_allocation",
  },
  {
    value: "workOrder_state_order_affirm",
    label: "工单已确认",
    clickEvent: "workorder_event_order_affirm",
  },
  {
    value: "workOrder_state_engineer_depart",
    label: "工程师已出发",
    clickEvent: "workorder_event_engineer_depart",
  },
  {
    value: "workOrder_state_engineer_question_dispose",
    label: "处理中",
    clickEvent: "workorder_event_engineer_question_dispose",
  },
  {
    value: "workOrder_state_material_apply",
    label: "物料已申请",
    clickEvent: "workorder_event_material_apply",
  },
  {
    value: "workOrder_state_material_delivery",
    label: "物料已发货",
    clickEvent: "workorder_event_material_delivery",
  },
  {
    value: "workOrder_state_material_arrive",
    label: "物料已到达",
    clickEvent: "workorder_event_material_arrive",
  },
  {
    value: "workOrder_state_engineer_question_verify",
    label: "验证中",
    clickEvent: "workorder_event_engineer_question_verify",
  },
  {
    value: "workOrder_state_wait_evaluate",
    label: "已完成待评价",
    clickEvent: "workorder_event_wait_evaluate",
  },
  {
    value: "workOrder_state_complete_evaluate",
    label: "已评价",
    clickEvent: "workorder_event_complete_evaluate",
  },
];
let workHoursDataCopy = [];
let MaterialQueryEditDataCopy = [];
let ProblemWarningDataCopy = [];
export default {
  name: "WorkOrderEdit",
  dicts: ["itr_emergency_degree", "after_sale_area"],
  data() {
    return {
      winHref: window.location.href,
      openERPMaterialQuery: false,
      form: {},
      rowData: {},
      showStep: false,
      DeviceInfoData: {},
      QuestionInfoData: {},
      WorkHoursData: [],
      serviceRowData: [],
      MaterielInfoData: {
        workOrderMaterialUnwarrantyUpdateParamList: [],
        workOrderMaterialApplyUpdateParamList: [],
      },
      ProblemWarningData: [],
      UpgradeAndTransferData: {},
      MaterialQueryEditData: [],
      activeName: "first",
      stepStatus: [
        {
          time: "",
          text: "已评价",
          status: "wait",
        },
        {
          time: "",
          text: "已完成待评价",
          status: "wait",
        },
        {
          time: "",
          text: "验证中",
          status: "wait",
        },
        {
          time: "",
          text: "物料已到达",
          status: "wait",
        },
        {
          time: "",
          text: "物料已发货",
          status: "wait",
        },
        {
          time: "",
          text: "物料已申请",
          status: "wait",
        },
        {
          time: "",
          text: "处理中",
          status: "wait",
        },
        {
          time: "",
          text: "工程师已出发",
          status: "wait",
        },
        {
          time: "",
          text: "工单已确认",
          status: "wait",
        },
      ],
      isAgreementOptions: whether(),
      openServiceListDialog: false,
      // openCloseWorkOrderDialog: false,
      showMQ: false,
      openFixWorkOrderEMail: false,
      // 打印弹出层
      printOpen: false,
      showBtn: false,
      showTab: false,
      jieRuiItr: jieRuiItrImage,
      // ---------------------升级转办------------------------
      openUpgradeAndTransferDialog: false,
      upgradeAndTransferType: "Upgrade",
      upgradeAndTransferTitle: "升级",
      upgradeAndTransferList: [],
      // ----------------------------------------------------
      // ---------------------问题预警------------------------
      openProblemWarningDialog: false,
      // ----------------------------------------------------
      currentMaterielInfoTabItem: "first",
      openStartSurveyDialog: false,
    };
  },
  components: {
    CloseWorkOrder,
    // ApprovalDialog,
    DeviceInfo,
    WorkHours,
    QuestionInfo,
    MaterielInfo,
    ServiceListDialog,
    ProblemWarning,
    UpgradeAndTransfer,
    FixWorkOrderEMail,
    Print,
    MaterialQueryEdit,
    UpgradeAndTransferDialog,
    ProblemWarningDialog,
    Other,
    vueQr,
    ERPMaterialQuery,
    StartSurveyDialog,
  },
  props: {
      defaultProjectCode:String,
    // rowData: {
    //   type: Object,
    //   default: () => {
    //     return {};
    //   },
    // },
    title: {
      type: String,
      default: () => {
        return "修改";
      },
    },
  },
  async created() {
    await this.initWorkOrderInfo();
  },
  methods: {
    // ----------------问题预警-----------------
    openProblemWarning() {
      this.openProblemWarningDialog = true;
    },
    closeProblemWarning(value) {
      this.openProblemWarningDialog = value;
    },
    async successProblemWarningSubmit(value) {
      this.openProblemWarningDialog = false;
      await cooperationList({
        workOrderId: this.DeviceInfoData.workOrderId,
        workOrderCode: this.DeviceInfoData.workOrderCode,
      }).then((res) => {
        this.ProblemWarningData = res.data || [];
        ProblemWarningDataCopy = JSON.parse(JSON.stringify(res.data)) || [];
      });
    },
    // ----------------------------------------
    // ----------------升级转办-----------------
    openUpgradeDialog() {
      this.upgradeAndTransferType = "Upgrade";
      this.upgradeAndTransferTitle = "升级";
      this.openUpgradeAndTransferDialog = true;
    },
    openTransferDialog() {
      this.upgradeAndTransferType = "Transfer";
      this.upgradeAndTransferTitle = "转办";
      this.openUpgradeAndTransferDialog = true;
    },
    colseUpgradeAndTransferDialog(value) {
      this.openUpgradeAndTransferDialog = value;
    },
    async submitUpgradeAndTransfer(value) {
      await queryListByApgradeAndRecipient({
        workOrderId: this.$route.query.workOrderId,
      }).then((res) => {
        this.upgradeAndTransferList = res.data || [];
      });
      this.openUpgradeAndTransferDialog = value;
    },
    // ------------------------------------------
    async handleSuccess() {
      await this.initWorkOrderInfo();
    },
    comeBack() {
      this.$router.back();
    },
    async initWorkOrderInfo() {
      const serviceType = this.$route.query.selectedServiceType;
      const workOrderId = this.$route.query.workOrderId;
      this.form.serviceType = serviceType;
      await getWorkOrder(workOrderId).then((resp) => {
        this.rowData = resp.data;
      });
      await queryListByWorkOrderIdMaterialUsing({ workOrderId }).then((res) => {
        this.$set(this.DeviceInfoData, "deviceInfoList", res.data || []);
      });
      await materialClaimList({ workOrderId }).then((res) => {
        this.$set(
          this.QuestionInfoData,
          "keyMaterialsItemsList",
          res.data || []
        );
      });
      this.$forceUpdate();
      await this.getListByIdAndType();
      this.$set(
        this.QuestionInfoData,
        "serviceDescription",
        this.rowData.serviceDescription || ""
      );
    },
    async getListByIdAndType() {
      let currentState = 0;
      let timer = [];
      await queryListByIdAndType({
        businessId: this.$route.query.workOrderId,
        businessType: "work_order",
      }).then((res) => {
        this.stepStatus.forEach((item, index) => {
          if (this.workOrderStateCode(res.data[0].newState) === item.text) {
            currentState = this.stepStatus.length - index;
          }
        });
        timer = res.data.map((item) => {
          return item.createTime;
        });
      });
      for (let index = 0; index < currentState; index++) {
        if (currentState >= this.stepStatus.length) {
          this.stepStatus[this.stepStatus.length - index - 1].status =
            "process";
        } else {
          this.stepStatus[this.stepStatus.length - index - 1 - 1].status =
            "process";
        }
        this.stepStatus[this.stepStatus.length - index - 1].time =
          timer[currentState - index - 1];
        this.stepStatus[this.stepStatus.length - index - 1].status = "success";
      }
    },
    // closeWorkOrder() {
    //   this.openCloseWorkOrderDialog = true;
    // },
    showBZ() {
      this.showStep = !this.showStep;
      this.$refs["stepsBox"].stepOffset = 180;
      console.log(this.$refs["stepsBox"]);
    },
    async leaveTab(activeName, oldActiveName) {
      // console.log(activeName, oldActiveName);
      // if (activeName == "seventh") {
      //   this.showTab = true;
      //   this.activeName = oldActiveName;
      // }
      // if (activeName == "eighth") {
      //   this.showTab = false;
      //   this.activeName = oldActiveName;
      // }
      if (oldActiveName === "third") {
        if (
          !(
            JSON.stringify(this.WorkHoursData.sort()) ===
            JSON.stringify(workHoursDataCopy.sort())
          )
        ) {
          this.activeName = oldActiveName;
          try {
            await this.$confirm("内容未保存，是否保存", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            });
            await this.submitForm();
          } catch (e) {}
        }
      } else if (oldActiveName === "fifth") {
        if (
          !(
            JSON.stringify(this.ProblemWarningData.sort()) ===
            JSON.stringify(ProblemWarningDataCopy.sort())
          )
        ) {
          this.activeName = oldActiveName;
          return this.$confirm("内容未保存，是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              await this.submitForm();
            })
            .catch(() => {});
        }
      }

      // ============================物料查询保存失败---------------------------
      // else if (oldActiveName === "seven") {
      //   if (
      //     !(
      //       JSON.stringify(this.MaterialQueryEditData.sort()) ===
      //       JSON.stringify(MaterialQueryEditDataCopy.sort())
      //     )
      //   ) {
      //     this.activeName = oldActiveName;
      //     // console.log(JSON.stringify(MaterialQueryEditDataCopy.sort()));
      //     // console.log(JSON.stringify(this.MaterialQueryEditData.sort()));
      //     return this.$confirm("内容未保存，是否保存", "提示", {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //       type: "warning",
      //     })
      //       .then(async () => {
      //         await this.submitForm();
      //       })
      //       .catch(() => {});
      //   }
      // }
      // ---------------------------------------------------------------------
    },
    saveCurrentTabsInfo() {
      if (this.activeName === "third") {
        workHoursDataCopy = JSON.parse(JSON.stringify(this.WorkHoursData));
      } else if (this.activeName === "fifth") {
        ProblemWarningDataCopy = JSON.parse(
          JSON.stringify(this.ProblemWarningData)
        );
      }

      // ============================物料查询保存失败---------------------------
      // else if (this.activeName === "seven") {
      //   MaterialQueryEditDataCopy = JSON.parse(
      //     JSON.stringify(this.rowData.workOrderMaterialBindVoList)
      //   );
      // }
      // ---------------------------------------------------------------------
    },
    moreBtn() {
      this.showBtn = !this.showBtn;
    },
    /** 打印按钮操作 */
    handlePrint() {
      this.printOpen = true;
    },
    colsePrintDrawer(value) {
      this.printOpen = value;
    },
    //服务单弹框
    ServiceList() {
      if (
        !(
          this.rowData.state == "workOrder_state_engineer_question_verify" ||
          this.rowData.state == "workOrder_state_wait_evaluate" ||
          this.rowData.state == "workOrder_state_complete_evaluate"
        )
      ) {
        return this.$message.error("当前数据工单状态不允许生成服务单");
      }
      this.serviceRowData = [this.rowData.workOrderId];
      this.openServiceListDialog = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //修改步骤
    changeSteps(stepStatus) {
      if (stepStatus > 3 && stepStatus != 7) {
          this.$message.error("该状态不能直接更新");
        return;
      }
      // if (
      //   this.stepStatus[this.stepStatus.length - stepStatus].status ===
      //   "success"
      // ) {
      //   return;
      // }
      // if (
      //   this.stepStatus[this.stepStatus.length - stepStatus + 1]?.status &&
      //   !(
      //     this.stepStatus[this.stepStatus.length - stepStatus + 1].status ===
      //     "success"
      //   )
      // ) {
      //   return this.$message.error("请确认上一步");
      // }
      this.$confirm("确定更新工单状态？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let stateCode = this.workOrderStateEvent(
            this.stepStatus[this.stepStatus.length - stepStatus].text
          );
          await updateState({
            event: stateCode,
            workOrderId: this.DeviceInfoData.workOrderId,
          }).then(async (res) => {
            for (let index = 0; index < this.stepStatus.length; index++) {
              this.stepStatus[index].status = "wait";
            }
            for (let index = 0; index < stepStatus; index++) {
              this.stepStatus[
                this.stepStatus.length - (stepStatus - index)
              ].status = "success";
              this.stepStatus[
                this.stepStatus.length - (stepStatus + 1)
              ].status = "process";
            }
            await this.initWorkOrderInfo();
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    async openSP() {
      // await this.submitForm();
      this.$router.push(
        "/workorder/workorder-edit/approval?id=" + this.$route.query.workOrderId
      );
    },
    // 发起调研
    startSurvey() {
      this.openStartSurveyDialog = true;
    },
    //发邮件
    sendEm() {
      this.openFixWorkOrderEMail = true;
    },
    //物料查询
    toMQ() {
      // this.activeName = "seven";
      this.openERPMaterialQuery = true;
    },
    colseERPMaterialQuery(value) {
      this.openERPMaterialQuery = value;
    },
    selectERPMaterialQueryInfo(value) {
      value.forEach((element) => {
        element.workOrderId = this.id;
        element.workOrderCode = this.WorkOrderCode;
      });
      this.MaterialQueryEditData.push(...value);
    },
    toCaseLibrary() {
      window.location.href = "www.baidu.com";
    },
    colseServiceListDialog(value) {
      this.openServiceListDialog = value;
    },
    colseStartSurveyDialog(value) {
      this.openStartSurveyDialog = value;
    },
    // colseWorkOrderDialog(value) {
    //   this.openCloseWorkOrderDialog = value;
    // },
    colseFixWorkOrderEMail(value) {
      this.openFixWorkOrderEMail = value;
    },
    /** 提交按钮 */
    async submitForm() {
      let params = {
        ...this.DeviceInfoData,
        id: this.DeviceInfoData.workOrderId,
        serviceRequestId: this.DeviceInfoData.id,
        workOrderMaterialBindUpdateParamList: undefined,
        workOrderFaultUpdateParam: undefined,
        workOrderHoursUpdateParams: undefined,
        workOrderMaterialUnwarrantyUpdateParamList: undefined,
        workOrderMaterialApplyUpdateParamList: undefined,
        workOrderCooperationUpdateParamList: undefined,
        itrWorkOrderMaterialRemainUpdateParams: undefined,
        itrWorkOrderMaterialClaimUpdateParams: undefined,
        itrWorkOrderMaterialUsedUpdateParams: undefined,
        itrWorkOrderMaterialUsingUpdateParams: undefined,
        itrWorkOrderCostUpdateParams: undefined,
      };

      if (this.activeName === "ninth") {
        params.itrWorkOrderCostUpdateParams =
          this.rowData.itrWorkOrderCostUpdateParams;
      }

      if (this.activeName === "seven") {
        params.workOrderMaterialBindUpdateParamList =
          this.MaterialQueryEditData || [];
        try {
          this.MaterialQueryEditData.forEach((item) => {
            if (!item.appyNumber) {
              this.$message.error("请完善需求数量");
              throw new Error("EndIterative");
            }
            if (item.isKey === null) {
              this.$message.error("请完善是否关键物料");
              throw new Error("EndIterative");
            }
          });
        } catch (e) {
          if (e.message != "EndIterative") {
            throw e;
          } else {
            return;
          }
        }
      }
      if (this.activeName === "fifth") {
        params.workOrderCooperationUpdateParamList =
          this.ProblemWarningData || [];
      }

      if (this.activeName === "third") {
        params.workOrderHoursUpdateParams = this.WorkHoursData || [];
      }

      if (
        this.activeName === "fourth" &&
        this.currentMaterielInfoTabItem === "first"
      ) {
        params.workOrderMaterialApplyUpdateParamList =
          this.MaterielInfoData.workOrderMaterialApplyUpdateParamList || [];
        params.itrWorkOrderMaterialRemainUpdateParams =
          this.MaterielInfoData.itrWorkOrderMaterialRemainUpdateParams || [];
      }
      if (
        this.activeName === "fourth" &&
        this.currentMaterielInfoTabItem === "second"
      ) {
        params.itrWorkOrderMaterialUsedUpdateParams =
          this.MaterielInfoData.itrWorkOrderMaterialUsedUpdateParams || [];
      }
      if (
        this.activeName === "fourth" &&
        this.currentMaterielInfoTabItem === "third"
      ) {
        params.workOrderMaterialUnwarrantyUpdateParamList =
          this.MaterielInfoData.workOrderMaterialUnwarrantyUpdateParamList ||
          [];
      }
      if (this.activeName === "second") {
        params.workOrderFaultUpdateParam = this.QuestionInfoData || {};
        if (params.workOrderFaultDetailVo.seriousUserName) {
          let data = params.workOrderFaultDetailVo.seriousUserName.split(",");
          let list = [];
          data.forEach((item, index) => {
            list.push(
              params.workOrderFaultDetailVo["upgradeProcessResultList" + index]
            );
          });
          params.workOrderFaultUpdateParam.upgradeProcessResult =
            list.join(",");
        }
      }
      // this.MaterielInfoData.itrWorkOrderMaterialRemainUpdateParams.forEach(
      //   (item) => {
      //     item.applyId = item.id;
      //   }
      // );
      this.saveCurrentTabsInfo();
      await this.$refs["form"].validate(async (valid) => {
        if (valid) {
          await updateOrder(params).then(async (response) => {
            this.$modal.msgSuccess("修改成功");
            await this.initWorkOrderInfo();
          });
        } else {
          return false;
        }
      });
    },
    workOrderStateCode(value) {
      return (
        workOrderStateList.filter((item) => {
          return value === item.value;
        })[0]?.label || ""
      );
    },
    workOrderStateName(value) {
      return (
        workOrderStateList.filter((item) => {
          return value === item.label;
        })[0]?.value || ""
      );
    },
    workOrderStateEvent(value) {
      return (
        workOrderStateList.filter((item) => {
          return value === item.label;
        })[0]?.clickEvent || ""
      );
    },
    async arrivalNoticeClick() {
      let formData = new FormData();
      formData.append("workOrderId", this.rowData.workOrderId);
      await arrivalNotice(formData).then(async (res) => {
        if (res.code === 200) {
          await this.handleSuccess();
          this.$message.success("发送成功");
        }
      });
    },
    currentMaterielInfoTab(value) {
      this.currentMaterielInfoTabItem = value;
    },
  },
  watch: {
    rowData: {
      handler(nV) {
        const workOrderId = this.$route.query.workOrderId;
        this.DeviceInfoData = nV || {};
        this.MaterialQueryEditData = nV.workOrderMaterialBindVoList || [];
        this.QuestionInfoData = nV.workOrderFaultDetailVo || {};
        this.QuestionInfoData.serviceResultCode = nV.serviceRecordId;
        if (!this.QuestionInfoData.resolveUserBy) {
          this.QuestionInfoData.resolveUserBy = nV.engineerName || "";
        }
        this.QuestionInfoData.seriousUserName = nV.seriousUserName;
        this.QuestionInfoData.closeTime = nV.closeTime;
        this.QuestionInfoData.completeTime = nV.completeTime;
        this.QuestionInfoData.emergencyDegree = nV.emergencyDegree;
        this.QuestionInfoData.serviceRequestCode = nV.serviceRequestCode;
        this.QuestionInfoData.faultLevel = nV.faultLevel;
        this.QuestionInfoData.workOrderId = workOrderId;
        this.QuestionInfoData.workOrderCode = nV.workOrderCode;
      },
      deep: true,
    },
    activeName: {
      async handler(nV, oV) {
        // if (nV === "seven") {
        //   await bindList({ workOrderId: this.DeviceInfoData.workOrderId }).then(
        //     (res) => {
        //       console.log(res);
        //       this.MaterialQueryEditData = res.data || [];
        //     }
        //   );
        // } else if (nV === "second") {
        //   await queryByWorkOrderId({
        //     workOrderId: this.DeviceInfoData.workOrderId,
        //   }).then((res) => {
        //     this.QuestionInfoData = res.data || {};
        //     this.QuestionInfoData.workOrderId = this.DeviceInfoData.workOrderId;
        //     this.QuestionInfoData.workOrderCode =
        //       this.DeviceInfoData.workOrderCode;
        //   });
        // }
        if (nV === "third") {
          await hoursList({
            workOrderId: this.DeviceInfoData.workOrderId,
          }).then((res) => {
            this.WorkHoursData = res.data || [];
            workHoursDataCopy = JSON.parse(JSON.stringify(res.data)) || [];
          });
        } else if (nV === "fifth") {
          await cooperationList({
            workOrderId: this.DeviceInfoData.workOrderId,
            workOrderCode: this.DeviceInfoData.workOrderCode,
          }).then((res) => {
            this.ProblemWarningData = res.data || [];
            ProblemWarningDataCopy = JSON.parse(JSON.stringify(res.data)) || [];
          });
        } else if (nV === "sixth") {
          await queryListByApgradeAndRecipient({
            workOrderId: this.$route.query.workOrderId,
          }).then((res) => {
            this.upgradeAndTransferList = res.data || [];
          });
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .el-drawer__body {
//   padding-right: 13% !important;
// }
.topForm {
  .el-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.topDiv {
  width: 85%;
  span {
    font-size: 14px;
    color: rgb(96, 98, 102);
    font-weight: bold;
    margin-right: 5px;
    text-align: left;
  }
  .top-div-title {
    text-align: right;
    width: 90px;
    display: inline-block;
  }
  .info {
    color: #000;
    font-weight: normal;
  }
  .el-col {
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.workOrder {
  text-align: center;
  position: relative;
  bottom: 14px;
  right: 0px;
  .work-code-box {
    font-size: 14px;
    color: #606266;
    font-weight: bold;
    margin-right: 5px;
    text-align: center;
  }
}

.drawer-box {
  margin-top: 10px;
  // .title {
  //   // margin: 10px 0px 20px 0;
  //   text-align: center;
  //   font-size: 18px;
  //   font-weight: 800;
  // }
  .showBtn {
    margin: 10px 12px;
  }
  .tableBtn {
    margin: 20px 17px;
    text-align: right;
    padding-bottom: 20px;
  }
  .markerEmail {
    display: flex;
    justify-content: flex-end;
    margin: 10px 12px;
    text-align: right;
  }
  .basidRemark {
    margin: 0 0 20px 40px;
    color: red;
    font-size: 10px;
  }
  .tableTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .tt {
      font-size: 18px;
      font-weight: 800;
    }
  }
}
.dialog-footer {
  position: relative;
  height: 50px;
  // position: relative;
  margin-bottom: 10;

  .back {
    position: absolute;
    right: 0;
  }
}
.question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 800;
}
.question-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: -10px 0px;
}
.question-title {
  margin-bottom: 10px;
}
.right-card {
  z-index: 998;
  height: 100%;
  position: fixed;
  // float: right;
  right: 0;
  .steps {
    height: 700px;
  }
}
.stepBtn {
  position: fixed;
  // float: right;
  top: 435px;
  right: 1%;
  z-index: 999;
}
.stepBtn1 {
  position: fixed;
  // float: right;
  top: 435px;
  right: 235px;
  z-index: 999;
}
.stepBtnImage {
  position: fixed;
  // float: right;
  top: 370px;
  right: 1%;
  z-index: 999;
}
.stepBtnImage1 {
  position: fixed;
  // float: right;
  top: 370px;
  right: 235px;
  z-index: 999;
}
.description-text {
  display: flex;
  align-items: center;
  width: 176px;

  div:nth-child(1) {
    width: 50%;
  }
  div:nth-child(2) {
    width: 50%;
    text-align: center;
    font-size: 16px;
    white-space: nowrap;
  }
}
.right-btn {
  position: absolute;
  right: 0;
}
.flex-box {
  display: flex;
  align-items: center;
}
.jie-rui-itr-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
::v-deep .el-tabs__item {
  font-size: 15px;
}
</style>
