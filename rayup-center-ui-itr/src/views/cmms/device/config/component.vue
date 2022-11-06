<template>
  <div>
    <div style="margin-left: 25%; margin-top: 40px;">
      <jereh-button size="medium" @click="save_name">保存</jereh-button>
    </div>
    <div style="margin-top: 10px; text-align: center;">
      <div style="width: 25%;display: inline-block;vertical-align: top;">
        <!-- <el-button type="success" round @click="save_name">保存</el-button> -->
        <!-- <jereh-button  @click="save_name" style="margin:10px 0px 10px ;">保存</jereh-button> -->
        <el-table border ref="multipleTable" :row-key="getRowVoucherKeys"
          :data="tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)" tooltip-effect="dark"
          @select="userChoose" :header-cell-class-name="cellClass" class="table"
          :header-cell-style="{ background: '#F5F7FA' }">
          <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
          <el-table-column prop="dictValue" label="部件分类" width="150"></el-table-column>
          <!-- <el-table-column prop="dictCode" label="备注" width="120"></el-table-column> -->
          <el-table-column prop="dictValue" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" type="text" @blur="inputBlur(scope.row)" class="rule-input-edit" />
            </template>

          </el-table-column>
        </el-table>
        <div style="margin-top: 20px;position: relative;height: 30px;overflow: hidden;">
          <div class="tabListPage" style="position: absolute; right: 0;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
          </div>
        </div>

      </div>
      <div style="width: 25%;display: inline-block;">

        <el-table border ref="multipleTable1" :row-key="getRowVoucherKeys"
          :data="tableData1.slice((currentPage1 - 1) * PageSize1, currentPage1 * PageSize1)" tooltip-effect="dark"
          @selection-change="handleSelectionChange1" :header-cell-style="{ background: '#F5F7FA' }">


          <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
          <el-table-column prop="dictValue" label="部件名称" width="150"></el-table-column>
          <!-- <el-table-column prop="dictCode" label="备注" width="90"></el-table-column> -->
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
              layout="total, sizes, prev, pager, next, jumper" :total="totalCount1">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
 
 <script>
import {
  partsConfiguration,
  componentMapping,
} from '../../../../api/cmms/device'
export default {
  dicts: ['component_type', 'component_name'],
  data() {
    return {
      show: 0,
      checkList: null,
      bindldList: [],//部件信息数组
      currentRow: { dictCode: null },
      partsClassificationRemark: null,
      tableData: [],
      tableData1: [],
      // 默认显示第几页
      currentPage: 1,
      currentPage1: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 4,
      totalCount1: 4,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      pageSizes1: [5, 10, 15, 20],

      // 默认每页显示的条数（可修改）
      PageSize: 5,
      PageSize1: 10,
      key: 0,
    }
  },
  created() {
    this.Initializedata()//初始化数据
  },
  methods: {
    Initializedata() {
      this.getDicts("component_type").then(response => {
        this.tableData = response.data
        this.totalCount = response.data.length
      });
      this.getDicts("component_name").then(response => {
        this.tableData1 = response.data
        this.totalCount1 = response.data.length

      });
    },
    inputBlur(row) {//失去焦点事件
      // console.log(this.tableData);
      // for (let index = 0; index < this.tableData.length; index++) {
      //   this.$refs.multipleTable.toggleRowSelection(this.tableData[index],true);

      // }
      // this.$refs.multipleTable.toggleRowSelection(row);
    },
    cellClass(row) {
      // console.log(row)
      if (row.columnIndex === 0) {
        return 'DisableSelection'
      }
    },
    getRowVoucherKeys(row) {
      //  console.log(row.dictCode);
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
    handleSelectionChange1(val) {
      // console.log(val);
      if (this.checkList) {
        // this.checkList_name = val
        // this.bindldlist = []
        // this.checkList_name.forEach(element => {
        //   // console.log(element.dictCode);
        //   this.bindldlist.push({ "partsId": element.dictCode, "partsRemark": element.remark })
        // });
      } else {
        this.$refs.multipleTable1.clearSelection();
      }
    },

    save_type() {
    },
    save_name() {
      this.bindldlist = []
      this.checkList = this.$refs.multipleTable.selection[0].dictCode;
      this.partsClassificationRemark = this.$refs.multipleTable.selection[0].remark
      // console.log(this.bindldlist);//部件
      // console.log(this.checkList, this.partsClassificationRemark);//部件分类，部件备注
      this.$refs.multipleTable1.selection.forEach(element => {
        this.bindldlist.push({ "partsId": element.dictCode, "partsRemark": element.remark })
      });
      // console.log(this.bindldlist,this.checkList,this.partsClassificationRemark);

      partsConfiguration({ partsList: this.bindldlist, partsClassificationId: this.checkList, partsClassificationRemark: this.partsClassificationRemark }).then(res => {
        this.$modal.msgSuccess('部件关联成功')
      })
    },
    userChoose(selection, row) {
      if (selection.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(selection.pop());
      }
      this.checkList = row.dictCode;
      this.Initializedata()//初始化数据(清理备注的)
      this.$refs.multipleTable1.clearSelection();
      this.currentPage1 = 1
      if (selection.length > 0) {//有选择进行回显
        componentMapping(this.checkList).then(res => {
          this.echo(res)//回显
        })
      } else {
        this.checkList = null;
      }
    },
    echo(Info) {
      // console.log(Info);
      console.log(Info.data.partsClassificationId);
      console.log(Info.data.partsClassificationRemark);
      // console.log(Info.data.partsList[0].partsId);
      // if (info) {
      //   console.log(111);
      // }
      this.tableData.forEach(ele => {
        if (Info.data.partsClassificationId == ele.dictCode) {
          ele.remark = Info.data.partsClassificationRemark
        }
      });
      this.tableData1.forEach(ele => {
        Info.data.partsList.forEach(part => {
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
   background-color: #F5F7FA;
 }
 
 .el-input__inner {
   border: 0;
   border-radius: 0px;
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
 </style>