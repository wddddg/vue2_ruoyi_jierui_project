const {
	localCache
} = require('./cache')
const CACHE_REQUESTS = "CACHE_REQUESTS_LIST";
const CACHE_WORK_ORDER = "CACHE_WORK_ORDER_LIST";

function loadRequestList() {
	const dataCache = localCache.getJSON(CACHE_REQUESTS) || [];
	const dataAll = [...globalRequestList, ...dataCache];
	return dataCache;
}

function loadOrderList() {
	const dataCache = localCache.getJSON(CACHE_WORK_ORDER) || [];
	const dataAll = [...globalWorkOrderList, ...dataCache];
	return dataCache;
}

function updateRequestList(data) {
	localCache.setJSON(CACHE_REQUESTS, data);
}

function updateOrderList(data) {
	localCache.setJSON(CACHE_WORK_ORDER, data);
}

function createRequest(paramData) {
	paramData.requestStatus = '已受理';
	paramData.id = new Date().getTime();
	paramData.serviceRequestCode = new Date().getTime();
	paramData.createTime = new Date();
	let dataCache = localCache.getJSON(CACHE_REQUESTS) || [];
	dataCache.push(paramData);
	localCache.setJSON(CACHE_REQUESTS, dataCache);
	return paramData;
}

function createWorkOrder(paramData) {
	paramData.taskStatus = '已受理';
	paramData.id = new Date().getTime();
	paramData.workOrderNo = new Date().getTime();
	paramData.createTime = new Date();
	let dataCache = localCache.getJSON(CACHE_WORK_ORDER) || [];
	dataCache.push(paramData);
	localCache.setJSON(CACHE_WORK_ORDER, dataCache);
	return paramData;
}


module.exports = {
	loadRequestList,
	loadOrderList,
	updateRequestList,
	updateOrderList,
	createRequest,
	createWorkOrder
}

const globalRequestList = [{
		"id": "001",
		"serviceRequestCode": "SRT202208300001",
		"createTime": "2022-08-20 19:29:42",
		"serviceRequiredTime": "2022-08-23 19:29:42",
		"agreementCode": "AG252552002525",
		"workOrderNo": "TASK525301",
		"requestStatus": "已派工",
		"requestSource": "BPM",
		"serviceType": "故障报修",
		"afterSaleArea": "俄语及中亚区域",
		"clientName": "BJ",
		"productName": "压裂",
		"projectCode": "81W200321P",
		"productCode": "50210013",
		"licenseNumber": "京A88888",
		"serviceJobsite": "靖边",
		"requestDescription": "发动机无法启动",

	},
	{
		"id": "002",
		"serviceRequestCode": "SRC202208300005",
		"createTime": "2022-08-26 19:29:42",
		"serviceRequiredTime": "2022-08-27 19:29:42",
		"agreementCode": "-",
		"workOrderNo": "TASK525311,TASK525312",
		"requestStatus": "服务工程师已出发",
		"requestSource": "电话",
		"serviceType": "配件服务",
		"afterSaleArea": "中部区域",
		"clientName": "BJ",
		"productName": "混砂",
		"projectCode": "81W200321P",
		"productCode": "50210013",
		"licenseNumber": "-",
		"serviceJobsite": "俄罗斯",
		"requestDescription": "步进电机损坏",
	}
];


const globalWorkOrderList = [{
		"id": "002",
		"serviceRequestCode": "SRT202208300001",
		"createTime": "2022-08-20 19:29:42",
		"serviceRequiredTime": "2022-08-23 19:29:42",
		"agreementCode": "AG252552002525",
		"workOrderNo": "TASK525301",
		"requestStatus": "工单已确认",
		"requestSource": "BPM",
		"serviceType": "故障报修",
		"afterSaleArea": "俄语及中亚区域",
		"clientName": "BJ",
		"productName": "压裂",
		"projectCode": "81W200321P",
		"productCode": "50210013",
		"licenseNumber": "京A88888",
		"serviceJobsite": "靖边",
		"requestDescription": "发动机无法启动",
		"faultLevel": "非常紧急",
		"issueLevel": "重大问题",
		"serviceCategory": "交付故障"

	},
	{
		"id": "002",
		"serviceRequestCode": "SRC202208300005",
		"createTime": "2022-08-26 19:29:42",
		"serviceRequiredTime": "2022-08-27 19:29:42",
		"agreementCode": "-",
		"workOrderNo": "TASK525311",
		"requestStatus": "问题处理中",
		"requestSource": "电话",
		"serviceType": "配件服务",
		"afterSaleArea": "中部区域",
		"clientName": "BJ",
		"productName": "混砂",
		"projectCode": "81W200321P",
		"productCode": "50210013",
		"licenseNumber": "-",
		"serviceJobsite": "俄罗斯",
		"requestDescription": "步进电机损坏",
		"faultLevel": "紧急",
		"issueLevel": "一般问题",
		"serviceCategory": "保外故障"

	}
]
