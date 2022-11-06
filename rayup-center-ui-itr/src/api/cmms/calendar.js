import request from '@/utils/request'

// 查询日历功能列表
export function listCalendar() {
    return request({
        url: '/cmms/calendar/list',
        method: 'get',
    })
}

// 查询日历功能详细
export function getCalendar(id) {
    return request({
        url: '/cmms/calendar/' + id,
        method: 'get'
    })
}

// 新增日历功能
export function addCalendar(data) {
  console.log(data)
    return request({
        url: '/cmms/calendar',
        method: 'post',
        data: data
    })
}

// 修改日历功能
export function updateCalendar(data) {
    return request({
        url: '/cmms/calendar',
        method: 'put',
        data: data
    })
}

// 删除日历功能
export function delCalendar(id) {
    return request({
        url: '/cmms/calendar/' + id,
        method: 'delete'
    })
}
