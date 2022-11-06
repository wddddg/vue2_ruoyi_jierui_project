<template>
  <div class="app-container">
    <!-- <template #title>
      <div class="servicTitle">{{ isUpdate ? "修改" : "创建" }}服务请求</div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          class="back"
          v-if="
            requestsType === 'DZB' &&
            (rowData.taskSpecialityUser || rowData.isSerious)
          "
          @click="reback"
          >退回</el-button
        >
      </div>
    </template> -->
    <div class="footer">
      <div class="footer-btn">
        <el-row :gutter="10" class="mb-2">
          <el-col :span="1.5"
            ><jereh-button type="primary" plain @click="comeBack"
              >返回</jereh-button
            ></el-col
          >
          <el-col v-if="!allDisabled" :span="1.5">
            <jereh-button type="primary" @click="saveForm('form')" plain
              >保存</jereh-button
            >
            <jereh-button
              type="primary"
              plain
              @click="submitForm('form')"
              v-if="actionType == 'REQUEST' && !submitState"
              >提交</jereh-button
            >
            <jereh-button
              type="primary"
              plain
              v-if="
                actionType == 'REQUEST' &&
                form.serviceType != 'technology_consulting' &&
                form.serviceType != 'accessories_service' &&
                form.serviceType != 'malfunction_repair'
              "
              @click="openSendMail"
            >
              发起市场确认</jereh-button
            >
            <jereh-button
              type="primary"
              plain
              v-if="
                form.serviceType === 'accessories_service' &&
                form.requestOtherParam.isDistribute
              "
              @click="openSendMail"
            >
              发起市场确认
            </jereh-button>
            <!-- 故障维修 -->
            <!-- &&form.requestFaultParam.serviceCategory=='BW'-->
            <jereh-button
              plain
              type="primary"
              v-if="form.serviceType === 'malfunction_repair'"
              @click="openSendMail"
            >
              发起市场确认
            </jereh-button>
          </el-col>
          <el-col
            :span="1.5"
            v-if="
              form.state ==
                'malfunction_repair_state_engineer_question_verify_cancel' ||
              form.state == 'service_state_complete'
            "
          >
            <jereh-button type="primary" plain @click="secondaryAssignment">
              二次派工
            </jereh-button>
          </el-col>
          <el-col :span="1.5" v-if="!allDisabled">
            <jereh-button
              type="primary"
              plain
              v-if="actionType == 'WORK_ORDER' && form.isComplete"
              @click="confirmationWorkOrder"
              >工单确认</jereh-button
            >
            <jereh-button
              type="primary"
              plain
              v-if="actionType == 'WORK_ORDER'"
              @click="cencelWorkOrder"
              >取消</jereh-button
            >
          </el-col>
        </el-row>
        <!-- <div v-else></div>
        <div class="right-btn">
          <el-button type="primary" plain @click="comeBack">返回</el-button>
        </div> -->
      </div>
    </div>
    <div class="drawer-box">
      <el-form ref="form" :model="form" label-width="110px" :rules="rules">
        <el-row>
          <el-card>
            <div slot="header" class="clearfix">
              <span class="title">基本信息</span>
              <div class="clearfix-right" v-if="!allDisabled">
                <jereh-button
                  type="primary"
                  plain
                  @click="openRelatedEquipmentDialog"
                  >设备信息绑定</jereh-button
                >
              </div>
            </div>

            <el-row>
              <el-col :span="6">
                <el-form-item label="服务类型" prop="serviceType">
                  <el-select
                    v-model="form.serviceType"
                    :disabled="isUpdate || allDisabled"
                    placeholder="请选择服务类型"
                    @change="changeServiceType"
                  >
                    <el-option
                      v-for="item in requestClassifyOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目编码" prop="projectCode">
                  <el-input
                    v-model="form.projectCode"
                    placeholder="点此查询设备信息，并绑定设备"
                    @focus="openRelatedEquipmentDialog"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品编号" prop="productCode">
                  <el-input
                    v-model="form.productCode"
                    placeholder="点此查询设备信息，并绑定设备"
                    @focus="openRelatedEquipmentDialog"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="车牌号" prop="licenseNumber">
                  <el-input
                    v-model="form.licenseNumber"
                    placeholder="点此查询设备信息，并绑定设备"
                    @focus="openRelatedEquipmentDialog"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="客户名称" prop="clientName">
                  <el-input
                    v-model="form.clientName"
                    placeholder="请输入客户名称"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="是否展示给客户"
                  label-width="120px"
                  prop="isShow"
                >
                  <el-select
                    v-model="form.isShow"
                    placeholder="请选择是否展现给客户"
                    :disabled="allDisabled"
                  >
                    <el-option
                      v-for="item in isShowOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="6"
                v-if="form.serviceType === 'malfunction_repair'"
              >
                <el-form-item label="报修人" prop="askUserName">
                  <el-input v-model="form.askUserName" disabled />
                </el-form-item>
              </el-col>
              <el-col
                :span="6"
                v-if="form.serviceType === 'malfunction_repair'"
              >
                <el-form-item label="联系方式" prop="askUserInfo">
                  <el-input
                    v-model="form.askUserInfo"
                    maxlength="11"
                    disabled
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item
                  :label="
                    form.serviceType === 'malfunction_repair'
                      ? '现场联系人'
                      : '联系人'
                  "
                  prop="contactUserName"
                >
                  <el-input
                    v-model="form.contactUserName"
                    :placeholder="
                      form.serviceType === 'malfunction_repair'
                        ? '请选择现场联系人'
                        : '请选择联系人'
                    "
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系方式" prop="contactUserInfo">
                  <el-input
                    v-model="form.contactUserInfo"
                    placeholder="请输入联系方式"
                    maxlength="11"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>

              <el-col
                :span="6"
                v-if="form.serviceType === 'malfunction_repair'"
              >
                <el-form-item label="项目编码分项" prop="projectCodeSubentry">
                  <el-input v-model="form.projectCodeSubentry" disabled />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="产品品牌" prop="productBrand">
                  <el-input
                    v-model="form.productBrand"
                    maxlength="11"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品名称" prop="productName">
                  <el-input
                    v-model="form.productName"
                    placeholder=""
                    disabled
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="产品型号" prop="productModel">
                  <el-input v-model="form.productModel" disabled />
                </el-form-item>
              </el-col>

              <el-col
                :span="6"
                v-if="form.serviceType === 'malfunction_repair'"
              >
                <el-form-item label="底盘VIN码" prop="chassisVin">
                  <el-input v-model="form.chassisVin" maxlength="30" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="质保终止日期" prop="qualityExpirationDate">
                  <el-date-picker
                    v-model="form.qualityExpirationDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="售后区域" prop="afterSaleArea">
                  <!-- <el-input
                    v-model="form.afterSaleArea"
                    maxlength="11"
                    disabled
                  /> -->
                  <jereh-select
                    v-model="form.afterSaleArea"
                    filterable
                    ph="请选择售后区域"
                    :dict="dict.type.after_sale_area"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="市场区域" prop="marketArea">
                  <!-- <el-input v-model="form.marketArea" maxlength="30" disabled /> -->
                  <jereh-select
                    v-model="form.marketArea"
                    filterable
                    ph="请选择市场区域"
                    :dict="dict.type.device_area"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="服务请求来源" prop="serviceSource">
                  <jereh-select
                    v-model="form.serviceSource"
                    filterable
                    ph="请选择服务请求来源"
                    :dict="dict.type.itr_service_source"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6" v-if="isUpdate">
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="form.createTime"
                    type="datetime"
                    placeholder=""
                    :editable="false"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="form.serviceType != 'training_service'">
                <el-form-item label="服务地点" prop="serviceJobsite">
                  <el-input
                    v-model="form.serviceJobsite"
                    placeholder="请输入服务地点"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card v-if="form.serviceType === 'malfunction_repair'">
            <div slot="header" class="clearfix">
              <span class="title">故障报修</span>
            </div>
            <el-row>
              <el-row v-for="(item, index) in inps" :key="index + 1">
                <el-col :span="24">
                  <el-form-item
                    :label="'故障描述' + (index + 1)"
                    :prop="'description' + (index + 1)"
                  >
                    <div class="flex-int-add-btn">
                      <el-input
                        type="textarea"
                        :row="2"
                        v-model="item.description"
                        placeholder="请输入故障描述"
                        :disabled="allDisabled"
                      >
                      </el-input>
                      <el-button-group
                        class="button-group"
                        v-if="closeAddDescriptionBtn"
                      >
                        <el-button
                          v-if="!isUpdate"
                          icon="el-icon-plus"
                          @click="addInput"
                        ></el-button>
                        <el-button
                          v-if="!isUpdate"
                          icon="el-icon-minus"
                          @click="deletedInput(item, index)"
                        ></el-button>
                      </el-button-group>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="附件">
                    <FileUpload
                      v-model="requestAttachmentList[index].image"
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
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="故障等级" prop="faultLevel">
                    <jereh-select
                      v-model="form.requestFaultParam.faultLevel"
                      filterable
                      ph="请选择故障等级"
                      :dict="dict.type.itr_fault_level"
                      :disabled="allDisabled"
                    />

                    <!-- </el-select> -->
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="紧急程度" prop="emergencyDegree">
                    <jereh-select
                      v-model="form.emergencyDegree"
                      filterable
                      ph="请选择紧急程度"
                      :dict="dict.type.itr_emergency_degree"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="影响程度" prop="influenceLevel">
                    <jereh-select
                      v-model="form.requestFaultParam.influenceLevel"
                      filterable
                      ph="请选择影响程度"
                      :dict="dict.type.itr_influence_level"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="服务需求时间" prop="serviceRequiredTime">
                    <el-date-picker
                      v-model="form.serviceRequiredTime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择日期"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="服务类别" prop="serviceCategory">
                    <jereh-select
                      v-model="form.requestFaultParam.serviceCategory"
                      filterable
                      ph="请选择服务类别"
                      :dict="dict.type.itr_service_category"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="请求属性" prop="requestValidState">
                    <el-select
                      v-model="form.requestValidState"
                      placeholder="请选择请求属性"
                      :disabled="allDisabled"
                    >
                      <el-option
                        v-for="item in requestPropertyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="form.requestValidState == 'AVAIL'">
                  <el-form-item label="是否派工" prop="isDistribute">
                    <el-select
                      v-model="form.requestFaultParam.isDistribute"
                      placeholder="请选择是否派工"
                      :disabled="submitState || allDisabled"
                    >
                      <el-option
                        v-for="item in isTaskOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="6"
                  v-if="
                    form.requestValidState == 'AVAIL' &&
                    form.requestFaultParam.isDistribute
                  "
                >
                  <el-form-item label="服务派工" prop="engineerName">
                    <el-select
                      v-model="form.engineerName"
                      multiple
                      placeholder="请选择服务派工"
                      :disabled="submitState || allDisabled"
                      @focus="
                        openPersonnelBindingDialog(
                          'engineerName',
                          form.engineerName
                        )
                      "
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="form.requestValidState == 'AVAIL'">
                  <el-form-item
                    label="预估工时"
                    prop="estimateTime"
                    v-if="form.requestFaultParam.isDistribute"
                  >
                    <el-input
                      type="number"
                      v-model="form.requestFaultParam.estimateTime"
                      placeholder="请输入预估工时"
                      :disabled="allDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="form.requestValidState == 'AVAIL'">
                  <el-form-item
                    label="辅助人"
                    prop="taskAssistUserName"
                    v-if="form.requestFaultParam.isDistribute"
                  >
                    <el-select
                      v-model="form.taskAssistUserName"
                      multiple
                      placeholder="请选择辅助人"
                      @focus="
                        openPersonnelBindingDialog(
                          'taskAssistUserName',
                          form.taskAssistUserName
                        )
                      "
                      ref="cascader"
                      :disabled="allDisabled"
                    />
                    <!-- <jereh-person-select
                      v-model="form.taskAssistUserName"
                      filterable
                      remote
                      reserve-keyword
                      ph="请输入研发负责人"
                      :remote-method="remoteUser"
                      :loading="loading"
                    /> -->
                  </el-form-item>
                </el-col>
                <el-col
                  :span="6"
                  v-if="
                    isUpdate &&
                    form.requestValidState == 'AVAIL' &&
                    form.requestFaultParam.taskSpecialityUserName
                  "
                >
                  <el-form-item label="转办人" prop="taskSpecialityUserName">
                    <el-select
                      v-model="form.requestFaultParam.taskSpecialityUserName"
                      multiple
                      disabled
                      placeholder=""
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>

                <el-col
                  :span="6"
                  v-if="
                    isUpdate &&
                    form.requestValidState == 'AVAIL' &&
                    form.requestFaultParam.seriousUserName
                  "
                >
                  <el-form-item label="升级人员" prop="seriousUserName">
                    <el-select
                      v-model="form.requestFaultParam.seriousUserName"
                      multiple
                      disabled
                      placeholder=""
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6" v-if="form.requestValidState == 'AVAIL'">
                  <el-form-item label="是否框架协议" prop="isOutlineAgreement">
                    <el-select
                      v-model="form.requestFaultParam.isOutlineAgreement"
                      placeholder="请选择是否框架协议"
                      :disabled="allDisabled"
                    >
                      <el-option
                        v-for="item in isAgreementOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="form.requestValidState == 'AVAIL'">
                  <el-form-item
                    label="SD服务编码"
                    prop="sdServiceCode"
                    v-if="form.requestFaultParam.isOutlineAgreement"
                  >
                    <el-input
                      v-model="form.requestFaultParam.sdServiceCode"
                      placeholder="请选择SD服务编码"
                      @focus="openFrameAgreement"
                      :disabled="allDisabled"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="openFrameAgreement"
                      ></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="6"
                  v-if="
                    showIsAgainDistribute &&
                    ((form.requestValidState == 'AVAIL' && isUpdate) ||
                      sourceRequestId)
                  "
                >
                  <el-form-item label="是否二次派工" prop="isAgainDistribute">
                    <el-select
                      v-model="form.requestFaultParam.isAgainDistribute"
                      placeholder="请选择是否二次派工"
                      :disabled="allDisabled"
                    >
                      <el-option
                        v-for="item in isAgreementOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="6"
                  v-if="
                    showRelOrderCode &&
                    (sourceRequestId ||
                      (form.requestValidState == 'AVAIL' && isUpdate))
                  "
                >
                  <el-form-item label="原工单编码" prop="relOrderCode">
                    <el-input
                      v-model="form.requestFaultParam.relOrderCode"
                      placeholder="请输入原工单编码"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>

                <el-col
                  :span="6"
                  v-if="
                    isUpdate &&
                    form.requestFaultParam.serviceCategory == 'BW' &&
                    form.requestValidState == 'AVAIL'
                  "
                >
                  <el-form-item label="市场反馈结果" prop="marketFeedback">
                    <el-select
                      v-model="form.marketFeedback"
                      placeholder=""
                      disabled
                    >
                      <el-option
                        v-for="item in marketFeedbackOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col
                  :span="6"
                  v-if="isUpdate && form.requestValidState == 'AVAIL'"
                >
                  <el-form-item label="备注说明" prop="remark">
                    <el-input
                      disabled
                      v-model="form.requestFaultParam.remark"
                      placeholder=""
                    />
                  </el-form-item>
                </el-col> -->
                <el-col :span="6" v-if="form.requestValidState == 'AVAIL'">
                  <el-form-item label="市场负责人" prop="marketChargeBy">
                    <el-select
                      v-model="form.marketChargeBy"
                      multiple
                      placeholder="请选择市场负责人"
                      @focus="
                        openPersonnelBindingDialog(
                          'marketChargeBy',
                          form.marketChargeBy
                        )
                      "
                      :disabled="submitState || allDisabled"
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="6">
                  <el-form-item prop="requiredMarketConfirm">
                    <el-button
                      @click="openSendMail"
                      plain
                      :type="form.requiredMarketConfirm ? 'warning' : ''"
                      >触发市场邮件</el-button
                    >
                  </el-form-item>
                </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="请求处理结果"
                    prop="processResult"
                    v-if="
                      actionType == 'WORK_ORDER' ||
                      !form.requestFaultParam.isDistribute
                    "
                  >
                    <el-input
                      v-model="form.processResult"
                      placeholder="请输入请求处理结果"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 12 }"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-card>
          <el-card v-if="form.serviceType === 'technology_consulting'">
            <div slot="header" class="clearfix">
              <span class="title">技术咨询</span>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="服务请求描述" prop="serviceDescription">
                  <el-input
                    v-model="form.serviceDescription"
                    placeholder="请输入请求描述"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 12 }"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="服务需求时间" prop="serviceRequiredTime">
                  <el-date-picker
                    v-model="form.serviceRequiredTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="紧急程度" prop="emergencyDegree">
                  <jereh-select
                    v-model="form.emergencyDegree"
                    filterable
                    ph="请选择紧急程度"
                    :dict="dict.type.itr_emergency_degree"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="请求属性" prop="requestValidState">
                  <el-select
                    v-model="form.requestValidState"
                    placeholder="请选择请求属性"
                    :disabled="allDisabled"
                  >
                    <el-option
                      v-for="item in requestPropertyOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="6"
                v-if="
                  !otherParamIsDistribute && form.requestValidState == 'AVAIL'
                "
              >
                <el-form-item label="是否派工" prop="isDistribute">
                  <el-select
                    v-model="form.requestOtherParam.isDistribute"
                    placeholder="请选择是否派工"
                    :disabled="submitState || allDisabled"
                  >
                    <el-option
                      v-for="item in isTaskOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="服务派工"
                  prop="engineerName"
                  v-if="
                    !otherParamIsDistribute &&
                    form.requestOtherParam.isDistribute
                  "
                >
                  <el-select
                    v-model="form.engineerName"
                    multiple
                    placeholder="请选择服务派工"
                    :disabled="submitState || allDisabled"
                    @focus="
                      openPersonnelBindingDialog(
                        'engineerName',
                        form.engineerName
                      )
                    "
                    ref="cascader"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item
                  label="是否完成"
                  prop="isComplete"
                  v-if="isUpdate"
                >
                  <el-select
                    v-model="form.isComplete"
                    placeholder="请选择是否完成"
                    :disabled="allDisabled"
                  >
                    <el-option
                      v-for="item in isFinishOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="请求处理结果"
                  prop="processResult"
                  v-if="
                    actionType == 'WORK_ORDER' ||
                    !form.requestOtherParam.isDistribute
                  "
                >
                  <el-input
                    v-model="form.processResult"
                    placeholder="请输入请求处理结果"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 12 }"
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row> </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="附件" prop="requestAttachment">
                  <FileUpload
                    :value="form.requestAttachment"
                    @input="accessoryFileUpload"
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
                    :disabled="allDisabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card v-if="form.serviceType === 'accessories_service'">
            <div slot="header" class="clearfix">
              <span class="title">配件服务</span>
            </div>
            <el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="服务请求描述" prop="serviceDescription">
                    <el-input
                      v-model="form.serviceDescription"
                      placeholder="请输入请求描述"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 12 }"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="服务需求时间" prop="serviceRequiredTime">
                    <el-date-picker
                      v-model="form.serviceRequiredTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="紧急程度" prop="emergencyDegree">
                    <jereh-select
                      v-model="form.emergencyDegree"
                      filterable
                      ph="请选择紧急程度"
                      :dict="dict.type.itr_emergency_degree"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="市场负责人" prop="marketChargeBy">
                    <el-select
                      v-model="form.marketChargeBy"
                      multiple
                      placeholder="请选择市场负责人"
                      @focus="
                        openPersonnelBindingDialog(
                          'marketChargeBy',
                          form.marketChargeBy
                        )
                      "
                      :disabled="submitState || allDisabled"
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label="是否派工"
                    prop="isDistribute"
                    v-if="!otherParamIsDistribute"
                  >
                    <el-select
                      v-model="form.requestOtherParam.isDistribute"
                      placeholder="请选择是否派工"
                      :disabled="submitState || allDisabled"
                    >
                      <el-option
                        v-for="item in isTaskOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="服务派工"
                    prop="engineerName"
                    v-if="
                      form.requestOtherParam.isDistribute &&
                      !otherParamIsDistribute
                    "
                  >
                    <el-select
                      v-model="form.engineerName"
                      multiple
                      placeholder="请选择服务派工"
                      :disabled="submitState || allDisabled"
                      @focus="
                        openPersonnelBindingDialog(
                          'engineerName',
                          form.engineerName
                        )
                      "
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="请求属性" prop="requestValidState">
                    <el-select
                      v-model="form.requestValidState"
                      placeholder="请选择请求属性"
                      :disabled="allDisabled"
                    >
                      <el-option
                        v-for="item in requestPropertyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="是否完成"
                    prop="isComplete"
                    v-if="isUpdate"
                  >
                    <el-select
                      v-model="form.isComplete"
                      placeholder="请选择是否完成"
                      :disabled="allDisabled"
                    >
                      <el-option
                        v-for="item in isFinishOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="请求处理结果"
                    prop="processResult"
                    v-if="
                      actionType == 'WORK_ORDER' ||
                      !form.requestOtherParam.isDistribute
                    "
                  >
                    <el-input
                      v-model="form.processResult"
                      placeholder="请输入请求处理结果"
                      :disabled="allDisabled"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 12 }"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="附件" prop="requestAttachment">
                    <FileUpload
                      :value="form.requestAttachment"
                      @input="accessoryFileUpload"
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
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="hideOrShowParts = false"
                    >隐藏</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="hideOrShowParts = true"
                    >展开</el-button
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-card
                  v-if="
                    form.serviceType === 'accessories_service' &&
                    hideOrShowParts
                  "
                >
                  <div slot="header" class="clearfix">
                    <span class="title">配件需求信息</span>
                  </div>
                  <el-row>
                    <el-button type="primary" size="mini" @click="openExcel"
                      >下载模板</el-button
                    >
                    <el-button type="primary" size="mini">上传附件</el-button>
                    <el-table :data="requestsList">
                      <el-table-column
                        align="center"
                        label="序号"
                        type="index"
                        width="50"
                      />
                      <el-table-column
                        align="center"
                        label="物料名称"
                        prop="materialName"
                      >
                        <template slot-scope="scope">
                          <el-input
                            type="text"
                            v-model="scope.row.materialName"
                            @focus="openMateriel(scope)"
                            :disabled="allDisabled"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="物料件号"
                        prop="materialCode"
                      >
                        <template slot-scope="scope">
                          <el-input
                            type="text"
                            v-model="scope.row.materialCode"
                            @focus="openMateriel(scope)"
                            :disabled="allDisabled"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="数量"
                        prop="number"
                      >
                        <template slot-scope="scope">
                          <el-input
                            type="text"
                            v-model="scope.row.number"
                            :disabled="allDisabled"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="单位"
                        prop="unitName"
                      >
                        <template slot-scope="scope">
                          <el-input
                            type="text"
                            v-model="scope.row.unitName"
                            :disabled="allDisabled"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="备注"
                        prop="remark"
                      >
                        <template slot-scope="scope">
                          <el-input
                            type="text"
                            v-model="scope.row.remark"
                            :disabled="allDisabled"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column align="center" width="240px">
                        <template slot="header" slot-scope="scope">
                          <el-button
                            type="text"
                            size="mini"
                            @click="requestsListPushList"
                            >新增</el-button
                          >
                        </template>
                        <template slot-scope="scope">
                          <el-button
                            type="text"
                            size="mini"
                            @click="remove(scope)"
                            >删除</el-button
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-card>
              </el-row>
            </el-row>
          </el-card>

          <el-card v-if="form.serviceType === 'training_service'">
            <div slot="header" class="clearfix">
              <span class="title">培训服务</span>
            </div>
            <el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="服务请求描述" prop="serviceDescription">
                    <el-input
                      v-model="form.serviceDescription"
                      placeholder="请输入服务请求描述"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 12 }"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="培训人数" prop="trainPersonNum">
                    <el-input
                      v-model="form.trainPersonNum"
                      placeholder="请输入培训人数"
                      :disabled="allDisabled"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="服务需求时间" prop="serviceRequiredTime">
                    <el-date-picker
                      v-model="form.serviceRequiredTime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择服务需求时间"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="培训地点" prop="trainSite">
                    <el-input
                      v-model="form.trainSite"
                      placeholder="请输入培训地点"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="紧急程度" prop="emergencyDegree">
                    <jereh-select
                      v-model="form.emergencyDegree"
                      filterable
                      ph="请选择紧急程度"
                      :dict="dict.type.itr_emergency_degree"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否质保期内" prop="isGuarantee">
                    <el-select
                      v-model="form.isGuarantee"
                      placeholder="是否质保期内"
                      :disabled="allDisabled"
                    >
                      <el-option
                        v-for="item in isGuaranteeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label="是否派工"
                    prop="isDistribute"
                    v-if="!otherParamIsDistribute"
                  >
                    <el-select
                      v-model="form.requestOtherParam.isDistribute"
                      placeholder="请选择是否派工"
                      :disabled="submitState || allDisabled"
                    >
                      <el-option
                        v-for="item in isTaskOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="服务派工"
                    prop="engineerName"
                    v-if="
                      form.requestOtherParam.isDistribute &&
                      !otherParamIsDistribute
                    "
                  >
                    <el-select
                      v-model="form.engineerName"
                      multiple
                      placeholder="请选择服务派工"
                      @focus="
                        openPersonnelBindingDialog(
                          'engineerName',
                          form.engineerName
                        )
                      "
                      :disabled="submitState || allDisabled"
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="是否框架协议" prop="isOutlineAgreement">
                    <el-select
                      v-model="form.requestOtherParam.isOutlineAgreement"
                      placeholder="请选择是否框架协议"
                      :disabled="allDisabled"
                    >
                      <el-option
                        v-for="item in isAgreementOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="6"
                  v-if="form.requestOtherParam.isOutlineAgreement"
                >
                  <el-form-item label="SD服务编码" prop="sdServiceCode">
                    <el-input
                      v-model="form.requestOtherParam.sdServiceCode"
                      placeholder="请选择SD服务编码"
                      @focus="openFrameAgreement"
                      :disabled="allDisabled"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="openFrameAgreement"
                      ></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="市场负责人" prop="marketChargeBy">
                    <el-select
                      v-model="form.marketChargeBy"
                      multiple
                      placeholder="请选择市场负责人"
                      @focus="
                        openPersonnelBindingDialog(
                          'marketChargeBy',
                          form.marketChargeBy
                        )
                      "
                      :disabled="submitState || allDisabled"
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6" v-if="isUpdate">
                  <el-form-item label="市场反馈结果" prop="marketFeedback">
                    <el-select
                      v-model="form.marketFeedback"
                      placeholder=""
                      disabled
                    >
                      <el-option
                        v-for="item in marketFeedbackOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                    <el-form-item prop="requiredMarketConfirm">
                      <el-button
                        @click="openSendMail"
                        plain
                        :type="form.requiredMarketConfirm ? 'warning' : ''"
                        >触发市场邮件</el-button
                      >
                    </el-form-item>
                  </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="附件" prop="requestAttachment">
                    <FileUpload
                      :value="form.requestAttachment"
                      @input="accessoryFileUpload"
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
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="请求处理结果"
                    prop="processResult"
                    v-if="
                      actionType == 'WORK_ORDER' ||
                      !form.requestOtherParam.isDistribute
                    "
                  >
                    <el-input
                      v-model="form.processResult"
                      placeholder="请输入请求处理结果"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 12 }"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-card>
          <el-card
            v-if="
              form.serviceType === 'framework_agreement' ||
              form.serviceType === 'rental_service' ||
              form.serviceType === 'other_service'
            "
          >
            <div slot="header" class="clearfix">
              <span class="title">{{
                getLabelByValue(form.serviceType, this.requestClassifyOptions)
              }}</span>
            </div>
            <el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="服务请求描述" prop="serviceDescription">
                    <el-input
                      v-model="form.serviceDescription"
                      placeholder="请输入服务请求描述"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 12 }"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="服务需求时间" prop="serviceRequiredTime">
                    <el-date-picker
                      v-model="form.serviceRequiredTime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择服务需求时间"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="紧急程度" prop="emergencyDegree">
                    <jereh-select
                      v-model="form.emergencyDegree"
                      filterable
                      ph="请选择紧急程度"
                      :dict="dict.type.itr_emergency_degree"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="市场负责人" prop="marketChargeBy">
                    <el-select
                      v-model="form.marketChargeBy"
                      multiple
                      placeholder="请选择市场负责人"
                      @focus="
                        openPersonnelBindingDialog(
                          'marketChargeBy',
                          form.marketChargeBy
                        )
                      "
                      :disabled="submitState || allDisabled"
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="请求属性"
                    prop="requestValidState"
                    v-if="
                      form.serviceType === 'framework_agreement' ||
                      form.serviceType === 'other_service'
                    "
                  >
                    <el-select
                      v-model="form.requestValidState"
                      placeholder="请选择请求属性"
                      :disabled="allDisabled"
                    >
                      <el-option
                        v-for="item in requestPropertyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="6"
                  v-if="
                    !(form.requestValidState === 'INVALID') &&
                    !(form.serviceType === 'rental_service') &&
                    !(form.serviceType === 'framework_agreement')
                  "
                >
                  <el-form-item
                    label="是否派工"
                    prop="isDistribute"
                    v-if="!otherParamIsDistribute"
                  >
                    <el-select
                      v-model="form.requestOtherParam.isDistribute"
                      placeholder="请选择是否派工"
                      :disabled="submitState || allDisabled"
                    >
                      <el-option
                        v-for="item in isTaskOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="服务派工"
                    prop="engineerName"
                    v-if="
                      form.requestOtherParam.isDistribute &&
                      !otherParamIsDistribute
                    "
                  >
                    <el-select
                      v-model="form.engineerName"
                      multiple
                      placeholder="请选择服务派工"
                      @focus="
                        openPersonnelBindingDialog(
                          'engineerName',
                          form.engineerName
                        )
                      "
                      :disabled="submitState || allDisabled"
                      ref="cascader"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="是否完成"
                    prop="isComplete"
                    v-if="form.serviceType === 'other_service' && isUpdate"
                  >
                    <el-select
                      v-model="form.isComplete"
                      placeholder="请选择是否完成"
                      :disabled="allDisabled"
                    >
                      <el-option
                        v-for="item in isFinishOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
								<el-form-item prop="requiredMarketConfirm">
									<el-button @click="openSendMail" plain :type="form.requiredMarketConfirm ? 'warning' : ''">触发市场邮件</el-button>
								</el-form-item>
							</el-col> -->
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="请求处理结果"
                    prop="processResult"
                    v-if="
                      actionType == 'WORK_ORDER' ||
                      !form.requestOtherParam.isDistribute
                    "
                  >
                    <el-input
                      v-model="form.processResult"
                      placeholder="请输入请求处理结果"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 12 }"
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="附件" prop="requestAttachment">
                    <FileUpload
                      :value="form.requestAttachment"
                      @input="accessoryFileUpload"
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
                      :disabled="allDisabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-card>
        </el-row>
      </el-form>
    </div>
    <SendMail
      :open="sendMailVisible"
      @closeDialog="colseSendMailDialog"
      @handleSuccess="giveSendMail"
    />
    <FrameAgreement
      :open="frameAgreementVisible"
      @closeDialog="colseFrameAgreementDialog"
      @handleSuccess="handleFrameAgreementSuccess"
    />
    <PersonnelBinding
      :open="personnelBindingVisible"
      :writeBack="writeBack"
      :selectOrRadio="selectOrRadio"
      @closeDialog="colsePersonnelBindingDialog"
      @bindingData="bindingData"
    />
    <MaterialNumberQuery
      :openMQ="openMaterialQueryDialog"
      @closeDialog="closeMaterialQueryDialog"
      @seletData="seletMaterialQueryData"
    />
    <RelatedEquipment
      :open="openRelatedEquipment"
      @closeDialog="colseRelatedEquipmentDialog"
      @selectData="selectData"
      :relatedEquipmentRadio="relatedEquipmentRadio"
    />
    <Coordinate
      ref="coordinateRef"
      @changePosition="changePosition"
      :visible="openCoordinate"
    />
    <el-dialog
      v-dialogDrag
      title="工单取消"
      :visible.sync="cencelWorkOrderDialog"
      width="30%"
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 12 }"
        placeholder="请输入工单取消的原因"
        v-model="cencelWorkOrderCause"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitCencelWorkOrderDialog"
          size="mini"
          >确定</el-button
        >
        <el-button @click="closeCencelWorkOrderDialog" size="mini"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SendMail from "@/components/SendMail/index.vue";
