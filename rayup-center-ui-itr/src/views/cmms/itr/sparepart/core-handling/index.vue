<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-header>
          <el-row :gutter="10" class="mb10">
            <el-col :span="1.5">
              <!-- <el-button type="primary" plain icon="el-icon-back" size="mini"
              >返回</el-button
            > -->
              <jereh-button
                plain
                icon="el-icon-download"
                size="small"
                @click="handleExport"
                >导出</jereh-button
              >
            </el-col>
          </el-row>
          <el-form
            :model="queryParams"
            ref="queryForm"
            size="small"
            :inline="true"
            v-show="showSearch"
            label-position="left"
            class="formSearchUp"
          >
            <el-form-item prop="brand">
              <el-input
                v-model="queryParams.brand"
                placeholder="品牌"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item prop="agreementCode">
              <el-input
                v-model="queryParams.agreementCode"
                placeholder="工单编码"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item prop="serviceType">
              <el-input
                v-model="queryParams.serviceType"
                placeholder="物料编码"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item prop="disposalMethod">
              <el-input
                v-model="queryParams.disposalMethod"
                placeholder="处置措施"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item>
              <jereh-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="handleQuery"
                >过滤</jereh-button
              >
              <jereh-button
                type="primary"
                icon="el-icon-refresh"
                size="small"
                @click="resetQuery"
              >
                重置
              </jereh-button>
            </el-form-item>
          </el-form>
        </el-header>
        <!-- <div class="tableTitle">旧件处理</div> -->
        <el-table
          :data="coreHandlingList"
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
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="60"
          />
          <el-table-column
            label="工单编码"
            align="center"
            key="workOrderCode"
            prop="workOrderCode"
          />
          <el-table-column
            label="物料编码"
            align="center"
            key="materialCode"
            prop="materialCode"
          />
          <el-table-column
            label="物料说明"
            align="center"
            key="materialName"
            prop="materialName"
          />
          <el-table-column
            label="数量"
            align="center"
            key="number"
            prop="number"
          />
          <el-table-column
            label="品牌"
            align="center"
            key="brand"
            prop="brand"
          />
          <el-table-column
            label="序列号"
            align="center"
            key="serialNo"
            prop="serialNo"
          />
          <el-table-column
            label="处置措施"
            align="center"
            key="dispose"
            prop="dispose"
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
              /> </template
          ></el-table-column>
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
import { listUsed } from "@/api/cmms/itr/work-order/material.api";
export default {
  name: "CoreHandling",
  components: {},
  props: {},
  dicts: ["after_sale_area"],
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
      coreHandlingList: null,
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
    };
  },
  watch: {},
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    async getList() {
      await listUsed(this.queryParams).then((response) => {
        this.coreHandlingList = response.data.rows;
        this.total = response.data.total;
      });
    },
    /** 搜索按钮操作 */
    async handleQuery() {
      this.queryParams.pageNum = 1;
      await this.getList();
    },
    /** 重置按钮操作 */
    async resetQuery() {
      this.resetForm('queryForm')
      await this.handleQuery();
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
  // height: 36px;
  // overflow: hidden;
  // margin: 20px 0 20px 0;
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
.tableTitle {
  // font-weight: bold;
  font-size: 14px;
  margin-bottom: 15px;
}
::v-deep .el-header * {
  font-size: 14px;
}
::v-deep .el-header {
  padding: 0 !important;
}
</style>
