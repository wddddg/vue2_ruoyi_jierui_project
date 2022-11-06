<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>
  
  <script>
import echarts from "echarts";
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
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    xGroup: {
      type: Array,
      default: [],
    },
    yGroup: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          type: "category",
          data: this.yGroup,
        },
        series: [
          {
            name: "2011",
            type: "bar",
            barWidth: "20%",
            data: this.xGroup,
          },
        ],
      });
    },
  },
};
</script>
  