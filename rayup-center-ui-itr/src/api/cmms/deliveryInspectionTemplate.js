import request from '@/utils/request'

// 查询交车检查调试记录模板列表
export function listDeliveryInspectionTemplate(query) {
    return request({
        url: '/cmms/deliveryInspectionTemplate/list',
        method: 'get',
        params: query
    })
}

// 查询交车检查调试记录模板详细
export function getDeliveryInspectionTemplate(serialNumber) {
    return request({
        url: '/cmms/deliveryInspectionTemplate/' + serialNumber,
        method: 'get'
    })
}

// 新增交车检查调试记录模板
export function addDeliveryInspectionTemplate(data) {
    return request({
        url: '/cmms/deliveryInspectionTemplate',
        method: 'post',
        data: data
    })
}

// 修改交车检查调试记录模板
export function updateDeliveryInspectionTemplate(data) {
    return request({
        url: '/cmms/deliveryInspectionTemplate',
        method: 'put',
        data: data
    })
}

// 删除交车检查调试记录模板
export function delDeliveryInspectionTemplate(serialNumber) {
    return request({
        url: '/cmms/deliveryInspectionTemplate/' + serialNumber,
        method: 'delete'
    })
}
