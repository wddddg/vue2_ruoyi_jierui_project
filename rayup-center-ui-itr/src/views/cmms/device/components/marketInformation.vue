<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="marketInfo">
        <template slot="title">
          <span>1.市场基础信息</span>
        </template>
        <el-descriptions
          class="margin-top"
          style="width: 100%"
          :column="4"
          border
          :labelStyle="{ width: '10%' }"
          :contentStyle="{ width: '15%' }"
        >
          <el-descriptions-item>
            <template slot="label"> 市场所属区域 </template>
            {{ deviceData.marketerArea }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 市场区域 </template>
            {{ deviceData.deviceArea }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 市场负责人 </template>
            {{ deviceData.maketDirector }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 市场经理 </template>
            {{ deviceData.markerMag }}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
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
      activeNames: ['marketInfo']
    }
  }
};
</script>

<style scoped></style>
