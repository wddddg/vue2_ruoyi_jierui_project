<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb-2">
      <el-col :span="1.5">
        <jereh-button @click="handleSaveClick"
                      v-if="frameworkDetail.executionStatus !== '已完成' && frameworkDetail.executionStatus !== '已取消' && directorFlag "
        >保存
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button v-if="directorFlag" >导出</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>视频指导</jereh-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <jereh-button @click="finishFramework"
                      v-if="frameworkDetail.executionStatus !== '已完成' && frameworkDetail.executionStatus !== '已取消' && directorFlag"
        >协议完成
        </jereh-button>
      </el-col> -->
      <el-col :span="1.5">
        <jereh-button @click="showManHoursRecord">工时记录</jereh-button>
      </el-col>
    </el-row>

    <div class="flex justify-center">
      <div style="width: 100%">
        <el-form :model="frameworkDetail" ref="frameworkDetail" :rules="rules" label-width="150px" :disabled = "!directorFlag"
                 size="small"
        >
          <!--          基础信息-->
          <div class="border rounded">
            <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
              <div class="font">基础信息</div>
            </div>
            <div class="flex flex-wrap">
              <el-form-item prop="sdServicePool.serviceCode" label="服务编码" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.serviceCode" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.contactPerson" label="客户联系人" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.contactPerson" disabled></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.contactPhone" label="客户联系方式" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.contactPhone" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.customerName" label="客户名称" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.customerName" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.serviceDirector" label="服务负责人" style="width: 300px;">
                <jereh-person-select v-model="frameworkDetail.sdServicePool.serviceDirector" :multiple="false" disabled
                ></jereh-person-select>
              </el-form-item>
              <el-form-item prop="sdServicePool.afterSaleArea" label="售后区域" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.afterSaleArea" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.serviceLocation" label="服务地点" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.serviceLocation" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.maketDirector" label="市场负责人" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.maketDirector" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.estimateEndDate" label="预估结束日期" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.estimateEndDate" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.serviceLevel" label="服务级别" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.serviceLevel" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.equipmentScope" label="设备范围" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.equipmentScopeStr" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="sdServicePool.deviceNo" label="设备数量" style="width: 300px;">
                <jereh-input v-model="frameworkDetail.sdServicePool.deviceNo" disabled
                ></jereh-input>
              </el-form-item>
              <el-form-item prop="assistDeliveryBy" label="服务支持人" style="width: 600px;">
                <jereh-person-select v-model="frameworkDetail.serveBacker" :disabled="!canEdit"></jereh-person-select>
              </el-form-item>
            </div>
          </div>
          <!--          服务过程-->
          <div class="border rounded">
            <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
              <div class="font">服务过程</div>
            </div>
            <el-steps :active="0" finish-status="success" class="mx-2">
              <el-step v-for="(item,index) in stepList" :key="index"
                       :status="frameworkDetail[item.field].status"
              >
                <div slot="title" @click="changeStep(index)"
                     :style="stepIndex === index ? 'color: #E85414;font-weight: 700' : ''"
                >{{ item.name }}
                </div>
              </el-step>
            </el-steps>
            <div class="p-2">
              <jereh-button
                round
                @click="handleSaveClick"
                v-if="frameworkDetail.executionStatus !== '已完成' && frameworkDetail.executionStatus !== '已取消' && directorFlag && (
                  stepIndex !== 6 || (stepIndex === 6 && canClose)
                )"
              >
                保存
              </jereh-button>
              <jereh-button round @click="createTrainingService" v-if="this.stepIndex === 3 && directorFlag && canEdit">创建培训</jereh-button>
              <!-- <jereh-button round @click="toNextStage"
                            v-if="frameworkDetail.executionStatus !== '已完成' && frameworkDetail.executionStatus !== '已取消' && directorFlag"
              >下一步</jereh-button> -->
              <!-- <jereh-button round @click="finishApproval" v-if="this.stepIndex === 5 && directorFlag">履约完成审批</jereh-button> -->
              <jereh-button round @click="submitSuggest" v-if="this.stepIndex === 6 && directorFlag && canClose">提交整改</jereh-button>
              <jereh-button
                round
                @click="finishFramework"
                v-if="this.stepIndex === 6 && directorFlag && frameworkDetail.executionStatus !== '已完成'
                      && frameworkDetail.executionStatus !== '已取消'  && canClose"
              >
                协议完成
              </jereh-button>
            </div>
            <!--            制定履行计划-->
            <div class="px-2 pb-2" v-if="stepIndex === 0">
              <div class="flex align-start">
                <jereh-button round @click="addInspectionPlanList" :disabled="!canEdit">新增计划</jereh-button>
                <el-form-item prop="formulatePlan.inspectionStartDate" label="巡检开始日期" style="width: 600px;">
                  <jereh-date-picker
                    type="daterange"
                    v-model="frameworkDetail.formulatePlan.inspectionStartDate"
                    @change="handleTimeChange"
                    valueFormat="timestamp"
                  >
                  </jereh-date-picker>
                </el-form-item>
              </div>
              <el-table
                :data="frameworkDetail.formulatePlan.inspectionPlanList" border :fit="true"
              >
                <af-table-column
                  prop="inspectionItem"
                  fixed
                  label="巡检序次"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionStartTime"
                  show-overflow-tooltip
                  align="center"
                  label="巡检开始日期"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-date-picker
                      v-model="scope.row.inspectionStartTime"
                      valueFormat="yyyy-MM-dd"
                      @change="changeStartTime($event,scope.row)"
                      :disabled="!canEdit"
                    ></jereh-date-picker>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="inspectionEndTime"
                  show-overflow-tooltip
                  align="center"
                  label="巡检结束日期"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-date-picker
                      v-model="scope.row.inspectionEndTime"
                      valueFormat="yyyy-MM-dd"
                      @change="changeEndTime($event,scope.row)"
                      :disabled="!canEdit"
                    ></jereh-date-picker>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="inspectionType"
                  show-overflow-tooltip
                  align="center"
                  label="巡检类别"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-select v-model="scope.row.inspectionType" :dict="dict.type.inspection_type" :disabled="!canEdit"
                    ></jereh-select>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="inspectionDirector"
                  show-overflow-tooltip
                  align="center"
                  label="巡检负责人"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-person-select v-model="scope.row.inspectionDirector" :multiple="false" :disabled="!canEdit"></jereh-person-select>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="devicePlace"
                  show-overflow-tooltip
                  align="center"
                  label="设备地点"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.devicePlace" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="deviceType"
                  show-overflow-tooltip
                  align="center"
                  label="设备类型"
                  width="250"
                >
                  <template slot-scope="scope">
                    <jereh-select v-model="scope.row.deviceType" :dict="dict.type.equipment_scope" multiple :disabled="!canEdit"
                    ></jereh-select>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="deviceNo"
                  show-overflow-tooltip
                  align="center"
                  label="设备数量"
                  width="150"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.deviceNo" type="number" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="inspectionOverview"
                  show-overflow-tooltip
                  align="center"
                  label="巡检内容概述"
                  width="180"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.inspectionOverview" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="当前状态"
                  width="150"
                >
                  <template slot-scope="scope">
                    <jereh-select v-model="scope.row.currentState" :dict="dict.type.inspection_state" :disabled="!canEdit"
                    ></jereh-select>
                  </template>
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="80">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="deleteInspectionPlanList(scope.$index, scope.row.inspectionItem)"
                      :disabled="!canEdit"
                    >
                      删除
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
              <pagination v-if="originInspectionPlanList.length>0" :total="originInspectionPlanList.length"
                          :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                          @pagination="getInspectionPlanList"
              />
            </div>
            <!--            实施巡检-->
            <div class="px-2 pb-2" v-if="stepIndex === 1">
              <div class="flex align-center">
                <div class="font font-weight-bold mr-2">巡检报告</div>
                <jereh-button round @click="showInspectionReportList = !showInspectionReportList">隐藏/显示
                </jereh-button>
              </div>
              <el-table
                v-if="showInspectionReportList"
                class="mt-2"
                :data="frameworkDetail.formulatePlan.inspectionPlanList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionItem"
                  fixed
                  label="巡检序次"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionStartTime"
                  show-overflow-tooltip
                  align="center"
                  label="巡检开始日期"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionEndTime"
                  show-overflow-tooltip
                  align="center"
                  label="巡检结束日期"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionType"
                  show-overflow-tooltip
                  align="center"
                  label="操作"
                >
                  <template slot-scope="scope">
                    <jereh-button round @click="showReport(scope.row)" :disabled="!directorFlag && !canEdit">查看报告</jereh-button>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="approvalDate"
                  show-overflow-tooltip
                  align="center"
                  label="发起审批日期"
                >
                </af-table-column>
                <af-table-column
                  prop="managerReviewDate"
                  show-overflow-tooltip
                  align="center"
                  label="区域经理审核日期"
                >
                </af-table-column>
                <af-table-column
                  prop="marketConfirmationDate"
                  show-overflow-tooltip
                  align="center"
                  label="市场确认日期"
                >
                </af-table-column>
              </el-table>
              <div class="flex align-start mt-2">
                <el-form-item prop="implementPatrolInspection.inspectionItem" label="巡检序次" style="width: 300px;">
                  <el-select
                    v-model="frameworkDetail.implementPatrolInspection.inspectionItem" filterable
                    :multiple="true"
                    placeholder="请选择" clearable
                    @change="changeInspectionItem"
                    :disabled="!canEdit"
                  >
                    <el-option
                      v-for="(item,index) in frameworkDetail.formulatePlan.inspectionPlanList"
                      :key="index"
                      :label="item.inspectionItem"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <div class="mx-2">
                  <jereh-button round @click="bindDevice" :disabled="!canEdit">绑定设备</jereh-button>
                </div>
                <el-form-item prop="implementPatrolInspection.inspectionTotalHours" label="项目巡检总工时（h）"
                              style="width: 300px;"
                >
                  <jereh-input v-model="frameworkDetail.implementPatrolInspection.inspectionTotalHours" disabled
                  ></jereh-input>
                </el-form-item>
              </div>
              <div class="font-sm text-danger">问题的严重程度参考规则说明：</div>
              <div class="font-sm text-danger">1）轻微问题：不影响施工作业，可后续处理；</div>
              <div class="font-sm text-danger">2）较大问题：设备功能异常问题，设备施工作业存在较大隐患，建议及时处理；</div>
              <div class="font-sm text-danger">3）严重问题：影响施工作业，需立即处理；</div>
              <el-table
                class="mt-2"
                :data="inspectionDetailList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionItem"
                  fixed
                  label="巡检序次"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="projectItem"
                  show-overflow-tooltip
                  align="center"
                  label="项目编码分项"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="productCode"
                  show-overflow-tooltip
                  align="center"
                  label="产品编号"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="licensePlateCode"
                  show-overflow-tooltip
                  align="center"
                  label="车牌号"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="productName"
                  show-overflow-tooltip
                  align="center"
                  label="产品名称"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="exfactoryDate"
                  show-overflow-tooltip
                  align="center"
                  label="出厂日期"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionDate"
                  show-overflow-tooltip
                  align="center"
                  label="巡检日期"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionBy"
                  show-overflow-tooltip
                  align="center"
                  label="巡检人"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="engineHours"
                  show-overflow-tooltip
                  align="center"
                  label="发动机小时数（h）"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="marketConfirmationDate"
                  show-overflow-tooltip
                  align="center"
                  label="柱塞泵运行小时数（h）"
                  width="180"
                >
                </af-table-column>
                <af-table-column
                  prop="chassisMileage"
                  show-overflow-tooltip
                  align="center"
                  label="底盘里程数（KM）"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="injectHeadMileage"
                  show-overflow-tooltip
                  align="center"
                  label="注入头里程（Hb Mile）"
                  width="180"
                >
                </af-table-column>
                <af-table-column
                  prop="chassisStatus"
                  show-overflow-tooltip
                  align="center"
                  label="底盘状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="engineStatus"
                  show-overflow-tooltip
                  align="center"
                  label="发动机状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="gearboxStatus"
                  show-overflow-tooltip
                  align="center"
                  label="变速箱状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="pistonPumpStatus"
                  show-overflow-tooltip
                  align="center"
                  label="柱塞泵状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="otherAssemblyStatus"
                  show-overflow-tooltip
                  align="center"
                  label="其他总成状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="electricalSystemStatus"
                  show-overflow-tooltip
                  align="center"
                  label="电气系统状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="hydraulicSystemStatus"
                  show-overflow-tooltip
                  align="center"
                  label="液压系统状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="airSystemStatus"
                  show-overflow-tooltip
                  align="center"
                  label="气路系统状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="lubricationSystemStatus"
                  show-overflow-tooltip
                  align="center"
                  label="润滑系统状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="otherSystemStatus"
                  show-overflow-tooltip
                  align="center"
                  label="其他系统状态"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionSuggestion"
                  show-overflow-tooltip
                  align="center"
                  label="巡检建议"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionHours"
                  show-overflow-tooltip
                  align="center"
                  label="巡检工时（h）"
                  width="150"
                >
                </af-table-column>
                <af-table-column
                  fixed="right"
                  prop="marketConfirmationDate"
                  show-overflow-tooltip
                  align="center"
                  width="200"
                  label="操作"
                >
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      :disabled="!canEdit"
                    >
                      创建问题
                    </jereh-button>
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="getInspectionRecord(scope.row)"
                      :disabled="!canEdit"
                    >
                      巡检记录
                    </jereh-button>
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="deleteInspectionDetail(scope.row)"
                      :disabled="!canEdit"
                    >
                      删除
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
            </div>
            <!--            问题处理-->
            <div class="px-2 pb-2" v-if="stepIndex === 2">
              <div class="font font-weight-bold mr-2">问题列表</div>
              <div class="flex flex-wrap">
                <el-form-item prop="problemHandle.problemNumber" label="发现问题总数量" style="width: 300px;">
                  <jereh-input v-model="frameworkDetail.problemHandle.problemNumber" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="problemHandle.issuesNumber" label="待受理问题数量" style="width: 300px;">
                  <jereh-input v-model="frameworkDetail.problemHandle.issuesNumber" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="problemHandle.processingNumber" label="处理中问题数量" style="width: 300px;">
                  <jereh-input v-model="frameworkDetail.problemHandle.processingNumber" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="problemHandle.completedNumber" label="处理完成问题数量" style="width: 300px;">
                  <jereh-input v-model="frameworkDetail.problemHandle.completedNumber" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="problemHandle.handleFaultTotalHours" label="问题处理故障总工时（h）"
                              style="width: 300px;"
                >
                  <jereh-input v-model="frameworkDetail.problemHandle.handleFaultTotalHours" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="problemHandle.handleAuxiliaryTotalHours" label="问题处理辅助总工时（h）"
                              style="width: 300px;"
                >
                  <jereh-input v-model="frameworkDetail.problemHandle.handleAuxiliaryTotalHours" disabled></jereh-input>
                </el-form-item>
              </div>
              <el-table
                :data="frameworkDetail.problemHandle.problemList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionItem"
                  fixed
                  label="处理进度"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionStartTime"
                  show-overflow-tooltip
                  align="center"
                  label="创建时间"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionEndTime"
                  show-overflow-tooltip
                  align="center"
                  label="服务请求编号"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionType"
                  show-overflow-tooltip
                  align="center"
                  label="服务工单编号"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionDirector"
                  show-overflow-tooltip
                  align="center"
                  label="服务请求类型"
                >
                </af-table-column>
                <af-table-column
                  prop="devicePlace"
                  show-overflow-tooltip
                  align="center"
                  label="售后区域"
                >
                </af-table-column>
                <af-table-column
                  prop="deviceType"
                  show-overflow-tooltip
                  align="center"
                  label="产品名称"
                >
                </af-table-column>
                <af-table-column
                  prop="deviceNo"
                  show-overflow-tooltip
                  align="center"
                  label="项目编码分项"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionOverview"
                  show-overflow-tooltip
                  align="center"
                  label="产品编号"
                >
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="车牌号"
                >
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="服务地点"
                >
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="服务请求概述"
                >
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="详情描述"
                >
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="处理日期"
                >
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="问题处理故障工时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="问题处理辅助工时（h）"
                >
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="80">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      :disabled="!canEdit"
                    >
                      详情
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
            </div>
            <!--            实施培训&再制造-->
            <div class="px-2 pb-2" v-if="stepIndex === 3">
              <div class="flex flex-wrap">
                <el-form-item prop="implementTraining.inspectionStartDate" label="合计培训总序次" style="width: 300px;">
                  <jereh-input v-model="trainingServiceList.length" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="implementTraining.totalTrainingHours" label="合计培训总课时（h）"
                              style="width: 300px;"
                >
                  <jereh-input v-model="frameworkDetail.implementTraining.totalTrainingHours" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="implementTraining.maintenanceNumber" label="合计实施维修改造项目数量"
                              style="width: 300px;"
                >
                  <jereh-input v-model="frameworkDetail.implementTraining.maintenanceNumber" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="implementTraining.maintenanceTotalOutputValue"
                              label="维修改造项目合计达成产值（万元）"
                              style="width: 300px;"
                >
                  <jereh-input v-model="frameworkDetail.implementTraining.maintenanceTotalOutputValue" disabled
                  ></jereh-input>
                </el-form-item>
              </div>
              <div class="font font-weight-bold">培训列表</div>
              <el-table
                class="my-2"
                :data="trainingServiceList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="trainingState"
                  fixed
                  label="培训状态"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="afterSaleArea"
                  show-overflow-tooltip
                  align="center"
                  label="售后区域"
                >
                </af-table-column>
                <af-table-column
                  prop="trainingDirector"
                  show-overflow-tooltip
                  align="center"
                  label="培训负责人"
                >
                </af-table-column>
                <af-table-column
                  prop="projectItem"
                  show-overflow-tooltip
                  align="center"
                  label="项目编码分项"
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
                  prop="trainingCode"
                  show-overflow-tooltip
                  align="center"
                  label="培训编码"
                >
                </af-table-column>
                <af-table-column
                  prop="trainingPlace"
                  show-overflow-tooltip
                  align="center"
                  label="培训地点"
                >
                </af-table-column>
                <af-table-column
                  prop="trainingLevel"
                  show-overflow-tooltip
                  align="center"
                  label="培训级别"
                >
                </af-table-column>
                <af-table-column
                  prop="id"
                  show-overflow-tooltip
                  align="center"
                  label="培训方式"
                >
                  <template slot-scope="scope">
                    {{ scope.row.trainingPreparation ? scope.row.trainingPreparation.trainingMode : '' }}
                  </template>
                </af-table-column>
                <af-table-column
                  prop="createTime"
                  show-overflow-tooltip
                  align="center"
                  label="创建日期"
                >
                </af-table-column>
                <af-table-column
                  prop="id"
                  show-overflow-tooltip
                  align="center"
                  label="培训总课时（h）"
                >
                  <template slot-scope="scope">
                    {{ scope.row.trainingStart ? scope.row.trainingStart.totalTraingHours : '' }}
                  </template>
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="80">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="toTrainingServiceDetailPage(scope.row)"
                      :disabled="!canEdit"
                    >
                      详情
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
              <div class="flex">
                <div class="font font-weight-bold mr-2">维修项目列表</div>
                <jereh-button round @click="bindProject" :disabled="!canEdit">绑定项目</jereh-button>
              </div>
              <el-table
                class="my-2"
                :data="frameworkDetail.implementTraining.maintenanceList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionItem"
                  fixed
                  label="项目编码分项"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionStartTime"
                  show-overflow-tooltip
                  align="center"
                  label="项目名称"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionEndTime"
                  show-overflow-tooltip
                  align="center"
                  label="维修项目类别"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionType"
                  show-overflow-tooltip
                  align="center"
                  label="维修等级"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionDirector"
                  show-overflow-tooltip
                  align="center"
                  label="售后区域"
                >
                </af-table-column>
                <af-table-column
                  prop="devicePlace"
                  show-overflow-tooltip
                  align="center"
                  label="项目负责人"
                >
                </af-table-column>
                <af-table-column
                  prop="deviceType"
                  show-overflow-tooltip
                  align="center"
                  label="是否返司维修"
                >
                </af-table-column>
                <af-table-column
                  prop="deviceNo"
                  show-overflow-tooltip
                  align="center"
                  label="立项时间"
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionOverview"
                  show-overflow-tooltip
                  align="center"
                  label="发货验收日期"
                >
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="项目工时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="currentState"
                  show-overflow-tooltip
                  align="center"
                  label="项目产值（万元）"
                >
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="80">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      :disabled="!canEdit"
                    >
                      详情
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
            </div>
            <!--            配件需求-->
            <div class="px-2 pb-2" v-if="stepIndex === 4">
              <div class="flex flex-wrap">
                <el-form-item prop="accessoriesDemand.partsSize" label="配件提报总项次" style="width: 300px;">
                  <jereh-input v-model="frameworkDetail.accessoriesDemand.partsSize" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="accessoriesDemand.countSize" label="配件提报总数量" style="width: 300px;">
                  <jereh-input v-model="frameworkDetail.accessoriesDemand.countSize" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="accessoriesDemand.reachedMoneySum" label="配件订单达成总金额（万元）"
                              style="width: 300px;"
                >
                  <jereh-input v-model="frameworkDetail.accessoriesDemand.reachedMoneySum" disabled></jereh-input>
                </el-form-item>
              </div>
              <div class="font font-weight-bold">市场确认</div>
              <el-table
                class="my-2"
                :data="frameworkDetail.accessoriesDemand.marketConfirmList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="submittedItem"
                  fixed
                  label="提报序次"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="partsSubmitNumber"
                  show-overflow-tooltip
                  align="center"
                  label="提报配件种类总数量"
                >
                  <template slot-scope="scope">
                    {{ scope.row.partsList.length }}
                  </template>
                </af-table-column>
                <af-table-column
                  prop="marketSubmitDate"
                  show-overflow-tooltip
                  align="center"
                  label="提交市场日期"
                >
                </af-table-column>
                <af-table-column
                  prop="marketConfirmResult"
                  show-overflow-tooltip
                  align="center"
                  label="市场确认结果"
                >
                  <template slot-scope="scope">
                    <jereh-select v-model="scope.row.marketConfirmResult" :dict="dict.type.market_confirm_result" :disabled="!canEdit"
                    ></jereh-select>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="submitMoney"
                  show-overflow-tooltip
                  align="center"
                  label="本次提报金额（万元）"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.submitMoney" type="number" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="reachedMoney"
                  show-overflow-tooltip
                  align="center"
                  label="本次达成金额（万元）"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.reachedMoney" type="number" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="executedNo"
                  show-overflow-tooltip
                  align="center"
                  label="本次执行订单号"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.executedNo" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="marketConfirmDate"
                  show-overflow-tooltip
                  align="center"
                  label="市场确认日期"
                >
                  <template slot-scope="scope">
                    <jereh-date-picker v-model="scope.row.marketConfirmDate" :disabled="!canEdit"></jereh-date-picker>
                  </template>
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="150">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="sendAccessoriesEmail(scope.$index)"
                      :disabled="!canEdit"
                    >
                      发邮件
                    </jereh-button>
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="deleteMarketConfirmList(scope.$index)"
                      :disabled="!canEdit"
                    >
                      删除
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
              <div class="font font-weight-bold">配件清单</div>
              <div class="flex align-start mt-2">
                <el-form-item prop="accessoriesDemand.submittedItem" label="提报序次"
                              style="width: 300px;"
                              class="mr-2"
                >
                  <jereh-select v-model="frameworkDetail.accessoriesDemand.submittedItem"
                                :dict="this.frameworkDetail.accessoriesDemand.marketConfirmList"
                                label-name="submittedItem"
                                value-name="id"
                                multiple
                                @change="changeSubmittedItem"
                                :disabled="!canEdit"
                  ></jereh-select>
                </el-form-item>
                <jereh-button round @click="addMarketConfirmList" :disabled="!canEdit">追加序次</jereh-button>
                <jereh-button round @click="addPartsList" :disabled="!canEdit">添加</jereh-button>
                <jereh-button round @click="addPartsListByExcel" :disabled="!canEdit">Excel导入</jereh-button>
                <jereh-button round @click="handleDownloadTemplate" :disabled="!canEdit">模板下载</jereh-button>
              </div>
              <el-table
                class="my-2"
                :data="partsList" border :fit="true"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="submittedItem"
                  fixed
                  label="提报序次"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="materialName"
                  show-overflow-tooltip
                  align="center"
                  label="物料名称"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.materialName" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="materialCode"
                  show-overflow-tooltip
                  align="center"
                  label="物料编码"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.materialCode" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="count"
                  show-overflow-tooltip
                  align="center"
                  label="数量"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.count" type="number" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="remark"
                  show-overflow-tooltip
                  align="center"
                  label="备注"
                >
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.remark" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="maketDirector"
                  show-overflow-tooltip
                  align="center"
                  label="市场负责人"
                >
                  <template slot-scope="scope">
                    <jereh-person-select v-model="scope.row.maketDirector" :multiple="false" :disabled="!canEdit"></jereh-person-select>
                  </template>
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="80">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="deletePartsList(scope.row)"
                      :disabled="!canEdit"
                    >
                      删除
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
            </div>
            <!--            执行总结-->
            <div class="px-2 pb-2" v-if="stepIndex === 5">
              <div class="flex align-start">
                <div class="font font-weight-bold mr-2">框架履行总结</div>
                <!-- <jereh-button round @click="addPerformanceSummaryList">新增报告</jereh-button> -->
              </div>
              <el-table
                class="my-2"
                :data="reportList" border :fit="true"
                v-loading="tableLoading"
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  v-if="false"
                  prop="reportNumberId"
                  show-overflow-tooltip
                  align="center"
                  label="编码"
                >
                </af-table-column>
                <af-table-column
                  prop="pollingOffice"
                  fixed
                  label="累计完成巡检序次"
                  align="center"
                  show-overflow-tooltip
                >
                </af-table-column>
                <af-table-column
                  prop="inspectionTotalHours"
                  show-overflow-tooltip
                  align="center"
                  label="累计巡检工时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="completedNumber"
                  show-overflow-tooltip
                  align="center"
                  label="累计完成问题处理数量"
                >
                </af-table-column>
                <af-table-column
                  prop="handleFaultTotalHours"
                  show-overflow-tooltip
                  align="center"
                  label="累计故障处理总工时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="handleAuxiliaryTotalHours"
                  show-overflow-tooltip
                  align="center"
                  label="累计故障处理辅助总工时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="totalTrainingHours"
                  show-overflow-tooltip
                  align="center"
                  label="累计实施培训总课时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="maintenanceTotalOutputValue"
                  show-overflow-tooltip
                  align="center"
                  label="累计达成维修项目总产值（万元）"
                >
                </af-table-column>
                <af-table-column
                  prop="approveDate"
                  show-overflow-tooltip
                  align="center"
                  label="发起审批日期"
                >
                </af-table-column>
                <af-table-column
                  prop="managerCheckDate"
                  show-overflow-tooltip
                  align="center"
                  label="区域经理审核日期"
                >
                </af-table-column>
                <af-table-column
                  prop="maketConfirmDate"
                  show-overflow-tooltip
                  align="center"
                  label="市场确认日期"
                >
                </af-table-column>
                <af-table-column
                  prop="upMoney"
                  show-overflow-tooltip
                  align="center"
                  label="市场确认框架累计达成额（万元）"
                >
                </af-table-column>
                <af-table-column
                  prop=""
                  show-overflow-tooltip
                  align="center"
                  label="市场确认框架是否履约完成"
                >
                  <template slot-scope="scope">
                    <el-radio-group v-model="scope.row.isFinishFrameWork" :disabled="!scope.row.editable || !canEdit">
                      <el-radio label="是">是</el-radio>
                      <el-radio label="否">否</el-radio>
                    </el-radio-group>
                  </template>
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="150">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="checkReport()"
                      :disabled="!canEdit"
                    >
                      查看报告
                    </jereh-button>
                    <jereh-button
                      size="mini"
                      type="text"
                      :disabled="!directorFlag || !canEdit"
                      @click="saveData1()"
                    >
                      保存
                    </jereh-button>
                    <jereh-button
                      size="mini"
                      type="text"
                      :disabled="!directorFlag || !canEdit"
                      @click="scope.row.editable = true"
                    >
                      编辑
                    </jereh-button>
                    <!-- <jereh-button
                      size="mini"
                      type="text"
                      :disabled="!directorFlag"
                      @click="delData(scope.row,scope.$index)"
                    >
                      删除
                    </jereh-button> -->
                  </template>
                </af-table-column>
              </el-table>
              <div class="flex align-start">
                <div class="font font-weight-bold mr-2">阶段执行报告</div>
                <jereh-button round @click="addStageImplementationList" v-if="directorFlag" :disabled="!canEdit">新增报告</jereh-button>
              </div>
              <el-table
                class="my-2"
                :data="stageReportList" border
              >
                <af-table-column
                  type="index"
                  fixed
                  align="center"
                  width="50"
                >
                </af-table-column>
                <af-table-column
                  prop="startingDate"
                  fixed
                  width="180%"
                  label="起始日期"
                  value-formate="yyyy-MM-dd"
                  align="center"
                  show-overflow-tooltip
                >
                <template slot-scope="scope">
                  <div v-if="scope.row.typeChange">
                    <jereh-date-picker
                      v-model="scope.row.startingDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      @change="changeStageStartTime($event,scope.$index)"
                      :disabled="!canEdit"
                    ></jereh-date-picker>
                    </div>
                    <div v-if="!scope.row.typeChange">{{formatDate(scope.row.startingDate)}}</div>
                  </template>
                </af-table-column>
                <af-table-column
                  prop="endingDate"
                  show-overflow-tooltip
                  align="center"
                  width="180%"
                  label="结束日期"
                >
                <template slot-scope="scope">
                  <div v-if="scope.row.typeChange">
                    <jereh-date-picker
                      v-model="scope.row.endingDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      @change="changeStageEndTime($event,scope.$index)"
                      :disabled="!canEdit"
                    ></jereh-date-picker>
                    </div>
                    <div v-if="!scope.row.typeChange">{{formatDate(scope.row.endingDate)}}</div>
                  </template>
                </af-table-column>
                <af-table-column
                  v-if="false"
                  prop="reportNumberId"
                  show-overflow-tooltip
                  align="center"
                  label="编码"
                >
                </af-table-column>
                <af-table-column
                  prop="stagePollingOffice"
                  show-overflow-tooltip
                  align="center"
                  label="阶段完成巡检序次"
                >
                </af-table-column>
                <af-table-column
                  prop="stagePollingManHour"
                  show-overflow-tooltip
                  align="center"
                  label="阶段巡检工时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="stageAccomplishProblemNumber"
                  show-overflow-tooltip
                  align="center"
                  label="阶段完成问题处理数量"
                >
                </af-table-column>
                <af-table-column
                  prop="stageFaultHandlingManHour"
                  show-overflow-tooltip
                  align="center"
                  label="阶段故障处理总工时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="stageFaultHandlingAssistManHour"
                  show-overflow-tooltip
                  align="center"
                  label="阶段故障处理辅助总工时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="stageUndertakeTrainingTotalHours"
                  show-overflow-tooltip
                  align="center"
                  label="阶段实施培训总课时（h）"
                >
                </af-table-column>
                <af-table-column
                  prop="stageCompleteMaintenanceNumber"
                  show-overflow-tooltip
                  align="center"
                  label="阶段完成维修改造项目数量"
                >
                </af-table-column>
                <af-table-column
                  prop="stageAchieveMaintenanceProjects"
                  show-overflow-tooltip
                  align="center"
                  label="阶段达成维修项目总产值（万元）"
                >
                </af-table-column>
                <af-table-column
                  prop="stageReachAccessoriesOrderMoney"
                  show-overflow-tooltip
                  align="center"
                  label="阶段达成配件订单总金额（万元）"
                >
                </af-table-column>
                <af-table-column
                  prop="approveDate"
                  show-overflow-tooltip
                  align="center"
                  label="发起审批日期"
                >
                </af-table-column>
                <af-table-column
                  prop="managerCheckDate"
                  show-overflow-tooltip
                  align="center"
                  label="区域经理审核日期"
                >
                </af-table-column>
                <af-table-column
                  prop="maketConfirmDate"
                  show-overflow-tooltip
                  align="center"
                  label="市场确认日期"
                >
                </af-table-column>
                <af-table-column
                  prop="upMoney"
                  show-overflow-tooltip
                  align="center"
                  label="市场确认框架累计达成额（万元）"
                >
                </af-table-column>
                <af-table-column
                  prop="attachRate"
                  show-overflow-tooltip
                  align="center"
                  label="框架累计达成率（%）"
                >
                <template slot-scope="scope">
                  <div v-if="scope.row.typeChange">
                    <jereh-input
                      v-model="scope.row.attachRate"
                      @change="changeState($event,scope.$index)"
                      :disabled="!canEdit"
                    ></jereh-input>
                    </div>
                    <div v-if="!scope.row.typeChange">{{scope.row.attachRate}}</div>
                  </template>
                </af-table-column>

                <af-table-column label="操作" align="center" fixed="right" width="150">
                  <template slot-scope="scope">
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="toReport(scope.row,scope.$index)"
                      :disabled="!canEdit"
                    >
                      查看报告
                    </jereh-button>
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="saveData(scope.row,scope.$index)"
                      :disabled="!canEdit"
                    >
                      保存
                    </jereh-button>
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="editor(scope.row,scope.$index)"
                      :disabled="!canEdit"
                    >
                      编辑
                    </jereh-button>
                    <jereh-button
                      size="mini"
                      type="text"
                      @click="deleteReport(scope.row,scope.$index)"
                      :disabled="!canEdit"
                    >
                      删除
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
            </div>
            <!-- 协议关闭 -->
            <div class="px-2 pb-2" v-if="stepIndex === 6">
              <last-stage ref="lastStage" serviceType="框架协议" :auditRecord="frameworkDetail.frameworkClose.records" :canEdit="canClose"></last-stage>
            </div>
          </div>
          <!--          操作记录-->
          <div class="border rounded">
            <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
              <div class="font">操作记录</div>
            </div>
            <operationRecord :service-code="frameworkDetail.sdServicePool.serviceCode"
                             :service-stage-code="stepIndex"
                             :data-id="frameworkDetail.id"
                             ref="operationRecord"
            ></operationRecord>
          </div>
        </el-form>
      </div>
    </div>

    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?id=' + frameworkDetail.id + '&submittedItemId='+frameworkDetail.accessoriesDemand.submittedItem"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <jereh-button type="primary" @click="submitFileForm">确 定</jereh-button>
        <jereh-button @click="upload.open = false">取 消</jereh-button>
      </div>
    </el-dialog>
    <el-dialog title="阶段报告"  :visible.sync="dialogVisible1" width="75%">
      <el-row :gutter="10" class="mb-2">
            <el-col :span="1.5">
                <jereh-button @click="save()" >保存</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button @click="">更新报告</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button @click="closeDilog()">关闭</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button
                @click="exportPDF()"
                >导出PDF</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button @click="openApprove(101,index)">发起审批</jereh-button>
            </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col :span="4">
              <img  :src="logo" style="width:50%;height:30%"/>
            </el-col>
            <el-col :span="16">
            <div style="text-align: center">阶段报告</div>
            </el-col>
            </el-row>
             </div>
             <el-collapse >
              <el-collapse-item title="阶段框架报告详情" name="1">
             <stageReport :executiveReport="executiveReport"></stageReport>
             </el-collapse-item>
             </el-collapse>
        <div v-if="check1=='1'">
          <div style="margin:5px;background-color: #f8f9fa;">
          <font style="font-size:larger ;font-weight:600">区域经理审核</font>
          </div>
            <el-radio v-model="form1.check" label="通过" value="通过">通过</el-radio>
            <el-radio v-model="form1.check" label="退回修改" value="退回修改">退回修改</el-radio>
            <jereh-button @click="dealCheckManager(101,index)">区域经理审核</jereh-button>
            <el-input
                type="textarea"
                :rows="2"
                style="margin-top:5px"
                placeholder=""
                v-model="form1.suggest"
                >
            </el-input>
        </div>
        <div v-if="check2=='1'">
          <div style="margin:5px;background-color: #f8f9fa;">
          <font style="font-size:larger ;font-weight:600">市场确认</font>
          </div>
          <el-radio v-model="form2.check" label="通过" value="通过">通过</el-radio>
          <el-radio v-model="form2.check" label="退回修改" value="退回修改">退回修改</el-radio>
          <span>市场确认框架累计达成额(万元):<el-input type="text" v-model="form2.upMoney" style="width:10%;height:5px"  size="mini" ></el-input></span>
          <jereh-button style="margin-left:5px;" @click="dealCheckMarket(101)">市场确认</jereh-button>
          <el-input
              style="margin-top:5px"
              type="textarea"
              :rows="2"
              placeholder=""
              v-model="form2.suggest"
              >
          </el-input>
        </div>
        <div style="margin:5px;background-color: #f8f9fa;">
          <font style="font-size:larger ;font-weight:600">操作记录</font>
        </div>
        <el-table
            style="width:100% ;"
            :data="datatable"
            :cell-style="{
                'text-align': 'center',
                'font-size': '12px',
              }"
          :header-cell-style="{
                'text-align': 'center',
                'font-size': '13px',
                'font-weight': '250',
                'background': '#FAFAFA',
                'font-family': 'PingFangSC, PingFangSC-Semibold',
              }" border>
                <el-table-column type="index" >
                    <template slot="header" >
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="operationRecord"   >
                    <template slot="header">
                        操作记录
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime"  >
                    <template slot="header">
                    更新时间
                    </template>
                </el-table-column>
                <el-table-column prop="updateBy"  >
                    <template slot="header">
                   更新人
                    </template>
                </el-table-column>
                <el-table-column prop="approvalOperation"  >
                    <template slot="header">
                    审批操作
                    </template>
                </el-table-column>
                <el-table-column prop="approvalSuggest"  >
                    <template slot="header">
                    审批建议
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
              v-show="pageParam.total>0"
              :total="pageParam.total"
              :page.sync="pageParam.pageNum"
              :limit.sync="pageParam.pageSize"
              @pagination="selectRecord"
            />
    </el-dialog>
    <el-dialog title="总结报告报告"  :visible.sync="dialogVisible3" width="75%">
      <div v-loading="dialogLoading">
      <el-row :gutter="10" class="mb-2">
            <el-col :span="1.5">
                <jereh-button @click="saveData1()" >保存</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button @click="refreshReport()">更新报告</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button @click="closeDilog()">关闭</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button
                @click="exportPDF()"
                >导出PDF</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button @click="openApprove(102,index1)">发起审批</jereh-button>
            </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col :span="4">
              <img  :src="logo" style="width:50%;height:30%"/>
            </el-col>
            <el-col :span="16">
            <div style="text-align: center">总结报告</div>
            </el-col>
            </el-row>
             </div>
             <el-collapse >
              <el-collapse-item title="总结框架报告详情" name="1">
             <Report :executiveReport="performReport"></Report>
             </el-collapse-item>
             </el-collapse>
        <div v-if="check1=='1'">
          <div style="margin:5px;background-color: #f8f9fa;">
          <font style="font-size:larger ;font-weight:600">区域经理审核</font>
          </div>
            <el-radio v-model="form1.check" label="通过" value="通过">通过</el-radio>
            <el-radio v-model="form1.check" label="退回修改" value="退回修改">退回修改</el-radio>
            <jereh-button @click="dealCheckManager(102)">区域经理审核</jereh-button>
            <el-input
                type="textarea"
                :rows="2"
                style="margin-top:5px"
                placeholder=""
                v-model="form1.suggest"
                >
            </el-input>
        </div>
        <div v-if="check2=='1'">
          <div style="margin:5px;background-color: #f8f9fa;">
          <font style="font-size:larger ;font-weight:600">市场确认</font>
          </div>
          <el-radio v-model="form2.check" label="通过" value="通过">通过</el-radio>
          <el-radio v-model="form2.check" label="退回修改" value="退回修改">退回修改</el-radio>
          <span>市场确认框架累计达成额(万元):<el-input type="text" v-model="form2.upMoney" style="width:10%;height:5px"  size="mini" ></el-input></span>
          <jereh-button style="margin-left:5px;" @click="dealCheckMarket(102)">市场确认</jereh-button>
          <el-input
              style="margin-top:5px"
              type="textarea"
              :rows="2"
              placeholder=""
              v-model="form2.suggest"
              >
          </el-input>
        </div>
        <div style="margin:5px;background-color: #f8f9fa;">
          <font style="font-size:larger ;font-weight:600">操作记录</font>
        </div>
        <el-table
            style="width:100% ;"
            :data="datatable1"
            :cell-style="{
                'text-align': 'center',
                'font-size': '12px',
              }"
          :header-cell-style="{
                'text-align': 'center',
                'font-size': '13px',
                'font-weight': '250',
                'background': '#FAFAFA',
                'font-family': 'PingFangSC, PingFangSC-Semibold',
              }" border>
                <el-table-column type="index" >
                    <template slot="header" >
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="operationRecord"   >
                    <template slot="header">
                        操作记录
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime"  >
                    <template slot="header">
                    更新时间
                    </template>
                </el-table-column>
                <el-table-column prop="updateBy"  >
                    <template slot="header">
                   更新人
                    </template>
                </el-table-column>
                <el-table-column prop="approvalOperation"  >
                    <template slot="header">
                    审批操作
                    </template>
                </el-table-column>
                <el-table-column prop="approvalSuggest"  >
                    <template slot="header">
                    审批建议
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
              v-show="pageParam1.total>0"
              :total="pageParam1.total"
              :page.sync="pageParam1.pageNum"
              :limit.sync="pageParam1.pageSize"
              @pagination="selectRecord1"
            />
      </div>
    </el-dialog>
    <el-dialog title="巡检报告"  :visible.sync="dialogVisible2" width="75%">
      <el-row :gutter="10" class="mb-2">
            <el-col :span="1.5">
                <jereh-button @click="save()" >保存</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button @click="">更新报告</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button @click="closeDilog()">关闭</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button
                @click="exportPDF1()"
                >导出PDF</jereh-button>
            </el-col>
            <el-col :span="1.5">
                <jereh-button @click="openApprove(100,index2)">发起审批</jereh-button>
            </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col :span="4">
              <img  :src="logo" style="width:50%;height:30%"/>
            </el-col>
            <el-col :span="16">
            <div style="text-align: center">巡检报告</div>
            </el-col>
            </el-row>
             </div>
             <el-collapse >
              <el-collapse-item title="巡检报告详情" name="1">
                <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="100%"
                height="1000px"
                :src="link"
              >
              </iframe>
             </el-collapse-item>
             </el-collapse>
        <div v-if="check1=='1'">
          <div style="margin:5px;background-color: #f8f9fa;">
          <font style="font-size:larger ;font-weight:600">区域经理审核</font>
          </div>
            <el-radio v-model="form1.check" label="通过" value="通过">通过</el-radio>
            <el-radio v-model="form1.check" label="退回修改" value="退回修改">退回修改</el-radio>
            <jereh-button>区域经理审核</jereh-button>
            <el-input
                type="textarea"
                :rows="2"
                style="margin-top:5px"
                placeholder=""
                v-model="form1.suggest"
                >
            </el-input>
        </div>
        <div v-if="check2=='1'">
          <div style="margin:5px;background-color: #f8f9fa;">
          <font style="font-size:larger ;font-weight:600">市场确认</font>
          </div>
          <el-radio v-model="form2.check" label="通过" value="通过">通过</el-radio>
          <el-radio v-model="form2.check" label="退回修改" value="退回修改">退回修改</el-radio>
          <span>市场确认框架累计达成额(万元):</span><el-input type="text" v-model="form2.upMoney" ></el-input>
          <jereh-button>市场确认</jereh-button>
          <el-input
              style="margin-top:5px"
              type="textarea"
              :rows="2"
              placeholder=""
              v-model="form2.suggest"
              >
          </el-input>
        </div>
        <div style="margin:5px;background-color: #f8f9fa;">
          <font style="font-size:larger ;font-weight:600">操作记录</font>
        </div>
        <el-table
            style="width:100% ;"
            :data="data1"
            :cell-style="{
                'text-align': 'center',
                'font-size': '12px',
              }"
          :header-cell-style="{
                'text-align': 'center',
                'font-size': '13px',
                'font-weight': '250',
                'background': '#FAFAFA',
                'font-family': 'PingFangSC, PingFangSC-Semibold',
              }" border>
                <el-table-column prop="index" >
                    <template slot="header" >
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   >
                    <template slot="header">
                        操作记录
                    </template>
                </el-table-column>
                <el-table-column prop="chassisCode"  >
                    <template slot="header">
                    更新时间
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"  >
                    <template slot="header">
                   更新人
                    </template>
                </el-table-column>
                <el-table-column prop="productName"  >
                    <template slot="header">
                    审批操作
                    </template>
                </el-table-column>
                <el-table-column prop="productType"  >
                    <template slot="header">
                    审批建议
                    </template>
                </el-table-column>
            </el-table>
    </el-dialog>
    <deviceBinding ref="deviceBinding" v-if="frameworkDetail.implementPatrolInspection.inspectionItem"
                   :alert="getInspectionItem"
                   @confirm="confirmBindDevice"
    ></deviceBinding>
    <!-- 巡检记录 -->
    <el-dialog title="巡检记录" v-if="dialogVisible" :visible.sync="dialogVisible" width="70%">
      <inspection-record :data="dialogData" @save="saveInspectionRecord" @close="dialogClose"/>
    </el-dialog>
    <!-- 工时记录 -->
    <el-dialog title="工时记录" :visible.sync="showRecord" v-if="showRecord" width="70%" append-to-body :close-on-click-modal="false" destroy-on-close>
      <man-hours-record serviceType="框架协议" :serviceCode="frameworkDetail.sdServicePool.serviceCode" :projectItem="frameworkDetail.sdServicePool.projectItem"></man-hours-record>
    </el-dialog>
  </div>
