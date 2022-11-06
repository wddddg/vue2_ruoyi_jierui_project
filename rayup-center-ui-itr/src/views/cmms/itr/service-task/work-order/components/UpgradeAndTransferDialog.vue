<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="open"
    width="500px"
    append-to-body
    @close="closeDialog"
    center
  >
    <el-form :model="form">
      <el-form-item label="接收人：" prop="executorName">
        <PersonnelBindingSelect
          v-model="form.executorName"
          @bindingData="
            bindingSelectData($event, form, 'executorName', 'executorBy')
          "
        />
      </el-form-item>
      <el-form-item label="备注说明：" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="请输入备注说明"
          type="textarea"
        />
      </el-form-item>
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
import { executor } from "@/api/cmms/itr/work-order/order.api";
export default {
  name: "UpgradeAndTransferDialog",
  components: { PersonnelBindingSelect },
  data() {
    return {
      form: {
        receiverUsrerName: "",
        remark: "",
      },
      personnelBindingVisible: false,
      currentBindingName: "",
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
    },
    type: {
      type: String,
    },
    WorkOrderCode: String,
  },
  methods: {
    async submit() {
      let params = {};
      params.taskType = "work_order";
      params.taskId = this.$route.query.workOrderId;
      params.taskCode = this.WorkOrderCode;
      params.remark = this.form.remark;
      if (this.type == "Upgrade") {
        params.executorBusiness = "upgrade";
      } else {
        params.executorBusiness = "recipient";
      }
      // -----------------修改传参----------------------
      if (this.form.executorName) {
        let first = this.form.executorName.split("(");
        let two = first[1].split(")");
        this.form.executorName = first[0];
        this.form.executorBy = two[0];
      }
      params.executorName = this.form.executorName;
      params.executorBy = this.form.executorBy;
      // ===============================================

      await executor(params).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.$emit("submit", false);
        }
      });
      this.form = {};
    },
    cancel() {
      this.closeDialog();
      this.form = {};
    },
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    bindingSelectData(e, form, item, subItem) {
      this.$set(form, item, e.join(","));
      this.$set(form, subItem, e.join(","));
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  text-align: center;
}
</style>
