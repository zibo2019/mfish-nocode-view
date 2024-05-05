import { defHttp } from "/@/utils/http/axios";
import { Card, ReqCard, CardPageModel } from "/@/api/web/model/CardModel";

/**
 * @description: 卡片
 * @author: mfish
 * @date: 2024-05-02
 * @version: V1.3.0
 */
enum Api {
  Card = "/web/card"
}

/**
 * 分页列表查询
 *
 * @param reqCard
 * @return
 */
export const getCardList = (reqCard?: ReqCard) => {
  return defHttp.get<CardPageModel>({ url: Api.Card, params: reqCard });
};

/**
 * 导出卡片
 * @param reqCard
 */
export function exportCard(reqCard?: ReqCard) {
  return defHttp.download({ url: Api.Card + "/export", params: reqCard });
}

/**
 * 新增卡片
 *
 * @param card
 * @return
 */
export function insertCard(card: Card) {
  return defHttp.post<Card>({ url: Api.Card, params: card }, { successMessageMode: "message" });
}

/**
 * 修改卡片
 *
 * @param card
 * @return
 */
export function updateCard(card: Card) {
  return defHttp.put<Card>({ url: Api.Card, params: card }, { successMessageMode: "message" });
}

/**
 * 删除卡片
 *
 * @param id 唯一ID
 * @return
 */
export function deleteCard(id: string) {
  return defHttp.delete<Card>({ url: Api.Card + "/" + id }, { successMessageMode: "message" });
}

/**
 * 批量删除卡片
 *
 * @param ids 唯一ID多个逗号隔开
 * @return
 */
export function deleteBatchCard(ids: string) {
  return defHttp.delete<Card>({ url: Api.Card + "/batch/" + ids }, { successMessageMode: "message" });
}