</template>

<script>
import logo from '@/assets/logo/logo1.png'
import {
  getFramework,
  nextStep,
  updateFramework,
  saveFramework,
  queryFrameworkStage,
  saveFrameworkStage,
  finishSubmit,
  queryStageReport,
  queryReport,
  delStageReport,
  delReport,
  queryFramework,
  FrameworkApprove,
  checkManager,
  checkMaket,
  addCheckManager,
  addCheckMarket,
  sendEmail,
  finishRectification
} from '../../../api/cmms/sdFramework'
import deviceBinding from './components/deviceBinding'
import { operatingRecordList } from '../../../api/cmms/serviceDelivery'
import { listTrainingService, updateTrainingService } from '../../../api/cmms/sdTrainingService'
import operationRecord from './components/operationRecord'
import DatePicker from '../../../jereh-ui/date-picker/index.vue'
import moment from 'moment'
import {getPdf} from '../../../utils/exportPdf'
import stageReport from './stageReport.vue'
import Report from './report.vue'
import InspectionRecord from './components/inspectionRecord.vue'
import { getToken } from '../../../utils/auth'
import ManHoursRecord from './components/manHoursRecord.vue'
import LastStage from './components/lastStage.vue'

export default {
  dicts: ['inspection_type', 'equipment_scope', 'market_confirm_result', 'inspection_state'],
  components: {
    deviceBinding,
    operationRecord,
    DatePicker,
    InspectionRecord,
    stageReport,
    Report,
    ManHoursRecord,
    LastStage
},
  data() {
    return {
      directorFlag: false,
      pageParam:{
        serviceCode: null,
        dataId: null,
        serviceStageCode: null,
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      pageParam1:{
        serviceCode: null,
        dataId: null,
        serviceStageCode: null,
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      reportId:null,
      reportId1:null,
      datatable:[],
      datatable1:[],
      checkData:{},
      checkIndex:null,
      checkData1:{},
      checkIndex1:[],
      link:"",
      logo,
      index:"",
      index1:"",
      check1:null,
      check2:null,
      form1:{
        suggest:"",
        check:"",
        headContent:"阶段执行报告-区域经理审核"
      },
      data1:[],
      form2:{
        suggest:"",
        check:"",
        headContent:"阶段执行报告-市场确认",
        upMoney:null
      },
      form3:{
        suggest:"",
        check:""
      },
      form4:{
        suggest:"",
        check:""
      },
      dialogVisible1:false,
      dialogVisible2:false,
      dialogVisible3:false,
      check:null,
      stageReport:{},
      list:[],
      reportList:[{
        editable: false
      }],
      tableLoading: false,
      stageReportList:[],
      performReport:{},
      reportListObject:{},
      executiveReport:{
        stageConcludeMessage:{
                reportNumberId:""
            },
            serviceMaintenanceSuggestions:{
                normalUse:[]
            },
            framework:{
                sdServicePool:{
                customerName:""
                }

            }
      },
      trainingServiceList: [],
      partsList: [],
      // 遮罩层
      loading: false,
      inspectionDetailList: [],
      showInspectionReportList: false,
      stepIndex: 0,
      stepList: [{
        name: '制定履行计划',
        field: 'formulatePlan'
      }, {
        name: '实施巡检',
        field: 'implementPatrolInspection'
      }, {
        name: '问题处理',
        field: 'problemHandle'
      }, {
        name: '实施培训&再制造',
        field: 'implementTraining'
      }, {
        name: '配件需求',
        field: 'accessoriesDemand'
      }, {
        name: '执行总结',
        field: 'executiveSummary'
      },{
        name: '协议关闭',
        field: 'frameworkClose'
      }],
      frameworkDetail: {
        sdServicePool: {},
        formulatePlan: {},
        implementPatrolInspection: {},
        problemHandle: {},
        implementTraining: {},
        accessoriesDemand: {},
        executiveSummary: {
          stageImplementationList:[],
        },
        frameworkClose: {
          status: "",
          records: {}
        }
      },
      rules: {},
      // 前端做查询，暂存原数据
      originInspectionPlanList: [],
      resultInspectionPlanList: [],
      // 控制巡检记录显示
      dialogVisible: false,
      dialogData: {},
      // 前端做分页
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      upload: {
        // 是否显示弹出层
        open: false,
        // 弹出层标题
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 数据id
        id: '',
        // 选中的提报序次
        submittedItemId: '',
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/cmms/framework/importFittingData'
      },
      showRecord: false,
      dialogLoading: false,
      // 权限控制
      canEdit: false,
      canClose: false,
      totalPartsNum: 0,
      totalMoney: 0
    }
  },
  created() {
    this.frameworkDetail.id = this.$route.query.id
    if(this.$route.query.reportId!=undefined){
      this.reportId=this.$route.query.reportId
      this.openDialog1()
    }
    this.getFrameworkDetail()
    this.$nextTick(function () {
      this.getStageReport()
      this.getReport()
    });

  },
  computed: {
    getInspectionItem() {
      for (const item of this.frameworkDetail.formulatePlan.inspectionPlanList) {
        if (item.id === this.frameworkDetail.implementPatrolInspection.inspectionItem[0]) {
          return '请确认本次绑定的巡检序次为【' + item.inspectionItem + '】，如不是此序次，请先在 实施巡检页面切换巡检序次'
        }
      }
    }
  },
  methods: {
    dealCheckMarket(data){
      let topic=""
      let reportId=""
      if(data==102){
        topic="履行总结报告"
        reportId=this.performReport.stageConcludeMessage.reportNumberId
      }
      else if(data==101){
        topic="阶段执行报告"
        reportId=this.reportId
      }
      else{
        topic="巡检报告"
      }
      let param={
        approvalOperation:this.form2.check,
        approvalSuggest:this.form2.suggest,
        headContentTwo:topic+"-市场确认",
        id:this.frameworkDetail.id,
        serviceCode:reportId,
        serviceDirector:this.frameworkDetail.sdServicePool.serviceDirector,
        serviceStageCode:data,
        identification:1
      }
      addCheckMarket(param).then(res=>{
        if(res.code==200){
          this.$modal.msgSuccess('确认成功')
          if(data==101){
            this.stageReportList[this.checkIndex]['maketConfirmDate']=this.formate(new Date())
            this.stageReportList[this.checkIndex]['upMoney']=this.form2.upMoney
            this.saveData(this.checkData,this.checkIndex)
          }
          else if(data==102){
            this.performReport.stageConcludeMessage.maketConfirmDate=this.formate(new Date())
            this.performReport.stageConcludeMessage.upMoney=this.form2.upMoney
            this.saveData1()
          }
        }
      })
      this.selectRecord()
      this.selectRecord1()
    },
    selectRecord(){
      this.pageParam.serviceCode = this.reportId
      this.pageParam.dataId = this.frameworkDetail.id,
      this.pageParam.serviceStageCode = 101
      operatingRecordList(this.pageParam).then(res=>{
        this.datatable=res.rows
        this.pageParam.total=res.total
      })
    },
    selectRecord1(){
      this.pageParam1.serviceCode = this.reportId1
      this.pageParam1.dataId = this.frameworkDetail.id,
      this.pageParam1.serviceStageCode = 102
      operatingRecordList(this.pageParam1).then(res=>{
        this.datatable1=res.rows
        this.pageParam1.total=res.total
      })
    },
    dealCheckManager(data,index){
      let topic=""
      let report=""
      if(data==102){
        topic="履行总结报告"
        report=this.performReport.stageConcludeMessage.reportNumberId
      }
      else if(data==101){
        topic="阶段执行报告"
        report=this.reportId
      }
      else{
        topic="巡检报告"
      }
      let param={
        approvalOperation:this.form1.check,
        approvalSuggest:this.form1.suggest,
        headContent:topic+"-区域经理审核",
        headContentTwo:topic+"-市场确认",
        id:this.frameworkDetail.id,
        serviceCode:report,
        serviceDirector:this.frameworkDetail.sdServicePool.serviceDirector,
        serviceStageCode:data,
        identification:  0,
        maketDirector:this.frameworkDetail.sdServicePool.maketDirector
      }
      addCheckManager(param).then(res=>{
        if(res.code==200){
          this.$modal.msgSuccess('审核成功')
        if(data==101){
          this.stageReportList[this.checkIndex]['managerCheckDate']=this.formate(new Date())
          this.saveData(this.checkData,this.checkIndex)
        }
        else if(data==102){
          this.performReport.stageConcludeMessage.managerCheckDate=this.formate(new Date())
          this.saveData1()
        }
        else{

        }
        }
      })
      this.selectRecord()
      this.selectRecord1()
    },
    checkAreaManager(){
      let param={
        afterSaleArea:this.frameworkDetail.sdServicePool.afterSaleArea
      }
      checkManager(param).then(res=>{
        this.check1=res.msg
      })
    },
    checkMaket1(){
      let param={
        maketDirector:this.frameworkDetail.sdServicePool.maketDirector
      }
      checkMaket(param).then(res=>{
        this.check2=res.msg
      })
    },
    openDialog1(){
      this.dialogVisible1=true
      const data={
        frameworkId:this.frameworkDetail.id,
        statementType:4,
        executiveReportCode:this.reportId
      }
      queryFrameworkStage(data).then(res=>{
        if(res.data.executiveReport==undefined){
            this.executiveReport=res.data
        }
        else{
            this.executiveReport=res.data.executiveReport
        }
      })
      this.checkAreaManager()
      this.checkMaket1()
    },
    exportPDF(){
        getPdf('框架协议阶段报告'+this.formate(new Date()),'exportHtml');
    },
    exportPDF1(){
      getPdf('巡检报告'+this.formate(new Date()),'inlineFrameExample');
    },
    formate(date){
        return moment(date).format('YYYY-MM-DD')
    },
    deleteReport(data,index){
      this.$modal.confirm('确认删除吗？').then(() => {
      delStageReport(data.reportNumberId).then(res=>{
        this.$modal.msgSuccess('删除成功')
        this.stageReportList.splice(index,1)
      })
    })
    },
    openApprove(data, index){
      let topic=""
      let serviceCode = ""
      if(data==102){
        topic="履行总结报告"
        serviceCode=this.performReport.stageConcludeMessage.reportNumberId
      }
      else if(data==101){
        topic="阶段执行报告"
        serviceCode=index
      }
      else{
        topic="巡检报告"
        serviceCode=index
      }
      let param={
        maketDirector:this.frameworkDetail.sdServicePool.maketDirector,
        afterSaleArea:"cmms:area:"+this.frameworkDetail.sdServicePool.afterSaleArea,
        serviceCode:serviceCode,
        serviceStageCode:data,
        id:this.frameworkDetail.id,
        serviceDirector:this.frameworkDetail.sdServicePool.serviceDirector,
        headContent:topic+"-区域经理审核",
        headContentTwo:topic+"-市场确认"
      }
      FrameworkApprove(param).then(res=>{
        if(res.msg!="1"){
          this.$modal.msgSuccess('发起成功')
          if(data==101){
            this.stageReportList[this.checkIndex]['approveDate']=this.formate(new Date())
            this.saveData(this.checkData,this.checkIndex)
          }
          else if(data==102){
            this.performReport.stageConcludeMessage.approveDate=this.formate(new Date())
            this.saveData1()
          }
          else{

          }
        }
        else{
          this.$modal.msgError('请勿重复发起')
        }
      })
      this.selectRecord()
      this.selectRecord1()
    },
    getReport(){
      let data={
        frameworkId:this.frameworkDetail.id,
        statementType:5
      }
      this.tableLoading = true
      queryReport(data).then(res=>{
        this.tableLoading = false
        if (res.data.length) {
          this.$set(this, "performReport", res.data[0].performReport)
          this.$set(this, "reportList", [res.data[0].performReport.stageConcludeMessage])
          this.$set(this.reportList[0], "editable", false)
        }
        // this.reportList.push(res.data[i].performReport.stageConcludeMessage)
      }).catch(e => {
        this.tableLoading = false
      })
    },
    refreshReport() {
      const data = {
        id: this.frameworkDetail.id,
        statementType: 5,
        rsur: "更新报告",
        serviceCode: this.frameworkDetail.sdServicePool.serviceCode,
        serviceStageCode: 102
      }
      this.dialogLoading = true;
      queryFramework(data).then(res => {
        this.dialogLoading = false;
        this.$set(this, "performReport", res.data)
      }).catch(e => {
        this.dialogLoading = false;
        this.$modal.msgSuccess("更新成功");
        console.log(e)
      })
    },
    getStageReport(){
      let data={
        frameworkId: this.frameworkDetail.id,
        statementType:4
      }
      queryStageReport(data).then(res=>{
        this.list=res.data
       for(let i=0;i<res.data.length;i++){
        this.stageReportList.push(res.data[i].executiveReport.stageConcludeMessage)
       }
      })
    },
    saveData(data,index){
      this.stageReportList[index].typeChange=false
      this.list[index].stageConcludeMessage=this.stageReportList[index]
      if(this.list[index].executiveReport==undefined){
         this.stageReport=this.list[index]
      }
      else{
         this.stageReport=this.list[index].executiveReport
      }
      let param={
        frameworkId:this.frameworkDetail.id,
        statementType:4,
        executiveReportCode:data.reportNumberId,
        executiveReport:this.stageReport
      }
      saveFrameworkStage(param).then(res=>{
        if(res.code==200){
          this.$modal.msgSuccess('保存成功')
        }
      })

    },
    saveData1(){
      let param = {
        frameworkId: this.frameworkDetail.id,
        statementType: 5,
        performReportCode: this.performReport.stageConcludeMessage.reportNumberId,
        performReport: this.performReport,
        afterSaleArea: "cmms:area:"+this.frameworkDetail.sdServicePool.afterSaleArea
      }
      saveFrameworkStage(param).then(res=>{
        if(res.code==200){
          this.$modal.msgSuccess('保存成功')
          this.getReport()
        }
      })

    },
    delData(data,index){
      this.$modal.confirm('确定删除吗？').then(() => {
        delReport(data.reportNumberId).then(res=>{
        this.$modal.msgSuccess('删除成功')
        this.reportList.splice(index,1)
      })
      })
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    editor(data,index){
      this.stageReportList[index].typeChange=true

    },
    changeStageStartTime(data,index){
      let startTime = new Date(data)
      let endTime = new Date(this.stageReportList[index].endingDate)
      if(startTime==''||startTime=='Invalid Date'||endTime==''||endTime=='Invalid Date'||startTime==null||endTime==null){
           return false
      }
      const param={
        frameworkId:this.frameworkDetail.id,
        statementType:4,
        startingDate:this.stageReportList[index].startingDate,
        endingDate:this.stageReportList[index].endingDate
      }
      queryFrameworkStage(param).then(res=>{
        this.executiveReport=res.data
        this.list.push(this.executiveReport)
        this.stageReportList[index]=res.data.stageConcludeMessage
				this.$set(this.stageReportList[index], 'typeChange', false)
        this.$set(this.stageReportList[index], 'attachRate', 0)
        this.addStageImplementationList()
        this.$nextTick(function () {
        this.stageReportList.splice(index+1,1)
      });
      })
      setTimeout(() => {
        this.saveData(this.stageReportList[index],index)
      },500)
    },
    changeStageEndTime(data,index){
      let endTime = new Date(data)
      let startTime = new Date(this.stageReportList[index].startingDate)
      if(startTime==''||startTime=='Invalid Date'||endTime==''||endTime=='Invalid Date'||startTime==null||endTime==null){
           return false
      }
      const param={
        frameworkId:this.frameworkDetail.id,
        statementType:4,
        startingDate:this.stageReportList[index].startingDate,
        endingDate:this.stageReportList[index].endingDate
      }
      queryFrameworkStage(param).then(res=>{
        this.executiveReport=res.data
        this.list.push(this.executiveReport)
        this.stageReportList[index]=res.data.stageConcludeMessage
        this.$set(this.stageReportList[index], 'typeChange', false)
        this.$set(this.stageReportList[index], 'attachRate', 0)
        this.addStageImplementationList()
        this.$nextTick(function () {
        this.stageReportList.splice(index+1,1)
      });
      })
      setTimeout(() => {
        this.saveData(this.stageReportList[index],index)
      },500)

    },
    // 变更巡检开始日期
    changeStartTime(data, row) {
      if (row.inspectionEndTime && new Date(data) > new Date(row.inspectionEndTime)) {
        row.inspectionStartTime = null
        this.$modal.msgError('开始日期要求小于结束日期')
      }
    },
    // 变更巡检结束日期
    changeEndTime(data, row) {
      if (row.inspectionStartTime && new Date(data) < new Date(row.inspectionStartTime)) {
        row.inspectionEndTime = null
        this.$modal.msgError('结束日期要求大于开始日期')
      }
    },
    // 新增阶段执行报告
    addStageImplementationList() {
      this.stageReportList.push({
        typeChange:true,
        contractAmount: null,
        endingDate: "",
        reportNumberId: null,
        stageAccessoriesNumber: null,
        stageAccomplishProblemNumber: null,
        stageAchieveMaintenanceProjects: null,
        stageAgreedContractAmount: null,
        stageCompleteMaintenanceNumber: null,
        stageEstablishProblemNumber: null,
        stageFaultHandlingAssistManHour: null,
        stageFaultHandlingManHour: null,
        stageMaintainManHour: null,
        stageNoConfirmedAccessoriesOrderMoney: null,
        stagePollingManHour: null,
        stagePollingOffice: null,
        stageReachAccessoriesOrderMoney: null,
        stageUndertakeTrainingOffice:null,
        stageUndertakeTrainingTotalHours: null,
        startingDate: ""
      })
    },
    // 绑定项目
    bindProject() {

    },
    // 跳转培训详情页面
    toTrainingServiceDetailPage(row) {
      this.$router.push({ path: '/cmms/serviceDelivery/trainingServiceDetail', query: { id: row.id } })
    },
    // 创建培训
    createTrainingService() {
      this.$router.push({
        path: '/cmms/serviceDelivery/trainingServiceDetail',
        query: { poolId: this.frameworkDetail.sdServicePool.id, serviceFrom: 'framework' }
      })
    },
    // 删除市场市场确认列表数据
    deleteMarketConfirmList(index) {
      this.frameworkDetail.accessoriesDemand.marketConfirmList.splice(index, 1)

      if (this.frameworkDetail.accessoriesDemand.marketConfirmList && this.frameworkDetail.accessoriesDemand.marketConfirmList.length > 0) {
        this.frameworkDetail.accessoriesDemand.marketConfirmList[0].submittedItem = '首次提报'
        this.$set(this.frameworkDetail.accessoriesDemand.marketConfirmList[0],'submittedItem','首次提报')
        this.frameworkDetail.accessoriesDemand.marketConfirmList[0].serialNo = 0
        for(let i = 0; i < this.frameworkDetail.accessoriesDemand.marketConfirmList[0].partsList.length; i++) {
          this.frameworkDetail.accessoriesDemand.marketConfirmList[0].partsList[i].submittedItem = '首次提报'
        }
        if (this.frameworkDetail.accessoriesDemand.marketConfirmList.length >= 1) {
          for (let i = 1; i < this.frameworkDetail.accessoriesDemand.marketConfirmList.length; i++) {
            const tempItem = '第' + (i+1) + '次提报'
            this.frameworkDetail.accessoriesDemand.marketConfirmList[i].submittedItem = tempItem
            this.$set(this.frameworkDetail.accessoriesDemand.marketConfirmList[i],'submittedItem',tempItem)
            this.frameworkDetail.accessoriesDemand.marketConfirmList[i].serialNo = i
            for(let y = 0; y < this.frameworkDetail.accessoriesDemand.marketConfirmList[i].partsList.length; y++) {
              this.frameworkDetail.accessoriesDemand.marketConfirmList[i].partsList[y].submittedItem = tempItem
            }
          }
        }
      }
      if (this.frameworkDetail.accessoriesDemand.marketConfirmList.length !==0){
        let itemData = this.frameworkDetail.accessoriesDemand.marketConfirmList[this.frameworkDetail.accessoriesDemand.marketConfirmList.length - 1]
        this.$set(this.frameworkDetail.accessoriesDemand, "submittedItem", [itemData])
      }else {
        this.frameworkDetail.accessoriesDemand.submittedItem = []
      }
      this.changeSubmittedItem(this.frameworkDetail.accessoriesDemand.submittedItem)
      this.getTotalPartsInfo()
    },
    // 删除配件清单数据
    deletePartsList(row) {
      for (const marketConfirm of this.frameworkDetail.accessoriesDemand.marketConfirmList) {
        if (marketConfirm.submittedItem === row.submittedItem) {
          let i
          for (i = 0; i < marketConfirm.partsList.length; i++) {
            if (marketConfirm.partsList[i].id === row.id) {
              marketConfirm.partsList.splice(i, 1)
              break
            }
          }
        }
      }
      this.changeSubmittedItem(this.frameworkDetail.accessoriesDemand.submittedItem)
      this.getTotalPartsInfo()
    },
    // 删除巡检详情数据
    deleteInspectionDetail(row) {
      for (const plan of this.frameworkDetail.formulatePlan.inspectionPlanList) {
        if (plan.inspectionItem === row.inspectionItem) {
          let i
          for (i = 0; i < plan.inspectionDetailList; i++) {
            if (plan.inspectionDetailList[i].projectItem === row.projectItem) {
              break
            }
          }
          plan.inspectionDetailList.splice(i - 1, 1)
        }
      }
      this.changeInspectionItem(this.frameworkDetail.implementPatrolInspection.inspectionItem)
    },
    // 提报序次切换
    changeSubmittedItem(data, needSave) {
      if (!data || data.length === 0) {
        this.partsList = []
        return
      }
      let list = []
      for (const id of data) {
        for (const item of this.frameworkDetail.accessoriesDemand.marketConfirmList) {
          if (item.id === id) {
            list = [...list, ...item.partsList]
          }
        }
      }
      this.partsList = list
      if (needSave) {
        this.handleSaveClick()
      }
    },
    // 巡检序次切换
    changeInspectionItem(data) {
      if (!data || data.length === 0) {
        this.inspectionDetailList = []
        return
      }
      let list = []
      for (const id of data) {
        for (const item of this.frameworkDetail.formulatePlan.inspectionPlanList) {
          if (item.id === id) {
            if (!item.inspectionDetailList) {
              item.inspectionDetailList = []
            }
            list = [...list, ...item.inspectionDetailList]
          }
        }
      }
      this.inspectionDetailList = list
    },

    // 新增配件清单
    addPartsList() {
      if (this.frameworkDetail.accessoriesDemand.submittedItem.length !== 1) {
        this.$modal.msgError('提报序次选中一条时，才可以进行添加操作')
        return
      }
      for (const marketConfirm of this.frameworkDetail.accessoriesDemand.marketConfirmList) {
        if (marketConfirm.id === this.frameworkDetail.accessoriesDemand.submittedItem[0]) {
          marketConfirm.partsList.push({
            id: this.$U.uuid(16, 16),
            submittedItem: marketConfirm.submittedItem
          })
        }
      }
      this.changeSubmittedItem(this.frameworkDetail.accessoriesDemand.submittedItem)
      this.getTotalPartsInfo()
    },
    // 绑定设备
    confirmBindDevice(data) {
      for (let i = 0; i < this.frameworkDetail.formulatePlan.inspectionPlanList.length; i++) {
        if (this.frameworkDetail.formulatePlan.inspectionPlanList[i].id === this.frameworkDetail.implementPatrolInspection.inspectionItem[0]) {
          data.inspectionItem = this.frameworkDetail.formulatePlan.inspectionPlanList[i].inspectionItem
          this.frameworkDetail.formulatePlan.inspectionPlanList[i].inspectionDetailList.push(data)
          // 去重
          this.frameworkDetail.formulatePlan.inspectionPlanList[i].inspectionDetailList = this.$U.uniqueList(this.frameworkDetail.formulatePlan.inspectionPlanList[i].inspectionDetailList, 'projectItem')
          // 合并巡检数据
          this.changeInspectionItem(this.frameworkDetail.implementPatrolInspection.inspectionItem)
        }
      }
    },
    // 打开绑定设备页面
    bindDevice() {
      if (this.frameworkDetail.implementPatrolInspection.inspectionItem.length === 1) {
        this.$refs.deviceBinding.openDialog()
      } else {
        this.$modal.msgError('巡检序次选中一条时，才可以进行绑定设备操作')
      }
    },
    // 查看报告
    showReport(row) {
      this.link="http://10.1.19.30:8080/webroot/decision/view/report?viewlet=CMMS%252FSD%252Fonsite.cpt&id="
      +this.frameworkDetail.id
      this.dialogVisible2=true
    },
    // 删除巡检计划
    deleteInspectionPlanList(index, inspectionItem) {
      if (Array.isArray(this.originInspectionPlanList) && this.originInspectionPlanList.length) {
        const newArr = this.originInspectionPlanList.filter(item => {
          return item.inspectionItem !== inspectionItem
        })
        for (let i = 0; i < newArr.length; i++) {
          if (i === 0) {
            newArr[i].inspectionItem = '首次巡检'
          } else {
            newArr[i].inspectionItem = '第' + (i + 1) + '次巡检'
          }
        }
        this.originInspectionPlanList = JSON.parse(JSON.stringify(newArr))
        this.handleTimeChange(this.frameworkDetail.formulatePlan.inspectionStartDate)
        this.frameworkDetail.implementPatrolInspection.inspectionItem = [this.originInspectionPlanList[this.originInspectionPlanList.length - 1].inspectionItem]
        this.changeInspectionItem(this.frameworkDetail.implementPatrolInspection.inspectionItem)
      }

    },
    // 新增市场确认
    addMarketConfirmList() {
      let submittedItem
      let id = this.$U.uuid(16, 16)
      if (this.frameworkDetail.accessoriesDemand.marketConfirmList.length === 0) {
        submittedItem = '首次提报'
      } else {
        submittedItem = '第' + (this.frameworkDetail.accessoriesDemand.marketConfirmList.length + 1) + '次提报'
      }

      this.frameworkDetail.accessoriesDemand.marketConfirmList.push({
        id: id,
        serialNo: this.frameworkDetail.accessoriesDemand.marketConfirmList.length,
        submittedItem: submittedItem,
        partsList: []
      })
      this.frameworkDetail.accessoriesDemand.submittedItem = [id]
      this.changeSubmittedItem(this.frameworkDetail.accessoriesDemand.submittedItem, true)
      this.getTotalPartsInfo()
    },
    // 新增巡检计划
    addInspectionPlanList() {
      let inspectionItem
      if (this.originInspectionPlanList.length === 0) {
        inspectionItem = '首次巡检'
      } else {
        inspectionItem = '第' + (this.originInspectionPlanList.length + 1) + '次巡检'
      }
      let date = new Date()
      const objItem = {
        id: this.$U.uuid(16, 16),
        inspectionItem: inspectionItem,
        inspectionStartTime: this.$U.formatDate(date, 'yyyy-MM-dd'),
        inspectionEndTime: this.$U.formatDate(date, 'yyyy-MM-dd'),
        inspectionDetailList: [],
        reportId: this.$U.uuid(16, 16)
      }
      this.frameworkDetail.formulatePlan.inspectionPlanList.push(objItem)
      this.originInspectionPlanList.push(objItem)
      this.frameworkDetail.implementPatrolInspection.inspectionItem = [this.frameworkDetail.formulatePlan.inspectionPlanList[this.frameworkDetail.formulatePlan.inspectionPlanList.length - 1].id]
      this.changeInspectionItem(this.frameworkDetail.implementPatrolInspection.inspectionItem)
    },
    // 下一步
    toNextStage() {
      this.frameworkDetail.formulatePlan.inspectionStartDate = null
      this.frameworkDetail.formulatePlan.inspectionPlanList = JSON.parse(JSON.stringify(this.originInspectionPlanList))
      this.frameworkDetail.serviceStageCode = this.stepIndex
      nextStep(this.frameworkDetail).then(res => {
        this.$modal.msgSuccess('保存成功')
        this.frameworkDetail[this.stepList[this.stepIndex].field].status = 'success'
        if (this.stepIndex === 6) {
          this.stepIndex = 0
        } else {
          this.stepIndex += 1
        }
      })
    },
    // 切换步骤
    changeStep(stepIndex) {
      this.stepIndex = stepIndex
    },
    // 协议完成
    finishFramework() {
      this.loading = true
      const flag = this.$refs["lastStage"].validateForm()
      if (!flag) {
        this.$message.error("请填写必填项！")
        return
      }
      this.$modal.confirm('是否确认协议完成？').then(() => {
        if (this.frameworkDetail.formulatePlan.status === 'success' &&
          this.frameworkDetail.implementPatrolInspection.status === 'success' &&
          this.frameworkDetail.problemHandle.status === 'success' &&
          this.frameworkDetail.implementTraining.status === 'success' &&
          this.frameworkDetail.accessoriesDemand.status === 'success' &&
          this.frameworkDetail.executiveSummary.status === 'success'
        ) {
          this.frameworkDetail.frameworkClose.status = 'success'
          finishSubmit(this.frameworkDetail).then(response => {
            this.frameworkDetail = response.data
            this.$modal.msgSuccess('协议已完成')
            this.loading = true
          })
        } else {
          this.$modal.msgError('请先完成所有服务过程')
        }
      })

    },
    // 保存
    handleSaveClick() {
      this.frameworkDetail.formulatePlan.inspectionStartDate = null
      this.frameworkDetail.formulatePlan.inspectionPlanList = JSON.parse(JSON.stringify(this.originInspectionPlanList))
      this.frameworkDetail.serviceStageCode = this.stepIndex
      if (this.stepIndex == 6) {
        this.frameworkDetail.frameworkClose.records = this.$refs["lastStage"].dataForm
      }
      updateFramework(this.frameworkDetail).then(res => {
        if (this.stepIndex== 5) {
          this.handleSaveSummary()
        } else {
          this.$modal.msgSuccess('保存成功')
          this.$refs.operationRecord.refresh()
        }
      })
    },
    // 执行总结保存
    handleSaveSummary() {
      let saveData = []
      if (this.list.length) {
        saveData = this.list.map((item, index) => {
          item.stageConcludeMessage = this.stageReportList[index]
          const param={
            frameworkId:this.frameworkDetail.id,
            statementType:4,
            executiveReportCode: item.stageConcludeMessage.reportNumberId,
            executiveReport: item.executiveReport || item
          }
          return param
        })
      }
      let saveData1 = []
      if (Object.keys(this.performReport).length !== 0) {
        saveData1 = [{
          frameworkId: this.frameworkDetail.id,
          statementType: 5,
          performReportCode: this.performReport.stageConcludeMessage.reportNumberId,
          performReport: this.performReport,
          afterSaleArea: "cmms:area:"+this.frameworkDetail.sdServicePool.afterSaleArea
        }]
      }
      let data={
        executiveReportList: saveData,
        performReportList: saveData1
      }
      saveFramework(data).then(res=>{
        this.$modal.msgSuccess('保存成功')
        this.$refs.operationRecord.refresh()
      })
    },
    // 获取第四步需要的培训列表
    getTrainingServiceList() {
      let params = {
        pageNum: 1,
        pageSize: 9999,
        serviceCode: this.frameworkDetail.sdServicePool.serviceCode
      }
      listTrainingService(params).then(response => {
        this.trainingServiceList = response.data.records
        // 获取合计培训总课时
        if (Array.isArray(this.trainingServiceList) && this.trainingServiceList.length) {
          let totalHours = 0
          this.trainingServiceList.forEach(item => {
            if (item.trainingStart) {
              totalHours += parseFloat(item.trainingStart.totalTraingHours)
            }
          })
          this.$set(this.frameworkDetail.implementTraining, "totalTrainingHours", totalHours)
        }
      })
    },
    // 获取详情数据
    getFrameworkDetail() {
      getFramework(this.frameworkDetail.id).then(res => {
        this.frameworkDetail = res.data
        if (this.frameworkDetail.sdServicePool.equipmentScope) {
          this.frameworkDetail.sdServicePool.equipmentScopeStr = this.frameworkDetail.sdServicePool.equipmentScope.join(',')
        }
        if (!this.frameworkDetail.formulatePlan) {
          this.frameworkDetail.formulatePlan = {}
          this.frameworkDetail.formulatePlan.inspectionPlanList = []
        }
        if (!this.frameworkDetail.implementPatrolInspection) {
          this.frameworkDetail.implementPatrolInspection = {}
          this.frameworkDetail.implementPatrolInspection.inspectionReportList = []
        }
        if (!this.frameworkDetail.problemHandle) {
          this.frameworkDetail.problemHandle = {}
          this.frameworkDetail.problemHandle.problemList = []
        }
        if (!this.frameworkDetail.implementTraining) {
          this.frameworkDetail.implementTraining = {}
          this.frameworkDetail.implementTraining.trainingList = []
          this.frameworkDetail.implementTraining.maintenanceList = []
        }
        if (!this.frameworkDetail.accessoriesDemand) {
          this.frameworkDetail.accessoriesDemand = {}
          this.frameworkDetail.accessoriesDemand.marketConfirmList = []
        }
        if (!this.frameworkDetail.executiveSummary) {
          this.frameworkDetail.executiveSummary = {}
          this.frameworkDetail.executiveSummary.performanceSummaryList = []
          this.frameworkDetail.executiveSummary.stageImplementationList = []
        }
        if (!this.frameworkDetail.frameworkClose) {
          this.frameworkDetail.frameworkClose = {
            status: "",
            records: {}
          }
        }
        this.directorFlag = this.frameworkDetail.directorFlag
        this.originInspectionPlanList = JSON.parse(JSON.stringify(this.frameworkDetail.formulatePlan.inspectionPlanList))
        this.queryParams.pageNum = 1
        this.getInspectionPlanList()
        this.changeInspectionItem(this.frameworkDetail.implementPatrolInspection.inspectionItem)
        this.changeSubmittedItem(this.frameworkDetail.accessoriesDemand.submittedItem)
        this.getTotalPartsInfo()
        this.getTrainingServiceList()
        this.getPermission()

      })

    },
    // 巡检开始日期前端查询
    handleTimeChange(value) {
      const startTime = value ? value[0] : null
      const endTime = value ? (value[1] + 24 * 3600 * 1000) : null
      if (startTime && endTime) {
        this.frameworkDetail.formulatePlan.inspectionPlanList = []
        for (let i = 0; i < this.originInspectionPlanList.length; i++) {
          const time = this.originInspectionPlanList[i].inspectionStartTime ? new Date(this.originInspectionPlanList[i].inspectionStartTime).getTime() : ''
          if (time && (startTime < time || startTime === time) && endTime > time) {
            this.frameworkDetail.formulatePlan.inspectionPlanList.push(this.originInspectionPlanList[i])
          }
        }
      }
      if (!value) {
        this.frameworkDetail.formulatePlan.inspectionPlanList = JSON.parse(JSON.stringify(this.originInspectionPlanList))
      }
      this.queryParams.pageNum = 1
      this.getInspectionPlanList()
    },
    // 打开巡检记录页面
    getInspectionRecord(row) {
      this.dialogVisible = true
      this.dialogData = row
      this.$set(this.dialogData,"inspectionDate",new Date())
    },
    // 保存巡检记录
    saveInspectionRecord(val) {
      const index = this.frameworkDetail.formulatePlan.inspectionPlanList.find(item => {
        return item.inspectionItem === val.inspectionItem
      })
      if (index !== -1) {
        this.frameworkDetail.formulatePlan.inspectionPlanList[index] = this.inspectionDetailList
      }
      this.dialogVisible = false
      this.handleSaveClick()
    },
    dialogClose() {
      this.dialogVisible = false
    },
    // 获取信息
    getInspectionPlanList() {
      const startIndex = (this.queryParams.pageNum - 1) * 10
      const endIndex = this.queryParams.pageNum * 10
      if (this.originInspectionPlanList.length < endIndex && this.originInspectionPlanList.length > startIndex) {
        this.frameworkDetail.formulatePlan.inspectionPlanList = this.originInspectionPlanList.slice(startIndex)
      } else {
        this.frameworkDetail.formulatePlan.inspectionPlanList = this.originInspectionPlanList.slice(startIndex, endIndex)
      }
    },
    handleDownloadTemplate() {
      this.download('cmms/framework/downLoadFittingTemplate', {}, `框架协议详情_配件需求_配件清单模板_${new Date().getTime()}.xlsx`)
    },
    // 新增配件清单通过excel
    addPartsListByExcel() {
      if (this.frameworkDetail.accessoriesDemand.submittedItem.length !== 1) {
        this.$modal.msgError('提报序次选中一条时，才可以进行导入操作')
        return
      }
      this.upload.title = '设备导入'
      this.upload.open = true
    },
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true })
      this.getFrameworkDetail()
    },
    submitFileForm() {
      this.$refs.upload.submit()
    }
    ,
    toReport(data1,index){
      this.dialogVisible1=true
      this.checkData=data1,
      this.checkIndex=index
      this.index=data1.reportNumberId
      this.reportId=data1.reportNumberId
      this.selectRecord()
      const data={
        frameworkId:this.frameworkDetail.id,
        statementType:4,
        startingDate:data1.startingDate,
        endingDate:data1.endingDate,
        executiveReportCode:data1.reportNumberId
      }
      queryFrameworkStage(data).then(res=>{
        if(res.data.executiveReport==undefined){
            this.executiveReport=res.data
        }
        else{
            this.executiveReport=res.data.executiveReport
        }
      })
      this.checkAreaManager()
      this.checkMaket1()
    },
    checkReport(){
      // 新增履行总结报告
      const data={
        id: this.frameworkDetail.id,
        statementType: 5,
        serviceCode: this.frameworkDetail.sdServicePool.serviceCode,
        serviceStageCode: 102
      }
      queryFramework(data).then(res=>{
        this.performReport=res.data
        this.form2 = {
          suggest:"",
          check:"",
          headContent:"阶段执行报告-市场确认",
          upMoney:null
        }
        this.form1 = {
          suggest:"",
          check:"",
          headContent:"阶段执行报告-区域经理审核"
        }
        this.dialogVisible3=true
        this.selectRecord1()
        this.checkAreaManager()
        this.checkMaket1()
      })
      // this.index1=data.reportNumberId
      // this.reportId1=data.reportNumberId
      // this.checkData1=data,
      // this.checkIndex1=index
      // this.selectRecord1()
      // if(this.list1[index].performReport==null){
      //   this.performReport=this.list1[index]
      // }else{
      //   this.performReport=this.list1[index].performReport
      // }

    },
    // 获取项目巡检总工时
    getInspectionTotalHours() {
      let inspectionTotalHours = 0;
      for (let i=0; i<this.frameworkDetail.formulatePlan.inspectionPlanList.length; i++) {
        if (this.frameworkDetail.formulatePlan.inspectionPlanList[i].inspectionDetailList) {
          if(this.frameworkDetail.formulatePlan.inspectionPlanList[i].inspectionDetailList[0]
          && this.frameworkDetail.formulatePlan.inspectionPlanList[i].inspectionDetailList[0].inspectionHours) {
            inspectionTotalHours += parseInt(this.frameworkDetail.formulatePlan.inspectionPlanList[i].inspectionDetailList[0].inspectionHours)
          }
        }
      }
      this.$set(this.frameworkDetail.implementPatrolInspection, 'inspectionTotalHours', inspectionTotalHours)
    },
    async sendAccessoriesEmail(index) {
      const marketSubmitDate = moment(new Date()).format("YYYY-MM-DD")
      this.$set(this.frameworkDetail.accessoriesDemand.marketConfirmList[index], 'marketSubmitDate', marketSubmitDate)
      await this.handleSaveClick()
      const currentAccessory = this.frameworkDetail.accessoriesDemand.marketConfirmList[index]
      sendEmail({'frameworkId': this.frameworkDetail.id, 'submissionNumber': currentAccessory.submittedItem})
    },
    // 展示工时记录
    showManHoursRecord() {
      this.showRecord = true;
    },
    // 履约完成审批
    finishApproval() {
      console.log("履约完成审批！")
    },
    // 提交整改
    submitSuggest() {
      this.frameworkDetail.serviceStageCode = this.stepIndex
      this.frameworkDetail.formulatePlan.inspectionStartDate = null
      this.frameworkDetail.formulatePlan.inspectionPlanList = JSON.parse(JSON.stringify(this.originInspectionPlanList))
      const flag = this.$refs["lastStage"].validateFormField()
      if (!flag) {
        this.$message.error("请填写必填项！")
        return
      }
      this.frameworkDetail.frameworkClose.records = this.$refs["lastStage"].dataForm
      updateFramework(this.frameworkDetail).then(response => {
        finishRectification(this.frameworkDetail).then(res => {
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
      if (this.frameworkDetail.sdServicePool.afterSaleArea) {
        const areaManagerRole = "cmms:area:" + this.frameworkDetail.sdServicePool.afterSaleArea
        canEditRoles.push(areaManagerRole)
      }
      console.log(canEditRoles)
      console.log(this.checkRole(canEditRoles))
      this.canEdit = this.checkRole(canEditRoles)
      this.canClose = this.checkRole(canEditRoles)
      const username = this.$store.state.user.nickName
      if (this.frameworkDetail.sdServicePool.serviceDirector === username && this.checkRole(["cmms:area"])) {
        this.canEdit = true
      }
      if (
        Array.isArray(this.frameworkDetail.serveBacker)
        && this.frameworkDetail.serveBacker.length
      ){
        if (this.frameworkDetail.serveBacker.includes(username) && this.checkRole(["cmms:area"])) {
          this.canEdit = true
        }
      }
    },
    // 获取配件提报总数量和订单达成总金额
    getTotalPartsInfo() {
      const dataList = this.frameworkDetail.accessoriesDemand.marketConfirmList
      let totalPartsNum = 0
      let totalMoney = 0
      for (let i=0; i<dataList.length; i++) {
        if (dataList[i].partsList) {
          totalPartsNum += dataList[i].partsList.length
        }
        if (dataList[i].reachedMoney) {
          totalMoney += parseFloat(dataList[i].reachedMoney)
        }
      }
      this.totalPartsNum = totalPartsNum
      this.totalMoney = totalMoney
    }
  }
}
</script>
