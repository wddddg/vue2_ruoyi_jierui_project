<template>
  <div class="app-container">
    <BingDing/>
  </div>
</template>

<script>
import BingDing from './BingDing.vue'
export default {
  name: "equipment-binding",
  components: {
    BingDing
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
