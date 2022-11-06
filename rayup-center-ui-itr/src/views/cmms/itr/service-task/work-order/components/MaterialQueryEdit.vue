<template>
  <el-card class="box-card">
    <el-form ref="form" v-model="form" label-width="80px">
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="物料编码" prop="materialCode">
            <el-row>
              <el-col :span="6">
                <el-input
                  v-model="form.materialCode"
                  placeholder="请输入物料编码"
                  @focus="materialCodeQuery"
                />
              </el-col>
              <el-col :span="6" class="ml20">
                <el-button type="primary" @click="materialCodeQuery"
                  >查询</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="物料说明" prop="materialName">
            <el-row>
              <el-col :span="6">
                <el-input
                  v-model="form.materialName"
                  placeholder="请输入物料说明"
                  @focus="materialNameQuery"
                />
              </el-col>
              <el-col :span="6" class="ml20">
                <el-button type="primary" @click="materialNameQuery"
                  >查询</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-table :data="MaterialData" ref="multipleTable">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column align="center" label="序号" type="index" width="50" />
        <el-table-column
          label="物料编码"
          align="center"
          key="materialCode"
          prop="materialCode"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.materialCode"
              @focus="radioCurrentMaterial(scope)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="物料说明/描述"
          align="center"
          key="materialName"
          prop="materialName"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.materialName"
              @focus="radioCurrentMaterial(scope)"
            ></el-input> </template
        ></el-table-column>
        <el-table-column
          label="采购员"
          align="center"
          key="purchaser"
          prop="purchaser"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.purchaser"
              @focus="radioCurrentMaterial(scope)"
            ></el-input> </template
        ></el-table-column>
        <el-table-column
          label="需求数量"
          align="center"
          key="appyNumber"
          prop="appyNumber"
          ><template slot-scope="scope">
            <el-input v-model="scope.row.appyNumber"></el-input> </template
        ></el-table-column>
        <el-table-column
          label="是否关键物料"
          align="center"
          key="isKey"
          prop="isKey"
          ><template slot-scope="scope">
            <!--  -->
            <el-select v-model="scope.row.isKey">
              <el-option
                v-for="item in isKeyOptions"
                :key="item.value"
                :label="item.label"
                v-model="item.value"
                placeholder="请选择是否关键物料"
              >
              </el-option>
            </el-select> </template
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="160"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <MaterialNumberQuery
      :defaultProjectCode="defaultProjectCode"
      :openMQ="openMaterialQuery"
      @closeDialog="colseMaterialQuery"
      @seletData="selectMaterialInfo"
      :selectOrRadio="selectOrRadio"
    />
    <MaterialFuzzyQuery
      :openMQ="openMaterialFuzzyQuery"
      :defaultProjectCode="defaultProjectCode"
      @closeDialog="colseMaterialFuzzyQuery"
      @seletData="selectMaterialFuzzyQueryInfo"
      :selectOrRadio="selectOrRadioFuzzy"
    />
    <ERPMaterialQuery
      :defaultProjectCode="defaultProjectCode"
      :openMQ="openERPMaterialQuery"
      @closeDialog="colseERPMaterialQuery"
      @seletData="selectERPMaterialQueryInfo"
    />
  </el-card>
</template>

<script>
import MaterialNumberQuery from "./MaterialNumberQuery.vue";
import MaterialFuzzyQuery from "./MaterialFuzzyQuery.vue";
import { whether } from "@/utils/dictionary-service";
import { deleteBindItem } from "@/api/cmms/itr/work-order/order.api";
import ERPMaterialQuery from "./ERPMaterialQuery.vue";
export default {
  name: "MaterialQueryEdit",
  components: { MaterialNumberQuery, MaterialFuzzyQuery, ERPMaterialQuery },
  dicts: ["sys_yes_no"],
  data() {
    return {
      form: {},
      MaterialData: [],
      openMaterialQuery: false,
      openMaterialFuzzyQuery: false,
      openERPMaterialQuery: false,
      selectOrRadio: true,
      selectOrRadioFuzzy: true,
      currentRow: 0,
      id: this.$route.query.workOrderId,
      isKeyOptions: whether(),
      selectMaterId: "",
    };
  },
  props: {
    rowData: {
      type: Array,
      default: [],
    },
    defaultProjectCode: String,
    WorkOrderCode: String,
  },
  methods: {
    async handleDelete(scope) {
      // await deleteBindItem(scope.row.id).then((res) => {
      //   this.$message.success(res.msg);
      // });
      // this.MaterialData.splice(scope.$index, 1);
      // this.$set(this.MaterialData[scope.$index], "delFlag", 1);
      this.rowData.filter((item, index) => {
        if (item.id === scope.row.id) {
          this.$set(this.rowData[index], "delFlag", 1);
        }
      });
    },
    colseMaterialQuery(value) {
      this.openMaterialQuery = value;
    },
    colseMaterialFuzzyQuery(value) {
      this.openMaterialFuzzyQuery = value;
    },
    colseERPMaterialQuery(value) {
      this.openERPMaterialQuery = value;
    },
    materialNameQuery() {
      // this.$set(this, "selectOrRadioFuzzy", false);
      // this.openMaterialFuzzyQuery = true;
      this.openERPMaterialQuery = true;
    },
    materialCodeQuery() {
      // this.$set(this, "selectOrRadio", false);
      // this.openMaterialQuery = true;
      this.openERPMaterialQuery = true;
    },
    selectMaterialInfo(value) {
      if (this.selectOrRadio) {
        value.workOrderId = this.id;
        value.workOrderCode = this.WorkOrderCode;
        this.$set(this.rowData, this.currentRow, value);
      } else {
        value.forEach((element) => {
          element.workOrderId = this.id;
          element.workOrderCode = this.WorkOrderCode;
        });
        this.rowData.push(...value);
      }
    },
    async selectMaterialFuzzyQueryInfo(value) {
      if (this.selectOrRadioFuzzy) {
        value.workOrderId = this.id;
        value.workOrderCode = this.WorkOrderCode;
        this.$set(this.rowData, this.currentRow, value);
      } else {
        value.forEach((element) => {
          element.workOrderId = this.id;
          element.workOrderCode = this.WorkOrderCode;
        });
        this.rowData.push(...value);
      }
    },
    selectERPMaterialQueryInfo(value) {
      value.forEach((element) => {
        element.workOrderId = this.id;
        element.workOrderCode = this.WorkOrderCode;
      });
      this.rowData.push(...value);
    },
    radioCurrentMaterial(scope) {
      this.currentRow = scope.$index;
      this.selectMaterId = scope.row.id;
      if (scope.row.isNumberOrFuzzy) {
        this.$set(this, "selectOrRadio", true);
        this.openMaterialQuery = true;
      } else {
        this.$set(this, "selectOrRadioFuzzy", true);
        this.openMaterialFuzzyQuery = true;
      }
    },
  },
  watch: {
    rowData: {
      handler(nV, oV) {
        this.MaterialData = nV.filter((item) => item.delFlag != 1);
      },
      deep: true,
    },
  },
  mounted() {
    this.MaterialData = this.rowData;
  },
};
</script>

<style scoped lang="scss">
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
