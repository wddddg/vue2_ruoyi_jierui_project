<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb-3">
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="handleExport"
        >
          导出
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="filtrateReview"
        >
          筛选回访
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="monthlyReview"
        >
          月度回访
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="forwardlyReview"
        >
          主动回访
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="createReviewSum"
        >
          创建回访总结
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="generateReport"
        >
          生成报告
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="yearContrast"
        >
          年度对比
        </jereh-button>
      </el-col>
    </el-row>

    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      label-position="left"
    >
      <el-form-item prop="serviceCategory">
        <span class="search">评价类别：</span>
        <jereh-select
          style="width: 160px"
          v-model="queryParams.assessmentTypesName"
          filterable
          ph="请选择"
          :dict="dict.type.itr_evaluate_type"
        />
      </el-form-item>
      <el-form-item prop="state">
        <span class="search">回访状态：</span>
        <jereh-select
          style="width: 160px"
          v-model="queryParams.callbackStatusName"
          filterable
          ph="请选择"
          :dict="dict.type.itr_return_visit_state"
        />
      </el-form-item>
      <el-form-item prop="surveyQuestionnaireCode">
        <span class="search">调查问卷：</span>
        <el-input
          v-model="queryParams.surveyQuestionnaireCode"
          placeholder="请输入"
          clearable
          style="width: 162px"
        />
      </el-form-item>
      <el-form-item prop="createTime">
        <span class="search">创建日期：</span>
        <el-date-picker
          v-model="createTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="创建开始日期"
          end-placeholder="创建结束日期"
          style="width: 340px !important"
          value-format="yyyy-MM-dd HH:ss:mm"
        />
      </el-form-item>
      <el-form-item prop="assessmentTime">
        <span class="search">评价日期：</span>
        <el-date-picker
          v-model="queryParams.assessmentTime"
          type="daterange"
          range-separator="至"
          start-placeholder="评价开始日期"
          end-placeholder="评价结束日期"
          style="width: 340px !important"
          value-format="yyyy-MM-dd HH:ss:mm"
        />
      </el-form-item>
      <el-form-item prop="serviceTypeName">
        <span class="search">服务类型：</span>
        <jereh-select
          style="width: 160px"
          v-model="queryParams.serviceTypeName"
          filterable
          ph="请选择"
          :dict="dict.type.service_type_select"
        />
      </el-form-item>
      <el-form-item prop="afterSaleArea">
        <span class="search">售后区域：</span>
        <jereh-select
          style="width: 160px"
          v-model="queryParams.afterSaleArea"
          filterable
          ph="请选择"
          :dict="dict.type.after_sale_area"
        />
      </el-form-item>
      <el-form-item prop="engineerBy">
        <span class="search">服务工程师：</span>
        <el-input
          v-model="queryParams.engineerBy"
          placeholder="请输入"
          clearable
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item prop="serviceRecordCode">
        <span class="search">服务编码：</span>
        <el-input
          v-model="queryParams.serviceRecordCode"
          placeholder="请输入"
          clearable
          style="width: 238px"
        />
      </el-form-item>
      <el-form-item prop="projectCodeSubentry">
        <span class="search">项目编码分项：</span>
        <el-input
          v-model="queryParams.projectCodeSubentry"
          placeholder="请输入"
          clearable
          style="width: 212px"
        />
      </el-form-item>
      <el-form-item prop="requestDescription">
        <span class="search">请求描述：</span>
        <el-input
          v-model="queryParams.requestDescription"
          placeholder="请输入"
          clearable
          style="width: 160px"
        />
      </el-form-item>
      <el-form-item prop="clientName">
        <span class="search">客户名称：</span>
        <el-input
          v-model="queryParams.clientName"
          placeholder="请输入"
          clearable
          style="width: 160px"
        />
      </el-form-item>
      <el-form-item prop="appraiser">
        <span class="search">评价人姓名：</span>
        <el-input
          v-model="queryParams.appraiser"
          placeholder="请输入"
          clearable
          style="width: 146px"
        />
      </el-form-item>
      <el-form-item prop="appraiserPhone">
        <span class="search">评价人联系方式：</span>
        <el-input
          v-model="queryParams.appraiserPhone"
          placeholder="请输入"
          clearable
          style="width: 196px"
        />
      </el-form-item>
      <el-form-item prop="isBadEvaluate">
        <span class="search">单项分是否小于3：</span>
        <!-- multiple多选 -->
        <el-select clearable v-model="queryParams.isBadEvaluate" style="width: 110px">
					<el-option v-for="item in requestStatusOptions" :key="item.value" :value="item.label">{{item.label}}</el-option>
				</el-select>
        <!-- <el-input
          v-model="queryParams.isBadEvaluate"
          placeholder="请选择"
          clearable
          style=""
        /> -->
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" plain @click="handleQuery"
          >过滤</el-button
        ><el-button size="mini" type="primary" plain @click="reset"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="list"
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
        label="评价类型"
        align="center"
        prop="assessmentTypesName"
        show-overflow-tooltip
      />
      <af-table-column
        label="回访状态"
        align="center"
        prop="callbackStatusName"
        show-overflow-tooltip
      ></af-table-column>
      <af-table-column
        label="调研问卷编码"
        align="center"
        prop="surveyQuestionnaireCode"
        show-overflow-tooltip
      />
      <af-table-column
        label="创建日期"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      />
      <af-table-column
        label="评价日期"
        align="center"
        prop="assessmentTime"
        show-overflow-tooltip
      />
      <af-table-column
        label="服务类型"
        align="center"
        prop="serviceTypeName"
        show-overflow-tooltip
      />
      <af-table-column
        label="售后区域"
        align="center"
        prop="afterSaleArea"
        show-overflow-tooltip
      />
      <af-table-column
        label="服务工程师"
        align="center"
        prop="engineerBy"
        show-overflow-tooltip
      />
      <af-table-column
        label="服务编码"
        align="center"
        prop="serviceRecordCode"
        show-overflow-tooltip
      />
      <af-table-column
        label="项目编码分项"
        align="center"
        prop="projectCodeSubentry"
        show-overflow-tooltip
      />
      <af-table-column
        label="产品名称"
        align="center"
        prop="productName"
        show-overflow-tooltip
      />
      <af-table-column
        label="请求描述"
        align="center"
        prop="requestDescription"
        show-overflow-tooltip
      />
      <af-table-column
        label="客户名称"
        align="center"
        prop="clientName"
        show-overflow-tooltip
      />
      <af-table-column
        label="评价人姓名"
        align="center"
        prop="appraiser"
        show-overflow-tooltip
      />
      <af-table-column
        label="评价人联系方式"
        align="center"
        prop="appraiserPhone"
        show-overflow-tooltip
      />
      <af-table-column
        label="服务评价总分"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div
            :style="{
              backgroundColor:
                scope.row.serviceEvaluate >= 90
                  ? '#cef9c0'
                  : scope.row.serviceEvaluate <= 80
                  ? 'pink'
                  : 'yellow',
            }"
          >
            {{ scope.row.serviceEvaluate }}
          </div>
        </template>
      </af-table-column>
      <af-table-column
        label="设备评价总分"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div
            :style="{
              backgroundColor:
                scope.row.productEvaluate >= 90
                  ? '#cef9c0'
                  : scope.row.productEvaluate <= 80
                  ? 'pink'
                  : '#f7ff90',
            }"
          >
            {{ scope.row.productEvaluate }}
          </div>
        </template>
      </af-table-column>
      <af-table-column
        label="是否有单项分小于3分"
        align="center"
        prop="isBadEvaluate"
        show-overflow-tooltip
      />
      <af-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
        width="180"
      >
        <template slot-scope="scope">
          <jereh-button
            style="padding: 5px 10px"
            type="primary"
            plain
            @click="toReturnVisitDetail(scope.row)"
          >
            详情
          </jereh-button>
          <jereh-button style="padding: 5px 10px" type="primary" plain @click="handleVoid">
            作废
          </jereh-button>
          <jereh-button
            v-if="
              scope.row.callbackStatusName != '待评价' &&
              scope.row.callbackStatusName != '已评价' &&
              scope.row.callbackStatusName != '超期评价'
            "
            style="padding: 5px 10px"
            type="primary"
            plain
          >
            回访
          </jereh-button>
        </template>
      </af-table-column>
    </el-table>

