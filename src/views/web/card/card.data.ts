import { BasicColumn } from "/@/components/general/Table";
import { FormSchema } from "/@/components/general/Table";

/**
 * @description: 卡片
 * @author: mfish
 * @date: 2024-05-02
 * @version: V1.3.0
 */
export const columns: BasicColumn[] = [
  {
    title: "标题",
    dataIndex: "title",
    width: 120
  },
  {
    title: "内容",
    dataIndex: "content",
    width: 120
  },
  {
    title: "来源",
    dataIndex: "source",
    width: 120
  },
  {
    title: "背景色",
    dataIndex: "backgroundColor",
    width: 120
  },
  {
    title: "类型(1=大版本;2=小版本)",
    dataIndex: "type",
    width: 120
  },
  {
    title: "大版本号",
    dataIndex: "bigVersion",
    width: 120
  },
  {
    title: "小版本号",
    dataIndex: "smallVersion",
    width: 120
  },
  {
    title: "迭代次数",
    dataIndex: "number",
    width: 120
  },
  {
    title: "是否是最新大版本(1=是;0=否)",
    dataIndex: "latest",
    width: 120
  },
  {
    title: "是否已过时(1=是;0=否)",
    dataIndex: "deprecated",
    width: 120
  },
  {
    title: "母版卡片ID",
    dataIndex: "parentId",
    width: 120
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: "latest",
    label: "是否是最新大版本(1=是;0=否)",
    component: "Input",
    colProps: { lg: 4, md: 5 }
  },
  {
    field: "deprecated",
    label: "是否已过时(1=是;0=否)",
    component: "Input",
    colProps: { lg: 4, md: 5 }
  },
];
export const cardFormSchema: FormSchema[] = [
  {
    field: "id",
    label: "唯一ID",
    component: "Input",
    show: false
  },
  {
    field: "title",
    label: "标题",
    component: "Input",
    required: true
  },
  {
    field: "content",
    label: "内容",
    component: "Input",
    required: true
  },
  {
    field: "source",
    label: "来源",
    component: "Input",
  },
  {
    field: "backgroundColor",
    label: "背景色",
    component: "Input",
  },
  {
    field: "type",
    label: "类型(1=大版本;2=小版本)",
    component: "InputNumber",
    required: true
  },
  {
    field: "bigVersion",
    label: "大版本号",
    component: "InputNumber",
    required: true
  },
  {
    field: "smallVersion",
    label: "小版本号",
    component: "InputNumber",
    required: true
  },
  {
    field: "number",
    label: "迭代次数",
    component: "InputNumber",
    required: true
  },
  {
    field: "latest",
    label: "是否是最新大版本(1=是;0=否)",
    component: "InputNumber",
    required: true
  },
  {
    field: "deprecated",
    label: "是否已过时(1=是;0=否)",
    component: "InputNumber",
    required: true
  },
  {
    field: "parentId",
    label: "母版卡片ID",
    component: "Input",
    required: true
  },
];
