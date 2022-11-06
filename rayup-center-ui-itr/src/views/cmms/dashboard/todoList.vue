<template>
  <div class="p-3">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane name="3" class="py-1">
        <el-badge slot="label" :value="reviewTableTotal" class="item">
          <span>待审核设备</span>
        </el-badge>
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="auditBatch"
          v-hasPermi="['cmms:device:audit']"
        >
          批量审核
        </jereh-button>
        <deviceList class="mt-2" :deviceList="reviewTableList" :selection="selection" :total="reviewTableTotal"
                    :queryParams="queryParams" @getList="getList" @handleSelectionChange="handleSelectionChange"
        ></deviceList>
      </el-tab-pane>
      <el-tab-pane name="4" class="py-1">
        <el-badge slot="label" :value="improvedTableTotal" class="item">
          <span>待完善设备</span>
        </el-badge>
        <deviceList :deviceList="improvedTableList" :total="improvedTableTotal" :queryParams="queryParams"
                    @getList="getList"
        ></deviceList>
      </el-tab-pane>
      <el-tab-pane name="待办工单" class="py-1">
        <el-badge slot="label" :value="orderTableTotal" class="item">
          <span>待办工单</span>
        </el-badge>
      </el-tab-pane>
      <el-tab-pane name="5" class="py-1">
        <el-badge slot="label" :value="pagination.total" class="item">
          <span>待审批</span>
        </el-badge>

        <el-table border
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  :header-cell-style="{
                'text-align': 'center',
              }"
                  :cell-style="{
                'text-align': 'center',
              }"
                  @selection-change="handleSelectionChange1"
        >
          <el-table-column type="selection" width="50%" fixed></el-table-column>
          <el-table-column label="标题内容" align="center" prop="headContent" show-overflow-tooltip width="400%"/>
          <el-table-column label="审批人" align="center" prop="recipient" show-overflow-tooltip width="200%"/>
          <el-table-column label="创建日期" align="center" prop="createTime" show-overflow-tooltip width="335%"/>
          <el-table-column label="修改日期" align="center" prop="updateTime" show-overflow-tooltip width="335%"/>
          <el-table-column label="frameWorkId" align="center" prop="frameworkId" v-if="false" width="335%"/>
          <el-table-column label="审批及结果" align="center" show-overflow-tooltip width="112%">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isCheck==0">未审批</el-tag>
              <el-tag v-if="scope.row.isCheck==1&&scope.row.isPass==0" type="error">未通过</el-tag>
              <el-tag v-if="scope.row.isCheck==1&&scope.row.isPass==1" type="success">已通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150%">
            <template slot-scope="scope">
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click.native.stop="handleDetail(scope.row)"
                v-hasPermi="['cmms:device:edit']"
              >
                查看
              </jereh-button>
              <jereh-button
                size="mini"
                type="text"
                icon="el-icon-tickets"
                @click="handle(scope.row)"
                v-hasPermi="['cmms:device:query']"
                v-if="scope.row.isCheck==0&&scope.row.delflag==1"
              >
                处理
              </jereh-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          v-show="pagination.total>0"
          :total="pagination.total"
          :page.sync="pagination.current"
          :limit.sync="pagination.size"
          @pagination="getApproveList"
        />
      </el-tab-pane>
      <el-tab-pane name="6" class="py-1">
        <el-badge slot="label" :value="alarmTotal" class="item">
          <span>故障报警待办</span>
        </el-badge>
        <el-table border :data="alarmList" fit max-height="700px">
          <el-table-column label="序号" type="index" width="55" align="center" />
          <el-table-column
            label="产品名称"
            align="center"
            prop="productName"
            show-overflow-tooltip
          />
          <el-table-column
            label="产品编号"
            align="center"
            prop="productCode"
            show-overflow-tooltip
          />
          <el-table-column
            label="客户名称"
            align="center"
            prop="customerName"
            show-overflow-tooltip
          />
          <el-table-column
            label="客户联系人"
            align="center"
            prop="contactPerson"
            show-overflow-tooltip
          />
          <el-table-column
            label="客户联系方式"
            align="center"
            prop="contactPhone"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障码"
            align="center"
            prop="errorCode"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障码解析"
            align="center"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            label="故障等级"
            align="center"
            prop="level"
            show-overflow-tooltip
          />
          <el-table-column
            label="报警开始时间"
            align="center"
            prop="startTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <jereh-button
                size="mini"
                type="text"
                @click.native.stop="handleDeal(scope.row)"
              >
                处理
              </jereh-button>
              <jereh-button
                size="mini"
                type="text"
                @click="handleIgnore(scope.row)"
              >
                忽略
              </jereh-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex align-center justify-end">
          <Pagination
            v-show="alarmTotal > 0"
            :total="alarmTotal"
            :page.sync="alarmQuery.pageNum"
            :limit.sync="alarmQuery.pageSize"
            @pagination="getAlarmList"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="审核" :visible.sync="isVisible" width="500px">
      <jereh-input v-model="checkRemark" ph="请输入审核意见"/>
      <div slot="footer" class="dialog-footer">
        <jereh-button @click="checkSubmit(0)">审核不通过</jereh-button>
        <jereh-button type="primary" @click="checkSubmit(1)">审核通过</jereh-button>
      </div>
    </el-dialog>
    <el-dialog title="批量审核" :visible.sync="auditVisible" width="500px">
      <jereh-input v-model="auditRemark" ph="请输入审核意见"/>
      <div slot="footer" class="dialog-footer">
        <jereh-button @click="auditSubmit(4)">审核不通过</jereh-button>
        <jereh-button type="primary" @click="auditSubmit(1)">审核通过</jereh-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import deviceList from '../components/deviceList'
