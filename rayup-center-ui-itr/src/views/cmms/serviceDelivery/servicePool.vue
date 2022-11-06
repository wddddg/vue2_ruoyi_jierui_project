<template>
  <div class="app-container">
    <div class="flex align-center justify-between">
      <el-row :gutter="10" class="mb-1">
        <el-col :span="1.5">
          <jereh-button
            icon="el-icon-plus"
            @click="handleAdd"
            v-hasRole="['admin', 'cmms:admin', 'cmms:serviceManager', 'cmms:qcengineer', 'cmms:businesSpecialist', 'cmms:area']"
          >
            新增
          </jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button icon="el-icon-download" @click="handleExport" v-hasRole="['cmms:admin', 'cmms:serviceManager','cmms:qcengineer','cmms:businesSpecialist']">导出</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button>视频指导</jereh-button>
        </el-col>
      </el-row>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </div>

    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item prop="serviceStateList" style="width: 120px;">
        <jereh-select v-model="serviceStateList" ph="服务状态" multiple :dict="dict.type.service_status" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="serviceType" style="width: 120px;">
        <jereh-select v-model="queryParams.serviceType" ph="服务类型" :dict="dict.type.service_type_select" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="afterSaleAreaList" style="width: 120px;">
        <jereh-select v-model="queryParams.afterSaleAreaList" ph="售后区域" multiple :dict="dict.type.after_sale_area" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="serviceDirector" style="width: 120px;">
        <jereh-person-select v-model="queryParams.serviceDirector" ph="服务负责人" :multiple="false" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="serviceCode" style="width: 120px;">
        <jereh-input v-model="queryParams.serviceCode" ph="服务编码" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="customerName" style="width: 120px;">
        <jereh-input v-model="queryParams.customerName" ph="客户名称" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="projectItem" style="width: 120px;">
        <jereh-input v-model="queryParams.projectItem" ph="项目编码分项" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="serviceLevel" style="width: 120px;">
        <jereh-select v-model="queryParams.serviceLevel" ph="服务级别" :dict="dict.type.service_level" @change="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <jereh-button @click="handleQuery">过滤</jereh-button>
        <jereh-button icon="el-icon-refresh" @click="resetQuery">重置</jereh-button>
      </el-form-item>
    </el-form>
    <!--    表格内容-->
    <el-table
      id="dataTable"
      v-loading="loading"
      :data="sdServicePoolList"
      @selection-change="handleSelectionChange"
      border
      :max-height="tableHeight"
      :cell-style="{ 'padding-top': '5px', 'padding-bottom': '5px' }"
      :row-style="isSelected"
    >
      <af-table-column type="selection" align="center" fixed/>
      <af-table-column type="index" label="序号" align="center" prop="id" show-overflow-tooltip width="80" fixed/>
      <af-table-column label="服务状态" align="center" prop="serviceState" :fixed="$WEB" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="服务类型" align="center" prop="serviceType" :fixed="$WEB" show-overflow-tooltip width="150"/>

      <af-table-column label="售后区域" align="center" prop="afterSaleArea" :fixed="$WEB" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="服务负责人" align="center" prop="serviceDirector" :fixed="$WEB" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="服务编码" align="center" prop="serviceCode" :fixed="$WEB" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="ITR请求编码" align="center" prop="ITRRequestCode" show-overflow-tooltip width="150"/>
      <af-table-column label="客户名称" align="center" prop="customerName" show-overflow-tooltip width="150"/>
      <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip width="150"/>
      <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip width="150"/>
      <af-table-column label="服务级别" align="center" prop="serviceLevel" show-overflow-tooltip width="150"/>
      <af-table-column label="服务流程号" align="center" prop="serviceProcessCode" show-overflow-tooltip width="150"/>
      <af-table-column label="服务来源" align="center" prop="serviceSource" show-overflow-tooltip width="150"/>
      <af-table-column label="市场负责人" align="center" prop="maketDirector" show-overflow-tooltip width="150"/>
      <af-table-column label="市场区域" align="center" prop="deviceArea" show-overflow-tooltip width="150"/>
      <af-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip width="150"/>
      <af-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip width="150"/>
      <af-table-column label="操作" align="center" fixed="right" width="150">
        <template slot-scope="scope">
          <jereh-button type="text" :plain="false" icon="el-icon-edit" @click="handleUpdate(scope.row)">详情
          </jereh-button>
          <jereh-button type="text" :plain="false" icon="el-icon-delete" @click="handleDelete(scope.row)"
                        v-if="scope.row.serviceState !== '已取消' && scope.row.areaDirectorFlag"
          >作废
          </jereh-button>
        </template>
      </af-table-column>
    </el-table>
    <div class="flex justify-between">
      <div style="width: 70%; margin-top: 20px">
        <el-descriptions
          :column="4"
          size="mini"
          border
          :labelStyle="{ width: '15%', 'font-weight': '700' }"
          :contentStyle="{ width: '10%' }"
        >
          <el-descriptions-item label="年度已交付设备(台)">{{ dataForm.yearDeliveryNum }}</el-descriptions-item>
          <el-descriptions-item label="待交付设备(台)">{{ dataForm.waitingDeliveryNum }}</el-descriptions-item>
          <el-descriptions-item label="交付中设备(台)">{{ dataForm.inDeliveryNum }}</el-descriptions-item>
          <el-descriptions-item label="年度已完成框架协议(项)">{{ dataForm.yearFrameNum }}</el-descriptions-item>
          <el-descriptions-item label="执行中框架协议(项)">{{ dataForm.executingFrameNum }}</el-descriptions-item>
          <el-descriptions-item label="年度已完成培训服务(项)">{{ dataForm.yearTrainingNum }}</el-descriptions-item>
          <el-descriptions-item label="执行中培训服务(项)">{{ dataForm.executingTrainingNum }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import { addSdServicePool, listSdServicePool } from '../../../api/cmms/sdServicePool'

export default {
  dicts: ['service_level', 'service_status', 'after_sale_area', 'service_type_select'],
  name: 'SdServicePool',
  data() {
    return {
      serviceStateList: [],
      init: 0,
      // 遮罩层
      loading: true,
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
      // 服务池表格数据
      sdServicePoolList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        serviceType: null,
        serviceSource: null,
        projectItem: null,
        estimateBeginDate: null,
        estimateEndDate: null,
        serviceProcessCode: null,
        serviceCode: null,
        serviceLevel: null,
        servicePlan: null,
        customerInterview: null,
        resourceMatch: null,
        executeBy: null,
        serviceBeginDate: null,
        executeEndDate: null,
        responseSpeed: null,
        professionalAbility: null,
        serviceAttitude: null,
        strengthsWeaknesses: null,
        visitFlag: null,
        visitDate: null,
        visitSummary: null,
        restoreFlag: null,
        recoveryBeginDate: null,
        reviewTriggerBackground: null,
        serviceReviewMaterial: null,
        reviewOrganizer: null,
        reviewParticipant: null,
        serviceReviewDate: null,
        serviceStateList: [],
        delflag: null,
        serviceDirector: null,
        serviceLocation: null,
        afterSaleAreaList: [],
        customerName: null,
        exportList: []
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      dataForm: {
        yearDeliveryNum: 0,
        waitingDeliveryNum: 0,
        inDeliveryNum: 0,
        yearFrameNum: 0,
        executingFrameNum: 0,
        yearTrainingNum: 0,
        executingTrainingNum: 0
      },
      tableHeight: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      const offsetTop = document.getElementById("dataTable").offsetTop;
      this.tableHeight = window.innerHeight - offsetTop - 190;
    })
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询服务池列表 */
    getList() {
      this.loading = true
      if (this.init == 0) {
        this.queryParams.serviceStateList = ['受理中', '服务准备', '服务执行', '服务回访', '服务复盘'],
          this.init = 1
      } else {
        this.queryParams.serviceStateList = this.serviceStateList
      }
      listSdServicePool(this.queryParams).then(response => {
        this.sdServicePoolList = response.rows
        this.total = response.total
        this.loading = false

      }).catch(err => {
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        serviceType: null,
        serviceSource: null,
        projectItem: null,
        estimateBeginDate: null,
        estimateEndDate: null,
        serviceProcessCode: null,
        serviceCode: null,
        serviceLevel: null,
        servicePlan: null,
        customerInterview: null,
        resourceMatch: null,
        executeBy: null,
        serviceBeginDate: null,
        executeEndDate: null,
        responseSpeed: null,
        professionalAbility: null,
        serviceAttitude: null,
        strengthsWeaknesses: null,
        visitFlag: null,
        visitDate: null,
        visitSummary: null,
        restoreFlag: null,
        recoveryBeginDate: null,
        reviewTriggerBackground: null,
        serviceReviewMaterial: null,
        reviewOrganizer: null,
        reviewParticipant: null,
        serviceReviewDate: null,
        serviceState: null,
        createTime: null,
        updateTime: null,
        delflag: null,
        createBy: null,
        updateBy: null,
        remark: null,
        serviceDirector: null,
        serviceLocation: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.serviceStateList = [],
        this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.queryParams.exportList = this.ids
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({ path: '/cmms/serviceDelivery/servicePoolDetail' })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // const roles = this.$store.state.user.roles
      // if (Array.isArray(roles) && roles.length) {
      //   const index = roles.findIndex(item => {
      //     return item === "cmms:serviceManager" || item.includes("cmms:area") || item === "cmms:admin" || item === "admin"
      //   })
      // }
      this.$router.push({
        path: '/cmms/serviceDelivery/servicePoolDetail',
        query: { id: row.id }
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSdServicePool(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addSdServicePool(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 作废按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认作废？').then(() => {
        row.serviceState = '已取消'
        return addSdServicePool(row)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('作废成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('cmms/sdServicePool/export', {
        ...this.queryParams
      }, `服务交付_服务池_${new Date().getTime()}.xlsx`)
    },
    // 选中行变色
    isSelected({row}) {
      if (this.ids.includes(row.id)) {
        return {
          backgroundColor: "#f7bba1"
        }
      }
    },
  }
}
</script>

<style scoped>
::v-deep .el-table__cell.is-leaf {
  background-color: #eef1f8 !important;
}
</style>
