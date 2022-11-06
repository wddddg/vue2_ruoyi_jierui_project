<template>
  <div class="app-container">
    <!--    按钮-->
    <div class="flex align-center justify-between">
      <el-row :gutter="10" class="mb-1">
        <el-col :span="1.5">
          <jereh-button icon="el-icon-download" @click="handleExport" v-if="canExport">导出</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button>视频指导</jereh-button>
        </el-col>
      </el-row>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </div>
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item prop="deliveryServiceStateList" style="width: 120px;">
        <jereh-select v-model="queryParams.deliveryServiceStateList" ph="服务状态" multiple
                      :dict="dict.type.delivery_service_state" @change="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="deviceBasic.afterSaleAreaList" style="width: 120px;">
        <jereh-select v-model="queryParams.deviceBasic.afterSaleAreaList" multiple ph="售后区域" :dict="dict.type.after_sale_area" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="sdServicePool.serviceDirector" style="width: 120px;">
        <jereh-person-select v-model="queryParams.sdServicePool.serviceDirector" ph="交付负责人" @change="handleQuery" :multiple="false" :clearable="true"/>
      </el-form-item>
      <el-form-item prop="serviceCode" style="width: 120px;">
        <jereh-input v-model="queryParams.serviceCode" ph="服务编码" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="deviceBasic.customerName" style="width: 120px;">
        <jereh-input v-model="queryParams.deviceBasic.customerName" ph="客户名称" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <!-- <el-form-item prop="deviceBasic.deliveryLocation" style="width: 120px;">
        <jereh-input v-model="queryParams.deviceBasic.deliveryLocation" ph="交付地点" @keyup.native.enter="handleQuery"/>
      </el-form-item> -->
      <el-form-item prop="sdServicePool.projectItem" style="width: 120px;">
        <jereh-input v-model="queryParams.sdServicePool.projectItem" ph="项目编码分项" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="deviceBasic.productCode" style="width: 120px;">
        <jereh-input v-model="queryParams.deviceBasic.productCode" ph="产品编号" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="deviceBasic.customerName" style="width: 120px;">
        <jereh-input v-model="queryParams.deviceBasic.productName" ph="产品名称" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <!-- <el-form-item prop="sdServicePool.serviceLevel" style="width: 120px;">
        <jereh-select v-model="queryParams.sdServicePool.serviceLevel" ph="服务级别" :dict="dict.type.service_level" @change="handleQuery"/>
      </el-form-item> -->
      <el-form-item prop="deviceBasic.productLine" style="width: 120px;">
        <jereh-input v-model="queryParams.deviceBasic.productLine" ph="产品线" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="acceptanceDate" style="width: 250px;">
        <jereh-date-picker v-model="queryParams.acceptanceDateList"  type="daterange" value-format="yyyy-MM-dd" startPh="验收开始日期" endPh="验收结束日期" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="countDelivery" style="width: 120px;">
        <jereh-select v-model="queryParams.deviceBasic.statisticsFlag" ph="是否统计交付" :dict="dict.type.sys_yes_no" @change="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <jereh-button type="primary" size="mini" @click="handleQuery">过滤</jereh-button>
        <jereh-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</jereh-button>
      </el-form-item>
    </el-form>
    <!--    表格内容-->
    <el-table
      id="dataTable"
      v-loading="loading"
      :data="sdDeviceDeliverList"
      @selection-change="handleSelectionChange"
      border
      :max-height="tableHeight"
      :cell-style="{ 'padding-top': '5px', 'padding-bottom': '5px' }"
      :row-style="isSelected"
    >
      <af-table-column type="selection" align="center" fixed/>
      <af-table-column type="index" label="序号" align="center" prop="id" show-overflow-tooltip width="80" fixed/>
      <af-table-column label="服务状态" align="center" prop="deliveryServiceState" :fixed="$WEB" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="售后区域" align="center" prop="deviceBasic.afterSaleArea" :fixed="$WEB" show-overflow-tooltip width="150"/>
      <af-table-column label="交付负责人" align="center" prop="sdServicePool.serviceDirector" :fixed="$WEB" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="服务编码" align="center" prop="sdServicePool.serviceCode" :fixed="$WEB" show-overflow-tooltip width="150"/>
      <af-table-column label="客户名称" align="center" prop="deviceBasic.customerName" show-overflow-tooltip width="150"/>
      <af-table-column label="交付地点" align="center" prop="deviceBasic.deliveryLocation" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="项目编码分项" align="center" prop="deviceBasic.projectItem" show-overflow-tooltip width="150"/>
      <af-table-column label="产品编号" align="center" prop="deviceBasic.productCode" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="产品名称" align="center" prop="deviceBasic.productName" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="服务级别" align="center" prop="sdServicePool.serviceLevel" show-overflow-tooltip width="150"/>
      <af-table-column label="产品线" align="center" prop="deviceBasic.productLine" show-overflow-tooltip width="150"/>
      <af-table-column label="验收日期" align="center" prop="deviceBasic.deliveryDate" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="协助交付人" align="center" prop="assistDeliveryBy" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="质保终止日期" align="center" prop="deviceBasic.expirationDate" show-overflow-tooltip
                       width="150"
      />
      <af-table-column label="市场负责人" align="center" prop="sdServicePool.maketDirector" show-overflow-tooltip width="150"/>
      <af-table-column label="市场区域" align="center" prop="sdServicePool.deviceArea" show-overflow-tooltip width="150"/>
      <af-table-column label="是否统计交付" align="center" prop="sdServicePool.statisticsFlag" show-overflow-tooltip width="150"/>
      <af-table-column label="操作" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <jereh-button type="text" icon="el-icon-edit" :plain="false" @click="handleDetail(scope.row)">详情
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
          <el-descriptions-item label="累计交付设备数量(台)">{{ dataForm.totalDeliveryNum }}</el-descriptions-item>
          <el-descriptions-item label="年度已交付设备数量(台)">{{ dataForm.yearDeliveryNum }}</el-descriptions-item>
          <el-descriptions-item label="待交付设备数量(台)">{{ dataForm.waitingDeliveryNum }}</el-descriptions-item>
          <el-descriptions-item label="交付中设备数量(台)">{{ dataForm.inDeliveryNum }}</el-descriptions-item>
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
import { listSdDeviceDeliver } from '../../../api/cmms/sdDeviceDeliver'

