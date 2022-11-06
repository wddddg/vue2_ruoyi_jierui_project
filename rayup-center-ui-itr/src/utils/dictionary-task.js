export function requestStatus() {
    return [
        {
            label: '待受理',
            value: '待受理'
        },
        {
            label: '已取消',
            value: '已取消'
        },
        {
            label: '无效请求',
            value: '无效请求'
        },
        {
            label: '已派工',
            value: '已派工'
        },
        {
            label: '服务工程师已出发',
            value: '服务工程师已出发'
        },
        {
            label: '问题处理中',
            value: '问题处理中'
        },
        {
            label: '物料已申请',
            value: '物料已申请'
        },
        {
            label: '物料采购中',
            value: '物料采购中'
        },
        {
            label: '物料已出库',
            value: '物料已出库'
        },
        {
            label: '物料运输中',
            value: '物料运输中'
        },
        {
            label: '物料已到达',
            value: '物料已到达'
        },
        {
            label: '问题验证中',
            value: '问题验证中'
        },
        {
            label: '验证已关闭',
            value: '验证已关闭'
        },
        {
            label: '待评价',
            value: '待评价'
        },
        {
            label: '已评价',
            value: '已评价'
        },
    ]
}



export function fuwuType() {
    return [
        {
            value: 'Delivery',
            label: '交付'
        },
        {
            value: 'WarrantySevice',
            label: '保内服务'
        },
        {
            value: 'OutWarrantySevice',
            label: '保外服务'
        },
        {
            value: 'MRO',
            label: '维修改造'
        },
        {
            value: 'TechnicalTraining',
            label: '技术培训'
        },
        {
            value: 'RentalService',
            label: '租聘服务'
        },
        {
            value: 'Others',
            label: '其他'
        }
    ];
}


export function auxiliaryType() {
    return [
        {
            value: '路途',
            label: '路途'
        },
        {
            value: '整理表格',
            label: '整理表格'
        },
        {
            value: '客户回访',
            label: '客户回访'
        },
        {
            value: '客户培训',
            label: '客户培训'
        },
        {
            value: '安全/服务车',
            label: '安全/服务车'
        },
        {
            value: '现场待命/学习',
            label: '现场待命/学习'
        },
        {
            value: '调研/协助市场',
            label: '调研/协助市场'
        },
        {
            value: '其他',
            label: '其他'
        },
    ]
}

export function warningState() {
    return [
        {
            value: '方案定制',
            label: '方案定制'
        },
        {
            value: '物料采购',
            label: '物料采购'
        },
        {
            value: '等待发货',
            label: '等待发货'
        },
        {
            value: '发货途中',
            label: '发货途中'
        },
        {
            value: '等待客户',
            label: '等待客户'
        },
        {
            value: '正在处理',
            label: '正在处理'
        },
        {
            value: '验证中',
            label: '验证中'
        },
        {
            value: '其他',
            label: '其他'
        },
    ]
}

export function responsibilityLink(){
    return [
        {
            value: '研发一部',
            label: '研发一部'
        },
        {
            value: '研发二部',
            label: '研发二部'
        },
        {
            value: '供应部',
            label: '供应部'
        },
        {
            value: '维修与售后服务部',
            label: '维修与售后服务部'
        },
        {
            value: '油田事业部',
            label: '油田事业部'
        },
        {
            value: '国际营销集团',
            label: '国际营销集团'
        },
        {
            value: 'QHSE部',
            label: 'QHSE部'
        },
        {
            value: '其他环节',
            label: '其他环节'
        },
    ]
}

export function queryRequestState() {
    return [{
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
    },

    // {
    //     label: '执行中',
    //     value: 'other_service_state_exec'
    // },
    {
        label: '已完成',
        value: 'workorder_state_complete'
    },
        // {
        //     label: '待评价',
        //     value: 'other_service_state_wait_evaluate'
        // }, {
        //     label: '已评价',
        //     value: 'other_service_state_complete_evaluate'
        // },
    ]
}