import FrameAgreement from "@/views/cmms/itr/components/FrameAgreement/index.vue";
import MaterialNumberQuery from "@/views/cmms/itr/service-task/work-order/components/MaterialNumberQuery.vue";
import Coordinate from "./components/Coordinate.vue";
import RelatedEquipment from "../device/components/RelatedEquipment.vue";
import {
  addRequest,
  updateRequest,
  submitRequest,
  rebackRequest,
  getRequest,
} from "@/api/cmms/itr/service-request/all-requests";
import {
  cancelOrder,
  addOrder,
  updateOrder,
  confirmOrder,
  confirmWorkOrder,
  cancelWorkOrder,
} from "@/api/cmms/itr/work-order/order.api.js";
import { remoteUser } from "@/api/system/user";
import { Message } from "element-ui";
import PersonnelBinding from "@/views/cmms/itr/components/PersonnelBinding/index.vue";

import {
  requestSource,
  whether,
  serviceType,
  requestProperty,
  marketFeedback,
  getLabelByValue,
} from "@/utils/dictionary-service";

import * as XLSX from "xlsx";

// let takeNotes = {}
export default {
  name: "RequestsEdit",
  dicts: [
    "itr_fault_level",
    "itr_influence_level",
    "itr_emergency_degree",
    "itr_service_category",
    "itr_service_source",
    "after_sale_area",
    "device_area",
  ],
  data() {
    return {
      loading: false,
      form: {},
      inps: [
        {
          description: "",
        },
      ],
      requestAttachmentList: [
        {
          image: "",
        },
      ],
      isUpdate: false,
      // 表单校验
      frameAgreementVisible: false,
      sendMailVisible: false,
      openRelatedEquipment: false,
      requestsList: [],
      requestClassifyOptions: serviceType(),
      requestPropertyOptions: requestProperty(),
      isTaskOptions: whether(),
      isGuaranteeOptions: whether(),
      isShowOptions: whether(),
      isSeriousOptions: whether(),
      isAgreementOptions: whether(),
      isFinishOptions: whether(),
      marketFeedbackOptions: marketFeedback(),
      value: "",
      hideOrShowParts: true,
      cencelWorkOrderDialog: false,
      cencelWorkOrderCause: "",
      rules: {
        clientName: {
          required: true,
          message: "客户名称不能为空",
          trigger: "blur",
        },
        contactUserName: {
          required: true,
          message: "报修人不能为空",
          trigger: "blur",
        },
        contactUserInfo: {
          required: true,
          message: "联系方式不能为空",
          trigger: "blur",
        },
        serviceType: {
          required: true,
          message: "服务类型不能为空",
          trigger: "blur",
        },
      },
      personnelBindingVisible: false,
      currentBindingName: "",
      writeBack: [],
      selectOrRadio: true,
      numberList: 0,
      openMaterialQueryDialog: false,
      openCoordinate: false,
      submitState: false,
      actionType: "REQUEST",
      sourceRequestId: "",
      allDisabled: false,
      closeAddDescriptionBtn: true,
      relatedEquipmentRadio: false,
      otherParamIsDistribute: 0,
      showIsAgainDistribute: false,
      showRelOrderCode: false,
    };
  },
  components: {
    Coordinate,
    FrameAgreement,
    SendMail,
    PersonnelBinding,
    MaterialNumberQuery,
    RelatedEquipment,
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
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    requestsType: {
      type: String,
      default: "ALL",
    },
    selectedServiceType: {
      type: String,
      default: "",
    },
  },
  created() {
    this.sourceRequestId = this.$route.query.sourceRequestId;
    const serviceType = this.$route.query.selectedServiceType;
    const actionType = this.$route.query.actionType;
    if (!this.sourceRequestId) {
      if (actionType) {
        this.actionType = actionType;
      }
      const id = this.$route.query.id;
      if (id) {
        this.isUpdate = true;
      } else {
        this.isUpdate = false;
      }
      let me = this;
      if (id) {
        getRequest(id, serviceType).then(function (resp) {
          const data = resp.data;
          if (data?.taskAssistUserName) {
            data.taskAssistUserName = data.taskAssistUserName.split(",");
          }
          if (data?.engineerName) {
            data.engineerName = data.engineerName.split(",");
          }
          if (data?.seriousUserName) {
            data.seriousUserName = data.seriousUserName.split(",");
          }
          if (data?.taskSpecialityUserName) {
            data.taskSpecialityUserName =
              data.taskSpecialityUserName.split(",");
          }
          if (data?.marketChargeBy && typeof data.marketChargeBy === "string") {
            data.marketChargeBy = data.marketChargeBy.split(",");
          }
          if (data?.serviceDescriptionList?.length) {
            me.inps = [];
            data.serviceDescriptionList.forEach((item, index) => {
              me.inps.push({
                description: item,
              });
              me.requestAttachmentList.push({});
            });
          }
          if (data?.requestAttachmentList?.length) {
            me.requestAttachmentList = [];
            data.requestAttachmentList.forEach((item, index) => {
              me.requestAttachmentList.push({
                image: item,
              });
            });
          }
          if (data?.engineerName && me.isUpdate) {
            me.allDisabled = true;
            if (data?.otherDetailVo?.isDistribute) {
              me.otherParamIsDistribute = data.otherDetailVo.isDistribute;
            }
          }
          if (data?.faultDetailVo.isAgainDistribute) {
            me.showIsAgainDistribute = true;
          }
          if (data?.faultDetailVo.relOrderCode) {
            me.showRelOrderCode = true;
          }
          me.form = data;
          me.form.requestFaultParam = data.faultDetailVo;
          me.form.requestOtherParam = data.otherDetailVo;
          me.form.serviceType = serviceType;
          me.requestsList = data.serviceRequestMaterialVos;
          debugger;
          if (!me.form.requestFaultParam) {
            me.form.requestFaultParam = {};
          }
          if (!me.form.requestOtherParam) {
            me.form.requestOtherParam = {};
          }
          if (data?.faultDetailVo?.isDistribute && me?.isUpdate) {
            me.submitState = true;
          }
          delete data.faultDetailVo;
          delete data.otherDetailVo;
          if (
            me.form?.qualityExpirationDate &&
            !me.form.requestFaultParam.serviceCategory
          ) {
            let currentItemTime = new Date(
              me.form.qualityExpirationDate
            ).getTime();
            let toDayTime = new Date().getTime();
            if (toDayTime > currentItemTime) {
              me.$set(me.form.requestFaultParam, "serviceCategory", "BW");
            }
          }
        });
      } else {
        this.initData();
        this.form.serviceType = serviceType;
      }
    } else {
      if (actionType) {
        this.actionType = actionType;
      }
      getRequest(this.sourceRequestId, serviceType).then((resp) => {
        this.isUpdate = false;
        delete resp.data.id;
        delete resp.data.state;
        const data = resp.data;
        delete data.taskAssistUserName;
        delete data.engineerName;
        if (data?.seriousUserName) {
          data.seriousUserName = data.seriousUserName.split(",");
        }
        if (data?.taskSpecialityUserName) {
          data.taskSpecialityUserName = data.taskSpecialityUserName.split(",");
        }
        if (data?.marketChargeBy && typeof data.marketChargeBy === "string") {
          data.marketChargeBy = data.marketChargeBy.split(",");
        }
        if (data?.serviceDescriptionList?.length) {
          this.inps = [];
          data.serviceDescriptionList.forEach((item, index) => {
            this.inps.push({
              description: item,
            });
            this.requestAttachmentList.push();
          });
        }
        if (data?.requestAttachmentList?.length) {
          this.requestAttachmentList = [];
          data.requestAttachmentList.forEach((item, index) => {
            this.requestAttachmentList.push({
              image: item,
            });
          });
        }
        this.form = data;
        this.form.requestFaultParam = data.faultDetailVo;
        this.form.requestOtherParam = data.otherDetailVo;
        this.form.serviceType = serviceType;
        this.requestsList = data.serviceRequestMaterialVos;
        if (!this.form.requestFaultParam) {
          this.form.requestFaultParam = {};
        }
        if (!this.form.requestOtherParam) {
          this.form.requestOtherParam = {};
          this.form.requestFaultParam.relOrderCode = this.form.workOrderCode;
          this.form.requestFaultParam.isAgainDistribute = 1;
        }
        if (data?.faultDetailVo?.isDistribute && this.isUpdate) {
          this.submitState = true;
        }
        delete data.faultDetailVo;
        delete data.otherDetailVo;
        if (
          this.form?.qualityExpirationDate &&
          !this.form.requestFaultParam.serviceCategory
        ) {
          let currentItemTime = new Date(
            this.form.qualityExpirationDate
          ).getTime();
          let toDayTime = new Date().getTime();
          if (toDayTime > currentItemTime) {
            this.$set(this.form.requestFaultParam, "serviceCategory", "BW");
          }
        }
      });
    }
    if (!this.isUpdate) {
      this.form.askUserName = this.$store.state.user.nickName;
      this.form.askUserInfo = this.$store.state.user.phonenumber;
    }
    this.$forceUpdate();
  },
  mounted() {},
  methods: {
    comeBack() {
      this.$router.back();
    },
    getLabelByValue(value, arr) {
      return getLabelByValue(value, arr);
    },
    deletedInput(item, index) {
      let i = this.inps.length;
      var index = this.inps.indexOf(item);
      if (i > 1) {
        if (index !== -1) {
          this.inps.splice(index, 1);
          this.requestAttachmentList.splice(index, 1);
        }
      }
    },
    addInput() {
      this.inps.push({
        description: "",
      });
      this.requestAttachmentList.push({
        image: "",
      });
    },
    openFrameAgreement() {
      this.frameAgreementVisible = true;
    },
    colseFrameAgreementDialog(value) {
      this.frameAgreementVisible = value;
    },
    handleFrameAgreementSuccess(value) {
      if (this.form.serviceType === "malfunction_repair") {
        this.form.requestFaultParam.sdServiceCode = value.serviceCode;
      } else {
        this.form.requestOtherParam.sdServiceCode = value.serviceCode;
      }
    },
    openRelatedEquipmentDialog() {
      this.openRelatedEquipment = true;
    },
    colseRelatedEquipmentDialog(value) {
      this.openRelatedEquipment = value;
    },
    selectData(value) {
      this.form = Object.assign({}, this.form, {
        ...value,
      });
      if (this.form.productCode.split(",").length > 1) {
        this.closeAddDescriptionBtn = false;
      } else {
        this.closeAddDescriptionBtn = true;
      }
      console.log(this.closeAddDescriptionBtn);
    },

    //todo 选取设备后，需要调用设备接口， 获取以下信息。
    equipment() {
      this.form.clientName = "西钻";
      this.form.productName = "压裂车";
      this.form.productBrand = "杰瑞";
      this.form.projectCode = "81W123";
      this.form.productPattern = "17WX112";
      this.form.qualityEndDate = "2022-12-30";
      this.form.marketArea = "中东";
      this.form.afterSaleArea = "中东大区";
      this.form.serviceJobsite = "中东大区";
    },

    initData() {
      this.form = {
        serviceDescription: null,
        requestFaultParam: {
          isDistribute: 0,
        },
        requestOtherParam: {
          isDistribute: 0,
        },
        isShow: 0,
        requestValidState: "AVAIL",
      };
    },
    openSendMail() {
      this.sendMailVisible = true;
    },
    requestsListPushList() {
      this.requestsList.push({
        id: this.form.id,
      });
    },
    colseSendMailDialog(value) {
      this.sendMailVisible = value;
      if (this.form.requestFaultParam.faultLevel === "MAJOR") {
        this.$router.back();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (
            this.form.isGuarantee === 0 &&
            this.form.serviceType === "training_service"
          ) {
            if (this.form.requestOtherParam.isOutlineAgreement === undefined) {
              return this.$message.error("请选择框架协议");
            }
            if (
              this.form.requestOtherParam.isDistribute &&
              !(this.form.marketFeedback === 1) &&
              !this.form.requestOtherParam.isOutlineAgreement
            ) {
              return this.$message.error("待市场确认");
            }
          }
          if (
            this.form.serviceType === "malfunction_repair" &&
            (this.form.requestFaultParam.serviceCategory === "WX" ||
              this.form.requestFaultParam.serviceCategory === "BW")
          ) {
            if (
              !this.form.requestFaultParam.isOutlineAgreement &&
              !(this.form.marketFeedback === 1)
            ) {
              return this.$message.error("待市场确认");
            }
          }
          this.currentMarketChargeByState();
          this.personalHandle();
          this.form.serviceRequestMaterialUpdateParamList = this.requestsList;
          if (this.form.serviceType === "malfunction_repair") {
            this.form.serviceDescriptionList = this.inps.map((item) => {
              return item.description;
            });
            this.form.requestAttachmentList = this.requestAttachmentList.map(
              (item) => {
                return item.image;
              }
            );
          }
          await submitRequest(this.form)
            .then((res) => {
              Message.success(res.msg);
              // if (this.form.requestFaultParam.faultLevel == "MAJOR") {
              //   this.openSendMail();
              // } else {
              //   this.$router.go(-1);
              // }
              this.$router.go(-1);
            })
            .finally(() => {
              this.personalHandleInit();
            });
          this.$emit("handleSuccess", this.form, this.isUpdate);
          this.$emit("closeDialog", false);
          this.$refs[formName].clearValidate();
        } else {
          return false;
        }
      });
    },
    saveForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.currentMarketChargeByState();
          this.personalHandle();
          this.form.serviceRequestMaterialUpdateParamList = this.requestsList;
          if (this.form.serviceType === "malfunction_repair") {
            this.form.serviceDescriptionList = this.inps.map((item) => {
              return item.description;
            });
            this.form.requestAttachmentList = this.requestAttachmentList.map(
              (item) => {
                return item.image;
              }
            );
          }
          if (!this.isUpdate) {
            await addRequest(this.form)
              .then((res) => {
                if (res.code === 200) {
                  Message.success("保存成功");
                  // this.form.id = res.data;
                  // this.isUpdate = true;
                  this.$router.go(-1);
                  setTimeout(() => {
                    this.$router.push({
                      path: "/request/requests-edit/index",
                      query: {
                        id: res.data,
                        selectedServiceType: this.form.serviceType,
                      },
                    });
                  }, 300);
                } else {
                  Message.error("保存失败" + res.msg);
                }
              })
              .finally(() => {
                this.personalHandleInit();
              });
          } else {
            if (!this.form?.id) {
              this.form.id = this.$route.query.id;
            }
            await updateRequest(this.form)
              .then((res) => {
                Message.success(res.msg);
                // this.$router.go(-1);
              })
              .finally(() => {
                this.personalHandleInit();
              });
          }
          this.$emit("handleSuccess", this.form, this.isUpdate);
          this.$emit("closeDialog", false);
          this.$refs[formName].clearValidate();
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$emit("closeDialog", false);
      this.initData();
    },
    remove(value) {
      this.requestsList.splice(value.$index, 1);
    },
    colsePersonnelBindingDialog(value) {
      this.personnelBindingVisible = value;
    },
    openPersonnelBindingDialog(value, item) {
      if (value === "seriousUserName" || value === "taskAssistUserName") {
        this.selectOrRadio = false;
      } else {
        this.selectOrRadio = true;
      }

      this.currentBindingName = value;
      if (item) {
        this.writeBack = item;
      }
      // -------下拉框不出现options---------
      if (this.$refs.cascader) {
        this.$refs.cascader.visible = false;
      }
      // ----------------------------------
      this.personnelBindingVisible = true;
    },
    reback() {
      rebackRequest().then((res) => {
        Message.success(res.msg);
        this.$emit("closeDialog", false);
      });
    },
    bindingData(value) {
      //   debugger;
      this.$refs.form.clearValidate(this.currentBindingName);
      const formVals = this.currentBindingName.split(".");
      let selectedValues = value;
      if (value.length) {
        selectedValues = value.map((item) => {
          return item.nickName;
        });
      }
      if (formVals.length > 1) {
        this.form[formVals[0]][formVals[1]] = selectedValues;
      } else {
        this.form[formVals[0]] = selectedValues;
      }
      if (this.currentBindingName == "engineerName") {
        this.form["engineerId"] = value
          .map((item) => {
            return item.userName;
          })
          .join(",");
      }
      if (this.currentBindingName == "taskAssistUserName") {
        this.form["taskAssistUserId"] = value
          .map((item) => {
            return item.userName;
          })
          .join(",");
      }
    },
    giveSendMail(value) {
      this.form.requiredMarketConfirm = value;
      this.colseSendMailDialog();
    },
    openMateriel(scope) {
      this.numberList = scope.$index;
      this.openMaterialQueryDialog = true;
    },
    closeMaterialQueryDialog(value) {
      this.openMaterialQueryDialog = value;
    },
    seletMaterialQueryData(value) {
      this.$set(
        this["requestsList"][this.numberList],
        "materialCode",
        value.materialCode
      );
      this.$set(
        this["requestsList"][this.numberList],
        "materialName",
        value.materialName
      );
    },
    openExcel() {
      this.leadingOutXlsx();
    },
    changeCoordinate() {
      // this.openCoordinate =true;
      this.$refs.coordinateRef.edit();
    },
    changePosition(e) {
      this.form.serviceJobsite = e.address;
      this.form.placeLongitude = e.lng;
      this.form.placeLatitude = e.lat;
      this.$forceUpdate();
    },
    leadingOutXlsx() {
      var data1 = [
        ["id", "name", "value"],
        [1, "sheetjs", 7262],
        [2, "js-xlsx", 6969],
      ];

      var data2 = [
        {
          周一: "语文",
          周二: "数学",
          周三: "历史",
          周四: "政治",
          周五: "英语",
        },
      ];

      //1. 新建一个工作簿
      let workbook = XLSX.utils.book_new();
      //2. 生成一个工作表，
      //2.1 aoa_to_sheet 把数组转换为工作表
      let sheet1 = XLSX.utils.aoa_to_sheet(data1);
      //2.2 把json对象转成工作表
      let sheet2 = XLSX.utils.json_to_sheet(data2);
      //3.在工作簿中添加工作表
      XLSX.utils.book_append_sheet(workbook, sheet1, "sheetName1"); //工作簿名称
      // XLSX.utils.book_append_sheet(workbook, sheet2, "sheetName2"); //工作簿名称
      // XLSX.utils.sheet_add_json(sheet1,data2);//把已存在的sheet中数据替换成json数据
      //4.输出工作表,由文件名决定的输出格式
      XLSX.writeFile(workbook, "workBook1.xlsx"); // 保存的文件名
    },
    // typeSet() {
    //   debugger;
    //   if (this.isUpdate == false) {
    //     // this.form.serviceType = this.selectedServiceType;
    //     // this.$forceUpdate();
    //     // console.log(this.form.serviceType);
    //   }
    // },
    remoteUser(query) {
      if (query !== "") {
        this.loading = true;
        remoteUser({
          searchValue: query,
        }).then((res) => {
          this.loading = false;
          this.researchUserOptions = res.data;
          this.testUserOptions = res.data;
          this.bazaarUserOptions = res.data;
          this.deliveryUserOptions = res.data;
          this.userList = res.data;
        });
      } else {
        this.options = [];
      }
    },
    accessoryFileUpload(value) {
      this.form.requestAttachment = value;
    },
    currentMarketChargeByState() {
      if (
        this.form?.marketChargeBy &&
        !(typeof this.form?.marketChargeBy === "string")
      ) {
        this.form.marketChargeBy = this.form.marketChargeBy.join(",");
      }
    },
    personalHandle() {
      if (this.form.engineerName) {
        this.form["engineerName"] = this.form["engineerName"]
          .map((item) => {
            return item;
          })
          .join(",");
      }
      if (this.form.taskAssistUserName) {
        this.form["taskAssistUserName"] = this.form["taskAssistUserName"]
          .map((item) => {
            return item;
          })
          .join(",");
      }
    },
    personalHandleInit() {
      if (this.form.engineerName) {
        this.$set(
          this.form,
          "engineerName",
          this.form["engineerName"].split(",")
        );
      }
      if (this.form.taskAssistUserName) {
        this.$set(
          this.form,
          "taskAssistUserName",
          this.form["taskAssistUserName"].split(",")
        );
      }
      if (this.form.marketChargeBy) {
        this.$set(
          this.form,
          "marketChargeBy",
          this.form["marketChargeBy"].split(",")
        );
      }
    },
    async confirmationWorkOrder() {
      let params = {
        workOrderId: this.form.workOrderId,
        serviceRequestId: this.form.id,
      };
      await confirmWorkOrder(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("工单确认成功");
          this.$router.back();
        }
      });
    },
    cencelWorkOrder() {
      this.cencelWorkOrderDialog = true;
    },
    async submitCencelWorkOrderDialog() {
      let params = {
        workOrderId: this.form.workOrderId,
        serviceRequestId: this.form.id,
        remark: this.cencelWorkOrderCause,
      };
      if (this.cencelWorkOrderCause) {
        await cancelWorkOrder(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("工单取消成功");
            this.cencelWorkOrderDialog = false;
            this.$router.back();
          }
        });
      } else {
        this.$message.error("请输入工单取消的原因");
      }
    },
    closeCencelWorkOrderDialog() {
      this.cencelWorkOrderDialog = false;
    },
    secondaryAssignment() {
      this.$router.back();
      setTimeout(() => {
        this.$router.push({
          path: "/request/requests-edit/index",
          query: {
            sourceRequestId: this.form.id,
            selectedServiceType: this.form.serviceType,
          },
        });
      }, 100);
    },
    changeServiceType(value) {
      this.$forceUpdate();
      // this.$set(this.form, "serviceType", value);
    },
  },
  watch: {
    inps: {
      handler(newValue) {
        if (newValue.length > 1) {
          this.relatedEquipmentRadio = true;
        } else {
          this.relatedEquipmentRadio = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.servicTitle {
  font-weight: 800;
  font-size: 20px;
}
.drawer-box {
  .title {
    margin: 10px 0;
    text-align: center;
    font-size: 20px;
    color: #000;
  }
  .requirement-button-group {
    position: relative;
    height: 36px;
    .requirement-button {
      position: absolute;
      right: 0;
    }
  }
}
.dialog-footer {
  position: relative;
  height: 28px;
  .back {
    position: absolute;
    right: 0;
  }
}
.footer {
  // height: 50px;
  // position: relative;
  .footer-btn {
    // position: fixed;
    background: #fff;
    // bottom: 0;
    height: 50px;
    // box-shadow: 1px 1px 10px #ccc;
    width: 100%;
    // display: flex;
  }
}
.flex-int-add-btn {
  display: flex;
  align-items: center;
  .button-group {
    width: 150px;
  }
}
.clearfix {
  position: relative;
  .clearfix-right {
    position: absolute;
    right: 0;
    top: 0;
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
