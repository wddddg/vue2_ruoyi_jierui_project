import request from '@/utils/request'

// 查询安全管理列表
export function listCmmsSecurity(query) {
    return request({
        url: '/cmms/security/list',
        method: 'get',
        params: query
    })
}

// 新增安全管理
export function addCmmsSecurity(data) {
    return request({
        url: '/cmms/security',
        method: 'post',
        data: data
    })
}
