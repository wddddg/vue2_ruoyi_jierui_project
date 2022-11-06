import request from '@/utils/request'

// 查询document列表
export function listDocument(query) {
    return request({
        url: '/cmms/document/list',
        method: 'get',
        params: query
    })
}

// 查询document详细
export function getDocument(id) {
    return request({
        url: '/cmms/document/' + id,
        method: 'get'
    })
}
// 保存文档，新增修改
export function saveDocument(data) {
  return request({
    url: '/cmms/document',
    method: 'post',
    data: data
  })
}

// 删除document
export function delDocument(id) {
    return request({
        url: '/cmms/document/' + id,
        method: 'delete'
    })
}
