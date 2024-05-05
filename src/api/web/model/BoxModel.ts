import { BaseEntity, PageResult, ReqPage } from "/@/api/model/BaseModel";

/**
 * @description: 盒子
 * @author: mfish
 * @date: 2024-05-05
 * @version: V1.3.0
 */
export interface Box extends BaseEntity<string> {
  //名称
  name: string;
  //描述
  description: string;
  //卡片数量
  cardNumber: number;
  //盒子排序
  boxSort: number;
  //是否仅作为标题(1=是;0=否)
  onlyTitle: number;
}

export interface ReqBox extends ReqPage {
}

//分页结果集
export type BoxPageModel = PageResult<Box>;
