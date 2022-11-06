<template>
  <div v-loading="loading">
    <div>
      <el-form
        class="flex"
        :model="queryParams"
        ref="queryForm"
        size="small"
        :inline="true"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="报警开始时间" prop="startTime">
          <jereh-date-picker
            clearable
            v-model="startTime"
            type="daterange"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="报警结束时间" prop="reviewTime">
          <jereh-date-picker
            clearable
            v-model="reviewTime"
            type="daterange"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <jereh-button type="primary" size="mini" @click="handleQuery"
            >过滤</jereh-button
          >
        </el-form-item>
      </el-form>
    </div>
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
            label="处理人"
            align="center"
            prop="updateBy"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警响应时间"
            align="center"
            prop="cmmsEndTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作记录"
            align="center"
            prop="status"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.status == 3 ? "已处理" : "已忽略" }}
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
            label="处理人"
            align="center"
            prop="updateBy"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警响应时间"
            align="center"
            prop="cmmsEndTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作记录"
            align="center"
            prop="status"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.status == 3 ? "已处理" : "已忽略" }}
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
            label="处理人"
            align="center"
            prop="updateBy"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警响应时间"
            align="center"
            prop="cmmsEndTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作记录"
            align="center"
            prop="status"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.status == 3 ? "已处理" : "已忽略" }}
            </template>
          </el-table-column>
        </el-table>
        <div class="justify-end">
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
import { getIotAlarmInfo } from "@/api/cmms/device.js"

export default {
  name: "historyAlarm",
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
      loading: false,
      startTime: [],
      reviewTime: [],
      queryParams: {
        alarmStartTime: '',
        alarmEndTime: '',
        reviewStartTime: '',
        reviewEndTime: ''
      },
      engineAlarmtTotal: 0,
      engineAlarmQuery: {
        pageNum: 1,
        pageSize: 10,
        status: "3",
        faultType: "1",
        deviceId: this.deviceData.productCode
      },
      engineAlarmList: [],
      gearboxAlarmtTotal: 0,
      gearboxAlarmQuery: {
        pageNum: 1,
        pageSize: 10,
        status: "3",
        faultType: "2",
        deviceId: this.deviceData.productCode
      },
      gearboxAlarmList: [],
      otherAlarmTotal: 0,
      otherAlarmQuery: {
        pageNum: 1,
        pageSize: 10,
        status: "3",
        faultType: "3",
        deviceId: this.deviceData.productCode
      },
      otherAlarmList: [],
    };
  },
  created() {
    this.getList()
  },
  methods: {
    handleQuery() {
      this.queryParams.alarmStartTime = this.startTime ? this.startTime[0] : ''
      this.queryParams.alarmEndTime = this.startTime ? this.startTime[1] : ''
      this.queryParams.reviewStartTime = this.reviewTime ? this.reviewTime[0] : ''
      this.queryParams.reviewEndTime = this.reviewTime ? this.reviewTime[1] : ''
      for (let key in this.queryParams) {
        this.engineAlarmQuery[key] = this.queryParams[key];
        this.gearboxAlarmQuery[key] = this.queryParams[key];
        this.otherAlarmQuery[key] = this.queryParams[key];
      }
      this.getList()
    },
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
        this.otherAlarmList = res.rows
        this.otherAlarmTotal = res.total
      })
    },
  },
};
</script>

<style scoped></style>
