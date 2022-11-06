<template>
  <div>
    <div style="margin-bottom: 10px">
      <jereh-button type="primary" plain size="small" @click="handleClick(0)" :class="getClass(0)">
        当前报警
      </jereh-button>
      <jereh-button type="primary" plain size="small" @click="handleClick(1)" :class="getClass(1)">
        历史报警
      </jereh-button>
      <jereh-button type="primary" plain size="small" @click="showFault = true">
        故障查询
      </jereh-button>
    </div>
    <div>
      <currentAlarm
        :deviceData="deviceData"
        v-if="alarmType === 0"
      ></currentAlarm>
      <historyAlarm
        :deviceData="deviceData"
        v-if="alarmType === 1"
      ></historyAlarm>
      <el-dialog v-dialogDrag title="故障查询" :visible.sync="showFault" v-if="showFault" width="50%">
        <div style="height: 70vh; overflow: auto">
          <faultQuery :deviceData="deviceData" ></faultQuery>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import currentAlarm from "./currentAlarm.vue";
import historyAlarm from "./historyAlarm.vue";
import faultQuery from "./faultQuery.vue";
export default {
  name: "alarmInfo",
  components: { currentAlarm, historyAlarm, faultQuery },
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
      alarmType: 0,
      showFault: false
    };
  },
  methods: {
    handleClick(index) {
      this.$set(this, 'alarmType', index)
    },
    getClass(index) {
      return this.alarmType === index ? 'btnClick' : 'btnNormal'
    }
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
  ::v-deep .el-dialog__body {
    padding: 0px;
  }
</style>
