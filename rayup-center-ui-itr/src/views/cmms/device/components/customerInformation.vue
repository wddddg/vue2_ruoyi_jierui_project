<template>
  <div>
    <div style="margin-bottom: 10px">
      <!-- <jereh-button
        type="primary"
        plain
        icon="el-icon-download"
        size="small"
        @click="handleReport"
      >
        客户建议报告
      </jereh-button> -->
      <file-upload
        v-model="fileUrls"
        size="small"
        buttonName="附件"
        :isShowTip="false"
        @success="handleSave"
        @delete="handleDelete"
        :isShowOther="true"
        otherButtonName="客户建议报告"
        otherButtonIcon="el-icon-download"
        @clickOther="handleReport"
        :isPlain="true"
      ></file-upload>
    </div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="basicInfo">
          <template slot="title">
            <span>1.客户基础信息</span>
          </template>
          <el-descriptions
            class="margin-top"
            style="width: 100%"
            :column="3"
            border
            :labelStyle="{ width: '13%' }"
            :contentStyle="{ width: '20%' }"
          >
            <el-descriptions-item>
              <template slot="label"> 客户名称 </template>
              {{ deviceData.customerName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 客户类型 </template>
              {{ deviceData.customerType }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 客户代码 </template>
              {{ deviceData.customerCode }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 客户下属单位名称 </template>
              {{ deviceData.customerUntilName }}
            </el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
        <el-collapse-item name="customerInfo">
          <template slot="title">
            <span>2.客户联系人</span>
          </template>
          <el-table border :data="contactsList" fit :header-cell-style="{ background: '#eef1f8'}">
            <el-table-column
              label="序号"
              type="index"
              width="55"
              align="center"
            />
            <el-table-column
              label="姓名"
              align="center"
              prop="customerName"
              show-overflow-tooltip
            />
            <el-table-column
              label="联系方式"
              align="center"
              prop="customerPhone"
              show-overflow-tooltip
            />
            <el-table-column
              label="职务"
              align="center"
              prop="customerPosition"
              show-overflow-tooltip
            />
            <el-table-column
              label="性别"
              align="center"
              prop="customerSex"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ transDict(scope.row.customerSex, dict.type.sys_user_sex) }}
              </template>
            </el-table-column>
            <el-table-column
              label="出生日期"
              align="center"
              prop="customerBirthTime"
              show-overflow-tooltip
            />
            <el-table-column
              label="年龄"
              align="center"
              prop="customerAge"
              show-overflow-tooltip
            />
            <el-table-column
              label="爱好"
              align="center"
              prop="customerBoddy"
              show-overflow-tooltip
            />
            <el-table-column
              label="是否主要联系人"
              align="center"
              prop="customerIsMain"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ transDict(scope.row.customerIsMain, dict.type.sys_yes_no) }}
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
<!--        <el-collapse-item name="fileInfo">-->
<!--          <template slot="title">-->
<!--            <span>3.附件信息</span>-->
<!--          </template>-->
<!--          <el-table border :data="fileList" fit :header-cell-style="{ background: '#eef1f8'}">-->
<!--            <el-table-column-->
<!--              label="序号"-->
<!--              type="index"-->
<!--              width="55"-->
<!--              align="center"-->
<!--            />-->
<!--            <el-table-column-->
<!--              label="附件名称"-->
<!--              align="center"-->
<!--              prop="fileName"-->
<!--              show-overflow-tooltip-->
<!--            />-->
<!--            <el-table-column-->
<!--              label="上传人"-->
<!--              align="center"-->
<!--              prop="uploader"-->
<!--              show-overflow-tooltip-->
<!--            />-->
<!--            <el-table-column-->
<!--              label="上传时间"-->
<!--              align="center"-->
<!--              prop="uploadTime"-->
<!--              show-overflow-tooltip-->
<!--            />-->
<!--            <el-table-column label="操作" align="center" prop="uploadTime">-->
<!--              <template slot-scope="scope">-->
<!--                <jereh-button-->
<!--                  size="mini"-->
<!--                  type="text"-->
<!--                  icon="el-icon-edit"-->
<!--                  @click.native.stop="handlePreview(scope.row)"-->
<!--                >-->
<!--                  预览-->
<!--                </jereh-button>-->
<!--                <jereh-button-->
<!--                  size="mini"-->
<!--                  type="text"-->
<!--                  icon="el-icon-tickets"-->
<!--                  @click="handleDownload(scope.row)"-->
<!--                >-->
<!--                  下载-->
<!--                </jereh-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--          <div class="justify-end">-->
<!--            <Pagination-->
<!--              v-show="fileTotal > 0"-->
<!--              :total="fileTotal"-->
<!--              :page.sync="fileQuery.pageNum"-->
<!--              :limit.sync="fileQuery.pageSize"-->
<!--              @pagination="getFileList"-->
<!--            />-->
<!--          </div>-->
<!--        </el-collapse-item>-->
      </el-collapse>
      <el-dialog
        v-dialogDrag
        title="客户建议报告"
        :visible.sync="isShow"
        v-if="isShow"
        width="70vw"
      >
        <div style="height: 70vh">
          <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="100%"
            height="100%"
            :src="link"
          >
          </iframe>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addAnnex } from "@/api/cmms/device.js"

export default {
  name: "projectInformation",
  dicts: ["sys_user_sex", "sys_yes_no"],
  props: {
    deviceData: {
      required: true,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      activeNames: ["basicInfo", "customerInfo", "fileInfo"],
      isShow: false,
      contactsQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      contactsList: [],
      fileTotal: 0,
      fileQuery: {
        pageNum: 1,
        pageSize: 10,
        foreignId: this.deviceData.id,
      },
      fileList: [],
      fileUrls: '',
      loading: true
    };
  },
  created() {
    this.fileUrls = this.deviceData.customerAnnex
    this.getContactsList();
  },
  methods: {
    getContactsList() {
      const params = this.contactsQuery;
      const dataList = this.deviceData.customerBasicList;
      if (Array.isArray(dataList) && dataList.length) {
        const startIndex = (params.pageNum - 1) * params.pageSize;
        const endIndex = params.pageNum * params.pageSize;
        this.contactsList = dataList.slice(startIndex, endIndex);
      } else {
        this.contactsList = [];
      }
    },
    getFileList() {
      console.log("获取列表")
    },
    handleReport() {
      this.$router.push({
        path: "/cmms/device/print",
        query: { id: this.deviceData.projectItem,type:2},
      });
    },
    handleRemove() {
      console.log("删除上传的文件！");
    },
    handleUploadError(err) {
      this.$modal.msgError("上传失败，请重试");
      this.$modal.closeLoading();
    },
    handleDownload(row) {
      console.log("开始下载");
    },
    handlePreview(row) {
      console.log("开始预览");
    },
    // 根据字典翻译
    transDict(value, map) {
      if (Array.isArray(map) && map.length) {
        const index = map.findIndex((item) => {
          return item.raw.dictValue === value;
        });
        return index === -1 ? value : map[index].label;
      }
      return value;
    },
    handleSave() {
      this.loading = true;
      const postData = {
        "id": this.deviceData.id,
        "productCode": this.deviceData.productCode,
        "editFlag": this.deviceData.editFlag,
        "customerAnnex": this.fileUrls
      }
      addAnnex(postData).then(res => {
        this.loading = false;
        this.$modal.msgSuccess("保存成功！")
      }).catch(e => {
        this.loading = false;
        console.log(e);
      })
    },
    handleDelete() {
      this.handleSave()
    }
  },
};
</script>

<style scoped></style>
