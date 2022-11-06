<template>
  <el-dialog
     v-dialogDrag 
    :visible="open"
    width="900px"
    append-to-body
    @close="closeDialog"
    v-if="serviceData.length"
  >
    <div class="title">
      <div class="cn">客户服务单</div>
      <div class="en">Customer Service Record</div>
    </div>
    <el-form ref="form">
      <div class="codeInfo" v-if="rowData.length === 1 && serviceRecordId">
        <div class="code">编号 Code: JREQP19-08</div>
        <div class="serialNo">序号 SerialNo:{{ serviceResultCode }}</div>
      </div>
      <el-descriptions
        class="margin-top"
        :column="2"
        border
        :label-style="myLabel"
      >
        <el-descriptions-item span="2">
          <template slot="label">
            客户名称 <br />
            ClientName
          </template>
          {{ serviceData[0]["clientName"] || "" }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template slot="label">
            客户联系方式 <br />
            Contact Info</template
          >
          <div class="customerInfo">
            <div class="clientName">
              姓名 Name：{{ serviceData[0]["clientName"] || "" }}
            </div>
            <div class="phone">
              联系方式 Tel/E-mail：{{ serviceData[0]["contactUserInfo"] || "" }}
            </div>
          </div>
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions
        class="margin-top"
        :column="2"
        border
        :label-style="myLabel"
        v-for="(item, index) in serviceData"
        :key="index"
      >
        <el-descriptions-item>
          <template slot="label">
            服务代表 <br />
            Service Representative</template
          >
          {{ item.engineerName }}
        </el-descriptions-item>
        <el-descriptions-item :contentStyle="ipt">
          <template slot="label">
            参与人员 <br />
            Participant</template
          >
          <div class="ipt">
            <el-input
              v-model="item.participant"
              placeholder="请填写参与人员"
            ></el-input>
          </div>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            产品名称 <br />
            Product Name</template
          >
          {{ item.productName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            产品型号 <br />
            Product Model</template
          >
          {{ item.productModel }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            项目号 <br />
            Project No</template
          >
          {{ item.projectCode }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            产品编号 <br />
            Product SN</template
          >
          {{ item.productCode }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            车牌号 <br />
            License Plate No</template
          >
          {{ item.licenseNumber }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            工单编码 <br />
            Work Order No</template
          >
          {{ item.workOrderCode }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            出厂日期 <br />
            Date of MFG</template
          >
          {{ item.exfactoryDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            服务开始时间 <br />
            Start Time</template
          >
          <el-date-picker
            v-model="item.startTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            服务地点 <br />
            Service Jobsite</template
          >
          {{ item.serviceJobsite }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            服务完毕时间 <br />
            End Time</template
          >
          <el-date-picker
            v-model="item.endTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template slot="label">
            服务类型 <br />
            Service Type</template
          >
          <el-select v-model="item.serviceType" placeholder="请选择服务类型">
            <el-option
              v-for="item in serviceTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item labelClassName="itemLabelClassName">
          <template slot="label">
            工单编码<br />
            Project No.</template
          >
          {{ item.projectCode }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            故障类型<br />
            Fault Type</template
          >
          <dict-tag
            :options="dict.type.itr_fault_type"
            :value="item.workOrderFaultDetailVo.faultType"
          />
        </el-descriptions-item>
        <el-descriptions-item span="2" :contentStyle="serviceInfo">
          <template slot="label">
            服务内容<br />
            Service Description</template
          >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入服务内容"
            v-model="item.serviceDescription"
          />
        </el-descriptions-item>
        <el-descriptions-item span="2" :contentStyle="serviceInfo">
          <template slot="label">
            服务过程 <br />
            Service Process</template
          >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入服务过程"
            v-model="item.workOrderFaultDetailVo.solutionProcessResult"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            服务结果 <br />
            Service Result</template
          >
          {{
            item.workOrderFaultDetailVo.verifyResult === "verify_wait"
              ? "待验证"
              : item.workOrderFaultDetailVo.verifyResult === "verify_wait"
              ? "已验证"
              : "验证中"
          }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            工时 <br />
            Man-hours</template
          >
          {{ (item.assitTime || 0) + (item.mainHours || 0) }}
        </el-descriptions-item>

        <el-descriptions-item span="2">
          <template slot="label">
            备注 <br />
            Comments</template
          >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
            v-model="item.remark"
          >
          </el-input>
        </el-descriptions-item>
      </el-descriptions>
    </el-form>
    <div class="signature">
      <div class="principal">
        <div class="cnSignature">服务代表签字</div>
        <div class="enSignature">Service Principal Signature：</div>
        <div class="date">日期 Date:</div>
      </div>
      <div class="Client">
        <div class="cnSignature">客户签字</div>
        <div class="enSignature">Client Signature：</div>
        <div class="date">日期 Date:</div>
      </div>
    </div>
    <div class="tip">
      以客户为中心，用心感动客户！Dedicated to beyond customers' expectation
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitList">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <PersonnelBinding
      :open="personnelBindingVisible"
      @closeDialog="colsePersonnelBindingDialog"
      @bindingData="bindingData"
    />
    <StartSurveyDialog
      :open="openStartSurveyDialog"
      @colseStartSurveyDialog="colseStartSurveyDialog"
      :rowData="rowData"
      :serviceRecordId="serviceRecordId"
    />
  </el-dialog>
</template>

<script>
import PersonnelBinding from "@/views/cmms/itr/components/PersonnelBinding/index.vue";
import StartSurveyDialog from "./StartSurveyDialog.vue";
import {
  serviceCategory,
  requestSource,
  whether,
  serviceType,
  requestProperty,
} from "@/utils/dictionary-service";

import {
  submitServiceOrder,
  getWorkOrder,
  queryByIdServiceOrder,
  updataServiceOrder,
} from "@/api/cmms/itr/work-order/order.api.js";
export default {
  name: "ServiceListDialog",
  dicts: ["itr_fault_type"],
  data() {
    return {
      form: {},
      personnelBindingVisible: false,
      // rowData: {},
      deviceVisible: false,
      isUpdata: false,
      myLabel: { width: "170px" },
      itemLabel: { width: "10px" },
      serviceInfo: { height: "100px" },
      ipt: { width: "330px" },
      // fuwuTypeOptions: fuwuType(),
      serviceCategoryOptions: serviceCategory(),
      serviceTypeOptions: serviceType(),
      serviceData: [],
      submitData: {},
      recordCode: "",
      serialNo: "",
      openStartSurveyDialog: false,
      serviceResultCode: "",
    };
  },
  components: { PersonnelBinding, StartSurveyDialog },
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: {
      type: String,
      default: () => {
        return "客户服务单";
      },
    },
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    serviceRecordId: String,
  },
  methods: {
    // disassemblyObject(name, subName) {
    //   if (subName) {
    //     return this.serviceData.map((item) => {
    //       return item[name][subName] || "";
    //     });
    //   } else {
    //     return this.serviceData.map((item) => {
    //       return item[name] || "";
    //     });
    //   }
    // },
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    cancel() {
      this.closeDialog();
    },
    reset() {
      this.form = {};
    },
    /** 提交按钮 */
    async submitList() {
      if (this.serviceRecordId) {
        this.submitData.id = this.serviceRecordId;
        await updataServiceOrder(this.submitData).then((res) => {
          if (res.code === 200) {
            this.$message.success("提交成功");
            this.$emit("handleSuccess");
            this.closeDialog();
            // setTimeout(() => {
            //   this.isStartSurvey();
            // }, 500);
          }
        });
      } else {
        this.submitData.mappingOrderRecordUpdateParams = [];
        this.submitData.mappingOrderRecordUpdateParams = this.serviceData.map(
          (item) => {
            return {
              participant: item.participant,
              serviceStartTime: item.startTime,
              serviceEndTime: item.endTime,
              serviceCategory: item.serviceType,
              serviceDescription: item.serviceDescription,
              serviceProcess: item.workOrderFaultDetailVo.solutionProcessResult,
              remark: item.remark,
              workOrderId: item.workOrderId,
            };
          }
        );
        this.submitData.clienName = this.serviceData[0].clientName;
        await submitServiceOrder(this.submitData).then((res) => {
          if (res.code === 200) {
            this.$message.success("提交成功");
            this.serviceRecordId = res.msg
            setTimeout(() => {
              this.isStartSurvey();
            }, 500);
          }
        });
      }
    },
    // 是否发起调研
    isStartSurvey() {
      this.$confirm("是否发起调研？")
        .then((_) => {
          this.openStartSurveyDialog = true;
        })
        .catch((_) => {
          this.$emit("handleSuccess");
          this.closeDialog();
        });
    },
    colsePersonnelBindingDialog(value) {
      this.personnelBindingVisible = value;
    },
    colseStartSurveyDialog(value) {
      this.openStartSurveyDialog = value;
      this.$emit("handleSuccess");
      this.closeDialog();
    },
    openPersonnelBindingDialog() {
      this.personnelBindingVisible = true;
    },
    bindingData(value) {
      this.form.clientName = value.name;
    },
  },
  watch: {
    // rowData(nV, oV) {
    //   this.reset();
    //   if (nV.role) {
    //     this.form = { ...nV };
    //     this.isUpdata = true;
    //   } else {
    //     this.isUpdata = false;
    //   }
    // },
    async open(nV) {
      if (nV) {
        if (this.serviceRecordId) {
          await queryByIdServiceOrder({
            serviceRecordId: this.serviceRecordId,
          }).then((res) => {
            this.serviceResultCode = res.data.id;
            this.serviceData = res.data.mappingOrderRecordVos.map((item) => {
              return {
                participant: item.participant,
                startTime: item.serviceStartTime,
                endTime: item.serviceEndTime,
                serviceType: item.serviceCategory,
                serviceDescription: item.serviceDescription,
                remark: item.remark,
                workOrderId: item.workOrderId,
              };
            });
            this.serviceData.forEach((element, index) => {
              element.workOrderFaultDetailVo = {};
              element.workOrderFaultDetailVo.solutionProcessResult =
                res.data.mappingOrderRecordVos[index].serviceProcess || "";
              this.serviceData[index] = Object.assign(
                {},
                res.data.workOrderDetailVos[index],
                element
              );
              this.serviceData[index].workOrderFaultDetailVo = Object.assign(
                {},
                res.data.workOrderDetailVos[index].workOrderFaultDetailVo,
                element.workOrderFaultDetailVo
              );
            });
            console.log(this.serviceData);
            this.recordCode = res.data.recordCode;
            this.serialNo = res.data.serialNo;
          });
        } else {
          if (this.rowData.length == 1) {
            await getWorkOrder(this.rowData[0]).then((res) => {
              this.serviceData.push(res.data);
              this.serviceData.forEach((element) => {
                if (!element.workOrderFaultDetailVo) {
                  element.workOrderFaultDetailVo = {};
                }
              });
            });
          } else if (this.rowData.length > 1) {
            for (let index = 0; index < this.rowData.length; index++) {
              await getWorkOrder(this.rowData[index]).then((res) => {
                this.serviceData.push(res.data);
                this.serviceData.forEach((element) => {
                  if (!element.workOrderFaultDetailVo) {
                    element.workOrderFaultDetailVo = {};
                  }
                });
              });
            }
          }
        }
      } else {
        this.serviceData = [];
        this.submitData = {};
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
.itemLabelClassName
  > .el-descriptions-item__cell
  .el-descriptions-item__label
  .is-bordered-label {
  display: none;
}
</style>
