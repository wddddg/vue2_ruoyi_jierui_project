<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb-2">
      <el-col :span="1.5">
        <jereh-button @click="topBtnHandleSaveClick"
                      v-if="trainingServiceDetail.trainingState !== '已完成'&& isSave == 0&&this.trainingState!='已取消' && trainingServiceDetail.directorFlag || type=== 'add'"
        >保存
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>视频指导</jereh-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <jereh-button @click="finishTraining"
                      v-if="trainingServiceDetail.trainingState !== '已完成'&& isSave == 0&&this.trainingState!='已取消'"
        >培训完成
        </jereh-button>
      </el-col> -->
      <el-col :span="1.5">
        <jereh-button @click="showManHoursRecord">工时记录</jereh-button>
      </el-col>
    </el-row>

    <div class="flex justify-center">
      <div style="width: 100%">
        <el-form :model="trainingServiceDetail" ref="trainingServiceDetail" :rules="rules" label-width="150px"
                 size="small"
        >
          <!--          基础信息-->
          <div class="border rounded">
            <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
              <div class="font">基础信息</div>
            </div>
            <div class="flex flex-wrap">
              <el-form-item prop="trainingDirector" label="培训负责人" style="width: 33%;">
                <jereh-person-select v-model="trainingServiceDetail.trainingDirector" :multiple="false"
                                     :disabled="!trainingServiceDetail.equipmentFlag"
                ></jereh-person-select>
              </el-form-item>
              <el-form-item prop="trainingCode" label="培训编码" style="width: 33%;">
                <jereh-input v-model="trainingServiceDetail.trainingCode" ph="自动生成" disabled></jereh-input>
              </el-form-item>
              <el-form-item prop="trainingPlace" label="培训地点" style="width: 33%;">
                <jereh-select v-model="trainingServiceDetail.trainingPlace" :dict="dict.type.training_place" :disabled="!trainingServiceDetail.equipmentFlag"
                ></jereh-select>
              </el-form-item>
              <el-form-item prop="customerName" label="客户名称" style="width: 33%;">
                <jereh-input v-model="trainingServiceDetail.customerName" :disabled="!trainingServiceDetail.equipmentFlag" ></jereh-input>
              </el-form-item>
              <el-form-item prop="serviceCode" label="服务编码" style="width: 33%;">
                <jereh-input v-model="trainingServiceDetail.serviceCode" disabled @click="openServicePoolBinding"
                ></jereh-input>
              </el-form-item>
              <el-form-item prop=" trainingLevel
                " label="培训级别" style="width: 33%;"
              >
                <el-tooltip class="item" effect="dark" placement="top-start">
                  <div slot="content">
                    　<span>选择培训级别参考规则</span><br/>
                    　<span>一级：培训天数＞7天</span><br/>
                    <span>二级：3天＜培训天数≤7天</span><br/>
                    <span>三级：培训天数≤3天</span>
                  </div>
                  <jereh-select v-model="trainingServiceDetail.trainingLevel" :dict="dict.type.service_level" :disabled="!trainingServiceDetail.equipmentFlag"
                  ></jereh-select>
                </el-tooltip>
              </el-form-item>
              <el-form-item prop="trainingAttribute" label="培训属性" style="width: 33%;">
                <jereh-select v-model="trainingServiceDetail.trainingAttribute" :dict="dict.type.training_attribute"
                              @change="changeType " :disabled="!trainingServiceDetail.equipmentFlag"
                ></jereh-select>
              </el-form-item>
              <el-form-item prop="customerContact" label="客户联系人" style="width: 33%;">
                <jereh-input v-model="trainingServiceDetail.customerContact" :disabled="!trainingServiceDetail.equipmentFlag"></jereh-input>
              </el-form-item>
              <el-form-item prop="afterSaleArea" label="售后区域" style="width: 33%;">
                <el-tooltip class="item" effect="dark"
                            content="请根据该项培训业务所属主导区域进行选择：司内培训选择运营支持中心；司外培训根据培训地点选择区域"
                            placement="top-start"
                >
                  <jereh-select v-model="trainingServiceDetail.afterSaleArea" :dict="dict.type.after_sale_area"
                                @change="findDirector" :disabled="!trainingServiceDetail.equipmentFlag"
                  ></jereh-select>
                </el-tooltip>
              </el-form-item>
              <el-form-item prop="maketDirector" label="市场负责人" style="width: 33%;">
                <jereh-input v-model="trainingServiceDetail.maketDirector"></jereh-input>
              </el-form-item>
              <el-form-item prop="deviceArea" label="市场区域" style="width: 33%;">
                <jereh-input v-model="trainingServiceDetail.deviceArea"></jereh-input>
              </el-form-item>
              <el-form-item prop="contactPhone" label="客户联系方式" style="width: 33%;">
                <jereh-input v-model="trainingServiceDetail.contactPhone" :disabled="!trainingServiceDetail.equipmentFlag"></jereh-input>
              </el-form-item>
            </div>
            <div class="p-2" style="width: 100%">
              <div class="font-sm text-danger">提醒：当培训课程包含多种设备类型时，每类至少绑定一台设备</div>
              <div class="my-2">
                <jereh-button @click="openDeviceBinding = true"
                              v-if="trainingServiceDetail.trainingState !== '已完成'&&isSave==0&&this.trainingState!='已取消' && trainingServiceDetail.equipmentFlag || type==='add'"
                >绑定设备
                </jereh-button>
              </div>
              <el-table
                :data="trainingServiceDetail.bindDeviceList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="projectItem"
                  fixed
                  label="项目编码分项"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="productCode"
                  show-overflow-tooltip
                  align="center"
                  label="产品编号"
                >
                </af-table-column>
                <af-table-column
                  prop="productName"
                  show-overflow-tooltip
                  align="center"
                  label="产品名称"

                >
                </af-table-column>
                <af-table-column
                  fixed="right"
                  label="操作"
                  width="50"
                >
                  <template slot-scope="scope">
                    <el-button @click="handAboutDeviceDelect(scope.row)" type="text" size="small"
                               v-if="trainingServiceDetail.equipmentFlag || type==='add'"
                    >删除</el-button>

                  </template>
                </af-table-column>
              </el-table>
            </div>
          </div>
          <!--          服务过程-->
          <div class="border rounded" v-if="isShowService">
            <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
              <div class="font">服务过程</div>
            </div>
            <el-steps :active="0" finish-status="success" class="mx-2">
              <el-step
                v-for="(item,index) in stepList" :key="index"
                :status="trainingServiceDetail[item.field].status"
              >
                <div
                  slot="title"
                  @click="changeStep(index)"
                  :style="stepIndex == index ? 'color: #E85414;font-weight: 700' : ''"
                >{{ item.name }}
                </div>
              </el-step>
            </el-steps>
            <div class="p-2">
              <jereh-button
                round
                @click="handleSaveClick"
                v-if="trainingServiceDetail.trainingState !== '已完成' && isSave==0&&this.trainingState!='已取消' && trainingServiceDetail.directorFlag
                      && (stepIndex !== 4 || (stepIndex === 4 && canClose))"
              >
                保存
              </jereh-button>
              <jereh-button
                v-if="stepIndex === 0 && trainingServiceDetail.trainingState !== '已完成' && isSave==0 && this.trainingState!='已取消' && canEdit"
                round
                @click="openApprove" :disabled="isDisabled"
              >
                发起审批
              </jereh-button>
              <jereh-button v-if="stepIndex === 3 && canEdit" round @click="showTainingReport()">培训报告</jereh-button>
              <jereh-button v-if="stepIndex === 3 && canEdit" round @click="showTainingReport1()">培训总结</jereh-button>
              <jereh-button
                round
                @click="toNextStage"
                v-if="trainingServiceDetail.trainingState !== '已完成'&&isSave==0&&this.trainingState!='已取消' && stepIndex !== 4 && canEdit"
              >
                下一步
              </jereh-button>
              <jereh-button v-if="stepIndex === 4 && canClose" round @click="submitSuggest">提交整改</jereh-button>
              <jereh-button
                v-if="stepIndex === 4 && trainingServiceDetail.trainingState !== '已完成'&& isSave == 0 && this.trainingState!='已取消' && canClose"
                round
                @click="finishTraining"
              >
                培训完成
              </jereh-button>
            </div>
            <!--            准备培训-->
            <div class="px-2 pb-2" v-if="stepIndex === 0">
              <div class="font font-weight-bold mt-2">客户访谈</div>
              <div class="flex flex-wrap">
                <el-form-item prop="trainingPreparation.interviewDate" label="访谈日期" style="width: 33%;">
                  <jereh-date-picker v-model="trainingServiceDetail.trainingPreparation.interviewDate" :disabled="!canEdit"
                  ></jereh-date-picker>
                </el-form-item>
                <el-form-item prop="trainingPreparation.interviewForm" label="访谈形式" style="width: 33%;">
                  <jereh-select v-model="trainingServiceDetail.trainingPreparation.interviewForm"
                                :dict="dict.type.interview_form" multiple :disabled="!canEdit"
                  ></jereh-select>
                </el-form-item>
                <el-form-item prop="trainingPreparation.trainees" label="培训人数规模(人数)" style="width: 33%;">
                  <jereh-input v-model="trainingServiceDetail.trainingPreparation.trainees" type="number" :min="0" :disabled="!canEdit"
                  ></jereh-input>
                </el-form-item>
                <el-form-item prop="trainingPreparation.requireTrainCert" label="培训证书要求" style="width: 33%;">
                  <el-radio-group v-model="trainingServiceDetail.trainingPreparation.requireTrainCert" :disabled="!canEdit">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item prop="trainingPreparation.trainingMode" label="培训方式" style="width: 33%;">
                  <jereh-select v-model="trainingServiceDetail.trainingPreparation.trainingMode"
                                :dict="dict.type.training_mode" :disabled="!canEdit"
                  ></jereh-select>
                </el-form-item>
              </div>
              <el-form-item prop="trainingPreparation.equipmentScope" label="设备范围" style="width: 100%;">
                <el-checkbox-group v-model="trainingServiceDetail.trainingPreparation.equipmentScope" :disabled="!canEdit">
                  <el-checkbox :label="item.value" v-for="(item,index) in dict.type.equipment_scope" :key="index"
                  ></el-checkbox>
                  <jereh-input
                    v-if="trainingServiceDetail.trainingPreparation.equipmentScope && trainingServiceDetail.trainingPreparation.equipmentScope.includes('其他')"
                    v-model="trainingServiceDetail.trainingPreparation.equipmentScopeOther"
                    ph="请输入具体内容"
                  ></jereh-input>
                  <div
                    v-if="trainingServiceDetail.trainingPreparation.equipmentScope && trainingServiceDetail.trainingPreparation.equipmentScope.includes('其他') && !trainingServiceDetail.trainingPreparation.equipmentScopeOther"
                    style="color: #f56c6c; font-size: 12px; line-height: 1; padding-top: 4px; top: 100%; left: 0"
                  >请输入必填内容
                  </div>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item prop="trainingPreparation.customerMark" label="客户背景" style="width: 100%;">
                <el-radio-group v-model="trainingServiceDetail.trainingPreparation.customerMark" :disabled="!canEdit">
                  <el-radio style="min-height: 30px;" :label="item.label"
                            v-for="(item,index) in dict.type.sys_customer_bg" :key="index"
                  ></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="trainingPreparation.trainingCourse" label="培训课程内容" style="width: 100%;">
                <el-checkbox-group v-model="trainingServiceDetail.trainingPreparation.trainingCourse" :disabled="!canEdit">
                  <el-checkbox :label="item.value" v-for="(item,index) in dict.type.training_course" :key="index"
                  ></el-checkbox>
                  <jereh-input
                    v-if="trainingServiceDetail.trainingPreparation.trainingCourse && trainingServiceDetail.trainingPreparation.trainingCourse.includes('其他')"
                    v-model="trainingServiceDetail.trainingPreparation.trainingCourseOther"
                    ph="请输入具体内容"
                  ></jereh-input>
                  <div
                    v-if="trainingServiceDetail.trainingPreparation.trainingCourse && trainingServiceDetail.trainingPreparation.trainingCourse.includes('其他') && !trainingServiceDetail.trainingPreparation.trainingCourseOther"
                    style="color: #f56c6c; font-size: 12px; line-height: 1; padding-top: 4px; top: 100%; left: 0"
                  >请输入必填内容
                  </div>
                </el-checkbox-group>
              </el-form-item>
              <div class="flex align-center justify-between">
                <div class="flex align-center">
                  <div class="font font-weight-bold mr-2">培训计划</div>
                  <jereh-button
                    type="primary"
                    plain
                    icon="el-icon-upload2"
                    size="mini"
                    @click="importTemplateDate(value1)"
                    round
                    v-if="trainingServiceDetail.trainingState !== '已完成'&&isSave==0&&this.trainingState!='已取消'"
                    :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                  >
                    导入
                  </jereh-button>
                  <jereh-button round
                                type="primary"
                                plain
                                @click="handleDownloadTemplate(value1)"
                                v-hasPermi="['cmms:device:import']"
                                v-if="trainingServiceDetail.trainingState !== '已完成'&&isSave==0&&this.trainingState!='已取消' || !canEdit"
                  >
                    下载导入模板
                  </jereh-button>
                </div>
                <jereh-button round @click="addTrainingPlanList"
                              v-if="trainingServiceDetail.trainingState !== '已完成'&&isSave==0&&this.trainingState!='已取消'"
                              :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                >添加
                </jereh-button>
              </div>
              <el-table
                class="mt-2"
                :data="trainingServiceDetail.trainingPreparation.trainingPlanList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="trainingStartTime"
                  fixed
                  label="培训开始时间"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.trainingStartTime" type="datetime"
                                    @change="changeFirstTrainingStartTime($event,scope.$index)"
                                    :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                    ></el-date-picker>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="trainingEndTime"
                  show-overflow-tooltip
                  align="center"
                  label="培训结束时间"
                >
                  <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.trainingEndTime" type="datetime"
                                    @change="changeFirstTrainingEndTime($event,scope.$index)"
                                    :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                    ></el-date-picker>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="courseName"
                  show-overflow-tooltip
                  align="center"
                  label="课程名称"
                >
                  <template slot-scope="scope">
                    <jereh-input
                      v-model="scope.row.courseName"
                      :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                    ></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="trainingContent"
                  show-overflow-tooltip
                  align="center"
                  label="培训内容"
                >
                  <template slot-scope="scope">
                    <jereh-input
                      v-model="scope.row.trainingContent"
                      :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                    ></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="speaker"
                  show-overflow-tooltip
                  align="center"
                  label="主讲人"
                >
                  <template slot-scope="scope">
                    <jereh-person-select
                      v-model="scope.row.speaker"
                      :multiple="false"
                      :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                    ></jereh-person-select>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="trainingPlace"
                  show-overflow-tooltip
                  align="center"
                  label="培训地点"
                >
                  <template slot-scope="scope">
                    <jereh-input
                      v-model="scope.row.trainingPlace"
                      :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                    ></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="remark"
                  show-overflow-tooltip
                  align="center"
                  label="备注"
                >
                  <template slot-scope="scope">
                    <jereh-input
                      v-model="scope.row.remark"
                      :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                    ></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="80">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="deleteTrainingPlanList(scope.$index)"
                      :disabled="trainingServiceDetail.trainingPreparation.isApproved === 1 || !canEdit"
                    >
                      删除
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
              <div class="flex flex-wrap mt-2">
                <el-form-item prop="trainingPreparation.approvedBy" label="审批人" style="width: 33%;">
                  <jereh-input v-model="trainingServiceDetail.trainingPreparation.approvedBy" disabled
                  ></jereh-input>
                </el-form-item>
                <el-form-item prop="trainingPreparation.approvedDate" label="审批日期" style="width: 33%;">
                  <jereh-date-picker v-model="trainingServiceDetail.trainingPreparation.approvedDate" disabled
                  ></jereh-date-picker>
                </el-form-item>
                <el-form-item prop="trainingPreparation.approvedComments" label="审批意见" style="width: 33%;">
                  <jereh-input v-model="trainingServiceDetail.trainingPreparation.approvedComments" disabled
                  ></jereh-input>
                </el-form-item>
              </div>
              <div class="flex align-start justify-between">
                <div class="font font-weight-bold">资源匹配</div>
                <div class="flex align-start">
                  <jereh-button
                    type="primary"
                    plain
                    size="mini"
                    @click="addResourceMatching"
                    v-if="trainingServiceDetail.trainingState !== '已完成'&&isSave==0&&this.trainingState!='已取消'"
                    :disabled="!canEdit"
                  >
                    新增
                  </jereh-button>
                  <el-form-item prop="serviceCode" label="参考培训编码" style="width: 100%;">
                    <jereh-input
                      v-model="validServiceCode"
                      ph="请输入"
                      clearable
                      @change="resourceMatchSearch"
                      :disabled="!canEdit"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="pb-2">
                <el-table
                  :data="trainingServiceDetail.trainingPreparation.resourceMatch" border :fit="true"
                >
                  <af-table-column
                    type="index"
                    align="center"
                    width="50"
                  >
                  </af-table-column>
                  <af-table-column
                    prop="resourceType"
                    label="资源类型"
                    align="center"
                    width="150"
                  >
                    <template slot-scope="scope">
                      <jereh-input
                        v-model="scope.row.resourceType"
                        clearable
                        :disabled="!canEdit"
                      />
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="requirement"
                    align="center"
                    label="具体要求"
                  >
                    <template slot-scope="scope">
                      <jereh-input
                        type="textarea"
                        v-model="scope.row.requirement"
                        :ph="scope.row.placeholder"
                        clearable
                        :disabled="!canEdit"
                      />
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="matchResult"
                    fix-right
                    align="center"
                    label="匹配结果"
                    width="180"
                  >
                    <template slot-scope="scope">
                      <el-radio-group v-model="scope.row.matchResult" :disabled="!canEdit">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="confirmDate"
                    fix-right
                    show-overflow-tooltip
                    align="center"
                    label="确认日期"
                    width="180"
                  >
                    <template slot-scope="scope">
                      <jereh-date-picker
                        clearable
                        v-model="scope.row.confirmDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        ph="请选择"
                        :disabled="!canEdit"
                      />
                    </template>
                  </af-table-column>
                  <af-table-column label="操作" align="center" fixed="right" width="80">
                    <template slot-scope="scope">
                      <jereh-button
                        size="mini"
                        type="text"
                        @click="deleteResourceMatching(scope.$index)"
                        :disabled="!canEdit"
                      >
                        删除
                      </jereh-button>
                    </template>
                  </af-table-column>
                </el-table>
              </div>
            </div>
            <!--            开展培训-->
            <div class="px-2 pb-2" v-if="stepIndex === 1">
              <div class="flex flex-wrap">
                <el-form-item prop="trainingStart.trainingStartTime" label="培训开始日期" style="width: 33%;">
                  <jereh-date-picker v-model="trainingServiceDetail.trainingStart.trainingStartTime" :disabled="!canEdit"
                  ></jereh-date-picker>
                </el-form-item>
                <el-form-item prop="trainingStart.trainingEndTime" label="培训结束日期" style="width: 33%;">
                  <jereh-date-picker v-model="trainingServiceDetail.trainingStart.trainingEndTime" :disabled="!canEdit"
                  ></jereh-date-picker>
                </el-form-item>
                <el-form-item prop="trainingStart.totalTraingHours" label="培训总课时" style="width: 33%;">
                  <jereh-input v-model="trainingServiceDetail.trainingStart.totalTraingHours" type="number" disabled
                  ></jereh-input>
                </el-form-item>
              </div>
              <div class="flex align-center justify-between">
                <div class="font font-weight-bold mr-2">培训内容</div>
                <jereh-button round @click="addTrainingContentList" :disabled="!canEdit">添加</jereh-button>
              </div>
              <el-table
                class="my-2"
                :data="trainingServiceDetail.trainingStart.trainingContentList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="trainingStartTime"
                  fixed
                  label="培训开始时间"
                  align="center"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-date-picker
                      v-model="scope.row.trainingStartTime" type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      @change="changeTrainingStartTime($event,scope.$index)"
                      :disabled="!canEdit"
                    ></jereh-date-picker>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="trainingEndTime"
                  align="center"
                  label="培训结束时间"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-date-picker
                      v-model="scope.row.trainingEndTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      @change="changeTrainingEndTime($event,scope.$index)"
                      :disabled="!canEdit"
                    ></jereh-date-picker>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="courseName"
                  align="center"
                  label="课程名称"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.courseName" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="trainingContent"
                  align="center"
                  label="培训内容"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.trainingContent" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="speaker"
                  align="center"
                  label="主讲人"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-person-select v-model="scope.row.speaker" :multiple="false" :disabled="!canEdit"></jereh-person-select>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="trainingPlace"
                  align="center"
                  label="培训地点"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.trainingPlace" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="totalTrainingHours"
                  align="center"
                  label="培训课时"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.totalTrainingHours" type="number" disabled></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="isTraining"
                  align="center"
                  label="是否实施培训"
                  width="180"
                >
                  <template slot-scope="scope">
                    <el-radio-group v-model="scope.row.isTraining" @change="sumTotalTrainingHours" :disabled="!canEdit">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="notImplementReason"
                  align="center"
                  label="未实施原因"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.notImplementReason" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="80">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="deleteTrainingContentList(scope.$index)"
                      :disabled="!canEdit"
                    >
                      删除
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
              <el-form-item prop="trainingStart.trainingPic" label="培训照片" style="width: 100%;">
                <div class="font-sm text-danger">
                  要求：至少包含理论培训、现场培训的整体培训照片和颁发培训证书照片；若是线上培训上传线上培训软件截屏照片。
                </div>
                <image-upload v-model="trainingServiceDetail.trainingStart.trainingPic" :fileSize="10" :disabled="!canEdit"/>
              </el-form-item>
              <el-form-item prop="trainingStart.trainingRegForm" label="培训登记表" style="width: 100%;">
                <div class="font-sm text-danger">要求：若是线上培训，由培训负责人填写客户信息，客户签字处无需签字。</div>
                <file-upload v-model="trainingServiceDetail.trainingStart.trainingRegForm" :disabled="!canEdit"/>
              </el-form-item>
            </div>
            <!--            验证培训-->
            <div class="px-2 pb-2" v-if="stepIndex === 2">
              <div class="flex flex-wrap">
                <el-form-item prop="trainingValidation.verifyTrainingResults" label="验证培训结果"
                              style="width: 50%;"
                >
                  <el-radio-group v-model="trainingServiceDetail.trainingValidation.verifyTrainingResults">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item prop="trainingValidation.trainingAccessQRcode" label="培训考核二维码"
                              style="width: 50%;"
                              v-if="trainingServiceDetail.trainingValidation.verifyTrainingResults !== 0"
                >
                  <image-upload v-model="trainingServiceDetail.trainingValidation.trainingAccessQRcode"/>
                </el-form-item>
              </div>
              <el-form-item prop="trainingValidation.notImplementReason" label="未实施原因"
                            style="width: 100%;"
                            v-if="trainingServiceDetail.trainingValidation.verifyTrainingResults === 0"
              >
                <jereh-input v-model="trainingServiceDetail.trainingValidation.notImplementReason" type="textarea"/>
              </el-form-item>
              <div v-if="trainingServiceDetail.trainingValidation.verifyTrainingResults !== 0">
                <div class="flex align-start">
                  <div class="font font-weight-bold mr-2">验证结果</div>
                  <jereh-button
                    type="primary"
                    plain
                    icon="el-icon-upload2"
                    size="mini"
                    @click="importTemplateDate(value2)"
                    round
                  >
                    导入
                  </jereh-button>
                  <jereh-button round
                                type="primary"
                                plain
                                @click="handleDownloadTemplate(value2)"
                                v-hasPermi="['cmms:device:import']"
                  >
                    下载导入模板
                  </jereh-button>
                  <jereh-button round @click="addVerificationResultList">添加</jereh-button>
                  <el-form-item prop="trainingValidation.passingScore" label="考试通过分数"
                                style="width: 33%;"
                  >
                    <jereh-input v-model="trainingServiceDetail.trainingValidation.passingScore" type="number"
                                 :min="0"
                    />
                  </el-form-item>
                  <el-form-item prop="trainingValidation.averageScore" label="考试平均分数"
                                style="width: 33%;"
                  >
                    <jereh-input v-model="trainingServiceDetail.trainingValidation.averageScore" type="number"
                                 disabled
                    />
                  </el-form-item>
                </div>
                <el-table
                  class="my-2"
                  :data="trainingServiceDetail.trainingValidation.verificationResultList" border :fit="true"
                >
                  <af-table-column
                    type="index"
                    fixed
                    align="center"
                    width="50"
                  >
                  </af-table-column>
                  <af-table-column
                    prop="name"
                    fixed
                    label="姓名"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`trainingValidation.verificationResultList.${scope.$index}.name`"
                                    :rules="tableRules.name" label-width="0px"
                      >
                        <jereh-input v-model="scope.row.name"></jereh-input>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="post"
                    align="center"
                    label="岗位"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`trainingValidation.verificationResultList.${scope.$index}.post`"
                                    :rules="tableRules.post" label-width="0px"
                      >
                        <jereh-input v-model="scope.row.post"></jereh-input>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="contactPhone"
                    align="center"
                    label="联系方式"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`trainingValidation.verificationResultList.${scope.$index}.contactPhone`"
                                    :rules="tableRules.contactPhone" label-width="0px"
                      >
                        <jereh-input v-model="scope.row.contactPhone"></jereh-input>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="score"
                    align="center"
                    label="考试成绩"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`trainingValidation.verificationResultList.${scope.$index}.score`"
                                    :rules="tableRules.score" label-width="0px"
                      >
                        <jereh-input v-model="scope.row.score" type="number" @change="changeScore($event,scope.$index)"
                                     :min="0"
                        ></jereh-input>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="isExamination"
                    align="center"
                    label="是否需要补考"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`trainingValidation.verificationResultList.${scope.$index}.isExamination`"
                                    :rules="tableRules.isExamination" label-width="0px"
                      >
                        <el-radio-group v-model="scope.row.isExamination"
                                        @change="changeExamination($event,scope.$index)"
                        >
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="examinationScore"
                    align="center"
                    label="补考成绩"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`trainingValidation.verificationResultList.${scope.$index}.examinationScore`"
                                    :rules="[{ ...tableRules.examinationScore[0], row: scope.row }]" label-width="0px"
                      >
                        <jereh-input v-model="scope.row.examinationScore" type="number"
                                     :disabled="scope.row.isExamination === 0"
                        ></jereh-input>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="notExaminationReason"
                    align="center"
                    label="未补考原因"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="`trainingValidation.verificationResultList.${scope.$index}.notExaminationReason`"
                        :rules="[{ ...tableRules.notExaminationReason[0], row: scope.row }]" label-width="0px"
                      >

                        <jereh-input v-model="scope.row.notExaminationReason" :disabled="scope.row.isExamination === 0"
                        ></jereh-input>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="isPass"
                    align="center"
                    label="是否通过"
                  >
                    <template slot-scope="scope">
                      <el-form-item :prop="`trainingValidation.verificationResultList.${scope.$index}.isPass`"
                                    :rules="tableRules.isPass" label-width="0px"
                      >
                        <el-radio-group v-model="scope.row.isPass">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column label="操作" align="center" fixed="right" width="80">
                    <template slot-scope="scope">
                      <jereh-button
                        size="mini"
                        type="text"
                        @click="deleteVerificationResultList(scope.$index)"
                      >
                        删除
                      </jereh-button>
                    </template>
                  </af-table-column>
                </el-table>
                <div class="flex flex-wrap">
                  <el-form-item prop="trainingValidation.trainingQA" label="培训答疑"
                                style="width: 33%;"
                  >
                    <el-radio-group v-model="trainingServiceDetail.trainingValidation.trainingQA">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item prop="trainingValidation.questioner" label="答疑人"
                                style="width: 33%;" v-if="trainingServiceDetail.trainingValidation.trainingQA !== 0"
                  >
                    <jereh-input v-model="trainingServiceDetail.trainingValidation.questioner"/>
                  </el-form-item>
                  <el-form-item prop="trainingValidation.QADate" label="答疑日期"
                                style="width: 33%;" v-if="trainingServiceDetail.trainingValidation.trainingQA !== 0"
                  >
                    <jereh-date-picker v-model="trainingServiceDetail.trainingValidation.QADate"/>
                  </el-form-item>
                </div>
              </div>
              <div class="flex flex-wrap">
                <el-form-item prop="trainingValidation.issueCertificate" label="是否颁发证书"
                              style="width: 33%;"
                >
                  <el-radio-group v-model="trainingServiceDetail.trainingValidation.issueCertificate">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <el-form-item prop="trainingValidation.satisfactionSurvey" label="满意度调研"
                            style="width: 100%;"
              >
                <div class="flex align-start">
                  <file-upload class="ml-2" v-model="trainingServiceDetail.trainingValidation.satisfactionSurvey"
                               :isShowOther="true" :otherButtonName="'创建调研'" @clickOther="createSurvey"
                  >
                  </file-upload>
                </div>
              </el-form-item>
              <el-table
                v-if="showSurveyList"
                class="my-2"
                :data="trainingServiceDetail.trainingValidation.satisfactionSurveyList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="templateName"
                  fixed
                  label="模板名称"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="surveyQuestionNo"
                  show-overflow-tooltip
                  align="center"
                  label="调研问卷编号"
                >
                </af-table-column>
              </el-table>
            </div>
            <!--            总结培训-->
            <div class="px-2 pb-2" v-if="stepIndex === 3">
              <el-form-item prop="trainingSummary.isTrackTraining" label="跟踪培训效果"
                            style="width: 100%;"
              >
                <el-radio-group v-model="trainingServiceDetail.trainingSummary.isTrackTraining">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
                <span class="font-sm text-danger ml-2">
                  设备交付创建的培训需要执行跟踪培训效果
                </span>
              </el-form-item>
              <el-form-item prop="trainingSummary.notImplementReason" label="未实施原因"
                            style="width: 100%;" v-if="trainingServiceDetail.trainingSummary.isTrackTraining === 0"
              >
                <jereh-input v-model="trainingServiceDetail.trainingSummary.notImplementReason" type="textarea">
                </jereh-input>
              </el-form-item>
              <div v-if="trainingServiceDetail.trainingSummary.isTrackTraining !== 0">
                <div class="flex flex-wrap">
                  <el-form-item prop="trainingSummary.trackingWells" label="跟踪井次数量"
                                style="width: 33%;"
                  >
                    <jereh-input v-model="trainingServiceDetail.trainingSummary.trackingWells" type="number">
                    </jereh-input>
                  </el-form-item>
                  <el-form-item prop="trainingSummary.proficiency" label="产品应用熟练度"
                                style="width: 33%;"
                  >
                    <jereh-select v-model="trainingServiceDetail.trainingSummary.proficiency"
                                  :dict="dict.type.proficiency"
                    >
                    </jereh-select>
                  </el-form-item>
                  <el-form-item prop="trainingSummary.remark" label="备注"
                                style="width: 33%;"
                  >
                    <el-input v-model="trainingServiceDetail.trainingSummary.remark"
                              placeholder="产品操作/保养效果的总体评价原因描述"
                    >
                    </el-input>
                  </el-form-item>
                </div>
                <div class="flex align-center justify-between">
                  <div class="font font-weight-bold">亮点</div>
                  <jereh-button @click="addHighLightList">添加</jereh-button>
                </div>
                <el-table
                  class="my-2"
                  :data="trainingServiceDetail.trainingSummary.highLightList" border :fit="true"
                >
                  <af-table-column
                    type="index"
                    fixed
                    align="center"
                    width="50"
                  >
                  </af-table-column>
                  <af-table-column
                    prop="description"
                    fixed
                    label="亮点描述"
                    align="center"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <jereh-input v-model="scope.row.description" type="textarea"></jereh-input>
                    </template>
                  </af-table-column>
                  <af-table-column label="操作" align="center" fixed="right" width="80">
                    <template slot-scope="scope">
                      <jereh-button
                        size="mini"
                        type="text"
                        @click="deleteHighLightList(scope.$index)"
                      >
                        删除
                      </jereh-button>
                    </template>
                  </af-table-column>
                </el-table>
                <div class="flex align-center justify-between">
                  <div class="font font-weight-bold">不足</div>
                  <jereh-button @click="addInsufficientList">添加</jereh-button>
                </div>
                <el-table
                  class="my-2"
                  :data="trainingServiceDetail.trainingSummary.insufficientList" border :fit="true"
                >
                  <af-table-column
                    type="index"
                    fixed
                    align="center"
                    width="50"
                  >
                  </af-table-column>
                  <af-table-column
                    prop="description"
                    fixed
                    label="不足描述"
                    align="center"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <jereh-input v-model="scope.row.description" type="textarea"></jereh-input>
                    </template>
                  </af-table-column>
                  <af-table-column label="操作" align="center" fixed="right" width="80">
                    <template slot-scope="scope">
                      <jereh-button
                        size="mini"
                        type="text"
                        @click="deleteInsufficientList(scope.$index)"
                      >
                        删除
                      </jereh-button>
                    </template>
                  </af-table-column>
                </el-table>
              </div>
              <el-form-item prop="trainingSummary.trainingResultFeedback" label="培训结果反馈"
                            style="width: 33%;"
              >
                <el-radio-group v-model="trainingServiceDetail.trainingSummary.trainingResultFeedback">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="trainingSummary.trainingResultNotImplementReason" label="未实施原因"
                            style="width: 100%;"
                            v-if="trainingServiceDetail.trainingSummary.trainingResultFeedback === 0"
              >
                <jereh-input v-model="trainingServiceDetail.trainingSummary.trainingResultNotImplementReason"
                             type="textarea"
                >
                </jereh-input>
              </el-form-item>
              <div class="flex flex-wrap" v-if="trainingServiceDetail.trainingSummary.trainingResultFeedback !== 0">
                <el-form-item prop="trainingSummary.customerContact" label="客户联系人"
                              style="width: 33%;"
                >
                  <jereh-input v-model="trainingServiceDetail.trainingSummary.customerContact">
                  </jereh-input>
                </el-form-item>
                <el-form-item prop="trainingSummary.contactPhone" label="客户联系方式"
                              style="width: 33%;"
                >
                  <jereh-input v-model="trainingServiceDetail.trainingSummary.contactPhone">
                  </jereh-input>
                </el-form-item>
                <el-form-item prop="trainingSummary.customerFeedback" label="客户反馈意见"
                              style="width: 100%;"
                >
                  <jereh-input v-model="trainingServiceDetail.trainingSummary.customerFeedback" type="textarea">
                  </jereh-input>
                </el-form-item>
              </div>
            </div>
            <!--            培训关闭 -->
            <div class="px-2 pb-2" v-if="stepIndex === 4">
              <last-stage ref="lastStage" serviceType="培训服务" :auditRecord="trainingServiceDetail.trainingClose.records" :canEdit="canClose"></last-stage>
            </div>
          </div>
          <!--          操作记录-->
          <div class="border rounded" v-if="isShowService">
            <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
              <div class="font">操作记录</div>
            </div>
            <operationRecord :service-code="trainingServiceDetail.serviceCode"
                             :service-stage-code="stepIndex"
                             :data-id="trainingServiceDetail.id"
                             ref="operationRecord"
            ></operationRecord>
          </div>
        </el-form>
      </div>
    </div>
    <!--    绑定项目弹窗-->
    <el-dialog title="绑定项目" :visible.sync="showBindProject" width="900px" append-to-body
               :close-on-click-modal="false"
    >
      <el-form class="mt-2 flex justify-between" :model="bindProjectQueryParams" ref="bindProjectQueryParams"
               size="mini"
               :inline="true"
               label-width="120px"
      >
        <el-form-item prop="serviceCode" style="width: 120px;">
          <jereh-input ph="服务编码" v-model="bindProjectQueryParams.serviceCode" @enter="handleBindProjectQuery"
          ></jereh-input>
        </el-form-item>
        <el-form-item prop="projectItem" style="width: 120px;">
          <jereh-input ph="项目编码分项" v-model="bindProjectQueryParams.projectItem" @enter="handleBindProjectQuery"
          ></jereh-input>
        </el-form-item>
        <el-form-item prop="productName" style="width: 120px;">
          <jereh-select
            v-model="bindProjectQueryParams.productName"
            filterable
            ph="产品名称"
            clearable
            @keyup.enter.native="handleBindProjectQuery"
            :dict="dict.type.product_name"
          />
        </el-form-item>
        <el-form-item prop="productCode" style="width: 120px;">
          <jereh-input ph="产品编号" v-model="bindProjectQueryParams.productCode" @enter="handleBindProjectQuery"
          ></jereh-input>
        </el-form-item>
        <el-form-item>
          <jereh-button @click="handleBindProjectQuery">搜索</jereh-button>
        </el-form-item>
      </el-form>
      <el-table :data="sdServicePoolList" border>
        <af-table-column type="index" align="center" width="50"/>
        <af-table-column label="服务编码" align="center" prop="serviceCode" show-overflow-tooltip/>
        <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip/>
        <af-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip/>
        <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip/>
        <af-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.select">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </template>
        </af-table-column>
      </el-table>
      <Pagination
        v-show="bindProjectQueryParams.total>0"
        :total="bindProjectQueryParams.total"
        :page.sync="bindProjectQueryParams.pageNum"
        :limit.sync="bindProjectQueryParams.pageSize"
        @pagination="getSdServicePoolList"
      />
      <jereh-button @click="selectBindProject">确定</jereh-button>
    </el-dialog>
    <!--    绑定设备弹窗-->
    <el-dialog title="绑定设备" :visible.sync="openDeviceBinding" width="900px" append-to-body
               :close-on-click-modal="false"
    >
      <el-form class="mt-2 flex justify-between" :model="deviceQueryParams" ref="deviceQueryParams" size="mini"
               :inline="true"
               label-width="120px"
      >
        <!-- <el-form-item prop="serviceCode" style="width: 120px;">
          <jereh-input
            v-model="deviceQueryParams.serviceCode"
            ph="服务编码"
            clearable
            @keyup.enter.native="handleDeviceQuery"
          />
        </el-form-item> -->
        <el-form-item prop="projectItem" style="width: 180px;">
          <jereh-input
            v-model="deviceQueryParams.projectItem"
            ph="项目编码分项"
            clearable
            @keyup.enter.native="handleDeviceQuery"
          />
        </el-form-item>
        <el-form-item prop="productName" style="width: 180px;">
          <jereh-select
            v-model="deviceQueryParams.productName"
            filterable
            ph="产品名称"
            clearable
            @keyup.enter.native="handleDeviceQuery"
            :dict="dict.type.product_name"
          />
        </el-form-item>
        <el-form-item prop="productCode" style="width: 180px;">
          <jereh-input
            v-model="deviceQueryParams.productCode"
            ph="产品编号"
            clearable
            @keyup.enter.native="handleDeviceQuery"
          />
        </el-form-item>
        <el-form-item>
          <jereh-button type="primary" size="mini" @click="handleDeviceQuery">搜索</jereh-button>
        </el-form-item>
      </el-form>
      <el-table :data="deviceList" border ref="registTable">
        <af-table-column type="index" align="center" width="50"/>
        <!-- <af-table-column label="服务编码" align="center" prop="serviceCode" show-overflow-tooltip/> -->
        <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip/>
        <af-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip/>
        <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip/>
        <!-- <af-table-column label="是否选定" align="center" prop="select" fixed="right" width="150">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.select">
              <el-radio :label="1"></el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </template>
        </af-table-column> -->
        <af-table-column type="selection" width="55" label="是否选定" align="center"></af-table-column>
      </el-table>
      <Pagination
        v-show="deviceQueryParams.total>0"
        :total="deviceQueryParams.total"
        :page.sync="deviceQueryParams.pageNum"
        :limit.sync="deviceQueryParams.pageSize"
        @pagination="getDeviceList"
      />
      <div class="flex justify-end mt-3 mx-1">
        <jereh-button @click="selectBindDevice">确定</jereh-button>
      </div>
    </el-dialog>
    <el-dialog title="培训报告" :visible.sync="trainingReportShow" width="1000px" append-to-body
               :close-on-click-modal="false">
               <iframe
                width="100%"
                height="1000px"
                :src="trainingReportLink"
              >
              </iframe>
    </el-dialog>
    <el-dialog title="培训总结" :visible.sync="trainingReportShow1" width="1000px" append-to-body
               :close-on-click-modal="false">
               <iframe
                width="100%"
                height="1000px"
                :src="trainingReportLink1"
              >
              </iframe>
    </el-dialog>
    <!--    导入对话框-->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!--        <div class="el-upload__tip" slot="tip">-->
        <!--          <el-checkbox v-model="upload.updateSupport"/>-->
        <!--          是否更新已经存在的设备数据-->
        <!--          <el-link type="info" style="font-size:12px" @click="handleDownloadTemplate">下载模板</el-link>-->
        <!--        </div>-->
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <jereh-button type="primary" @click="submitFileForm">确 定</jereh-button>
        <jereh-button @click="upload.open = false">取 消</jereh-button>
      </div>
    </el-dialog>
    <servicePoolBinding ref="servicePoolBinding" @confirm="confirmServicePoolBinding"></servicePoolBinding>
    <!-- 工时记录 -->
    <el-dialog title="工时记录" :visible.sync="showRecord" v-if="showRecord" width="70%" append-to-body :close-on-click-modal="false" destroy-on-close>
      <man-hours-record serviceType="培训服务" :serviceCode="trainingServiceDetail.trainingCode" :projectItem="trainingServiceDetail.projectItem"></man-hours-record>
    </el-dialog>
  </div>

