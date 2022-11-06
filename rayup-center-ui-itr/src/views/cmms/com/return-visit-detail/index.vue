<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb-3">
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="handleExport"
          v-hasPermi="['app:update:export']"
        >
          保存
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          @click="toBack"
          v-hasPermi="['app:update:add']"
        >
          后退
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          v-hasPermi="['app:update:add']"
        >
          关闭回访
        </jereh-button>
      </el-col>
      <el-col :span="1.5">
        <jereh-button
          type="primary"
          plain
          size="mini"
          v-hasPermi="['app:update:add']"
        >
          视频指导
        </jereh-button>
      </el-col>
    </el-row>
    <!-- 基本信息 -->
    <div class="mb-20">
      <h3>基本信息</h3>
      <div>
        <div class="tab-one-row">
          <div class="tab-one-col">
            <span>客户名称：</span>
            <el-input
              style="width: 180px"
              v-model="returnVisitDetailData.clientName"
            ></el-input>
          </div>
          <div class="tab-one-col" style="margin-left: 10px">
            <span>评价人姓名：</span>
            <el-input
              style="width: 180px"
              v-model="returnVisitDetailData.appraiser"
            ></el-input>
          </div>
          <div class="tab-one-col" style="width: 310px">
            <span>评价人联系方式：</span>
            <el-input
              style="width: 180px"
              v-model="returnVisitDetailData.appraiserPhone"
            ></el-input>
          </div>
        </div>
        <div class="tab-one-row">
          <div class="tab-one-col">
            <span>服务工程师：</span>
            <el-input
              style="width: 180px"
              v-model="returnVisitDetailData.engineerBy"
            ></el-input>
          </div>
          <div class="tab-one-col">
            <span>调研问卷编码：</span>
            <el-input
              style="width: 180px"
              v-model="returnVisitDetailData.surveyQuestionnaireCode"
            ></el-input>
          </div>
          <div class="tab-one-col">
            <span>售后区域：</span>
            <el-input
              style="width: 180px"
              v-model="returnVisitDetailData.afterSaleArea"
            ></el-input>
          </div>
        </div>
        <div class="tab-one-row">
          <div class="tab-one-col">
            <span>评价日期：</span>
            <el-input
              style="width: 180px"
              v-model="returnVisitDetailData.assessmentTime"
            ></el-input>
          </div>
          <div class="tab-one-col">
            <span>市场负责人：</span>
            <el-input
              style="width: 180px"
              v-model="returnVisitDetailData.marketChargeBy"
            ></el-input>
          </div>
          <div class="tab-one-col">
            <span>服务类型：</span>
            <el-input
              style="width: 180px"
              v-model="returnVisitDetailData.serviceType"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 服务内容 -->
    <div class="mb-20">
      <h3>服务内容</h3>
      <el-tabs v-model="editableTabsValue" type="card">
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
          <!-- 设备交付 -->
          <div style="padding: 0 5px" v-show="editableTabsValue == 1">
            <div style="color: #ea5514; margin: 0 0 10px 10px">服务内容</div>
            <el-table
              v-loading="loading"
              :data="updateList"
              @selection-change="handleSelectionChange"
              border
            >
              <af-table-column
                label="序号"
                align="center"
                type="index"
                show-overflow-tooltip
                width="60"
              />
              <af-table-column
                label="服务编码"
                align="center"
                prop="i"
                show-overflow-tooltip
              />
              <af-table-column
                label="项目编码"
                align="center"
                prop="b"
                show-overflow-tooltip
              ></af-table-column>
              <af-table-column
                label="产品名称"
                align="center"
                prop="c"
                show-overflow-tooltip
              />

              <af-table-column
                label="协助交付人"
                align="center"
                prop="n"
                show-overflow-tooltip
              />
            </el-table>
            <!-- 服务满意度调研 -->
            <div
              style="
                color: #ea5514;
                margin: 10px 0 10px 10px;
                display: flex;
                align-items: center;
                position: relative;
              "
            >
              <span>服务满意度调研</span>
              <span style="color: black; margin-left: 10px"
                >杰瑞服务评价总分：</span
              >
              <el-input style="width: 180px"></el-input>
              <jereh-button
                style="position: absolute; right: 0"
                type="primary"
                plain
                size="mini"
                @click="handleExport"
                v-hasPermi="['app:update:export']"
              >
                保存
              </jereh-button>
            </div>
            <el-table
              v-loading="loading"
              :data="investigateServeData"
              @selection-change="handleSelectionChange"
              border
            >
              <af-table-column
                label="调研选项"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div style="text-align: left">{{ scope.row.item }}</div>
                </template>
              </af-table-column>
              <af-table-column
                label="得分"
                align="center"
                prop="score"
                width="120"
                show-overflow-tooltip
              />
            </el-table>
            <div
              style="
                color: #ea5514;
                margin: 10px 0 10px 10px;
                display: flex;
                justify-content: space-between;
              "
            >
              <div style="width: 50%">
                <span>本次培训服务的亮点：</span>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    color: black;
                    margin-top: 10px;
                  "
                >
                  1)
                  <el-input
                    type="textarea"
                    style="width: 90%; margin-left: 5px"
                  ></el-input>
                </div>
              </div>
              <div style="width: 50%">
                <span>本次培训服务的不足：</span>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    color: black;
                    margin-top: 10px;
                  "
                >
                  1)
                  <el-input
                    type="textarea"
                    style="width: 90%; margin-left: 5px"
                  ></el-input>
                </div>
              </div>
            </div>
            <!-- 产品满意度调研 -->
            <div
              style="
                color: #ea5514;
                margin: 10px 0 10px 10px;
                display: flex;
                align-items: center;
                position: relative;
              "
            >
              <span>产品满意度调研</span>
              <span style="color: black; margin-left: 10px"
                >杰瑞产品评价总分：</span
              >
              <el-input style="width: 180px"></el-input>
              <jereh-button
                style="position: absolute; right: 0"
                type="primary"
                plain
                size="mini"
                @click="handleExport"
                v-hasPermi="['app:update:export']"
              >
                保存
              </jereh-button>
            </div>
            <el-table
              v-loading="loading"
              :data="investigateProductData"
              @selection-change="handleSelectionChange"
              border
            >
              <af-table-column
                label="调研选项"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div style="text-align: left">{{ scope.row.item }}</div>
                </template>
              </af-table-column>
              <af-table-column
                label="得分"
                align="center"
                prop="score"
                width="120"
                show-overflow-tooltip
              />
            </el-table>
            <div
              style="
                color: #ea5514;
                margin: 10px 0 10px 10px;
                display: flex;
                justify-content: space-between;
              "
            >
              <div style="width: 50%">
                <span>杰瑞产品的亮点：</span>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    color: black;
                    margin-top: 10px;
                  "
                >
                  1)
                  <el-input
                    type="textarea"
                    style="width: 90%; margin-left: 5px"
                  ></el-input>
                </div>
              </div>
              <div style="width: 50%">
                <span>杰瑞产品的不足：</span>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    color: black;
                    margin-top: 10px;
                  "
                >
                  1)
                  <el-input
                    type="textarea"
                    style="width: 90%; margin-left: 5px"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <!-- 培训服务 -->
          <div v-show="editableTabsValue == 3" style="width: 100%; height: 80%">
            <div
              class="tab-one-row"
              style="justify-content: start; margin-left: 20px"
            >
              <div>
                <span>培训编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div style="margin-left: 30px">
                <span>产品名称：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div style="margin-left: 30px">
                <span>关联设备交付服务编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
            </div>
            <div
              style="
                margin: 10px;
                margin-left: 20px;
                display: flex;
                align-items: center;
              "
            >
              <span>参与讲师：</span>
              <el-input type="textarea" style="width: 78.3%"></el-input>
            </div>
            <div style="color: #ea5514; margin: 0 0 10px 10px">培训内容</div>
            <el-table
              v-loading="loading"
              :data="updateList"
              @selection-change="handleSelectionChange"
              border
            >
              <af-table-column
                label="序号"
                align="center"
                type="index"
                show-overflow-tooltip
                width="60"
              />
              <af-table-column
                label="培训开始时间"
                align="center"
                prop="i"
                show-overflow-tooltip
              />
              <af-table-column
                label="培训结束时间"
                align="center"
                prop="b"
                show-overflow-tooltip
              ></af-table-column>
              <af-table-column
                label="课程名称"
                align="center"
                prop="c"
                show-overflow-tooltip
              />
              <af-table-column
                label="培训内容"
                align="center"
                prop="n"
                show-overflow-tooltip
              />
              <af-table-column
                label="主讲人"
                align="center"
                prop="n"
                show-overflow-tooltip
              />
              <af-table-column
                label="培训地点"
                align="center"
                prop="n"
                show-overflow-tooltip
              />
              <af-table-column
                label="培训课时"
                align="center"
                prop="n"
                show-overflow-tooltip
              />
            </el-table>
            <div
              style="
                color: #ea5514;
                margin: 10px 0 10px 10px;
                display: flex;
                align-items: center;
                position: relative;
              "
            >
              <span>服务满意度调研</span>
              <span style="color: black; margin-left: 10px"
                >杰瑞服务评价总分：</span
              >
              <el-input style="width: 180px"></el-input>
              <jereh-button
                style="position: absolute; right: 0"
                type="primary"
                plain
                size="mini"
                @click="handleExport"
                v-hasPermi="['app:update:export']"
              >
                保存
              </jereh-button>
            </div>
            <el-table
              v-loading="loading"
              :data="investigateTraintData"
              @selection-change="handleSelectionChange"
              border
            >
              <af-table-column
                label="调研选项"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div style="text-align: left">{{ scope.row.item }}</div>
                </template>
              </af-table-column>
              <af-table-column
                label="得分"
                align="center"
                prop="score"
                width="120"
                show-overflow-tooltip
              />
            </el-table>
            <div
              style="
                color: #ea5514;
                margin: 10px 0 10px 10px;
                display: flex;
                justify-content: space-between;
              "
            >
              <div style="width: 50%">
                <span>本次培训服务的亮点：</span>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    color: black;
                    margin-top: 10px;
                  "
                >
                  1)
                  <el-input
                    type="textarea"
                    style="width: 90%; margin-left: 5px"
                  ></el-input>
                </div>
              </div>
              <div style="width: 50%">
                <span>本次培训服务的不足：</span>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    color: black;
                    margin-top: 10px;
                  "
                >
                  1)
                  <el-input
                    type="textarea"
                    style="width: 90%; margin-left: 5px"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <!-- 问题处理 -->
          <div v-show="editableTabsValue == 4">
            <div style="color: #ea5514; margin: 0 0 10px 10px">工单处理</div>
            <el-table
              v-loading="loading"
              :data="updateList"
              @selection-change="handleSelectionChange"
              border
            >
              <af-table-column
                label="序号"
                align="center"
                type="index"
                show-overflow-tooltip
                width="60"
              />
              <af-table-column
                label="服务工单编号"
                align="center"
                prop="i"
                show-overflow-tooltip
              />
              <af-table-column
                label="产品名称"
                align="center"
                prop="b"
                show-overflow-tooltip
              ></af-table-column>
              <af-table-column
                label="故障描述"
                align="center"
                prop="c"
                show-overflow-tooltip
              />
              <af-table-column
                label="辅助人"
                align="center"
                prop="n"
                show-overflow-tooltip
              />
              <af-table-column
                label="关联设备交付服务编码"
                align="center"
                prop="n"
                show-overflow-tooltip
              />
            </el-table>
            <div
              style="
                color: #ea5514;
                margin: 10px 0 10px 10px;
                display: flex;
                align-items: center;
                position: relative;
              "
            >
              <span>满意度调研</span>
              <span style="color: black; margin-left: 10px"
                >杰瑞服务评价总分：</span
              >
              <el-input style="width: 180px"></el-input>
              <jereh-button
                style="position: absolute; right: 0"
                type="primary"
                plain
                size="mini"
                @click="handleExport"
                v-hasPermi="['app:update:export']"
              >
                保存
              </jereh-button>
            </div>
            <el-table
              v-loading="loading"
              :data="investigateTraintData"
              @selection-change="handleSelectionChange"
              border
            >
              <af-table-column
                label="调研选项"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div style="text-align: left">{{ scope.row.item }}</div>
                </template>
              </af-table-column>
              <af-table-column
                label="得分"
                align="center"
                prop="score"
                width="120"
                show-overflow-tooltip
              />
            </el-table>
            <div
              style="
                color: #ea5514;
                margin: 10px 0 10px 10px;
                display: flex;
                justify-content: space-between;
              "
            >
              <div style="width: 50%">
                <span>本次服务的亮点：</span>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    color: black;
                    margin-top: 10px;
                  "
                >
                  1)
                  <el-input
                    type="textarea"
                    style="width: 90%; margin-left: 5px"
                  ></el-input>
                </div>
              </div>
              <div style="width: 50%">
                <span>本次服务的不足：</span>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    color: black;
                    margin-top: 10px;
                  "
                >
                  1)
                  <el-input
                    type="textarea"
                    style="width: 90%; margin-left: 5px"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 回访执行 -->
    <div class="mb-20">
      <h3>回访执行</h3>
      <div
        class="tab-one-col"
        style="width: 70%; justify-content: start; margin: 10px"
      >
        <span>回访原因：</span>
        <div>
          <div>
            <el-checkbox v-model="isLeEightyChecked">评价总分≤80</el-checkbox>
            <el-checkbox v-model="isLeThreeChecked"
              >单项评价分&lt;3</el-checkbox
            >
            <el-checkbox v-model="significantChecked">重大问题属性</el-checkbox>
            <el-checkbox v-model="repetitiveWorkChecked"
              >重复派工属性</el-checkbox
            >
            <el-checkbox v-model="repetitiveReturnVisitChecked"
              >月度回访</el-checkbox
            >
            <el-checkbox v-model="activeReturnVisitChecked"
              >主动回访</el-checkbox
            >
          </div>
          <div>
            <el-checkbox
              v-model="productDeficiencyChecked"
              style="margin-right: 25px"
              >杰瑞产品不足</el-checkbox
            >
            <el-checkbox v-model="serviceDeficiencyChecked"
              >杰瑞服务不足</el-checkbox
            >
          </div>
        </div>
      </div>
      <div class="flex" style="align-items: center; margin-left: 10px">
        <span style="text-align: center; width: 65px"
          >主动回访
          <div>说明：</div></span
        >
        <el-input
          type="textarea"
          style="width: 80%; margin-left: 15px"
          v-model="returnVisitDetailData.visitExplain"
        ></el-input>
      </div>
      <div
        class="tab-one-row"
        style="justify-content: start; margin: 10px; align-items: center"
      >
        <div>
          <span>回访日期：</span>
          <el-date-picker
            style="width: 250px !important"
            v-model="returnVisitDetailData.visitTime"
            type="datetime"
            placeholder="请选择回访日期"
            value-format="yyyy-MM-dd"
          />
        </div>
        <div style="margin-left: 80px; display: flex; align-items: center">
          <span>回访人：</span>
          <!-- <el-input style="width: 180px"></el-input> -->
          <PersonnelBindingSelect
            v-model="returnVisitDetailData.visitUserName"
            @bindingData="bindingSelectData(0, $event, 'followUpPeople')"
          />
        </div>
        <div style="margin-left: 20px">
          <span>是否回访成功：</span>
          <el-radio v-model="returnVisitDetailData.isVisit" label="0">是</el-radio>
          <el-radio v-model="returnVisitDetailData.isVisit" label="1">否</el-radio>
        </div>
      </div>
      <div class="flex" style="align-items: center; margin: 10px">
        <span>未成功原因：</span>
        <el-input type="textarea" style="width: 79.5%" v-model="returnVisitDetailData.unclosedCause"></el-input>
      </div>
    </div>
    <!-- 回访调研表 -->
    <div class="mb-20">
      <h3 style="background-color: white">回访调研表</h3>
      <div
        class="tab-one-row"
        style="justify-content: start; margin: 10px; align-items: center"
      >
        <div class="flex" style="align-items: center">
          <span style="text-align: right; width: 100px">到场及时率：</span>
          <jereh-select
            style="width: 150px"
            v-model="returnVisitList[0].satisfaction"
            filterable
            ph="请选择"
            :dict="dict.type.itr_satisfaction"
          />
        </div>
        <div style="margin-left: 120px">
          <span>客户建议：</span>
          <el-input style="width: 380px" v-model="returnVisitList[0].satisfaction"></el-input>
        </div>
      </div>
      <div
        class="tab-one-row"
        style="justify-content: start; margin: 10px; align-items: center"
      >
        <div class="flex" style="align-items: center">
          <span style="text-align: right; width: 100px">服务态度：</span>
          <jereh-select
            style="width: 150px"
            v-model="returnVisitList[1].satisfaction"
            filterable
            ph="请选择"
            :dict="dict.type.itr_satisfaction"
          />
        </div>
        <div style="margin-left: 120px">
          <span>客户建议：</span>
          <el-input style="width: 380px" v-model="returnVisitList[1].satisfaction"></el-input>
        </div>
      </div>
      <!-- <div
        class="tab-one-row"
        style="justify-content: start; margin: 10px; align-items: center"
      >
        <div class="flex" style="align-items: center">
          <span style="text-align: right; width: 100px">服务总体：</span>
          <jereh-select
            style="width: 150px"
            v-model="queryParams.serviceCategory"
            filterable
            ph="请选择"
            :dict="dict.type.itr_satisfaction"
          />
        </div>
        <div style="margin-left: 120px">
          <span>客户建议：</span>
          <el-input style="width: 380px"></el-input>
        </div>
      </div> -->
      <div
        class="tab-one-row"
        style="justify-content: start; margin: 10px; align-items: center"
      >
        <div class="flex" style="align-items: center">
          <span style="text-align: right; width: 100px">服务前准备：</span>
          <jereh-select
            style="width: 150px"
            v-model="returnVisitList[2].satisfaction"
            filterable
            ph="请选择"
            :dict="dict.type.itr_satisfaction"
          />
        </div>
        <div style="margin-left: 120px">
          <span>客户建议：</span>
          <el-input style="width: 380px" v-model="returnVisitList[2].suggestions"></el-input>
        </div>
      </div>
      <div
        class="tab-one-row"
        style="justify-content: start; margin: 10px; align-items: center"
      >
        <div class="flex" style="align-items: center">
          <span style="text-align: center; width: 100px"
            >技术和解决
            <div>问题的能力：</div></span
          >
          <jereh-select
            style="width: 150px"
            v-model="returnVisitList[3].satisfaction"
            filterable
            ph="请选择"
            :dict="dict.type.itr_satisfaction"
          />
        </div>
        <div style="margin-left: 120px">
          <span>客户建议：</span>
          <el-input style="width: 380px" v-model="returnVisitList[3].suggestions"></el-input>
        </div>
      </div>
      <div
        class="tab-one-row"
        style="justify-content: start; margin: 10px; align-items: center"
      >
        <div class="flex" style="align-items: center">
          <span style="text-align: right; width: 100px">服务总体：</span>
          <jereh-select
            style="width: 150px"
            v-model="returnVisitList[4].satisfaction"
            filterable
            ph="请选择"
            :dict="dict.type.itr_satisfaction"
          />
        </div>
        <div style="margin-left: 88px">
          <span>服务改进建议：</span>
          <el-input style="width: 380px" v-model="returnVisitList[4].suggestions"></el-input>
        </div>
      </div>
      <div
        class="tab-one-row"
        style="
          justify-content: start;
          margin: 10px;
          margin-left: -2px;
          align-items: center;
        "
      >
        <div class="flex" style="align-items: center">
          <span style="width: 112px"
            >目前主要使用
            <div>我司设备类型：</div></span
          >
          <el-input style="width: 730px" v-model="returnVisitDetailData.useDeviceType"></el-input>
        </div>
      </div>
      <div
        class="tab-one-row"
        style="justify-content: start; margin: 10px; align-items: center"
      >
        <div class="flex" style="align-items: center">
          <span style="text-align: right; width: 100px">设备满意度：</span>
          <jereh-select
            style="width: 150px"
            v-model="returnVisitList[5].satisfaction"
            filterable
            ph="请选择"
            :dict="dict.type.itr_satisfaction"
          />
        </div>
        <div style="margin-left: 120px">
          <span>客户建议：</span>
          <el-input style="width: 380px" v-model="returnVisitList[5].suggestions"></el-input>
        </div>
      </div>
      <div
        class="tab-one-row"
        style="justify-content: start; margin: 10px; align-items: center"
      >
        <div class="flex" style="align-items: center">
          <span style="text-align: right; width: 100px">备注：</span>
          <el-input style="width: 730px" v-model="returnVisitDetailData.visitRemark"></el-input>
        </div>
      </div>
    </div>
    <!-- 回访总结及处理 -->
    <div class="mb-20">
      <h3>回访总结及处理</h3>
      <div class="tab-one-col" style="justify-content: start; margin: 10px">
        <span>是否立即关闭：</span>
        <el-radio v-model="returnVisitDetailData.isClose" label="0"
          >是</el-radio
        >
        <el-radio v-model="returnVisitDetailData.isClose" label="1"
          >否</el-radio
        >
      </div>
      <div
        class="tab-one-col"
        style="
          width: 70%;
          justify-content: start;
          margin: 10px;
          margin-bottom: 20px;
        "
      >
        <span>未关闭原因：</span>
        <div>
          <el-checkbox v-model="serviceQualityChecked">服务质量</el-checkbox>
          <el-checkbox v-model="issueChecked">问题未解决完毕</el-checkbox>
          <el-checkbox v-model="newIssueChecked">反馈新的问题</el-checkbox>
          <el-checkbox v-model="improveChecked">反馈设备改进意见</el-checkbox>
        </div>
      </div>
      <el-tabs v-model="editableTabsValue" type="card">
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabsReturn"
          :label="item.title"
          :name="item.name"
        >
          <!-- 服务质量 -->
          <div style="padding: 0 5px" v-show="editableTabsValue == 1">
            <div style="color: #ea5514; margin: 0 0 10px 10px">
              服务质量改善
              <jereh-button
                style="margin-left: 10px"
                type="primary"
                plain
                size="mini"
                v-hasPermi="['app:update:add']"
              >
                提交
              </jereh-button>
            </div>
            <div
              class="tab-one-row"
              style="justify-content: start; margin: 10px; align-items: center"
            >
              <div class="flex align-center">
                <span>区域经理：</span>
                <PersonnelBindingSelect
                  v-model="returnVisitDetailData.areaManager"
                  @bindingData="bindingSelectData(1, $event, 'followUpPeople')"
                />
              </div>
              <div style="margin-left: 20px">
                <span>交流时间：</span>
                <el-date-picker
                  style="width: 250px !important"
                  v-model="returnVisitDetailData.communicateTime"
                  type="datetime"
                  placeholder="请选择日期"
                  value-format="yyyy-MM-dd"
                />
              </div>
              <div style="margin-left: 20px">
                <span>交流方式：</span>
                <jereh-select
                  style="width: 150px"
                  v-model="returnVisitDetailData.communicateType"
                  filterable
                  ph="请选择"
                  :dict="dict.type.itr_communication_mode"
                />
              </div>
            </div>
            <div style="position: relative; margin: 20px 0">
              <jereh-button
                style="position: absolute; right: 0px; top: -35px"
                type="primary"
                plain
                size="mini"
                @click="addserviceQuality"
                v-hasPermi="['app:update:export']"
              >
                新增
              </jereh-button>
              <el-table v-loading="loading" :data="serviceQuality" border>
                <af-table-column
                  label="序号"
                  align="center"
                  type="index"
                  width="60"
                  show-overflow-tooltip
                />
                <af-table-column
                  label="服务质量问题"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.serviceQuestion"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </af-table-column>
                <af-table-column
                  label="改善目标"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.improvementTarget"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </af-table-column>
                <af-table-column
                  label="改善措施"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.improvementMeasure"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </af-table-column>
                <af-table-column
                  label="节点日期"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-date-picker
                      class="border-none"
                      v-model="scope.row.nodeTime"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </template>
                </af-table-column>
                <af-table-column
                  label="达成情况描述"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.performance"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </af-table-column>
                <af-table-column
                  label="是否达成"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      clearable
                      v-model="scope.row.isAccomplish"
                      style="width: 100%"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in isTrueOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                  <!-- <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.isAccomplish"
                      placeholder="请输入"
                    ></el-input>
                  </template> -->
                </af-table-column>
                <af-table-column
                  label="未达成原因"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.unfinishedCause"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </af-table-column>
              </el-table>
            </div>
          </div>
          <!-- 服务问题 -->
          <div v-show="editableTabsValue == 3" style="width: 100%; height: 80%">
            <div style="color: #ea5514; margin: 0 0 10px 10px">
              创建服务工单
            </div>
            <div style="margin-left: 10px">
              创建服务工单原因：
              <el-checkbox v-model="issueWorkChecked"
                >问题未解决完毕</el-checkbox
              >
              <el-checkbox v-model="newIssueWorkChecked"
                >反馈新的问题</el-checkbox
              >
              <jereh-button
                style="margin-left: 45px"
                type="primary"
                plain
                size="mini"
                v-hasPermi="['app:update:add']"
              >
                创建服务请求
              </jereh-button>
            </div>
          </div>
          <!-- 改进建议 -->
          <div v-show="editableTabsValue == 4">
            <div style="color: #ea5514; margin: 0 0 10px 10px">
              客户反馈设备改进意见
              <jereh-button
                style="margin-left: 10px"
                type="primary"
                plain
                size="mini"
                @click="submitImprovementSuggest"
              >
                提交
              </jereh-button>
            </div>
            <div>
              <div
                class="tab-one-row"
                style="
                  justify-content: start;
                  margin: 10px;
                  align-items: center;
                "
              >
                <div class="flex align-center">
                  <span>主任工程师：</span>
                  <PersonnelBindingSelect
                    v-model="returnVisitDetailData.directorEngineer"
                    @bindingData="
                      bindingSelectData(2, $event, 'followUpPeople')
                    "
                  />
                </div>
              </div>
            </div>

            <div style="position: relative; margin: 20px 0">
              <div style="position: absolute; right: 0px; top: -35px">
                <jereh-button
                  type="primary"
                  plain
                  size="mini"
                  @click="addModifiedProposal"
                  v-hasPermi="['app:update:export']"
                >
                  新增
                </jereh-button>
                <jereh-button
                  type="primary"
                  plain
                  size="mini"
                  @click="handleExport"
                  v-hasPermi="['app:update:export']"
                >
                  答复客户
                </jereh-button>
                <jereh-button
                  type="primary"
                  plain
                  size="mini"
                  @click="handleExport"
                  v-hasPermi="['app:update:export']"
                >
                  设计改进
                </jereh-button>
              </div>
              <el-table
                v-loading="loading"
                :data="improvementSuggest"
                @selection-change="handleSelectionChange"
                border
              >
                <af-table-column
                  label="序号"
                  align="center"
                  type="index"
                  width="60"
                  show-overflow-tooltip
                />
                <af-table-column
                  label="产品名称"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.productName"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </af-table-column>
                <af-table-column
                  label="项目编码"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.projectCode"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </af-table-column>
                <af-table-column
                  label="设备改进建议"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.improvementSuggest"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </af-table-column>
                <af-table-column
                  label="答复节点"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-date-picker
                      class="border-none"
                      v-model="scope.row.replyNode"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </template>
                </af-table-column>
                <af-table-column
                  label="是否采纳"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      clearable
                      v-model="scope.row.isAccept"
                      style="width: 100%"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in isTrueOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </af-table-column>
                <af-table-column
                  label="采纳/未采纳原因"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.cause"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </af-table-column>
                <af-table-column
                  label="答复客户日期"
                  prop="replyClientTime"
                  align="center"
                  show-overflow-tooltip
                >
                  <!-- <template slot-scope="scope">
                    <el-input
                      class="border-none"
                      v-model="scope.row.i"
                    ></el-input>
                  </template> -->
                </af-table-column>
                <af-table-column
                  label="是否流转产品设计改进流程"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.isImprovementSuggest == 0 ? "是" : "否" }}
                    </div>
                    <!-- <el-input
                      class="border-none"
                      v-model="scope.row.isImprovementSuggest"
                      placeholder="请输入"
                    ></el-input> -->
                  </template>
                </af-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getUpdate,
  listUpdate,
  addUpdate,
  delUpdate,
  updateUpdate,
} from "@/api/cmms/appUpdate";
import PersonnelBindingSelect from "@/views/cmms/itr/components/PersonnelBindingSelect/index.vue";
import { selectVisitInfo,surveyInfo } from "@/api/cmms/com/satisfaction-survey/index.js";
export default {
  dicts: ["itr_communication_mode", "itr_satisfaction"],
  components: { PersonnelBindingSelect },
  data() {
    return {
      isLeEightyChecked: false,
      isLeThreeChecked: false,
      significantChecked: false,
      repetitiveWorkChecked: false,
      repetitiveReturnVisitChecked: false,
      activeReturnVisitChecked: false,
      productDeficiencyChecked: false,
      serviceDeficiencyChecked: false,
      serviceQualityChecked: false,
      issueChecked: false,
      newIssueChecked: false,
      improveChecked: false,
      issueWorkChecked: false,
      newIssueWorkChecked: false,
      // 遮罩层
      loading: false,
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
      // 表格数据
      updateList: [
        {
          a: "市场类",
          b: "待评价",
          c: "SCDY20220804+001",
          d: "2022-10-22",
          e: "2022-10-31",
          f: "设备交付",
          g: "西南区域",
          h: "张三",
          i: "SCDY20220804",
          j: "DY20220804",
          k: "产品A",
          l: "产品A设备交付",
          n: "李四",
          m: "赵五",
          o: "150000000000",
          p: "76.22",
          q: "90.00",
          r: "是",
        },
      ],
      // 服务质量表格数据
      serviceQuality: [
        {
          issue: undefined,
          improveGoal: undefined,
          improveMeasure: undefined,
          nodeTime: undefined,
          reachConditionDescribe: undefined,
          isReach: undefined,
          notReachReason: undefined,
        },
      ],
      // 改进建议表格数据
      improvementSuggest: [
        {
          productName: undefined,
          projectCode: undefined,
          facilityModifiedProposal: undefined,
          replyNodeTime: undefined,
          IsAccept: undefined,
          reason: undefined,
          replyClientTime: undefined,
          isModefiedFlow: undefined,
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        requestStatus: undefined,
        faultLevel: undefined,
        createTime: undefined,
        agreementCode: undefined,
        serviceRequiredTime: undefined,
        serviceType: undefined,
        issueLevel: undefined,
        faultType: undefined,
        clientName: undefined,
        saleUser: undefined,
        afterSaleArea: undefined,
        taskAssistUser: undefined,
        productName: undefined,
        productBrand: undefined,
        projectCode: undefined,
        factoryOn: undefined,
        serviceJobsite: undefined,
        problemClassification: undefined,
        problemTime: undefined,
        UpgradeCoOrganizer: undefined,
        state: undefined,
      },
      isTrueOptions: [
        { label: "是", value: 0 },
        { label: "否", value: 1 },
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        version: [
          { required: true, message: "版本号不能为空", trigger: "blur" },
        ],
        url: [{ required: true, message: "下载地址不能为空", trigger: "blur" }],
        updateType: [
          { required: true, message: "更新类型不能为空", trigger: "change" },
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" },
        ],
        status: [
          { required: true, message: "是否启用不能为空", trigger: "blur" },
        ],
      },
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "设备交付",
          name: "1",
        },
        {
          title: "培训服务",
          name: "3",
        },
        {
          title: "问题处理",
          name: "4",
        },
      ],
      editableTabsReturn: [
        {
          title: "服务质量",
          name: "1",
        },
        {
          title: "服务问题",
          name: "3",
        },
        {
          title: "改进建议",
          name: "4",
        },
      ],
      radio: "0",
      dialogOfUpload: false,
      fileList: [],
      investigateServeData: [
        {
          item: "1、服务需求受理答复速度的满意度",
          score: "",
        },
        {
          item: "2、服务需求现场处理响应速度的满意度",
          score: "",
        },
        {
          item: "3、服务工程师现场问题处理准备度的满意度",
          score: "",
        },
        {
          item: "4、服务工程师现场处理问题专业能力的满意度",
          score: "",
        },
        {
          item: "5、服务工程师整体职业化形象满意度",
          score: "",
        },
        {
          item: "6、服务工程师现场沟通交流职业化的满意度",
          score: "",
        },
      ],
      investigateProductData: [
        {
          item: "1、设备设计布局评价",
          score: "",
        },
        {
          item: "2、设备喷漆质量评价",
          score: "",
        },
        {
          item: "3、设备焊接美观质量评价",
          score: "",
        },
        {
          item: "4、设备线路走向防护评价",
          score: "",
        },
        {
          item: "5、设备稳定性评价",
          score: "",
        },
        {
          item: "6、设备操作/保养便捷性评价",
          score: "",
        },
      ],
      investigateTraintData: [
        {
          item: "1、培训内容符合要求，培训效果达到预期的满意度",
          score: "",
        },
        {
          item: "2、培训内容框架合理、层次分明、案例丰富生动的满意度",
          score: "",
        },
        {
          item: "3、讲师精神面貌和培训态度的满意度",
          score: "",
        },
        {
          item: "4、讲师的授课表达、气氛调动、进度控制能力的满意度",
          score: "",
        },
        {
          item: "5、讲师的知识底蕴和实战经验的满意度",
          score: "",
        },
        {
          item: "6、资料准备充分、保障工作完善到位的满意度",
          score: "",
        },
      ],
      followUpPeople: undefined,
      returnVisitDetailId: undefined,
      returnVisitDetailData: {},
      // 回访调研表
      returnVisitList:[
        {visitSurveyType:"punctual",satisfaction:undefined,suggestions:undefined},
        {visitSurveyType:"service_attitude",satisfaction:undefined,suggestions:undefined},
        {visitSurveyType:"service_preparatory",satisfaction:undefined,suggestions:undefined},
        {visitSurveyType:"capacity",satisfaction:undefined,suggestions:undefined},
        {visitSurveyType:"service_total",satisfaction:undefined,suggestions:undefined},
        {visitSurveyType:"equipment_satisfaction",satisfaction:undefined,suggestions:undefined},
      ],
    };
  },
  mounted() {
    // this.$bus.$on("returnVisitDetailId", (val) => {
    //   console.log(val, "接收满意度调研传来的值");
    //   this.returnVisitDetailId = val;
    // });
    this.getList();
  },
  methods: {
    /** 查询回访详情 */
    getList() {
      this.returnVisitDetailId = this.$route.query.returnVisitDetailId;
      if (this.returnVisitDetailId == undefined) {
        return this.$message.error("数据加载失败");
      }
      // this.loading = true;
      selectVisitInfo(this.returnVisitDetailId).then((res) => {
        console.log(res, "查询结果");
        if (res.code == 200) {
          this.returnVisitDetailData = res.data;
          this.improvementSuggest = res.data.improvementSuggest;
          this.serviceQuality = res.data.serviceQuality;
          console.log(res.data.visitCause);
          this.isCheck(res.data.visitCauseMap,res.data.unclosedCauseMap)
          this.returnVisitFrom(res.data.visitSurvey)
        }
      });
      surveyInfo(this.returnVisitDetailId).then(res=>{
        console.log(res,'结果');
      })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        version: null,
        url: null,
        updateType: null,
        description: null,
        status: 0,
        delflag: null,
        createBy: null,
        updateBy: null,
        createTime: null,
        updateTime: null,
        remark: null,
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加手持端更新";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getUpdate(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改手持端更新";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateUpdate(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUpdate(this.form).then((response) => {
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
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除手持端更新编号为"' + ids + '"的数据项？')
        .then(function () {
          return delUpdate(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "app/update/export",
        {
          ...this.queryParams,
        },
        `update_${new Date().getTime()}.xlsx`
      );
    },
    toBack() {
      this.$router.go(-1);
    },
    uploadFile() {
      this.dialogOfUpload = true;
    },
    handleChange() {},
    toReviewDetail() {
      this.$router.push({
        path: "/cmms/commonModel/reviewDetail",
      });
    },
    bindingSelectData(type, e, row) {
      if (type == 0) {
        this.returnVisitDetailData.visitUserName = e[0];
      } else if (type == 1) {
        this.returnVisitDetailData.areaManager = e[0];
      } else {
        this.returnVisitDetailData.directorEngineer = e[0];
      }
      console.log(e, row, "选择人员");
      // this.$set(this, row, e.join(","));
      // this[row] = e.join(',')
    },

    // 服务质量新增
    addserviceQuality() {
      let obj = {
        issue: undefined,
        improveGoal: undefined,
        improveMeasure: undefined,
        nodeTime: undefined,
        reachConditionDescribe: undefined,
        isReach: undefined,
        notReachReason: undefined,
      };
      this.serviceQuality.push(obj);
    },
    // 改进建议新增
    addModifiedProposal() {
      let obj = {
        productName: undefined,
        projectCode: undefined,
        facilityModifiedProposal: undefined,
        replyNodeTime: undefined,
        IsAccept: undefined,
        reason: undefined,
        replyClientTime: undefined,
        isModefiedFlow: undefined,
      };
      this.improvementSuggest.push(obj);
    },
    // 改进建议提交
    submitImprovementSuggest() {
      console.log(this.improvementSuggest);
    },
    // 单选框勾选判断
    isCheck(visitCauseMap, unclosedCauseMap) {
      // visitCauseMap = visitCauseMap.split(',')
      // unclosedCause = unclosedCause.split(',')
      // console.log(visitCause);
      // visitCause.map(it=>{
        if (visitCauseMap['month_visit'] !== undefined ) {
          this.repetitiveReturnVisitChecked = true
        }
         if (visitCauseMap["individual_evaluation_score"] !== undefined) {
          this.isLeThreeChecked = true
        }
         if (visitCauseMap["repeat_dispatch"] !== undefined ) {
          this.repetitiveWorkChecked = true
        }
         if (visitCauseMap["significant_problem"] !== undefined ) {
          this.significantChecked = true
        }
         if (visitCauseMap["initiative_visit"] !== undefined ) {
          this.activeReturnVisitChecked = true
        }
         if (visitCauseMap["product_deficiency"] !== undefined ) {
          this.productDeficiencyChecked = true
        }
         if (visitCauseMap["service_deficiency"] !== undefined ) {
          this.serviceDeficiencyChecked = true
        }
         if (visitCauseMap["evaluation_score"] !== undefined ) {
          this.isLeEightyChecked = true
        }
      // })
      // unclosedCause.map(it=>{
        if (unclosedCauseMap["service_quality"] !== undefined) {
          this.serviceQualityChecked = true;
        }
         if (unclosedCauseMap["unfinished_problem"] !== undefined) {
          this.issueChecked = true;
        }
         if (unclosedCauseMap["new_problem"] !== undefined) {
          this.newIssueChecked = true;
        }
         if (unclosedCauseMap["improvement_suggest"] !== undefined) {
          this.improveChecked = true;
        }  
      // })
      
    },
    // 回访调研表满意度及客户建议
    returnVisitFrom(list){
      list.map(it=>{
        if (it.visitSurveyType == 'punctual') {
          this.returnVisitList[0] = it
        }else if (it.visitSurveyType == 'service_attitude') {
          this.returnVisitList[1] = it
        }else if (it.visitSurveyType == 'service_preparatory') {
          this.returnVisitList[2] = it
        }else if (it.visitSurveyType == 'capacity') {
          this.returnVisitList[3] = it
        }else if (it.visitSurveyType == 'service_total') {
          this.returnVisitList[4] = it
        }else if (it.visitSurveyType == 'equipment_satisfaction') {
          this.returnVisitList[5] = it
        }
      })
    }
  },
};
</script>
<style scoped>
h3 {
  font-weight: 700;
  background-color: #f2f2f2;
  margin: 0 0 5px 0;
  padding: 5px 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
.tab-one-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
}
.tab-one-col {
  display: flex;
  width: 300px;
  align-items: center;
  justify-content: right;
}
.tab-one-col > span {
  width: auto;
}
::v-deep.el-tabs__nav-wrap.is-top {
  padding-left: 0px !important;
}
::v-deep.el-tabs--card > .el-tabs__header {
  border-bottom: 3px solid #e7e7e7;
}
/* //修改tab-item样式 */
::v-deep .el-tabs__item {
  width: 100px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  font-size: 16px;
  background-color: #eceef3;
  margin-right: 5px;
  border-radius: 6px 6px 0px 0px;
}

/* // 修改nav背景色 */
::v-deep.el-tabs__nav-scroll {
  /* // background-color: ; */
}

/* //去除顶部线 */
::v-deep.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}

/* //选中时样式设置 */
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #f45426;
  color: #fff;
  border: 1px solid #f45426;
}
::v-deep .el-tabs__content {
  overflow-y: hidden !important;
  /* // padding-bottom: 100px !important; */
}
::v-deep .el-textarea .el-textarea__inner {
  resize: none;
}
::v-deep .border-none > .el-input__inner {
  padding: 0px 5px;
  border: none;
}
::v-deep .border-none > div > .el-input__inner {
  border: none;
}
::v-deep .border-none > div > .el-input__suffix {
  display: none;
}
::v-deep .border-none > .el-input__prefix {
  display: none;
}
</style>