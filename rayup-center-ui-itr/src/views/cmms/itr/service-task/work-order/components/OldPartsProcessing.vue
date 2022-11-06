<template>
  <el-dialog
    v-dialogDrag
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
          <el-col :span="8">
            <el-form-item label="工单编码" prop="workOrderNo">
              <el-input
                v-model="form.workOrderNo"
                placeholder="请输入工单编码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物料编码" prop="materialCode">
              <el-input
                v-model="form.materialCode"
                placeholder="请输入物料编码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物料说明" prop="materialName">
              <el-input
                v-model="form.materialName"
                placeholder="请输入物料说明"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="品牌" prop="productBrand">
              <el-input v-model="form.productBrand" placeholder="请输入品牌" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="序列号" prop="serialNo">
              <el-input v-model="form.serialNo" placeholder="请输入序列号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量" prop="materialNum">
              <el-input v-model="form.materialNum" placeholder="请输入数量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="处理措施" prop="solutionProcessResult">
              <el-select
                v-model="form.solutionProcessResult"
                placeholder="请选择处理措施"
              >
                <el-option
                  v-for="item in disposalMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理结果" prop="actualResultDescrition">
              <jereh-select
                v-model="form.actualResultDescrition"
                filterable
                ph="请选择处理结果"
                :dict="dict.type.itr_process_result"
              />
              <!-- <el-select
                v-model="form.actualResultDescrition"
                placeholder="请选择处理结果"
              >
                <el-option
                  v-for="item in actualResultDescritionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="图片" prop="requestAttachment">
              <ImageUpload :value="form.requestAttachment" :isShowTip="false" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="附件" prop="requestAttachment">
              <FileUpload :isShowTip="false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="服务旧件移交记录模板"
              prop="requestAttachment"
              label-width="160px"
            >
              <el-button type="primary" size="mini" @click="openExcel"
                >下载</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" size="mini">确定</el-button>
      <el-button @click="cancel" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as XLSX from "xlsx";
export default {
  name: "OldPartsProcessing",
  dicts: ["itr_process_result"],
  data() {
    return {
      form: {},
      // 表单校验
      rules: {},
      deviceVisible: false,
      actualResultDescritionOptions: [
        {
          value: "0",
          label: "已返司",
        },
        {
          value: "1",
          label: "已完成",
        },
      ],
      disposalMethodOptions: [
        {
          value: "0",
          label: "返司处理",
        },
        {
          value: "1",
          label: "现场报废",
        },
      ],
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
        return "旧件处理";
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
    openDevice() {
      this.deviceVisible = true;
    },
    colsePersonnelDialog(value) {
      this.deviceVisible = value;
    },
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    cancel() {
      // this.open = false;
      this.$emit("closeDialog", false);
      // this.reset();
    },
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: [],
      };
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$emit("closeDialog", false);
    },
    openExcel() {
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
  },
  watch: {
    rowData(nV, oV) {
      this.reset();
      this.form = nV;
    },
  },
};
</script>
