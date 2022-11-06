<template>
  <div>
    <el-card>
      <div class="top" slot="header">
        <!-- <div class="toptitle">故障信息</div> -->
        <div class="tongbu">
          <jereh-button type="primary" plant @click="openTB"
            >批量同步</jereh-button
          >
        </div>
      </div>
      <el-form
        ref="QuestionInfoData"
        :model="QuestionInfoData"
        label-width="120px"
      >
        <el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="请求编码" prop="serviceRequestCode">
                <el-input
                  v-model="QuestionInfoData.serviceRequestCode"
                  disabled
                  placeholder=""
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工单编码" prop="workOrderCode">
                <el-input
                  v-model="QuestionInfoData.workOrderCode"
                  disabled
                  placeholder=""
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="紧急程度" prop="emergencyDegree">
                <jereh-select
                  v-model="QuestionInfoData.emergencyDegree"
                  filterable
                  disabled
                  ph=""
                  :dict="dict.type.itr_emergency_degree"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="问题处理流程号" prop="flowPathCode">
                <el-input
                  v-model="QuestionInfoData.flowPathCode"
                  disabled
                  placeholder=""
                  maxlength="11"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="故障描述" prop="serviceDescription">
                <el-input
                  v-model="QuestionInfoData.serviceDescription"
                  placeholder=""
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
          预留字段
            <el-col :span="24">
              <el-form-item label="故障代号" prop="faultCode">
                <el-input
                  v-model="QuestionInfoData.faultCode"
                  placeholder="请输入故障代号"
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="6">
              <el-form-item label="故障类型" prop="faultType">
                <jereh-select
                  v-model="QuestionInfoData.faultType"
                  filterable
                  ph="请选择"
                  :dict="dict.type.itr_fault_type"
                  @input="issueTypeChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="类型细分" prop="faultSubType">
                <el-select
                  v-model="QuestionInfoData.faultSubType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in issueSubTypeOptions"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="故障等级" prop="faultLevel">
                <jereh-select
                  v-model="QuestionInfoData.faultLevel"
                  filterable
                  ph=""
                  :dict="dict.type.itr_fault_level"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户服务单号" prop="serviceResultCode">
                <el-input
                  v-model="QuestionInfoData.serviceResultCode"
                  placeholder=""
                  maxlength="30"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="详情描述" prop="workOrderDescription">
                <el-input
                  v-model="QuestionInfoData.workOrderDescription"
                  placeholder="请输入详情描述"
                  type="textarea"
                  :rows="2"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="问题照片" prop="malfunctionImage">
                <FileUpload
                  :isShowTip="false"
                  @input="accessoryFileUpload($event, 'malfunctionImage')"
                  v-model="QuestionInfoData.malfunctionImage"
                  :fileType="[
                    'doc',
                    'xls',
                    'ppt',
                    'txt',
                    'pdf',
                    'png',
                    'jpg',
                    'jpeg',
                  ]"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="原因类型" prop="reasonType">
                <jereh-select
                  v-model="QuestionInfoData.reasonType"
                  filterable
                  ph="请输入原因类型"
                  :dict="dict.type.itr_reason_type"
                ></jereh-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="QuestionInfoData.reasonType === 'OTHER'">
            <el-col :span="24">
              <el-form-item label="其他原因说明" prop="otherReasonRemark">
                <el-input
                  :row="2"
                  type="textarea"
                  v-model="QuestionInfoData.otherReasonRemark"
                  placeholder="请输入其他原因说明"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="重大问题小组" prop="severityQuestionGroup">
                <el-input
                  v-model="QuestionInfoData.severityQuestionGroup"
                  placeholder="请输入重大问题小组"
                />
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="决议项附件" prop="resolutionAttachment">
                <FileUpload
                  :isShowTip="false"
                  :flex="true"
                  @input="accessoryFileUpload($event, 'resolutionAttachment')"
                  v-model="QuestionInfoData.resolutionAttachment"
                  :fileType="[
                    'doc',
                    'xls',
                    'ppt',
                    'txt',
                    'pdf',
                    'png',
                    'jpg',
                    'jpeg',
                  ]"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="原因分析" prop="reasonAnalyse">
                <el-input
                  :row="2"
                  type="textarea"
                  v-model="QuestionInfoData.reasonAnalyse"
                  placeholder="请输入原因分析"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="计划处理措施" prop="planProcessResult">
                <el-input
                  :row="2"
                  type="textarea"
                  v-model="QuestionInfoData.planProcessResult"
                  placeholder="请输入计划处理措施"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="是否重复发生" prop="isRepeat">
                <el-select
                  v-model="QuestionInfoData.isRepeat"
                  placeholder="请选择是否重复发生"
                >
                  <el-option
                    v-for="item in isRepeateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否提供资源" prop="isProvideResources">
                <el-select
                  v-model="QuestionInfoData.isProvideResources"
                  placeholder="请选择是否提供资源"
                >
                  <el-option
                    v-for="item in isSupportSolutionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="资源提供人" prop="solutionSupplier">
                <PersonnelBindingSelect
                  v-model="QuestionInfoData.solutionSupplier"
                  @bindingData="
                    bindingSelectData(
                      $event,
                      QuestionInfoData,
                      'solutionSupplier'
                    )
                  "
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="实际处理措施" prop="solutionProcessResult">
                <el-input
                  v-model="QuestionInfoData.solutionProcessResult"
                  placeholder="请输入实际处理措施"
                  type="textarea"
                  :rows="2"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="实际处理照片" prop="processAttachment">
                <FileUpload
                  :isShowTip="false"
                  @input="accessoryFileUpload($event, 'processAttachment')"
                  v-model="QuestionInfoData.processAttachment"
                  :fileType="[
                    'doc',
                    'xls',
                    'ppt',
                    'txt',
                    'pdf',
                    'png',
                    'jpg',
                    'jpeg',
                  ]"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!QuestionInfoData.seriousUserName">
            <el-col :span="6">
              <el-form-item :label="`升级人员`" prop="seriousUserName">
                <PersonnelBindingSelect
                  :value="QuestionInfoData.seriousUserName"
                  :disabled="true"
                  @bindingData="
                    bindingSelectData(
                      $event,
                      QuestionInfoData,
                      'seriousUserName'
                    )
                  "
                />
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="附件">
                <!-- <el-col :span="6">
                  <el-input />
                </el-col> -->
                <el-col>
                  <FileUpload
                    :isShowTip="false"
                    @input="accessoryFileUpload($event, 'upgradeProcessResult')"
                    v-model="QuestionInfoData.upgradeProcessResult"
                    :fileType="[
                      'doc',
                      'xls',
                      'ppt',
                      'txt',
                      'pdf',
                      'png',
                      'jpg',
                      'jpeg',
                    ]"
                  />
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            v-else
            v-for="(item, index) in QuestionInfoData.seriousUserName.split(',')"
            :key="index"
          >
            <el-col :span="6">
              <el-form-item
                :label="`升级人员` + (index + 1)"
                prop="seriousUserName"
              >
                <PersonnelBindingSelect
                  :value="item"
                  :disabled="true"
                  @bindingData="
                    bindingSelectData(
                      $event,
                      QuestionInfoData,
                      'seriousUserName'
                    )
                  "
                />
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item :label="`附件` + (index + 1)">
                <!-- <el-col :span="6">
                  <el-input />
                </el-col> -->
                <el-col>
                  <FileUpload
                    :isShowTip="false"
                    @input="
                      accessoryFileUpload(
                        $event,
                        `upgradeProcessResultList${index}`
                      )
                    "
                    v-model="
                      QuestionInfoData['upgradeProcessResultList' + index]
                    "
                    :fileType="[
                      'doc',
                      'xls',
                      'ppt',
                      'txt',
                      'pdf',
                      'png',
                      'jpg',
                      'jpeg',
                    ]"
                  />
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="验证结果" prop="verifyResult">
                  <!-- <jereh-select
                  v-model="QuestionInfoData.verifyResult"
                  filterable
                  ph="请选择验证结果"
                  :dict="dict.type.itr_verify_result"
                ></jereh-select> -->
                  <el-select
                    v-model="QuestionInfoData.verifyResult"
                    placeholder="请选择验证结果"
                    disabled
                  >
                    <el-option
                      v-for="item in verifyResultOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="处理日期" prop="processTime">
                  <el-date-picker
                    v-model="QuestionInfoData.processTime"
                    type="date"
                    placeholder="请选择处理日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="问题处理人" prop="resolveUserBy">
                  <PersonnelBindingSelect
                    v-model="QuestionInfoData.resolveUserBy"
                    ph="请选择问题处理人"
                    @bindingData="
                      bindingSelectData(
                        $event,
                        QuestionInfoData,
                        'resolveUserBy'
                      )
                    "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="实际完成时间" prop="completeTime">
                  <el-input
                    v-model="QuestionInfoData.completeTime"
                    placeholder=""
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="处理结果" prop="processResult">
                  <jereh-select
                    disabled
                    v-model="QuestionInfoData.processResult"
                    filterable
                    ph="请选择处理结果"
                    :dict="dict.type.itr_process_result"
                  ></jereh-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="是否需要索赔" prop="isClaim">
                  <el-select
                    v-model="QuestionInfoData.isClaim"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in isClaimOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="问题确认人" prop="confirmUserBy">
                  <PersonnelBindingSelect
                    v-model="QuestionInfoData.confirmUserBy"
                    :disabled="true"
                    @bindingData="
                      bindingSelectData(
                        $event,
                        QuestionInfoData,
                        'confirmUserBy'
                      )
                    "
                    ph=""
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="工单关闭时间" prop="closeTime">
                  <el-date-picker
                    v-model="QuestionInfoData.closeTime"
                    type="date"
                    placeholder=""
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-col :span="18">
              <el-form-item
                label="索赔信息上传"
                prop="claimAttachment"
                v-if="QuestionInfoData.isClaim"
              >
                <FileUpload
                  v-model="QuestionInfoData.claimAttachment"
                  :isShowTip="false"
                  :fileType="[
                    'doc',
                    'xls',
                    'ppt',
                    'txt',
                    'pdf',
                    'png',
                    'jpg',
                    'jpeg',
                  ]"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <el-row v-if="QuestionInfoData.isClaim">
        <el-card>
          <div slot="header">索赔物料清单</div>
          <el-table :data="rowData.keyMaterialsItemsList">
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="50"
            />
            <el-table-column
              align="center"
              label="物料编码"
              prop="materialCode"
            >
              <template slot-scope="scope">
                <el-input
                  type="text"
                  v-model="scope.row.materialCode"
                  @focus="openMateriel(scope)"
                />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="物料说明"
              prop="materialName"
            >
              <template slot-scope="scope">
                <el-input
                  type="text"
                  v-model="scope.row.materialName"
                  @focus="openMateriel(scope)"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="数量" prop="applyNumber">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.applyNumber" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注" prop="remark">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.remark" />
              </template>
            </el-table-column>
            <el-table-column align="center" width="240px">
              <template slot="header" slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="keyMaterialsItemsListPushList"
                  >新增</el-button
                >
                <!-- <el-button type="text" size="mini">下载模板</el-button>
            <el-button type="text" size="mini">上传附件</el-button> -->
              </template>
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="remove(scope)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-row>
      <Synchronization
        :open="openSynchronization"
        @closeDialog="colseSynchronization"
        :rowData="QuestionInfoData"
      />
      <MaterialNumberQuery
        :openMQ="openMaterialQueryDialog"
        @closeDialog="closeMaterialQueryDialog"
        @seletData="seletMaterialQueryData"
      />
    </el-card>
  </div>
