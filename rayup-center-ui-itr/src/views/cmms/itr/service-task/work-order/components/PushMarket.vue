<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="open"
    width="1200px"
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
              <Editor :height="240" :value="EditorHTML" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" size="mini">发送</el-button>
      <el-button @click="cancel" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "PushMarket",
  data() {
    return {
      form: {},
      pushMarketList: [
        {
          materialName: "车裂",
          materialCode: "518752994",
          productBrand: "75982",
          materialNum: "20",
          remark: "轻拿轻放",
          index: "1",
        },
        {
          materialName: "石压",
          materialCode: "515214935",
          productBrand: "865247",
          materialNum: "50",
          remark: "压路机",
          index: "2",
        },
      ],
      EditorHTML: ``,
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
    submitForm() {
      this.$message.success("发送成功");
      this.$emit("closeDialog", false);
    },
    EditorHTMLInit() {
      let ArrayHtml = `
      故障类别: <u>   </u>     项目编码: <u>   </u>    产品编码: <u>   </u>             底盘VIN码: <u>   </u>

      产品名称: <u>   </u>     售后区域: <u>   </u>    产品型号: <u>   </u>             工单编码: <u>   </u>

      客户名称: <u>   </u>     联系人  : <u>   </u>    联系方式: <u>   </u>             请求编码: <u>   </u>

      出厂日期: <u>   </u>     车牌号  : <u>   </u>    台上发动机小时数: <u>   </u>     底盘行驶里程: <u>   </u>
      `;
      ArrayHtml += `<pre>序号  物料说明  物料编码  物料型号  物料数量  备注</pre>`;
      this.pushMarketList.forEach((item) => {
        ArrayHtml += `<pre>${item.index}  ${item.materialName}  ${item.materialCode}  ${item.productBrand}  ${item.materialNum}  ${item.remark}</pre>`;
      });
      this.EditorHTML += ArrayHtml;
    },
  },
  created() {
    this.EditorHTMLInit();
  },
};
</script>

<style scoped>
.mb10 {
  margin-bottom: 10px;
}
</style>
