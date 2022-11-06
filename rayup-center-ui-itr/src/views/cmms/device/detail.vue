<template>
  <el-container id="printMe">
    <el-header>
      <!-- 按钮组 -->
      <div>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-back"
          size="mini"
          @click="handleReturn"
        >
          返回
        </jereh-button>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleUpdateClick"
          v-hasPermi="['cmms:device:edit']"
          v-if="isHide"
        >
          修改
        </jereh-button>
        <jereh-button type="primary" plain icon="el-icon-plus" size="mini" v-hasPermi="['cmms:device:createService']"
          >创建请求</jereh-button
        >
        <div v-if="$PAD" style="height: 5px" />
        <jereh-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="showAssociatedUserDialog = true"
          v-hasPermi="['cmms:usergroupdevice:list']"
        >
          关联用户
        </jereh-button>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="showAssociatedGroupDialog = true"
          v-hasPermi="['cmms:usergroupdevice:list']"
        >
          关联用户组
        </jereh-button>
        <jereh-button type="primary" plain size="mini" @click="handleDetail" v-hasPermi="['cmms:device:print']"
          >打印</jereh-button
        >
        <jereh-button
          v-if="deviceData.deviceState === 3"
          type="primary"
          plain
          size="mini"
          @click="submitPassDevice"
          v-hasPermi="['cmms:device:audit']"
        >
          审核通过
        </jereh-button>
        <jereh-button
          v-if="deviceData.deviceState === 3"
          type="primary"
          plain
          size="mini"
          @click="submitUnpassDevice"
          v-hasPermi="['cmms:device:audit']"
        >
          审核不通过
        </jereh-button>
      </div>
      <!-- 标题组 -->
      <div class="flex align-center mt-1">
        <div class="flex align-center">
          <span
            class="rounded-circle text-white font-small px-1 mr-1"
            style="background-color: #ff6600"
          >
            {{ deviceOnline | formatDeviceOnline }}
          </span>
          <span v-if="deviceData.productBrand == '杰瑞'"
            >{{ deviceData.productName }}-{{ deviceData.projectItem }}-{{
              deviceData.productCode
            }}-</span
          >
          <span v-if="deviceData.productBrand != '杰瑞'"
            >{{ deviceData.productName }}-{{ deviceData.productBrand }}-{{
              deviceData.licensePlateCode
            }}-</span
          >
          <el-badge is-dot :type="deviceOnline | formatDotType">
            <dict-tag
              :options="dict.type.device_online"
              :value="deviceOnline"
            />
          </el-badge>
        </div>
        <div class="flex align-center justify-end" style="margin-left: auto; margin-right: 20px">
          <el-switch class="ml-2" v-model="showMore" inactive-color="blue" active-text="展开更多">
          </el-switch>
        </div>
      </div>
    </el-header>
    <el-main>
      <!-- 基础信息 -->
      <div
        class="align-center mt-1"
        :style="{ display: $WEB ? 'flex' : 'block' }"
      >
        <div :style="{ height: '200px' }">
          <div style="width: 300px">
            <el-carousel
              trigger="click"
              height="200px"
              indicator-position="none"
            >
              <el-carousel-item v-for="(url, k) in imgList" :key="k">
                <image-preview height="200px" width="300px" :src="url"  />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div :style="{  height: '200px' }" class="px-1">
          <image-preview height="200px" width="200px" :src="deviceData.qrCodeUrl"  />
        </div>
        <el-descriptions
          :style="{ width: $WEB ? '100%' : '100%', height: 'auto' }"
          :column="3"
          border
          :labelStyle="{ width: '13%' }"
          :contentStyle="{ width: '20%' }"
        >
          <el-descriptions-item>
            <template slot="label"> 产品品牌 </template>
            {{ deviceData.productBrand }}
            <span
              v-if="
                deviceData.productBrand != deviceDataHistory.productBrand &&
                deviceDataHistory.productBrand
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.productBrand + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 客户名称 </template>
            {{ deviceData.customerName }}
            <span
              v-if="
                deviceData.customerName != deviceDataHistory.customerName &&
                deviceDataHistory.customerName
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.customerName + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 售后区域 </template>
            {{ deviceData.afterSaleArea }}
            <span
              v-if="
                deviceData.afterSaleArea != deviceDataHistory.afterSaleArea &&
                deviceDataHistory.afterSaleArea
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.afterSaleArea + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 产品名称 </template>
            {{ deviceData.productName }}
            <span
              v-if="
                deviceData.productName != deviceDataHistory.productName &&
                deviceDataHistory.productName
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.productName + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 客户联系人 </template>
          {{ deviceData.contactPerson }}
            <span
            v-if="
              deviceData.contactPerson != deviceDataHistory.contactPerson &&
              deviceDataHistory.contactPerson
            "
              style="color: red"
            >{{ "(" + deviceDataHistory.contactPerson + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 车牌号 </template>
            {{ deviceData.licensePlateCode }}
            <span
              v-if="
                deviceData.licensePlateCode !=
                  deviceDataHistory.licensePlateCode &&
                deviceDataHistory.licensePlateCode
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.licensePlateCode + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 项目编码分项 </template>
            {{ deviceData.projectItem }}
            <span
              v-if="
                deviceData.projectItem != deviceDataHistory.projectItem &&
                deviceDataHistory.projectItem
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.projectItem + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 客户联系方式 </template>
          {{ deviceData.contactPhone }}
            <span
            v-if="
              deviceData.contactPhone != deviceDataHistory.contactPhone &&
              deviceDataHistory.contactPhone
            "
              style="color: red"
            >{{ "(" + deviceDataHistory.contactPhone + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 出厂日期 </template>
            {{ deviceData.exfactoryDate }}
            <span
              v-if="
                deviceData.exfactoryDate != deviceDataHistory.exfactoryDate &&
                deviceDataHistory.exfactoryDate
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.exfactoryDate + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 产品编号 </template>
            {{ deviceData.productCode }}
            <span
              v-if="
                deviceData.productCode != deviceDataHistory.productCode &&
                deviceDataHistory.productCode
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.productCode + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 市场区域 </template>
            {{ deviceData.deviceArea }}
            <span
              v-if="
                deviceData.deviceArea != deviceDataHistory.deviceArea &&
                deviceDataHistory.deviceArea
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.deviceArea + ")" }}</span
            >
          </el-descriptions-item>
          <!-- <el-descriptions-item>
            <template slot="label"> 验收日期 </template>
            {{ deviceData.deliveryDate }}
            <span
              v-if="
                deviceData.deliveryDate != deviceDataHistory.deliveryDate &&
                deviceDataHistory.deliveryDate
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.deliveryDate + ")" }}</span
            >
          </el-descriptions-item> -->
          <el-descriptions-item>
            <template slot="label"> 验收日期 </template>
            {{ deviceData.deliveryDate }}
            <span
              v-if="
                deviceData.deliveryDate != deviceDataHistory.deliveryDate &&
                deviceDataHistory.deliveryDate
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.deliveryDate + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 底盘VIN码 </template>
            {{ deviceData.chassisCode }}
            <span
              v-if="
                deviceData.chassisCode != deviceDataHistory.chassisCode &&
                deviceDataHistory.chassisCode
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.chassisCode + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 市场负责人 </template>
            {{ deviceData.maketDirector }}
            <span
              v-if="
                deviceData.maketDirector != deviceDataHistory.maketDirector &&
                deviceDataHistory.maketDirector
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.maketDirector + ")" }}</span
            >
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 质保终止日期 </template>
            {{ deviceData.expirationDate }}
            <span
              v-if="
                deviceData.expirationDate != deviceDataHistory.expirationDate &&
                deviceDataHistory.expirationDate
              "
              style="color: red"
              >{{ "(" + deviceDataHistory.expirationDate + ")" }}</span
            >
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 全部展示 -->
      <div class="mt-1" v-if="showMore">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基础信息" name="1" v-has-permi="['cmms:device:deviceInformation']">
            <deviceInformation
              v-if="showMore"
              :deviceData="deviceData"
            ></deviceInformation>
          </el-collapse-item>
          <el-collapse-item title="部件信息" name="2" v-has-permi="['cmms:device:componentInformation']">
            <componentInformation
              v-if="showMore"
              :deviceData="deviceData"
            ></componentInformation>
          </el-collapse-item>
          <el-collapse-item title="项目文档" name="3" v-has-permi="['cmms:device:projectDocuments']">
            <projectDocuments
              v-if="showMore"
              :deviceData="deviceData"
            ></projectDocuments>
          </el-collapse-item>
          <el-collapse-item title="售后信息" name="4" v-has-permi="['cmms:device:afterSaleInformation']">
            <afterSaleInformation
              v-if="showMore"
              :deviceData="deviceData"
            ></afterSaleInformation>
          </el-collapse-item>
          <el-collapse-item title="客户信息" name="5" v-has-permi="['cmms:device:customerInformation']">
            <customerInformation
              v-if="showMore"
              :deviceData="deviceData"
            ></customerInformation>
          </el-collapse-item>
          <el-collapse-item title="市场信息" name="6" v-has-permi="['cmms:device:marketInformation']">
            <marketInformation
              v-if="showMore"
              :deviceData="deviceData"
            ></marketInformation>
          </el-collapse-item>
          <el-collapse-item title="设备监控" name="7" v-has-permi="['cmms:device:monitorInfo']">
            <monitorInfo v-if="showMore" :deviceData="deviceData"></monitorInfo>
          </el-collapse-item>
          <el-collapse-item title="报警信息" name="8" v-has-permi="['cmms:device:alarmInfo']">
            <alarmInfo v-if="showMore" :deviceData="deviceData"></alarmInfo>
          </el-collapse-item>
          <el-collapse-item title="健康诊断" name="9" v-has-permi="['cmms:device:healthTest']">
            <healthTest v-if="showMore" :deviceData="deviceData"></healthTest>
          </el-collapse-item>
          <el-collapse-item title="服务记录" name="10" v-has-permi="['cmms:device:serviceRecord']">
            <serviceRecord
              v-if="showMore"
              :deviceData="deviceData"
            ></serviceRecord>
          </el-collapse-item>
          <el-collapse-item title="审核记录" name="11" v-has-permi="['cmms:device:auditRecords']">
            <auditRecords
              v-if="showMore"
              :deviceData="deviceData"
            ></auditRecords>
          </el-collapse-item>
          <el-collapse-item title="其他" name="12" v-has-permi="['cmms:device:others']">其他</el-collapse-item>
        </el-collapse>
      </div>
      <div class="mt-1" v-if="!showMore" id="dddd">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="基础信息" name="1" v-has-permi="['cmms:device:deviceInformation']">
            <deviceInformation
              v-if="this.activeName === '1'"
              :deviceData="deviceData"
            ></deviceInformation>
          </el-tab-pane>
          <el-tab-pane label="部件信息" name="2" v-has-permi="['cmms:device:componentInformation']">
            <componentInformation
              v-if="this.activeName === '2'"
              :deviceData="deviceData"
            ></componentInformation>
          </el-tab-pane>
          <el-tab-pane label="项目文档" name="3" v-has-permi="['cmms:device:projectDocuments']">
            <projectDocuments
              v-if="this.activeName === '3'"
              :deviceData="deviceData"
            ></projectDocuments>
          </el-tab-pane>
          <el-tab-pane label="售后信息" name="4" v-has-permi="['cmms:device:afterSaleInformation']">
            <afterSaleInformation
              v-if="this.activeName === '4'"
              :deviceData="deviceData"
            ></afterSaleInformation>
          </el-tab-pane>
          <el-tab-pane label="客户信息" name="5" v-has-permi="['cmms:device:customerInformation']">
            <customerInformation
              v-if="this.activeName === '5'"
              :deviceData="deviceData"
            ></customerInformation>
          </el-tab-pane>
          <el-tab-pane label="市场信息" name="6" v-has-permi="['cmms:device:marketInformation']">
            <marketInformation
              v-if="this.activeName === '6'"
              :deviceData="deviceData"
            ></marketInformation>
          </el-tab-pane>
          <el-tab-pane label="设备监控" name="7" v-has-permi="['cmms:device:monitorInfo']">
            <monitorInfo
              v-if="this.activeName === '7'"
              :deviceData="deviceData"
            ></monitorInfo>
          </el-tab-pane>
          <el-tab-pane label="报警信息" name="8" v-has-permi="['cmms:device:alarmInfo']">
            <alarmInfo
              v-if="this.activeName === '8'"
              :deviceData="deviceData"
            ></alarmInfo>
          </el-tab-pane>
          <el-tab-pane label="健康诊断" name="9" v-has-permi="['cmms:device:healthTest']">
            <healthTest
              v-if="this.activeName === '9'"
              :deviceData="deviceData"
            ></healthTest>
          </el-tab-pane>
          <el-tab-pane label="服务记录" name="10" v-has-permi="['cmms:device:serviceRecord']">
            <serviceRecord
              v-if="this.activeName === '10'"
              :deviceData="deviceData"
            ></serviceRecord>
          </el-tab-pane>
          <el-tab-pane label="审核记录" name="11" v-has-permi="['cmms:device:auditRecords']">
            <auditRecords
              v-if="this.activeName === '11'"
              :deviceData="deviceData"
            ></auditRecords>
          </el-tab-pane>
          <el-tab-pane label="其他" name="12" v-has-permi="['cmms:device:others']">其他</el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
    <!-- 处理修改弹窗 -->
    <deviceList
      :deviceList="deviceList"
      :isAll="isAll"
      :isJereh="isJereh"
      :isHiddenTable="false"
      ref="child"
    ></deviceList>
    <!-- 关联用户 -->
    <el-dialog
      title="关联用户"
      :visible.sync="showAssociatedUserDialog"
      width="400px"
    >
      <div style="height: 100px; width: 80%">
        <jereh-person-select
          v-model="bindUserIdList"
          multiple
          filterable
          remote
          reserve-keyword
          bindValue="userId"
          placeholder="请输入工号或姓名"
          :remote-method="remoteUser"
          :loading="loading"
          :initialize="true"
        />
      </div>
      <!-- :label="item.userName + ' ' + item.nickName" -->
      <div slot="footer" class="dialog-footer">
        <jereh-button @click="showAssociatedUserDialog = false"
          >取 消</jereh-button
        >
        <jereh-button type="primary" @click="submitAssociatedUser"
          >提 交</jereh-button
        >
      </div>
    </el-dialog>
    <!-- 关联用户组 -->
    <el-dialog
      title="关联用户组"
      :visible.sync="showAssociatedGroupDialog"
      width="400px"
    >
      <div style="height: 100px; width: 80%">
        <el-select v-model="bindGroupIdList" multiple placeholder="请选择用户组">
          <el-option
            v-for="item in bindGroupOptions"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          >
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <jereh-button @click="showAssociatedGroupDialog = false"
          >取 消</jereh-button
        >
        <jereh-button type="primary" @click="submitAssociatedGroup"
          >提 交</jereh-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { getDevice } from "@/api/cmms/device.js";
