<template>
  <div v-loading="loading">
    <div style="margin-bottom: 10px">
      <jereh-button type="primary" plain size="small" @click="showMonitor = 1" :class="getClass(1)">
        数据监控
      </jereh-button>
      <jereh-button type="primary" plain size="small" @click="showMonitor = 2" :class="getClass(2)">
        视频监控
      </jereh-button>
    </div>
    <div>
      <iframe
        v-if="showMonitor === 1"
        :src="dataMonitorUrl"
        style="width: 100%; height: 800px"
      ></iframe>
      <iframe
        v-if="showMonitor === 2"
        :src="videoMonitorUrl"
        style="width: 100%; height: 800px"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { getIotToken } from "@/api/cmms/device.js";

export default {
  name: "monitorInfo",
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
      loading: false,
      showMonitor: 1,
      deviceNo: "",
      token: "",
      dataMonitorUrl: process.env.VUE_APP_IOT_DATA_MONITOR,
      videoMonitorUrl: process.env.VUE_APP_IOT_VIDEO_MONITOR,
    };
  },
  created() {
    this.deviceNo = this.deviceData.productCode
      ? this.deviceData.productCode
      : "";
    this.getToken();
  },
  methods: {
    getClass(index) {
      return this.showMonitor === index ? 'btnClick' : 'btnNormal'
    },
    getToken() {
      this.loading = true
      getIotToken()
        .then((res) => {
          this.loading = false
          if (res.msg) {
            this.token = res.msg;
            this.dataMonitorUrl =
              this.dataMonitorUrl +
              "&deviceNo=" +
              this.deviceNo +
              "&secret=" +
              this.token;
            this.videoMonitorUrl =
              this.videoMonitorUrl +
              "deviceNo=" +
              this.deviceNo +
              "&secret=" +
              this.token;
          }
          console.log(this.dataMonitorUrl)
          console.log(this.videoMonitorUrl)
        })
        .catch((error) => {
          this.loading = false
          console.log(error);
          this.$message.error("获取iot的token失败！");
        });
    },
  },
};
</script>

<style scoped>
::v-deep .btnNormal {
  color:#EA5514 !important;
  background:rgb(253, 238, 232) !important;
  border-color:rgb(247, 187, 161) !important
}
::v-deep .btnClick {
  background:rgb(238, 119, 67) !important;
  border-color:rgb(238, 119, 67) !important;
  color:#FFF !important
}
</style>
