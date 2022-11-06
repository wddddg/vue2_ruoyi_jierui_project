/*
 * @Author: cgc 1083310255@qq.com
 * @Date: 2022-06-06 08:32:38
 * @LastEditors: cgc 1083310255@qq.com
 * @LastEditTime: 2022-06-07 09:38:17
 * @FilePath: \rayup-center-ui\src\api\tool\gen.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'
// 切换数据源
export function switchDb(dbName) {
  return request({
    url: '/code/gen/switchDb/' + dbName,
    method: 'get'
  })
}
// 查询数据源列表
export function listDb() {
  return request({
    url: '/code/gen/datasource/list',
    method: 'get',
  })
}
// 查询生成表数据
export function listTable(query) {
  return request({
    url: '/code/gen/list',
    method: 'get',
    params: query
  })
}
// 查询db数据库列表
export function listDbTable(query) {
  return request({
    url: '/code/gen/db/list',
    method: 'get',
    params: query
  })
}

// 查询表详细信息
export function getGenTable(tableId) {
  return request({
    url: '/code/gen/' + tableId,
    method: 'get'
  })
}

// 修改代码生成信息
export function updateGenTable(data) {
  return request({
    url: '/code/gen',
    method: 'put',
    data: data
  })
}

// 导入表
export function importTable(data) {
  return request({
    url: '/code/gen/importTable',
    method: 'post',
    params: data
  })
}

// 预览生成代码
export function previewTable(tableId) {
  return request({
    url: '/code/gen/preview/' + tableId,
    method: 'get'
  })
}

// 删除表数据
export function delTable(tableId) {
  return request({
    url: '/code/gen/' + tableId,
    method: 'delete'
  })
}

// 生成代码（自定义路径）
export function genCode(tableName) {
  return request({
    url: '/code/gen/genCode/' + tableName,
    method: 'get'
  })
}

// 同步数据库
export function synchDb(tableName) {
  return request({
    url: '/code/gen/synchDb/' + tableName,
    method: 'get'
  })
}
