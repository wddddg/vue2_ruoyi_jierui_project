<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="open"
    width="850px"
    append-to-body
    @close="closeDialog"
    center
  >
    <el-form :model="form" :rules="rules" label-width="140px" ref="ruleForm">
      <el-row>
        <el-col :span="12"
          ><el-form-item label="维护人" prop="maintainPerson">
            <PersonnelBindingSelect
              v-model="form.maintainPerson"
              @bindingData="bindingSelectData($event, form, 'maintainPerson')"
            /> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="预警状态" prop="earlyWarningState">
            <el-select v-model="form.earlyWarningState">
              <el-option
                v-for="item in warningStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="12"
          ><el-form-item label="责任环节" prop="responsStepName">
            <el-select v-model="form.responsStepName">
              <el-option
                v-for="item in responsibleDeptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="责任人" prop="responsUserName">
            <PersonnelBindingSelect
              v-model="form.responsUserName"
              @bindingData="bindingSelectData($event, form, 'responsUserName')"
            /> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="需求日期" prop="expectTime">
            <el-date-picker
              v-model="form.expectTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="催办间隔时间（h）" prop="urgeInterval">
            <el-input type="number" v-model="form.urgeInterval"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="描述" prop="remark">
            <el-input v-model="form.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="btn">
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
        <el-button type="primary" plain size="mini" @click="cancel"
          >取消</el-button
        >
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import PersonnelBindingSelect from "@/views/cmms/itr/components/PersonnelBindingSelect/index.vue";
import { responsibilityLink, warningState } from "@/utils/dictionary-task.js";
import { addCooperation } from "@/api/cmms/itr/work-order/order.api.js";
export default {
  name: "UpgradeAndTransferDialog",
  components: { PersonnelBindingSelect },
  data() {
    return {
      form: {},
      currentBindingName: "",
      writeBack: "",
      warningStatusOptions: warningState(),
      responsibleDeptOptions: responsibilityLink(),
      rules: {
        maintainPerson: [
          {
            required: true,
            message: "请选择维护人",
            trigger: "blur",
          },
        ],
        responsStepName: [
          { required: true, message: "请选择责任环节", trigger: "blur" },
        ],
        earlyWarningState: [
          {
            required: true,
            message: "请选择预警状态",
            trigger: "blur",
          },
        ],
        responsUserName: [
          {
            required: true,
            message: "请选择责任人",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    title: {
      type: String,
      default: "新增问题预警",
    },
  },
  methods: {
    async submit() {
      await this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          this.form["workOrderId"] = this.$route.query.workOrderId;
          await addCooperation(this.form).then((resp) => {
            this.$message.success("发送成功");
            this.$emit("successSubmit", this.form);
          });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.closeDialog();
    },
    closeDialog() {
      this.form = {};
      this.$refs["ruleForm"].resetFields();
      this.$emit("closeDialog", false);
    },
    bindingSelectData(e, row, item) {
      this.$set(row, item, e.join(","));
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  text-align: center;
}
</style>
