<template>
  <div v-loading="loading">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="engineAlarm">
        <template slot="title">
          <span>1.发动机报警</span>
        </template>
        <el-table border :data="engineAlarmList" fit max-height="500px" :header-cell-style="{ background: '#eef1f8'}">
          <el-table-column label="序号" type="index" width="55" align="center" />
          <el-table-column
            label="故障码"
            align="center"
            prop="errorCode"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障码解析"
            align="center"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障等级"
            align="center"
            prop="level"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警开始时间"
            align="center"
            prop="startTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警结束时间"
            align="center"
            prop="endTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-warning"
                @click="handleUpgrade(scope.row)"
              >
                报警升级
              </jereh-button>
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-tickets"
                @click="handleGuide(scope.row)"
              >
                故障指导
              </jereh-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="justify-end">
          <Pagination
            v-show="engineAlarmtTotal > 0"
            :total="engineAlarmtTotal"
            :page.sync="engineAlarmQuery.pageNum"
            :limit.sync="engineAlarmQuery.pageSize"
            @pagination="getEngineAlarmList"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item name="gearboxAlarm">
        <template slot="title">
          <span>2.变速箱报警</span>
        </template>
        <el-table border :data="gearboxAlarmList" fit max-height="500px" :header-cell-style="{ background: '#eef1f8'}">
          <el-table-column label="序号" type="index" width="55" align="center" />
          <el-table-column
            label="故障码"
            align="center"
            prop="errorCode"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障码解析"
            align="center"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障等级"
            align="center"
            prop="level"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警开始时间"
            align="center"
            prop="startTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警结束时间"
            align="center"
            prop="endTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-warning"
                @click="handleUpgrade(scope.row)"
              >
                报警升级
              </jereh-button>
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-tickets"
                @click="handleGuide(scope.row)"
              >
                故障指导
              </jereh-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="justify-end">
          <Pagination
            v-show="gearboxAlarmtTotal > 0"
            :total="gearboxAlarmtTotal"
            :page.sync="gearboxAlarmQuery.pageNum"
            :limit.sync="gearboxAlarmQuery.pageSize"
            @pagination="getGearboxAlarmList"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item name="otherAlarm">
        <template slot="title">
          <span>3.其他报警</span>
        </template>
        <el-table border :data="otherAlarmList" fit max-height="500px" :header-cell-style="{ background: '#eef1f8'}">
          <el-table-column label="序号" type="index" width="55" align="center" />
          <el-table-column
            label="故障码"
            align="center"
            prop="errorCode"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障码解析"
            align="center"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障等级"
            align="center"
            prop="level"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警开始时间"
            align="center"
            prop="startTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警结束时间"
            align="center"
            prop="endTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-warning"
                @click="handleUpgrade(scope.row)"
              >
                报警升级
              </jereh-button>
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-tickets"
                @click="handleGuide(scope.row)"
              >
                故障指导
              </jereh-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex align-center justify-end">
          <Pagination
            v-show="otherAlarmTotal > 0"
            :total="otherAlarmTotal"
            :page.sync="otherAlarmQuery.pageNum"
            :limit.sync="otherAlarmQuery.pageSize"
            @pagination="getOtherAlarmList"
          />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { getIotAlarmInfo, updateIotAlarmInfo } from "@/api/cmms/device.js"

export default {
  name: "currentAlarm",
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
      activeNames: ['engineAlarm', 'gearboxAlarm', 'otherAlarm'],
      engineAlarmtTotal: 0,
      engineAlarmQuery: {
        pageNum: 1,
        pageSize: 10,
        status: "1",
        faultType: "1",
        deviceId: this.deviceData.productCode
      },
      engineAlarmList: [],
      gearboxAlarmtTotal: 0,
      gearboxAlarmQuery: {
        pageNum: 1,
        pageSize: 10,
        status: "1",
        faultType: "2",
        deviceId: this.deviceData.productCode
      },
      gearboxAlarmList: [],
      otherAlarmTotal: 0,
      otherAlarmQuery: {
        pageNum: 1,
        pageSize: 10,
        status: "1",
        faultType: "3",
        deviceId: this.deviceData.productCode
      },
      otherAlarmList: [],
      cmsRemarket: {
        productName: this.deviceData.productName,
        productCode: this.deviceData.productCode,
        customerName: this.deviceData.customerName,
        contactPerson: this.deviceData.contactPerson,
        contactPhone: this.deviceData.contactPhone
      }
    };
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true;
      const engineAlarm = await getIotAlarmInfo(this.engineAlarmQuery);
      const gearboxAlarm = await getIotAlarmInfo(this.gearboxAlarmQuery);
      const otherAlarm = await getIotAlarmInfo(this.otherAlarmQuery);
      this.engineAlarmList = engineAlarm.rows
      this.engineAlarmtTotal = engineAlarm.total
      this.gearboxAlarmList = gearboxAlarm.rows
      this.gearboxAlarmtTotal = gearboxAlarm.total
      this.otherAlarmList = otherAlarm.rows
      this.otherAlarmTotal = otherAlarm.total
      this.loading = false;
    },
    getEngineAlarmList() {
      getIotAlarmInfo(this.engineAlarmQuery).then(res => {
        this.engineAlarmList = res.rows
        this.engineAlarmtTotal = res.total
      })
    },
    getGearboxAlarmList() {
      getIotAlarmInfo(this.gearboxAlarmQuery).then(res => {
        this.gearboxAlarmList = res.rows
        this.gearboxAlarmtTotal = res.total
      })
    },
    getOtherAlarmList() {
      getIotAlarmInfo(this.otherAlarmQuery).then(res => {
        this.loading = false;
        this.otherAlarmList = res.rows
        this.otherAlarmTotal = res.total
      })
    },
    handleUpgrade(row) {
      const data = {
        id: row.id,
        status: "2",
        cmmsRemarket: JSON.stringify(this.cmsRemarket)
      }
      this.loading = true;
      updateIotAlarmInfo(data).then(res => {
        this.loading = false;
        this.$modal.msgSuccess("报警升级提交成功");
        this.$router.push({
          path: "/cmms/dashboard/todoList",
          query: { productCode: this.deviceData.productCode }
        });
      })
    },
    handleGuide() {
      console.log("故障指导");
    },
  },
};
</script>

<style scoped></style>
