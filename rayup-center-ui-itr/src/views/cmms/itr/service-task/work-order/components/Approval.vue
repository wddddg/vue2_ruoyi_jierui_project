<template>
  <div>
    <div class="initiate-approval-button">
      <jereh-button type="primary" plain @click="comeBack">返回</jereh-button>
      <jereh-button type="primary" plain @click="initiateApproval"
        >发起审批</jereh-button
      >
    </div>
    <el-card>
      <el-form ref="form" :model="approvalData" label-width="110px">
        <el-card class="box-card">
          <el-row>
            <div class="title">基础信息</div>
            <div class="line"></div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目编码" prop="projectCode">
                  <el-input
                    v-model="approvalData.projectCode"
                    disabled
                    maxlength="30"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目编码分项" prop="projectCodeSubentry">
                  <el-input
                    v-model="approvalData.projectCodeSubentry"
                    disabled
                    maxlength="30"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品编号" prop="productCode">
                  <el-input
                    v-model="approvalData.productCode"
                    disabled
                    maxlength="11"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="底盘VIN码" prop="chassisVin">
                  <el-input
                    v-model="approvalData.chassisVin"
                    disabled
                    maxlength="30"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车牌号" prop="licenseNumber">
                  <el-input
                    v-model="approvalData.licenseNumber"
                    maxlength="50"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品名称" prop="productName">
                  <el-input
                    v-model="approvalData.productName"
                    disabled
                    maxlength="11"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="产品型号" prop="productModel">
                  <el-input
                    v-model="approvalData.productModel"
                    disabled
                    maxlength="50"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="售后区域" prop="afterSaleArea">
                  <!-- <el-input
                    v-model="approvalData.afterSaleArea"
                    disabled
                    maxlength="50"
                  /> -->
                  <jereh-select
                    v-model="approvalData.afterSaleArea"
                    filterable
                    ph="请选择售后区域"
                    :dict="dict.type.after_sale_area"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务类别" prop="serviceCategory">
                  <jereh-select
                    v-model="approvalData.serviceCategory"
                    filterable
                    ph=""
                    :dict="dict.type.itr_service_category"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="市场负责人" prop="marketChargeBy">
                  <el-input v-model="approvalData.marketChargeBy" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市场区域" prop="marketArea">
                  <!-- <el-input
                    v-model="approvalData.marketArea"
                    placeholder="请输入市场区域"
                    disabled
                  /> -->
                  <jereh-select
                    v-model="approvalData.marketArea"
                    filterable
                    ph="请选择市场区域"
                    :dict="dict.type.device_area"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="质保终止日期" prop="qualityExpirationDate">
                  <el-input
                    v-model="approvalData.qualityExpirationDate"
                    maxlength="50"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-col :span="8">
            <el-form-item label="设备地点" prop="eqpPlace">
              <el-input v-model="approvalData.eqpPlace" disabled maxlength="50" />
            </el-form-item>
          </el-col> -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户名称" prop="clientName">
                  <el-input
                    v-model="approvalData.clientName"
                    disabled
                    maxlength="50"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="现场联系人" prop="contactUserName">
                  <el-input
                    v-model="approvalData.contactUserName"
                    disabled
                    maxlength="50"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系方式" prop="contactUserInfo">
                  <!-- 选择 -->
                  <el-input
                    v-model="approvalData.contactUserInfo"
                    disabled
                    maxlength="50"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="台上发动机小时数"
                  prop="engineUseTime"
                  label-width="124px"
                >
                  <el-input v-model="approvalData.engineUseTime" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="底盘行驶里程" prop="chassisMileage">
                  <el-input v-model="approvalData.chassisMileage" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务地点" prop="serviceJobsite">
                  <el-input v-model="approvalData.serviceJobsite" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否有框架协议" prop="isOutlineAgreement">
                  <el-select v-model="approvalData.isOutlineAgreement" disabled>
                    <el-option
                      v-for="item in isAgreementOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务需求时间" prop="serviceRequiredTime">
                  <el-input
                    v-model="approvalData.serviceRequiredTime"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="服务类型" prop="serviceType">
                  <el-input v-model="approvalData.serviceType" disabled>
                  </el-input>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <el-row>
            <div class="title">故障信息</div>
            <div class="line"></div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="工单编码" prop="projectCode">
                  <el-input
                    v-model="approvalData.workOrderCode"
                    disabled
                    maxlength="30"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="紧急程度" prop="emergencyDegree">
                  <jereh-select
                    v-model="approvalData.emergencyDegree"
                    filterable
                    disabled
                    ph=""
                    :dict="dict.type.itr_emergency_degree"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="问题处理人" prop="resolveUserBy">
                  <el-select
                    v-model="approvalData.resolveUserBy"
                    multiple
                    placeholder=""
                    ref="cascader"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="故障类型" prop="faultType">
                  <jereh-select
                    v-model="workOrderFaultDetailVo.faultType"
                    filterable
                    ph=""
                    :dict="dict.type.itr_fault_type"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="故障等级" prop="faultLevel">
                  <jereh-select
                    v-model="workOrderFaultDetailVo.faultLevel"
                    filterable
                    ph=""
                    :dict="dict.type.itr_fault_level"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="类型细分" prop="faultSubType">
                  <el-input
                    v-model="workOrderFaultDetailVo.faultSubType"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否重复发生" prop="isRepeat">
                  <el-select
                    v-model="workOrderFaultDetailVo.isRepeat"
                    placeholder=""
                    disabled
                  >
                    <el-option
                      v-for="item in trueOrFalseOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="故障代号" prop="faultCode">
                  <el-input
                    v-model="workOrderFaultDetailVo.faultCode"
                    maxlength="50"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-col :span="8">
            <el-form-item label="设备地点" prop="eqpPlace">
              <el-input v-model="approvalData.eqpPlace" disabled maxlength="50" />
            </el-form-item>
          </el-col> -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="故障描述" prop="serviceDescription">
                  <el-input
                    v-model="approvalData.serviceDescription"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="详情描述" prop="workOrderDescription">
                  <el-input
                    v-model="workOrderFaultDetailVo.workOrderDescription"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="原因分析" prop="reasonAnalyse">
                  <!-- 选择 -->
                  <el-input
                    v-model="workOrderFaultDetailVo.reasonAnalyse"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="原因类型" prop="reasonType">
                  <jereh-select
                    v-model="workOrderFaultDetailVo.reasonType"
                    filterable
                    ph="请输入原因类型"
                    :dict="dict.type.itr_reason_type"
                    disabled
                  ></jereh-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他原因说明" prop="otherReasonRemark">
                  <el-input
                    v-model="workOrderFaultDetailVo.otherReasonRemark"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="计划处理措施" prop="planProcessResult">
                  <el-input
                    v-model="workOrderFaultDetailVo.planProcessResult"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否提供资源" prop="isProvideResources">
                  <el-input
                    v-model="workOrderFaultDetailVo.isProvideResources"
                    disabled
                    maxlength="11"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资源提供人" prop="solutionSupplier">
                  <el-select
                    v-model="workOrderFaultDetailVo.solutionSupplier"
                    multiple
                    placeholder="请选择资源提供人"
                    ref="cascader"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="故障照片/视频" prop="resolutionAttachment">
                  <!-- <el-input
                    v-model="approvalData.resolutionAttachment"
                    disabled
                  /> -->
                  <FileUpload
                    v-model="approvalData.resolutionAttachment"
                    :isShowTip="false"
                    :fileType="[
                      'doc',
                      'xls',
                      'ppt',
                      'txt',
                      'pdf',
                      'png',
                      'jpg',
                      'jpeg',
                    ]"
                    disabled
                  />
                  <!-- <el-button type="primary" size="mini">上传附件</el-button>
                  <el-button type="primary" size="mini" @click="handleExport"
                    >下载附件</el-button
                  > -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <el-row>
            <!-- <div class="title">技术方案</div> -->
            <div class="title">附件</div>
            <div class="line"></div>
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="方案提供人" prop="solutionSupplier">
                  <el-input
                    v-model="workOrderFaultDetailVo.solutionSupplier"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <!-- <el-col :span="24">
                <el-form-item label="技术方案概述" prop="jsfagk">
                  <el-input
                    v-model="approvalData.jsfagk"
                    placeholder="请输入技术方案概述"
                  />
                </el-form-item>
              </el-col> -->
              <el-col :span="24">
                <el-form-item label="资源支持说明" prop="zyzcsm">
                  <el-input
                    v-model="approvalData.zyzcsm"
                    placeholder="请输入资源支持说明"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <!-- <el-form-item label="技术方案附件" prop="mileage">
                  <el-input v-model="approvalData.mileage" disabled />
                </el-form-item> -->
                <el-form-item label="附件" prop="attachment">
                  <FileUpload
                    v-model="approvalData.attachment"
                    :isShowTip="false"
                    :fileType="[
                      'doc',
                      'xls',
                      'ppt',
                      'txt',
                      'pdf',
                      'png',
                      'jpg',
                      'jpeg',
                    ]"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="16" style="text-align: right">
                <jereh-button type="primary">上传附件</jereh-button>
                <jereh-button type="primary" @click="handleExport"
                  >下载附件</jereh-button
                >
              </el-col>
            </el-row>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div class="Tabletitle">
            <div class="tbtitle">物料明细</div>
            <div class="btn" style="text-align: right">
              <jereh-button type="primary">上传附件</jereh-button>
              <jereh-button type="primary" @click="handleExport"
                >下载模板</jereh-button
              >
            </div>
          </div>
          <div class="line"></div>
          <el-row>
            <el-table :data="approvalData.workOrderMaterialBindVoList">
              <el-table-column
                align="center"
                label="序号"
                type="index"
                width="50"
              />
              <el-table-column
                align="center"
                label="物料编码"
                prop="materialCode"
              >
                <template slot-scope="scope">
                  <el-input
                    type="text"
                    v-model="scope.row.materialCode"
                    @focus="openMateriel(scope)"
                  />
                </template>
              </el-table-column>
              <el-table-column align="center" label="数量" prop="appyNumber">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.appyNumber" />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="物料描述"
                prop="materialName"
              >
                <template slot-scope="scope">
                  <el-input
                    type="text"
                    v-model="scope.row.materialName"
                    @focus="openMateriel(scope)"
                  />
                </template>
              </el-table-column>
              <el-table-column align="center" label="是否关键物料" prop="isKey">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.isKey">
                    <el-option
                      v-for="item in trueOrFalseOptions"
                      :key="item.value"
                      :label="item.label"
                      v-model="item.value"
                      placeholder=""
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="是否产生旧件"
                prop="keyMaterial"
              >
                <template slot-scope="scope">
                  <el-select v-model="scope.row.isProduceUsed">
                    <el-option
                      v-for="item in trueOrFalseOptions"
                      :key="item.value"
                      :label="item.label"
                      v-model="item.value"
                      placeholder="请选择是否产生旧件"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="是否索赔"
                prop="keyMaterial"
              >
                <template slot-scope="scope">
                  <el-select v-model="scope.row.isProduceClaimMaterial">
                    <el-option
                      v-for="item in trueOrFalseOptions"
                      :key="item.value"
                      :label="item.label"
                      v-model="item.value"
                      placeholder="请选择是否索赔"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                  <el-button type="text" size="mini" @click="addEqpItem()"
                    >新增</el-button
                  >
                </template>
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="remove(scope)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </el-form>
    </el-card>
    <MaterialNumberQuery
      :openMQ="openMaterialQueryDialog"
      @closeDialog="closeMaterialQueryDialog"
      @seletData="seletMaterialQueryData"
    />
  </div>
