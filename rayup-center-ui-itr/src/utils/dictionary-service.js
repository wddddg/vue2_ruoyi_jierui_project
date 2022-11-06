export function getLabelByValue(value, arr) {
    let label = "";
    arr.forEach((item, i) => {
        if (item.value == value) {
            label = item.label;
        }
    });
    return label;

}
export function serviceType() {
    return [
        {
            value: 'malfunction_repair',
            label: '故障维修'
        },
        {
            value: 'technology_consulting',
            label: '技术咨询'
        },
        {
            value: 'accessories_service',
            label: '配件采购'
        },
        {
            value: 'training_service',
            label: '培训服务'
        },
        {
            value: 'framework_agreement',
            label: '框架协议服务'
        },
        {
            value: 'rental_service',
            label: '设备租赁服务'
        },
        {
            value: 'other_service',
            label: '其他服务'
        }
    ];
}

export function marketFeedback() {
    return [
        {
            value: 1,
            label: '受理'
        },
        {
            value: 0,
            label: '不受理'
        }
    ]
}

export function requestSource() {
    return [
        {
            value: '电话',
            label: '电话'
        },
        {
            value: '邮箱',
            label: '邮箱'
        },
        {
            value: 'BPM',
            label: 'BPM'
        },
        {
            value: 'APP',
            label: 'APP'
        },
        {
            value: 'WEB',
            label: 'WEB'
        }
    ];
}

export function serviceCategory() {
    return [
        {
            value: '交付故障',
            label: '交付故障'
        },
        {
            value: '质保故障',
            label: '质保故障'
        },
        {
            value: '保外故障',
            label: '保外故障'
        },
        {
            value: '保外按保内处理',
            label: '保外按保内处理'
        },
        {
            value: '维修故障-非杰瑞',
            label: '维修故障-非杰瑞'
        },
        {
            value: '交付故障-机械',
            label: '交付故障-机械'
        },
        {
            value: '质保故障-机械',
            label: '质保故障-机械'
        },
        {
            value: '保外故障-机械',
            label: '保外故障-机械'
        },
    ];
}

export function faultLevel() {
    return [
        {
            value: '不紧急',
            label: '不紧急'
        },
        {
            value: '一般',
            label: '一般'
        },
        {
            value: '紧急',
            label: '紧急'
        },
        {
            value: '非常紧急',
            label: '非常紧急'
        },
    ];
}


export function whether() {
    return [
        {
            value: 1,
            label: '是'
        },
        {
            value: 0,
            label: '否'
        },
    ];
}

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
    {
        label: '已完成',
        value: 'service_state_complete'
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

export function requestProperty() {
    return [
        {
            value: 'AVAIL',
            label: '有效请求'
        },
        {
            value: 'INVALID',
            label: '无效请求'
        },
        // {
        //     value: 'CANCEL',
        //     label: '已取消'
        // }
    ]
}
