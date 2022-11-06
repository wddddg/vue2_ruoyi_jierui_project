import request from '@/utils/request'

// 查询手持端更新列表
export function listUpdate(query) {
    return request({
        url: '/cmms/update/list',
        method: 'get',
        params: query
    })
}

// 查询手持端更新详细
export function getUpdate(id) {
    return request({
        url: '/cmms/update/' + id,
        method: 'get'
    })
}

// 新增手持端更新
export function addUpdate(data) {
    return request({
        url: '/cmms/update',
        method: 'post',
        data: data
    })
}

// 修改手持端更新
export function updateUpdate(data) {
    return request({
        url: '/cmms/update',
        method: 'put',
        data: data
    })
}

// 删除手持端更新
export function delUpdate(id) {
    return request({
        url: '/cmms/update/' + id,
        method: 'delete'
    })
}
