import { BasicColumn } from "/@/components/general/Table";
import { FormSchema } from "/@/components/general/Table";

/**
 * @description: 卡片盒子中间表
 * @author: mfish
 * @date: 2024-05-05
 * @version: V1.3.0
 */
export const columns: BasicColumn[] = [
  {
    title: "卡片ID",
    dataIndex: "cardId",
    width: 120
  },
  {
    title: "盒子ID",
    dataIndex: "boxId",
    width: 120
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: "cardId",
    label: "卡片ID",
    component: "Input",
    colProps: { lg: 4, md: 5 }
  },
  {
    field: "boxId",
    label: "盒子ID",
    component: "Input",
    colProps: { lg: 4, md: 5 }
  },
];
export const cardBoxFormSchema: FormSchema[] = [
  {
    field: "id",
    label: "唯一ID",
    component: "Input",
    show: false
  },
  {
    field: "cardId",
    label: "卡片ID",
    component: "Input",
    required: true
  },
  {
    field: "boxId",
    label: "盒子ID",
    component: "Input",
    required: true
  },
];
