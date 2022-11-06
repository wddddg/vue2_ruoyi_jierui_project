<template>
  <el-table :data="partData.rows" style="width: 100%">
    <el-table-column prop="componentManufacturer" label="品牌">
    </el-table-column>
    <el-table-column prop="componentType" label="型号"> </el-table-column>
    <el-table-column prop="componentSerial" label="序列号"> </el-table-column>
    <el-table-column
      v-if="componentLiquidSerial"
      prop="componentLiquidSerial"
      label="液力端序列号"
    >
    </el-table-column>
    <el-table-column label="照片">
      <template slot-scope="scope">
        <image-preview :src="scope.row.componentPic" :width="50" :height="50" />
      </template>
    </el-table-column>
  </el-table>
</template>
<style></style>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  props: {
    partData: {
      required: true,
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  created: {},
};
</script>
