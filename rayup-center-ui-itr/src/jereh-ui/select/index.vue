<template>
  <el-select v-model="dataValue" filterable
              :multiple="multiple"
              :placeholder="ph" clearable
              :disabled="disabled"
              @change="change"
  >
    <el-option
      v-for="(item,index) in dict"
      :key="index"
      :label="item[labelName]"
      :value="item[valueName]"
    ></el-option>
  </el-select>
</template>

<script>

export default {
  name: 'jereh-select',
  props: {
    value: [String, Array, Object],
    ph: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dict: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: 'label'
    },
    valueName: {
      type: String,
      default: 'value'
    },
  },
  data() {
    return {
      dataValue: this.value
    }
  },
  watch: {
    value() {
      this.dataValue = this.value
    }
  },
  methods: {
    change(data) {
      this.$emit('input', data)
      this.$emit('change', data)
    }
  }
}
</script>

<style scoped>

</style>
