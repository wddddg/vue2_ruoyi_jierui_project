<template>
  <el-drawer
    :title="title"
    :visible="open"
    direction="rtl"
    size="80%"
    append-to-body
    @close="closeDialog"
    :with-header="false"
  >
    <div class="drawer-content" v-if="open" id="printArea">
      <!-- 工单信息 -->
      <div>
        <el-card class="box-card">
          <div slot="header" class="question">
            <div>{{ form.workOrderCode || null }}的问题处理工单信息</div>
            <div style="font-size: 14px">
              时间：{{ formatDate(new Date()) }}
            </div>
          </div>
          <el-card class="box-card">
            <!-- :style="{ marginRight: showStep == true ? '250px' : '0px' }" -->
            <div class="question-content">
              <div style="text-align: center">
                <div class="workOrder">
                  <div
                    style="
                      font-size: 14px;
                      color: #606266;
                      font-weight: bold;
                      margin-right: 5px;
                      text-align: left;
                    "
                  >
                    工单编码:
                  </div>
                  {{ form.workOrderCode || "" }}
                </div>
                <el-image
                  style="width: 100px; height: 100px"
                  src="https://gd-hbimg.huaban.com/07c6686e680086ee3c92eb48e10df3325832fac568d-uvzROb_fw658"
                  fit="cover"
                ></el-image>
              </div>
              <div class="topDiv">
                <el-row>
                  <el-row>
                    <el-col :span="16">
                      <div>
                        <span class="top-div-title">故障描述: </span>
                        <span class="info">{{ form.serviceDescription }}</span>
                      </div>
                    </el-col>
                    <!-- <el-col :span="8" style="text-align: right">
                 <el-button type="primary" plain @click="handlePrint"
                   >工单预览/打印</el-button
                 >
               </el-col> -->
                  </el-row>
                  <el-row>
                    <el-col :span="16">
                      <div>
                        <span class="top-div-title">工单状态: </span>
                        <span class="info">{{
                          workOrderStateCode(form.state)
                        }}</span>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">产品名称: </span>
                        <span class="info">{{ form.productName }}</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">项目编码: </span>
                        <span class="info">{{ form.projectCode }}</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">项目编码分项:</span>
                        <span class="info">{{ form.projectCodeSubentry }}</span>
                      </div>
                    </el-col>

                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">产品编号: </span>
                        <span class="info">{{ form.productCode }}</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">车牌号: </span>
                        <span class="info">{{ form.licenseNumber }}</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="flex-box">
                        <span class="top-div-title">紧急程度: </span>
                        <span class="info">
                          <dict-tag
                            :options="dict.type.itr_emergency_degree"
                            :value="form.emergencyDegree"
                          />
                        </span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="flex-box">
                        <span class="top-div-title">售后区域: </span>
                        <span class="info">
                          <dict-tag
                            :options="dict.type.after_sale_area"
                            :value="form.afterSaleArea"
                          />
                        </span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">市场负责人: </span>
                        <span class="info">{{ form.marketChargeBy }}</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">问题处理人:</span>
                        <span class="info">{{ form.engineerName }}</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">服务需求时间:</span>
                        <span class="info">{{ form.serviceRequiredTime }}</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">创建时间: </span>
                        <span class="info">{{ form.createTime }}</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <span class="top-div-title">派工时间: </span>
                        <span class="info">{{ form.createTime }}</span>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-card>
      </div>
      <!-- 设备信息 -->
      <el-card class="box-card">
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <div class="title">设备信息</div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="服务类别" prop="serviceCategory">
                  <!-- <jereh-select
                    v-model="form.serviceCategory"
                    filterable
                    ph="请选择服务类别"
                    :dict="dict.type.itr_service_category"
                    disabled
                  /> -->
                  <dict-tag
                    :options="dict.type.itr_service_category"
                    :value="form.serviceCategory"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目编码" prop="projectCode">
                  <!-- <el-input
                    v-model="form.projectCode"
                    disabled
                    maxlength="30"
                  /> -->
                  {{ form.projectCode }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目编码分项" prop="projectCodeSubentry">
                  <!-- <el-input
                    v-model="form.projectCodeSubentry"
                    disabled
                    maxlength="30"
                  /> -->
                  {{ form.projectCodeSubentry }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品编号" prop="productCode">
                  <!-- <el-input
                    v-model="form.productCode"
                    disabled
                    maxlength="11"
                  /> -->
                  {{ form.productCode }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="产品名称" prop="productName">
                  <!-- <el-input
                    v-model="form.productName"
                    disabled
                    maxlength="11"
                  /> -->
                  {{ form.productName }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品型号" prop="productModel">
                  <!-- <el-input
                    v-model="form.productModel"
                    disabled
                    maxlength="50"
                  /> -->
                  {{ form.productModel }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品品牌" prop="productBrand">
                  <!-- <el-input
                    v-model="form.productBrand"
                    disabled
                    maxlength="30"
                  /> -->
                  {{ form.productBrand }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="底盘VIN码" prop="chassisVin">
                  <!-- <el-input v-model="form.chassisVin" disabled maxlength="30" /> -->
                  {{ form.chassisVin }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称" prop="clientName">
                  <!-- <el-input v-model="form.clientName" disabled maxlength="50" /> -->
                  {{ form.clientName }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="现场联系人" prop="contactUserName">
                  <!-- <el-input
                    v-model="form.contactUserName"
                    disabled
                    maxlength="50"
                  /> -->
                  {{ form.contactUserName }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系方式" prop="contactUserInfo">
                  <!-- 选择 -->
                  <!-- <el-input
                    v-model="form.contactUserInfo"
                    disabled
                    maxlength="50"
                  /> -->
                  {{ form.contactUserInfo }}
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-col :span="6">
            <el-form-item label="设备地点" prop="eqpPlace">
              <el-input v-model="form.eqpPlace" disabled maxlength="50" />
            </el-form-item>
          </el-col> -->
            <el-row>
              <el-col :span="6">
                <el-form-item label="售后区域" prop="afterSaleArea">
                  <!-- <jereh-select
                    v-model="form.afterSaleArea"
                    filterable
                    ph="请选择售后区域"
                    :dict="dict.type.after_sale_area"
                  /> -->
                  <dict-tag
                    :options="dict.type.after_sale_area"
                    :value="form.afterSaleArea"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="市场区域" prop="marketArea">
                  <!-- <el-input v-model="form.marketArea" disabled maxlength="50" /> -->
                  <!-- <jereh-select
                    v-model="form.marketArea"
                    filterable
                    ph="请选择市场区域"
                    :dict="dict.type.device_area"
                  /> -->
                  <dict-tag
                    :options="dict.type.device_area"
                    :value="form.marketArea"
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
          <el-form-item label="销售工程师" prop="saleUser">
            <el-input v-model="form.saleUser" disabled maxlength="50" />
          </el-form-item>
        </el-col> -->
              <el-col :span="6">
                <el-form-item label="市场负责人" prop="marketChargeBy">
                  <!-- <el-input
                    v-model="form.marketChargeBy"
                    placeholder=""
                    disabled
                    maxlength="50"
                  /> -->
                  {{ form.marketChargeBy }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="转办请求人" prop="taskSpecialityFrom">
                  <!-- <el-input
                    v-model="form.taskSpecialityFrom"
                    placeholder=""
                    maxlength="50"
                    disabled
                  /> -->
                  {{ form.taskSpecialityFrom }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="车牌号" prop="licenseNumber">
                  <!-- <el-input
                    v-model="form.licenseNumber"
                    placeholder="请输入"
                    maxlength="50"
                    disabled
                  /> -->
                  {{ form.licenseNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="台上发动机小时数"
                  prop="engineUseTime"
                  label-width="130px"
                >
                  <!-- <el-input
                    v-model="form.engineUseTime"
                    placeholder="请输入"
                    maxlength="50"
                    disabled
                  /> -->
                  {{ form.engineUseTime }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="底盘行驶里程" prop="chassisMileage">
                  <!-- <el-input
                    v-model="form.chassisMileage"
                    placeholder="请输入"
                    maxlength="50"
                    disabled
                  /> -->
                  {{ form.chassisMileage }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否有框架协议" prop="isOutlineAgreement">
                  <!-- <el-select
                    v-model="form.isOutlineAgreement"
                    placeholder=""
                    disabled
                  >
                    <el-option
                      v-for="item in isTureOrFalse"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select> -->
                  {{ form.isOutlineAgreement ? "是" : "否" }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="质保终止日期" prop="qualityExpirationDate">
                  <!-- <el-input
                    v-model="form.qualityExpirationDate"
                    maxlength="50"
                    disabled
                  /> -->
                  {{ form.qualityExpirationDate }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="服务地点" prop="serviceJobsite">
                  <!-- <el-input
                    v-model="form.serviceJobsite"
                    maxlength="50"
                    disabled
                  /> -->
                  {{ form.serviceJobsite }}
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="服务需求时间" prop="serviceRequiredTime">
                  <el-input
                    v-model="form.serviceRequiredTime"
                    maxlength="50"
                    disabled
                  />
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="服务记录" prop="mileage">
                  <!-- <el-input v-model="form.mileage" maxlength="50" disabled /> -->
                  {{ form.mileage }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="basidRemark">
                  备注：故障涉及发动机、变速箱、柱塞泵或者其他关键总成件时需要将相关信息输入并在问题信息里面上传相关的铭牌信息
                </div>
              </el-col>
            </el-row>
          </el-row>
          <div class="tableTitle">
            <div class="tt">
              关键物料更换信息
              <div class="Remark" style="font-weight: 400">
                ☆关键部件更换以后，需要在设备360中更改部件信息，请点击右侧按钮进行信息的更新维护，谢谢！
              </div>
            </div>
          </div>
          <el-row>
            <el-table :data="form.deviceInfoList" :row-key="getRowKeys">
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
                  <!-- <el-input
                    type="text"
                    v-model="scope.row.materialCode"
                    disabled
                  /> -->
                  {{ scope.row.materialCode }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="数量" prop="number">
                <template slot-scope="scope">
                  <!-- <el-input type="text" :value="scope.row.number" disabled /> -->
                  {{ scope.row.number }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="物料描述"
                prop="materialName"
              >
                <template slot-scope="scope">
                  <!-- <el-input
                    type="text"
                    v-model="scope.row.materialName"
                    disabled
                  /> -->
                  {{ scope.row.materialName }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="型号信息"
                prop="materialModel"
              >
                <template slot-scope="scope">
                  <!-- <el-input
                    type="text"
                    v-model="scope.row.materialModel"
                    disabled
                  /> -->
                  {{ scope.row.materialModel }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="关键物料" prop="isKey">
                <template slot-scope="scope">
                  <!-- <el-input type="text" v-model="scope.row.isKey" /> -->
                  <!-- <el-select v-model="scope.row.isKey" placeholder="" disabled>
                    <el-option
                      v-for="item in isTureOrFalse"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select> -->
                  {{ scope.row.isKey ? "是" : "否" }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="序列号" prop="serialNo">
                <template slot-scope="scope">
                  <!-- <el-input type="text" v-model="scope.row.serialNo" disabled /> -->
                  {{ scope.row.serialNo }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="铭牌信息"
                prop="attachment"
              >
                <template slot-scope="scope">
                  <!-- <el-input
                    type="text"
                    v-model="scope.row.attachment"
                    disabled
                  /> -->
                  {{ scope.row.attachment }}
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </el-card>
      <!-- 故障信息 -->
      <el-card>
        <el-form
          ref="QuestionInfoData"
          :model="QuestionInfoData"
          label-width="120px"
        >
          <div class="title">故障信息</div>

          <el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="请求编码" prop="serviceRequestCode">
                  <!-- <el-input
                    v-model="QuestionInfoData.serviceRequestCode"
                    disabled
                    placeholder=""
                    maxlength="30"
                  /> -->
                  {{ QuestionInfoData.serviceRequestCode }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="工单编码" prop="workOrderCode">
                  <!-- <el-input
                    v-model="QuestionInfoData.workOrderCode"
                    disabled
                    placeholder=""
                    maxlength="30"
                  /> -->
                  {{ QuestionInfoData.workOrderCode }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="紧急程度" prop="emergencyDegree">
                  <!-- <jereh-select
                    v-model="QuestionInfoData.emergencyDegree"
                    filterable
                    disabled
                    ph=""
                    :dict="dict.type.itr_emergency_degree"
                  /> -->
                  <dict-tag
                    :options="dict.type.itr_emergency_degree"
                    :value="QuestionInfoData.emergencyDegree"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="方案制定流程" prop="flowPathCode">
                  <!-- <el-input
                    v-model="QuestionInfoData.flowPathCode"
                    disabled
                    placeholder=""
                    maxlength="11"
                  /> -->
                  {{ QuestionInfoData.flowPathCode }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="故障描述" prop="serviceDescription">
                  <!-- <el-input
                    v-model="QuestionInfoData.serviceDescription"
                    placeholder=""
                    maxlength="30"
                    disabled
                  /> -->
                  {{ QuestionInfoData.serviceDescription }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="故障代号" prop="serviceDescription">
                  <!-- <el-input
                    v-model="QuestionInfoData.serviceDescriptionCode"
                    placeholder=""
                    maxlength="30"
                    disabled
                  /> -->
                  {{ QuestionInfoData.serviceDescriptionCode }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="故障类型" prop="faultType">
                  <!-- <jereh-select
                    v-model="QuestionInfoData.faultType"
                    filterable
                    ph="请选择"
                    :dict="dict.type.itr_fault_type"
                    disabled
                  /> -->
                  <dict-tag
                    :options="dict.type.itr_fault_type"
                    :value="QuestionInfoData.faultType"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="类型细分" prop="faultSubType">
                  <!-- <el-select
                    v-model="QuestionInfoData.faultSubType"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="item in issueSubTypeOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select> -->
                  {{ issueSubTypeOptionsLabel(QuestionInfoData.faultSubType) }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="故障等级" prop="faultLevel">
                  <!-- <jereh-select
                    v-model="QuestionInfoData.faultLevel"
                    filterable
                    ph=""
                    :dict="dict.type.itr_fault_level"
                    disabled
                  /> -->
                  <dict-tag
                    :options="dict.type.itr_fault_level"
                    :value="QuestionInfoData.faultLevel"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户服务单号" prop="serviceResultCode">
                  <!-- <el-input
                    v-model="QuestionInfoData.serviceResultCode"
                    placeholder=""
                    maxlength="30"
                    disabled
                  /> -->
                  {{ QuestionInfoData.serviceResultCode }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="详情描述" prop="workOrderDescription">
                  <!-- <el-input
                    v-model="QuestionInfoData.workOrderDescription"
                    placeholder="请输入详情描述"
                    type="textarea"
                    :rows="2"
                    disabled
                  /> -->
                  {{ QuestionInfoData.workOrderDescription }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="问题照片" prop="malfunctionImage">
                  <div v-if="QuestionInfoData.malfunctionImage">
                    <ImagePreview
                      :width="100"
                      :height="100"
                      v-for="(
                        item, index
                      ) in QuestionInfoData.malfunctionImage.split(',')"
                      :key="index"
                      :src="item"
                      style="margin-right: 10px"
                    />
                  </div>
                  <!-- <FileUpload
                    :isShowTip="false"
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
                  /> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="原因类型" prop="reasonType">
                  <!-- <jereh-select
                    v-model="QuestionInfoData.reasonType"
                    filterable
                    ph="请输入原因类型"
                    disabled
                    :dict="dict.type.itr_reason_type"
                  ></jereh-select> -->
                  <dict-tag
                    :options="dict.type.itr_reason_type"
                    :value="QuestionInfoData.reasonType"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他原因说明" prop="otherReasonRemark">
                  <!-- <el-input
                    v-model="QuestionInfoData.otherReasonRemark"
                    placeholder="请输入其他原因说明"
                    disabled
                  /> -->
                  {{ QuestionInfoData.otherReasonRemark }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="重大问题小组" prop="severityQuestionGroup">
                  <!-- <el-input
                    v-model="QuestionInfoData.severityQuestionGroup"
                    placeholder="请输入重大问题小组"
                    disabled
                  /> -->
                  {{ QuestionInfoData.severityQuestionGroup }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="决议项附件" prop="resolutionAttachment">
                  <div v-if="QuestionInfoData.resolutionAttachment">
                    <ImagePreview
                      :width="100"
                      :height="100"
                      v-for="(
                        item, index
                      ) in QuestionInfoData.resolutionAttachment.split(',')"
                      :key="index"
                      :src="item"
                      style="margin-right: 10px"
                    />
                  </div>
                  <!-- <FileUpload
                    :isShowTip="false"
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
                  /> -->
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="18">
                <el-form-item label="原因分析" prop="reasonAnalyse">
                  <!-- <el-input
                    v-model="QuestionInfoData.reasonAnalyse"
                    placeholder="请输入原因分析"
                    disabled
                  /> -->
                  {{ QuestionInfoData.reasonAnalyse }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="18">
                <el-form-item label="计划处理措施" prop="planProcessResult">
                  <!-- <el-input
                    v-model="QuestionInfoData.planProcessResult"
                    placeholder="请输入计划处理措施"
                    disabled
                  /> -->
                  {{ QuestionInfoData.planProcessResult }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="是否重复发生" prop="isRepeat">
                  <!-- <el-select
                    v-model="QuestionInfoData.isRepeat"
                    placeholder="请选择是否重复发生"
                    disabled
                  >
                    <el-option
                      v-for="item in isTureOrFalse"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select> -->
                  {{ QuestionInfoData.isRepeat ? "是" : "否" }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否提供资源" prop="isProvideResources">
                  <!-- <el-select
                    v-model="QuestionInfoData.isProvideResources"
                    placeholder="请选择是否提供资源"
                    disabled
                  >
                    <el-option
                      v-for="item in isTureOrFalse"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select> -->
                  {{ QuestionInfoData.isProvideResources ? "是" : "否" }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="资源提供人" prop="solutionSupplier">
                  <!-- <el-select
                  v-model="QuestionInfoData.solutionSupplier"
                  multiple
                  placeholder="请选择资源提供人"
                  ref="cascader"
                /> -->
                  {{ QuestionInfoData.solutionSupplier }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="18">
                <el-form-item label="实际处理措施" prop="solutionProcessResult">
                  <!-- <el-input
                    v-model="QuestionInfoData.solutionProcessResult"
                    placeholder="请输入实际处理措施"
                    type="textarea"
                    :rows="2"
                    disabled
                  /> -->
                  {{ QuestionInfoData.solutionProcessResult }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="验证结果" prop="verifyResult">
                  <!-- <jereh-select
                    v-model="QuestionInfoData.verifyResult"
                    :dict="dict.type.itr_verify_result"
                    disabled
                  ></jereh-select> -->
                  <dict-tag
                    :options="dict.type.itr_verify_result"
                    :value="QuestionInfoData.verifyResult"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              v-for="(item, index) in QuestionInfoData.upgradeUserByList"
              :key="index"
            >
              <el-col :span="6">
                <el-form-item
                  :label="`升级人员` + (index + 1)"
                  prop="upgradeUserBy"
                >
                  {{ item || "" }}
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item>
                  <!-- <el-col :span="6">
                  <el-input />
                </el-col> -->
                  <el-col>
                    <!-- <FileUpload
                      :isShowTip="false"
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
                    /> -->
                    <div v-if="QuestionInfoData.upgradeProcessResult">
                      <ImagePreview
                        :width="100"
                        :height="100"
                        v-for="(
                          item, index
                        ) in QuestionInfoData.upgradeProcessResult.split(',')"
                        :key="index"
                        :src="item"
                        style="margin-right: 10px"
                      />
                    </div>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="实际处理照片" prop="processAttachment">
                  <!-- <FileUpload
                    :isShowTip="false"
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
                  /> -->

                  <div v-if="QuestionInfoData.processAttachment">
                    <ImagePreview
                      :width="100"
                      :height="100"
                      v-for="(
                        item, index
                      ) in QuestionInfoData.processAttachment.split(',')"
                      :key="index"
                      :src="item"
                      style="margin-right: 10px"
                    />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="6">
              <el-form-item label="处理结果" prop="processResult">
                <!-- <jereh-select
                  disabled
                  v-model="QuestionInfoData.processResult"
                  filterable
                  ph="请选择处理结果"
                  :dict="dict.type.itr_process_result"
                ></jereh-select> -->
                <dict-tag
                  :options="dict.type.itr_process_result"
                  :value="QuestionInfoData.processResult"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处理日期" prop="processTime">
                <!-- <el-date-picker
                  v-model="QuestionInfoData.processTime"
                  type="date"
                  placeholder="请选择处理日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  disabled
                /> -->
                {{ QuestionInfoData.processTime }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="问题处理人" prop="resolveUserBy">
                <!-- <el-select
                  v-model="personalList.resolveUserBy"
                  multiple
                  placeholder="请选择问题处理人"
                  @focus="openPersonnelBindingDialog('resolveUserBy')"
                  ref="cascader"
                /> -->
                {{ QuestionInfoData.resolveUserBy }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审批记录" prop="resolveUserBy">
                {{ QuestionInfoData.resolveUserBy }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="实际完成时间" prop="completeTime">
                <el-input
                  v-model="QuestionInfoData.completeTime"
                  placeholder=""
                  disabled
                />
              </el-form-item>
            </el-col> -->

            <el-col :span="6">
              <el-form-item label="问题确认人" prop="confirmUserBy">
                <!-- <el-select
                  disabled
                  v-model="personalList.confirmUserBy"
                  multiple
                  placeholder="请选择问题确认人"
                  @focus="openPersonnelBindingDialog('confirmUserBy')"
                  ref="cascader"
                /> -->
                {{ QuestionInfoData.confirmUserBy }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工单关闭时间" prop="closeTime">
                <!-- <el-date-picker
                  v-model="QuestionInfoData.closeTime"
                  type="date"
                  placeholder="请选择"
                  disabled
                /> -->
                {{ QuestionInfoData.closeTime }}
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="是否需要索赔" prop="isClaim">
                <!-- <el-select
                  v-model="QuestionInfoData.isClaim"
                  placeholder="请选择"
                  disabled
                >
                  <el-option
                    v-for="item in isTureOrFalse"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                {{ QuestionInfoData.isClaim ? "是" : "否" }}
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item
                label="索赔信息上传"
                prop="claimAttachment"
                v-if="QuestionInfoData.isClaim"
              >
                <!-- <FileUpload
                  disabled
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
                /> -->
                <div v-if="QuestionInfoData.claimAttachment">
                  <ImagePreview
                    :width="100"
                    :height="100"
                    v-for="(
                      item, index
                    ) in QuestionInfoData.claimAttachment.split(',')"
                    :key="index"
                    :src="item"
                    style="margin-right: 10px"
                  />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row v-if="QuestionInfoData.isClaim">
          <el-card>
            <div slot="header">索赔物料清单</div>
            <el-table
              :data="rowData.keyMaterialsItemsList"
              :row-key="getRowKeys"
            >
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
                  <!-- <el-input
                    type="text"
                    v-model="scope.row.materialCode"
                    disabled
                  /> -->
                  {{ scope.row.materialCode }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="物料说明"
                prop="materialName"
              >
                <template slot-scope="scope">
                  <!-- <el-input
                    type="text"
                    v-model="scope.row.materialName"
                    disabled
                  /> -->
                  {{ scope.row.materialName }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="数量" prop="applyNumber">
                <template slot-scope="scope">
                  <!-- <el-input
                    type="text"
                    v-model="scope.row.applyNumber"
                    disabled
                  /> -->
                  {{ scope.row.applyNumber }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="备注" prop="remark">
                <template slot-scope="scope">
                  <!-- <el-input type="text" v-model="scope.row.remark" disabled /> -->
                  {{ scope.row.remark }}
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-row>
      </el-card>
      <!-- 工时统计 -->
      <el-card class="box-card">
        <div class="title">工时统计</div>
        <el-row :gutter="24">
          <!--用户数据-->
          <el-col :span="24" :xs="24">
            <el-row :gutter="10" class="mb8">
              <el-col :span="18">
                <el-tag ref="tagColor"
                  >故障总工时：{{ mainWorkHoursTimer }}小时 、 辅助总工时：{{
                    assistWorkHoursTimer
                  }}小时 、 合计工时：{{
                    assitWorAndMainWorHoursTimer
                  }}小时</el-tag
                >
              </el-col>
            </el-row>
            <!-- 表单数据 -->
            <el-table :data="WorkHoursData" :row-key="getRowKeys">
              <!-- v-loading="loading" -->
              <el-table-column
                label="角色"
                align="center"
                key="role"
                prop="role"
                width="120px"
              >
                <template slot-scope="scope">
                  <!-- <jereh-select
                    v-model="scope.row.role"
                    filterable
                    ph="请选择角色"
                    :dict="dict.type.itr_hours_role"
                    disabled
                  ></jereh-select> -->
                  <dict-tag
                    :options="dict.type.itr_hours_role"
                    :value="scope.row.role"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="服务工程师"
                align="center"
                key="engineerName"
                prop="engineerName"
                width="150px"
              >
                <template slot-scope="scope">
                  <!-- <el-select
                    v-model="scope.row.engineerName"
                    multiple
                    placeholder="请选择服务工程师"
                    disabled
                    ref="cascader"
                  />  -->
                  {{ scope.row.engineerName }}
                </template></el-table-column
              >
              <el-table-column
                label="日期"
                align="center"
                key="execTime"
                prop="execTime"
                width="160px"
              >
                <template slot-scope="scope">
                  <!-- <el-date-picker
                    v-model="scope.row.execTime"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd"
                    placeholder="选择日期"
                    disabled
                  >
                  </el-date-picker> -->
                  {{ scope.row.execTime }}
                </template></el-table-column
              >
              <el-table-column
                label="故障处理工时"
                align="center"
                key="malfunctionHours"
                prop="malfunctionHours"
                width="100px"
              >
                <template slot-scope="scope">
                  <!-- <el-input
                    type="number"
                    v-model="scope.row.malfunctionHours"
                    disabled
                  ></el-input>  -->
                  {{ scope.row.malfunctionHours }}
                </template></el-table-column
              >
              <el-table-column
                label="辅助工时类型"
                align="center"
                key="assistType"
                prop="assistType"
                width="160px"
              >
                <template slot-scope="scope">
                  <!-- <jereh-select
                    v-model="scope.row.assistType"
                    filterable
                    ph="请选择辅助工时类型"
                    :dict="dict.type.itr_assit_classify"
                    disabled
                  ></jereh-select> -->
                  <dict-tag
                    :options="dict.type.itr_assit_classify"
                    :value="scope.row.assistType"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="辅助工时"
                align="center"
                key="assitsHours"
                prop="assistHours"
                width="100px"
              >
                <template slot-scope="scope">
                  <!-- <el-input
                    v-model="scope.row.assistHours"
                    type="number"
                    disabled
                  ></el-input>  -->
                  {{ scope.row.assistHours }}
                </template></el-table-column
              >
              <el-table-column
                label="故障处理总工时"
                align="center"
                key="totalHours"
                prop="totalHours"
                width="120px"
              >
                <template slot-scope="scope">
                  {{
                    (
                      (parseInt(scope.row.assistHours) || 0) +
                      (scope.row.role === "MAINTAIN"
                        ? parseInt(scope.row.malfunctionHours) * 1.1
                        : parseInt(scope.row.malfunctionHours) * 0.9 || 0)
                    ).toFixed(1)
                  }}
                </template></el-table-column
              >
              <el-table-column
                label="故障处理内容概述"
                align="center"
                key="malfunctionSummarized"
                prop="malfunctionSummarized"
              >
                <template slot-scope="scope">
                  <!-- <el-input
                    v-model="scope.row.malfunctionSummarized"
                    disabled
                  ></el-input>  -->
                  {{ scope.row.malfunctionSummarized }}
                </template></el-table-column
              >
            </el-table>
          </el-col>
        </el-row>
      </el-card>
      <!-- 物料信息 -->
      <el-card class="box-card">
        <div class="title">物料信息</div>
        <el-table :data="requestMaterialsList" :row-key="getRowKeys">
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column
            label="工单编码"
            align="center"
            key="workOrderNo"
            prop="workOrderNo"
            width="120px"
          >
            <template slot-scope="scope">
              {{ scope.row.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="物料编码"
            align="center"
            key="materialCode"
            prop="materialCode"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.materialCode" disabled></el-input> -->
              {{ scope.row.materialCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="物料说明"
            align="center"
            key="materialName"
            prop="materialName"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.materialName" disabled></el-input> -->
              {{ scope.row.materialName }}
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            align="center"
            key="applyNumber"
            prop="applyNumber"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.applyNumber" disabled></el-input> -->
              {{ scope.row.applyNumber }}
            </template>
          </el-table-column>
          <el-table-column
            label="交货日期"
            align="center"
            key="completeDate"
            prop="completeDate"
            width="160px"
          >
            <template slot-scope="scope">
              <!-- <el-date-picker
                v-model="scope.row.completeDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                disabled
                placeholder="选择日期"
              >
              </el-date-picker> -->
              {{ scope.row.completeDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="发货状态"
            align="center"
            key="state"
            prop="state"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.state"></el-input> -->
              {{
                scope.row.state === "materialshen_deliver_complete"
                  ? "发货完成"
                  : scope.row.state === "materialshen_deliver_wait"
                  ? "待发货"
                  : "发货中"
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="发货类型"
            align="center"
            key="deliveryType"
            prop="deliveryType"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.deliveryType" disabled></el-input> -->
              {{ scope.row.deliveryType }}
            </template>
          </el-table-column>
          <el-table-column
            label="发货日期"
            align="center"
            key="deliveryDate"
            prop="deliveryDate"
            width="160px"
          >
            <template slot-scope="scope">
              <!-- <el-date-picker
                v-model="scope.row.deliveryDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker> -->
              {{ scope.row.deliveryDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="发货单号"
            align="center"
            key="deliveryBillCode"
            prop="deliveryBillCode"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input
                v-model="scope.row.deliveryBillCode"
                disabled
              ></el-input> -->
              {{ scope.row.deliveryBillCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="接收人"
            align="center"
            key="recipient"
            prop="recipient"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.recipient" disabled></el-input> -->
              {{ scope.row.recipient }}
            </template>
          </el-table-column>
          <el-table-column
            label="采购员"
            align="center"
            key="purchaser"
            prop="purchaser"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.purchaser" disabled></el-input> -->
              {{ scope.row.purchaser }}
            </template>
          </el-table-column>
          <el-table-column
            label="收货日期"
            align="center"
            key="arrivalTime"
            prop="arrivalTime"
            width="160px"
          >
            <template slot-scope="scope">
              <!-- <el-date-picker
                v-model="scope.row.arrivalTime"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker> -->
              {{ scope.row.arrivalTime }}
            </template>
          </el-table-column>
          <el-table-column
            label="剩余数量"
            align="center"
            key="remainNumber"
            prop="remainNumber"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input
                v-model="scope.row.remainNumber"
                type="number"
              ></el-input> -->
              {{ scope.row.remainNumber }}
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            align="center"
            key="materialName"
            prop="materialName"
            width="200px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.remark" disabled></el-input> -->
              {{ scope.row.remark }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 余料处置信息 -->
      <el-card class="box-card">
        <div class="title">余料处置信息</div>
        <el-table :data="remainMaterialsList" :row-key="getRowKeys">
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column
            label="工单编码"
            align="center"
            key="workOrderNo"
            prop="workOrderNo"
            width="120px"
          >
            <template slot-scope="scope">
              {{ scope.row.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="物料编码"
            align="center"
            key="materialCode"
            prop="materialCode"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.materialCode" disabled></el-input> -->
              {{ scope.row.materialCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="物料说明"
            align="center"
            key="materialName"
            prop="materialName"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.materialName" disabled></el-input> -->
              {{ scope.row.materialName }}
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            align="center"
            key="number"
            prop="number"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.number" disabled></el-input> -->
              {{ scope.row.number }}
            </template>
          </el-table-column>
          <el-table-column
            label="余料处置措施"
            align="center"
            key="cloutDispose"
            prop="cloutDispose"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.cloutDispose" disabled></el-input> -->
              {{ scope.row.cloutDispose }}
            </template>
          </el-table-column>
          <el-table-column
            label="处置人"
            align="center"
            key="disposePerson"
            prop="disposePerson"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.disposePerson" disabled></el-input> -->
              {{ scope.row.disposePerson }}
            </template>
          </el-table-column>
          <el-table-column
            label="处置时间"
            align="center"
            key="disposeTime"
            prop="disposeTime"
            width="160px"
          >
            <template slot-scope="scope">
              <!-- <el-date-picker
                v-model="scope.row.disposeTime"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
                disabled
              >
              </el-date-picker> -->
              {{ scope.row.disposeTime }}
            </template>
          </el-table-column>
          <el-table-column
            label="存储地点"
            align="center"
            key="saveAddress"
            prop="saveAddress"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.saveAddress" disabled></el-input> -->
              {{ scope.row.saveAddress }}
            </template>
          </el-table-column>
          <el-table-column
            label="处置状态"
            align="center"
            key="disposeStatus"
            prop="disposeStatus"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.disposeStatus" disabled></el-input> -->
              {{ scope.row.disposeStatus }}
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            align="center"
            key="materialName"
            prop="materialName"
            width="200px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.remark" disabled></el-input> -->
              {{ scope.row.remark }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 旧件信息 -->
      <el-card class="box-card">
        <div class="title">旧件信息</div>
        <el-table :data="oldMaterialsList" :row-key="getRowKeys">
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column
            label="工单编码"
            align="center"
            key="workOrderNo"
            prop="workOrderNo"
            width="120px"
          >
            <template slot-scope="scope">
              {{ scope.row.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="物料编码"
            align="center"
            key="materialCode"
            prop="materialCode"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.materialCode" disabled></el-input> -->
              {{ scope.row.materialCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="物料说明"
            align="center"
            key="materialName"
            prop="materialName"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.materialName" disabled></el-input> -->
              {{ scope.row.materialName }}
            </template>
          </el-table-column>
          <el-table-column
            label="品牌"
            align="center"
            key="brand"
            prop="brand"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.brand" disabled></el-input> -->
              {{ scope.row.brand }}
            </template>
          </el-table-column>
          <el-table-column
            label="序列号"
            align="center"
            key="serialNo"
            prop="serialNo"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.serialNo" disabled></el-input> -->
              {{ scope.row.serialNo }}
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            align="center"
            key="number"
            prop="number"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.number" disabled></el-input> -->
              {{ scope.row.number }}
            </template>
          </el-table-column>
          <el-table-column
            label="处理措施"
            align="center"
            key="dispose"
            prop="dispose"
            width="120px"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.dispose"
                placeholder="请选择处理结果"
                disabled
              >
                <el-option
                  v-for="item in disposalMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="处理结果"
            align="center"
            key="disposeResult"
            prop="disposeResult"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <jereh-select
                v-model="scope.row.disposeResult"
                filterable
                ph="请选择"
                :dict="dict.type.itr_process_result"
                disabled
              /> -->
              <dict-tag
                :options="dict.type.itr_process_result"
                :value="scope.row.disposeResult"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="发货类型"
            align="center"
            key="deliveryType"
            prop="deliveryType"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.deliveryType" disabled></el-input> -->
              {{ scope.row.deliveryType }}
            </template>
          </el-table-column>
          <el-table-column
            label="发货日期"
            align="center"
            key="deliveryDate"
            prop="deliveryDate"
            width="160px"
          >
            <template slot-scope="scope">
              <!-- <el-date-picker
                v-model="scope.row.deliveryDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                disabled
                placeholder="选择日期"
              >
              </el-date-picker> -->
              {{ scope.row.deliveryDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="发货单号"
            align="center"
            key="deliveryBillNo"
            prop="deliveryBillNo"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.deliveryBillNo" disabled></el-input> -->
              {{ scope.row.deliveryBillNo }}
            </template>
          </el-table-column>
          <el-table-column
            label="发货人"
            align="center"
            key="consigner"
            prop="consigner"
            width="120px"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.consigner" disabled></el-input> -->
              {{ scope.row.consigner }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 保外物料申请明细 -->
      <el-card class="box-card">
        <div class="title">保外物料申请明细</div>
        <el-table :data="expirationMaterialsList" :row-key="getRowKeys">
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column
            label="工单编码"
            align="center"
            key="workOrderNo"
            prop="workOrderNo"
            ><template slot-scope="scope">
              {{ scope.row.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="物料编码"
            align="center"
            key="materialCode"
            prop="materialCode"
            ><template slot-scope="scope">
              <!-- <el-input v-model="scope.row.materialCode" disabled></el-input> -->
              {{ scope.row.materialCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="物料说明"
            align="center"
            key="materialName"
            prop="materialName"
            ><template slot-scope="scope">
              <el-input v-model="scope.row.materialName" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            align="center"
            key="appyNumber"
            prop="appyNumber"
            ><template slot-scope="scope">
              <el-input v-model="scope.row.appyNumber" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            align="center"
            key="remark"
            prop="remark"
            ><template slot-scope="scope">
              <el-input v-model="scope.row.remark" disabled></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 问题处理进度 -->
      <el-card class="box-card">
        <div class="title">问题处理进度</div>
        <div class="steps">
          <el-steps align-center finish-status="success" space ref="stepsBox">
            <el-step
              v-for="(item, index) in stepStatus"
              :key="index"
              :status="item.status"
            >
              <!-- <template #icon>
              {{ stepStatus.length - index }}
            </template> -->
              <template #description>
                <div class="description-text">
                  <div>{{ item.time }}</div>
                  <div>{{ item.text }}</div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
      </el-card>

      <!-- 转办记录 -->
      <el-card class="box-card">
        <div class="title">转办记录</div>
        <el-table :data="recipientList" :row-key="getRowKeys">
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column
            label="转办请求人"
            align="center"
            key="updateBy"
            prop="updateBy"
          />
          <el-table-column
            label="接收人"
            align="center"
            key="executorName"
            prop="executorName"
          />
          <el-table-column
            label="转办时间"
            align="center"
            key="createTime"
            prop="createTime"
          />
        </el-table>
      </el-card>
      <!-- 升级记录 -->
      <el-card class="box-card">
        <div class="title">升级记录</div>
        <el-table :data="upgradeList">
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column
            label="升级请求人"
            align="center"
            key="updateBy"
            prop="updateBy"
          />
          <el-table-column
            label="接收人"
            align="center"
            key="executorName"
            prop="executorName"
          />
          <el-table-column
            label="升级时间"
            align="center"
            key="createTime"
            prop="createTime"
          />
        </el-table>
      </el-card>
    </div>
    <div class="footer">
      <div class="footer-btn">
        <div class="right-btn">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" v-print="print">打印</el-button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
// issueLevel
import {
  getWorkOrder,
  queryListByWorkOrderIdMaterialUsing,
  hoursList,
  queryListByWorkOrderIdList,
  materialRemainList,
  unwarrantyList,
  queryListByWorkOrderIdMaterialUsed,
  queryListByIdAndType,
  queryListByApgradeAndRecipient,
} from "@/api/cmms/itr/work-order/order.api";
import { whether } from "@/utils/dictionary-service";
import { getDicts as getDicts } from "@/api/system/dict/data";
export default {
  name: "Print",
  dicts: [
    "itr_fault_level",
    "itr_influence_level",
    "itr_emergency_degree",
    "itr_service_category",
    "itr_service_source",
    "itr_verify_result",
    "after_sale_area",
    "device_area",
  ],
  data() {
    return {
      form: {},
      userList: [{}, {}, {}],
      requestLevelOptions: [],
      // issueLevelOptions: issueLevel(),
      issueLevelOptions: [],
      print: {
        id: "printArea",
        popTitle: "打印", // 打印配置页上方标题
        extraHead: "", //最上方的头部文字，附加在head标签上的额外标签,使用逗号分隔
        preview: "", // 是否启动预览模式，默认是false（开启预览模式，可以先预览后打印）
        previewTitle: "", // 打印预览的标题（开启预览模式后出现）,
        previewPrintBtnLabel: "", // 打印预览的标题的下方按钮文本，点击可进入打印（开启预览模式后出现）
        zIndex: "", // 预览的窗口的z-index，默认是 20002（此值要高一些，这涉及到预览模式是否显示在最上面）
        previewBeforeOpenCallback() {}, //预览窗口打开之前的callback（开启预览模式调用）
        previewOpenCallback() {}, // 预览窗口打开之后的callback（开启预览模式调用）
        beforeOpenCallback() {}, // 开启打印前的回调事件
        openCallback() {}, // 调用打印之后的回调事件
        closeCallback() {}, //关闭打印的回调事件（无法确定点击的是确认还是取消）
        url: "",
        standard: "",
        extraCss: "",
      },
      isTureOrFalse: whether(),
      QuestionInfoData: {
        serviceDescription: undefined,
        upgradeUserByList: [],
      },
      stepStatus: [
        {
          time: "",
          text: "工单确认",
          status: "wait",
        },
        {
          time: "",
          text: "服务工程师已出发",
          status: "wait",
        },
        {
          time: "",
          text: "问题处理中",
          status: "wait",
        },
        {
          time: "",
          text: "物料已申请",
          status: "wait",
        },
        {
          time: "",
          text: "物料已出库",
          status: "wait",
        },
        {
          time: "",
          text: "物料已到达",
          status: "wait",
        },
        {
          time: "",
          text: "问题验证中",
          status: "wait",
        },
        {
          time: "",
          text: "问题验证关闭",
          status: "wait",
        },
        {
          time: "",
          text: "待评价",
          status: "wait",
        },
        {
          time: "",
          text: "已评价",
          status: "wait",
        },
      ],
      WorkHoursData: [],
      requestMaterialsList: [],
      remainMaterialsList: [],
      expirationMaterialsList: [],
      oldMaterialsList: [],
      recipientList: [],
      upgradeList: [],
      issueSubTypeAllOptions: [],
      issueSubTypeOptions: [],
    };
  },
  components: {},
  props: {
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    rowDataId: {
      type: String,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("colsePrintDrawer", false);
    },
    cancel() {
      this.$emit("colsePrintDrawer", false);
    },
    formatDate(value, type) {
      // 计算日期相关值
      let time = typeof value == "number" ? new Date(value) : value;
      let Y = time.getFullYear();
      let M = time.getMonth() + 1;
      let D = time.getDate();
      let h = time.getHours();
      let m = time.getMinutes();
      let s = time.getSeconds();
      let week = time.getDay();
      // 如果传递了type的话
      if (type == undefined) {
        return (
          Y +
          "-" +
          (M < 10 ? "0" + M : M) +
          "-" +
          (D < 10 ? "0" + D : D) +
          " " +
          (h < 10 ? "0" + h : h) +
          ":" +
          (m < 10 ? "0" + m : m) +
          ":" +
          (s < 10 ? "0" + s : s)
        );
      } else if (type == "week") {
        // 在quartz中 1为星期日
        return week + 1;
      }
    },
    workOrderStateCode(value) {
      return (
        workOrderStateList.filter((item) => {
          return value === item.value;
        })[0]?.label || ""
      );
    },
    workOrderStateName(value) {
      return (
        workOrderStateList.filter((item) => {
          return value === item.label;
        })[0]?.value || ""
      );
    },
    async getListByIdAndType() {
      let currentState = 0;
      let timer = [];
      await queryListByIdAndType({
        businessId: this.rowDataId,
        businessType: "work_order",
      }).then((res) => {
        this.stepStatus.forEach((item, index) => {
          if (this.workOrderStateCode(res.data[0].newState) === item.text) {
            currentState = index + 1;
          }
        });
        timer = res.data.map((item) => {
          return item.createTime;
        });
      });
      for (let index = 0; index < currentState; index++) {
        this.stepStatus[index + 1].status = "process";
        this.stepStatus[index].time = timer[currentState - index - 1];
        this.stepStatus[index].status = "success";
      }
    },
    issueTypeInit() {
      let items = [];
      this.issueSubTypeAllOptions.forEach((element) => {
        if (element.dictValue.indexOf(this.QuestionInfoData.faultType) == 0) {
          items.push(element);
        }
      });
      this.$set(this, "issueSubTypeOptions", [...items]);
    },
    issueSubTypeOptionsLabel(value) {
      // return (
      //   this.issueSubTypeOptions.filter((item) => {
      //     return item.value === value;
      //   })[0].label || ""
      // );
    },
    getRowKeys(row) {
      return 1;
    },
  },
  watch: {
    rowDataId(nV, oV) {},
    async open(nV) {
      if (nV) {
        await getDicts("itr_fault_sub_type").then((resp) => {
          this.issueSubTypeAllOptions = resp.data;
        });
        this.issueTypeInit();
        await getWorkOrder(this.rowDataId).then((res) => {
          this.form = res.data;
          console.log(this.form.workOrderFaultDetailVo);
          this.QuestionInfoData = this.form.workOrderFaultDetailVo || {};
          this.QuestionInfoData.serviceResultCode = this.form.serviceRecordId;
          if (!this.QuestionInfoData.resolveUserBy) {
            this.QuestionInfoData.resolveUserBy = this.form.engineerName || "";
          }
          if (this.QuestionInfoData?.upgradeUserBy) {
            this.QuestionInfoData.upgradeUserByList =
              this.QuestionInfoData.upgradeUserBy.split(",") || ["123"];
          } else {
            this.QuestionInfoData.upgradeUserByList = [""];
          }
          this.QuestionInfoData.closeTime = this.form.closeTime;
          this.QuestionInfoData.completeTime = this.form.completeTime;
          this.QuestionInfoData.emergencyDegree = this.form.emergencyDegree;
          this.QuestionInfoData.serviceRequestCode =
            this.form.serviceRequestCode;
          this.QuestionInfoData.faultLevel = this.form.faultLevel;
          this.QuestionInfoData.workOrderId = this.form.workOrderId;
          this.QuestionInfoData.workOrderCode = this.form.workOrderCode;
        });
        await queryListByWorkOrderIdMaterialUsing({
          workOrderId: this.rowDataId,
        }).then((res) => {
          this.$set(this.form, "deviceInfoList", res.data || []);
        });
        hoursList({
          workOrderId: this.rowDataId,
        }).then((res) => {
          this.WorkHoursData = res.data || [];
        });
        queryListByWorkOrderIdList({
          workOrderId: this.rowDataId,
        }).then((res) => {
          this.requestMaterialsList = [...res.data] || [];
        });
        materialRemainList({
          workOrderId: this.rowDataId,
        }).then((res) => {
          this.remainMaterialsList = [...res.data] || [];
        });
        unwarrantyList({
          workOrderId: this.rowDataId,
        }).then((res) => {
          this.expirationMaterialsList = [...res.data] || [];
        });
        queryListByWorkOrderIdMaterialUsed({
          workOrderId: this.rowDataId,
        }).then((res) => {
          this.oldMaterialsList = [...res.data] || [];
        });
        await queryListByApgradeAndRecipient({
          workOrderId: this.rowDataId,
        }).then((res) => {
          console.log(res);
          if (res?.data?.length) {
            res.data.forEach((item) => {
              if (item.executorBusiness === "recipient") {
                this.recipientList.push(item);
              }
              if (item.executorBusiness === "upgrade") {
                this.upgradeList.push(item);
              }
            });
          }
        });
        await this.getListByIdAndType();
      } else {
        this.recipientList = [];
        this.upgradeList = [];
      }
    },
  },
  computed: {
    mainWorkHoursTimer() {
      let num = 0;
      this.WorkHoursData.forEach((element) => {
        if (!element.malfunctionHours) return;
        num += parseInt(element.malfunctionHours);
      });
      return num;
    },
    assistWorkHoursTimer() {
      let num = 0;
      this.WorkHoursData.forEach((element) => {
        if (!element.assistHours) return;
        num += parseInt(element.assistHours);
      });
      return num;
    },
    assitWorAndMainWorHoursTimer() {
      return this.mainWorkHoursTimer + this.assistWorkHoursTimer;
    },
  },
};
let workOrderStateList = [
  {
    value: "workOrder_state_allocation",
    label: "已派工",
    clickEvent: "workorder_event_allocation"
  },
  {
    value: "workOrder_state_order_affirm",
    label: "工单已确认",
    clickEvent: "workorder_event_order_affirm"
  },
  {
    value: "workOrder_state_engineer_depart",
    label: "工程师已出发",
    clickEvent: "workorder_event_engineer_depart"
  },
  {
    value: "workOrder_state_engineer_question_dispose",
    label: "处理中",
    clickEvent: "workorder_event_engineer_question_dispose"
  },
  {
    value: "workOrder_state_material_apply",
    label: "物料已申请",
    clickEvent: "workorder_event_material_apply"
  },
  {
    value: "workOrder_state_material_delivery",
    label: "物料已发货",
    clickEvent: "workorder_event_material_delivery"
  },
  {
    value: "workOrder_state_material_arrive",
    label: "物料已到达",
    clickEvent: "workorder_event_material_arrive"
  },
  {
    value: "workOrder_state_engineer_question_verify",
    label: "验证中",
    clickEvent: "workorder_event_engineer_question_verify"
  },
  {
    value: "workOrder_state_wait_evaluate",
    label: "已完成待评价",
    clickEvent: "workorder_event_wait_evaluate"
  },
  {
    value: "workOrder_state_complete_evaluate",
    label: "已评价",
    clickEvent: "workorder_event_complete_evaluate"
  },
];
</script>

<style lang="scss" scoped>
.drawer-content {
  padding: 10px;
  .question {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .question-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .question-title {
    margin-bottom: 10px;
  }
  .form-title {
    font-size: 12px;
    background-color: rgb(146, 208, 80);
    width: 170px;
  }
}
.footer {
  height: 50px;
  position: relative;
  .footer-btn {
    position: fixed;
    background: #fff;
    bottom: 0;
    height: 50px;
    box-shadow: 1px 1px 10px #ccc;
    width: 80%;
    .right-btn {
      position: absolute;
      right: 0%;
      margin: 8px;
    }
  }
}

.topDiv {
  width: 80%;
  span {
    font-size: 14px;
    color: rgb(96, 98, 102);
    font-weight: bold;
    margin-right: 5px;
    text-align: left;
  }
  .top-div-title {
    text-align: right;
    width: 90px;
    display: inline-block;
  }
  .info {
    color: #000;
    font-weight: normal;
  }
  .el-col {
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.flex-box {
  display: flex;
  align-items: center;
}

.steps {
  margin: 10px 0 35px 0;
}
.title {
  margin: 10px 0px 20px 0;
  text-align: left;
  font-size: 16px;
  // font-weight: 800;
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
.Remark {
  color: red;
  font-size: 10px;
  margin-top: 10px;
}
.tableTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .tt {
    font-size: 18px;
    font-weight: 800;
  }
}
.description-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // width: 176px;
  flex-direction: column;

  div:nth-child(1) {
    width: 50%;
  }
  div:nth-child(2) {
    width: 50%;
    text-align: center;
  }
}

::v-deep .el-step__main {
  margin-top: 10px;
}
::v-deep .el-divider {
  margin: 6px 0px !important;
  background: #000;
}
</style>
