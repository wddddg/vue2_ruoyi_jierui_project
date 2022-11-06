<template>
    <div>
    <el-row :gutter="10" class="mb-2">
    <el-col :span="1.5" style="margin:1%">
    <jereh-button @click="exportPDF()">导出pdf</jereh-button>
    </el-col>
    </el-row>
    <div id="exportHtml">
    <div style="margin-left:80%">报告编码：{{executiveReport.stageConcludeMessage.reportNumberId}}</div>
    <div style="text-align: center;font-size: 4vmin;margin-top: 5%;">框架协议总结报告</div>
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
        <el-col :span="13"><div style="text-align:left;font-size: 2vmin;text-decoration:underline;">{{formateDate(nowDate)}}</div></el-col>
    </el-row>
    <br/>
    <el-row>
        <el-col :span="11"><div style="text-align:right;font-size: 2vmin;">审核人:</div></el-col>
        <el-col :span="13"><div style="text-align:left;font-size: 2vmin;text-decoration:underline;">//toDo</div></el-col>
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
    <div v-show="isSave==true">
    <div style="margin-left:1%;font-size: 2vmin;" >一、基础信息</div>
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
        <div style="text-align:center ;">{{executiveReport.framework.sdServicePool.contactPerson}}</div>
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
        <div style="margin:1%;">
            <el-row >
            <el-col :span="12">
                <div style="margin:1%;width:600%;height:300px" ref="barChart1" ></div>
            </el-col>
            <el-col :span="12">
                <div style="margin:1%;width:650%;height:300px" ref="barChart2" ></div>
            </el-col>
        </el-row>
        </div>
        <div >
      <div style="margin-left:1%;font-size: 2vmin;">二、框架协议达成信息</div>
      <div style="margin-left:1%;margin-right:1%;">
      <el-descriptions class="margin-top"   :column="6"   border>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" >
        <template slot="label">
            <div style="text-align:center ;">累计完成巡检项次</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.pollingOffice}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center"  >
        <template slot="label">
            <div style="text-align:center ;">累计巡检工时（H）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.inspectionTotalHours}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center"  >
        <template slot="label">
            <div style="text-align:center ;">累计创建问题数量</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.problemNumber}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center"  >
        <template slot="label">
            <div style="text-align:center ;">累计完成问题处理数量</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.completedNumber}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" >
        <template slot="label">
            <div style="text-align:center ;">累计故障处理总工时（H）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.handleFaultTotalHours}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" >
        <template slot="label">
            <div style="text-align:center ;">累计故障处理辅助总工时（H）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.handleAuxiliaryTotalHours}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center"  >
        <template slot="label">
            <div style="text-align:center ;">累计实施培训项次</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.inspectionStartDate}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center"  >
        <template slot="label">
            <div style="text-align:center ;">累计实施培训总课时（H）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.totalTrainingHours}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" >
        <template slot="label">
            <div style="text-align:center ;">累计完成维修改造项目数量</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.maintenanceNumber}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" >
        <template slot="label">
            <div style="text-align:center ;">累计达成维修项目总产值（万元）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.maintenanceTotalOutputValue}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" >
        <template slot="label">
            <div style="text-align:center ;">累计提报配件总项数</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.partsSize}}</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" >
        <template slot="label">
            <div style="text-align:center ;">累计达成配件订单总金额（万元）</div>
        </template>
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.reachedMoneySum}}</div>
        </el-descriptions-item>
    </el-descriptions>
    </div>
    </div>
    <br/>
    <div >
      <div style="margin-left:1%;font-size: 2vmin;">三、问题处理记录</div>
      <div style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;display: table-cell!important;"
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
                <el-table-column type="index"  width="150%" >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   width="130%" >
                    <template slot="header">
                        处理进度
                    </template>
                </el-table-column>
                <el-table-column prop="chassisCode"  width="140%" >
                    <template slot="header">
                    创建时间
                    </template>
                </el-table-column>
                <el-table-column prop="productCode" width="130%"  >
                    <template slot="header">
                    服务请求编号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="130%"  >
                    <template slot="header">
                    产品名称
                    </template>
                </el-table-column>
                <el-table-column prop="productType" width="130%"  >
                    <template slot="header">
                    产品编号
                    </template>
                </el-table-column>
                <el-table-column prop="deviceNo" width="130%"  >
                    <template slot="header">
                    服务请求类型
                    </template>
                </el-table-column>
                <el-table-column prop="checkTime" width="130%"   >
                    <template slot="header">
                    服务请求概述
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime" width="130%"  >
                    <template slot="header">
                    问题处理故障工时(H)
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime" width="155%"   >
                    <template slot="header">
                    问题处理辅助工时(H)
                    </template>
                </el-table-column>
            </el-table>
    </div>
    </div>
    <div style="margin-left:1%;font-size: 2vmin;">四、客户配件需求清单</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;display: table-cell!important;"
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
                <el-table-column type="index" width="150%" >
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
                <el-table-column prop="productCode" width="155%" >
                    <template slot="header">
                        提交市场日期
                    </template>
                </el-table-column>
                <el-table-column prop="marketConfirmResult" width="150%" >
                    <template slot="header">
                        市场确认结果
                    </template>
                </el-table-column>
                <el-table-column prop="submitMoney" width="160%"  >
                    <template slot="header">
                        本次提报金额（万元）
                    </template>
                </el-table-column>
                <el-table-column prop="reachedMoney" width="160%" >
                    <template slot="header">
                        本次达成金额（万元）
                    </template>
                </el-table-column>
                <el-table-column prop="qwed" width="140%"  >
                    <template slot="header">
                        本次执行订单号
                    </template>
                </el-table-column>
                <el-table-column label="市场确认日期" prop="marketConfirmDate"  :formatter="formatDate" width="140%">
                </el-table-column>
            </el-table>
    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">五、培训记录</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;display: table-cell!important;"
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
                <el-table-column type="index"  width="135%" >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="createTime" width="135%"  >
                    <template slot="header">
                        创建日期
                    </template>
                </el-table-column>
                <el-table-column prop="trainingState" width="135%"  >
                    <template slot="header">
                        培训状态
                    </template>
                </el-table-column>
                <el-table-column prop="trainingDirector" width="135%" >
                    <template slot="header">
                        培训负责人
                    </template>
                </el-table-column>
                <el-table-column prop="productName" width="135%" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
                <el-table-column prop="trainingCode" width="140%" >
                    <template slot="header">
                        培训编码
                    </template>
                </el-table-column>
                <el-table-column prop="trainingPlace" width="135%" >
                    <template slot="header">
                        培训地点
                    </template>
                </el-table-column>
                <el-table-column prop="trainingLevel" width="140%" >
                    <template slot="header">
                        培训级别
                    </template>
                </el-table-column>
                <el-table-column prop="trainingPreparation.trainingMode" width="135%" >
                    <template slot="header">
                        培训方式
                    </template>
                </el-table-column>
                <el-table-column prop="trainingStart.totalTraingHours" width="130%" >
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
            style="width:100% ;display: table-cell!important;"
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
                <el-table-column prop="productName" width="140%"  >
                    <template slot="header">
                        维修等级
                    </template>
                </el-table-column>
                <el-table-column prop="productType" width="140%" >
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
    </div>
    </div>
    </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import {queryFramework } from '../../../api/cmms/sdFramework'
    import {getPdf} from '../../../utils/exportPdf'
   export default {
    props:{
        executiveReport:{
            type: Object,
      default: () => {
        return{
            stageConcludeMessage:{
                reportNumberId:"",
                a:0,
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
        name: "",
        isSave:true,
        datatable:"",
        frameworkId:"",
        reportNumberId:"",
        nowDate:new Date()
    }
    },
    created(){
   
   },
   mounted(){
        this.getBarData2()
        this.getBarData3()
    },
   methods: {
    formate(date){
        return moment(date).format('YYYY-MM-DD')
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
                data: ["累计达成维修项目总产值(万元)","累计达成配件订单总金额(万元)"],
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
                data: [this.executiveReport.stageConcludeMessage.maintenanceTotalOutputValue,this.executiveReport.stageConcludeMessage.reachedMoneySum],
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
                    interval:0,
                },
                type: "category",
                width:'20%',
                data: ["累计故障处理总工时(H)","累计故障处理辅助总工时(H)","累计实施培训总课时(H)","累计维修改造工时(H)","累计巡检工时(H)"],
                axisLine: {             // 坐标轴线
                show: true,      // 默认显示，属性show控制显示与否
            },
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
                type: "bar",
                barWidth: "20%",
                data: [this.executiveReport.stageConcludeMessage.handleFaultTotalHours,this.executiveReport.stageConcludeMessage.handleAuxiliaryTotalHours,this.executiveReport.stageConcludeMessage.totalTrainingHours,,this.executiveReport.stageConcludeMessage.inspectionTotalHours],
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
    formatDate(value){
     let dateValue = moment(value.marketConfirmDate).format("YYYY-MM-DD");
      return dateValue;
    },
    exportPDF(){
      this.isSave=true
      this.$nextTick(function () {
            getPdf('框架协议总结报告'+this.formate(new Date()),'exportHtml'); 
         setTimeout(()=>{
         this.isSave=false;
        },5000)
    })
    },
    checkReport(){
      const data={
        frameworkId:this.frameworkId,
        performReportCode:this.reportNumberId,
        statementType:5,
      }
      queryFramework(data).then(res=>{
        console.log(res.data)
        if(res.data.performReport==undefined){
            this.executiveReport=res.data
        }
        else{
            this.executiveReport=res.data.performReport
        }
      })

    },
    formateDate(value){
     let dateValue = moment(value).format("YYYY-MM-DD");
      return dateValue;
    },
    nextPage(){
        this.$router.push({ path: '/cmms/serviceDelivery/reportTwo',
                            query: {frameworkId:this.frameworkId,reportNumberId:this.reportNumberId} 
                          })
    }
   }
}
</script>