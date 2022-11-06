const {
	createRequest,
	loadRequestList,
	updateRequestList,
	createWorkOrder,
	loadOrderList,
	updateOrderList
} = require('./common')

module.exports = [{
		url: '/mock/itr/workOrder/list',
		type: 'get',
		response: config => {
			const dataAll = loadOrderList();

			const queryTab = config.query.queryTab;
			let data = {
				"total": 0,
				"rows": [],
				"code": 200,
				"msg": "成功"
			};
			switch (queryTab) {
				case 'ALL': //全部工单
					data.rows = dataAll;
					break;
				case 'DCL': //待受理
				{
					data.rows = dataAll.filter(item => {
						return (item.taskStatus == "待处理" || item.taskStatus == "已派工");
					});
					break;
				}
				case 'CLZ': //处理中
				{
					data.rows = dataAll.filter(item => {
						return (item.taskStatus == "工单已确认" || item.taskStatus == "问题处理中" || item.taskStatus == "问题验证中");
					});
					break;
				}
				case 'YWC': //已完成
				{
					data.rows = dataAll.filter(item => {
						return (item.taskStatus == "经验证已关闭" || item.taskStatus == "已评价");
					});
					break;
				}
				default:

			}
			data['total'] = data['rows'].length;
			return data;

		}
	},
	{

		url: '/mock/itr/workOrder/',
		type: 'post',
		response: config => {
			let data = {
				"code": 200,
				"msg": "新增成功"
			};
			let paramData = config.body;
			console.log(paramData, "------新增工单详情------")
			paramData = createWorkOrder(paramData);
			return data;
		}
	},

	{
		url: '/mock/itr/workOrder/cancel/',
		type: 'put',
		response: config => {
			let data = {
				"code": 200,
				"msg": "取消工单成功"
			};
            let paramData = config.body;
            let dataCache = loadOrderList();
            dataCache.forEach((item, i) => {
                if (item.id == paramData.id) {
                    dataCache[i]['worOrderStatus'] = "已取消";
                }
            });
            updateOrderList(dataCache);
			return data;
		}
	},
	{
		url: '/mock/itr/workOrder/confirm/',
		type: 'put',
		response: config => {
			let data = {
				"code": 200,
				"msg": " 确认工单成功"
			};

            let paramData = config.body;
			let dataCache = loadOrderList();
			dataCache.forEach((item, i) => {
				if (item.id == paramData.id) {
					dataCache[i]['stepStatus'] = "1";
                    dataCache[i]['worOrderStatus'] = "工单已确认";
				}
			});
			updateOrderList(dataCache);
			return data;
		}
	},
	{
		url: '/mock/itr/workOrder/updateStatus/',
		type: 'put',
		response: config => {
			let data = {
				"code": 200,
				"msg": "更新工单状态成功"
			};
            let paramData = config.body;
			let dataCache = loadOrderList();
			dataCache.forEach((item, i) => {
				if (item.id == paramData.id) {
					dataCache[i]['stepStatus'] = paramData.stepStatus;
				}
			});
			updateOrderList(dataCache);
			return data;
		}
	},
	{
		url: '/mock/itr/workOrder/transferOrder/',
		type: 'put',
		response: config => {
			let paramData = config.body;
			let data = {
				"code": 200,
				"msg": "工单转办成功"
			};
			return data;
		}
	},
	{
		url: '/mock/itr/workOrder/initProcess/',
		type: 'put',
		response: config => {
			let paramData = config.body;
			let data = {
				"code": 200,
				"msg": "发起审批成功",
				data: "FLOW1252522525"
			};
			return data;
		}
	},
	{
		url: '/mock/itr/workOrder/',
		type: 'put',
		response: config => {
			let data = {
				"code": 200,
				"msg": "修改工单成功"
			};
			let paramData = config.body;
			console.log(paramData, "------修改工单详情------")
			let dataCache = loadOrderList();
			dataCache.forEach((item, i) => {
				if (item.id == paramData.id) {
					dataCache[i] = paramData;
				}
			});
			updateOrderList(dataCache);
			return data;
		}
	},
	{
		url: '/mock/itr/workOrder/submitServiceOrder/',
		type: 'put',
		response: config => {
			let paramData = config.body;
			let data = {
				"code": 200,
				"msg": "提交服务单成功",
				data: "FLOW1252522525"
			};
			return data;
		}
	},
	{
		url: '/mock/itr/workOrder/startSurvey',
		type: 'get',
		response: config => {
			console.log(config.query);
			let data = {
				"clientPrincipalTotal": 2,
				'marketPrincipalTotal':1,
				"clientRows": [
					{
						"id": "001",
						'customerName': "大庆井下作业分公司",
						'unitName': "大庆井下压裂大队压裂二队",
						'linkMan': "张三",
						'phone': "12345678911",
						'linkManduty': "技术人员",
						'isChoose':'0'
					},
					{
						"id": "002",
						'customerName': "大庆井下作业分公司2",
						'unitName': "大庆井下压裂大队压裂三队",
						'linkMan': "李四",
						'phone': "15600000000",
						'linkManduty': "副队长",
						'isChoose':'0'
					}
				],
				"marketRows": [
					{
						'id':"01",
						'position': "石油装备集团油田事业部东北市场区域销售工程师",
						'principal': "张三（工号）",
						'phone': "13100000000",
						'isChoose':'0'
					  },
				],
				"code": 200,
				"msg": "成功"
			};
			return data;

		}
	},
	
	{
		url: '/mock/itr/satisfactionSurvey',
		type: 'get',
		response: config => {
			console.log(config.query);
			let data = {
				'total':1,
				"rows": [
					{
						evaluateType:'市场类',
						returnViste:'已评价',
						surveyQuestionnaireCode:'SCDY20220804+001',
						createTime:'2022-10-22',
						evaluateTiem:'2022-10-31',
						serviceType:'设备交付',
						afterSaleArea:'西南区域',
						serviceEngineer:'张三',
						serviceCode:'SCDY20220804',
						projectCodeItemize:'DY20220804',
						productName:'产品A',
						requestDescribe:'产品A设备交付',
						clientName:'李四',
						appraiserName:'赵五',
						appraiserPhoe:'150000000000',
						serviceEvaluateTotalPoints:'80.22',
						equipmentEvaluateTotalPoints:'90.00',
						Le:'是'
					}
				],
				"marketRows": [
					{
						'id':"01",
						'position': "石油装备集团油田事业部东北市场区域销售工程师",
						'principal': "张三（工号）",
						'phone': "13100000000",
						'isChoose':'0'
					  },
				],
				"code": 200,
				"msg": "成功"
			};
			return data;

		}
	},

]
