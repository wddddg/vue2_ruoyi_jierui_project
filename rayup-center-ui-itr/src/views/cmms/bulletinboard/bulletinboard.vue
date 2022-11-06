<template>
  <div class="main-body">
    <div class="title">
      <div>
        <img
          src="../../../assets/logo.png"
          alt="logo"
          class="title-left-logo"
        />
      </div>
      <div class="middle-title">
        杰瑞装备服务可视化看板
        <span> 以客户为中心,用心感动客户 </span>
      </div>
      <div></div>
    </div>

    <div class="main-contain">
      <div class="left">
        <div class="centerindex">
          <img src="../../../assets/centerindex.png" />
          <div class="four-item">
            <div>
              <img class="left-image" src="../../../assets/phone.png" />

              <span class="out-title">
                {{ centerform.minute }} <span class="time">分钟</span></span
              >
              <br />
              <div class="bottom-line">问题响应</div>
            </div>

            <div>
              <img class="left-image"  src="../../../assets/note.png" />

              <span class="out-title">
                {{ centerform.dealday }} <span class="time">天</span></span
              >
              <br />
              <div class="bottom-line">问题解决</div>
            </div>
            <div>
              <img class="left-image"  src="../../../assets/zip.png" />
              <span class="out-title">
                {{ centerform.supplyDay }} <span class="time">天</span></span
              >
              <br />
              <div class="bottom-line">核心配件供应</div>
            </div>
            <div>
              <img class="left-image" src="../../../assets/security.png" />
              <span class="out-title"
                >{{ centerform.exexuteday }} <span class="time">天</span></span
              >
              <br />
              <div class="bottom-line">安全运行</div>
            </div>
          </div>
        </div>
        <div class="experience">
          <img src="../../../assets/experience.png" />
          <div class="four-item" style="flex-wrap:wrap">

            <div>
              <gauge-card :scoreName="scoreone"></gauge-card>

              <div class="bottom-year">>10年</div>
            </div>

            <div>
              <gauge-card :scoreName="scoretwo"></gauge-card>
              <div class="bottom-year">5-10年</div>
            </div>

            <div>
              <gauge-card :scoreName="scorethree"></gauge-card>
             <div class="bottom-year"> < 3年 </div>
            </div>

            <div>
              <gauge-card :scoreName="scorefour"></gauge-card>
              <div class="bottom-year"> 3-5年 </div>
            </div>

          </div>
        </div>
        <div class="quality">
          <img src="../../../assets/quality.png" />
          <bar-chart
            height="120px"
            :xGroup="exployeeGroup"
            :yGroup="exployeeArray"
          />
        </div>
        <div class="devicetime">
          <img src="../../../assets/devicetime.png" />
          <!-- <device-card></device-card> -->
          <bar-chart-line
            height="140px"
            :yGroup="serviceCategory"
            :xGroup="serviceValue"
          ></bar-chart-line>
        </div>
        <div class="devicestatus">
          <img src="../../../assets/devicestatus.png" />
          <bar-chart-line
            height="100px"
            :yGroup="deviceCategory"
            :xGroup="deviceValue"
          ></bar-chart-line>
          <!-- <box-card
            :height="chartHeight"
            :width="chartWidth"
            :scoreName="scoreName"
          /> -->
        </div>
      </div>
      <div class="center">
        <div class="top-bar">
          <div class="left">
            <div>
              {{ countryNum }}+ <span>国家</span>
              <div class="bottom">服务足迹</div>
            </div>
            <div>
              {{ customNum }}+ <span>客户</span>
              <div class="bottom">提供服务</div>
            </div>
            <div>
              {{ deviceNum }}+ <span>设备</span>
              <div class="bottom">实现增值</div>
            </div>
          </div>
          <div class="right">
            <div>
              {{ engineerNum }}+
              <div class="bottom">服务工程师</div>
            </div>
            <div>
              {{ station }}+
              <div class="bottom">售后服务站</div>
            </div>
            <div>
              {{ professionNum }}+<span>亿</span>
              <div class="bottom">专业配件储备</div>
            </div>
          </div>
        </div>

        <!-- <img src="@/assets/backmap.png"/> -->
        <div class="bottom-bar">
          <div></div>
          <div class="device-program">
            <div>
              <img src="../../../assets/left.png" class="bottom-image" />
              分支机构
            </div>
            <div>
              <img src="../../../assets/right.png" class="bottom-image" />办事处
            </div>
          </div>
          <div>
            <div class="month-title">9月</div>
            <div class="device-rate">
              <div>
                <div>8台</div>
                <div>已交付</div>
              </div>
              <div>
                <div>20 项</div>
                <div>问题处理</div>
              </div>
              <div>
                <div>3 次</div>
                <div>问题处理</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="custom">
          <img src="../../../assets/custom.png" />
          <div class="custom-title">2021年度 {{ yearScore }}分</div>
          <div style="text-align: center; margin-top: 30px">
            <img src="../../../assets/buble.png" />
          </div>
          <div style="text-align: center; margin-top: 25px">
            <img src="../../../assets/crashcar.png" />
          </div>
        </div>
        <div class="prizeletter">
          <img src="../../../assets/prizeletter.png" />
          <el-carousel indicator-position="outside">
            <el-carousel-item
              v-for="item in 4"
              :key="item"
              style="margin: 20px 30px 0 30px"
            >
              <img src="../../../assets/prizeletter pic.png" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="honor">
          <img src="../../../assets/honor.png" />
          <el-carousel
            indicator-position="outside"
            style="height: 211px; margin: 20px"
            direction="vertical"
          >
            <el-carousel-item v-for="item in 4" :key="item">
              <img src="../../../assets/honorpic.png" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
