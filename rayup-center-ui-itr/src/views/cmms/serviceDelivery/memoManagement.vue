<template>
  <div class="app-container">
    <div class="flex align-center justify-between">
      <el-row :gutter="10" class="mb-1">
        <el-col :span="1.5">
          <jereh-button icon="el-icon-edit" @click="handleSave">保存</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button icon="el-icon-plus" @click="handleAdd" v-hasRole="['cmms:admin', 'cmms:serviceManager','cmms:businesSpecialist']">新增</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button icon="el-icon-download" @click="syncNotes" v-hasRole="['cmms:admin', 'cmms:serviceManager','cmms:businesSpecialist']">同步备忘</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button @click="handleDownloadTemplate" v-hasRole="['cmms:admin', 'cmms:serviceManager','cmms:businesSpecialist']">下载导入模板</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button icon="el-icon-download" @click="handleImport" v-hasRole="['cmms:admin', 'cmms:serviceManager','cmms:businesSpecialist']">导入</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button icon="el-icon-download" @click="handleExport" v-hasRole="['cmms:admin', 'cmms:serviceManager','cmms:businesSpecialist']">导出</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button>视频指导</jereh-button>
        </el-col>
      </el-row>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </div>
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true"  v-show="showSearch" label-width="120px">
      <el-form-item prop="memoTypeList" style="width: 120px;">
        <jereh-select v-model="queryParams.memoTypeList" ph="备忘类型" multiple :dict="dict.type.memo_type" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="memoStateList" style="width: 120px;">
        <jereh-select v-model="queryParams.memoStateList" ph="目前状态" multiple :dict="dict.type.memo_state" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="projectItem" style="width: 120px;">
        <jereh-input v-model="queryParams.projectItem" ph="项目编码分项" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="productName" style="width: 120px;">
        <jereh-input v-model="queryParams.productName" ph="产品名称" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="prodcuctCode" style="width: 120px;">
        <jereh-input v-model="queryParams.productCode" ph="产品编号" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="rdDirector" style="width: 120px;">
        <jereh-person-select v-model="queryParams.rdDirector" ph="研发负责人" :clearable="true" :multiple="false" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="maketDirector" style="width: 120px;">
        <jereh-person-select v-model="queryParams.maketDirector" ph="市场负责人" :clearable="true" :multiple="false" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="afterSaleDirector" style="width: 120px;">
        <jereh-person-select v-model="queryParams.afterSaleDirector" ph="售后区域经理" :clearable="true" :multiple="false" @change="handleQuery"/>
      </el-form-item>
      <el-form-item prop="materialCode" style="width: 120px;">
        <jereh-input v-model="queryParams.materialCode" ph="物料编码" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="materialName" style="width: 120px;">
        <jereh-input v-model="queryParams.materialName" ph="物料名称" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="memoReason" style="width: 120px;">
        <jereh-input v-model="queryParams.memoReason" ph="备忘产生原因" @keyup.native.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="estimateArrivalDate" style="width: 150px;">
        <jereh-date-picker v-model="queryParams.estimateArrivalDate" ph="预计到货日期" value-format="yyyy-MM-dd" @change="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <jereh-button type="primary" size="mini" @click="handleQuery">过滤</jereh-button>
        <jereh-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</jereh-button>
      </el-form-item>
    </el-form>
    <!--    表格内容-->
    <el-table v-loading="loading" :data="memoList" @selection-change="handleSelectionChange" border>
      <af-table-column type="selection" align="center" fixed/>
      <af-table-column type="index" label="序号" align="center" prop="id" show-overflow-tooltip width="80" fixed/>
      <af-table-column label="备忘类型" align="center" prop="memoType" show-overflow-tooltip width="150" fixed/>
      <af-table-column label="目前状态" align="center" prop="memoState" show-overflow-tooltip width="150" fixed/>
      <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip width="150" fixed/>
      <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip width="150" fixed/>
      <af-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip width="150"/>
      <af-table-column label="研发负责人" align="center" prop="rdDirector" show-overflow-tooltip width="150"/>
      <af-table-column label="市场负责人" align="center" prop="maketDirector" show-overflow-tooltip width="150"/>
      <af-table-column label="售后区域经理" align="center" prop="afterSaleDirector" show-overflow-tooltip width="150"/>
      <af-table-column label="物料类别" align="center" prop="materialCategory" show-overflow-tooltip width="150"/>
      <af-table-column label="物料编码" align="center" prop="materialCode" show-overflow-tooltip width="150"/>
      <af-table-column label="物料名称" align="center" prop="materialName" show-overflow-tooltip width="150"/>
      <af-table-column label="其他差异数量" align="center" prop="otherDiffNum" show-overflow-tooltip width="150"/>
      <af-table-column label="备忘数量" align="center" prop="memoNum" show-overflow-tooltip width="150"/>
      <af-table-column label="备忘产生原因" align="center" prop="memoReason" show-overflow-tooltip width="150"/>
      <af-table-column label="责任人" align="center" prop="memoDirector" show-overflow-tooltip width="150"/>
      <af-table-column label="预计到货日期" align="center" prop="estimateArrivalDate" show-overflow-tooltip width="180">
        <template slot-scope="scope">
          <jereh-date-picker v-model="scope.row.estimateArrivalDate" :disabled=" scope.row.memoState === '已关闭' || !scope.row.directorFlag"></jereh-date-picker>
        </template>
      </af-table-column>
      <af-table-column label="发货日期" align="center" prop="shipDate" show-overflow-tooltip width="180">
        <template slot-scope="scope">
          <jereh-date-picker v-model="scope.row.shipDate" :disabled="!scope.row.directorFlag || scope.row.memoState === '已关闭'"></jereh-date-picker>
        </template>
      </af-table-column>
      <af-table-column label="发货方式" align="center" prop="shipType" show-overflow-tooltip width="180">
        <template slot-scope="scope">
          <jereh-input v-model="scope.row.shipType" :disabled="!scope.row.directorFlag || scope.row.memoState === '已关闭'"></jereh-input>
        </template>
      </af-table-column>
      <af-table-column label="接收确认日期" align="center" prop="receiptConfirmDate" show-overflow-tooltip width="180">
        <template slot-scope="scope">
          <jereh-date-picker v-model="scope.row.receiptConfirmDate" :disabled="scope.row.memoState === '已关闭'" ></jereh-date-picker>
        </template>
      </af-table-column>
      <af-table-column label="接收确认人" align="center" prop="receiptConfirmBy" show-overflow-tooltip width="180">
        <template slot-scope="scope">
          <jereh-person-select v-model="scope.row.receiptConfirmBy" :multiple="false" :clearable="true" :disabled="scope.row.memoState === '已关闭'"/>
        </template>
      </af-table-column>
      <af-table-column label="备注" align="center" prop="remark" show-overflow-tooltip width="180">
        <template slot-scope="scope">
          <jereh-input v-model="scope.row.remark" :disabled="!scope.row.remarkFlag || scope.row.memoState === '已关闭'"></jereh-input>
        </template>
      </af-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getList"
    />

    <el-dialog ref="addMemoDialog" :visible.sync="dialogVisible" title="新增备忘" append-to-body
               :close-on-click-modal="false" width="60%">
