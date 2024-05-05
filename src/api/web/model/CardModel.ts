import { BaseEntity, PageResult, ReqPage } from "/@/api/model/BaseModel";

/**
 * @description: 卡片
 * @author: mfish
 * @date: 2024-05-02
 * @version: V1.3.0
 */
export interface Card extends BaseEntity<string> {
  //标题
  title: string;
  //内容
  content: string;
  //来源
  source?: string;
  //背景色
  backgroundColor?: string;
  //类型(1=大版本;2=小版本)
  type: number;
  //大版本号
  bigVersion: number;
  //小版本号
  smallVersion: number;
  //迭代次数
  number: number;
  //是否是最新大版本(1=是;0=否)
  latest: number;
  //是否已过时(1=是;0=否)
  deprecated: number;
  //母版卡片ID
  parentId: string;
}

export interface ReqCard extends ReqPage {
  //是否是最新大版本(1=是;0=否)
  latest?: number;
  //是否已过时(1=是;0=否)
  deprecated?: number;
}

//分页结果集
export type CardPageModel = PageResult<Card>;
