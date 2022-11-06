<template>
  <el-card class="box-card">
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-row :gutter="10" class="mb8">
          <el-tabs v-model="activeName">
            <el-tab-pane label="物料申请明细" name="first">
              <el-card>
                <!-- <el-button
                  type="primary"
                  size="mini"
                  @click="requestMaterialsListPushList"
                  >添加</el-button
                > -->
                <el-table :data="rowData.workOrderMaterialApplyUpdateParamList">
                  <el-table-column label="序号" align="center" type="index" width="60px" />
                  <el-table-column
                    label="工单编码"
                    align="center"
                    key="workOrderNo"
                    prop="workOrderNo"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.workOrderCode }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="物料编码"
                    align="center"
                    key="materialCode"
                    prop="materialCode"
                    width="200px"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.materialCode"
                        disabled
                        @focus="openMateriel(scope, 'requestMaterialsList')"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="物料说明"
                    align="center"
                    key="materialName1"
                    prop="materialName"
                    width="200px"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.materialName"
                        disabled
                        @focus="openMateriel(scope, 'requestMaterialsList')"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="数量"
                    align="center"
                    key="applyNumber"
                    prop="applyNumber"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.applyNumber"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="交货日期"
                    align="center"
                    key="completeDate"
                    prop="completeDate"
                    width="160px"
                  >
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.completeDate"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="事务处理日期"
                    align="center"
                    key="transactionDate"
                    prop="transactionDate"
                    width="160px"
                  >
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.transactionDate"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发货状态"
                    align="center"
                    key="state"
                    prop="state"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.state"></el-input> -->
                      {{
                        scope.row.state === "materialshen_deliver_complete"
                          ? "发货完成"
                          : scope.row.state === "materialshen_deliver_wait"
                          ? "待发货"
                          : "发货中"
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发货类型"
                    align="center"
                    key="deliveryType"
                    prop="deliveryType"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.deliveryType"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发货日期"
                    align="center"
                    key="deliveryDate"
                    prop="deliveryDate"
                    width="160px"
                  >
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.deliveryDate"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发货单号"
                    align="center"
                    key="deliveryBillCode"
                    prop="deliveryBillCode"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.deliveryBillCode"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="接收人"
                    align="center"
                    key="recipient"
                    prop="recipient"
                    width="160px"
                  >
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.recipient"></el-input> -->
                      <PersonnelBindingSelect
                        v-model="scope.row.recipient"
                        @bindingData="
                          bindingSelectData($event, scope.row, 'recipient')
                        "
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="采购员"
                    align="center"
                    key="purchaser"
                    prop="purchaser"
                    width="160px"
                  >
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.purchaser"></el-input> -->
                      <PersonnelBindingSelect
                        v-model="scope.row.purchaser"
                        @bindingData="
                          bindingSelectData($event, scope.row, 'purchaser')
                        "
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="收货日期"
                    align="center"
                    key="arrivalTime"
                    prop="arrivalTime"
                    width="160px"
                  >
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.arrivalTime"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="剩余数量"
                    align="center"
                    key="remainNumber"
                    prop="remainNumber"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.remainNumber"
                        type="number"
                        @change="materialsResidueNumberChange(scope)"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="备注"
                    align="center"
                    key="materialName2"
                    prop="materialName"
                    width="200px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.remark"></el-input>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    label="编辑"
                    align="center"
                    width="80"
                    class-name="small-padding fixed-width"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row, 'requestMaterialsList')"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column> -->
                </el-table>
              </el-card>
              <el-card>
                <div class="tableTitle">
                  <div class="tt">余料处置信息</div>
                </div>
                <!-- <el-button
                    type="primary"
                    size="mini"
                    @click="remainMaterialsListPushList"
                    >添加</el-button
                  > -->
                <el-table
                  :data="rowData.itrWorkOrderMaterialRemainUpdateParams"
                >
                  <el-table-column label="序号" align="center" type="index" width="60px" />
                  <el-table-column
                    label="工单编码"
                    align="center"
                    key="workOrderNo"
                    prop="workOrderNo"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.workOrderCode }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="物料编码"
                    align="center"
                    key="materialCode"
                    prop="materialCode"
                    width="200px"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.materialCode"
                        disabled
                        @focus="openMateriel(scope, 'remainMaterialsList')"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="物料说明"
                    align="center"
                    key="materialName3"
                    prop="materialName"
                    width="200px"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.materialName"
                        disabled
                        @focus="openMateriel(scope, 'remainMaterialsList')"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="数量"
                    align="center"
                    key="number"
                    prop="number"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.number"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="余料处置措施"
                    align="center"
                    key="cloutDispose"
                    prop="cloutDispose"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.cloutDispose"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="处置人"
                    align="center"
                    key="disposePerson"
                    prop="disposePerson"
                    width="160px"
                  >
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.disposePerson"></el-input> -->
                      <PersonnelBindingSelect
                        v-model="scope.row.disposePerson"
                        @bindingData="
                          bindingSelectData($event, scope.row, 'disposePerson')
                        "
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="处置时间"
                    align="center"
                    key="disposeTime"
                    prop="disposeTime"
                    width="160px"
                  >
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.disposeTime"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="存储地点"
                    align="center"
                    key="saveAddress"
                    prop="saveAddress"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.saveAddress"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="处置状态"
                    align="center"
                    key="disposeStatus"
                    prop="disposeStatus"
                    width="100px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.disposeStatus"></el-input>
                    </template>
                  </el-table-column>

                  <!-- <el-table-column
                    label="编辑"
                    align="center"
                    width="80"
                    class-name="small-padding fixed-width"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row, 'remainMaterialsList')"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column> -->
                </el-table>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="旧件信息" name="second">
              <el-card>
                <jereh-button
                  type="primary"
                  size="mini"
                  plant
                  @click="oldMaterialsListPushList"
                  >添加</jereh-button
                >
                <el-table :data="rowData.itrWorkOrderMaterialUsedUpdateParams">
                  <el-table-column label="序号" align="center" type="index" width="60px" />
                  <el-table-column
                    label="工单编码"
                    align="center"
                    key="workOrderNo"
                    prop="workOrderNo"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.workOrderCode }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="物料编码"
                    align="center"
                    key="materialCode"
                    prop="materialCode"
                    width="200px"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.materialCode"
                        @focus="openMateriel(scope, 'oldMaterialsList')"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="物料说明"
                    align="center"
                    key="materialName4"
                    prop="materialName"
                    width="200px"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.materialName"
                        @focus="openMateriel(scope, 'oldMaterialsList')"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="品牌"
                    align="center"
                    key="brand"
                    prop="brand"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.brand"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="序列号"
                    align="center"
                    key="serialNo"
                    prop="serialNo"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.serialNo"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="数量"
                    align="center"
                    key="number"
                    prop="number"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.number"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="处理措施"
                    align="center"
                    key="dispose"
                    prop="dispose"
                    width="140px"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-model="scope.row.dispose"
                        placeholder="请选择处理结果"
                      >
                        <el-option
                          v-for="item in disposalMethodOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="处理结果"
                    align="center"
                    key="disposeResult"
                    prop="disposeResult"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <jereh-select
                        v-model="scope.row.disposeResult"
                        filterable
                        ph="请选择"
                        :dict="dict.type.itr_process_result"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发货类型"
                    align="center"
                    key="deliveryType"
                    prop="deliveryType"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.deliveryType"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发货日期"
                    align="center"
                    key="deliveryDate"
                    prop="deliveryDate"
                    width="160px"
                  >
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.deliveryDate"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发货单号"
                    align="center"
                    key="deliveryBillNo"
                    prop="deliveryBillNo"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.deliveryBillNo"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="发货人"
                    align="center"
                    key="consigner"
                    prop="consigner"
                    width="200px"
                  >
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.consigner"></el-input> -->
                      <PersonnelBindingSelect
                        v-model="scope.row.consigner"
                        @bindingData="
                          bindingSelectData($event, scope.row, 'consigner')
                        "
                      />
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    label="不合格品处理流程"
                    align="center"
                    key="rejectProductDisposeWay"
                    width="200px"
                    prop="rejectProductDisposeWay"
                    ><template slot-scope="scope">
                      <el-input
                        v-model="scope.row.rejectProductDisposeWay"
                      ></el-input>
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    label="编辑"
                    align="center"
                    width="200px"
                    class-name="small-padding fixed-width"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="updataOldPartsProcessing(scope.row)"
                        >修改</el-button
                      >
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope, 'oldMaterialsList')"
                        >删除</el-button
                      >
                      <el-button
                        v-if="scope.row.id"
                        size="mini"
                        type="text"
                        icon="el-icon-s-promotion"
                        @click="openCHDrawer(scope.row)"
                        >旧件移交</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="保外物料需求" name="third">
              <el-card>
                <jereh-button
                  type="primary"
                  plant
                  @click="expirationMaterialsListPushList"
                  >添加</jereh-button
                >
                <jereh-button type="primary" plant @click="openPushMarket"
                  >推送到市场</jereh-button
                >
                <el-table
                  :data="rowData.workOrderMaterialUnwarrantyUpdateParamList"
                >
                  <el-table-column label="序号" align="center" type="index" width="60px" />
                  <el-table-column
                    label="工单编码"
                    align="center"
                    key="workOrderNo"
                    prop="workOrderNo"
                    width="120px"
                    ><template slot-scope="scope">
                      {{ scope.row.workOrderCode }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="物料编码"
                    align="center"
                    key="materialCode"
                    prop="materialCode"
                    width="200px"
                    ><template slot-scope="scope">
                      <el-input
                        v-model="scope.row.materialCode"
                        @focus="openMateriel(scope, 'expirationMaterialsList')"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="物料说明"
                    align="center"
                    key="materialName5"
                    prop="materialName"
                    width="200px"
                    ><template slot-scope="scope">
                      <el-input
                        v-model="scope.row.materialName"
                        @focus="openMateriel(scope, 'expirationMaterialsList')"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="数量"
                    align="center"
                    key="appyNumber"
                    prop="appyNumber"
                    width="120px"
                    ><template slot-scope="scope">
                      <el-input v-model="scope.row.appyNumber"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="备注"
                    align="center"
                    key="remark"
                    prop="remark"
                    width="300px"
                    ><template slot-scope="scope">
                      <el-input v-model="scope.row.remark"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="问题处理人"
                    align="center"
                    key="resolveUserBy"
                    prop="resolveUserBy"
                    width="200px"
                    ><template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.resolveUserBy"></el-input> -->
                      <PersonnelBindingSelect
                        v-model="scope.row.resolveUserBy"
                        @bindingData="
                          bindingSelectData($event, scope.row, 'resolveUserBy')
                        "
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="销售工程师"
                    align="center"
                    key="saleUser"
                    prop="saleUser"
                    width="200px"
                    ><template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.saleUser"></el-input> -->
                      <PersonnelBindingSelect
                        v-model="scope.row.saleUser"
                        @bindingData="
                          bindingSelectData($event, scope.row, 'saleUser')
                        "
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="编辑"
                    align="center"
                    width="120"
                    class-name="small-padding fixed-width"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope, 'expirationMaterialsList')"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-col>
    </el-row>
    <OldPartsProcessing
      :open="openOldPartsProcessingDialog"
      @closeDialog="colseOldPartsProcessingDialog"
      :rowData="rowOldPartsProcessingData"
    />
    <PushMarket
      :open="openPushMarketDialog"
      @closeDialog="colsePushMarketDialog"
    />
    <MaterialNumberQuery
      :openMQ="openMaterialQueryDialog"
      @closeDialog="closeMaterialQueryDialog"
      @seletData="seletMaterialQueryData"
    />
    <CoreHandoverDrawer
      :rowData="CoreHandoverData"
      :open="openCoreHandoverDrawer"
      @closeDialog="colseCoreHandoverDrawer"
    />
  </el-card>
