import request from '@/utils/request'

// 列表查询
export function listOrder(query) {
	return request({
		url: '/itr/workOrder/list',
		method: 'get',
		params: query
	})
}


// 查询详情
export function getWorkOrder(id) {
	return request({
		url: '/itr/workOrder/' + id,
		method: 'get'
	})
}


// 新增工单
export function addOrder(data) {
	return request({
		url: '/itr/workOrder',
		method: 'post',
		data: data
	})
}

//新增服务类
export function addService(data) {
	return request({
		url: '/itr/serviceRequest',
		method: 'post',
		data: data
	})
}

// 修改工单
export function updateOrder(data) {
	return request({
		url: '/itr/workOrder',
		method: 'put',
		data: data
	})
}

// 取消工单
export function cancelOrder(data) {
	return request({
		url: '/itr/workOrder/cancel',
		method: 'put',
		data: data
	})
}

// 确认工单
export function confirmOrder(data) {
	return request({
		url: '/itr/workOrder/confirm',
		method: 'put',
		data: data
	})
}

// 更新工单状态
export function updateStatus(data) {
	return request({
		url: '/itr/workOrder/updateStatus',
		method: 'put',
		data: data
	})
}

// 工单转办
export function transferOrder(data) {
	return request({
		url: '/itr/workOrder/transferOrder',
		method: 'put',
		data: data
	})
}

// 发起审批
export function initProcess(data) {
	return request({
		url: '/itr/workOrder/audit',
		method: 'post',
		data
	})
}

// 新增预警
export function addCooperation(data) {
	return request({
		url: '/itr/cooperation',
		method: 'post',
		data: data
	})
}

// 提交服务单
export function submitServiceOrder(data) {
	return request({
		url: '/itr/record',
		method: 'post',
		data
	})
}

// 根据id查询服务单
export function queryByIdServiceOrder(data) {
	return request({
		url: '/itr/record/queryById',
		method: 'get',
		params: data
	})
}

// 根据id修改服务单
export function updataServiceOrder(data) {
	return request({
		url: '/itr/record',
		method: 'put',
		data
	})
}

// 工单状态
export function queryListByIdAndType(data) {
	return request({
		url: '/itr/stateMachineLog/queryListByIdAndType',
		method: 'get',
		params: data
	})
}

// 物料绑定列表查询
export function bindList(data) {
	return request({
		url: '/itr/bind/list',
		method: 'get',
		params: data
	})
}

// 物料绑定删除
export function deleteBindItem(id) {
	return request({
		url: '/itr/bind/' + id,
		method: 'delete'
	})
}

// 物料绑定修改
export function updateBindItme(data) {
	return request({
		url: '/itr/bind',
		method: 'put',
		data
	})
}

// 故障信息查询
export function queryByWorkOrderId(data) {
	return request({
		url: '/itr/workFault/queryByWorkOrderId',
		method: 'get',
		params: data
	})
}

// 状态修改
export function updateState(data) {
	return request({
		url: '/itr/workOrder/updateState',
		method: 'post',
		data
	})
}

// 物料申请明细查询
export function queryListByWorkOrderIdList(data) {
	return request({
		url: '/itr/materialApply/queryListByWorkOrderId',
		method: 'get',
		params: data
	})
}

// 保外物料需求查询
export function unwarrantyList(data) {
	return request({
		url: '/itr/materialUnwarranty/list',
		method: 'get',
		params: data
	})
}

// 根据工单id工单余料信息
export function materialRemainList(data) {
	return request({
		url: '/itr/materialRemain/queryListByWorkOrderId',
		method: 'get',
		params: data
	})
}

// 根据工单id工单索赔物料清单
export function materialClaimList(data) {
	return request({
		url: '/itr/materialClaim/queryListByWorkOrderId',
		method: 'get',
		params: data
	})
}

// 工时列表查询
export function hoursList(data) {
	return request({
		url: '/itr/hours/list',
		method: 'get',
		params: data
	})
}

