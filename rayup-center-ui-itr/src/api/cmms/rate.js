import request from '@/utils/request'

// 查询指标达成率列表
export function listRate(query) {
    return request({
        url: '/cmms/rate/list',
        method: 'get',
        params: query
    })
}


// 新增指标达成率
export function addRate(data) {
    return request({
        url: '/cmms/rate',
        method: 'post',
        data: data
    })
}

