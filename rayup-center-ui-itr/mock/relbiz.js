module.exports = [
    {
        url: '/mock/itr/ERPQuery/materialInventoryQuery',
        type: 'post',
        response: config => {
            let resp={"data":{"total":3,"rows":[{"item_no":"0303009728","item_desc":"2.5″硅胶管接头;;零件;硅橡胶;","item_unit":null,"item_status":null,"item_make_buy":null,"purchasing_item_flag":null,"purchasing_enabled_flag":null,"build_in_wip_flag":null,"buyer":"14815-刘作伟,","end_assembly_pegging_flag":"硬反查","subinventory_code":"CJZZ","project":"81W223099P","locator_name":"CJZZ/CJZZ.81W223099P","prm_qoh":"4","prm_att":"4","pro_plan":"0","organization_name":"102装备库存组织","problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0303009728","item_desc":"2.5″硅胶管接头;;零件;硅橡胶;","item_unit":null,"item_status":null,"item_make_buy":null,"purchasing_item_flag":null,"purchasing_enabled_flag":null,"build_in_wip_flag":null,"buyer":"14815-刘作伟,","end_assembly_pegging_flag":"硬反查","subinventory_code":"CJZZ","project":"81W181067P","locator_name":"CJZZ/CJZZ.81W181067P","prm_qoh":"3","prm_att":"3","pro_plan":"1","organization_name":"102装备库存组织","problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0303009728","item_desc":"2.5″硅胶管接头;;零件;硅橡胶;","item_unit":null,"item_status":null,"item_make_buy":null,"purchasing_item_flag":null,"purchasing_enabled_flag":null,"build_in_wip_flag":null,"buyer":"14815-刘作伟,","end_assembly_pegging_flag":"硬反查","subinventory_code":"CJZZ","project":"81W223043P","locator_name":"CJZZ/CJZZ.81W223043P","prm_qoh":"4","prm_att":"4","pro_plan":"0","organization_name":"102装备库存组织","problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null}],"code":200,"msg":"查询成功"}};
            return resp;

        }
    },
    {
        url: '/mock/itr/ERPQuery/materialQuery',
        type: 'post',
        response: config => {
            let resp={"data":{"total":18,"rows":[{"item_no":"0219132899_T0000","item_desc":"联轴器;;零件;45;GB/T 699，GB/T 702","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0219800103","item_desc":"摆线马达安装总成;;虚拟件;;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0203800302_T0000","item_desc":"启动马达护罩焊接总成;;焊接件;;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0504176521","item_desc":"柱塞马达安装总成HMF075;;装配件;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"否","purchasing_enabled_flag":"否","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"B020051981","item_desc":"柱塞马达;HMF02-A2-055N-000N14N0000-MS0T21-R00-000-V04-C;;","item_unit":"个","item_status":"有效","item_make_buy":"采购","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"否","buyer":"3458-周游,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"B020000584","item_desc":"摆线马达;;;;","item_unit":"个","item_status":"有效","item_make_buy":"采购","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"否","buyer":"15725-孙伟,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0203800306","item_desc":"启动马达护罩;t3;零件;Q235B;GB/T 11253","item_unit":"个","item_status":"有效","item_make_buy":"采购","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"B080036108","item_desc":"板翅式冷却器;JR03350A;;","item_unit":"个","item_status":"有效","item_make_buy":"采购","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"否","buyer":"16063-史少涛,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0217800266","item_desc":"泥浆离心泵-240度、马达预装总成;;装配件;;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"B020051982","item_desc":"柱塞马达;HMF02-A2-075N-000N14N0000-MS0T21-R00-000-V04-C;;;","item_unit":"个","item_status":"有效","item_make_buy":"采购","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"否","buyer":"3458-周游,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0216800328","item_desc":"供水离心泵-0度、马达预装总成;;装配件;;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0504176519","item_desc":"柱塞马达安装总成HMF055;;虚拟件;;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"否","purchasing_enabled_flag":"否","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0203800302","item_desc":"启动马达护罩焊接总成;;焊接件;;","item_unit":"个","item_status":"有效","item_make_buy":"采购","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0217800266_T0000","item_desc":"泥浆离心泵-240度、马达预装总成;;装配件;;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0216800327","item_desc":"喷射1离心泵-90度、马达预装总成;;装配件;;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0219009831_T0000","item_desc":"马达座;;焊接件;焊接件;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0219009831","item_desc":"马达座;;焊接件;;","item_unit":"个","item_status":"有效","item_make_buy":"采购","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null},{"item_no":"0203800301","item_desc":"启动马达护罩安装总成;;虚拟件;;","item_unit":"个","item_status":"有效","item_make_buy":"制造","purchasing_item_flag":"是","purchasing_enabled_flag":"是","build_in_wip_flag":"是","buyer":"GYBWX-供应部外协,","end_assembly_pegging_flag":"硬反查","subinventory_code":null,"project":null,"locator_name":null,"prm_qoh":null,"prm_att":null,"pro_plan":null,"organization_name":null,"problem_code":null,"mtl_num":null,"mtl_desc":null,"req_qty":null,"onhand_qty":null,"po_qty":null,"cnjhrq":null,"line_status":null,"line_uuid":null,"deliver_type":null,"deliver_date":null,"bill_num":null,"jieshouren":null,"order_number":null,"remark":null}],"code":200,"msg":"查询成功"}}
            return resp;

        }
    },
    {
        url: '/mock/relbiz/equipment/list',
        type: 'get',
        response: config => {
            let data = { "total": 0, "rows": [], "code": 200, "msg": "成功" };

            data.rows = [
                {
                    "equipmentCode": "EQ62001",
                    "equipmentName": "机床举",
                    "licensePlateCode": "粤C02535",
                    "serviceRequiredTime": "2022-08-23 19:29:42",
                    "productBrand": "杰瑞",
                    "projectCode": "81W123",
                    "productPattern": "17WX112",
                    "qualityEndDate": "2022-12-30",
                    "deviceArea": "中东",
                    "afterSaleArea": "中东大区",
                    "qualityExpirationDate": "2020-10-14",
                    "askUserName": "张总",
                    "askUserInfo": "1386644285",
                    "productName": "杰瑞机床举",
                    "projectItem": "项目编码分项1",
                    "productCode": "C02535",
                    "productType": "productModel",
                    "chassisCode": "6200213",
                    "contactUserName": "王总",
                    "contactUserInfo": "18824430253",
                    "customerPerson": "小吴",
                    "customerPhone": "112333333",
                    "expirationDate": "2020-11-30 10:00:01",
                    "customerName": "小小"
                },
                {
                    "equipmentCode": "EQ62002",
                    "equipmentName": "杠铃",
                    "licensePlateCode": "粤C073668",
                    "serviceRequiredTime": "2022-08-24 19:29:42",
                    "productBrand": "杰瑞",
                    "projectCode": "81W123",
                    "productPattern": "17WX112",
                    "qualityEndDate": "2022-12-30",
                    "deviceArea": "中东",
                    "afterSaleArea": "中东大区",
                    "qualityExpirationDate": "2020-10-14",
                    "askUserName": "张总",
                    "askUserInfo": "1386644285",
                    "productName": "杰瑞杠铃",
                    "projectItem": "项目编码分项2",
                    "productCode": "C073668",
                    "productType": "productModel",
                    "chassisCode": "6200214",
                    "contactUserName": "王总",
                    "contactUserInfo": "18824430253",
                    "customerPerson": "小天",
                    "customerPhone": "112333333",
                    "expirationDate": "2020-11-30 10:00:01",
                    "customerName": "小小"
                },
            ];
            data['total'] = data['rows'].length;
            return data;

        }
    },
    {
        url: '/mock/relbiz/staff/list',
        type: 'get',
        response: config => {
            let data = { "total": 0, "rows": [], "code": 200, "msg": "成功" };

            data.rows = [
                {
                    "userId": "62122622001",
                    "userName": "孙宁波",
                    "staffNo": "62122622001",

                },
                {
                    "userId": "62122622002",
                    "userName": "朱滨",
                    "staffNo": "62122622002",

                },
                {
                    "userId": "62122622003",
                    "userName": "王真彪",
                    "staffNo": "62122622003",

                },
                {
                    "userId": "62122622004",
                    "userName": "工程师",
                    "staffNo": "62122622004",

                },

            ];
            data['total'] = data['rows'].length;
            return data;

        }
    },
    {
        url: '/mock/relbiz/agreement/list',
        type: 'get',
        response: config => {
            let data = { "total": 0, "rows": [], "code": 200, "msg": "成功" };

            data.rows = [
                {
                    "customerName": "张三",
                    "serviceCode": "AG0002525",
                    "afterSaleArea": "中东",

                },
                {
                    "customerName": "李四",
                    "serviceCode": "AG0002526",
                    "afterSaleArea": "俄罗斯",

                },
            ];
            data['total'] = data['rows'].length;
            return data;

        }
    },
]
