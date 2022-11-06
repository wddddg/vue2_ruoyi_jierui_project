import request from '@/utils/request'

// 查询设备基础列表
export function listDevice(query) {
  return request({
    url: '/cmms/device/list',
    method: 'get',
    params: query
  })
}

// 查询设备基础列表
export function sdDeviceInfoPage(query) {
  return request({
    url: '/cmms/device/sdDeviceInfoPage',
    method: 'get',
    params: query
  })
}
export function sdDevicePage(query) {
  return request({
    url: '/cmms/device/sdDevicePage',
    method: 'get',
    params: query
  })
}

// 查询设备基础详细
export function getDevice(id, deviceState, createBy) {
  return request({
    url: '/cmms/device/' + id + '/' + deviceState + '/' + createBy,
    method: 'get'
  })
}

// 暂存设备基础
export function memoryDevice(data) {
  return request({
    url: '/cmms/device/memory',
    method: 'post',
    data: data
  })
}

// 提交设备基础
export function submitDevice(data) {
  return request({
    url: '/cmms/device/submit',
    method: 'post',
    data: data
  })
}

// 审核通过设备基础
export function addDevice(data) {
  return request({
    url: '/cmms/devicehis/audit',
    method: 'post',
    data: data
  })
}

// 修改设备基础
export function updateDevice(data) {
  return request({
    url: '/cmms/device',
    method: 'put',
    data: data
  })
}

// 删除设备基础
export function delDevice(id) {
  return request({
    url: '/cmms/device/' + id,
    method: 'delete'
  })
}

// 搜索用户
export function remoteUser(query) {
  return request({
    url: '/system/user/querylist',
    method: 'get',
    params: query
  })
}

export function submitAssociatedUser(query) {
  return request({
    url: '/cmms/usergroupdevice/saveDeviceUser',
    method: 'post',
    data: query
  })
}

export function submitBatchAssociatedUser(query) {
  return request({
    url: '/cmms/usergroupdevice/saveBatchDeviceUser',
    method: 'post',
    data: query
  })
}

// 部件类别和部件名称
export function partsConfiguration(query) {
  return request({
    url: '/cmms/partsConfiguration',
    method: 'post',
    data: query
  })
}
//产品名称部件信息铭牌信息
export function productConfiguration(query) {
  return request({
    url: '/cmms/productConfiguration',
    method: 'post',
    data: query
  })
}
// 查询部件类别和部件名称对应表
export function componentMapping(id) {
  return request({
    url: '/cmms/partsConfiguration/' + id,
    method: 'get',
  })
}
// 查询部件类别和部件名称对应表
export function productMappings(id) {
  return request({
    url: '/cmms/productConfiguration/' + id,
    method: 'get',
  })
}
export function getUserGroupList() {
  return request({
    url: '/system/role/queryDeviceGroupList',
    method: 'get'
  })
}

export function submitAssociatedGroup(data) {
  return request({
    url: '/cmms/usergroupdevice/saveDeviceGroup',
    method: 'post',
    data: data
  })
}

export function submitBatchAssociatedGroup(data) {
  return request({
    url: '/cmms/usergroupdevice/saveBatchDeviceGroup',
    method: 'post',
    data: data
  })
}

export function queryDeviceUserList(query) {
  return request({
    url: '/cmms/usergroupdevice/queryDeviceUserList',
    method: 'get',
    params: query
  })
}

export function queryDeviceGroupList(query) {
  return request({
    url: '/cmms/usergroupdevice/queryDeviceGroupList',
    method: 'get',
    params: query
  })
}

export function getDeviceHistory(query) {
  return request({
    url: '/cmms/devicehis/page',
    method: 'get',
    params: query
  })
}

export function downloadTemplate() {
  return request({
    url: '/cmms/device/downloadTemplate',
    method: 'get'
  })
}

export function auditBatch(dataList, deviceState, remark) {
  return request({
    url: '/cmms/devicehis/auditBatch',
    method: 'post',
    data: {
      dataList: dataList,
      deviceState: deviceState,
      remark: remark
    }
  })
}

// // get请求#根据设备id查询出部件名
// export function getidPartname(id) {
//   return request({
//     url: '/cmms/componenthis/deviceId/' + id,
//     method: 'get'
//   })
// }

// get请求#获取设备基础历史详细信息
export function getidHistoryDevice(id) {
  return request({
    url: '/cmms/device/listId/' + id,
    method: 'get'
  })
}

export function getHistoryComponent(query) {
  return request({
    url: '/cmms/componenthis/list',
    method: 'get',
    params: query
  })
}
export function getAlarmInfo(data) {
  return request({
    baseURL: '/iotInfo',
    url: '/gateway/iot-basic/warning/api/getDeviceWarningRecord',
    method: 'post',
    data: data,
  })
}
// 获取售后区域变更记录
export function getChangeLog(query) {
  return request({
    url: '/cmms/devicehis/pageAfter',
    method: 'get',
    params: query
  })
}
// 查询健康状况(Iot)
export function getHealthCondition(productCode) {
  return request({
    url: '/cmms/healthiotbasic/data/' + productCode,
    method: 'get'
  })
}
// 查询维保信息(Iot)
export function getMaintenanceInfo(query) {
  return request({
    url: '/cmms/maintain/list',
    method: 'get',
    params: query
  })
}
// 触发事件抓取IOT数据
export function getIotData(productCode) {
  return request({
    url: '/cmms/device/iotdata/' + productCode,
    method: 'get'
  })
}
// 获取Iot的token
export function getIotToken() {
  return request({
    url: '/cmms/device/iotdata/getToken',
    method: 'get'
  })
}
// 获取Iot的报警信息
export function getIotAlarmInfo(query) {
  return request({
    url: '/cmms/alarmiotbasic/list',
    method: 'get',
    params: query
  })
}
// 修改报警信息状态
export function updateIotAlarmInfo(data) {
  return request({
    url: '/cmms/alarmiotbasic',
    method: 'put',
    data: data
  })
}
// 新增附件信息
export function addAnnex(data) {
  return request({
    url: '/cmms/device/editDeviceAnnex',
    method: 'post',
    data: data
  })
}
// 获取故障码信息
export function getFaultCodeList(data) {
  return request({
    url: '/cmms/device/iotFaultInfo',
    method: 'post',
    data: data
  })
}
// 保存部件的附件
export function saveComponentEnclosure(data) {
  return request({
    url: '/cmms/device/enclosure',
    method: 'post',
    data: data
  })
}
// 保存是否接入iot
export function saveIsConnectIot(data) {
  return request({
    url: '/cmms/device/isConnectIot',
    method: 'post',
    data: data
  })
}
// 同步诊断建议报告到文档管理
export function saveHealthReport2Doc(data) {
  return request({
    url: '/cmms/device/saveHealthReport2Doc',
    method: 'post',
    data: data
  })
}
