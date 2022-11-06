<template>
  <el-dialog
    v-dialogDrag 
    :title="title"
    :visible="open"
    width="800px"
    append-to-body
    @close="closeDialog"
  >
    <el-row v-if="open">
      <el-col :span="24" :xs="24">
        <el-form
          :model="queryParams"
          ref="queryForm"
          size="small"
          :inline="true"
          v-show="showSearch"
        >
          <el-form-item prop="keyWord">
            <el-input
              v-model="queryParams.keyWord"
              placeholder="请输入姓名或工号"
              clearable
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="getList"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>

        <el-table
          :data="tableDatas"
          @current-change="handleRadioChange"
          :row-class-name="handleSelectionChange"
          @select="selectChakebox"
          ref="multipleTable"
        >
          <el-table-column
            type="index"
            width="50"
            align="center"
            v-if="selectOrRadio"
          >
            <template slot-scope="scope">
              <el-radio
                v-model="defaultRadio"
                :label="scope.row.index"
              ></el-radio>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55" v-else />
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column
            label="工号"
            align="center"
            key="userName"
            prop="userName"
          />
          <el-table-column
            label="姓名"
            align="center"
            key="nickName"
            prop="nickName"
          />
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="rowData"
        />
      </el-col>
    </el-row>
    <div slot="footer">
      <el-button type="primary" size="mini" @click="binding">确定</el-button>
      <el-button size="mini" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { queryUserList, listUser } from "@/api/system/user";

export default {
  name: "PersonnelBinding",
  dicts: [],
  components: {},
  data() {
    return {
      // 选中数组
      ids: [],
      // 显示搜索条件
      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userInfo: undefined,
      },
      defaultRadio: -1,
      tableDatas: [],
      total: 1,
      selectData: {},
      currentSelect: [],
    };
  },
  components: {},
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
        return "人员绑定";
      },
    },
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    writeBack: {
      type: [String, Array],
    },
    selectOrRadio: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async getList() {
      await listUser(this.queryParams).then((res) => {
        this.tableDatas = [...res.rows];
        this.total = res.total;
      });
    },
    closeDialog() {
      this.$emit("closeDialog", false);
      this.defaultRadio = -1;
      this.$refs.multipleTable.clearSelection();
      this.$refs.queryForm.resetFields();
      this.selectData = [];
      this.currentSelect = [];
    },
    handleSelectionChange({ row, rowIndex }) {
      if (this.selectOrRadio) {
        row.index = rowIndex;
      }
    },
    handleRadioChange(val) {
      if (val && this.selectOrRadio) {
        this.defaultRadio = val.index;
        this.selectData = [val];
      }
    },
    binding() {
      if (this.currentSelect.length && !this.selectData.length) {
        this.selectData = this.currentSelect;
      }
      if (!this.selectData.length) {
        return this.$message.error("请选择转办人");
      }
      this.$emit("bindingData", this.selectData);
      this.closeDialog();
    },
    selectChakebox(value) {
      if (!this.selectOrRadio) {
        this.selectData = value;
      }
    },
  },
  async mounted() {},
  watch: {
    async open(newValue) {
      if (newValue) {
        await this.getList();
        if (this.writeBack.length) {
          if (!this.selectOrRadio) {
            for (let i = 0; i < this.tableDatas.length; i++) {
              this.writeBack.forEach((item) => {
                if (item === this.tableDatas[i].nickName) {
                  this.currentSelect.push(this.tableDatas[i]);
                }
              });
            }
            setTimeout(() => {
              if (this.$refs.multipleTable) {
                this.currentSelect.forEach((row) => {
                  this.$refs.multipleTable.toggleRowSelection(row);
                });
              }
            }, 10);
          } else {
            this.currentSelect = this.tableDatas.filter((item) => {
              return item.nickName === this.writeBack[0];
            });
            setTimeout(() => {
              this.defaultRadio = this.currentSelect[0].index;
            }, 10);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
::v-deep .el-radio__label {
  display: none;
}
</style>
