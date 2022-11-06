<template>
  <div class="out-container">
    <el-row>
      <div class="form-label">核心指标：</div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="问题响应时间">
          <el-input
            v-model="formInline.centerminute"
            placeholder="审批人"
          ></el-input>
        </el-form-item>

        <el-form-item label="问题解决时间">
          <el-input
            v-model="formInline.centerday"
            placeholder="审批人"
          ></el-input>
        </el-form-item>

        <el-form-item label="核心配件供应时间">
          <el-input
            v-model="formInline.supplyday"
            placeholder="审批人"
          ></el-input>
        </el-form-item>

        <el-form-item label="安全运行时间">
          <el-input
            v-model="formInline.executeday"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域">
    <el-select v-model="formInline.region" placeholder="活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item> -->
      </el-form>
    </el-row>

    <el-row>
      <div class="form-label">本月问题处理:</div>
      <el-form :inline="true" :model="monthForm" class="demo-form-inline">
        <el-form-item label="本月交付设备">
          <el-input v-model="monthForm.deviceNum"></el-input>
        </el-form-item>

        <el-form-item label="本月问题处理">
          <el-input
            v-model="monthForm.problemNum"
            placeholder="审批人"
          ></el-input>
        </el-form-item>

        <el-form-item label="远程诊断">
          <el-input
            v-model="monthForm.distanceNum"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域">
    <el-select v-model="formInline.region" placeholder="活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item> -->
      </el-form>
    </el-row>

    <el-row>
      <div class="form-label">人员经验:</div>
      <el-form
        :inline="true"
        :model="humanExperienceForm"
        class="demo-form-inline"
      >
        <el-form-item label=">10年">
          <el-input v-model="humanExperienceForm.bigten"></el-input>
        </el-form-item>

        <el-form-item label="5-10年">
          <el-input v-model="humanExperienceForm.mediumTen"></el-input>
        </el-form-item>

        <el-form-item label="<3年">
          <el-input v-model="monthForm.littleThree"></el-input>
        </el-form-item>

        <el-form-item label="3-5年">
          <el-input v-model="monthForm.mediumThree"></el-input>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row>
      <div class="form-label">任职资格：</div>

      <el-form :inline="true" :model="qualityForm" class="demo-form-inline">
        <el-form-item label="初级">
          <el-input v-model="qualityForm.primary"></el-input>
        </el-form-item>

        <el-form-item label="中级">
          <el-input v-model="qualityForm.medium"></el-input>
        </el-form-item>

        <el-form-item label="高级">
          <el-input v-model="qualityForm.junior"></el-input>
        </el-form-item>

        <el-form-item label="主任">
          <el-input v-model="qualityForm.director"></el-input>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row>
      <div class="form-label">设备服务年限：</div>

      <el-form :inline="true" :model="deviceYearForm" class="demo-form-inline">
        <el-form-item label="<1年">
          <el-input v-model="deviceYearForm.littleone"></el-input>
        </el-form-item>

        <el-form-item label="1-3年">
          <el-input v-model="deviceYearForm.mediumThree"></el-input>
        </el-form-item>

        <el-form-item label="3-5年">
          <el-input v-model="deviceYearForm.mediumThree"></el-input>
        </el-form-item>

        <el-form-item label="5-10年">
          <el-input v-model="deviceYearForm.mediumFive"></el-input>
        </el-form-item>

        <el-form-item label=">10年">
          <el-input v-model="deviceYearForm.mediumTen"></el-input>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row>
        <div class="form-label">设备状态：</div>

        <el-form :inline="true" :model="deviceStatus" class="demo-form-inline">
        <el-form-item label="交付数量">
          <el-input v-model="deviceStatus.deal"></el-input>
        </el-form-item>

        <el-form-item label="使用数量">
          <el-input v-model="deviceStatus.inuse"></el-input>
        </el-form-item>

        <el-form-item label="改造数量">
          <el-input v-model="deviceStatus.change"></el-input>
        </el-form-item>

      </el-form>
    </el-row>

    <el-row style="text-align:right">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        centerminute: "",
        centerday: "",
        supplyday: "",
        executeday: "",
      },
      monthForm: {
        deviceNum: 0,
        problemNum: 0,
        distanceNum: 0,
      },
      humanExperienceForm: {
        bigten: 0,
        mediumTen: 0,
        littleThree: 0,
        mediumThree: 0,
      },
      qualityForm: {
        primary: "",
        medium: "",
        junior: "",
        director: "",
      },
      deviceYearForm: {
        littleone: "",
        mediumone: "",
        mediumThree: "",
        mediumFive: "",
        bigTen: "",
      },
      deviceStatus: {
        deal: "",
        inuse: "",
        change: "",
      },
    };
  },
};
</script>

<style>
.out-container {
  padding: 50px;
}
.out-container .form-label {
  padding: 10px 0 10px 0;
  font-size:16px;
}
</style>