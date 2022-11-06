<template>
  <div>
    <el-select
      v-model="currentValue"
      multiple
      :placeholder="ph"
      @focus="openPersonnelBindingDialog(currentValue)"
      ref="cascader"
      :disabled="disabled"
    />
    <PersonnelBinding
      :open="personnelBindingVisible"
      :selectOrRadio="radioOrSelect"
      @closeDialog="colsePersonnelBindingDialog"
      @bindingData="bindingData"
      :writeBack="writeBack"
    />
  </div>
</template>

<script>
import PersonnelBinding from "@/views/cmms/itr/components/PersonnelBinding/index.vue";
export default {
  data() {
    return {
      personnelBindingVisible: false,
      currentValue: this.value,
      writeBack: [],
    };
  },
  components: {
    PersonnelBinding,
  },
  props: {
    value: [String, Array],
    ph: {
      type: String,
      default: "请选择",
    },
    radioOrSelect: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openPersonnelBindingDialog(item) {
      if (this.$refs.cascader) {
        this.$refs.cascader.visible = false;
      }
      if (item) {
        this.writeBack = item.map((element) => {
          return element.split("(")[0];
        });
      }
      this.personnelBindingVisible = true;
    },
    colsePersonnelBindingDialog(value) {
      this.personnelBindingVisible = value;
    },
    bindingData(value) {
      this.$emit(
        "bindingData",
        value.map((item) => {
          return `${item.nickName}(${item.userName})`;
        })
      );
    },
  },
  watch: {
    value: {
      handler(newValue) {
        if (typeof newValue === "string") {
          this.currentValue = newValue.split(",");
        } else {
          this.currentValue = newValue;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
</style>