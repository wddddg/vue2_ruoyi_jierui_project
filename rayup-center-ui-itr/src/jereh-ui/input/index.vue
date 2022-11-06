<template>
  <el-input
    v-model="dataValue"
    :placeholder="ph"
    clearable
    :disabled="disabled"
    :type="type"
    @input="input"
    @keyup.enter.native="keyupEnter"
    @click.native="clickInput"
    :min="min"
    :max="max"
    :rows="rows"
  />
</template>

<script>
export default {
  name: 'jereh-input',
  props: {
    value: [String, Number, Object],
    ph: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    rows: {
      type: Number,
      default: 2
    }
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
    input(data) {
      if (this.type === 'number' && !this.min) {
        if (data < this.min) {
          data = this.min
        }
      }
      this.$emit('input', data)
      this.$emit('change', data)
    },
    keyupEnter() {
      this.$emit('enter')
    },
    clickInput() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>
