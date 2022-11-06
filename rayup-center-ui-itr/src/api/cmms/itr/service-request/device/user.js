import request from '@/utils/request'

// 查询生成表数据
export function getDeviceList(query) {
  return request({
    url: '/device/list',
    method: 'get',
    params: query
  })
}