import { BasicColumn } from "/@/components/general/Table";
import { FormSchema } from "/@/components/general/Table";

/**
 * @description: 盒子
 * @author: mfish
 * @date: 2024-05-05
 * @version: V1.3.0
 */
export const columns: BasicColumn[] = [
  {
    title: "名称",
    dataIndex: "name",
    width: 120
  },
  {
    title: "笔记",
    dataIndex: "note",
    width: 120
  },
  {
    title: "卡片数量",
    dataIndex: "cardNumber",
    width: 120
  },
  {
    title: "盒子排序",
    dataIndex: "boxSort",
    width: 120
  },
  {
    title: "是否仅作为标题(1=是;0=否)",
    dataIndex: "onlyTitle",
    width: 120
  }
];
export const searchFormSchema: FormSchema[] = [];
export const boxFormSchema: FormSchema[] = [
  {
    field: "id",
    label: "唯一ID",
    component: "Input",
    show: false
  },
  {
    field: "name",
    label: "名称",
    component: "Input",
    required: true
  },
  {
    field: "note",
    label: "笔记",
    component: "Input",
    required: true
  },
  {
    field: "cardNumber",
    label: "卡片数量",
    component: "InputNumber",
    required: true
  },
  {
    field: "boxSort",
    label: "盒子排序",
    component: "InputNumber",
    required: true
  },
  {
    field: "onlyTitle",
    label: "是否仅作为标题(1=是;0=否)",
    component: "InputNumber",
    required: true
  }
];
