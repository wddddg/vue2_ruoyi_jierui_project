<template>
  <el-drawer
    :visible="open"
    direction="rtl"
    size="800px"
    append-to-body
    @close="closeDialog"
    @opened="changeTimeFormat"
  >
    <div style="padding: 0 10px 10px 10px; margin-bottom: 55px">
      <div class="title">
        <div class="cn">服务旧件移交记录单</div>
      </div>
      <el-form ref="form" :model="rowData">
        <div class="codeInfo">
          <div class="code">编号: {{ rowData.workOrderCode }}</div>
          <!-- JREQP19(01)-01 -->
          <div class="serialNo">序号/SerialNo:{{ rowData.serialNo }}</div>
        </div>
        <el-descriptions
          class="margin-top"
          :column="2"
          border
          :label-style="myLabel"
        >
          <el-descriptions-item>
            <template slot="label"> 产品名称 </template>
            {{ rowData.productName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 项目编码</template>
            {{ rowData.projectCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 产品编码 </template>
            {{ rowData.productCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 服务工程师 </template>
            {{ rowData.consigner }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 物料名称</template>
            {{ rowData.materialName }}
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ width: '211px' }">
            <template slot="label"> 型号</template>
            <el-input
              v-model="rowData.model"
              placeholder="请填写型号"
            ></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 序列号</template>
            {{ rowData.serialNo }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 物料编码</template>
            {{ rowData.materialCode }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 数量</template>
            {{ rowData.number }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 返司时间</template>
            {{ rowData.deliveryDate }}
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ width: '211px' }">
            <template slot="label"> 服务时间</template>
            <el-date-picker
              v-model="rowData.execDate"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
            />
          </el-descriptions-item>
          <el-descriptions-item> </el-descriptions-item>
        </el-descriptions>
        <div class="tt">
          故障现象描述：(需要附相关的图片信息，以及部件铭牌信息照片)
        </div>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入故障描述"
          v-model="rowData.faultDesc"
        >
        </el-input>
        <!-- <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          style="margin: 10px 0 10px 0"
        >
          <i class="el-icon-plus"></i>
        </el-upload> -->
        <ImageUpload
          v-model="rowData.faultDescAccessory"
          :isShowTip="false"
          style="margin: 10px 0px"
        />

        <el-dialog :visible.sync="dialogVisible" v-dialogDrag>
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <el-descriptions
          class="margin-top"
          :column="2"
          border
          :label-style="myLabel"
        >
          <el-descriptions-item>
            <template slot="label"> 服务工程师 </template>
            {{ rowData.engineerName }}
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ width: '211px' }">
            <template slot="label"> 日期</template>
            {{ nowTime }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="tt">原因分析：</div>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入故障原因"
          v-model="rowData.reasonAnalysis"
        >
        </el-input>
        <el-descriptions
          class="margin-top"
          :column="2"
          border
          :label-style="myLabel"
          style="margin-top: 10px"
        >
          <el-descriptions-item>
            <template slot="label"> 服务工程师 </template>
            {{ rowData.engineerName }}
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ width: '211px' }">
            <template slot="label"> 日期</template>
            {{ nowTime }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="tt">现场解决措施：</div>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入现场解决措施"
          v-model="rowData.processResult"
        >
        </el-input>
        <el-descriptions
          class="margin-top"
          :column="2"
          border
          :label-style="myLabel"
          style="margin-top: 10px"
        >
          <el-descriptions-item>
            <template slot="label"> 服务工程师 </template>
            {{ rowData.engineerName }}
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ width: '211px' }">
            <template slot="label"> 日期</template>
            {{ nowTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 零部件移交人 </template>
            {{ rowData.engineerName }}
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ width: '211px' }">
            <template slot="label"> 日期</template>
            {{ nowTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 零部件接收人 </template>
            <!-- {{ rowData.jsr }} -->
            <!-- <el-input placeholder="请输入零部件接收人" /> -->
            <!-- v-model="rowData.solutionProcessResult" -->
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ width: '211px' }">
            <template slot="label"> 日期</template>
            <!-- {{ nowTime }} -->
            <!-- <el-date-picker
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
            /> -->
            <!-- v-model="rowData.startTime" -->
          </el-descriptions-item>
        </el-descriptions>
        <el-row>
          <el-row class="mb10">
            <el-col :span="4" class="jy">部门主管处置建议：</el-col>
            <el-col :span="20">
              <!-- <el-input placeholder="部门主管处置建议"/> -->
            </el-col>
          </el-row>
          <el-row class="mb10">
            <el-col :span="4" class="jy"> 采购件质量问题： </el-col>
            <el-col :span="20">
              <!-- <el-input placeholder="采购件质量问题" /> -->
            </el-col>
          </el-row>
          <el-row class="mb10">
            <el-col :span="4" class="jy"> 客户原因： </el-col>
            <el-col :span="20">
              <!-- <el-input placeholder="请输入客户原因" /> -->
              <!-- v-model="form.processResult" -->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="jy"> 其他原因： </el-col>
            <el-col :span="8">
              <!-- <el-input placeholder="请输入其他原因" /> -->
            </el-col>
            <el-col :span="14" class="jy">
              <!-- 8 -->
              维修与售后服务部总（副）监/日期：
            </el-col>
            <el-col :span="4">
              <!-- <el-date-picker
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
            /> -->
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div class="bottom">
        <div class="bt-left">
          <div class="tt">
            质量管理部评审处置意见（需在下面的横线上写明具体的处置措施）：
          </div>
          <div class="info">
            <div class="btInput">返工/返修：</div>
            <div class="btInput">报废：</div>
            <div class="btInput">让步接收：</div>
            <div class="btInput">需要技术研究院评审：</div>
            <div class="btInput">评审人/日期：</div>
            <div class="btInput">质量管理部主管审批/日期：</div>
          </div>

          <div class="bb">旧件处理结果跟踪记录</div>
        </div>
        <div class="bt-right">
          <div class="tt">
            技术研究院评审最终处置意见（需在下面的横线上写明具体的处置措施）：
          </div>
          <div class="info">
            <div class="btInput">返工/返修：</div>
            <div class="btInput">报废：</div>
            <div class="btInput">让步接收：</div>
            <div class="btInput">评审人/日期：</div>
            <div class="btInput">技术研究院主管审批/日期：</div>
          </div>
          <div class="bb">（此栏目由综合支持专员填写）</div>
        </div>
      </div>
      <!-- <div class="signature">
        <div class="principal">
          <div class="cnSignature">
            质量管理部评审处置意见（需在下面的横线上写明具体的处置措施）：
          </div>
          <div class="date">日期 Date:</div>
        </div>
        <div class="Client">
          <div class="cnSignature">
            技术研究院评审最终处置意见（需在下面的横线上写明具体的处置措施）：
          </div>
          <div class="date">日期 Date:</div>
        </div>
      </div> -->
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div> -->
    </div>
    <div class="demo-drawer__footer">
      <div class="drawer__footer_box">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import {
  getWorkOrder,
  addUsedRecord,
  editUsedRecord,
  getByIdUsedRecord,
} from "@/api/cmms/itr/work-order/order.api.js";
export default {
  name: "CoreHandoverDrawer",
  data() {
    return {
      form: {},
      myLabel: { width: "170px", height: "57px" },
      serviceInfo: { height: "100px" },
      dialogImageUrl: "",
      dialogVisible: false,
      nowTime: "",
    };
  },
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  methods: {
    async submit() {
      // console.log(this.rowData);

      if (this.rowData?.id) {
        await editUsedRecord(this.rowData).then((res) => {
          this.closeDialog();
          this.$message.success("编辑成功");
        });
      } else {
        await addUsedRecord(this.rowData).then((res) => {
          this.closeDialog();
          this.$message.success("新增成功");
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    cancel() {
      // this.open = false;
      this.$emit("closeDialog", false);
      // this.reset();
    },
    //数字时间戳转换成日期时间函数，time为传入的数字时间戳，如果数字时间戳先前作了/1000运算，请先*1000再传入
    changeTimeFormat() {
      var date = new Date();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var currentDate =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var mm =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      this.nowTime =
        date.getFullYear() +
        "-" +
        month +
        "-" +
        currentDate +
        " " +
        hh +
        ":" +
        mm;
      //返回格式：yyyy-MM-dd hh:mm
      console.log(this.nowTime);
    },
  },
  watch: {
    async open(newValue) {
      if (newValue) {
        await getWorkOrder(this.rowData.workOrderId).then(async (res) => {
          // console.log(res);
          this.rowData = Object.assign({}, this.rowData, {
            faultDesc: res.data.serviceDescription,
            productName: res.data.productName,
            projectCode: res.data.projectCode,
            productCode: res.data.productCode,
            faultDescAccessory: res.data.malfunctionImage,
            engineerName: res.data.engineerName,
            reasonAnalysis: res.data.workOrderFaultDetailVo.reasonAnalyse,
            processResult:
              res.data.workOrderFaultDetailVo.solutionProcessResult,
            workOrderCode: res.data.workOrderCode,
            serialNo: res.data.serialNo,
          });
          await getByIdUsedRecord({
            materialUsedId: this.rowData.materialUsedId,
          }).then((res) => {
            if (res?.data) {
              this.rowData = Object.assign({}, this.rowData, res.data);
            }
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: #000;
}
.codeInfo {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.dialog-footer {
  text-align: right;
}
.signature {
  font-size: 16px;
  display: flex;
  margin-top: 30px;
  .principal {
    margin-right: 260px;
  }
}
.tip {
  margin-top: 40px;
  font-size: 14px;
  font-style: italic;
}
.tt {
  font-size: 15px;
  margin: 10px 0 10px 0;
  color: #606266;
  // font-weight: 600;
}
.jy {
  text-align: right;
  font-size: 14px;
  margin: 10px 0 10px 0;
  color: #606266;
}
.btInput {
  font-size: 14px;
  margin: 10px 0 10px 0;
  color: #606266;
}
.bottom {
  margin-top: 20px;
  width: 100%;
  border: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  .bt-left {
    padding: 0 10px 0 10px;
    width: 50%;
    border-right: 1px solid #ebeef5;
  }
  .bt-right {
    padding: 0 10px 0 10px;
    width: 50%;
  }
  .info {
    height: 180px;
  }
  .bb {
    font-size: 14px;
    // margin: 10px 0 10px 0;
    color: #606266;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #ebeef5;
  }
}
.demo-drawer__footer {
  position: fixed;
  bottom: 0;
  // right: 20px;
  background-color: #fff;
  width: 800px;
  height: 55px;
  .drawer__footer_box {
    position: absolute;
    right: 20px;
    top: 10px;
  }
}
</style>
