<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb-3">
      <el-col :span="1.5">
        <jereh-button @click="handleAdd">上传</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>视频指导</jereh-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch"
             label-width="120px"
    >
      <el-form-item prop="serviceCode" style="width: 150px;">
        <jereh-input v-model="queryParams.serviceCode" ph="请输入查询编号" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="fileCategoryList" style="width: 150px;">
        <jereh-select v-model="queryParams.fileCategoryList" ph="请选择文件大类" @enter="handleQuery"
                      :dict="dict.type.file_category" multiple
        />
      </el-form-item>
      <el-form-item prop="fileSubclassList" style="width: 150px;">
        <jereh-select v-model="queryParams.fileSubclassList" ph="请选择文件小类" @enter="handleQuery"
                      :dict="dict.type.file_subclass" multiple
        />
      </el-form-item>
      <el-form-item prop="fileName" style="width: 150px;">
        <jereh-input v-model="queryParams.fileName" ph="请输入文件名称" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="projectItem" style="width: 150px;">
        <jereh-input v-model="queryParams.projectItem" ph="请输入项目编码分项" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="productCode" style="width: 150px;">
        <jereh-input v-model="queryParams.productCode" ph="请输入产品编号" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="licensePlateCode" style="width: 150px;">
        <jereh-input v-model="queryParams.licensePlateCode" ph="请输入车牌号" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="productName" style="width: 150px;">
        <jereh-input v-model="queryParams.productName" ph="请输入产品名称" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="serviceDirector" style="width: 150px;">
        <jereh-input v-model="queryParams.serviceDirector" ph="请输入服务负责人" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="feedbackPerson" style="width: 150px;">
        <jereh-input v-model="queryParams.feedbackPerson" ph="请输入问题反馈人" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="problemHandler" style="width: 150px;">
        <jereh-input v-model="queryParams.problemHandler" ph="请输入问题处理人" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="createBy" style="width: 150px;">
        <jereh-input v-model="queryParams.createBy" ph="请输入上传者" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="createTimeList" style="width: 250px;">
        <jereh-date-picker v-model="queryParams.createTimeList" type="daterange" valueFormat="yyyy-MM-dd"
                           ph="请选择创建时间"
        />
      </el-form-item>
      <el-form-item>
        <jereh-button icon="el-icon-search" @click="handleQuery">过滤</jereh-button>
        <jereh-button icon="el-icon-refresh" @click="resetQuery">重置</jereh-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="managementList" @selection-change="handleSelectionChange" border>
      <af-table-column type="selection" align="center" fixed/>
      <af-table-column type="index" label="序号" align="center" prop="id" show-overflow-tooltip width="80" fixed/>
      <af-table-column label="查询编号" align="center" prop="serviceCode" show-overflow-tooltip width="150"/>
      <af-table-column label="文件大类" align="center" prop="fileCategory" show-overflow-tooltip width="150"/>
      <af-table-column label="文件小类" align="center" prop="fileSubclass" show-overflow-tooltip width="150"/>
      <af-table-column label="文件名称" align="center" prop="fileName" show-overflow-tooltip width="180"/>
      <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip width="150"/>
      <af-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip width="150"/>
      <af-table-column label="车牌号" align="center" prop="licensePlateCode" show-overflow-tooltip width="150"/>
      <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip width="150"/>
      <af-table-column label="服务负责人" align="center" prop="serviceDirector" show-overflow-tooltip width="150"/>
      <af-table-column label="问题反馈人" align="center" prop="feedbackPerson" show-overflow-tooltip width="150"/>
      <af-table-column label="问题处理人" align="center" prop="problemHandler" show-overflow-tooltip width="150"/>
      <af-table-column label="上传者" align="center" prop="createBy" show-overflow-tooltip width="150"/>
      <af-table-column label="上传时间" align="center" prop="createTime" show-overflow-tooltip width="150"/>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="150">
        <template slot-scope="scope">
          <jereh-button type="text" :plain="false" icon="el-icon-edit" @click="handleDownload(scope.row)"
          >下载
          </jereh-button>
          <jereh-button type="text" :plain="false" icon="el-icon-delete" @click="handlePreview(scope.row)"
          >预览
          </jereh-button>
        </template>
      </af-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getList"
    />

    <!-- 添加或修改文档管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body :close-on-click-modal="false">
      <div>
