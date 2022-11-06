<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb-3">
      <el-col :span="1.5">
        <jereh-button @click="handleAdd">上传</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>资料列表导出</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>下载记录导出</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>视频指导</jereh-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch"
             label-width="120px"
    >
      <el-form-item prop="fileTypeList" style="width: 150px;">
        <jereh-select v-model="queryParams.fileTypeList" ph="请选择文件类型" :dict="dict.type.file_type"
                      @enter="handleQuery" multiple
        />
      </el-form-item>
      <el-form-item prop="fileName" style="width: 150px;">
        <jereh-input v-model="queryParams.fileName" ph="请输入文件名称" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="deviceTypeList" style="width: 150px;">
        <jereh-select v-model="queryParams.deviceTypeList" ph="请选择设备分类" :dict="dict.type.document_device_type"
                      @enter="handleQuery" multiple
        />
      </el-form-item>
      <el-form-item prop="system" style="width: 150px;">
        <jereh-input v-model="queryParams.system" ph="请输入总成/系统" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="componentName" style="width: 150px;">
        <jereh-input v-model="queryParams.componentName" ph="请输入部件名称" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="manufactorBrand" style="width: 150px;">
        <jereh-input v-model="queryParams.manufactorBrand" ph="请输入厂家品牌" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="author" style="width: 150px;">
        <jereh-input v-model="queryParams.author" ph="请输入作者" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="createBy" style="width: 150px;">
        <jereh-input v-model="queryParams.createBy" ph="请输入上传人" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="fileNo" style="width: 150px;">
        <jereh-input v-model="queryParams.fileNo" ph="请输入文件编号" @enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="fileStatus" style="width: 150px;">
        <jereh-select v-model="queryParams.fileStatus" ph="请选择状态" :dict="dict.type.file_status"
                      @enter="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="createTimeList" style="width: 250px;">
        <jereh-date-picker v-model="queryParams.createTimeList" ph="请选择上传日期" @enter="handleQuery"
                           type="daterange" valueFormat="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <jereh-button icon="el-icon-search" @click="handleQuery">过滤</jereh-button>
        <jereh-button icon="el-icon-refresh" @click="resetQuery">重置</jereh-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="documentList" @selection-change="handleSelectionChange" border>
      <af-table-column type="selection" align="center" fixed/>
      <af-table-column type="index" label="序号" align="center" prop="id" show-overflow-tooltip width="80" fixed/>
      <af-table-column label="文件类型" align="center" prop="fileType" show-overflow-tooltip width="180"/>
      <af-table-column label="文件名称" align="center" prop="fileName" show-overflow-tooltip width="180"/>
      <af-table-column label="设备分类" align="center" prop="deviceType" show-overflow-tooltip width="180"/>
      <af-table-column label="总成/系统" align="center" prop="assemblySystem" show-overflow-tooltip width="180"/>
      <af-table-column label="部件名称" align="center" prop="componentName" show-overflow-tooltip width="180"/>
      <af-table-column label="厂家品牌" align="center" prop="manufactorBrand" show-overflow-tooltip width="180"/>
      <af-table-column label="作者" align="center" prop="author" show-overflow-tooltip width="180"/>
      <af-table-column label="上传日期" align="center" prop="createTime" show-overflow-tooltip width="180"/>
      <af-table-column label="上传人" align="center" prop="createBy" show-overflow-tooltip width="180"/>
      <af-table-column label="文件编号" align="center" prop="fileNo" show-overflow-tooltip width="180"/>
      <af-table-column label="版本号" align="center" prop="version" show-overflow-tooltip width="180"/>
      <af-table-column label="状态" align="center" prop="fileStatus" show-overflow-tooltip width="180">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.file_status" :value="scope.row.fileStatus"/>
        </template>
      </af-table-column>
      <af-table-column label="下载次数" align="center" prop="downloadCount" show-overflow-tooltip width="180"/>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="150">
        <template slot-scope="scope">
          <div>
            <jereh-button type="text" :plain="false" icon="el-icon-delete" @click="handleDownload(scope.row)"
                          :disabled="scope.row.fileStatus === 0"
            >下载
            </jereh-button>
            <jereh-button type="text" :plain="false" icon="el-icon-delete" @click="handlePreview(scope.row)"
                          :disabled="scope.row.fileStatus === 0"
            >预览
            </jereh-button>
          </div>
          <div>
            <jereh-button type="text" :plain="false" icon="el-icon-delete" @click="handleDelete(scope.row)"
            >{{ scope.row.fileStatus === 0 ? '启用' : '停用' }}
            </jereh-button>
            <jereh-button type="text" :plain="false" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                          :disabled="scope.row.fileStatus === 0"
            >更新
            </jereh-button>
          </div>
        </template>
      </af-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getList"
    />

    <!-- 添加或修改document对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body :close-on-click-modal="false">
      <div>
