<template>
  <div>
    <div class="flex justify-between">
      <span class="header">区域经理审核记录</span>
      <div>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
          :disabled="!canEdit"
        >
          添加
        </jereh-button>
      </div>
    </div>
    <el-form :model="dataForm" :rules="rules" ref="dataForm" label-position="left">
      <el-table :data="dataForm.recordList" border fit>
        <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="stage" :label="serviceName" align="center" width="150">
          <template slot-scope="scope">
            <el-form-item
              :prop="'recordList.' + scope.$index + '.stage'"
              :rules="rules.stage"
            >
              <jereh-select
                v-model="scope.row.stage"
                :dict="stageList"
                labelName="dictLabel"
                valueName="dictValue"
                :disabled="!canEdit"
              >
              </jereh-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="problem" label="异常问题" align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="'recordList.' + scope.$index + '.problem'"
              :rules="rules.problem"
            >
              <jereh-input
                v-model="scope.row.problem"
                type="textarea"
                :disabled="!canEdit"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="correct" label="是否整改" align="center" width="120">
          <template slot-scope="scope">
            <el-form-item
              :prop="'recordList.' + scope.$index + '.correct'"
              :rules="rules.correct"
            >
              <jereh-select
                v-model="scope.row.correct"
                :dict="dict.type.sys_yes_no"
                :disabled="!canEdit"
              >
              </jereh-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="confirmDate" label="确认日期" align="center" width="160">
          <template slot-scope="scope">
            <el-form-item
              :prop="'recordList.' + scope.$index + '.confirmDate'"
              :rules="rules.confirmDate"
            >
              <el-date-picker
                v-model="scope.row.confirmDate"
                type="date"
                value-format="yyyy-MM-dd"
                :disabled="!canEdit"
              ></el-date-picker>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="stage" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <jereh-button size="mini" type="text" @click="handleDel(scope.$index)" :disabled="!canEdit">
              删除
            </jereh-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-2">
        <el-form-item prop="judgment" label="培训总体评价" label-width="120px">
          <el-radio-group v-model="dataForm.judgment" :disabled="!canEdit">
            <el-radio label="优秀"></el-radio>
            <el-radio label="良好"></el-radio>
            <el-radio label="合格"></el-radio>
            <el-radio label="不合格"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="merits" label="亮点说明" label-width="120px">
          <jereh-input
            v-model="dataForm.merits"
            type="textarea"
            :disabled="!canEdit"
          />
        </el-form-item>
        <el-form-item prop="demerits" label="不足说明" label-width="120px">
          <jereh-input
            v-model="dataForm.demerits"
            type="textarea"
            :disabled="!canEdit"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "LastStage",
  dicts: ["sys_yes_no"],
  props: {
    serviceType: {
      type: String,
      required: true
    },
    auditRecord: {
      type: Object,
      required: true
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dataForm: {
        recordList: [],
        judgment: "",
        merits: "",
        demerits: ""
      },
      rules: {
        stage: [
          { required: true, message: '请选择整改环节', trigger: 'change'}
        ],
        problem: [
          { required: true, message: '请输入异常问题', trigger: 'trigger'}
        ],
        correct: [
          { required: true, message: '请确认整改是否完成', trigger: 'change'}
        ],
        confirmDate: [
          { required: true, message: '请选择确认日期', trigger: 'change'}
        ],
        judgment: [
          { required: true, message: '请选择交付总体评价', trigger: 'change'}
        ],
        merits: [
          { required: true, message: '请输入亮点说明', trigger: 'trigger'}
        ],
        demerits: [
          { required: true, message: '请输入不足说明', trigger: 'trigger'}
        ],
      },
      serviceName: "",
      stageList: []
    }
  },
  created() {
    if (Object.keys(this.auditRecord).length !== 0) {
      this.dataForm = this.auditRecord
    }
    this.getServiceName()
  },
  methods: {
    getServiceName() {
      let dictType = "";
      switch (this.serviceType) {
        case "设备交付":
          this.serviceName = "交付环节";
          dictType = "device_delivery_excute_stage";
          break;
        case "框架协议":
          this.serviceName = "执行环节";
          dictType = "framework_excute_stage";
          break;
        case "培训服务":
          this.serviceName = "培训环节";
          dictType = "training_service_excute_stage";
          break;
      }
      this.loading = true;
      this.getDicts(dictType)
        .then((res) => {
          this.loading = false;
          this.stageList = res.data;
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
    handleAdd() {
      this.dataForm.recordList.push({})
    },
    handleDel(index) {
      this.dataForm.recordList.splice(index, 1)
    },
    validateForm() {
      let flag = null
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          flag = true
        } else {
          flag = false
        }
      })
      return flag
    },
    validateFormField() {
      let flag = true
      const fieldList = ["stage", "problem"]
      for(let i=0; i<this.dataForm.recordList.length; i++) {
        fieldList.forEach(item => {
          const field = 'recordList.' + i + '.' +item
          this.$refs['dataForm'].validateField(field, valid => {
            if (valid) {
              flag = false
            }
          })
        })
      }
      return flag
    }
  }
}
</script>
<style scoped>
.header {
  font-size: 18px;
  font-weight: 700;
  background-color: #fdeee8;
  display: inline-block;
  border-left: 3px solid #EA5514;
  width: fit-content;
  margin-bottom: 20px;
  text-align: center;
  padding: 0px 10px;
}
::v-deep .el-table__cell .el-form-item {
  margin-bottom: 0px;
}
</style>