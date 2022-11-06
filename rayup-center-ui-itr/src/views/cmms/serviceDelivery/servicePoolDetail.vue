<template>
  <div class="app-container" >
    <!--    按钮组-->
    <el-row :gutter="10" class="mb-2">
      <el-col :span="1.5">
        <jereh-button @click="handleSaveClick" v-if="((servicePoolDetail.serviceState !== '已取消' && servicePoolDetail.directorFlag) || type === 'add') && canEditContent">保存</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button @click="exportPDF()" v-if="(servicePoolDetail.directorFlag || type === 'add') && canEditContent">导出</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button>视频指导</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button @click="startRecheck" v-if="canRecheck">发起复盘</jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button @click="handleSubmit" v-if="((servicePoolDetail.serviceState !== '已取消' && servicePoolDetail.directorFlag) || type === 'add') && canEditContent">提交</jereh-button>
      </el-col>
    </el-row>
    <!--    表单-->
    <el-form :model="servicePoolDetail" :rules="rules" ref="servicePoolDetail" label-width="120px"
             :disabled="servicePoolDetail.serviceState === '已取消' || !directorFlag" id="exportHtml"
    >
      <!--          基础信息-->
      <div class="border rounded">
        <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
          <div class="font">基础信息</div>
          <jereh-button v-if="servicePoolDetail.serviceType !== '设备交付'" @click="openDeviceBinding = true">
            项目信息绑定
          </jereh-button>
        </div>
        <div class="flex flex-wrap">
          <el-form-item prop="serviceType" :rules="rules.required" label="服务类型" style="width: 33%;">
            <jereh-select v-model="servicePoolDetail.serviceType" ph="请选择服务类型" :dict="dict.type.service_type"
                          :disabled="servicePoolDetail.serviceType === '设备交付'|| type === 'update' || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="customerName" :rules="rules.required" label="客户名称" style="width: 33%;">
            <el-select
              v-model="servicePoolDetail.customerName"
              placeholder="请选择客户"
              :disabled="servicePoolDetail.serviceType === '设备交付' || !canEditBasic"
              filterable
              remote
              :remote-method="remoteMethod"
              allow-create
              :loading="queryLoading"
              clearable
            >
              <el-option v-for="item in customerList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="contactPerson" :rules="rules.required" label="客户联系人" style="width: 33%;">
            <jereh-input v-model="servicePoolDetail.contactPerson" ph="请输入"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="serviceSource" :rules="rules.required" label="服务来源" style="width: 33%;">
            <jereh-select v-model="servicePoolDetail.serviceSource" ph="请选择" :dict="dict.type.service_source"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="serviceDirector" :rules="rules.required" label="服务负责人" style="width: 33%;">
            <jereh-person-select v-model="servicePoolDetail.serviceDirector" :disabled="!canEditBasic" ph="请输入" :multiple="false"/>
          </el-form-item>
          <el-form-item prop="contactPhone" :rules="rules.required" label="客户联系方式" style="width: 33%;">
            <jereh-input v-model="servicePoolDetail.contactPhone" ph="请输入"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="projectItem" label="项目编码分项" style="width: 33%;">
            <jereh-input v-model="servicePoolDetail.projectItem" ph="请输入"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || isBinding || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="productCode" label="产品编号" style="width: 33%;">
            <jereh-input v-model="servicePoolDetail.productCode"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || isBinding || !canEditBasic"
            ></jereh-input>
          </el-form-item>
          <el-form-item prop="afterSaleArea" :rules="rules.required" label="售后区域" style="width: 33%;">
            <jereh-select v-model="servicePoolDetail.afterSaleArea" ph="请选择" :dict="dict.type. after_sale_area"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="serviceLocation" :rules="rules.required" label="服务地点" style="width: 33%;">
            <jereh-input v-model="servicePoolDetail.serviceLocation" ph="请输入"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="maketDirector" :rules="rules.required" label="市场负责人" style="width: 33%;">
            <jereh-person-select v-model="servicePoolDetail.maketDirector" :multiple="false"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="deviceArea" :rules="rules.required" label="市场区域" style="width: 33%;">
            <jereh-select v-model="servicePoolDetail.deviceArea" :dict="dict.type.device_area"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="estimateBeginDate" label="预估开始日期" style="width: 33%;">
            <jereh-date-picker v-model="servicePoolDetail.estimateBeginDate" value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item prop="productName" :rules="rules.required" label="产品名称" style="width: 33%;">
            <jereh-input v-model="servicePoolDetail.productName"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || isBinding || !canEditBasic"
            />
          </el-form-item>
          <el-form-item prop="serviceLevel" :rules="rules.required" label="服务级别" style="width: 33%;">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content" v-if="servicePoolDetail.serviceType === '培训服务'">
                　<span>选择培训级别参考规则</span><br/>
                　<span>一级：培训天数＞7天</span><br/>
                <span>二级：3天＜培训天数≤7天</span><br/>
                <span>三级：培训天数≤3天</span>
              </div>
              <div slot="content" v-if="servicePoolDetail.serviceType === '框架协议'">
                　<span>选择服务级别参考规则</span><br/>
                　<span>一级：框架协议合同额＞300万</span><br/>
                <span>二级：100万＜框架协议合同额≤300万</span><br/>
                <span>三级：框架协议合同额≤100万</span>
              </div>
              <div slot="content" v-if="servicePoolDetail.serviceType !== '框架协议' && servicePoolDetail.serviceType !== '培训服务'">
                　<span>请选择服务级别</span><br/>
              </div>
              <jereh-select v-model="servicePoolDetail.serviceLevel" :dict="dict.type.service_level"
                          :disabled="servicePoolDetail.serviceType === '设备交付' || !canEditBasic"
              />
            </el-tooltip>
          </el-form-item>
          <el-form-item prop="estimateEndDate" label="预估结束日期" style="width: 33%;">
            <jereh-date-picker v-model="servicePoolDetail.estimateEndDate" value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item prop="serviceProcessCode" :rules="rules.required" label="服务流程号" style="width: 33%;">
            <jereh-input
              v-model="servicePoolDetail.serviceProcessCode"
              v-if="servicePoolDetail.serviceType !== '设备交付'"
              :disabled="!canEditBasic"
            />
            <div style="height: 36px; line-height: 36px; width: 100%" v-else>
              <el-link
                type="primary"
                :underline="false"
                class="report-link"
              > {{ servicePoolDetail.serviceProcessCode }}</el-link>
            </div>
          </el-form-item>
          <el-form-item prop="serviceCode" :rules="rules.required" label="服务编码" style="width: 33%;">
            <jereh-input v-model="servicePoolDetail.serviceCode" ph="保存自动生成" disabled/>
          </el-form-item>
          <el-form-item prop="serviceCode" label="ITR请求编码" style="width: 33%;">
            <jereh-input ph="" disabled/>
          </el-form-item>
        </div>
      </div>
      <!--          服务内容-->
      <div class="border rounded">
        <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
          <div class="font">服务内容</div>
        </div>
        <el-tabs type="card" class="mx-2">
          <el-tab-pane label="设备交付" v-if="servicePoolDetail.serviceType === '设备交付'">
            <div class="flex">
              <el-form-item prop="siteDeliveryFlag" :rules="rules.required" label="是否现场交付" style="width: 25%;">
                <el-radio-group v-model="servicePoolDetail.siteDeliveryFlag" :disabled="!canEditContent">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="trainFlag" :rules="rules.required" label="是否需要培训" style="width: 25%;">
                <el-radio-group v-model="servicePoolDetail.trainFlag" :disabled="!canEditContent">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="trainFlag" label="技术协议" style="width: 50%;">
                <jereh-input type="textarea" :disabled="!canEditContent"/>
              </el-form-item>
            </div>
            <el-form-item prop="customerMark" :rules="rules.required" label="客户背景备注" style="width: 99%;">
              <jereh-input type="textarea" v-model="servicePoolDetail.customerMark" :disabled="!canEditContent" :rows="1"/>
            </el-form-item>
            <el-form-item prop="contractTrainContent" :rules="rules.required" label="合同培训内容" style="width: 99%;">
              <jereh-input type="textarea" v-model="servicePoolDetail.contractTrainContent" :disabled="!canEditContent" :rows="1"/>
            </el-form-item>
            <div class="flex">
              <el-form-item prop="contractTrainTimes" :rules="rules.required" label="合同培训天数" style="width: 33%;">
                <jereh-input type="number" v-model="servicePoolDetail.contractTrainTimes" :disabled="!canEditContent"/>
              </el-form-item>
              <el-form-item prop="followUpFlag" :rules="rules.required" label="是否跟踪上井" style="width: 33%;">
                <el-radio-group v-model="servicePoolDetail.followUpFlag" :disabled="!canEditContent">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="servicePoolDetail.followUpFlag !== 0" prop="followUpTimes" :rules="rules.required"
                            label="跟踪上井次数" style="width: 33%;"
              >
                <jereh-input type="number" v-model="servicePoolDetail.followUpTimes" :disabled="!canEditContent"/>
              </el-form-item>
            </div>
            <el-form-item prop="constructWorkRequire" :rules="rules.required" label="施工作业要求"
                          style="width: 99%;"
            >
              <jereh-input type="textarea" v-model="servicePoolDetail.constructWorkRequire" :disabled="!canEditContent" :rows="1"/>
            </el-form-item>
            <el-form-item prop="otherAcceptRequire" :rules="rules.required" label="其他验收要求"
                          style="width: 99%;"
            >
              <jereh-input type="textarea" v-model="servicePoolDetail.otherAcceptRequire" :disabled="!canEditContent" :rows="1"/>
            </el-form-item>
            <el-form-item prop="warrantyTerm" :rules="rules.required" label="质保条款" style="width: 99%;">
              <jereh-input type="textarea" v-model="servicePoolDetail.warrantyTerm" :disabled="!canEditContent" :rows="1"/>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="培训服务" v-if="servicePoolDetail.serviceType === '培训服务'">
            <div class="flex flex-wrap">
              <el-form-item prop="trainees" :rules="rules.required" label="培训人数规模" style="width: 33%;">
                <jereh-input v-model="servicePoolDetail.trainees" type="number" :min="0" :disabled="!canEditBasic"/>
              </el-form-item>
              <el-form-item prop="requireTrainCert" :rules="rules.required" label="培训证书要求" style="width: 33%;">
                <el-radio-group v-model="servicePoolDetail.requireTrainCert" :disabled="!canEditBasic">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="trainingMode" :rules="rules.required" label="培训方式" style="width: 33%;">
                <jereh-select v-model="servicePoolDetail.trainingMode" :dict="dict.type.training_mode" :disabled="!canEditBasic"/>
              </el-form-item>
            </div>
            <el-form-item prop="equipmentScope" :rules="rules.required" label="设备范围" style="width: 99%;">
              <el-checkbox-group v-model="servicePoolDetail.equipmentScope" :disabled="!canEditBasic">
                <el-checkbox :label="item.value" v-for="(item,index) in dict.type.equipment_scope" :key="index"
                ></el-checkbox>
                <jereh-input
                  v-if="servicePoolDetail.equipmentScope.includes('其他')"
                  v-model="servicePoolDetail.equipmentScopeOther" ph="请输入具体内容"
                  :disabled="!canEditBasic"
                ></jereh-input>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="customerMark" :rules="rules.required" label="客户背景" style="width: 99%;">
              <el-radio-group v-model="servicePoolDetail.customerMark" :disabled="!canEditBasic">
                <el-radio style="min-height: 30px;" :label="item.label"
                          v-for="(item,index) in dict.type.sys_customer_bg" :key="index"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="trainingCourse" :rules="rules.required" label="培训课程内容" style="width: 99%;">
              <el-checkbox-group v-model="servicePoolDetail.trainingCourse" :disabled="!canEditBasic">
                <el-checkbox :label="item.value" v-for="(item,index) in dict.type.training_course" :key="index"
                ></el-checkbox>
                <jereh-input
                  v-if="servicePoolDetail.trainingCourse.includes('其他')"
                  v-model="servicePoolDetail.trainingCourseOther" ph="请输入具体内容"
                  :disabled="!canEditBasic"
                ></jereh-input>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="框架协议" v-if="servicePoolDetail.serviceType === '框架协议'">
            <div class="flex flex-wrap">
              <el-form-item prop="deviceType" :rules="rules.required" label="设备种类" style="width: 33%;">
                <jereh-select v-model="servicePoolDetail.deviceType" :dict="dict.type.device_type" :disabled="!canEditContent"/>
              </el-form-item>
              <el-form-item prop="deviceNo" :rules="rules.required" label="设备数量" style="width: 33%;">
                <jereh-select v-model="servicePoolDetail.deviceNo" :dict="dict.type.device_no" :disabled="!canEditContent"/>
              </el-form-item>
              <el-form-item prop="contractAmount" :rules="rules.required" label="合同额" style="width: 33%;">
                <jereh-select v-model="servicePoolDetail.contractAmount" :dict="dict.type.contract_amount" :disabled="!canEditContent"/>
              </el-form-item>
              <el-form-item prop="equipmentScope" :rules="rules.required" label="设备范围" style="width: 99%;">
                <el-checkbox-group v-model="servicePoolDetail.equipmentScope">
                  <el-checkbox :label="item.value" v-for="(item,index) in dict.type.equipment_scope" :key="index" :disabled="!canEditContent"
                  ></el-checkbox>
                  <jereh-input
                    v-if="servicePoolDetail.equipmentScope.includes('其他')"
                    v-model="servicePoolDetail.equipmentScopeOther" ph="请输入具体内容"
                    :disabled="!canEditContent"
                  ></jereh-input>
                  <div
                    v-if="servicePoolDetail.equipmentScope && servicePoolDetail.equipmentScope.includes('其他') && !servicePoolDetail.equipmentScopeOther"
                    style="color: #f56c6c; font-size: 12px; line-height: 1; padding-top: 4px; top: 100%; left: 0"
                  >请输入必填内容
                  </div>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item prop="frameworkClarification" :rules="rules.required" label="框架服务澄清项"
                            style="width: 99%;"
              >
                <jereh-input v-model="servicePoolDetail.frameworkClarification" type="textarea" :disabled="!canEditContent" :rows="1"/>
              </el-form-item>
              <el-form-item prop="periodicWork" :rules="rules.required" label="周期性工作项目"
                            style="width: 99%;"
              >
                <jereh-input v-model="servicePoolDetail.periodicWork" type="textarea" :disabled="!canEditContent" :rows="1"/>
              </el-form-item>
              <el-form-item prop="customerRepairProblems" :rules="rules.required" label="客户报修问题处理方式"
                            style="width: 99%;"
              >
                <jereh-input v-model="servicePoolDetail.customerRepairProblems" type="textarea" :disabled="!canEditContent" :rows="1"/>
              </el-form-item>
              <el-form-item prop="materialSupplyMode" :rules="rules.required" label="物料供应方式" style="width: 99%;">
                <jereh-input v-model="servicePoolDetail.materialSupplyMode" type="textarea" :disabled="!canEditContent" :rows="1"/>
              </el-form-item>
              <el-form-item prop="settlementRequirements" :rules="rules.required" label="服务结算要求"
                            style="width: 99%;"
              >
                <jereh-input v-model="servicePoolDetail.settlementRequirements" type="textarea" :disabled="!canEditContent" :rows="1"/>
              </el-form-item>
              <el-form-item prop="frameworkAgreement" :rules="rules.required" label="框架协议合同"
                            style="width: 99%;"
              >
                <file-upload v-model="servicePoolDetail.frameworkAgreement" :disabled="!canEditContent" :rows="1"/>
              </el-form-item>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--          需求解读与方案制定-->
      <div class="border rounded" v-if="type === 'update'">
        <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
          <div class="font">需求解读与方案制定</div>
        </div>
        <div class="ml-2" v-if="servicePoolDetail.serviceType === '框架协议'">
          <div class="header">服务方案</div>
          <div class="ml-2 flex align-start" >
            <jereh-button @click="handleDownloadTemplate" :disabled="!canEditContent">下载模板</jereh-button>
            <file-upload v-model="servicePoolDetail.servicePlan" :disabled="!canEditContent" class="ml-1" style="line-height: initial"/>
          </div>
        </div>
        <el-tag class="ml-2" v-if="servicePoolDetail.serviceType === '培训服务'">
          培训服务的需求解读、方案制定、资源匹配请在培训服务执行功能模块中开展
        </el-tag>
        <div v-if="servicePoolDetail.serviceType !== '培训服务'">
          <div class="header ml-2">资源匹配</div>
          <div class="ml-4">
            <div class="flex align-start">
              <jereh-button @click="addResourceMatching" :disabled="!canEditContent">新增</jereh-button>
              <el-form-item prop="validServiceCode" label="参考服务编码" style="width: 33%;">
                <jereh-input v-model="validServiceCode" @change="resourceMatchSearch" :disabled="!canEditContent"/>
              </el-form-item>
            </div>
            <div class="pb-2 pr-2">
              <el-table :data="servicePoolDetail.resourceMatch" border :fit="true">
                <af-table-column type="index" align="center" width="50"></af-table-column>
                <af-table-column prop="resourceType" label="资源类型" align="center" show-overflow-tooltip width="150">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`resourceMatch.${scope.$index}.resourceType`" label-width="0"
                    >
                      <jereh-input v-model="scope.row.resourceType" :disabled="!canEditContent"/>
                    </el-form-item>
                  </template>
                </af-table-column>
                <af-table-column prop="requirement" show-overflow-tooltip align="center" label="具体要求">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`resourceMatch.${scope.$index}.requirement`" label-width="0"
                    >
                      <jereh-input type="textarea" v-model="scope.row.requirement" :ph="scope.row.ph" :disabled="!canEditContent"/>
                    </el-form-item>
                  </template>
                </af-table-column>
                <af-table-column prop="matchResult" fix-right show-overflow-tooltip align="center" label="匹配结果"
                                width="180"
                >
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`resourceMatch.${scope.$index}.matchResult`" label-width="0"
                    >
                      <el-radio-group v-model="scope.row.matchResult" :disabled="!canEditContent">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </template>
                </af-table-column>
                <af-table-column prop="confirmDate" fix-right show-overflow-tooltip align="center" label="确认日期"
                                width="180"
                >
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`resourceMatch.${scope.$index}.confirmDate`" label-width="0"
                    >
                      <jereh-date-picker v-model="scope.row.confirmDate" @change="confirmDateChange(scope.row,scope.$index)" :disabled="!canEditContent"/>
                    </el-form-item>
                  </template>
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right" width="80">
                  <template slot-scope="scope">
                    <jereh-button type="text" :plain="false" @click="deleteResourceMatching(scope.$index)" :disabled="!canEditContent">删除
                    </jereh-button>
                  </template>
                </af-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <!--          服务执行-->
      <div class="border rounded" v-if="type === 'update'">
        <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
          <div class="font">服务执行</div>
        </div>
        <div class="mx-2">
          <div class="flex flex-wrap">
            <el-form-item prop="serviceBeginDate" label="服务开始日期" style="width: 33%;">
              <jereh-date-picker v-model="servicePoolDetail.serviceBeginDate" disabled/>
            </el-form-item>
            <el-form-item prop="executeBy" label="执行人" style="width: 33%;">
              <!-- <jereh-input v-model="servicePoolDetail.executeBy" disabled/> -->
              <jereh-input v-model="executeBy" disabled/>
            </el-form-item>
            <el-form-item prop="executeEndDate" label="执行结束日期" style="width: 33%;">
              <jereh-date-picker v-model="servicePoolDetail.executeEndDate" disabled/>
            </el-form-item>
          </div>
          <div class="px-2 header">满意度调研</div>
          <div class="flex flex-wrap">
            <el-form-item prop="responseSpeed" label="客户评价总分" style="width: 33%;">
              <jereh-input type="number" disabled/>
            </el-form-item>
            <el-form-item prop="responseSpeed" label="市场评价总分" style="width: 33%;">
              <jereh-input type="number" disabled/>
            </el-form-item>
            <el-form-item prop="responseSpeed" label="调查问卷编码" style="width: 33%;">
              <jereh-input type="number" disabled/>
            </el-form-item>
            <el-form-item prop="responseSpeed" label="响应速度" style="width: 33%;">
              <jereh-input type="number" v-model="servicePoolDetail.responseSpeed" disabled/>
            </el-form-item>
            <el-form-item prop="professionalAbility" label="专业能力" style="width: 33%;">
              <jereh-input type="number" v-model="servicePoolDetail.professionalAbility" disabled/>
            </el-form-item>
            <el-form-item prop="serviceAttitude" label="服务态度" style="width: 33%;">
              <jereh-input type="number" v-model="servicePoolDetail.serviceAttitude" disabled/>
            </el-form-item>
          </div>
          <el-form-item prop="strengthsWeaknesses" label="亮点和不足" style="width: 99%;">
            <jereh-input type="textarea" v-model="servicePoolDetail.strengthsWeaknesses" disabled/>
          </el-form-item>
        </div>
      </div>
      <!--          服务回访-->
      <div class="border rounded" v-if="type === 'update'">
        <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
          <div class="font">服务回访</div>
        </div>
        <div class="mx-2">
          <div class="flex flex-wrap">
            <el-form-item prop="visitFlag" label="是否开展回访" style="width: 33%;">
              <el-radio-group v-model="servicePoolDetail.visitFlag" :disabled="!canEditContent">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="servicePoolDetail.visitFlag !== 0" prop="visitDate" label="回访日期"
                          style="width: 33%;"
            >
              <jereh-date-picker v-model="servicePoolDetail.visitDate" :disabled="!canEditContent"/>
            </el-form-item>
            <el-form-item prop="visitFlag" label="回访是否关闭" style="width: 33%;">
              <el-radio-group v-model="servicePoolDetail.visitClose" :disabled="!canEditContent">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="visitDate" label="回访未关闭原因" style="width: 66%;" v-if="servicePoolDetail.visitClose === 1">
              <jereh-input type="textarea" v-model="servicePoolDetail.visitCloseReason" :disabled="!canEditContent"/>
            </el-form-item>
          </div>
          <!-- <el-form-item v-if="servicePoolDetail.visitFlag !== 0" prop="visitSummary" label="回访概要"
                        style="width: 99%;"
          >
            <jereh-input type="textarea" v-model="servicePoolDetail.visitSummary"/>
          </el-form-item> -->
        </div>
      </div>
      <!--          服务复盘-->
      <div class="border rounded" v-if="type === 'update'">
        <div class="flex align-center justify-between bg-light mb-2 py-1 px-2">
          <div class="font">服务复盘</div>
        </div>
        <div class="mx-2">
          <div class="flex flex-wrap">
            <el-form-item prop="visitFlag" label="是否复盘" style="width: 33%;">
              <el-radio-group disabled>
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              prop="visitDate"
              label="复盘日期"
              style="width: 33%;"
            >
              <jereh-date-picker disabled/>
            </el-form-item>
            <el-form-item prop="visitFlag" label="复盘触发背景" style="width: 99%;">
              <jereh-input type="textarea" disabled/>
            </el-form-item>
            <el-form-item prop="visitDate" label="服务复盘报告" style="width: 99%;">
              <jereh-input type="textarea" disabled/>
            </el-form-item>
            <el-form-item prop="visitFlag" label="复盘组织人" style="width: 33%;">
              <jereh-person-select :multiple="false" disabled/>
            </el-form-item>
            <el-form-item prop="visitFlag" label="复盘参与人" style="width: 33%;">
              <jereh-person-select :multiple="false" disabled/>
            </el-form-item>
            <el-form-item prop="visitFlag" label="服务复盘日期" style="width: 33%;">
              <jereh-date-picker disabled/>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <!--    项目信息绑定弹窗-->
    <el-dialog title="项目信息绑定" :visible.sync="openDeviceBinding" width="60%" append-to-body
               :close-on-click-modal="false"
    >
      <el-form class="mt-2" :model="deviceQueryParams" ref="deviceQueryParams" size="mini"
               :inline="true" label-width="120px"
      >
        <el-form-item prop="projectItem" style="width: 20%;">
          <jereh-input v-model="deviceQueryParams.projectItem" ph="项目编码分项" @enter="handleDeviceQuery"/>
        </el-form-item>
        <el-form-item prop="productCode" style="width: 20%;">
          <jereh-input v-model="deviceQueryParams.productCode" ph="产品编号" @enter="handleDeviceQuery"/>
        </el-form-item>
        <el-form-item prop="productName" style="width: 20%;">
          <jereh-select v-model="deviceQueryParams.productName" ph="产品名称" :dict="dict.type.product_name"/>
        </el-form-item>
        <el-form-item>
          <jereh-button @click="handleDeviceQuery">搜索</jereh-button>
        </el-form-item>
      </el-form>
      <el-table :data="deviceList" border style="width: 100%">
        <af-table-column type="index" align="center" width="50"/>
        <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip/>
        <af-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip/>
        <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip/>
        <af-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <jereh-button type="text" :plain="false" icon="el-icon-edit" @click="selectDevice(scope.row)">选定
            </jereh-button>
          </template>
        </af-table-column>
      </el-table>
      <Pagination v-show="deviceQueryParams.total>0" :total="deviceQueryParams.total"
                  :page.sync="deviceQueryParams.pageNum" :limit.sync="deviceQueryParams.pageSize"
                  @pagination="getDeviceList"
      />
    </el-dialog>
    <!--    服务执行列表弹窗-->
    <el-dialog title="服务方案执行" :visible.sync="showMoreServiceExecution" width="60%" append-to-body
               :close-on-click-modal="false"
    >
      <el-table v-loading="loading" :data="serviceExecutionList" border>
        <af-table-column type="index" align="center" width="50"/>
        <af-table-column label="执行编码" align="center" prop="executionCode" show-overflow-tooltip/>
        <af-table-column label="执行类型" align="center" prop="executionType" show-overflow-tooltip/>
        <af-table-column label="执行状态" align="center" prop="executionStatus" show-overflow-tooltip/>
        <af-table-column label="执行负责人" align="center" prop="executionDirector" show-overflow-tooltip/>
        <af-table-column label="开始时间" align="center" prop="beginDate" show-overflow-tooltip/>
        <af-table-column label="结束时间" align="center" prop="endDate" show-overflow-tooltip/>
        <af-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <jereh-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="toServiceExecutionDetail(scope.row)"
            >
              详情
            </jereh-button>
          </template>
        </af-table-column>
      </el-table>
      <Pagination
        v-show="serviceExecutionQueryParams.total>0"
        :total="serviceExecutionQueryParams.total"
        :page.sync="serviceExecutionQueryParams.pageNum"
        :limit.sync="serviceExecutionQueryParams.pageSize"
        @pagination="getMoreServiceExecution"
      />
    </el-dialog>
    <!--    状态追踪-->
    <div class="position-fixed flex flex-column align-center" style="right: 5%;top: 50%;z-index: 100"
         @click="showStatusTracking = true" v-if="type === 'update'"
    >
      <img src="../../../../public/tracking.png" style="width: 50px; height: 50px">
      <div class="font-sm text-light-muted" v-if="servicePoolDetail.directorFlag">状态追踪</div>
    </div>
    <el-drawer
      title="状态追踪"
      :visible.sync="showStatusTracking"
      :size="400"
      direction="rtl"
    >
      <div class="mx-2">
        <el-steps direction="vertical" :active="servicePoolDetail.statusTracking" finish-status="success">
          <el-step title="服务接收">
            <div slot="description" class="mt-2 mb-4">
              <jereh-button
                v-if="servicePoolDetail.statusTracking === 0 "
                :disabled="servicePoolDetail.serviceState === '已取消' || !directorFlag"
                @click="handleServiceReception"
              >
                下一步
              </jereh-button>
              <div
                v-if="servicePoolDetail.statusTracking !== 0 && servicePoolDetail.statusTrackingLog.length > 0 && item.serviceStageCode == 1"
                class="font-sm text-light-muted mb-1" v-for="(item,index) in servicePoolDetail.statusTrackingLog"
                :key="index"
              >{{ item.operationRecord }}
              </div>
            </div>
          </el-step>
          <el-step title="服务需求解读与方案制定">
            <div slot="description" class="mt-2 mb-4">
              <jereh-button
                v-if="servicePoolDetail.statusTracking === 1 "
                :disabled="servicePoolDetail.serviceState === '已取消' || !directorFlag"
                @click="handleSchemeFormulation"
              >
                下一步
              </jereh-button>
              <jereh-button
                v-if="showCreateTrainingService"
                :disabled="servicePoolDetail.serviceState === '已取消' || !directorFlag"
                @click="handleAddTrainingExecution"
              >
                新增培训
              </jereh-button>
              <div
                v-if="servicePoolDetail.statusTracking !== 0 && servicePoolDetail.statusTrackingLog.length > 1 && item.serviceStageCode == 2"
                class="font-sm text-light-muted mb-1" v-for="(item,index) in servicePoolDetail.statusTrackingLog"
                :key="index"
              >{{ item.operationRecord }}
              </div>
            </div>
          </el-step>
          <el-step title="服务方案执行">
            <div slot="description" class="mt-2 mb-4">
              <div v-if="servicePoolDetail.statusTracking === 2">
                <!--                培训执行-->
                <div class="border rounded flex align-center justify-between p-2 mb-2"
                     v-for="(item,index) in servicePoolDetail.trainingServiceList" :key="index"
                     v-if="servicePoolDetail.deviceDeliver ? index <= 1 : index <= 2"
                     @click="toTrainingExecutionDetail(item)"
                >
                  <div class="flex flex-column align-start">
                    <div class="font-sm font-weight-bold">培训执行</div>
                    <div class="font-small text-light-muted mt-1">培训负责人：{{ item.trainingDirector }}</div>
                  </div>
                  <el-image
                    style="width: 50px; height: 50px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="contain"
                  ></el-image>
                </div>
                <!--                设备交付执行-->
                <div class="border rounded flex align-center justify-between p-2 mb-2"
                     v-if="servicePoolDetail.deviceDeliver"
                     @click="toDeliveryExecutionDetail(servicePoolDetail.deviceDeliver)"
                >
                  <div class="flex flex-column align-start">
                    <div class="font-sm font-weight-bold">设备交付执行</div>
                    <div class="font-small text-light-muted mt-1">
                      交付负责人：{{ servicePoolDetail.deviceBasic.deliveryDirector }}
                    </div>
                  </div>
                  <el-image
                    style="width: 50px; height: 50px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="contain"
                  ></el-image>
                </div>
                <!--                框架协议执行-->
                <div class="border rounded flex align-center justify-between p-2 mb-2"
                     v-if="servicePoolDetail.framework"
                     @click="toFrameworkExecutionDetail(servicePoolDetail.framework)"
                >
                  <div class="flex flex-column align-start">
                    <div class="font-sm font-weight-bold">框架协议执行</div>
                    <div class="font-small text-light-muted mt-1">
                      服务负责人：{{ servicePoolDetail.framework.serviceDirector }}
                    </div>
                  </div>
                  <el-image
                    style="width: 50px; height: 50px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="contain"
                  ></el-image>
                </div>
                <div class="flex">
                  <jereh-button
                    :disabled="servicePoolDetail.serviceState === '已取消' || !directorFlag"
                    @click="handleAddTrainingExecution"
                  >
                    创建培训
                  </jereh-button>
                  <jereh-button
                    :disabled="servicePoolDetail.serviceState === '已取消' || !directorFlag"
                  >
                    下一步
                  </jereh-button>
                  <jereh-button
                    :disabled="servicePoolDetail.serviceState === '已取消' || !directorFlag"
                    @click="getMoreServiceExecution"
                  >
                    更多
                  </jereh-button>
                </div>
              </div>
            </div>
          </el-step>
          <el-step title="服务回访与复盘">
            <div v-if="servicePoolDetail.statusTracking === 3" slot="description" class="mt-2 mb-4">
            </div>
          </el-step>
        </el-steps>
      </div>
    </el-drawer>
    <servicePoolBinding ref="servicePoolBinding" @confirm="confirmServicePoolBinding"></servicePoolBinding>
  </div>
