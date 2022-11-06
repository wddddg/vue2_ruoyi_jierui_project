<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item v-for='(item, index) in arrli' :key='index' :title="item.name" :name="index">
      <listarr :partData="partData"></listarr>
    </el-collapse-item>
  </el-collapse>

</template>

<script>
import listarr from '../components/listArr.vue'
export default {
  components: {
    listarr,
  },
  data() {
    return {
      activeNames: ['1'],
      namearr:'',//点击第几个
      namearrED:'',//点击的数据
    };
  },
  props: {
    arrli: {
      required: true,
      type: Array,
      default: () => {
        return []
      }
    },
    partData: {
      required: true,
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    handleChange(val) {
      this.namearr=val[1]
      this.namearrED=this.arrli[this.namearr].name
      this.$emit('namearrED', this.namearrED)
    },
  }
}
</script>
<style scoped>
</style>







 <!-- <template>
  <el-table :data="arrli" :border="true" :show-header="false" style="width: 100%" @expand-change="handle" >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <listarr></listarr>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column prop="name">
    </el-table-column>



  </el-table>
</template>
<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<script>
import listarr from '../components/listArr.vue'
export default {
  components: {
    listarr,
  },
  props: {
    arrli: {
      required: true,
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      component: ''
    }
  },
  created() {
    this.handle()
    this.emitFn()
  },
  methods: {
    handle(row) {
      this.component = row.name
      this.$emit('component', this.component)
    },
  }
}
</script> -->
