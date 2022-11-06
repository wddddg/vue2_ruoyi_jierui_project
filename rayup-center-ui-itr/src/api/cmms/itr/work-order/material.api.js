import request from '@/utils/request'

// 物料申请列表台账
export function listApply(query) {
  return request({
    url: '/itr/materialApply/list',
    method: 'get',
    params: query
  })
}
// 余料申请列表台账
export function listRemain(query) {
  return request({
    url: '/itr/materialRemain/list',
    method: 'get',
    params: query
  })
}

// 旧件申请列表台账
export function listUsed(query) {
  return request({
    url: '/itr/materialUsed/list',
    method: 'get',
    params: query
  })
}