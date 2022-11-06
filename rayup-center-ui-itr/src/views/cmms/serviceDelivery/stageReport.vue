<template>
    <div>
    <div id="exportHtml" >
    <div style="margin-left:86%">报告编码：{{executiveReport.stageConcludeMessage.reportNumberId}}</div>
    <div style="text-align: center;font-size: 4vmin;margin-top: 5%;">框架协议阶段服务报告</div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div style="margin-left:-2%">
    <el-row >
        <el-col :span="11"><div style="text-align:right;font-size: 2vmin;">客户名称:</div></el-col>
        <el-col :span="13"><div style="text-align:left;font-size: 2vmin;text-decoration:underline;">{{executiveReport.framework.sdServicePool.customerName}}</div></el-col>
    </el-row>
    <br/>
    <el-row>
        <el-col :span="11"><div style="text-align:right;font-size: 2vmin;">客户联系人:</div></el-col>
        <el-col :span="13"><div style="text-align:left;font-size: 2vmin;text-decoration:underline;">{{executiveReport.framework.sdServicePool.contactPerson}}</div></el-col>
    </el-row>
    <br/>
    <el-row>
        <el-col :span="11"><div style="text-align:right;font-size: 2vmin;">编写人:</div></el-col>
        <el-col :span="13"><div style="text-align:left;font-size: 2vmin;text-decoration:underline;">{{executiveReport.framework.serviceDirector}}</div></el-col>
    </el-row>
    <br/>
    <el-row>
        <el-col :span="11"><div style="text-align:right;font-size: 2vmin;">日期:</div></el-col>
        <el-col :span="13"><div style="text-align:left;font-size: 2vmin;text-decoration:underline;">{{formate(nowDate)}}</div></el-col>
    </el-row>
    <br/>
    <el-row>
        <el-col :span="11"><div style="text-align:right;font-size: 2vmin;">审核人:</div></el-col>
        <el-col :span="13"><div style="text-align:left;font-size: 2vmin;text-decoration:underline;">陈存衡</div></el-col>
    </el-row>
    <br/>
    <el-row>
        <el-col :span="11"><div style="text-align:right;font-size: 2vmin;">公司:</div></el-col>
        <el-col :span="13"><div style="text-align:left;font-size: 2vmin;text-decoration:underline;">烟台杰瑞石油装备技术有限公司</div></el-col>
    </el-row>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">一、基础信息</div>
    <div style="margin-left:1%;margin-right:1%;">
    <el-descriptions class="margin-top"   :column="1"   border>
        <el-descriptions-item labelStyle="width: 10%;text-align:center"  >
        <template slot="label">
            <div style="text-align:center ;">客户名称</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.customerName}}</div>
        </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top"   :column="5"   border>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">服务编码</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.serviceCode}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%" >
        <template slot="label">
            <div style="text-align:center ;">客户联系人</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.contactPerson}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%" >
        <template slot="label">
            <div style="text-align:center ;">联系方式</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.contactPhone}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%" >
        <template slot="label">
            <div style="text-align:center ;">服务负责人</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.serviceDirector}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">售后区域</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.afterSaleArea}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%" >
        <template slot="label">
            <div style="text-align:center ;">预估结束日期</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.estimateEndDate}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%" >
        <template slot="label">
            <div style="text-align:center ;">服务级别</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.serviceLevel}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%" >
        <template slot="label">
            <div style="text-align:center ;">设备数量</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.deviceNo}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">市场负责人</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.maketDirector}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">服务地点</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.serviceLocation}}</div>
        </el-descriptions-item>
    </el-descriptions>
    </div>
    <br/>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">二、阶段达成信息</div>
    <div style="margin-left:1%;margin-right:1%;">
    <el-descriptions class="margin-top"   :column="5"   border>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">起始日期</div>
        </template>
        <div style="text-align:center ;">{{formate(executiveReport.stageConcludeMessage.startingDate)}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">结束日期</div>
        </template>
        <div style="text-align:center ;">{{formate(executiveReport.stageConcludeMessage.endingDate)}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段完成巡检项次</div>
        </template>
        <div style="text-align:center ;" >{{executiveReport.stageConcludeMessage.stagePollingOffice}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段巡检工时<br/>(H)</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stagePollingManHour}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段创建问题数量</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageEstablishProblemNumber}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段完成问题处理数量</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageAccomplishProblemNumber}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段故障处理总工时<br/>(H)</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageFaultHandlingManHour}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段故障处理辅助总工时（H）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageFaultHandlingAssistManHour}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段实施培训项次</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageUndertakeTrainingOffice}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段实施培训总课时（H）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageUndertakeTrainingTotalHours}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段完成维修改造项目数量</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageCompleteMaintenanceNumber}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段达成维修项目总产值（万元）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageAchieveMaintenanceProjects}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段提报配件总项数</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageAccessoriesNumber}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段达成配件订单总金额（万元）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageReachAccessoriesOrderMoney}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 10%">
        <template slot="label">
            <div style="text-align:center ;">阶段待确认配件订单总金额（万元）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.stageNoConfirmedAccessoriesOrderMoney}}</div>
        </el-descriptions-item>
    </el-descriptions>
    </div>
    <div>
        <el-row>
            <el-col :span="11">
                <div style="margin:1%;width:600%;height:300px" ref="pieChart" ></div>
            </el-col>
            <el-col :span="13">
                <div style="margin:1%;width:750%;height:300px" ref="barChart" ></div></el-col>
        </el-row>
        <el-row style="margin-top:-10%">
            <el-col :span="11">
                <div style="margin:1%;width:600%;height:300px" ref="barChart1" ></div>
            </el-col>
            <el-col :span="13">
                <div style="margin:1%;width:750%;height:300px" ref="barChart2" ></div>
            </el-col>
        </el-row>
    </div>
    <div style="margin-left:1%;font-size: 2vmin;">三、问题处理记录</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.problemSolvingList"
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
                <el-table-column type="index" width="150%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"  width="150%" >
                    <template slot="header">
                        处理进度
                    </template>
                </el-table-column>
                <el-table-column prop="chassisCode" width="150%" >
                    <template slot="header">
                    创建时间
                    </template>
                </el-table-column>
                <el-table-column prop="productCode" width="130%" >
                    <template slot="header">
                    服务请求编号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="130%" >
                    <template slot="header">
                    产品名称
                    </template>
                </el-table-column>
                <el-table-column prop="productType" width="130%" >
                    <template slot="header">
                    产品编号
                    </template>
                </el-table-column>
                <el-table-column prop="deviceNo" width="120%" >
                    <template slot="header">
                    服务请求类型
                    </template>
                </el-table-column>
                <el-table-column prop="checkTime" width="120%"  >
                    <template slot="header">
                    服务请求概述
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime" width="130%" >
                    <template slot="header">
                    问题处理故障工时(H)
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime" width="130%"  >
                    <template slot="header">
                    问题处理辅助工时(H)
                    </template>
                </el-table-column>
            </el-table>
    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">四、客户配件需求清单</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.customerPartsDemandList"
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
                <el-table-column type="index" width="140%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="submittedItem" width="150%"  >
                    <template slot="header">
                        提报序次
                    </template>
                </el-table-column>
                <el-table-column prop="chassisCode" width="150%" >
                    <template slot="header">
                        提报配件种类总数量
                    </template>
                    <template slot-scope="scope">
                    {{ scope.row.partsList.length }}
                    </template>
                </el-table-column>
                <el-table-column prop="productCode" width="150%" >
                    <template slot="header">
                        提交市场日期
                    </template>
                </el-table-column>
                <el-table-column prop="marketConfirmResult" width="150%" >
                    <template slot="header">
                        市场确认结果
                    </template>
                </el-table-column>
                <el-table-column prop="submitMoney" width="150%" >
                    <template slot="header">
                        本次提报金额（万元）
                    </template>
                </el-table-column>
                <el-table-column prop="reachedMoney" width="150%" >
                    <template slot="header">
                        本次达成金额（万元）
                    </template>
                </el-table-column>
                <el-table-column prop="qwed" width="150%" >
                    <template slot="header">
                        本次执行订单号
                    </template>
                </el-table-column>
                <el-table-column label="市场确认日期" prop="marketConfirmDate"  :formatter="formatDate" width="150%" >
                </el-table-column>
            </el-table>
    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">五、培训记录</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.trainingRecordList"
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
                <el-table-column type="index" width="150%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="createTime" width="140%"  >
                    <template slot="header">
                        创建日期
                    </template>
                </el-table-column>
                <el-table-column prop="trainingState" width="140%"  >
                    <template slot="header">
                        培训状态
                    </template>
                </el-table-column>
                <el-table-column prop="trainingDirector" width="130%" >
                    <template slot="header">
                        培训负责人
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="130%" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
                <el-table-column prop="trainingCode" width="140%" >
                    <template slot="header">
                        培训编码
                    </template>
                </el-table-column>
                <el-table-column prop="trainingPlace" width="130%">
                    <template slot="header">
                        培训地点
                    </template>
                </el-table-column>
                <el-table-column prop="trainingLevel" width="130%" >
                    <template slot="header">
                        培训级别
                    </template>
                </el-table-column>
                <el-table-column prop="trainingPreparation.trainingMode" width="130%" >
                    <template slot="header">
                        培训方式
                    </template>
                </el-table-column>
                <el-table-column prop="trainingStart.totalTraingHours" width="120%" >
                    <template slot="header">
                        培训总课时(H)
                    </template>
                </el-table-column>
            </el-table>

    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">六、维修项目</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.maintenanceItemsList"
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
                <el-table-column type="index" width="130%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem" width="130%" >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="chassisCode" width="130%"  >
                    <template slot="header">
                        项目名称
                    </template>
                </el-table-column>
                <el-table-column prop="productCode" width="130%" >
                    <template slot="header">
                        维修项目类别
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="130%" >
                    <template slot="header">
                        维修等级
                    </template>
                </el-table-column>
                <el-table-column prop="productType" width="130%" >
                    <template slot="header">
                        项目负责人
                    </template>
                </el-table-column>
                <el-table-column prop="deviceNo" width="140%" >
                    <template slot="header">
                        发货验收日期
                    </template>
                </el-table-column>
                <el-table-column prop="checkTime" width="140%"  >
                    <template slot="header">
                        立项时间
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime" width="140%" >
                    <template slot="header">
                        项目工时（H）
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime" width="140%"  >
                    <template slot="header">
                        项目产值（万元）
                    </template>
                </el-table-column>
            </el-table>
    <div style="font-size: 2vmin;">七、阶段服务维保建议</div>
    <div style="font-size: 2vmin;">正常使用，定期维保</div>
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.serviceMaintenanceSuggestions.normalUse"
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
                <el-table-column type="index" width="260%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"  width="270%" >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode" width="270%"  >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" width="270%" >
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="270%" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    <br/>
    <div style="font-size: 2vmin;">择期报修，储备配件</div>
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.serviceMaintenanceSuggestions.electiveRepairs"
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
                 <el-table-column type="index" width="260%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem" width="270%"  >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"  width="270%" >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" width="270%">
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="270%">
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    <br/>
    <div style="font-size: 2vmin;">及时报修，准备配件</div>
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.serviceMaintenanceSuggestions.timelyRepairs"
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
                 <el-table-column type="index" width="260%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem" width="270%"  >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode" width="270%"  >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" width="270%" >
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="270%" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    <br/>
    <div style="font-size: 2vmin;">整车清理，系统维保</div>
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.serviceMaintenanceSuggestions.vehicleCleaning"
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
                 <el-table-column type="index" width="260%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"  width="270%" >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode" width="270%"  >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" width="270%" >
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="270%">
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    <br/>
    <div style="font-size: 2vmin;">停用大修，改造升级</div>
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.serviceMaintenanceSuggestions.outageOverhaul"
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
                  <el-table-column type="index" width="260%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem" width="270%"  >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode" width="270%"  >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" width="270%">
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="270%">
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    <br/>
    <div style="font-size: 2vmin;">整合操作手，培训提升</div>
        <el-table
            style="width:100% ;  display: table-cell!important;"
            :data="executiveReport.serviceMaintenanceSuggestions.integratedOperationManual"
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
                  <el-table-column type="index" width="260%"  >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem" width="270%"  >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"  width="270%" >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" width="270%">
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="270%">
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    </div>
    </div>
  </div>
