import request from '@/utils/request'

// 获取满意度调研列表
export function satisfactionSurveyList(data) {
	return request({
		url: '/itr/com/satisfactionSurvey/list',
		method: 'post',
		data:data
	})
}

// 查询回访详情
export function selectVisitInfo(satisfactionSurveyId) {
	return request({
		url: '/itr/com/visit/selectVisitInfo/' + satisfactionSurveyId,
		method: 'get'
	})
}

// 获取回访详情下的服务内容
export function surveyInfo(surveyId) {
	return request({
		url: '/itr/com/satisfactionSurvey/surveyInfo/' + surveyId,
		method: 'get'
	})
}