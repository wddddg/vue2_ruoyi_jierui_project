<template>
<div style="padding:1%">
    <div style="margin-bottom:1%" >
        <el-row>
            <el-col :span="1.5" style="margin-right:10px"><jereh-button>保存</jereh-button></el-col>
            <el-col :span="1.5" style="margin-right:10px"><jereh-button>邮件发送</jereh-button></el-col>
            <el-col :span="1.5"><jereh-button>关闭</jereh-button></el-col>
        </el-row>
    </div>
    <div>
    <el-collapse v-model="activeNames" >
      <el-collapse-item title="基础信息" name="1">
        <el-descriptions class="margin-top"  :column="3"  border>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>姓名</center>
                </template>
                kooriookami
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>售后区域</center>
                </template>
                18100000000
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                    <center>工作区域</center>
                </template>
                苏州市
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>工作日期</center>
                </template>
                <jereh-date-picker
                      v-model="workDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                    ></jereh-date-picker>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>服务地点</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>当日总工时</center>
                </template>
                8
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>协助人员</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            </el-descriptions>
        </el-collapse-item>
        <el-collapse-item title="故障处理类" name="2">
            <div v-for="(item,index) in form.Malfunction" :key="index">
            <span class="header">故障问题{{index+1}}</span>
            <el-descriptions class="margin-top"  :column="3"  border>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>工单编号</center>
                </template>
                {{item.workOrder}}
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>故障类型</center>
                </template>
                {{item.problemType}}
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                    <center>项目编号分项</center>
                </template>
                {{item.projectItem}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>设备编号</center>
                </template>
                {{item.deviceCode}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>设备名称</center>
                </template>
                {{item.deviceName}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>工时(H)</center>
                </template>
                {{item.workHours}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>市场人员</center>
                </template>
                {{item.marketPerson}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>客户名称</center>
                </template>
                {{item.customerName}}
            </el-descriptions-item>
                </el-descriptions>
        <span class="header1">【问题现象/Trouble Description】</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.Malfunction.troubleDescription"
            placeholder="请输入问题现象"
            >
        </el-input>
        <span class="header1">【服务内容/Service Procedures】</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.Malfunction.serviceProcedures"
            placeholder="请输入服务内容"
            >
        </el-input>
        <span class="header1">【处理结果/Troubleshoot Result】</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.Malfunction.troubleshootResult"
            placeholder="请输入处理过程"
            >
        </el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item title="设备交付类" name="3">
        <div v-for="(item,index) in form.device" :key="index">
            <span class="header">设备交付{{index+1}}</span>
                <el-descriptions class="margin-top"  :column="3"  border>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>交付环节</center>
                </template>
                kooriookami
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>服务编码</center>
                </template>
                18100000000
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                    <center>项目编号分项</center>
                </template>
                苏州市
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>产品编号</center>
                </template>
                2022-10-26
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>产品名称</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>工时(H)</center>
                </template>
                8
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>市场人员</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>客户名称</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
                </el-descriptions>
                <span class="header1">【服务内容/Service Procedures】</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="item.serviceProcedures"
            placeholder="请输入服务内容"
            >
        </el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item title="培训服务类" name="4">
        <div v-for="(item,index) in form.train" :key="index">
            <span class="header">培训服务{{index+1}}</span>
                <el-descriptions class="margin-top"  :column="3"  border>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>培训环节</center>
                </template>
                kooriookami
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>培训编码</center>
                </template>
                18100000000
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                    <center>项目编号分项</center>
                </template>
                苏州市
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>产品编号</center>
                </template>
                2022-10-26
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>产品名称</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>工时(H)</center>
                </template>
                8
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>市场人员</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>客户名称</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
                </el-descriptions>
                <span class="header1">【服务内容/Service Procedures】</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.train.serviceProcedures"
            placeholder="请输入服务内容"
            >
        </el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item title="框架协议服务类" name="5">
        <div v-for="(item,index) in form.frameWork" :key="index">
            <span class="header" style="width:120px">框架协议服务{{index+1}}</span>
                <el-descriptions class="margin-top"  :column="3"  border>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>服务环节</center>
                </template>
                kooriookami
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>服务编码</center>
                </template>
                18100000000
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                    <center>工时(H)</center>
                </template>
                8
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>市场人员</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>客户名称</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
                </el-descriptions>
                <span class="header1">【服务内容/Service Procedures】</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.frameWork.serviceProcedures"
            placeholder="请输入服务内容"
            >
        </el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item title="维修改造类" name="6">
        <div v-for="(item,index) in form.maintenanceRepair" :key="index">
            <span class="header">维修改造{{index+1}}</span>
                <el-descriptions class="margin-top"  :column="3"  border>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>维修类型</center>
                </template>
                <jereh-select v-model="form.workArea" :dict="dict.type.sys_main_type"  ph="维修类型"/>
              
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>市场人员</center>
                </template>
                18100000000
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                    <center>项目编号分项</center>
                </template>
                8
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>产品编号</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>产品名称</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>工时(H)</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>客户名称</center>
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
                </el-descriptions>
                <span class="header1">【服务内容/Service Procedures】</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.maintenanceRepair.serviceProcedures"
            placeholder="请输入服务内容"
            >
        </el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item  name="7">
        <template slot="title">
           <div style="width:99%;display:flex;justify-content:space-between">
             其他
             <div>
                <jereh-button @click.stop.prevent.native="addOthers()">新增</jereh-button>
             </div>
           </div>
        </template>
        <div v-for="(item,index) in form.others" :key="index">
            <div style="height:30px;font-size: larger;font-weight: 600;">
                <el-col :span="23"><span class="header">工作{{index+1}}</span></el-col>
                <el-col :span="1"><jereh-button @click="deleteOthers(index)">删除</jereh-button></el-col>
            </div>
                <el-descriptions class="margin-top"  :column="3"  border>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>工作类型</center>
                </template>
                <jereh-select v-model="item.workType" :dict="dict.type.sys_work_type"  ph="工作类型"/>
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                <center>市场人员</center>
                </template>
                <jereh-person-select v-model="item.marketPerson" ph="请选择"  />
            </el-descriptions-item>
            <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 23%">
                <template slot="label">
                    <center>项目编号分项</center>
                </template>
                <el-input v-model="item.projrctItem"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>产品编号</center>
                </template>
                <el-input v-model="item.productCode"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>产品名称</center>
                </template>
                <el-input v-model="item.productName"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>工时(H)</center>
                </template>
                <el-input v-model="item.workTimeTotal"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <center>客户名称</center>
                </template>
                <el-input v-model="item.customerName"></el-input>
            </el-descriptions-item>
                </el-descriptions>
                <span class="header1">【服务内容/Service Procedures】</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="item.serviceProcedures"
            placeholder="请输入服务内容"
            >
        </el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item title="总结" name="8">
        <span class="header2">当日异常</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.summary.Abnormal"
            placeholder="请输入当日异常"
            >
        </el-input>
        <span class="header2">需要协调资源</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.summary.resource"
            placeholder="请输入需要协调的资源"
            >
        </el-input>
        <span class="header2">工作收获和感悟</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.summary.Harvest"
            placeholder="请输入您的工作收获和感悟"
            >
        </el-input>
        <span class="header2">明日工作计划</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.summary.plan"
            placeholder="请输入您明天的工作计划"
            >
        </el-input>
        <span class="header2">明日安全隐患</span>
        <el-input
            type="textarea"
            :rows="4"
            v-model="form.summary.hiddenDanger"
            placeholder="请输入明日安全隐患"
            >
        </el-input>
      </el-collapse-item>
    </el-collapse>
    </div>
</div>
</template>
<script>
export default {
    dicts: ['service_type', 'service_level', 'training_state', 'after_sale_area','sys_main_type','sys_work_type'],
    data() {
    return {
        workDate:"",
        activeNames:"",
        form:{
            Malfunction:[{
                workOrder:"",
                problemType:"",
                deviceCode:"",
                deviceName:"",
                workHours:"",
                troubleDescription:"",
                serviceProcedures:"",
                troubleshootResult:""
            }],
            device:[{
                serviceProcedures:""
            },{
                serviceProcedures:""
            }],
            train:[{
                serviceProcedures:""
            }],
            frameWork:[{
                serviceProcedures:""
            }],
            maintenanceRepair:[{
                serviceProcedures:""
            }],
            others:[{
                workType:"",
                serviceProcedures:"",
                marketPerson:"",
                projrctItem:"",
                productCode:"",
                productName:"",
                workTimeTotal:"",
                customerName:""
            }],
            summary:{
                Abnormal:"",
                resource:"",
                Harvest:"",
                plan:"",
                hiddenDanger:""
            }
        }
    }
},
methods:{
    addOthers(){
    this.form.others.push({
    workType:"",
    serviceProcedures:"",
    marketPerson:"",
    projrctItem:"",
    productCode:"",
    productName:"",
    workTimeTotal:"",
    customerName:""
            
    })
    },
    deleteOthers(index){
        this.$modal.confirm('您确认删除吗？').then(() => {
        this.form.others.splice(index,1);
        })
    }
}
}
</script>
<style scoped>
.header {
  font-size: 15px;
  font-weight: 700;
  background-color: #fdeee8;
  display: block;
  border-left: 3px solid #EA5514;
  width: 80px;
  margin-top: 10px;
  text-align: left;
}
.header1 {
  font-size: 15px;
  font-weight: 700;
  background-color: #fdeee8;
  display: block;
  width: 240px;
  text-align: left;
  opacity: 0.9;
}
.header2 {
  font-size: 15px;
  font-weight: 700;
  background-color: #fdeee8;
  display: block;
  width: 120px;
  text-align: left;
  opacity: 0.9;
}
</style>