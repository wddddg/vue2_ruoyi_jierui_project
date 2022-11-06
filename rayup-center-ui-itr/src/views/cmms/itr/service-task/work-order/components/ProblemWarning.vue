<template>
  <el-card class="box-card">
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <!-- 搜索 -->
        <!-- <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" size="mini" @click="rowDataPushList"
              >添加</el-button
            >
          </el-col>
        </el-row> -->
        <!-- 表单数据 -->
        <el-table :data="problemWarningData">
          <el-table-column label="序号" align="center" type="index" width="60px" />
          <el-table-column
            label="维护人"
            align="center"
            key="maintainPersonName"
            prop="maintainPersonName"
            width="170px"
          >
            <template slot-scope="scope">
              <PersonnelBindingSelect
                v-model="scope.row.maintainPerson"
                @bindingData="
                  bindingSelectData($event, scope.row, 'maintainPerson')
                "
              />
            </template>
          </el-table-column>
          <el-table-column
            label="预警状态"
            align="center"
            key="earlyWarningState"
            prop="earlyWarningState"
            width="120px"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.earlyWarningState">
                <el-option
                  v-for="item in warningStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="责任环节"
            align="center"
            key="responsStepName"
            prop="responsStepName"
            width="160px"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.responsStepName">
                <el-option
                  v-for="item in responsibleDeptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="责任人"
            align="center"
            key="responsUserNickName"
            prop="responsUserNickName"
            width="170px"
          >
            <template slot-scope="scope">
              <PersonnelBindingSelect
                v-model="scope.row.responsUserName"
                @bindingData="
                  bindingSelectData($event, scope.row, 'responsUserName')
                "
              />
            </template>
          </el-table-column>
          <el-table-column
            label="需求日期"
            align="center"
            key="expectTime"
            prop="expectTime"
            width="160px"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.expectTime"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            label="描述"
            align="center"
            key="remark"
            prop="remark"
            width="200px"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="催办间隔时间（h）"
            align="center"
            key="urgeInterval"
            prop="urgeInterval"
            width="160px"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                v-model="scope.row.urgeInterval"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="更新维护日期"
            align="center"
            key="updateTime"
            prop="updateTime"
            width="160px"
          >
            <template slot-scope="scope">
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope)"
                >删除</el-button
              >
              <el-button size="mini" type="text">催办</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { responsibilityLink, warningState } from "@/utils/dictionary-task.js";
import PersonnelBindingSelect from "@/views/cmms/itr/components/PersonnelBindingSelect/index.vue";

export default {
  name: "ProblemWarning",
  data() {
    return {
      queryParams: {},
      showSearch: true,
      total: 1,
      responsibleDeptOptions: responsibilityLink(),
      warningStatusOptions: warningState(),
      problemWarningData: [],
    };
  },
  components: {
    PersonnelBindingSelect,
  },
  methods: {
    getList() {},
    handleQuery() {},
    resetQuery() {},
    handleDelete(scope) {
      // this.rowData.splice(scope.$index, 1);
      this.rowData.filter((item, index) => {
        if (item.id === scope.row.id) {
          this.$set(this.rowData[index], "delFlag", 1);
        }
      });
    },
    handleUpdate() {},
    rowDataPushList() {
      this.rowData.push({
        workOrderCode: this.WorkOrderCode,
        workOrderId: this.$route.query.workOrderId,
      });
    },
    bindingSelectData(e, row, item) {
      this.$set(row, item, e.join(","));
    },
  },
  props: {
    rowData: Array,
    WorkOrderCode: String,
  },
  watch: {
    rowData: {
      handler(nV) {
        this.problemWarningData = nV.filter((item) => item.delFlag != 1);
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>
