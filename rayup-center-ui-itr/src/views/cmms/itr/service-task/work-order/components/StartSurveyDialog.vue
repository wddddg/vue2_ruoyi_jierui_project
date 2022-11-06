<template>
  <el-dialog
    v-dialogDrag
    append-to-body
    :visible="open"
    width="62%"
    center
    @close="colseStartSurveyDialog"
  >
    <el-button
      size="mini"
      type="primary"
      plain
      style="margin-bottom: 15px"
      @click="sureSurvey"
      >发起调研</el-button
    >
    <div>
      <div style="text-align: right">
        <el-button
          size="mini"
          type="primary"
          plain
          style="margin-bottom: 15px"
          @click="addCustomer"
          >新增联系人</el-button
        >
        <el-button
          size="mini"
          type="primary"
          plain
          style="margin-bottom: 15px"
          @click="submitCustomer"
          >提交联系人</el-button
        >
      </div>
      <h3
        style="
          font-weight: 700;
          background-color: #f2f2f2;
          margin: 0 0 5px 0;
          padding: 5px 20px;
        "
      >
        客户负责人选择
      </h3>
      <el-form
        :model="clientPrincipalQueryParams"
        ref="queryForm"
        size="small"
        :inline="true"
        label-position="left"
      >
        <el-form-item prop="customerName">
          <el-input
            v-model="clientPrincipalQueryParams.customerName"
            placeholder="请输入客户联系人"
            clearable
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item prop="customerPhone">
          <el-input
            v-model="clientPrincipalQueryParams.customerPhone"
            placeholder="请输入客户联系方式"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item prop="customerPosition">
          <el-input
            v-model="clientPrincipalQueryParams.customerPosition"
            placeholder="请输入客户联系人职务"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <!-- <el-form-item prop="serviceType">
            <el-select
              style="width: 165px"
              v-model="clientPrincipalQueryParams.isChoose"
              placeholder="请选择选定类型"
              clearable
            >
              <el-option
                v-for="item in chooseType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="getClientPrincipalQueryList"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="customerBasic"
        border
        :header-cell-style="{ background: 'rgb(245,247,250)' }"
      >
        <!-- <el-table-column type="selection" width="50" align="center" /> -->
        <el-table-column align="center" label="序号" type="index" width="50" />
        <el-table-column
          label="客户名称"
          align="center"
          key="accountName"
          prop="accountName"
          width="150"
        />
        <el-table-column
          label="客户下属单位名称"
          align="center"
          key="customerUntilName"
          prop="customerUntilName"
        />
        <el-table-column
          label="客户联系人"
          align="center"
          key="customerName"
          prop="customerName"
          width="120"
        />
        <el-table-column
          label="客户联系方式"
          align="center"
          key="customerPhone"
          prop="customerPhone"
          width="120"
        />
        <el-table-column
          label="客户联系人职务"
          align="center"
          key="customerPosition"
          prop="customerPosition"
          width="160"
        />
        <el-table-column label="是否选定" align="center" width="100">
          <template slot-scope="scope">
            <el-checkbox
              @change="handleChoose(0, scope.row, scope.$index)"
              v-model="scope.row.isChoose"
              :checked="scope.row.isChoose"
            ></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <!--v-show="clientPrincipalTotal > 0"  -->
      <pagination
        :total="clientPrincipalTotal"
        :page.sync="clientPrincipalQueryParams.pageNum"
        :limit.sync="clientPrincipalQueryParams.pageSize"
        @pagination="getClientPrincipalQueryList"
      />
    </div>
    <div style="margin-top: 50px">
      <h3
        style="
          font-weight: 700;
          background-color: #f2f2f2;
          margin: 0 0 5px 0;
          padding: 5px 20px;
        "
      >
        市场负责人选择
      </h3>
      <el-form
        :model="marketPrincipalQueryParams"
        ref="queryForm"
        size="small"
        :inline="true"
        label-position="left"
      >
        <el-form-item prop="remark">
          <el-input
            v-model="marketPrincipalQueryParams.remark"
            placeholder="请输入职位"
            clearable
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item prop="nickName">
          <el-input
            v-model="marketPrincipalQueryParams.nickName"
            placeholder="请输入市场负责人"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item prop="phonenumber">
          <el-input
            v-model="marketPrincipalQueryParams.phonenumber"
            placeholder="请输入联系方式"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <!-- <el-form-item prop="serviceType">
            <el-select
              style="width: 165px"
              v-model="marketPrincipalQueryParams.isChoose"
              placeholder="请选择选定类型"
              clearable
            >
              <el-option
                v-for="item in chooseType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="getMarketPrincipalQueryList"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="marketPrincipalList"
        border
        :header-cell-style="{ background: 'rgb(245,247,250)' }"
      >
        <!-- <el-table-column type="selection" width="50" align="center" /> -->
        <el-table-column align="center" label="序号" type="index" width="50" />
        <el-table-column
          label="职位"
          align="center"
          key="remark"
          prop="remark"
        />
        <el-table-column
          label="市场负责人"
          align="center"
          key="nickName"
          prop="nickName"
          width="180"
        />
        <el-table-column
          label="联系方式"
          align="center"
          key="phonenumber"
          prop="phonenumber"
          width="160"
        />
        <el-table-column label="是否选定" align="center" width="110">
          <template slot-scope="scope">
            <el-checkbox
              @change="handleChoose(1, scope.row, scope.$index)"
              v-model="scope.row.isChoose"
              :checked="scope.row.isChoose"
            ></el-checkbox>
          </template>
        </el-table-column>
      </el-table>

      <!--v-show="clientPrincipalTotal > 0"  -->
      <pagination
        :total="marketPrincipalTotal"
        :page.sync="marketPrincipalQueryParams.pageNum"
        :limit.sync="marketPrincipalQueryParams.pageSize"
        @pagination="getMarketPrincipalQueryList"
      />
    </div>
  </el-dialog>
