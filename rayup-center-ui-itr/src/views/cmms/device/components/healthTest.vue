<template>
  <div>
    <div style="margin-bottom: 10px">
      <jereh-button
        type="primary"
        plain
        size="small"
        @click.native.stop="handleDiagnosis"
      >
        健康诊断
      </jereh-button>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="healthRate">
        <template slot="title">
          <span>1.设备整体健康评分</span>
        </template>
        <div style="display: flex">
          <div id="radarChart" style="width: 20vw; height: 300px"></div>
          <div style="width: 80%; height: 300px; margin-left: 20px">
            <span style="float: right; font-size: 14px"
              >诊断时间：{{ formatDate(new Date()) }}</span
            >
            <h2>健康评分：{{ healthCondition.healthScore }}</h2>
            <div style="position: relative; bottom: -150px">
              <el-descriptions :column="3" border>
                <el-descriptions-item label="服务时间">{{
                  healthCondition.serviceTime
                }}</el-descriptions-item>
                <el-descriptions-item label="运行时间">{{
                  healthCondition.runtime
                }}</el-descriptions-item>
                <el-descriptions-item label="平均负载">{{
                  healthCondition.avgeLoad
                }}</el-descriptions-item>
                <el-descriptions-item label="保养及时率">{{
                  healthCondition.maintenRate
                }}</el-descriptions-item>
                <el-descriptions-item label="维修次数">{{
                  healthCondition.maintain
                }}</el-descriptions-item>
                <el-descriptions-item label="上次体检">{{
                  healthCondition.lastHealthScore
                }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="problemInfo">
        <template slot="title">
          <span>2.问题信息</span>
        </template>
        <el-table
          border
          :data="problemList"
          fit
          max-height="500px"
          :header-cell-style="{ background: '#eef1f8'}"
        >
          <el-table-column label="序号" type="index" width="55" align="center" />
          <el-table-column
            label="故障等级"
            align="center"
            prop="type"
            show-overflow-tooltip
          />
          <el-table-column
            label="电气"
            align="center"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            label="液压"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="机械"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="总数量"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="maintenanceInfo">
        <template slot="title">
          <span>3.周期维保信息</span>
        </template>
        <el-table
          border
          :data="maintenanceList"
          fit
          max-height="500px"
          :header-cell-style="{ background: '#eef1f8'}"
        >
          <el-table-column label="序号" type="index" width="55" align="center" />
          <el-table-column
            label="发动机小时"
            align="center"
            prop="engineHour"
            show-overflow-tooltip
          />
          <el-table-column
            label="维保项"
            align="center"
            prop="itemName"
            show-overflow-tooltip
          />
          <el-table-column
            label="油品型号"
            align="center"
            prop="oilType"
            show-overflow-tooltip
          />
          <el-table-column
            label="间隔时间"
            align="center"
            prop="intervalTimeMonth"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.intervalTimeHour + "/" + scope.row.intervalTimeMonth }}
            </template>
          </el-table-column>
          <el-table-column
            label="剩余时间"
            align="center"
            prop="surplusTimeDay"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.surplusTimeHour + "/" + scope.row.surplusTimeDay }}
            </template>
          </el-table-column>
          <el-table-column
            label="保养人"
            align="center"
            prop="maintainUser"
            show-overflow-tooltip
          />
          <el-table-column
            label="保养时间"
            align="center"
            prop="maintainData"
            show-overflow-tooltip
          />
        </el-table>
        <div class="justify-end">
          <Pagination
            v-show="maintenanceTotal > 0"
            :total="maintenanceTotal"
            :page.sync="maintenanceQuery.pageNum"
            :limit.sync="maintenanceQuery.pageSize"
            @pagination="getMaintenanceList"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item name="alarmInfo">
        <template slot="title">
          <span>4.报警信息</span>
        </template>
        <div>
          <span class="header" @click="handleShowEngineAlarm">
            发动机报警
            <i v-if="showEngineAlarm" class="el-icon-caret-bottom"></i>
            <i v-else class="el-icon-caret-right"></i>
          </span>
          <el-table
            border
            :data="engineAlarmList"
            fit
            max-height="500px"
            v-if="showEngineAlarm"
            :header-cell-style="{ background: '#eef1f8'}"
          >
            <el-table-column
              label="序号"
              type="index"
              width="55"
              align="center"
            />
            <el-table-column
              label="故障码解析"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="故障等级"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="报警开始时间"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="报警结束时间"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="处理人"
              align="center"
              prop="type"
              show-overflow-tooltip
            />
            <el-table-column
              label="报警响应时间"
              align="center"
              prop="type"
              show-overflow-tooltip
            />
            <el-table-column
              label="操作记录"
              align="center"
              prop="type"
              show-overflow-tooltip
            />
          </el-table>
          <div class="flex align-center justify-end" v-if="showEngineAlarm">
            <Pagination
              v-show="engineAlarmTotal > 0"
              :total="engineAlarmTotal"
              :page.sync="engineAlarmQuery.pageNum"
              :limit.sync="engineAlarmQuery.pageSize"
              @pagination="getEngineAlarmList"
            />
          </div>
          <span class="header" @click="handleShowGearboxAlarm">
            变速箱报警
            <i v-if="showGearboxAlarm" class="el-icon-caret-bottom"></i>
            <i v-else class="el-icon-caret-right"></i>
          </span>
          <el-table
            border
            :data="otherAlarmList"
            fit
            max-height="500px"
            v-if="showGearboxAlarm"
            :header-cell-style="{ background: '#eef1f8'}"
          >
            <el-table-column
              label="序号"
              type="index"
              width="55"
              align="center"
            />
            <el-table-column
              label="故障码解析"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="故障等级"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="报警开始时间"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="报警结束时间"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="处理人"
              align="center"
              prop="type"
              show-overflow-tooltip
            />
            <el-table-column
              label="报警响应时间"
              align="center"
              prop="type"
              show-overflow-tooltip
            />
            <el-table-column
              label="操作记录"
              align="center"
              prop="type"
              show-overflow-tooltip
            />
          </el-table>
          <div class="flex align-center justify-end" v-if="showGearboxAlarm">
            <Pagination
              v-show="gearboxAlarmTotal > 0"
              :total="gearboxAlarmTotal"
              :page.sync="gearboxAlarmQuery.pageNum"
              :limit.sync="gearboxAlarmQuery.pageSize"
              @pagination="getGearboxAlarmList"
            />
          </div>
          <span class="header" @click="handleShowOtherAlarm">
            其他报警
            <i v-if="showOtherAlarm" class="el-icon-caret-bottom"></i>
            <i v-else class="el-icon-caret-right"></i>
          </span>
          <el-table
            border
            :data="otherAlarmList"
            fit
            max-height="500px"
            v-if="showOtherAlarm"
            :header-cell-style="{ background: '#eef1f8'}"
          >
            <el-table-column
              label="序号"
              type="index"
              width="55"
              align="center"
            />
            <el-table-column
              label="故障码解析"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="故障等级"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="报警开始时间"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="报警结束时间"
              align="center"
              prop="size"
              show-overflow-tooltip
            />
            <el-table-column
              label="处理人"
              align="center"
              prop="type"
              show-overflow-tooltip
            />
            <el-table-column
              label="报警响应时间"
              align="center"
              prop="type"
              show-overflow-tooltip
            />
            <el-table-column
              label="操作记录"
              align="center"
              prop="type"
              show-overflow-tooltip
            />
          </el-table>
          <div class="flex align-center justify-end" v-if="showOtherAlarm">
            <Pagination
              v-show="otherAlarmTotal > 0"
              :total="otherAlarmTotal"
              :page.sync="otherAlarmQuery.pageNum"
              :limit.sync="otherAlarmQuery.pageSize"
              @pagination="getOtherAlarmList"
            />
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="recordInfo">
        <template slot="title">
          <span>5.诊断建议记录</span>
        </template>
        <div style="margin-bottom: 10px">
          <jereh-button
            type="primary"
            plain
            size="small"
            @click.native.stop="handleShow"
          >
            诊断建议
          </jereh-button>
        </div>
        <el-table
          border
          :data="suggestionList"
          fit
          max-height="500px"
          :header-cell-style="{ background: '#eef1f8'}"
        >
          <el-table-column label="序号" type="index" width="55" align="center" />
          <el-table-column
            label="报告名称"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="生成人"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="生成时间"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作"
            align="center"
            prop="size"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-view"
                @click.native.stop="handlePreview(scope.row)"
              >
                预览
              </jereh-button>
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-download"
                @click="handleDownload(scope.row)"
              >
                下载
              </jereh-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex align-center justify-end" v-if="showSuggestion">
          <Pagination
            v-show="suggestionTotal > 0"
            :total="suggestionTotal"
            :page.sync="suggestionQuery.pageNum"
            :limit.sync="suggestionQuery.pageSize"
            @pagination="getSuggestionList"
          />
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      v-dialogDrag
      title="诊断建议"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-table border :data="newSuggestion" fit max-height="500px" :header-cell-style="{ background: '#eef1f8'}">
        <el-table-column label="序号" type="index" width="55" align="center" />
        <el-table-column
          label="建议类别"
          align="center"
          prop="suggestionType"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <jereh-select
              v-model="scope.row.suggestionType"
              filterable
              ph="请选择建议类别"
              @change="handleTypeChange($event, scope.$index)"
              :dict="dict.type.diagnosis_suggestion_type"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="建议项"
          align="center"
          prop="suggestionObj"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <jereh-select
              v-model="scope.row.suggestionObj"
              filterable
              ph="请选择建议项"
              :dict="
                scope.row.suggestionType === '本地巡检'
                  ? dict.type.diagnosis_suggestion_object_inspection
                  : dict.type.diagnosis_suggestion_object_maintenance
              "
            />
          </template>
        </el-table-column>
        <el-table-column
          label="建议内容"
          align="center"
          prop="suggestionContent"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <jereh-input
              v-model="scope.row.suggestionContent"
              ph="请输入建议内容"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
          prop="suggestionRemark"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <jereh-input v-model="scope.row.suggestionRemark" ph="请输入备注" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <jereh-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click.native.stop="handleAdd()"
            >
              新增
            </jereh-button>
            <jereh-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index)"
            >
              删除
            </jereh-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <jereh-button @click="handleSubmit">提 交</jereh-button>
        <jereh-button @click="dialogVisible = false">取 消</jereh-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag title="诊断建议报告" :visible.sync="isShow" v-if="isShow" append-to-body>
      <iframe
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="100%"
        height="800px"
        :src="link"
      >
      </iframe>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { getHealthCondition, getMaintenanceInfo, saveHealthReport2Doc } from "@/api/cmms/device.js";

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
  dicts: [
    "diagnosis_suggestion_type",
    "diagnosis_suggestion_object_maintenance",
    "diagnosis_suggestion_object_inspection",
  ],
  data() {
    return {
      activeNames: ['healthRate', 'problemInfo', 'maintenanceInfo', 'alarmInfo', 'recordInfo'],
      productCode: this.deviceData.productCode,
      healthCondition: {},
      isShow: false,
      link: null,
      problemList: [],
      maintenanceTotal: 0,
      maintenanceQuery: {
        deviceId: "",
        pageNum: 1,
        pageSize: 10,
      },
      maintenanceList: [],
      engineAlarmTotal: 0,
      engineAlarmQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      engineAlarmList: [
        { type: 1, name: "1", size: 256 },
        { type: 2, name: "2", size: 256 },
        { type: 1, name: "3", size: 256 },
        { type: 2, name: "4", size: 256 },
      ],
      gearboxAlarmTotal: 0,
      gearboxAlarmQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      gearboxAlarmList: [
        { type: 1, name: "1", size: 256 },
        { type: 2, name: "2", size: 256 },
        { type: 1, name: "3", size: 256 },
        { type: 2, name: "4", size: 256 },
      ],
      otherAlarmTotal: 0,
      otherAlarmQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      otherAlarmList: [
        { type: 1, name: "1", size: 256 },
        { type: 2, name: "2", size: 256 },
        { type: 1, name: "3", size: 256 },
        { type: 2, name: "4", size: 256 },
      ],
      suggestionTotal: 0,
      suggestionQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      suggestionList: [
        { type: 1, name: "1", size: 256 },
        { type: 2, name: "2", size: 256 },
        { type: 1, name: "3", size: 256 },
        { type: 2, name: "4", size: 256 },
      ],
      // 审核建议弹窗
      dialogVisible: false,
      newSuggestion: [{}],
      showScore: true,
      showProblem: true,
      showMaintenance: true,
      showAlarm: true,
      showEngineAlarm: true,
      showGearboxAlarm: true,
      showOtherAlarm: true,
      showSuggestion: true,
    };
  },
  created() {
    this.getProblemList();
    this.getMaintenanceList();
    this.getEngineAlarmList();
    this.getGearboxAlarmList();
    this.getOtherAlarmList();
    this.getSuggestionList();
  },
  mounted() {
    this.getHealthInfo();
  },
  methods: {
    getHealthInfo() {
      getHealthCondition(this.deviceId)
        .then((res) => {
          this.healthCondition = res.data ? res.data : this.healthCondition;
          this.drawChart();
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("获取健康信息失败！");
        });
    },
    drawChart() {
      const data = [
        this.healthCondition.serviceTimeScore,
        this.healthCondition.runtimeScore,
        this.healthCondition.warningScore,
        this.healthCondition.maintainScore,
        this.healthCondition.energyCostScore,
      ];
      const chart = document.getElementById("radarChart");
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
          tooltip: {},
          radar: {
            radius: "80%", //大小
            center: ["50%", "50%"], // 图的位置
            indicator: [
              { name: "服役时间", max: "100" },
              { name: "运行时间", max: "100" },
              { name: "故障缺陷", max: "100" },
              { name: "维修次数", max: "100" },
              { name: "能耗", max: "100" },
            ],
          },
          series: [
            {
              name: "健康状况分析",
              type: "radar",
              data: [
                {
                  symbol: "circle",
                  symbolSize: 5,
                  value: data,
                  areaStyle: { color: "rgba(64, 205, 241, 0.2)" },
                  itemStyle: {
                    normal: {
                      color: "rgba(5, 128, 242, 0.8)",
                    },
                  },
                  areaStyle: {
                    normal: {
                      color: "#0580f2",
                    },
                  },
                },
              ],
            },
          ],
        };
        myChart.setOption(option);
      }
    },
    getProblemList() {
      console.log("获取问题信息");
    },
    getMaintenanceList() {
      this.maintenanceQuery.deviceId = this.productCode;
      getMaintenanceInfo(this.maintenanceQuery)
        .then((res) => {
          this.maintenanceList = res.rows;
          this.maintenanceTotal = res.total;
          console.log(this.maintenanceList);
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("获取维保信息失败！");
        });
    },
    getEngineAlarmList() {
      console.log("获取发动机报警信息");
    },
    getGearboxAlarmList() {
      console.log("获取变速箱报警信息");
    },
    getOtherAlarmList() {
      console.log("获取其他报警信息");
    },
    getSuggestionList() {
      console.log("获取诊断建议信息");
    },
    handleDiagnosis() {
      console.log("进行健康诊断");
    },
    handlePreview() {
      console.log("预览数据");
    },
    handleDownload() {
      console.log("下载数据");
    },
    handleShow() {
      this.dialogVisible = true;
    },
    handleAdd() {
      this.newSuggestion.push({});
    },
    handleDelete(index) {
      this.newSuggestion.splice(index, 1);
    },
    handleSubmit() {
      this.$router.push({
        path: "/cmms/device/print",
        query: { id: this.deviceData.projectItem,type:3 },
      });
    },
    handleTypeChange(val, index) {
      this.$set(this.newSuggestion[index], "suggestionObj", "");
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    handleShowScore() {
      this.showScore = !this.showScore;
    },
    handleShowProblem() {
      this.showProblem = !this.showProblem;
    },
    handleShowMaintenance() {
      this.showMaintenance = !this.showMaintenance;
    },
    handleShowAlarm() {
      this.showAlarm = !this.showAlarm;
    },
    handleShowEngineAlarm() {
      this.showEngineAlarm = !this.showEngineAlarm;
    },
    handleShowGearboxAlarm() {
      this.showGearboxAlarm = !this.showGearboxAlarm;
    },
    handleShowOtherAlarm() {
      this.showOtherAlarm = !this.showOtherAlarm;
    },
    handleShowSuggestion() {
      this.showSuggestion = !this.showSuggestion;
    },
  },
};
</script>

<style scoped>
.header {
  font-size: 15px;
  font-weight: 700;
  background-color: #fdeee8;
  display: block;
  border-left: 3px solid #EA5514;
  width: 100px;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 20px
}
</style>
