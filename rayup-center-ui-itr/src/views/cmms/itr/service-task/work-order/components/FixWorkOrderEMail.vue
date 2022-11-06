<template>
  <el-dialog
    v-dialogDrag  
    title="发送邮件"
    :visible="openEm"
    width="1050px"
    append-to-body
    @close="closeDialog"
  >
    <el-form ref="form" :model="form" label-width="140px">
      <!-- :rules="rules"  -->
      <el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收件人邮箱" prop="addressee">
              <el-input
                v-model="form.addressee"
                placeholder="请输入收件人邮箱"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收件人姓名" prop="recipient">
              <el-input
                v-model="form.recipient"
                placeholder="请选择服务工程师"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="抄送人员" prop="cc">
              <el-input v-model="form.cc" placeholder="请输入抄送人员" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮件主题" prop="clientName">
              <el-input
                v-model="form.clientName"
                placeholder="请输入邮件主题"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮件正文" prop="messageBody">
              <Editor :height="240" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm" size="mini">发送</el-button>
      <el-button @click="cancel" size="mini">取消</el-button>
    </div>
    <PersonnelBinding
      :open="personnelBindingVisible"
      @closeDialog="colsePersonnelBindingDialog"
      @bindingData="bindingData"
    />
  </el-dialog>
</template>

<script>
import PersonnelBinding from "@/views/cmms/itr/components/PersonnelBinding/index.vue";
import Editor from "@/components/Editor/index.vue";
export default {
  name: "FixWorkOrderEMail",
  data() {
    return {
      form: {},
      personnelBindingVisible: false,
      deviceVisible: false,
      isUpdata: false,
    };
  },
  components: {
    PersonnelBinding,
    Editor,
  },
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    title: {
      type: String,
      default: () => {
        return "问题工时";
      },
    },
    openEm: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    cancel() {
      // this.open = false;
      this.$emit("closeDialog", false);
      // this.reset();
    },
    reset() {
      this.form = {};
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$emit("closeDialog", false);
      this.$emit("handleSuccess", this.form, this.isUpdata);
    },
    colsePersonnelBindingDialog(value) {
      this.personnelBindingVisible = value;
    },
    openPersonnelBindingDialog() {
      this.personnelBindingVisible = true;
    },
    bindingData(value) {
      this.form.clientName = value.name;
    },
  },
  watch: {
    rowData(nV, oV) {
      this.reset();
      if (nV.role) {
        this.form = nV;
        this.isUpdata = true;
      } else {
        this.isUpdata = false;
      }
    },
  },
};
</script>

<style scoped></style>
