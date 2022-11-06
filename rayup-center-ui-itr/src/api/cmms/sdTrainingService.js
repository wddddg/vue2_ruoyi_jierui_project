import request from '@/utils/request'


//检验是否有区域经理权限
export function isFinishTraining(data){
    return request({
        url:'/cmms/trainingService/isFinishTraining',
        method:'post',
        data: data
    })
}

//校验是否通过
export function checkIsPass(id){
    return request({
        url:'/cmms/trainingService/isPass',
        method:'post',
        data: id
    })
}

// 添加审批
export function addApprove(data) {
    return request({
        url: '/cmms/trainingService/addApprove',
        method: 'post',
        data: data
    })
}

// 查询审批
export function selectApprove(data) {
    return request({
        url: '/cmms/trainingService/queryApprove',
        method: 'post',
        params: data
    })
}

// 处理审批
export function dealApprove(data) {
    return request({
        url: '/cmms/trainingService/dealApprove',
        method: 'post',
        params: data
    })
}

// 查询培训服务列表
export function listTrainingService(query) {
    return request({
        url: '/cmms/trainingService/list',
        method: 'get',
        params: query
    })
}

// 查询培训服务详细
export function getTrainingService(id) {
    return request({
        url: '/cmms/trainingService/' + id,
        method: 'get'
    })
}

// 新增培训服务
export function addTrainingService(data) {
    return request({
        url: '/cmms/trainingService',
        method: 'post',
        data: data
    })
}

// 修改培训服务
export function updateTrainingService(data) {
    return request({
        url: '/cmms/trainingService',
        method: 'put',
        data: data
    })
}

// 修改培训服务
export function topBtnUpdateTrainingService(data) {
  return request({
    url: '/cmms/trainingService/topSaveBtn',
    method: 'put',
    data: data
  })
}

// 修改培训服务
export function nextStep(data) {
  return request({
    url: '/cmms/trainingService/nextStep',
    method: 'post',
    data: data
  })
}

// 删除培训服务
export function delTrainingService(id) {
    return request({
        url: '/cmms/trainingService/' + id,
        method: 'delete'
    })
}
export function getTrainingServiceDetail(data) {
  return request({
    url: '/cmms/trainingService/getTrainingServiceDetail',
    method: 'post',
    data: data
  })
}
// 培训完成
export function finishTraning(data) {
    return request({
        url: '/cmms/trainingService/trainAccomplish',
        method: 'post',
        data: data
    })
}
//资源匹配
export function resourceMatchByTrainingCode(trainingCode) {
  return request({
    url: '/cmms/trainingService/resourceMatch/'+trainingCode,
    method: 'get',
  })
}

export function trainAccomplish(data) {
  return request({
    url: '/cmms/trainingService/trainAccomplish',
    method: 'post',
    data: data
  })
}
// 培训服务提交整改
export function finishRectification(data) {
    return request({
        url: '/cmms/trainingService/finishRectification',
        method: 'post',
        data: data
    })
}