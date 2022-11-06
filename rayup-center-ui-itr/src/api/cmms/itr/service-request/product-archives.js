import request from '@/utils/request'

// 设备绑定列表数据
export function getClientSubmitList(query) {
  return request({
    url: '/itr/clientProductArchives/list',
    method: 'get',
    params: query
  })
}

// 修改设备绑定列表数据
export function submit(query) {
  return request({
    url: '/itr/clientProductArchives/submit',
    method: 'put',
    data: query
  })
}

// 查询工程师待采集设备
export function listToGather(query) {
  return request({
    url: '/itr/clientProductArchives/listToGather',
    method: 'get',
    params: query
  })
}

// 新增设备绑定派工
export function add(query) {
  return request({
    url: '/itr/clientProductArchives/add',
    method: 'post',
    data: query
  })
}

// 修改设备绑定列表数据
export function edit(query) {
  return request({
    url: '/itr/clientProductArchives/submit',
    method: 'put',
    data: query
  })
}
