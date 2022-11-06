import request from '@/utils/request'

// 查询再制造产值列表
export function listRemanufacture(query) {
    return request({
        url: '/cmms/remanufacture/list',
        method: 'get',
        params: query
    })
}


// 新增再制造产值
export function addRemanufacture(data) {
    return request({
        url: '/cmms/remanufacture',
        method: 'post',
        data: data
    })
}

