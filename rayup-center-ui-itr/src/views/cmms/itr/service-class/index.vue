<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!-- <div class="toptag mb10">
        <el-tag
          >所有请求：{{
            statistics.pending +
            statistics.exec +
            statistics.complete +
            statistics.cancel
          }}</el-tag
        >
        <el-tag type="warning">待受理：{{ statistics.pending }}</el-tag>
        <el-tag type="info">服务中：{{ statistics.exec }}</el-tag>
        <el-tag type="success">已完成：{{ statistics.complete }} </el-tag>
        <el-tag type="danger">已取消：{{ statistics.cancel }}</el-tag>
      </div> -->
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-header>
          <el-row :gutter="10" class="mb10">
            <el-col :span="1.5">
              <jereh-button
                type="primary"
                plain
                icon="el-icon-back"
                size="small"
                @click="handleReturn"
              >
                返回
              </jereh-button>
              <jereh-button
                type="primary"
                :plain="false"
                icon="el-icon-plus"
                size="small"
                @click="handleAdd"
                >创建服务请求</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <jereh-button
                type="primary"
                plain
                icon="el-icon-download"
                size="small"
                @click="handleExport"
                >导出</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <jereh-button
                plain
                type="primary"
                icon="el-icon-printer"
                size="small"
                @click="handlePrint"
                >打印</jereh-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-tag class="toptag"  style="color: #409eff !important;"
                >所有请求：{{ total }} &nbsp;、待受理：{{
                  statistics.pending
                }}
                &nbsp;、服务中：{{ statistics.exec }} &nbsp;、已完成：{{
                  statistics.complete
                }}
                &nbsp;、已取消：{{ statistics.cancel }}</el-tag
              >
            </el-col>
            <right-toolbar
              :showSearch.sync="showSearch"
              @queryTable="resetSearch"
            ></right-toolbar>
          </el-row>
          <el-form
            :model="queryParams"
            ref="queryForm"
            size="small"
            :inline="true"
            v-show="showSearch"
            label-width="100px"
            label-position="left"
            :class="spread ? 'formSearchUp' : 'formSearchDown'"
            class="mb10"
          >
            <el-form-item prop="serviceRequiredTime">
              <el-date-picker
                v-model="queryParams.serviceRequiredTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 240px !important"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item>
              <jereh-button
                size="small"
                type="primary"
                plain
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
            <el-form-item class="right-search-form-item">
              <div class="right-search">
                <el-input
                  placeholder="模糊搜索"
                  clearable
                  style="width: 140px; margin-right: 10px"
                  v-model="queryParams.keyWord"
                />
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="handleKeyWordQuery"
                  >搜素</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </el-header>

        <el-table
          :data="servicesList"
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
            label="服务进度"
            align="center"
            key="state"
            prop="state"
            width="160"
          >
            <template slot-scope="scope">
              <div>
                {{ serverProgressState(scope.row.state) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            key="createTime"
            prop="createTime"
            width="160"
          />
          <el-table-column
            label="服务请求编码"
            align="center"
            key="serviceRequestCode"
            prop="serviceRequestCode"
            width="160"
          />
          <el-table-column
            label="服务编码"
            align="center"
            key="sdServiceCode"
            prop="sdServiceCode"
            width="120"
          />
          <el-table-column
            label="服务请求来源"
            align="center"
            key="serviceSource"
            prop="serviceSource"
            width="120"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.itr_service_source"
                :value="scope.row.serviceSource"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="服务需求时间"
            align="center"
            key="serviceRequiredTime"
            prop="serviceRequiredTime"
            width="160"
            :formatter="formatterDate"
          />
          <el-table-column
            label="服务类型"
            align="center"
            key="serviceType"
            prop="serviceType"
            width="120"
          >
            <template slot-scope="scope">
              {{ getLabelByValue(scope.row.serviceType, serviceTypeOptions) }}
            </template>
          </el-table-column>
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
              />
            </template>
          </el-table-column>
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
              />
            </template>
          </el-table-column>
          <el-table-column
            label="客户名称"
            align="center"
            key="clientName"
            prop="clientName"
            width="120"
          />
          <el-table-column
            label="产品名称"
            align="center"
            key="productName"
            prop="productName"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="项目编码"
            align="center"
            key="projectCode"
            prop="projectCode"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="产品编号"
            align="center"
            key="productCode"
            prop="productCode"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="车牌号"
            align="center"
            key="licenseNumber"
            prop="licenseNumber"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="服务地点"
            align="center"
            key="serviceJobsite"
            prop="serviceJobsite"
            width="180"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="服务请求概述"
            align="center"
            key="serviceDescription"
            prop="serviceDescription"
            width="160"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="操作"
            align="center"
            width="80"
            class-name="small-padding fixed-width"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
                >详情</el-button
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
    <el-dialog 
    v-dialogDrag
      title="请选择服务请求类型"
      :visible.sync="chooseTypeDialog"
      width="300px"
      center
    >
      <el-row :gutter="24" style="text-align: center">
        <el-col v-for="(item, index) in serviceTypeOptions" :key="index">
          <el-button
            type="primary"
            plain
            style="width: 126px; margin-bottom: 5px"
            @click="openWork(item.value)"
            >{{ item.label }}</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>

    <Print :open="printOpen" @colsePrintDrawer="colsePrintDrawer" />
  </div>
</template>

<script>
import ImagePreview from "@/components/ImagePreview/index.vue";
import Print from "@/views/cmms/itr/components/Print/index.vue";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { requestSource, requestStatus } from "@/utils/dictionary-service";
import {
  getAllRequestsList,
  getOtherRequestsList,
  exportByOther,
  listByServiceOtherStat,
} from "@/api/cmms/itr/service-request/all-requests";

import { serviceType, getLabelByValue } from "@/utils/dictionary-service";

export default {
  name: "OtherServices",
  dicts: [
    "itr_fault_level",
    "itr_influence_level",
    "itr_emergency_degree",
    "itr_service_category",
    "itr_service_source",
    "after_sale_area",
    "device_area",
  ],
  components: { ImagePreview, Print },
  props: {},
  data() {
    return {
      serviceTypeOptions: serviceType(),

      addfrom: "serviceClass",
      selectedServiceType: "",
      // 是否显示弹出层
      open: false,
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
      servicesList: [],
      requestSourceOptions: requestSource(),
      requestStatusOptions: requestStatus(),
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 打印弹出层
      printOpen: false,
      spread: true,
      // 点击修改选中的数据
      rowData: {},
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        serviceRequiredTime: undefined,
        state: "",
      },
      chooseTypeDialog: false,
      selectDataList: [],
      selectIds: [],
      statistics: {
        pending: 0,
        exec: 0,
        complete: 0,
        cancel: 0,
      },
    };
  },
  watch: {},
  async created() {
    await this.getList();
  },
  methods: {
    handleReturn() {
      const pageSize = this.$route.query.pageSize
        ? this.$route.query.pageSize
        : "";
      this.$route.params.pageSize = pageSize;
      this.$router.back();
    },
    async resetSearch() {
      this.$refs["queryForm"].resetFields();
      await this.resetQuery();
    },
    getLabelByValue(value, arr) {
      return getLabelByValue(value, arr);
    },
    openWork(val) {
      this.selectedServiceType = val;
      this.chooseTypeDialog = false;
      // this.open = true
      this.rowData = {};
      this.$router.push({
        path: "/request/requests-other-edit/index",
        query: { selectedServiceType: this.selectedServiceType },
      });
    },
    /** 查询用户列表 */
    async getList() {
      this.queryParams.stateGroup = this.$route.query.stateGroup;
      await getOtherRequestsList(this.queryParams).then((res) => {
        let data = res.data;
        this.servicesList = data.rows;
        this.total = data.total;
        this.selectIds = this.servicesList.map((item) => {
          return item.id;
        });
      });
      await listByServiceOtherStat().then((res) => {
        this.statistics = { ...res.data };
      });
    },
    /** 搜索按钮操作 */
    async handleQuery() {
      if (this.queryParams?.serviceRequiredTime?.length) {
        this.queryParams.startTime = this.queryParams.serviceRequiredTime[0];
        this.queryParams.endTime = this.queryParams.serviceRequiredTime[1];
        // delete this.queryParams.serviceRequiredTime;
      } else {
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }
      await this.getList();
    },
    /** 重置按钮操作 */
    async resetQuery() {
      delete this.queryParams.startTime;
      delete this.queryParams.endTime;
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        serviceRequiredTime: undefined,
        state: "",
      };
      await this.getList();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({
        path: "/request/requests-edit/index",
        query: { selectedServiceType: "malfunction_repair" },
      });
      // this.open = true;
      // this.chooseTypeDialog = true;
      // this.rowData = {};
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      let me = this;
      this.$router.push({
        path: "/request/requests-edit/index",
        query: { id: row.id, selectedServiceType: row.serviceType },
      });
    },
    closeDialog(value) {
      this.open = value;
    },
    /** 导出按钮操作 */
    async handleExport() {
      await this.leadingOutXlsx();
    },
    /** 打印按钮操作 */
    handlePrint() {
      this.printOpen = true;
    },
    colsePrintDrawer(value) {
      this.printOpen = value;
    },
    formatterDate(row) {
      if (!row.serviceRequiredTime) return null;
      let date = new Date(row.serviceRequiredTime);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    },
    async leadingOutXlsx() {
      let currentIds = this.selectIds.join(",");
      if (this.ids?.length) {
        currentIds = this.ids
          .map((item) => {
            return item.id;
          })
          .join(",");
      }
      this.downloadJierui(
        "/itr/serviceRequest/exportByOther",
        {
          serviceRequestIds: currentIds,
        },
        `服务类${new Date().getTime()}.xlsx`
      );
      // await exportByOther({ serviceRequestIds: currentIds }).then((res) => {
      //   const blob = new Blob([res]);
      //   saveAs(blob, `服务类${new Date().getTime()}.xlsx`)
      // });
      // await exportByOther({ serviceRequestIds: currentIds }).then((res) => {
      //   let blob = new Blob([res], { type: 'xlsx' });
      //   let downloadElement = document.createElement("a");
      //   let href = window.URL.createObjectURL(blob);
      //   downloadElement.href = href;
      //   document.body.appendChild(downloadElement);
      //   downloadElement.click();
      //   document.body.removeChild(downloadElement); //移除元素；防止连续点击创建多个a标签
      //   window.URL.revokeObjectURL(href);
      //   downloadElement.click()
      // });
      // var data1 = [
      //   ["id", "name", "value"],
      //   [1, "sheetjs", 7262],
      //   [2, "js-xlsx", 6969],
      // ];

      // var data2 = [
      //   {
      //     周一: "语文",
      //     周二: "数学",
      //     周三: "历史",
      //     周四: "政治",
      //     周五: "英语",
      //   },
      //   {
      //     周一: "数学",
      //     周二: "数学",
      //     周三: "政治",
      //     周四: "英语",
      //     周五: "英语",
      //   },
      //   {
      //     周一: "政治",
      //     周二: "英语",
      //     周三: "历史",
      //     周四: "政治",
      //     周五: "数学",
      //   },
      // ];

      // //1. 新建一个工作簿
      // let workbook = XLSX.utils.book_new();
      // //2. 生成一个工作表，
      // //2.1 aoa_to_sheet 把数组转换为工作表
      // let sheet1 = XLSX.utils.aoa_to_sheet(data1);
      // //2.2 把json对象转成工作表
      // let sheet2 = XLSX.utils.json_to_sheet(data2);
      // //3.在工作簿中添加工作表
      // XLSX.utils.book_append_sheet(workbook, sheet1, "sheetName1"); //工作簿名称
      // // XLSX.utils.book_append_sheet(workbook, sheet2, "sheetName2"); //工作簿名称
      // // XLSX.utils.sheet_add_json(sheet1,data2);//把已存在的sheet中数据替换成json数据
      // //4.输出工作表,由文件名决定的输出格式
      // XLSX.writeFile(workbook, "workBook1.xlsx"); // 保存的文件名
    },
    async requestsSuccess() {
      await this.getList();
    },
    setUpSuccess(value, updata) {
      // this.getList();
      if (!updata) {
        this.$nextTick(() => {
          // 静态效果
          this.servicesList.push(value);
          console.log(111);
        });
      } else {
        console.log(1);
      }
    },
    async handleKeyWordQuery() {
      let params = {
        keyWord: this.queryParams.keyWord,
        pageSize: this.queryParams.pageSize,
        pageNum: this.queryParams.pageNum,
        stateGroup: this.queryParams.stateGroup,
      };
      await getOtherRequestsList(params).then((res) => {
        let data = res.data;
        this.servicesList = data.rows;
        this.total = data.total;
        this.selectIds = this.servicesList.map((item) => {
          return item.id;
        });
      });
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
// .toptag {
//   // width: 75%;
//   // margin: 0 auto;
//   // display: flex;
//   // justify-content: space-around;
//   margin-left: 12px;
//   .el-tag {
//     margin-right: 15px;
//   }
// }
.right-search-form-item {
  position: absolute;
  right: 0;
  .right-search {
  }
}
::v-deep .el-table th.gutter {
  display: table-cell !important;
}
::v-deep .toptag.el-tag.el-tag--medium.el-tag--light {
  color: #409eff !important;
  background: rgba($color: #409eff, $alpha: 0.1) !important;
  border-color: rgba($color: #409eff, $alpha: 0.2) !important;
  height: 34px;
  line-height: 34px;
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
::v-deep .el-tag {
  color: #1890ff;
  background: rgba($color: #409eff, $alpha: 0.1) !important;
  border-color: rgba($color: #409eff, $alpha: 0.2) !important;
}
::v-deep .el-tag.el-tag--info {
  background: rgba($color: #909399, $alpha: 0.1) !important;
  border-color: rgba($color: #909399, $alpha: 0.2) !important;
  color: #909399;
}
::v-deep .el-tag.el-tag--warning {
  background: rgba($color: #e6a23c, $alpha: 0.1) !important;
  border-color: rgba($color: #e6a23c, $alpha: 0.2) !important;
  color: #e6a23c;
}
::v-deep .el-tag.el-tag--danger {
  background: rgba($color: #f56c6c, $alpha: 0.1) !important;
  border-color: rgba($color: #f56c6c, $alpha: 0.2) !important;
  color: #f56c6c;
}
</style>