// 根据工单id查询升级转办人
export function queryListByApgradeAndRecipient(data) {
	return request({
		url: '/itr/executor/queryListByApgradeAndRecipient',
		method: 'get',
		params: data
	})
}

// 新增升级转办人
export function executor(data) {
	return request({
		url: '/itr/executor',
		method: 'post',
		data
	})
}

// 查询工单预警协作信息列表
export function cooperationList(data) {
	return request({
		url: '/itr/cooperation/list',
		method: 'get',
		params: data
	})
}

// 问题预警删除
// export function delCooperation(data) {
// 	return request({
// 		url: '/itr/cooperation/' + data,
// 		method: 'delete',
// 	})
// }

// 根据工单id查询旧件信息
export function queryListByWorkOrderIdMaterialUsed(data) {
	return request({
		url: '/itr/materialUsed/queryListByWorkOrderId',
		method: 'get',
		params: data
	})
}

// 物料使用列表
export function queryListByWorkOrderIdMaterialUsing(data) {
	return request({
		url: '/itr/materialUsing/queryListByWorkOrderId',
		method: 'get',
		params: data
	})
}

// 关闭工单
export function closeWorkOrder(data) {
	return request({
		url: '/itr/workOrder/close',
		method: 'put',
		data
	})
}

// 工单取消
export function cancelWorkOrder(data) {
	return request({
		url: '/itr/workOrder/cancel',
		method: 'put',
		data
	})
}

// 工单确认
export function confirmWorkOrder(data) {
	return request({
		url: '/itr/workOrder/confirm',
		method: 'put',
		data
	})
}

// 到货通知
export function arrivalNotice(data) {
	return request({
		url: '/itr/materialApply/arrivalNotice',
		method: 'put',
		data
	})
}

// 工单统计
export function listStat(data) {
	return request({
		url: '/itr/workOrder/listStat',
		method: 'get',
		params: data
	})
}

// 发起调研
export function startSurvey(query) {
	return request({
		url: '/mock/itr/workOrder/startSurvey',
		method: 'get',
		params: query
	})
}

// 满意度调研 
export function satisfactionSurvey(query) {
	return request({
		url: '/mock/itr/satisfactionSurvey',
		method: 'get',
		params: query
	})
}

// 旧件移交查询
export function getByIdUsedRecord(query) {
	return request({
		url: '/itr/usedRecord/queryByMaterialUsedId',
		method: 'get',
		params: query
	})
}

// 旧件移交新增
export function addUsedRecord(query) {
	return request({
		url: '/itr/usedRecord',
		method: 'post',
		data: query
	})
}

// 旧件移交修改
export function editUsedRecord(query) {
	return request({
		url: '/itr/usedRecord',
		method: 'put',
		data: query
	})
}


// 获取客户数据列表
export function getData(productCode) {
    return request({
        url: '/cmms/customer/' + productCode,
        method: 'get'
    })
}

// 查询获取客户数据列表
export function getCustomerList(data) {
    return request({
        url: '/cmms/customer/list',
        method: 'post',
		data
    })
}

// 获取市场负责人数据
export function getUserList(data) {
    return request({
        url: '/system/user/list',
        method: 'get',
		params:data
    })
}
// 发起调研
export function createSurvey(recordId) {
    return request({
        url: '/itr/com/satisfactionSurvey/createSurvey/'+recordId,
        method: 'get'
    })
}

// 根据当前用户获取历史工单
export function queryListByCurrentUser(data) {
    return request({
        url: '/itr/workOrder/queryListByCurrentUser',
        method: 'get',
		params: data
    })
}

// 批量同步
export function syncBatch(data) {
    return request({
        url: '/itr/workOrder/syncBatch',
        method: 'put',
		data
    })
}

// 根据id查询其他信息
export function costQueryByWorkOrderId(data) {
    return request({
        url: '/itr/cost/queryByWorkOrderId',
        method: 'get',
		params: data
    })
}
