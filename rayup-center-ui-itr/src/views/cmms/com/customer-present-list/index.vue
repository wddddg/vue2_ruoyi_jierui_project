<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb-3">
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="handleExport"
          v-hasPermi="['app:update:export']"
        >
          导出
        </jereh-button>
      </el-col>
    </el-row>

    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-position="left"
    >
      <el-form-item prop="processState">
        处理状态：
        <jereh-select
          class="search"
          v-model="queryParams.processState"
          filterable
          ph="请选择"
          :dict="dict.type.itr_process_state"
        />
      </el-form-item>
      <el-form-item prop="surveyQuestionnaireCode">
        调查问卷编码：
        <el-input
          class="search"
          v-model="queryParams.surveyQuestionnaireCode"
          placeholder="请输入"
          clearable
        />
      </el-form-item>
      <el-form-item prop="afterSaleArea">
        售后区域：
        <jereh-select
          class="search"
          v-model="queryParams.afterSaleArea"
          filterable
          ph="请选择售后区域"
          :dict="dict.type.after_sale_area"
        />
      </el-form-item>
      <el-form-item prop="clientName">
        客户名称：
        <el-input
          class="search"
          v-model="queryParams.clientName"
          placeholder="请输入客户名称"
          clearable
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item prop="consigneeName">
        收货人姓名：
        <el-input
          class="search"
          v-model="queryParams.consigneeName"
          placeholder="请输入收货人姓名"
          clearable
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item prop="consigneePhone">
        收货人联系方式：
        <el-input
          class="search"
          v-model="queryParams.consigneePhone"
          placeholder="请输入收货人联系方式"
          clearable
        />
      </el-form-item>
      <el-form-item prop="courierNumber">
        快递单号：
        <el-input
          class="search"
          v-model="queryParams.courierNumber"
          placeholder="请输入快递单号"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" plain @click="handleQuery"
          >过滤</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="clientPresentList"
      @selection-change="handleSelectionChange"
      border
    >
      <!-- <af-table-column type="selection" align="center" fixed /> -->
      <af-table-column
        label="序号"
        align="center"
        type="index"
        show-overflow-tooltip
      />
      <af-table-column
        label="处理状态"
        align="center"
        prop="processState"
        show-overflow-tooltip
      />
      <af-table-column
        label="提交时间"
        align="center"
        prop="referTime"
        show-overflow-tooltip
      ></af-table-column>
      <af-table-column
        label="调研问卷编码"
        align="center"
        prop="surveyQuestionnaireCode"
        show-overflow-tooltip
      />
      <af-table-column
        label="售后区域"
        align="center"
        prop="afterSaleArea"
        show-overflow-tooltip
      />
      <af-table-column
        label="客户名称"
        align="center"
        prop="clientName"
        show-overflow-tooltip
      />
      <af-table-column
        label="收货人地址"
        align="center"
        prop="deliveryAddress"
        show-overflow-tooltip
      />
      <af-table-column
        label="收货人姓名"
        align="center"
        prop="consigneeName"
        show-overflow-tooltip
      />
      <af-table-column
        label="收货人联系方式"
        align="center"
        prop="consigneePhone"
        show-overflow-tooltip
      />
      <af-table-column label="礼品名称" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.presentName"
            class="border-none"
            placeholder="请输入"
          ></el-input>
        </template>
      </af-table-column>
      <af-table-column label="快递公司" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.courierServicesCompany"
            class="border-none"
            placeholder="请输入"
          ></el-input>
        </template>
      </af-table-column>
      <af-table-column label="快递单号" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.courierNumber"
            class="border-none"
            placeholder="请输入"
          ></el-input>
        </template>
      </af-table-column>
      <af-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
        width="100"
      >
        <template slot-scope="scope">
          <jereh-button
            style="padding: 5px 10px"
            type="primary"
            plain
            @click="handleUpdate(scope.row)"
          >
            保存
          </jereh-button>
        </template>
      </af-table-column>
    </el-table>

    <!-- v-show="total > 0" -->
    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
// import {
//   getUpdate,
//   listUpdate,
//   addUpdate,
//   delUpdate,
//   updateUpdate,
// } from "@/api/cmms/appUpdate";

export default {
  dicts: ["itr_process_state", "after_sale_area"],
  data() {
    return {
      // 遮罩层
      loading: false,
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
      // 表格数据
      clientPresentList: [
        {
          processState: "未处理",
          referTime: "2022-10-22",
          surveyQuestionnaireCode: "SCDY20220804+001",
          afterSaleArea: "西南区域",
          clientName: "张先生",
          deliveryAddress: "xx省xx市xx区xxx街103号",
          consigneeName: "张先生",
          consigneePhone: "15000000000",
          presentName: undefined,
          courierServicesCompany: undefined,
          courierNumber: undefined,
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        processState: undefined,
        surveyQuestionnaireCode: undefined,
        afterSaleArea: undefined,
        clientName: undefined,
        consigneeName: undefined,
        consigneePhone: undefined,
        courierNumber: undefined,
      },
      requestStatusOptions: [{ label: "测试", value: "1" }],
      // 表单参数
      form: {},
    };
  },
  created() {
    // this.getList()
  },
  methods: {
    /** 查询手持端更新列表 */
    getList() {
      this.loading = true;
      listUpdate(this.queryParams).then((response) => {
        this.updateList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        version: null,
        url: null,
        updateType: null,
        description: null,
        status: 0,
        delflag: null,
        createBy: null,
        updateBy: null,
        createTime: null,
        updateTime: null,
        remark: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加手持端更新";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getUpdate(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改手持端更新";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateUpdate(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUpdate(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除手持端更新编号为"' + ids + '"的数据项？')
        .then(function () {
          return delUpdate(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "app/update/export",
        {
          ...this.queryParams,
        },
        `update_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
<style scoped>
.search {
  width: 180px;
  margin-right: 10px;
}
::v-deep .border-none > .el-input__inner {
  padding: 0px 5px;
  border: none;
}
::v-deep .border-none > div > .el-input__inner {
  border: none;
}
::v-deep .border-none > div > .el-input__suffix {
  display: none;
}
::v-deep .border-none > .el-input__prefix {
  display: none;
}
</style>