<!--      <div>-->
<!--        <jereh-button @click="handleSaveMemo">保存</jereh-button>-->
<!--        <jereh-button @click="handleCloseDialog">关闭</jereh-button>-->
<!--      </div>-->


          <el-form :model="addedMemo" size="mini" label-position="right"
                   label-width="100px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="项目编码" prop="projectCode">
                  <jereh-input v-model="addedMemo.projectItem" disabled></jereh-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品名称" prop="productName">
                  <jereh-input v-model="addedMemo.productName" disabled></jereh-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品编号" prop="productCode">
                  <jereh-input v-model="addedMemo.productCode" disabled></jereh-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="研发负责人" prop="rdDirector" >
                  <jereh-input v-model="addedMemo.rdDirector" disabled></jereh-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="市场负责人" prop="maketDirector" >
                  <jereh-input v-model="addedMemo.maketDirector" disabled></jereh-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="售后区域经理" prop="afterSaleDirector" >
                  <jereh-input v-model="addedMemo.afterSaleDirector" disabled></jereh-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备忘类型" prop="materialType" >
                  <jereh-select v-model="addedMemo.memoType" ph="请输入备忘类型"  :dict="dict.type.memo_type" ></jereh-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="物料类别" prop="materialCategory" >
                  <jereh-input v-model="addedMemo.materialCategory" ph="请输入物料类别" clearable ></jereh-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="物料编码" prop="materialCode" >
                  <jereh-input v-model="addedMemo.materialCode" ph="请输入物料编码" clearable ></jereh-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="物料名称" prop="materialName" >
                  <jereh-input v-model="addedMemo.materialName" ph="请输入物料名称" clearable ></jereh-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="其他差异数量" prop="otherDiffNum" >
                  <jereh-input v-model="addedMemo.otherDiffNum" ph="请输入其他差异数量" clearable ></jereh-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备忘数量" prop="memoNum" >
                  <jereh-input v-model="addedMemo.memoNum" ph="请输入备忘数量" clearable ></jereh-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="备忘产生原因" prop="memoReason" >
                  <jereh-input v-model="addedMemo.memoReason" ph="请输入备忘产生原因" clearable ></jereh-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="责任人" prop="memoDirector" >
                  <jereh-person-select v-model="addedMemo.memoDirector" ph="请输入责任人" :multiple="false" clearable ></jereh-person-select>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
      <div slot="footer" class="dialog-footer">
                <jereh-button type="primary" @click="handleSaveMemo">保存</jereh-button>
                <jereh-button type="warning" @click="handleCloseDialog">关闭</jereh-button>
      </div>
    </el-dialog>

    <!--    绑定设备弹窗-->
    <el-dialog title="绑定设备" :visible.sync="openDeviceBinding" width="900px" append-to-body
               :close-on-click-modal="false"
    >
      <el-form class="mt-2 flex justify-between" :model="deviceQueryParams" ref="deviceQueryParams" size="mini"
               :inline="true"
               label-width="120px"
      >
        <el-form-item prop="projectItem" style="width: 180px;">
          <jereh-input
            v-model="deviceQueryParams.projectItem"
            ph="项目编码分项"
            clearable
            @keyup.enter.native="handleDeviceQuery"
          />
        </el-form-item>
        <el-form-item prop="productName" style="width: 180px;">
          <jereh-select
            v-model="deviceQueryParams.productName"
            filterable
            ph="产品名称"
            clearable
            @keyup.enter.native="handleDeviceQuery"
            :dict="dict.type.product_name"
          />
        </el-form-item>
        <el-form-item prop="productCode" style="width: 180px;">
          <jereh-input
            v-model="deviceQueryParams.productCode"
            ph="产品编号"
            clearable
            @keyup.enter.native="handleDeviceQuery"
          />
        </el-form-item>
        <el-form-item>
          <jereh-button type="primary" size="mini" @click="handleDeviceQuery">搜索</jereh-button>
        </el-form-item>
      </el-form>
      <el-table :data="deviceList" border ref="registTable">
        <af-table-column type="index" align="center" width="50"/>
        <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip/>
        <af-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip/>
        <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip/>
        <af-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <jereh-button type="text" :plain="false" icon="el-icon-edit" @click="selectBindDevice(scope.row)">选定
            </jereh-button>
          </template>
        </af-table-column>
      </el-table>
      <Pagination
        v-show="deviceQueryParams.total>0"
        :total="deviceQueryParams.total"
        :page.sync="deviceQueryParams.pageNum"
        :limit.sync="deviceQueryParams.pageSize"
        @pagination="getDeviceList"
      />
    </el-dialog>


    <!--    导入对话框-->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!--        <div class="el-upload__tip" slot="tip">-->
        <!--          <el-checkbox v-model="upload.updateSupport"/>-->
        <!--          是否更新已经存在的设备数据-->
        <!--          <el-link type="info" style="font-size:12px" @click="handleDownloadTemplate">下载模板</el-link>-->
        <!--        </div>-->
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <jereh-button type="primary" @click="submitFileForm">确 定</jereh-button>
        <jereh-button @click="upload.open = false">取 消</jereh-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  addMemoManagement,
  listMemoManagement,
  syncMemo,
  updateMemoManagement
} from '../../../api/cmms/sdMemoManagement'
import { checkPermi } from "@/utils/permission"
import ServicePoolBinding from './components/servicePoolBinding'
import { listDevice, sdDeviceInfoPage, sdDevicePage } from '../../../api/cmms/device'
import { getToken } from '../../../utils/auth'