import gaugeCard from "./components/gaugeCard";
import BarChart from "./dashboard/BarChart";
import barChartLine from "./dashboard/barChartLine";
import LineChart from "./dashboard/LineChart";
export default {
  name: "bulletinboard",
  data() {
    return {
      logo,
      countryNum: 10,
      customNum: 10,
      deviceNum: 10,
      engineerNum: 20,
      station: 10,
      professionNum: 30,
      centerform: {
        minute: 10,
        dealday: 4.37,
        supplyDay: 5,
        exexuteday: 500,
      },
      chartHeight: "50px",
      chartWidth: "100px",
      scoreName: ">10年",
      exployeeGroup: ["初级", "中级", "高级", "主任"],
      exployeeArray: [26, 48, 22, 2],
      serviceCategory: ["<1年", "1-3年", "3-5年", "5-10年", ">10年"],
      serviceValue: [0.5, 35.51, 29.41, 8.68, 6],
      deviceCategory: ["交付", "使用", "改造"],
      deviceValue: [49, 37, 13],
      yearScore: 91.38,
      scoreone: 24.84,
      scoretwo: 10.46,
      scorethree: 48.37,
      scorefour: 16.34,
    };
  },
  components: {
    gaugeCard,
    BarChart,
    LineChart,
    barChartLine,
  },
};
</script>

