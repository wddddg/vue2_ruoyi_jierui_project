<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb-3">
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['app:update:add']"
        >
          新增
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['app:update:edit']"
        >
          修改
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['app:update:remove']"
        >
          删除
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['app:update:export']"
        >
          导出
        </jereh-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="mini"
      :inline="true"
      v-show="showSearch"
      label-width="120px"
    >
      <el-form-item prop="version" style="width: 150px;">
        <jereh-input
          v-model="queryParams.version"
          ph="请输入版本号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="url" style="width: 150px;">
        <jereh-input
          v-model="queryParams.url"
          ph="请输入下载地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="updateType" style="width: 150px;">
        <jereh-select
          v-model="queryParams.updateType"
          ph="请选择更新类型"
          clearable
          :dict="dict.type.app_update_type"
        />
      </el-form-item>
      <el-form-item prop="status" style="width: 150px;">
        <jereh-select
          v-model="queryParams.status"
          ph="请选择是否启用"
          clearable
          :dict="dict.type.number_yes_no"
        />
      </el-form-item>
      <el-form-item>
        <jereh-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">过滤</jereh-button>
        <jereh-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</jereh-button>
      </el-form-item>
      <div style="float: right">
        <el-form-item prop="searchValue" style="width: 120px;">
          <jereh-input
            v-model="queryParams.searchValue"
            ph="模糊搜索"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <jereh-button type="primary" size="mini" @click="handleQuery">搜索</jereh-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table v-loading="loading" :data="updateList" @selection-change="handleSelectionChange" border>
      <af-table-column type="selection" align="center" fixed/>
      <af-table-column label="版本号" align="center" prop="version" show-overflow-tooltip/>
      <af-table-column label="下载地址" align="center" prop="url" show-overflow-tooltip/>
      <af-table-column label="更新类型" align="center" prop="updateType" show-overflow-tooltip>
        <template slot-scope="scope">
          <dict-tag :options="dict.type.app_update_type" :value="scope.row.updateType"/>
        </template>
      </af-table-column>
      <af-table-column label="描述" align="center" prop="description" show-overflow-tooltip/>
      <af-table-column label="是否启用" align="center" prop="status" show-overflow-tooltip>
        <template slot-scope="scope">
          <dict-tag :options="dict.type.number_yes_no" :value="scope.row.status"/>
        </template>
      </af-table-column>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="150">
        <template slot-scope="scope">
          <jereh-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['app:update:edit']"
          >
            修改
          </jereh-button>
          <jereh-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['app:update:remove']"
          >
            删除
          </jereh-button>
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

    <!-- 添加或修改手持端更新对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-form-item label="版本号" prop="version">
          <jereh-input v-model="form.version" ph="请输入版本号"/>
        </el-form-item>
        <el-form-item label="下载地址" prop="url">
          <file-upload v-model="form.url" :fileType="['apk']" :fileSize="200" :limit="1"></file-upload>
        </el-form-item>
        <el-form-item label="更新类型" prop="updateType">
          <jereh-select
            v-model="form.updateType"
            ph="请选择更新类型"
            :dict="dict.type.app_update_type"
          />
          <!-- <el-select >
            <el-option
              v-for="dict in "
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            />
          </el-select> -->
        </el-form-item>
        <el-form-item label="描述">
          <editor v-model="form.description" :min-height="192"/>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.number_yes_no"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
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
import { getUpdate, listUpdate } from '@/api/cmms/appUpdate'
import { addUpdate, delUpdate, updateUpdate } from '../../../api/cmms/appUpdate'

export default {
  name: 'Update',
  dicts: ['app_update_type', 'number_yes_no'],
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
      // 手持端更新表格数据
      updateList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        version: null,
        url: null,
        updateType: null,
        description: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        version: [
          { required: true, message: '版本号不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '下载地址不能为空', trigger: 'blur' }
        ],
        updateType: [
          { required: true, message: '更新类型不能为空', trigger: 'change' }
        ],
        description: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '是否启用不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询手持端更新列表 */
    getList() {
      this.loading = true
      listUpdate(this.queryParams).then(response => {
        this.updateList = response.rows
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
      this.title = '添加手持端更新'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getUpdate(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改手持端更新'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUpdate(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addUpdate(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
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
      this.$modal.confirm('是否确认删除手持端更新编号为"' + ids + '"的数据项？').then(function() {
        return delUpdate(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('app/update/export', {
        ...this.queryParams
      }, `update_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
