<template>
    <div>
        <div style="margin-left:1%;font-size: 2vmin;">四、客户配件需求清单</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;"
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
                <el-table-column type="index"  width="150" >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="submittedItem"   >
                    <template slot="header">
                        提报序次
                    </template>
                </el-table-column>
                <el-table-column prop="chassisCode"  >
                    <template slot="header">
                        提报配件种类总数量
                    </template>
                    <template slot-scope="scope">
                    {{ scope.row.partsList.length }}
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"  >
                    <template slot="header">
                        提交市场日期
                    </template>
                </el-table-column>
                <el-table-column prop="marketConfirmResult"  >
                    <template slot="header">
                        市场确认结果
                    </template>
                </el-table-column>
                <el-table-column prop="submitMoney"  >
                    <template slot="header">
                        本次提报金额（万元）
                    </template>
                </el-table-column>
                <el-table-column prop="reachedMoney"  >
                    <template slot="header">
                        本次达成金额（万元）
                    </template>
                </el-table-column>
                <el-table-column prop="qwed"  >
                    <template slot="header">
                        本次执行订单号
                    </template>
                </el-table-column>
                <el-table-column label="市场确认日期" prop="marketConfirmDate"  :formatter="formatDate">
                </el-table-column>
            </el-table>
    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">五、培训记录</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;"
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
                <el-table-column type="index"  width="150%" >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="createTime"   >
                    <template slot="header">
                        创建日期
                    </template>
                </el-table-column>
                <el-table-column prop="trainingState"   >
                    <template slot="header">
                        培训状态
                    </template>
                </el-table-column>
                <el-table-column prop="trainingDirector"  >
                    <template slot="header">
                        培训负责人
                    </template>
                </el-table-column>
                <el-table-column prop="productName"  >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
                <el-table-column prop="trainingCode"  >
                    <template slot="header">
                        培训编码
                    </template>
                </el-table-column>
                <el-table-column prop="trainingPlace" >
                    <template slot="header">
                        培训地点
                    </template>
                </el-table-column>
                <el-table-column prop="trainingLevel"  >
                    <template slot="header">
                        培训级别
                    </template>
                </el-table-column>
                <el-table-column prop="trainingPreparation.trainingMode"  >
                    <template slot="header">
                        培训方式
                    </template>
                </el-table-column>
                <el-table-column prop="trainingStart.totalTraingHours"  >
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
            style="width:100% ;"
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
                <el-table-column type="index"   >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"  >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="chassisCode"   >
                    <template slot="header">
                        项目名称
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"  >
                    <template slot="header">
                        维修项目类别
                    </template>
                </el-table-column>
                <el-table-column prop="productName"  >
                    <template slot="header">
                        维修等级
                    </template>
                </el-table-column>
                <el-table-column prop="productType"  >
                    <template slot="header">
                        项目负责人
                    </template>
                </el-table-column>
                <el-table-column prop="deviceNo"  >
                    <template slot="header">
                        发货验收日期
                    </template>
                </el-table-column>
                <el-table-column prop="checkTime"   >
                    <template slot="header">
                        立项时间
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime"  >
                    <template slot="header">
                        项目工时（H）
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime"   >
                    <template slot="header">
                        项目产值（万元）
                    </template>
                </el-table-column>
            </el-table>
    </div>
    <div style="margin:2%;float:left"><jereh-button @click="previousPage()">上一页</jereh-button></div>
    </div>
</template>
<script>
    import {queryFramework } from '../../../api/cmms/sdFramework'
    import moment from 'moment'
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
    formatDate(value){
     let dateValue = moment(value.marketConfirmDate).format("YYYY-MM-DD");
      return dateValue;
    },
    previousPage(){
        this.$router.push({ path: '/cmms/serviceDelivery/reportTwo',
                            query: { frameworkId:this.frameworkId }
                          })
    }
  }
}

</script>
