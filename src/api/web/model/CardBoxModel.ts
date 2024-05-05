import { BaseEntity, PageResult, ReqPage } from "/@/api/model/BaseModel";

/**
 * @description: 卡片盒子中间表
 * @author: mfish
 * @date: 2024-05-05
 * @version: V1.3.0
 */
export interface CardBox extends BaseEntity<string> {
  //卡片ID
  cardId: string;
  //盒子ID
  boxId: string;
}

export interface ReqCardBox extends ReqPage {
  //卡片ID
  cardId?: string;
  //盒子ID
  boxId?: string;
}

//分页结果集
export type CardBoxPageModel = PageResult<CardBox>;
