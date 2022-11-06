<template>
  <div>
    <div style="margin-bottom: 10px">
      <jereh-button type="primary" plain size="small" @click="handleClick()">详细信息</jereh-button>
    </div>
    <el-table border fit :data="deviceHistory" height="36vh" :header-cell-style="{ background: '#eef1f8'}">
      <el-table-column label="序号" align="center" type="index" width="55"> </el-table-column>
      <el-table-column label="创建人" align="center" prop="createBy" />
      <el-table-column label="修改人" align="center" prop="updateBy" />
      <el-table-column label="审核人" align="center" prop="auditPerson" />
      <el-table-column label="审核结果" align="center" prop="deviceState">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.device_state_audit"
            :value="scope.row.deviceState"
          />
        </template>
      </el-table-column>
      <el-table-column label="审核意见" align="center" prop="remark">
      </el-table-column>
      <el-table-column label="审核时间" align="center" prop="auditDate">
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.updateTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="justify-end">
      <Pagination
        v-show="deviceHistoryTotal > 0"
        :total="deviceHistoryTotal"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getDeviceHistoryList"
      />
    </div>
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      title="审批记录详细信息"
      width="80%"
      @close="handleClose"
    >
      <div v-loading="dialogLoading">
        <el-table border fit :data="deviceHistory" height="60vh" :header-cell-style="{ background: '#eef1f8'}">
          <el-table-column label="序号" type="index" width="50" fixed />
          <el-table-column
            label="产品品牌"
            align="center"
            prop="productBrand"
            width="150"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.product_brand"
                :value="scope.row.productBrand"
                :style="{ color: isSame('productBrand', scope.$index) ? '' : 'red',}"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="产品名称"
            align="center"
            prop="productName"
            width="120"
            fixed
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('productName', scope.$index) ? '' : 'red',}">
                {{ scope.row.productName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="车牌号"
            align="center"
            prop="licensePlateCode"
            width="150"
            fixed
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('licensePlateCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.licensePlateCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="出厂日期"
            align="center"
            prop="exfactoryDate"
            width="180"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('exfactoryDate', scope.$index) ? '' : 'red',}">
                {{ parseTime(scope.row.exfactoryDate, "{y}-{m}-{d}") }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目编码"
            align="center"
            prop="projectCode"
            width="120"
            fixed
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('projectCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.projectCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目编码分项"
            align="center"
            prop="projectItem"
            width="120"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('projectItem', scope.$index) ? '' : 'red',}">
                {{ scope.row.projectItem }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="原项目编码分项"
            align="center"
            prop="oldProjectItem"
            width="120"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('oldProjectItem', scope.$index) ? '' : 'red',}">
                {{ scope.row.oldProjectItem }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="产品编号"
            align="center"
            prop="productCode"
            width="120"
            fixed
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('productCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.productCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="原产品编号"
            align="center"
            prop="productCode"
            width="120"
            fixed
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('oldProductCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.oldProductCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="售后区域"
            align="center"
            prop="afterSaleArea"
            width="120"
            fixed
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.after_sale_area"
                :value="scope.row.afterSaleArea"
                :style="{ color: isSame('afterSaleArea', scope.$index) ? '' : 'red',}"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="市场区域"
            align="center"
            prop="deviceArea"
            width="120"
            fixed
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('deviceArea', scope.$index) ? '' : 'red',}">
                {{ scope.row.deviceArea }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="底盘VIN码"
            align="center"
            prop="chassisCode"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('chassisCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.chassisCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="产品型号"
            align="center"
            prop="productType"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('productType', scope.$index) ? '' : 'red',}">
                {{ scope.row.productType }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户资产编号"
            align="center"
            prop="cusMonCode"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('cusMonCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.cusMonCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="设备状态"
            align="center"
            prop="deviceDeliveryState"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('deviceDeliveryState', scope.$index) ? '' : 'red',}">
                {{ scope.row.deviceDeliveryState }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="设备全生命周期"
            align="center"
            prop="equLifeCycle"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('equLifeCycle', scope.$index) ? '' : 'red',}">
                {{ scope.row.equLifeCycle }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="产品线"
            align="center"
            prop="productLine"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('productLine', scope.$index) ? '' : 'red',}">
                {{ scope.row.productLine }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="机械负责人"
            align="center"
            prop="rdDirector"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('rdDirector', scope.$index) ? '' : 'red',}">
                {{ scope.row.rdDirector }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="电气负责人"
            align="center"
            prop="elePerson"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('elePerson', scope.$index) ? '' : 'red',}">
                {{ scope.row.elePerson }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="液压负责人"
            align="center"
            prop="waterPerson"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('waterPerson', scope.$index) ? '' : 'red',}">
                {{ scope.row.waterPerson }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="测试负责人"
            align="center"
            prop="tester"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('tester', scope.$index) ? '' : 'red',}">
                {{ scope.row.tester }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目类别"
            align="center"
            prop="projectType"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('projectType', scope.$index) ? '' : 'red',}">
                {{ scope.row.projectType }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="(装备)报验完工流程单号"
            align="center"
            prop="completeInspectionCode"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('completeInspectionCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.completeInspectionCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目评审申请流程单号"
            align="center"
            prop="projectReviewCode"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('projectReviewCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.projectReviewCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="技术协议解读流程单号"
            align="center"
            prop="tecReq"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('tecReq', scope.$index) ? '' : 'red',}">
                {{ scope.row.tecReq }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="(装备)项目计划变更流程单号"
            align="center"
            prop="planReq"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('planReq', scope.$index) ? '' : 'red',}">
                {{ scope.row.planReq }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="(装备)设备出厂流程单号"
            align="center"
            prop="deviceOutCode"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('deviceOutCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.deviceOutCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="交付服务流程单号"
            align="center"
            prop="deliveryProcessCode"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('deliveryProcessCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.deliveryProcessCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="产品总图号"
            align="center"
            prop="proTonum"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('proTonum', scope.$index) ? '' : 'red',}">
                {{ scope.row.proTonum }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="售后区域经理"
            align="center"
            prop="afterSaleDirector"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('afterSaleDirector', scope.$index) ? '' : 'red',}">
                {{ scope.row.afterSaleDirector }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="交付负责人"
            align="center"
            prop="deliveryDirector"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('deliveryDirector', scope.$index) ? '' : 'red',}">
                {{ scope.row.deliveryDirector }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="协助交付人"
            align="center"
            prop="helpPerson"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('helpPerson', scope.$index) ? '' : 'red',}">
                {{ scope.row.helpPerson }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="服务管家"
            align="center"
            prop="serviceButler"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('serviceButler', scope.$index) ? '' : 'red',}">
                {{ scope.row.serviceButler }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="交付地点"
            align="center"
            prop="deliveryLocation"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('deliveryLocation', scope.$index) ? '' : 'red',}">
                {{ scope.row.deliveryLocation }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="验收日期"
            align="center"
            prop="deliveryDate"
            width="180"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('deliveryDate', scope.$index) ? '' : 'red',}">
                {{ parseTime(scope.row.deliveryDate, "{y}-{m}-{d}") }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="质保终止日期"
            align="center"
            prop="expirationDate"
            width="180"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('expirationDate', scope.$index) ? '' : 'red',}">
                {{ parseTime(scope.row.expirationDate, "{y}-{m}-{d}") }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="质保条款"
            align="center"
            prop="qualityItem"
            width="180"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('qualityItem', scope.$index) ? '' : 'red',}">
                {{ scope.row.qualityItem }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="市场所属区域"
            align="center"
            prop="marketerArea"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('marketerArea', scope.$index) ? '' : 'red',}">
                {{ scope.row.marketerArea }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="市场负责人"
            align="center"
            prop="maketDirector"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('maketDirector', scope.$index) ? '' : 'red',}">
                {{ scope.row.maketDirector }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="市场经理"
            align="center"
            prop="markerMag"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('markerMag', scope.$index) ? '' : 'red',}">
                {{ scope.row.markerMag }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户名称"
            align="center"
            prop="customerName"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('customerName', scope.$index) ? '' : 'red',}">
                {{ scope.row.customerName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户类型"
            align="center"
            prop="customerType"
            width="150"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.sys_customer_type"
                :value="scope.row.customerType"
                :style="{ color: isSame('customerType', scope.$index) ? '' : 'red',}"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="客户代码"
            align="center"
            prop="customerCode"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('customerCode', scope.$index) ? '' : 'red',}">
                {{ scope.row.customerCode }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户下属单位名称"
            align="center"
            prop="customerUntilName"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('customerUntilName', scope.$index) ? '' : 'red',}">
                {{ scope.row.customerUntilName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户联系人"
            align="center"
            prop="contactPerson"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('contactPerson', scope.$index) ? '' : 'red',}">
                {{ scope.row.contactPerson }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户联系方式"
            align="center"
            prop="contactPhone"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('contactPhone', scope.$index) ? '' : 'red',}">
                {{ scope.row.contactPhone }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户联系人职务"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('customerPosition', scope.$index) ? '' : 'red',}">
                {{ scope.row.customerPosition }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户联系人性别"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('customerSex', scope.$index) ? '' : 'red',}">
                {{ scope.row.customerSex }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户联系人出生日期"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('customerBirthTime', scope.$index) ? '' : 'red',}">
                {{ scope.row.customerBirthTime }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户联系人年龄"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('customerAge', scope.$index) ? '' : 'red',}">
                {{ scope.row.customerAge }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户联系人爱好"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('customerBoddy', scope.$index) ? '' : 'red',}">
                {{ scope.row.customerBoddy }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否主要联系人"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('customerIsMain', scope.$index) ? '' : 'red',}">
                {{ scope.row.customerIsMain }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="CAD图纸下发流程单号"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('cadDrawingIssuance', scope.$index) ? '' : 'red',}">
                {{ scope.row.cadDrawingIssuance }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否接入Iot"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('isConnectIot', scope.$index) ? '' : 'red',}">
                {{ scope.row.isConnectIot }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="设备照片"
            align="center"
            prop="equipPic"
            width="100"
          >
            <template slot-scope="scope">
              <image-preview
                :src="scope.row.equipPic"
                :width="50"
                :height="50"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="是否是杰瑞设备"
            align="center"
            prop="jerehDevice"
            width="150"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.jereh_device"
                :value="scope.row.jerehDevice"
                :style="{ color: isSame('jerehDevice', scope.$index) ? '' : 'red',}"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="审核状态"
            align="center"
            prop="deviceState"
            width="150"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.device_state_audit"
                :value="scope.row.deviceState"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="审核意见"
            align="center"
            prop="remark"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核人"
            align="center"
            prop="auditPerson"
            width="150"
          >
          </el-table-column>
          <el-table-column
            label="审核时间"
            align="center"
            prop="updateTime"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-for="item in nameplateList"
            :key="item.nameplateId"
            :label="item.nameplateName"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <span :style="{ color: isNameplateSame(item.nameplateName, scope.$index) ? '' : 'red',}">
                {{ getNameplateValue(item.nameplateName, scope.row) }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceHistory, productMappings } from "@/api/cmms/device.js";
import { getDicts } from '@/api/system/dict/data.js';

export default {
  dicts: [
    "jereh_device",
    "device_state",
    "device_state_audit",
    "component_name",
    "stage_engine_brand",
    "stage_gearbox_brand",
    "piston_pump_manufacturer",
    "injection_head_brand",
    "customer_mark",
    "after_sale_area",
    "device_area",
    "product_brand",
    "marketer_area",
    "chassis_brand",
    "product_name",
    "nameplate_info"
  ],
  name: "projectInformation",
  props: {
    deviceData: {
      required: true,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      // 控制弹出框显示隐藏
      showDialog: false,
      deviceHistoryTotal: 0,
      queryParams: {
        id: this.deviceData.id,
        pageNum: 1,
        pageSize: 10,
      },
      deviceHistory: [],
      dialogLoading: false,
      detailList: [],
      detailParams: {
        id: this.deviceData.id,
        pageNum: 1,
        pageSize: 10,
      },
      detailTotal: 0,
      nameplateList: [],
      productNameList: [],
      nameplateMap: []
    };
  },
  created() {
    this.getDeviceHistoryList();
    this.getProductName();
  },
  methods: {
    print(val) {},
    // 弹出框关闭后触发
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("changeShow", "false");
    },
    isSame(key, index) {
      if (this.deviceHistory.length === index + 1) {
        return true
      }
      if (this.deviceHistory.length && this.deviceHistory.length > (index + 1) ) {
        if (this.deviceHistory[index][key] === this.deviceHistory[index + 1][key]) {
          return true
        }
      }
      return false
    },
    getDeviceHistoryList() {
      getDeviceHistory(this.queryParams).then((res) => {
        this.deviceHistory = res.data.records;
        console.log(this.deviceHistory)
        this.deviceHistoryTotal = res.data.total;
        if (this.deviceHistory.length) {
          this.deviceHistory.forEach(item => {
            const mainPerson = this.getMainPerson(item)
            console.log(mainPerson)
            if (mainPerson) {
              item.contactPerson = mainPerson.customerName
              item.contactPhone = mainPerson.customerPhone
              item.customerPosition = mainPerson.customerPosition
              item.customerSex = mainPerson.customerSex
              item.customerBirthTime = mainPerson.customerBirthTime
              item.customerAge = mainPerson.customerAge
              item.customerBoddy = mainPerson.customerBoddy
              item.customerIsMain = mainPerson.customerIsMain
            }
          })
        }

      });
    },
    handleClick() {
      this.showDialog = true;
      this.getDetailList();
    },
    getDetailList() {
      this.dialogLoading = true
      getDeviceHistory(this.detailParams).then((res) => {
        this.deviceList = res.data.records;
        this.deviceHistoryTotal = res.data.total;
        if (this.deviceList.length) {
          this.deviceList.forEach(item => {
            const mainPerson = this.getMainPerson(item)
            if (mainPerson) {
              item.contactPerson = mainPerson.customerName
              item.contactPhone = mainPerson.customerPhone
            }
          })
        }
        this.dialogLoading = false;
      });
    },
    getMainPerson(row) {
      if (row.customerBasicList && row.customerBasicList.length) {
        const index = row.customerBasicList.findIndex(item => item.customerIsMain === "Y")
        return index !== -1 ? row.customerBasicList[index] : row.customerBasicList[0]
      }
      return null
    },
    getProductName() {
      getDicts("product_name").then(res => {
        this.productNameList = res.data
        this.getNameplateMap()
      })
    },
    getNameplateMap() {
      getDicts("nameplate_info").then(res => {
        this.nameplateMap = res.data
        this.getNameplateInfo()
      })
    },
    getNameplateInfo() {
      const productNameList = this.productNameList;
      if (Array.isArray(productNameList) && productNameList.length) {
        const dictItem = productNameList.find((item) => item.dictValue === this.deviceData.productName);
        const dictCode = dictItem ? dictItem.dictCode : null;
        if (dictCode) {
          this.getConfigurationInfo(dictCode);
        }
      }
    },
    getConfigurationInfo(dictCode) {
      productMappings(dictCode).then((res) => {
        const nameplateList = res.data.partsList;
        const nameplateMap = this.nameplateMap;
        if (Array.isArray(nameplateList) && nameplateList.length) {
          if (Array.isArray(nameplateMap) && nameplateMap.length) {
            nameplateList.forEach(item => {
              const index = nameplateMap.findIndex(nameplate => {
                return nameplate.dictCode === item.nameplateId
              })
              if (index !== -1) {
                  item.nameplateName = nameplateMap[index].dictLabel
              }
            })
            this.nameplateList = nameplateList
          }
        }
      })
    },
    getNameplateValue(nameplateName, row) {
      if (Array.isArray(row.nameplateList) && row.nameplateList.length) {
        const index = row.nameplateList.findIndex(item => item.nameplateName === nameplateName)
        if (index !== -1) {
          return row.nameplateList[index].nameplateValue
        }
      }
      return ""
    },
    isNameplateSame(nameplateName, index) {
      if (this.deviceHistory.length && this.deviceHistory.length > (index + 1) ) {
        const rowName = this.getNameplateValue(nameplateName, this.deviceHistory[index])
        const nextRowName = this.getNameplateValue(nameplateName, this.deviceHistory[index + 1])
        if (rowName === nextRowName) {
          return true
        }
      }
      return false
    }
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-div {
  height: 600vh;
  overflow: auto;
}
</style>
