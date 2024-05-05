import { defHttp } from "/@/utils/http/axios";
import { CardBox, ReqCardBox, CardBoxPageModel } from "/@/api/web/model/CardBoxModel";

/**
 * @description: 卡片盒子中间表
 * @author: mfish
 * @date: 2024-05-05
 * @version: V1.3.0
 */
enum Api {
  CardBox = "/web/cardBox"
}

/**
 * 分页列表查询
 *
 * @param reqCardBox
 * @return
 */
export const getCardBoxList = (reqCardBox?: ReqCardBox) => {
  return defHttp.get<CardBoxPageModel>({ url: Api.CardBox, params: reqCardBox });
};

/**
 * 导出卡片盒子中间表
 * @param reqCardBox
 */
export function exportCardBox(reqCardBox?: ReqCardBox) {
  return defHttp.download({ url: Api.CardBox + "/export", params: reqCardBox });
};

/**
 * 新增卡片盒子中间表
 *
 * @param cardBox
 * @return
 */
export function insertCardBox(cardBox: CardBox) {
  return defHttp.post<CardBox>({ url: Api.CardBox, params: cardBox }, { successMessageMode: "message" });
};

/**
 * 修改卡片盒子中间表
 *
 * @param cardBox
 * @return
 */
export function updateCardBox(cardBox: CardBox) {
  return defHttp.put<CardBox>({ url: Api.CardBox, params: cardBox }, { successMessageMode: "message" });
};

/**
 * 删除卡片盒子中间表
 *
 * @param id 唯一ID
 * @return
 */
export function deleteCardBox(id: string) {
  return defHttp.delete<CardBox>({ url: Api.CardBox + "/" + id }, { successMessageMode: "message" });
};

/**
 * 批量删除卡片盒子中间表
 *
 * @param ids 唯一ID多个逗号隔开
 * @return
 */
export function deleteBatchCardBox(ids: string) {
  return defHttp.delete<CardBox>({ url: Api.CardBox + "/batch/" + ids }, { successMessageMode: "message" });
};
