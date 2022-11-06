<template>
  <div class="app-container" v-loading="pageLoading">
    <!--    按钮-->
    <el-row :gutter="10" class="mb-2">
      <el-col :span="1.5">
        <jereh-button>设备360</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>视频指导</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>装备IoT</jereh-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <jereh-button @click="finishSubmit">交付完成</jereh-button>
      </el-col> -->
      <el-col :span="1.5">
        <jereh-button v-if="canEdit" @click="showManHoursRecord">工时记录</jereh-button>
      </el-col>
    </el-row>
    <!--内容-->
    <div class="flex justify-center">
      <div style="width: 100%">
        <el-form :model="deviceDeliverDetail" ref="deviceDeliverDetail" :disabled="!directorFlag" :rules="rules"
                 label-width="150px" size="small"
        >
          <!--          基础信息-->
          <div class="border rounded">
            <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
              <div class="font">基础信息</div>
            </div>
            <div class="flex mx-2 mb-2">
              <div>
                <el-image
                  style="width: 180px; height: 180px"
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                  :previewSrcList="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
                >
                </el-image>
              </div>
              <div class="flex flex-wrap">
                <el-form-item prop="sdServicePool.projectItem" label="项目编码分项" style="width: 25%;" label-width="140px">
                  <jereh-input v-model="deviceDeliverDetail.sdServicePool.projectItem" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="deviceBasic.productCode" label="产品编号" style="width: 25%;" label-width="140px">
                  <jereh-input v-model="deviceDeliverDetail.deviceBasic.productCode" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="deviceBasic.productName" label="产品名称" style="width: 25%;" label-width="140px">
                  <jereh-input v-model="deviceDeliverDetail.deviceBasic.productName" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="deviceBasic.productType" label="产品型号" style="width: 25%;" label-width="140px">
                  <jereh-input v-model="deviceDeliverDetail.deviceBasic.productType" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="deviceBasic.deliveryDirector" label="交付负责人" style="width: 25%;" label-width="140px">
                  <jereh-input v-model="deviceDeliverDetail.deviceBasic.deliveryDirector" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="deviceBasic.rdDirector" label="研发负责人" style="width: 25%;" label-width="140px">
                  <jereh-input v-model="deviceDeliverDetail.deviceBasic.rdDirector" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="deviceBasic.tester" label="测试负责人" style="width: 25%;" label-width="140px">
                  <jereh-input v-model="deviceDeliverDetail.deviceBasic.tester" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="deviceBasic.maketDirector" label="市场负责人" style="width: 25%;" label-width="140px">
                  <jereh-input v-model="deviceDeliverDetail.deviceBasic.maketDirector" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="deviceBasic.exfactoryDate" label="出厂日期" style="width: 25%;" label-width="140px">
                  <jereh-input v-model="deviceDeliverDetail.deviceBasic.exfactoryDate" disabled></jereh-input>
                </el-form-item>
                <el-form-item prop="deviceBasic.projectReviewCode" label="项目评审申请" style="width: 25%;" label-width="140px">
                  <!-- <jereh-input v-model="deviceDeliverDetail.deviceBasic.projectReviewCode" disabled></jereh-input> -->
                  <div style="height: 32px; line-height: 32px; width: 100%">
                    <el-link
                      type="primary"
                      :underline="false"
                      class="report-link"
                    > {{ deviceDeliverDetail.deviceBasic.projectReviewCode }}</el-link>
                  </div>
                </el-form-item>
                <el-form-item prop="deviceBasic.completeInspectionCode" label="(装备)报验完工流程"
                              style="width: 25%;" label-width="140px"
                >
                  <!-- <jereh-input v-model="deviceDeliverDetail.deviceBasic.completeInspectionCode" disabled></jereh-input> -->
                  <div style="height: 32px; line-height: 32px; width: 100%">
                    <el-link
                      type="primary"
                      :underline="false"
                      class="report-link"
                    > {{ deviceDeliverDetail.deviceBasic.completeInspectionCode }}</el-link>
                  </div>
                </el-form-item>
                <el-form-item prop="deviceBasic.deliveryProcessCode" label="交付服务流程" style="width: 25%;" label-width="140px">
                  <!-- <jereh-input v-model="deviceDeliverDetail.deviceBasic.deliveryProcessCode" disabled></jereh-input> -->
                  <div style="height: 32px; line-height: 32px; width: 100%">
                    <el-link
                      type="primary"
                      :underline="false"
                      class="report-link"
                    > {{ deviceDeliverDetail.deviceBasic.deliveryProcessCode }}</el-link>
                  </div>
                </el-form-item>
                <el-form-item prop="assistDeliveryBy" label="协助交付人" style="width: 600px;" label-width="140px">
                  <jereh-person-select v-model="deviceDeliverDetail.assistDeliveryBy" @change="handleSaveClick" :disabled="!canEditAssist"></jereh-person-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <!--          服务过程-->
          <div class="border rounded">
            <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
              <div class="font">服务过程</div>
            </div>
            <!-- 步骤条 -->
            <el-steps :active="0" finish-status="success" class="mx-2">
              <el-step v-for="(item,index) in stepList" :key="index"
                       :status="deviceDeliverDetail[item.field].status"
              >
                <div slot="title" @click="changeStep(index)"
                     :style="stepIndex === index ? 'color: #E85414;font-weight: 700' : ''"
                >{{ item.name }}
                </div>
              </el-step>
            </el-steps>
            <!-- 按钮组 -->
            <div class="p-2">
              <jereh-button v-if="stepIndex !== 5 && directorFlag && (stepIndex !== 10 || stepIndex === 10 && canClose)" @click="handleSaveClick">保存</jereh-button>
              <jereh-button v-if="stepIndex === 5 && directorFlag && canEdit">创建问题</jereh-button>
              <!-- <jereh-button v-if="stepIndex === 9 && directorFlag">工时录入</jereh-button>
              <jereh-button v-if="stepIndex === 9">工时查看</jereh-button> -->
              <jereh-button v-if="stepIndex === 9 && directorFlag && canEdit">提交建议</jereh-button>
              <!-- <jereh-button v-if="stepIndex === 9 && directorFlag" @click="createReport()">创建报告</jereh-button> -->
              <jereh-button v-if="stepIndex !== 10 && directorFlag && canEdit" @click="toNextStage">下一步</jereh-button>
              <jereh-button v-if="stepIndex === 10 && directorFlag && canClose" @click="submitSuggest">提交整改</jereh-button>
              <jereh-button v-if="stepIndex === 10 && directorFlag && canClose" @click="finishSubmit">交付完成</jereh-button>
              <jereh-button v-if="directorFlag && stepIndex === 3 && canEdit" @click="createTrainingService" :disabled="!canEdit">创建培训</jereh-button>
            </div>
            <!--            更新计划-->
            <div class="px-2 pb-2" v-if="stepIndex === 0">
              <div class="font-sm text-danger mb-2">
                提示：请根据现场实际交付任务开始前及时结合现场客户实际应用验收计划调整本计划内容！
              </div>
              <el-table :data="deviceDeliverDetail.updatePlan.planList" border :fit="true">
                <af-table-column type="index" fixed align="center" width="50"/>
                <af-table-column prop="workItems" fixed label="工作项目" align="center" show-overflow-tooltip
                                 width="180"
                />
                <af-table-column prop="workContent" show-overflow-tooltip align="center" label="工作内容" width="300"/>
                <af-table-column prop="startTime" align="center" label="开始时间" width="250">
                  <template slot-scope="scope">
                    <jereh-date-picker
                      v-model="scope.row.startTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      valueFormat="yyyy-MM-dd HH:mm:ss"
                      :disabled="!canEdit"
                    ></jereh-date-picker>
                  </template>
                </af-table-column>
                <af-table-column prop="endTime" align="center" label="结束时间" width="250">
                  <template slot-scope="scope">
                    <jereh-date-picker
                      v-model="scope.row.endTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      valueFormat="yyyy-MM-dd HH:mm:ss"
                      :disabled="!canEdit"
                    ></jereh-date-picker>
                  </template>
                </af-table-column>
                <af-table-column prop="plannedTime" show-overflow-tooltip align="center" label="计划用时" width="150"/>
                <af-table-column prop="output" show-overflow-tooltip align="center" label="输出物" width="220"/>
                <af-table-column prop="remark" align="center" label="备注" width="250">
                  <template slot-scope="scope">
                    <jereh-input v-model="scope.row.remark" :disabled="!canEdit"></jereh-input>
                  </template>
                </af-table-column>
              </el-table>
            </div>
            <!--            配件清点-->
            <div class="px-2 pb-2" v-if="stepIndex === 1">
              <el-form-item prop="accessoriesInventory.isPartsInventory" label="是否实施配件清点"
                            style="width: 300px;"
              >
                <el-radio-group v-model="deviceDeliverDetail.accessoriesInventory.isPartsInventory" :disabled="!canEdit">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="deviceDeliverDetail.accessoriesInventory.isPartsInventory === 0">
                <el-form-item prop="accessoriesInventory.implementReason" label="未实施原因"
                              style="width: 600px;"
                >
                  <jereh-input
                    v-model="deviceDeliverDetail.accessoriesInventory.implementReason"
                    type="textarea"
                    :disabled="!canEdit"
                  ></jereh-input>
                </el-form-item>
              </div>
              <div v-if="deviceDeliverDetail.accessoriesInventory.isPartsInventory !== 0">
                <el-form-item prop="accessoriesInventory.partsInventoryFiles" label="配件清点附件"
                              style="width: 900px;"
                >
                  <file-upload v-model="deviceDeliverDetail.accessoriesInventory.partsInventoryFiles" :disabled="!canEdit"/>
                </el-form-item>
                <div class="flex flex-wrap">
                  <el-form-item prop="accessoriesInventory.handoverPlace" label="交接地点"
                                style="width: 25%;"
                  >
                    <jereh-select v-model="deviceDeliverDetail.accessoriesInventory.handoverPlace"
                                  :dict="dict.type.handover_place" :disabled="!canEdit"
                    ></jereh-select>
                  </el-form-item>
                  <el-form-item prop="accessoriesInventory.handoverTime" label="交接日期"
                                style="width: 25%;"
                  >
                    <jereh-date-picker v-model="deviceDeliverDetail.accessoriesInventory.handoverTime" :disabled="!canEdit"
                    ></jereh-date-picker>
                  </el-form-item>
                  <el-form-item prop="accessoriesInventory.handoverPerson" label="交接人"
                                style="width: 25%;"
                  >
                    <jereh-person-select v-model="deviceDeliverDetail.accessoriesInventory.handoverPerson" :disabled="!canEdit"
                    ></jereh-person-select>
                  </el-form-item>
                  <el-form-item prop="accessoriesInventory.customerRecipient" label="客户接收人"
                                style="width: 25%;"
                  >
                    <jereh-input v-model="deviceDeliverDetail.accessoriesInventory.customerRecipient" :disabled="!canEdit"
                    ></jereh-input>
                  </el-form-item>
                </div>
                <div class="flex align-center justify-between">
                  <div>
                    <div class="mr-2 header">产品装箱清单</div>
                    <div class="mx-2">
                      <jereh-button @click="showProductPackingList  = !showProductPackingList">隐藏/显示
                      </jereh-button>
                      <jereh-button @click="getProductPackingList" :disabled="!canEdit">获取装箱清单</jereh-button>
                      <jereh-button @click="packingListExcel" :disabled="!canEdit">导出</jereh-button>
                      <jereh-button v-if="directorFlag" @click="syncNotes" :disabled="!canEdit">同步备忘</jereh-button>
                    </div>
                    <div class="mx-2" v-if="showProductPackingList">
                      <div class="font-sm text-danger">操作说明：</div>
                      <div class="font-sm text-danger">
                        1）清点结果：如现场实物清点数量与备忘数量之和与装箱清单数量一致，并且现场实物无损坏则为“正常”；否则如出现现场实物清点数量不足或现场清点数量正确，但实物存在损坏则均为“异常”；
                      </div>
                      <div class="font-sm text-danger">
                        2）其他差异数量：现场清点过程中出现异常时，则为该物料出现异常的数量，如现场缺失但备忘没有包含的物料数量，或是实物到现场后存在损坏需要补发给客户的数量。
                      </div>
                      <el-table
                        :data="deviceDeliverDetail.accessoriesInventory.productPackingList" border :fit="true"
                        class="mt-2"
                      >
                        <af-table-column type="index" fixed align="center" width="50"/>
                        <af-table-column prop="materialCategory" fixed label="物料类别" align="center" show-overflow-tooltip
                        />
                        <af-table-column prop="materialCode" show-overflow-tooltip align="center" label="物料编码"/>
                        <af-table-column prop="materialName" show-overflow-tooltip align="center" label="物料名称"/>
                        <af-table-column prop="count" show-overflow-tooltip align="center" label="数量"/>
                        <af-table-column prop="inventoryResults" show-overflow-tooltip align="center" label="清点结果">
                          <template slot-scope="scope">
                            <el-radio-group
                              v-model="scope.row.inventoryResults"
                              @change="changeInventoryResults($event,scope.row)"
                              :disabled="!canEdit"
                            >
                              <el-radio :label="1">正常</el-radio>
                              <el-radio :label="0">异常</el-radio>
                            </el-radio-group>
                          </template>
                        </af-table-column>
                        <af-table-column prop="otherVarianceQuantity" show-overflow-tooltip align="center" label="其他差异数量">
                          <template slot-scope="scope">
                            <jereh-input v-model="scope.row.otherVarianceQuantity" type="number" :disabled="!canEdit"></jereh-input>
                          </template>
                        </af-table-column>
                        <af-table-column prop="notesNo" show-overflow-tooltip align="center" label="备忘数量"/>
                        <af-table-column prop="remark" show-overflow-tooltip align="center" label="备注"/>
                      </el-table>
                    </div>
                    <div class="flex flex-wrap mt-4" v-if="showProductPackingList">
                      <el-form-item prop="accessoriesInventory.handoverSign" label="交接人电子签名"
                                    style="width: 600px;"
                      >
                        <div class="flex align-start">
                          <jereh-button @click="sign('handoverSign')" :disabled="!canEdit">签字</jereh-button>
                          <el-image
                            v-if="deviceDeliverDetail.accessoriesInventory.handoverSign"
                            class="ml-2"
                            style="width: 150px; height: 80px"
                            :src="deviceDeliverDetail.accessoriesInventory.handoverSign"
                            fit="contain"
                          ></el-image>
                        </div>
                      </el-form-item>
                      <el-form-item prop="accessoriesInventory.receiverSign" label="接收人电子签名"
                                    style="width: 600px;"
                      >
                        <div class="flex align-start">
                          <jereh-button @click="sign('receiverSign')" :disabled="!canEdit">签字</jereh-button>
                          <el-image
                            v-if="deviceDeliverDetail.accessoriesInventory.receiverSign"
                            class="ml-2"
                            style="width: 150px; height: 80px"
                            :src="deviceDeliverDetail.accessoriesInventory.receiverSign"
                            fit="contain"
                          ></el-image>
                        </div>
                      </el-form-item>
                      <el-form-item prop="accessoriesInventory.handoverSignDate" label="签字日期"
                                    style="width: 600px;"
                      >
                        <jereh-date-picker ph="请签字"
                                          v-model="deviceDeliverDetail.accessoriesInventory.handoverSignDate"
                                          type="datetime" format="yyyy-MM-dd HH:mm:ss" disabled
                        ></jereh-date-picker>
                      </el-form-item>
                      <el-form-item prop="accessoriesInventory.receiverSignDate" label="签字日期"
                                    style="width: 600px;"
                      >
                        <jereh-date-picker ph="请签字"
                                          v-model="deviceDeliverDetail.accessoriesInventory.receiverSignDate"
                                          type="datetime" format="yyyy-MM-dd HH:mm:ss" disabled
                        ></jereh-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <!--            检查调试-->
            <div class="px-2 pb-2" v-if="stepIndex === 2">
              <el-form-item prop="checkDebug.isCheckDebug" label="是否实施检查调试" style="width: 300px;">
                <el-radio-group v-model="deviceDeliverDetail.checkDebug.isCheckDebug" :disabled="!canEdit">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="deviceDeliverDetail.checkDebug.isCheckDebug === 0">
                <el-form-item prop="checkDebug.implementReason" label="未实施原因"
                              style="width: 600px;"
                >
                  <jereh-input v-model="deviceDeliverDetail.checkDebug.implementReason" type="textarea" :disabled="!canEdit"
                  ></jereh-input>
                </el-form-item>
              </div>
              <div v-if="deviceDeliverDetail.checkDebug.isCheckDebug !== 0">
                <div class="flex flex-wrap">
                  <el-form-item prop="checkDebug.checkedBy" label="检查人" style="width: 25%;">
                    <jereh-person-select v-model="deviceDeliverDetail.checkDebug.checkedBy" :multiple="false" :disabled="!canEdit"
                    ></jereh-person-select>
                  </el-form-item>
                  <el-form-item prop="checkDebug.checkedDate" label="检查日期" style="width: 25%;">
                    <jereh-date-picker v-model="deviceDeliverDetail.checkDebug.checkedDate" :disabled="!canEdit"
                    ></jereh-date-picker>
                  </el-form-item>
                  <el-form-item prop="checkDebug.checkTemplate" label="选择检查调试模板"
                                style="width: 25%;"
                  >
                    <jereh-select
                      v-model="deviceDeliverDetail.checkDebug.checkTemplate"
                      :dict="dict.type.check_template" @change="checkTemplateChange"
                      :disabled="!canEdit"
                    ></jereh-select>
                  </el-form-item>
                </div>
                <div>
                  <div class="header">交车检查调试记录</div>
                  <div>
                    <div class="font-sm text-danger pb-1">
                      说明：请对以下所有项进行检查、调节、紧固或加注油品,查阅匹配该项目编码的资料,获取具体维修内容和有关标准,逐项检查,填写数据和处理结果。
                    </div>
                    <el-form-item prop="checkDebug.checkDebugFiles" label="交车检查调试记录附件" label-width="160px"
                                  style="width: 90%;" class="mr-2"
                    >
                      <div class="flex align-start">
                        <jereh-button @click="showCheckDebugList = !showCheckDebugList">隐藏/显示</jereh-button>
                        <jereh-button @click="checkDebugExcel" :disabled="!canEdit">下载模板</jereh-button>
                        <file-upload v-model="deviceDeliverDetail.checkDebug.checkDebugFiles" :disabled="!canEdit" style="line-height: initial; margin-left: 10px"/>
                      </div>
                      </el-form-item>
                    <el-table
                      v-if="showCheckDebugList"
                      :data="deviceDeliverDetail.checkDebug.checkDebugList" border :fit="true"
                    >
                      <af-table-column type="index" fixed align="center" width="50"/>
                      <af-table-column prop="deviceType" fixed label="设备类型" align="center" show-overflow-tooltip
                                      width="150"
                      />
                      <af-table-column prop="checkMajorItem" show-overflow-tooltip align="center" label="检查大项"/>
                      <af-table-column prop="checkStandard" show-overflow-tooltip align="center" label="检查项及标准" width="350"/>
                      <af-table-column prop="checkResult" show-overflow-tooltip align="center" label="记录检查结果">
                        <template slot-scope="scope">
                          <jereh-input v-model="scope.row.checkResult" ph="请带单位填写具体数值。" :disabled="!canEdit"/>
                        </template>
                      </af-table-column>
                      <af-table-column prop="checkResultData" show-overflow-tooltip align="center" label="检查结果"
                                      fixed="right" width="380"
                      >
                        <template slot-scope="scope">
                          <el-radio-group v-model="scope.row.checkResultData" @change="handleResultChange($event, scope.$index)" :disabled="!canEdit">
                            <el-radio label="正常">正常</el-radio>
                            <el-radio label="调节">调节</el-radio>
                            <el-radio label="维修">维修</el-radio>
                            <el-radio label="不适用">不适用</el-radio>
                          </el-radio-group>
                        </template>
                      </af-table-column>
                    </el-table>
                    <div class="flex flex-column align-end mt-4" v-if="showCheckDebugList">
                      <el-form-item prop="checkDebug.checkedBySign" label="检查人" style="width: 600px;">
                        <div class="flex align-start">
                          <jereh-button @click="sign('checkedBySign')" :disabled="!canEdit">签字</jereh-button>
                          <el-image
                            v-if="deviceDeliverDetail.checkDebug.checkedBySign"
                            class="ml-2"
                            style="width: 150px; height: 80px"
                            :src="deviceDeliverDetail.checkDebug.checkedBySign"
                            fit="contain"
                          ></el-image>
                        </div>
                      </el-form-item>
                      <el-form-item prop="checkDebug.checkedBySignDate" label="签字日期"
                                    style="width: 600px;"
                      >
                        <jereh-date-picker ph="请签字"
                                          v-model="deviceDeliverDetail.checkDebug.checkedBySignDate"
                                          type="datetime" format="yyyy-MM-dd HH:mm:ss" disabled
                        ></jereh-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--            客户培训-->
            <div class="px-2 pb-2" v-if="stepIndex === 3">
              <el-form-item prop="customerTrain.isCustomerTrain" label="是否实施客户培训"
                            style="width: 300px;"
              >
                <el-radio-group v-model="deviceDeliverDetail.customerTrain.isCustomerTrain" :disabled="!canEdit">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="deviceDeliverDetail.customerTrain.isCustomerTrain === 0">
                <el-form-item prop="customerTrain.implementReason" label="未实施原因"
                              style="width: 600px;"
                >
                  <jereh-input v-model="deviceDeliverDetail.customerTrain.implementReason" type="textarea" :disabled="!canEdit"
                  ></jereh-input>
                </el-form-item>
              </div>
              <div v-if="deviceDeliverDetail.customerTrain.isCustomerTrain !== 0">
                <el-table
                  :data="deviceDeliverDetail.customerTrain.customerTrainList" border :fit="true"
                  class="mt-2"
                >
                  <af-table-column type="index" fixed align="center" width="50"/>
                  <af-table-column prop="trainingCode" fixed label="培训编码" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span @click="toTrainingServiceDetail(scope.row)">{{ scope.row.trainingCode }}</span>
                    </template>
                  </af-table-column>
                  <af-table-column prop="trainingDirector" show-overflow-tooltip align="center" label="培训负责人"
                                   width="350"
                  />
                  <af-table-column prop="trainingStart.trainingEndTime" show-overflow-tooltip align="center"
                                   label="培训结束日期" width="250"
                  />
                  <af-table-column prop="trainingState" show-overflow-tooltip align="center" fixed="right"
                                   label="培训状态" width="350"
                  />
                </el-table>
              </div>
            </div>
            <!--            场地测试-->
            <div class="px-2 pb-2" v-if="stepIndex === 4">
              <el-form-item prop="placeTest.isPlaceTest" label="是否实施场地测试" style="width: 300px;">
                <el-radio-group v-model="deviceDeliverDetail.placeTest.isPlaceTest" :disabled="!canEdit">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="deviceDeliverDetail.placeTest.isPlaceTest === 0">
                <el-form-item prop="placeTest.implementReason" label="未实施原因"
                              style="width: 600px;"
                >
                  <jereh-input v-model="deviceDeliverDetail.placeTest.implementReason" type="textarea" :disabled="!canEdit"
                  ></jereh-input>
                </el-form-item>
              </div>
              <div v-if="deviceDeliverDetail.placeTest.isPlaceTest !== 0">
                <div class="flex flex-wrap">
                  <el-form-item prop="placeTest.tester" label="测试人" style="width: 300px;">
                    <jereh-person-select v-model="deviceDeliverDetail.placeTest.tester" :multiple="false" :disabled="!canEdit"/>
                  </el-form-item>
                  <el-form-item prop="placeTest.testDate" label="测试日期" style="width: 300px;">
                    <jereh-date-picker v-model="deviceDeliverDetail.placeTest.testDate" :disabled="!canEdit"></jereh-date-picker>
                  </el-form-item>
                </div>
                <el-form-item prop="placeTest.operationRecordFiles" label="产品运行记录"
                              style="width: 600px;"
                >
                  <file-upload v-model="deviceDeliverDetail.placeTest.operationRecordFiles" :disabled="!canEdit"/>
                </el-form-item>
              </div>
            </div>
            <!--            问题处理-->
            <div class="px-2 pb-2" v-if="stepIndex === 5">
              <el-table :data="deviceDeliverDetail.problemHandle.problemHandleList" border :fit="true">
                <af-table-column type="index" fixed align="center" width="50"/>
                <af-table-column prop="workOrderCode" fixed label="工单编码" align="center" show-overflow-tooltip/>
                <af-table-column prop="faultCategory" show-overflow-tooltip align="center" label="故障类别"/>
                <af-table-column prop="problemHandler" show-overflow-tooltip align="center" label="问题处理人"/>
                <af-table-column prop="problemOverview" show-overflow-tooltip align="center" label="问题概述"/>
                <af-table-column prop="causeAnalysis" show-overflow-tooltip align="center" label="原因分析"/>
                <af-table-column prop="treatmentMeasures" show-overflow-tooltip align="center" label="实际处理措施"/>
                <af-table-column prop="createTime" show-overflow-tooltip align="center" label="创建日期"/>
                <af-table-column prop="closeTime" show-overflow-tooltip align="center" label="关闭日期"/>
              </el-table>
            </div>
            <!--            施工测试-->
            <div class="px-2 pb-2" v-if="stepIndex === 6">
              <el-form-item prop="constructionTest.isConstructionTest" label="是否实施施工测试"
                            style="width: 300px;"
              >
                <el-radio-group v-model="deviceDeliverDetail.constructionTest.isConstructionTest" :disabled="!canEdit">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="deviceDeliverDetail.constructionTest.isConstructionTest === 0">
                <el-form-item prop="constructionTest.implementReason" label="未实施原因"
                              style="width: 600px;"
                >
                  <jereh-input
                    v-model="deviceDeliverDetail.constructionTest.implementReason"
                    type="textarea"
                    :disabled="!canEdit"
                  ></jereh-input>
                </el-form-item>
              </div>
              <div v-if="deviceDeliverDetail.constructionTest.isConstructionTest !== 0">
                <div class="font-sm text-danger">
                  施工照片提交说明：每施工井次都要拍摄照片上传，照片使用原图，单张大小不低于4M，单井次施工照片包含如下视角照片：
                </div>
                <div class="font-sm text-danger">1、设备在井场布置单设备近景照片；</div>
                <div class="font-sm text-danger mb-2">2、设备在井场布置宏观照片；</div>
                <el-form-item prop="constructionTest.followUpTimes" label="累计跟踪井次"
                              style="width: 300px;"
                >
                  <jereh-input v-model="deviceDeliverDetail.constructionTest.followUpTimes" type="number" disabled>
                  </jereh-input>
                </el-form-item>
                <jereh-button @click="addConstructionTestList" :disabled="!canEdit">新增</jereh-button>
                <el-table
                  :data="deviceDeliverDetail.constructionTest.constructionTestList" border :fit="true"
                  class="mt-2"
                >
                  <af-table-column type="index" fixed align="center" label="井次序号" width="100"/>
                  <af-table-column prop="tester" fixed label="测试人" align="center">
                    <template slot-scope="scope">
                      <el-form-item
                        label-width="0"
                        :prop="'constructionTest.constructionTestList.' + scope.$index + '.tester'"
                        :rules="rules.required"
                      >
                        <jereh-person-select v-model="scope.row.tester" ph="请输入工号或姓名" :disabled="!canEdit"/>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column prop="constructionDate" show-overflow-tooltip align="center" label="施工日期">
                    <template slot-scope="scope">
                      <el-form-item
                        label-width="0"
                        :prop="'constructionTest.constructionTestList.' + scope.$index + '.constructionDate'"
                        :rules="rules.required"
                      >
                        <jereh-date-picker v-model="scope.row.constructionDate" @change="orderDate" :disabled="!canEdit"></jereh-date-picker>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column prop="constructionWellNumber" show-overflow-tooltip align="center" label="施工井号">
                    <template slot-scope="scope">
                      <el-form-item label-width="0"
                                    :prop="'constructionTest.constructionTestList.' + scope.$index + '.constructionWellNumber'"
                                    :rules="rules.required"
                      >
                        <jereh-input v-model="scope.row.constructionWellNumber" :disabled="!canEdit"></jereh-input>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column prop="constructionOperationType" show-overflow-tooltip align="center" label="施工作业类型">
                    <template slot-scope="scope">
                      <el-form-item label-width="0"
                                    :prop="'constructionTest.constructionTestList.' + scope.$index + '.constructionOperationType'"
                                    :rules="rules.required"
                      >
                        <jereh-input v-model="scope.row.constructionOperationType" :disabled="!canEdit"></jereh-input>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column prop="productOperationRecord" show-overflow-tooltip align="center" label="产品运行记录">
                    <template slot-scope="scope">
                      <el-form-item label-width="0"
                                    :prop="'constructionTest.constructionTestList.' + scope.$index + '.productOperationRecord'"
                                    :rules="rules.required"
                      >
                        <file-upload v-model="scope.row.productOperationRecord" :disabled="!canEdit"/>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column prop="constructionPhotos" show-overflow-tooltip align="center" label="施工照片">
                    <template slot-scope="scope">
                      <el-form-item label-width="0"
                                    :prop="'constructionTest.constructionTestList.' + scope.$index + '.constructionPhotos'"
                                    :rules="rules.required"
                      >
                        <image-upload v-model="scope.row.constructionPhotos" :fileSize="10" :disabled="!canEdit"/>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column fixed="right" prop="address" show-overflow-tooltip align="center" label="操作">
                    <template slot-scope="scope">
                      <jereh-button @click="deleteConstructionTestList(scope.$index)" :disabled="!canEdit">删除</jereh-button>
                    </template>
                  </af-table-column>
                </el-table>
              </div>
            </div>
            <!--            备忘处理-->
            <div class="px-2 pb-2" v-if="stepIndex === 7">
              <div class="flex">
                <div class="font mr-2">备品备件备忘清单</div>
                <el-form-item prop="memoHandle.isMemoHandle" label="是否有备品备件备忘"
                              style="width: 300px;" :rules="rules.required"
                >
                  <el-radio-group v-model="deviceDeliverDetail.memoHandle.isMemoHandle" :disabled="!canEdit">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <el-table v-if="deviceDeliverDetail.memoHandle.isMemoHandle !== 0"
                        :data="deviceDeliverDetail.memoHandle.memoHandleList" border :fit="true"
              >
                <af-table-column type="index" fixed align="center" width="50"></af-table-column>
                <af-table-column prop="materialCategory" fixed label="物料类别" align="center" show-overflow-tooltip/>
                <af-table-column prop="materialCode" show-overflow-tooltip align="center" label="物料编码"/>
                <af-table-column prop="materialName" show-overflow-tooltip align="center" label="物料名称"/>
                <af-table-column prop="otherVarianceQuantity" show-overflow-tooltip align="center"
                                 label="其他差异数量"
                />
                <af-table-column prop="notesNo" show-overflow-tooltip align="center" label="备忘数量"/>
                <af-table-column prop="issuanceDate" show-overflow-tooltip align="center" label="发货日期"/>
                <af-table-column prop="receiptDate" show-overflow-tooltip align="center" label="接收确认日期"/>
                <af-table-column prop="receivedBy" show-overflow-tooltip align="center" label="接收确认人"/>
                <af-table-column prop="currentStatus" show-overflow-tooltip align="center" label="目前状态"/>
              </el-table>
              <div class="flex mt-2">
                <div class="font mr-2">整机配件备忘清单</div>
                <el-form-item prop="memoHandle.isMachineMemo" label="是否有整机配件备忘"
                              style="width: 300px;" :rules="rules.required"
                >
                  <el-radio-group v-model="deviceDeliverDetail.memoHandle.isMachineMemo" :disabled="!canEdit">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-table :data="deviceDeliverDetail.memoHandle.machineMemoList" border :fit="true" v-if="deviceDeliverDetail.memoHandle.isMachineMemo !== 0">
                  <af-table-column type="index" fixed align="center" width="50"/>
                  <af-table-column prop="materialCategory" fixed label="物料类别" align="center" show-overflow-tooltip/>
                  <af-table-column prop="materialCode" show-overflow-tooltip align="center" label="物料编码"/>
                  <af-table-column prop="materialName" show-overflow-tooltip align="center" label="物料名称"/>
                  <af-table-column prop="notesNo" show-overflow-tooltip align="center" label="备忘数量"/>
                  <af-table-column prop="issuanceDate" show-overflow-tooltip align="center" label="发货日期"/>
                  <af-table-column prop="receiptDate" show-overflow-tooltip align="center" label="接收确认日期"/>
                  <af-table-column prop="receivedBy" show-overflow-tooltip align="center" label="接收确认人"/>
                  <af-table-column prop="currentStatus" show-overflow-tooltip align="center" label="目前状态"/>
                </el-table>
                <div class="flex align-start mt-2">
                  <div class="font">整机备忘</div>
                  <!-- <el-form-item prop="memoHandle.machineMemoFiles" label="整机备忘"
                                style="width: 600px;" class="mr-2" :rules="rules.required"
                  >
                    <file-upload v-model="deviceDeliverDetail.memoHandle.machineMemoFiles"/>
                  </el-form-item> -->
                  <!-- <jereh-button v-if="directorFlag" @click="getMachineMemoList">获取备忘</jereh-button> -->
                </div>
                <el-table :data="deviceDeliverDetail.memoHandle.machineMemoHandleList" border :fit="true">
                  <af-table-column type="index" fixed align="center" width="50"/>
                  <af-table-column prop="memoContent" fixed label="备忘内容" align="center" width="120" show-overflow-tooltip/>
                  <af-table-column prop="causeAnalysis" show-overflow-tooltip align="center" label="原因分析"/>
                  <af-table-column prop="treatmentMeasures" show-overflow-tooltip align="center" label="处理措施"/>
                  <af-table-column prop="plannedArrivalTime" show-overflow-tooltip align="center" width="180" label="计划到货时间"/>
                  <af-table-column prop="personLiable" show-overflow-tooltip align="center" width="150" label="责任人"/>
                  <af-table-column prop="processingResults" show-overflow-tooltip align="center" label="处理/验证结果">
                    <template slot-scope="scope">
                      <el-form-item label-width="0"
                                    :prop="'memoHandle.machineMemoHandleList.' + scope.$index + '.processingResults'"
                                    :rules="rules.required"
                      >
                        <jereh-input v-model="scope.row.processingResults"></jereh-input>
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column prop="processingStatus" show-overflow-tooltip align="center" width="160" label="处理状态">
                    <template slot-scope="scope">
                      <el-form-item label-width="0"
                                    :prop="'memoHandle.machineMemoHandleList.' + scope.$index + '.processingStatus'"
                                    :rules="rules.required"
                      >
                        <jereh-select v-model="scope.row.processingStatus"
                                      ph="请选择处理状态" :dict="dict.type.processing_status"
                        />
                      </el-form-item>
                    </template>
                  </af-table-column>
                  <af-table-column prop="closeDate" show-overflow-tooltip align="center" width="150" label="关闭日期">
                    <template slot-scope="scope">
                      <el-form-item label-width="0"
                                    :prop="'memoHandle.machineMemoHandleList.' + scope.$index + '.closeDate'"
                                    :rules="scope.row.processingStatus === '已关闭' ? rules.required : []"
                      >
                        <jereh-date-picker v-model="scope.row.closeDate" :disabled="!canEdit"></jereh-date-picker>
                      </el-form-item>
                    </template>
                  </af-table-column>
                </el-table>
              </div>
            </div>
            <!--            验收评价-->
            <div class="px-2 pb-2" v-if="stepIndex === 8">
              <div class="flex flex-wrap justify-between mb-1">
                <el-form-item
                  prop="acceptanceEvaluation.acceptanceDate"
                  label="验收日期"
                  label-width="120px"
                  style="width: 25%;"
                  :rules="rules.required"
                >
                  <jereh-date-picker
                    v-model="deviceDeliverDetail.acceptanceEvaluation.acceptanceDate"
                    disabled
                  />
                </el-form-item>
                <el-form-item
                  prop="acceptanceEvaluation.expirationDate"
                  label="质保终止日期"
                  label-width="120px"
                  style="width: 25%;"
                  :rules="rules.required"
                >
                  <jereh-date-picker
                    v-model="deviceDeliverDetail.acceptanceEvaluation.expirationDate"
                    disabled
                  />
                </el-form-item>
                <el-form-item
                  prop="acceptanceEvaluation.acceptanceNo"
                  label="验收单号"
                  label-width="120px"
                  style="width: 25%;"
                  :rules="rules.required"
                >
                  <jereh-input
                    v-model="deviceDeliverDetail.acceptanceEvaluation.acceptanceNo"
                    disabled
                  />
                </el-form-item>
                <el-form-item
                  prop="acceptanceEvaluation.serviceNo"
                  label="服务单号"
                  label-width="120px"
                  style="width: 25%;"
                  :rules="rules.required"
                >
                  <jereh-input
                    v-model="deviceDeliverDetail.acceptanceEvaluation.serviceNo"
                    disabled
                  />
                </el-form-item>
              </div>
              <div class="flex flex-wrap justify-between" style="width: 100%">
                <div style="width: 50%">
                  <el-form-item prop="acceptanceEvaluation.productAcceptFiles" label="产品验收单" label-width="120px">
                    <div class="flex align-start">
                      <jereh-button
                        @click="()=>{showBindProject = true;bindType = 'bindProject';getSdServicePoolList()}"
                        :disabled="!canEdit || disabledProductButton()"
                      >
                        绑定
                      </jereh-button>
                      <jereh-button @click="checkForm" :disabled="!canEdit">查看</jereh-button>
                      <file-upload
                        class="ml-1"
                        v-model="deviceDeliverDetail.acceptanceEvaluation.productAcceptFiles"
                        :disabled="!canEdit || disabledProductButton()"
                        style="line-height: initial"
                      />
                    </div>
                    <el-table
                      :data="deviceDeliverDetail.acceptanceEvaluation.bindProjectList"
                      border
                      :fit="true"
                      class="my-2"
                    >
                      <af-table-column type="index" fixed align="center" width="50"/>
                      <af-table-column prop="serviceCode" fixed label="服务编码" align="center" show-overflow-tooltip/>
                      <af-table-column prop="projectItem" show-overflow-tooltip align="center" label="项目编码分项"/>
                      <af-table-column prop="productCode" show-overflow-tooltip align="center" label="产品编号"/>
                      <af-table-column prop="productName" show-overflow-tooltip align="center" label="产品名称"/>
                      <af-table-column prop="productName" show-overflow-tooltip align="center" width="80" label="操作" fixed="right">
                        <template slot-scope="scope">
                          <jereh-button type="text" :plain="false" icon="el-icon-delete" @click="handleDeleteProject(scope.$index)" :disabled="!canEdit">删除
                          </jereh-button>
                        </template>
                      </af-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item prop="acceptanceEvaluation.satisfactionSurveyFiles" label="满意度调研" label-width="120px">
                    <div class="flex align-start">
                      <jereh-button :disabled="!canEdit">创建调研</jereh-button>
                      <file-upload
                        class="ml-1"
                        v-model="deviceDeliverDetail.acceptanceEvaluation.satisfactionSurveyFiles"
                        :disabled="!canEdit"
                        style="line-height: initial"
                      />
                    </div>
                    <el-table
                      :data="deviceDeliverDetail.acceptanceEvaluation.satisfactionSurveyList"
                      border
                      :fit="true"
                      class="mt-2"
                    >
                      <af-table-column type="index" fixed align="center" width="50"/>
                      <af-table-column prop="templateName" fixed label="模板名称" align="center" show-overflow-tooltip/>
                      <af-table-column prop="questionNo" show-overflow-tooltip align="center" label="调研问卷编号"/>
                    </el-table>
                  </el-form-item>
                </div>
                <div style="width: 50%">
                  <el-form-item prop="acceptanceEvaluation.customerServiceOrderFiles" label="客户服务单" label-width="120px">
                    <div class="flex align-start">
                      <jereh-button @click="()=>{
                        showBindProject = true;
                        bindType = 'customerServiceOrder';
                        getSdServicePoolList()
                        }"
                        :disabled="!canEdit || disabledServiceButton()"
                      >绑定
                      </jereh-button>
                      <jereh-button @click="customerForm()" :disabled="!canEdit">查看</jereh-button>
                      <file-upload 
                        class="ml-1"
                        v-model="deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderFiles"
                        :disabled="!canEdit || disabledServiceButton()"
                        style="line-height: initial"
                      />
                    </div>
                    <el-table
                      :data="deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList" border
                      :fit="true" class="mt-2"
                    >
                      <af-table-column type="index" fixed align="center" width="50"/>
                      <af-table-column prop="serviceCode" fixed label="服务编码" align="center" show-overflow-tooltip/>
                      <af-table-column prop="projectItem" show-overflow-tooltip align="center" label="项目编码分项"/>
                      <af-table-column prop="productCode" show-overflow-tooltip align="center" label="产品编号"/>
                      <af-table-column prop="productName" show-overflow-tooltip align="center" label="产品名称"/>
                      <af-table-column prop="productName" show-overflow-tooltip align="center" width="80" label="操作" fixed="right">
                        <template slot-scope="scope">
                          <jereh-button type="text" :plain="false" icon="el-icon-delete" @click="handleDeleteServiceOrder(scope.$index)" :disabled="!canEdit">删除
                          </jereh-button>
                        </template>
                      </af-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item prop="acceptanceEvaluation.engineHandoverFiles" label="发动机交机表" label-width="120px">
                    <file-upload v-model="deviceDeliverDetail.acceptanceEvaluation.engineHandoverFiles" :disabled="!canEdit"/>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!--            交付总结-->
            <div class="px-2 pb-2" v-if="stepIndex === 9">
              <div class="flex flex-wrap content-start">
                <el-form-item
                  prop="deliveryAcceptanceCycle"
                  label="交付验收周期（天）"
                  style="width: 33%;"
                  :rules="rules.required"
                >
                  <jereh-input
                    v-model="deviceDeliverDetail.deliveryAcceptanceCycle"
                    type="number"
                    disabled
                  />
                </el-form-item>
                <el-form-item
                  prop="deliveryTotalCycle"
                  label="交付总周期（天）"
                  style="width: 33%;"
                >
                  <jereh-input
                    v-model="deviceDeliverDetail.deliveryTotalCycle"
                    type="number"
                    disabled
                  />
                </el-form-item>
                <el-form-item
                  prop="projectTotalHour"
                  label="交付总工时（h）"
                  style="width: 33%;"
                >
                  <jereh-input
                    v-model="deviceDeliverDetail.projectTotalHour"
                    type="number"
                    disabled
                  />
                </el-form-item>
              </div>
              <div class="flex flex-wrap">
                <div style="width: 100%">
                  <el-form-item
                    prop="deliverySummary.deliverySummaryReportFiles"
                    label="交付总结报告"
                  >
                    <div class="flex align-start">
                      <jereh-button 
                        @click="()=>{showBindProject = true; bindType = 'deliveryBindProject';getSdServicePoolList()}"
                        :disabled="!canEdit || disabledCloseButton()"
                      >
                        绑定</jereh-button>
                      <jereh-button @click="createReport()" :disabled="!canEdit || disabledCloseButton()">查看</jereh-button>
                      <file-upload
                        v-model="deviceDeliverDetail.deliverySummary.deliverySummaryReportFiles"
                        buttonName="选择上传"
                        :isShowTip="false"
                        @success="handleTwoWayBinding"
                        class="inlineBlock px-1"
                        :disabled="!canEdit || disabledCloseButton()"
                        style="line-height: normal; width: 40%"
                      />
                    </div>
                  </el-form-item>
                  <el-table
                      :data="deviceDeliverDetail.deliverySummary.bindProjectList"
                      border
                      fit
                      class="mt-2"
                    >
                      <af-table-column type="index" fixed align="center" width="50"/>
                      <af-table-column prop="serviceCode" fixed label="服务编码" align="center" show-overflow-tooltip/>
                      <af-table-column prop="projectItem" show-overflow-tooltip align="center" label="项目编码分项"/>
                      <af-table-column prop="productCode" show-overflow-tooltip align="center" label="产品编号"/>
                      <af-table-column prop="productName" show-overflow-tooltip align="center" label="产品名称"/>
                      <af-table-column prop="productName" align="center" label="操作" width="150">
                        <template slot-scope="scope">
                          <jereh-button type="text" :plain="false" icon="el-icon-delete" @click="handleDeleteSummaryBind(scope.$index)" :disabled="!canEdit">
                            删除
                          </jereh-button>
                        </template>
                      </af-table-column>
                    </el-table>
                </div>
              </div>
              <div class="font my-2">改善建议</div>
              <el-table :data="deviceDeliverDetail.deliverySummary.suggestionsList" border fit>
                <af-table-column type="index" fixed align="center" width="50"/>
                <af-table-column prop="suggestionType" label="提交人" align="center" show-overflow-tooltip/>
                <af-table-column prop="suggestionType" label="服务来源" align="center" show-overflow-tooltip/>
                <af-table-column prop="suggestionType" label="总成/系统" align="center" show-overflow-tooltip/>
                <af-table-column prop="existProblem" label="问题/缺陷详情" align="center" show-overflow-tooltip/>
                <af-table-column prop="equipmentSystem" label="改进建议" align="center" show-overflow-tooltip/>
                <af-table-column prop="suggestions" label="改进建议" align="center" show-overflow-tooltip/>
                <af-table-column prop="currentProgress" label="建议状态" align="center" show-overflow-tooltip/>
                <af-table-column prop="currentProgress" label="答复人" align="center" show-overflow-tooltip/>
                <af-table-column prop="closeDate" label="答复日期" align="center" show-overflow-tooltip/>
              </el-table>
            </div>
            <!-- 交付关闭 -->
            <div class="px-2 pb-2" v-if="stepIndex === 10">
              <last-stage ref="lastStage" serviceType="设备交付" :auditRecord="deviceDeliverDetail.deliveryClose.records" :canEdit="canClose"></last-stage>
            </div>
          </div>
          <!--          操作记录-->
          <div class="border rounded">
            <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
              <div class="font">操作记录</div>
            </div>
            <operationRecord
              :service-code="deviceDeliverDetail.serviceCode"
              :service-stage-code="stepIndex"
              :data-id="deviceDeliverDetail.id"
              ref="operationRecord"
            ></operationRecord>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog title="交付总结报告" :visible.sync="deliveryReport">
      <div style="width=100%;height=100%">
    <!-- hahahaha{{id}} -->
    <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="1000px"
      :src="deliveryReportLink"
    >
    </iframe>
  </div>
    </el-dialog>
    <el-dialog title="电子签名" :visible.sync="signatureVisible">
      <vueSignature ref="signature" :w="'100%'" :h="'400px'" :sigOption="signOption"></vueSignature>
      <div slot="footer" class="dialog-footer">
        <jereh-button type="info" @click="clear">清空</jereh-button>
        <jereh-button @click="save">确认</jereh-button>
      </div>
    </el-dialog>
    <!--    绑定项目弹窗-->
    <el-dialog title="绑定项目" :visible.sync="showBindProject" v-if="showBindProject" width="900px" append-to-body
               :close-on-click-modal="false"
    >
      <el-form class="mt-2 flex justify-between" :model="bindProjectQueryParams" ref="bindProjectQueryParams"
               size="mini" :inline="true" label-width="140px"
      >
        <el-form-item prop="serviceCode" style="width: 120px;">
          <jereh-input ph="服务编码" v-model="bindProjectQueryParams.serviceCode" @enter="handleBindProjectQuery"/>
        </el-form-item>
        <el-form-item prop="projectItem" style="width: 120px;">
          <jereh-input ph="项目编码分项" v-model="bindProjectQueryParams.projectItem" @enter="handleBindProjectQuery"/>
        </el-form-item>
        <el-form-item prop="productName" style="width: 120px;">
          <jereh-select v-model="bindProjectQueryParams.productName" ph="产品名称" :dict="dict.type.product_name"/>
        </el-form-item>
        <el-form-item prop="productCode" style="width: 120px;">
          <jereh-input ph="产品编号" v-model="bindProjectQueryParams.productCode" @enter="handleBindProjectQuery"/>
        </el-form-item>
        <el-form-item>
          <jereh-button @click="handleBindProjectQuery">搜索</jereh-button>
        </el-form-item>
      </el-form>
      <el-table :data="sdServicePoolList" border @selection-change="handleSelectionChange">
        <af-table-column type="index" align="center" width="50"/>
        <af-table-column label="服务编码" align="center" prop="serviceCode" show-overflow-tooltip/>
        <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip/>
        <af-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip/>
        <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip/>
        <!-- <af-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.select">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </template>
        </af-table-column> -->
        <af-table-column type="selection" width="55" label="是否选定" align="center"></af-table-column>
      </el-table>
      <Pagination
        v-show="bindProjectQueryParams.total>0"
        :total="bindProjectQueryParams.total"
        :page.sync="bindProjectQueryParams.pageNum"
        :limit.sync="bindProjectQueryParams.pageSize"
        @pagination="getSdServicePoolList"
      />
      <div class="flex justify-end mt-3 mx-1">
        <jereh-button @click="selectBindProject">确定</jereh-button>
      </div>
    </el-dialog>
    <!--    绑定项目弹窗-->
    <el-dialog title="请选择要发送的客户" :visible.sync="isShowCustomer" width="50%" append-to-body
               :close-on-click-modal="false"
    >
      <el-row>
        <el-col :span="5">
          <jereh-input ph="请输入客户联系人" size="mini"/>
        </el-col>
        <el-col :span="5" style="margin-left: 1%;">
          <jereh-input ph="请输入客户联系方式" size="mini"/>
        </el-col>
        <el-col :span="5" style="margin-left: 1%;">
          <jereh-input ph="请输入客户联系人职务" size="mini"/>
        </el-col>
        <el-col :span="3" style="margin-left: 1%;margin-top: 0.5%;">
          <jereh-button>搜索</jereh-button>
        </el-col>
      </el-row>
      <br/>
      <el-table :data="contactList" border>
        <af-table-column label="序号" type="index" align="center" width="50"/>
        <af-table-column label="客户名称" align="center" prop="customerName" show-overflow-tooltip/>
        <af-table-column label="客户下属单位名称" align="center" prop="projectItem" show-overflow-tooltip/>
        <af-table-column label="客户联系人" align="center" prop="customerName" show-overflow-tooltip/>
        <af-table-column label="客户联系方式" align="center" prop="customerPhone" show-overflow-tooltip/>
        <af-table-column label="客户联系人职务" align="center" prop="customerPosition" show-overflow-tooltip/>
        <af-table-column label="是否选定" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.select">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </template>
        </af-table-column>
      </el-table>
      <Pagination
        v-show="contactListParams.total>0"
        :total="contactListParams.total"
        :page.sync="contactListParams.pageNum"
        :limit.sync="contactListParams.pageSize"
        @pagination="showDate"
      />
      <jereh-button @click="console.log('确认')" style="margin-top: 0.5%;margin-left: 90%;">确定</jereh-button>
    </el-dialog>
    <checkForm
      :dialogTableVisible="dialogTableVisible"
      :deviceId="this.deviceDeliverDetail.id"
      :checkFormDetail="checkFormDetail"
      :saveable="disabledProductButton()"
      @closeDilog="closeDilog()"
      @addCheckId="addCheckId"
      @checkData="showDate"
      @addCheckTime="addCheckTime">
    </checkForm>
    <customerForm
      :dialogTableVisible="dialogTableVisible1"
      :deviceId="this.deviceDeliverDetail.id"
      :customerService="customerService"
      :saveable="disabledServiceButton()"
      @closeDilog1="closeDilog1()"
      @addDeliveryId="addDeliveryId"
      @showDate="showDate">
    </customerForm>
    <!-- 工时记录 -->
    <el-dialog title="工时记录" :visible.sync="showRecord" v-if="showRecord" width="70%" append-to-body :close-on-click-modal="false" destroy-on-close>
      <man-hours-record serviceType="设备交付" :serviceCode="deviceDeliverDetail.serviceCode" :projectItem="deviceDeliverDetail.sdServicePool.projectItem"></man-hours-record>
    </el-dialog>
  </div>
