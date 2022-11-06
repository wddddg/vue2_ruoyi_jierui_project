import request from '@/utils/request'

// 物料库存查询
export function listMaterialInventory(data) {
  return request({
    url: '/itr/ERPQuery/materialInventoryQuery',
    method: 'post',
    data: data
  })
}

// 物料列表查询
export function listMaterial(data) {
  return request({
    url: '/itr/ERPQuery/materialQuery',
    method: 'post',
    data: data
  })
}

// 设备列表查询
export function listEquipment(query) {
  return request({
    url: '/relbiz/equipment/list',
    method: 'get',
    params: query
  })
}

// 框架协议
export function listAgreement(query) {
  return request({
    url: '/relbiz/agreement/list',
    method: 'get',
    params: query
  })
}
