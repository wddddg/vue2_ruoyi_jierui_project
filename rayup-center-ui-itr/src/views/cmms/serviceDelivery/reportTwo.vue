<template>
    <div>
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
                <div style="margin:1%;width:100%;height:200px" ref="barChart1" ></div>
            </el-col>
            <el-col :span="12">
                <div style="margin:1%;width:100%;height:200px" ref="barChart2" ></div>
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
        <div style="text-align:center ;">{{executiveReport.stageConcludeMessage.inspectionStartDate}}</div>
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
        <div style="text-align:center ;">//toDo</div>
        </el-descriptions-item>
        <el-descriptions-item labelStyle="width: 10%;text-align:center" >
        <template slot="label">
            <div style="text-align:center ;">累计达成配件订单总金额（万元）</div>
        </template>
        <div style="text-align:center ;">//toDo</div>
        </el-descriptions-item>
    </el-descriptions>
    </div>
    </div>
    <br/>
    <div >
      <div style="margin-left:1%;font-size: 2vmin;">三、问题处理记录</div>
      <div style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;"
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
                <el-table-column type="index"   >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   >
                    <template slot="header">
                        处理进度
                    </template>
                </el-table-column>
                <el-table-column prop="chassisCode"  >
                    <template slot="header">
                    创建时间
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"  >
                    <template slot="header">
                    服务请求编号
                    </template>
                </el-table-column>
                <el-table-column prop="productName"  >
                    <template slot="header">
                    产品名称
                    </template>
                </el-table-column>
                <el-table-column prop="productType"  >
                    <template slot="header">
                    产品编号
                    </template>
                </el-table-column>
                <el-table-column prop="deviceNo"  >
                    <template slot="header">
                    服务请求类型
                    </template>
                </el-table-column>
                <el-table-column prop="checkTime"   >
                    <template slot="header">
                    服务请求概述
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime"  >
                    <template slot="header">
                    问题处理故障工时(H)
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime"   >
                    <template slot="header">
                    问题处理辅助工时(H)
                    </template>
                </el-table-column>
            </el-table>
    </div>
    </div>
    <div style="margin:2%;float:left"><jereh-button @click="previousPage()">上一页</jereh-button></div>
    <div style="margin:2%;float:right"><jereh-button @click="nextPage()">下一页</jereh-button></div>
    </div>
</template>
<script>
  import {queryFramework } from '../../../api/cmms/sdFramework'
    export default{
    created(){
      this.frameworkId=this.$route.query.frameworkId
      this.reportNumberId=this.$route.query.reportNumberId
      this.checkReport()
   },
   data(){
    return{
      frameworkId:"",
      reportNumberId:"",
      executiveReport:{
            stageConcludeMessage:{
                reportNumberId:""
            },
            framework:{
                sdServicePool:{
                    customerName:""
                }
            }
        }
   }},
  watch: {
    executiveReport: function () {
      this.$nextTick(function () {
        this.getBarData2()
        this.getBarData3()
      });
    }
},
  methods: {
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
    previousPage(){
      this.$router.push({
        path: '/cmms/serviceDelivery/report',
        query: {frameworkId:this.frameworkId,reportNumberId:this.reportNumberId}
      })
    },
    nextPage(){
        this.$router.push({
        path: '/cmms/serviceDelivery/reportThree',
        query: {frameworkId:this.frameworkId,reportNumberId:this.reportNumberId}
      })
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
                data: [this.executiveReport.stageConcludeMessage.maintenanceTotalOutputValue,145],
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
    }
  }
}

</script>
