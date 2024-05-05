import { defHttp } from "/@/utils/http/axios";
import { Box, ReqBox, BoxPageModel } from "/@/api/web/model/BoxModel";

/**
 * @description: 盒子
 * @author: mfish
 * @date: 2024-05-05
 * @version: V1.3.0
 */
enum Api {
  Box = "/web/box"
}

/**
 * 分页列表查询
 *
 * @param reqBox
 * @return
 */
export const getBoxList = (reqBox?: ReqBox) => {
  return defHttp.get<BoxPageModel>({ url: Api.Box, params: reqBox });
};

/**
 * 导出盒子
 * @param reqBox
 */
export function exportBox(reqBox?: ReqBox) {
  return defHttp.download({ url: Api.Box + "/export", params: reqBox });
};

/**
 * 新增盒子
 *
 * @param box
 * @return
 */
export function insertBox(box: Box) {
  return defHttp.post<Box>({ url: Api.Box, params: box }, { successMessageMode: "message" });
};

/**
 * 修改盒子
 *
 * @param box
 * @return
 */
export function updateBox(box: Box) {
  return defHttp.put<Box>({ url: Api.Box, params: box }, { successMessageMode: "message" });
};

/**
 * 删除盒子
 *
 * @param id 唯一ID
 * @return
 */
export function deleteBox(id: string) {
  return defHttp.delete<Box>({ url: Api.Box + "/" + id }, { successMessageMode: "message" });
};

/**
 * 批量删除盒子
 *
 * @param ids 唯一ID多个逗号隔开
 * @return
 */
export function deleteBatchBox(ids: string) {
  return defHttp.delete<Box>({ url: Api.Box + "/batch/" + ids }, { successMessageMode: "message" });
};
