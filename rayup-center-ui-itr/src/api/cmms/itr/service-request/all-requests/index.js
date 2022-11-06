import request from '@/utils/request'

// 服务请求列表查询
export function getAllRequestsList(query) {
	return request({
		url: '/itr/serviceRequest/list',
		method: 'get',
		params: query
	})
}

//故障类列表
export function getFaultRequestsList(query) {
	return request({
		url: '/itr/serviceRequest/listByServiceFault',
		method: 'get',
		params: query
	})
}
//服务类列表
export function getOtherRequestsList(query) {
	return request({
		url: '/itr/serviceRequest/listByServiceOther',
		method: 'get',
		params: query
	})
}

// 查询详情
export function getRequest(id, serviceType) {
	return request({
		url: '/itr/serviceRequest/' + id + '?serviceType=' + serviceType,
		method: 'get'
	})
}


// 新增服务请求
export function addRequest(data) {
	return request({
		url: '/itr/serviceRequest',
		method: 'post',
		data: data
	})
}

// 修改服务请求
export function updateRequest(data) {
	return request({
		url: '/itr/serviceRequest',
		method: 'put',
		data: data
	})
}

// 提交服务请求
export function submitRequest(data) {
	debugger;
	return request({
		url: '/itr/serviceRequest/submit',
		method: 'post',
		data: data
	})
}

// 服务工单升级转办退回
export function rebackRequest(data) {
	return request({
		url: '/itr/serviceRequest/basic/reback',
		method: 'put',
		data: data
	})
}

// 查询升级转办人(分页)
export function queryListPageByApgradeAndRecipient(data) {
	return request({
		url: '/itr/executor/queryListPageByApgradeAndRecipient',
		method: 'get',
		params: data
	})
}

// 故障类服务请求列表导出
export function exportByFault(data) {
	return request({
		url: '/itr/serviceRequest/exportByFault',
		method: 'get',
		params: data,
		responseType: 'blob'
	})
}

// 非故障类服务请求列表导出
export function exportByOther(data) {
	return request({
		url: '/itr/serviceRequest/exportByOther',
		method: 'get',
		params: data,
		responseType: 'blob'
	})
}

// 非故障类统计
export function listByServiceOtherStat(data) {
	return request({
		url: '/itr/serviceRequest/listByServiceOtherStat',
		method: 'get',
		params: data
	})
}

// 故障类统计
export function listByServiceFaultStat(data) {
	return request({
		url: '/itr/serviceRequest/listByServiceFaultStat',
		method: 'get',
		params: data
	})
}

// 选取设备接口
export function sdDeviceDeliverList(data) {
	return request({
		url: '/cmms/device/sdDeviceInfoPage',
		method: 'get',
		params:data
	})
}

// 框架协议弹窗接口
export function frameworkAgreementQueryList(data) {
	return request({
		url: '/cmms/framework/list',
		method: 'get',
		params:data
	})
}