</template>

<script>
import vueSignature from 'vue-signature'
// import { listSdServicePool } from '../../../api/cmms/sdServicePool'
import { remoteUser } from '../../../api/cmms/device'
import { listTrainingService } from '../../../api/cmms/sdTrainingService'
import {
  finishSubmit,
  getDetailObject,
  getSdDeviceDeliver,
  nextStep,
  syncMemoInfo,
  updateSdDeviceDeliver,
  selectCustomer,
  finishRectification,
  getBindProject
} from '../../../api/cmms/sdDeviceDeliver'
import operationRecord from './components/operationRecord'
import checkForm from './components/checkForm'
import customerForm from './components/customerForm'
import { listDeliveryInspectionTemplate } from '../../../api/cmms/deliveryInspectionTemplate'
import ManHoursRecord from './components/manHoursRecord.vue'
import LastStage from './components/lastStage.vue'

export default {
  dicts: ['service_type', 'service_level', 'service_status', 'handover_place', 'check_template', 'processing_status',
    'disclosure_tracking_result', 'product_name'],
  components: {
    vueSignature,
    operationRecord,
    checkForm,
    customerForm,
    ManHoursRecord,
    LastStage
  },
  data() {
    return {
      warrantyClause:" 质保期限：质保期为发货之日起18个月，或验收后12个月，以先到时间为准，如果合同有另行规定，以合同规定为准。<br/>"+
        "Warranty Period: The warranty period is 18 months from the date of shipment, or 12 months after acceptance, whichever comes first. If the contract stipulates otherwise, the contract stipulation shall prevail.",
      serviceType:[],
      contactList:[],
      contactListParams:{
        total:0,
        pageSize:10,
        pageNum:1
      },
      reportLink:"",
      deliveryReportLink:"",
      deliveryReport:false,
      isShowCustomer:false,
      dialogTableVisible:false,
      dialogTableVisible1:false,
      projectItemList:[],
      directorFlag: false,
      checkFormDetail: {
        isSave: 1,
        acceptanceEvaluation: {
          bindProjectList: [
            { customerName: null }
          ]
        }
      },
      customerService: {
        isSave: 1,
        acceptanceEvaluation: {
          customerServiceOrderList: [
            { customerName: null }
          ]
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
      bindType: '',
      showBindProject: false,
      showCheckDebugList: false,
      showProductPackingList: false,
      loading: false,
      bindUserOptions: [],
      deviceDeliverDetail: {
        sdServicePool: {},
        updatePlan: {
          planList: [{}],
          status: ''
        },
        accessoriesInventory: {
          productPackingList: [{}],
          status: ''
        },
        checkDebug: {
          checkDebugList: [{}],
          status: ''
        },
        customerTrain: {
          customerTrainList: [{}],
          status: ''
        },
        placeTest: {
          status: ''
        },
        problemHandle: {
          problemHandleList: [{}],
          status: ''
        },
        constructionTest: {
          constructionTestList: [{}],
          status: ''
        },
        memoHandle: {
          memoHandleList: [{}],
          machineMemoList: [{}],
          machineMemoHandleList: [{}],
          status: ''
        },
        acceptanceEvaluation: {
          bindProjectList: [{}],
          customerServiceOrderList: [{}],
          satisfactionSurveyList: [{}],
          status: ''
        },
        deliverySummary: {
          disclosureTrackingList: [{}],
          suggestionsList: [{}],
          bindProjectList: [],
          status: ''
        },
        deviceBasic: {},
        deliveryClose: {
          status: '',
          records: {}
        }
      },
      rules: {
        required: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['accessoriesInventory.isPartsInventory']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['accessoriesInventory.implementReason']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['accessoriesInventory.partsInventoryFiles']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['accessoriesInventory.handoverPlace']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['accessoriesInventory.handoverTime']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['accessoriesInventory.handoverPerson']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['accessoriesInventory.customerRecipient']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['accessoriesInventory.handoverSign']: [
          { required: false, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['accessoriesInventory.receiverSign']: [
          { required: false, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['checkDebug.isCheckDebug']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['checkDebug.implementReason']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['checkDebug.checkedBy']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['checkDebug.checkedDate']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['checkDebug.checkTemplate']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['checkDebug.checkedBySign']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        // ['checkDebug.checkedBySignDate']: [
        //   { required: true, message: '请填写检查人', trigger: ['blur'] }
        // ],
        ['customerTrain.isCustomerTrain']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['customerTrain.implementReason']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['placeTest.isPlaceTest']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['placeTest.implementReason']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['placeTest.tester']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['placeTest.testDate']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['placeTest.operationRecordFiles']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['constructionTest.isConstructionTest']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        ['constructionTest.implementReason']: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ]
      },
      signField: '',
      acceptanceConclusion: '烟台杰瑞公司生产的以上设备,共__台,双方已进行现场交机检查,并经现场作业测试,质量良好,设备符合合同或技术协议的技术要求。<br/>' +
        'There is/are__unit manufactured by Yantai JEREH. Both Parties have made preliminary inspection, function and performance test. Hereby certify quality of the Products are in good condition after the Products have been tested and inspected at customer Base/Jobsite. The Products are consistent with the technical request under the Contract or Technology Agreement.',
      signatureVisible: false,
      signOption: {
        penColor: 'rgb(0, 0, 0)',//画笔颜色
        backgroundColor: 'rgb(245,245,245)'//背景颜色
      },
      stepIndex: 0,
      stepList: [{
        name: '更新计划',
        field: 'updatePlan'
      }, {
        name: '配件清点',
        field: 'accessoriesInventory'
      }, {
        name: '检查调试',
        field: 'checkDebug'
      }, {
        name: '客户培训',
        field: 'customerTrain'
      }, {
        name: '场地测试',
        field: 'placeTest'
      }, {
        name: '问题处理',
        field: 'problemHandle'
      }, {
        name: '施工测试',
        field: 'constructionTest'
      }, {
        name: '备忘处理',
        field: 'memoHandle'
      }, {
        name: '验收评价',
        field: 'acceptanceEvaluation'
      }, {
        name: '交付总结',
        field: 'deliverySummary'
      }, {
        name: '交付关闭',
        field: 'deliveryClose'
      }],
      // 选中数据
      selectOptions: [],
      // 页面加载
      pageLoading: false,
      // 保存标志
      saveFlag: false,
      // 展示工时记录
      showRecord: false,
      getReportType: "",
      // 权限控制
      canEditAssist: false,
      canClose: false,
      canEdit: false,
    }
  },
  created() {
    this.deviceDeliverDetail.id = this.$route.query.id
    this.getSdDeviceDeliver()
  },
  watch: {
    'deviceDeliverDetail.updatePlan.planList': {
      handler(newValue, oldValue) {
        let hour = 1000 * 60 * 60
        for (const item of newValue) {
          let d1 = new Date(item.startTime)
          let d2 = new Date(item.endTime)
          let s1 = this.$moment(d1).format('yyyy-MM-DD HH:mm:ss')
          let s2 = this.$moment(d2).format('yyyy-MM-DD HH:mm:ss')
          let parts1 = s1.split(' ')
          let parts2 = s2.split(' ')
          let diff = d2.getTime() - d1.getTime()
          let days = (diff / (hour * 24)).toFixed(0)
          let d3 = new Date('1970-01-01' + ' ' + parts1[1])
          let d4 = new Date('1970-01-01' + ' ' + parts2[1])
          let hours = 0
          let Sttime = d3.getTime() / hour + 8
          let Edtime = d4.getTime() / hour + 8
          let hour1 = 0
          let hour2 = 0
          if (Edtime - Sttime > 0 || Edtime === Sttime) {
            days -= 1
          }
          if (Sttime > 7 && Sttime < 13) {
            hour1 = (17 - Sttime).toFixed(0)
          } else if (Sttime > 12 && Sttime < 19) {
            hour1 = (18 - Sttime).toFixed(0)
          } else if (Sttime < 7) {
            hour1 = 9
          }
          if (Edtime > 7 && Edtime < 13) {
            hour2 = (Edtime - 8).toFixed(0)
          } else if (Edtime > 12 && Edtime < 19) {
            hour2 = (Edtime - 9).toFixed(0)
          } else if (Edtime > 18) {
            hour2 = 9
          }
          hours = (parseInt(hour1) + parseInt(hour2) + parseInt(days) * 9).toFixed(0)
          item.plannedTime = hours
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addCheckTime(data){
      data.forEach(e=>{
      if(e.productCode==this.deviceDeliverDetail.deviceBasic.productCode){
        this.deviceDeliverDetail.acceptanceEvaluation.acceptanceDate=e.checkTime
        this.deviceDeliverDetail.acceptanceEvaluation.expirationDate=e.warrantyTime
      }
    }
      )
    },
    createReport(){
      let showType = ""
      if (this.deviceDeliverDetail.deliverySummary.bindProjectList.length<2) {
        showType = 7
        this.deviceDeliverDetail.deliverySummary.deliverySummaryReport = "http://10.1.19.30:8080/webroot/decision/view/report?viewlet=CMMS%252FSD%252FDeliverysum.cpt&product_item="+this.deviceDeliverDetail.sdServicePool.projectItem
      } else {
        showType = 8
        this.deviceDeliverDetail.deliverySummary.deliverySummaryReport = "http://10.1.19.30:8080/webroot/decision/view/report?viewlet=CMMS%252FSD%252FDeliverysums.cpt&product_item="+this.deviceDeliverDetail.sdServicePool.projectItem
        this.projectItemList.length=0
        this.deviceDeliverDetail.deliverySummary.bindProjectList.forEach(e=>{
          this.projectItemList.push(e.projectItem)
        })
      }
      this.deviceDeliverDetail.serviceStageCode = this.stepIndex
      this.pageLoading = true
      updateSdDeviceDeliver(this.deviceDeliverDetail).then(response => {
        this.pageLoading = false
        this.$router.push({
          path: "/cmms/device/print",
          query: { id: this.deviceDeliverDetail.sdServicePool.projectItem,type:showType },
        });
      }).catch(e => {
        console.log(e)
        this.pageLoading = false
      })
    },
    showDate(){
      selectCustomer(this.contactListParams).then(res=>{
        this.contactListParams.total=res.data.total
        this.contactList=res.data.records
      })
    this.isShowCustomer=true
    },
    addDeliveryId(data) {
      this.deviceDeliverDetail.acceptanceEvaluation.serviceNo = data
      this.handleSaveClick()
    },
    addCheckId(data) {
      this.deviceDeliverDetail.acceptanceEvaluation.acceptanceNo = data
      this.handleSaveClick()
    },
    toTrainingServiceDetail(row) {
      this.$router.push({
        path: '/cmms/serviceDelivery/trainingServiceDetail',
        query: { id: row.id, isSave: 0, trainingState: row.trainingState }
      })
    },
    orderDate() {
      this.deviceDeliverDetail.constructionTest.constructionTestList.sort((a, b) => {
        return new Date(a.constructionDate) > new Date(b.constructionDate) ? 1 : -1
      })
    },
    // 交付完成
    finishSubmit() {
      const flag = this.$refs["lastStage"].validateForm()
      if (!flag) {
        this.$message.error("请填写必填项！")
        return
      }
      if (this.deviceDeliverDetail.updatePlan.status !== 'success'
        || this.deviceDeliverDetail.accessoriesInventory.status !== 'success'
        || this.deviceDeliverDetail.checkDebug.status !== 'success'
        || this.deviceDeliverDetail.customerTrain.status !== 'success'
        || this.deviceDeliverDetail.placeTest.status !== 'success'
        || this.deviceDeliverDetail.problemHandle.status !== 'success'
        || this.deviceDeliverDetail.constructionTest.status !== 'success'
        || this.deviceDeliverDetail.memoHandle.status !== 'success'
        || this.deviceDeliverDetail.acceptanceEvaluation.status !== 'success'
        || this.deviceDeliverDetail.deliverySummary.status !== 'success'
        ) {
        this.$modal.msgError('请完成所有节点')
        return
      }
      this.deviceDeliverDetail.deliveryClose.status = 'success'
      this.$modal.confirm('是否确认交付完成？').then(() => {
        this.deviceDeliverDetail.finishFlag = 1
        this.deviceDeliverDetail.deliveryClose.status ='success'
        finishSubmit(this.deviceDeliverDetail).then(response => {
          this.$modal.msgSuccess('交付完成')
          this.$refs.operationRecord.refresh()
        })
      })
    },
    // 删除交底追踪列表
    deleteDisclosureTrackingList(index) {
      this.deviceDeliverDetail.deliverySummary.disclosureTrackingList.splice(index, 1)
    },
    // 添加交底追踪列表
    addDisclosureTrackingList() {
      this.deviceDeliverDetail.deliverySummary.disclosureTrackingList.push({})
    },
    // 获取整机备忘
    getMachineMemoList() {
      this.$modal.msgSuccess('获取备忘成功')
    },
    // 同步备忘
    syncNotes() {
      this.deviceDeliverDetail.accessoriesInventory.executeSyncNote = true
      syncMemoInfo(this.deviceDeliverDetail).then(res => {
        this.$modal.msgSuccess('同步成功')
      })
    },
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
        this.deviceDeliverDetail.checkDebug.checkDebugList = res.rows
      })
    },
    // 获取装箱清单
    getProductPackingList() {
      this.$modal.msgSuccess('获取装箱清单成功')
    },
    // 获取培训列表
    getTrainingServiceList() {
      let params = {}
      params.serviceCode = this.deviceDeliverDetail.serviceCode
      params.pageSize = 9999
      params.pageNum = 1
      listTrainingService(params).then(res => {
        console.log(res)
        this.deviceDeliverDetail.customerTrain.customerTrainList = res.data.records
      })
    },
    // 创建培训
    createTrainingService() {
      this.$router.push({
        path: '/cmms/serviceDelivery/trainingServiceDetail',
        query: { poolId: this.deviceDeliverDetail.sdServicePool.id, serviceFrom: 'device' }
      })
    },
    selectBindProject() {

      if (this.bindType === 'bindProject') {
        this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList=this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList.filter(item=>item.projectItem==this.deviceDeliverDetail.sdServicePool.projectItem)
        // this.sdServicePoolList.forEach(i => {
        //   if (i.select === 1) {
        //     this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList.push(i)
        //   }
        // })
        if (this.selectOptions.length) {
          this.selectOptions.forEach(item => {
            this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList.push(item)
          })
        }
        // 去重
        const res = new Map()
        this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList = this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList.filter((item) => !res.has(item['serviceCode']) && res.set(item['serviceCode'], 1))
      }
      if (this.bindType === 'customerServiceOrder') {
        this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList=this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList.filter(item=>item.projectItem==this.deviceDeliverDetail.sdServicePool.projectItem)
        // this.sdServicePoolList.forEach(i => {
        //   if (i.select === 1) {
        //     this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList.push(i)
        //   }
        // })
        if (this.selectOptions.length) {
          this.selectOptions.forEach(item => {
            this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList.push(item)
          })
        }
        // 去重
        const res = new Map()
        this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList = this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList.filter((item) => !res.has(item['serviceCode']) && res.set(item['serviceCode'], 1))
      }

      if (this.bindType === 'deliveryBindProject') {
        // this.sdServicePoolList.forEach(i => {
        //   if (i.select === 1) {
        //     this.deviceDeliverDetail.deliverySummary.bindProjectList.push(i)
        //   }
        // })
        if (this.selectOptions.length) {
          this.selectOptions.forEach(item => {
            this.deviceDeliverDetail.deliverySummary.bindProjectList.push(item)
          })
        }
        // 去重
        const res = new Map()
        this.deviceDeliverDetail.deliverySummary.bindProjectList = this.deviceDeliverDetail.deliverySummary.bindProjectList.filter((item) => !res.has(item['serviceCode']) && res.set(item['serviceCode'], 1))
      }

      this.showBindProject = false
      this.getSdServicePoolList()
      this.handleSaveClick()
    },
    handleBindProjectQuery() {
      this.bindProjectQueryParams.pageNum = 1
      this.getSdServicePoolList()
    },
    getSdServicePoolList() {
      if (this.bindType === 'bindProject') {
        this.bindProjectQueryParams.serviceType = "productAcceptReportFlag"
      }
      if (this.bindType === 'customerServiceOrder') {
        this.bindProjectQueryParams.serviceType = "customerServiceReportFlag"
      }
      if (this.bindType === 'deliveryBindProject') {
        this.bindProjectQueryParams.serviceType = "deliverySummaryFlag"
      }
      getBindProject(this.bindProjectQueryParams).then(response => {
        this.sdServicePoolList = response.rows
        this.bindProjectQueryParams.total = response.total
      })
    },
    addConstructionTestList() {
      this.deviceDeliverDetail.constructionTest.constructionTestList.push({})
      this.deviceDeliverDetail.constructionTest.followUpTimes = this.deviceDeliverDetail.constructionTest.constructionTestList.length
    },
    deleteConstructionTestList(index) {
      this.deviceDeliverDetail.constructionTest.constructionTestList.splice(index, 1)
      this.deviceDeliverDetail.constructionTest.followUpTimes = this.deviceDeliverDetail.constructionTest.constructionTestList.length
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
    getSdDeviceDeliver() {
      getSdDeviceDeliver(this.deviceDeliverDetail.id).then(response => {
        console.log(response)
        if (!response.data.updatePlan) {
          response.data.updatePlan = {}
          response.data.updatePlan.planList = []
          response.data.updatePlan.status = ''
        }
        if (!response.data.accessoriesInventory) {
          response.data.accessoriesInventory = {}
          response.data.accessoriesInventory.productPackingList = []
          response.data.accessoriesInventory.status = ''
        }
        if (!response.data.checkDebug) {
          response.data.checkDebug = {}
          response.data.checkDebug.checkDebugList = []
          response.data.checkDebug.checkTemplateParams = {
            total: 0
          }
          response.data.checkDebug.checkedBy = this.$store.state.user.nickName
          response.data.checkDebug.status = ''
        }
        if (!response.data.customerTrain) {
          response.data.customerTrain = {}
          response.data.customerTrain.customerTrainList = []
          response.data.customerTrain.status = ''
        }
        if (!response.data.placeTest) {
          response.data.placeTest = {}
          response.data.placeTest.status = ''
        }
        if (!response.data.problemHandle) {
          response.data.problemHandle = {}
          response.data.problemHandle.problemHandleList = []
          response.data.problemHandle.status = ''
        }
        if (!response.data.constructionTest) {
          response.data.constructionTest = {}
          response.data.constructionTest.constructionTestList = []
          response.data.constructionTest.status = ''
        }
        if (!response.data.memoHandle) {
          response.data.memoHandle = {}
          response.data.memoHandle.memoHandleList = []
          response.data.memoHandle.machineMemoList = []
          response.data.memoHandle.machineMemoHandleList = []
          response.data.memoHandle.status = ''
        }
        if (!response.data.acceptanceEvaluation) {
          response.data.acceptanceEvaluation = {}
          response.data.acceptanceEvaluation.bindProjectList = []
          response.data.acceptanceEvaluation.customerServiceOrderList = []
          response.data.acceptanceEvaluation.satisfactionSurveyList = []
          response.data.acceptanceEvaluation.status = ''
        }
        if (!response.data.deliverySummary) {
          response.data.deliverySummary = {}
          response.data.deliverySummary.bindProjectList = []
          response.data.deliverySummary.disclosureTrackingList = []
          response.data.deliverySummary.suggestionsList = []
          response.data.deliverySummary.status = ''
        }
        if (!response.data.deliveryClose) {
          response.data.deliveryClose = {}
          response.data.deliveryClose.status = ''
          response.data.deliveryClose.records = {}
        }
        response.data.checkDebug.checkedBy = response.data.checkDebug.checkedBy || this.$store.state.user.nickName
        response.data.constructionTest.followUpTimes = response.data.constructionTest.constructionTestList.length
        this.directorFlag = response.data.directorFlag
        this.deviceDeliverDetail = response.data
        this.getTrainingServiceList()
        this.getDetail()
        this.getCustomerService()
        this.getPermission()
      })
    },
    sign(type) {
      this.signatureVisible = true
      this.signField = type
    },
    save() {
      var png = this.$refs.signature.save()
      if (this.signField === 'handoverSign') {
        this.deviceDeliverDetail.accessoriesInventory.handoverSign = png
        this.deviceDeliverDetail.accessoriesInventory.handoverSignDate = new Date()
      }
      if (this.signField === 'receiverSign') {
        this.deviceDeliverDetail.accessoriesInventory.receiverSign = png
        this.deviceDeliverDetail.accessoriesInventory.receiverSignDate = new Date()
      }
      if (this.signField === 'checkedBySign') {
        this.$set(this.deviceDeliverDetail.checkDebug, 'checkedBySign', png)
        this.deviceDeliverDetail.checkDebug.checkedBySignDate = new Date()
      }
      this.signatureVisible = false
      this.$refs.signature.clear()
    },
    //清空
    clear() {
      this.$refs.signature.clear()
    },
    handleSaveClick() {
      this.deviceDeliverDetail.serviceStageCode = this.stepIndex
      console.log(this.deviceDeliverDetail)
      if (this.stepIndex === 10) {
        this.deviceDeliverDetail.deliveryClose.records = this.$refs["lastStage"].dataForm
      }
      this.pageLoading = true
      updateSdDeviceDeliver(this.deviceDeliverDetail).then(response => {
        this.$modal.msgSuccess('保存成功')
        if (this.deviceDeliverDetail.checkDebug.checkTemplate && this.stepIndex === 2) {
          this.saveFlag = true
        }
        this.pageLoading = false
        this.$refs.operationRecord.refresh()
      }).catch(e => {
        console.log(e)
        this.pageLoading = false
      })
    },
    toNextStage() {
      this.deviceDeliverDetail.serviceStageCode = this.stepIndex
      if (this.stepIndex === 0) {
        // todo 校验
        for (const plan of this.deviceDeliverDetail.updatePlan.planList) {
          if (plan.workItems === '02-检查调试' || plan.workItems === '08-验收评价') {
            if (new Date(plan.startTime) < new Date() || new Date(plan.endTime) < new Date()) {
              this.$modal.msgError('请确保【02-检查调试、08-验收评价】开始日期及结束日期在当前日期及以后')
              return
            }
          }
          const startTime = plan.startTime ? new Date(plan.startTime).getTime() : null
          const endTime = plan.endTime ? new Date(plan.endTime).getTime() : null
          if (startTime && endTime) {
            if (startTime > endTime || startTime === endTime) {
              this.$message.error('请确保【' + plan.workItems + '】数据开始日期小于结束日期！')
              return
            }
          } else {
            this.$modal.msgError('更新计划的开始时间和结束时间均为必填项，请填写完毕后重试')
            return
          }
        }
        this.deviceDeliverDetail.updatePlan.status = 'success'
        this.stepIndex += 1
        nextStep(this.deviceDeliverDetail).then(response => {
          this.$refs.operationRecord.refresh()
        })
        return
      }
      if (this.stepIndex === 1) {
        // todo 校验
        this.$refs.deviceDeliverDetail.validate(async(valid) => {
          if (valid) {
            if (this.deviceDeliverDetail.accessoriesInventory.executeSyncNote !== true && this.deviceDeliverDetail.isPartsInventory === 1) {
              this.$modal.msgError('请先执行同步备忘按钮')
              return
            }
            this.deviceDeliverDetail.accessoriesInventory.status = 'success'
            this.stepIndex += 1
            nextStep(this.deviceDeliverDetail).then(response => {
              this.$refs.operationRecord.refresh()
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
      if (this.stepIndex === 2) {
        // todo 校验
        this.$refs.deviceDeliverDetail.validate(async(valid) => {
          if (valid) {
            if (this.deviceDeliverDetail.checkDebug.isCheckDebug === 1) {
              if (!this.deviceDeliverDetail.checkDebug.checkDebugFiles || !this.deviceDeliverDetail.checkDebug.checkDebugList.length) {
                this.$modal.msgError('请上传或填写交车检查记录!')
                return
              }
            }
            // 校验检查结果
            if (this.deviceDeliverDetail.checkDebugFiles) {
              for (let i=0; i<this.deviceDeliverDetail.checkDebug.checkDebugList.length; i++) {
                if (!this.deviceDeliverDetail.checkDebug.checkDebugList[i].checkResultData) {
                  this.$modal.msgError('请填写检查结果!')
                  return
                }
              }
            }
            this.deviceDeliverDetail.checkDebug.status = 'success'
            this.stepIndex += 1
            nextStep(this.deviceDeliverDetail).then(response => {
              this.$refs.operationRecord.refresh()
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
      if (this.stepIndex === 3) {
        // todo 校验
        this.$refs.deviceDeliverDetail.validate(async(valid) => {
          if (valid) {
            if (this.deviceDeliverDetail.customerTrain.isCustomerTrain === 1) {
              if (this.deviceDeliverDetail.customerTrain.customerTrainList.length === 0) {
                this.$modal.msgError('请创建培训')
                return
              } else {
                const index = this.deviceDeliverDetail.customerTrain.customerTrainList.findIndex(item => item.trainingState !== '已取消' && item.trainingState !== '已完成')
                if (index !== -1) {
                  this.$modal.msgError('培训列表中培训状态必须是【已完成】或者【已取消】才能进行下一步操作！')
                  return
                }
              }
            }
            this.deviceDeliverDetail.customerTrain.status = 'success'
            this.stepIndex += 1
            nextStep(this.deviceDeliverDetail).then(response => {
              this.$refs.operationRecord.refresh()
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
      if (this.stepIndex === 4) {
        // todo 校验
        this.$refs.deviceDeliverDetail.validate(async(valid) => {
          if (valid) {
            this.deviceDeliverDetail.placeTest.status = 'success'
            this.stepIndex += 1
            nextStep(this.deviceDeliverDetail).then(response => {
              this.$refs.operationRecord.refresh()
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
      if (this.stepIndex === 5) {
        this.deviceDeliverDetail.problemHandle.status = 'success'
        this.stepIndex += 1
        nextStep(this.deviceDeliverDetail).then(response => {
          this.$refs.operationRecord.refresh()
        })
        return
      }
      if (this.stepIndex === 6) {
        // todo 校验
        this.$refs.deviceDeliverDetail.validate(async(valid) => {
          if (valid) {
            if (
              this.deviceDeliverDetail.constructionTest.isConstructionTest === 1
              && !this.deviceDeliverDetail.constructionTest.followUpTimes
            ) {
              this.$modal.msgError('是否实施施工测试为是时，跟踪井次不能为空！')
              return
            }
            this.deviceDeliverDetail.constructionTest.status = 'success'
            this.stepIndex += 1
            nextStep(this.deviceDeliverDetail).then(response => {
              this.$refs.operationRecord.refresh()
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
      if (this.stepIndex === 7) {
        // todo 校验
        this.$refs.deviceDeliverDetail.validate(async(valid) => {
          if (valid) {
            for (const item of this.deviceDeliverDetail.memoHandle.machineMemoHandleList) {
              if (item.processingStatus !== '已关闭'){
                this.$modal.msgError('整机备忘处理列表的处理状态必须为已关闭')
                return;
              }
            }
            this.deviceDeliverDetail.memoHandle.status = 'success'
            this.stepIndex += 1
            nextStep(this.deviceDeliverDetail).then(response => {
              this.$refs.operationRecord.refresh()
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
      if (this.stepIndex === 8) {
        // todo 校验
        this.$refs.deviceDeliverDetail.validate(async(valid) => {
          if (valid) {
            if ((!this.deviceDeliverDetail.acceptanceEvaluation.satisfactionSurveyList ||
              !this.deviceDeliverDetail.acceptanceEvaluation.satisfactionSurveyList.length)
                && (!this.deviceDeliverDetail.acceptanceEvaluation.satisfactionSurveyFiles ||
                  !this.deviceDeliverDetail.acceptanceEvaluation.satisfactionSurveyFiles.length)) {
                  this.$modal.msgError('满意度调研不能为空，请创建调研或上传文件后重试！')
                  return
                }
            this.deviceDeliverDetail.acceptanceEvaluation.status = 'success'
            this.stepIndex += 1
            nextStep(this.deviceDeliverDetail).then(response => {
              this.$refs.operationRecord.refresh()
            })
          } else {
            this.$modal.msgError('请填写必填项')
          }
        })
        return
      }
      if (this.stepIndex === 9) {
        // todo 校验
        this.$refs.deviceDeliverDetail.validate(async(valid) => {
          if (valid) {
            if (this.deviceDeliverDetail.deliverySummary.isDisclosureTracking === 1 && this.deviceDeliverDetail.deliverySummary.disclosureTrackingList.length === 0) {
              this.$modal.msgError('交底追踪列表至少要有一条数据')
              return
            }
            this.deviceDeliverDetail.deliverySummary.status = 'success'
            this.stepIndex += 1
            nextStep(this.deviceDeliverDetail).then(response => {
              this.$refs.operationRecord.refresh()
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
    //产品装箱清单数据导出
    packingListExcel() {
      this.download('/cmms/sdDeviceDeliver/packingListExcel',
        { id: this.deviceDeliverDetail.id },
        `产品装箱清单数据_${new Date().getTime()}.xlsx`)
    },
    //检查调试数据导出
    checkDebugExcel() {
      console.log(this.deviceDeliverDetail.checkDebug.checkTemplate)
      if (this.saveFlag) {
        this.download('/cmms/sdDeviceDeliver/checkDebugExcel',
          { id: this.deviceDeliverDetail.id }
          , `检查调试数据_${new Date().getTime()}.xlsx`)
      } else {
        this.$modal.msgError('请先完成【选择检查调试模板】并点击【保存】')
      }
    },
    checkForm() {
      if (this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList.length == 0) {
        this.$modal.msgError('请绑定项目')
        return
      }
      this.getDetail()
      this.dialogTableVisible = true
    },
    closeDilog(emit) {
      this.dialogTableVisible = emit
    },
    closeDilog1(emit) {
      this.dialogTableVisible1 = emit
    },
    getDetail() {
      const query = {
        deviceId: this.deviceDeliverDetail.id,
        statementType: 1
      }
      getDetailObject(query).then(res => {
        if (res.data.acceptanceEvaluation == null) {
          this.checkFormDetail = res.data.checkFormDetail
          this.$set(this.checkFormDetail, 'isSave', 0)
        } else {
          this.checkFormDetail = res.data
          this.$set(this.checkFormDetail, 'isSave', 1)
          this.$set(this.checkFormDetail, 'warrantyClause', this.warrantyClause)
          this.$set(this.checkFormDetail, 'sig1', null)
          this.$set(this.checkFormDetail, 'sig2', null)
          if (this.checkFormDetail.productAcceptance == null) {
            this.$set(this.checkFormDetail, 'acceptanceConclusion', this.acceptanceConclusion)
            this.$set(this.checkFormDetail, 'supplier', '请选择供方')
          }
          if (this.checkFormDetail.remark == null) {
            this.checkFormDetail.remark = 'N/A'
          }
        }
      })

    },
    customerForm() {
      if (this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList.length == 0) {
        this.$modal.msgError('请绑定客户服务单')
        return
      }
      this.getCustomerService()
      this.dialogTableVisible1 = true
    },
    getCustomerService() {
      const query = {
        deviceId: this.deviceDeliverDetail.id,
        statementType: 2
      }
      getDetailObject(query).then(res => {
        if (res.data.acceptanceEvaluation == null) {
          this.customerService = res.data.customerService
          this.$set(this.customerService, 'isSave', 0)
        } else {
          this.customerService = res.data
          this.$set(this.customerService, 'isSave', 1)
          this.$set(this.customerService, 'sig3', null)
          this.$set(this.customerService, 'sig4', null)
          this.$set(this.customerService, 'serviceType', this.serviceType)
          this.$set(this.customerService, 'serviceDescription', '以上列表服务设备现场交车及跟踪保障服务。')
          this.$set(this.customerService, 'remark1', 'N/A')
          this.$set(this.customerService, 'serviceResult', '针对以上列表服务设备现场完成了随车配件清点、现场设备调试、客户培训、场地测试、以及跟踪施工作业测试，设备功性能满足技术协议要求，完成交付。')
          this.$set(this.customerService, 'serviceStartTime', new Date())
          this.$set(this.customerService, 'serviceEndTime', new Date())
        }
      })
    },
    // 删除客户服务单清理服务单号
    clearServiceNo() {
      this.deviceDeliverDetail.acceptanceEvaluation.serviceNo = ''
    },
    // 删除产品验收单清理验收信息
    clearAcceptanceInfo() {
      this.deviceDeliverDetail.acceptanceEvaluation.acceptanceDate = null
      this.deviceDeliverDetail.acceptanceEvaluation.expirationDate = null
      this.deviceDeliverDetail.acceptanceEvaluation.acceptanceNo = ''
    },
    // 检查结果变更
    handleResultChange(val, index) {
      if (val === "不适用") {
        if (this.deviceDeliverDetail.checkDebug.checkDebugList[index].checkResult === "") {
          this.$set(this.deviceDeliverDetail.checkDebug.checkDebugList[index], "checkResult", "NA")
        }
      } else {
        if (this.deviceDeliverDetail.checkDebug.checkDebugList[index].checkResult === "NA") {
          this.$set(this.deviceDeliverDetail.checkDebug.checkDebugList[index], "checkResult", "")
        }
      }
    },
    // 数据选中
    handleSelectionChange(val) {
      this.selectOptions = val
    },
    // 数据删除
    handleDeleteServiceOrder(index) {
      if (index === 0 && this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList[0].serviceCode === this.deviceDeliverDetail.sdServicePool.serviceCode) {
        this.$message.error("绑定项目无法删除自身绑定信息！")
        return
      }
      if (this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList[0].serviceCode !== this.deviceDeliverDetail.sdServicePool.serviceCode) {
        this.$message.error("被绑定项目无法删除绑定信息！")
        return
      }
      this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList.splice(index, 1)
    },
    handleDeleteProject(index) {
      if (index === 0 && this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList[0].serviceCode === this.deviceDeliverDetail.sdServicePool.serviceCode) {
        this.$message.error("绑定项目无法删除自身绑定信息！")
        return
      }
      if (this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList[0].serviceCode !== this.deviceDeliverDetail.sdServicePool.serviceCode) {
        this.$message.error("被绑定项目无法删除绑定信息！")
        return
      }
      this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList.splice(index, 1)
    },
    // 展示工时记录
    showManHoursRecord() {
      this.showRecord = true;
    },
    handleShowBindProject(type) {
      this.bindType = 'deliveryBindProject';
      this.getReportType = type;
      this.showBindProject = true;
    },
    // 双向绑定问题
    handleTwoWayBinding() {
      if (this.selectOptions.length) {
        this.selectOptions.forEach(item => {
          this.deviceDeliverDetail.deliverySummary.bindProjectList.push(item)
        })
      }
      // 去重
      const res = new Map()
      this.deviceDeliverDetail.deliverySummary.bindProjectList = this.deviceDeliverDetail.deliverySummary.bindProjectList.filter((item) => !res.has(item['serviceCode']) && res.set(item['serviceCode'], 1))
      console.log(this.deviceDeliverDetail.deliverySummary.bindProjectList)
      console.log(this.deviceDeliverDetail.deliverySummary.deliverySummaryReportFiles)
      console.log("双向绑定附件")
    },
    handleCreateReport() {
      if (this.selectOptions.length) {
        this.selectOptions.forEach(item => {
          this.deviceDeliverDetail.deliverySummary.bindProjectList.push(item)
        })
      }
      // 去重
      const res = new Map()
      this.deviceDeliverDetail.deliverySummary.bindProjectList = this.deviceDeliverDetail.deliverySummary.bindProjectList.filter((item) => !res.has(item['serviceCode']) && res.set(item['serviceCode'], 1))
      console.log(this.deviceDeliverDetail.deliverySummary.bindProjectList)
      console.log(this.deviceDeliverDetail.deliverySummary.deliverySummaryReportFiles)
      this.createReport()
    },
    // 提交整改
    submitSuggest() {
      this.deviceDeliverDetail.serviceStageCode = this.stepIndex
      const flag = this.$refs["lastStage"].validateFormField()
      console.log(flag)
      if (!flag) {
        this.$message.error("请填写必填项！")
        return
      }
      this.deviceDeliverDetail.deliveryClose.records = this.$refs["lastStage"].dataForm
      this.pageLoading = true
      updateSdDeviceDeliver(this.deviceDeliverDetail).then(response => {
        finishRectification(this.deviceDeliverDetail).then(res => {
          this.pageLoading = false;
          this.$modal.msgSuccess("提交整改成功")
          this.$refs.operationRecord.refresh()
        }).catch(e => {
          console.log(e)
          this.pageLoading = false
        })
      }).catch(e => {
        console.log(e)
        this.pageLoading = false
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
      if (this.deviceDeliverDetail.deviceBasic.afterSaleArea) {
        const areaManagerRole = "cmms:area:" + this.deviceDeliverDetail.deviceBasic.afterSaleArea
        canEditRoles.push(areaManagerRole)
      }
      this.canEditAssist = this.checkRole(canEditRoles)
      this.canClose = this.checkRole(canEditRoles)
      this.canEdit = this.checkRole(canEditRoles)
      const username = this.$store.state.user.nickName
      if (this.deviceDeliverDetail.deviceBasic.deliveryDirector === username && this.checkRole(["cmms:area"])) {
        this.canEditAssist = true
        this.canEdit = true
      }
      if (this.deviceDeliverDetail.deviceBasic.deliveryDirector === username && this.checkRole(["cmms:engineer"])) {
        this.canEditAssist = true
        this.canEdit = true
      }
      if (this.deviceDeliverDetail.assistDeliveryBy && this.deviceDeliverDetail.assistDeliveryBy.includes(username) && this.checkRole(["cmms:area"])) {
        this.canEdit = true
      }
      if (this.deviceDeliverDetail.assistDeliveryBy && this.deviceDeliverDetail.assistDeliveryBy.includes(username) && this.checkRole(["cmms:engineer"])) {
        this.canEdit = true
      }
    },
    disabledCloseButton() {
      let flag = false;
      if (this.deviceDeliverDetail.deliverySummary.bindProjectList.length) {
        if (this.deviceDeliverDetail.deliverySummary.bindProjectList[0].serviceCode !== this.deviceDeliverDetail.sdServicePool.serviceCode) {
          flag = true;
        }
      }
      return flag;
    },
    handleDeleteSummaryBind(index) {
      if (index === 0 && this.deviceDeliverDetail.deliverySummary.bindProjectList[0].serviceCode === this.deviceDeliverDetail.sdServicePool.serviceCode) {
        this.$message.error("绑定项目无法删除自身绑定信息！")
        return
      }
      if (this.deviceDeliverDetail.deliverySummary.bindProjectList[0].serviceCode !== this.deviceDeliverDetail.sdServicePool.serviceCode) {
        this.$message.error("被绑定项目无法删除绑定信息！")
        return
      }
      this.deviceDeliverDetail.deliverySummary.bindProjectList.splice(index, 1);
    },
    disabledProductButton() {
      let flag = false;
      if (this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList.length) {
        if (this.deviceDeliverDetail.acceptanceEvaluation.bindProjectList[0].serviceCode !== this.deviceDeliverDetail.sdServicePool.serviceCode) {
          flag = true;
        }
      }
      return flag;
    },
    disabledServiceButton() {
      let flag = false;
      if (this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList.length) {
        if (this.deviceDeliverDetail.acceptanceEvaluation.customerServiceOrderList[0].serviceCode !== this.deviceDeliverDetail.sdServicePool.serviceCode) {
          flag = true;
        }
      }
      return flag;
    }
  }
}
</script>

<style scoped>
.header {
  font-size: 16px;
  font-weight: 700;
  background-color: #fdeee8;
  display: block;
  border-left: 3px solid #EA5514;
  width: fit-content;
  margin-bottom: 20px;
  text-align: center;
  padding: 0 10px;
}
.report-link {
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding: 0px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>
