const serverProgressStateList = [{
    label: '待处理',
    value: 'malfunction_repair_state_pending'
}, {
    label: '已取消',
    value: 'malfunction_repair_state_cancel'
}, {
    label: '无效请求',
    value: 'malfunction_repair_state_invalidReq'
}, {
    label: '已派工',
    value: 'malfunction_repair_state_allocation'
}, {
    label: '工单确认',
    value: 'malfunction_repair_state_order_affirm'
}, {
    label: '服务工程师已出发',
    value: 'malfunction_repair_state_engineer_depart'
}, {
    label: '问题处理中',
    value: 'malfunction_repair_state_engineer_dispose'
}, {
    label: '物料已申请',
    value: 'malfunction_repair_state_material_apply'
}, {
    label: '物料已出库',
    value: 'malfunction_repair_state_material_delivery'
}, {
    label: '物料已到达',
    value: 'malfunction_repair_state_material_arrive'
}, {
    label: '问题验证中',
    value: 'malfunction_repair_state_engineer_question_verify'
}, {
    label: '问题验证关闭',
    value: 'malfunction_repair_state_engineer_question_verify_cancel'
}, {
    label: '待评价',
    value: 'malfunction_repair_state_wait_evaluate'
}, {
    label: '已评价',
    value: 'malfunction_repair_state_complete_evaluate'
}, {
    label: '待处理',
    value: 'other_service_state_pending'
}, {
    label: '已派工',
    value: 'other_service_state_allocation'
}, {
    label: '已取消',
    value: 'other_service_state_cancel'
}, {
    label: '无效请求',
    value: 'other_service_state_invalidreq'
}, {
    label: '执行中',
    value: 'other_service_state_exec'
}, {
    label: '已完成',
    value: 'service_state_complete'
}, {
    label: '待评价',
    value: 'other_service_state_wait_evaluate'
}, {
    label: '已评价',
    value: 'other_service_state_complete_evaluate'
}]

export default function serverProgressState(value) {
    return serverProgressStateList.filter(item => {
        return value === item.value
    })[0]?.label || ''
}