export default {
  dicts: ['service_type', 'service_level', 'delivery_service_state', 'after_sale_area', 'sys_yes_no'],
  name: 'SdServicePool',
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
      // 服务池表格数据
      sdDeviceDeliverList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deliveryServiceStateList: [],
        acceptanceDateList: [],
        customerName: null,
        projectItem: null,
        serviceLevel: null,
        acceptanceDate: null,
        deviceBasic: {},
        sdServicePool: {},
        exportList: [],
        statisticsFlag: null
      },
      dataForm: {
        totalDeliveryNum: 0,
        yearDeliveryNum: 0,
        waitingDeliveryNum: 0,
        inDeliveryNum: 0
      },
      canExport: false,
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
    this.getPermission()
    this.getList()
  },
  methods: {
    /** 查询服务池列表 */
    getList() {
      this.loading = true
      console.log(this.queryParams)
      listSdDeviceDeliver(this.queryParams).then(response => {
        console.log(response.rows)
        this.sdDeviceDeliverList = response.rows
        this.total = response.total
        this.loading = false
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
      this.queryParams.acceptanceDateList = []
      this.handleQuery()
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
      if (row.sdServicePool) {
        if (row.sdServicePool.serviceState === '待受理' || row.sdServicePool.serviceState === '服务准备') {
          this.$message.warning("目前本服务未到执行环节，请去服务池确认")
        } else {
          this.$router.push({ path: '/cmms/serviceDelivery/deviceDeliveryDetail', query: { id: row.id } })
        }
      } else {
        this.$router.push({ path: '/cmms/serviceDelivery/deviceDeliveryDetail', query: { id: row.id } })
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('cmms/sdDeviceDeliver/export', {
        // exportList: this.queryParams.exportList
        ...this.queryParams
      }, `服务交付_设备交付_${new Date().getTime()}.xlsx`)
    },
    // 权限控制
    getPermission() {
      // 计算权限
      let canExportRoles = [
        'admin',
        'cmms:admin',
        'cmms:serviceManager',
        'cmms:qcengineer',
        'cmms:businesSpecialist'
      ]
      this.canExport = this.checkRole(canExportRoles)
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