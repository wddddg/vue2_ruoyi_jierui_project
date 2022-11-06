<template>
  <!-- <el-dialog
    :title="title"
    :visible="open"
    width="800px"
    append-to-body
    @close="closeDialog"
  > -->
  <div>
    <el-card>
      <div slot="header">
        <jereh-button type="primary" @click="submitForm('UNCLOSE')" plant
          >退回</jereh-button
        >
        <jereh-button type="primary" @click="submitForm('CLOSED')" plant
          >通过</jereh-button
        >
        <jereh-button type="primary" @click="submitForm('CANCEL')" plant
          >工单取消</jereh-button
        >
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- :rules="rules"  -->
        <el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="工单编码" prop="workOrderCode">
                <el-input
                  v-model="form.workOrderCode"
                  placeholder=""
                  maxlength="30"
                  disabled
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="问题处理人" prop="engineerName">
                <el-input
                  v-model="form.engineerName"
                  placeholder=""
                  maxlength="30"
                  disabled
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="服务需求时间" prop="serviceRequiredTime">
                <el-input
                  v-model="form.serviceRequiredTime"
                  placeholder=""
                  maxlength="30"
                  disabled
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="预估工时" prop="assithours">
                <el-input
                  v-model="form.workOrderFaultDetailVo.assithours"
                  placeholder=""
                  maxlength="30"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="实际开始时间" prop="createTime">
                <el-date-picker
                  v-model="form.createTime"
                  type="date"
                  placeholder=""
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="实际完成时间" prop="completeTime">
                <el-date-picker
                  v-model="form.completeTime"
                  type="date"
                  placeholder=""
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="实际工时" prop="mainhours">
                <el-input
                  v-model="form.workOrderFaultDetailVo.mainhours"
                  placeholder=""
                  maxlength="30"
                  disabled
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="处理结果" prop="processResult">
                <jereh-select
                  v-model="form.workOrderFaultDetailVo.processResult"
                  filterable
                  ph="请选择"
                  :dict="dict.type.itr_process_result"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="异常描述" prop="remark">
                <el-input
                  v-model="form.remark"
                  placeholder="请输入"
                  type="textarea"
                  :rows="2"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <!-- <div slot="footer">
      <el-button @click="submitForm('comeBack')" size="mini">退回</el-button>
      <el-button type="primary" @click="submitForm('through')" size="mini"
        >通过</el-button
      >
    </div> -->
    </el-card>
    <el-card>
      <div slot="header">
        <span class="title"> 服务调研与回访 </span>
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- :rules="rules"  -->
        <el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="服务评价总分" prop="workOrderCode">
                <!-- v-model="form.workOrderCode" -->
                <el-input placeholder="" maxlength="30" disabled />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="调研问卷编码" prop="engineerName">
                <!-- v-model="form.engineerName" -->
                <el-input placeholder="" maxlength="30" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="回访状态" prop="serviceRequiredTime">
                <!-- v-model="form.serviceRequiredTime" -->
                <el-input placeholder="" maxlength="30" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="回访原因" prop="createTime">
                <!-- v-model="form.createTime" -->
                <el-input placeholder="" maxlength="30" disabled />
                <!-- <el-date-picker
                  type="date"
                  placeholder=""
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  disabled
                /> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="回访是否关闭" prop="completeTime">
                <!-- v-model="form.completeTime" -->
                <el-select disabled v-model="isTrueOrFalseValue">
                  <el-option
                    v-for="item in isTrueOrFalse"
                    :key="item.value"
                    :label="item.label"
                    v-model="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="未关闭原因" prop="estimateTime">
                <!-- v-model="form.estimateTime" -->
                <el-input placeholder="" maxlength="30" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <span class="title"> 服务回返 </span>
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- :rules="rules"  -->
        <el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="是否复盘" prop="workOrderCode">
                <!-- v-model="form.workOrderCode" -->
                <el-select disabled v-model="isTrueOrFalseValue">
                  <el-option
                    v-for="item in isTrueOrFalse"
                    :key="item.value"
                    :label="item.label"
                    v-model="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="复盘组织人" prop="engineerName">
                <!-- v-model="form.engineerName" -->
                <el-input placeholder="" maxlength="30" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="服务复盘日期" prop="serviceRequiredTime">
                <!-- v-model="form.serviceRequiredTime" -->
                <el-date-picker
                  type="date"
                  placeholder=""
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="服务复盘报告附件"
                prop="createTime"
                label-width="140px"
              >
                <!-- v-model="form.createTime" -->
                <el-input placeholder="" maxlength="30" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-card>
  </div>
  <!-- </el-dialog> -->
</template>

<script>
import { auxiliaryType } from "@/utils/dictionary-task.js";
import { whether } from "@/utils/dictionary-service.js";
import {
  closeWorkOrder,
  updateOrder,
} from "@/api/cmms/itr/work-order/order.api";
import { formatDate } from "@/utils/index";
export default {
  name: "CloseWorkOrderDialog",
  dicts: ["itr_process_result"],
  data() {
    return {
      form: {
        workOrderFaultDetailVo: {},
      },
      personnelBindingVisible: false,
      deviceVisible: false,
      assitWorkTypeOptions: auxiliaryType(),
      isTrueOrFalse: whether(),
      isTrueOrFalseValue: "",
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
    // title: {
    //   type: String,
    //   default: () => {
    //     return "工单关闭";
    //   },
    // },
    // open: {
    //   type: Boolean,
    //   default: () => {
    //     return false;
    //   },
    // },
  },
  methods: {
    // closeDialog() {
    //   this.$emit("closeDialog", false);
    //   this.reset();
    // },
    // reset() {
    //   this.form = {};
    // },
    /** 提交按钮 */
    async submitForm(type) {
      this.form.workOrderFaultUpdateParam = {
        ...this.form.workOrderFaultDetailVo,
      };
      this.form.workOrderFaultUpdateParam.processResult = type;
      this.form.serviceRequestId = this.form.id;
      // let params = {
      //   completeTime: formatDate(new Date()),
      //   processResult: this.form.processResult,
      //   remark: this.form.remark,
      //   serviceRequestId: this.form.id,
      //   workOrderId: this.form.workOrderId,
      // };
      await updateOrder(this.form).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.form.workOrderFaultDetailVo.processResult = type;
        }
      });
      // await closeWorkOrder(params).then((res) => {
      //   if (res.code === 200) {
      //     this.$message.success(res.msg);
      //   }
      // });
    },
    // colsePersonnelBindingDialog(value) {
    //   this.personnelBindingVisible = value;
    // },
    // openPersonnelBindingDialog() {
    //   this.personnelBindingVisible = true;
    // },
    bindingData(value) {
      this.form.assignee = value.userName;
    },
  },
  watch: {
    // open() {
    //   console.log(this.rowData);
    //   this.form = this.rowData;
    // },
    rowData: {
      handler(nV) {
        this.form = nV;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
}
::v-deep .el-card__header {
  background: #f8f9fa;
  padding: 10px 20px;
}
::v-deep .el-card {
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #dee2e6;
}
</style>
