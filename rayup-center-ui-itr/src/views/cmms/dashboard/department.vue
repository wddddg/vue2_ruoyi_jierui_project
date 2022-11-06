<template>
  <div class="grid-container">
    <div class="grid-item one">
      <el-card  :style="{backgroundImage:'url('+require('@/assets/images/manyidu.png')+')'}">
            <el-row>
             <el-col :span="6"><el-link><font style="color:white;font-weight: 1000;">客户满意度</font></el-link></el-col>
              <el-col :span="11">
              <div ref="barChart4" style="height:200%;width:130%;margin-top: -16%;margin-left: -20%;"></div>
              </el-col>
              <el-col :span="7"> <center><img  :src="ren" style="margin-right:5%;"/></center></el-col>
            </el-row>
          </el-card>
    </div>
    <div class="grid-item two">
      <el-card  :style="{backgroundImage:'url('+require('@/assets/images/chanzhi.png')+')'}">
            <el-row>
              <el-col :span="6"><el-link><font style="color:white;font-weight: 1000;">产值达成</font></el-link></el-col>
              <el-col :span="11">
                <div ref="barChart5" style="height:200%;width:130%;margin-top: -16%;margin-left: -20%;"></div>
              </el-col>
              <el-col :span="7"> <center><img  :src="chanzhi1" style="margin-right:5%;"/></center></el-col>
            </el-row>
          </el-card>
    </div>
    <div class="grid-item three">
      <el-card :style="{backgroundImage:'url('+require('@/assets/images/shichang.png')+')'}">
            <el-row>
              <el-col :span="6"><el-link><font style="color:white;font-weight: 1000;">市场满意度</font></el-link></el-col>
              <el-col :span="11">
                <div ref="barChart6" style="height:200%;width:130%;margin-top: -16%;margin-left: -20%;"></div>
              </el-col>
              <el-col :span="7"> <center><img  :src="market" style="margin-right:5%;"/></center></el-col>
            </el-row>
          </el-card>
    </div>
    <div class="grid-item1 four">
      <div shadow="never">
        <el-row>
          <el-col :span="20">
            <label style=" display: inline-block; border-left: 4px solid red"><font style="font-size:medium;font-weight:normal;">日历</font></label>
          </el-col>
          <el-col :span="4">
            <el-button type="info" style="margin-top:-2%" round plain size="mini">进入</el-button>
          </el-col>
        </el-row>
        <div style="height:200px">
          <myCalendar></myCalendar>
          </div>
      </div>
    </div>
    <div class="grid-item1 five">
      <div>
          <label style=" display: inline-block; border-left: 4px solid red;"><font style="font-size:medium;font-weight:normal">关键kPl</font></label>
          <el-row style="margin:10px">
            <el-col :span="5">
              <img  :src="serviceRequest" style="margin-right:5%;margin-bottom: -3px;"/>
             <el-link>服务请求处理：<font style="color:orangered">24个</font></el-link>
            </el-col>
            <el-col :span="4">
              <img  :src="gongdan" style="margin-right:5%;margin-bottom: -3px;"/>
              <el-link>服务工单数：<font style="color:orangered">48个</font></el-link>
            </el-col>
            <el-col :span="5">
              <img  :src="jiaofushuliang" style="margin-right:5%;margin-bottom: -3px;"/>
              <el-link>设备交付数量：<font style="color:orangered">24个</font></el-link>
            </el-col>
            <el-col :span="5">
              <img  :src="yunyingtainshu" style="margin-right:5%;margin-bottom: -3px;"/>
              <el-link>安全运营天数：<font style="color:orangered">365天</font></el-link>
            </el-col>
            <el-col :span="5">
              <img  :src="jiejuezhouqi" style="margin-right:5%;margin-bottom: -3px;"/>
              <el-link>平均解决周期：<font style="color:orangered">48天</font></el-link>
            </el-col>
          </el-row>
        </div>
    </div>
    <div class="grid-item1 six">
          <label style="display: inline-block; border-left: 4px solid red;"><font style="font-size:medium;font-weight:normal">再制造板块产值达成趋势图</font></label>
          <div class="monthSelector" style="display:inline-block;float: right;">
          <el-date-picker
            clearable
            v-model="ManufactureTendYear"
            type="year"
            placeholder="请选择年份"
            class="monthSelector"
          />
          </div>
          <div ref="barChart1" style="height:100%;width:100%;overflow:hidden"></div>
    </div>
    <div class="grid-item1 seven">
          <label style="display: inline-block; border-left: 4px solid red;"><font style="font-size:medium;font-weight:normal">设备交付达成趋势图</font></label>
          <div class="monthSelector" style="display:inline-block;float: right;">
          <el-date-picker
            clearable
            v-model="deviceDeliveryTendYear"
            type="year"
            placeholder="请选择年份"
            class="monthSelector"
          />
          </div>
          <div ref="barChart2" style="height:100%;width:100%;margin-top: 1%;"></div>
    </div>
    <div class="grid-item1 eight">
          <el-row>
            <el-col :span="20">
          <label style="display: inline-block; border-left: 4px solid red;"><font style="font-size:medium;font-weight:normal">重点工作</font></label>
          </el-col>
          <el-col :span="4">
          <el-button type="info" style="margin-top:-2%" round plain size="mini">更多</el-button>
          </el-col>
          </el-row>
          <div class="workImportant">
          <div :class="{'view_backcolorinLine': item==1,'view_backcolorinLine1': item!=1}" shadow="never" v-for="item in 3" :key="item">
          <el-row >
          <el-col :span="19" ><font style="font-weight:600;font-size: small;">开会</font></el-col>
          <el-col :span="5" >
            <el-button round plain size="mini"  :style="active" :class="{'buttonClass': item!=1,'buttonClass1':item==1}"   >{{item==1? '待处理':'已处理'}}</el-button>
          </el-col>
          </el-row>
          <el-row >
            <el-col :span="24" style="opacity:0.8"><font style="font-size:smaller;">办公大楼102室</font></el-col>
          </el-row>
          <el-row >
            <el-col :span="24" style="opacity:0.8"><font style="font-size:smaller;">发布时间:{{formatDate(new Date())}}</font></el-col>
          </el-row>
        </div>
          </div>
    </div>
    <div class="grid-item1 nine">
      <label style="display: inline-block; border-left: 4px solid red;"><font style="font-size:medium;font-weight:normal">工单趋势图和客户满意度</font></label>
          <div class="monthSelector" style="display:inline-block;float: right;">
          <el-date-picker
            clearable
            v-model="workCustomerYear"
            type="year"
            placeholder="请选择年份"
            class="monthSelector"
          />
          </div>
          <div ref="barChart3" style="height:100%;width:100%;margin-top: 1%;"></div>
    </div>
    <div class="grid-item1 ten">
      <el-row>
            <el-col :span="20">
              <label style="display: inline-block; border-left: 4px solid red;"><font style="font-size:medium;font-weight:normal">公告</font></label>
          </el-col>
          <el-col :span="4">
          <el-button type="info" style="margin-top:-2%" round plain size="mini">更多</el-button>
          </el-col>
          </el-row>
          <div style="overflow-y:auto;height:90%">
            <el-card class="view_backcolorinLine2" shadow="never" v-for="item in 5" :key="item">
            <el-row style="margin-top:-5%">
              <el-col :span="20"><span class="divCircle">{{item}}</span><font style="font-weight:600;font-size: small;">压裂撬整机</font></el-col>
              <el-col :span="4"><el-button type="info" style="margin-top:-2%" round plain size="mini">详情</el-button></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><font style="font-size:smaller;">编号：1651</font></el-col>
              <el-col :span="12"><font style="font-size:smaller;">售后区域：东北区域</font></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><font style="font-size:smaller;">市场区域：撒旦发射点</font></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><font style="font-size:smaller;">产品品牌：sdfsdf</font></el-col>
              <el-col :span="12"><font style="font-size:smaller;">车牌号：rdgdfgdfg</font></el-col>
            </el-row>
            </el-card>
          </div>
    </div>
  </div>
