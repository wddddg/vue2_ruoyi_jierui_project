<template>
  <el-container>
    <el-header height="auto" style="margin-top: 20px">
      <jereh-button size="medium" @click="save_product">保存</jereh-button>
    </el-header>
    <el-main>
      <el-table border ref="multipleTable" :row-key="getRowVoucherKeys" style="width: 30%"
        :data="tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)" tooltip-effect="dark"
        @selection-change="handleSelectionChange" :header-cell-class-name="cellClas">
        <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
        <el-table-column prop="dictValue" label="产品名称" width="120"></el-table-column>
        <el-table-column prop="dictValue" label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" type="text"/>
          </template>
        </el-table-column>
        <el-table-column prop="dictCode" label="注" width="90"></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <div class="tabListPage" style="width: 30%">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
 
 <script>
export default {
  dicts: ['component_type', 'component_name'],
  data() {
    return {
      inde: 12,
      value: [],
      checkList: [],//选择列表
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 190,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      key: 0,
      //   当前选择的行的id
      templateSelection: "",
      //   当前选择的行的数据
      checkList: [],
    }
  },
  created() {
    this.getDicts("component_name").then(response => {
      this.tableData = response.data
      this.totalCount = response.data.length
    });

  },
  methods: {

    cellClas(row) {
      // console.log(row)
      if (row.columnIndex === 0) {
        return 'DisableSelection'
      }
    },
    singleElection(row) {
      this.templateSelection = row.id
      this.checkList = this.tableData.filter((item) => item.id === row.id)
      console.log(`该行的编号为${row.id}`)
    },
    getRowVoucherKeys(row) {
      // console.log(row.dictCode);
      // this.inde=row.dictCode
      return row.dictCode
    },
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数 
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },
    save_product() {
      console.log(this.value);
      console.log(this.value[136]);
      console.log(this.value[137]);
      console.log(this.value[138]);
      console.log(this.tableData);

    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      console.log(val);
      //  this.checkList = val;
      //  console.log(this.checkList, 11);
    },
  }
}
</script>
 <style>
 .table /deep/ .DisableSelection>.cell {
   display: none !important;
   
 }
 </style>