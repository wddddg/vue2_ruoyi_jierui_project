<template>
<div >
    <el-dialog title="产品验收单" :visible.sync="dialogTableVisibleCheck" width="70%" @close="closeDilog" :close-on-click-modal="false" >
        <el-row :gutter="10" class="mb-2">
            <el-col :span="1.5">
                <jereh-button @click="save1()" v-if="checkFormDetail.isSave==1" :disabled="saveable">保存</jereh-button>
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
          <el-col :span="22"><el-form ref="form"  >
            <div style="height:10%">
            <font style="color:white;">.</font></div>
            <div style="border:1px solid #EBEEF5">
            <el-row>
            <el-col :span="4">
              <img  :src="logo" style="width:60%;height:35%"/>
            </el-col>
            <el-col :span="16">
            <div style="text-align: center">产品交付验收单<br/>Equipment Acceptance Certificate</div>
            </el-col>
            </el-row>
            </div>
            <el-descriptions class="margin-top"   :column="2"   border>
                <el-descriptions-item labelStyle="width: 11.3%;text-align:center">
                <template slot="label">
                    <div style="text-align:center ;">编号/code:</div>
                </template>
                {{checkFormDetail.code}}
                </el-descriptions-item>
                <el-descriptions-item labelStyle="width: 11%;text-align:center" contentStyle="width: 11.2%">
                <template slot="label">
                    验收单号:
                </template>
                {{checkFormDetail.checkNumbers}}
                </el-descriptions-item>
            </el-descriptions>
            <el-table
              border
              style="width:100% ;"
              :data="checkFormDetail.acceptanceEvaluation.bindProjectList"
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
              }"
            >
                <el-table-column prop="index" >
                    <template slot="header" >
                    序号<br/>Items
                </template>
                </el-table-column>
                <el-table-column prop="projectItem"   >
                    <template slot="header">
                        项目编码<br/>Project No
                    </template>
                </el-table-column>
                <el-table-column prop="chassisCode"  >
                    <template slot="header">
                    底盘VIN码<br/>VIN
                    </template>
                </el-table-column>
                <el-table-column prop="productCode"  >
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
                <el-table-column prop="deviceNo"  >
                    <template slot="header">
                    数量<br/>Qty
                    </template>
                    <template slot-scope="scope">
                        <div v-if="scope.row.deviceNo==null||scope.row.deviceNo==''">1台</div>
                        <div v-if="!(scope.row.deviceNo==null||scope.row.deviceNo=='')">{{scope.row.deviceNo}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="checkTime"   >
                    <template slot="header">
                    验收日期<br/>Delivery Date
                    </template>
                    <template slot-scope="scope">
                        <div v-if="flag2">
                        <el-date-picker
                        v-model="scope.row.checkTime"
                        type="date"
                        width="80%"
                        @blur="changeType2(scope.row.checkTime)"
                        @change="changeFirstTrainingStartTime($event,scope.$index)"
                        placeholder="选择日期">
                        </el-date-picker>
                        </div>
                        <div v-if="!flag2" @click="changeType2">
                        {{formatDate(scope.row.checkTime)}}
                    </div>
                    </template>
                </el-table-column>
                <el-table-column prop="warrantyTime"  >
                    <template slot="header">
                    质保终止日期<br/>Warranty End Date
                    </template>
                    <template slot-scope="scope">
                        <div v-if="flag3">
                        <el-date-picker
                        v-model="scope.row.warrantyTime"
                        style="width:80%"
                        type="date"
                        @blur="changeType3(scope.row.warrantyTime)"
                        @change="changeFirstTrainingEndTime($event,scope.$index)"
                        placeholder="选择日期">
                        </el-date-picker>
                        </div>
                        <div v-if="!flag3" @click="changeType3">
                        {{formatDate(scope.row.warrantyTime)}}
                    </div>
                    </template></el-table-column>

            </el-table>
            <el-descriptions class="margin-top"  :column="1" border>
                <el-descriptions-item labelStyle="width: 11.3%;text-align:center">
                <template slot="label">
                    验收结论<br/>Acceptance Conclusion
                </template>
                    <div style="text-align:center ;" v-if="flag5">
                    <el-input
                    type="textarea"
                    :rows="4"
                    style=""
                    placeholder="N/A"
                    v-model="checkFormDetail.acceptanceConclusion"
                    @blur="changeTextArea()"
                    >
                                    </el-input>
                    </div>
                    <div v-if="!flag5" @click="changeTextArea()" style="text-align:center ;" v-html="checkFormDetail.acceptanceConclusion"></div>
                </el-descriptions-item>
                <el-descriptions-item labelStyle="width: 11.3%;text-align:center">
                <template slot="label">
                    备注<br/>Remarks
                </template>
                <div style="text-align:center ;" v-if="flag6">
                <el-input
                    type="textarea"
                    :rows="2"
                    @blur="changeTextArea1()"
                    placeholder="N/A"
                    v-model="checkFormDetail.remark">
                </el-input>
                </div>
                <div v-if="!flag6" @click="changeTextArea1()" style="text-align:center ;" v-html="checkFormDetail.remark"></div>
            </el-descriptions-item>
                <el-descriptions-item labelStyle="width: 11.3%;text-align:center">
                <template slot="label">
                    质保条款<br/>Warranty Clause
                </template>
                <div style="text-align:center ;" v-if="flagg">
                <el-input
                    type="textarea"
                    :rows="3"
                    @blur="changeTextArea2()"
                    placeholder="N/A"
                    v-model="checkFormDetail.warrantyClause">
                </el-input>
                </div>
                <div v-if="!flagg" @click="changeTextArea2()" style="text-align:center ;" v-html="checkFormDetail.warrantyClause"></div>
        </el-descriptions-item>
            </el-descriptions>
            <el-descriptions  :column="2"  border>
                <el-descriptions-item labelStyle="width: 11.3%;text-align:center" contentStyle="width: 40%">
                <template slot="label">
                    供方<br/>Supplier
                </template>
                <div v-if="flag4" style="text-align:center ;">
                    <el-select v-model="checkFormDetail.supplier" clearable placeholder="请选择" @change="changeSelect()" size="small" style="width:40%">
                        <el-option
                        v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
              </div>
              <div  v-if="!flag4" @click="changeSelect" style="text-align:center;" v-html="checkFormDetail.supplier" ></div>
            </el-descriptions-item>
                <el-descriptions-item labelStyle="width: 11.5%;text-align:center" contentStyle="width: 40%">
                    <template slot="label">
                    客户<br/>Customer
                </template>
                <div style="text-align:center">{{checkFormDetail.acceptanceEvaluation.bindProjectList[0].customerName}}</div>
                </el-descriptions-item>
                <el-descriptions-item labelStyle="width: 11.3%;text-align:center">
                <template slot="label">
                        签名<br/>Signature
                </template>
                <center>
                <jereh-button  v-if="!checkFormDetail.sig1" @click="sign('handoverSign')">请签名</jereh-button>
                <el-image
                        v-if="checkFormDetail.sig1"
                        class="ml-2"
                        style="width: 40%; height: 18%;"
                        :src="checkFormDetail.sig1"
                        @click="changeSign1()"
                        fit="contain"
                      ></el-image></center>
                </el-descriptions-item>
                <el-descriptions-item labelStyle="width: 11.3%;text-align:center">
                <template slot="label">
                        签名<br/>Signature
                </template>
                <center>
                <jereh-button  v-if="!checkFormDetail.sig2" @click="sign('receiverSign')">请签名</jereh-button>
                <el-image
                        v-if="checkFormDetail.sig2"
                        class="ml-2"
                        style="width: 40%; height: 18%;"
                        :src="checkFormDetail.sig2"
                        @click="changeSign2()"
                        fit="contain"
                      ></el-image>
                    </center>
                </el-descriptions-item>
                <el-descriptions-item labelStyle="width: 11.3%;text-align:center" contentStyle="width: 40%">
                    <template slot="label">
                        验收日期<br/>Delivery Date
                </template>
                <div>
                    <div v-if="flag"><el-date-picker
                    v-model="checkFormDetail.supplierDate"
                    type="date"
                    @blur="changeType"
                    placeholder="选择日期">
                    </el-date-picker>
                    </div>
                    <div v-if="!flag" @click="changeType" style="text-align:center">
                        {{formatDate(checkFormDetail.supplierDate)}}
                    </div>
                </div>
                </el-descriptions-item>
                <el-descriptions-item labelStyle="width: 11.3%;text-align:center" contentStyle="width: 40%">
                    <template slot="label">
                        验收日期<br/>Delivery Date
                </template>
                <div>
                    <div v-if="flag1" ><el-date-picker
                    v-model="checkFormDetail.clientDate"
                    type="date"
                    @blur="changeType1"
                    placeholder="选择日期">
                    </el-date-picker>
                    </div>
                    <div v-if="!flag1" @click="changeType1" style="text-align:center">
                        {{formatDate(checkFormDetail.clientDate)}}
                    </div>
                </div>
                </el-descriptions-item>
            </el-descriptions>
        </el-form>
</el-col>
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
import moment from 'moment'
import vueSignature from 'vue-signature'
import logo from '@/assets/logo/logo1.png'
import { saveDetailObject } from '../../../../api/cmms/sdDeviceDeliver'
import {getPdf} from '../../../../utils/exportPdf'
export default {
  name: 'checkForm',
  components: {
    vueSignature,
  },
  props: {
    dialogTableVisible: {
      type: Boolean
    },
    checkFormDetail: {
      type: Object,
      default: () => {
        return{
          isSave:1,
      acceptanceEvaluation:{
          bindProjectList:[{
            customerName:null
          }]
      }
      }
    }
    },
    deviceId: {
      type: String
    },
    saveable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
       logo,
       dialogTableVisibleCheck:false,
       flag:false,
       flag1:false,
       flag2:false,
       flag3:false,
       flag4:false,
       flag5:false,
       flag6:false,
       signatureVisible:false,
       signField:"",
       signField: '',
       signOption: {
        penColor: 'rgb(0, 0, 0)',//画笔颜色
        backgroundColor: 'rgb(245,245,245)'//背景颜色
      },
       flagg:false,
         options: [{
          value: '烟台杰瑞石油装备技术有限公司<br/>Yantai Jereh Petroleum Equipment & Technologies Co.',
          label: '烟台杰瑞石油装备技术有限公司Yantai Jereh Petroleum Equipment & Technologies Co.'
        }, {
          value: '烟台杰瑞石油服务集团股份有限公司<br/>Yantai Jereh Oilfield Services Group Co., Ltd',
          label: '烟台杰瑞石油服务集团股份有限公司Yantai Jereh Oilfield Services Group Co., Ltd',
        }],
    }
  },
  watch:{
    dialogTableVisible(newValue,oldValue){
    this.dialogTableVisibleCheck=newValue
    }
  },
  methods: {
    changeSign1(){
      if (this.checkFormDetail.isSave == 0) {
        return
      }
      this.sign('handoverSign')
    },
    changeSign2(){
      if (this.checkFormDetail.isSave == 0) {
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
        this.checkFormDetail.sig1 = png
      }
      if (this.signField === 'receiverSign') {
        this.checkFormDetail.sig2 = png
      }
      this.signatureVisible = false
      this.$refs.signature.clear()
    },
    shareData(){
      this.$emit('checkData',1)
    },
    formate(date){
        return moment(date).format('YYYY-MM-DD')
    },
    exportPDF(){
            getPdf('产品验收单'+this.formate(new Date()),'exportHtml');
    },
    changeFirstTrainingStartTime(data, index) {
      let startTime = new Date(data)
      let endTime = new Date(this.checkFormDetail.acceptanceEvaluation.bindProjectList[index].warrantyTime)
      if (startTime > endTime) {
        this.$message.error('验收日期需要小于质保终止日期')
        this.checkFormDetail.acceptanceEvaluation.bindProjectList[index].checkTime = ''
      }
    },
    changeFirstTrainingEndTime(data, index) {
      let endTime = new Date(data)
      let startTime = new Date(this.checkFormDetail.acceptanceEvaluation.bindProjectList[index].checkTime)
      if (startTime > endTime) {
        this.$message.error('质保终止日期需要大于验收日期')
        this.checkFormDetail.acceptanceEvaluation.bindProjectList[index].warrantyTime = ''
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
    this.flagg=false,
    this.$emit('closeDilog',this.dialogTableVisibleCheck)
    },
    changeType() {
      if (this.checkFormDetail.isSave == 0) {
        return
      }
      if (this.checkFormDetail.supplierDate == null || this.checkFormDetail.supplierDate == '') {
        this.flag = true
      } else {
        this.flag = !this.flag
      }
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    changeType1() {
      if (this.checkFormDetail.isSave == 0) {
        return
      }
      if (this.checkFormDetail.clientDate == null || this.checkFormDetail.clientDate == '') {
        this.flag1 = true
      } else {
        this.flag1 = !this.flag1
      }
    },
    changeType2(data) {
      if (this.checkFormDetail.isSave == 0) {
        return
      }
      if (data == null || data == '') {
        this.flag2 = true
      } else {
        this.flag2 = !this.flag2
      }
    },
    changeType3(data) {
      if (this.checkFormDetail.isSave == 0) {
        return
      }
      if (data == null || data == '') {
        this.flag3 = true
      } else {
        this.flag3 = !this.flag3
      }
    },
    changeSelect() {
      if (this.checkFormDetail.isSave == 0) {
        return
      }
      if (this.checkFormDetail.supplier == null || this.checkFormDetail.supplier == '') {
        this.flag4 = true
      } else {
        this.flag4 = !this.flag4
        console.log(this.flag4)
      }
    },
    changeTextArea() {
      if (this.checkFormDetail.isSave == 0) {
        return
      }
      if (this.checkFormDetail.acceptanceConclusion == null || this.checkFormDetail.acceptanceConclusion == '') {
        this.checkFormDetail.acceptanceConclusion = 'N/A'
        this.flag5 = !this.flag5
      } else {
        this.flag5 = !this.flag5
      }
    },
    changeTextArea1() {
      if (this.checkFormDetail.isSave == 0) {
        return
      }
      if (this.checkFormDetail.remark == null || this.checkFormDetail.remark == '') {
        this.checkFormDetail.remark = 'N/A'
        this.flag6 = !this.flag6
      } else {
        this.flag6 = !this.flag6
      }
    },
    changeTextArea2(){
        if(this.checkFormDetail.isSave==0){
            return
        }
        if(this.checkFormDetail.warrantyClause==""||this.checkFormDetail.warrantyClause==null){
            this.checkFormDetail.warrantyClause="N/A"
            this.flagg=!this.flagg
        }
       else{
        this.flagg=!this.flagg
       }
    },
    save1(){
      if (this.checkFormDetail.sig1==""||this.checkFormDetail.sig1==null||this.checkFormDetail.sig2==""||this.checkFormDetail.sig2==null) {
        this.$message.error('请完成电子签名')
        return;
      }
      if (this.checkFormDetail.supplier == null || this.checkFormDetail.supplier == '') {
        this.$message.error('请选择供方！')
        return;
      }
      let flag = true;
      this.checkFormDetail.acceptanceEvaluation.bindProjectList.forEach(e => {
        if (e.checkTime==""||e.checkTime==null||e.warrantyTime==""||e.warrantyTime==null) {
          this.$message.error('请完善日期选择')
          flag = false
        }
      })
      if(!flag){
        return
      }
      this.$modal.confirm('保存后不可修改，确认保存吗？').then(() => {
        const data={
          checkFormDetail:this.checkFormDetail,
          deviceId : this.deviceId,
          statementType :1
        }
        saveDetailObject(data).then(res=>{
          if(res.code==200){
            this.$modal.msgSuccess('保存成功')
            this.checkFormDetail.isSave=0
            this.flag=false,
            this.flag1=false,
            this.flag2=false,
            this.flag3=false,
            this.flag4=false,
            this.flag5=false,
            this.flag6=false
            this.flagg=false
            this.$emit('addCheckTime', this.checkFormDetail.acceptanceEvaluation.bindProjectList)
            this.$emit('addCheckId', this.checkFormDetail.checkNumbers)
          } else if (res.code==403) {
            this.$message.error('您没有保存权限，请联系管理员授权')
          } else {
            this.$message.error('保存失败，请稍后重试')
          }
        })
      })    
    }
  }
}
</script>
<style scoped>
.my-label {
  background: #E1F3D8;
  border: 0px;
}
</style>
