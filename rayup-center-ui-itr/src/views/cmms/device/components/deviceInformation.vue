<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="deviceInfo">
        <template slot="title">
          <span>1.设备信息</span>
        </template>
        <el-descriptions
          class="margin-top"
          style="width: 100%"
          :column="3"
          border
          :labelStyle="{ width: '13%' }"
          :contentStyle="{ width: '20%' }"
        >
          <el-descriptions-item>
            <template slot="label"> 产品品牌 </template>
            {{ deviceData.productBrand }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 产品名称 </template>
            {{ deviceData.productName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 产品型号 </template>
            {{ deviceData.productType }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 底盘VIN码 </template>
            {{ deviceData.chassisCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 车牌号 </template>
            {{ deviceData.licensePlateCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 出厂日期 </template>
            {{ deviceData.exfactoryDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 客户资产编号 </template>
            {{ deviceData.cusMonCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 设备状态 </template>
            <span
              v-if="deviceData.deviceDeliveryState"
              :style="{ background: getDeviceDeliveryState(deviceData.deviceDeliveryState), color: 'white', 'border-radius': '8px', padding: '5px'}"
            >
              {{ deviceData.deviceDeliveryState }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 设备全生命周期 </template>
            {{ deviceData.equLifeCycle }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 是否接入IOT </template>
            {{ deviceData.isConnectIot }}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
      <el-collapse-item name="projectInfo">
        <template slot="title">
          <span>2.项目信息</span>
        </template>
        <el-descriptions
          class="margin-top"
          style="width: 100%"
          :column="3"
          border
          :labelStyle="{ width: '13%' }"
          :contentStyle="{ width: '20%' }"
        >
          <el-descriptions-item>
            <template slot="label"> 项目编码 </template>
            {{ deviceData.projectCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 项目编码分项 </template>
            {{ deviceData.projectItem }}
          </el-descriptions-item>
          <el-descriptions-item v-if="deviceData.jerehDevice === 3">
            <template slot="label"> 原项目编码分项 </template>
            {{ deviceData.oldProjectItem }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 产品编号 </template>
            {{ deviceData.productCode }}
          </el-descriptions-item>
          <el-descriptions-item v-if="deviceData.jerehDevice === 3">
            <template slot="label"> 原产品编号 </template>
            {{ deviceData.oldProductCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 产品线 </template>
            {{ deviceData.productLine }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 机械负责人 </template>
            {{ deviceData.rdDirector }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 电气负责人 </template>
            {{ deviceData.elePerson }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 液压负责人 </template>
            {{ deviceData.waterPerson }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 测试负责人 </template>
            {{ deviceData.tester }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 项目类别 </template>
            {{ deviceData.projectType }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> (装备)报验完工流程单号 </template>
            {{ deviceData.completeInspectionCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 项目评审申请流程单号 </template>
            {{ deviceData.projectReviewCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 技术协议解读流程单号 </template>
            {{ deviceData.tecReq }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> (装备)项目计划变更流程单号 </template>
            {{ deviceData.planReq }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> (装备)设备出厂流程单号 </template>
            {{ deviceData.deviceOutCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 交付服务流程单号 </template>
            {{ deviceData.deliveryProcessCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 产品总图号 </template>
            {{ deviceData.proTonum }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 铭牌CAD图纸下发流程单号 </template>
            {{ "" }}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
      <el-collapse-item name="nameplateInfo">
        <template slot="title">
          <span>3.铭牌信息</span>
        </template>
        <el-descriptions
          class="margin-top"
          style="width: 100%"
          :column="3"
          border
          :labelStyle="{ width: '13%' }"
          :contentStyle="{ width: '20%' }"
        >
          <el-descriptions-item
            v-for="item in deviceData.nameplateList"
            :key="item.nameplateId"
          >
            <template slot="label">
              {{ item.nameplateName }}
            </template>
            {{ item.nameplateValue }}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "projectInformation",
  dicts: ["sys_device_status"],
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
      activeNames: ['deviceInfo', 'projectInfo', 'nameplateInfo']
    }
  },
  methods: {
    // 根据设备状态改变标签类型
    getDeviceDeliveryState(deviceDeliveryState) {
      switch (deviceDeliveryState) {
        case "待交付":
          return "orange";
        case "交付中":
          return "green";
        case "质保期内":
          return "red";
        case "质保期外":
          return "blue";
      }
    },
  }
};
</script>

<style scoped></style>
