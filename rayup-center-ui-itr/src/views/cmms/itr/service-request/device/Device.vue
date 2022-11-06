<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <!-- 搜索 -->
        <el-form
          :model="queryParams"
          ref="queryForm"
          size="small"
          :inline="true"
          v-show="showSearch"
          label-width="100px"
          label-position="left"
          :class="spread ? 'formSearchUp' : 'formSearchDown'"
        >
          <el-form-item label="客户名称" prop="clientName">
            <el-input
              v-model="queryParams.clientName"
              placeholder="请输入客户名称"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input
              v-model="queryParams.productName"
              placeholder="请输入产品名称"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="产品编号" prop="productCode">
            <el-input
              v-model="queryParams.productCode"
              placeholder="请输入产品编号"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="车牌号" prop="licenseNumber">
            <el-input
              v-model="queryParams.licenseNumber"
              placeholder="请输入车牌号"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="产品品牌" prop="productBrand">
            <el-input
              v-model="queryParams.productBrand"
              placeholder="请输入产品品牌"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="客户联系人" prop="contactUserName">
            <el-input
              v-model="queryParams.contactUserName"
              placeholder="请输入客户联系人"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="客户联系方式" prop="askerTelephone">
            <el-input
              v-model="queryParams.askerTelephone"
              placeholder="请输入客户联系方式"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="设备地点" prop="serviceJobsite">
            <el-input
              v-model="queryParams.serviceJobsite"
              placeholder="请输入设备地点"
              clearable
              style="width: 240px"
            />
          </el-form-item>
        </el-form>

        <div class="spread-box">
          <div class="spread">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
              >重置</el-button
            >
            <el-button
              :icon="spread ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
              size="mini"
              type="text"
              @click="spread = !spread"
              >{{ spread ? "展开" : "收起" }}</el-button
            >
          </div>
        </div>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-printer"
              size="mini"
              @click="handlePrint"
              >打印</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              >导出</el-button
            >
          </el-col>
        </el-row>

        <!-- 表单数据 -->
        <el-table
          :data="deviceList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column
            label="客户名称"
            align="center"
            key="clientName"
            prop="clientName"
          />
          <el-table-column
            label="产品名称"
            align="center"
            key="productName"
            prop="productName"
          />
          <el-table-column
            label="产品编号"
            align="center"
            key="productCode"
            prop="productCode"
          />
          <el-table-column
            label="车牌号"
            align="center"
            key="licenseNumber"
            prop="licenseNumber"
          />
          <el-table-column
            label="产品品牌"
            align="center"
            key="productBrand"
            prop="productBrand"
          />
          <el-table-column
            label="客户联系人"
            align="center"
            key="contactUserName"
            prop="contactUserName"
          />
          <el-table-column
            label="客户联系方式"
            align="center"
            key="askerTelephone"
            prop="askerTelephone"
            width="120"
          />
          <el-table-column
            label="设备地点"
            align="center"
            key="serviceJobsite"
            prop="serviceJobsite"
            width="120"
          />
          <el-table-column
            label="附件"
            align="center"
            key="requestAttachment"
            prop="requestAttachment"
            width="120"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <ImagePreview :src="scope.row.requestAttachment" />
            </template>
          </el-table-column>
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
          @pagination="getList"
        />
      </el-col>
    </el-row>

    <!-- 添加或修改用户配置对话框 -->
    <DeviceDialog
      :title="title"
      :open="open"
      @closeDialog="closeDialog"
      :rowData="rowData"
    />
    <Print :open="printOpen" @colsePrintDrawer="colsePrintDrawer" />
  </div>
</template>

<script>
import ImagePreview from "@/components/ImagePreview/index.vue";
import { getDeviceList } from "@/api/cmms/itr/service-request/device/user";
import DeviceDialog from "./components/DeviceDialog.vue";
import Print from "../../components/Print/index.vue";
import * as XLSX from "xlsx";

export default {
  name: "Device",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: { ImagePreview, DeviceDialog, Print },
  data() {
    return {
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
      deviceList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 打印弹出层
      printOpen: false,
      // 默认密码
      initPassword: undefined,
      // 点击修改选中的数据
      rowData: {},
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        productName: undefined,
        productNumber: undefined,
        plateNumber: undefined,
        productBrand: undefined,
        userContacts: undefined,
        userPhoneNumber: undefined,
        equipmentLocation: undefined,
      },
      // 展开收起
      spread: true,
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getList();
    this.getConfigKey("sys.user.initPassword").then((response) => {
      this.initPassword = response.msg;
    });
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      getDeviceList(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.deviceList = response.rows;
          this.total = response.total;
        }
      );
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
    /** 打印按钮操作 */
    handlePrint() {
      this.printOpen = true;
    },
    colsePrintDrawer(value) {
      this.printOpen = value;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log(row);
      this.rowData = row;
      this.open = true;
    },
    closeDialog(value) {
      this.open = value;
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
  },
};
</script>

<style lang="scss" scoped>
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
</style>
