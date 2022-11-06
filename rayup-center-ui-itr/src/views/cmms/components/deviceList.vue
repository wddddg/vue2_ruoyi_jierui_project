<template>
  <div>
    <el-table
      id="dataTable"
      border
      :data="deviceList"
      :fit="true"
      v-if="isHiddenTable"
      @selection-change="handleSelectionChange"
      :header-cell-style="headerCellStyle"
      :max-height="deviceList.length ? tableHeight : 'auto'"
      :row-style="isSelected"
      :cell-style="{ 'padding-top': '5px', 'padding-bottom': '5px' }"
    >
      <el-table-column
        type="selection"
        width="40"
        align="center"
      />
      <el-table-column
        label="序号"
        type="index"
        :width="getTableColumnWidth(5)"
        align="center"
        v-if="!isHiddenNumb"
        :fixed="$WEB"
      />
      <el-table-column
        label="产品品牌"
        align="center"
        show-overflow-tooltip
        prop="productBrand"
        :width="getTableColumnWidth(8)"
        :fixed="$WEB"
        v-if="deviceType === 0 || deviceType === 2"
      >
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.product_brand_all"
            :value="scope.row.productBrand"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称"
        align="center"
        show-overflow-tooltip
        prop="productName"
        :width="getTableColumnWidth(18)"
        :fixed="$WEB"
      />
      <el-table-column
        label="车牌号"
        align="center"
        show-overflow-tooltip
        prop="licensePlateCode"
        width="150"
        v-if="deviceType === 2"
        :fixed="$WEB"
      />
      <el-table-column
        label="项目编码分项"
        align="center"
        show-overflow-tooltip
        prop="projectItem"
        :width="getTableColumnWidth(14.5)"
        v-if="deviceType === 0 || deviceType === 1 || deviceType === 3"
        :fixed="$WEB"
      />
      <!-- <el-table-column
        label="项目编码"
        align="center"
        show-overflow-tooltip
        prop="projectCode"
        width="120"
        v-if="deviceType === 3"
        :fixed="$WEB"
      /> -->
      <el-table-column
        label="产品编号"
        align="center"
        show-overflow-tooltip
        prop="productCode"
        :width="getTableColumnWidth(9)"
        v-if="deviceType !== 2"
        :fixed="$WEB"
      />
      <el-table-column
        label="售后区域"
        align="center"
        show-overflow-tooltip
        prop="afterSaleArea"
        :width="getTableColumnWidth(8)"
        :fixed="$WEB"
      >
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.after_sale_area"
            :value="scope.row.afterSaleArea"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="市场区域"
        align="center"
        :width="getTableColumnWidth(20)"
        show-overflow-tooltip
        prop="deviceArea"
        :fixed="$WEB"
      >
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.device_area"
            :value="scope.row.deviceArea"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="设备状态"
        align="center"
        prop="deviceDeliveryState"
        width="150"
        show-overflow-tooltip
        v-if="deviceType === 1 || deviceType === 3"
        :fixed="$WEB"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.deviceDeliveryState"
            :style="{ background: getDeviceDeliveryState(scope.row.deviceDeliveryState), color: 'white', 'border-radius': '8px', padding: '5px'}"
          >{{ scope.row.deviceDeliveryState }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="产品线"
        align="center"
        prop="productLine"
        width="150"
        show-overflow-tooltip
        v-if="deviceType === 2"
        :fixed="$WEB"
      />
      <el-table-column
        label="客户名称"
        align="center"
        prop="customerName"
        show-overflow-tooltip
        :width="getTableColumnWidth(20)"
      />
      <el-table-column
        label="产品型号"
        align="center"
        prop="productType"
        show-overflow-tooltip
        v-if="deviceType === 2"
        width="150"
      />
      <el-table-column
        label="底盘VIN码"
        align="center"
        prop="chassisCode"
        show-overflow-tooltip
        v-if="deviceType === 2"
        width="150"
      />
      <!-- <el-table-column label="底盘车品牌" align="center" prop="chassisBrand" v-if="!isJereh" width="150">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.chassis_brand" :value="scope.row.chassisBrand"/>
        </template>
      </el-table-column> -->
      <el-table-column
        label="出厂日期"
        align="center"
        prop="exfactoryDate"
        show-overflow-tooltip
        :width="getTableColumnWidth(10)"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.exfactoryDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="验收日期"
        align="center"
        prop="deliveryDate"
        show-overflow-tooltip
        v-if="deviceType !== 2"
        :width="getTableColumnWidth(10)"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deliveryDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="质保终止日期"
        align="center"
        prop="expirationDate"
        show-overflow-tooltip
        v-if="deviceType !== 2"
        :width="getTableColumnWidth(12)"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.expirationDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="车牌号"
        align="center"
        show-overflow-tooltip
        prop="licensePlateCode"
        width="150"
        v-if="deviceType !== 2"
      />
      <el-table-column
        label="交付负责人"
        align="center"
        prop="deliveryDirector"
        show-overflow-tooltip
        width="120"
        v-if="deviceType !== 2"
      ></el-table-column>
      <el-table-column
        label="服务管家"
        align="center"
        prop="serviceButler"
        show-overflow-tooltip
        width="120"
        v-if="deviceType !== 2"
      ></el-table-column>
      <el-table-column
        label="市场负责人"
        align="center"
        prop="maketDirector"
        show-overflow-tooltip
        width="150"
      />
      <el-table-column
        label="售后区域经理"
        align="center"
        prop="afterSaleDirector"
        show-overflow-tooltip
        v-if="deviceType === 2"
        width="150"
      />
      <el-table-column
        label="客户类别"
        align="center"
        prop="customerMark"
        show-overflow-tooltip
        v-if="deviceType === 2"
        width="150"
      >
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.customer_mark"
            :value="scope.row.customerMark"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="联系人"
        align="center"
        prop="contactPerson"
        show-overflow-tooltip
        v-if="deviceType === 2"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.contactPerson }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="联系方式"
        align="center"
        prop="contactPhone"
        show-overflow-tooltip
        v-if="deviceType === 2"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="数据来源"
        align="center"
        prop="dataSources"
        show-overflow-tooltip
        width="150"
      />
      <el-table-column
        label="审核状态"
        align="center"
        prop="deviceState"
        show-overflow-tooltip
        v-if="deviceType !== 2"
        width="150"
      >
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.device_state"
            :value="scope.row.deviceState"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        show-overflow-tooltip
        v-if="deviceType !== 2"
        :width="getTableColumnWidth(19)"
      >
        <template slot-scope="scope">
          <!-- <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span> -->
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
        v-if="deviceType !== 2"
        :width="getTableColumnWidth(19)"
      >
        <template slot-scope="scope">
          <!-- <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span> -->
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建人"
        align="center"
        prop="createBy"
        show-overflow-tooltip
        v-if="queryParams.agency === 1"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="修改人"
        align="center"
        prop="updateBy"
        show-overflow-tooltip
        v-if="queryParams.agency === 1"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150"
        class-name="small-padding fixed-width"
        fixed="right"
        v-if="isHiddenOption"
      >
        <template slot-scope="scope">
          <jereh-button
            v-if="scope.row.deviceState != 3"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click.native.stop="handleUpdate(scope.row)"
            v-hasPermi="['cmms:device:edit']"
          >
            {{ scope.row.deviceState == 1 ? "修改" : "编辑草稿" }}
          </jereh-button>
          <jereh-button
            size="mini"
            type="text"
            icon="el-icon-tickets"
            @click="handleDetail(scope.row)"
            v-hasPermi="['cmms:device:query']"
          >
            {{ scope.row.deviceState == 3 ? "处理" : "详情" }}
          </jereh-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex align-center justify-end">
      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <!-- 添加或修改设备基础对话框 -->
    <el-dialog
      v-dialogDrag
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="open"
      width="70%"
      append-to-body
      v-if="open"
      @close="resetForm"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="170px"
        v-loading="dialogLoading"
        style="height: 70vh; overflow: auto"
      >
        <el-collapse v-model="activeTypes">
          <el-collapse-item title="1.基础信息" name="1">
            <span class="header">设备信息</span>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="产品品牌"
                  prop="productBrand"
                  v-if="deviceType === 1"
                >
                  <jereh-select
                    v-model="form.productBrand"
                    filterable
                    ph="请选择产品品牌"
                    class="flex-1 flex"
                    @change="changeDeviceType"
                    :dict="dict.type.product_brand"
                  />
                </el-form-item>
                <el-form-item
                  label="产品品牌"
                  prop="productBrand"
                  v-if="deviceType === 0 || deviceType === 3"
                >
                  <jereh-select
                    v-model="form.productBrand"
                    filterable
                    ph="请选择产品品牌"
                    class="flex-1 flex"
                    @change="changeDeviceType"
                    :dict="dict.type.product_brand_all"
                  />
                </el-form-item>
                <el-form-item
                  label="产品品牌"
                  prop="productBrand"
                  v-if="deviceType === 2"
                >
                  <jereh-select
                    v-model="form.productBrand"
                    filterable
                    ph="请选择产品品牌"
                    class="flex-1 flex"
                    @change="changeDeviceType"
                    :dict="dict.type.product_brand_notjereh"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品名称" prop="productName">
                  <jereh-select
                    v-model="form.productName"
                    filterable
                    ph="请选择产品名称"
                    :dict="dict.type.product_name"
                    @change="changeProductName"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品型号" prop="productType">
                  <jereh-input v-model="form.productType" ph="请输入产品型号"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="底盘VIN码" prop="chassisCode">
                  <jereh-input
                    v-model="form.chassisCode"
                    ph="请输入底盘VIN码"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车牌号" prop="licensePlateCode">
                  <jereh-input
                    v-model="form.licensePlateCode"
                    ph="请输入车牌号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出厂日期" prop="exfactoryDate">
                  <jereh-date-picker
                    clearable
                    v-model="form.exfactoryDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    ph="请选择出厂日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户资产编号" prop="cusMonCode">
                  <jereh-input
                    v-model="form.cusMonCode"
                    ph="请输入客户资产编号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备状态">
                  <jereh-select
                    v-model="form.deviceDeliveryState"
                    ph="请选择设备状态"
                    filterable
                    :dict="dict.type.sys_device_status"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备全生命周期" prop="equLifeCycle">
                  <jereh-select
                    v-model="form.equLifeCycle"
                    ph="请选择设备全生命周期"
                    filterable
                    :dict="dict.type.sys_device_lifecycle"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="设备照片">
              <image-upload v-model="form.equipPic"/>
            </el-form-item>
            <span class="header">项目信息</span>
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目编码" prop="projectCode">
                  <jereh-input v-model="form.projectCode" ph="请输入项目编码"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目编码分项" prop="projectItem">
                  <jereh-input
                    v-model="form.projectItem"
                    ph="请输入项目编码分项"
                    @change="handleProjectItemChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品编号" prop="productCode">
                  <jereh-input v-model="form.productCode" ph="请输入产品编号"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="产品线" prop="productLine">
                  <jereh-select
                    v-model="form.productLine"
                    filterable
                    ph="请选择产品线"
                    :dict="dict.type.product_line"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机械负责人" prop="rdDirector">
                  <jereh-person-select
                    v-model="form.rdDirector"
                    filterable
                    remote
                    reserve-keyword
                    ph="请输入机械负责人"
                    :remote-method="remoteUser"
                    :loading="loading"
                    :multiple="false"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电气负责人" prop="elePerson">
                  <jereh-person-select
                    v-model="form.elePerson"
                    filterable
                    remote
                    reserve-keyword
                    ph="请输入电气负责人"
                    :remote-method="remoteUser"
                    :loading="loading"
                    :multiple="false"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="液压负责人" prop="waterPerson">
                  <jereh-person-select
                    v-model="form.waterPerson"
                    filterable
                    remote
                    reserve-keyword
                    ph="请输入液压负责人"
                    :remote-method="remoteUser"
                    :loading="loading"
                    :multiple="false"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="测试负责人" prop="tester">
                  <jereh-person-select
                    v-model="form.tester"
                    filterable
                    remote
                    reserve-keyword
                    ph="请输入测试负责人"
                    :remote-method="remoteUser"
                    :loading="loading"
                    :multiple="false"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目类型">
                  <jereh-select
                    v-model="form.projectType"
                    filterable
                    ph="请选择项目类型"
                    :dict="dict.type.sys_project_level"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目评审申请流程单号">
                  <jereh-input
                    v-model="form.projectReviewCode"
                    ph="请输入项目评审申请流程单号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="技术协议解读流程单号">
                  <jereh-input
                    v-model="form.tecReq"
                    ph="技术协议解读流程单号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="(装备)报验完工流程单号"
                >
                  <jereh-input
                    v-model="form.completeInspectionCode"
                    ph="请输入(装备)报验完工流程单号"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="(装备)设备出厂流程单号"
                >
                  <jereh-input
                    v-model="form.deviceOutCode"
                    ph="请输入(装备)设备出厂流程单号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交付服务流程单号">
                  <jereh-input
                    v-model="form.deliveryProcessCode"
                    ph="请输入交付服务流程单号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目计划变更流程单号">
                  <jereh-input
                    v-model="form.planReq"
                    ph="请输入项目计划变更流程单号"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="产品总图号">
                  <jereh-input v-model="form.proTonum" ph="请输入产品总图号"/>
                </el-form-item>
              </el-col>
            </el-row>
            <span class="header">铭牌信息</span>
            <el-row v-if="showNameplateInfo">
              <el-col
                :span="8"
                v-for="item in form.nameplateList"
                :key="item.nameplateId"
              >
                <el-form-item :label="item.nameplateName">
                  <jereh-input v-model="item.nameplateValue"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="2.部件信息" name="2">
            <!--        部件信息-->
            <jereh-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAddComponent"
              v-hasPermi="['cmms:component:edit']"
            >新增部件
            </jereh-button
            >
            <el-collapse v-model="activeNames" class="my-3">
              <el-collapse-item
                v-for="(item, index) in form.componentList"
                :key="index"
                :name="index"
              >
                <template slot="title">
                  <div class="flex flex-1 align-center justify-between px-3">
                    <div>
                      {{ item.componentName ? item.componentName : "新部件" }}
                    </div>
                    <jereh-button
                      type="danger"
                      plain
                      size="mini"
                      @click="handleDeleteComponent(index)"
                      v-hasPermi="['cmms:component:edit']"
                    >删除
                    </jereh-button
                    >
                  </div>
                </template>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="部件名称"
                      :prop="'componentList.' + index + '.componentName'"
                      :rules="[
                        {
                          required: true,
                          message: '部件名称不能为空',
                          trigger: 'change',
                        },
                      ]"
                    >
                      <jereh-select
                        v-model="item.componentName"
                        filterable
                        ph="请选择部件名称"
                        :dict="dict.type.component_name"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="部件品牌"
                      :prop="
                        'componentList.' + index + '.componentManufacturer'
                      "
                      :rules="[
                        {
                          required: true,
                          message: '部件品牌不能为空',
                          trigger: 'change',
                        },
                      ]"
                    >
                      <jereh-select
                        v-if="item.componentName == '台上发动机'"
                        v-model="item.componentManufacturer"
                        filterable
                        ph="请选择部件品牌"
                        :dict="dict.type.stage_engine_brand"
                      />
                      <jereh-select
                        v-else-if="item.componentName == '台上变速箱'"
                        v-model="item.componentManufacturer"
                        filterable
                        ph="请选择部件品牌"
                        :dict="dict.type.stage_gearbox_brand"
                      />
                      <jereh-select
                        v-else-if="item.componentName == '柱塞泵'"
                        v-model="item.componentManufacturer"
                        filterable
                        ph="请选择部件品牌"
                        :dict="dict.type.piston_pump_manufacturer"
                      />
                      <jereh-select
                        v-else-if="item.componentName == '注入头'"
                        v-model="item.componentManufacturer"
                        filterable
                        ph="请选择部件品牌"
                        :dict="dict.type.injection_head_brand"
                      />
                      <jereh-input
                        v-else
                        v-model="item.componentManufacturer"
                        ph="请输入部件品牌"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="部件型号"
                      :prop="'componentList.' + index + '.componentType'"
                    >
                      <jereh-input
                        v-model="item.componentType"
                        ph="请输入部件型号"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="部件序列号"
                      :prop="'componentList.' + index + '.componentSerial'"
                    >
                      <jereh-input
                        v-model="item.componentSerial"
                        ph="请输入部件序列号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="部件生产日期"
                      :prop="'componentList.' + index + '.partsProductDate'"
                    >
                      <jereh-date-picker
                        clearable
                        v-model="item.partsProductDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        ph="请选择部件生产日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="备注"
                      :prop="'componentList.' + index + '.remark'"
                    >
                      <jereh-input
                        v-model="item.remark"
                        ph="请输入部件备注"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="部件照片" prop="componentPic">
                      <image-upload v-model="item.componentPic"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
          <el-collapse-item title="3.售后信息" name="3">
            <el-row>
              <el-col :span="8">
                <el-form-item label="售后区域" prop="afterSaleArea">
                  <jereh-select
                    v-model="form.afterSaleArea"
                    filterable
                    ph="请选择售后区域"
                    :dict="dict.type.after_sale_area"
                    @change="handleAreaChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="售后区域经理" prop="afterSaleDirector">
                  <jereh-person-select
                    v-model="form.afterSaleDirector"
                    filterable
                    remote
                    reserve-keyword
                    ph="请输入售后区域经理"
                    :remote-method="remoteUser"
                    :loading="loading"
                    :multiple="false"
                    @change="handleDirectorChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交付负责人" prop="deliveryDirector">
                  <jereh-person-select
                    v-model="form.deliveryDirector"
                    filterable
                    remote
                    reserve-keyword
                    ph="请输入交付负责任人"
                    :remote-method="remoteUser"
                    :loading="loading"
                    :multiple="false"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="协助交付人" prop="helpPerson">
                  <jereh-person-select
                    v-model="form.helpPerson"
                    filterable
                    remote
                    reserve-keyword
                    ph="请输入协助交付人"
                    :remote-method="remoteUser"
                    :loading="loading"
                    :multiple="false"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务管家">
                  <jereh-person-select
                    v-model="form.serviceButler"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请选择服务管家"
                    :remote-method="remoteUser"
                    :multiple="false"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交付地点" prop="deliveryLocation">
                  <jereh-input
                    v-model="form.deliveryLocation"
                    ph="请输入交付地点"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="验收日期" prop="deliveryDate">
                  <jereh-date-picker
                    clearable
                    v-model="form.deliveryDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    ph="请选择验收日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="质保终止日期" prop="expirationDate">
                  <jereh-date-picker
                    clearable
                    v-model="form.expirationDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    ph="请选择质保终止日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="质保条款">
                  <jereh-input v-model="form.qualityItem" ph="请输入质保条款"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="4.客户信息" name="4">
            <span class="header">客户基础信息</span>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户名称" prop="customerName">
                  <jereh-input
                    v-model="form.customerName"
                    ph="请输入客户名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户类型" prop="customerMark">
                  <jereh-select
                    v-model="form.customerType"
                    filterable
                    ph="请选择客户类型"
                    :dict="dict.type.sys_customer_type"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户代码" prop="customerCode">
                  <jereh-input
                    v-model="form.customerCode"
                    ph="请输入客户代码"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户下属单位名称" prop="customerUntilName">
                  <jereh-input
                    v-model="form.customerUntilName"
                    ph="请输入客户下属单位名称"
                  />
                </el-form-item>
              </el-col>

            </el-row>
            <span class="header">客户联系人</span>
            <jereh-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAddContact"
            >新增联系人
            </jereh-button
            >
            <el-collapse v-model="activeContact" class="my-3">
              <el-collapse-item
                v-for="(item, index) in form.customerBasicList"
                :key="index"
                :name="index"
              >
                <template slot="title">
                  <div class="flex flex-1 align-center justify-between px-3">
                    <div>
                      {{ item.customerName ? item.customerName : "新联系人" }}
                    </div>
                    <jereh-button
                      type="danger"
                      plain
                      size="mini"
                      @click="handleDeleteContacts(index)"
                    >删除
                    </jereh-button
                    >
                  </div>
                </template>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名" prop="customerName">
                      <jereh-input
                        v-model="item.customerName"
                        ph="请输入联系人姓名"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系方式" prop="customerPhone">
                      <jereh-input
                        v-model="item.customerPhone"
                        ph="请输入联系人联系方式"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="职务" prop="customerPosition">
                      <jereh-select
                        v-model="item.customerPosition"
                        filterable
                        :dict="dict.type.customer_position"
                        ph="请输入联系人职务"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="性别" prop="customerSex">
                      <!-- <jereh-input v-model="item.sex" ph="请输入联系人性别"/> -->
                      <jereh-select
                        v-model="item.customerSex"
                        filterable
                        ph="请选择联系人性别"
                        :dict="dict.type.sys_user_sex"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期" prop="customerBirthTime">
                      <!-- <jereh-input v-model="item.birthday" ph="请输入联系人出生日期"/> -->
                      <jereh-date-picker
                        clearable
                        v-model="item.customerBirthTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        ph="请选择联系人出生日期"
                        @change="handleBirthTimeChange($event, index)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="年龄" prop="customerAge">
                      <jereh-input
                        v-model="item.customerAge"
                        type="number"
                        ph="请输入联系人年龄"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="爱好" prop="customerBoddy">
                      <jereh-input
                        v-model="item.customerBoddy"
                        ph="请输入联系人爱好"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否主要联系人" prop="customerIsMain">
                      <!-- <jereh-input v-model="item.mainly" ph="请输入联系人是否是主要联系人"/> -->
                      <jereh-select
                        v-model="item.customerIsMain"
                        filterable
                        ph="请选择是否是主要联系人"
                        :dict="dict.type.sys_yes_no"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
          <el-collapse-item title="5.市场信息" name="5">
            <el-row>
              <el-col :span="8">
                <el-form-item label="市场所属区域" prop="marketerArea">
                  <jereh-select
                    v-model="form.marketerArea"
                    filterable
                    ph="请选择市场所属区域"
                    :dict="dict.type.marketer_area"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市场区域" prop="deviceArea">
                  <jereh-select
                    v-model="form.deviceArea"
                    filterable
                    ph="请选择市场区域"
                    :dict="dict.type.device_area"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市场负责人" prop="maketDirector">
                  <jereh-person-select
                    v-model="form.maketDirector"
                    filterable
                    remote
                    reserve-keyword
                    ph="请输入市场负责人"
                    :remote-method="remoteUser"
                    :loading="loading"
                    :multiple="false"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="市场经理" prop="markerMag">
                  <jereh-person-select
                    v-model="form.markerMag"
                    filterable
                    remote
                    reserve-keyword
                    ph="请输入市场经理"
                    :remote-method="remoteUser"
                    :loading="loading"
                    :multiple="false"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <jereh-button
          type="warning"
          @click="memoryForm"
          v-loading="dialogLoading"
        >暂 存
        </jereh-button>
        <jereh-button
          type="primary"
          @click="submitForm"
          v-loading="dialogLoading"
        >提 交
        </jereh-button>
        <jereh-button type="warning" @click="resetForm">关 闭</jereh-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDevice,
  memoryDevice,
  remoteUser,
  submitDevice,
  productMappings,
} from "../../../api/cmms/device";
import {getTableColumnWidth} from "@/utils/index.js"

