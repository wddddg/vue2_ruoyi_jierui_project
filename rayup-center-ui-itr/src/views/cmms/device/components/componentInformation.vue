<template>
  <div v-loading="loading">
    <div class="flex align-start" style="margin-bottom: 10px">
      <jereh-button
        type="primary"
        plain
        icon="el-icon-download"
        @click="handleExport"
      >
        导出
      </jereh-button>
      <file-upload class="ml-2" buttonName="附件" v-model="deviceData.componentEnclosure"></file-upload>
    </div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(item, index) in list"
          :key="item.componentTypeName"
          :name="item.componentTypeName"
        >
          <template slot="title">
            <span>{{ index + 1 + '.' + item.componentTypeName }}</span>
          </template>
          <el-table border :data="item.list" fit :header-cell-style="{ background: '#eef1f8'}">
            <el-table-column label="名称" prop="componentName" align="center"/>
            <el-table-column
              label="品牌"
              prop="componentManufacturer"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              label="型号"
              prop="componentType"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              label="序列号"
              prop="componentSerial"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              label="生产日期"
              prop="partsProductDate"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              label="照片"
              prop="componentPic"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-link
                  v-if="scope.row.componentPic"
                  type="primary"
                  size="mini"
                  @click="preview(scope.row.componentPic)"
                >{{ scope.row.componentName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              prop="remark"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              label="历史记录"
              prop="componentName"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <jereh-button
                  type="text"
                  icon="el-icon-view"
                  size="mini"
                  @click="getHistory(scope.row.componentName)"
                >历史记录
                </jereh-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <!-- <div>
        <el-table
          border
          :data="list"
          fit
          :span-method="arraySpanMethod"
          :default-expand-all="true"
          row-key="componentTypeName"
          :expand-row-keys="expands"
          @row-click="handleClickRow"
          row-class-name="row-expand-cover"
          :show-header="false"
        >
          <el-table-column type="expand" width="1">
            <template slot-scope="prop">
              <el-table border :data="prop.row.list" fit>
                <el-table-column
                  label="名称"
                  prop="componentName"
                  align="center"
                />
                <el-table-column
                  label="品牌"
                  prop="componentManufacturer"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="型号"
                  prop="componentType"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="序列号"
                  prop="componentSerial"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="生产日期"
                  prop="partsProductDate"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="照片"
                  prop="componentPic"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-link
                      v-if="scope.row.componentPic"
                      type="primary"
                      size="mini"
                      @click="preview(scope.row.componentPic)"
                      >{{ scope.row.componentName }}
                    </el-link>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注"
                  prop="remark"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="历史记录"
                  prop="componentName"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <jereh-button
                      type="text"
                      icon="el-icon-view"
                      size="mini"
                      @click="getHistory(scope.row.componentName)"
                      >历史记录
                    </jereh-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="componentTypeName" align="center">
            <template slot-scope="scope">
              <span style="float: left">
                {{ scope.row.componentTypeName }}
                <i v-if="scope.row.show" class="el-icon-caret-bottom"></i>
                <i v-else class="el-icon-caret-right"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="品牌"
            prop="componentManufacturer"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="型号"
            prop="componentType"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="序列号"
            prop="componentSerial"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="生产日期"
            prop="partsProductDate"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="照片"
            prop="componentPic"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="其他"
            prop="remark"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="历史记录"
            prop="componentName"
            align="center"
            show-overflow-tooltip
          />
        </el-table>
      </div> -->
    </div>
    <el-dialog v-dialogDrag :visible.sync="showDialog" title="部件历史信息" width="70vw">
      <div>
        <el-table
          border
          fit
          :data="componentHistory"
          max-height="70vh"
          width="100%"
          :header-cell-style="{ background: '#eef1f8'}"
        >
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column
            label="部件名称"
            align="center"
            prop="componentName"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('componentName', scope.$index) ? '' : 'red',}">
                {{ scope.row.componentName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="部件品牌"
            align="center"
            prop="componentManufacturer"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('componentManufacturer', scope.$index) ? '' : 'red',}">
                {{ scope.row.componentManufacturer }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="部件型号"
            align="center"
            prop="componentType"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('componentType', scope.$index) ? '' : 'red',}">
                {{ scope.row.componentType }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="部件序列号"
            align="center"
            prop="componentSerial"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('componentSerial', scope.$index) ? '' : 'red',}">
                {{ scope.row.componentSerial }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="部件生产日期"
            align="center"
            prop="partsProductDate"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span :style="{ color: isSame('partsProductDate', scope.$index) ? '' : 'red',}">
                {{ scope.row.partsProductDate }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="照片"
            align="center"
            prop="componentPic"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-link
                v-if="scope.row.componentPic"
                type="primary"
                size="mini"
                @click="preview(scope.row.componentPic)"
              >{{ scope.row.componentName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="创建人"
            prop="createBy"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="修改人"
            prop="updateBy"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="创建时间"
            prop="createTime"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            label="修改时间"
            prop="updateTime"
            align="center"
            show-overflow-tooltip
          />
        </el-table>
        <div class="flex align-center justify-end">
          <Pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getComponentHistory"
          />
        </div>
      </div>
    </el-dialog>
    <el-image-viewer
      v-if="showViewer"
      :on-close="() => {showViewer = false}"
      :url-list="viewUrl"
    >
    </el-image-viewer>
  </div>
</template>

<script>
import { getDicts } from '@/api/system/dict/data'
import { componentMapping, getHistoryComponent, saveComponentEnclosure } from '../../../../api/cmms/device'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'projectInformation',
  components: { ElImageViewer },
  props: {
    deviceData: {
      required: true,
      type: Object,
      default: () => {
        return {
          componentList: []
        }
      }
    }
  },
  data() {
    return {
      activeNames: [],
      list: [],
      componentList: [],
      componentNameMap: {},
      loading: false,
      showDialog: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deviceId: this.deviceData.id,
        componentName: ''
      },
      total: '',
      componentHistory: [],
      expands: [],
      showViewer: false,
      viewUrl: []
    }
  },
  watch: {
    'deviceData.componentEnclosure': {
      handler(newValue, oldValue) {
        saveComponentEnclosure({ id: this.deviceData.id, componentEnclosure: newValue })
      },
      immediate: false,
      deep: true
    }
  },
  created() {
    this.getComponentList()
    console.log(this.deviceData)
  },
  methods: {
    isSame(key, index) {
      if (this.componentHistory.length === index + 1) {
        return true
      }
      if (this.componentHistory.length && this.componentHistory.length > (index + 1) ) {
        if (this.componentHistory[index][key] === this.componentHistory[index + 1][key]) {
          return true
        }
      }
      return false
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (!row.componentName && columnIndex !== 0) {
        return [1, 8]
      }
    },
    // 预览图片
    preview(url) {
      if (url) {
        const urls = url.split(',')
        this.viewUrl = urls
        this.showViewer = true
      }
    },
    // 获取所有部件
    getComponentList() {
      this.loading = true
      getDicts('component_name')
        .then((res) => {
          const componentNameList = res.data
          if (Array.isArray(componentNameList) && componentNameList.length) {
            componentNameList.forEach((item) => {
              this.componentNameMap[item.dictCode] = item.dictLabel
            })
          }
          this.getComponentTypeList()
        })
        .catch((e) => {
          this.loading = false
          this.$message.error('获取部件字典失败！')
        })
    },
    // 获取部件分类
    getComponentTypeList() {
      getDicts('component_type')
        .then(async(res) => {
          const data = res.data
          console.log(data)
          if (Array.isArray(data) && data.length) {
            for (let index = 0; index < data.length; index++) {
              const item = data[index]
              const group = {
                componentTypeName: item.dictLabel,
                list: [],
                show: true
              }
              // this.expands.push(item.dictLabel)
              const result = await componentMapping(item.dictCode)
              this.loading = false
              const partsData = result.data
              console.log(partsData)
              if (
                Array.isArray(partsData.partsList) &&
                partsData.partsList.length
              ) {
                partsData.partsList.forEach((parts) => {
                  const partsItem = {
                    componentTypeName: item.dictLabel,
                    componentName: this.componentNameMap[parts.partsId]
                  }
                  if (
                    this.deviceData &&
                    Array.isArray(this.deviceData.componentList) &&
                    this.deviceData.componentList.length
                  ) {
                    this.deviceData.componentList.forEach(
                      (componentItem) => {
                        if (
                          componentItem.componentName ===
                          partsItem.componentName
                        ) {
                          const keys = Object.keys(componentItem)
                          keys.forEach((key) => {
                            partsItem[key] = componentItem[key]
                          })
                        }
                      }
                    )
                  }
                  console.log(partsItem)
                  group.list.push(partsItem)
                })
              }
              // this.list[index] = group
              this.$set(this.list,index,group)
              // this.activeNames.push(group.componentTypeName)
              console.log(this.list)
            }
          }
        })
        .catch((e) => {
          this.loading = false
          console.log(e)
        })
    },
    handleExport() {
      this.download(
        'cmms/component/export',
        {
          deviceId: this.deviceData.id
        },
        `设备数据.xlsx`
      )
    },
    getHistory(name) {
      this.queryParams.componentName = name
      this.getComponentHistory()
    },
    getComponentHistory() {
      getHistoryComponent(this.queryParams).then((res) => {
        this.total = res.total
        this.componentHistory = res.rows
        this.showDialog = true
      })
    },
    handleClickRow(row, column, event) {
      row.show = !row.show
      if (this.expands.includes(row.componentTypeName)) {
        this.expands = this.expands.filter(
          (item) => item != row.componentTypeName
        )
      } else {
        this.expands.push(row.componentTypeName)
      }
    }
  }
}
</script>

<style scoped>
::v-deep .row-expand-cover .el-table__expand-icon {
  visibility: hidden;
}

::v-deep .el-table__cell.el-table__expanded-cell {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
