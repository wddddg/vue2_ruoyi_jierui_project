<template>
  <div class="app-container">
    <div class="flex align-center justify-between">
      <el-row :gutter="10" class="mb-1">
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
      <el-form-item prop="trainingStateList" style="width: 120px;">
        <jereh-select v-model="queryParams.trainingStateList" ph="培训状态" multiple :dict="dict.type.training_state" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="afterSaleAreaList" style="width: 120px;">
        <jereh-select v-model="queryParams.afterSaleAreaList" ph="售后区域" multiple :dict="dict.type.after_sale_area" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="trainingDirector" style="width: 120px;">
        <jereh-person-select v-model="queryParams.trainingDirector" ph="培训负责人" :multiple="false" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="customerName" style="width: 120px;">
        <jereh-input v-model="queryParams.customerName" ph="客户名称" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="projectItem" style="width: 120px;">
        <jereh-input v-model="queryParams.projectItem" ph="项目编码分项" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="productName" style="width: 120px;">
        <jereh-input v-model="queryParams.productName" ph="产品名称" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="trainingCode" style="width: 120px;">
        <jereh-input v-model="queryParams.trainingCode" ph="培训编码" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="serviceCode" style="width: 120px;">
        <jereh-input v-model="queryParams.serviceCode" ph="服务编码" @keyup.native.enter="handleQuery"/>
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
      <af-table-column label="培训状态" align="center" prop="trainingState" :fixed="$WEB" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="售后区域" align="center" prop="afterSaleArea" :fixed="$WEB" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="培训负责人" align="center" prop="trainingDirector" :fixed="$WEB" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="客户名称" align="center" prop="customerName" show-overflow-tooltip width="150"/>
      <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip width="150"/>
      <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip width="150"/>
      <af-table-column label="培训编码" align="center" prop="trainingCode" show-overflow-tooltip width="150"/>
      <af-table-column label="服务编码" align="center" prop="serviceCode" show-overflow-tooltip width="150"/>
      <af-table-column label="培训地点" align="center" prop="trainingPlace" show-overflow-tooltip width="150"/>
      <af-table-column label="培训属性" align="center" prop="trainingAttribute" show-overflow-tooltip width="150"/>
      <af-table-column label="培训级别" align="center" prop="trainingLevel" show-overflow-tooltip width="150"/>
      <af-table-column label="培训方式" align="center" prop="trainingPreparation.trainingMode" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="市场负责人" align="center" prop="maketDirector" show-overflow-tooltip width="150"/>
      <af-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip width="150"/>
      <af-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip width="150"/>
      <af-table-column label="操作" align="center" fixed="right" width="150">
        <template slot-scope="scope">
          <jereh-button type="text" :plain="false" icon="el-icon-edit" @click="handleDetail(scope.row)">详情</jereh-button>
          <jereh-button type="text" :plain="false" icon="el-icon-edit" @click="handleDelete(scope.row)"
                        v-if="scope.row.trainingState !== '已取消' && scope.row.directorsAreaFlag"
          >作废
          </jereh-button>
        </template>
      </af-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
import { addSdServicePool } from '../../../api/cmms/sdServicePool'
import { remoteUser } from '../../../api/cmms/device'
import { listTrainingService, updateTrainingService } from '../../../api/cmms/sdTrainingService'

export default {
  dicts: ['service_type', 'service_level', 'training_state', 'after_sale_area'],
  name: 'SdServicePool',
  data() {
    return {
      formateDate: [],
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
      researchUserOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        serviceType: '培训服务',
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
        trainingDirector: null,
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
        trainingStateList: null,
        afterSaleAreaList: null,
        delflag: null,
        serviceDirector: null,
        serviceLocation: null,
        customerName: null,
        deviceBasic: {},
        trainingCode: null,
        productName: null,
        exportList: []
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      tableHeight: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const offsetTop = document.getElementById("dataTable").offsetTop;
      this.tableHeight = window.innerHeight - offsetTop - 190;
    })
  },
  created() {
    this.queryParams.trainingStateList = ['待培训', '开展培训']
    this.getList()
  },
  methods: {
    /** 查询服务池列表 */
    getList() {
      this.loading = true
      listTrainingService(this.queryParams).then(response => {
        console.log(response)
        this.sdServicePoolList = response.data.records
        this.sdServicePoolList.forEach((item) => {
          if (item.projectItem != null) {
            let arr = item.projectItem.split(',')
            let newarr = arr.filter(function(arr1) {
              if (arr1 != '' && arr1 != 'null') {
                return arr1
              }
            })
            item.projectItem = newarr.join(',')
          }
          if (item.productName != null) {
            let arr = item.productName.split(',')
            let newarr1 = arr.filter(function(arr1) {
              if (arr1 != '' && arr1 != 'null') {
                return arr1
              }
            })
            item.productName = newarr1.join(',')
          }
          console.log(item.projectItem)
        })
        this.total = response.data.total
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
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 远程搜索用户
    remoteUser(query) {
      if (query !== '') {
        this.loading = true
        remoteUser({ searchValue: query }).then(res => {
          this.loading = false
          this.researchUserOptions = res.data
        })
      } else {
        this.options = []
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.queryParams.exportList = this.ids
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 详情按钮操作 */
    handleDetail(row) {
      this.$router.push({
        path: '/cmms/serviceDelivery/trainingServiceDetail',
        query: { id: row.id, isSave: 0, trainingState: row.trainingState }
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
        row.trainingState = '已取消'
        return updateTrainingService(row)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('作废成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('cmms/trainingService/export', {
        ...this.queryParams
      }, `服务交付_培训服务_${new Date().getTime()}.xlsx`)
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