</template>

<script>
import { whether } from "@/utils/dictionary-service";
import MaterialNumberQuery from "./MaterialNumberQuery.vue";
import PersonnelBindingSelect from "@/views/cmms/itr/components/PersonnelBindingSelect/index.vue";
import Synchronization from "./Synchronization.vue";
import { getDicts as getDicts } from "@/api/system/dict/data";
export default {
  name: "QuestionInfo",
  dicts: [
    "itr_fault_level",
    "itr_influence_level",
    "itr_emergency_degree",
    "itr_fault_type",
    "itr_fault_sub_type",
    "itr_reason_type",
    "itr_verify_result",
    "itr_process_result",
  ],
  components: {
    Synchronization,
    MaterialNumberQuery,
    PersonnelBindingSelect,
  },

  data() {
    return {
      QuestionInfoData: {
        serviceDescription: undefined,
      },
      // keyMaterialsItemsList: [],
      isRepeateOptions: whether(),
      isSupportSolutionOptions: whether(),
      isClaimOptions: whether(),
      issueSubTypeOptions: [],
      currentBindingName: "",
      writeBack: "",
      openSynchronization: false,
      issueSubTypeAllOptions: [],
      id: this.$route.query.workOrderId,
      openMaterialQueryDialog: false,
      numberList: -1,
      verifyResultOptions: [
        {
          value: "verify_wait",
          label: "待验证",
        },
        {
          value: "verify_complete",
          label: "已验证",
        },
        {
          value: "materialshen_execute",
          label: "验证中",
        },
      ],
    };
  },
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    title: {
      type: String,
      default: () => {
        return "修改";
      },
    },
    openFix: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    WorkOrderCode: String,
  },
  methods: {
    keyMaterialsItemsListPushList() {
      this.rowData.keyMaterialsItemsList.push({
        workOrderCode: this.WorkOrderCode,
        workOrderId: this.$route.query.workOrderId,
      });
    },
    openTB() {
      this.openSynchronization = true;
    },
    remove(value) {
      this.rowData.keyMaterialsItemsList.splice(value.$index, 1);
    },
    colseSynchronization(value) {
      this.openSynchronization = value;
    },
    openMateriel(scope, list) {
      this.numberList = scope.$index;
      this.openMaterialQueryDialog = true;
    },
    closeMaterialQueryDialog(value) {
      this.openMaterialQueryDialog = value;
    },
    accessoryFileUpload(event, name) {
      this.QuestionInfoData[name] = event;
    },
    seletMaterialQueryData(value) {
      this.$set(
        this.rowData.keyMaterialsItemsList[this.numberList],
        "materialCode",
        value.materialCode
      );
      this.$set(
        this.rowData.keyMaterialsItemsList[this.numberList],
        "materialName",
        value.materialName
      );
    },
    issueTypeChange(value) {
      this.$set(this.QuestionInfoData, "faultSubType", "");
      let items = [];
      this.issueSubTypeAllOptions.forEach((element) => {
        if (element.dictValue.indexOf(value) == 0) {
          items.push(element);
        }
      });
      this.$set(this, "issueSubTypeOptions", [...items]);
    },
    issueTypeInit(value) {
      let items = [];
      this.issueSubTypeAllOptions.forEach((element) => {
        if (element.dictValue.indexOf(value) == 0) {
          items.push(element);
        }
      });
      this.$set(this, "issueSubTypeOptions", [...items]);
    },
    bindingSelectData(e, row, item) {
      this.$set(row, item, e.join(","));
    },
  },
  watch: {
    rowData: {
      handler(nV, oV) {
        this.QuestionInfoData = nV;
        if (nV.upgradeProcessResult) {
          let data = nV.upgradeProcessResult.split(",");
          data.forEach((item, index) => {
            this.QuestionInfoData["upgradeProcessResultList" + index] = item;
          });
        }
      },
      deep: true,
    },
  },
  async mounted() {
    await getDicts("itr_fault_sub_type").then((resp) => {
      debugger;
      this.issueSubTypeAllOptions = resp.data;
    });
    this.QuestionInfoData = this.rowData;
    this.issueTypeInit(this.QuestionInfoData.faultType);
    // if (this.QuestionInfoData.claimMaterialsItems) {
    //   this.keyMaterialsItemsList = this.QuestionInfoData.claimMaterialsItems;
    // } else {
    //   this.QuestionInfoData.claimMaterialsItems = this.keyMaterialsItemsList;
    // }
  },
};
</script>

<style lang="scss" scoped>
.drawer-box {
  padding: 10px;
  .steps {
    margin: 10px 0 35px 0;
  }
  .title {
    margin: 10px 0px 20px 0;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
  }
  .showBtn {
    margin: 10px 12px;
  }
  .tableBtn {
    margin: 20px 17px;
    text-align: right;
    padding-bottom: 20px;
  }
  .markerEmail {
    display: flex;
    justify-content: flex-end;
    margin: 10px 12px;
    text-align: right;
  }
  .basidRemark {
    margin: 0 0 20px 40px;
    color: red;
    font-size: 10px;
  }
  .tableTitle {
    text-align: center;
    margin-bottom: 20px;
    .tt {
      font-size: 18px;
      font-weight: 800;
    }
  }
}
.dialog-footer {
  position: relative;

  .back {
    position: absolute;
    right: 0;
  }
}
.top {
  display: flex;
  justify-content: space-between;
  // margin-bottom: 20px;
  .toptitle {
    font-size: 20px;
  }
}

::v-deep .el-card__header {
  background: #f8f9fa;
  padding: 10px 20px;
}
::v-deep .el-card {
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #dee2e6;
}
</style>
