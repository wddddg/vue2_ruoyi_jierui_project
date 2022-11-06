<template>
  <div class="grid-container">
    <div class="grid-item one">
      <span class="header">绩效数据</span>
      <div class="grid-one">
        <el-card class="blue child-one" shadow="never">
          <div class="card-one">
            <div >
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">个</span>
            </div>
            <div style="opacity:0.9 ">全部工单</div>
          </div>
        </el-card>
        <el-card class="orange child-one" shadow="never">
          <div class="card-one">
            <div>
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">个</span>
            </div>
            <div style="opacity:0.9 ">待处理</div>
          </div>
        </el-card>
        <el-card class="purple child-one" shadow="never">
          <div class="card-one">
            <div>
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">个</span>
            </div>
            <div style="opacity:0.9 ">处理中</div>
          </div>
        </el-card>
        <el-card class="green child-one" shadow="never">
          <div class="card-one">
            <div>
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">个</span>
            </div>
            <div style="opacity:0.9 ">已验收</div>
          </div>
        </el-card>
        <el-card class="pink child-one" shadow="never">
          <div class="card-one">
            <div>
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">个</span>
            </div>
            <div style="opacity:0.9 ">已关闭</div>
          </div>
        </el-card>
        <el-card class="blue child-one" shadow="never">
          <div class="card-one">
            <div>
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">台</span>
            </div>
            <div style="opacity:0.9 ;">累计交付设备</div>
          </div>
        </el-card>
        <el-card class="orange child-one" shadow="never">
          <div class="card-one">
            <div>
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">台</span>
            </div>
            <div style="opacity:0.9 ">年度已交付设备</div>
          </div>
        </el-card>
        <el-card class="purple child-one" shadow="never">
          <div class="card-one">
            <div>
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">台</span>
            </div>
            <div style="opacity:0.9 ">待交付设备</div>
          </div>
        </el-card>
        <el-card class="green child-one" shadow="never">
          <div class="card-one">
            <div>
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">台</span>
            </div>
            <div style="opacity:0.9 ">交付中设备</div>
          </div>
        </el-card>
        <el-card class="pink child-one" shadow="never">
          <div class="card-one">
            <div>
              <img  :src="biaoqian" style="margin-bottom: -3px;"/>
              <el-link><span class="order-num">{{ '56' }}</span></el-link>
              <span class="order-unit">台</span>
            </div>
            <div style="opacity:0.9 ">保外设备</div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="grid-item two">
      <div class="child-two">
        <div class="avatar-two">
          <el-avatar src="https://img1.baidu.com/it/u=531394333,3461351651&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200" :size="80"></el-avatar>
        </div>
        <div class="grandchild-two">
          <div class="column-two">
            <div>职位：<span class="jereh-orange">{{ "服务工程师" }}</span></div>
            <div>管辖区域：<span class="jereh-orange">{{ "西北" }}</span></div>
            <div>职称等级：<span class="jereh-orange">{{ "P4" }}</span></div>
            <div>技能特长：<span class="jereh-orange">{{ "爱钻研" }}</span></div>
          </div>
          <div class="content-two">
            <div>司龄：<span class="jereh-orange">{{ "8年" }}</span></div>
            <div>目前状态：<span class="jereh-orange">{{ "在线" }}</span></div>
            <div>客户评分：<span class="jereh-orange">{{ "89" }}</span></div>
            <div>签名：<span class="jereh-orange">{{ "爱拼才会赢" }}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-item three">
      <div class="header-three">
        <span class="header">我分管的设备</span>
      </div>
      <div class="content-three" style="overflow-y:auto;">
        <div class="group-three" v-for="item in 10" :key="item">
          <img  :src="wrenyuan" />
          <div class="child-three">
            <span class="child-header-three" style="opacity: 0.8;">客户一:</span><span style="font-weight: 600;">8套设备</span>
            <el-progress :percentage="customerOne" :show-text="false"></el-progress>
          </div>
          <span>占总数的3%</span>
        </div>
      </div>
    </div>
    <div class="grid-item four">
      <div class="content-four">
        <div class="progress-four">
          <span class="header">我的设备交付</span>
          <el-progress type="circle" :percentage="75"></el-progress>
          <div>所在区域设备<span class="order-num">118</span></div>
          <div>我交付的设备<span class="order-num">21</span></div>
        </div>
        <div class="chart-four">
          <span class="subheader-four">具体数据展示</span>
          <div class="monthSelector" style="display:inline-block;float: right;margin-top: -4%;">
          <el-date-picker
            clearable
            v-model="showDataYear"
            type="year"
            ph="请选择月份"
            class="monthSelector"
          />
          </div>
          <div id="barChart" class="barchart-four"></div>
        </div>
      </div>
    </div>
    <div class="grid-item five">
      <div class="header-seven">
        <span class="header" style="margin-bottom: 10px">我的日历</span>
        <div>
          <jereh-button type="primary" plain round size="mini">进入</jereh-button>
        </div>
      </div>
      <div class="grid-five">
        <myCalendar></myCalendar>
      </div>
    </div>
    <div class="grid-item six">
      <span class="header">我的工单和工时</span>
      <div class="monthSelector" style="display:inline-block;float: right;margin-top: -4%;">
          <el-date-picker
            clearable
            v-model="workTime"
            type="year"
            ph="请选择月份"
            class="monthSelector"
          />
          </div>
      <div id="lineChart" class="linechart-six"></div>
    </div>
    <div class="grid-item seven">
      <div class="header-seven">
        <span class="header">我的日报</span>
        <div>
          <jereh-button type="primary" plain round size="mini">添加</jereh-button>
          <jereh-button type="primary" plain round size="mini">更多</jereh-button>
        </div>
      </div>
      <ul class="content-seven" >
        <li class="item-seven" v-for="item in 8" :key="item">
          <div style="font-weight:600">测试内容</div>
          <span style="opacity: 0.8;">{{formatDate(new Date())}}</span>
        </li>
      </ul>
    </div>
    <div class="grid-item eight">
      <div class="header-seven">
        <span class="header">重点工作</span>
        <div>
          <jereh-button type="primary" plain round size="mini">更多</jereh-button>
        </div>
      </div>
      <ul class="content-seven">
        <li class="item-seven">
          <span>2022-10-19</span>
        </li>
        <li class="item-seven">
          <span>2022-10-19</span>
        </li>
        <li class="item-seven">
          <span>2022-10-19</span>
        </li>
        <li class="item-seven">
          <span>2022-10-19</span>
        </li>
        <li class="item-seven">
          <span>2022-10-19</span>
        </li>
      </ul>
    </div>
    <div class="grid-item nine">
      <div class="header-seven">
        <span class="header">文档管理</span>
        <div>
          <jereh-button type="primary" plain round size="mini">进入</jereh-button>
        </div>
      </div>
    </div>
    <div class="grid-item ten">
      <div class="header-seven">
        <span class="header">个人备忘</span>
        <div>
          <jereh-button type="primary" plain round size="mini">进入</jereh-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myCalendar from "./calendar.vue"
