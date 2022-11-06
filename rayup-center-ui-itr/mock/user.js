module.exports = [
    // user login
    {
        url: '/mock/auth/login',
        type: 'post',
        headers: {
          isToken: false
        },
        response: config => {
            debugger;
            if(config.body.username=="manager"||config.body.username=="engineer"){

                return {
                    code: 200,
                    data: {access_token: config.body.username}
                }
            }else{
                return {
                    code: 500,
                    data: "",
                    msg: "账号密码错误"
                }
            }
        }
    },

    {
        url: '/mock/system/user/getInfo',
        type: 'get',
        response: config => {
            if(config.body.userType=="manager"){
                    return { "msg": "操作成功", "code": 200, "permissions": ["*:*:*"], "roles": ["manager"], "user": { "searchValue": null, "createBy": "admin", "createTime": "2020-11-20 19:29:42", "updateBy": null, "updateTime": null, "remark": "管理员", "params": {}, "userId": 1, "deptId": 103, "userName": "admin", "nickName": "管理师", "email": "ry@163.com", "phonenumber": "15888888888", "sex": "1", "avatar": "", "salt": null, "status": "0", "delFlag": "0", "loginIp": "127.0.0.1", "loginDate": "2020-11-20T19:29:42.000+0800", "dept": { "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "deptId": 103, "parentId": 101, "ancestors": null, "deptName": "研发部门", "orderNum": "1", "leader": "若依", "phone": null, "email": null, "status": "0", "delFlag": null, "parentName": null, "children": [] }, "roles": [{ "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "roleId": 1, "roleName": "服务管理师", "roleKey": "manager", "roleSort": "1", "dataScope": "1", "menuCheckStrictly": false, "deptCheckStrictly": false, "status": "0", "delFlag": null, "flag": false, "menuIds": null, "deptIds": null, "admin": true }], "roleIds": null, "postIds": null, "admin": true } }
            }else{
                return { "msg": "操作成功", "code": 200, "permissions": ["*:*:*"], "roles": ["engineer"], "user": { "searchValue": null, "createBy": "admin", "createTime": "2020-11-20 19:29:42", "updateBy": null, "updateTime": null, "remark": "管理员", "params": {}, "userId": 2, "deptId": 103, "userName": "admin", "nickName": "工程师", "email": "gcs@163.com", "phonenumber": "13888888888", "sex": "1", "avatar": "", "salt": null, "status": "0", "delFlag": "0", "loginIp": "127.0.0.1", "loginDate": "2020-11-20T19:29:42.000+0800", "dept": { "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "deptId": 103, "parentId": 101, "ancestors": null, "deptName": "研发部门", "orderNum": "1", "leader": "工程师", "phone": null, "email": null, "status": "0", "delFlag": null, "parentName": null, "children": [] }, "roles": [{ "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "roleId": 2, "roleName": "服务工程师", "roleKey": "engineer", "roleSort": "1", "dataScope": "1", "menuCheckStrictly": false, "deptCheckStrictly": false, "status": "0", "delFlag": null, "flag": false, "menuIds": null, "deptIds": null, "admin": true }], "roleIds": null, "postIds": null, "admin": true } }
            }

        }
    },
    {
        url: '/mock/system/menu/getRouters',
        type: 'get',
        response: config => {
            return {
                "msg": "操作成功", "code": 200,
                "data": [
                    {
                        "name": "System",
                        "path": "/system",
                        "hidden": false,
                        "redirect": "noRedirect",
                        "component": "Layout",
                        "alwaysShow": true,
                        "meta": {
                            "title": "系统管理",
                            "icon": "system",
                            "noCache": false
                        },
                        "children": [
                            {
                                "name": "User",
                                "path": "user",
                                "hidden": false,
                                "component": "system/user/index",
                                "meta": {
                                    "title": "用户管理",
                                    "icon": "user",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Role",
                                "path": "role",
                                "hidden": false,
                                "component": "system/role/index",
                                "meta": {
                                    "title": "角色管理",
                                    "icon": "peoples",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Menu",
                                "path": "menu",
                                "hidden": false,
                                "component": "system/menu/index",
                                "meta": {
                                    "title": "菜单管理",
                                    "icon": "tree-table",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Dept",
                                "path": "dept",
                                "hidden": false,
                                "component": "system/dept/index",
                                "meta": {
                                    "title": "部门管理",
                                    "icon": "tree",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Post",
                                "path": "post",
                                "hidden": false,
                                "component": "system/post/index",
                                "meta": {
                                    "title": "岗位管理",
                                    "icon": "post",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Dict",
                                "path": "dict",
                                "hidden": false,
                                "component": "system/dict/index",
                                "meta": {
                                    "title": "字典管理",
                                    "icon": "dict",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Config",
                                "path": "config",
                                "hidden": false,
                                "component": "system/config/index",
                                "meta": {
                                    "title": "参数设置",
                                    "icon": "edit",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Notice",
                                "path": "notice",
                                "hidden": false,
                                "component": "system/notice/index",
                                "meta": {
                                    "title": "通知公告",
                                    "icon": "message",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Log",
                                "path": "log",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "ParentView",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "日志管理",
                                    "icon": "log",
                                    "noCache": false
                                },
                                "children": [
                                    {
                                        "name": "Operlog",
                                        "path": "operlog",
                                        "hidden": false,
                                        "component": "monitor/operlog/index",
                                        "meta": {
                                            "title": "操作日志",
                                            "icon": "form",
                                            "noCache": false
                                        }
                                    },
                                    {
                                        "name": "Logininfor",
                                        "path": "logininfor",
                                        "hidden": false,
                                        "component": "monitor/logininfor/index",
                                        "meta": {
                                            "title": "登录日志",
                                            "icon": "logininfor",
                                            "noCache": false
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Monitor",
                        "path": "/monitor",
                        "hidden": false,
                        "redirect": "noRedirect",
                        "component": "Layout",
                        "alwaysShow": true,
                        "meta": {
                            "title": "系统监控",
                            "icon": "monitor",
                            "noCache": false
                        },
                        "children": [
                            {
                                "name": "Online",
                                "path": "online",
                                "hidden": false,
                                "component": "monitor/online/index",
                                "meta": {
                                    "title": "在线用户",
                                    "icon": "online",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Job",
                                "path": "job",
                                "hidden": false,
                                "component": "monitor/job/index",
                                "meta": {
                                    "title": "定时任务",
                                    "icon": "job",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Druid",
                                "path": "druid",
                                "hidden": false,
                                "component": "monitor/druid/index",
                                "meta": {
                                    "title": "数据监控",
                                    "icon": "druid",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Server",
                                "path": "server",
                                "hidden": false,
                                "component": "monitor/server/index",
                                "meta": {
                                    "title": "服务监控",
                                    "icon": "server",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "Cache",
                                "path": "cache",
                                "hidden": false,
                                "component": "monitor/cache/index",
                                "meta": {
                                    "title": "缓存监控",
                                    "icon": "redis",
                                    "noCache": false
                                }
                            }
                        ]
                    },
                    {
                        "name": "EquipmentBingding",
                        "path": "/equipment-binding",
                        "component": "Layout",
                        "redirect": "/equipment-binding/index",
                        "hidden": false,
                        "meta": {

                        },
                        "children": [
                            {
                                "name": "Index",
                                "path": "index",
                                "component": "equipment-binding/index",
                                "meta": {
                                    "title": "设备绑定",
                                    "icon": "swagger",
                                    "noCache": false
                                }
                            },
                        ]
                    },
                    {
                        "name": "ServiceRequest",
                        "path": "/service-request",
                        "component": "Layout",
                        "redirect": "/service-request/index",
                        "hidden": false,
                        "meta": {
                            "title": "服务请求",
                            "icon": "form",
                            "noCache": false
                        },
                        "children": [
                            {
                                "name": "all",
                                "path": "index/all",
                                "component": "service-request/index",
                                "meta": {
                                    "title": "所有请求",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "todo",
                                "path": "index/dsl",
                                "component": "service-request/index",
                                "meta": {
                                    "title": "待受理1",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "exec",
                                "path": "index/ypg",
                                "component": "service-request/index",
                                "meta": {
                                    "title": "已派工",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "invalidReq",
                                "path": "index/wxqq",
                                "component": "service-request/index",
                                "meta": {
                                    "title": "无效请求",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "SJZB",
                                "path": "service-request/upgrade-transfer",
                                "component": "service-request/upgrade-transfer/UpgradeTransfer",
                                "meta": {
                                    "title": "升级与转办",
                                    "icon": "form",
                                }
                            },
                        ]
                    },
                    {
                        "name": "ServiceClass",
                        "path": "/service-class/",
                        "component": "Layout",
                        "redirect": "/service-class/index",
                        "hidden": false,
                        "meta": {
                            "title": "服务类",
                            "icon": "form",
                            "noCache": false
                        },
                        "children": [
                            {
                                "name": "all",
                                "path": "index/all",
                                "component": "service-class/index",
                                "meta": {
                                    "title": "所有请求",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "todo",
                                "path": "index/dsl",
                                "component": "service-class/index",
                                "meta": {
                                    "title": "待受理",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "exec",
                                "path": "index/fwz",
                                "component": "service-class/index",
                                "meta": {
                                    "title": "服务中",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "complete",
                                "path": "index/ywc",
                                "component": "service-class/index",
                                "meta": {
                                    "title": "已完成",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "candle",
                                "path": "index/yqx",
                                "component": "service-class/index",
                                "meta": {
                                    "title": "已取消",
                                    "icon": "form",
                                }
                            },
                        ]
                    },
                    {
                        "name": "ServiceTask",
                        "path": "/service-task",
                        "component": "Layout",
                        "redirect": "/service-task/index",
                        "hidden": false,
                        "meta": {
                            "title": "服务工单",
                            "icon": "form",
                            "noCache": false
                        },
                        "children": [
                            {
                                "name": "all",
                                "path": "index/all",
                                "component": "service-task/index",
                                "meta": {
                                    "title": "全部工单",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "todo",
                                "path": "index/dcl",
                                "component": "service-task/index",
                                "meta": {
                                    "title": "待处理",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "exec",
                                "path": "index/clz",
                                "component": "service-task/index",
                                "meta": {
                                    "title": "处理中",
                                    "icon": "form",
                                }
                            },
                            {
                                "name": "complete",
                                "path": "index/ywc",
                                "component": "service-task/index",
                                "meta": {
                                    "title": "已完成",
                                    "icon": "form",
                                }
                            },
                        ]
                    },
                    {
                        "name": "EquipmentCollected",
                        "path": "/equipment-collected",
                        "component": "Layout",
                        "redirect": "/equipment-collected/index",
                        "hidden": false,
                        "meta": {

                        },
                        "children": [
                            {
                                "name": "Index",
                                "path": "index",
                                "component": "equipment-collected/index",
                                "meta": {
                                    "title": "待采集设备",
                                    "icon": "dict",
                                    "noCache": false
                                }
                            },
                        ]
                    },
                    {
                        "name": "PartsManagement",
                        "path": "/parts-management",
                        "hidden": false,
                        "redirect": "noRedirect",
                        "component": "Layout",
                        "alwaysShow": true,
                        "meta": {
                            "title": "配件管理",
                            "icon": "clipboard",
                            "noCache": false
                        },
                        "children": [
                            {
                                "name": "MaterialRequest",
                                "path": "material-request",
                                "hidden": false,
                                "component": "parepart/material-request/MaterialRequest",
                                "meta": {
                                    "title": "物料申请",
                                    "icon": "tree-table",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "MaterialsHandle",
                                "path": "materials-handle",
                                "hidden": false,
                                "component": "parepart/materials-handle/MaterialsHandle",
                                "meta": {
                                    "title": "余料处理",
                                    "icon": "tree-table",
                                    "noCache": false
                                }
                            },
                            {
                                "name": "CoreHandling",
                                "path": "core-handling",
                                "hidden": false,
                                "component": "parepart/core-handling/CoreHandling",
                                "meta": {
                                    "title": "旧件处理",
                                    "icon": "tree-table",
                                    "noCache": false
                                }
                            },
                        ]
                    },

                ]
            }
        }
    },



    // user logout
    {
        url: '/mock/auth/logout',
        type: 'delete',
        response: _ => {
            return {
                code: 200,
                data: 'success'
            }
        }
    },


    {
        url: '/mock/system/user/list',
        type: 'get',
        response: _ => {
            return { "total": 2, "rows": [{ "searchValue": null, "createBy": "admin", "createTime": "2020-11-20 19:29:42", "updateBy": null, "updateTime": null, "remark": "管理员", "params": {}, "userId": 1, "deptId": 103, "userName": "admin", "nickName": "若依", "email": "ry@163.com", "phonenumber": "15888888888", "sex": "1", "avatar": "", "salt": null, "status": "0", "delFlag": "0", "loginIp": "127.0.0.1", "loginDate": "2020-11-20T19:29:42.000+0800", "dept": { "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "deptId": 103, "parentId": null, "ancestors": null, "deptName": "研发部门", "orderNum": null, "leader": "若依", "phone": null, "email": null, "status": null, "delFlag": null, "parentName": null, "children": [] }, "roles": [], "roleIds": null, "postIds": null, "admin": true }, { "searchValue": null, "createBy": "admin", "createTime": "2020-11-20 19:29:42", "updateBy": null, "updateTime": null, "remark": "测试员", "params": {}, "userId": 2, "deptId": 105, "userName": "ry", "nickName": "若依", "email": "ry@qq.com", "phonenumber": "15666666666", "sex": "1", "avatar": "", "salt": null, "status": "0", "delFlag": "0", "loginIp": "127.0.0.1", "loginDate": "2020-11-20T19:29:42.000+0800", "dept": { "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "deptId": 105, "parentId": null, "ancestors": null, "deptName": "测试部门", "orderNum": null, "leader": "若依", "phone": null, "email": null, "status": null, "delFlag": null, "parentName": null, "children": [] }, "roles": [], "roleIds": null, "postIds": null, "admin": false }], "code": 200, "msg": null }
        }
    },
    {
        url: '/mock/system/user/deptTree',
        type: 'get',
        response: _ => {
            return { "msg": "操作成功", "code": 200, "data": [{ "id": 100, "label": "若依科技", "children": [{ "id": 101, "label": "深圳总公司", "children": [{ "id": 103, "label": "研发部门" }, { "id": 104, "label": "市场部门" }, { "id": 105, "label": "测试部门" }, { "id": 106, "label": "财务部门" }, { "id": 107, "label": "运维部门" }] }, { "id": 102, "label": "长沙分公司", "children": [{ "id": 108, "label": "市场部门" }, { "id": 109, "label": "财务部门" }] }] }] }
        }
    },
    {
        url: '/mock/system/dict/data/type/sys_normal_disable',
        type: 'get',
        response: _ => {
            return { "msg": "操作成功", "code": 200, "data": [{ "searchValue": null, "createBy": "admin", "createTime": "2020-11-20 19:29:49", "updateBy": null, "updateTime": null, "remark": "正常状态", "params": {}, "dictCode": 6, "dictSort": 1, "dictLabel": "正常", "dictValue": "0", "dictType": "sys_normal_disable", "cssClass": "", "listClass": "primary", "isDefault": "Y", "status": "0", "default": true }, { "searchValue": null, "createBy": "admin", "createTime": "2020-11-20 19:29:49", "updateBy": null, "updateTime": null, "remark": "停用状态", "params": {}, "dictCode": 7, "dictSort": 2, "dictLabel": "停用", "dictValue": "1", "dictType": "sys_normal_disable", "cssClass": "", "listClass": "danger", "isDefault": "N", "status": "0", "default": false }] }
        }
    },
    {
        url: '/mock/system/dict/data/type/sys_user_sex',
        type: 'get',
        response: _ => {
            return { "msg": "操作成功", "code": 200, "data": [{ "searchValue": null, "createBy": "admin", "createTime": "2020-11-20 19:29:49", "updateBy": null, "updateTime": null, "remark": "性别男", "params": {}, "dictCode": 1, "dictSort": 1, "dictLabel": "男", "dictValue": "0", "dictType": "sys_user_sex", "cssClass": "", "listClass": "", "isDefault": "Y", "status": "0", "default": true }, { "searchValue": null, "createBy": "admin", "createTime": "2020-11-20 19:29:49", "updateBy": null, "updateTime": null, "remark": "性别女", "params": {}, "dictCode": 2, "dictSort": 2, "dictLabel": "女", "dictValue": "1", "dictType": "sys_user_sex", "cssClass": "", "listClass": "", "isDefault": "N", "status": "0", "default": false }, { "searchValue": null, "createBy": "admin", "createTime": "2020-11-20 19:29:49", "updateBy": null, "updateTime": null, "remark": "性别未知", "params": {}, "dictCode": 3, "dictSort": 3, "dictLabel": "未知", "dictValue": "2", "dictType": "sys_user_sex", "cssClass": "", "listClass": "", "isDefault": "N", "status": "0", "default": false }] }
        }
    },
    {
        url: '/mock/system/config/configKey/sys.user.initPassword',
        type: 'get',
        response: _ => {
            return { "msg": "123456", "code": 200 }
        },
    }
]
