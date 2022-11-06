<template>
  <el-dialog

    v-dialogDrag
    :visible="openMQ"
    width="1200px"
    append-to-body
    @close="closeDialog"
    title="ERP物料查询功能-模糊查询"
  >
    <el-card class="box-card">
      <el-form ref="form" :model="MaterialQueryData" label-width="120px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="物料说明" prop="item_desc">
              <el-input
                v-model="MaterialQueryData.item_desc"
                placeholder="请输入物料说明"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目编码" prop="workOrderCode">
              <el-input
                v-model="MaterialQueryData.workOrderCode"
                placeholder="请输入项目编码"
              />
            </el-form-item>
          </el-col>
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
            label="物料"
            align="center"
            key="item_no"
            prop="item_no"
          />
          <el-table-column
            label="物料说明"
            align="center"
            key="item_desc"
            prop="item_desc"
          />
          <el-table-column
            label="单位"
            align="center"
            key="item_unit"
            prop="item_unit"
          />
          <el-table-column
            label="有效性"
            align="center"
            key="item_status"
            prop="item_status"
          />
          <el-table-column
            label="制造或采购"
            align="center"
            key="item_make_buy"
            prop="item_make_buy"
            width="110"
          />
          <el-table-column
            label="可采购"
            align="center"
            key="purchasing_enabled_flag"
            prop="purchasing_enabled_flag"
          />
          <el-table-column
            label="已采购"
            align="center"
            key="purchasing_item_flag"
            prop="purchasing_item_flag"
          />
          <el-table-column
            label="是否制造"
            align="center"
            key="build_in_wip_flag"
            prop="build_in_wip_flag"
          />
          <el-table-column
            label="追朔"
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
    </el-card>
    <div slot="footer">
      <el-button type="primary" size="mini" @click="submitForm">确定</el-button>
      <el-button size="mini" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listMaterial } from "@/api/cmms/itr/relbiz.api";
export default {
  name: "MaterialFuzzyQuery",
  components: {},
  data() {
    return {
      form: {},
      MaterialQueryData: {},
      MaterialData: [{}, {}, {}],
      queryParams: {
        totalHours: undefined,
        assitWorkHours: undefined,
        hours: undefined,
      },
      defaultRadio: -1,
      showSearch: true,
      total: 1,
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
     defaultProjectCode: String,
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
    selectCurrentData: {
      type: [Array, Object],
    },
  },
  methods: {
    search() {
        debugger;
        // this.MaterialQueryData.workOrderCode = this.defaultProjectCode;
        let me =this;
      listMaterial(this.MaterialQueryData).then((res) => {
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