</template>

<script>
import {
  addSdServicePool,
  getMoreServiceExecution,
  getSdServicePool,
  resourceMatchSeacher,
  updateStatusTracking
} from '../../../api/cmms/sdServicePool'
import { listDevice,sdDeviceInfoPage } from '../../../api/cmms/device'
import {getPdf} from '../../../utils/exportPdf'
import moment from 'moment'
import servicePoolBinding from './components/servicePoolBinding'

export default {
  dicts: ['service_type', 'service_level', 'service_status', 'service_source', 'service_level', 'product_name',
    'training_mode', 'equipment_scope', 'sys_customer_bg', 'training_course', 'device_type', 'device_no', 'contract_amount', 'after_sale_area', 'device_area'],
  components: {
    servicePoolBinding
  },
  data() {
    return {
      loading: false,
      serviceExecutionQueryParams: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      serviceExecutionList: [],
      showMoreServiceExecution: false,
      showCreateTrainingService: false,
      validServiceCode: null,
      showStatusTracking: false,
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
      type: 'add',
      rules: {
        required: [
          { required: true, message: '请填写必填项', trigger: ['blur'] }
        ],
        estimateBeginDate: [
          { required: true, message: '请填写必填项', trigger: ['blur'] },
          { validator: this.checkBgnTime, trigger: ['blur'] }
        ],
        estimateEndDate: [
          { required: true, message: '请填写必填项', trigger: ['blur'] },
          { validator: this.checkEndTime, trigger: ['blur'] }
        ]
      },
      servicePoolDetail: {
        serviceProcessCode: 'NA',
        customerMark: '',
        equipmentScope: [],
        trainingCourse: [],
        framework: {}
      },
      // 是不是区域经理
      areaDirectorFlag: false,
      //
      directorFlag: true,
      // 是否绑定项目信息
      isBinding: false,
      // 执行人
      executeBy: '',
      // 权限控制
      canEditBasic: false,
      canEditContent: false,
      canRecheck: false,
      // 远程搜索
      queryLoading: false,
      customerList: [],
    }
  },
  created() {
    if (this.$route.query.id) {
      this.servicePoolDetail.id = this.$route.query.id
      this.type = 'update'
      this.getSdServicePool()
    } else {
      this.canEditBasic = true
      this.canEditContent = true
      this.canRecheck = true
    }
    this.getDeviceList()
  },
  methods: {
    confirmDateChange(data,index){
      let time = new Date(data.confirmDate)
      if(time>new Date()){
        this.servicePoolDetail.resourceMatch[index].confirmDate=''
        this.$modal.msgError('确认日期需不能大于当前日期')
      }
    },
    formatDate(date){
            return moment(date).format("YYYY-MM-DD");
        },
    exportPDF(){
      getPdf('服务池详情'+this.formatDate(new Date()),'exportHtml');
    },
    // 跳转服务执行详情页
    toServiceExecutionDetail(row) {
      console.log(row)
      if ("框架协议" == row.executionType) {
        this.toFrameworkExecutionDetail(row);
      } else if ("设备交付" == row.executionType) {
        this.toDeliveryExecutionDetail(row);
      } else {
        this.toTrainingExecutionDetail(row);
      }
    },
    // 跳转培训服务执行详情页
    toTrainingExecutionDetail(row) {
      this.$router.push({
        path: '/cmms/serviceDelivery/trainingServiceDetail',
        query: { id: row.id }
      })
    },
    // 跳转交付服务执行详情页
    toDeliveryExecutionDetail(row) {
      console.log(row)
      this.$router.push({
        path: '/cmms/serviceDelivery/deviceDeliveryDetail',
        query: { id: row.id }
      })
    },
    // 跳转框架服务执行详情页
    toFrameworkExecutionDetail(row) {
      console.log(row)
      this.$router.push({
        path: '/cmms/serviceDelivery/frameworkDetail',
        query: { id: row.id }
      })
    },
    //校验预期结束时间
    checkEndTime(rule, value, callback) {
      if (!value) {
        callback(new Error('请选择预期结束日期'))
      } else {
        if (Date.parse(this.servicePoolDetail.estimateBeginDate) > Date.parse(this.servicePoolDetail.estimateEndDate)) {
          callback(new Error('不能小于预期开始日期'))
        } else {
          callback()
        }
      }
    },
    //校验预期开始时间
    checkBgnTime(rule, value, callback) {
      if (!value) {
        callback(new Error('请选择预期开始日期'))
      } else {
        if (Date.parse(this.servicePoolDetail.estimateBeginDate) > Date.parse(this.servicePoolDetail.estimateEndDate)) {
          callback(new Error('不能大于预期结束日期'))
        } else {
          callback()
        }
      }
    },
    getMoreServiceExecution() {
      this.showMoreServiceExecution = true
      this.loading = true
      console.log(this.servicePoolDetail.serviceCode)
      let query = {
        serviceCode: this.servicePoolDetail.serviceCode,
        pageNum: this.serviceExecutionQueryParams.pageNum,
        pageSize: this.serviceExecutionQueryParams.pageSize
      }
      getMoreServiceExecution(query).then(res => {
        console.log(res)
        this.serviceExecutionList = res.data.records
        this.serviceExecutionQueryParams.total = res.data.total
        this.loading = false
      })
    },
    resourceMatchSearch() {
      if (this.validServiceCode != null && this.validServiceCode != '') {
        resourceMatchSeacher(this.validServiceCode).then(res => {
          if (res.data != undefined && res.data.length > 0) {
            this.servicePoolDetail.resourceMatch = res.data
          }
        })
      }
    },
    confirmServicePoolBinding(serviceCodeList) {
      serviceCodeList = [...serviceCodeList, this.servicePoolDetail.serviceCode]
      console.log(serviceCodeList)
      this.$router.push({
        path: '/cmms/serviceDelivery/trainingServiceDetail',
        query: { poolId: this.servicePoolDetail.id, serviceCodeList: serviceCodeList.join(','), isShowService: true, serviceFrom: 'servicePool',
            serviceSource: this.servicePoolDetail.serviceSource }
      })
    },
    handleAddTrainingExecution() {
      if (this.servicePoolDetail.serviceType === '设备交付') {
        this.$modal.confirm('请对该项培训服务涵盖的所有交付设备项目服务编码进行绑定！').then(() => {
          this.$refs.servicePoolBinding.openDialog()
        })
      } else {
        this.$router.push({
          path: '/cmms/serviceDelivery/trainingServiceDetail',
          query: {
            poolId: this.servicePoolDetail.id,
            isShowService: true,
            serviceFrom: 'servicePool',
            serviceSource: this.servicePoolDetail.serviceSource
          }
        })
      }
    },
    handleSchemeFormulation() {
      if (this.servicePoolDetail.serviceType !== '培训服务') {
        for (const resourceMatch of this.servicePoolDetail.resourceMatch) {
          for (var key in resourceMatch) {
            if (resourceMatch[key] == null) {
              this.$modal.msgError('请完整填写资源匹配信息')
              return
            }
          }
        }
      }
      if (this.servicePoolDetail.trainingServiceList.length === 0 && this.servicePoolDetail.serviceType === '设备交付'
        && this.servicePoolDetail.trainFlag) {
        this.$modal.msgError('请创建培训执行')
        this.showCreateTrainingService = true
        return
      }
      if (this.servicePoolDetail.trainingServiceList.length === 0 && this.servicePoolDetail.serviceType === '培训服务') {
        this.$modal.msgError('请创建培训执行')
        this.showCreateTrainingService = true
        return
      }
      this.showCreateTrainingService = false
      this.servicePoolDetail.statusTracking = 2
      updateStatusTracking(this.servicePoolDetail).then(response => {
        this.servicePoolDetail = response.data
        this.getSdServicePool()
        this.$modal.msgSuccess('保存成功')
      })
    },
    handleServiceReception() {
      this.$refs.servicePoolDetail.validate((valid) => {
        if (valid) {
          const equipmentScope = this.servicePoolDetail.equipmentScope
          const equipmentScopeOther = this.servicePoolDetail.equipmentScopeOther
          if (equipmentScope && equipmentScope.includes("其他") && !equipmentScopeOther) {
            this.$message.error("请填写必填项")
            return
          }
          this.servicePoolDetail.statusTracking = 1
          updateStatusTracking(this.servicePoolDetail).then(response => {
            this.servicePoolDetail = response.data
            this.$modal.msgSuccess('保存成功')
          })
        } else {
          this.$modal.msgError('请填写必填项')
        }
      })
    },
    deleteResourceMatching(index) {
      this.servicePoolDetail.resourceMatch.splice(index, 1)
    },
    addResourceMatching() {
      this.servicePoolDetail.resourceMatch.push({})
    },
    getPlaceholder(row) {
      if (this.servicePoolDetail.serviceType === '设备交付') {
        return row.deviceDeliverPlaceholder
      }
      if (this.servicePoolDetail.serviceType === '培训服务') {
        return row.trainServicePlaceholder
      }
      if (this.servicePoolDetail.serviceType === '框架协议') {
        return row.frameworkPlaceholder
      }
    },
    handleDeviceQuery() {
      this.deviceQueryParams.pageNum = 1
      this.getDeviceList()
    },
    selectDevice(row) {
      var data = this.servicePoolDetail
      row.id = data.id
      Object.assign(data, row)
      this.servicePoolDetail.serviceLocation = row.deliveryLocation
      this.isBinding = true
      this.openDeviceBinding = false
    },
    getDeviceList() {
      sdDeviceInfoPage(this.deviceQueryParams).then(response => {
        this.deviceQueryParams.total = response.total
        this.deviceList = response.rows
      })
    },
    getSdServicePool() {
      getSdServicePool(this.servicePoolDetail.id).then(response => {
        this.servicePoolDetail = response.data
        this.directorFlag = this.servicePoolDetail.directorFlag
        this.executeBy = response.data.executeBy.length ? response.data.executeBy.join(",") : ''
        if (this.servicePoolDetail.serviceType === "设备交付") {
          this.servicePoolDetail.executeEndDate =
            this.servicePoolDetail.deviceDeliver.acceptanceEvaluation.acceptanceDate ?
              this.formatDate(new Date(this.servicePoolDetail.deviceDeliver.acceptanceEvaluation.acceptanceDate))
                : ""
        }
        this.getPermission()
      })
    },
    handleSaveClick() {
      console.log(this.servicePoolDetail)
      addSdServicePool(this.servicePoolDetail).then(response => {
        this.$modal.msgSuccess('保存成功')
        // this.$router.back(0)
      })
    },
    handleDownloadTemplate() {
      this.download('cmms/sdServicePool/downLoadServiceSchemaTemplate', {}, `服务池_框架协议服务方案模板_${new Date().getTime()}.docx`)
    },
    // 发起复盘
    startRecheck() {
      this.$confirm('是否确认发起复盘？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        console.log("发起复盘！")
      }).catch(() => {
        return
      });
    },
    // 权限控制
    getPermission() {
      // 计算权限
      let canEditBasicRoles = [
        'admin',
        'cmms:admin',
        'cmms:serviceManager'
      ]
      let canEditContentRoles = [
        'admin',
        'cmms:admin',
        'cmms:serviceManager'
      ]
      if (this.servicePoolDetail.afterSaleArea) {
        const areaManagerRole = "cmms:area:" + this.servicePoolDetail.afterSaleArea
        canEditBasicRoles.push(areaManagerRole)
        canEditContentRoles.push(areaManagerRole)
      }
      this.canEditBasic = this.checkRole(canEditBasicRoles)
      this.canEditContent = this.checkRole(canEditContentRoles)
      this.canRecheck = this.checkRole(canEditContentRoles)
      const username = this.$store.state.user.nickName
      if (this.servicePoolDetail.serviceDirector === username && this.checkRole(["cmms:area"])) {
        this.canEditBasic = true
        this.canEditContent = true
      }
      if (this.servicePoolDetail.serviceDirector === username && this.checkRole(["cmms:engineer"])) {
        this.canEditContent = true
      }
      if (this.checkRole(["cmms:qcengineer"])) {
        this.canRecheck = true
      }
      console.log(this.canEditBasic)
    },
    // 远程搜索360
    remoteMethod(query) {
      if (query !== "") {
        this.queryLoading = true;
        const queryParams = {
          pageNum: 1,
          pageSize: 10000,
          agency: 0,
          customerName: query
        }
        listDevice(queryParams).then((response) => {
          this.queryLoading = false;
          const deviceList = response.rows;
          if (deviceList.length) {
            deviceList.forEach(item => {
              if(this.customerList.indexOf(item.customerName) === -1) {
                this.customerList.push(item.customerName)
              }
            })
          }
        });
      } else {
        this.customerList = []
      }
    },
    // 提交
    handleSubmit() {
      this.$refs.servicePoolDetail.validate((valid) => {
        if (valid) {
          const equipmentScope = this.servicePoolDetail.equipmentScope
          const equipmentScopeOther = this.servicePoolDetail.equipmentScopeOther
          if (equipmentScope && equipmentScope.includes("其他") && !equipmentScopeOther) {
            this.$message.error("请填写必填项")
            return
          }
          this.handleSaveClick()
        } else {
          this.$modal.msgError('请填写必填项')
        }
      })
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
</style>
<style scoped>
::v-deep .el-table__cell .el-form-item {
  margin-bottom: 5px;
}
.report-link {
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding: 0px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>