<template>
  <el-dialog
    v-dialogDrag
    :visible="openMQ"
    width="1100px"
    append-to-body
    @close="closeDialog"
    title="ERP物料查询功能-件号查询"
  >
    <el-card class="box-card">
      <el-form ref="form" :model="MaterialQueryData" label-width="120px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="物料编码" prop="item_no">
              <el-input
                v-model="MaterialQueryData.item_no"
                placeholder="请输入物料编码"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="物料描述" prop="materialName">
              <el-input
                v-model="MaterialQueryData.materialName"
                placeholder="请输入物料描述"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="厂家件号" prop="materialCode">
              <el-input
                v-model="MaterialQueryData.materialCode"
                placeholder="请输入厂家件号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规格型号" prop="productBrand">
              <el-input
                v-model="MaterialQueryData.productBrand"
                placeholder="请输入规格型号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细描述" prop="detail">
              <el-input
                v-model="MaterialQueryData.detail"
                placeholder="请输入详细描述"
              />
            </el-form-item>
          </el-col> -->
        </el-row>
        <div class="bt">
          <el-button type="primary" @click="search()">查询</el-button>
          <!-- <el-button type="primary" plain>物料绑定</el-button> -->
        </div>
        <el-table
          :data="MaterialData"
          :row-class-name="handleSelectionChange"
          @current-change="handleRadioChange"
          @select="selectChakebox"
          ref="multipleTable"
        >
          <el-table-column
            type="index"
            width="50"
            align="center"
            v-if="selectOrRadio"
          >
            <template slot-scope="scope" v-if="selectOrRadio">
              <el-radio
                v-model="defaultRadio"
                :label="scope.row.index"
                @change="handleRadioChange(scope.row)"
              ></el-radio>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="50" align="center" v-else />
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column
            label="项目号"
            align="center"
            key="project"
            prop="project"
          />
          <el-table-column
            label="物料编码"
            align="center"
            key="item_no"
            prop="item_no"
          />
          <el-table-column
            label="物料描述"
            align="center"
            key="item_desc"
            prop="item_desc"
          />
          <el-table-column
            label="子库位"
            align="center"
            key="subinventory_code"
            prop="subinventory_code"
          />
          <el-table-column
            label="货位"
            align="center"
            key="locator_name"
            prop="locator_name"
          />
          <el-table-column
            label="计划量"
            align="center"
            key="pro_plan"
            prop="pro_plan"
          />
          <el-table-column
            label="可用量"
            align="center"
            key="prm_att"
            prop="prm_att"
          />
          <el-table-column
            label="现有量"
            align="center"
            key="prm_qoh"
            prop="prm_qoh"
          />
          <el-table-column
            label="软硬反查"
            align="center"
            key="end_assembly_pegging_flag"
            prop="end_assembly_pegging_flag"
          />
          <el-table-column
            label="采购员"
            align="center"
            key="buyer"
            prop="buyer"
          />
        </el-table>
      </el-form>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="MaterialQueryData.pageNum"
        :limit.sync="MaterialQueryData.pageSize"
        @pagination="search" />
    </el-card>
    <div slot="footer">
      <el-button type="primary" size="mini" @click="submitForm">确定</el-button>
      <el-button size="mini" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listMaterialInventory } from "@/api/cmms/itr/relbiz.api";
export default {
  name: "MaterialNumberQuery",
  components: {},
  data() {
    return {
      form: {},
      MaterialQueryData: {},
      MaterialData: [],
      queryParams: {
        totalHours: undefined,
        assitWorkHours: undefined,
        hours: undefined,
      },
      defaultRadio: -1,
      showSearch: true,
      total: 0,
      openWorkHoursDialog: false,
      openOldPartsProcessingDialog: false,
      rowData: {},
      rowOldPartsProcessingData: {},
      activeName: "first",
      openPushMarketDialog: false,
      searchMaterialCode: "",
      searchMaterialName: "",
      selectedRowData: null,
    };
  },
  props: {
    openMQ: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    selectOrRadio: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    search() {
        let me = this;
      listMaterialInventory(this.MaterialQueryData).then((res) => {
            let data= res.data;
            if(data){
                me.MaterialData = data.rows;
                me.total = data.total;
            }

      });
    },
    closeDialog() {
      this.$emit("closeDialog", false);
      this.defaultRadio = -1;
      this.selectedRowData = null;
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange({ row, rowIndex }) {
      if (this.selectOrRadio) {
        row.index = rowIndex;
      }
    },
    submitForm() {
      let data = null;
      if (!this.selectOrRadio) {
        data = this.selectedRowData.map((item) => {
          return {
            materialCode: item.item_no,
            materialName: item.item_desc,
            purchaser: item.buyer,
            isNumberOrFuzzy: item.subinventory_code ? true : false,
          };
        });
      } else {
        data = {};
        data.materialCode = this.selectedRowData.item_no;
        data.materialName = this.selectedRowData.item_desc;
        data.purchaser = this.selectedRowData.buyer;
      }
      this.$emit("seletData", data);
      this.closeDialog();
    },
    handleRadioChange(val) {
      console.log(val);
      if (val && this.selectOrRadio) {
        this.defaultRadio = val.index;
        this.selectedRowData = val;
      }
    },
    selectChakebox(value) {
      if (!this.selectOrRadio) {
        this.selectedRowData = value;
      }
    },
  },
  created() {
    this.search();
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.bt {
  margin-bottom: 10px;
  text-align: right;
}
.demo-input-suffix {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 35%;
  .searchTitle {
    width: 110px;
    font-size: 15px;
  }
}
::v-deep .el-radio__label {
  display: none;
}
</style>
