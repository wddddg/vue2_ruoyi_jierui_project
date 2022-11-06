<template>
  <div class="app-container">
    <el-dialog title="客户服务单" :visible.sync="dialogTableVisibleCheck" width="70%" @close="closeDilog()" :close-on-click-modal="false">
      <el-row :gutter="10" class="mb-2">
        <el-col :span="1.5">
          <jereh-button @click="save1()" v-if="customerService.isSave==1" :disabled="saveable">保存</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button @click="closeDilog()">关闭</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button
          @click="exportPDF()"
          >导出PDF</jereh-button>
        </el-col>
        <el-col :span="1.5">
          <jereh-button @click="shareData()">分享</jereh-button>
        </el-col>
      </el-row>
      <el-row id="exportHtml">
        <el-col :span="1"><div><font style="color:white;">.</font></div></el-col>
        <el-col :span="22">
            <el-form ref="form" >
                <div style="height:10%">
            <font style="color:white;">.</font></div>
            <div style="border:1px solid #EBEEF5">
        <el-row>
          <el-col :span="4">
            <img :src="logo" style="width:60%;height:35%"/>
          </el-col>
          <el-col :span="16">
            <div style="text-align: center">客户服务单<br/>Customer Service Record</div>
          </el-col>
        </el-row>
     </div>
            <div>
            
                <el-descriptions class="margin-top"   :column="2"   border>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center">
                    <template slot="label">
                        <div style="text-align:center ;">编号/code:</div>
                    </template>
                    {{customerService.code}}
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 12.7%;text-align:center" contentStyle="width: 13%">
                    <template slot="label">
                        服务单号:
                    </template>
                    {{customerService.checkNumbers}}
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions class="margin-top"   :column="1"   border>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center" >
                    <template slot="label">
                        <div style="text-align:center ;">客户名称<br/>Client Name</div>
                    </template>
                    <div style="text-align:center ;">{{customerService.acceptanceEvaluation.customerServiceOrderList[0].customerName}}</div>
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions class="margin-top"   :column="4"   border>
                    <el-descriptions-item labelStyle="width: 9.3%;text-align:center" contentStyle="width: 12.4%">
                    <template slot="label">
                        <div style="text-align:center ;">客户联系人<br/>Client Principal</div>
                    </template>
                    <div style="text-align:center ;">{{customerService.acceptanceEvaluation.customerServiceOrderList[0].contactPerson}}</div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 12%;text-align:center" contentStyle="width: 12%">
                    <template slot="label">
                        <div style="text-align:center ;">客户联系方式<br/>Contact Info</div>
                    </template>
                    <div style="text-align:center ;">{{customerService.acceptanceEvaluation.customerServiceOrderList[0].contactPhone}}</div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 12%;text-align:center" contentStyle="width: 12%">
                    <template slot="label">
                        <div style="text-align:center ;">服务代表(主修人)<br/>Service Principal</div>
                    </template>
                    <div style="text-align:center ;">{{customerService.acceptanceEvaluation.customerServiceOrderList[0].deliveryDirector}}</div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 12%;text-align:center" contentStyle="width: 12%">
                    <template slot="label">
                        <div style="text-align:center ;">参与人员<br/>Participant</div>
                    </template>
                    <div style="text-align:center ;">{{customerService.acceptanceEvaluation.participant}}</div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 9.3%;text-align:center">
                    <template slot="label">
                        <div style="text-align:center ;">服务地点<br/>Service Jobsite</div>
                    </template>
                    <div style="text-align:center ;">{{customerService.acceptanceEvaluation.customerServiceOrderList[0].serviceLocation}}</div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center">
                    <template slot="label">
                        <div style="text-align:center ;">服务总工时<br/>Total Service Hours</div>
                    </template>
                    <div style="text-align:center ;">{{customerService.acceptanceEvaluation.deliveryTotalHours}}</div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 12%;text-align:center">
                    <template slot="label">
                        <div style="text-align:center ;">服务开始时间<br/>Start Time</div>
                    </template>
                    <div v-if="flag3">
                                <el-date-picker
                                v-model="customerService.serviceStartTime"
                                type="date"
                                @blur="changeType3(customerService.serviceStartTime)"
                                @change="checkServiceBgnTime()"
                                placeholder="选择日期">
                                </el-date-picker>
                                </div>
                    <div v-if="!flag3" @click="changeType3(customerService.serviceStartTime)" style="text-align:center ;">{{formatDate(customerService.serviceStartTime)}}</div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 12%;text-align:center">
                    <template slot="label">
                        <div style="text-align:center ;">服务完毕时间<br/>End Time</div>
                    </template>
                    <div v-if="flag4">
                                <el-date-picker
                                v-model="customerService.serviceEndTime"
                                type="date"
                                @blur="changeType4(customerService.serviceEndTime)"
                                @change="checkServiceEndTime()"
                                placeholder="选择日期">
                                </el-date-picker>
                                </div>
                    <div v-if="!flag4" style="text-align:center;" @click="changeType4(customerService.serviceEndTime)">{{formatDate(customerService.serviceEndTime)}}</div>
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions    :column="1"   border>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center;" :contentStyle="{'padding': '0px'}">
                    <template slot="label">
                        <div style="text-align:center ;">服务设备<br/>Service Equipment</div>
                    </template>
                    <div style="width:100%">
                  <el-table
                  class="el-table"
                    :data="customerService.acceptanceEvaluation.customerServiceOrderList"
                    :cell-style="{
                        'text-align': 'center',
                        'font-size': '12px',
                    }"
                :header-cell-style="{
                        'text-align': 'center',
                        'font-size': '13px',
                        'font-weight': '250',
                        'background': '#EEF1F8',
                        'font-family': 'PingFangSC, PingFangSC-Semibold',
                    }" border>
                        <af-table-column prop="index"  >
                            <template slot="header">
                            序号<br/>Items
                        </template>
                        </af-table-column>
                        <el-table-column prop="serviceCode" >
                            <template slot="header">
                                服务编码<br/>Service Code
                            </template>
                        </el-table-column>
                        <el-table-column prop="projectItem"   >
                            <template slot="header">
                                项目编码<br/>Project No
                            </template>
                        </el-table-column>
                        <el-table-column prop="productCode" >
                            <template slot="header">
                            产品编号<br/>Serial No
                            </template>
                        </el-table-column>
                        <el-table-column prop="productName"  >
                            <template slot="header">
                            产品名称<br/>Product Name
                            </template>
                        </el-table-column>
                        <el-table-column prop="productType"  >
                            <template slot="header">
                            产品型号<br/>Model No
                            </template>
                        </el-table-column>
                        <el-table-column prop="exfactoryDate"   >
                            <template slot="header">
                                出厂日期<br/>Date of MFG
                            </template>
                            <template slot-scope="scope">
                                {{formatDate(scope.row.exfactoryDate)}}
                            </template></el-table-column>
                      </el-table>
                      </div>
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions class="margin-top"   :column="1"   border>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center">
                    <template slot="label">
                        <div style="text-align:center ;">服务类型<br/>Service Type</div>
                    </template>
                    <div style="text-align:center ;">
                        <el-checkbox-group
                            v-model="customerService.serviceType"
                            :max="1">
                            <el-checkbox v-for="option in options" :label="option" :key="option" :disabled="customerService.isSave==0&&option!=customerService.serviceType" >{{option}}</el-checkbox>
                        </el-checkbox-group>
                        <div style="text-align:center ;">请打"√" Please Mark "√"</div>
                    </div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center">
                    <template slot="label">
                        <div style="text-align:center ;">服务内容<br/>Service Description</div>
                    </template>
                    <div style="text-align:center ;" v-if="flag5">
                        <el-input
                    type="textarea"
                    :rows="2"
                    style=""
                    placeholder="N/A"
                    v-model="customerService.serviceDescription"
                    @blur="changeTextArea()"
                    >
                                    </el-input>
                    </div>
                    <div v-if="!flag5" @click="changeTextArea()" style="text-align:center ;" v-html="customerService.serviceDescription"></div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center">
                    <template slot="label">
                        <div style="text-align:center ;">服务过程及结果<br/>Service Result</div>
                    </template>
                    <div style="text-align:center ;" v-if="flag6">
                        <el-input
                    type="textarea"
                    :rows="2"
                    style=""
                    placeholder="N/A"
                    v-model="customerService.serviceResult"
                    @blur="changeTextArea1()"
                    >
                                    </el-input>
                    </div>
                    <div v-if="!flag6" @click="changeTextArea1()" style="text-align:center ;" v-html="customerService.serviceResult"></div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center">
                    <template slot="label">
                        <div style="text-align:center ;">备注<br/>Remarks</div>
                    </template>
                    <div style="text-align:center ;" v-if="flag7">
                        <el-input
                    type="textarea"
                    :rows="2"
                    style=""
                    placeholder="N/A"
                    v-model="customerService.remark1"
                    @blur="changeTextArea2()"
                    >
                                    </el-input>
                    </div>
                    <div v-if="!flag7" @click="changeTextArea2()" style="text-align:center ;" v-html="customerService.remark1"></div>
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions class="margin-top"   :column="2"   border>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center">
                        <template slot="label">
                            签名<br/>Signature
                    </template>
                    <center>
                    <jereh-button  v-if="!customerService.sig3" @click="sign('handoverSign')">请签名</jereh-button>
                    <el-image
                            v-if="customerService.sig3"
                            class="ml-2"
                            style="width: 150px; height: 80px;"
                            :src="customerService.sig3"
                            @click="changeSign1()"
                            fit="contain"
                          ></el-image></center>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center">
                        <template slot="label">
                            签名<br/>Signature
                    </template>
                    <center>
                    <jereh-button  v-if="!customerService.sig4" @click="sign('receiverSign')">请签名</jereh-button>
                    <el-image
                            v-if="customerService.sig4"
                            class="ml-2"
                            style="width: 150px; height: 80px;"
                            :src="customerService.sig4"
                            @click="changeSign2()"
                            fit="contain"
                          ></el-image>
                        </center>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 40%" >
                        <template slot="label">
                            验收日期<br/>Delivery Date
                    </template>
                    <div>
                        <div v-if="flag"><el-date-picker
                        v-model="customerService.supplierDate"
                        type="date"
                        @blur="changeType"
                        placeholder="选择日期">
                        </el-date-picker>
                        </div>
                        <div v-if="!flag" @click="changeType" style="text-align:center">
                            {{formatDate(customerService.supplierDate)}}
                        </div>
                    </div>
                    </el-descriptions-item>
                    <el-descriptions-item labelStyle="width: 10%;text-align:center" contentStyle="width: 40%">
                        <template slot="label">
                            验收日期<br/>Delivery Date
                    </template>
                    <div>
                        <div v-if="flag1" ><el-date-picker
                        v-model="customerService.clientDate"
                        type="date"
                        @blur="changeType1"
                        placeholder="选择日期">
                        </el-date-picker>
                        </div>
                        <div v-if="!flag1" @click="changeType1" style="text-align:center">
                            {{formatDate(customerService.clientDate)}}
                        </div>
                    </div>
                    </el-descriptions-item>
                </el-descriptions>
          </div>
        </el-form></el-col>
        <el-col :span="1"><div><font style="color:white;">.</font></div></el-col>
      </el-row>
        </el-dialog>
        <el-dialog title="电子签名" :visible.sync="signatureVisible">
      <vueSignature ref="signature" :w="'100%'" :h="'400px'" :sigOption="signOption"></vueSignature>
      <div slot="footer" class="dialog-footer">
        <jereh-button  @click="clear">清空</jereh-button>
        <jereh-button @click="save">确认</jereh-button>
      </div>
    </el-dialog>
    </div>

    </template>
    <script>
    import vueSignature from 'vue-signature'
    import {getPdf} from '../../../../utils/exportPdf'
    import moment from "moment";
    import logo from '@/assets/logo/logo1.png'
    import { saveDetailObject} from '../../../../api/cmms/sdDeviceDeliver'
    export default {
      name: 'customerForm',
      components: {
    vueSignature,
  },
      props: {
        dialogTableVisible: {
          type: Boolean,
        },
        customerService:{
            type:Object,
            default: () =>{
                return {
                    isSave:1,
                    acceptanceEvaluation:{
                        customerServiceOrderList:[{
                            customerName:null
                        }]
                    }
                }
            }
        },
        deviceId:{
            type:String
        },
        saveable: {
            type: Boolean,
            default: false
        }
      },
      data() {
        return {
            index:1,
           dialogTableVisibleCheck:false,
           logo,
           flag:false,
           flag1:false,
           flag2:false,
           flag3:false,
           flag4:false,
           flag5:false,
           flag6:false,
           flag7:false,
           signatureVisible:false,
       signField:"",
       signField: '',
       signOption: {
        penColor: 'rgb(0, 0, 0)',//画笔颜色
        backgroundColor: 'rgb(245,245,245)'//背景颜色
      },
           options: ['交付Delivery','保内服务Warranty service ','保外服务Out-warranty service','维修改造MRO','技术培训Technical Training','租赁服务Rental','其他Others'],
        }
      },
      watch:{
        dialogTableVisible(newValue,oldValue){
          this.dialogTableVisibleCheck=newValue
       }
      },
      methods: {
        changeSign1(){
      if (this.customerService.isSave == 0) {
        return
      }
      this.sign('handoverSign')
    },
    changeSign2(){
      if (this.customerService.isSave == 0) {
        return
      }
      this.sign('receiverSign')
    },
    clear() {
      this.$refs.signature.clear()
    },
    sign(type) {
      this.signatureVisible = true
      this.signField = type
    },
    save() {
      var png = this.$refs.signature.save()
      if (this.signField === 'handoverSign') {
        this.customerService.sig3= png
      }
      if (this.signField === 'receiverSign') {
        this.customerService.sig4 = png
      }
      this.signatureVisible = false
      this.$refs.signature.clear()
    },
        shareData(){
            this.$emit('showDate',2)
        },
        formate(date){
        return moment(date).format('YYYY-MM-DD')
    },
    exportPDF(){
            getPdf('客户服务单'+this.formate(new Date()),'exportHtml'); 
    },
        checkServiceBgnTime() {
          let startTime = new Date(this.customerService.serviceStartTime)
          let endTime = new Date(this.customerService.serviceEndTime)
          if (startTime > endTime) {
            this.$message.error('服务开始时间需要小于服务完毕时间')
            this.customerService.serviceStartTime=''
          }
        },
        checkServiceEndTime() {
          let endTime = new Date(this.customerService.serviceEndTime)
          let startTime = new Date(this.customerService.serviceStartTime)
          if (startTime > endTime) {
            this.$message.error('服务完毕时间需要大于服务开始时间')
            this.customerService.serviceEndTime = ''
          }
        },
        closeDilog(){
        this.flag=false,
        this.flag1=false,
        this.flag2=false,
        this.flag3=false,
        this.flag4=false,
        this.flag5=false,
        this.flag6=false,
        this.$emit('closeDilog1',false)
        },
        changeType(){
            if(this.customerService.isSave==0){
                return
            }
           if(this.customerService.supplierDate==null||this.customerService.supplierDate==''){
            this.flag=true
           }
           else{
            this.flag=!this.flag
           }
        },
        formatDate(date){
            return moment(date).format("YYYY-MM-DD");
        },
        changeType1(){
            if(this.customerService.isSave==0){
                return
            }
           if(this.customerService.clientDate==null||this.customerService.clientDate==''){
            this.flag1=true
           }
           else{
            this.flag1=!this.flag1
           }
        },
        changeType2(data){
            if(this.customerService.isSave==0){
                return
            }
            if(data==null||data==''){
            this.flag2=true
           }
           else{
            this.flag2=!this.flag2
           }
        },
        changeType3(data){
            if(this.customerService.isSave==0){
                return
            }
            if(data==null||data==''){
            this.flag3=true
           }
           else{
            this.flag3=!this.flag3
           }
        },
        changeType4(data){
            if(this.customerService.isSave==0){
                return
            }
            if(data==null||data==''){
            this.flag4=true
           }
           else{
            this.flag4=!this.flag4
           }
        },
        changeSelect(){
            if(this.customerService.isSave==0){
                return
            }
            if(this.checkFormDetail.supplier==null||this.checkFormDetail.supplier==''){
            this.flag4=true
           }
           else{
            this.flag4=!this.flag4
            console.log(this.flag4)
           }
        },
        changeTextArea(){
            if(this.customerService.isSave==0){
                return
            }
            if(this.customerService.serviceDescription==null||this.customerService.serviceDescription==''){
            this.customerService.serviceDescription="N/A"
            this.flag5=!this.flag5
           }
           else{
            this.flag5=!this.flag5
           }
        },
        changeTextArea1(){
            if(this.customerService.isSave==0){
                return
            }
            if(this.customerService.serviceResult==null||this.customerService.serviceResult==''){
            this.customerService.serviceResult="N/A"
            this.flag6=!this.flag6
           }
           else{
            this.flag6=!this.flag6
           }
        },
        changeTextArea2(){
            if(this.customerService.isSave==0){
                return
            }
            if(this.customerService.remark1==null||this.customerService.remark1==''){
            this.customerService.remark1="N/A"
            this.flag7=!this.flag7
           }
           else{
            this.flag7=!this.flag7
           }
        },
        save1(){
            if(this.customerService.sig3==""||this.customerService.sig3==null||this.customerService.sig4==""||this.customerService.sig4==null){
               this.$message.error('请完成电子签名')
               return;
            }
            if(this.customerService.serviceType==""||this.customerService.serviceType==null){
                this.$message.error('请选择服务类型')
               return;
            }
            this.$modal.confirm('保存后不可修改，确认保存吗？').then(() => {
            const data={
                customerService:this.customerService,
                deviceId : this.deviceId,
                statementType :2
            }
            saveDetailObject(data).then(res=>{
               if(res.code==200){
                this.$modal.msgSuccess('保存成功')
                this.customerService.isSave=0
                this.flag=false,
                this.flag1=false,
                this.flag2=false,
                this.flag3=false,
                this.flag4=false,
                this.flag5=false,
                this.flag6=false
                this.$emit('addDeliveryId',this.customerService.checkNumbers)
               }
               else if(res.code==403){
                this.$message.error('您没有保存权限，请联系管理员授权')
               }
               else{
                this.$message.error('保存失败，请稍后重试')
               }
            })
            
        })
        },
      }
    }
    </script>
<style>
    #el-table {
      table-layout: fixed;
      }
    </style>