<template>
  <div class="app-container">
    <ToBeCollected />
  </div>
</template>

<script>
import ToBeCollected from './ToBeCollected.vue'
export default {
  name: "equipment-collected",
  components: {
    ToBeCollected
  },
  data() {
    return {
      activeName: "first",
      dzbValue: 0
    };
  },
  watch: {},
  created() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
::v-deep .el-badge__content.is-fixed{
  margin-top: 10px;
}
</style>
