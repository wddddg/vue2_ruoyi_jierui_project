<template>
  <el-dialog
     v-dialogDrag
    :visible="openMQ"
    width="1200px"
    append-to-body
    @close="closeDialog"
    title="ERP物料查询功能"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="件号查询" name="first"
        ><el-card class="box-card">
          <el-form
            ref="form"
            :model="MaterialQueryNumberData"
            label-width="120px"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="物料编码" prop="item_no">
                  <el-input
                    v-model="MaterialQueryNumberData.item_no"
                    placeholder="请输入物料编码"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="bt">
              <el-button type="primary" @click="searchNumber">查询</el-button>
            </div>
            <el-table
              :data="MaterialNumberData"
              @select="selectChakebox"
              ref="multipleTable"
            >
              <el-table-column type="selection" width="50" align="center" />
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
            v-show="numberTotal > 0"
            :total="numberTotal"
            :page.sync="MaterialQueryNumberData.pageNum"
            :limit.sync="MaterialQueryNumberData.pageSize"
            @pagination="searchNumber"
          /> </el-card
      ></el-tab-pane>
      <el-tab-pane label="模糊查询" name="second"
        ><el-card class="box-card">
          <el-form
            ref="form"
            :model="MaterialQueryFuzzyData"
            label-width="120px"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="物料说明" prop="item_desc">
                  <el-input
                    v-model="MaterialQueryFuzzyData.item_desc"
                    placeholder="请输入物料说明"
                  />
                </el-form-item>
              </el-col>
               <!-- <el-col :span="6">
                <el-form-item label="项目编码" prop="workOrderCode">
                  <el-input
                    v-model="MaterialQueryFuzzyData.workOrderCode"
                    placeholder="请输入项目编码"
                  />
                </el-form-item>
              </el-col> -->
            </el-row>
            <div class="bt">
              <el-button type="primary" @click="searchFuzzy">查询</el-button>
            </div>
            <el-table
              :data="MaterialFuzzyData"
              @select="selectChakebox"
              ref="multipleTable"
            >
              <el-table-column type="selection" width="50" align="center" />
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

          <pagination
            v-show="fuzzyTotal > 0"
            :total="fuzzyTotal"
            :page.sync="MaterialQueryFuzzyData.pageNum"
            :limit.sync="MaterialQueryFuzzyData.pageSize"
            @pagination="searchFuzzy"
          /> </el-card
      ></el-tab-pane>
    </el-tabs>
    <div slot="footer">
      <el-button type="primary" size="mini" @click="submitForm">确定</el-button>
      <el-button size="mini" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listMaterial } from "@/api/cmms/itr/relbiz.api";
import { listMaterialInventory } from "@/api/cmms/itr/relbiz.api";
export default {
  name: "ERPMaterialQuery",
  components: {},
  data() {
    return {
      form: {},
      MaterialQueryFuzzyData: {
        pageNum: 1,
        pageSize: 10,
      },
      MaterialQueryNumberData: {
        pageNum: 1,
        pageSize: 10,
      },
      MaterialFuzzyData: [],
      MaterialNumberData: [],
      total: 0,
      activeName: "first",
      selectedRowData: null,
      fuzzyTotal: 0,
      numberTotal: 0,
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
    selectCurrentData: {
      type: [Array, Object],
    },
  },
  methods: {
    handleClick(value) {},
    async searchFuzzy() {
        this.MaterialQueryFuzzyData.workOrderCode = this.defaultProjectCode;
        console.log("------------------------")
        console.log(this.defaultProjectCode);
        let me= this;
      await listMaterial(this.MaterialQueryFuzzyData).then((res) => {
          let data= res.data;
          if(data){
              me.MaterialFuzzyData = data.rows;
              me.fuzzyTotal = data.total;

          }
      });
    },
    async searchNumber() {
        let me= this;
        this.MaterialQueryNumberData.workOrderCode= this.defaultProjectCode;
      await listMaterialInventory(this.MaterialQueryNumberData).then((res) => {
          let data= res.data;
          if(data){
              me.MaterialNumberData = data.rows;
              me.numberTotal = data.total;

          }
      });
    },
    closeDialog() {
      this.$emit("closeDialog", false);
      this.selectedRowData = null;
      this.$refs.multipleTable.clearSelection();
    },
    submitForm() {
      let data = null;
      data = this.selectedRowData.map((item) => {
        return {
          materialCode: item.item_no,
          materialName: item.item_desc,
          purchaser: item.buyer,
          isNumberOrFuzzy: item.subinventory_code ? true : false,
        };
      });
      this.$emit("seletData", data);
      this.closeDialog();
    },
    selectChakebox(value) {
      this.selectedRowData = value;
    },
  },
  watch: {
    async openMQ(newValue) {
      if (newValue) {
        await this.searchNumber();
      } else {
        this.activeName = "first";
      }
    },
    async activeName(newValue) {
      if (newValue === "second") {
        await this.searchFuzzy();
      } else {
        await this.searchNumber();
      }
    },
  },
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
</style>