</template>

<script>
import vueSignature from 'vue-signature'
import { getSdServicePool, listSdServicePool } from '../../../api/cmms/sdServicePool'
import { remoteUser, sdDeviceInfoPage } from '../../../api/cmms/device'
import { getDirector } from '../../../api/system/user'
import { getToken } from '@/utils/auth'
import {
  addApprove,
  checkIsPass,
  getTrainingServiceDetail,
  nextStep,
  resourceMatchByTrainingCode, topBtnUpdateTrainingService, trainAccomplish,
  updateTrainingService,
  finishRectification
} from '../../../api/cmms/sdTrainingService'
import servicePoolBinding from './components/servicePoolBinding'
import operationRecord from './components/operationRecord'
import ManHoursRecord from './components/manHoursRecord.vue'
import LastStage from './components/lastStage.vue'

export default {
  dicts: ['service_type', 'service_level', 'service_status', 'handover_place', 'check_template', 'processing_status',
    'disclosure_tracking_result', 'product_name', 'training_mode', 'equipment_scope', 'sys_customer_bg',
    'training_course', 'interview_form', 'proficiency', 'training_place', 'training_attribute', 'after_sale_area'],
  components: {
    vueSignature,
    servicePoolBinding,
    operationRecord,
    ManHoursRecord,
    LastStage
  },
  data() {
    return {
      passCheck: false,
      isFinishing: 0,
      isDisabled: false,
      trainingState: '',
      saleAreaDirector: [],
      trainingReportLink:"",
      trainingReportLink1:"",
      isSave: 0,
      trainingReportShow:false,
      trainingReportShow1:false,
      value1: 1,
      value2: 2,
      sum: 0,
      isPass: 0,
      id: '',
      type: 'add',
      validServiceCode: null,
      upload:
        {
          // 是否显示弹出层
          open: false,
          // 弹出层标题
          title: '',
          // 是否禁用上传
          isUploading: false,
          // 是否更新已经存在的
          updateSupport: 0,
          // 设置上传的请求头部
          headers: { Authorization: 'Bearer ' + getToken() },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + '/cmms/trainingService/importData'
        },
      deviceQueryParams: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        serviceCode: null,
        projectItem: null,
        productCode: null,
        productName: null,
        agency: 0
      },
      deviceList: [],
      openDeviceBinding: false,
      trainingServiceDetail: {
        deviceList: [],
        afterSaleArea: null,
        trainingPreparation: {
          resourceMatch: [],
          trainingPlanList: [],
          equipmentScope: [],
          customerMark: [],
          trainingCourse: [],
          status: ''
        },
        trainingStart: {
          status: '',
          trainingContentList: []
        },
        trainingValidation: {
          verificationResultList: [],
          status: ''
        },
        trainingSummary: {
          status: ''
        },
        trainingClose: {
          status: '',
          records: {}
        }
      },
      sdServicePoolList: {},
      bindProjectQueryParams: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        serviceCode: null,
        projectItem: null,
        productCode: null,
        productName: null
      },
      isShowService: true,
      bindType: '',
      showBindProject: false,
      showCheckDebugList: false,
      showProductPackingList: false,
      loading: false,
      bindUserOptions: [],
      signField: '',
      signatureVisible: false,
      signOption: {
        penColor: 'rgb(0, 0, 0)',//画笔颜色
        backgroundColor: 'rgb(245,245,245)'//背景颜色
      },
      stepIndex: 0,
      stepList: [{
        name: '准备培训',
        field: 'trainingPreparation'
      }, {
        name: '开展培训',
        field: 'trainingStart'
      }, {
        name: '验证培训',
        field: 'trainingValidation'
      }, {
        name: '总结培训',
        field: 'trainingSummary'
      },{
        name: '培训结束',
        field: 'trainingClose'
      }],
      rules: {
        ['trainingPreparation.interviewDate']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingPreparation.interviewForm']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingPreparation.trainees']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingPreparation.requireTrainCert']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingPreparation.trainingMode']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingPreparation.equipmentScope']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingPreparation.customerMark']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingPreparation.trainingCourse']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingStart.trainingStartTime']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] },
          { validator: this.checkBgnTime, trigger: ['blur', 'change'] }
        ],
        ['trainingStart.trainingEndTime']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] },
          { validator: this.checkEndTime, trigger: ['blur', 'change'] }
        ],
        ['trainingStart.totalTraingHours']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingStart.trainingPic']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingStart.trainingRegForm']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingValidation.verifyTrainingResults']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingValidation.trainingAccessQRcode']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingValidation.notImplementReason']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingValidation.passingScore']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingValidation.averageScore']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingValidation.trainingQA']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingValidation.questioner']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingValidation.QADate']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingValidation.issueCertificate']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingSummary.isTrackTraining']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingSummary.notImplementReason']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingSummary.trackingWells']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingSummary.proficiency']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingSummary.trainingResultFeedback']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingSummary.trainingResultNotImplementReason']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingSummary.customerContact']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingSummary.contactPhone']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['trainingSummary.customerFeedback']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ]
      },
      // 是否展示满意度列表
      showSurveyList: false,
      // 验证结果表格校验
      tableRules: {
        required: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入岗位', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入考试成绩', trigger: 'blur' }
        ],
        isExamination: [
          { required: true, message: '请选择是否补考', trigger: 'change' }
        ],
        examinationScore: [
          { validator: this.examinationRule, trigger: ['blur', 'change'] }
        ],
        notExaminationReason: [
          { validator: this.examinationReasonRule, trigger: ['blur', 'change'] }
        ],
        isPass: [
          { required: true, message: '请选择是否通过', trigger: 'change' }
        ]
      },
      // 展示工时记录
      showRecord: false,
      // 权限控制
      canEdit: false,
      canClose: false
    }

  },
  watch: {
    stepIndex: {
      immediate: true,
      handler(newValue, oldValue) {
        newValue === 1 ? this.syncTrainingContent() : ''
      }
    },
    'trainingServiceDetail.trainingStart.trainingContentList': {
      handler(newValue, oldValue) {
        this.sum = 0
        for (const item of newValue) {
          let startTime = new Date(item.trainingStartTime)
          let endTime = new Date(item.trainingEndTime)
          let hours = (endTime - startTime) / 1000 / 60 / 60
          item.totalTrainingHours = parseFloat(hours).toFixed(2)
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.trainingServiceDetail.id = this.$route.query.id
    if (this.$route.query.isSave) {
      this.isSave = this.$route.query.isSave
    }
    if (this.$route.query.trainingState) {
      this.trainingState = this.$route.query.trainingState
    }
    this.trainingServiceDetail.poolId = this.$route.query.poolId
    this.trainingServiceDetail.afterSaleArea = this.$route.query.afterSaleArea
    if (this.$route.query.isShowService) {
      this.isShowService = false
    } else {
      this.isShowService = true
    }
    this.serviceCodeList = this.$route.query.serviceCodeList
    this.getTrainingServiceDetail(this.serviceCodeList)
    this.getDeviceList()
    this.checkIsPass()
  },
  methods: {
    showTainingReport(){
      const resultList = []
      this.$refs.trainingServiceDetail.validateField([
        "trainingSummary.isTrackTraining",
        "trainingSummary.notImplementReason",
        "trainingSummary.trackingWells",
        "trainingSummary.proficiency",
        "trainingSummary.remark"
      ], valid => {
        resultList.push(valid)
      })
      const index = resultList.findIndex(item => item !== "" && item)
      if (index !== -1) {
        console.log(resultList[index])
        this.$modal.msgError('请填写跟踪培训效果内容')
        return
      }
      const isEmptyhighLightList = this.trainingServiceDetail.trainingSummary.highLightList.length ? false : true
      if (this.trainingServiceDetail.trainingSummary.isTrackTraining === 1 && isEmptyhighLightList) {
        this.$modal.msgError('请完整填写亮点表格')
        return
      }
      const isEmptyinsufficientList = this.trainingServiceDetail.trainingSummary.insufficientList.length ? false : true
      if (this.trainingServiceDetail.trainingSummary.isTrackTraining === 1 && isEmptyinsufficientList) {
        this.$modal.msgError('请完整填写不足表格')
        return
      }
      this.$router.push({
        path: "/cmms/device/print",
        query: { id: this.trainingServiceDetail.id,type:5 },
      });
    },
    showTainingReport1(){
      const resultList = []
      this.$refs.trainingServiceDetail.validateField([
        "trainingSummary.trainingResultFeedback",
        "trainingSummary.trainingResultNotImplementReason",
        "trainingSummary.customerContact",
        "trainingSummary.contactPhone",
        "trainingSummary.customerFeedback"
      ], valid => {
        resultList.push(valid)
      })
      const index = resultList.findIndex(item => item !== "" && item)
      if (index !== -1) {
        console.log(resultList[index])
        this.$modal.msgError('请填写培训结果反馈内容')
        return
      }
      this.$router.push({
        path: "/cmms/device/print",
        query: { id: this.trainingServiceDetail.id,type:6 },
      });
    },
    examinationRule(rule, value, callback) {
      if (rule.row && rule.row.isExamination === 1 && !rule.row.examinationScore && !rule.row.notExaminationReason) {
        callback(new Error('请填写必填项'))
      } else {
        callback()
      }
    },
    examinationReasonRule(rule, value, callback) {
      if (rule.row && rule.row.isExamination === 1 && !rule.row.examinationScore && !rule.row.notExaminationReason) {
        callback(new Error('请填写必填项'))
      } else {
        callback()
      }
    },
    // 切换是否补考
    changeExamination(data, index) {
      if (data === 0) {
        this.$set(this.trainingServiceDetail.trainingValidation.verificationResultList[index], 'examinationScore', null)
        this.$set(this.trainingServiceDetail.trainingValidation.verificationResultList[index], 'notExaminationReason', null)
      }
    },
    //校验培训开始日期
    checkEndTime(rule, value, callback) {
      if (!value) {
        callback(new Error('请选择培训结束日期'))
      } else {
        if (Date.parse(this.trainingServiceDetail.trainingStart.trainingStartTime) > Date.parse(this.trainingServiceDetail.trainingStart.trainingEndTime)) {
          callback(new Error('不能小于培训开始日期'))
        } else {
          callback()
        }
      }
    },
    //校验培训开始日期
    checkBgnTime(rule, value, callback) {
      if (!value) {
        callback(new Error('请选择培训开始日期'))
      } else {
        if (Date.parse(this.trainingServiceDetail.trainingStart.trainingStartTime) > Date.parse(this.trainingServiceDetail.trainingStart.trainingEndTime)) {
          callback(new Error('不能大于培训结束日期'))
        } else {
          callback()
        }
      }
    },
    //检验培训开始时间
    // isOpenDeviceBinding() {
    //     this.trainingServiceDetail.bindDeviceList = [];
    //     this.$refs.registTable.selection = [];
    //     this.openDeviceBinding = true;
    // },

    changeFirstTrainingStartTime(data, index) {
      let startTime = new Date(data)
      let endTime = new Date(this.trainingServiceDetail.trainingPreparation.trainingPlanList[index].trainingEndTime)
      if (startTime > endTime) {
        this.$message.error('开始时间需要小于结束时间')
        this.trainingServiceDetail.trainingPreparation.trainingPlanList[index].trainingStartTime = ''
      }
    },
    changeFirstTrainingEndTime(data, index) {
      let endTime = new Date(data)
      let startTime = new Date(this.trainingServiceDetail.trainingPreparation.trainingPlanList[index].trainingStartTime)
      if (startTime > endTime) {
        this.$message.error('结束时间需要大于开始时间')
        this.trainingServiceDetail.trainingPreparation.trainingPlanList[index].trainingEndTime = ''
      }
    },
    checkIsPass() {
      let data = {
        id: this.trainingServiceDetail.id
      }
      checkIsPass(data).then(res => {
        console.log(res)
        if (res.data) {
          this.isPass = res.data.isPass
        }
        if (this.isPass == 1) {
          this.passCheck = true
        }
        console.log(this.isPass)
        console.log(this.passCheck)
      })
    },
    handAboutDeviceDelect(row) {
      this.trainingServiceDetail.bindDeviceList.splice(this.trainingServiceDetail.bindDeviceList.indexOf(row.id), 1)
    },
    changeType(data) {
      if (data == null || data == '') {
        return
      }
      if (data == '保外服务') {
        this.saleAreaDirector.length = 0
        this.saleAreaDirector.push(this.trainingServiceDetail.maketDirector)
      } else {
        if (this.trainingServiceDetail.afterSaleArea != null) {
          this.findDirector(this.trainingServiceDetail.afterSaleArea)
        }
      }
    },
    openApprove() {
      this.isDisabled = true
      if (this.stepIndex === 0) {
        this.$refs.trainingServiceDetail.validate(async(valid) => {
          if (valid) {
            if (this.trainingServiceDetail.trainingPreparation.trainingPlanList.length == 0) {
              this.$modal.msgError('请完整填写培训计划')
              this.isDisabled = false
              return
            }
            var j = 0
            if (this.trainingServiceDetail.trainingPreparation.trainingPlanList.length != 0) {
              this.trainingServiceDetail.trainingPreparation.trainingPlanList.forEach((item) => {
                if (item.trainingStartTime == '' || item.trainingStartTime == null || item.trainingEndTime == '' || item.trainingEndTime == null || item.courseName == '' || item.courseName == null || item.trainingContent == '' || item.trainingContent == null || item.speaker == '' || item.speaker == null || item.trainingPlace == '' || item.trainingPlace == null) {
                  j = 1
                }
              })
              this.isDisabled = false
            }
            if (j == 1) {
              this.$modal.msgError('请完整填写培训计划')
              this.isDisabled = false
              return
            }
            if (this.trainingServiceDetail.trainingAttribute == '' || this.trainingServiceDetail.trainingAttribute == null) {
              this.$modal.msgError('请选择培训属性')
              this.isDisabled = false
              return
            }
            if (this.trainingServiceDetail.afterSaleArea == null || this.trainingServiceDetail.afterSaleArea == '') {
              this.$modal.msgError('请选择售后区域')
              this.isDisabled = false
              return
            }
            const isEmptyResourceMatch = await this.$U.checkListFieldsEmpty(this.trainingServiceDetail.trainingPreparation.resourceMatch)
            if (isEmptyResourceMatch) {
              this.$modal.msgError('请完整填写资源匹配')
              this.isDisabled = false
              return
            }
            if (this.trainingServiceDetail.trainingAttribute == '保外服务') {
              this.saleAreaDirector.length = 0
              this.saleAreaDirector.push(this.trainingServiceDetail.maketDirector)
            } else {
              if (this.trainingServiceDetail.afterSaleArea != null || this.trainingServiceDetail.afterSaleArea != '') {
                this.findDirector(this.trainingServiceDetail.afterSaleArea)
              }
            }
            setTimeout(() => {
              let data = {
              id: this.$route.query.id,
              headContent: '培训服务',
              recipientList: this.saleAreaDirector,
              path: '/cmms/serviceDelivery/trainingServiceDetail',
              isCheck: 0,
              isPass: 0,
              delflag: 1
            }
            addApprove(data).then(res => {
              if (res.msg == '200') {
                this.$message({
                  message: '提交审批成功',
                  type: 'success'
                })
                this.handleSaveClick(true)
                this.isDisabled = false
              } else {
                this.$message.error('请勿重复提交')
                this.isDisabled = false
              }

            })
	           },800);
          } else {
            this.$modal.msgError('请填写必填项')
            this.isDisabled = false
            return
          }
        })
      }

    },
    resourceMatchSearch() {
      if (this.validServiceCode != null && this.validServiceCode != '') {
        resourceMatchByTrainingCode(this.validServiceCode).then(res => {
          if (res.data.trainingPreparation.resourceMatch != undefined || res.data.trainingPreparation.resourceMatch != null) {
            this.trainingServiceDetail.trainingPreparation.resourceMatch = res.data.trainingPreparation.resourceMatch
            for (var i = 0; i < res.data.trainingPreparation.resourceMatch.length; i++) {
              this.trainingServiceDetail.trainingPreparation.resourceMatch[i].matchResult = null
              this.trainingServiceDetail.trainingPreparation.resourceMatch[i].confirmDate = null
            }
          }
        })
      }
    },
    findDirector(data) {
      if (data == null || data == '') {
        return
      }
      let query = {
        saleArea: 'cmms:area:' + data
      }
      getDirector(query).then(res => {
        this.saleAreaDirector.length = 0
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i] != null) {
            this.saleAreaDirector.push(res.data[i].nickName)
          }
        }
      })

    },
    openServicePoolBinding() {
      this.$refs.servicePoolBinding.openDialog()
    },
    confirmServicePoolBinding(serviceCodeList) {
      console.log(serviceCodeList)
      this.trainingServiceDetail.serviceCode = serviceCodeList.join(',')
    },
    changeScore(score, index) {
      var sum = 0
      for (const item of this.trainingServiceDetail.trainingValidation.verificationResultList) {
        sum += parseFloat(item.score)
      }
      this.trainingServiceDetail.trainingValidation.averageScore = Math.round(sum / this.trainingServiceDetail.trainingValidation.verificationResultList.length * 100) / 100
    },
    changeTrainingStartTime(data, index) {
      let startTime = new Date(data)
      let endTime = new Date(this.trainingServiceDetail.trainingStart.trainingContentList[index].trainingEndTime)
      if (startTime > endTime) {
        this.$message.error('开始时间需要小于结束时间')
        this.trainingServiceDetail.trainingStart.trainingContentList[index].trainingStartTime = ''
        this.trainingServiceDetail.trainingStart.trainingContentList[index].totalTrainingHours = 0
        this.sumTotalTrainingHours()
        return
      }
      let hours = (endTime - startTime) / 1000 / 60 / 60
      this.trainingServiceDetail.trainingStart.trainingContentList[index].totalTrainingHours = parseFloat(hours).toFixed(2)
      this.sumTotalTrainingHours()
    },
    changeTrainingEndTime(data, index) {
      let endTime = new Date(data)
      let startTime = new Date(this.trainingServiceDetail.trainingStart.trainingContentList[index].trainingStartTime)
      if (startTime > endTime) {
        this.$message.error('结束时间需要大于开始时间')
        this.trainingServiceDetail.trainingStart.trainingContentList[index].trainingEndTime = ''
        this.trainingServiceDetail.trainingStart.trainingContentList[index].totalTrainingHours = 0
        this.sumTotalTrainingHours()
        return
      }
      let hours = (endTime - startTime) / 1000 / 60 / 60
      this.trainingServiceDetail.trainingStart.trainingContentList[index].totalTrainingHours = parseFloat(hours).toFixed(2)
      this.sumTotalTrainingHours()
    },
    sumTotalTrainingHours() {
      this.sum = 0
      let minStart = ''
      let maxEnd = ''
      for (const item of this.trainingServiceDetail.trainingStart.trainingContentList) {
        if (item.isTraining === 1 && item.totalTrainingHours) {
          this.sum += Number(item.totalTrainingHours)
        }
        if (item.isTraining === 1 && item.trainingStartTime) {
          if (minStart !== '') {
            const time1 = new Date(minStart).getTime()
            const time2 = new Date(item.trainingStartTime).getTime()
            if (time1 > time2) {
              minStart = item.trainingStartTime
            }
          } else {
            minStart = item.trainingStartTime
          }
        }
        if (item.isTraining === 1 && item.trainingEndTime) {
          if (maxEnd !== '') {
            const time1 = new Date(maxEnd).getTime()
            const time2 = new Date(item.trainingEndTime).getTime()
            if (time1 < time2) {
              maxEnd = item.trainingEndTime
            }
          } else {
            maxEnd = item.trainingEndTime
          }
        }
      }
      this.$set(this.trainingServiceDetail.trainingStart, 'totalTraingHours', parseFloat(this.sum).toFixed(2))
      this.$set(this.trainingServiceDetail.trainingStart, 'trainingStartTime', minStart)
      this.$set(this.trainingServiceDetail.trainingStart, 'trainingEndTime', maxEnd)
    },
    handleDeviceQuery() {
      this.deviceQueryParams.pageNum = 1
      this.getDeviceList()
    },
    selectDevice(row) {
      row.id = null
      Object.assign(this.servicePoolDetail, row)
      this.openDeviceBinding = false
    },
    getDeviceList() {
      sdDeviceInfoPage(this.deviceQueryParams).then(response => {
        this.deviceQueryParams.total = response.total
        this.deviceList = response.rows
      })
    },
    deleteInsufficientList(index) {
      this.trainingServiceDetail.trainingSummary.insufficientList.splice(index, 1)
    },
    addInsufficientList() {
      this.trainingServiceDetail.trainingSummary.insufficientList.push({})
    },
    deleteHighLightList(index) {
      this.trainingServiceDetail.trainingSummary.highLightList.splice(index, 1)
    },
    addHighLightList() {
      this.trainingServiceDetail.trainingSummary.highLightList.push({})
    },
    deleteVerificationResultList(index) {
      this.trainingServiceDetail.trainingValidation.verificationResultList.splice(index, 1)
    },
    addVerificationResultList() {
      this.trainingServiceDetail.trainingValidation.verificationResultList.push({})
    },
    deleteTrainingContentList(index) {
      this.trainingServiceDetail.trainingStart.trainingContentList.splice(index, 1)
      this.sumTotalTrainingHours()
    },
    addTrainingContentList() {
      this.trainingServiceDetail.trainingStart.trainingContentList.push({})
    },
    deleteResourceMatching(index) {
      this.trainingServiceDetail.trainingPreparation.resourceMatch.splice(index, 1)
    },
    addResourceMatching() {
      this.trainingServiceDetail.trainingPreparation.resourceMatch.push({})
    },
    addTrainingPlanList() {
      this.trainingServiceDetail.trainingPreparation.trainingPlanList.push({})
    },
    deleteTrainingPlanList(index) {
      this.trainingServiceDetail.trainingPreparation.trainingPlanList.splice(index, 1)
    },
    getTrainingServiceDetail(serviceCodeList) {
      getTrainingServiceDetail(this.trainingServiceDetail).then(res => {
        if (!res.data.bindDeviceList) {
          res.data.bindDeviceList = []
        }
        if (!res.data.trainingPreparation) {
          res.data.trainingPreparation = {}
        }
        if (!res.data.trainingStart) {
          res.data.trainingStart = {}
        }
        if (!res.data.trainingValidation) {
          res.data.trainingValidation = {}
        }
        if (!res.data.trainingSummary) {
          res.data.trainingSummary = {}
        }
        if (!res.data.trainingPreparation.equipmentScope) {
          res.data.trainingPreparation.equipmentScope = []
        }
        if (!res.data.trainingPreparation.customerMark) {
          res.data.trainingPreparation.customerMark = []
        }
        if (!res.data.trainingPreparation.trainingCourse) {
          res.data.trainingPreparation.trainingCourse = []
        }
        if (!res.data.trainingPreparation.trainingPlanList) {
          res.data.trainingPreparation.trainingPlanList = []
        }
        if (!res.data.trainingPreparation.resourceMatch) {
          res.data.trainingPreparation.resourceMatch = [{
            resourceType: '服务人员',
            requirement: null,
            matchResult: null,
            confirmDate: null,
            placeholder: '多设备/3天以上/多内容范围培训时需补充人员'
          }, {
            resourceType: '工具/设备',
            requirement: null,
            matchResult: null,
            confirmDate: null,
            placeholder: '包含培训教室基础设施与现场培训教具/设备、模拟演练软件系统硬件等；'
          }, {
            resourceType: '第三方支持',
            requirement: null,
            matchResult: null,
            confirmDate: null,
            placeholder: '识别底盘车、发动机、变速箱、纯外购设备培训内容支持'
          }, {
            resourceType: '技术人员支持',
            requirement: null,
            matchResult: null,
            confirmDate: null,
            placeholder: '识别产品发展趋势与新技术类培训和产品深度控制逻辑原理培训类内容协调研发工程师、企业文化类培训协调人力资源专员；'
          }, {
            resourceType: '技术资料',
            requirement: null,
            matchResult: null,
            confirmDate: null,
            placeholder: '设备操作保养手册、产品液压图纸、产品电气图纸、设备照片、相关方整理的培训课件、部门整理的标准培训课件'
          }, {
            resourceType: '客户资源支持',
            requirement: null,
            matchResult: null,
            confirmDate: null,
            placeholder: '司外培训如培训教室、培训用教具设备等；'
          }]
        }
        if (!res.data.trainingStart.trainingContentList) {
          res.data.trainingStart.trainingContentList = []
        }
        if (!res.data.trainingValidation.verificationResultList) {
          res.data.trainingValidation.verificationResultList = []
        }
        if (!res.data.trainingValidation.satisfactionSurveyList) {
          res.data.trainingValidation.satisfactionSurveyList = []
        }
        if (!res.data.trainingSummary.highLightList) {
          res.data.trainingSummary.highLightList = []
        }
        if (!res.data.trainingSummary.insufficientList) {
          res.data.trainingSummary.insufficientList = []
        }
        if (serviceCodeList) {
          res.data.serviceCode = serviceCodeList
        }
        this.trainingServiceDetail = res.data
        if (!this.trainingServiceDetail.trainingClose) {
          this.trainingServiceDetail.trainingClose = {
            status: '',
            records: {}
          }
        }
        // 根据服务来源查看
        const serviceFrom = this.$route.query.serviceFrom
        if (serviceFrom === "servicePool") {
          const serviceSource = this.$route.query.serviceSource
          console.log(serviceSource)
          if (serviceSource === '主动服务需求') {
            this.trainingServiceDetail.trainingAttribute = '主动服务'
          }
          if (serviceSource === '质保服务需求') {
            this.trainingServiceDetail.trainingAttribute = '质保服务'
          }
          if (serviceSource === '合同评审流程' || serviceSource ==='保外服务需求') {
            this.trainingServiceDetail.trainingAttribute = '保外服务'
          }
        }
        if (serviceFrom === "framework") {
          this.trainingServiceDetail.trainingLevel = ''
          this.trainingServiceDetail.trainingAttribute = '保外服务'
        }
        if (serviceFrom === "device") {
          this.trainingServiceDetail.trainingLevel = ''
          this.trainingServiceDetail.trainingAttribute = '质保服务'
        }
        this.getPermission()
      })
    },
    selectBindDevice() {

      // console.log("=====================");
      // console.log(this.deviceList)
      // console.log(this.$refs.registTable.selection);
      // this.deviceList.forEach(i => {

      //   if (i.select === 1) {
      //     this.trainingServiceDetail.bindDeviceList.push(i)
      //   }
      // })
      this.trainingServiceDetail.bindDeviceList = this.$refs.registTable.selection
      // 去重
      const res = new Map()
      this.trainingServiceDetail.bindDeviceList = this.trainingServiceDetail.bindDeviceList.filter((item) => !res.has(item['productCode']) && res.set(item['productCode'], 1))
      this.$refs.registTable.clearSelection()
      this.openDeviceBinding = false

    },
    selectBindProject() {
      if (this.bindType === 'bindProject') {
        this.sdServicePoolList.forEach(i => {
          if (i.select === 1) {
            this.trainingServiceDetail.deviceDeliver.acceptanceEvaluation.bindProjectList.push(i)
          }
        })
        // 去重
        const res = new Map()
        this.trainingServiceDetail.deviceDeliver.acceptanceEvaluation.bindProjectList = this.trainingServiceDetail.deviceDeliver.acceptanceEvaluation.bindProjectList.filter((item) => !res.has(item['serviceCode']) && res.set(item['serviceCode'], 1))
      }
      if (this.bindType === 'customerServiceOrder') {
        this.sdServicePoolList.forEach(i => {
          if (i.select === 1) {
            this.trainingServiceDetail.deviceDeliver.acceptanceEvaluation.customerServiceOrderList.push(i)
          }
        })
        // 去重
        const res = new Map()
        this.trainingServiceDetail.deviceDeliver.acceptanceEvaluation.customerServiceOrderList = this.trainingServiceDetail.deviceDeliver.acceptanceEvaluation.customerServiceOrderList.filter((item) => !res.has(item['serviceCode']) && res.set(item['serviceCode'], 1))
      }
      this.showBindProject = false
    },
    handleBindProjectQuery() {
      this.bindProjectQueryParams.pageNum = 1
      this.getSdServicePoolList()
    },
    getSdServicePoolList() {
      listSdServicePool(this.bindProjectQueryParams).then(response => {
        this.sdServicePoolList = response.rows
        this.bindProjectQueryParams.total = response.total
      })
    },
    addConstructionTestList() {
      this.trainingServiceDetail.deviceDeliver.constructionTest.constructionTestList.push({})
      this.trainingServiceDetail.deviceDeliver.constructionTest.followUpTimes = this.trainingServiceDetail.deviceDeliver.constructionTest.constructionTestList.length
    },
    deleteConstructionTestList(index) {
      this.trainingServiceDetail.deviceDeliver.constructionTest.constructionTestList.splice(index, 1)
      this.trainingServiceDetail.deviceDeliver.constructionTest.followUpTimes = this.trainingServiceDetail.deviceDeliver.constructionTest.constructionTestList.length
    },
    changeInventoryResults(data, row) {
      if (data === 1) {
        row.otherVarianceQuantity = 0
      } else {
        row.otherVarianceQuantity = null
      }
    },
    // 远程搜索用户
    remoteUser(query) {
      if (query !== '') {
        this.loading = true
        remoteUser({ searchValue: query }).then(res => {
          this.loading = false
          this.bindUserOptions = res.data
        })
      } else {
        this.options = []
      }
    },
    getSdServicePool() {
      getSdServicePool(this.trainingServiceDetail.id).then(response => {
        if (!response.data.deviceDeliver.updatePlan) {
          response.data.deviceDeliver.updatePlan = {}
          response.data.deviceDeliver.updatePlan.planList = [{}]
          response.data.deviceDeliver.updatePlan.status = ''
        }
        if (!response.data.deviceDeliver.accessoriesInventory) {
          response.data.deviceDeliver.accessoriesInventory = {}
          response.data.deviceDeliver.accessoriesInventory.productPackingList = [{}]
          response.data.deviceDeliver.accessoriesInventory.status = ''
        }
        if (!response.data.deviceDeliver.checkDebug) {
          response.data.deviceDeliver.checkDebug = {}
          response.data.deviceDeliver.checkDebug.checkDebugList = [{}]
          response.data.deviceDeliver.checkDebug.checkedBy = this.$store.state.user.nickName
          response.data.deviceDeliver.checkDebug.status = ''
        }
        if (!response.data.deviceDeliver.customerTrain) {
          response.data.deviceDeliver.customerTrain = {}
          response.data.deviceDeliver.customerTrain.customerTrainList = [{}]
          response.data.deviceDeliver.customerTrain.status = ''
        }
        if (!response.data.deviceDeliver.placeTest) {
          response.data.deviceDeliver.placeTest = {}
          response.data.deviceDeliver.placeTest.status = ''
        }
        if (!response.data.deviceDeliver.problemHandle) {
          response.data.deviceDeliver.problemHandle = {}
          response.data.deviceDeliver.problemHandle.problemHandleList = [{}]
          response.data.deviceDeliver.problemHandle.status = ''
        }
        if (!response.data.deviceDeliver.constructionTest) {
          response.data.deviceDeliver.constructionTest = {}
          response.data.deviceDeliver.constructionTest.constructionTestList = [{}]
          response.data.deviceDeliver.constructionTest.status = ''
        }
        if (!response.data.deviceDeliver.memoHandle) {
          response.data.deviceDeliver.memoHandle = {}
          response.data.deviceDeliver.memoHandle.memoHandleList = [{}]
          response.data.deviceDeliver.memoHandle.machineMemoList = [{}]
          response.data.deviceDeliver.memoHandle.machineMemoHandleList = [{}]
          response.data.deviceDeliver.memoHandle.status = ''
        }
        if (!response.data.deviceDeliver.acceptanceEvaluation) {
          response.data.deviceDeliver.acceptanceEvaluation = {}
          response.data.deviceDeliver.acceptanceEvaluation.bindProjectList = [{}]
          response.data.deviceDeliver.acceptanceEvaluation.customerServiceOrderList = [{}]
          response.data.deviceDeliver.acceptanceEvaluation.satisfactionSurveyList = [{}]
          response.data.deviceDeliver.acceptanceEvaluation.status = ''
        }
        if (!response.data.deviceDeliver.deliverySummary) {
          response.data.deviceDeliver.deliverySummary = {}
          response.data.deviceDeliver.deliverySummary.disclosureTrackingList = [{}]
          response.data.deviceDeliver.deliverySummary.suggestionsList = [{}]
          response.data.deviceDeliver.deliverySummary.status = ''
        }
        response.data.deviceDeliver.checkDebug.checkedBy = response.data.deviceDeliver.checkDebug.checkedBy || this.$store.state.user.nickName
        response.data.deviceDeliver.constructionTest.followUpTimes = response.data.deviceDeliver.constructionTest.constructionTestList.length
        this.trainingServiceDetail = response.data
        console.log(this.trainingServiceDetail)
      })
    },
    sign(type) {
      this.signatureVisible = true
      this.signField = type
    },
    save() {
      var png = this.$refs.signature.save()
      if (this.signField === 'handoverSign') {
        this.trainingServiceDetail.deviceDeliver.accessoriesInventory.handoverSign = png
        this.trainingServiceDetail.deviceDeliver.accessoriesInventory.handoverSignDate = new Date()
      }
      if (this.signField === 'receiverSign') {
        this.trainingServiceDetail.deviceDeliver.accessoriesInventory.receiverSign = png
        this.trainingServiceDetail.deviceDeliver.accessoriesInventory.receiverSignDate = new Date()
      }
      if (this.signField === 'checkedBySign') {
        this.trainingServiceDetail.deviceDeliver.checkDebug.checkedBySign = png
        this.trainingServiceDetail.deviceDeliver.checkDebug.checkedBySignDate = new Date()
      }
      this.signatureVisible = false
      this.$refs.signature.clear()
    },
    //清空
    clear() {
      this.$refs.signature.clear()
    },
    finishTraining() {
      const flag = this.$refs["lastStage"].validateForm()
      if (!flag) {
        this.$message.error("请填写必填项！")
        return
      }
      this.$modal.confirm('是否确认培训完成？').then(() => {
        if (this.trainingServiceDetail.trainingPreparation.status === 'success' &&
          this.trainingServiceDetail.trainingStart.status === 'success' &&
          this.trainingServiceDetail.trainingValidation.status === 'success' &&
          this.trainingServiceDetail.trainingSummary.status === 'success') {
          this.trainingServiceDetail.trainingState = '已完成'
          this.trainingServiceDetail.trainingClose.state = 'success'
          trainAccomplish(this.trainingServiceDetail).then(response => {
            this.$modal.msgSuccess('培训已完成')
          }).catch(reason => {
            this.trainingServiceDetail.trainingState = '开展培训'
          })
        } else {
          this.$modal.msgError('请先完成所有服务过程')
        }
      })
    },
    handleSaveClick(hideMsg) {
      for (let i = 0; i < this.trainingServiceDetail.trainingPreparation.trainingPlanList.length; i++) {
        if (this.trainingServiceDetail.trainingPreparation.trainingPlanList[i].trainingStartTime > this.trainingServiceDetail.trainingPreparation.trainingPlanList[i].trainingEndTime) {
          this.$message.error('培训开始时间需小于结束时间')
          return false
        }
      }
      this.trainingServiceDetail.serviceStageCode = this.stepIndex
      if (this.stepIndex === 4) {
        this.trainingServiceDetail.trainingClose.records = this.$refs["lastStage"].dataForm
      }
      updateTrainingService(this.trainingServiceDetail).then(response => {
        console.log(hideMsg)
        this.$modal.msgSuccess('保存成功')
        this.trainingServiceDetail = response.data
        if (this.isShowService) {
          this.$refs.operationRecord.refresh()
        }
      })
    },
    topBtnHandleSaveClick() {
      for (let i = 0; i < this.trainingServiceDetail.trainingPreparation.trainingPlanList.length; i++) {
        if (this.trainingServiceDetail.trainingPreparation.trainingPlanList[i].trainingStartTime > this.trainingServiceDetail.trainingPreparation.trainingPlanList[i].trainingEndTime) {
          this.$message.error('培训开始时间需小于结束时间')
          return false
        }
      }
      topBtnUpdateTrainingService(this.trainingServiceDetail).then(response => {
        this.trainingServiceDetail = response.data
        this.$modal.msgSuccess('保存成功')
        if (this.isShowService) {
          this.$refs.operationRecord.refresh()
        }
      })
    },
    toNextStage() {
      this.trainingServiceDetail.serviceStageCode = this.stepIndex
      if (this.stepIndex === 0) {
        this.$refs.trainingServiceDetail.validate(async(valid) => {
          if (valid) {
            const isTrainingCourseOtherEmpty = this.trainingServiceDetail.trainingPreparation.trainingCourse && this.trainingServiceDetail.trainingPreparation.trainingCourse.includes('其他') && !this.trainingServiceDetail.trainingPreparation.trainingCourseOther
            const isEquipmentScopeOther = this.trainingServiceDetail.trainingPreparation.equipmentScope && this.trainingServiceDetail.trainingPreparation.equipmentScope.includes('其他') && !this.trainingServiceDetail.trainingPreparation.equipmentScopeOther
            if (isTrainingCourseOtherEmpty || isEquipmentScopeOther) {
              this.$modal.msgError('请填写必填项')
              return
            }
            if (this.trainingServiceDetail.trainingPreparation.trainingPlanList.length == 0) {
              this.$modal.msgError('请完整填写培训计划')
              this.isDisabled = false
              return
            }
            var j = 0
            if (this.trainingServiceDetail.trainingPreparation.trainingPlanList.length != 0) {
              this.trainingServiceDetail.trainingPreparation.trainingPlanList.forEach((item) => {
                if (item.trainingStartTime == '' || item.trainingStartTime == null || item.trainingEndTime == '' || item.trainingEndTime == null || item.courseName == '' || item.courseName == null || item.trainingContent == '' || item.trainingContent == null || item.speaker == '' || item.speaker == null || item.trainingPlace == '' || item.trainingPlace == null) {
                  j = 1
                }
              })
              this.isDisabled = false
            }
            if (j == 1) {
              this.$modal.msgError('请完整填写培训计划')
              this.isDisabled = false
              return
            }
            if (this.trainingServiceDetail.bindDeviceList.length == 0) {
              this.$modal.msgError('请完善绑定设备信息')
              return
            } else {
              for (let i = 0; i < this.trainingServiceDetail.bindDeviceList.length; i++) {
                if (this.trainingServiceDetail.bindDeviceList[i].projectItem == null || this.trainingServiceDetail.bindDeviceList[i].productCode == null || this.trainingServiceDetail.bindDeviceList[i].productName == null) {
                  this.$modal.msgError('请完善绑定设备信息')
                  return
                }
              }
            }
            const isEmptyResourceMatch = await this.$U.checkListFieldsEmpty(this.trainingServiceDetail.trainingPreparation.resourceMatch)
            if (isEmptyResourceMatch) {
              this.$modal.msgError('请完整填写资源匹配')
              return
            }
            if (this.trainingServiceDetail.trainingPreparation.approvedBy == '' || this.trainingServiceDetail.trainingPreparation.approvedBy == null || this.trainingServiceDetail.trainingPreparation.approvedBy == undefined) {
              this.$message.error('请先发起审批或等待审批结果')
              return
            }
            this.checkIsPass()
            if (this.isPass == 0) {
              this.$message.error('未审批通过')
              return
            }
            this.trainingServiceDetail.trainingPreparation.status = 'success'
            nextStep(this.trainingServiceDetail).then(response => {
              this.$modal.msgSuccess('保存成功')
              this.stepIndex += 1
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
      if (this.stepIndex === 1) {
        this.$refs.trainingServiceDetail.validate(async(valid) => {
          if (valid) {
            const isEmpty = await this.$U.checkListFieldsEmpty(this.trainingServiceDetail.trainingStart.trainingContentList)
            if (isEmpty) {
              this.$modal.msgError('请完整填写培训内容')
              return
            }
            for (var i = 0; i < this.trainingServiceDetail.trainingStart.trainingContentList.length; i++) {
              if (this.trainingServiceDetail.trainingStart.trainingContentList[i].isTraining == '0' && (this.trainingServiceDetail.trainingStart.trainingContentList[i].notImplementReason == null || this.trainingServiceDetail.trainingStart.trainingContentList[i].notImplementReason == '')) {
                this.$message.error('培训内容列表未实施原因不能为空')
                return
              }
            }
            this.trainingServiceDetail.trainingStart.status = 'success'
            nextStep(this.trainingServiceDetail).then(response => {
              this.$modal.msgSuccess('保存成功')
              this.stepIndex += 1
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
      if (this.stepIndex === 2) {
        console.log("2222222222222")
        if(this.trainingServiceDetail.trainingValidation.verifyTrainingResults==0){
          if(this.trainingServiceDetail.trainingValidation.notImplementReason==""||this.trainingServiceDetail.trainingValidation.notImplementReason==null){
            this.$modal.msgError('请填写未实施原因')
              return
          }
          if(this.trainingServiceDetail.trainingValidation.issueCertificate!=1&&this.trainingServiceDetail.trainingValidation.issueCertificate!=0){
            this.$modal.msgError('请选择是否颁发证书')
              return
          }
          const isEmptySatisfactionSurveyList =  this.$U.checkListFieldsEmpty(this.trainingServiceDetail.trainingValidation.satisfactionSurveyList)
            if (isEmptySatisfactionSurveyList && this.trainingServiceDetail.trainingValidation.satisfactionSurvey == null) {
              this.$modal.msgError('请完整填写满意度调研')
              return
            }
          nextStep(this.trainingServiceDetail).then(response => {
              this.$modal.msgSuccess('保存成功')
              this.trainingServiceDetail.trainingValidation.status = 'success'
              this.stepIndex += 1
            })
            return
        }
        else{
        this.$refs.trainingServiceDetail.validate(async(valid) => {
          if (valid) {
            if (!this.trainingServiceDetail.trainingValidation.satisfactionSurvey) {
              this.$modal.msgError('请完整填写满意度调研')
              return
            }
            this.trainingServiceDetail.trainingValidation.status = 'success'
            nextStep(this.trainingServiceDetail).then(response => {
              this.$modal.msgSuccess('保存成功')
              this.stepIndex += 1
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })

      }

      }
      if (this.stepIndex === 3) {
        this.$refs.trainingServiceDetail.validate(async(valid) => {
          if (valid) {
            const isEmptyhighLightList = await this.$U.checkListFieldsEmpty(this.trainingServiceDetail.trainingSummary.highLightList)
            if (this.trainingServiceDetail.trainingSummary.isTrackTraining === 1 && isEmptyhighLightList) {
              this.$modal.msgError('请完整填写亮点表格')
              return
            }
            const isEmptyinsufficientList = await this.$U.checkListFieldsEmpty(this.trainingServiceDetail.trainingSummary.insufficientList)
            if (this.trainingServiceDetail.trainingSummary.isTrackTraining === 1 && isEmptyinsufficientList) {
              this.$modal.msgError('请完整填写不足表格')
              return
            }
            this.trainingServiceDetail.trainingSummary.status = 'success'
            nextStep(this.trainingServiceDetail).then(response => {
              this.$modal.msgSuccess('保存成功')
              this.stepIndex += 1
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
    },
    changeStep(stepIndex) {
      this.stepIndex = stepIndex
    },
    handleDownloadTemplate(val) {
      if (val == 1) {
        this.download('cmms/trainingService/downLoadTrainingTemplate', {}, `培训服务详情_培训计划_${new Date().getTime()}.xlsx`)
      } else {
        this.download('cmms/trainingService/downLoadCheckResultTemplate', {}, `培训服务详情_验证结果_${new Date().getTime()}.xlsx`)
      }
    },
    importTemplateDate(val) {
      if (val == 1) {
        this.upload.title = '培训计划导入'
        this.upload.url = process.env.VUE_APP_BASE_API + '/cmms/trainingService/importData'
      } else {
        this.upload.title = '验证结果导入'
        this.upload.url = process.env.VUE_APP_BASE_API + '/cmms/trainingService/importCheckResultData'
      }
      this.upload.open = true
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true

    },
// 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      console.log(response)
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true })
      if (response.msg == '培训计划文件解析成功') {
        if (response.data != undefined && response.data.length > 0) {
          this.trainingServiceDetail.trainingPreparation.trainingPlanList = response.data
        }
      } else {
        if (response.data != undefined && response.data.length > 0) {
          this.trainingServiceDetail.trainingValidation.verificationResultList = response.data
          let length = response.data.length
          for (var i = 0; i < length; i++) {
            if (this.trainingServiceDetail.trainingValidation.verificationResultList[i].isExamination == '是') {
              this.trainingServiceDetail.trainingValidation.verificationResultList[i].isExamination = 1
            } else if (!(this.trainingServiceDetail.trainingValidation.verificationResultList[i].isExamination == '是' || this.trainingServiceDetail.trainingValidation.verificationResultList[i].isExamination == '否')) {
              this.trainingServiceDetail.trainingValidation.verificationResultList[i].isExamination == null
            } else {
              this.trainingServiceDetail.trainingValidation.verificationResultList[i].isExamination = 0
            }
            if (this.trainingServiceDetail.trainingValidation.verificationResultList[i].isPass == '是') {
              this.trainingServiceDetail.trainingValidation.verificationResultList[i].isPass = 1
            } else if (!(this.trainingServiceDetail.trainingValidation.verificationResultList[i].isPass == '是' || this.trainingServiceDetail.trainingValidation.verificationResultList[i].isPass == '否')) {
              this.trainingServiceDetail.trainingValidation.verificationResultList[i].isPass == null
            } else {
              this.trainingServiceDetail.trainingValidation.verificationResultList[i].isPass = 0
            }

          }

        }
      }
    },
// 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    },
    // 创建调研
    createSurvey() {
      this.showSurveyList = true
    },
    // 同步培训内容
    syncTrainingContent() {
      if (this.trainingServiceDetail.trainingPreparation.trainingPlanList && this.trainingServiceDetail.trainingPreparation.trainingPlanList.length > 0
        && this.isPass && !this.trainingServiceDetail.trainingStart.trainingContentList.length) {
        this.trainingServiceDetail.trainingPreparation.trainingPlanList.forEach(item => {
          const newItem = JSON.parse(JSON.stringify(item))
          this.trainingServiceDetail.trainingStart.trainingContentList.push({
            trainingStartTime: newItem.trainingStartTime,
            trainingEndTime: newItem.trainingEndTime,
            courseName: newItem.courseName,
            trainingContent: newItem.trainingContent,
            speaker: newItem.speaker,
            trainingPlace: newItem.trainingPlace
          })
        })
      }
    },
    // 展示工时记录
    showManHoursRecord() {
      this.showRecord = true;
    },
    // 提交整改
    submitSuggest() {
      this.trainingServiceDetail.serviceStageCode = this.stepIndex
      const flag = this.$refs["lastStage"].validateFormField()
      if (!flag) {
        this.$message.error("请填写必填项！")
        return
      }
      this.trainingServiceDetail.trainingClose.records = this.$refs["lastStage"].dataForm
      updateTrainingService(this.trainingServiceDetail).then(response => {
        finishRectification(this.trainingServiceDetail).then(res => {
          this.$modal.msgSuccess("提交整改成功")
          this.$refs.operationRecord.refresh()
        })
      })
    },
    // 权限控制
    getPermission() {
      // 计算权限
      let canEditRoles = [
        'admin',
        'cmms:admin',
        'cmms:serviceManager'
      ]
      if (this.trainingServiceDetail.afterSaleArea) {
        const areaManagerRole = "cmms:area:" + this.trainingServiceDetail.afterSaleArea
        canEditRoles.push(areaManagerRole)
      }
      this.canEdit = this.checkRole(canEditRoles)
      this.canClose = this.checkRole(canEditRoles)
      const username = this.$store.state.user.nickName
      if (this.trainingServiceDetail.trainingDirector === username && this.checkRole(["cmms:area"])) {
        this.canEdit = true
      }
      if (
        Array.isArray(this.trainingServiceDetail.trainingStart.trainingContentList) 
        && this.trainingServiceDetail.trainingStart.trainingContentList.length
      ){
        const speakers = this.trainingServiceDetail.trainingStart.trainingContentList.map(item => item.speaker)
        if (speakers.includes(username) && this.checkRole(["cmms:area"])) {
          this.canEdit = true
        }
      }
    }
  }
}
</script>
