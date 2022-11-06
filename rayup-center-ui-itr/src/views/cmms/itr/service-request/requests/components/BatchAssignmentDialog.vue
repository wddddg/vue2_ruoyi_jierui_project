<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
    v-dialogDrag
  >
    <el-card>
      <el-form
        ref="form"
        :model="currentData"
        :rules="rules"
        label-width="140px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户名称" prop="clientName">
              <el-input
                v-model="currentData.clientName"
                placeholder=""
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品编号" prop="productCode">
              <el-input
                v-model="currentData.productCode"
                placeholder=""
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker
                v-model="currentData.createTime"
                type="datetime"
                placeholder=""
                :editable="false"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="项目编码" prop="projectCode">
              <el-input
                v-model="currentData.projectCode"
                placeholder=""
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品名称" prop="productName">
              <el-input
                v-model="currentData.productName"
                placeholder=""
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务地点" prop="serviceJobsite">
              <el-input
                v-model="currentData.serviceJobsite"
                placeholder=""
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-divider></el-divider>
          <div class="center-pre-next-box">
            <div style="margin-bottom: 5px">
              <b>已选择服务请求（{{ ids.length }}）</b>
            </div>
            <el-button
              type="info"
              plain
              @click="previous"
              icon="el-icon-arrow-left"
              >上一个</el-button
            >
            <el-button type="info" plain @click="next"
              >下一个<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </div>
          <el-divider></el-divider>
        </el-row>

        <el-row>
          <el-form-item label="故障描述">
            <el-input v-model="currentData.serviceDescription"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="故障等级">
              <jereh-select
                v-model="currentData.currentDataVo.faultLevel"
                filterable
                ph="请选择故障等级"
                :dict="dict.type.itr_fault_level"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="紧急程度">
              <jereh-select
                v-model="currentData.emergencyDegree"
                filterable
                ph="请选择紧急程度"
                :dict="dict.type.itr_emergency_degree"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="影响程度">
              <jereh-select
                v-model="currentData.currentDataVo.influenceLevel"
                filterable
                ph="请选择影响程度"
                :dict="dict.type.itr_influence_level"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="服务请求来源" prop="serviceSource">
              <jereh-select
                v-model="currentData.serviceSource"
                filterable
                ph="请选择服务请求来源"
                :dict="dict.type.itr_service_source"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务需求时间" prop="serviceRequiredTime">
              <el-date-picker
                v-model="currentData.serviceRequiredTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预估工时" prop="estimateTime">
              <el-input
                type="number"
                v-model="currentData.currentDataVo.estimateTime"
                placeholder="请输入预估工时"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="服务派工" prop="engineerName">
              <el-select
                v-model="currentData.engineerName"
                multiple
                placeholder="请选择服务派工"
                @focus="
                  openPersonnelBindingDialog(
                    'engineerName',
                    currentData.engineerName
                  )
                "
                ref="cascader"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="辅助人" prop="taskAssistUserName">
              <el-select
                v-model="currentData.taskAssistUserName"
                multiple
                placeholder="请选择辅助人"
                @focus="
                  openPersonnelBindingDialog(
                    'taskAssistUserName',
                    currentData.taskAssistUserName
                  )
                "
                ref="cascader"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <PersonnelBinding
        :open="personnelBindingVisible"
        :selectOrRadio="selectOrRadio"
        @closeDialog="colsePersonnelBindingDialog"
        @bindingData="bindingData"
        :writeBack="writeBack"
      />
    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitSendWork">确定派工</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getRequest,
  submitRequest,
} from "@/api/cmms/itr/service-request/all-requests";
import PersonnelBinding from "@/views/cmms/itr/components/PersonnelBinding/index.vue";
export default {
  dicts: [
    "itr_emergency_degree",
    "itr_fault_level",
    "itr_service_source",
    "itr_influence_level",
  ],
  components: {
    PersonnelBinding,
  },
  data() {
    return {
      currentIndex: 0,
      currentData: {
        currentDataVo: {},
      },
      writeBack: [],
      personnelBindingVisible: false,
      currentBindingName: "",
      selectOrRadio: true,
      rules: {
        engineerName: [
          {
            required: true,
            message: "请选择服务派工",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "批量整改派工",
    },
    ids: {
      type: Array,
      require: true,
    },
  },
  methods: {
    async init() {
      if (this.currentIndex >= this.ids.length) {
        this.currentIndex--;
      }
      await getRequest(
        this.ids[this.currentIndex].id,
        this.ids[this.currentIndex].serviceType
      ).then((res) => {
        this.currentData = Object.assign({}, this.currentData, res.data);
        if (res?.data?.faultDetailVo) {
          this.currentData.currentDataVo = Object.assign(
            {},
            this.currentData.currentDataVo,
            res.data.faultDetailVo
          );
        }
        if (res?.data?.otherDetailVo) {
          this.currentData.currentDataVo = Object.assign(
            {},
            this.currentData.currentDataVo,
            res.data.otherDetailVo
          );
        }
        if (res?.data?.taskAssistUserName) {
          this.currentData.taskAssistUserName =
            res.data.taskAssistUserName.split(",");
        }
        if (res?.data?.engineerName) {
          this.currentData.engineerName = res.data.engineerName.split(",");
        }
      });
    },
    async submitSendWork() {
      let params = {
        ...this.currentData,
      };
      if (params?.engineerName) {
        params.engineerName = params.engineerName.join(",");
      }
      if (params?.taskAssistUserName) {
        params.taskAssistUserName = params.taskAssistUserName.join(",");
      }
      if (this.currentData.serviceType === "malfunction_repair") {
        params.requestFaultParam = this.currentData.currentDataVo;
        params.requestFaultParam.isDistribute = 1;
      } else {
        params.requestOtherParam = this.currentData.currentDataVo;
        params.requestOtherParam.isDistribute = 1 || "";
      }
      params.serviceDescriptionList = [this.currentData.serviceDescription];
      await this.$refs["form"].validate(async (valid) => {
        if (valid) {
          await submitRequest(params).then(async (res) => {
            this.ids.splice(this.currentIndex, 1);
            if (this.ids.length == 0) {
              this.$message.success("已派工完毕");
              this.handleClose();
            } else {
              this.init();
              this.$message.success(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    previous() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    next() {
      if (this.currentIndex <= this.ids.length - 2) {
        this.currentIndex++;
      }
    },
    handleClose() {
      this.$emit("handleClose", false);
      this.currentIndex = 0;
    },
    openPersonnelBindingDialog(value, item) {
      if (value === "taskAssistUserName") {
        this.selectOrRadio = false;
      } else {
        this.selectOrRadio = true;
      }
      if(item){
        this.writeBack = item;
      }
      this.currentBindingName = value;
      // -------下拉框不出现options---------
      if (this.$refs.cascader) {
        this.$refs.cascader.visible = false;
      }
      // ----------------------------------
      this.personnelBindingVisible = true;
    },
    colsePersonnelBindingDialog(value) {
      this.personnelBindingVisible = value;
    },
    bindingData(value) {
      this.$refs.form.clearValidate(this.currentBindingName);
      const formVals = this.currentBindingName;
      let selectedValues = value;
      if (value.length) {
        selectedValues = value.map((item) => {
          return item.nickName;
        });
      }
      this.currentData[formVals] = selectedValues;
      if (this.currentBindingName == "engineerName") {
        this.currentData["engineerId"] = value
          .map((item) => {
            return item.userName;
          })
          .join(",");
      }
      if (this.currentBindingName == "taskAssistUserName") {
        this.currentData["taskAssistUserId"] = value
          .map((item) => {
            return item.userName;
          })
          .join(",");
      }
    },
  },
  watch: {
    currentIndex: {
      async handler(newValue) {
        console.log(1);
        if (this.dialogVisible) {
          if (newValue < 0) {
            return false;
          }
          if (newValue > this.ids.length) {
            return false;
          }
          await getRequest(
            this.ids[newValue].id,
            this.ids[newValue].serviceType
          ).then((res) => {
            this.currentData = Object.assign({}, this.currentData, res.data);
            if (res?.data?.faultDetailVo) {
              this.currentData.currentDataVo = Object.assign(
                {},
                this.currentData.currentDataVo,
                res.data.faultDetailVo
              );
            }
            if (res?.data?.otherDetailVo) {
              this.currentData.currentDataVo = Object.assign(
                {},
                this.currentData.currentDataVo,
                res.data.otherDetailVo
              );
            }
            if (res?.data?.taskAssistUserName) {
              this.currentData.taskAssistUserName =
                res.data.taskAssistUserName.split(",");
            }
            if (res?.data?.engineerName) {
              this.currentData.engineerName = res.data.engineerName.split(",");
            }
          });
        }
      },
      deep: true,
    },
    async dialogVisible(value) {
      if (value) {
        await this.init();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__footer {
  text-align: center;
}
.center-pre-next-box {
  text-align: center;
}
</style>
