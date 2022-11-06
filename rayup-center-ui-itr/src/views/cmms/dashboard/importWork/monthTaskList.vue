<template>
    <el-container>
      <el-header>
        <!-- 查询条件 -->
        <el-form
          class="mt-1 flex justify-between"
          ref="queryForm"
          size="small"
          label-width="100px"
        >
        <el-row>
        <el-col :span="3">
            <el-form-item label="年度"
              style="width: 120%" 
            >
                <el-date-picker
                    v-model="form.anunlYear"
                    type="year"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="3">
            <el-form-item label="来源"
              style="width: 100%" 
            >
                <jereh-input v-model="form.comeFrom"></jereh-input>
            </el-form-item>
            </el-col>
            <el-col :span="3">
            <el-form-item label="年度目标"
              style="width:100%" 
            >
                <jereh-input v-model="form.anunlGoal"></jereh-input>
            </el-form-item>
            </el-col>
            <el-col :span="3">
            <el-form-item label="月度负责人"
              style="width: 100%" 
            >
                <jereh-input v-model="form.monthlyResponsiblePerson"></jereh-input>
            </el-form-item>
            </el-col>
            <el-col :span="3">
            <el-form-item label="周度负责人"
              style="width: 120%" 
            >
                <jereh-input v-model="form.weeklyResponsiblePerson"></jereh-input>
            </el-form-item>
            </el-col>
            <el-col :span="4">
            <el-form-item label="月份"
              style="width: 100%" 
            >
                <el-date-picker
                    v-model="form.anunlYear"
                    type="month"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="2">
            <el-form-item>
                <jereh-button>查询</jereh-button>
            </el-form-item>
            </el-col>
            </el-row>
        </el-form>
      </el-header>
      <el-main>
        <el-table
        :header-cell-style="{
                'color':'#515a6e',
                'line-height':'5px',
                'text-align': 'center',
                'font-size': '15px',
                'font-weight': '1000',
                'background': '#EEF1F8',
                'font-family': 'PingFangSC, PingFangSC-Semibold',
              }"
        :data="tableData" fit border>
        <el-table-column type="year" label="年份" width="100px" align="center">
        </el-table-column>
        <el-table-column prop="anunlYear" label="年度" align="center">
        </el-table-column>
        <el-table-column prop="comeFrom" label="来源" align="center">
        </el-table-column>
        <el-table-column prop="strategicPillar" width="100px" label="战略支柱" align="center">
        </el-table-column>
        <el-table-column prop="annualGoal" width="100px" label="年度目标" align="center">
        </el-table-column>
        <el-table-column prop="april" width="100px"  label="举措拆解" align="center">
        </el-table-column>
        <el-table-column prop="may" width="150px" label="行动计划(里程碑)" align="center">
        </el-table-column>
        <el-table-column prop="june" label="交付物" align="center">
        </el-table-column>
        <el-table-column prop="july" width="100px"  label="验收标准" align="center">
        </el-table-column>
        <el-table-column prop="august" width="200px" label="里程碑-分节点达成情况" align="center">
        </el-table-column>
        <el-table-column prop="october" width="100px" label="完成时间" align="center">
        </el-table-column>
        <el-table-column prop="november" width="150px" label="月度负责人" align="center">
        </el-table-column>
        <el-table-column prop="november" label="月度" align="center">
        </el-table-column>
        <el-table-column prop="november" width="100px" label="月度目标" align="center">
        </el-table-column>
        <el-table-column prop="november" width="150px" label="交付物及验收标准" align="center">
        </el-table-column>
        <el-table-column prop="november" width="150px" label="子任务完成时间" align="center">
        </el-table-column>
        <el-table-column prop="november" width="150px" label="周度负责人" align="center">
        </el-table-column>
        <el-table-column prop="november" label="状态" align="center">
        </el-table-column>
        <el-table-column prop="november" label="类别" align="center">
        </el-table-column>
        <el-table-column prop="november" width="100px" label="月度总结" align="center">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
          <jereh-button
            size="mini"
            type="text"
            icon="el-icon-tickets"
            @click="toDetail(scope.row)"
          >
             周度任务
          </jereh-button>
        </template>
        </el-table-column>
      </el-table>
        <div class="flex align-center justify-end" >
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </div>
      </el-main>
    </el-container>
  </template>
  
  <script>
  
  export default {
    name: "Device",
    dicts: [
      "jereh_device",
      "device_state",
      "device_state_query",
      "component_name",
      "stage_engine_brand",
      "stage_gearbox_brand",
      "piston_pump_manufacturer",
      "injection_head_brand",
      "customer_mark",
      "after_sale_area",
      "device_area",
      "product_brand",
      "marketer_area",
      "chassis_brand",
      "product_name",
      "product_line",
      "product_brand_notjereh",
    ],
    components: {
    },
    data() {
      return {
        total:10,
        value1:"",
        queryParams:{
            pageNum:1,
            pageSize:10
        },
        tableData:[{
          anunlYear:2022
        }],
        form:{
          anunlYear:"",
          comeFrom:"",
          anunlGoal:"",
          responsiblePerson:""
        }
        
      };
    },
    created() {
      
    },
    methods: {
        getList(){

        },
        toDetail(){
          this.$router.push({
        path: '/cmms/dashboard/importWork/weeklyTaskMaintenance',
        query: { }
      })
        }
    },
  };
  </script>
  <style scoped>
  ::v-deep .el-table__body tr:hover>td.el-table__cell {
  background-color:  #fdeee8 !important;
}
  ::v-deep .el-header * {
    font-size: 14px;
  }
  </style>