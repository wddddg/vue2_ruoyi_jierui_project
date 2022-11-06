import request from '@/utils/request'

// 查询document列表
export function listDocument(query) {
    return request({
        url: '/cmms/docManagerFiles/list',
        method: 'get',
        params: query
    })
}

// 查询document详细
export function getDocument(id) {
    return request({
        url: '/cmms/docManagerFiles/' + id,
        method: 'get'
    })
}
// 保存文档，新增修改
export function saveDocument(data) {
  return request({
    url: '/cmms/docManagerFiles',
    method: 'post',
    data: data
  })
}

// 删除document
export function delDocument(id) {
    return request({
        url: '/cmms/docManagerFiles/' + id,
        method: 'delete'
    })
}
