<template>
    <div>
    <div style="margin-left:1%;font-size: 2vmin;">七、阶段服务维保建议</div>
    <div style="margin-left:1%;font-size: 2vmin;">正常使用，定期维保</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;"
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
                <el-table-column type="index"   >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"   >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" >
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">择期报修，储备配件</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;"
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
                 <el-table-column type="index"   >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"   >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" >
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">及时报修，准备配件</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;"
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
                 <el-table-column type="index"   >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"   >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" >
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">整车清理，系统维保</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;"
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
                 <el-table-column type="index"   >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"   >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" >
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">停用大修，改造升级</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;"
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
                  <el-table-column type="index"   >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"   >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" >
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    </div>
    <br/>
    <div style="margin-left:1%;font-size: 2vmin;">整合操作手，培训提升</div>
    <div  style="margin-left:1%;margin-right:1%;">
        <el-table
            style="width:100% ;"
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
                  <el-table-column type="index"   >
                    <template slot="header">
                    序号
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   >
                    <template slot="header">
                        项目编码
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"   >
                    <template slot="header">
                        产品编码
                    </template>
                </el-table-column>
                <el-table-column prop="licensePlateCode" >
                    <template slot="header">
                        车牌号
                    </template>
                </el-table-column>
                <el-table-column prop="productName" >
                    <template slot="header">
                        产品名称
                    </template>
                </el-table-column>
            </el-table>
    </div>
    <div style="margin:2%;float:left"><jereh-button @click="previousPage()">上一页</jereh-button></div>
    </div>
</template>
<script>
import { queryFrameworkStage,queryFramework } from '../../../api/cmms/sdFramework'
export default {
    data(){
     return{
        frameworkId:"",
        reportNumberId:"",
        startingDate:"",
        endingDate:"",
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
        }
     }
    },
    created(){
    this.frameworkId=this.$route.query.frameworkId
    this.startingDate=this.$route.query.startingDate
    this.endingDate=this.$route.query.endingDate
    this.reportNumberId=this.$route.query.reportNumberId
    this.toReport()
    },
    methods:{
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
        previousPage(){
            this.$router.push({
        path: '/cmms/serviceDelivery/stageReport',
        query: {frameworkId:this.frameworkId,startingDate:this.startingDate,endingDate:this.endingDate,reportNumberId:this.reportNumberId}
      })
        }
    }
}
</script>