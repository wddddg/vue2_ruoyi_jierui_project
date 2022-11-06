import request from '@/utils/request'

//操作记录列表
export function operatingRecordList(data) {
  return request({
    url: '/cmms/cmmsLog/list',
    method: 'get',
    params: data
  })
}

// 查询工时记录列表
export function listManHour(query) {
    return request({
        url: '/cmms/manHour/list',
        method: 'get',
        params: query
    })
}

// 导出工时记录列表
export function exportManHour(data) {
    return request({
        url: '/cmms/manHour/export',
        method: 'post',
        data: data
    })
}

// 新增工时记录
export function addManHour(data) {
    return request({
        url: '/cmms/manHour',
        method: 'post',
        data: data
    })
}

// 修改工时记录
export function updateManHour(data) {
    return request({
        url: '/cmms/manHour',
        method: 'put',
        data: data
    })
}

// 删除工时记录
export function delManHour(id) {
    return request({
        url: '/cmms/manHour/' + id,
        method: 'delete'
    })
}
// 下载工时记录模板
export function downloadManHour(data) {
    return request({
        url: '/cmms/manHour/downloadTemplate',
        method: 'post',
        data: data
    })
}
// 导入工时记录
export function importManHour(data) {
    return request({
        url: '/cmms/manHour/importTemplate',
        method: 'post',
        data: data
    })
}