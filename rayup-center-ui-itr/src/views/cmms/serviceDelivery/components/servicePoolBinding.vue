<template>
  <!--    服务信息绑定弹窗-->
  <el-dialog title="服务信息绑定" :visible.sync="open" v-if="open" width="60%" append-to-body
             :close-on-click-modal="false"
  >
    <el-form class="mt-2 flex" :model="queryParams" ref="queryParams" size="mini"
             :inline="true"
             label-width="120px"
    >
      <el-form-item prop="serviceCode" style="width: 120px;">
        <jereh-input
          v-model="queryParams.serviceCode"
          ph="服务编码"
          clearable
          @keyup.enter.native="getList"
        />
      </el-form-item>
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
    <el-table :data="list" border @selection-change="handleSelectionChange">
      <af-table-column type="index" align="center" width="50"/>
      <af-table-column label="服务编码" align="center" prop="serviceCode" show-overflow-tooltip/>
      <af-table-column label="项目编码分项" align="center" prop="projectItem" show-overflow-tooltip/>
      <af-table-column label="产品编号" align="center" prop="productCode" show-overflow-tooltip/>
      <af-table-column label="产品名称" align="center" prop="productName" show-overflow-tooltip/>
      <af-table-column label="操作" align="center" fixed="right" width="150" v-if="single">
        <template slot-scope="scope">
          <jereh-button type="text" :plain="false" icon="el-icon-edit" @click="handleSelect(scope.row)">选定
          </jereh-button>
        </template>
      </af-table-column>
      <af-table-column type="selection" width="55" label="是否选定" align="center" v-if="!single"></af-table-column>
    </el-table>
    <Pagination
      v-show="queryParams.total>0"
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <div class="flex justify-end mt-3 mx-1" v-if="!single">
      <jereh-button @click="selectBinding">确定</jereh-button>
    </div>
  </el-dialog>
</template>

<script>
import { listSdServicePool } from '../../../../api/cmms/sdServicePool'

export default {
  name: 'servicePoolBinding',
  dicts: ['product_name'],
  props: {
    single: {
      type: Boolean,
      default: false
    },
    serviceType: {
      type: String,
      default: '设备交付'
    }
  },
  data() {
    return {
      queryParams: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        serviceCode: null,
        projectItem: null,
        productName: null,
        productCode: null,
        serviceType: null
      },
      list: [],
      open: false,
      serviceCodeList: [],
      selectOptions: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelect(row) {
      this.$emit('confirm', row.serviceCode)
      this.getList()
      this.open = false
    },
    openDialog() {
      this.open = true
    },
    getList() {
      this.queryParams.serviceType = this.serviceType
      listSdServicePool(this.queryParams).then(res => {
        this.queryParams.total = res.total
        this.list = res.rows
      })
    },
    handleSelectionChange(val) {
      this.selectOptions = val
    },
    selectBinding() {
      // this.list.forEach(i => {
      //   if (i.select === 1) {
      //     this.serviceCodeList.push(i.serviceCode)
      //   }
      // })
      if (Array.isArray(this.selectOptions) && this.selectOptions.length) {
        this.serviceCodeList = this.selectOptions.map(item => item.serviceCode)
      } else {
        this.serviceCodeList = []
      }
      // 去重
      const res = new Map()
      this.serviceCodeList = this.serviceCodeList.filter((item) => !res.has(item) && res.set(item, 1))
      this.$emit('confirm', this.serviceCodeList)
      this.open = false
    }
  }
}
</script>

<style scoped>

</style>
