<template>
<div style="height:100%;width:100%;">
   <el-header><el-row><jereh-button style="margin-bottom: 1%;"  icon="el-icon-plus">新建</jereh-button></el-row></el-header>
    <el-form :model="form" ref="queryForm" size="mini"   label-width="80px">
      <el-row>
        <el-col :span="4">
      <el-form-item prop="name"  label="姓名" >
        <jereh-person-select v-model="form.name" style="width:100%" ph="姓名"  />
      </el-form-item>
      </el-col>
      <el-col :span="4">
      <el-form-item prop="afterSaleArea"  label="售后区域">
        <jereh-select v-model="form.afterSaleArea" style="width:100%" ph="售后区域" :dict="dict.type.after_sale_area" />
      </el-form-item>
      </el-col>
      <el-col :span="4">
      <el-form-item prop="workArea"  label="工作区域" >
        <jereh-select v-model="form.workArea" style="width:100%" :dict="dict.type.after_sale_area" ph="工作区域"/>
      </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item prop="workDate" style="width:100%" label="工作日期" >
        <jereh-date-picker
        v-model="form.workDate"
        style="width:50%;"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </jereh-date-picker>
      </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item >
        <jereh-button type="primary" size="mini" @click="handleQuery">过滤</jereh-button>
        <jereh-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</jereh-button>
      </el-form-item>
      </el-col>
      </el-row>
      </el-form>
   <div style="padding-left:1.2%;padding-right:1.2%;margin-top: -1%;">
    <el-table :data="tableData" 
    :header-cell-style="{
                'color':'#515a6e',
                'line-height':'5px',
                'text-align': 'center',
                'font-size': '15px',
                'font-weight': '1000',
                'background': '#EEF1F8',
                'font-family': 'PingFangSC, PingFangSC-Semibold',
              }"
    
             border>
        <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="afterSaleArea" label="售后区域" align="center"></el-table-column>
        <el-table-column prop="workPlace" label="工作区域" align="center"></el-table-column>
        <el-table-column prop="workDate" label="工作日期" align="center"></el-table-column>
        <el-table-column prop="serviceLocation" label="服务地点" align="center"></el-table-column>
        <el-table-column prop="workDescription" label="工作概述" align="center"></el-table-column>
        <el-table-column prop="tomorrowPlan" label="次日工作计划" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="更新日期" align="center"></el-table-column>
        <el-table-column  label="操作" align="center">
            <template slot-scope="scope">
          <jereh-button
            size="mini"
            type="text"
            icon="el-icon-tickets"
            @click="toDetail(scope.row)"
          >
             详情
          </jereh-button>
          <jereh-button
            size="mini"
            type="text"
            icon="el-icon-edit"
          >
           修改
          </jereh-button>
        </template>
        </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList"/>
   </div>
</div>
</template>
<script>
import { METHODS } from 'http';

export default {
    dicts: ['service_type', 'service_level', 'training_state', 'after_sale_area'],
    data() {
    return {
        form:{
        afterSaleArea:"",
        name:"",
        workArea:"",
        workDate:"",
        
        },
        tableData:[{
            name:"Marras",
        },
        {
            name:"Thomas",

        }],
        queryParams:{
          pageNum:1,
          pageSize:10
        },
        total:null,
    }},
    created() {
    this.getList()
  },
    methods:{
      getList(){
      this.total=this.tableData.length;
      },
        handleQuery(){

        },
        resetQuery(){

        },
        toDetail(row){
        this.$router.push({
        path: '/cmms/dashboard/myDateReport',
        query: { }
      })
        }
    }
}
</script>
<style scoped>
::v-deep .el-table__body tr:hover>td.el-table__cell {
  background-color:  #fdeee8 !important;
}
::v-deep .el-header * {
    font-size: 15px;
  }
</style>