export default {
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
    "product_brand_all",
    "sys_device_status",
    "sys_customer_type",
    "sys_customer_bg",
    "sys_project_level",
    "sys_device_lifecycle",
    "nameplate_info",
    "sys_user_sex",
    "sys_yes_no",
    "customer_position",
  ],
  props: {
    headerCellStyle: {
      type: Object,
      default: () => {
      },
    },
    deviceList: {
      required: true,
      type: Array,
      default: () => {
        return [];
      },
    },
    isHiddenOption: {
      type: Boolean,
      default: true,
    },
    isHiddenNumb: {
      type: Boolean,
      default: true,
    },
    deviceType: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    queryParams: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
        };
      },
    },
    isHiddenTable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      userList: [],
      researchUserOptions: [],
      testUserOptions: [],
      bazaarUserOptions: [],
      deliveryUserOptions: [],
      activeNames: [],
      activeTypes: [],
      title: "",
      open: false,
      form: {
        componentList: [],
        customerBasicList: [],
      },
      rules: {
        productBrand: [
          {required: true, message: "产品品牌不能为空", trigger: "change"},
        ],
        projectItem: [
          {
            validator: (rule, value, callback) => {
              if (this.form.jerehDevice == 1) {
                if (!value) {
                  return callback(new Error("项目编码不能为空"));
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
          {required: true, message: "产品名称不能为空", trigger: "blur"},
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
          {required: true, message: "售后区域不能为空", trigger: "change"},
        ],
        afterSaleDirector: [
          {required: true, message: "售后区域经理不能为空", trigger: "blur"},
        ],
        chassisPic: [
          {required: true, message: "底盘车照片不能为空", trigger: "blur"},
        ],
        equipPic: [
          {required: true, message: "设备照片", trigger: "blur"},
        ],
        equipPicTwice: [
          {required: true, message: "设备照片2不能为空", trigger: "blur"},
        ],
        jerehDevice: [
          {
            required: true,
            message: "是否是杰瑞设备不能为空",
            trigger: "change",
          },
        ],
        createTime: [
          {required: true, message: "创建时间不能为空", trigger: "blur"},
        ],
        updateTime: [
          {required: true, message: "更新时间不能为空", trigger: "blur"},
        ],
        delflag: [
          {
            required: true,
            message: "是否删除 1 删除 0 未删除不能为空",
            trigger: "change",
          },
        ],
        createBy: [
          {required: true, message: "创建人不能为空", trigger: "blur"},
        ],
        updateBy: [
          {required: true, message: "更新人不能为空", trigger: "blur"},
        ],
      },
      // 是否展示铭牌信息
      showNameplateInfo: false,
      // 弹窗加载
      dialogLoading: false,
      // 当前活动的联系人页面
      activeContact: [],
      // 被选中行
      selectedArrData: [],
      // 计时器
      timer: null,
      tableHeight: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isHiddenTable) {
        const offsetTop = document.getElementById("dataTable").offsetTop;
        this.tableHeight = window.innerHeight - offsetTop - 170;
      }
    })
  },
  methods: {
    getTableColumnWidth,
    handleSelectionChange(data) {
      this.selectedArrData = data
      this.$emit("handleSelectionChange", data);
    },
    getList() {
      this.$emit(
        "getList",
        this.queryParams.deviceState,
        this.queryParams.pageNum,
        this.queryParams.pageSize
      );
    },
    changeDeviceType(value) {
      if (value == "杰瑞") {
        this.form.jerehDevice = (this.form.projectItem.startWith('81WX') || this.form.projectItem.startWith('17WX')) ? 3 : 1;
      } else {
        this.form.jerehDevice = 0;
      }
    },
    handleProjectItemChange(value) {
      if (this.form.deviceType == "杰瑞") {
        this.form.jerehDevice = (value.startWith('81WX') || value.startWith('17WX')) ? 3 : 1;
      }
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
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "新增设备";
      this.handleAutoSave();
    },
    // 远程搜索用户
    remoteUser(query) {
      if (query !== "") {
        this.loading = true;
        remoteUser({searchValue: query}).then((res) => {
          this.loading = false;
          this.researchUserOptions = res.data;
          this.testUserOptions = res.data;
          this.bazaarUserOptions = res.data;
          this.deliveryUserOptions = res.data;
          this.userList = res.data;
        });
      } else {
        this.options = [];
      }
    },
    // 暂存
    memoryForm(flag) {
      if (this.form.productBrand == "杰瑞") {
        this.form.jerehDevice = 1;
      } else {
        this.form.jerehDevice = 0;
      }
      memoryDevice(this.form).then((response) => {
        if (flag) {
          clearInterval(this.timer);
          this.timer = null;
        } else {
          this.$modal.msgSuccess("暂存成功");
          this.open = false;
          this.getList();
          this.$router.push({
            path: "/cmms/dashboard/draft",
            query: {deviceState: 2},
          });
        }
      });
    },
    // 查看详情
    handleDetail(row) {
      console.log(this.queryParams.pageSize)
      this.$router.push({
        path: "/cmms/device/detail",
        query: {
          id: row.id,
          deviceState: row.deviceState,
          updateBy: row.updateBy,
          pageSize: this.queryParams.pageSize
        },
      });
    },
    // 关闭
    resetForm() {
      this.open = false;
      this.form = {
        componentList: [{componentName: ""}],
        customerBasicList: [],
      };
      this.activeTypes = [];
      this.activeContact = [];
      clearInterval(this.timer);
      this.timer = null;
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
          if (Array.isArray(this.form.customerBasicList)
            && this.form.customerBasicList.length
          ) {
            const customerArr = this.form.customerBasicList.filter(item => {
              return item.customerIsMain === 'Y'
            })
            if (customerArr.length > 1) {
              this.$message.error("客户主要联系人只能有一个，请检查后重试！")
              return
            }
            if (customerArr.length < 1) {
              this.form.customerBasicList[0].customerIsMain = 'Y'
            }
            // const index = this.form.customerBasicList.findIndex(item => {
            //   return item.customerIsMain === 'Y'
            // })
            // this.form.contactPerson = this.form.customerBasicList[index].customerName
            // this.form.contactPhone = this.form.customerBasicList[index].customerPhone
          }
          submitDevice(this.form).then((response) => {
            this.$modal.msgSuccess("提交成功");
            this.open = false;
            clearInterval(this.timer);
            this.timer = null;
            this.getList();
            this.$router.push({
              path: "/cmms/dashboard/todoList",
              query: {deviceState: 3},
            });
          });
        } else {
          this.$modal.msgError("请填写必填项");
        }
      });
    },
    // 编辑
    handleUpdate(row) {
      if (
        row.deviceState === 2 ||
        row.deviceState === 3 ||
        row.deviceState === 4
      ) {
        this.form = row;
        if (!this.form.componentList) {
          this.form.componentList = [{componentName: ""}];
        }
        if (!this.form.customerBasicList) {
          this.form.customerBasicList = [];
        }
        this.open = true;
        this.title = "设备修改";
        this.handleAutoSave()
      } else {
        const id = row.id || this.ids;
        getDevice(id, row.deviceState).then((response) => {
          this.form = JSON.parse(JSON.stringify(response.data));
          this.changeProductName(row.productName);
          this.open = true;
          this.title = "设备修改";
          this.handleAutoSave()
        });
      }
    },
    // 根据产品名称获取铭牌信息和部件信息
    changeProductName(value) {
      const productNameList = this.dict.type.product_name;
      if (Array.isArray(productNameList) && productNameList.length) {
        const dictItem = productNameList.find((item) => item.label === value);
        const dictCode = dictItem ? dictItem.raw.dictCode : null;
        if (dictCode) {
          this.getConfigurationInfo(dictCode);
        }
      }
    },
    getConfigurationInfo(dictCode) {
      this.dialogLoading = true;
      productMappings(dictCode)
        .then((res) => {
          this.dialogLoading = false;
          const nameplateList = res.data.partsList;
          const partsList = res.data.nameplateList;
          this.showNameplateInfo = nameplateList.length ? true : false;
          // 铭牌信息回填
          this.backFillPartsList(nameplateList);
          // 部件信息回填
          this.backFillComponentList(partsList);
        })
        .catch((e) => {
          console.log(e);
          this.dialogLoading = false;
          this.$message.error("获取设备铭牌信息和部件信息失败！");
        });
    },
    // 回填部件信息
    backFillComponentList(partsList) {
      const componentNameList = this.dict.type.component_name;
      if (
        Array.isArray(partsList) &&
        partsList.length &&
        Array.isArray(componentNameList) &&
        componentNameList.length
      ) {
        const componentList = [];
        partsList.forEach((item) => {
          const componentIndex = componentNameList.findIndex((name) => {
            return name.raw.dictCode === item.partsId;
          });
          if (componentIndex !== -1) {
            componentList.push({
              componentName: componentNameList[componentIndex].label,
            });
          }
        });
        if (
          Array.isArray(this.form.componentList) &&
          this.form.componentList.length
        ) {
          this.form.componentList.forEach((item) => {
            if (componentList.length) {
              const index = componentList.findIndex((component) => {
                return component.componentName === item.componentName;
              });
              if (index !== -1) {
                componentList[index] = item;
              } else {
                componentList.push(item);
              }
            } else {
              componentList.push(item);
            }
          });
        }
        this.form.componentList = componentList;
      }
    },
    // 回填铭牌信息
    backFillPartsList(nameplateList) {
      const nameList = this.dict.type.nameplate_info;
      if (
        Array.isArray(nameplateList) &&
        nameplateList.length &&
        Array.isArray(nameList) &&
        nameList.length
      ) {
        const nameplateArr = [];
        nameplateList.forEach((item) => {
          const nameplateIndex = nameList.findIndex((name) => {
            return name.raw.dictCode === item.nameplateId;
          });
          if (nameplateIndex !== -1) {
            nameplateArr.push({
              nameplateName: nameList[nameplateIndex].label,
              nameplateId: item.nameplateId,
              nameplateValue: "",
            });
          }
        });
        if (
          Array.isArray(this.form.nameplateList) &&
          this.form.nameplateList.length &&
          nameplateArr.length
        ) {
          this.form.nameplateList.forEach((item) => {
            const index = nameplateArr.findIndex((name) => {
              return name.nameplateId === item.nameplateId;
            });
            if (index !== -1) {
              nameplateArr[index] = item;
            }
          });
        }
        this.form.nameplateList = nameplateArr;
      }
    },
    // 增加新联系人
    handleAddContact() {
      this.$set(
        this.form.customerBasicList,
        this.form.customerBasicList.length,
        {}
      );
      this.activeContact = this.form.customerBasicList.length - 1;
    },
    // 删除联系人
    handleDeleteContacts(index) {
      this.form.customerBasicList.splice(index, 1);
    },
    // 根据设备状态改变标签类型
    getDeviceDeliveryState(deviceDeliveryState) {
      switch (deviceDeliveryState) {
        case "待交付":
          return "orange";
        case "交付中":
          return "green";
        case "质保期内":
          return "red";
        case "质保期外":
          return "blue";
      }
    },
    // 自动填充年龄
    handleBirthTimeChange(val, index) {
      let age = this.getAge(val);
      this.$set(this.form.customerBasicList[index], "customerAge", age);
    },
    // YYYY-MM-DD
    getAge(val) {
      let age = 0;
      if (val) {
        const birthArr = val.split("-");
        const nowYear = new Date().getFullYear();
        const nowMonth = new Date().getMonth() + 1;
        const nowDay = new Date().getDate();
        if (nowYear == birthArr[0]) {
          age = 0;
        } else {
          const ageDiff = nowYear - birthArr[0];
          if (ageDiff < 0) {
            age = 0;
          } else {
            if (nowMonth == birthArr[1]) {
              const dayDiff = nowDay - birthArr[2];
              if (dayDiff < 0) {
                age = ageDiff - 1;
              } else {
                age = ageDiff;
              }
            } else {
              const monthDiff = nowMonth - birthArr[1];
              if (monthDiff < 0) {
                age = ageDiff - 1;
              } else {
                age = ageDiff;
              }
            }
          }
        }
      }
      return age;
    },
    // 选中行变色
    isSelected({row}) {
      const selectedIds = this.selectedArrData.map(item => item.id)
      if (selectedIds.includes(row.id)) {
        return {
          backgroundColor: "#f7bba1"
        }
      }
    },
    // 每分钟保存一次
    handleAutoSave() {
      this.timer = setInterval(() => {
        this.memoryForm(true)
      }, 60000);
    },
    handleDirectorChange() {
      this.$message.warning("售后区域经理变更，请注意修改售后区域")
    },
    handleAreaChange() {
      this.$message.warning("售后区域变更，请注意修改售后区域经理")
    }
  },
};
</script>

<style scoped>
::v-deep .el-collapse-item__header {
  font-size: 16px;
  height: 50px;
}

.header {
  font-size: 15px;
  font-weight: 700;
  background-color: #fdeee8;
  display: block;
  border-left: 3px solid #EA5514;
  width: 100px;
  margin-bottom: 20px;
  text-align: center;
}

::v-deep .el-dialog__body {
  padding: 0px;
}
</style>
