<template>
  <div style="margin-top: 40px">
    <div style="margin-left: 5%">
      <jereh-button size="medium" @click="save_name">保存</jereh-button>
    </div>
    <div style="margin-top: 10px; text-align: center;">
      <div style="width: 30%;display: inline-block;vertical-align: top;">
        <el-table border ref="multipleTable" :row-key="getRowVoucherKeys"
          :data="tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)" tooltip-effect="dark"
          @select="userChoose" :header-cell-class-name="cellClass" class="table"
          :header-cell-style="{ background: '#F5F7FA' }">
          <el-table-column type="selection" label="选择" :reserve-selection="true" width="55"></el-table-column>
          <el-table-column label="序号" width="80px">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="dictValue" label="产品名称" width="150"></el-table-column>
          <!-- <el-table-column prop="dictCode" label="备注" width="120"></el-table-column> -->
          <el-table-column prop="dictValue" label="备注">
            <template slot-scope="scope" class="inputDeep">
              <el-input v-model="scope.row.remark" type="text" />
            </template>

          </el-table-column>
        </el-table>
        <div style="margin-top:20px;position: relative;height: 30px;overflow: hidden;">
          <div class="tabListPage" style="position: absolute; right: 0;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
              layout="total, sizes, prev, pager, next" :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </div>

      <div style="width: 30%;display: inline-block;vertical-align: top;">
        <el-table border ref="multipleTable1" :row-key="getRowVoucherKeys"
          :data="tableData1.slice((currentPage1 - 1) * PageSize1, currentPage1 * PageSize1)" tooltip-effect="dark"
          @selection-change="handleSelectionChange1" :header-cell-style="{ background: '#F5F7FA' }">
          <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
          <el-table-column label="序号" width="80px">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="dictValue" label="部件名称" width="150"></el-table-column>
          <!-- <el-table-column prop="dictCode" label="备注" width="120"></el-table-column> -->
          <el-table-column prop="dictValue" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" type="text" />
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px;position: relative;height: 30px;overflow: hidden;">
          <div class="tabListPage" style="position: absolute; right: 0;">
            <el-pagination background @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
              :current-page="currentPage1" :page-sizes="pageSizes1" :page-size="PageSize1"
              layout="total, sizes, prev, pager, next " :total="totalCount1">
            </el-pagination>
          </div>
        </div>
      </div>

      <div style="width:30%;display: inline-block;vertical-align: top;">
        <el-table border ref="multipleTable2" :row-key="getRowVoucherKeys"
          :data="tableData2.slice((currentPage2 - 1) * PageSize1, currentPage2 * PageSize2)" tooltip-effect="dark"
          @selection-change="handleSelectionChange2" :header-cell-style="{ background: '#F5F7FA' }">
          <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
          <el-table-column label="序号" width="80px">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="dictValue" label="铭牌信息" width="150"></el-table-column>
          <!-- <el-table-column prop="dictCode" label="备注" width="120"></el-table-column> -->
          <el-table-column prop="dictValue" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" type="text" />
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px;position: relative;height: 30px;overflow: hidden;">
          <div class="tabListPage" style="position: absolute; right: 0;">
            <el-pagination background @size-change="handleSizeChange2" @current-change="handleCurrentChange2"
              :current-page="currentPage2" :page-sizes="pageSizes2" :page-size="PageSize2"
              layout="total, sizes, prev, pager, next" :total="totalCount2">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import {
  productConfiguration,
  productMappings
} from '../../../../api/cmms/device'
export default {
  dicts: ['product_name', 'component_name', 'nameplate_info'],
  data() {
    return {
      show: 0,
      checkList: null,
      partsClassificationRemark: null,
      bindldList: [],
      checkList_name: [],
      bindldlist: [],
      bindldlist2: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
      // 默认显示第几页
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 4,
      totalCount1: 4,
      totalCount2: 4,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      pageSizes1: [5, 10, 15, 20],
      pageSizes2: [5, 10, 15, 20],

      // 默认每页显示的条数（可修改）
      PageSize: 10,
      PageSize1: 10,
      PageSize2: 10,
      key: 0,
    }
  },
  created() {
    this.Initializedata()//初始化数据
  },
  methods: {
    Initializedata() {
      this.getDicts("product_name").then(response => {
        this.tableData = response.data
        this.totalCount = response.data.length
      });
      this.getDicts("component_name").then(response => {
        this.totalCount1 = response.data.length
        this.tableData1 = response.data

      });
      this.getDicts("nameplate_info").then(response => {
        this.totalCount2 = response.data.length
        this.tableData2 = response.data

      });
    },
    cellClass(row) {
      if (row.columnIndex === 0) {
        return 'DisableSelection'
      }
    },
    getRowVoucherKeys(row) {
      return row.dictCode
    },
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数 
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    handleSizeChange1(val) {
      // 改变每页显示的条数 
      this.PageSize1 = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage1 = 1
    },
    handleSizeChange2(val) {
      // 改变每页显示的条数 
      this.PageSize2 = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage2 = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },
    // 显示第几页
    handleCurrentChange1(val) {
      // 改变默认的页数
      this.currentPage1 = val
    },
    handleCurrentChange2(val) {
      // 改变默认的页数
      this.currentPage2 = val
    },
    handleSelectionChange1(val) {
      if (this.checkList) {
        this.checkList_name = val
        this.bindldlist = []

      } else {
        this.$refs.multipleTable1.clearSelection();
      }
    },
    handleSelectionChange2(val) {
      if (this.checkList) {
        this.checkList_name = val
        this.bindldlist2 = []

      } else {
        this.$refs.multipleTable2.clearSelection();
      }
    },
    save_type() {
    },
    save_name() {
      this.bindldlist = []
      this.bindldlist2 = []
      this.$refs.multipleTable1.selection.forEach(element => {
        this.bindldlist.push({ "partsId": element.dictCode, "partsRemark": element.remark })
      });
      this.$refs.multipleTable2.selection.forEach(element => {
        this.bindldlist2.push({ "nameplateId": element.dictCode, "nameplateRemark": element.remark })
      });
      this.checkList = this.$refs.multipleTable.selection[0].dictCode;
      this.partsClassificationRemark = this.$refs.multipleTable.selection[0].remark
      console.log(this.bindldlist, this.bindldlist2);//部件，铭牌
      console.log(this.checkList, this.partsClassificationRemark);//产品
      if (this.bindldlist.length && this.bindldlist2.length && this.checkList) {
        productConfiguration({ partsList: this.bindldlist2, nameplateList: this.bindldlist, productId: this.checkList, productRemark: this.partsClassificationRemark }).then(res => {
          this.showAssociatedUserDialog = false
          this.$modal.msgSuccess('产品配置成功')
        })
      }
      if (this.bindldlist.length && this.bindldlist2.length == 0 && this.checkList) {
        productConfiguration({ nameplateList: this.bindldlist, productId: this.checkList, productRemark: this.partsClassificationRemark }).then(res => {
          this.showAssociatedUserDialog = false
          this.$modal.msgSuccess('产品配置成功')
        })
      }
      if (this.bindldlist.length == 0 && this.bindldlist2.length && this.checkList) {
        productConfiguration({ partsList: this.bindldlist2, productId: this.checkList, productRemark: this.partsClassificationRemark }).then(res => {
          this.showAssociatedUserDialog = false
          this.$modal.msgSuccess('产品配置成功')
        })
      }
    },
    userChoose(selection, row) {
      console.log(selection.length, '111');
      if (selection.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(selection.pop());
      }
      this.checkList = row.dictCode;
      this.Initializedata()//初始化数据(清理备注的)
      this.$refs.multipleTable2.clearSelection();
      this.$refs.multipleTable1.clearSelection();
      this.currentPage1 = 1
      this.currentPage2 = 1
      if (selection.length > 0) {//有选择进行回显
        productMappings(this.checkList).then(res => {
          console.log(res);
          this.echo(res)//回显
        })
      } else {
        this.checkList = null;
      }

    },
    echo(Info) {
      this.tableData.forEach(ele => {
        if (Info.data.productId == ele.dictCode) {
          ele.remark = Info.data.productRemark
        }
      });
      this.tableData2.forEach(ele => {
        Info.data.partsList.forEach(part => {
          if (part.nameplateId == ele.dictCode) {
            this.$refs.multipleTable2.toggleRowSelection(ele, true);
            ele.remark = part.nameplateRemark
          }
        });

      });
      this.tableData1.forEach(ele => {
        Info.data.nameplateList.forEach(part => {
          if (part.partsId == ele.dictCode) {
            this.$refs.multipleTable1.toggleRowSelection(ele, true);
            ele.remark = part.partsRemark
          }
        });

      });
    }
  }
}
</script>
 <style>
 .table /deep/ .DisableSelection>.cell {
   display: none !important;
 
 }
 
 .inputDeep>>>.el-input__inner {
   border: 0;
 }
 
 .tableContent {
   padding: 20px !important;
   background: #ffffff;
   margin-top: 20px;
 }
 
 body .el-table th.gutter {
   display: table-cell !important;
 }
 
 body .el-table colgroup.gutter {
   display: table-cell !important;
 }
 
 /* div{
            display: inline-block;
          margin-left: 20px;
          
           } */
 </style>