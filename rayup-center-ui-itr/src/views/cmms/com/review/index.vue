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
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="toFollowResult"
          v-hasPermi="['app:update:add']"
        >
          决议项跟踪
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
      <el-form-item prop="a"
        >服务编号：
        <el-input
          v-model="queryParams.a"
          placeholder="请输入"
          clearable
          style="width: 140px"
          class = "mr-10"
        />
      </el-form-item>
      <el-form-item prop="b"
        >客户名称：
        <el-input
          v-model="queryParams.b"
          placeholder="请输入"
          clearable
          style="width: 140px"
          class = "mr-10"
        />
      </el-form-item>
      <el-form-item prop="c"
        >项目编码分项：
        <el-input
          v-model="queryParams.c"
          placeholder="请输入"
          clearable
          style="width: 165px"
          class = "mr-10"
        />
      </el-form-item>
      <el-form-item prop="d"
        >服务类型：
        <jereh-select
          style="width: 140px"
          class = "mr-10"
          v-model="queryParams.d"
          filterable
          ph="请选择"
          :dict="dict.type.itr_service_category"
        />
      </el-form-item>
      <el-form-item prop="e"
        >售后区域：
        <jereh-select
          style="width: 140px"
          class = "mr-10"
          v-model="queryParams.e"
          filterable
          ph="请选择"
          :dict="dict.type.after_sale_area"
        />
      </el-form-item>
      <el-form-item prop="f"
        >复盘组织人：
        <el-input
          v-model="queryParams.f"
          placeholder="请输入"
          clearable
          style="width: 140px"
          class = "mr-10"
        />
      </el-form-item>
      <el-form-item prop="g">
        复盘来源：
        <jereh-select
          style="width: 140px"
          class = "mr-10"
          v-model="queryParams.g"
          filterable
          ph="请选择"
          :dict="dict.type.itr_review_source"
        />
      </el-form-item>
      <el-form-item prop="h">
        复盘状态：
        <jereh-select
          style="width: 140px"
          class = "mr-10"
          v-model="queryParams.h"
          filterable
          ph="请选择"
          :dict="dict.type.itr_review_state"
        />
        <!-- <el-select
          style="width: 140px"
          v-model="queryParams.state"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in requestStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item prop="i">
        决议项达成状态：
        <jereh-select
          style="width: 140px"
          class = "mr-10"
          v-model="queryParams.i"
          filterable
          ph="请选择"
          :dict="dict.type.itr_decisionitem_reach_state"
        />
        <!-- <el-select
          style="width: 140px"
          v-model="queryParams.state"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in decisionItemReachStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          size="mini"
          type="primary"
          plain
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button size="mini" type="primary" plain @click="handleQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="updateList"
      @selection-change="handleSelectionChange"
      border
    >
      <af-table-column type="selection" align="center" fixed />
      <af-table-column
        label="序号"
        align="center"
        type="index"
        show-overflow-tooltip
      />
      <af-table-column
        label="复盘状态"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div
            :style="{
              backgroundColor:
                scope.row.p == '已完成'
                  ? '#cef9c0'
                  : scope.row.p == '未进行'
                  ? 'pink':scope.row.p == '复盘准备'
                  ?'yellow':scope.row.p == '已交报告'
                  ?'#52c7ff':''
            }"
          >
            {{ scope.row.p }}
          </div>
        </template></af-table-column
      >
      <af-table-column
        label="服务编码"
        align="center"
        prop="i"
        show-overflow-tooltip
      />
      <af-table-column
        label="客户名称"
        align="center"
        prop="b"
        show-overflow-tooltip
      ></af-table-column>
      <af-table-column
        label="产品名称"
        align="center"
        prop="c"
        show-overflow-tooltip
      />
      <af-table-column
        label="项目编码分项"
        align="center"
        prop="j"
        show-overflow-tooltip
      />
      <af-table-column
        label="产品编号"
        align="center"
        prop="n"
        show-overflow-tooltip
      />
      <af-table-column
        label="服务类型"
        align="center"
        prop="f"
        show-overflow-tooltip
      />
      <af-table-column
        label="售后区域"
        align="center"
        prop="g"
        show-overflow-tooltip
      />
      <af-table-column
        label="复盘组织人"
        align="center"
        prop="h"
        show-overflow-tooltip
      />
      <af-table-column
        label="市场区域"
        align="center"
        prop="k"
        show-overflow-tooltip
      />
      <af-table-column
        label="市场负责人"
        align="center"
        prop="l"
        show-overflow-tooltip
      />
      <af-table-column
        label="复盘来源"
        align="center"
        prop="m"
        show-overflow-tooltip
      />
      <af-table-column
        label="概述"
        align="center"
        prop="o"
        show-overflow-tooltip
      />
      <af-table-column
        label="决议项达成状态"
        align="center"
        prop="q"
        show-overflow-tooltip
      />
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
            @click="toReviewDetail(scope.row)"
          >
            详情
          </jereh-button>
        </template>
      </af-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改手持端更新对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="700px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-form-item label="版本号" prop="version">
          <jereh-input v-model="form.version" ph="请输入版本号" />
        </el-form-item>
        <el-form-item label="下载地址" prop="url">
          <file-upload
            v-model="form.url"
            :fileType="['apk']"
            :fileSize="200"
            :limit="1"
          ></file-upload>
        </el-form-item>
        <el-form-item label="更新类型" prop="updateType">
          <jereh-select v-model="form.updateType" ph="请选择更新类型" />
        </el-form-item>
        <el-form-item label="描述">
          <editor v-model="form.description" :min-height="192" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <jereh-button type="primary" @click="submitForm">确 定</jereh-button>
        <jereh-button @click="cancel">取 消</jereh-button>
      </div>
    </el-dialog>
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
  dicts: [
    "itr_service_category",
    "after_sale_area",
    "itr_review_source",
    "itr_review_state",
    "itr_decisionitem_reach_state",
  ],
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
      updateList: [
        {
          a: "市场类",
          b: "待评价",
          c: "SCDY20220804+001",
          d: "2022-10-22",
          e: "2022-10-31",
          f: "设备交付",
          g: "西南区域",
          h: "张三",
          i: "SCDY20220804",
          j: "DY20220804",
          k: "产品A",
          l: "产品A设备交付",
          n: "李四",
          m: "赵五",
          o: "150000000000",
          p: "已完成",
          q: "90.00",
          r: "是",
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
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        e: undefined,
        f: undefined,
        g: undefined,
        h: undefined,
        i: undefined,
      },
      serveOptions: [
        { label: "设备交付", value: "0" },
        { label: "培训服务", value: "1" },
        { label: "框架协议", value: "2" },
        { label: "故障报修", value: "3" },
      ],
      soureOptions: [
        { label: "系统触发", value: "1" },
        { label: "手动添加", value: "0" },
      ],
      requestStatusOptions: [
        { label: "未进行", value: "0" },
        { label: "复盘准备", value: "1" },
        { label: "已交报告", value: "2" },
        { label: "进行中", value: "3" },
        { label: "已完成", value: "4" },
      ],
      decisionItemReachStateOptions: [
        { label: "未完成", value: "0" },
        { label: "已完成", value: "1" },
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        version: [
          { required: true, message: "版本号不能为空", trigger: "blur" },
        ],
        url: [{ required: true, message: "下载地址不能为空", trigger: "blur" }],
        updateType: [
          { required: true, message: "更新类型不能为空", trigger: "change" },
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" },
        ],
        status: [
          { required: true, message: "是否启用不能为空", trigger: "blur" },
        ],
      },
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
    toFollowResult() {
      this.$router.push({
        path: "/cmms/com/followResult",
      });
    },
    toReviewDetail() {
      this.$router.push({
        path: "/cmms/com/reviewDetail",
      });
    },
  },
};
</script>
<style scoped>
 .mr-10{
    margin-right: 10px;
 }
</style>
