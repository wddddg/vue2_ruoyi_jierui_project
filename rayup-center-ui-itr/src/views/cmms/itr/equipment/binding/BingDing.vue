<template>
  <div>
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-header>
          <el-row :gutter="10" class="mb10">
            <el-col :span="1.5">
              <jereh-button
                icon="el-icon-folder-add"
                :plain="false"
                type="primary"
                size="small"
                @click="addProductArchives"
                >添加绑定设备</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <jereh-button type="primary" size="small" plain icon="el-icon-printer" @click="handlePrint"
                >打印</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <jereh-button type="primary" size="small" plain icon="el-icon-download" @click="handleExport"
                >导出</jereh-button
              >
            </el-col>
          </el-row>
        </el-header>
        <el-table
          :data="deviceBingDingList"
          @selection-change="handleSelectionChange"
          border
          :header-cell-style="{
            background: '#eef1f8',
            height: '45px',
            color: '#515a6e',
            fontSize: '15px',
          }"
          :cell-style="{
            height: '39px',
            fontSize: '14px',
            color: '#606266',
            padding: '0px',
          }"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="60"
          />
          <el-table-column
            label="客户名称"
            align="center"
            key="clientName"
            prop="clientName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="产品名称"
            align="center"
            key="productName"
            prop="productName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="产品编号"
            align="center"
            key="productCode"
            prop="productCode"
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
            label="产品品牌"
            align="center"
            key="productBrand"
            prop="productBrand"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="联系人"
            align="center"
            key="contactUserName"
            prop="contactUserName"
          />
          <el-table-column
            label="联系方式"
            align="center"
            key="contactUserInfo"
            prop="contactUserInfo"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="设备地点"
            align="center"
            key="jobSite"
            prop="jobSite"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column
            label="附件"
            align="center"
            key="attachment"
            prop="attachment"
            :show-overflow-tooltip="true"
          /> -->
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
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
        />
      </el-col>
    </el-row>
    <BingDingDialog
      :open="openBingDingDialog"
      @closeDialog="colseBingDingDialog"
      :rowData="rowData"
      :isUpdata="bingDingDialogIsUpdata"
    />
  </div>
</template>

<script>
import BingDingDialog from "./components/BingDingDialog.vue";
import * as XLSX from "xlsx";
import { getClientSubmitList } from "@/api/cmms/itr/service-request/product-archives";

export default {
  name: "BingDing",
  components: { BingDingDialog },
  props: {
    requestsType: {
      type: String,
      default: "ALL",
    },
  },
  data() {
    return {
      openBingDingDialog: false,
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
      deviceBingDingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 打印弹出层
      printOpen: false,
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
      bingDingDialogIsUpdata: false,
    };
  },
  watch: {},
  async created() {
    await this.getList();
  },
  methods: {
    /** 查询用户列表 */
    async getList() {
      await getClientSubmitList(this.queryParams).then((response) => {
        this.deviceBingDingList = response.rows;
        this.total = response.total;
      });
    },
    addProductArchives() {
      this.rowData = {};
      this.openBingDingDialog = true;
      this.bingDingDialogIsUpdata = false;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.rowData = row;
      this.openBingDingDialog = true;
      this.bingDingDialogIsUpdata = true;
    },
    colseBingDingDialog(value) {
      this.openBingDingDialog = value;
      this.getList();
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
      // this.printOpen = true;
    },
    colsePrintDrawer(value) {
      this.printOpen = value;
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
::v-deep .el-table th.gutter {
  display: table-cell !important;
}
::v-deep .el-table__body tr:hover > td.el-table__cell {
  background-color: #fdeee8 !important;
}
::v-deep .el-header * {
  font-size: 14px;
}
::v-deep .el-header {
  padding: 0 !important;
}
</style>