<!--        <jereh-button @click="saveForm">保存</jereh-button>-->
        <jereh-button @click="submitForm">提交</jereh-button>
        <jereh-button>视频指导</jereh-button>
        <jereh-button @click="openServicePoolBinding">服务信息绑定</jereh-button>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="mt-3">
        <div class="flex flex-wrap">
          <el-form-item label="文件大类" prop="fileCategory" style="width: 30%">
            <jereh-select v-model="form.fileCategory" ph="请选择文件大类"
                          :dict="dict.type.file_category_create"
            />
          </el-form-item>
          <el-form-item label="文件小类" prop="fileSubclass" style="width: 30%">
            <jereh-select v-model="form.fileSubclass" ph="请选择文件小类"
                          :dict="dict.type.file_subclass_create"
            />
          </el-form-item>
          <el-form-item label="服务编码" prop="serviceCode" style="width: 30%">
            <jereh-input v-model="form.serviceCode" ph="请输入服务编码" disabled/>
          </el-form-item>
          <el-form-item label="附件" prop="enclosure" style="width: 90%">
            <file-upload v-model="form.enclosure" :limit="1" :fileSize="100"
                         :fileType="['doc', 'xls', 'ppt', 'txt', 'pdf','jpg','png','jpeg']"
            />
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <!-- 文件预览弹窗 -->
    <el-dialog :visible.sync="preview" width="80%" append-to-body :close-on-click-modal="false">
      <iframe :src="fileViewUrl + previewUrl" frameborder="0" width="100%" height="700"
      ></iframe>
    </el-dialog>
    <servicePoolBinding ref="servicePoolBinding" @confirm="confirmServicePoolBinding" :single="true"
    ></servicePoolBinding>
  </div>
</template>

<script>

import { delManagement, getManagement, listManagement, saveManagement } from '../../../api/cmms/documentManagement'
import servicePoolBinding from '../serviceDelivery/components/servicePoolBinding'
import { Base64 } from 'js-base64'

export default {
  dicts: ['file_category', 'file_subclass', 'file_category_create', 'file_subclass_create'],
  name: 'Management',
  components: {
    servicePoolBinding
  },
  data() {
    return {
      fileViewUrl: process.env.VUE_APP_FILE_VIEW,
      preview: false,
      previewUrl: '',
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
      // 文档管理表格数据
      managementList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        serviceCode: null,
        fileCategory: null,
        fileSubclass: null,
        fileName: null,
        projectItem: null,
        productCode: null,
        licensePlateCode: null,
        productName: null,
        serviceDirector: null,
        feedbackPerson: null,
        problemHandler: null,
        enclosure: null,
        fileSize: null,
        createTime: null,
        createBy: null,
        fileCategoryList: [],
        fileSubclassList: [],
        createTimeList: []
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fileCategory: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        fileSubclass: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        serviceCode: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        enclosure: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 下载
    handleDownload(row){
      window.open(row.enclosure)
    },
    // 预览
    handlePreview(row){
      this.previewUrl = encodeURIComponent(Base64.encode(row.enclosure))
      this.preview = true
    },
    openServicePoolBinding() {
      this.$refs.servicePoolBinding.openDialog()
    },
    // 服务信息绑定
    confirmServicePoolBinding(data) {
      this.form.serviceCode = data
    },
    /** 查询文档管理列表 */
    getList() {
      this.loading = true
      listManagement(this.queryParams).then(response => {
        this.managementList = response.rows
        this.total = response.total
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
        serviceCode: null,
        fileCategory: null,
        fileSubclass: null,
        fileName: null,
        projectItem: null,
        productCode: null,
        licensePlateCode: null,
        productName: null,
        serviceDirector: null,
        feedbackPerson: null,
        problemHandler: null,
        enclosure: null,
        fileSize: null,
        createTime: null,
        updateTime: null,
        delflag: null,
        createBy: null,
        updateBy: null,
        remark: null
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '文件上传'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getManagement(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '文件上传'
      })
    },
    // 保存
    saveForm() {
      saveManagement(this.form).then(response => {
        this.$modal.msgSuccess('保存成功')
        this.open = false
        this.getList()
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            saveManagement(this.form).then(response => {
              this.$modal.msgSuccess('提交成功')
              this.open = false
              this.getList()
            })
          } else {
            saveManagement(this.form).then(response => {
              this.$modal.msgSuccess('提交成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除文档管理编号为"' + ids + '"的数据项？').then(function() {
        return delManagement(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('cmms/management/export', {
        ...this.queryParams
      }, `management_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
