<template>
  <div v-loading="loading">
    <div>
      <div>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >
          添加
        </jereh-button>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-check"
          @click="handleSubmit"
        >
          提交
        </jereh-button>
        <el-upload
          ref="upload"
          class="upload"
          accept=".xlsx, .xls"
          :action="upload.url"
          :headers="upload.headers"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
        >
          <jereh-button type="primary" plain icon="el-icon-upload2">导入</jereh-button>
        </el-upload>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-download"
          @click="handleExport"
        >
          导出
        </jereh-button>
        <jereh-button type="primary" plain @click="handleDownload">
          下载模板
        </jereh-button>
      </div>
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        size="mini"
        class="mt-1 mb-1 flex justify-between"
      >
        <div>
          <el-form-item prop="serviceEngineer">
            <jereh-person-select
              v-model="queryParams.serviceEngineer"
              filterable
              clearable
              :multiple="false"
              ph="请选择服务工程师"
              @change="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="workDate">
            <jereh-date-picker
              v-model="queryParams.workDate"
              type="date"
              valueFormat="yyyy-MM-dd"
              ph="请选择日期"
              :needPickerOptions="false"
              @change="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="processLink">
            <jereh-select
              v-model="queryParams.processLink"
              filterable
              clearable
              :dict="stageList"
              labelName="dictLabel"
              valueName="dictValue"
              ph="请选择执行环节"
              @change="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <jereh-button type="primary" @click="handleQuery">
              过滤
            </jereh-button>
            <jereh-button
              type="primary"
              icon="el-icon-refresh"
              @click="resetQuery"
            >
              重置
            </jereh-button>
          </el-form-item>
        </div>
        <div>
          <el-form-item prop="projectTotalHour" label="项目服务总工时">
            <jereh-input v-model="projectTotalHour" ph="" disabled />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div>
      <el-form :model="dataForm" :rules="rules" ref="tableForm">
        <el-table :data="dataForm.list" border fit>
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="服务工程师"
            prop="serviceEngineer"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'list.' + scope.$index + '.serviceEngineer'"
                :rules="rules.serviceEngineer"
              >
                <jereh-person-select
                  v-model="scope.row.serviceEngineer"
                  :multiple="false"
                  :disabled="overdue(scope.row)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="日期"
            prop="workDate"
            align="center"
            width="160"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'list.' + scope.$index + '.workDate'"
                :rules="rules.workDate"
              >
                <el-date-picker
                  v-model="scope.row.workDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  :disabled="overdue(scope.row)"
                ></el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="服务类型"
            prop="serviceType"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="项目编码分项"
            prop="projectItem"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            :label="serviceType !== '培训服务' ? '服务编码' : '培训编码'"
            prop="serviceCode"
            align="center"
            width="160"
          >
          </el-table-column>
          <el-table-column
            label="执行环节"
            prop="processLink"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'list.' + scope.$index + '.processLink'"
                :rules="rules.processLink"
              >
                <jereh-select
                  v-model="scope.row.processLink"
                  :dict="stageList"
                  labelName="dictLabel"
                  valueName="dictValue"
                  :disabled="overdue(scope.row)"
                >
                </jereh-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="服务工时"
            prop="serviceManHour"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'list.' + scope.$index + '.serviceManHour'"
                :rules="rules.serviceManHour"
              >
                <el-input-number
                  v-model="scope.row.serviceManHour"
                  controls-position="right"
                  :min="0"
                  :max="18"
                  :precision="1"
                  :step="1"
                  :controls="false"
                  @change="getTotalHour(scope.row)"
                  :disabled="overdue(scope.row)"
                >
                </el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="辅助工时类型"
            prop="assistType"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'list.' + scope.$index + '.assistType'"
                :rules="rules.assistType"
              >
                <jereh-select
                  v-model="scope.row.assistType"
                  :dict="dict.type.itr_assit_classify"
                  :disabled="overdue(scope.row)"
                >
                </jereh-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="辅助工时"
            prop="assistManHour"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'list.' + scope.$index + '.assistManHour'"
                :rules="rules.assistManHour"
              >
                <el-input-number
                  v-model="scope.row.assistManHour"
                  :min="0"
                  :max="18"
                  :precision="1"
                  :step="1"
                  :controls="false"
                  @change="getTotalHour(scope.row)"
                  :disabled="overdue(scope.row)"
                >
                </el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="当日工作概述内容"
            prop="workContent"
            align="center"
            width="400"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'list.' + scope.$index + '.workContent'"
                :rules="rules.workContent"
              >
                <jereh-input
                  v-model="scope.row.workContent"
                  type="textarea"
                  :rows="2"
                  ph="请输入当日工作概述内容"
                  :disabled="overdue(scope.row)"
                >
                </jereh-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="服务总工时"
            prop="totalManHour"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            prop="id"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <jereh-button size="mini" type="text" @click="handleDel(scope.row, scope.$index)">
                删除
              </jereh-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div class="justify-end">
        <Pagination
          v-show="dataForm.total > 0"
          :total="dataForm.total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="handleQuery"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { listManHour, addManHour, delManHour } from "@/api/cmms/serviceDelivery.js";
import { getToken } from "@/utils/auth";

