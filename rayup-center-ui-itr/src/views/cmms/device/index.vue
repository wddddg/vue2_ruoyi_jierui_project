<template>
  <el-container>
    <el-header>
      <div v-if="agency === 0">
        <jereh-button
          type="primary"
          plain
          icon="el-icon-back"
          size="small"
          @click="handleReturn"
        >
          返回
        </jereh-button>
        <jereh-button
          type="primary"
          :plain="false"
          icon="el-icon-plus"
          size="small"
          @click="handleAddClick"
          v-hasPermi="['cmms:device:add']"
        >
          新增
        </jereh-button>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-download"
          size="small"
          @click="handleExport"
          v-hasPermi="['cmms:device:export']"
        >
          导出
        </jereh-button>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-upload2"
          size="small"
          @click="handleImportDevice"
          v-hasPermi="['cmms:device:import']"
        >
          批量导入
        </jereh-button>
        <jereh-button
          type="primary"
          plain
          icon="el-icon-upload2"
          size="small"
          @click="handleImportPic"
          v-hasPermi="['cmms:device:importImage']"
        >
          导入图片
        </jereh-button>
        <jereh-button
          type="primary"
          plain
          size="small"
          @click="handleDownloadTemplate"
          v-hasPermi="['cmms:device:downloadTemplate']"
        >
          下载导入模板
        </jereh-button>
        <el-dropdown @command="handleCommand" class="ml-1">
          <jereh-button type="primary" plain size="small">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </jereh-button>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="批量审核">批量审核</el-dropdown-item> -->
            <el-dropdown-item command="生成二维码" v-hasPermi="['cmms:device:genqrcode']">生成二维码</el-dropdown-item>
            <el-dropdown-item command="批量创建服务单" v-hasPermi="['cmms:device:createService']">批量创建服务单</el-dropdown-item>
            <el-dropdown-item
              command="关联用户"
              v-hasPermi="['cmms:usergroupdevice:add']"
              >关联用户</el-dropdown-item
            >
            <el-dropdown-item
              command="关联用户组"
              v-hasPermi="['cmms:usergroupdevice:add']"
              >关联用户组</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <jereh-button type="primary" plain size="small" style="margin-left: 10px"
          >视频指导</jereh-button
        >
        <right-toolbar
          :showSearch.sync="showSearch"
          @queryTable="getList"
        ></right-toolbar>
      </div>
      <div v-if="agency == 1">
        <jereh-button
          type="primary"
          plain
          size="small"
          @click="auditBatch"
          v-hasPermi="['cmms:device:audit']"
        >
          批量审核
        </jereh-button>
      </div>
      <!-- 查询条件 -->
      <el-form
        class="mt-1 flex justify-between"
        :model="queryParams"
        ref="queryForm"
        size="small"
        :inline="true"
        v-show="showSearch"
        label-width="120px"
        v-if="agency === 0"
      >
        <div>
          <el-form-item
            prop="productBrand"
            style="width: 130px"
            v-if="deviceType === 2"
          >
            <jereh-select
              v-model="queryParams.productBrand"
              filterable
              ph="产品品牌"
              clearable
              :dict="dict.type.product_brand_notjereh"
              @change="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="productName" style="width: 130px">
            <jereh-select
              v-model="queryParams.productName"
              filterable
              ph="产品名称"
              clearable
              :dict="dict.type.product_name"
              @change="handleQuery"
            />
          </el-form-item>
          <el-form-item
            prop="projectItem"
            style="width: 130px"
            v-if="deviceType < 2"
          >
            <jereh-input
              v-model="queryParams.projectItem"
              ph="项目编码分项"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item
            prop="productCode"
            style="width: 130px"
            v-if="deviceType < 2"
          >
            <jereh-input
              v-model="queryParams.productCode"
              ph="产品编号"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item
            prop="licensePlateCode"
            style="width: 130px"
            v-if="deviceType > 1"
          >
            <jereh-input
              v-model="queryParams.licensePlateCode"
              ph="车牌号"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="afterSaleArea" style="width: 130px">
            <jereh-select
              v-model="queryParams.afterSaleArea"
              filterable
              ph="售后区域"
              clearable
              :dict="dict.type.after_sale_area"
              @change="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="deviceArea" style="width: 130px">
            <jereh-select
              v-model="queryParams.deviceArea"
              filterable
              ph="市场区域"
              clearable
              :dict="dict.type.device_area"
              @change="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="customerName" style="width: 130px">
            <jereh-input
              v-model="queryParams.customerName"
              ph="客户名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item
            prop="licensePlateCode"
            style="width: 130px"
            v-if="deviceType < 2"
          >
            <jereh-input
              v-model="queryParams.licensePlateCode"
              ph="车牌号"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <jereh-button type="primary" size="small" @click="handleQuery">
              过滤
            </jereh-button>
            <jereh-button
              type="primary"
              icon="el-icon-refresh"
              size="small"
              @click="resetQuery"
            >
              重置
            </jereh-button>
          </el-form-item>
        </div>
        <div>
          <el-form-item prop="searchValue" style="width: 120px">
            <jereh-input
              v-model="queryParams.searchValue"
              ph="模糊搜索"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <jereh-button type="primary" size="small" @click="handleQuery">
              搜索
            </jereh-button>
          </el-form-item>
        </div>
      </el-form>
      <!-- 功能按钮 -->
      <el-form
        class="mt-2"
        :model="queryParams"
        ref="queryForm"
        size="small"
        :inline="true"
        v-show="showSearch"
        label-width="120px"
        v-if="agency == 1"
      >
        <el-form-item prop="deviceState">
          <jereh-select
            v-model="queryParams.deviceState"
            filterable
            ph="数据状态"
            clearable
            :dict="dict.type.device_state_query"
          />
        </el-form-item>
        <el-form-item>
          <jereh-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="handleQuery"
          >
            搜索
          </jereh-button>
          <jereh-button icon="el-icon-refresh" size="small" @click="resetQuery">
            重置
          </jereh-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <deviceList
        ref="child"
        :deviceList="deviceList"
        :deviceType="deviceType"
        :header-cell-style="headerCellStyle"
        :isHiddenNumb="false"
        @handleSelectionChange="handleSelectionChange"
      ></deviceList>
      <div class="flex align-center justify-end" v-if="agency === 0">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </el-main>
    <!-- 导入对话框 -->
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
        <div class="el-upload__tip" style="color: red" slot="tip">
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <jereh-button type="primary" size="small" @click="submitFileForm"
          >确 定</jereh-button
        >
        <jereh-button size="small" @click="upload.open = false">取 消</jereh-button>
      </div>
    </el-dialog>
    <!-- 导入图片对话框 -->
    <el-dialog
      :title="imageUpload.title"
      :visible.sync="imageUpload.open"
      width="400px"
    >
      <el-upload
        ref="imageUpload"
        multiple
        accept=".jpg, .png"
        :headers="imageUpload.headers"
        :action="
          imageUpload.url + '?updateSupport=' + imageUpload.updateSupport
        "
        :disabled="imageUpload.isUploading"
        :on-progress="handleImageUploadProgress"
        :on-success="handleImageSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!--        <div class="el-upload__tip" slot="tip">-->
        <!--          <el-checkbox v-model="imageUpload.updateSupport"/>-->
        <!--          是否更新已经存在的图片数据-->
        <!--        </div>-->
        <div class="el-upload__tip" style="color: red" slot="tip">
          提示：仅允许导入“jpg”或“png”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <jereh-button type="primary" size="small" @click="submitImageForm"
          >确 定</jereh-button
        >
        <jereh-button size="small" @click="imageUpload.open = false">取 消</jereh-button>
      </div>
    </el-dialog>
    <!-- 批量审核对话框 -->
    <el-dialog title="批量审核" :visible.sync="auditVisible" width="500px">
      <jereh-input v-model="auditRemark" ph="请输入审核意见" />
      <div slot="footer" class="dialog-footer">
        <jereh-button size="small" @click="auditSubmit(4)">审核不通过</jereh-button>
        <jereh-button type="primary" size="small" @click="auditSubmit(1)"
          >审核通过</jereh-button
        >
      </div>
    </el-dialog>
    <!-- 关联用户 -->
    <el-dialog
      title="关联用户"
      :visible.sync="showAssociatedUserDialog"
      v-if="showAssociatedUserDialog"
      width="400px"
    >
      <div style="height: 100px; width: 80%">
        <jereh-person-select
          v-model="bindUserIdList"
          bindValue="userId"
          ph="请输入工号或姓名"
          @change="handleUserChange"
          :initialize="true"
        />
      </div>
      <!-- :label="item.userName + ' ' + item.nickName" -->
      <div slot="footer" class="dialog-footer">
        <jereh-button size="small" @click="showAssociatedUserDialog = false"
          >取 消</jereh-button
        >
        <jereh-button type="primary" size="small" @click="submitAssociatedUser"
          >提 交</jereh-button
        >
      </div>
    </el-dialog>
    <!-- 关联用户组 -->
    <el-dialog
      title="关联用户组"
      :visible.sync="showAssociatedGroupDialog"
      v-if="showAssociatedGroupDialog"
      width="400px"
    >
      <div style="height: 100px; width: 80%">
        <el-select
          v-model="bindGroupIdList"
          multiple
          placeholder="请选择用户组"
        >
          <el-option
            v-for="item in bindGroupOptions"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          >
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <jereh-button size="small" @click="showAssociatedGroupDialog = false"
          >取 消</jereh-button
        >
        <jereh-button type="primary" size="small" @click="submitAssociatedGroup"
          >提 交</jereh-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { getDevice, listDevice } from "@/api/cmms/device.js";