</template>

<script>
import {
  serviceCategory,
  requestSource,
  whether,
  serviceType,
  requestProperty,
} from "@/utils/dictionary-service";
import MaterialNumberQuery from "./MaterialNumberQuery.vue";
import {
  initProcess,
  updateOrder,
  updateStatus,
  getWorkOrder,
  submitServiceOrder,
} from "@/api/cmms/itr/work-order/order.api.js";
export default {
  name: "ApprovalDialog",
  dicts: [
    "itr_fault_level",
    "itr_fault_type",
    "itr_emergency_degree",
    "itr_service_category",
    "itr_reason_type",
    "after_sale_area",
    "device_area",
  ],
  data() {
    return {
      deviceVisible: false,
      isUpdata: false,
      myLabel: { width: "170px" },
      serviceInfo: { height: "100px" },
      ipt: { width: "330px" },
      // fuwuTypeOptions: fuwuType(),
      approvalData: {},
      workOrderFaultDetailVo: {},
      serviceCategoryOptions: serviceCategory(),
      serviceTypeOptions: serviceType(),
      isAgreementOptions: whether(),
      trueOrFalseOptions: whether(),
      openMaterialQueryDialog: false,
      numberList: -1,
    };
  },
  components: { MaterialNumberQuery },
  async created() {
    await getWorkOrder(this.$route.query.id).then((res) => {
      this.approvalData = res.data;
      this.workOrderFaultDetailVo = res.data.workOrderFaultDetailVo || {};
    });
  },
  props: {},
  methods: {
    addEqpItem() {
      this.approvalData.workOrderMaterialBindVoList.push({});
    },
    remove(value) {
      this.approvalData.workOrderMaterialBindVoList.splice(value.$index, 1);
    },
    handleExport() {
      this.leadingOutXlsx();
    },
    openMateriel(scope, list) {
      this.numberList = scope.$index;
      this.openMaterialQueryDialog = true;
    },
    closeMaterialQueryDialog(value) {
      this.openMaterialQueryDialog = value;
    },
    leadingOutXlsx() {
      var data1 = [
        ["id", "name", "value"],
        [1, "sheetjs", 7282],
        [2, "js-xlsx", 8989],
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
    seletMaterialQueryData(value) {
      this.$set(
        this.approvalData.workOrderMaterialBindVoList[this.numberList],
        "materialCode",
        value.materialCode
      );
      this.$set(
        this.approvalData.workOrderMaterialBindVoList[this.numberList],
        "materialName",
        value.materialName
      );
    },
    //发起审批
    initiateApproval() {
      this.$confirm("是否发起工单审批?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          workOrderMaterialBindUpdateParamList:
            this.approvalData.workOrderMaterialBindVoList,
          workOrderId: this.approvalData.workOrderId,
        };
        initProcess(params).then((res) => {
          this.$message({
            type: "success",
            message: "发起审核成功!",
          });
          this.comeBack();
        });
      });
    },
    comeBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.bottomBtn {
  margin: 20px 0;
  text-align: right;
}
.title {
  text-align: left;
  font-size: 18px;
  color: #000;
  .en {
    font-size: 20px;
    margin-top: 10px;
  }
}
.Tabletitle {
  display: flex;
  justify-content: space-between;
  .tbtitle {
    text-align: left;
    font-size: 18px;
    color: #000;
  }
}

.line {
  width: 100%;
  height: 1px;
  background: #dddfe8;
  transform: scaleY(0.5);
  overflow: hidden;
  margin: 15px 0;
}
.codeInfo {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.initiate-approval-button {
  position: relative;
  // height: 50px;
  // position: relative;
  // margin-bottom: 10;
  padding: 20px;
  .right-btn {
    position: absolute;
    right: 20px;
  }
}
.signature {
  font-size: 18px;
  display: flex;
  margin-top: 30px;
  .principal {
    margin-right: 280px;
  }
}
.tip {
  margin-top: 40px;
  font-size: 14px;
  font-style: italic;
}
</style>
