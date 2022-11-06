<template>
  <div>
    <div style="margin-bottom: 10px">
      <jereh-button
        type="primary"
        plain
        icon="el-icon-download"
        size="small"
        @click="handleMultiDownload"
      >
        批量下载
      </jereh-button>
    </div>
    <div>
      <el-table
        border
        :data="deviceData.document"
        fit
        :row-style="isSelected"
        @selection-change="handleSelectionChange"
        max-height="700px"
        :header-cell-style="{ background: '#eef1f8'}"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" type="index" width="55" align="center" />
        <el-table-column
          label="类别"
          align="center"
          prop="type"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="文件链接"
          align="center"
          prop="url"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="150"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <jereh-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click.native.stop="handlePreview(scope.row)"
            >
              预览
            </jereh-button>
            <jereh-button
              size="mini"
              type="text"
              icon="el-icon-tickets"
              @click="handleDownload(scope.row)"
            >
              下载
            </jereh-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex align-center justify-end">
        <Pagination
          v-show="total > 0"
          :total="total"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <!-- 文件预览弹窗 -->
    <el-dialog :visible.sync="preview" width="80%" append-to-body :close-on-click-modal="false">
      <iframe :src="fileViewUrl + previewUrl" frameborder="0" width="100%" height="700"
      ></iframe>
    </el-dialog>
  </div>
</template>
<script>
import { Base64 } from 'js-base64'

export default {
  name: "projectDocuments",
  dicts: ["sys_device_status"],
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
      fileViewUrl: process.env.VUE_APP_FILE_VIEW,
      preview: false,
      previewUrl: '',
      total: 0,
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      projectFileList: [
        { type: 1, name: "1", size: 256, id: 1 },
        { type: 2, name: "2", size: 256, id: 2 },
        { type: 1, name: "3", size: 256, id: 3 },
        { type: 2, name: "4", size: 256, id: 4 },
      ],
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
    console.log(this.deviceData)
  },
  methods: {
    getList() {
      console.log("获取文件列表信息");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleMultiDownload() {
      console.log("开始批量下载");
    },
    handlePreview(data) {
      this.previewUrl = encodeURIComponent(Object.values(data)[0])
      this.preview = true
    },
    handleDownload(data) {
      window.open(Object.values(data)[0])
    },
    // 选中行变色
    isSelected({ row }) {
      const selectedIds = this.multipleSelection.map(item => item.id)
      if (selectedIds.includes(row.id)) {
        return {
          backgroundColor: "#f7bba1"
        }
      }
    }
  },
};
</script>

<style scoped></style>
