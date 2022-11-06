<template>
  <el-dialog
    v-dialogDrag 
    :title="title"
    :visible="open"
    width="800px"
    append-to-body
    @close="closeDialog"
  >
  <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" >
    <el-form-item label="" prop="keyWord">
      <el-input
        v-model="queryParams.keyWord"
        placeholder="请输入关键字"
        clearable
        @keyup.enter.native="handleQuery"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>

    <el-form ref="form" :model="form" label-width="120px" v-if="open">
      <!-- :rules="rules"  -->
      <el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户名称" prop="clientName">
              <el-input
                v-model="form.clientName"
                placeholder="请输入客户名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品品牌" prop="productBrand">
              <el-input
                v-model="form.productBrand"
                placeholder="请输入产品品牌"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="productName">
              <el-input
                v-model="form.productName"
                placeholder="请输入产品名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品编号" prop="productCode">
              <el-input
                v-model="form.productCode"
                placeholder="请输入产品编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌号" prop="licenseNumber">
              <el-input
                v-model="form.licenseNumber"
                placeholder="请输入车牌号"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户联系人" prop="contactUserName">
              <el-input
                v-model="form.contactUserName"
                placeholder="请输入客户联系人"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户联系方式" prop="askerTelephone">
              <el-input
                v-model="form.askerTelephone"
                placeholder="请输入客户联系方式"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务地点" prop="serviceJobsite">
              <el-input
                v-model="form.serviceJobsite"
                placeholder="请输入服务地点"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联360设备" prop="eqpName">
              <el-input v-model="form.eqpName" placeholder="关联360设备" @focus="openRelatedEquipmentDialog" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-form-item label="附件" prop="requestAttachment">
            <ImageUpload :value="form.requestAttachment" :isShowTip="false" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" size="mini">确定</el-button>
      <el-button @click="cancel" size="mini">取消</el-button>
    </div>
    <RelatedEquipment
      :open="openRelatedEquipment"
      @closeDialog="colseRelatedEquipmentDialog"
      @selectData="selectData"
    />
  </el-dialog>
</template>

<script>
import RelatedEquipment from './RelatedEquipment.vue'

export default {
  name: "DeviceDialog",
  data() {
    return {
      form: {},
      // 表单校验
      rules: {
      },
      deviceVisible: false,
      openRelatedEquipment: false
    };
  },
  components: {
    RelatedEquipment
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
        return "修改";
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
      handleQuery(){

      },
    resetQuery(){

    },
    openRelatedEquipmentDialog() {
      this.openRelatedEquipment = true;
    },
    colseRelatedEquipmentDialog(value) {
      this.openRelatedEquipment = value;
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
      console.log(this.form);
      this.$emit("closeDialog", false);
    },
    selectData(value){
      console.log(value);
      this.form.eqpName = value.equipmentName || value.licenseNumber
    }
  },
  watch: {
    rowData(nV, oV) {
      this.reset();
      if (nV.clientName) {
        this.form = nV;
      }
    },
  },
};
</script>

<style>
</style>
