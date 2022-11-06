<template>
  <el-card class="box-card">
    <!-- <div slot="header" class="clearfix">
      <div class="title">设备信息</div>
    </div> -->

    <el-form ref="form" :model="rowData" label-width="110px">
      <el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="服务类别" prop="serviceCategory">
              <jereh-select
                v-model="rowData.serviceCategory"
                filterable
                ph="请选择服务类别"
                :dict="dict.type.itr_service_category"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目编码" prop="projectCode">
              <el-input v-model="rowData.projectCode" disabled maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目编码分项" prop="projectCodeSubentry">
              <el-input
                v-model="rowData.projectCodeSubentry"
                disabled
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品编号" prop="productCode">
              <el-input v-model="rowData.productCode" disabled maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="产品名称" prop="productName">
              <el-input v-model="rowData.productName" disabled maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品型号" prop="productModel">
              <el-input
                v-model="rowData.productModel"
                disabled
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品品牌" prop="productBrand">
              <el-input
                v-model="rowData.productBrand"
                disabled
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="底盘VIN码" prop="chassisVin">
              <el-input v-model="rowData.chassisVin" disabled maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="clientName">
              <el-input v-model="rowData.clientName" disabled maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="现场联系人" prop="contactUserName">
              <el-input
                v-model="rowData.contactUserName"
                disabled
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式" prop="contactUserInfo">
              <!-- 选择 -->
              <el-input
                v-model="rowData.contactUserInfo"
                disabled
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-col :span="6">
            <el-form-item label="设备地点" prop="eqpPlace">
              <el-input v-model="rowData.eqpPlace" disabled maxlength="50" />
            </el-form-item>
          </el-col> -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="售后区域" prop="afterSaleArea">
              <!-- <el-input
                v-model="rowData.afterSaleArea"
                disabled
                maxlength="50"
              /> -->
              <jereh-select
                v-model="rowData.afterSaleArea"
                filterable
                ph="请选择售后区域"
                :dict="dict.type.after_sale_area"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="市场区域" prop="marketArea">
              <!-- <el-input v-model="rowData.marketArea" disabled maxlength="50" /> -->
              <jereh-select
                v-model="rowData.marketArea"
                filterable
                ph="请选择市场区域"
                :dict="dict.type.device_area"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
          <el-form-item label="销售工程师" prop="saleUser">
            <el-input v-model="rowData.saleUser" disabled maxlength="50" />
          </el-form-item>
        </el-col> -->
          <el-col :span="6">
            <el-form-item label="市场负责人" prop="marketChargeBy">
              <el-input
                v-model="rowData.marketChargeBy"
                placeholder=""
                disabled
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="rowData.taskSpecialityFrom">
            <el-form-item label="转办请求人" prop="taskSpecialityFrom">
              <el-input
                v-model="rowData.taskSpecialityFrom"
                placeholder=""
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="车牌号" prop="licenseNumber">
              <el-input
                v-model="rowData.licenseNumber"
                placeholder="请输入"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="台上发动机小时数"
              prop="engineUseTime"
              label-width="130px"
            >
              <el-input
                v-model="rowData.engineUseTime"
                placeholder="请输入"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="底盘行驶里程" prop="chassisMileage">
              <el-input
                v-model="rowData.chassisMileage"
                placeholder="请输入"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否有框架协议" prop="isOutlineAgreement">
              <el-select
                v-model="rowData.isOutlineAgreement"
                placeholder=""
                disabled
              >
                <el-option
                  v-for="item in isTureOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="质保终止日期" prop="qualityExpirationDate">
              <el-input
                v-model="rowData.qualityExpirationDate"
                maxlength="50"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="服务地点" prop="serviceJobsite">
              <el-input
                v-model="rowData.serviceJobsite"
                maxlength="50"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="服务需求时间" prop="serviceRequiredTime">
              <el-input
                v-model="rowData.serviceRequiredTime"
                maxlength="50"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="服务记录" prop="mileage">
              <el-input v-model="rowData.mileage" maxlength="50" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="basidRemark">
              备注：故障涉及发动机、变速箱、柱塞泵或者其他关键总成件时需要将相关信息输入并在问题信息里面上传相关的铭牌信息
            </div>
          </el-col>
        </el-row>
      </el-row>
      <div class="tableTitle">
        <div class="tt">
          关键物料更换信息
          <div class="Remark" style="font-weight: 400">
            ☆关键部件更换以后，需要在设备360中更改部件信息，请点击右侧按钮进行信息的更新维护，谢谢！
          </div>
        </div>
        <el-button type="danger">设备一键360</el-button>
      </div>
      <el-row>
        <jereh-button type="primary" plain  @click="handleExport"
          >下载模板</jereh-button
        >
        <jereh-button type="primary" plain>上传附件</jereh-button>
        <el-table :data="rowData.deviceInfoList">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column align="center" label="物料编码" prop="materialCode">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.materialCode" disabled />
            </template>
          </el-table-column>
          <el-table-column align="center" label="数量" prop="number">
            <template slot-scope="scope">
              <el-input type="text" :value="scope.row.number" disabled />
            </template>
          </el-table-column>
          <el-table-column align="center" label="物料描述" prop="materialName">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.materialName" disabled />
            </template>
          </el-table-column>
          <el-table-column align="center" label="型号信息" prop="materialModel">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.materialModel" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="关键物料" prop="isKey">
            <template slot-scope="scope">
              <!-- <el-input type="text" v-model="scope.row.isKey" /> -->
              <el-select v-model="scope.row.isKey" placeholder="">
                <el-option
                  v-for="item in isTureOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="序列号" prop="serialNo">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.serialNo" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="铭牌信息" prop="attachment">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.attachment" />
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot="header" slot-scope="scope">
              <el-button type="text" size="mini" @click="addEqpItem()"
                >新增</el-button
              >
            </template>
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="remove(scope)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { whether, serviceCategory } from "@/utils/dictionary-service";
import * as XLSX from "xlsx";

