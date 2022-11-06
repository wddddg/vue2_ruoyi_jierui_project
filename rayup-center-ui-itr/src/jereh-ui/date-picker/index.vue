<template>
  <el-date-picker clearable
                  v-model="dataValue"
                  :type="type"
                  :format="format"
                  :placeholder="ph"
                  :disabled="disabled"
                  :value-format="valueFormat"
                  range-separator="至"
                  :start-placeholder="startPh"
                  :end-placeholder="endPh"
                  :picker-options="needPickerOptions ? pickerOptions : ''"
                  @change="change"
  >
  </el-date-picker>
</template>

<script>
export default {
  name: 'jereh-date-picker',
  props: {
    value: [String, Array, Object, Date, Number],
    ph: {
      type: String,
      default: '请选择日期'
    },
    startPh: {
      type: String,
      default: '开始日期'
    },
    endPh: {
      type: String,
      default: '结束日期'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'date'
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    valueFormat: {
      type: String,
      default: ''
    },
    needPickerOptions: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dataValue: this.value,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
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
