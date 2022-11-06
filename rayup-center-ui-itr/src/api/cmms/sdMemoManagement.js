import request from '@/utils/request'

// 查询备忘管理列表
export function listMemoManagement(query) {
    return request({
        url: '/cmms/memoManagement/list',
        method: 'post',
        data: query
    })
}

//同步备忘
export function syncMemo() {
    return request({
        url: '/cmms/memoManagement/memoToDelivery',
        method: 'post',
        data: ""
    })
}

// 查询备忘管理详细
export function getMemoManagement(id) {
    return request({
        url: '/cmms/memoManagement/' + id,
        method: 'get'
    })
}

// 新增备忘管理
export function addMemoManagement(data) {
    return request({
        url: '/cmms/memoManagement',
        method: 'post',
        data: data
    })
}

// 修改备忘管理
export function updateMemoManagement(data) {
    return request({
        url: '/cmms/memoManagement',
        method: 'put',
        data: data
    })
}

// 删除备忘管理
export function delMemoManagement(id) {
    return request({
        url: '/cmms/memoManagement/' + id,
        method: 'delete'
    })
}
