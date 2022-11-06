<template>
 <div style="padding:1%">
    <el-collapse v-model="activeNames" >
      <el-collapse-item title="重点工作" name="1">
        <el-form
          ref="queryForm"
          size="small"
          label-width="120px"
        >
         <el-row>
          <el-col :span="12">
            <el-form-item label="来源"
              style="width: 100%" 
            >
            <jereh-input v-model="form.comeFrom" disabled></jereh-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="战略支柱"
              style="width: 100%" 
            >
            <jereh-input v-model="form.strategicPillar" disabled></jereh-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-form-item label="行动计划"
              style="width: 100%" 
            >
            <jereh-input :rows="2"  type="textarea" v-model="form.actionPlan" disabled></jereh-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="年度目标"
              style="width: 100%" 
            >
            <jereh-input :rows="2"  type="textarea" v-model="form.annualGoal" disabled></jereh-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="举措拆解"
              style="width: 100%" 
            >
            <jereh-input :rows="2"  type="textarea" v-model="form.measuresDisassemble" disabled></jereh-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="行动计划(里程碑)"
              style="width: 100%" 
            >
            <jereh-input :rows="2"  type="textarea" v-model="form.mileStone" disabled></jereh-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="交付物"
                style="width: 100%" 
                >
                <jereh-input v-model="form.Deliverables" disabled></jereh-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="验收标准"
                style="width: 100%" 
                >
                <jereh-input  v-model="form.acceptanceStandard" disabled></jereh-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="里程碑分界点"
                style="width: 100%" 
                >
                <jereh-input v-model="form.milestoneDemarcationPoint" disabled></jereh-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="未完成时间"
                style="width: 100%" 
                >
                <jereh-input  v-model="form.unfinishedTime" disabled></jereh-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="负责人"
                style="width: 100%" 
                >
                <jereh-input  v-model="form.responsiblePerson" disabled></jereh-input>
                </el-form-item>
            </el-col>
        </el-row>
       </el-form>
      </el-collapse-item>
      <el-collapse-item name="2" >
        <template slot="title">
          <div style="width:99%;display:flex;justify-content:space-between">
            月度拆解
             <div>
              <jereh-button @click.stop.prevent.native="save()">保存</jereh-button>
              <jereh-button @click.stop.prevent.native="add()">新增</jereh-button>
             </div>
           </div>
        </template>
        <el-table
        :header-cell-style="{
                'color':'#515a6e',
                'line-height':'5px',
                'text-align': 'center',
                'font-size': '15px',
                'font-weight': '1000',
                'background': '#EEF1F8',
                'font-family': 'PingFangSC, PingFangSC-Semibold',
              }"
        :data="tableData" fit border>
        <el-table-column type="index" label="序号" width="100px" align="center">
        </el-table-column>
        <el-table-column prop="month" label="月份" align="center">
        </el-table-column>
        <el-table-column prop="strategicPillar" label="月度目标" align="center">
        </el-table-column>
        <el-table-column prop="annualGoal" label="交付物及验收标准" align="center">
        </el-table-column>
        <el-table-column prop="april" label="完成时间" align="center">
        </el-table-column>
        <el-table-column prop="may" label="负责人" align="center">

        </el-table-column>
        <el-table-column prop="june" label="状态" align="center">

        </el-table-column>
        <el-table-column prop="july" label="类别" align="center">

        </el-table-column>
        <el-table-column prop="august" label="月度总结" align="center">

        </el-table-column>
        <el-table-column  label="操作" align="center">
            <template slot-scope="scope">
            <jereh-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="deleteRow(scope.$index,scope.row)"
            >
                删除
            </jereh-button>
            <jereh-button
                size="mini"
                type="text"
                icon="el-icon-suitcase"
                @click="sendTask(scope.$index,scope.row)"
            >
                下发任务
            </jereh-button>
            </template>
        </el-table-column>
      </el-table>
      </el-collapse-item>
    </el-collapse>
 </div>
</template>
<script>
 export default {
    data() {
    return {
        activeNames:"",
        form:{
            comeFrom:"",
            strategicPillar:"",
            actionPlan:"",
            annualGoal:"",
            measuresDisassemble:"",
            mileStone:"",
            Deliverables:"",
            acceptanceStandard:"",
            milestoneDemarcationPoint:"",
            responsiblePerson:""
        },
        tableData:[{
            month:1
        }]
    }
    },
    methods:{
      save(){

      },
      add(){
        this.tableData.push({
          month:1
        })
      },
      deleteRow(index,data){
        this.$modal.confirm('保存后不可修改，确认保存吗？').then(() => {
       this.tableData.splice(index,1)
        })
       console.log(index)
      },
      sendTask(index,data){

      }
    }

 }
</script>
<style scoped>
  ::v-deep .el-table__body tr:hover>td.el-table__cell {
  background-color:  #fdeee8 !important;
}
</style>