<style scoped>
.main-body {
  /* background: #030504; */
  /* overflow: scroll; */
  width: 100%;
  height: auto;
  background-image: url("../../../assets/backmap.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: scroll;
  padding: 20px;
}
.title {
  height: 84px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-image: url("../../../assets/titleline.png");
  background-repeat: no-repeat;
  background-position: bottom;
}
.title-left-logo {
  width: 143px;
  height: 36px;
  margin-top: 30px;
  margin-left: 40px;
}
.middle-title {
  padding-top: 30px;
  font-size: 30px;
  color: #fff; /* background: url() */
}
.middle-title span {
  font-size: 20px;
}

.main-contain {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.main-contain .left {
  padding-top: 30px;
}
.main-contain .right {
  padding-top: 30px;
}
.main-contain .center {
  position: relative;
}
.main-contain .center .top-bar {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}
.main-contain .center .bottom-bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.main-contain .center .bottom-bar .device-program {
  width: 200px;
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.main-contain .center .bottom-bar .device-program .bottom-image {
  position: relative;
  top: 10px;
  right: 5px;
}
.main-contain .center .bottom-bar .month-title {
  width: 60px;
  height: 30px;
  padding: 5px 10px 5px 10px;
  background: #041e2c;
  opacity: 0.8;
}
.main-contain .center .bottom-bar .device-rate {
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 60px;
  padding-left: 10px;
  background: #041e2c;
  opacity: 0.8;
}
.main-contain .center .bottom-bar .device-rate > div {
  width: 100px;
  border-style: dashed;
  border-left-width: 3px;
  border-top-width: 0px;
  border-bottom-width: 0px;
  border-right-width: 0px;
  padding: 10px;
  /* border-left-width:15px; */
}
.main-contain .center .left {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 538px;
  height: 100px;
  background: #041e2c;
  opacity: 0.8;
  padding-left: 50px;
  padding-right: 65px;
  font-size: 27px;
  color: #fff;
  margin-right: 20px;
}
.main-contain .center .left span {
  font-size: 12px;
  color: #02bfc1;
}
.main-contain .center .left .bottom {
  font-size: 12px;
  color: #02bfc1;
}

.main-contain .center .right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 540px;
  height: 100px;
  background: #041e2c;
  opacity: 0.8;
  padding-left: 50px;
  padding-right: 65px;
  font-size: 27px;
  color: #fff;
}
.main-contain .center .right span {
  font-size: 12px;
  color: #02bfc1;
}

.main-contain .center .right .bottom {
  font-size: 12px;
  color: #02bfc1;
}

.main-contain .center .right .bottom-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
}

.main-contain .left .centerindex {
  /* background-image: url("../../../assets/centerindex.png"); */
  background-color: #041e2c;
  opacity: 0.8;
  height: 250px;
  width: 284px;
  color: #90a1a6;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position-y: 0;
}
.main-contain .left .centerindex .four-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.main-contain .left .centerindex .four-item .left-image{
  position:relative;
  width:30px;
  height:30px;
  left:10px;
}

.main-contain .left .centerindex .four-item div .bottom-year{
  text-align: center;
}
.main-contain .left .centerindex .four-item div {
  width: 100px;
  height: 82px;
  margin: 10px;
  font-size: 15px;
}
.main-contain .left .centerindex .four-item div .out-title {
  position: relative;
  left: 10px;
  bottom: 5px;
  color: #01f4f5;
  font-weight: bold;
  font-size: 20px;
}
.main-contain .left .centerindex .four-item div .out-title img {
  width: 20px;
  height: 20px;
}
.main-contain .left .centerindex .four-item div .out-title .time {
  color: #01f4f5;
  font-size: 10px;
}
.main-contain .left .centerindex .four-item div .bottom-line {
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  margin-top: 15px;
}
.main-contain .left .devicestatus {
  background-color: #041e2c;
  opacity: 0.8;
  height: 126px;
  width: 284px;
  color: #90a1a6;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position-y: 0;
}
.main-contain .left .devicetime {
  background-color: #041e2c;
  opacity: 0.8;
  height: 168px;
  width: 284px;
  color: #90a1a6;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position-y: 0;
}

.main-contain .left .experience {
  background-color: #041e2c;
  opacity: 0.8;
  height: 190px;
  width: 284px;
  color: #90a1a6;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position-y: 0;
}
.main-contain .left .experience .four-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top:10px
}


.main-contain .left .experience .four-item .bottom-year{
  font-size:12px;
  text-align: center;
  position: relative;
  bottom:10px;
}

.main-contain .right .custom {
  background-color: #041e2c;
  opacity: 0.8;
  height: 378px;
  width: 326px;
  color: #90a1a6;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position-y: 0;
}
.main-contain .right .custom .custom-title {
  margin-left: 35px;
  margin-top: 23px;
  /* margin-top:10px;
margin-left:20px;
margin-bottom:10px; */
}
.main-contain .right .honor {
  background-color: #041e2c;
  opacity: 0.8;
  height: 286px;
  width: 326px;
  color: #90a1a6;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position-y: 0;
}
.main-contain .right .prizeletter {
  background-color: #041e2c;
  opacity: 0.8;
  height: 226px;
  width: 326px;
  color: #90a1a6;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position-y: 0;
}
.main-contain .left .quality {
  background-color: #041e2c;
  opacity: 0.8;
  height: 144px;
  width: 284px;
  color: #90a1a6;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position-y: 0;
}
.main-contain .left .containereight {
  background-color: #041e2c;
  opacity: 0.8;
  height: 250px;
  width: 284px;
  color: #90a1a6;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position-y: 0;
}
/* .middle-title{
   padding
} */
</style>