import { auditBatch, listDevice, getIotAlarmInfo, updateIotAlarmInfo } from '../../../api/cmms/device'
import { dealApprove, selectApprove } from '../../../api/cmms/sdTrainingService'
import moment from "moment";

export default {
  components: {
    deviceList
  },
  data() {
    return {
      selection: [],
      multipleSelection: [],
      auditRemark: '',
      checkRemark: '',
      auditVisible: false,
      isVisible: false,
      activeName: '3',
      reviewTableList: [],
      improvedTableList: [],
      orderTableList: [],
      reviewTableTotal: 0,
      improvedTableTotal: 0,
      orderTableTotal: 0,
      queryParams: {
        deviceState: 3,
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      id: '',
      pagination: {
        current: 1, //当前页
        total: 0, //记录条数
        size: 10 //每页条数
      },
      alarmQuery: {
        pageNum: 1,
        pageSize: 10,
        status: "2",
        deviceId: ''
      },
      alarmTotal: 0,
      alarmList: []
    }
  },
  async created() {
    await this.getApproveList()
    await this.getList(4, 1, 10)
    await this.getList(3, 1, 10)
    await this.getAlarmList()
  },
  methods: {
    checkSubmit(val) {
      let data = {
        id: this.id,
        isCheck: 1,
        isPass: val,
        delflag: 1,
        remark: this.checkRemark
      }
      dealApprove(data).then(res => {
        this.isVisible = false
        if (res.msg == '200') {
          this.$message({
            message: '处理成功',
            type: 'success'
          })
          this.getApproveList()
        } else {
          this.$message.error('处理失败，请稍后再试')
        }
      })

    },
    getApproveList() {
      let data = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.size
      }
      selectApprove(data).then(res => {
        this.pagination.total = res.data[0].totalCount
        this.tableData = res.data
      })

    },
    handleDetail(data) {
      if (data.headContent == '培训服务') {
        this.$router.push({ path: '/cmms/serviceDelivery/trainingServiceDetail', query: { id: data.id, isSave: 1 } })
      }
      if (data.headContent == '阶段执行报告-区域经理审核'||data.headContent == '阶段执行报告-市场确认') {
        this.$router.push({ path: '/cmms/serviceDelivery/frameworkDetail', query: { id:data.frameworkId,reportId:data.id } })
      }
    },
    handle(data) {
      if (data.headContent == '阶段执行报告-区域经理审核'||data.headContent == '阶段执行报告-市场确认') {
        this.$router.push({ path: '/cmms/serviceDelivery/frameworkDetail', query: { id:data.frameworkId,reportId:data.id } })
      }
      else{
      this.isVisible = true
      this.id = data.id
      }
    },
    handleSelectionChange1(val) {
      this.multipleSelection = val
    },
    handleSelectionChange(data) {
      this.selection = data
    },
    auditSubmit(deviceState) {
      if (deviceState === 4 && this.auditRemark === '') {
        this.$modal.msgError('请输入审核意见')
        return
      }
      auditBatch(this.selection, deviceState, this.auditRemark).then(response => {
        this.$modal.msgSuccess('批量审核完成')
        this.auditVisible = false
        this.queryParams.pageNum = 1
        this.getList(3, 1, this.queryParams.pageSize)
      })
    },
    // 批量审核
    auditBatch() {
      if (this.selection.length == 0) {
        this.$modal.msgError('请选择要审核的设备信息')
        return
      }
      for (const item of this.selection) {
        if (item.deviceState != 3) {
          this.$modal.msgError('请选择审核中状态的设备')
          return
        }
      }
      this.auditVisible = true
    },
    tabClick(tab) {
      if (tab.name == '3' || tab.name == '4') {
        this.deviceList = []
        this.getList(tab.name, 1, 10)
      } else if (tab.name == '6') {
        this.alarmList = []
        this.alarmTotal = 0
        this.getAlarmList()
      }
    },
    getList(deviceState, pageNum, pageSize) {
      return new Promise((resolve, reject) => {
        this.queryParams.deviceState = deviceState
        this.queryParams.agency = 1
        listDevice(this.queryParams).then(response => {
          if (this.queryParams.deviceState == 3) {
            this.reviewTableTotal = response.total
            console.log(pageNum)
            console.log(pageSize)
            this.reviewTableList = response.rows.splice((pageNum - 1) * pageSize, pageSize)
          } else if (this.queryParams.deviceState == 4) {
            this.improvedTableTotal = response.total
            this.improvedTableList = response.rows.splice((pageNum - 1) * pageSize, pageSize)
          } else if (this.queryParams.deviceState == 5) {
            this.orderTableTotal = response.total
            this.orderTableList = response.rows.splice((pageNum - 1) * pageSize, pageSize)
          }
          resolve()
        })
      })
    },
    // 获取报警信息
    getAlarmList() {
      this.alarmQuery.deviceId = this.$route.query.productCode
      getIotAlarmInfo(this.alarmQuery).then(res => {
        const data = res.rows
        if (data && data.length) {
          this.alarmList = data.map(item => {
            const cmmsRemarket = JSON.parse(item.cmmsRemarket)
            return Object.assign(item, cmmsRemarket)
          })
        } else {
          this.alarmList = []
        }
        this.alarmTotal = res.total
      })
    },
    // 处理报警
    handleDeal(row) {
      const data = {
        id: row.id,
        status: "3",
        cmmsEndTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      }
      updateIotAlarmInfo(data).then(res => {
        this.$modal.msgSuccess("报警处理成功！");
        this.getAlarmList()
      })
    },
    // 忽略报警
    handleIgnore(row) {
      const data = {
        iotId: row.id,
        status: "4",
        cmmsEndTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      }
      updateIotAlarmInfo(data).then(res => {
        this.$modal.msgSuccess("报警已忽略！");
        this.getAlarmList()
      })
    }
  }
}
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 10px;
}
</style>
