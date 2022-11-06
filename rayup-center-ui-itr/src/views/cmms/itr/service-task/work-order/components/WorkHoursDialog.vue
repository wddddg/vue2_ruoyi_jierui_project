<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="open"
    width="800px"
    append-to-body
    @close="closeDialog"
  >
    <el-form ref="form" :model="form" label-width="140px" v-if="open">
      <!-- :rules="rules"  -->
      <el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色" prop="role">
              <el-input
                v-model="form.role"
                placeholder="请输入角色"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="服务工程师" prop="assignee">
              <el-input
                v-model="form.assignee"
                placeholder="请选择服务工程师"
                @focus="openPersonnelBindingDialog"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="openPersonnelBindingDialog"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="日期" prop="actionDate">
              <el-date-picker
                v-model="form.actionDate"
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="故障处理工时" prop="mainWorkHours">
              <el-input
                v-model="form.mainWorkHours"
                placeholder="请输入故障处理工时"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="辅助工时类型" prop="assitWorkType">
              <el-select
                v-model="form.assitWorkType"
                placeholder="请选择辅助工时类型"
              >
                <el-option
                  v-for="item in assitWorkTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="辅助工时" prop="assitHours">
              <el-input
                v-model="form.assitHours"
                placeholder="请输入辅助工时"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="故障处理内容概述" prop="description">
              <el-input
                v-model="form.description"
                placeholder="请输入故障处理内容概述"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工时统计" prop="totalHours">
              <el-input
                v-model="form.totalHours"
                placeholder="请输入工时统计"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm" size="mini">保存</el-button>
      <el-button @click="closeDialog" size="mini">取消</el-button>
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
import { auxiliaryType } from "@/utils/dictionary-task.js";
export default {
  name: "WorkHoursDialog",
  data() {
    return {
      form: {},
      personnelBindingVisible: false,
      deviceVisible: false,
      updata: false,
      assitWorkTypeOptions: auxiliaryType(),
    };
  },
  components: { PersonnelBinding },
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
      this.reset();
    },
    reset() {
      this.form = {};
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$emit("closeDialog", false);
      this.$emit("handleSuccess", this.form, this.updata);
    },
    colsePersonnelBindingDialog(value) {
      this.personnelBindingVisible = value;
    },
    openPersonnelBindingDialog() {
      this.personnelBindingVisible = true;
    },
    bindingData(value) {
      this.form.assignee = value.userName;
    },
  },
  watch: {
    rowData(nV, oV) {
      if (nV.role) {
        this.form = nV;
        this.updata = true;
      } else {
        this.updata = false;
      }
    },
    open() {
      if (this.rowData.role) {
        this.form = this.rowData;
        this.updata = true;
      } else {
        this.updata = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
