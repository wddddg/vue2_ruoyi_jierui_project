<template>
  <el-dialog
    v-dialogDrag 
    :title="title"
    :visible="open"
    width="800px"
    append-to-body
    @close="closeDialog"
  >
    <el-row v-if="open">
      <el-col :span="24" :xs="24">
        <el-form
          :model="queryParams"
          ref="queryForm"
          size="small"
          :inline="true"
          v-show="showSearch"
        >
          <el-form-item label="客户名称" prop="customerName">
            <el-input
              v-model="queryParams.customerName"
              placeholder="客户名称"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="服务编码" prop="serviceCode">
            <el-input
              v-model="queryParams.serviceCode"
              placeholder="服务编码"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="售后区域" prop="afterSaleArea">
            <!-- <el-input
              v-model="queryParams.afterSaleArea"
              placeholder="售后区域"
              clearable
              style="width: 240px"
            /> -->
            <jereh-select
              v-model="queryParams.afterSaleArea"
              filterable
              ph="请选择售后区域"
              :dict="dict.type.after_sale_area"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>

        <el-table
          :data="tableDatas"
          @current-change="handleRadioChange"
          :row-class-name="handleSelectionChange"
        >
          <el-table-column type="index" width="50" align="center">
            <template slot-scope="scope">
              <el-radio
                v-model="defaultRadio"
                :label="scope.row.index"
              ></el-radio>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column
            label="客户名称"
            align="center"
            key="customerName"
            prop="customerName"
          />
          <el-table-column
            label="服务编码"
            align="center"
            key="serviceCode"
            prop="serviceCode"
          />
          <el-table-column
            label="售后区域"
            align="center"
            key="afterSaleArea"
            prop="afterSaleArea"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.after_sale_area"
                :value="scope.row.afterSaleArea"
              />
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="rowData"
        />
      </el-col>
    </el-row>
    <div slot="footer">
      <el-button type="primary" size="mini" @click="submit">确定</el-button>
      <el-button size="mini" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listAgreement } from "@/api/cmms/itr/relbiz.api";
import { frameworkAgreementQueryList } from "@/api/cmms/itr/service-request/all-requests";

export default {
  name: "FrameAgreement",
  dicts: ["after_sale_area"],
  components: {},
  data() {
    return {
      // 选中数组
      ids: [],
      // 显示搜索条件
      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        clientName: undefined,
        serviceCode: undefined,
        afterSaleArea: undefined,
      },
      defaultRadio: -1,
      tableDatas: [],
      total: 1,
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
        return "框架协议";
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
    handleSelectionChange({ row, rowIndex }) {
      row.index = rowIndex;
    },
    handleRadioChange(val) {
      if (val) {
        this.defaultRadio = val.index;
      }
    },
    submit() {
      this.$emit("handleSuccess", this.tableDatas[this.defaultRadio]);
      this.$emit("closeDialog", false);
    },
  },
  watch: {
    rowData(nV, oV) {
      // this.form = nV;
    },
  },
  created() {
    // listAgreement().then((res) => {
    //   console.log(res);
    //   this.tableDatas = [...res.rows];
    // })
    frameworkAgreementQueryList(this.queryParams).then((res) => {
      // console.log(res);
      this.tableDatas = [...res.rows];
      this.total = res.total
    });
  },
};
</script>

<style scoped>
::v-deep .el-radio__label {
  display: none;
}
</style>
