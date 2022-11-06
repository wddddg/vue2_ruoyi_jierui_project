<template>
  <el-select v-model="dataValue" :multiple="multiple" filterable remote
              reserve-keyword :placeholder="ph" :disabled="disabled" clearable
              :remote-method="remoteUser" :loading="loading" @change="change"
  >
    <el-option v-for="item in bindUserOptions" :key="item.userId"
               :label="item.nickName"
               :value="item[bindValue]"
    >
    </el-option>
  </el-select>
</template>

<script>
import { remoteUser } from '../../api/cmms/device'

export default {
  name: 'jereh-person-select',
  props: {
    value: [String, Array, Object],
    ph: {
      type: String,
      default: '请输入工号或姓名'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    bindValue:{
      type: String,
      default: 'nickName'
    },
    initialize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      bindUserOptions: [],
      dataValue: this.value,
    }
  },
  watch:{
    value(){
      this.dataValue = this.value
    }
  },
  created() {
    if (this.initialize) {
      remoteUser({ searchValue: 'all' }).then(res => {
        this.bindUserOptions = res.data
      })
    }
  },
  methods: {
    change(data){
      console.log(data)
      this.$emit("input", data);
      this.$emit("change", data);
    },
    remoteUser(query){
      if (query !== '') {
        this.loading = true
        remoteUser({ searchValue: query }).then(res => {
          this.loading = false
          this.bindUserOptions = res.data
        })
      } else {
        this.bindUserOptions = []
      }
    },
  }
}
</script>

<style scoped>

</style>
