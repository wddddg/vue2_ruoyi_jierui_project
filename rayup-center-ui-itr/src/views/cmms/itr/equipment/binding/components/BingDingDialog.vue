<template>
  <el-dialog
    v-dialogDrag 
    title="设备绑定派工界面"
    :visible="open"
    width="900px"
    append-to-body
    center
    @close="closeDialog"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
      v-if="open"
    >
      <el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="clientName">
              <el-input
                v-model="form.clientName"
                placeholder="请输入客户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品名称" prop="productName">
              <el-input
                v-model="form.productName"
                placeholder="请输入产品名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品品牌" prop="productBrand">
              <el-input
                v-model="form.productBrand"
                placeholder="请输入产品品牌"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="产品编号" prop="productCode">
              <el-input
                v-model="form.productCode"
                placeholder="请输入产品编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌号" prop="licenseNumber">
              <el-input
                v-model="form.licenseNumber"
                placeholder="请输入车牌号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人" prop="contactUserName">
              <el-input
                v-model="form.contactUserName"
                placeholder="请输入联系人"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式" prop="contactUserInfo">
              <el-input
                v-model="form.contactUserInfo"
                placeholder="请输入联系方式"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备地点" prop="jobSite">
              <el-input v-model="form.jobSite" placeholder="请输入设备地点" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否派工" prop="isDistribute">
              <el-select
                v-model="form.isDistribute"
                placeholder="请选择是否派工"
              >
                <el-option
                  v-for="item in isTaskOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="服务派工"
              prop="engineerName"
              v-if="form.isDistribute"
            >
              <!-- <el-select
                v-model="form.engineerName"
                multiple
                placeholder="请选择服务派工"
                @focus="openPersonnelBindingDialog"
                ref="cascader"
              /> -->
              <PersonnelBindingSelect
                v-model="form.engineerName"
                @bindingData="bindingData"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="产品照片" prop="productPhoto">
              <FileUpload
                v-model="form.attachment"
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
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-button type="primary" @click="submitForm" size="mini" style="margin-bottom:20px">提交</el-button> -->
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right">
      <el-button type="primary" @click="submitForm(false)" size="mini"
        >保存</el-button
      >
      <!-- <el-button type="primary" @click="submitForm(true)" size="mini">提交</el-button> -->
      <el-button @click="cancel" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import PersonnelBindingSelect from "@/views/cmms/itr/components/PersonnelBindingSelect/index.vue";
import {
  submit,
  add,
  edit,
} from "@/api/cmms/itr/service-request/product-archives";
import { whether } from "@/utils/dictionary-service";
export default {
  name: "BingDingDialog",
  data() {
    return {
      form: {},
      personnelBindingVisible: false,
      isTaskOptions: whether(),
      rules: {
        clientName: {
          required: true,
          message: "客户名称不能为空",
          trigger: "blur",
        },
        productCode: {
          required: true,
          message: "产品编号不能为空",
          trigger: "blur",
        },
        productName: {
          required: true,
          message: "产品名称不能为空",
          trigger: "blur",
        },
        engineerName: {
          required: true,
          message: "派工不能为空",
          trigger: "blur",
        },
      },
    };
  },
  components: { PersonnelBindingSelect },
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    isUpdata: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  methods: {
    cancel() {
      this.$emit("closeDialog", false);
    },
    closeDialog() {
      this.$emit("closeDialog", false);
      this.reset();
    },
    reset() {
      this.form = {};
    },
    /** 提交按钮 */
    async submitForm(isDistribute) {
      if (this.form.engineerName) {
        let first = this.form.engineerName.split("(");
        let two = first[1].split(")");
        this.form.engineerName = first[0];
        this.form.engineerBy = two[0];
      }
      if (this.isUpdata) {
        await edit(this.form).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "保存失败",
            });
          }
          this.$emit("closeDialog", false);
        });
      } else {
        await add(this.form).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "新增成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "新增失败",
            });
          }
          this.$emit("closeDialog", false);
        });
      }
    },
    colsePersonnelBindingDialog(value) {
      this.personnelBindingVisible = value;
    },
    openPersonnelBindingDialog() {
      this.personnelBindingVisible = true;
    },
    bindingData(value) {
      this.$set(this.form, "engineerName", value.join(","));
    },
  },
  watch: {
    open(nV) {
      if (nV) {
        if (this.isUpdata) {
          this.form = this.rowData;
          // if (typeof this.form?.engineerName === "string") {
          //   this.form.engineerName = this.form.engineerName.split(",");
          // }
        } else {
          this.form = {};
        }
      }
    },
  },
};
</script>

<style scoped></style>
