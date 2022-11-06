<template>
    <el-card class="box-card-component" style="margin-left:8px; background-color: transparent;">
      <div >
      
        <div  class="progress-item">
          <span><1年</span>
          <el-progress :percentage="0.5" color="#00e3ef"/>
        </div>
        <div class="progress-item">
          <span>1-3年</span>
          <el-progress :percentage="35.3" color="#00e3ef"/>
        </div>
        <div class="progress-item">
          <span>3-5年</span>
          <el-progress :percentage="12" color="#00e3ef"/>
        </div>
        <div class="progress-item">
          <span>5-10年</span>
          <el-progress :percentage="8.68" color="#00e3ef"/>
        </div>

        <div class="progress-item">
          <span>>10年</span>
          <el-progress :percentage="6" color="#00e3ef"/>
        </div>
      
      </div>
    </el-card>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import PanThumb from '@/components/PanThumb'
  export default {
    components: { PanThumb },
    filters: {
      statusFilter(status) {
        const statusMap = {
          success: 'success',
          pending: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        statisticsData: {
          article_count: 1024,
          pageviews_count: 1024
        }
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    }
  }
  </script>
  
  <style lang="scss" >
  .box-card-component{
    .el-card__header {
      padding: 0px!important;
    }
  }
  </style>
  <style lang="scss" scoped>
  .box-card-component {
    background: #041e2c;
    opacity: 0.8;
    .box-card-header {
      position: relative;
      height: 220px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }
    .mallki-text {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 20px;
      font-weight: bold;
    }
    .panThumb {
      z-index: 100;
      height: 70px!important;
      width: 70px!important;
      position: absolute!important;
      top: -45px;
      left: 0px;
      margin: auto;
      box-shadow: none!important;
      ::v-deep .pan-info {
        box-shadow: none!important;
      }
    }
    .progress-item {
      font-size: 14px;
  
    }
    .progress-item span{}
    @media only screen and (max-width: 1510px){
      .mallki-text{
        display: none;
      }
    }
  }
  </style>
  