import {
  addDevice,
  getDeviceHistory,
  getUserGroupList,
  queryDeviceGroupList,
  queryDeviceUserList,
  remoteUser,
  submitAssociatedGroup,
  submitAssociatedUser,
  getidHistoryDevice,
  getIotData, saveIsConnectIot
} from '../../../api/cmms/device'
import projectInformation from "./components/projectInformation";
import deviceInformation from "./components/deviceInformation";
import afterSaleInformation from "./components/afterSaleInformation";
import marketInformation from "./components/marketInformation";
import customerInformation from "./components/customerInformation";
import componentInformation from "./components/componentInformation";
import realtimeData from "./components/realtimeData";
import auditRecords from "./components/auditRecords";
import deviceList from "../components/deviceList.vue";
import axios from "axios";
import alarmInfo from "./components/alarmInfo.vue";
import projectDocuments from "./components/projectDocumnts";
import monitorInfo from "./components/monitorInfo";
import HealthTest from "./components/healthTest.vue";
import ServiceRecord from "./components/serviceRecord.vue";

export default {
  name: "Device",
  dicts: [
    "injection_head_brand",
    "jereh_device",
    "device_online",
    "customer_mark",
    "piston_pump_manufacturer",
    "after_sale_area",
    "stage_engine_brand",
    "device_area",
    "stage_gearbox_brand",
    "product_brand",
    "marketer_area",
    "chassis_brand",
  ],
  components: {
    projectInformation,
    deviceInformation,
    afterSaleInformation,
    marketInformation,
    customerInformation,
    componentInformation,
    realtimeData,
    auditRecords,
    deviceList,
    alarmInfo,
    projectDocuments,
    monitorInfo,
    HealthTest,
    ServiceRecord,
  },
  props: {
    isAll: Boolean,
    isJereh: Boolean,
  },
  data() {
    return {
      isHide: true,
      isOpen: false,
      iwidth: "100%",
      iheight: "100%",
      imgList: [],
      deviceList: [],
      deviceOnline: "0003",
      deviceIotData: [],
      activeNames: [],
      showMore: false,
      socket: null,
      showAssociatedGroupDialog: false,
      showAssociatedUserDialog: false,
      bindUserOptions: [],
      bindGroupOptions: [],
      loading: false,
      activeName: "1",
      id: "",
      bindUserIdList: [],
      bindGroupIdList: [],
      deviceData: {
        productName: "",
        equipPic: "",
      },
      deviceDataHistory: {},
      //  partsRes: [],//部件变更，部件
      // arrli: [],//转换成了数组包对象形式
      componentBasicHis: {}, //id和部件名称
      componentadd: "", //部件名称
      //partData:[],//部件数据
    };
  },
  filters: {
    expiration(device) {
      const now = new Date();
      const expirationDate = new Date(device.expirationDate);
      if (now.getTime() <= expirationDate.getTime()) {
        return "保内";
      } else {
        return "保外";
      }
    },
    formatDotType(deviceOnline) {
      switch (deviceOnline) {
        case "0001":
          return "success";
        case "0002":
          return "info";
        case "0003":
          return "danger";
        default:
          return "danger";
      }
    },
    formatDeviceOnline(deviceOnline) {
      switch (deviceOnline) {
        case "0001":
          return "已接入IoT";
        case "0002":
          return "已接入IoT";
        case "0003":
          return "未接入IoT";
        default:
          return "未接入IoT";
      }
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.deviceData.deviceState = this.$route.query.deviceState;
    this.deviceData.updateBy = this.$route.query.updateBy;
    this.getDeviceDetail(
      this.id,
      this.deviceData.deviceState,
      this.deviceData.updateBy
    );
    this.getUserGroupList();
    if (this.deviceData.deviceState == 3) {
      this.isHide = false;
    }
  },
  beforeDestroy() {
    this.socket.close();
  },
  methods: {
    /** 详情按钮操作 */
    handleDetail(row) {
      this.$router.push({
        path: "/cmms/device/print",
        query: { id: this.id,type:1 },
      });
    },
    showAddOrUpdate(data) {
      if (data === "false") {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
    isOpenDetail() {
      this.isOpen = true;
    },
    handleUpdateClick() {
      this.$refs.child.handleUpdate(this.deviceData);
    },
    websocket() {
      if (typeof WebSocket === "undefined") {
        return console.log("您的浏览器不支持websocket");
      }
      this.socket = new WebSocket(process.env.VUE_APP_CMMS_WEBSOCKET);
      this.socket.onmessage = (data) => {
        const deviceIot = JSON.parse(data.data);
        this.deviceOnline = deviceIot.status;
        if (deviceIot.status === "0001") {
          this.deviceIotData = deviceIot.data;
        }
        if (deviceIot.status === "0001" || deviceIot.status === "0002"){
          saveIsConnectIot({id: this.deviceData.id,isConnectIot: '是'})
          this.deviceData.isConnectIot = '是'
        }else{
          saveIsConnectIot({id: this.deviceData.id,isConnectIot: '否'})
          this.deviceData.isConnectIot = '否'
        }
      };
      this.socket.onopen = () => {
        const data = {
          deviceNo: this.deviceData.productCode,
          //deviceNo: '09210021',
          type: "monitor",
          seconds: 10,
        };
        this.socket.send(JSON.stringify(data));
      };
      this.socket.onerror = (err) => {
        console.log(err);
      };
      this.socket.onclose = () => {
        console.log("关闭了websocket");
      };
    },
    getUserGroupList() {
      getUserGroupList().then((res) => {
        this.bindGroupOptions = res.data;
      });
    },
    submitAssociatedGroup() {
      submitAssociatedGroup({
        id: this.deviceData.id,
        bindIdList: this.bindGroupIdList,
      }).then((res) => {
        this.showAssociatedGroupDialog = false;
        this.$modal.msgSuccess("关联用户组成功");
      });
    },
    submitAssociatedUser() {
      submitAssociatedUser({
        id: this.deviceData.id,
        bindIdList: this.bindUserIdList,
      }).then((res) => {
        this.showAssociatedUserDialog = false;
        this.$modal.msgSuccess("关联用户成功");
      });
    },
    // 远程搜索用户
    remoteUser(query) {
      if (query !== "") {
        this.loading = true;
        remoteUser({ searchValue: query }).then((res) => {
          this.loading = false;
          this.bindUserOptions = res.data;
        });
      } else {
        this.options = [];
      }
    },
    getHistoryDevice(id) {
      getidHistoryDevice(id).then((res) => {
        this.deviceDataHistory = res.data ? res.data : {};
        const mainPerson = this.getHistoryMainPerson();
        if (mainPerson) {
          this.deviceDataHistory.contactPerson = mainPerson.customerName
          this.deviceDataHistory.contactPhone = mainPerson.customerPhone
        }
      });
    },
    getDeviceDetail(id, deviceState, createBy) {
      getDevice(id, deviceState, createBy).then((res) => {
        this.deviceData = res.data;
        console.log(this.deviceData)
        const devicePicList = this.deviceData.equipPic
          ? this.deviceData.equipPic.toString().split(",")
          : [];
        this.imgList = [...devicePicList];
        this.websocket();
        this.queryDeviceUserList(id);
        this.queryDeviceGroupList(id);
        this.getIotInfo(res.data.productCode);
        const mainPerson = this.getMainPerson();
        if (mainPerson) {
          this.deviceData.contactPerson = mainPerson.customerName
          this.deviceData.contactPhone = mainPerson.customerPhone
        }
        if (deviceState == 3) {
          console.log(111111)
          this.getHistoryDevice(id);
        }
      });
    },
    queryDeviceGroupList(id) {
      queryDeviceGroupList({ deviceId: id }).then((res) => {
        if (res.data) {
          for (const role of res.data) {
            this.bindGroupIdList.push(role.roleId);
          }
        }
      });
    },
    queryDeviceUserList(id) {
      queryDeviceUserList({ deviceId: id }).then((res) => {
        this.bindUserOptions = res.data;
        if (res.data) {
          for (const user of res.data) {
            this.bindUserIdList.push(user.userId);
          }
        }
      });
    },
    submitPassDevice() {
      this.$prompt("请输入备注", "是否确认审核通过？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.deviceData.remark = value;
          this.deviceData.deviceState = 1;
          addDevice(this.deviceData).then((response) => {
            this.$modal.msgSuccess("审核成功");
            this.getDeviceDetail(
              this.id,
              this.deviceData.deviceState,
              this.deviceData.updateBy
            );
          });
        })
        .catch(() => {});
    },
    submitUnpassDevice() {
      this.$prompt("请输入备注", "是否确认审核驳回？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.deviceData.remark = value;
          this.deviceData.deviceState = 4;
          addDevice(this.deviceData).then((response) => {
            this.$modal.msgWarning("已驳回");
            this.getDeviceDetail(
              this.id,
              this.deviceData.deviceState,
              this.deviceData.updateBy
            );
          });
        })
        .catch(() => {});
    },
    handleReturn() {
      const pageSize = this.$route.query.pageSize ? this.$route.query.pageSize : ''
      this.$route.params.pageSize = pageSize
      this.$router.back();
    },
    // 抓取iot数据
    getIotInfo(productCode) {
      getIotData(productCode)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("抓取iot数据失败！");
        });
    },
    getMainPerson() {
      if (this.deviceData.customerBasicList && this.deviceData.customerBasicList.length) {
        const index = this.deviceData.customerBasicList.findIndex(item => item.customerIsMain === "Y")
        return index !== -1 ? this.deviceData.customerBasicList[index] : this.deviceData.customerBasicList[0]
      }
      return null
    },
    getHistoryMainPerson() {
      if (this.deviceDataHistory.customerBasicList && this.deviceDataHistory.customerBasicList.length) {
        const index = this.deviceDataHistory.customerBasicList.findIndex(item => item.customerIsMain === "Y")
        return index !== -1 ? this.deviceDataHistory.customerBasicList[index] : this.deviceDataHistory.customerBasicList[0]
      }
      return null
    }
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-descriptions__body {
  height: 100%;
}
::v-deep .el-descriptions__body .el-descriptions__table {
  height: 92%;
}
::v-deep .el-collapse-item__header {
  font-size: 15px;
  height: 50px;
}
::v-deep .el-tabs__item {
  font-size: 15px;
}
::v-deep .el-tabs__content {
  height: calc(100vh - 465px);
  overflow: auto;
  padding: 20px !important;
}
</style>