<!--        <jereh-button @click="saveForm">保存</jereh-button>-->
        <jereh-button @click="submitForm">提交</jereh-button>
        <jereh-button>视频指导</jereh-button>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="mt-3">
        <div class="flex flex-wrap">
          <el-form-item label="文件类型" prop="fileType" style="width: 30%;">
            <jereh-select v-model="form.fileType" :dict="dict.type.file_type"/>
          </el-form-item>
          <el-form-item label="文件编号" prop="fileNo" style="width: 30%;">
            <jereh-input v-model="form.fileNo" ph="请输入文件编号"/>
          </el-form-item>
          <el-form-item label="版本号" prop="version" style="width: 30%;">
            <jereh-input v-model="form.version" ph="请输入版本号"/>
          </el-form-item>
          <el-form-item label="作者" prop="author" style="width: 30%;">
            <jereh-input v-model="form.author" ph="请输入作者"/>
          </el-form-item>
          <el-form-item label="设备分类" prop="deviceType" style="width: 30%;">
            <jereh-select v-model="form.deviceType" :dict="dict.type.document_device_type"/>
          </el-form-item>
          <el-form-item label="总成/系统" prop="assemblySystem" style="width: 30%;">
            <jereh-input v-model="form.assemblySystem" ph="请输入总成/系统"/>
          </el-form-item>
          <el-form-item label="部件名称" prop="componentName" style="width: 30%;">
            <jereh-input v-model="form.componentName" ph="请输入部件名称"/>
          </el-form-item>
          <el-form-item label="厂家品牌" prop="manufactorBrand" style="width: 60%;">
            <jereh-input v-model="form.manufactorBrand" ph="请输入厂家品牌"/>
          </el-form-item>
          <el-form-item label="附件" prop="enclosure" style="width: 90%;">
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
  </div>
</template>

<script>
import { getDocument, listDocument, saveDocument } from '../../../api/cmms/technicalInformation'
import { Base64 } from 'js-base64'

export default {
  dicts: ['file_type', 'document_device_type', 'file_status'],
  name: 'Document',
  data() {
    return {
      fileViewUrl: process.env.VUE_APP_FILE_VIEW,
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
      // document表格数据
      documentList: [],
      // 弹出层标题
      title: '',
      preview: false,
      previewUrl: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fileType: null,
        fileNo: null,
        version: null,
        author: null,
        deviceType: null,
        system: null,
        componentName: null,
        manufactorBrand: null,
        enclosure: null,
        fileTypeList: [],
        deviceTypeList: [],
        createTimeList: []
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fileType: [
          { required: true, message: '文件类型不能为空', trigger: 'change' }
        ],
        fileNo: [
          { required: true, message: '文件编号不能为空', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '版本号不能为空', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '设备分类不能为空', trigger: 'change' }
        ],
        system: [
          { required: true, message: '总成/系统不能为空', trigger: 'blur' }
        ],
        componentName: [
          { required: true, message: '部件名称不能为空', trigger: 'blur' }
        ],
        manufactorBrand: [
          { required: true, message: '厂家品牌不能为空', trigger: 'blur' }
        ],
        enclosure: [
          { required: true, message: '附件不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询document列表 */
    getList() {
      console.log(this.queryParams)
      this.loading = true
      listDocument(this.queryParams).then(response => {
        this.documentList = response.rows
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
        fileType: null,
        fileNo: null,
        version: null,
        author: null,
        deviceType: null,
        system: null,
        componentName: null,
        manufactorBrand: null,
        enclosure: null,
        fileStatus: 0,
        downloadCount: null,
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
      this.title = '资料上传'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getDocument(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '资料更新'
      })
    },
    // 保存
    saveForm() {
      saveDocument(this.form).then(response => {
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
            saveDocument(this.form).then(response => {
              this.$modal.msgSuccess('提交成功')
              this.open = false
              this.getList()
            })
          } else {
            saveDocument(this.form).then(response => {
              this.$modal.msgSuccess('提交成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    // 预览
    handlePreview(row) {
      console.log(row)
      this.previewUrl = encodeURIComponent(Base64.encode(row.enclosure))
      this.preview = true
    },
    // 下载
    handleDownload(row) {
      window.open(row.enclosure)
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认' + (row.fileStatus === 0 ? '启用' : '停用') + '文件名称为"' + row.fileName + '"的数据项？').then(function() {
        row.fileStatus === 0 ? row.fileStatus = 1 : row.fileStatus = 0
        return saveDocument(row)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess(row.fileStatus === 1 ? '已启用' : '已停用')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('cmms/document/export', {
        ...this.queryParams
      }, `document_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