export default {
  name: "DeviceInfo",
  dicts: [
    "itr_fault_level",
    "itr_influence_level",
    "itr_emergency_degree",
    "itr_service_category",
    "itr_service_source",
    "after_sale_area",
    "device_area",
  ],
  data() {
    return {
      form: {},
      // rowData: {},
      // deviceInfoList: [{}],
      isTureOrFalse: whether(),
      serviceCategoryOptions: serviceCategory(),
    };
  },
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    title: {
      type: String,
      default: () => {
        return "修改";
      },
    },
    openFix: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  created() {
    // this.deviceInfoList = this.rowData.keyMaterialsItems;
  },
  methods: {
    addEqpItem() {
      if (!this.rowData.deviceInfoList) {
        this.rowData.deviceInfoList = [];
      }
      this.rowData.deviceInfoList.push({});
    },
    remove(value) {
      this.rowData.deviceInfoList.splice(value.$index, 1);
    },
    handleExport() {
      this.leadingOutXlsx();
    },
    leadingOutXlsx() {
      var data1 = [
        ["id", "name", "value"],
        [1, "sheetjs", 7262],
        [2, "js-xlsx", 6969],
      ];

      var data2 = [
        {
          周一: "语文",
          周二: "数学",
          周三: "历史",
          周四: "政治",
          周五: "英语",
        },
        {
          周一: "数学",
          周二: "数学",
          周三: "政治",
          周四: "英语",
          周五: "英语",
        },
        {
          周一: "政治",
          周二: "英语",
          周三: "历史",
          周四: "政治",
          周五: "数学",
        },
      ];
      //1. 新建一个工作簿
      let workbook = XLSX.utils.book_new();
      //2. 生成一个工作表，
      //2.1 aoa_to_sheet 把数组转换为工作表
      let sheet1 = XLSX.utils.aoa_to_sheet(data1);
      //2.2 把json对象转成工作表
      let sheet2 = XLSX.utils.json_to_sheet(data2);
      //3.在工作簿中添加工作表
      XLSX.utils.book_append_sheet(workbook, sheet1, "sheetName1"); //工作簿名称
      // XLSX.utils.book_append_sheet(workbook, sheet2, "sheetName2"); //工作簿名称
      // XLSX.utils.sheet_add_json(sheet1,data2);//把已存在的sheet中数据替换成json数据
      //4.输出工作表,由文件名决定的输出格式
      XLSX.writeFile(workbook, "workBook1.xlsx"); // 保存的文件名
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-box {
  padding: 10px;
  .steps {
    margin: 10px 0 35px 0;
  }
  .title {
    text-align: left;
    font-size: 20px;
    // font-weight: 800;
  }
  .showBtn {
    margin: 10px 12px;
  }
  .tableBtn {
    margin: 20px 17px;
    text-align: right;
    padding-bottom: 20px;
  }
  .markerEmail {
    display: flex;
    justify-content: flex-end;
    margin: 10px 12px;
    text-align: right;
  }
  .basidRemark {
    margin: 0 0 20px 40px;
    color: red;
    font-size: 10px;
  }
  .Remark {
    color: red;
    font-size: 10px;
    margin-top: 10px;
  }
  .tableTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .tt {
      font-size: 18px;
      font-weight: 800;
    }
  }
}
.dialog-footer {
  position: relative;

  .back {
    position: absolute;
    right: 0;
  }
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