<!-- 分页 -->
    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->
  </div>
</template>

<script>
import {satisfactionSurveyList} from "@/api/cmms/com/satisfaction-survey/index.js"
export default {
  dicts: [
    "itr_evaluate_type",
    "itr_return_visit_state",
    "service_type_select",
    "after_sale_area",
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
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        createTime: undefined,
        assessmentTime: undefined,
        assessmentTypesName: undefined,
        callbackStatusName: undefined,
        surveyQuestionnaireCode: undefined,
        serviceTypeName: undefined,
        afterSaleArea: undefined,
        engineerBy: undefined,
        serviceRecordCode: undefined,
        projectCodeSubentry: undefined,
        requestDescription: undefined,
        clientName: undefined,
        appraiser: undefined,
        appraiserPhone: undefined,
        isBadEvaluate: undefined,
      },
      createTime:undefined,
      requestStatusOptions: [{ label: "是"},{ label: "否"}],
      // 表单参数
      form: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询满意度调研列表 */
    getList() {
      this.loading = true;
      satisfactionSurveyList(this.queryParams).then((response) => {
        console.log(response);
        this.list = response.data;
        // this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 重置
    reset() {
      this.queryParams={
        // pageNum: 1,
        // pageSize: 10,
        createTime: undefined,
        assessmentTime: undefined,
        assessmentTypesName: undefined,
        callbackStatusName: undefined,
        surveyQuestionnaireCode: undefined,
        serviceTypeName: undefined,
        afterSaleArea: undefined,
        engineerBy: undefined,
        serviceRecordCode: undefined,
        projectCodeSubentry: undefined,
        requestDescription: undefined,
        clientName: undefined,
        appraiser: undefined,
        appraiserPhone: undefined,
        isBadEvaluate: undefined,
      }
      this.getList()
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.createTime && this.createTime != undefined) {
        this.queryParams.startCreateTime = JSON.parse(JSON.stringify(this.createTime[0]))
        this.queryParams.endCreateTime = JSON.parse(JSON.stringify(this.createTime[1]))
      }else{
        this.queryParams.startCreateTime = undefined
        this.queryParams.endCreateTime = undefined
      }
      if (this.queryParams.assessmentTime && this.queryParams.assessmentTime != undefined) {
        this.queryParams.startAssessmentTime = JSON.parse(JSON.stringify(this.queryParams.assessmentTime[0])) 
        this.queryParams.endAssessmentTime = JSON.parse(JSON.stringify(this.queryParams.assessmentTime[1])) 
      }else{
        this.queryParams.startAssessmentTime = undefined
        this.queryParams.endAssessmentTime = undefined
      }
      if (this.queryParams.isBadEvaluate == '是') {
        this.queryParams.isBadEvaluate = 0
      }else if (this.queryParams.isBadEvaluate == '否') {
        this.queryParams.isBadEvaluate = 1
      }
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
    /** 筛选回访按钮操作 */
    filtrateReview() {
      console.log('筛选回访');
    },
    // 月度回访
    monthlyReview(){
      console.log('月度回访');
    },
    // 主动回访
    forwardlyReview(){
      console.log('主动回访');
    },
    // 创建回访总结
    createReviewSum(){
      console.log('创建回访总结');
    },
    // 生成报告
    generateReport(){
      console.log('生成报告');
    },
    // 年度对比
    yearContrast(){
      console.log('年度对比');
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
    /** 作废按钮操作 */
    handleVoid(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除序号为"' + ids + '"的数据项？')
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
    // 跳转回访详情
    toReturnVisitDetail(row) {
      console.log(this);
      // this.$bus.$emit('returnVisitDetailId',row.id)
      this.$router.push({
        path: "/cmms/com/returnVisitDetail?returnVisitDetailId="+row.id,
      });
    },
  },
};
</script>
<style scoped>
.search {
  width: 100px;
  text-align: right;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: auto !important;
}
::v-deep .el-form-item__content {
  margin-right: 10px;
}
</style>