</template>

<script>
import OldPartsProcessing from "./OldPartsProcessing.vue";
import PushMarket from "./PushMarket.vue";
import MaterialNumberQuery from "./MaterialNumberQuery.vue";
import PersonnelBindingSelect from "@/views/cmms/itr/components/PersonnelBindingSelect/index.vue";
import CoreHandoverDrawer from "./CoreHandoverDrawer.vue";

import {
  queryListByWorkOrderIdList,
  unwarrantyList,
  queryListByWorkOrderIdMaterialUsed,
  materialRemainList,
} from "@/api/cmms/itr/work-order/order.api.js";
export default {
  name: "MaterielInfo",
  dicts: ["itr_process_result"],
  components: {
    OldPartsProcessing,
    PushMarket,
    MaterialNumberQuery,
    CoreHandoverDrawer,
    PersonnelBindingSelect,
  },
  data() {
    return {
      CoreHandoverData: {},
      requestMaterialsList: [],
      remainMaterialsList: [],
      oldMaterialsList: [],
      expirationMaterialsList: [],
      openOldPartsProcessingDialog: false,
      rowOldPartsProcessingData: {},
      activeName: "first",
      openPushMarketDialog: false,
      openMaterialQueryDialog: false,
      currentName: "",
      numberList: 0,
      id: this.$route.query.workOrderId,
      openCoreHandoverDrawer: false,
      actualResultDescritionOptions: [
        {
          value: "0",
          label: "已返司",
        },
        {
          value: "1",
          label: "已完成",
        },
      ],
      disposalMethodOptions: [
        {
          value: "0",
          label: "返司处理",
        },
        {
          value: "1",
          label: "现场报废",
        },
      ],
    };
  },
  methods: {
    rowKey(value) {
      return Math.random() * 1000;
    },
    materialsResidueNumberChange(scope) {
      let isExist = false;
      let rowNum = 0;

      for (let i = 0; i < this.remainMaterialsList.length; i++) {
        if (this.remainMaterialsList[i].applyId === scope.row.id) {
          isExist = true;
          rowNum = i;
          break;
        }
      }
      if (isExist) {
        this.$set(this.remainMaterialsList, rowNum, {
          materialCode: scope.row.materialCode,
          materialName: scope.row.materialName,
          number: scope.row.remainNumber,
          applyId: scope.row.id,
          workOrderCode: scope.row.workOrderCode,
          workOrderId: scope.row.workOrderId,
          id: this.remainMaterialsList[rowNum].id || "",
        });
        // Object.assign(this.remainMaterialsList.rowNum, {
        //   materialCode: scope.row.materialCode,
        //   materialName: scope.row.materialName,
        //   number: scope.row.remainNumber,
        //   applyId: scope.row.id,
        //   workOrderCode: scope.row.workOrderCode,
        //   workOrderId: scope.row.workOrderId,
        // });
      } else {
        this.remainMaterialsList.push({
          materialCode: scope.row.materialCode,
          materialName: scope.row.materialName,
          number: scope.row.remainNumber,
          applyId: scope.row.id,
          workOrderCode: scope.row.workOrderCode,
          workOrderId: scope.row.workOrderId,
        });
      }
    },
    requestMaterialsListPushList() {
      this.requestMaterialsList.push({
        workOrderId: this.id,
        workOrderCode: this.WorkOrderCode,
      });
    },
    remainMaterialsListPushList() {
      this.remainMaterialsList.push({
        workOrderId: this.id,
        workOrderCode: this.WorkOrderCode,
      });
    },
    oldMaterialsListPushList() {
      this.oldMaterialsList.push({
        workOrderId: this.id,
        workOrderCode: this.WorkOrderCode,
      });
    },
    expirationMaterialsListPushList() {
      this.expirationMaterialsList.push({
        workOrderId: this.id,
        workOrderCode: this.WorkOrderCode,
      });
    },
    getList() {},
    handleQuery() {},
    resetQuery() {},
    handleUpdate() {},
    handleDelete(scope, list, event) {
      // this[list].splice(scope.$index, 1);
      if (scope?.row?.id) {
        this[list].filter((item, index) => {
          if (item.id === scope.row.id) {
            this.$set(this[list][index], "delFlag", 1);
          }
        });
      } else {
        this[list].splice(scope.$index, 1);
      }
    },
    updataOldPartsProcessing(value) {
      this.rowOldPartsProcessingData = value;
      this.openOldPartsProcessingDialog = true;
    },
    colseOldPartsProcessingDialog(value) {
      this.openOldPartsProcessingDialog = value;
    },
    colsePushMarketDialog(value) {
      this.openPushMarketDialog = value;
    },
    openPushMarket() {
      this.openPushMarketDialog = true;
    },
    openMateriel(scope, list) {
      this.currentName = list;
      this.numberList = scope.$index;
      this.openMaterialQueryDialog = true;
    },
    closeMaterialQueryDialog(value) {
      this.openMaterialQueryDialog = value;
    },
    openCHDrawer(value) {
      let values = {
        ...value,
        materialUsedId: value.id,
      };
      delete values.id;
      this.CoreHandoverData = values;
      this.openCoreHandoverDrawer = true;
    },
    colseCoreHandoverDrawer(value) {
      this.openCoreHandoverDrawer = value;
    },
    seletMaterialQueryData(value) {
      this.$set(
        this[this.currentName][this.numberList],
        "materialCode",
        value.materialCode
      );
      this.$set(
        this[this.currentName][this.numberList],
        "materialName",
        value.materialName
      );
    },
    bindingSelectData(e, row, item) {
      this.$set(row, item, e.join(","));
    },
  },
  props: {
    rowData: Object,
    WorkOrderCode: String,
  },
  watch: {
    activeName: {
      async handler(nV) {
        if (nV === "first") {
          await queryListByWorkOrderIdList({
            workOrderId: this.$route.query.workOrderId,
          }).then((res) => {
            this.requestMaterialsList = [...res.data] || [];
          });
          await materialRemainList({
            workOrderId: this.$route.query.workOrderId,
          }).then((res) => {
            this.remainMaterialsList = [...res.data] || [];
          });
        } else if (nV === "third") {
          await unwarrantyList({
            workOrderId: this.$route.query.workOrderId,
          }).then((res) => {
            this.expirationMaterialsList = [...res.data] || [];
          });
        } else if (nV === "second") {
          await queryListByWorkOrderIdMaterialUsed({
            workOrderId: this.$route.query.workOrderId,
          }).then((res) => {
            this.oldMaterialsList = [...res.data] || [];
          });
        }
        this.$emit("currentMaterielInfoTab", nV);
      },
      immediate: true,
    },
    requestMaterialsList: {
      handler(nV) {
        this.$set(
          this.rowData,
          "workOrderMaterialApplyUpdateParamList",
          nV.filter((item) => item.delFlag != 1)
        );
      },
      deep: true,
    },
    remainMaterialsList: {
      handler(nV) {
        this.$set(
          this.rowData,
          "itrWorkOrderMaterialRemainUpdateParams",
          nV.filter((item) => item.delFlag != 1)
        );
      },
      deep: true,
    },
    expirationMaterialsList: {
      handler(nV) {
        this.$set(
          this.rowData,
          "workOrderMaterialUnwarrantyUpdateParamList",
          nV.filter((item) => item.delFlag != 1)
        );
      },
      deep: true,
    },
    oldMaterialsList: {
      handler(nV) {
        this.$set(
          this.rowData,
          "itrWorkOrderMaterialUsedUpdateParams",
          nV.filter((item) => item.delFlag != 1)
        );
      },
      deep: true,
    },
  },
  mounted() {},
  created() {
    // if(this.rowData.requestMaterialsItems){
    //   this.requestMaterialsList = this.rowData.requestMaterialsItems
    // }else{
    //   this.rowData.requestMaterialsItems = this.requestMaterialsList
    // }
    // if(this.rowData.remainMaterialsItems){
    //   this.remainMaterialsList = this.rowData.remainMaterialsItems
    // }else{
    //   this.rowData.remainMaterialsItems = this.remainMaterialsList
    // }
    // if(this.rowData.oldMaterialsItems){
    //   this.oldMaterialsList = this.rowData.oldMaterialsItems
    // }else{
    //   this.rowData.oldMaterialsItems = this.oldMaterialsList
    // }
    // if(this.rowData.expirationMaterialsItems){
    //   this.expirationMaterialsList = this.rowData.expirationMaterialsItems
    // }else{
    //   this.rowData.expirationMaterialsItems = this.expirationMaterialsList
    // }
  },
};
</script>

<style scoped lang="scss">
.tableTitle {
  text-align: left;
  margin: 20px 0px;
  .tt {
    font-size: 18px;
    font-weight: 800;
  }
}
</style>