</template>
<script>
    import { queryFrameworkStage,queryFramework } from '../../../api/cmms/sdFramework'
    import moment from 'moment'
    import {getPdf} from '../../../utils/exportPdf'
   export default {
    props:{
        executiveReport:{
            type: Object,
      default: () => {
        return{
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
        }
    }
    }
},
   data(){
    return{
        frameworkId:"",
        reportNumberId:"",
        startingDate:"",
        endingDate:"",
        isShow:false,
        reportNumberId:"",
        name: "",
        nowDate:new Date(),
    }
   },
//    created(){
//     this.frameworkId=this.$route.query.frameworkId
//     this.startingDate=this.$route.query.startingDate
//     this.endingDate=this.$route.query.endingDate
//     this.reportNumberId=this.$route.query.reportNumberId
//     this.toReport()
//     },
   watch: {
    executiveReport: function () {
      this.$nextTick(function () {
        this.getPieData()
        this.getBarData1()
        this.getBarData2()
        this.getBarData3()
      });
    }
},
   methods: {
    toReport(){
      const data={
        frameworkId:this.frameworkId,
        statementType:4,
        startingDate:this.startingDate,
        endingDate:this.endingDate,
        executiveReportCode:this.reportNumberId
      }
      queryFrameworkStage(data).then(res=>{
        console.log(res.data)
        if(res.data.executiveReport==undefined){
            this.executiveReport=res.data
        }
        else{
            this.executiveReport=res.data.executiveReport
        }
      })
    },
    exportPDF(){
         this.isShow=true;
         this.$nextTick(function () {
            getPdf('框架协议阶段报告'+this.formate(new Date()),'exportHtml');
         setTimeout(()=>{
         this.isShow=false;
        },5000)
    })
    },
    formatDate(value){
     let dateValue = moment(value.marketConfirmDate).format("YYYY-MM-DD");
      return dateValue;
    },
    formate(date){
        return moment(date).format('YYYY-MM-DD')
    },
    nextPage(){
        this.$router.push({
        path: '/cmms/serviceDelivery/stageReportTwo',
        query: {frameworkId:this.frameworkId,startingDate:this.startingDate,endingDate:this.endingDate,reportNumberId:this.reportNumberId}
      })
    },
    getPieData(){
        let box = this.$refs["pieChart"];
        let charts = this.$echarts.init(box);
        let option = {
            title: {
            text: '合同额统计',
            left: 'center'
            },
            tooltip: {
            trigger: 'item',
            backgroundColor: "rgba(0,0,0,0.80);", //设置底色
            borderWidth: 0, //设置无边框
            textStyle: {
            color: "#ffffff"
            // fontSize: 10,
            }
            },
            legend: {
            orient: 'horizontal',
            bottom: 'bottom',
            top:"80%",
            textStyle: {

            }
            },
            color : ['rgb(145,204,117)','rgb(84,112,198)'],
            series: [
            {
                name: '',
                type: 'pie',
                radius: '50%',
                top:"-20%",
                data: [
                { value: this.executiveReport.stageConcludeMessage.stageAgreedContractAmount, name: '阶段达成合同额（万元)' },
                { value: this.executiveReport.stageConcludeMessage.contractAmount-this.executiveReport.stageConcludeMessage.stageAgreedContractAmount, name: '未达成合同额（万元)' }
                ],
                emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
                },
                label: {
                  show: true,
                  position: "inside",
                  formatter: "{b},{c}",
                  valueAnimation: true
                }
            }
            ]
         };
          charts.setOption(option);
    },
    getBarData1(){
          let boxDom = this.$refs["barChart"];
          let scoreCharts = this.$echarts.init(boxDom);
          var option = {
            title: {
              text: "工时统计",
              left: "center"
            },
            algin: {},
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },

            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis:
              {
                axisTick: {
        alignWithLabel: true
      },
                axisLabel:{
                    interval:0
                },
                type: "category",
                width:'50%',
                data: ['阶段故障处理总工时(H)','阶段故障处理辅助总工时(H)','阶段实施培训总课时(H)','阶段维修改造工时(H)','阶段巡检工时(H)'],
                axisLine: {             // 坐标轴线
                show: true,      // 默认显示，属性show控制显示与否
                }
            },
            yAxis: [
              {
                type: "value",
                axisLine: {             // 坐标轴线
                show: false,      // 默认显示，属性show控制显示与否
                lineStyle: {      // 属性lineStyle控制线条样式
                // color: '',
                width: 2,
                type: 'solid'
             }
            },
              }
            ],
            series: [
              {
                name: "总工时(H)",
                type: "bar",
                barWidth: "20%",

                data: [this.executiveReport.stageConcludeMessage.stageFaultHandlingManHour,this.executiveReport.stageConcludeMessage.stageFaultHandlingAssistManHour,this.executiveReport.stageConcludeMessage.stageUndertakeTrainingTotalHours,this.executiveReport.stageConcludeMessage.stageMaintainManHour,this.executiveReport.stageConcludeMessage.stagePollingManHour],
                label: {
                  show: true,
                  position: "top",
                  valueAnimation: true,
                  textStyle: {
                   color:"black"
            }
                }
              }
            ]
          };
          scoreCharts.setOption(option);
    },
    getBarData2(){
        let boxDom = this.$refs["barChart1"];
          let scoreCharts = this.$echarts.init(boxDom);
          var option = {
            title: {
              text: "产值统计",
              left: "center"
            },
            algin: {},
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },

            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                width:'20%',
                data: ["阶段达成维修项目总产值(万元)","阶段达成配件订单"],
                axisLine: {             // 坐标轴线
                show: true,      // 默认显示，属性show控制显示与否
                axisLabel:{
                    interval:0,
                    textStyle: {
                    fontSize: 1, //横轴字体大小
                    },
                },
            },
            axisTick: {
        alignWithLabel: true
      }
            }

            ],
            yAxis: [
              {
                type: "value",
                axisLine: {             // 坐标轴线
                show: false,      // 默认显示，属性show控制显示与否
                lineStyle: {      // 属性lineStyle控制线条样式
                // color: '',
                width: 2,
                type: 'solid'
             }
            },
              }
            ],
            series: [
              {
                type: "bar",
                barWidth: "20%",
                data: [this.executiveReport.stageConcludeMessage.stageAchieveMaintenanceProjects,this.executiveReport.stageConcludeMessage.stageReachAccessoriesOrderMoney],
                label: {
                  show: true,
                  position: "top",
                  valueAnimation: true,
                  textStyle: {
                   color:"black"
            }
                }
              }
            ]
          };
          scoreCharts.setOption(option);
    },
    getBarData3(){
        let boxDom = this.$refs["barChart2"];
          let scoreCharts = this.$echarts.init(boxDom);
          var option = {
            title: {
              text: "问题统计",
              left: "center"
            },
            algin: {},
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },

            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                width:'20%',
                data: ["问题总数量","已处理数量","处理中数量"],
                axisLine: {             // 坐标轴线
                show: true,      // 默认显示，属性show控制显示与否
                axisLabel:{
                    interval:0,
                    textStyle: {
                    fontSize: 1, //横轴字体大小
                    },

                },
            },
            axisTick: {
        alignWithLabel: true
      }
            }

            ],
            yAxis: [
              {
                type: "value",
                axisLine: {             // 坐标轴线
                show: false,      // 默认显示，属性show控制显示与否
                lineStyle: {      // 属性lineStyle控制线条样式
                // color: '',
                width: 2,
                type: 'solid'
             }
            },
              }
            ],
            series: [
              {
                type: "bar",
                barWidth: "20%",
                data: [this.executiveReport.stageConcludeMessage.stageEstablishProblemNumber,this.executiveReport.stageConcludeMessage.stageAccomplishProblemNumber,this.executiveReport.stageConcludeMessage.stageEstablishProblemNumber-this.executiveReport.stageConcludeMessage.stageAccomplishProblemNumber],
                label: {
                  show: true,
                  position: "top",
                  valueAnimation: true,
                  textStyle: {
                   color:"black"
            }
                }
              }
            ]
          };
          scoreCharts.setOption(option);
    }
   }
}
</script>
