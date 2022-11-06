import request from '@/utils/request'

//设备交付报表查询
export function getDetailObject(query) {
    return request({
        url: '/cmms/sdDeviceDeliver/productAcceptance',
        method: 'get',
        params: query
    })
}

//设备联系客户查询
export function selectCustomer(data){
    return request({
        url: '/cmms/customer/list',
        method: 'post',
        data: data
    })
}

//设备交付报表保存
export function saveDetailObject(data){
    return request({
        url: '/cmms/statement',
        method: 'post',
        data: data
    })
}

// 查询设备交付列表
export function listSdDeviceDeliver(query) {
    return request({
        url: '/cmms/sdDeviceDeliver/list',
        method: 'post',
        data: query
    })
}

// 查询设备交付详细
export function getSdDeviceDeliver(id) {
    return request({
        url: '/cmms/sdDeviceDeliver/' + id,
        method: 'get'
    })
}

// 新增设备交付
export function addSdDeviceDeliver(data) {
    return request({
        url: '/cmms/sdDeviceDeliver',
        method: 'post',
        data: data
    })
}

// 修改设备交付
export function updateSdDeviceDeliver(data) {
    return request({
        url: '/cmms/sdDeviceDeliver',
        method: 'put',
        data: data
    })
}
//同步备忘
export function syncMemoInfo(data){
    return request({
        url: '/cmms/sdDeviceDeliver/deliveryToMemo',
        method: 'post',
        data: data
    })
}
// 设备交付-下一步
export function nextStep(data) {
    return request({
        url: '/cmms/sdDeviceDeliver/nextStep',
        method: 'post',
        data: data
    })
}
// 设备交付-交付完成
export function finishSubmit(data) {
    return request({
        url: '/cmms/sdDeviceDeliver/finishSubmit',
        method: 'post',
        data: data
    })
}
// 删除设备交付
export function delSdDeviceDeliver(id) {
    return request({
        url: '/cmms/sdDeviceDeliver/' + id,
        method: 'delete'
    })
}
// 设备交付提交整改
export function finishRectification(data) {
    return request({
        url: '/cmms/sdDeviceDeliver/finishRectification',
        method: 'post',
        data: data
    })
}
// 获取绑定设备列表
export function getBindProject(data) {
    return request({
        url: '/cmms/sdServicePool/bindProjectPage',
        method: 'post',
        data: data
    })
}
