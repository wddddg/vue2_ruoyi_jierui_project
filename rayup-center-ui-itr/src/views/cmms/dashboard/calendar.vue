<template>
  <div class="wrap">
    <div class="switch">
      <div class="back" @click='back'>
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="title">{{ year + "，" + months[monthIndex] }}</div>
      <div class="forward" @click='forward'>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="tableItem">
      <div class="week">
        <div v-for="week in weeks" :key="week" class="weekIndex">
          {{ week }}
        </div>
      </div>
      <div class="day">
        <div v-for="(item, dayIndex) in days" :key="dayIndex" :class="{ dayIndex: true, choose: isSelected(item) }">
          <div v-if="typeof(item) === 'string'" >
            {{item}}
          </div>
          <div v-else class="setGrey">
            {{item}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myCalendar',
    data () {
      return {
        monthIndex: 0,
        months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        year:-1,
        day:-1,
        weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        days: [],
        monthLastDay:{ 0:31, 1:28, 2:31, 3:30, 4:31, 5:30, 6:31, 7:31, 8:30, 9:31, 10:30, 11:31 },
        leapYear: false,
        choosenDays: [],
        choosenDate: ['2022-10-18', '2022-10-22']
      }
    },
    mounted () {
      let myDate = new Date();
      this.monthIndex = myDate.getMonth();
      this.year = myDate.getFullYear(); 
      this.day = myDate.getDate() - 1;
      this.judgeDays()
    },
    methods:{
      isSelected(item) {
        const realDate = this.year + '-' + (this.monthIndex + 1) + '-' + item
        console.log(realDate)
        const index = this.choosenDate.findIndex(dateTime => {
          console.log(dateTime)
          return dateTime === realDate
        })
        console.log(index)
        return index !== -1
      },
      back() {
        if (!this.monthIndex) {
          this.monthIndex = 11;
          this.year = this.year - 1;
        } else {
          this.monthIndex = this.monthIndex - 1;
        }
        this.judgeDays()
      },
      forward() {
        if (this.monthIndex == 11) {
          this.monthIndex = 0;
          this.year = this.year + 1;
        } else {
          this.monthIndex = this.monthIndex + 1;
        }
        this.judgeDays()
      },
      isLeapYear() { 
        return ((0 === (this.year % 4)) && ((this.year % 100) != 0)) || ((this.year % 400) == 0); 
      },
      getMonthLastDay(month) {
        if (month !== 1) {
          return this.monthLastDay[month];
        } else {
          return this.leapYear ? 29 : 28
        }
      },
      judgeDays() {
        this.days = [];
        // 判断周几
        this.firstDayIndex = new Date(this.year + '/' + (this.monthIndex + 1) + '/' + '01').getDay();
        this.leapYear = this.isLeapYear()
        let lastMonthIndex = (this.monthIndex - 1) <= 0 ? 11 : (this.monthIndex - 1);
        let lastDay = this.getMonthLastDay(lastMonthIndex);
        this.generateDays(lastDay, this.firstDayIndex);
      },
      generateDays(lastDay, index) {
        for (let i = 1; i <= index; i++) {
          const lastMonthDay = lastDay - index + i
          this.days.push(lastMonthDay)
        }
        let newDay = 1
        for (let i = 1; i <= (42 - index); i++) {
          if (i <= this.monthLastDay[this.monthIndex]) {
            this.days.push(i.toString());
          } else {
            if (this.leapYear && (i === 29)) {
              this.days.push(i.toString())
            } else {
              this.days.push(newDay);
              newDay++;
            }
          }
          
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
.wrap {
  padding: 10px;
  background-color: #f8f9fb;
  position: relative;
  width: 100%;
  height: 100%;
  .switch {
    width: 100%;
    height: 30px;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .tableItem {
    width: 100%;
    height: calc(100% - 30px);
    .week {
      width: 100%;
      height: 20%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      justify-content: space-around;
      align-items: center;
      .weekIndex {
        text-align: center;
        color: #ff6d3a;
        font-size: 14px;
      }
    }
    .day {
      height: 80%;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(6, 1fr);
      justify-content: space-around;
      justify-items: center;
      align-items: center;
      .dayIndex {
        height: 100%;
        width: 60%;
        text-align: center;
        font-size: 14px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .setGrey{
					color: grey;
				}
      }
      .choose {
        background: #EA5514;
        border-radius: 50%;
        color: white;
      }
      .dayIndex :hover {
        height: 100%;
        background: #EA5514;
        border-radius: 50%;
        color: white;
      }
    }
  }
}
</style>