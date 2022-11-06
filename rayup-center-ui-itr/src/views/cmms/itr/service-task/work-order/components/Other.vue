<template>
  <div>
    <el-card>
      <div slot="header">
        <jereh-button type="primary" @click="test" plant>费用杂项</jereh-button>
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <!-- :rules="rules"  -->
        <el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="工单编码" prop="workOrderCode">
                <el-input
                  v-model="rowData.workOrderCode"
                  placeholder=""
                  maxlength="30"
                  disabled
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="杂项费用总成本" prop="engineerName">
                {{ sumUpCosts }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="运输成本" prop="transport">
                <el-input
                  type="number"
                  v-model="form.itrWorkOrderCostUpdateParamsObject.transport"
                  placeholder="请输入运输成本"
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现场加工费用" prop="process">
                <el-input
                  type="number"
                  v-model="form.itrWorkOrderCostUpdateParamsObject.process"
                  placeholder="请输入现场加工费用"
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现场采购费用" prop="purchase">
                <el-input
                  type="number"
                  v-model="form.itrWorkOrderCostUpdateParamsObject.purchase"
                  placeholder="请输入现场采购费用"
                  maxlength="30"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="现场人工费用" prop="labour">
                <el-input
                  type="number"
                  v-model="form.itrWorkOrderCostUpdateParamsObject.labour"
                  placeholder="请输入现场人工费用"
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="现场外包费用" prop="remark">
                <el-input
                  type="number"
                  v-model="form.itrWorkOrderCostUpdateParamsObject.outsource"
                  placeholder="请输入现场外包费用"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="其他费用" prop="remark">
                <el-input
                  type="number"
                  v-model="form.itrWorkOrderCostUpdateParamsObject.other"
                  placeholder="请输入其他费用"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他费用说明" prop="remark">
                <el-input
                  v-model="form.remark"
                  placeholder="请输入其他费用说明"
                  type="textarea"
                  :rows="2"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <span class="title">市场费用</span>
      </div>

      <el-table :data="marketExpensesList">
        <el-table-column prop="date" label="费用类型"> </el-table-column>
        <el-table-column prop="name" label="费用金额"> </el-table-column>
        <el-table-column prop="address" label="备注说明"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { costQueryByWorkOrderId } from "@/api/cmms/itr/work-order/order.api.js";
export default {
  name: "CloseWorkOrderDialog",
  dicts: ["itr_process_result"],
  data() {
    return {
      form: {
        itrWorkOrderCostUpdateParamsObject: {
          transport: 0,
          process: 0,
          purchase: 0,
          labour: 0,
          outsource: 0,
          other: 0,
        },
      },
      personnelBindingVisible: false,
      deviceVisible: false,
      isTrueOrFalseValue: "",
      marketExpensesList: [],
      formList: [],
    };
  },
  components: {},
  computed: {
    sumUpCosts() {
      let currentNumber = 0;
      for (
        let i = 0;
        i < Object.keys(this.form.itrWorkOrderCostUpdateParamsObject).length;
        i++
      ) {
        currentNumber += parseFloat(
          this.form.itrWorkOrderCostUpdateParamsObject[
            Object.keys(this.form.itrWorkOrderCostUpdateParamsObject)[i]
          ]
        );
      }
      return currentNumber.toFixed(2);
    },
  },
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    test() {},
  },
  watch: {
    rowData: {
      handler(nV) {},
    },
    "form.itrWorkOrderCostUpdateParamsObject": {
      handler() {
        let currentArray = [];
        for (
          let i = 0;
          i < Object.keys(this.form.itrWorkOrderCostUpdateParamsObject).length;
          i++
        ) {
          currentArray.push({
            costClassify: "OTHER",
            costCode: Object.keys(this.form.itrWorkOrderCostUpdateParamsObject)[
              i
            ],
            itemCost:
              this.form.itrWorkOrderCostUpdateParamsObject[
                Object.keys(this.form.itrWorkOrderCostUpdateParamsObject)[i]
              ],
            workOrderCode: this.rowData.workOrderCode,
            workOrderId: this.rowData.workOrderId,
            remark: "",
          });
        }
        currentArray.forEach((element) => {
          if (element.costCode === "other") {
            element.remark = this.form.remark;
          }
        });
        this.rowData.itrWorkOrderCostUpdateParams = [...currentArray];
      },
      deep: true,
    },
  },
  async created() {
    await costQueryByWorkOrderId({
      workOrderId: this.rowData.workOrderId,
    }).then((res) => {
      res.data.forEach((item) => {
        if (item.costClassify === "OTHER") {
          this.formList.push(item);
        } else {
          this.marketExpensesList.push(item);
        }
      });
    });
    for (
      let i = 0;
      i < Object.keys(this.form.itrWorkOrderCostUpdateParamsObject).length;
      i++
    ) {
      this.formList.forEach((item) => {
        if (
          item.costCode ===
          Object.keys(this.form.itrWorkOrderCostUpdateParamsObject)[i]
        ) {
          this.form.itrWorkOrderCostUpdateParamsObject[
            Object.keys(this.form.itrWorkOrderCostUpdateParamsObject)[i]
          ] = item.itemCost;
        }
        if (item.costCode === "other") {
          this.form.remark = item.remark;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
}
::v-deep .el-card__header {
  background: #f8f9fa;
  padding: 10px 20px;
}
::v-deep .el-card {
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #dee2e6;
}
</style>
