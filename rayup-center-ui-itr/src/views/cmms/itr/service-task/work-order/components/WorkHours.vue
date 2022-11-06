<template>
  <el-card class="box-card">
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <jereh-button
              type="primary"
              plain
              icon="el-icon-plus"
              @click="workHoursDataPushList"
              >新增工时</jereh-button
            >
          </el-col>
          <el-col :span="18">
            <el-tag ref="tagColor"
              >故障总工时：{{ mainWorkHoursTimer }}小时 、 辅助总工时：{{
                assistWorkHoursTimer
              }}小时 、 合计工时：{{ assitWorAndMainWorHoursTimer }}小时</el-tag
            >
          </el-col>
        </el-row>
        <!-- 表单数据 -->
        <el-table
          :data="currentWorkHoursData"
          :header-cell-style="{ whiteSpace: 'nowrap' }"
        >
          <!-- v-loading="loading" -->
          <el-table-column
            label="角色"
            align="center"
            key="role"
            prop="role"
            width="160px"
          >
            <template slot-scope="scope">
              <jereh-select
                v-model="scope.row.role"
                filterable
                ph="请选择角色"
                :dict="dict.type.itr_hours_role"
                :disabled="!scope.row.isEdit"
              ></jereh-select>
              <!-- currentItemIsDisabled(scope.row) -->
            </template>
          </el-table-column>
          <el-table-column
            label="服务工程师"
            align="center"
            key="engineer"
            prop="engineer"
            width="150px"
          >
            <template slot-scope="scope">
              <PersonnelBindingSelect
                v-model="scope.row.engineer"
                @bindingData="bindingSelectData($event, scope.row, 'engineer')"
                :disabled="!scope.row.isEdit"
              /> </template
          ></el-table-column>
          <el-table-column
            label="日期"
            align="center"
            key="execTime"
            prop="execTime"
            width="160px"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.execTime"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                placeholder="选择日期"
                :disabled="!scope.row.isEdit"
              >
              </el-date-picker></template
          ></el-table-column>
          <el-table-column
            label="故障处理工时"
            align="center"
            key="malfunctionHours"
            prop="malfunctionHours"
            width="120px"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                v-model="scope.row.malfunctionHours"
                :disabled="!scope.row.isEdit"
              ></el-input> </template
          ></el-table-column>
          <el-table-column
            label="辅助工时类型"
            align="center"
            key="assistType"
            prop="assistType"
            width="160px"
          >
            <template slot-scope="scope">
              <jereh-select
                v-model="scope.row.assistType"
                filterable
                ph="请选择辅助工时类型"
                :dict="dict.type.itr_assit_classify"
                :disabled="!scope.row.isEdit"
              ></jereh-select>
              <!-- currentItemIsDisabled(scope.row) -->
            </template>
          </el-table-column>
          <el-table-column
            label="辅助工时"
            align="center"
            key="assitsHours"
            prop="assistHours"
            width="100px"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.assistHours"
                :disabled="!scope.row.isEdit"
                type="number"
              ></el-input>
              <!-- currentItemIsDisabled(scope.row) -->
            </template></el-table-column
          >
          <el-table-column
            label="故障处理总工时"
            align="center"
            key="totalHours"
            prop="totalHours"
            width="130px"
          >
            <template slot-scope="scope">
              {{
                (
                  (parseInt(scope.row.assistHours) || 0) +
                  (scope.row.role === "MAINTAIN"
                    ? parseInt(scope.row.malfunctionHours) * 1.1
                    : parseInt(scope.row.malfunctionHours) * 0.9 || 0)
                ).toFixed(1)
              }}
            </template></el-table-column
          >
          <el-table-column
            label="故障处理内容概述"
            align="center"
            key="malfunctionSummarized"
            prop="malfunctionSummarized"
            width="150px"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.malfunctionSummarized"
                :disabled="!scope.row.isEdit"
              ></el-input>
              <!-- currentItemIsDisabled(scope.row) -->
            </template></el-table-column
          >
          <el-table-column
            label="编辑"
            align="center"
            width="120"
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
import PersonnelBindingSelect from "@/views/cmms/itr/components/PersonnelBindingSelect/index.vue";
export default {
  name: "WorkHours",
  dicts: ["itr_assit_classify", "itr_hours_role"],
  components: { PersonnelBindingSelect },
  data() {
    return {
      queryParams: {
        totalHours: undefined,
        assitHours: undefined,
        hours: undefined,
      },
      showSearch: true,
      total: 1,
      id: this.$route.query.workOrderId,
      currentWorkHoursData: [],
    };
  },
  methods: {
    workHoursDataPushList() {
      this.WorkHoursData.push({
        workOrderCode: this.WorkOrderCode,
        workOrderId: this.id,
        malfunctionHours: 0,
        assitHours: 0,
        isEdit: 1,
      });
    },
    getList() {},
    handleQuery() {},
    resetQuery() {},
    handleDelete(scope) {
      if (scope?.row?.id) {
        // this.$set(this.WorkHoursData[scope.$index], "delFlag", 1);
        this.WorkHoursData.filter((item, index) => {
          if (item.id === scope.row.id) {
            this.$set(this.WorkHoursData[index], "delFlag", 1);
          }
        });
      } else {
        this.WorkHoursData.splice(scope.$index, 1);
      }
    },
    bindingSelectData(e, row, item) {
      this.$set(row, item, e.join(","));
    },
    currentItemIsDisabled(row) {
      let itemCreateTime =
        new Date(row.createTime).getTime() + 1000 * 60 * 60 * 24;
      if (itemCreateTime < this.currentTime) {
        return true;
      } else {
        return false;
      }
    },
  },
  props: {
    WorkHoursData: Array,
    WorkOrderCode: String,
  },
  created() {},
  watch: {
    WorkHoursData: {
      handler(nV, oV) {
        this.currentWorkHoursData = nV.filter((item) => item.delFlag != 1);
      },
      deep: true,
    },
    // WorkOrderCode
  },
  computed: {
    currentTime() {
      return new Date().getTime();
    },
    mainWorkHoursTimer() {
      let num = 0;
      this.WorkHoursData.forEach((element) => {
        if (!element.malfunctionHours) return;
        num += parseInt(element.malfunctionHours);
      });
      return num;
    },
    assistWorkHoursTimer() {
      let num = 0;
      this.WorkHoursData.forEach((element) => {
        if (!element.assistHours) return;
        num += parseInt(element.assistHours);
      });
      return num;
    },
    assitWorAndMainWorHoursTimer() {
      let mainWorkHoursTimer = 0;
      this.WorkHoursData.forEach((element) => {
        if (!element.malfunctionHours) return;
        if (element.role === "MAINTAIN") {
          mainWorkHoursTimer += parseInt(element.malfunctionHours) * 1.1;
        } else {
          mainWorkHoursTimer += parseInt(element.malfunctionHours) * 0.9;
        }
      });
      return (mainWorkHoursTimer + this.assistWorkHoursTimer).toFixed(1);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-tag {
  background: rgba($color: #409eff, $alpha: 0.1);
  border-color: rgba($color: #409eff, $alpha: 0.2);
  color: #409eff;
}
::v-deep .el-col .el-col-18 .el-tag .el-tag--medium .el-tag--light {
  color: #409eff;
}
</style>
