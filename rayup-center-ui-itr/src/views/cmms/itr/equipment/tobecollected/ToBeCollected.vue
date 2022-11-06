<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-folder-add" size="mini"
              >添加绑定设备</el-button
            >
          </el-col>
        </el-row>

        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          border
          :header-cell-style="{ background: 'rgb(245,247,250)' }"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="70"
          />
          <el-table-column
            label="产品品牌"
            align="center"
            key="productBrand"
            prop="productBrand"
            width="120"
          />
          <el-table-column
            label="产品名称"
            align="center"
            key="productName"
            prop="productName"
            width="120"
          />
          <el-table-column
            label="项目编码分项"
            align="center"
            key="projectCodeSubentry"
            prop="projectCodeSubentry"
            width="120"
          />
          <el-table-column
            label="产品编号"
            align="center"
            key="productCode"
            prop="productCode"
            width="120"
          />
          <el-table-column
            label="售后区域"
            align="center"
            key="afterSaleArea"
            prop="afterSaleArea"
            width="120"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.after_sale_area"
                :value="scope.row.afterSaleArea"
              /> </template
          ></el-table-column>
          <el-table-column
            label="市场区域"
            align="center"
            key="marketArea"
            prop="marketArea"
            width="120"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.device_area"
                :value="scope.row.marketArea"
              /> </template
          ></el-table-column>
          <el-table-column
            label="客户名称"
            align="center"
            key="clientName"
            prop="clientName"
            width="120"
          />
          <el-table-column
            label="出厂日期"
            align="center"
            key="exfactoryDate"
            prop="exfactoryDate"
            width="120"
          />
          <el-table-column
            label="验收日期"
            align="center"
            key="deliveryDate"
            prop="deliveryDate"
            width="120"
          />
          <el-table-column
            label="质保终止日期"
            align="center"
            key="qualityExpirationDate"
            prop="qualityExpirationDate"
            width="120"
          />
          <el-table-column
            label="车牌号"
            align="center"
            key="licenseNumber"
            prop="licenseNumber"
            width="120"
          />
          <el-table-column
            label="交付负责人"
            align="center"
            key="deliveryDirector"
            prop="deliveryDirector"
            width="120"
          />
          <el-table-column
            label="服务管家"
            align="center"
            key="serviceButler"
            prop="serviceButler"
            width="120"
          />
          <el-table-column
            label="市场负责人"
            align="center"
            key="maketDirector"
            prop="maketDirector"
            width="120"
          />
          <el-table-column
            label="审核状态"
            align="center"
            key="deviceState"
            prop="deviceState"
            width="120"
          />
          <el-table-column
            label="编辑"
            align="center"
            width="80"
            class-name="small-padding fixed-width"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          v-dialogDrag 
          title="请选择服务请求类型"
          :visible.sync="chooseTypeDialog"
          width="300px"
          center
        >
          <el-row :gutter="24" style="text-align: center">
            <el-col v-for="(item, index) in types" :key="index">
              <el-button
                type="primary"
                plain
                style="width: 126px; margin-bottom: 5px"
                @click="openRequest(item.name)"
                >{{ item.name }}</el-button
              >
            </el-col>
          </el-row>
        </el-dialog>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import { listToGather } from "@/api/cmms/itr/service-request/product-archives";
export default {
  name: "ToBeCollected",
  components: {},
  dicts: ["after_sale_area", "device_area"],
  props: {},
  data() {
    return {
      openBingDingDialog: false,
      types: [
        { name: "故障维修" },
        { name: "技术咨询" },
        { name: "配件采购" },
        { name: "培训服务" },
        { name: "框架协议服务" },
        { name: "设备租赁服务" },
        { name: "其他服务" },
      ],
      chooseTypeDialog: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      tableData: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 打印弹出层
      printOpen: false,
      spread: true,
      // 点击修改选中的数据
      rowData: {},
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {},
      // 查询参数
      type: "",
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  watch: {},
  async created() {
    await this.getList();
  },
  methods: {
    /** 查询列表 */
    async getList() {
      await listToGather(this.queryParams).then((res) => {
        this.tableData = res.rows || [];
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 选择新建类型 */
    openRequest(val) {
      this.type = val;
      this.chooseTypeDialog = false;
      this.open = true;
      this.rowData = {};
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.chooseTypeDialog = true;
      // this.open = true;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.rowData = row;
      this.openBingDingDialog = true;
    },
    colseBingDingDialog(value) {
      this.openBingDingDialog = value;
    },
    closeDialog(value) {
      this.openBingDingDialog = value;
    },
    /** 导出按钮操作 */
    handleExport() {
      this.leadingOutXlsx();
    },
    /** 打印按钮操作 */
    handlePrint() {
      this.printOpen = true;
    },
    colsePrintDrawer(value) {
      this.printOpen = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.toptag {
  // width: 75%;
  // margin: 0 auto;
  // display: flex;
  // justify-content: space-around;
  margin-bottom: 20px;
  .el-tag {
    margin-right: 15px;
  }
}
.formSearchUp {
  height: 36px;
  overflow: hidden;
}
.formSearchDown {
  height: auto;
  overflow: none;
}
.spread-box {
  position: relative;
  height: 30px;
  margin: 10px;
  .spread {
    position: absolute;
    right: 5%;
  }
}
::v-deep .el-table th.gutter {
  display: table-cell !important;
}
</style>
