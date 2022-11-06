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
          视频指导
        </jereh-button>
      </el-col>
    </el-row>
    <!-- 基础信息 -->
    <div class="mb-20">
      <h3>基础信息</h3>
      <el-tabs v-model="editableTabsValue" type="card">
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
          <!-- 设备交付 -->
          <div v-show="editableTabsValue == 1">
            <div class="tab-two-row">
              <div class="tab-one-col">
                <span>项目编码分项：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>产品编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>产品名称：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>客户名称：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>售后区域：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>交付负责人：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>市场负责人：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>服务编号：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>调研问卷编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
            </div>
          </div>
          <!-- 框架协议 -->
          <div v-show="editableTabsValue == 2">
            <div class="tab-two-row">
              <div class="tab-one-col">
                <span>服务编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>客户名称：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>服务地点：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>售后区域：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>市场负责人：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>服务负责人：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>服务级别：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>履行总结报告：</span>
                <el-input style="width: 180px"></el-input>
              </div>
            </div>
          </div>
          <!-- 培训服务 -->
          <div v-show="editableTabsValue == 3">
            <div class="tab-two-row">
              <div class="tab-one-col">
                <span>服务编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>培训负责人：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>售后区域：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>客户名称：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>市场负责人：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>培训级别：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>设备范围：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>调研问卷编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>客户背景备注：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div
                class="tab-one-col"
                style="width: 1200px; justify-content: start"
              >
                <span style="width: 120px; text-align: right"
                  >培训课程内容：</span
                >
                <el-input style="width: 82.5%"></el-input>
              </div>
            </div>
            <h3 style="font-weight: 700; margin: 0 0 5px 0; padding: 5px 20px">
              培训内容
            </h3>
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
                width="100"
                show-overflow-tooltip
              />
              <af-table-column
                label="培训开始时间"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    class="border-none"
                    v-model="scope.row.i"
                  ></el-input>
                </template>
              </af-table-column>
              <af-table-column
                label="培训结束时间"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    class="border-none"
                    v-model="scope.row.i"
                  ></el-input>
                </template>
              </af-table-column>
              <af-table-column
                label="课程名称"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    class="border-none"
                    v-model="scope.row.i"
                  ></el-input>
                </template>
              </af-table-column>
              <af-table-column
                label="培训内容"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    class="border-none"
                    v-model="scope.row.i"
                  ></el-input>
                </template>
              </af-table-column>
              <af-table-column
                label="主讲人"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    class="border-none"
                    v-model="scope.row.i"
                  ></el-input>
                </template>
              </af-table-column>
            </el-table>
          </div>
          <!-- 问题处理 -->
          <div v-show="editableTabsValue == 4">
            <div class="tab-two-row">
              <div class="tab-one-col">
                <span>项目编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>产品编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span style="width: 150px; text-align: right">产品名称：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>客户名称：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>售后区域：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span style="width: 150px; text-align: right">服务地点：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>服务工程师：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>市场负责人：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span style="width: 150px; text-align: right"
                  >方案制定流程号：</span
                >
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>问题类型：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>类型细分：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span style="width: 150px; text-align: right">问题等级：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>问题照片：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span>工单编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div class="tab-one-col">
                <span style="width: 150px; text-align: right">服务单号：</span>
                <el-input style="width: 180px"></el-input>
              </div>
            </div>
            <div class="tab-twoo-row">
              <div class="tab-one-col">
                <span>调研问卷编码：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div
                class="tab-one-col"
                style="width: 100%; justify-content: start"
              >
                <span style="width: 17%; text-align: right">详情描述：</span>
                <el-input style="width: 100%"></el-input>
              </div>
              <div class="tab-one-col">
                <span>原因类型：</span>
                <el-input style="width: 180px"></el-input>
              </div>
              <div
                class="tab-one-col"
                style="width: 100%; justify-content: start"
              >
                <span style="width: 17%; text-align: right"
                  >其他原因说明：</span
                >
                <el-input style="width: 100%"></el-input>
              </div>
              <div
                class="tab-one-col"
                style="width: 800px; justify-content: start"
              >
                <span style="width: 17.5%; text-align: right"
                  >实际处理措施：</span
                >
                <el-input style="width: 100%"></el-input>
              </div>
            </div>
            <div class="tab-twoo-row">
              <div class="tab-one-col">
                <span>实际处理照片：</span>
                <el-input style="width: 180px"></el-input>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 复盘派工 -->
    <div class="mb-20">
      <h3>
        复盘派工
        <el-button type="primary" plain size="mini">派工</el-button>
      </h3>
      <div class="tab-one-row">
        <div class="tab-one-col">
          <span>复盘组织人：</span>
          <PersonnelBindingSelect
            style="width: 180px"
            v-model="reviewOrganizer"
            @bindingData="bindingSelectData(0, $event, 'followUpPeople')"
          />
        </div>
        <div class="tab-one-col">
          <span>派工日期：</span>
          <el-date-picker
            style="width: 200px !important"
            v-model="queryParams.createTime"
            type="datetime"
            placeholder="请选择派工日期"
            value-format="yyyy-MM-dd"
          />
        </div>
        <div class="tab-one-col" style="width: 400px">
          <span>报告提交截止日期：</span>
          <el-date-picker
            style="width: 250px !important"
            v-model="queryParams.createTime"
            type="datetime"
            placeholder="请选择报告提交截止日期"
            value-format="yyyy-MM-dd"
          />
        </div>
      </div>
    </div>
    <!-- 复盘资料准备 -->
    <div class="mb-20">
      <h3>
        复盘资料准备
        <el-button type="primary" plain size="mini">发起审批</el-button>
      </h3>
      <div
        class="tab-one-col"
        style="
          width: 100%;
          justify-content: start;
          margin-left: 20px;
          margin-bottom: 15px;
        "
      >
        <span>复盘背景：</span>
        <el-input type="textarea" style="width: 90%"></el-input>
      </div>
      <div
        class="tab-one-col"
        style="
          width: 100%;
          justify-content: start;
          margin-left: 20px;
          align-items: start;
        "
      >
        <span style="margin-top: 5px">复盘材料：</span>
        <span>
          <div style="display: flex; align-items: center;position:relative;">
            <!-- <el-button
              type="primary"
              plain
              icon="el-icon-upload2"
              size="mini"
              @click="uploadFile"
              >上传文件</el-button
            > -->
            <FileUpload
              :buttonName="fileUploadButtonName"
              :value="requestAttachment"
              @input="accessoryFileUpload"
              :isShowTip="false"
              :fileType="[
                'doc',
                'xls',
                'ppt',
                'txt',
                'pdf',
                'png',
                'jpg',
                'jpeg',
              ]"
            />
            <!-- @click="updata(0)" -->
            <el-button style="position:absolute;top:0;left:120px" type="primary" plain icon="el-icon-download" size="mini"
              >模板下载</el-button
            >
            <div style="display: flex; align-items: center;position:absolute;top:-5px;left:300px;width:400px;">
              主任工程师：
              <PersonnelBindingSelect
                v-model="engineerCharge"
                @bindingData="bindingSelectData(3, $event, 'followUpPeople')"
              />
            </div>
          </div>
          <div style="margin: 5px 0; color: #797979; font-size: 13px">
            支持扩展名：.rar .zip .doc .docx .pdf .jpg...
          </div>
          <div style="display: flex; margin-top: 20px">
            <div
              @mouseenter="moveIn(index, 0)"
              @mouseleave="moveOut(index, 0)"
              class="flie_item"
              :style="{ backgroundColor: item.check ? '#e7f0fe' : '' }"
              v-for="(item, index) in reviewMaterialFileList"
              :key="index"
            >
              <img src="@/assets/images/file.png" alt="" />
              <div style="margin: 10px 0; cursor: default; text-align: center">
                {{ item.name }}
              </div>
              <div v-if="item.check" class="handle_adjunct">
                <div class="load_adjunct" @click="preView(1, item, 0)">
                  下载
                </div>
                <div
                  class="load_adjunct"
                  style="background-color: red"
                  @click="delFile(item, index, 0)"
                >
                  删除
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
    <!-- 复盘资料审核 -->
    <div class="mb-20">
      <h3>
        复盘资料审核
        <el-button type="primary" plain size="mini">提交</el-button>
      </h3>
      <div class="tab-two-row">
        <div class="tab-one-col" style="justify-content: end">
          <span>审批人：</span>
          <el-input style="width: 220px"></el-input>
        </div>
        <div class="tab-one-col" style="width: 350px">
          <span>审批日期：</span>
          <el-date-picker
            style="width: 250px !important"
            v-model="queryParams.createTime"
            type="datetime"
            placeholder="请选择审批日期"
            value-format="yyyy-MM-dd"
          />
        </div>
        <div class="tab-one-col" style="width: 400px">
          <span>审批操作：</span>
          <el-radio v-model="radio" label="0">通过</el-radio>
          <el-radio v-model="radio" label="1">退回修改</el-radio>
        </div>
        <div class="tab-one-col" style="width: 1280px; justify-content: start">
          <span style="width: 87px">审批意见：</span>
          <el-input type="textarea" style="width: 100%"></el-input>
        </div>
      </div>
    </div>
    <!-- 复盘执行 -->
    <div class="mb-20">
      <h3>
        复盘执行
        <el-button type="primary" plain size="mini">发送邮件</el-button>
      </h3>
      <div class="tab-one-row">
        <div class="tab-one-col">
          <span>计划参与人员：</span>
          <!-- <el-input style="width: 180px"></el-input> -->
          <PersonnelBindingSelect
            style="width: 180px"
            v-model="planParticipator"
            @bindingData="bindingSelectData(1, $event, 'followUpPeople')"
          />
        </div>
        <div class="tab-one-col">
          <span>计划日期：</span>
          <el-date-picker
            style="width: 200px !important"
            v-model="queryParams.createTime"
            type="datetime"
            placeholder="请选择计划日期"
            value-format="yyyy-MM-dd"
          />
        </div>
        <div class="tab-one-col" style="width: 400px">
          <span>实际执行日期：</span>
          <el-date-picker
            style="width: 250px !important"
            v-model="queryParams.createTime"
            type="datetime"
            placeholder="请选择实际执行日期"
            value-format="yyyy-MM-dd"
          />
        </div>
      </div>
      <div
        class="tab-one-col"
        style="
          width: 100%;
          justify-content: start;
          margin-left: 20px;
          align-items: start;
        "
      >
        <span style="margin-top: 5px">复盘会议签到表：</span>
        <span>
          <div>
            <!-- <el-button type="primary" plain icon="el-icon-upload2" size="mini"
              >上传文件</el-button
            > -->
            <FileUpload
              :buttonName="fileUploadButtonName"
              :value="requestAttachment"
              @input="accessoryFileUpload"
              :isShowTip="false"
              :fileType="[
                'doc',
                'xls',
                'ppt',
                'txt',
                'pdf',
                'png',
                'jpg',
                'jpeg',
              ]"
            />
            <!-- @click="updata(0)" -->
          </div>
          <div style="margin: 5px 0; color: #797979; font-size: 13px">
            支持扩展名：.rar .zip .doc .docx .pdf .jpg...
          </div>
        </span>
      </div>
      <div style="position: relative; margin: 20px 0">
        <jereh-button
          style="position: absolute; right: 0px; top: -35px"
          type="primary"
          plain
          size="mini"
          @click="addSpot(0)"
          v-hasPermi="['app:update:export']"
        >
          新增
        </jereh-button>
        <el-table v-loading="loading" :data="lightSpotList" border>
          <af-table-column
            label="序号"
            align="center"
            type="index"
            width="100"
            show-overflow-tooltip
          />
          <af-table-column label="亮点" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input
                class="border-none"
                v-model="scope.row.content"
                placeholder="请输入"
              ></el-input>
            </template>
          </af-table-column>
          <af-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <jereh-button
                style="padding: 5px 10px"
                type="primary"
                plain
                @click="delSpot(0, scope.row.id)"
              >
                删除
              </jereh-button>
            </template>
          </af-table-column>
        </el-table>
      </div>
      <div style="position: relative; margin-top: 80px">
        <jereh-button
          style="position: absolute; right: 0px; top: -35px"
          type="primary"
          plain
          size="mini"
          @click="addSpot(1)"
          v-hasPermi="['app:update:export']"
        >
          新增
        </jereh-button>
        <el-table v-loading="loading" :data="deficiencyList" border>
          <af-table-column
            label="序号"
            align="center"
            type="index"
            width="100"
            show-overflow-tooltip
          />
          <af-table-column label="不足" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input
                class="border-none"
                v-model="scope.row.content"
                placeholder="请输入"
              ></el-input>
            </template>
          </af-table-column>
          <af-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <jereh-button
                style="padding: 5px 10px"
                type="primary"
                plain
                @click="delSpot(1, scope.row.id)"
              >
                删除
              </jereh-button>
            </template>
          </af-table-column>
        </el-table>
      </div>
      <div
        class="tab-one-col"
        style="justify-content: space-around; margin: 10px 0"
      >
        <span>是否存在决议项：</span>
        <el-radio v-model="radio" label="0">是</el-radio>
        <el-radio v-model="radio" label="1">否</el-radio>
      </div>
    </div>
    <!-- 复盘会决议项 -->
    <div class="mb-20">
      <h3 style="background-color: white">复盘会决议项</h3>
      <div style="position: relative">
        <jereh-button
          style="position: absolute; right: 0px; top: -35px"
          type="primary"
          plain
          size="mini"
          @click="addReviewDecisionItem"
          v-hasPermi="['app:update:export']"
        >
          新增
        </jereh-button>
        <el-table
          v-loading="loading"
          :data="reviewDecisionItemList"
          @selection-change="handleSelectionChange"
          border
        >
          <af-table-column
            label="序号"
            align="center"
            type="index"
            show-overflow-tooltip
          />
          <af-table-column
            label="设备类型"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-select
                class="border-none"
                v-model="scope.row.facility"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in requestStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
            <!-- <jereh-select
              v-model="requestStatusOptions"
              filterable
              ph="请选择"
              class="border-none"
            /> -->
          </af-table-column>
          <af-table-column
            label="工作项目"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-input
                class="border-none"
                v-model="scope.row.workProject"
                placeholder="请输入"
              ></el-input>
            </template>
          </af-table-column>
          <af-table-column
            label="具体要求"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-input
                class="border-none"
                v-model="scope.row.specification"
                placeholder="请输入"
              ></el-input> </template
          ></af-table-column>
          <af-table-column
            label="责任部门"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <!-- <el-select
                class="border-none"
                v-model="scope.row.dutyDep"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in depOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> -->
              <jereh-select
                v-model="scope.row.dutyDep"
                filterable
                ph="请选择"
                class="border-none"
                :dict="dict.type.itr_responsibility_dep"
              />
            </template>
          </af-table-column>
          <af-table-column label="责任人" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <PersonnelBindingSelect
                v-model="scope.row.principal"
                @bindingData="
                  bindingSelectData(2, $event, 'followUpPeople', scope.row)
                "
              />
            </template>
          </af-table-column>
          <af-table-column
            label="承诺日期"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-date-picker
                class="border-none"
                v-model="scope.row.promiseTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </af-table-column>
          <af-table-column
            label="达成日期"
            align="center"
            prop="reachTime"
            show-overflow-tooltip
          />
          <af-table-column
            label="达成情况"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div
                :style="{
                  backgroundColor:
                    scope.row.reachCondition == '已完成'
                      ? '#cef9c0'
                      : scope.row.reachCondition == '逾期'
                      ? 'pink'
                      : scope.row.reachCondition == '逾期完成'
                      ? 'yellow'
                      : '',
                }"
              >
                {{ scope.row.reachCondition }}
              </div>
            </template>
          </af-table-column>
          <af-table-column
            label="上传证明文件"
            align="center"
            show-overflow-tooltip
          >
            <jereh-button
              style="padding: 5px 10px"
              type="primary"
              plain
              @click="uploadFile"
            >
              上传
            </jereh-button>
          </af-table-column>
          <af-table-column
            label="操作"
            align="center"
            class-name="mini-padding fixed-width"
            fixed="right"
            width="130"
          >
            <template slot-scope="scope">
              <jereh-button
                style="padding: 5px 10px"
                type="primary"
                plain
                @click="toReviewDetail(scope.row)"
              >
                催办
              </jereh-button>
              <jereh-button
                style="padding: 5px 10px"
                type="primary"
                plain
                @click="delReviewDecisionItem(scope.row)"
              >
                删除
              </jereh-button>
            </template>
          </af-table-column>
        </el-table>
      </div>
    </div>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 上传文件对话框 -->
    <el-dialog
      title="上传文件"
      :visible.sync="dialogOfUpload"
      :append-to-body="true"
      width="35%"
      style="text-align: center; postion: relative"
    >
      <!--accept=".pdf"  -->
      <el-upload
        class="upload-demo"
        action="#"
        drag
        multiple
        :auto-upload="false"
        :file-list="fileList"
        :on-change="handleChange"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传PDf格式文件</div>
      </el-upload>
      <el-card
        shadow="never"
        class="custom-card mad-space-t-md"
        v-show="fileList.length > 0"
      >
        <div slot="header" class="flex-row-between">
          <span class="text-size-md font-black">
            <i class="iconfont icon-list font-blue mad-space-r-sm"></i
            >附件列表</span
          >
          <span
            >共
            <span class="font-blue pad-space-rl-sm">{{ fileList.length }}</span>
            个附件</span
          >
        </div>
        <div class="file-item" v-for="(item, index) in fileList" :key="index">
          <span style="text-align: left" class="ellipsis"
            ><i class="iconfont icon-link"></i>{{ item.name }}</span
          >
          <span style="text-align: left">{{ sizeTostr(item.size) }}</span>
          <span>{{ item.creator }}</span>

          <span class="file-item-status">
            <span> <i class="el-icon-check"></i></span>
            <span class="file-item-del" @click="handleRemove(item)">
              <i class="el-icon-close"></i
            ></span>
          </span>
        </div>
      </el-card>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogOfUpload = false">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload()"
          element-loading-text="正在上传..."
          >上 传</el-button
        >
      </div>
    </el-dialog>
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
export default {
  components: { PersonnelBindingSelect },
  dicts: ["itr_responsibility_dep"],
  data() {
    return {
      fileUploadButtonName:'上传文件',
      requestAttachment:undefined,
      // 主任工程师
      engineerCharge: undefined,
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
      id: 0,
      // 亮点列表
      lightSpotList: [{ id: 0, content: undefined }],
      // 不足列表
      deficiencyList: [{ id: 0, content: undefined }],
      // 表格数据
      reviewDecisionItemList: [
        {
          id: 0,
          facility: "压裂",
          workProject: undefined,
          specification: undefined,
          dutyDep: "研发",
          principal: "李四（1941）",
          promiseTime: "2022-12-21",
          reachTime: "2022-10-27",
          reachCondition: "已完成",
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
      requestStatusOptions: [
        { label: "压裂", value: "压裂" },
        { label: "混砂", value: "混砂" },
      ],
      depOptions: [
        { label: "研发", value: "研发" },
        { label: "生产", value: "生产" },
      ],
      reviewOrganizer: undefined,
      planParticipator: undefined,
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
          title: "框架协议",
          name: "2",
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
      radio: "0",
      dialogOfUpload: false,
      fileList: [],
      reviewMaterialFileList: [],
    };
  },
  created() {
    // this.getList()
  },
  methods: {
    /** 查询手持端更新列表 */
    getList() {
      this.loading = true;
      listUpdate(this.queryParams).then((response) => {
        this.updateList = response.rows;
        this.total = response.total;
        this.loading = false;
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
    toReviewDetail() {
      this.$router.push({
        path: "/cmms/commonModel/reviewDetail",
      });
    },
    addReviewDecisionItem() {
      this.id = this.id + 1;
      let obj = {
        id: this.id,
        facility: undefined,
        workProject: undefined,
        specification: undefined,
        dutyDep: undefined,
        principal: undefined,
        promiseTime: undefined,
        reachTime: "2022-10-27",
        reachCondition: "",
      };
      this.reviewDecisionItemList.push(obj);
    },
    delReviewDecisionItem(row) {
      this.reviewDecisionItemList.map((it, index) => {
        if (it.id == row.id) {
          this.$modal
            .confirm("是否确认删除第" + (index + 1) + "项复盘决议项的数据项？")
            .then(() => {
              this.$modal.msgSuccess("删除成功");
              return this.reviewDecisionItemList.splice(index, 1);
            })
            .catch(() => {});
        }
      });
    },
    addSpot(type) {
      console.log(type, "添加类型");
      this.id = this.id + 1;
      let obj = {
        id: this.id,
        content: undefined,
      };
      if (type == 0) {
        this.lightSpotList.push(obj);
      } else {
        this.deficiencyList.push(obj);
      }
    },
    delSpot(type, id) {
      console.log(id, "索引");
      if (type == 0) {
        this.lightSpotList.map((it, index) => {
          if (it.id == id) {
            this.$modal
              .confirm("是否确认删除第" + (index + 1) + "项亮点的数据项？")
              .then(() => {
                this.$modal.msgSuccess("删除成功");
                return this.lightSpotList.splice(index, 1);
              })
              .catch(() => {});
          }
        });
      } else {
        this.deficiencyList.map((it, index) => {
          if (it.id == id) {
            this.$modal
              .confirm("是否确认删除第" + (index + 1) + "项不足的数据项？")
              .then(() => {
                this.$modal.msgSuccess("删除成功");
                return this.deficiencyList.splice(index, 1);
              })
              .catch(() => {});
          }
        });
      }
    },
    // 人员控件
    bindingSelectData(type, e, row, item) {
      if (type == 0) {
        this.reviewOrganizer = e[0];
      } else if (type == 1) {
        this.planParticipator = e[0];
      } else if (type == 2) {
        console.log(item, "责任人");
        this.reviewDecisionItemList.map((it, index) => {
          if (it.id == item.id) {
            it.principal = e[0];
          }
        });
      } else {
        this.engineerCharge = e[0];
      }
      // console.log(e,'选择人员');
      this.$set(this, row, e.join(","));
    },
    // 打开上传文件弹窗
    uploadFile() {
      this.dialogOfUpload = true;
    },
    handleChange(file) {
      file.check = false;
      console.log(file);
      this.fileList.push(file);
    },
    // 移除上传文件
    handleRemove(file) {
      console.log(file, "删除");
      this.fileList.map((it, index) => {
        if (it.uid == file.uid) {
          this.fileList.splice(index, 1);
        }
      });
    },
    // 确认上传文件
    confirmUpload() {
      let files = JSON.parse(JSON.stringify(this.fileList));
      this.reviewMaterialFileList.push(...files);
      this.$message.success("文件上传成功");
      this.fileList = [];
      this.dialogOfUpload = false;
      console.log(this.fileList, this.reviewMaterialFileList);
    },

    // 文件显示/不显示 下载预览
    moveIn(index, type) {
      // console.log("进来了", index, type);
      if (type == 0) {
        // console.log(this.desFiles[index].check, "检测");
        this.reviewMaterialFileList[index].check = true;
      } else if (type == 1) {
        this.adjunct[index].check = true;
      } else {
        this.desAdjFlies[index].check = true;
      }
    },
    moveOut(index, type) {
      if (type == 0) {
        this.reviewMaterialFileList[index].check = false;
      } else if (type == 1) {
        this.adjunct[index].check = false;
      } else {
        this.desAdjFlies[index].check = false;
      }
    },
    // 下载/预览文件
    preView(type, item, dirType) {
      console.log("下载/预览==》", item);
      let fileType = "";
      // 下载
      // getFileStream({ id: item.id, type: 0, isPreview: type }).then(
      //   (response) => {
      //     if (
      //       item.name.indexOf(".jpg") != -1 ||
      //       item.name.indexOf(".jpeg") != -1
      //     ) {
      //       console.log("是图片jpg");
      //       fileType = "image/jpeg";
      //     } else if (item.name.indexOf(".pdf") != -1) {
      //       console.log("是pdf文件");
      //       fileType = "application/pdf";
      //     } else if (item.name.indexOf(".png") != -1) {
      //       console.log("是图片png");
      //       fileType = "image/png";
      //     }
      //     console.log("fileType---", fileType);
      //     let blob = new Blob([response], { type: fileType }); // response就是接口返回的文件流
      //     let objectUrl = URL.createObjectURL(blob);
      //     if (type == 0) {
      //       window.open(window.URL.createObjectURL(blob));
      //     } else {
      //       const link = document.createElement("a"); //创建a标签
      //       link.href = objectUrl;
      //       link.download = item.name; // 文件名
      //       link.click(); // 下载文件
      //       URL.revokeObjectURL(objectUrl); // 释放内存
      //       this.parentId = item.parentId
      //       if (dirType == 1) {
      //         this.parentName = '设计文件附件'
      //         this.dirRoot = '设计文件附件'
      //       }else if (this.fileUploadType == 2) {
      //         this.parentName = '牵头单位附件'
      //         this.dirRoot = '牵头单位附件'
      //       }
      //       this.saveOrUpdateDesignDrawLog(4, item);
      //     }
      //   }
      // );
    },
    // 删除文件
    delFile(item, index, type) {
      const h = this.$createElement;
      this.$msgbox({
        title: "删除文件提示",
        message: h("p", null, [
          h("span", null, "确认删除 "),
          h("i", { style: "color: red" }, item.name),
          h("span", null, " 文件吗？"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            done();
          } else {
            done();
          }
        },
      })
        .then((action) => {
          let data = {
            fileId: item.fileDataId,
            id: item.id,
          };
          // delFile(data).then((res) => {
          //   console.log(res, "删除结果");
          //   if (res.rtnCode == 200) {
          //     this.$message.success("删除文件成功");
          if (type == 0) {
            this.reviewMaterialFileList.splice(index, 1);
          } else if (type == 1) {
            this.desAdjFlies.splice(index, 1);
            this.parentId = item.parentId;
            this.parentName = "设计文件附件";
            this.dirRoot = "设计文件附件";
          } else if (type == 2) {
            this.adjunct.splice(index, 1);
            this.parentId = item.parentId;
            this.parentName = "牵头单位附件";
            this.dirRoot = "牵头单位附件";
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    // 文件大小转换
    sizeTostr(size) {
      let data = "";
      if (!size && size == "") {
        return;
      }
      if (size < 0.1 * 1024) {
        //如果小于0.1KB转化成B
        data = size.toFixed(2) + "B";
      } else if (size < 1 * 1024 * 1024) {
        //如果小于0.1MB转化成KB
        data = (size / 1024).toFixed(2) + "KB";
      } else if (size < 1 * 1024 * 1024 * 1024) {
        //如果小于0.1GB转化成MB
        data = (size / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        //其他转化成GB
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }
      let sizestr = data + "";
      let len = sizestr.indexOf(".");
      let dec = sizestr.substr(len + 1, 2);
      if (dec == "00") {
        //当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
      }
      return sizestr;
    },
    accessoryFileUpload(value) {
      this.requestAttachment = value;
    },
  },
};
</script>
<style scoped>
h3 {
  font-weight: 700;
  background-color: #f2f2f2;
  margin: 0 0 5px 0;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}
h3 .el-button {
  margin-left: 10px;
}
.mb-20 {
  margin-bottom: 20px;
}
.tab-two-row {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 400px 400px;
  grid-auto-flow: row dense;
  grid-gap: 5px;
  grid-auto-rows: 50px;
  justify-content: center;
}
.tab-twoo-row {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 800px;
  grid-auto-flow: row dense;
  grid-gap: 5px;
  grid-auto-rows: 50px;
  justify-content: center;
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
.flie_item {
  padding: 10px 20px;
  height: 100%;
  position: relative;
  text-align: center;
}
.handle_adjunct {
  position: absolute;
  background-color: pink;
  left: 25%;
  top: 13%;
  color: #fff;
  box-shadow: 0px 1px 5px 0px #6e6e6f;
}
.load_adjunct {
  padding: 6px 15px;
  background-color: #4d98f9;
  cursor: pointer;
  border: 1px solid #d8d8d800;
}
.load_adjunct:hover {
  border: 1px solid #dadada;
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