<template>
  <el-container class="app-container">
    <el-header height="auto">
      <jereh-button type="primary" plain @click="handleEdit">
        {{ editable ? "确认" : "编辑" }}
      </jereh-button>
      <jereh-button type="primary" plain @click="handleSave">
        保存
      </jereh-button>
      <jereh-button type="primary" plain @click="handleImport">
        导入
      </jereh-button>
      <jereh-button type="primary" plain @click="handleExport">
        导出
      </jereh-button>
    </el-header>
    <el-main>
      <el-form ref="queryForm" :model="queryParams" size="small" :inline="true">
        <el-row>
          <el-col :span="5">
            <el-form-item label="年度">
              <jereh-date-picker
                v-model="queryParams.annual"
                type="year"
                ph="请选择年度"
                format="yyyy"
                valueFormat="yyyy"
                :needPickerOptions="false"
                @change="getTableData"
              ></jereh-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="区域">
              <jereh-select
                v-model="queryParams.area"
                filterable
                ph="请选择区域"
                clearable
                :dict="areaList"
                labelName="dictLabel"
                valueName="dictValue"
                style="width: 300px"
                @change="getTableData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="类别">
              <jereh-select
                v-model="queryParams.category"
                filterable
                ph="请选择类别"
                clearable
                :dict="dict.type.target_type"
                @change="getTableData"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" fit border>
        <el-table-column prop="dimension" label="维度" align="center">
        </el-table-column>
        <el-table-column prop="january" label="一月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.january"
              @change="(val) => handleChange(val, scope.$index, 'january')"
            ></el-input>
            <span v-else>{{ scope.row.january }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="february" label="二月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.february"
              @change="(val) => handleChange(val, scope.$index, 'february')"
            ></el-input>
            <span v-else>{{ scope.row.february }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="march" label="三月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.march"
              @change="(val) => handleChange(val, scope.$index, 'march')"
            ></el-input>
            <span v-else>{{ scope.row.march }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="april" label="四月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.april"
              @change="(val) => handleChange(val, scope.$index, 'april')"
            ></el-input>
            <span v-else>{{ scope.row.april }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="may" label="五月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.may"
              @change="(val) => handleChange(val, scope.$index, 'may')"
            ></el-input>
            <span v-else>{{ scope.row.may }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="june" label="六月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.june"
              @change="(val) => handleChange(val, scope.$index, 'june')"
            ></el-input>
            <span v-else>{{ scope.row.june }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="july" label="七月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.july"
              @change="(val) => handleChange(val, scope.$index, 'july')"
            ></el-input>
            <span v-else>{{ scope.row.july }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="august" label="八月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.august"
              @change="(val) => handleChange(val, scope.$index, 'august')"
            ></el-input>
            <span v-else>{{ scope.row.august }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="september" label="九月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.september"
              @change="(val) => handleChange(val, scope.$index, 'september')"
            ></el-input>
            <span v-else>{{ scope.row.september }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="october" label="十月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.october"
              @change="(val) => handleChange(val, scope.$index, 'october')"
            ></el-input>
            <span v-else>{{ scope.row.october }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="november" label="十一月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.november"
              @change="(val) => handleChange(val, scope.$index, 'november')"
            ></el-input>
            <span v-else>{{ scope.row.november }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="december" label="十二月" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && (scope.$index === 0 || scope.$index === 1 || scope.$index === 3)"
              v-model="scope.row.december"
              @change="(val) => handleChange(val, scope.$index, 'december')"
            ></el-input>
            <span v-else>{{ scope.row.december }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="合计" align="center">
          <template slot-scope="scope">
            <el-input size="mini"
              v-if="editable && scope.$index === 3"
              v-model="scope.row.total"
            ></el-input>
            <span v-else>{{ scope.row.total }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!--        <div class="el-upload__tip" slot="tip">-->
        <!--          <el-checkbox v-model="upload.updateSupport"/>-->
        <!--          是否更新已经存在的设备数据-->
        <!--          <el-link type="info" style="font-size:12px" @click="handleDownloadTemplate">下载模板</el-link>-->
        <!--        </div>-->
        <div class="el-upload__tip" style="color: red" slot="tip">
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <jereh-button type="primary" @click="submitFileForm"
        >确 定</jereh-button
        >
        <jereh-button @click="upload.open = false">取 消</jereh-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import { getDicts } from '@/api/system/dict/data.js'
import { getToken } from "@/utils/auth";
import {
  listRate,
  addRate
} from "../../../api/cmms/rate";
export default {
  name: "targetCompletionRate",
  dicts: ['target_type'],
  data() {
    return {
      queryParams: {
        annual: "",
        area: "",
        category: "",
      },
      areaList: [],
      resMap: new Map(),
      editable: false,
      upload: {
        // 是否显示弹出层
        open: false,
        // 弹出层标题
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/cmms/remanufacture/importData",
      },
      tableData: [
        { dimension: "分子" },
        { dimension: "分母" },
        { dimension: "达成率" },
        { dimension: "目标达成率" },
        { dimension: "累计均值" },
      ],
      tableDataRes: [
        { dimension: "分子" },
        { dimension: "分母" },
        { dimension: "达成率" },
        { dimension: "目标达成率" },
        { dimension:  "累计均值" },
      ],
      monthMap: {
        "january": 1,
        "february": 2,
        "march": 3,
        "april": 4,
        "may": 5,
        "june": 6,
        "july": 7,
        "august": 8,
        "september": 9,
        "october": 10,
        "november": 11,
        "december": 12
      }
    };
  },
  created() {
    this.getAreaList();
    //this.getTableData();
  },
  methods: {
    getAreaList() {
      var myDate = new Date();
      var year = myDate.getFullYear()+'';
      //console.log(year);
      this.queryParams.annual=year;
      getDicts("after_sale_area").then(res => {
        this.areaList = res.data;
        this.areaList.push({dictLabel: '部门', dictValue: '部门'});
      })
      this.queryParams.area='部门';
      this.queryParams.category='首次启机合格率';
      this.getTableData();
    },
    getTableData() {
      console.log("获取表格数据!");
      console.log(this.queryParams);
      this.tableData=this.tableDataRes;
      listRate(this.queryParams).then((response)=>{
        const resdata = response.data;
        if (Array.isArray(resdata) && resdata.length){
          resdata.forEach((item)=>{
            this.resMap.set(item.dimension,item);
          })
          console.log(this.resMap);
          let tableData = this.tableData;
          if (this.resMap.size > 0){
            var a =new Array();
            for (let i = 0; i <tableData.length ; i++) {
              let newVar = this.resMap.get(tableData[i].dimension);
              a[i]=newVar;
            }
            this.tableData = a;
            console.log(this.tableData)
          }
          this.resMap.clear();
        }
      })
    },
    handleSave() {
      console.log("保存表格数据!");
      let queryParams = this.queryParams;
      let requestData = this.tableData;
      console.log(requestData);
      requestData.forEach((item)=>{
        item.area=queryParams.area;
        item.annual=queryParams.annual;
        item.category=queryParams.category;
      });
      addRate(requestData).then( (response) => {
        this.$modal.msgSuccess("新增成功");
        this.getTableData();
      })
    },
    handleEdit() {
      this.editable = !this.editable;
    },
    handleChange(val, rowIndex, colKey) {
      if (rowIndex === 0 || rowIndex === 1) {
        if (this.tableData[0][colKey] && this.tableData[1][colKey]) {
          const percent = (Math.round(parseFloat(this.tableData[0][colKey]) / parseFloat(this.tableData[1][colKey]) * 10000) / 100.00 + "%")
          this.$set(this.tableData[2], colKey, percent)
        }
        for (let key in this.monthMap) {
          if (this.monthMap[key] > this.monthMap[colKey] || this.monthMap[key] === this.monthMap[colKey]) {
            const numeratorTotal = this.getTotal(0, key)
            const denominatorTotal = this.getTotal(1, key)
            if (denominatorTotal) {
              const totalPercent = Math.round(parseFloat(numeratorTotal) / parseFloat(denominatorTotal) * 10000) / 100.00 + "%"
              this.$set(this.tableData[4], key, totalPercent)
            }
          }
        }
        this.$set(this.tableData[0], 'total', this.getTotal(0, 'december'))
        this.$set(this.tableData[1], 'total', this.getTotal(1, 'december'))
        if (this.tableData[1].total) {
          const totalPercent = Math.round(parseFloat(this.tableData[0].total) / parseFloat(this.tableData[1].total) * 10000) / 100.00 + "%"
          this.$set(this.tableData[2], 'total', totalPercent)
        }
        this.$set(this.tableData[4], 'total', this.tableData[4].december)
      }
    },
    handleImport() {
      this.upload.title = "指标达成率导入";
      this.upload.open = true;
      console.log("导入表格数据!");
    },
    handleExport() {
      this.download(
        "cmms/rate/export",
        {
          ...this.queryParams,
        },
        `指标达成率.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    getTotal(rowIndex, colKey) {
      let total = 0
      for(let key in this.monthMap) {
        if (this.monthMap[key] < this.monthMap[colKey] || this.monthMap[key] === this.monthMap[colKey]) {
          total += this.tableData[rowIndex][key] ? parseFloat(this.tableData[rowIndex][key]) : 0
        }
      }
      return total
    },
  },
};
</script>
