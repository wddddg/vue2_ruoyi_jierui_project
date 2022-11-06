import request from '@/utils/request'

// 阶段框架协议报告
export function queryFrameworkStage(data) {
    return request({
        url: '/cmms/report',
        method: 'post',
        data: data
    })
}

//发起审批
export function FrameworkApprove(data) {
    return request({
        url: '/cmms/framework/initiateApproval',
        method: 'post',
        data: data
    })
}

//判断当前用户是否为区域经理
export function checkManager(data) {
    return request({
        url: '/cmms/framework/whetherRegionalManager',
        method: 'post',
        data: data
    })
}

//判断当前用户是否为市场负责人
export function checkMaket(data) {
    return request({
        url: '/cmms/framework/whetherMaketDirector',
        method: 'post',
        data: data
    })
}

//区域经理审核
export function addCheckManager(data) {
    return request({
        url: '/cmms/framework/areaManager',
        method: 'post',
        data: data
    })
}

//市场确认
export function addCheckMarket(data) {
    return request({
        url: '/cmms/framework/marketAffirm',
        method: 'post',
        data: data
    })
}

// 阶段框架协议报告
export function queryFramework(data) {
    return request({
        url: '/cmms/report/dsur',
        method: 'post',
        data: data
    })
}

//框架协议总保存
export function saveFramework(data) {
    return request({
        url: '/cmms/statement/saveList',
        method: 'post',
        data: data
    })
}

//阶段执行报告总查询
export function queryStageReport(data) {
    return request({
        url: '/cmms/statement/executiveReportList',
        method: 'get',
        params: data
    })
}

//阶段报告删除
export function delStageReport(data) {
    return request({
        url: '/cmms/statement/executiveReportCode/'+data,
        method: 'delete',
    })
}

//总结报告删除
export function delReport(data) {
    return request({
        url: '/cmms/statement/performReportCode/'+data,
        method: 'delete',
    })
}

//框架履行总结报告总查询
export function queryReport(data) {
    return request({
        url: '/cmms/statement/performReportList',
        method: 'get',
        params: data
    })
}
// 阶段框架协议报告
export function saveFrameworkStage(data) {
    return request({
        url: '/cmms/statement',
        method: 'post',
        data: data
    })
}
// 查询框架协议列表
export function listFramework(query) {
    return request({
        url: '/cmms/framework/list',
        method: 'get',
        params: query
    })
}

// 查询框架协议详细
export function getFramework(id) {
    return request({
        url: '/cmms/framework/' + id,
        method: 'get'
    })
}

// 新增框架协议
export function addFramework(data) {
    return request({
        url: '/cmms/framework',
        method: 'post',
        data: data
    })
}

// 修改框架协议
export function updateFramework(data) {
    return request({
        url: '/cmms/framework',
        method: 'put',
        data: data
    })
}

// 修改框架协议
export function nextStep(data) {
  return request({
    url: '/cmms/framework/nextStep',
    method: 'post',
    data: data
  })
}
// 框架协议-框架协议完成
export function finishSubmit(data) {
  return request({
    url: '/cmms/framework/finishSubmit',
    method: 'post',
    data: data
  })
}
// 删除框架协议
export function delFramework(id) {
    return request({
        url: '/cmms/framework/' + id,
        method: 'delete'
    })
}
// 框架协议-框架协议完成
export function sendEmail(data) {
  return request({
    url: '/cmms/framework/sendEmail',
    method: 'post',
    data: data
  })
}
// 框架协议-框架协议提交整改
export function finishRectification(data) {
    return request({
        url: '/cmms/framework/finishRectification',
        method: 'post',
        data: data
    })
}