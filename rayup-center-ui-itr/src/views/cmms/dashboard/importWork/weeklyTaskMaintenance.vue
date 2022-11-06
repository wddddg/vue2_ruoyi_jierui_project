<<template>
    <el-container>
      <el-header>
        <div >
            <jereh-button
            type="primary"
            plain
            icon="el-icon-check"
            size="small"
          >
            保存
          </jereh-button>
          <jereh-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="small"
          >
            编辑
          </jereh-button>
        </div>
        <!-- 查询条件 -->
        <el-form
          class="mt-1 flex justify-between"
          ref="queryForm"
          size="small"
          label-width="80px"
        >
          <div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="开始时间"
                style="width: 100%" 
                >
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
             </el-col>
            <el-col :span="12">
            <el-form-item>
             <jereh-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="small"
                >
                添加周任务
             </jereh-button>
             </el-form-item>
            </el-col>
            </el-row>
          </div>
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
        <el-table-column prop="week" label="周数" align="center">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center">
        </el-table-column>
        <el-table-column prop="weekPlan" label="周计划" align="center">
        </el-table-column>
        <el-table-column prop="weekSummary" label="周总结" align="center">
        </el-table-column>
        <el-table-column prop="acceptanceCriteriaAndDeliverables" label="验收标准和交付物" align="center">

        </el-table-column>
        <el-table-column prop="isExecution" label="是否执行" align="center">

        </el-table-column>
        <el-table-column prop="july" label="是否按照流程执行" align="center">

        </el-table-column>
        <el-table-column prop="august" width="200px" label="执行结果是否符合要求" align="center">

        </el-table-column>
        <el-table-column prop="september" label="备注" align="center">

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
        tableData:[]

        
      };
    },
    created() {
      
    },
    methods: {
        getList(){

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