export default {
  name: "ManHoursRecord",
  dicts: ["itr_assit_classify"],
  props: {
    serviceType: {
      type: String,
      required: true,
    },
    projectItem: {
      type: String,
      default: "",
    },
    serviceCode: {
      type: String,
      default: "",
    },
    detailData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      loading: false,
      queryParams: {
        serviceEngineer: "",
        workDate: "",
        processLink: "",
        serviceCode: this.serviceCode,
        pageNum: 1,
        pageSize: 10,
      },
      projectTotalHour: 0,
      stageList: [],
      dataForm: {
        total: 0,
        list: []
      },
      rules: {
        serviceEngineer: [
          { required: true, message: '请选择服务工程师', trigger: 'change'}
        ],
        workDate: [
          { required: true, message: '请选择日期', trigger: 'blur'}
        ],
        processLink: [
          { required: true, message: '请选择执行环节', trigger: 'change'}
        ],
        serviceManHour: [
          { required: true, message: '请输入服务工时', trigger: 'blur'}
        ],
        workContent: [
          { required: true, message: '请输入当日工作概述内容', trigger: 'blur'}
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < Date.now() - 7 * 24 * 3600 * 1000
          );
        },
      },
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/cmms/manHour/importTemplate",
      }
    };
  },
  created() {
    this.getStageList();
  },
  methods: {
    overdue(row) {
      if (row.id) {
        const rowDate = new Date(row.workDate).getTime();
        const nowDate = new Date().getTime();
        if (rowDate < (nowDate - 7 * 24 * 3600 * 1000)) {
          return true;
        } else {
          return false;
        }
      }
    },
    getStageList() {
      let dictType = "";
      switch (this.serviceType) {
        case "设备交付":
          dictType = "device_delivery_excute_stage";
          break;
        case "框架协议":
          dictType = "framework_excute_stage";
          break;
        case "培训服务":
          dictType = "training_service_excute_stage";
          break;
      }
      this.loading = true;
      this.getDicts(dictType)
        .then((res) => {
          this.stageList = res.data;
          this.handleQuery();
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
    getTotalHour(row) {
      const totalManHour =
        (row.serviceManHour ? parseFloat(row.serviceManHour) : 0) +
        (row.assistManHour ? parseFloat(row.assistManHour) : 0);
      this.$set(row, "totalManHour", totalManHour);
    },
    getProjectTotalHour() {
      let totalManHour = 0;
      if (this.dataForm.list.length) {
        this.dataForm.list.forEach((item) => {
          totalManHour += item.totalManHour || 0;
        });
      }
      this.$set(this, "projectTotalHour", totalManHour);
    },
    handleQuery() {
      this.loading = true;
      listManHour(this.queryParams)
        .then((res) => {
          this.loading = false;
          this.dataForm.total = res.total;
          this.dataForm.list = res.rows;
          this.getProjectTotalHour();
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
    resetQuery() {
      this.queryParams = {
        serviceEngineer: "",
        workDate: "",
        processLink: "",
        serviceCode: this.serviceCode,
        pageNum: 1,
        pageSize: 10
      };
      this.handleQuery();
    },
    handleAdd() {
      const item = {
        id: "",
        serviceEngineer: "",
        workDate: "",
        serviceType: this.serviceType,
        projectItem: this.projectItem,
        serviceCode: this.serviceCode,
        processLink: "",
        serviceManHour: 0,
        assistType: "",
        assistManHour: 0,
        workContent: "",
        totalManHour: 0
      };
      this.dataForm.list.push(item);
    },
    handleDel(row, index) {
      if (row.id) {
        this.loading = true;
        delManHour(row.id)
          .then((res) => {
            this.loading = false;
            this.$modal.msgSuccess("删除成功！");
            this.handleQuery();
          })
          .catch((e) => {
            this.loading = false;
            console.log(e);
          });
      } else {
        this.dataForm.list.splice(index, 1);
      }
    },
    handleUploadSuccess(response, file, fileList) {
      console.log(111)
      this.$modal.msgSuccess("导入成功");
      this.$refs.upload.clearFiles();
      this.handleQuery();
    },
    handleExport() {
      const exportParams = {
        serviceCode: this.serviceCode
      };
      this.download(
        "cmms/manHour/export",
        exportParams,
        `工时记录.xlsx`
      );
    },
    handleDownload() {
      const downloadParams = {
        serviceCode: this.serviceCode
      };
      this.download(
        "cmms/manHour/downloadTemplate",
        downloadParams,
        `工时记录模板.xlsx`
      );
    },
    handleSubmit() {
      this.$refs.tableForm.validate((valid) => {
        if (valid) {
          if (this.dataForm.list.length) {
            const index = this.dataForm.list.findIndex(item => item.totalManHour > 18)
            if (index !== -1) {
              this.$message.error("【日期】工时统计异常，请进行修正。")
              return
            }
          }
          this.handleSave()
        }
      })
    },
    handleSave() {
      this.$confirm('请确认工时录入信息正确无误！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        addManHour(this.dataForm.list).then(res => {
          this.loading = false;
          this.$modal.msgSuccess("保存成功！");
          this.handleQuery();
        }).catch(e => {
          this.loading = false;
          console.log(e);
        })
      })
    }
  },
};
</script>
<style scoped>
::v-deep .el-form-item {
  margin-bottom: 0px !important;
}
.upload {
  display: inline-block;
  margin: 0px 10px;
}
</style>