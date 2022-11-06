<template>
  <el-container>
    <el-header height="auto">
      <jereh-button @click="handleSaveClick">保存</jereh-button>
      <jereh-button @click="handleClose">关闭</jereh-button>
    </el-header>
    <el-main>
      <el-form ref="form" :model="formData" :rules="rules" label-width="150px" size="small">
        <!-- 第一行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="巡检日期" prop="inspectionDate">
              <jereh-date-picker v-model="formData.inspectionDate" valueFormat="yyyy-MM-dd" style="width: 100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="巡检人" prop="inspectionBy">
              <jereh-person-select v-model="formData.inspectionBy" :multiple="false"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机小时数(h)" prop="engineHours">
              <jereh-input v-model="formData.engineHours"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="底盘里程数(KM)" prop="chassisMileage">
              <jereh-input v-model="formData.chassisMileage"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="注入头里程(Hb Mile)" prop="injectHeadMileage">
              <jereh-input v-model="formData.injectHeadMileage"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="底盘状态" prop="chassisStatus">
              <jereh-select v-model="formData.chassisStatus" :dict="dict.type.inspection_device_type"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机状态" prop="engineStatus">
              <jereh-select v-model="formData.engineStatus" :dict="dict.type.inspection_device_type"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="变速箱状态" prop="gearboxStatus">
              <jereh-select v-model="formData.gearboxStatus" :dict="dict.type.inspection_device_type"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="柱塞泵状态" prop="pistonPumpStatus">
              <jereh-select v-model="formData.pistonPumpStatus" :dict="dict.type.inspection_device_type"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="巡检工时(h)" prop="inspectionHours">
              <jereh-input v-model="formData.inspectionHours"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他总成状态" prop="otherAssemblyStatus">
              <jereh-select v-model="formData.otherAssemblyStatus" :dict="dict.type.inspection_device_type"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电气系统状态" prop="electricalSystemStatus">
              <jereh-select v-model="formData.electricalSystemStatus" :dict="dict.type.inspection_device_type"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="液压系统状态" prop="hydraulicSystemStatus">
              <jereh-select v-model="formData.hydraulicSystemStatus" :dict="dict.type.inspection_device_type"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="气路系统状态" prop="airSystemStatus">
              <jereh-select v-model="formData.airSystemStatus" :dict="dict.type.inspection_device_type"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="润滑系统状态" prop="lubricationSystemStatus">
              <jereh-select v-model="formData.lubricationSystemStatus" :dict="dict.type.inspection_device_type"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他系统状态" prop="otherSystemStatus">
              <jereh-input v-model="formData.otherSystemStatus"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="选择检查调试模板" prop="debugTemplate">
              <jereh-select v-model="formData.debugTemplate" :dict="dict.type.check_template"
                            @change="checkTemplateChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="巡检建议" prop="inspectionSuggestion">
              <jereh-select v-model="formData.inspectionSuggestion" :dict="dict.type.inspection_suggestion_one"
                            style="width: 40%"
              />
              <jereh-select v-model="formData.inspectionSuggestionTwo" :dict="dict.type.inspection_suggestion_two"
                            style="margin-left: 10px; width: 40%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 下半部分 -->
        <h2>巡检检查调试记录</h2>
        <span>说明：请对以下所有项进行检查、调节、紧固或加注油品</span>
        <el-row>
          <el-col :span="15">
            <el-form-item label="巡检检查调试记录附件" prop="inspectionSuggestion" label-width="160px">
              <file-upload
                class="ml-2"
                v-model="formData.inspectionDebugRecordFile"
              >
              </file-upload>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <jereh-button @click="handleShow" style="margin-top: 5px">隐藏/显示</jereh-button>
            <jereh-button @click="handleExport" style="margin-top: 5px">导出</jereh-button>
          </el-col>
        </el-row>
        <el-table v-if="showTable" :data="formData.inspectionDebugRecord" border fit>
          <el-table-column type="index" width="50"/>
          <el-table-column prop="deviceType" label="设备类型" align="center" show-overflow-tooltip/>
          <el-table-column prop="checkMajorItem" label="检查大项" align="center" show-overflow-tooltip/>
          <el-table-column prop="checkStandard" label="检查项及标准" align="center" show-overflow-tooltip/>
          <af-table-column prop="checkResult" show-overflow-tooltip align="center" label="记录检查结果" width="200">
            <template slot-scope="scope">
              <jereh-input v-model="scope.row.checkResult" ph="默认“是”，填数据的可修改为具体数值带单位。"/>
            </template>
          </af-table-column>
          <el-table-column prop="result" label="检查结果" align="center" show-overflow-tooltip fixed="right" width="400">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.result">
                <el-radio label="正常">正常</el-radio>
                <el-radio label="调节">调节</el-radio>
                <el-radio label="维修">维修</el-radio>
                <el-radio label="不适用">不适用</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>

import { listDeliveryInspectionTemplate } from '../../../../api/cmms/deliveryInspectionTemplate'

export default {
  name: 'inspecionRecord',
  dicts: ['inspection_device_type', 'inspection_suggestion_one', 'inspection_suggestion_two', 'check_template'],
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      formData: {
        inspectionDebugRecord: [],
      },
      rules: {},
      showTable: false
    }
  },
  created() {
    this.formData = this.data
    this.formData.inspectionBy = this.formData.inspectionBy ? this.formData.inspectionBy : this.$store.state.user.nickName
  },
  methods: {
    // 检查调试模板切换
    checkTemplateChange(data) {
      let params = {}
      params.pageNum = 1
      params.pageSize = 9999
      params.deviceType = data
      this.listDeliveryInspectionTemplate(params)
    },
    listDeliveryInspectionTemplate(params) {
      listDeliveryInspectionTemplate(params).then(res => {
        this.$set(this.formData, "inspectionDebugRecord", res.rows)
      })
    },
    handleSaveClick() {
      this.$emit('save', this.formData)
    },
    handleClose() {
      this.$emit('close')
    },
    handleShow() {
      this.showTable = !this.showTable
    },
    handleExport() {
      var inspectionDebugRecord = this.formData.inspectionDebugRecord
      this.download('cmms/framework/inspection/export', {
          inspectionDebugRecord: JSON.stringify(inspectionDebugRecord)
        }
      , `框架协议_巡检记录_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
