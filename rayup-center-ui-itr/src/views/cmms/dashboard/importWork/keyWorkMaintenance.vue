<template>
    <el-container>
      <el-header>
        <div >
          <jereh-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="small"
          >
            新增
          </jereh-button>
          <jereh-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="small"
          >
            编辑
          </jereh-button>
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
            icon="el-icon-s-cooperation"
            size="small"
          >
            下发任务
          </jereh-button>
          <jereh-button
            type="primary"
            plain
            icon="el-icon-upload2"
            size="small"
          >
            导入
          </jereh-button>
          <jereh-button
            type="primary"
            plain
            icon="el-icon-download"
            size="small"
          >
            导出
          </jereh-button>
        </div>
        <!-- 查询条件 -->
        <el-form
          class="mt-1 flex justify-between"
          ref="queryForm"
          size="small"
          label-width="50px"
        >
          <div>
            
            <el-form-item label="年度"
              style="width: 200px" 
            >
                <el-date-picker
                    v-model="value1"
                    type="year"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
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
        <el-table-column type="index" label="序号" width="100px" align="center">
        </el-table-column>
        <el-table-column prop="comeFrom" label="来源" align="center">
        </el-table-column>
        <el-table-column prop="strategicPillar" label="战略支柱" align="center">
        </el-table-column>
        <el-table-column prop="annualGoal" label="年度目标" align="center">
        </el-table-column>
        <el-table-column prop="april" label="举措拆解" align="center">
        </el-table-column>
        <el-table-column prop="may" width="200px" label="行动计划(里程碑)" align="center">
        </el-table-column>
        <el-table-column prop="june" label="交付物" align="center">

        </el-table-column>
        <el-table-column prop="july" label="验收标准" align="center">

        </el-table-column>
        <el-table-column prop="august" label="里程碑-分节点" align="center">

        </el-table-column>
        <el-table-column prop="september" width="200px" label="里程碑-分节点达成情况" align="center">

        </el-table-column>
        <el-table-column prop="october" label="完成时间" align="center">

        </el-table-column>
        <el-table-column prop="november" label="负责人" align="center">
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