<template>
  <div class="p-3">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane name="1">
        <el-badge slot="label" :value="noticeTableList" class="item">
          <span>通知公告</span>
        </el-badge>
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <jereh-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
                v-hasPermi="['system:notice:add']"
              >
                新增
              </jereh-button>
            </el-col>
            <el-col :span="1.5">
              <jereh-button
                type="success"
                plain
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['system:notice:edit']"
              >
                修改
              </jereh-button>
            </el-col>
            <el-col :span="1.5">
              <jereh-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['system:notice:remove']"
              >
                删除
              </jereh-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
          </el-row>

        <div class="app-container">
          <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="公告标题" prop="noticeTitle">
              <jereh-input
                v-model="queryParams.noticeTitle"
                ph="请输入公告标题"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="操作人员" prop="createBy">
              <jereh-input
                v-model="queryParams.createBy"
                ph="请输入操作人员"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="类型" prop="noticeType">
              <jereh-select
                v-model="queryParams.noticeType"
                ph="公告类型"
                clearable
                :dict="dict.type.sys_notice_type"
              />
            </el-form-item>
            <el-form-item>
              <jereh-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜 索</jereh-button>
              <jereh-button icon="el-icon-refresh" size="mini" @click="resetQuery">重 置</jereh-button>
            </el-form-item>
          </el-form>


          <el-table v-loading="loading" :data="noticeList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" prop="noticeId" width="100" />
            <el-table-column
              label="公告标题"
              align="center"
              prop="noticeTitle"
              :show-overflow-tooltip="true"
            />
            <el-table-column label="公告类型" align="center" prop="noticeType" width="100">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.sys_notice_type" :value="scope.row.noticeType"/>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status" width="100">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.sys_notice_status" :value="scope.row.status"/>
              </template>
            </el-table-column>
            <el-table-column label="创建者" align="center" prop="createBy" width="100" />
            <el-table-column label="创建时间" align="center" prop="createTime" width="100">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <jereh-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:notice:edit']"
                >
                  修改
                </jereh-button>
                <jereh-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['system:notice:remove']"
                >
                  删除
                </jereh-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />

          <!-- 添加或修改公告对话框 -->
          <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="公告标题" prop="noticeTitle">
                    <jereh-input v-model="form.noticeTitle" ph="请输入公告标题"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="公告类型" prop="noticeType">
                    <jereh-select
                      v-model="form.noticeType"
                      ph="请选择公告类型"
                      :dict="dict.type.sys_notice_type"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="状态">
                    <el-radio-group v-model="form.status">
                      <el-radio
                        v-for="dict in dict.type.sys_notice_status"
                        :key="dict.value"
                        :label="dict.value"
                      >{{dict.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="内容">
                    <editor v-model="form.noticeContent" :min-height="192"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <jereh-button type="primary" @click="submitForm">确 定</jereh-button>
              <jereh-button @click="cancel">取 消</jereh-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2">
        <el-badge slot="label" :value="messageTableList" class="item">
             <span>通知消息</span>
        </el-badge>
         <div class="app-container">
          <el-form :model="queryParamsMessage" ref="queryFormMessage" size="small" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="消息标题" prop="messageTitle">
              <jereh-input
                v-model="queryParamsMessage.messageTitle"
                ph="请输入消息标题"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="查阅状态" prop="status">
              <jereh-select
                v-model="queryParamsMessage.status"
                ph="查阅状态"
                clearable
                :dict="dict.type.read_status"
              />
            </el-form-item>
            <el-form-item>
              <jereh-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryMessage">查 询</jereh-button>
              <jereh-button icon="el-icon-refresh" size="mini" @click="resetQueryMessage">清 空</jereh-button>
            </el-form-item>
          </el-form>


          <el-table v-loading="loadingMessage" :data="messageList" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <el-table-column label="序号" align="center" type="index" width="100" />
            <el-table-column
              label="消息标题"
              align="center"
              prop="messageTitle"
              :show-overflow-tooltip="true"
            />
            <el-table-column label="消息类型" align="center" prop="noticeType" width="100">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.message_type" :value="scope.row.messageType"/>
              </template>
            </el-table-column>
             <el-table-column
              label="消息内容"
              align="center"
              prop="messageContent"
              :show-overflow-tooltip="true"
            />
            <el-table-column label="查阅状态" align="center" prop="status" width="100">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.read_status" :value="scope.row.status"/>
              </template>
            </el-table-column>
            <!-- <el-table-column label="创建者" align="center" prop="createBy" width="100" /> -->
            <el-table-column label="推送时间" align="center" prop="createTime" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <jereh-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleSub(scope.row)"
                  v-if="scope.row.status == 0"
                >
                  查阅
                </jereh-button>
                <jereh-button
                  size="mini"
                  type="text"
                  v-if="scope.row.status == 1"
                  disabled
                >
                  已读
                </jereh-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="totalMessage>0"
            :total="totalMessage"
            :page.sync="queryParamsMessage.pageNum"
            :limit.sync="queryParamsMessage.pageSize"
            @pagination="getListMessage"
          />
         </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { listNotice, getNotice, delNotice, addNotice, updateNotice, listMessage, setStatus } from "@/api/system/notice";
export default {
  dicts: ['sys_notice_status', 'sys_notice_type', 'read_status', 'message_type'],
  data() {
    return {
      activeName: '1',
      noticeTableList: 0,
      messageTableList:0,
       // 遮罩层
      loading: true,
      loadingMessage: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      totalMessage: 0,
      // 公告表格数据
      noticeList: [],
      //通知数据
      messageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined
      },
      queryParamsMessage: {
        pageNum: 1,
        pageSize: 10,
        messageTitle: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" }
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" }
        ]
      }
    }
  },
  created() {
    this.getList();
    this.getListMessage();
  },
  methods: {
    handleSub(val) {
      console.log("val" + JSON.stringify(val));
      this.messageTableList--;
      setStatus(val.messageId).then(response => {
      // this.messageList = response.rows;
      // console.log("this.messageList" + this.messageList);
      // this.total = response.total;
      // this.loadingMessage = false;
      // this.messageTableList = response.total;
      console.log("response" + response)
      this.getListMessage();
    });
    },
    /**查询消息通告 */
    getListMessage() {
      listMessage(this.queryParamsMessage).then(response => {
        this.messageList = response.rows;

        this.totalMessage = response.total;
        this.loadingMessage = false;
        this.messageTableList = 0;
        this.messageList.forEach((item) => {
          if(item.status == 0) {
            this.messageTableList++;
          }
        })

      });
    },
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      listNotice(this.queryParams).then(response => {
        this.noticeList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.noticeTableList = response.total;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        noticeId: undefined,
        noticeTitle: undefined,
        noticeType: undefined,
        noticeContent: undefined,
        status: "0"
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
      /** 搜索按钮操作 */
    handleQueryMessage() {
      this.queryParamsMessage.pageNum = 1;
      this.getListMessage();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    resetQueryMessage() {
      this.resetForm("queryFormMessage");
      this.handleQueryMessage();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.noticeId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公告";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const noticeId = row.noticeId || this.ids
      getNotice(noticeId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公告";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.noticeId != undefined) {
            updateNotice(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNotice(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const noticeIds = row.noticeId || this.ids
      this.$modal.confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项？').then(function() {
        return delNotice(noticeIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 10px;
}
</style>
