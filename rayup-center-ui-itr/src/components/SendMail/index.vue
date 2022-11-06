<template>
  <el-dialog
    :title="title"
    :visible="open"
    width="800px"
    append-to-body
    @close="closeDialog"
  >
    <el-form ref="form" :model="form" label-width="120px">
      <!-- :rules="rules"  -->
      <el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收件人邮箱" prop="clientName">
              <el-input
                v-model="form.clientName1"
                placeholder="请输入收件人邮箱"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收件人姓名" prop="clientName">
              <el-input
                v-model="form.clientName2"
                placeholder="请输入收件人姓名"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="抄送人员" prop="clientName">
              <el-input
                v-model="form.clientName3"
                placeholder="请输入抄送人员"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮件主题" prop="clientName">
              <el-input
                v-model="form.clientName4"
                placeholder="请输入邮件主题"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮件正文" prop="clientName">
              <!-- <el-input
                v-model="form.clientName5"
                placeholder="请输入邮件正文"
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 8 }"
              /> -->
              <Editor :height="240" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" size="mini">确 定</el-button>
      <el-button @click="cancel" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "SendMailDialog",
  data() {
    return {
      form: {},
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
    title: {
      type: String,
      default: () => {
        return "发送邮件-编辑";
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
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    cancel() {
      this.$emit("closeDialog", false);
    },
    submitForm(){
      this.$message.success('发送成功')
      this.$emit("handleSuccess", true);
    }
  },
  watch: {
    rowData(nV, oV) {
      this.reset();
    },
  },
};
</script>

<style>
</style>
