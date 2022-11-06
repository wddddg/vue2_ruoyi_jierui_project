<template>
  <!--    服务信息绑定弹窗-->
  <el-dialog title="绑定设备" :visible.sync="open" width="900px" append-to-body
             :close-on-click-modal="false"
  >
    <el-alert
      v-if="alert"
      :title="alert"
      type="error"
      :closable="false"
    >
    </el-alert>
    <el-form class="mt-2 flex justify-between" :model="queryParams" ref="queryParams" size="mini"
             :inline="true"
             label-width="120px"
    >
      <el-form-item prop="projectItem" style="width: 120px;">
        <jereh-input
          v-model="queryParams.projectItem"
          ph="项目编码分项"
          clearable
          @keyup.enter.native="getList"
        />
      </el-form-item>
      <el-form-item prop="productCode" style="width: 120px;">
        <jereh-input
          v-model="queryParams.productCode"
          ph="产品编号"
          clearable
          @keyup.enter.native="getList"
        />
      </el-form-item>
      <el-form-item prop="productName" style="width: 120px;">
        <jereh-select
          v-model="queryParams.productName"
          filterable
          ph="产品名称"
          clearable
          @keyup.enter.native="getList"
          :dict="dict.type.product_name"
        />
      </el-form-item>
      <el-form-item>
        <jereh-button type="primary" size="mini" @click="getList">搜索</jereh-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border>
      <af-table-column type="index" align="center" width="50"/>
      <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip/>
      <af-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip/>
      <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip/>
      <af-table-column label="是否选定" align="center" fixed="right" width="150">
        <template slot-scope="scope">
          <!-- <el-radio-group v-model="scope.row.select" @change="selectOne($event,scope.row)">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group> -->
          <jereh-button type="text" :plain="false" icon="el-icon-edit" @click="selectOne(scope.row)">选定</jereh-button>
        </template>
      </af-table-column>
    </el-table>
    <Pagination
      v-show="queryParams.total>0"
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <div class="flex justify-end mt-3 mx-1" v-if="multiple">
      <jereh-button @click="selectBinding">确定</jereh-button>
    </div>
  </el-dialog>
</template>

<script>
import { sdDeviceInfoPage } from '../../../../api/cmms/device'

export default {
  name: 'servicePoolBinding',
  dicts: ['product_name'],
  props: {
    alert: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      queryParams: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        projectItem: null,
        productName: null,
        productCode: null,
        agency: 0
      },
      list: [],
      open: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    selectOne(row) {
      if (!this.multiple) {
        this.$emit('confirm', row)
        this.getList()
        this.open = false
      }
    },
    openDialog() {
      this.open = true
    },
    getList() {
      sdDeviceInfoPage(this.queryParams).then(res => {
        this.queryParams.total = res.total
        this.list = res.rows
      })
    },
    selectBinding() {
      let resultList = []
      this.list.forEach(i => {
        if (i.select === 1) {
          resultList.push(i)
        }
      })
      // 去重
      const res = new Map()
      resultList = resultList.filter((item) => !res.has(item.id) && res.set(item, 1))
      this.$emit('confirm', resultList)
      this.getList()
      this.open = false
    }
  }
}
</script>

<style scoped>

</style>
