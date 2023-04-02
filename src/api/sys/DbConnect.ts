/**
 * @description: 数据库连接
 * @author: mfish
 * @date: 2023-03-13
 * @version: V1.0.0
 */
import { defHttp } from "/@/utils/http/axios";
import { DbConnect, ReqDbConnect, DbConnectPageModel, ReqTable } from "/@/api/sys/model/DbConnectModel";
import { PageResult } from "/@/api/model/BaseModel";

enum Api {
  DbConnect = "/sys/dbConnect",
  TestConnect = "/sys/dbConnect/test",
  TABLES = "/sys/dbConnect/tables",
  FIELDS = "/sys/dbConnect/fields",
}

/**
 * 分页列表查询
 *
 * @param reqDbConnect
 * @return
 */
export const getDbConnectList = (reqDbConnect?: ReqDbConnect) => {
  return defHttp.get<DbConnectPageModel>({ url: Api.DbConnect, params: reqDbConnect });
};

export const getTableList = (params: ReqTable) => {
  return defHttp.get<PageResult<any>>({ url: Api.TABLES, params: params });
};

export const getFieldList = (params: ReqTable) => {
  return defHttp.get<any>({ url: Api.FIELDS, params: params });
};

/**
 * 新增数据库连接
 *
 * @param dbConnect
 * @return
 */
export function insertDbConnect(dbConnect: DbConnect) {
  return defHttp.post<DbConnect>({ url: Api.DbConnect, params: dbConnect }, { successMessageMode: "message" });
};

/**
 * 修改数据库连接
 *
 * @param dbConnect
 * @return
 */
export function updateDbConnect(dbConnect: DbConnect) {
  return defHttp.put<DbConnect>({ url: Api.DbConnect, params: dbConnect }, { successMessageMode: "message" });
};

/**
 * 删除数据库连接
 *
 * @param id 唯一ID
 * @return
 */
export function deleteDbConnect(id: string) {
  return defHttp.delete<DbConnect>({ url: Api.DbConnect + "/" + id }, { successMessageMode: "message" });
};

/**
 * 测试数据库连接
 * @param dbConnect
 */
export function testDbConnect(dbConnect: DbConnect) {
  return defHttp.post<DbConnect>({ url: Api.TestConnect, params: dbConnect }, { successMessageMode: "message" });
};