</template>

<script>
import {
  getCustomerList,
  getUserList,
  createSurvey,
} from "@/api/cmms/itr/work-order/order.api";
export default {
  name: "StartSurveyDialog",
  data() {
    return {
      customerBasic: [],
      marketPrincipalList: [],
      // 客户负责人总条数
      clientPrincipalTotal: 0,
      // 市场负责人总条数
      marketPrincipalTotal: 0,
      // 客户负责人选择查询参数
      clientPrincipalQueryParams: {
        pageNum: 1,
        pageSize: 10,
        customerName: undefined,
        customerPhone: undefined,
        customerPosition: undefined,
        isChoose: undefined,
      },
      // 市场负责人选择查询参数
      marketPrincipalQueryParams: {
        pageNum: 1,
        pageSize: 10,
        position: undefined,
        customerPhone: undefined,
        principal: undefined,
        isChoose: undefined,
      },
    };
  },
  props: {
    startSurveyDialog: {
      type: Array,
      default: () => {
        return [];
      },
    },
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    serviceRecordId: String,
  },
  mounted() {},
  methods: {
    colseStartSurveyDialog() {
      this.$emit("colseStartSurveyDialog", false);
      // console.log("关闭");
      this.clientPrincipalQueryParams = {
        pageNum: 1,
        pageSize: 10,
        customerName: undefined,
        customerPhone: undefined,
        customerPosition: undefined,
        isChoose: undefined,
      };
      // 市场负责人选择查询参数
      this.marketPrincipalQueryParams = {
        pageNum: 1,
        pageSize: 10,
        position: undefined,
        customerPhone: undefined,
        principal: undefined,
        isChoose: undefined,
      };
    },
    // 确定发起调研
    sureSurvey() {
      console.log(this.customerBasic, this.marketPrincipalList);
      let customer = {};
      let marketPrincipal = {};
      this.customerBasic.map((it) => {
        if (it.isChoose) {
          customer = it;
        }
      });
      this.marketPrincipalList.map((it) => {
        if (it.isChoose) {
          marketPrincipal = it;
        }
      });
      console.log(customer, marketPrincipal);
      if (
        customer.isChoose == undefined &&
        marketPrincipal.isChoose == undefined
      ) {
        this.$message.error("请选定一条需要发起调研的客户负责人或市场负责人");
      } else {
        createSurvey(this.serviceRecordId).then((res) => {
          console.log(res, "发起调研的结果");
          this.$message.success("发起调研成功");
          this.startSurveyDialog = false;
        });
      }
    },
    // 新增联系人
    addCustomer() {
      console.log("新增联系人");
    },
    // 提交联系人
    submitCustomer() {
      console.log("提交联系人");
    },
    // 客户负责人选择列表
    getClientPrincipalQueryList() {
      getCustomerList(this.clientPrincipalQueryParams).then((res) => {
        console.log(res.data, "查询后的数据");
        if (res.code == 200) {
          res.data.records.map((it) => {
            it.isChoose = false;
          });
          this.customerBasic = res.data.records;
          this.clientPrincipalTotal = res.data.total;
        } else {
          this.$message.error("加载数据失败");
        }
      });
    },
    // 获取市场负责人列表
    getMarketPrincipalQueryList() {
      getUserList(this.marketPrincipalQueryParams).then((res) => {
        console.log(res, "获取市场负责人列表");
        if ((res.code = 200)) {
          res.rows.map((it) => {
            it.isChoose = false;
          });
          this.marketPrincipalList = res.rows;
          this.marketPrincipalTotal = res.total;
        }
      });
    },
    handleChoose(type, row, indexA) {
      if (type == 0) {
        if (row.isChoose) {
          this.customerBasic.map((it, indexB) => {
            if (indexA != indexB) {
              it.isChoose = false;
            }
          });
        }
      } else {
        if (row.isChoose) {
          this.marketPrincipalList.map((it, indexB) => {
            if (indexA != indexB) {
              it.isChoose = false;
            }
          });
        }
      }
    },
  },
  watch: {
    async open(nV) {
      if (nV) {
        this.getClientPrincipalQueryList();
        this.getMarketPrincipalQueryList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
