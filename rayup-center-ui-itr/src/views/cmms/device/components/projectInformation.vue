<template>
  <el-descriptions class="margin-top" style="width: 100%" :column="3" border>
    <el-descriptions-item>
      <template slot="label"> 项目编码 </template>
      {{ deviceData.projectItem }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label"> 产品编号 </template>
      {{ deviceData.productCode }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label"> 产品线 </template>
      {{ deviceData.productLine }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label"> 研发负责人 </template>
      {{ deviceData.rdDirector }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label"> 测试负责人 </template>
      {{ deviceData.tester }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: "projectInformation",
  props: {
    deviceData: {
      required: true,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped></style>