</template>

<script>
import gongdan from '@/assets/images/gongdan.png'
import jiaofushuliang from '@/assets/images/jiaofushuliang.png'
import jiejuezhouqi from '@/assets/images/jiejuezhouqi.png'
import serviceRequest from '@/assets/images/serviceRequest.png'
import yunyingtainshu from '@/assets/images/yunyingtainshu.png'
import ren from '@/assets/images/ren.png'
import chanzhi1 from '@/assets/images/chanzhi1.png'
import market from '@/assets/images/market.png'
import moment from 'moment'
import myCalendar from "./calendar.vue"
export default {
  components: {
  myCalendar
},
  data() {
    return {
      count: 20,
      loading: false,
      value1:"",
      value2:"",
      active:"",
      ManufactureTendYear:null,
      deviceDeliveryTendYear:null,
      workCustomerYear:null,
      ren,
      chanzhi1,
      market,
      gongdan,
      jiejuezhouqi,
      jiaofushuliang,
      serviceRequest,
      yunyingtainshu,
      percentage: 10,
      colors1: '#f56c6c',
      colors2: '#e6a23c',
      colors3: '#5cb87a',
      partData:{}
    }
  },
  created() {
    this.ManufactureTendYear=this.formatDateYear(new Date())
    this.deviceDeliveryTendYear=this.formatDateYear(new Date())
    this.workCustomerYear=this.formatDateYear(new Date())
  },
  mounted(){
  this.getChart1()
  this.getChart2()
  this.getChart3()
  this.getChart4()
  this.getChart5()
  this.getChart6()
  },
  methods: {
    formatDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  },
  formatDateYear(date) {
    return moment(date).format('YYYY')
  },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    getChart1(){
      let boxDom = this.$refs["barChart1"];
      let scoreCharts = this.$echarts.init(boxDom);
      var colors = ['#ff4500', '#A5AAD8', '#FFD27E','#2097F3','#EE855E'];
      var  option = {
  color: colors,

  tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'cross'}
  },
  grid: {
      // right: '15%',
      // left:'10%',
      // bottom: "9%",
  },
  toolbox: {
      feature: {
          // saveAsImage: {show: true}
      }
  },
  legend: {
      data:['实际单月','去年实际值','单月目标','实际累计','累计达成率'],
      left:'top'
  },
  xAxis: [
      {
          type: 'category',
          axisTick: {
              alignWithLabel: true
          },
          data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      }
  ],
  yAxis: [
      {
          type: 'value',
          min: 0,
          max: 120,
          position: 'right',
          axisLine: {
            show:false,
              lineStyle: {
                  // color: colors[0]
              }
          },
          axisLabel: {
              formatter: '{value} %'
          }
      },
      {
          type: 'value',
          min: 0,
          max: 12000,
          position: 'left',
          axisLine: {
            show:false,
              lineStyle: {
                  // color: colors[2]
              }
          },
          axisLabel: {
              // formatter: '{value} '
          }
      }
  ],
  series: [
      {
          name:'实际单月',
          type:'bar',
          yAxisIndex: 1,
          data:[5000, 4800, 7412, 2383, 2586, 7612, 1350, 1622, 3299, 2000, 6999, 3300]
      },
      {
          name:'去年实际值',
          type:'bar',
          yAxisIndex: 1,
          data:[678, 5640, 8979, 4856, 5414, 8764,7897, 5684, 6486, 6454, 1546, 7899]
      },
      {
          name:'单月目标',
          type:'line',
          yAxisIndex: 1,
          data:[698, 5110, 8179, 4846, 5414, 7764,7897, 5684, 6486, 6454, 1546, 5899]
      },
      {
          name:'实际累计',
          type:'line',
          yAxisIndex: 1,
          data:[821, 5640, 8979, 4856, 5414, 2764,7897, 3684, 6486, 6454, 5546, 3899]
      },
      {
          name:'累计达成率',
          type:'line',
          data:[10, 90, 100, 110, 54, 24,77, 84, 66, 94, 86, 99]
      }
  ]
};
scoreCharts.setOption(option);
    },
    getChart2(){
      let boxDom = this.$refs["barChart2"];
      let scoreCharts = this.$echarts.init(boxDom);
      var colors = ['#F04200', '#9AB6F8', '#F6B72A','#99B2FF','#FF804A','#68C73F'];
      var  option = {
  color: colors,

  tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'cross'}
  },
  grid: {
      // right: '12%',
      // left:'10%',
      // bottom: "10%",
  },
  toolbox: {
      feature: {
          // saveAsImage: {show: true}
      },

  },
  legend: {
      data:['交付数量','发货数量','交付达成率','年度目标值','累计均值','去年度同期'],
      left:'top'
  },
  xAxis: [
      {
          type: 'category',
          axisTick: {
              alignWithLabel: true
          },
          data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      }
  ],
  yAxis: [
      {
          type: 'value',
          min: 0,
          max: 180,
          position: 'right',
          axisLine: {
              show:false,
              lineStyle: {
                  // color: colors[0]
              }
          },
          axisLabel: {
              formatter: '{value} %'
          }
      },
      {
          type: 'value',
          min: 0,
          max: 300,
          position: 'left',
          axisLine: {
              show:false,
              lineStyle: {
                  // color: colors[2]
              }
          },
          axisLabel: {
              // formatter: '{value} '
          }
      }
  ],
  series: [
      {
          name:'交付数量',
          type:'bar',
          yAxisIndex: 1,
          data:[10, 180, 120, 130, 114, 104,117, 184, 166, 194, 86, 99]
      },
      {
          name:'发货数量',
          type:'bar',
          yAxisIndex: 1,
          data:[100, 190, 100, 110, 154, 124,177, 284, 266, 294, 286, 299]
      },
      {
          name:'交付达成率',
          type:'line',
          data:[10, 90, 100, 110, 54, 24,77, 84, 66, 94, 86, 99]
      },
      {
          name:'年度目标值',
          type:'line',
          yAxisIndex: 1,
          data:[110, 110, 100, 130, 114, 194,117, 174, 156, 144, 86, 89]
      },
      {
          name:'累计均值',
          type:'line',
          yAxisIndex: 1,
          data:[10, 180, 120, 130, 114, 134,177, 114, 166, 194, 86, 99]
      },
      {
          name:'去年度同期',
          type:'line',
          yAxisIndex: 1,
          data:[10, 150, 100, 110, 174, 184,127, 184, 166, 194, 86, 79]
      }
  ]
};
scoreCharts.setOption(option);
    },
    getChart3(){
      let boxDom = this.$refs["barChart3"];
      let scoreCharts = this.$echarts.init(boxDom);
      var colors = ['#1EA7FF', '#FE8163', '#92B4F3','#A9E6DC'];
      var  option = {
  color: colors,

  tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'cross'}
  },
  grid: {
  },
  legend: {
      data:['保内工单','保外工单','客户满意度','市场满意度'],
      left:'right'
  },
  xAxis: [
      {
          type: 'category',
          axisTick: {
              alignWithLabel: true
          },
          data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      }
  ],
  yAxis: [
      {
          type: 'value',
          min: 0,
          max: 100,
          position: 'right',
          axisLine: {
              show:false,
              lineStyle: {
                  // color: colors[0]
              }
          },
          axisLabel: {
              formatter: '{value} %'
          }
      },
      {
          type: 'value',
          min: 0,
          // max: 10000,
          position: 'left',
          axisLine: {
              show:false,
              lineStyle: {
                  // color: colors[2]
              }
          },
          axisLabel: {
              // formatter: '{value} '
          }
      }
  ],
  series: [
      {
          name:'保内工单',
          type:'line',
          yAxisIndex: 1,
          smooth:true,
          data:[1000, 8000, 1800, 1300, 1104, 1004,1017, 1804, 1660, 1940, 8600, 9900],
      },
      {
          name:'保外工单',
          type:'line',
          yAxisIndex: 1,
          smooth:true,
          data:[1001, 1910, 1010, 1110, 9154, 7124,1787, 5284, 8266, 6294, 2986, 6299],
      },
      {
          name:'客户满意度',
          type:'line',
          smooth:true,
          data:[10, 90, 100, 110, 54, 24,77, 84, 66, 94, 86, 99]
      },
      {
          name:'市场满意度',
          type:'line',
          smooth:true,
          data:[94, 90, 80, 53, 74, 94,57, 74, 56, 44, 86, 89]
      }
  ]
};
scoreCharts.setOption(option);
    },
    getChart4(){
      let boxDom = this.$refs["barChart4"];
      let scoreCharts = this.$echarts.init(boxDom);
      let option = {
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      splitNumber: 10,
      startAngle: 180,
      endAngle: 0,
      radius: '75%',
      axisLine: {
        lineStyle: {
          color: [[1, '#DC6214']],
          width: 3
        }
      },
      splitLine: {
        distance: -18,
        length: 10,
        lineStyle: {
          color: 'white'
        }
      },
      axisTick: {
        distance: -12,
        length: 5,
        lineStyle: {
          color: 'white'
        }
      },
      axisLabel: {
        distance: -22,
        color: 'white',
        fontSize: 10
      },
      anchor: {
        show: true,
        size: 10,
        itemStyle: {
          borderColor: 'green',
          borderWidth: 2
        }
      },
      pointer: {
        offsetCenter: [0, '10%'],
        length: '100%',
        itemStyle: {
          color: 'yellow'
        }
      },
      detail: {
        valueAnimation: true,
        precision: 1,
        fontSize: 20,
        fontWeight: 'bolder',
        formatter: '{value} %',
        color: 'white'
      },
      title: {
        offsetCenter: [0, '-50%']
      },
      data: [
        {
          value: 88.46,
        }
      ]
    },
  ]
};
scoreCharts.setOption(option);
    },
    getChart5(){
      let boxDom1 = this.$refs["barChart5"];
      let scoreCharts1 = this.$echarts.init(boxDom1);
      let option = {
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      splitNumber: 10,
      startAngle: 180,
      endAngle: 0,
      radius: '75%',
      axisLine: {
        lineStyle: {
          color: [[1, '#635FC0']],
          width: 3
        }
      },
      splitLine: {
        distance: -18,
        length: 10,
        lineStyle: {
          color: 'white'
        }
      },
      axisTick: {
        distance: -12,
        length: 5,
        lineStyle: {
          color: 'white'
        }
      },
      axisLabel: {
        distance: -22,
        color: 'white',
        fontSize: 10
      },
      anchor: {
        show: true,
        size: 10,
        itemStyle: {
          borderColor: 'green',
          borderWidth: 2
        }
      },
      pointer: {
        offsetCenter: [0, '10%'],
        length: '100%',
        itemStyle: {
          color: 'yellow'
        }
      },
      detail: {
        valueAnimation: true,
        precision: 1,
        fontSize: 20,
        fontWeight: 'bolder',
        formatter: '{value} %',
        color: 'white'
      },
      title: {
        offsetCenter: [0, '-50%']
      },
      data: [
        {
          value: 95.46,
        }
      ]
    },
  ]
};
scoreCharts1.setOption(option);
    },
    getChart6(){
      let boxDom2 = this.$refs["barChart6"];
      let scoreCharts2 = this.$echarts.init(boxDom2);
      let option = {
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      splitNumber: 10,
      startAngle: 180,
      endAngle: 0,
      radius: '75%',
      axisLine: {
        lineStyle: {
          color: [[1, '#0660C0']],
          width: 3
        }
      },
      splitLine: {
        distance: -18,
        length: 10,
        lineStyle: {
          color: 'white'
        }
      },
      axisTick: {
        distance: -12,
        length: 5,
        lineStyle: {
          color: 'white'
        }
      },
      axisLabel: {
        distance: -22,
        color: 'white',
        fontSize: 10
      },
      anchor: {
        show: true,
        size: 10,
        itemStyle: {
          borderColor: 'green',
          borderWidth: 2
        }
      },
      pointer: {
        offsetCenter: [0, '10%'],
        length: '100%',
        itemStyle: {
          color: 'yellow'
        }
      },
      detail: {
        valueAnimation: true,
        precision: 1,
        fontSize: 20,
        fontWeight: 'bolder',
        formatter: '{value} %',
        color: 'white'
      },
      title: {
        offsetCenter: [0, '-50%']
      },
      data: [
        {
          value: 52.46,
        }
      ]
    },
  ]
};
scoreCharts2.setOption(option);
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
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(17, 1fr);
  grid-row-gap: 20px;
  column-gap: 20px;
}
.grid-item {
  background-color: #ffffff;
  border-radius: 10px;
  height: 100%;
  padding:0px;
  overflow:hidden;
}
.grid-item1 {
  background-color: #ffffff;
  border-radius: 10px;
  height: 100%;
  padding:10px;
  overflow:hidden;
}
.one {
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 4;
}
.two {
  grid-column-start: 7;
  grid-column-end: 13;
  grid-row-start: 1;
  grid-row-end: 4;
}
.three {
  grid-column-start: 13;
  grid-column-end: 19;
  grid-row-start: 1;
  grid-row-end: 4;
}
.four {
  grid-column-start: 19;
  grid-column-end: 25;
  grid-row-start: 1;
  grid-row-end: 6;
}
.five {
  grid-column-start: 1;
  grid-column-end: 19;
  grid-row-start: 4;
  grid-row-end: 6;
}
.six {
  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 6;
  grid-row-end: 12;
}
.seven {
  grid-column-start: 10;
  grid-column-end: 19;
  grid-row-start: 6;
  grid-row-end: 12;
}
.eight {
  grid-column-start: 19;
  grid-column-end: 25;
  grid-row-start: 6;
  grid-row-end: 12;
}
.nine {
  grid-column-start: 1;
  grid-column-end: 19;
  grid-row-start: 12;
  grid-row-end: 18;
}
.ten {
  grid-column-start: 19;
  grid-column-end: 25;
  grid-row-start: 12;
  grid-row-end: 18;
}
.workImportant{
  display: flex;
  flex-direction:column;
  justify-content: space-around;
  height:90%
}
.view_backcolorinLine{
padding: 5px;
background-color:#FEF4F2 ;
height:80px;
border-left: 5px solid orangered ;
border-radius: 5px ;
}
.view_backcolorinLine1{
padding: 5px;
background-color:#F1F6FC ;
height:80px;
border-left: 5px solid #3D8DEE ;
border-radius: 5px ;
}
.view_backcolorinLine2{
margin:5px;
padding: 0px;
background-color:#FEF4F2 ;
height:100px;
}

::v-deep .monthSelector .el-date-editor .el-input__inner {
width: 120px !important;
border-radius: 25px !important;
height: 25px;
}
::v-deep .monthSelector .el-date-editor .el-input__icon {
line-height: 25px;
}
.buttonClass:hover{
background: #3d8dee !important;;
border-color: #3D8DEE !important;
color: #F1F6FC !important;
}
.buttonClass{
background:#F1F6FC ;
border-color: #3D8DEE;
color: #3D8DEE;
}
::v-deep .el-progress__text {
color: white !important;

}
.buttonClass1:hover{
background:#FF4500 !important;
border-color: #FF4500 !important;
color: #F1F6FC !important;
}
.buttonClass1{
background:#F1F6FC ;
border-color: #FF4500;
color: #FF4500;

}
.divCircle{
margin-right:5px ;
height:5px;
width:5px;
background-color: #FF4500;
color: white;
border-radius: 50%;
}
</style>
