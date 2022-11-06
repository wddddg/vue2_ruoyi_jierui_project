<template>
  <div>
    <el-descriptions
      v-for="(item, index) in deviceIotData"
      :key="index"
      class="mt-2"
      :title="item.name"
      style="width: 100%"
      :column="3"
      border
    >
      <el-descriptions-item
        v-for="item1 in item.groupData"
        :key="item1.unit"
      >
        <template slot="label">
          {{ item1.cnName + "(" + item1.unit + ")" }}
        </template>
        {{ item1.value }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "projectInformation",
  props: {
    deviceIotData: {
      required: true,
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