import biaoqian from '@/assets/images/biaoqian.png'
import wrenyuan from '@/assets/images/wrenuan.png'
import moment from 'moment'
export default {
  name: 'myWorkbench',
  components: {
    myCalendar
  },
  data() {
    return {
      biaoqian,
      wrenyuan,
      showDataYear: null,
      workTime:null,
      customerOne: 20,
      value: new Date()
    }
  },
  mounted() {
    this.drawBarChart()
    this.drawLineChart()
  },
  created(){
    this.showDataYear=this.formatDateYear(new Date())
    this.workTime=this.formatDateYear(new Date())
  },
  methods: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    formatDateYear(date) {
      return moment(date).format('YYYY')
    },
    drawBarChart() {
      const chart = document.getElementById("barChart");
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
          color: ['#FF6766','#85D7FC'],
          grid: {
            x: 25,
            y: 25,
            x2: 5,
            y2: 20
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['区域交付设备', '我的交付设备']
          },
          xAxis: {
            data: ['固井','压裂','混砂','混配','其它'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            splitNumber: 3,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            type: 'bar',
            name:'区域交付设备',
            barWidth: 10,
            data: [22,33,44,55,66],
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 0, 0],
              }
            }
          },
          {
            type: 'bar',
            name:'我的交付设备',
            barWidth: 10,
            data: [22,33,44,55,66],
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 0, 0],
              }
            }
          }
        ]
        }
        myChart.setOption(option);
      }
    },
    drawLineChart() {
      const chart = document.getElementById("lineChart");
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            color: ["#F58080", "#47D8BE", "#F9A589", "#409EFF"],
            data: ['人均工时', '我的工时', '人均工单', '我的工单'],
            left: 'center',
            bottom: '-5'
          },
          grid: {
            top: 'middle',
            left: '3%',
            right: '4%',
            bottom: '5%',
            height: '80%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: [1,2,3,4,5,6,7,8,9,10,11,12],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            }
          },
          yAxis: [{
            type: 'value',
            min: 0,
            max: 100,
            position: 'right',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            min: 0,
            max: 1000,
            position: 'leftt',
            axisLine: {
                show:false,
            }
        }
        ],
          series: [{
            name: '人均工时',
            yAxisIndex: 1,
            type: 'line',
            smooth:true,
            data: [800,900,220,130,660,289,100,200,300,546,234,876],
          },
          {
            name: '我的工时',
            yAxisIndex: 1,
            type: 'line',
            smooth:true,
            data: [123,568,111,222,123,56,130,660,289,124,265,754],
          },
          {
            name: '人均工单',
            type: 'line',
            smooth:true,
            data: [125,568,25,36,784,56,22,123,56,130,660,289],
          },
          {
            name: '我的工单',
            type: 'line',
            smooth:true,
            data: [125,568,252,22,123,56,130,660,289,123,754,234],
          }]
        }
        myChart.setOption(option);
      }
    }
  }
}
</script>

