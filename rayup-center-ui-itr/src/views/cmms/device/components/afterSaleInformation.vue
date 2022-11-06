<template>
  <div v-loading="loading">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="basicInfo">
        <template slot="title">
          <span>1.售后基础信息</span>
        </template>
        <el-descriptions
          :column="3"
          border
          :labelStyle="{ width: '13%' }"
          :contentStyle="{ width: '20%' }"
        >
          <el-descriptions-item>
            <template slot="label"> 售后区域 </template>
            {{ deviceData.afterSaleArea }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 售后区域经理 </template>
            {{ deviceData.afterSaleDirector }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 交付负责人 </template>
            {{ deviceData.deliveryDirector }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 协助交付人 </template>
            {{ deviceData.helpPerson }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 服务管家 </template>
            {{ deviceData.serviceButler }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 交付地点 </template>
            {{ deviceData.deliveryLocation }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 验收日期 </template>
            {{ deviceData.deliveryDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 质保终止日期 </template>
            {{ deviceData.expirationDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 质保条款 </template>
            {{ deviceData.qualityItem }}
          </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
      <el-collapse-item name="recordList">
        <template slot="title">
          <span>2.售后区域变更记录</span>
        </template>
        <el-table border :data="recordList" fit :header-cell-style="{ background: '#eef1f8'}">
          <el-table-column label="序号" type="index" width="55" align="center" />
          <el-table-column
            label="原售后区域"
            align="center"
            prop="oldAfterSaleArea"
            show-overflow-tooltip
          />
          <el-table-column
            label="原区域经理"
            align="center"
            prop="oldAfterSaleDirector"
            show-overflow-tooltip
          />
          <el-table-column
            label="变更区域"
            align="center"
            prop="afterSaleArea"
            show-overflow-tooltip
          />
          <el-table-column
            label="变更区域经理"
            align="center"
            prop="afterSaleDirector"
            show-overflow-tooltip
          />
          <el-table-column
            label="变更时间"
            align="center"
            prop="updateTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="修改人"
            align="center"
            prop="updateBy"
            show-overflow-tooltip
          />
          <el-table-column
            label="备注"
            align="center"
            prop="remark"
            show-overflow-tooltip
          />
        </el-table>
        <div class="justify-end">
          <Pagination
            v-show="total > 0"
            :total="total"
            :page.sync="query.pageNum"
            :limit.sync="query.pageSize"
            @pagination="getList"
          />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getChangeLog } from "@/api/cmms/device";
export default {
  name: "projectInformation",
  props: {
    deviceData: {
      required: true,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      total: 0,
      query: {
        id: "",
        pageSize: 10,
        pageNum: 1,
      },
      recordList: [],
      activeNames: ['basicInfo', 'recordList']
    };
  },
  created() {
    this.query.id = this.$route.query.id;
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true
      getChangeLog(this.query).then((res) => {
        this.total = res.data.total;
        this.recordList = res.data.records;
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped></style>