export default {
  components: { ServicePoolBinding },
  dicts: ['memo_type', 'memo_state','product_name'],
  name: 'memoManagement',
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
      memoList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        memoTypeList: [],
        memoStateList: [],
        projectItem: null,
        productName: null,
        productCode: null,
        rdDirector: null,
        maketDirector: null,
        afterSaleDirector: null,
        materialCode: null,
        materialName: null,
        memoReason: null,
        estimateArrivalDate: null,
        exportList: []
      },
      tableData: [],
      isSD: false,
      dialogVisible: false,
      openDeviceBinding: false,
      addedMemo: {
      },
      deviceQueryParams: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        serviceCode: null,
        projectItem: null,
        productCode: null,
        productName: null,
      },
      deviceList: [],
      upload:
        {
          // 是否显示弹出层
          open: false,
          // 弹出层标题
          title: '',
          // 是否禁用上传
          isUploading: false,
          // 是否更新已经存在的
          updateSupport: 0,
          // 设置上传的请求头部
          headers: { Authorization: 'Bearer ' + getToken() },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + '/cmms/memoManagement/importData'
        },
    }
  },
  created() {
    this.isSD = checkPermi(["cmms:business:sd"])
    this.getList()
  },
  methods: {
    // 同步备忘
    syncNotes() {
      syncMemo().then(res => {
        this.$modal.msgSuccess('同步成功')
        this.getList()
      })
    },
    // 新增
    handleAdd() {
      this.openDeviceBinding = true
      this.handleDeviceQuery()
    },
    // 保存
    handleSave() {

      if (this.tableData.length == 0) {
        this.$modal.msgError("请勾选需要保存的数据。")
        return
      }
      this.loading = true
      updateMemoManagement(this.tableData).then(res => {
        this.$modal.msgSuccess('保存成功')
        this.getList()
      })
    },
    /** 查询列表 */
    getList() {
      this.loading = true
      listMemoManagement(this.queryParams).then(response => {
        this.memoList = response.rows
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
      this.handleQuery()
      this.tableData = []
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log(selection)
      this.tableData = selection

      this.ids = selection.map(item => item.id)
      this.queryParams.exportList = this.ids
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    handleDownloadTemplate(){
      this.download('cmms/memoManagement/downloadMemoTemplate', {}, `备忘管理配件清单导入模板${new Date().getTime()}.xlsx`)
    },
    // 导入
    handleImport() {
      this.upload.title = '备忘管理配件清单导入'
      this.upload.open = true
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true

    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true })
      this.getList()
    },
// 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('cmms/memoManagement/export', {
        ...this.queryParams
      }, `备忘管理_${new Date().getTime()}.xlsx`)
    },

    handleSaveMemo(){
      this.loading = true
      addMemoManagement(this.addedMemo).then(res => {

        this.dialogVisible = false
        this.getList()
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    handleCloseDialog(){
      this.dialogVisible = false
    },
    handleDeviceQuery() {
      this.deviceQueryParams.pageNum = 1
      this.getDeviceList()
    },
    getDeviceList() {
      sdDevicePage(this.deviceQueryParams).then(response => {
        this.deviceQueryParams.total = response.total
        this.deviceList = response.rows
      })
    },
    selectBindDevice(row) {
      this.addedMemo = {}

      this.addedMemo.projectItem = row.projectItem
      this.addedMemo.productName = row.productName
      this.addedMemo.productCode = row.productCode
      this.addedMemo.rdDirector = row.rdDirector
      this.addedMemo.maketDirector = row.maketDirector
      this.addedMemo.afterSaleDirector = row.afterSaleDirector


      this.dialogVisible = true
      this.openDeviceBinding = false
    },


  }
}
</script>
<style scoped>
::v-deep .el-table__cell.is-leaf {
  background-color: #eef1f8 !important;
}
</style>
