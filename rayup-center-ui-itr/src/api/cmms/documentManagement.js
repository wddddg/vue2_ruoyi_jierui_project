import request from '@/utils/request'

// 查询文档管理列表
export function listManagement(query) {
    return request({
        url: '/cmms/docDocumentManagement/list',
        method: 'get',
        params: query
    })
}

// 查询文档管理详细
export function getManagement(id) {
    return request({
        url: '/cmms/docDocumentManagement/' + id,
        method: 'get'
    })
}
export function saveManagement(data) {
  return request({
    url: '/cmms/docDocumentManagement',
    method: 'post',
    data: data
  })
}
// 删除文档管理
export function delManagement(id) {
    return request({
        url: '/cmms/docDocumentManagement/' + id,
        method: 'delete'
    })
}
