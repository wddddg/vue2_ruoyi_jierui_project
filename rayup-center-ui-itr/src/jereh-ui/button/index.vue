<template>
  <el-button
    :type="type"
    :plain="plain"
    :icon="icon"
    :size="size"
    :round="round"
    @click="handleClick"
    :disabled="disabled"
  ><slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'jereh-button',
  props:{
    type: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'mini',
    },
    plain: {
      type: Boolean,
      default: true,
    },
    round: {
      type: Boolean,
      default: false,
    },
     disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {

    };
  },
  methods: {
    handleClick(){
      this.$emit("click");
    },
  },
}
</script>

<style scoped>

</style>
