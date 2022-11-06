<template>
  <el-container class="app-container">
    <el-header height="auto">
      <jereh-button type="primary" plain @click="handleEdit">
        {{ editable ? "确认" : "编辑" }}
      </jereh-button>
      <jereh-button type="primary" plain @click="handleSave">
        保存
      </jereh-button>
    </el-header>
    <el-main>
      <el-table :data="tableData" fit border>
        <el-table-column prop="sortArea" label="类别" align="center">
        </el-table-column>
        <el-table-column prop="oneRecordDate" label="零人身末次可记录事故日期" align="center">
          <template slot-scope="scope">
            <jereh-date-picker
              v-if="editable"
              v-model="scope.row.oneRecordDate"
              valueFormat="yyyy-MM-dd"
            ></jereh-date-picker>
            <span v-else>{{ scope.row.oneRecordDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="carRecordDate" label="零车辆末次可记录事故日期" align="center">
          <template slot-scope="scope">
            <jereh-date-picker
              v-if="editable"
              v-model="scope.row.carRecordDate"
              valueFormat="yyyy-MM-dd"
            ></jereh-date-picker>
            <span v-else>{{ scope.row.carRecordDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="estateRecordDate" label="零财产末次可记录事故日期" align="center">
          <template slot-scope="scope">
            <jereh-date-picker
              v-if="editable"
              v-model="scope.row.estateRecordDate"
              valueFormat="yyyy-MM-dd"
            ></jereh-date-picker>
            <span v-else>{{ scope.row.estateRecordDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="environmentRecordDate" label="零环保末次可记录事故日期" align="center">
          <template slot-scope="scope">
            <jereh-date-picker
              v-if="editable"
              v-model="scope.row.environmentRecordDate"
              valueFormat="yyyy-MM-dd"
            ></jereh-date-picker>
            <span v-else>{{ scope.row.environmentRecordDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="milestOne" label="里程里程碑" align="center">
          <template slot-scope="scope">
            <el-input
              v-if="editable"
              v-model="scope.row.milestOne"
            ></el-input>
            <span v-else>{{ scope.row.milestOne }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input
              v-if="editable"
              v-model="scope.row.remark"
            ></el-input>
            <span v-else>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
import { getDicts } from '@/api/system/dict/data.js'
import {
  listCmmsSecurity,
  addCmmsSecurity
} from "../../../api/cmms/securityManagement";
export default {
  name: "securityManagement",
  data() {
    return {
      editable: false,
      tableData: [],
      resData: {},
      areaMap: new Map(),
    };
  },
  created() {
    this.getAreaList();
  },
  methods: {
    getAreaList() {
      getDicts("after_sale_area").then(res => {
        listCmmsSecurity().then(
          (response) => {
            let data = response.data;
            let  resmap = new Map();
            data.forEach(i=>{
              resmap.set(i.sortArea,i)
            });
            this.areaMap=resmap;
            const areaList = res.data;
            if (Array.isArray(areaList) && areaList.length) {
              areaList.forEach(item => {
                let newVar = this.areaMap.get(item.dictLabel);
                console.log(newVar)
                if (newVar){
                  this.tableData.push(newVar);
                }else {
                  this.tableData.push({ sortArea: item.dictLabel });
                }

              })
            }
          }
        );

      })
     // console.log(this.areaMap);
    },
    getTableData() {
      listCmmsSecurity().then(
        (response) => {
        let data = response.data;
        let  resmap = new Map();
        data.forEach(i=>{
          resmap.set(i.sortArea,i)
        });
          this.areaMap=resmap;
        }
      );
      console.log("获取表格数据!");
    },
    handleEdit() {
      this.editable = !this.editable;
    },
    handleSave() {
      console.log("保存表格数据!");
      console.log(this.tableData);
      addCmmsSecurity(this.tableData).then( (response) => {
        this.$modal.msgSuccess("新增成功");
        //this.getAreaList();
      })
    },

  },
};
</script>
