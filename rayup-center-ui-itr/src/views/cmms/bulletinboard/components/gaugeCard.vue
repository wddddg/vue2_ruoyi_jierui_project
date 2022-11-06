<template #extra>
  <div ref="chart" style="width: 130px; height: 60px"></div>
</template>

<script>
import echarts from "echarts";
import { number } from "echarts/lib/export";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "300px",
    },
    height: {
      type: String,
      default: "100px",
    },
    scoreName: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.drawMyChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    drawMyChart() {
      let myChart = echarts.init(this.$refs.chart);
      // var myChart = echarts.init(document.getElementById("chart"));

      let option = {
        series: [
          {
            radius: "100%",
            type: "gauge",
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 150,
            splitNumber: 12,
            itemStyle: {
              color: "#58D9F9",
              shadowColor: "rgba(0,138,255,0.45)",
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18,
            },
            pointer: {
              icon: "./icon/pointer.png",
              length: "75%",
              width: 1,
              offsetCenter: [0, "5%"],
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 2,
                color: [[1, "#3e8b85"]],
              },
            },
            axisTick: {
              splitNumber: 2,
              show: false,
              lineStyle: {
                width: 2,
                color: "#999",
              },
            },
            splitLine: {
              length: 12,
              show: false,
              lineStyle: {
                width: 3,
                color: "#999",
              },
            },
            axisLabel: {
              show: false,
              distance: 30,
              color: "#999",
              fontSize: 20,
            },
            detail: {
              show: false,
            },
            title: {
              show: false,
            },

            data: [
              {
                value: this.scoreName,
              },
            ],
          },
        ],
      };
      // 绘制图表
      myChart.setOption(option);
    },
  },
};
</script>
