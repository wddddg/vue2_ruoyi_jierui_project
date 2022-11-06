import request from '@/utils/request'

// 查询服务池列表
export function listSdServicePool(query) {
    return request({
        url: '/cmms/sdServicePool/list',
        method: 'post',
        data: query
    })
}

//查询服务追踪
export function getMoreServiceExecution(query){
    return request({
        url: '/cmms/sdServicePool/getServiceExecMoreInfo',
        method: 'post',
        data:query
    })
}

// 查询服务池详细
export function getSdServicePool(id) {
    return request({
        url: '/cmms/sdServicePool/' + id,
        method: 'get'
    })
}

// 新增服务池
export function addSdServicePool(data) {
    return request({
        url: '/cmms/sdServicePool',
        method: 'post',
        data: data
    })
}

// 修改服务池
export function updateSdServicePool(data) {
    return request({
        url: '/cmms/sdServicePool',
        method: 'put',
        data: data
    })
}

// 删除服务池
export function delSdServicePool(id) {
    return request({
        url: '/cmms/sdServicePool/' + id,
        method: 'delete'
    })
}
export function updateStatusTracking(data) {
  return request({
    url: '/cmms/sdServicePool/updateStatusTracking',
    method: 'post',
    data: data
  })
}
//资源匹配
export function resourceMatchSeacher(id) {
    return request({
      url: '/cmms/sdServicePool/resourceMatch/'+id,
      method: 'get',
    })
  }