import {
  auditBatch,
  memoryDevice,
  submitDevice,
  submitBatchAssociatedGroup,
  submitBatchAssociatedUser,
  remoteUser,
  getUserGroupList,
} from "../../../api/cmms/device";
import { getToken } from "@/utils/auth";
import deviceList from "../components/deviceList";

export default {
  name: "Device",
  dicts: [
    "jereh_device",
    "device_state",
    "device_state_query",
    "component_name",
    "stage_engine_brand",
    "stage_gearbox_brand",
    "piston_pump_manufacturer",
    "injection_head_brand",
    "customer_mark",
    "after_sale_area",
    "device_area",
    "product_brand",
    "marketer_area",
    "chassis_brand",
    "product_name",
    "product_line",
    "product_brand_notjereh",
  ],
  components: {
    deviceList,
  },
  data() {
    return {
      // 批量审核审核备注
      auditRemark: "",
      auditVisible: false,
      // 代办设备页面
      agency: 0,
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
        url: process.env.VUE_APP_BASE_API + "/cmms/device/importData",
      },
      imageUpload: {
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
        url: process.env.VUE_APP_BASE_API + "/cmms/device/importImage",
      },
      // 默认激活的折叠面板
      activeNames: 0,
      activeTypes: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      selection: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 设备基础表格数据
      deviceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 设备类型
      deviceType: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        productBrand: null,
        projectItem: null,
        productCode: null,
        productType: null,
        productName: null,
        licensePlateCode: null,
        chassisCode: null,
        productLine: null,
        afterSaleArea: null,
        afterSaleDirector: null,
        deliveryDirector: null,
        deliveryLocation: null,
        exfactoryDate: null,
        deliveryDate: null,
        expirationDate: null,
        marketerArea: null,
        deviceArea: null,
        maketDirector: null,
        rdDirector: null,
        tester: null,
        chassisBrand: null,
        chassisPic: null,
        equipPic: null,
        equipPicTwice: null,
        jerehDevice: null,
        deviceState: null,
        exportList: [],
        agency: 0,
      },
      // 表单参数
      form: {
        componentList: [{ componentName: "" }],
      },
      // 表单校验
      rules: {
        productBrand: [
          { required: true, message: "产品品牌不能为空", trigger: "change" },
        ],
        projectItem: [
          {
            validator: (rule, value, callback) => {
              if (this.form.jerehDevice == 1) {
                if (!value) {
                  return callback(new Error("项目编码分项不能为空"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        productCode: [
          {
            validator: (rule, value, callback) => {
              if (this.form.jerehDevice == 1) {
                if (!value) {
                  return callback(new Error("产品编号不能为空"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        productType: [
          {
            validator: (rule, value, callback) => {
              if (this.form.jerehDevice == 1) {
                if (!value) {
                  return callback(new Error("产品型号不能为空"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        productName: [
          { required: true, message: "产品名称不能为空", trigger: "blur" },
        ],
        licensePlateCode: [
          {
            validator: (rule, value, callback) => {
              if (this.form.jerehDevice == 0) {
                if (!value) {
                  return callback(new Error("车牌号不能为空"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        afterSaleArea: [
          { required: true, message: "售后区域不能为空", trigger: "change" },
        ],
        afterSaleDirector: [
          { required: true, message: "售后区域经理不能为空", trigger: "blur" },
        ],
        chassisPic: [
          { required: true, message: "底盘车照片不能为空", trigger: "blur" },
        ],
        equipPic: [
          { required: true, message: "设备照片", trigger: "blur" },
        ],
        equipPicTwice: [
          { required: true, message: "设备照片2不能为空", trigger: "blur" },
        ],
        jerehDevice: [
          {
            required: true,
            message: "是否是杰瑞设备不能为空",
            trigger: "change",
          },
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" },
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" },
        ],
        delflag: [
          {
            required: true,
            message: "是否删除 1 删除 0 未删除不能为空",
            trigger: "change",
          },
        ],
        createBy: [
          { required: true, message: "创建人不能为空", trigger: "blur" },
        ],
        updateBy: [
          { required: true, message: "更新人不能为空", trigger: "blur" },
        ],
      },
      headerCellStyle: {},
      // 关联用户
      showAssociatedUserDialog: false,
      showAssociatedGroupDialog: false,
      bindUserIdList: [],
      bindGroupIdList: [],
      bindUserOptions: [],
      bindGroupOptions: [],
    };
  },
  created() {
    if (this.$route.query.agency) {
      this.agency = this.$route.query.agency;
      this.queryParams.agency = this.$route.query.agency;
    }
    // 判断设备类型：0-所有，1-杰瑞，2-非杰瑞，3-再制造
    this.deviceType = this.$route.query.deviceType
      ? parseInt(this.$route.query.deviceType)
      : 0;
    if (this.deviceType === 1) {
      this.queryParams.jerehDevice = 1;
    } else if (this.deviceType === 2) {
      this.queryParams.jerehDevice = 0;
    } else if (this.deviceType === 3) {
      this.queryParams.jerehDevice = 3;
    }
    const path = ["/cmms/device/agency"];
    this.headerCellStyle = path.includes(this.$route.path)
      ? {}
      : { background: "#eef1f8" };
    this.getList();
    this.getUserGroupList();
  },
  methods: {
    handleAddClick() {
      this.$refs.child.handleAdd();
    },
    auditSubmit(deviceState) {
      auditBatch(this.selection, deviceState, this.auditRemark).then(
        (response) => {
          this.$modal.msgSuccess("批量审核完成");
        }
      );
    },
    // 批量审核
    auditBatch() {
      if (this.selection.length == 0) {
        this.$modal.msgError("请选择要审核的设备信息");
        return;
      }
      for (const item of this.selection) {
        if (item.deviceState != 3) {
          this.$modal.msgError("请选择审核中状态的设备");
          return;
        }
      }
      this.auditVisible = true;
    },
    handleCommand(command) {
      if (command == "批量审核") {
        this.$router.push({
          path: "/cmms/device/agency",
          query: { agency: 1 },
        });
      }
      if (command == "生成二维码") {
        this.$download.zipPost(
          "/cmms/device/downloadQrCodes",
          this.ids,
          `设备二维码_${new Date().getTime()}`
        );
      }
      if (command == "批量创建服务单") {
      }
      if (command == "关联用户") {
        if (!this.ids.length) {
          this.$message.error("请先选择设备后再关联用户");
          return;
        }
        this.showAssociatedUserDialog = true;
      }
      if (command == "关联用户组") {
        if (!this.ids.length) {
          this.$message.error("请先选择设备后再关联用户组");
          return;
        }
        this.showAssociatedGroupDialog = true;
      }
    },
    /** 查询设备基础列表 */
    getList() {
      this.loading = true;
      listDevice(this.queryParams).then((response) => {
        this.total = response.total;
        this.deviceList = response.rows;
        if (this.deviceList.length) {
          this.deviceList.forEach(item => {
            const mainPerson = this.getMainPerson(item)
            if (mainPerson) {
              item.contactPerson = mainPerson.customerName
              item.contactPhone = mainPerson.customerPhone
            }
          })
        }
        this.loading = false;
      });
    },
    getMainPerson(row) {
      if (row.customerBasicList && row.customerBasicList.length) {
        const index = row.customerBasicList.findIndex(item => item.customerIsMain === "Y")
        return index !== -1 ? row.customerBasicList[index] : row.customerBasicList[0]
      }
      return null
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        componentList: [{ componentName: "" }],
        id: null,
        productBrand: null,
        projectItem: null,
        productCode: null,
        productType: null,
        productName: null,
        licensePlateCode: null,
        chassisCode: null,
        productLine: null,
        afterSaleArea: null,
        afterSaleDirector: null,
        deliveryDirector: null,
        deliveryLocation: null,
        exfactoryDate: null,
        deliveryDate: null,
        expirationDate: null,
        marketerArea: null,
        deviceArea: null,
        maketDirector: null,
        rdDirector: null,
        tester: null,
        chassisBrand: null,
        chassisPic: null,
        equipPic: null,
        equipPicTwice: null,
        jerehDevice: null,
        createTime: null,
        updateTime: null,
        delflag: null,
        createBy: null,
        updateBy: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selection = selection;
      this.ids = selection.map((item) => item.id);
      this.queryParams.exportList = this.ids;
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 删除部件按钮操作 */
    handleDeleteComponent(index) {
      this.form.componentList.splice(index, 1);
    },
    /** 新增部件按钮操作 */
    handleAddComponent() {
      this.$set(this.form.componentList, this.form.componentList.length, {
        componentName: "",
      });
      this.activeNames = this.form.componentList.length - 1;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      if (
        row.deviceState === 2 ||
        row.deviceState === 3 ||
        row.deviceState === 4
      ) {
        this.form = row;
        if (!this.form.componentList) {
          this.form.componentList = [{ componentName: "" }];
        }
        this.open = true;
        this.title = "设备基础";
      } else {
        const id = row.id || this.ids;
        getDevice(id, row.deviceState).then((response) => {
          this.form = response.data;
          if (!this.form.componentList) {
            this.form.componentList = [{ componentName: "" }];
          }
          this.open = true;
          this.title = "设备基础";
        });
      }
    },
    changeDeviceType(value) {
      if (value == "杰瑞") {
        this.form.jerehDevice = 1;
      } else {
        this.form.jerehDevice = 0;
      }
    },
    // 暂存按钮
    memoryForm() {
      if (this.form.productBrand == "杰瑞") {
        this.form.jerehDevice = 1;
      } else {
        this.form.jerehDevice = 0;
      }
      memoryDevice(this.form).then((response) => {
        this.$modal.msgSuccess("暂存成功");
        this.open = false;
        this.getList();
        this.$router.push({
          path: "/cmms/device/agency",
          query: { agency: 1 },
        });
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.productBrand == "杰瑞") {
            this.form.jerehDevice = 1;
          } else {
            this.form.jerehDevice = 0;
          }
          submitDevice(this.form).then((response) => {
            this.$modal.msgSuccess("提交成功");
            this.open = false;
            this.getList();
            this.$router.push({
              path: "/cmms/device/agency",
              query: { agency: 1 },
            });
          });
        } else {
          this.$modal.msgError("请填写必填项");
        }
      });
    },
    /** 详情按钮操作 */
    handleDetail(row) {
      this.$router.push({
        path: "/cmms/device/detail",
        query: {
          id: row.id,
          deviceState: row.deviceState,
          updateBy: row.updateBy,
          deviceType: this.deviceType,
        },
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "cmms/device/export",
        {
          ...this.queryParams,
        },
        `设备数据.xlsx`
      );
    },
    /** 导入按钮操作 */
    handleImportDevice() {
      this.upload.title = "设备导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    handleDownloadTemplate() {
      this.download(
        "cmms/device/downloadTemplate",
        {},
        `设备数据导入模板_${new Date().getTime()}.xlsx`
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

    // 批量导入图片
    handleImportPic() {
      this.imageUpload.title = "图片导入";
      this.imageUpload.open = true;
    },
    // 文件上传中处理
    handleImageUploadProgress(event, file, fileList) {
      this.imageUpload.isUploading = true;
    },
    // 文件上传成功处理
    handleImageSuccess(response, file, fileList) {
      this.imageUpload.open = false;
      this.imageUpload.isUploading = false;
      this.$refs.imageUpload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    submitImageForm() {
      this.$refs.imageUpload.submit();
    },
    // 返回上一页
    handleReturn() {
      this.$router.back();
    },
    // 提交关联用户组
    submitAssociatedGroup() {
      submitBatchAssociatedGroup({
        bindDeviceIdList: this.ids,
        bindIdList: this.bindGroupIdList,
      }).then((res) => {
        this.showAssociatedGroupDialog = false;
        this.$modal.msgSuccess("关联用户组成功");
        this.handleQuery();
      });
    },
    // 提交关联用户
    submitAssociatedUser() {
      submitBatchAssociatedUser({
        bindDeviceIdList: this.ids,
        bindIdList: this.bindUserIdList,
      }).then((res) => {
        this.showAssociatedUserDialog = false;
        this.$modal.msgSuccess("关联用户成功");
        this.handleQuery();
      });
    },
    // 远程搜索用户
    remoteUser(query) {
      if (query !== "") {
        this.loading = true;
        remoteUser({ searchValue: query }).then((res) => {
          this.loading = false;
          this.bindUserOptions = res.data;
        });
      } else {
        this.options = [];
      }
    },
    getUserGroupList() {
      getUserGroupList().then((res) => {
        this.bindGroupOptions = res.data;
      });
    },
    handleUserChange(val) {
      if (Array.isArray(val)) {
        val.forEach((item) => {
          console.log(typeof item);
        });
      }
    },
  },
};
</script>
<style scoped>
::v-deep .el-header * {
  font-size: 14px;
}
</style>
