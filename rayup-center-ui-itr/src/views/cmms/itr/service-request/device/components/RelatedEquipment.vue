<template>
  <el-dialog
    :title="title"
    :visible="open"
    width="70%"
    append-to-body
    @close="closeDialog"
    v-dialogDrag
  >
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
      <el-form-item label="" prop="keyWord">
        <el-input
          v-model="queryParams.keyWord"
          placeholder="请输入关键字"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-row v-if="open">
      <el-col>
        <el-table
          :data="tableDatas"
          @selection-change="handleSelectionChange"
          :row-class-name="handleSelection"
          @current-change="handleRadioChange"
        >
          <!-- 
           -->

          <el-table-column
            type="index"
            width="50"
            align="center"
            v-if="relatedEquipmentRadio"
          >
            <template slot-scope="scope">
              <el-radio
                v-model="defaultRadio"
                :label="scope.row.index"
              ></el-radio>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="50" align="center" v-else />
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          />
          <el-table-column
            label="产品名称"
            align="center"
            key="productName"
            prop="productName"
          />
          <el-table-column
            label="项目编码"
            align="center"
            key="projectCode"
            prop="projectCode"
          />
          <!-- <el-table-column
            label="项目编码分项"
            align="center"
            key="projectItem"
            prop="projectItem"
          /> -->
          <el-table-column
            label="产品编号"
            align="center"
            key="productCode"
            prop="productCode"
          />
          <el-table-column
            label="底盘编号VIN编码"
            align="center"
            key="chassisCode"
            prop="chassisCode"
          />
          <el-table-column
            label="车牌号"
            align="center"
            key="licensePlateCode"
            prop="licensePlateCode"
          />
          <el-table-column
            label="产品品牌"
            align="center"
            key="productBrand"
            prop="productBrand"
          />
          <el-table-column
            label="客户名称"
            align="center"
            key="customerName"
            prop="customerName"
          />
          <el-table-column
            label="客户资产编号"
            align="center"
            key="cusMonCode"
            prop="cusMonCode"
          />
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="handleQuery"
        />
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" size="mini">确定</el-button>
      <el-button @click="cancel" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listEquipment } from "@/api/cmms/itr/relbiz.api";
import { sdDeviceDeliverList } from "@/api/cmms/itr/service-request/all-requests";

export default {
  name: "RelatedEquipment",
  data() {
    return {
      tableDatas: [],
      defaultRadio: -1,
      selectData: {},
      queryParams: {
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  components: {},
  props: {
    title: {
      type: String,
      default: () => {
        return "选择设备";
      },
    },
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    relatedEquipmentRadio: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  methods: {
    async handleQuery() {
      await sdDeviceDeliverList(this.queryParams).then((res) => {
        this.tableDatas = [...res.rows];
      });
    },
    resetQuery() {},
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    cancel() {
      this.$emit("closeDialog", false);
    },
    /** 提交按钮 */
    submitForm() {
      this.$emit("closeDialog", false);
      this.$emit("selectData", this.selectData);
    },
    handleSelection({ row, rowIndex }) {
      row.index = rowIndex;
    },
    handleSelectionChange(value) {
      let items;
      for (let i = 0; i < value.length; i++) {
        let currentItemName = "";
        let currentItemObject = {};
        let endObject = {};
        value.forEach((item) => {
          for (let j = 0; j < Object.keys(item).length; j++) {
            currentItemName = Object.keys(item)[j];
            currentItemObject[currentItemName] +=
              "," + (item[currentItemName] || "");
            endObject[currentItemName] =
              currentItemObject[currentItemName].substring(10);
          }
        });
        items = endObject;
      }
      // console.log(value, item.join(","));
      this.selectData = {
        // ...items,
        projectCode: items.projectCode,
        productCode: items.productCode,
        productBrand: items.productBrand,
        productName: items.productName,
        afterSaleArea: items.afterSaleArea,
        licenseNumber: items.licensePlateCode,
        contactUserName: items.customerPerson,
        contactUserInfo: items.customerPhone,
        projectCodeSubentry: items.projectItem,
        productModel: items.productType,
        chassisVin: items.chassisCode,
        qualityExpirationDate: items.expirationDate,
        clientId: items.customerCode,
        clientName: items.customerName,
        marketArea: items.deviceArea,
      };
    },
    handleRadioChange(val) {
      if (val) {
        this.defaultRadio = val.index;
        this.selectData = {
          ...val,
          licenseNumber: val.licensePlateCode,
          contactUserName: val.customerPerson,
          contactUserInfo: val.customerPhone,
          projectCodeSubentry: val.projectItem,
          productModel: val.productType,
          chassisVin: val.chassisCode,
          qualityExpirationDate: val.expirationDate,
          clientId: val.customerCode,
          clientName: val.customerName,
          marketArea: val.deviceArea,
        };
      }
    },
  },
  async mounted() {
    await sdDeviceDeliverList(this.queryParams).then((res) => {
      this.tableDatas = [...res.rows];
      this.total = res.total;
    });
    // await listEquipment(this.queryParams).then((res) => {
    //   this.tableDatas = [...res.rows];
    //   this.total = res.total;
    // });
  },
};
</script>

<style scoped>
::v-deep .el-radio__label {
  display: none;
}
</style>
