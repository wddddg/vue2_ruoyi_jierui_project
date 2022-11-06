<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb-1">
      <el-col :span="1.5">
        <jereh-button @click="handleExport" icon="el-icon-download" v-hasRole="['cmms:admin', 'cmms:serviceManager','cmms:qcengineer','cmms:businesSpecialist']">导出</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>视频指导</jereh-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item prop="executionStatusList" style="width: 150px;">
        <jereh-select v-model="queryParams.executionStatusList" multiple ph="请选择执行状态" :dict="dict.type.framework_state" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="afterSaleAreaList" style="width: 150px;">
        <jereh-select v-model="queryParams.afterSaleAreaList" multiple ph="请选择售后区域" :dict="dict.type.after_sale_area" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="serviceDirector" style="width: 150px;">
        <jereh-person-select v-model="queryParams.serviceDirector" :multiple="false" ph="请输入服务负责人" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="serviceCode" style="width: 150px;">
        <jereh-input v-model="queryParams.serviceCode" ph="请输入服务编码" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="customerName" style="width: 150px;">
        <jereh-input v-model="queryParams.customerName" ph="请输入客户名称" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="equipmentScope" style="width: 150px;">
        <jereh-input v-model="queryParams.equipmentScope" ph="请输入设备范围" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="deviceNo" style="width: 150px;">
        <jereh-select v-model="queryParams.deviceNo" ph="请选择设备数量" :dict="dict.type.device_no" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="serviceLevel" style="width: 150px;">
        <jereh-select v-model="queryParams.serviceLevel" ph="请选择服务级别" :dict="dict.type.service_level" @change="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <jereh-button icon="el-icon-search" @click="handleQuery">过滤</jereh-button>
        <jereh-button icon="el-icon-refresh" @click="resetQuery">重置</jereh-button>
      </el-form-item>
    </el-form>

    <el-table
      id="dataTable"
      v-loading="loading"
      :data="frameworkList"
      @selection-change="handleSelectionChange"
      border
      :max-height="tableHeight"
      :cell-style="{ 'padding-top': '5px', 'padding-bottom': '5px' }"
      :row-style="isSelected"
    >
      <af-table-column type="selection" align="center" fixed/>
      <af-table-column type="index" label="序号" align="center" prop="id" show-overflow-tooltip width="80" fixed/>
      <af-table-column label="执行状态" align="center" prop="executionStatus" show-overflow-tooltip width="150"/>
      <af-table-column label="售后区域" align="center" prop="sdServicePool.afterSaleArea" show-overflow-tooltip width="150"/>
      <af-table-column label="服务负责人" align="center" prop="sdServicePool.serviceDirector" show-overflow-tooltip width="150"/>
      <af-table-column label="服务编码" align="center" prop="serviceCode" show-overflow-tooltip width="150"/>
      <af-table-column label="客户名称" align="center" prop="sdServicePool.customerName" show-overflow-tooltip width="150"/>
      <af-table-column label="设备范围" align="center" prop="sdServicePool.equipmentScope" show-overflow-tooltip width="150">
        <template slot-scope="scope">
          {{ scope.row.sdServicePool.equipmentScope ? scope.row.sdServicePool.equipmentScope.join(',') : '' }}
        </template>
      </af-table-column>
      <af-table-column label="设备数量" align="center" prop="sdServicePool.deviceNo" show-overflow-tooltip width="150">
      </af-table-column>
      <af-table-column label="服务级别" align="center" prop="sdServicePool.serviceLevel" show-overflow-tooltip width="150"/>
      <af-table-column label="预估结束日期" align="center" prop="sdServicePool.estimateEndDate" show-overflow-tooltip width="150"/>
      <af-table-column label="剩余天数" align="center" prop="daysRemaining" show-overflow-tooltip width="150">
        <template slot-scope="scope">
          {{ getLeftDays(scope.row) }}
        </template>
      </af-table-column>
      <af-table-column label="市场负责人" align="center" prop="sdServicePool.maketDirector" show-overflow-tooltip width="150"
      />
      <af-table-column label="市场区域" align="center" prop="sdServicePool.deviceArea" show-overflow-tooltip width="150"/>
      <af-table-column label="框架属性" align="center" prop="frameProperties" show-overflow-tooltip width="150">
        <template slot-scope="scope">
          {{ scope.row.sdServicePool.contractAmount == 0 ? '虚拟协议' : '合同协议' }}
        </template>
      </af-table-column>
      <af-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip width="150"/>
      <af-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip width="150"/>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="toDetailPage(scope.row)"
          >详情
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-if="scope.row.executionStatus !== '已取消' &&  scope.row.directorsAreaFlag "
          >作废
          </el-button>
        </template>
      </af-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>

import { listFramework, updateFramework } from '../../../api/cmms/sdFramework'

export default {
  name: 'Framework',
  dicts: ['service_level', 'device_no', 'framework_state', 'after_sale_area'],
  data() {
    return {
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
      // 框架协议表格数据
      frameworkList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        executionStatusList: ["未执行", "执行中"],
        afterSaleAreaList: [],
        serviceCode: null,
        serviceDirector: null,
        customerName: null,
        equipmentScope: null,
        deviceNo: null,
        serviceLevel: null,
        exportList:[]
      },
      // 表单参数
      form: {},
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
    // 获取剩余天数
    getLeftDays(row) {
      let totalDays, diffDate
      let estimateEndDate = Date.parse(row.sdServicePool.estimateEndDate) + 24 * 3600 * 1000
      let now = Date.now()
      diffDate = Math.abs(estimateEndDate - now)
      totalDays = Math.floor(diffDate / (1000 * 3600 * 24))
      return estimateEndDate > now ? totalDays : 0
    },
    // 跳转详情页面
    toDetailPage(row) {
      this.$router.push({ path: '/cmms/serviceDelivery/frameworkDetail', query: { id: row.id } })
    },
    // 作废数据
    handleDelete(row) {
      this.$modal.confirm('是否确认作废？').then(() => {
        row.executionStatus = '已取消'
        return updateFramework(row)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('作废成功')
      }).catch(() => {
      })
    },
    /** 查询框架协议列表 */
    getList() {
      this.loading = true
      listFramework(this.queryParams).then(response => {
        this.frameworkList = response.rows
        this.total = response.total
        this.loading = false
        console.log(this.frameworkList)
      }).catch(err => {
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.queryParams.executionStatusList = ["未执行", "执行中"]
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
      this.queryParams.exportList=this.ids;
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('/cmms/framework/export', {
        ...this.queryParams
      }, `框架协议_${new Date().getTime()}.xlsx`)
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