<style scoped>
.grid-container {
  padding: 0px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 20px;
  column-gap: 20px;
}
.grid-item {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  overflow: auto;
}
.one {
  grid-column-start: 1;
  grid-column-end: 9;
  grid-row-start: 1;
  grid-row-end: 3;
}
.two {
  grid-column-start: 9;
  grid-column-end: 11;
  grid-row-start: 1;
  grid-row-end: 3;
}
.three {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 5;
}
.four {
  grid-column-start: 4;
  grid-column-end: 9;
  grid-row-start: 3;
  grid-row-end: 5;
}
.five {
  grid-column-start: 9;
  grid-column-end: 11;
  grid-row-start: 3;
  grid-row-end: 5;
}
.six {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 5;
  grid-row-end: 7;
}
.seven {
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 5;
  grid-row-end: 7;
}
.eight {
  grid-column-start: 7;
  grid-column-end: 9;
  grid-row-start: 5;
  grid-row-end: 7;
}
.nine {
  grid-column-start: 9;
  grid-column-end: 11;
  grid-row-start: 5;
  grid-row-end: 6;
}
.ten {
  grid-column-start: 9;
  grid-column-end: 11;
  grid-row-start: 6;
  grid-row-end: 7;
}
.header {
  font-size: 16px;
  font-weight: 700;
  display: block;
  border-left: 3px solid #EA5514;
  width: fit-content;
  margin-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;
  line-height: 25px;
}
.grid-one {
  width: 100%;
  height: calc(100% - 45px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 20px;
  column-gap: 20px;
}
.blue {
  background-color: #dceffd;
}
.orange {
  background-color: #ffeee6;
}
.purple {
  background-color: #eae8fe;
}
.green {
  background-color: #e7f8e5;
}
.pink {
  background-color: #fde4f9;
}
.child-one {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.card-one {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  align-items: center;
}
.child-two {
  text-align: center;
  height: 100%;
}
.avatar-two {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.grandchild-two {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60%;
  font-size: 14px;
}
.column-two {
  width: calc(50% - 10px);
  text-align: right;
}
.content-two {
  width: calc(50% - 10px);
  text-align: left;
}
.header-three {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 45px;
}
.content-three {
  height: calc(100% - 45px);
  width: 100%;
  overflow: auto;
}
.group-three {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
}
.child-three {
  margin: 0px 20px;
  padding-bottom: 5px;
  flex-grow: 1;
}
.child-header-three {
  margin-bottom: 10px;
}
.content-four {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.progress-four {
  width: 30%;
  text-align: center;
}
.chart-four {
  width: 70%;
  height: 100%;
}
.barchart-four {
  width: 100%;
  height: calc(100% - 50px);
}
.subheader-four {
  font-size: 14px;
  font-weight: 700;
  background-color: #fdeee8;
  display: block;
  width: fit-content;
  padding-left: 5px;
  padding-right: 5px;
  line-height: 25px;
  border-radius: 10px;
  margin-top: 20px;
}
.grid-five {
  width: 100%;
  height: calc(100% - 35px);
}
.linechart-six {
  width: 100%;
  height: calc(100% - 45px);
}
.header-seven {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.content-seven {
  height: calc(100% - 45px);
  width: 100%;
  overflow: auto;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
.item-seven {
  padding: 5px 0px;
}
.order-icon {
  color: #F89E84;
}
.order-num {
  font-weight: 550;
  font-size: 20px;
  padding-left: 10px;
}
.jereh-orange {
  color: #EA5514;
}
.order-unit {
  font-size:xx-small;
  padding-left: 2px;
}
::v-deep .monthSelector .el-date-editor .el-input__inner {
  width: 120px !important;
  border-radius: 10px !important;
  height: 25px;
}
::v-deep .monthSelector .el-date-editor .el-input__icon {
  line-height: 25px;
}
::v-deep .monthSelector .el-date-editor .el-input__icon {
  line-height: 25px;
}
::v-deep .el-card__body {
  width: 100%;
  padding: 10px;
}
</style>
