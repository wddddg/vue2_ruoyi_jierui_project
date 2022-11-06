<template>
  <div class="app-container">
    <WorkOrder v-if="activeName === 'first'" workOrderType="ALL" />
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部工单" name="first">
        <WorkOrder v-if="activeName === 'first'" workOrderType="ALL" />
      </el-tab-pane>
      <el-tab-pane label="待处理" name="second">
        <WorkOrder v-if="activeName === 'second'" workOrderType="DCL" />
      </el-tab-pane>
      <el-tab-pane label="处理中" name="third">
        <WorkOrder v-if="activeName === 'third'" workOrderType="CLZ" />
      </el-tab-pane>
      <el-tab-pane label="已完成" name="fourth">
        <WorkOrder v-if="activeName === 'fourth'" workOrderType="YWC" />
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import WorkOrder from "./work-order/WorkOrder.vue";

export default {
  name: "service-task",
  components: { WorkOrder },
  data() {
    return {
      activeName: "first",
    };
  },
  watch: {},
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>