const {
	createRequest,
	loadRequestList,
	updateRequestList,
	createWorkOrder,
	loadOrderList,
	updateOrderList
} = require('./common')


module.exports = [
	// service request module

	{
		url: '/mock/itr/serviceRequest/listByServiceFault/',
		type: 'get',
		response: config => {
			const dataAll = loadRequestList();
			const queryTab = config.query.queryTab;
			let data = {
				"total": 0,
				"rows": [],
				"code": 200,
				"msg": "成功"
			};
			switch (queryTab) {
				case 'all': //所有请求
					data.rows = dataAll;
					break;
				case 'todo': //待受理
				{
					data.rows = dataAll.filter(item => {
						return item.requestStatus == "待受理";
					})
					break;
				}

				case 'exec': //已派工
				{
					data.rows = dataAll.filter(item => {
						return item.requestStatus == '已派工';
					})
					break;
				}
				case 'invalidReq': //无效请求
				{
					data.rows = dataAll.filter(item => {
						return item.requestStatus == "无效请求";
					})
					break;
				}
				case 'DZB': //待转办/升级
				{
					data.rows = dataAll.filter(item => {
						//return item.requestStatus =="待受理";
					})
					break;
				}
				case 'FWL': //服务类
				{
					data.rows = dataAll.filter(item => {
						return item.serviceType != "故障维修";
					})
					break;
				}
				default:

			}
			data['total'] = data['rows'].length;
			return data;

		}
	},
	{
		url: '/mock/itr/serviceRequest/listByServiceOther/',
		type: 'get',
		response: config => {
			const dataAll = loadRequestList();
			const queryTab = config.query.queryTab;
			let data = {
				"total": 0,
				"rows": [],
				"code": 200,
				"msg": "成功"
			};
			switch (queryTab) {
				case 'ALL': //所有请求
					data.rows = dataAll;
					break;
				case 'DSL': //待受理
				{
					data.rows = dataAll.filter(item => {
						return item.requestStatus == "待受理";
					})
					break;
				}

				case 'YPG': //已派工
				{
					data.rows = dataAll.filter(item => {
						return item.requestStatus == '已派工';
					})
					break;
				}
				case 'WXQQ': //无效请求
				{
					data.rows = dataAll.filter(item => {
						return item.requestStatus == "无效请求";
					})
					break;
				}
				case 'DZB': //待转办/升级
				{
					data.rows = dataAll.filter(item => {
						//return item.requestStatus =="待受理";
					})
					break;
				}
				case 'FWL': //服务类
				{
					data.rows = dataAll.filter(item => {
						return item.serviceType != "故障维修";
					})
					break;
				}
				default:

			}
			data['total'] = data['rows'].length;
			return data;

		}
	},
	{
		url: '/mock/itr/serviceRequest/add/',
		type: 'post',
		response: config => {
			let data = {
				"code": 200,
				"msg": "新增成功"
			};
			let paramData = config.body;
			paramData = createRequest(paramData);
			// let dataCache = loadRequestList();
			// dataCache.push(paramData);
			// updateRequestList(dataCache);
			return data;
		}
	},

	{
		url: '/mock/itr/serviceRequest/basic/submit/',
		type: 'put',
		response: config => {
			debugger;

			let data = {
				"code": 200,
				"msg": "提交服务请求成功"
			};
			let paramData = config.body;
			// paramData.submitStatus = "已提交";
			// paramData.requestStatus = "已派工";
			if (!paramData.id) {
				paramData = createRequest(paramData);
				// paramData.requestStatus = '待受理';
				// paramData.id = new Date().getTime();
				// paramData.serviceRequestCode = new Date().getTime();
				// paramData.createTime = new Date();
				// let dataCache = localCache.getJSON(CACHE_REQUESTS)||[];
				// dataCache.push(paramData);
				// localCache.setJSON(CACHE_REQUESTS, dataCache);
			} else {
				let dataCache = loadRequestList();
				dataCache.forEach((item, i) => {
					if (item.id == paramData.id) {
						dataCache[i] = paramData;
					}
				});
				updateRequestList(dataCache);
			}

			//产生工单
			if (paramData['isDistribute'] == "1") {
				let workOrder = paramData;
				workOrder['requestId'] = paramData['id'];
				workOrder = createWorkOrder(workOrder);

				let dataCache = loadRequestList();
				dataCache.forEach((item, i) => {
					if (item.id == paramData.id) {
						dataCache[i]['workOrderNo'] = workOrder['workOrderNo'];
					}
				});
				updateRequestList(dataCache);
			}

			return data;
		}
	},
	{
		url: '/mock/itr/serviceRequest/basic/reback/',
		type: 'put',
		response: config => {
			let data = {
				"code": 200,
				"msg": "退回成功"
			};
			let paramData = config.body;
			return data;
		}
	},
	{
		url: '/mock/itr/serviceRequest/basic/',
		type: 'put',
		response: config => {
			debugger;
			let data = {
				"code": 200,
				"msg": "修改成功"
			};
			let paramData = config.body;

			let dataCache = loadRequestList();
			dataCache.forEach((item, i) => {
				if (item.id == paramData.id) {
					dataCache[i] = paramData;
				}
			});

			updateRequestList(dataCache);
			return data;
		}
	},
	{
		url: '/mock/itr/device/list',
		type: 'get',
		response: config => {
			return {
				"total": 2,
				"rows": [{
						"clientName": "OOCL",
						"productName": "压裂",
						"productCode": "P350250",
						"licenseNumber": "-",
						"productPattern": "杰瑞",
						"eqpPlace": 105,
						"askerUser": "若依",
						"akserTelephone": "18818477506",
						"file": 'https://www.baidu.com/img/flexible/logo/pc/result.png'

					},
					{
						"clientName": "威孚电气",
						"productName": "压裂",
						"productCode": "P350250",
						"licenseNumber": "-",
						"productPattern": "杰瑞",
						"eqpPlace": 105,
						"askerUser": "若依",
						"akserTelephone": "18818477506",
						"file": 'https://www.baidu.com/img/flexible/logo/pc/result.png'
					}
				],
				"code": 200,
				"msg": null
			}
		}
	},
]
