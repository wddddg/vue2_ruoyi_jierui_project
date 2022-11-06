<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="serviceOrder">
        <template slot="title">
          <span>1.维修工单</span>
        </template>
        <el-table border :data="serviceOrderList" fit max-height="500px" :header-cell-style="{ background: '#eef1f8'}">
          <el-table-column label="序号" type="index" width="55" align="center"/>
          <el-table-column
            label="请求编码"
            align="center"
            prop="size"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-link :href="scope.row.size" :underline="false" target="_blank">
                <span> {{ scope.row.size }} </span>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="工单编码"
            align="center"
            prop="size"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-link :href="scope.row.size" :underline="false" target="_blank">
                <span> {{ scope.row.size }} </span>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="故障类型"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障等级"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障描述"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="处理人"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="服务总工时"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="处理结果"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="创建时间"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="关闭时间"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
        </el-table>
        <div class="justify-end">
          <Pagination
            v-show="serviceOrderTotal > 0"
            :total="serviceOrderTotal"
            :page.sync="serviceOrderQuery.pageNum"
            :limit.sync="serviceOrderQuery.pageSize"
            @pagination="getServiceOrderList"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item name="partsConsume">
        <template slot="title">
          <span>2.配件消耗</span>
        </template>
        <el-table border :data="partsConsumeList" fit max-height="500px" :header-cell-style="{ background: '#eef1f8'}">
          <el-table-column label="序号" type="index" width="55" align="center"/>
          <el-table-column
            label="请求编码"
            align="center"
            prop="size"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-link :href="scope.row.size" :underline="false" target="_blank">
                <span> {{ scope.row.size }} </span>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="工单编码"
            align="center"
            prop="size"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-link :href="scope.row.size" :underline="false" target="_blank">
                <span> {{ scope.row.size }} </span>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="物料编码"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="物料说明"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="发货日期"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="发货单号"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="接收人"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="收货日期"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="物料数量"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="剩余数量"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <!--          <el-table-column-->
          <!--            label="操作"-->
          <!--            align="center"-->
          <!--            prop="size"-->
          <!--            show-overflow-tooltip-->
          <!--          >-->
          <!--            <template slot-scope="scope">-->
          <!--              <jereh-button-->
          <!--                size="mini"-->
          <!--                type="text"-->
          <!--                icon="el-icon-document"-->
          <!--                @click.native.stop="handlePreview(scope.row)"-->
          <!--              >-->
          <!--                详情-->
          <!--              </jereh-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
        <div class="justify-end">
          <Pagination
            v-show="partsConsumeTotal > 0"
            :total="partsConsumeTotal"
            :page.sync="partsConsumeQuery.pageNum"
            :limit.sync="partsConsumeQuery.pageSize"
            @pagination="getPartsConsumeList"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item name="trainingService">
        <template slot="title">
          <span>3.培训服务</span>
        </template>
        <el-table border :data="trainingServiceList" fit max-height="500px" :header-cell-style="{ background: '#eef1f8'}">
          <el-table-column label="序号" type="index" width="55" align="center"/>
          <el-table-column
            label="培训编码"
            align="center"
            prop="size"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-link :href="scope.row.size" :underline="false" target="_blank">
                <span> {{ scope.row.size }} </span>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="培训属性"
            align="center"
            prop="size"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="培训方式"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="培训开始时间"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="培训结束时间"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="课程名称"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="培训内容"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="主讲人"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="培训地点"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
          <el-table-column
            label="培训课时"
            align="center"
            prop="size"
            show-overflow-tooltip
          />
        </el-table>
        <div class="justify-end">
          <Pagination
            v-show="trainingServiceTotal > 0"
            :total="trainingServiceTotal"
            :page.sync="trainingServiceQuery.pageNum"
            :limit.sync="trainingServiceQuery.pageSize"
            @pagination="getTrainingServiceList"
          />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'serviceRecord',
  props: {
    deviceData: {
      required: true,
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeNames: ['serviceOrder', 'partsConsume','trainingService'],
      serviceOrderTotal: 0,
      serviceOrderQuery: {
        pageNum: 1,
        pageSize: 10
      },
      serviceOrderList: [
        { type: 1, name: '1', size: 256 },
        { type: 2, name: '2', size: 256 },
        { type: 1, name: '3', size: 256 },
        { type: 2, name: '4', size: 256 }
      ],
      partsConsumeTotal: 0,
      partsConsumeQuery: {
        pageNum: 1,
        pageSize: 10
      },
      partsConsumeList: [
        { type: 1, name: '1', size: 256 },
        { type: 2, name: '2', size: 256 },
        { type: 1, name: '3', size: 256 },
        { type: 2, name: '4', size: 256 }
      ],
      trainingServiceTotal: 0,
      trainingServiceQuery: {
        pageNum: 1,
        pageSize: 10
      },
      trainingServiceList: [
        { type: 1, name: '1', size: 256 },
        { type: 2, name: '2', size: 256 },
        { type: 1, name: '3', size: 256 },
        { type: 2, name: '4', size: 256 }
      ],
      showServiceOrder: true,
      showPartsConsume: true
    }
  },
  created() {
    this.getServiceOrderList()
    this.getPartsConsumeList()
  },
  methods: {
    getServiceOrderList() {
      console.log('获取服务工单信息')
    },
    getPartsConsumeList() {
      console.log('获取部件消耗信息')
    },
    getTrainingServiceList(){
      console.log('获取培训列表')
    },
    handlePreview(row) {
      console.log('预览部件消耗信息')
    },
    handleShowServiceOrder() {
      this.showServiceOrder = !this.showServiceOrder
    },
    handleShowPartsConsume() {
      this.showPartsConsume = !this.showPartsConsume
    }
  }
}
</script>

<style scoped></style>
